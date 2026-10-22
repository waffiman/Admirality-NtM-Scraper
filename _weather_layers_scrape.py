# -*- coding: utf-8 -*-
"""Helpers for OPC / NDBC / MSL pressure grid / ocean currents — used by scraper_github.py."""
from __future__ import annotations

import re
from typing import Any

OPC_FILES = [
    ("north_atlantic", "https://tgftp.nws.noaa.gov/data/forecasts/marine/high_seas/north_atlantic.txt"),
    ("east_pacific_1", "https://tgftp.nws.noaa.gov/data/forecasts/marine/high_seas/east_pacific_1.txt"),
    ("east_pacific_2", "https://tgftp.nws.noaa.gov/data/forecasts/marine/high_seas/east_pacific_2.txt"),
    ("north_pacific", "https://tgftp.nws.noaa.gov/data/forecasts/marine/high_seas/north_pacific.txt"),
    ("north_hawaii", "https://tgftp.nws.noaa.gov/data/forecasts/marine/high_seas/north_hawaii.txt"),
]

NDBC_LATEST = "https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt"

SEVERITY_RADIUS = {
    "HURRICANE": 220,
    "STORM": 180,
    "TROPICAL STORM": 150,
    "GALE": 120,
}

COORD_RE = re.compile(
    r"(?P<lat>\d{1,2}(?:\.\d+)?)\s*(?P<ns>[NS])\s*(?P<lon>\d{1,3}(?:\.\d+)?)\s*(?P<ew>[EW])",
    re.IGNORECASE,
)
COMPACT_COORD_RE = re.compile(
    r"(?P<lat>\d{2})(?P<ns>[NS])\s*(?P<lon>\d{2,3})(?P<ew>[EW])",
    re.IGNORECASE,
)
RADIUS_RE = re.compile(r"WITHIN\s+(\d+)\s*NM", re.IGNORECASE)
WARN_HEADER_RE = re.compile(
    r"\.{3}(HURRICANE|STORM|GALE|TROPICAL STORM)\s+WARNING\.{3}",
    re.IGNORECASE,
)


def _parse_latlon(text: str):
    m = COORD_RE.search(text)
    if m:
        lat = float(m.group("lat"))
        lon = float(m.group("lon"))
        if m.group("ns").upper() == "S":
            lat = -lat
        if m.group("ew").upper() == "W":
            lon = -lon
        return round(lat, 2), round(lon, 2)
    m2 = COMPACT_COORD_RE.search(text.replace(" ", ""))
    if m2:
        lat = float(m2.group("lat"))
        lon = float(m2.group("lon"))
        if m2.group("ns").upper() == "S":
            lat = -lat
        if m2.group("ew").upper() == "W":
            lon = -lon
        return round(lat, 2), round(lon, 2)
    return None


def scrape_opc_warnings(session, ua: dict) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for basin, url in OPC_FILES:
        try:
            r = session.get(url, timeout=20, headers=ua)
            if r.status_code != 200 or not r.text:
                continue
            text = r.text.replace("\r\n", "\n")
            # Isolate WARNINGS section when present
            warn_section = text
            m_w = re.search(r"\.WARNINGS\.(.*?)(?:\.SYNOPSIS|\.NONE\.|\$\$)", text, re.DOTALL | re.IGNORECASE)
            if m_w:
                warn_section = m_w.group(1)
            parts = WARN_HEADER_RE.split(warn_section)
            # parts: [preamble, sev1, body1, sev2, body2, ...]
            i = 1
            idx = 0
            while i + 1 < len(parts):
                sev = parts[i].strip().upper()
                body = parts[i + 1].strip()
                i += 2
                if sev not in SEVERITY_RADIUS:
                    continue
                # Stop at next warning-like noise
                body = re.split(r"\n\.{3}[A-Z ]+WARNING\.{3}", body, maxsplit=1)[0]
                lines = [ln.strip() for ln in body.split("\n") if ln.strip()]
                summary = " ".join(lines[:6])[:420]
                center = _parse_latlon(summary) or _parse_latlon(body[:800])
                if not center:
                    continue
                rad_m = RADIUS_RE.search(body)
                radius = int(rad_m.group(1)) if rad_m else SEVERITY_RADIUS[sev]
                radius = max(80, min(540, radius))
                idx += 1
                headline = f"{sev.title()} Warning — {basin.replace('_', ' ').title()}"
                out.append({
                    "id": f"OPC-{basin}-{idx}",
                    "severity": sev,
                    "basin": basin,
                    "headline": headline,
                    "summary": summary,
                    "center": [center[0], center[1]],
                    "radiusNm": radius,
                    "source": "NOAA OPC High Seas",
                })
        except Exception as e:
            print(f"  [!] OPC scrape {basin}: {e}")
    print(f"  [+] OPC High Seas warnings: {len(out)}")
    return out


def _fnum(tok: str):
    if not tok or tok.upper() == "MM":
        return None
    try:
        return float(tok)
    except Exception:
        return None


