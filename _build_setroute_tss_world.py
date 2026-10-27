# -*- coding: utf-8 -*-
"""
Build assets/geo/setroute_tss_world.json from OSM/OpenSeaMap seamark TSS tags.

Sources (tried in order):
  1) Overpass mirrors (regional tiles)
  2) Optional local Overpass dump: _tmp_tss_overpass_world.json

Output scheme parts:
  - separation_zone  → closed rings [lat,lon] (hard ban)
  - traffic_lane     → closed rings + directionDeg (prefer)
  - traffic_lane_centerline → polyline + directionDeg (prefer when near/aligned)
  - precautionary_area → closed rings (caution)
"""
from __future__ import annotations

import json
import math
import time
from collections import Counter, defaultdict
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "assets" / "geo" / "setroute_tss_world.json"
OUT_PUBLIC = ROOT / "public" / "assets" / "geo" / "setroute_tss_world.json"

ENDPOINTS = [
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass-api.de/api/interpreter",
]
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; SetSail/5.x; +https://setsail-ai.vercel.app)",
    "Accept": "*/*",
}

# ~30° lon tiles, lat -60..72
WORLD_TILES = []
for west in range(-180, 180, 30):
    WORLD_TILES.append((west, -60, min(west + 30, 180), 72))

SEAMARK_TYPES = (
    "separation_zone",
    "separation_lane",
    "precautionary_area",
    "separation_boundary",
    "separation_line",
)


def bearing_deg(lat1, lon1, lat2, lon2) -> float:
    φ1 = math.radians(lat1)
    φ2 = math.radians(lat2)
    Δλ = math.radians(lon2 - lon1)
    y = math.sin(Δλ) * math.cos(φ2)
    x = math.cos(φ1) * math.sin(φ2) - math.sin(φ1) * math.cos(φ2) * math.cos(Δλ)
    return (math.degrees(math.atan2(y, x)) + 360.0) % 360.0


def polyline_direction(geom: list) -> float | None:
    if not geom or len(geom) < 2:
        return None
    # Weighted by segment length (approx degrees)
    ax = ay = 0.0
    for i in range(len(geom) - 1):
        a, b = geom[i], geom[i + 1]
        lat1, lon1 = a["lat"], a["lon"]
        lat2, lon2 = b["lat"], b["lon"]
        dlat = lat2 - lat1
        dlon = (lon2 - lon1) * math.cos(math.radians((lat1 + lat2) * 0.5))
        seg = math.hypot(dlat, dlon)
        if seg < 1e-9:
            continue
        br = math.radians(bearing_deg(lat1, lon1, lat2, lon2))
        ax += math.sin(br) * seg
        ay += math.cos(br) * seg
    if ax == 0 and ay == 0:
        a, b = geom[0], geom[-1]
        return bearing_deg(a["lat"], a["lon"], b["lat"], b["lon"])
    return (math.degrees(math.atan2(ax, ay)) + 360.0) % 360.0


def is_closed(geom: list, eps=1e-5) -> bool:
    if not geom or len(geom) < 4:
        return False
    a, b = geom[0], geom[-1]
    return abs(a["lat"] - b["lat"]) < eps and abs(a["lon"] - b["lon"]) < eps


def ring_from_geom(geom: list) -> list:
    ring = [[p["lat"], p["lon"]] for p in geom]
    if ring and (ring[0][0] != ring[-1][0] or ring[0][1] != ring[-1][1]):
        ring.append(ring[0][:])
    return ring


