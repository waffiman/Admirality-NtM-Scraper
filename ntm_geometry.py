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
    r"NM\s+BLOCKS?|CHART\s+CORRECTION)\b|"
    r"\b(?:Depth|Depths|Drying\s+height|Obstructions?|Wrecks?|Sounding)\s+Position\b",
    re.I,
)
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


def classify_notice_geometry(coords: list, text: str = "", *, prefer_area: bool = False) -> dict[str, Any]:
    """
    Returns:
      {
        kind: 'polygon'|'line'|'points'|'circle',
        isPolygon, isLine,
        coords,          # possibly rewritten (closed ring / circle)
        subPolygons,     # optional
        confidence: 0..1,
        reason: str,
      }
    """
    coords = [c for c in (coords or []) if isinstance(c, dict) and "lat" in c and "lon" in c]
    text = text or ""
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

    discrete = bool(DISCRETE_RE.search(text))
    poly_kw = bool(POLYGON_RE.search(text))
    line_kw = bool(LINE_RE.search(text))
    area_soft = bool(AREA_SOFT_RE.search(text))
    span = _span_nm(coords)
    sane_cluster = span <= 250  # NM — typical coastal warning footprint

    if discrete and not poly_kw and not (line_kw and n >= 2 and "JOINING" in text.upper()):
        # Buoyage / lights / discrete chart corrections stay as point clouds
        return {
            "kind": "points",
            "isPolygon": False,
            "isLine": False,
            "coords": coords,
            "subPolygons": None,
            "confidence": 0.9,
            "reason": "discrete_feature_table",
        }

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
    text = " ".join(
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
        # Keep existing multi-ring WFS subPolygons if richer
        existing = notice.get("subPolygons") or []
        if len(existing) <= 1:
            name = str(notice.get("id") or "Area")
            subs = g["subPolygons"]
            for s in subs:
                s["name"] = name if s.get("name") in ("Area", "Circle") or not s.get("name") else s["name"]
            notice["subPolygons"] = subs
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
