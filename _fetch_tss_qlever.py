# -*- coding: utf-8 -*-
"""Fetch OSM TSS seamarks via QLever, convert to Overpass-like elements, build world JSON."""
from __future__ import annotations

import json
import math
import re
import time
from collections import Counter, defaultdict
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent
QLEVER = "https://qlever.cs.uni-freiburg.de/api/osm-planet"
OUT = ROOT / "assets" / "geo" / "setroute_tss_world.json"
OUT_PUBLIC = ROOT / "public" / "assets" / "geo" / "setroute_tss_world.json"

SPARQL = """
PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
SELECT ?osmId ?type ?wkt WHERE {
  VALUES ?type { "separation_lane" "separation_zone" "precautionary_area" }
  ?osmId osmkey:seamark:type ?type .
  ?osmId geo:hasGeometry/geo:asWKT ?wkt .
}
LIMIT 100000
"""

WKT_POINT = re.compile(r"POINT\s*\(\s*([-\d.eE]+)\s+([-\d.eE]+)\s*\)", re.I)
WKT_LINE = re.compile(r"(?:LINESTRING|MULTILINESTRING)\s*\(", re.I)
WKT_POLY = re.compile(r"(?:POLYGON|MULTIPOLYGON)\s*\(", re.I)
COORD = re.compile(r"([-\d.eE]+)\s+([-\d.eE]+)")


def parse_wkt(wkt: str):
    """Return (kind, geom_list[{lat,lon}]) where kind in point|line|poly."""
    if not wkt:
        return None, []
    # Strip CRS prefix: <http://...> POINT(...)
    if wkt.startswith("<"):
        gt = wkt.find(">")
        if gt >= 0:
            wkt = wkt[gt + 1 :].strip()
    m = WKT_POINT.search(wkt)
    if m:
        lon, lat = float(m.group(1)), float(m.group(2))
        return "point", [{"lat": lat, "lon": lon}]
    # Extract all coordinate pairs in order (sufficient for our rings/lines)
    coords = [(float(lon), float(lat)) for lon, lat in COORD.findall(wkt)]
    if not coords:
        return None, []
    geom = [{"lat": lat, "lon": lon} for lon, lat in coords]
    if WKT_POLY.search(wkt):
        return "poly", geom
    if WKT_LINE.search(wkt):
        return "line", geom
    # Fallback: closed → poly else line
    if len(geom) >= 4 and abs(geom[0]["lat"] - geom[-1]["lat"]) < 1e-5 and abs(geom[0]["lon"] - geom[-1]["lon"]) < 1e-5:
        return "poly", geom
    return "line", geom


def osm_id_from_uri(uri: str):
    # https://www.openstreetmap.org/way/123 or /relation/456
    m = re.search(r"/(way|relation|node)/(\d+)", uri or "")
    if not m:
        return None, None
    return m.group(1), int(m.group(2))


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


def is_closed(geom, eps=1e-5):
    if not geom or len(geom) < 4:
        return False
    a, b = geom[0], geom[-1]
    return abs(a["lat"] - b["lat"]) < eps and abs(a["lon"] - b["lon"]) < eps


def ring_from_geom(geom):
    ring = [[p["lat"], p["lon"]] for p in geom]
    if ring and (ring[0][0] != ring[-1][0] or ring[0][1] != ring[-1][1]):
        ring.append(ring[0][:])
    return ring