def simplify_ring(ring: list, max_pts=48) -> list:
    if len(ring) <= max_pts:
        return ring
    step = max(1, (len(ring) - 1) // (max_pts - 1))
    out = ring[::step]
    if out[-1] != ring[-1]:
        out.append(ring[-1])
    return out


def post_overpass(q: str) -> dict:
    last = None
    for ep in ENDPOINTS:
        try:
            r = requests.post(ep, data={"data": q}, timeout=240, headers=HEADERS)
            print(f"  {ep} -> {r.status_code} {len(r.content)}")
            if r.status_code == 200 and r.content[:1] == b"{":
                return r.json()
            last = r.text[:180]
        except Exception as e:
            print(f"  FAIL {ep}: {type(e).__name__}: {e}")
            last = str(e)
        time.sleep(1.2)
    raise RuntimeError(last or "overpass failed")


def fetch_world_elements() -> list:
    cache = ROOT / "_tmp_tss_overpass_world.json"
    if cache.exists() and cache.stat().st_size > 1000:
        print("using cache", cache)
        return json.loads(cache.read_text(encoding="utf-8")).get("elements") or []

    all_els = []
    seen = set()
    for west, south, east, north in WORLD_TILES:
        parts = "\n".join(
            f'  way["seamark:type"="{t}"]({south},{west},{north},{east});\n'
            f'  relation["seamark:type"="{t}"]({south},{west},{north},{east});'
            for t in SEAMARK_TYPES
        )
        q = f"[out:json][timeout:180];\n(\n{parts}\n);\nout geom;\n"
        print(f"bbox {west},{south}..{east},{north}")
        try:
            d = post_overpass(q)
            n_new = 0
            for e in d.get("elements") or []:
                key = (e.get("type"), e.get("id"))
                if key in seen:
                    continue
                seen.add(key)
                all_els.append(e)
                n_new += 1
            print(f"  +{n_new} cumulative={len(all_els)}")
        except Exception as e:
            print(f"  SKIP: {e}")
        time.sleep(2.0)

    cache.write_text(json.dumps({"elements": all_els}, ensure_ascii=False), encoding="utf-8")
    print("cached", cache, "elements", len(all_els))
    return all_els


def relation_rings(el: dict) -> list:
    """Extract outer rings from relation members that already have geometry."""
    rings = []
    members = el.get("members") or []
    # Prefer multipolygon outer members with geometry
    for m in members:
        if m.get("type") != "way":
            continue
        role = (m.get("role") or "outer").lower()
        if role not in ("outer", ""):
            continue
        geom = m.get("geometry") or []
        if is_closed(geom) or len(geom) >= 4:
            rings.append(simplify_ring(ring_from_geom(geom)))
    return rings


def cluster_key(lat: float, lon: float) -> str:
    # ~1° cells for grouping into regional schemes
    return f"{int(math.floor(lat))}_{int(math.floor(lon))}"


def build_schemes(elements: list) -> dict:
    schemes_map = defaultdict(lambda: {"parts": [], "name_hits": Counter()})
    type_counts = Counter()

    for el in elements:
        tags = el.get("tags") or {}
        st = tags.get("seamark:type")
        if st not in ("separation_zone", "separation_lane", "precautionary_area"):
            continue
        type_counts[st] += 1
        name = tags.get("seamark:name") or tags.get("name") or ""
        geom = el.get("geometry")
        rings = []
        centerline = None

        if el.get("type") == "relation":
            rings = relation_rings(el)
            if not rings and geom:
                rings = [simplify_ring(ring_from_geom(geom))]
        elif geom:
            if st == "separation_lane" and not is_closed(geom):
                # Directed centerline (chart arrow)
                pts = [[p["lat"], p["lon"]] for p in geom]
                if len(pts) >= 2:
                    centerline = pts
            elif len(geom) >= 3:
                rings = [simplify_ring(ring_from_geom(geom))]

        # Orientation: OSM way direction, or explicit tag if present
        orient = None
        for k in (
            "seamark:orientation",
            "seamark:traffic_separation_scheme:orientation",
            "orientation",
            "direction",
        ):
            if k in tags:
                try:
                    orient = float(str(tags[k]).replace("°", "").strip())
                    break
                except ValueError:
                    pass
        if orient is None and geom and len(geom) >= 2:
            orient = polyline_direction(geom)

        # Pick a representative point for clustering
        rep = None
        if centerline:
            mid = centerline[len(centerline) // 2]
            rep = (mid[0], mid[1])
        elif rings and rings[0]:
            rep = (rings[0][0][0], rings[0][0][1])
        elif geom:
            rep = (geom[0]["lat"], geom[0]["lon"])
        if not rep:
            continue
        ck = cluster_key(rep[0], rep[1])
        bucket = schemes_map[ck]
        if name:
            bucket["name_hits"][name] += 1

        if st == "separation_zone":
            for ring in rings:
                if len(ring) >= 4:
                    bucket["parts"].append(
                        {
                            "category": "separation_zone",
                            "osmId": el.get("id"),
                            "ring": ring,
                        }
                    )
        elif st == "precautionary_area":
            for ring in rings:
                if len(ring) >= 4:
                    bucket["parts"].append(
                        {
                            "category": "precautionary_area",
                            "name": name or "Precautionary area",
                            "osmId": el.get("id"),
                            "ring": ring,
                        }
                    )
        elif st == "separation_lane":
            if centerline:
                bucket["parts"].append(
                    {
                        "category": "traffic_lane_centerline",
                        "name": name or "Traffic lane",
                        "osmId": el.get("id"),
                        "directionDeg": None if orient is None else round(orient, 1),
                        "line": centerline,
                        # Corridor half-width (nm) for near-lane preference
                        "halfWidthNm": 0.55,
                    }
                )
            for ring in rings:
                if len(ring) >= 4:
                    bucket["parts"].append(
                        {
                            "category": "traffic_lane",
                            "name": name or "Traffic lane",
                            "osmId": el.get("id"),
                            "directionDeg": None if orient is None else round(orient, 1),
                            "ring": ring,
                        }
                    )

    schemes = []
    for ck, bucket in schemes_map.items():
        if not bucket["parts"]:
            continue
        # Drop empty clusters / noise
        n_useful = sum(
            1
            for p in bucket["parts"]
            if p["category"] in ("separation_zone", "traffic_lane", "traffic_lane_centerline")
        )
        if n_useful < 1:
            continue
        top_name = bucket["name_hits"].most_common(1)
        name = top_name[0][0] if top_name else f"TSS {ck.replace('_', ',')}"
        schemes.append(
            {
                "id": f"osm_tss_{ck}",
                "name": name if "TSS" in name.upper() or "SCHEME" in name.upper() else f"{name} TSS".strip(),
                "colreg": "Rule 10",
                "source": "OpenSeaMap/OSM seamark",
                "parts": bucket["parts"],
            }
        )

    schemes.sort(key=lambda s: s["id"])
    return {
        "version": 1,
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "OpenStreetMap / OpenSeaMap seamark:type separation_* (ODbL)",
        "counts": {
            "schemes": len(schemes),
            "parts": sum(len(s["parts"]) for s in schemes),
            "rawTypes": dict(type_counts),
        },
        "schemes": schemes,
    }


def main():
    # Seed with Singapore probe if world fetch is incomplete
    elements = fetch_world_elements()
    sg = ROOT / "_tmp_tss_sg.json"
    if sg.exists():
        seen = {(e.get("type"), e.get("id")) for e in elements}
        for e in json.loads(sg.read_text(encoding="utf-8")).get("elements") or []:
            key = (e.get("type"), e.get("id"))
            if key not in seen:
                elements.append(e)
                seen.add(key)

    print("elements total", len(elements), Counter((e.get("tags") or {}).get("seamark:type") for e in elements))
    data = build_schemes(elements)
    print("schemes", data["counts"])
    OUT.parent.mkdir(parents=True, exist_ok=True)
    text = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    OUT.write_text(text, encoding="utf-8")
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.write_text(text, encoding="utf-8")
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