def scrape_ndbc_buoys(session, ua: dict) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    try:
        r = session.get(NDBC_LATEST, timeout=25, headers=ua)
        if r.status_code != 200 or not r.text:
            return out
        lines = r.text.strip().splitlines()
        # Skip comment / unit header rows
        data_lines = [ln for ln in lines if ln and not ln.startswith("#")]
        for ln in data_lines:
            parts = ln.split()
            if len(parts) < 18:
                continue
            sid = parts[0]
            lat = _fnum(parts[1])
            lon = _fnum(parts[2])
            if lat is None or lon is None:
                continue
            # YY MM DD hh mm WDIR WSPD GST WVHT DPD APD MWD PRES PTDY ATMP WTMP DEWP VIS PTIDE
            try:
                yy, mo, dd, hh, mi = parts[3:8]
                # latest_obs uses YYYY; realtime2 uses YY
                year = yy if len(yy) == 4 else ("20" + yy.zfill(2))
                time_utc = f"{year}-{mo.zfill(2)}-{dd.zfill(2)}T{hh.zfill(2)}:{mi.zfill(2)}:00Z"
            except Exception:
                time_utc = ""
            wind_dir = _fnum(parts[8])
            # NDBC latest_obs WSPD/GST are m/s → knots
            wind_ms = _fnum(parts[9])
            gust_ms = _fnum(parts[10])
            wind_kt = round(wind_ms * 1.94384, 1) if wind_ms is not None else None
            gust = round(gust_ms * 1.94384, 1) if gust_ms is not None else None
            hs = _fnum(parts[11])
            period = _fnum(parts[12])
            wave_dir = _fnum(parts[14])
            pres = _fnum(parts[15])
            air = _fnum(parts[17]) if len(parts) > 17 else None
            sst = _fnum(parts[18]) if len(parts) > 18 else None
            if wind_kt is None and hs is None and pres is None:
                continue
            out.append({
                "id": sid,
                "lat": round(lat, 3),
                "lon": round(lon, 3),
                "timeUtc": time_utc,
                "windDir": int(wind_dir) if wind_dir is not None else None,
                "windKt": wind_kt,
                "gustKt": gust,
                "waveHs": round(hs, 1) if hs is not None else None,
                "wavePeriod": round(period, 1) if period is not None else None,
                "waveDir": int(wave_dir) if wave_dir is not None else None,
                "pressureMb": round(pres, 1) if pres is not None else None,
                "airC": round(air, 1) if air is not None else None,
                "sstC": round(sst, 1) if sst is not None else None,
            })
    except Exception as e:
        print(f"  [!] NDBC scrape: {e}")
    print(f"  [+] NDBC buoys (latest_obs): {len(out)}")
    return out


def _ocean_grid(step: float = 10.0):
    pts = []
    lat = -50.0
    while lat <= 60.0:
        lon = -170.0
        while lon <= 170.0:
            # Skip deep continental interiors (rough)
            if abs(lat) < 15 and -100 < lon < -35:  # Amazon/Brazil interior-ish skip mid
                pass
            pts.append((round(lat, 1), round(lon, 1)))
            lon += step
        lat += step
    return pts


def _batch_open_meteo(session, ua, base_url: str, points: list, current_vars: str, chunk: int = 40):
    results = []
    for i in range(0, len(points), chunk):
        batch = points[i : i + chunk]
        lats = ",".join(str(p[0]) for p in batch)
        lons = ",".join(str(p[1]) for p in batch)
        url = f"{base_url}?latitude={lats}&longitude={lons}&current={current_vars}&timezone=GMT"
        try:
            r = session.get(url, timeout=30, headers=ua)
            if r.status_code != 200:
                continue
            data = r.json()
            arr = data if isinstance(data, list) else [data]
            for j, item in enumerate(arr):
                if j >= len(batch):
                    break
                cur = (item or {}).get("current") or {}
                results.append((batch[j][0], batch[j][1], cur))
        except Exception as e:
            print(f"  [!] Open-Meteo batch: {e}")
    return results


def scrape_pressure_grid(session, ua: dict) -> list[dict[str, Any]]:
    pts = _ocean_grid(step=12.0)
    # Prefer sea cells — Open-Meteo forecast works over ocean too
    rows = _batch_open_meteo(
        session, ua,
        "https://api.open-meteo.com/v1/forecast",
        pts,
        "pressure_msl",
        chunk=35,
    )
    out = []
    for lat, lon, cur in rows:
        p = cur.get("pressure_msl")
        if p is None:
            continue
        out.append({"lat": lat, "lon": lon, "mslhPa": round(float(p), 1)})
    print(f"  [+] Pressure MSL grid points: {len(out)}")
    return out


def scrape_ocean_currents(session, ua: dict) -> list[dict[str, Any]]:
    # Sparser basin samples
    pts = []
    for lat in range(-45, 55, 15):
        for lon in range(-165, 175, 20):
            pts.append((float(lat), float(lon)))
    rows = _batch_open_meteo(
        session, ua,
        "https://marine-api.open-meteo.com/v1/marine",
        pts,
        "ocean_current_velocity,ocean_current_direction",
        chunk=30,
    )
    out = []
    for lat, lon, cur in rows:
        spd_kmh = cur.get("ocean_current_velocity")
        direction = cur.get("ocean_current_direction")
        if spd_kmh is None or direction is None:
            continue
        # Open-Meteo default km/h → knots
        speed_kn = round(float(spd_kmh) * 0.539957, 2)
        if speed_kn < 0.05:
            continue
        out.append({
            "lat": lat,
            "lon": lon,
            "speedKn": speed_kn,
            "dirDeg": int(round(float(direction))) % 360,
        })
    print(f"  [+] Ocean current samples: {len(out)}")
    return out