def simplify_ring(ring, max_pts=48):
    if len(ring) <= max_pts:
        return ring
    step = max(1, (len(ring) - 1) // (max_pts - 1))
    out = ring[::step]
    if out[-1] != ring[-1]:
        out.append(ring[-1])
    return out


def simplify_line(line, max_pts=32):
    if len(line) <= max_pts:
        return line
    step = max(1, (len(line) - 1) // (max_pts - 1))
    out = line[::step]
    if out[-1] != line[-1]:
        out.append(line[-1])
    return out


def cluster_key(lat, lon):
    return f"{int(math.floor(lat))}_{int(math.floor(lon))}"


def fetch_qlever():
    print("QLever query…")
    r = requests.post(
        QLEVER,
        data={"query": SPARQL},
        headers={
            "Accept": "application/sparql-results+json",
            "User-Agent": "SetSail/5.x (+https://setsail-ai.vercel.app)",
        },
        timeout=180,
    )
    print("status", r.status_code, "bytes", len(r.content))
    r.raise_for_status()
    data = r.json()
    bindings = (data.get("results") or {}).get("bindings") or []
    print("bindings", len(bindings))
    ROOT.joinpath("_tmp_tss_qlever.json").write_text(json.dumps(data), encoding="utf-8")
    return bindings


def bindings_to_elements(bindings):
    els = []
    for b in bindings:
        uri = (b.get("osmId") or {}).get("value")
        typ = (b.get("type") or {}).get("value")
        wkt = (b.get("wkt") or {}).get("value")
        kind, geom = parse_wkt(wkt)
        ot, oid = osm_id_from_uri(uri)
        if not ot or not oid or not geom or kind == "point":
            continue
        els.append(
            {
                "type": ot,
                "id": oid,
                "geometry": geom,
                "tags": {"seamark:type": typ},
                "_kind": kind,
            }
        )
    return els


def merge_sg_probe(elements):
    sg = ROOT / "_tmp_tss_sg.json"
    if not sg.exists():
        return elements
    seen = {(e.get("type"), e.get("id")) for e in elements}
    for e in json.loads(sg.read_text(encoding="utf-8")).get("elements") or []:
        key = (e.get("type"), e.get("id"))
        if key in seen:
            continue
        st = (e.get("tags") or {}).get("seamark:type")
        if st not in ("separation_lane", "separation_zone", "precautionary_area"):
            continue
        elements.append(e)
        seen.add(key)
    return elements


def build_schemes(elements):
    schemes_map = defaultdict(lambda: {"parts": [], "name_hits": Counter()})
    type_counts = Counter()

    for el in elements:
        tags = el.get("tags") or {}
        st = tags.get("seamark:type")
        if st not in ("separation_zone", "separation_lane", "precautionary_area"):
            continue
        type_counts[st] += 1
        name = tags.get("seamark:name") or tags.get("name") or ""
        geom = el.get("geometry") or []
        if len(geom) < 2:
            continue
        closed = is_closed(geom) or el.get("_kind") == "poly"

        orient = polyline_direction(geom)
        if closed:
            mid = geom[len(geom) // 2]
            rep = (mid["lat"], mid["lon"])
        else:
            mid = geom[len(geom) // 2]
            rep = (mid["lat"], mid["lon"])
        ck = cluster_key(rep[0], rep[1])
        bucket = schemes_map[ck]
        if name:
            bucket["name_hits"][name] += 1

        if st == "separation_zone":
            if closed or len(geom) >= 3:
                ring = simplify_ring(ring_from_geom(geom))
                if len(ring) >= 4:
                    bucket["parts"].append(
                        {"category": "separation_zone", "osmId": el.get("id"), "ring": ring}
                    )
        elif st == "precautionary_area":
            if closed or len(geom) >= 3:
                ring = simplify_ring(ring_from_geom(geom))
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
            if closed and len(geom) >= 4:
                ring = simplify_ring(ring_from_geom(geom))
                bucket["parts"].append(
                    {
                        "category": "traffic_lane",
                        "name": name or "Traffic lane",
                        "osmId": el.get("id"),
                        "directionDeg": None if orient is None else round(orient, 1),
                        "ring": ring,
                    }
                )
            else:
                line = simplify_line([[p["lat"], p["lon"]] for p in geom])
                if len(line) >= 2:
                    bucket["parts"].append(
                        {
                            "category": "traffic_lane_centerline",
                            "name": name or "Traffic lane",
                            "osmId": el.get("id"),
                            "directionDeg": None if orient is None else round(orient, 1),
                            "line": line,
                            "halfWidthNm": 0.55,
                        }
                    )

    schemes = []
    for ck, bucket in schemes_map.items():
        n_useful = sum(
            1
            for p in bucket["parts"]
            if p["category"] in ("separation_zone", "traffic_lane", "traffic_lane_centerline")
        )
        if n_useful < 1:
            continue
        top = bucket["name_hits"].most_common(1)
        name = top[0][0] if top else f"TSS {ck.replace('_', ',')}"
        if "TSS" not in name.upper() and "SCHEME" not in name.upper():
            name = f"{name} TSS".strip()
        schemes.append(
            {
                "id": f"osm_tss_{ck}",
                "name": name,
                "colreg": "Rule 10",
                "source": "OpenSeaMap/OSM seamark (QLever)",
                "parts": bucket["parts"],
            }
        )
    schemes.sort(key=lambda s: s["id"])
    return {
        "version": 1,
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "OpenStreetMap / OpenSeaMap seamark:type via QLever (ODbL)",
        "counts": {
            "schemes": len(schemes),
            "parts": sum(len(s["parts"]) for s in schemes),
            "rawTypes": dict(type_counts),
        },
        "schemes": schemes,
    }


def main():
    bindings = fetch_qlever()
    elements = bindings_to_elements(bindings)
    print("parsed elements", len(elements), Counter((e.get("tags") or {}).get("seamark:type") for e in elements))
    elements = merge_sg_probe(elements)
    print("with SG probe", len(elements))
    data = build_schemes(elements)
    print("schemes", data["counts"])
    text = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text, encoding="utf-8")
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.write_text(text, encoding="utf-8")
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
