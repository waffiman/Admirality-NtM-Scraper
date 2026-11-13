# -*- coding: utf-8 -*-
"""Fetch OSM seamark lights + sectors via QLever → setroute_light_sectors.json.

OpenSeaMap sector bearings are from the observer looking toward the light
(from seaward). When drawing wedges FROM the light, add 180° (reciprocal).
Lights without sector_start/end are treated as a full 360° sector.
IALA lateral/cardinal marks are intentionally excluded.
"""
from __future__ import annotations

import json
import math
import re
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent
QLEVER = "https://qlever.cs.uni-freiburg.de/api/osm-planet"
OUT = ROOT / "assets" / "geo" / "setroute_light_sectors.json"
OUT_PUBLIC = ROOT / "public" / "assets" / "geo" / "setroute_light_sectors.json"

LIGHT_TYPES = (
    "light_major",
    "light_minor",
    "lighthouse",
    "light_float",
    "light_vessel",
)

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
    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        return None
    return round(lat, 6), round(lon, 6)


def osm_id(uri: str):
    m = re.search(r"/(way|relation|node)/(\d+)", uri or "")
    return (m.group(1), int(m.group(2))) if m else (None, None)


def parse_bearing(raw):
    if raw is None:
        return None
    s = str(raw).strip().replace(",", ".")
    # allow "045", "45.5", "45°"
    s = s.replace("°", "").replace("deg", "").strip()
    try:
        v = float(s)
    except ValueError:
        return None
    if not math.isfinite(v):
        return None
    # normalize 0..360
    v = v % 360.0
    if v < 0:
        v += 360.0
    return round(v, 2)


def norm_colour(raw):
    if not raw:
        return "white"
    # first colour if semicolon/comma list (rare on light sectors)
    c = str(raw).strip().lower().split(";")[0].split(",")[0].strip()
    aliases = {
        "w": "white",
        "wh": "white",
        "r": "red",
        "g": "green",
        "gn": "green",
        "y": "yellow",
        "ye": "yellow",
        "am": "yellow",
        "amber": "yellow",
        "or": "orange",
        "bu": "blue",
        "bl": "blue",
        "vi": "violet",
        "mag": "magenta",
        "purple": "violet",
    }
    return aliases.get(c, c) or "white"


