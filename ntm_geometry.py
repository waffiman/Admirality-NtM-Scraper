# -*- coding: utf-8 -*-
"""
Deterministic NtM / NAVTEX geometry classifier for SetSail.

Goal: never plot a multi-vertex area/line as a cloud of discrete points.
Prefer exact code; optional Cohere only when confidence is low and COHERE_API_KEY is set.
"""
from __future__ import annotations

import math
import os
import re
from typing import Any

POLYGON_RE = re.compile(
    r"AREA\s+BOUNDED|BOUNDED\s+BY|WITHIN\s+(?:THE\s+)?AREA|ENCLOSED\s+BY|"
    r"RESTRICTED\s+AREA|PROHIBITED\s+AREA|EXCLUSION\s+(?:ZONE|AREA)|"
    r"DANGER\s+AREA|FIRING\s+(?:AREA|EXERCISE|PRACTICE)|GUNNERY|"
    r"JOINING\s+THE\s+FOLLOWING|THE\s+FOLLOWING\s+(?:POSITIONS|CO[- ]?ORDINATES)|"
    r"LIMIT(?:S)?\s+OF\s+(?:THE\s+)?(?:RESTRICTED|PROHIBITED|DANGER)\s+AREA|"
    r"POLYGON|SECTOR\s+BOUNDED|BETWEEN\s+THE\s+FOLLOWING|"
    r"WITHIN:\s*\(A\)|AREA\s+AS\s+FOLLOWS",
    re.I,
)
LINE_RE = re.compile(
    r"\bJOINING\b|TRACKLINE|TRACK\s+LINE|CENT(?:ER|RE)LINE|"
    r"SUBMARINE\s+(?:CABLE|PIPELINE)|PIPELINE|CABLE\s+(?:LAY|ROUTE|RECOVERY)|"
    r"ALONG\s+THE\s+FOLLOWING\s+LINE|RADIO\s+REPORTING\s+LINE|"
    r"LEADING\s+LINE|RANGE\s+LINE|TRANSIT\s+LANE|"
    r"1\s+MILE\s+ON\s+EACH\s+SIDE|CORRIDOR",
    re.I,
)
DISCRETE_RE = re.compile(
    r"\b(?:BUOYAGE|LIGHTS?|BEACONS?|ROCKS?|WRECKS?|OBSTRUCTIONS?|"
    r"SOUNDING|DEPTHS?|DRYING\s+HEIGHT|AIDS?\s+TO\s+NAVIGATION|"
    r"NM\s+BLOCKS?|CHART\s+CORRECTION|INSERT\s+DEPTH|DELETE\s+DEPTH|"
    r"MOVE\s+G[A-Z]|INSERT\s+G[A-Z]|VIRTUAL\s+AIDS?)\b|"
    r"\b(?:Depth|Depths|Drying\s+height|Obstructions?|Wrecks?|Sounding)\s+Position\b|"
    r"^\s*(?:DEPTHS?|BUOY|BUOYS|LIGHT|LIGHTS|ROCKS?)\s*\.?\s*$",
    re.I,
)
# Hard discrete: subject-level chart corrections must never become long lines/areas
DISCRETE_SUBJECT_RE = re.compile(
    r"^\s*(?:DEPTHS?|BUOY(?:AGE)?|LIGHTS?|ROCKS?|WRECKS?|OBSTRUCTIONS?|"
    r"NM\s+BLOCKS?|LEGENDS?|NOTES?)\b",
    re.I,
)
# Max consecutive vertex spacing before treating as separate features (bleed / multi-feature)
MAX_CONNECT_NM_UKHO = 40.0
MAX_CONNECT_NM_NAVTEX = 120.0
CIRCLE_RE = re.compile(
    r"(?:WITHIN|RADIUS|IN\s+A\s+RADIUS\s+OF)\s+(\d+(?:\.\d+)?)\s*(?:NM|N\.?M\.?|NAUTICAL\s+MILES?|MILES?)",
    re.I,
)
AREA_SOFT_RE = re.compile(
    r"\b(?:AREA|ZONE|SECTOR|EXERCISE|FIRING|GUNNERY|EXCLUSION|PROHIBITED|"
    r"RESTRICTED|DANGER|MINE|DRILL|ANCHORAGE)\b",
    re.I,
)


