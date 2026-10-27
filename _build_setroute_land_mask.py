# -*- coding: utf-8 -*-
"""
Build SetRoute land mask + denser coast segments from WORLD_LAND_POLYGONS
embedded in setsail_core.js.

Outputs:
  assets/geo/setroute_land_mask.json  — cellDeg occupancy (interior land)
  merges extra shoreline segments into assets/geo/setroute_coast_grid.json
"""
from __future__ import annotations

import json
import math
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CORE = ROOT / "assets" / "Auto NtM Plotting" / "setsail_core.js"
MASK_OUT = ROOT / "assets" / "geo" / "setroute_land_mask.json"
COAST_PATH = ROOT / "assets" / "geo" / "setroute_coast_grid.json"
PUBLIC_GEO = ROOT / "public" / "assets" / "geo"

MASK_CELL = 0.5  # degrees
COAST_CELL = 1.0  # denser than existing 2.5° for polygon edges


def point_in_ring(lat: float, lon: float, ring: list) -> bool:
    inside = False
    n = len(ring)
    if n < 3:
        return False
    j = n - 1
    for i in range(n):
        yi, xi = ring[i][0], ring[i][1]
        yj, xj = ring[j][0], ring[j][1]
        if ((yi > lat) != (yj > lat)) and (
            lon < (xj - xi) * (lat - yi) / ((yj - yi) or 1e-12) + xi
        ):
            inside = not inside
        j = i
    return inside


def cell_key(lat: float, lon: float, cell: float) -> str:
    return f"{math.floor(lat / cell)}_{math.floor(lon / cell)}"


def main():
    text = CORE.read_text(encoding="utf-8")
    m = re.search(
        r"const WORLD_LAND_POLYGONS = (\[\[.*?\]\]);\s*\nwindow\.WORLD_LAND_POLYGONS",
        text,
        re.S,
    )
    if not m:
        raise SystemExit("WORLD_LAND_POLYGONS not found")
    polys = json.loads(m.group(1))
    print(f"polygons={len(polys)} pts={sum(len(p) for p in polys)}")

    land_cells = set()
    coast_cells: dict[str, list] = defaultdict(list)
    edge_count = 0

    for ring in polys:
        if len(ring) < 3:
            continue
        lats = [p[0] for p in ring]
        lons = [p[1] for p in ring]
        min_lat, max_lat = min(lats), max(lats)
        min_lon, max_lon = min(lons), max(lons)
        # Rasterize mask at MASK_CELL using cell centers
        lat0 = math.floor(min_lat / MASK_CELL) * MASK_CELL
        lat1 = math.ceil(max_lat / MASK_CELL) * MASK_CELL
        lon0 = math.floor(min_lon / MASK_CELL) * MASK_CELL
        lon1 = math.ceil(max_lon / MASK_CELL) * MASK_CELL
        lat = lat0 + MASK_CELL * 0.5
        while lat <= lat1:
            lon = lon0 + MASK_CELL * 0.5
            while lon <= lon1:
                if point_in_ring(lat, lon, ring):
                    land_cells.add(cell_key(lat, lon, MASK_CELL))
                lon += MASK_CELL
            lat += MASK_CELL

        # Shoreline edges → denser coast cells
        for i in range(len(ring)):
            a = ring[i]
            b = ring[(i + 1) % len(ring)]
            seg = [round(a[0], 4), round(a[1], 4), round(b[0], 4), round(b[1], 4)]
            # skip degenerate
            if seg[0] == seg[2] and seg[1] == seg[3]:
                continue
            edge_count += 1
            # stamp into cells along the segment
            steps = max(2, int(max(abs(seg[2] - seg[0]), abs(seg[3] - seg[1])) / (COAST_CELL * 0.4)))
            for s in range(steps + 1):
                t = s / steps
                la = seg[0] + (seg[2] - seg[0]) * t
                lo = seg[1] + (seg[3] - seg[1]) * t
                k = cell_key(la, lo, COAST_CELL)
                bucket = coast_cells[k]
                if len(bucket) < 80:
                    # avoid exact dupes
                    if not bucket or bucket[-1] != seg:
                        bucket.append(seg)

    mask = {
        "cellDeg": MASK_CELL,
        "source": "WORLD_LAND_POLYGONS",
        "cellCount": len(land_cells),
        "cells": {k: 1 for k in sorted(land_cells)},
    }
    MASK_OUT.parent.mkdir(parents=True, exist_ok=True)
    MASK_OUT.write_text(json.dumps(mask, separators=(",", ":")), encoding="utf-8")
    print(f"wrote {MASK_OUT} cells={len(land_cells)}")

    # Merge denser edges into coast grid (keep existing 2.5° data; add 1.0° cells)
    coast = json.loads(COAST_PATH.read_text(encoding="utf-8"))
    existing_cells = coast.get("cells") or {}
    # Keep original cellDeg for backwards compat; store denser overlay separately
    coast["landPolyCellDeg"] = COAST_CELL
    coast["landPolyCells"] = {k: v for k, v in coast_cells.items()}
    coast["landPolySegments"] = edge_count
    # Also inject into primary cells at original resolution for immediate benefit
    orig_deg = float(coast.get("cellDeg") or 2.5)
    injected = 0
    for seg_list in coast_cells.values():
        for seg in seg_list:
            mid_lat = (seg[0] + seg[2]) / 2
            mid_lon = (seg[1] + seg[3]) / 2
            k = cell_key(mid_lat, mid_lon, orig_deg)
            bucket = existing_cells.setdefault(k, [])
            if seg not in bucket and len(bucket) < 120:
                bucket.append(seg)
                injected += 1
    coast["cells"] = existing_cells
    coast["segments"] = sum(len(v) for v in existing_cells.values())
    COAST_PATH.write_text(json.dumps(coast, separators=(",", ":")), encoding="utf-8")
    print(f"updated {COAST_PATH} injected={injected} segments={coast['segments']} landPolyCells={len(coast_cells)}")

    PUBLIC_GEO.mkdir(parents=True, exist_ok=True)
    (PUBLIC_GEO / "setroute_land_mask.json").write_bytes(MASK_OUT.read_bytes())
    (PUBLIC_GEO / "setroute_coast_grid.json").write_bytes(COAST_PATH.read_bytes())
    print("synced public/assets/geo/")


if __name__ == "__main__":
    main()