def run_sparql(sparql: str, timeout: int = 300, retries: int = 3):
    last = None
    for attempt in range(retries):
        try:
            r = requests.post(
                QLEVER,
                data={"query": sparql},
                headers={
                    "Accept": "application/sparql-results+json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout=timeout,
            )
            if r.status_code >= 500:
                last = RuntimeError(f"HTTP {r.status_code}: {r.text[:200]}")
                time.sleep(2 + attempt * 2)
                continue
            r.raise_for_status()
            return r.json()
        except Exception as e:
            last = e
            time.sleep(2 + attempt * 2)
    raise last  # type: ignore[misc]


def fetch_numbered(n: int):
    """Fetch light:N colour (+ optional sector) for major light types."""
    prefix = f"seamark:light:{n}:"
    types = " ".join(f'"{t}"' for t in LIGHT_TYPES)
    sparql = f"""
PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
SELECT ?osmId ?stype ?name ?colour ?character ?start ?end ?range ?wkt WHERE {{
  VALUES ?stype {{ {types} }}
  ?osmId osmkey:seamark:type ?stype .
  ?osmId osmkey:seamark:light:{n}:colour ?colour .
  OPTIONAL {{ ?osmId osmkey:seamark:light:{n}:sector_start ?start . }}
  OPTIONAL {{ ?osmId osmkey:seamark:light:{n}:sector_end ?end . }}
  OPTIONAL {{ ?osmId osmkey:seamark:light:{n}:character ?character . }}
  OPTIONAL {{ ?osmId osmkey:seamark:light:{n}:range ?range . }}
  OPTIONAL {{ ?osmId osmkey:seamark:name ?name . }}
  ?osmId geo:hasGeometry/geo:asWKT ?wkt .
}}
LIMIT 200000
"""
    print(f"Query light:{n} ...", flush=True)
    data = run_sparql(sparql)
    rows = data["results"]["bindings"]
    print(f"  -> {len(rows)} rows", flush=True)
    return rows, n


def fetch_unnumbered():
    """Unnumbered seamark:light:colour (single all-round / simple lights)."""
    types = " ".join(f'"{t}"' for t in LIGHT_TYPES)
    sparql = f"""
PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
SELECT ?osmId ?stype ?name ?colour ?character ?start ?end ?range ?wkt WHERE {{
  VALUES ?stype {{ {types} }}
  ?osmId osmkey:seamark:type ?stype .
  ?osmId osmkey:seamark:light:colour ?colour .
  OPTIONAL {{ ?osmId osmkey:seamark:light:sector_start ?start . }}
  OPTIONAL {{ ?osmId osmkey:seamark:light:sector_end ?end . }}
  OPTIONAL {{ ?osmId osmkey:seamark:light:character ?character . }}
  OPTIONAL {{ ?osmId osmkey:seamark:light:range ?range . }}
  OPTIONAL {{ ?osmId osmkey:seamark:name ?name . }}
  ?osmId geo:hasGeometry/geo:asWKT ?wkt .
}}
LIMIT 200000
"""
    print("Query light (unnumbered) ...", flush=True)
    data = run_sparql(sparql)
    rows = data["results"]["bindings"]
    print(f"  -> {len(rows)} rows", flush=True)
    return rows, 0


def row_val(b, key):
    return b[key]["value"] if key in b else None


def ingest(rows, channel: int, by_id: dict):
    for b in rows:
        uri = row_val(b, "osmId")
        kind, oid = osm_id(uri or "")
        if oid is None:
            continue
        pt = parse_point(row_val(b, "wkt") or "")
        if not pt:
            continue
        lat, lon = pt
        colour = norm_colour(row_val(b, "colour"))
        start = parse_bearing(row_val(b, "start"))
        end = parse_bearing(row_val(b, "end"))
        # no sector tags → full circle
        if start is None and end is None:
            start, end = 0.0, 360.0
        elif start is None:
            start = end
        elif end is None:
            end = start

        key = f"{kind}/{oid}"
        rec = by_id.get(key)
        if not rec:
            rec = {
                "id": key,
                "lat": lat,
                "lon": lon,
                "type": row_val(b, "stype") or "light",
                "name": row_val(b, "name"),
                "sectors": [],
            }
            by_id[key] = rec
        else:
            # keep a name if we get one later
            if not rec.get("name") and row_val(b, "name"):
                rec["name"] = row_val(b, "name")

        # OpenSeaMap chart wedge = observer bearing + 180°
        draw_start = round((start + 180.0) % 360.0, 2)
        draw_end = round((end + 180.0) % 360.0, 2)
        # full circle special-case: keep 0→360 so renderer draws disk
        if abs((end - start) % 360.0) < 1e-6 or (start == 0.0 and end == 360.0):
            draw_start, draw_end = 0.0, 360.0

        sector = {
            "n": channel,
            "colour": colour,
            "start": start,  # observer→light (OSM raw)
            "end": end,
            "drawStart": draw_start,  # from light (chart wedge)
            "drawEnd": draw_end,
        }
        ch = row_val(b, "character")
        if ch:
            sector["character"] = ch
        rng = row_val(b, "range")
        if rng:
            try:
                sector["range"] = float(str(rng).replace(",", "."))
            except ValueError:
                pass

        # Prefer numbered sector channels over a redundant unnumbered full-circle
        is_full = sector["drawStart"] == 0.0 and sector["drawEnd"] == 360.0
        if channel == 0 and is_full and any(s.get("n", 0) > 0 for s in rec["sectors"]):
            continue
        if is_full and any(
            s.get("colour") == colour and s["drawStart"] == 0.0 and s["drawEnd"] == 360.0
            for s in rec["sectors"]
        ):
            continue

        # dedupe identical wedges
        sig = (sector["colour"], sector["drawStart"], sector["drawEnd"], sector.get("n"))
        existing = {(s["colour"], s["drawStart"], s["drawEnd"], s.get("n")) for s in rec["sectors"]}
        if sig not in existing:
            rec["sectors"].append(sector)


def main():
    by_id: dict = {}
    # numbered channels 1..6 cover nearly all multi-sector lights
    for n in range(1, 7):
        rows, ch = fetch_numbered(n)
        ingest(rows, ch, by_id)
        time.sleep(0.4)
    rows, ch = fetch_unnumbered()
    ingest(rows, ch, by_id)

    lights = sorted(by_id.values(), key=lambda r: (r["lat"], r["lon"], r["id"]))
    lights = [L for L in lights if L.get("sectors")]
    colour_code = {
        "white": "w", "red": "r", "green": "g", "yellow": "y",
        "orange": "o", "blue": "b", "violet": "v", "magenta": "m", "amber": "y",
    }
    compact = []
    with_sector = 0
    full_only = 0
    for L in lights:
        secs = []
        has_partial = False
        for s in L["sectors"]:
            c = colour_code.get(str(s.get("colour") or "white").lower(), "w")
            a = float(s["drawStart"])
            b = float(s["drawEnd"])
            if not (a == 0.0 and b == 360.0):
                has_partial = True
            secs.append([c, round(a, 1), round(b, 1)])
        if has_partial:
            with_sector += 1
        else:
            full_only += 1
        compact.append([round(L["lat"], 5), round(L["lon"], 5), secs])

    payload = {
        "v": 1,
        "radiusNm": 0.3,
        "count": len(compact),
        "withPartialSectors": with_sector,
        "fullCircleOnly": full_only,
        "colours": {
            "w": "white", "r": "red", "g": "green", "y": "yellow",
            "o": "orange", "b": "blue", "v": "violet", "m": "magenta",
        },
        "note": "draw bearings from light (+180 from OSM seaward); missing sector -> 0..360",
        "L": compact,
    }
    text = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text, encoding="utf-8")
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.write_text(text, encoding="utf-8")
    print(
        f"Wrote {len(compact)} lights "
        f"({with_sector} with partial sectors, {full_only} full-circle) -> {OUT}",
        flush=True,
    )
    print(f"JSON size ~{OUT.stat().st_size // 1024} KB", flush=True)


if __name__ == "__main__":
    main()