def _haversine_nm(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 3440.065  # Earth radius NM
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(min(1.0, math.sqrt(a)))


def _ring_closed(coords: list, tol_nm: float = 1.5) -> bool:
    if len(coords) < 3:
        return False
    a, b = coords[0], coords[-1]
    return _haversine_nm(a["lat"], a["lon"], b["lat"], b["lon"]) <= tol_nm


def _close_ring(coords: list) -> list:
    if not coords:
        return coords
    out = list(coords)
    if not _ring_closed(out):
        out = out + [dict(out[0])]
    return out


def _span_nm(coords: list) -> float:
    if len(coords) < 2:
        return 0.0
    mx = 0.0
    for i in range(len(coords)):
        for j in range(i + 1, len(coords)):
            mx = max(mx, _haversine_nm(coords[i]["lat"], coords[i]["lon"], coords[j]["lat"], coords[j]["lon"]))
    return mx


def _collinear(coords: list, max_xtrack_nm: float = 4.0) -> bool:
    """True if all points lie near the chord of first→last."""
    if len(coords) < 3:
        return False
    a, b = coords[0], coords[-1]
    chord = _haversine_nm(a["lat"], a["lon"], b["lat"], b["lon"])
    if chord < 0.3:
        return False
    # Approximate cross-track via triangle area
    for c in coords[1:-1]:
        d1 = _haversine_nm(a["lat"], a["lon"], c["lat"], c["lon"])
        d2 = _haversine_nm(c["lat"], c["lon"], b["lat"], b["lon"])
        # Heron → height
        s = (chord + d1 + d2) / 2
        area2 = max(0.0, s * (s - chord) * (s - d1) * (s - d2))
        height = (2 * math.sqrt(area2) / chord) if chord else 0
        if height > max_xtrack_nm:
            return False
    return True


def _shoelace_deg2(coords: list) -> float:
    if len(coords) < 3:
        return 0.0
    a = 0.0
    n = len(coords)
    for i in range(n):
        j = (i + 1) % n
        a += coords[i]["lon"] * coords[j]["lat"]
        a -= coords[j]["lon"] * coords[i]["lat"]
    return abs(a) * 0.5


def generate_circle_ring(lat: float, lon: float, radius_nm: float, steps: int = 24) -> list:
    """Approximate circle as lat/lon ring (good enough for MSI radii ≤ ~50 NM)."""
    steps = max(12, min(48, steps))
    # 1 deg lat ≈ 60 NM
    dlat = radius_nm / 60.0
    coslat = max(0.2, abs(math.cos(math.radians(lat))))
    dlon = (radius_nm / 60.0) / coslat
    ring = []
    for i in range(steps):
        ang = 2 * math.pi * i / steps
        ring.append(
            {
                "lat": round(lat + dlat * math.sin(ang), 5),
                "lon": round(lon + dlon * math.cos(ang), 5),
                "dms": "",
            }
        )
    ring.append(dict(ring[0]))
    return ring


def _cohere_classify(coords: list, text: str) -> str | None:
    """Optional low-confidence fallback. Returns 'polygon'|'line'|'points' or None."""
    key = os.environ.get("COHERE_API_KEY") or os.environ.get("CO_API_KEY")
    if not key or not text:
        return None
    try:
        import requests

        prompt = (
            "Classify this maritime navigational warning geometry as exactly one of: "
            "polygon, line, points. "
            f"Vertex count={len(coords)}. Text:\n{text[:900]}\nAnswer with one word."
        )
        r = requests.post(
            "https://api.cohere.com/v1/chat",
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={"model": "command-r", "message": prompt, "temperature": 0},
            timeout=12,
        )
        if r.status_code != 200:
            return None
        ans = (r.json().get("text") or "").strip().lower()
        if "polygon" in ans or "area" in ans:
            return "polygon"
        if "line" in ans:
            return "line"
        if "point" in ans:
            return "points"
    except Exception:
        return None
    return None


def _split_coords_by_jumps(coords: list, max_leg_nm: float) -> list:
    """Break one vertex list into geographically coherent segments (stops bleed / multi-feature glue)."""
    if not coords:
        return []
    segs = [[coords[0]]]
    for c in coords[1:]:
        prev = segs[-1][-1]
        if _haversine_nm(prev["lat"], prev["lon"], c["lat"], c["lon"]) > max_leg_nm:
            segs.append([c])
        else:
            segs[-1].append(c)
    return segs


def _seg_to_sub(seg: list, name: str, prefer_poly: bool) -> dict | None:
    if not seg:
        return None
    if len(seg) == 1:
        return {
            "name": name,
            "category": "point",
            "coords": seg,
            "points": [[seg[0]["lat"], seg[0]["lon"]]],
        }
    if len(seg) >= 3 and (
        prefer_poly or _ring_closed(seg) or _shoelace_deg2(seg) > 1e-6 or _span_nm(seg) < 25
    ):
        ring = _close_ring(seg)
        return {
            "name": name,
            "category": "restricted_area",
            "coords": ring,
            "points": [[c["lat"], c["lon"]] for c in ring],
        }
    # line segment
    return {
        "name": name,
        "category": "line",
        "coords": seg,
        "points": [[c["lat"], c["lon"]] for c in seg],
    }


def classify_notice_geometry(coords: list, text: str = "", *, prefer_area: bool = False) -> dict[str, Any]:
    """
    Returns:
      {
        kind: 'polygon'|'line'|'points'|'circle',
        isPolygon, isLine,
        coords,          # possibly rewritten (closed ring / circle)
        subPolygons,     # optional — used when multiple discrete features / jump splits
        confidence: 0..1,
        reason: str,
      }
    """
    coords = [c for c in (coords or []) if isinstance(c, dict) and "lat" in c and "lon" in c]
    text = text or ""
    # First non-empty line often is the subject (Depths. / Buoy. / …)
    first_line = ""
    for ln in text.splitlines():
        s = ln.strip()
        if s:
            first_line = s
            break
    n = len(coords)
    empty = {
        "kind": "points",
        "isPolygon": False,
        "isLine": False,
        "coords": coords,
        "subPolygons": None,
        "confidence": 1.0,
        "reason": "no_coords",
    }
    if n == 0:
        return empty

    circle_m = CIRCLE_RE.search(text)
    if circle_m and n == 1:
        rad = float(circle_m.group(1))
        if 0.1 <= rad <= 120:
            ring = generate_circle_ring(coords[0]["lat"], coords[0]["lon"], rad)
            return {
                "kind": "circle",
                "isPolygon": True,
                "isLine": False,
                "coords": ring,
                "subPolygons": [
                    {
                        "name": f"Circle {rad:g} NM",
                        "category": "radius_area",
                        "coords": ring,
                        "points": [[c["lat"], c["lon"]] for c in ring],
                        "radiusNm": rad,
                        "center": [coords[0]["lat"], coords[0]["lon"]],
                    }
                ],
                "confidence": 0.95,
                "reason": "circle_radius_keyword",
            }

    # Subject-only discrete (Buoy. / Depths. / Light.) — do NOT scan full body:
    # bled next-notice text often contains "Light." / "Buoy." and would false-trigger.
    discrete_subject = bool(DISCRETE_SUBJECT_RE.search(first_line))
    poly_kw = bool(POLYGON_RE.search(text))
    line_kw = bool(LINE_RE.search(text))
    area_soft = bool(AREA_SOFT_RE.search(text))
    # Depth / buoy / light chart corrections are ALWAYS points — "enclosed by contour"
    # and accidental "joining" from a bled next notice must not create mega-lines.
    if discrete_subject and not re.search(
        r"\b(?:FIRING|EXCLUSION|RESTRICTED\s+AREA|PROHIBITED\s+AREA|MARITIME\s+LIMIT)\b",
        first_line,
        re.I,
    ):
        # Keep ONLY the first geographic cluster — later clusters are almost always bleed
        segs = _split_coords_by_jumps(coords, MAX_CONNECT_NM_UKHO)
        primary = segs[0] if segs else coords
        pts = []
        seen = set()
        for c in primary:
            key = (round(c["lat"], 4), round(c["lon"], 4))
            if key in seen:
                continue
            seen.add(key)
            pts.append(c)
        return {
            "kind": "points",
            "isPolygon": False,
            "isLine": False,
            "coords": pts[:20],
            "subPolygons": None,
            "confidence": 0.93,
            "reason": "discrete_feature_table",
        }

    # Multiple "joining:" blocks (UKHO pecked maritime limits): prefer 4-vertex quads,
    # then fall back to a tight jump threshold so features never glue into a mega-line.
    join_count = len(re.findall(r"\bjoining\b", text, re.I))
    multi_join = join_count >= 2 or bool(re.search(r"maritime\s+limit|pecked\s+line", text, re.I))
    segs = None
    if multi_join and len(coords) >= 8:
        quads = []
        i = 0
        while i + 3 < len(coords):
            quad = coords[i : i + 4]
            if _span_nm(quad) <= 20:
                quads.append(quad)
                i += 4
            else:
                break
        if len(quads) >= 2:
            rest = coords[i:]
            segs = quads + (_split_coords_by_jumps(rest, 6.0) if rest else [])
    if segs is None:
        if multi_join:
            max_leg = 6.0
        elif prefer_area:
            max_leg = MAX_CONNECT_NM_NAVTEX
        else:
            max_leg = MAX_CONNECT_NM_UKHO
        segs = _split_coords_by_jumps(coords, max_leg)

    # Multi-feature after jump-split → subPolygons (plotter draws each ring/line separately)
    if len(segs) > 1:
        subs = []
        prefer_poly = poly_kw or area_soft or prefer_area
        for i, seg in enumerate(segs):
            # Drop tiny bleed crumbs that are a single stray point far away after a huge jump
            if len(seg) == 1 and i > 0 and len(segs[i - 1]) >= 2:
                # keep as point feature
                pass
            sub = _seg_to_sub(seg, f"Part {i + 1}", prefer_poly or (line_kw and len(seg) >= 4 and _ring_closed(seg)))
            if sub:
                # Closed 4-pt maritime limits with "joining" → polygon not line
                if (
                    line_kw
                    and len(seg) >= 3
                    and (_ring_closed(seg) or (len(seg) >= 4 and _span_nm(seg) < 30))
                ):
                    ring = _close_ring(seg)
                    sub = {
                        "name": f"Part {i + 1}",
                        "category": "restricted_area",
                        "coords": ring,
                        "points": [[c["lat"], c["lon"]] for c in ring],
                    }
                subs.append(sub)
        if not subs:
            return empty
        has_poly = any(len(s.get("points") or []) >= 3 and s.get("category") != "line" for s in subs)
        has_line = any(s.get("category") == "line" or len(s.get("points") or []) == 2 for s in subs)
        # Flat coords = first substantive segment (popup / centroid)
        primary = max(segs, key=len)
        return {
            "kind": "polygon" if has_poly else ("line" if has_line else "points"),
            "isPolygon": has_poly,
            "isLine": (not has_poly) and has_line,
            "coords": primary if not has_poly else _close_ring(primary) if len(primary) >= 3 else primary,
            "subPolygons": subs,
            "confidence": 0.9,
            "reason": "jump_split_multi_feature",
        }

    # Single coherent segment
    coords = segs[0] if segs else coords
    n = len(coords)
    span = _span_nm(coords)
    sane_cluster = span <= 250

    if n == 1:
        return {
            "kind": "points",
            "isPolygon": False,
            "isLine": False,
            "coords": coords,
            "subPolygons": None,
            "confidence": 1.0,
            "reason": "single_point",
        }

    if poly_kw and n >= 3 and sane_cluster:
        ring = _close_ring(coords)
        return {
            "kind": "polygon",
            "isPolygon": True,
            "isLine": False,
            "coords": ring,
            "subPolygons": [
                {
                    "name": "Area",
                    "category": "restricted_area",
                    "coords": ring,
                    "points": [[c["lat"], c["lon"]] for c in ring],
                }
            ],
            "confidence": 0.95,
            "reason": "polygon_keyword",
        }

    # "joining" maritime limits that form a small closed box → polygon, not one long line
    if line_kw and n >= 3 and (_ring_closed(coords) or (n >= 4 and span < 30)):
        ring = _close_ring(coords)
        return {
            "kind": "polygon",
            "isPolygon": True,
            "isLine": False,
            "coords": ring,
            "subPolygons": [
                {
                    "name": "Area",
                    "category": "restricted_area",
                    "coords": ring,
                    "points": [[c["lat"], c["lon"]] for c in ring],
                }
            ],
            "confidence": 0.9,
            "reason": "closed_joining_limit",
        }

    if line_kw and n >= 2 and not poly_kw:
        return {
            "kind": "line",
            "isPolygon": False,
            "isLine": True,
            "coords": coords,
            "subPolygons": None,
            "confidence": 0.92,
            "reason": "line_keyword",
        }

    if n == 2:
        # Two vertices hundreds of NM apart are almost never a real cable/track —
        # usually two unrelated positions bled into one notice.
        if span > 80 and not re.search(
            r"ALONG\s+THE\s+FOLLOWING\s+LINE|TRACKLINE|SUBMARINE\s+(?:CABLE|PIPELINE)|CABLE\s+RECOVERY",
            text,
            re.I,
        ):
            return {
                "kind": "points",
                "isPolygon": False,
                "isLine": False,
                "coords": coords,
                "subPolygons": None,
                "confidence": 0.8,
                "reason": "two_points_too_far",
            }
        return {
            "kind": "line",
            "isPolygon": False,
            "isLine": True,
            "coords": coords,
            "subPolygons": None,
            "confidence": 0.85,
            "reason": "two_points_line",
        }

    # Geometric inference for 3+ vertices
    if n >= 3 and sane_cluster:
        if _ring_closed(coords) or _shoelace_deg2(coords) > 1e-5:
            ring = _close_ring(coords)
            conf = 0.88 if (area_soft or prefer_area or poly_kw) else 0.72
            return {
                "kind": "polygon",
                "isPolygon": True,
                "isLine": False,
                "coords": ring,
                "subPolygons": [
                    {
                        "name": "Area",
                        "category": "restricted_area",
                        "coords": ring,
                        "points": [[c["lat"], c["lon"]] for c in ring],
                    }
                ],
                "confidence": conf,
                "reason": "closed_or_area_ring",
            }
        if _collinear(coords):
            return {
                "kind": "line",
                "isPolygon": False,
                "isLine": True,
                "coords": coords,
                "subPolygons": None,
                "confidence": 0.86,
                "reason": "collinear_vertices",
            }
        # Compact cluster of 3+ points with area soft language → treat as polygon
        if area_soft or prefer_area:
            ring = _close_ring(coords)
            return {
                "kind": "polygon",
                "isPolygon": True,
                "isLine": False,
                "coords": ring,
                "subPolygons": [
                    {
                        "name": "Area",
                        "category": "restricted_area",
                        "coords": ring,
                        "points": [[c["lat"], c["lon"]] for c in ring],
                    }
                ],
                "confidence": 0.78,
                "reason": "compact_area_cluster",
            }
        # Compact NAVTEX without discrete keywords: default to polygon (user pain point)
        if prefer_area or span < 80:
            ring = _close_ring(coords)
            result = {
                "kind": "polygon",
                "isPolygon": True,
                "isLine": False,
                "coords": ring,
                "subPolygons": [
                    {
                        "name": "Area",
                        "category": "restricted_area",
                        "coords": ring,
                        "points": [[c["lat"], c["lon"]] for c in ring],
                    }
                ],
                "confidence": 0.62,
                "reason": "compact_default_polygon",
            }
            if result["confidence"] < 0.7:
                ai = _cohere_classify(coords, text)
                if ai == "line":
                    return {
                        "kind": "line",
                        "isPolygon": False,
                        "isLine": True,
                        "coords": coords,
                        "subPolygons": None,
                        "confidence": 0.7,
                        "reason": "cohere_line",
                    }
                if ai == "points":
                    return {
                        "kind": "points",
                        "isPolygon": False,
                        "isLine": False,
                        "coords": coords,
                        "subPolygons": None,
                        "confidence": 0.7,
                        "reason": "cohere_points",
                    }
            return result

    # Wide scatter without keywords → leave as points (likely chart table)
    return {
        "kind": "points",
        "isPolygon": False,
        "isLine": False,
        "coords": coords,
        "subPolygons": None,
        "confidence": 0.55,
        "reason": "wide_or_ambiguous_points",
    }


def apply_geometry_to_notice(notice: dict, *, prefer_area: bool = False) -> dict:
    """Mutate notice with classified geometry flags / coords / subPolygons."""
    # Newlines keep subject as first_line for discrete detection (avoid body bleed)
    text = "\n".join(
        str(notice.get(k) or "")
        for k in ("subject", "title", "body", "rawText", "category")
    )
    src = str(notice.get("source") or "")
    typ = str(notice.get("type") or "")
    # Official NAVTEX / regional MSI almost always area-or-line when multi-point
    if not prefer_area:
        prefer_area = (
            typ.upper() == "NAVTEX"
            or "NAVAREA" in src.upper()
            or "NAVTEX" in src.upper()
            or "JCG" in src.upper()
            or "TAIWAN" in src.upper()
            or "AMSA" in src.upper()
            or "KHOA" in src.upper()
            or "MSA" in src.upper()
            or "BSH" in src.upper()
            or "SMA" in src.upper()
        )
    g = classify_notice_geometry(notice.get("coords") or [], text, prefer_area=prefer_area)
    notice["coords"] = g["coords"]
    notice["isPolygon"] = g["isPolygon"]
    notice["isLine"] = g["isLine"]
    notice["geometryKind"] = g["kind"]
    notice["geometryConfidence"] = g["confidence"]
    notice["geometryReason"] = g["reason"]
    if g.get("subPolygons"):
        existing = notice.get("subPolygons") or []
        # Prefer classifier multi-part split over a single stale ring
        if len(existing) <= 1 or len(g["subPolygons"]) > 1:
            name = str(notice.get("id") or "Area")
            subs = g["subPolygons"]
            for s in subs:
                if s.get("name") in ("Area", "Circle", None, "") or str(s.get("name", "")).startswith("Part "):
                    s["name"] = name if not str(s.get("name", "")).startswith("Part ") else f"{name} {s['name']}"
            notice["subPolygons"] = subs
    elif g["kind"] in ("points", "line") or not g["isPolygon"]:
        # Drop stale area rings when reclassified as points/line
        notice.pop("subPolygons", None)
    elif g["isPolygon"] and not notice.get("subPolygons"):
        ring = g["coords"]
        notice["subPolygons"] = [
            {
                "name": str(notice.get("id") or "Area"),
                "category": "restricted_area",
                "coords": ring,
                "points": [[c["lat"], c["lon"]] for c in ring],
            }
        ]
    if notice.get("coords"):
        notice["lat"] = notice["coords"][0]["lat"]
        notice["lon"] = notice["coords"][0]["lon"]
    return notice
