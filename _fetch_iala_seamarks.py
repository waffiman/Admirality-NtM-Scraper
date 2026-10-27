# -*- coding: utf-8 -*-
"""Fetch world IALA lateral + cardinal seamarks via QLever → setroute_iala_marks.json."""
from __future__ import annotations

import json
import math
import re
import time
from collections import Counter
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent
QLEVER = "https://qlever.cs.uni-freiburg.de/api/osm-planet"
OUT = ROOT / "assets" / "geo" / "setroute_iala_marks.json"
OUT_PUBLIC = ROOT / "public" / "assets" / "geo" / "setroute_iala_marks.json"

# Focus on buoy/beacon lateral & cardinal (chart-visible approach aids)
SPARQL = """
PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
SELECT ?osmId ?stype ?category ?colour ?shape ?system ?wkt WHERE {
  VALUES ?stype {
    "buoy_lateral" "beacon_lateral"
    "buoy_cardinal" "beacon_cardinal"
  }
  ?osmId osmkey:seamark:type ?stype .
  OPTIONAL { ?osmId osmkey:seamark:buoy_lateral:category ?category . }
  OPTIONAL { ?osmId osmkey:seamark:beacon_lateral:category ?category . }
  OPTIONAL { ?osmId osmkey:seamark:buoy_cardinal:category ?category . }
  OPTIONAL { ?osmId osmkey:seamark:beacon_cardinal:category ?category . }
  OPTIONAL { ?osmId osmkey:seamark:buoy_lateral:colour ?colour . }
  OPTIONAL { ?osmId osmkey:seamark:beacon_lateral:colour ?colour . }
  OPTIONAL { ?osmId osmkey:seamark:buoy_cardinal:colour ?colour . }
  OPTIONAL { ?osmId osmkey:seamark:beacon_cardinal:colour ?colour . }
  OPTIONAL { ?osmId osmkey:seamark:buoy_lateral:shape ?shape . }
  OPTIONAL { ?osmId osmkey:seamark:beacon_lateral:shape ?shape . }
  OPTIONAL { ?osmId osmkey:seamark:system ?system . }
  ?osmId geo:hasGeometry/geo:asWKT ?wkt .
}
LIMIT 200000
"""

COORD = re.compile(r"([-\d.eE]+)\s+([-\d.eE]+)")


def parse_point(wkt: str):
    if not wkt:
        return None
    if wkt.startswith("<"):
        gt = wkt.find(">")
        if gt >= 0:
            wkt = wkt[gt + 1 :].strip()
    coords = COORD.findall(wkt)
    if not coords:
        return None
    lon, lat = float(coords[0][0]), float(coords[0][1])
    return [round(lat, 5), round(lon, 5)]


def osm_id(uri: str):
    m = re.search(r"/(way|relation|node)/(\d+)", uri or "")
    return (m.group(1), int(m.group(2))) if m else (None, None)


def classify(stype: str, category: str, colour: str, shape: str, system: str):
    st = (stype or "").lower()
    cat = (category or "").lower().replace(" ", "_")
    col = (colour or "").lower().replace(" ", "")
    shp = (shape or "").lower()
    sys = (system or "").lower()

    kind = "lateral" if "lateral" in st else "cardinal" if "cardinal" in st else "other"
    role = None
    cardinal = None

    if kind == "lateral":
        if cat in ("port", "port_hand", "hand_port"):
            role = "port"
        elif cat in ("starboard", "starboard_hand", "hand_starboard"):
            role = "starboard"
        elif cat in ("preferred_channel_port", "preferred_channel_to_port"):
            role = "preferred_channel_port"
        elif cat in ("preferred_channel_starboard", "preferred_channel_to_starboard"):
            role = "preferred_channel_starboard"
        elif "red" in col and "green" not in col:
            # colour heuristic only when category missing — depends on IALA region at use-time
            role = "colour_red"
        elif "green" in col and "red" not in col:
            role = "colour_green"
    else:
        if cat in ("north", "n"):
            cardinal = "N"
        elif cat in ("east", "e"):
            cardinal = "E"
        elif cat in ("south", "s"):
            cardinal = "S"
        elif cat in ("west", "w"):
            cardinal = "W"
        elif col.startswith("black;yellow") or col == "black,yellow":
            cardinal = "N"
        elif col.startswith("yellow;black") or col == "yellow,black":
            # Could be S or need topmark — yellow over black = South in both systems
            if "yellow;black;yellow" in col or col.count("yellow") >= 2:
                cardinal = "W"
            else:
                cardinal = "S"
        elif "black;yellow;black" in col:
            cardinal = "E"
        elif "yellow;black;yellow" in col:
            cardinal = "W"

    return {
        "kind": kind,
        "role": role,
        "cardinal": cardinal,
        "colour": colour or None,
        "shape": shape or None,
        "systemHint": sys or None,
        "stype": stype,
    }


def main():
    print("QLever IALA marks…")
    r = requests.post(
        QLEVER,
        data={"query": SPARQL},
        headers={
            "Accept": "application/sparql-results+json",
            "User-Agent": "SetSail/5.x (+https://setsail-ai.vercel.app)",
        },
        timeout=240,
    )
    print("status", r.status_code, "bytes", len(r.content))
    r.raise_for_status()
    bindings = (r.json().get("results") or {}).get("bindings") or []
    print("bindings", len(bindings))

    role_map = {
        "port": "P",
        "starboard": "S",
        "preferred_channel_port": "Pp",
        "preferred_channel_starboard": "Ps",
        "colour_red": "R",
        "colour_green": "G",
    }
    marks = []
    seen = set()
    role_counts = Counter()
    cardinal_counts = Counter()
    for b in bindings:
        uri = (b.get("osmId") or {}).get("value")
        ot, oid = osm_id(uri)
        if not oid or (ot, oid) in seen:
            continue
        seen.add((ot, oid))
        pt = parse_point((b.get("wkt") or {}).get("value"))
        if not pt:
            continue
        meta = classify(
            (b.get("stype") or {}).get("value"),
            (b.get("category") or {}).get("value"),
            (b.get("colour") or {}).get("value"),
            (b.get("shape") or {}).get("value"),
            (b.get("system") or {}).get("value"),
        )
        if meta["kind"] == "lateral":
            r = role_map.get(meta.get("role") or "", "?")
            role_counts[r] += 1
            marks.append([round(pt[0], 4), round(pt[1], 4), 0, r])
        elif meta["kind"] == "cardinal" and meta.get("cardinal"):
            cardinal_counts[meta["cardinal"]] += 1
            marks.append([round(pt[0], 4), round(pt[1], 4), 1, meta["cardinal"]])

    print("marks", len(marks), "lateral", sum(1 for m in marks if m[2] == 0), "cardinal", sum(1 for m in marks if m[2] == 1))
    print("lateral roles", role_counts)
    print("cardinals", cardinal_counts)

    data = {
        "version": 1,
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "OpenStreetMap / OpenSeaMap seamark buoy|beacon lateral+cardinal via QLever (ODbL)",
        "legend": {
            "kind": {"0": "lateral", "1": "cardinal"},
            "lateralRole": role_map,
            "cardinal": "N|E|S|W",
        },
        "counts": {
            "total": len(marks),
            "lateral": sum(1 for m in marks if m[2] == 0),
            "cardinal": sum(1 for m in marks if m[2] == 1),
        },
        "marks": marks,
    }
    text = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text, encoding="utf-8")
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.write_text(text, encoding="utf-8")
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
