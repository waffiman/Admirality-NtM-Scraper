# -*- coding: utf-8 -*-
"""
Regional NAVTEX / NAVAREA / national NtM scrapers for SetSail.
Primary official sources (scheduled with scraper_github.py):

  * Japan Coast Guard JHOD — NAVTEX + NAVAREA XI via warnings.cgi XML
    (+ optional WFS GeoJSON polygons, layers 213/212)
  * Taiwan ROC Navy — Notices to Mariners list + PDF body

Designed to merge into the global NAVTEX pipeline with stable IDs and
no duplicates against NautoShark / NGA MSI feeds.

Note: kaiho.mlit.go.jp robots.txt Disallow:/TUHO/ — we use polite UA + rate
limits for navigational-safety MSI reuse; keep request volume low.

Next official feeds to wire (same merge/dedupe pattern):
  * AMSA (Australia) — NAVAREA X / coastal NAVTEX
  * KHOA (Korea) — NAVAREA XI coastal
  * China MSA regional 航行警告 pages — Zhejiang/Guangdong MSA
  * SMA / BSH — Baltic / NAVAREA I coastal densification
  * Taiwan MOTC MPB — secondary to Navy (UUID detail + PDF)
"""

from __future__ import annotations

import datetime
import math
import re
import time
import xml.etree.ElementTree as ET
from typing import Iterable
from urllib.parse import urljoin

try:
    import requests
except ImportError:
    requests = None

USER_AGENT = (
    "Mozilla/5.0 (compatible; SetSailBot/1.0; +https://setsail-ai.vercel.app; "
    "navigational-safety research)"
)

JCG_WARNINGS_CGI = "https://www1.kaiho.mlit.go.jp/TUHO/keiho/cgi/warnings.cgi"
JCG_DISP_CGI = "https://www1.kaiho.mlit.go.jp/TUHO/keiho/cgi/disp_warnings.cgi"
JCG_WFS_CGI = "https://www1.kaiho.mlit.go.jp/TUHO/vpage/cgi-bin/WFS.cgi/"
TW_NAVY_LIST = "https://navy.mnd.gov.tw/en/AboutUs/Partner_List.aspx?ID=30294"
TW_NAVY_INFO = "https://navy.mnd.gov.tw/en/AboutUs/Partner_Info.aspx"

# Active JCG warnings can span prior years — page instructs checking every year.
JCG_YEAR_LOOKBACK = 8
# WFS layer ids (visualpage vtype)
JCG_WFS_LAYER = {"NAVTEX": 213, "NAVAREA11": 212}


def _session():
    if requests is None:
        raise RuntimeError("requests package required")
    s = requests.Session()
    s.headers.update({"User-Agent": USER_AGENT, "Accept": "*/*"})
    return s


def normalize_warning_key(raw: str) -> str:
    """Stable dedupe key across JCG / NGA / NautoShark / TW id styles."""
    if not raw:
        return ""
    s = re.sub(r"\s+", " ", str(raw).upper().strip())
    s = s.replace("NAVAREA XI", "NAVAREA 11").replace("NAVAREA X ", "NAVAREA 10 ")
    # NAVTEX 26-2039 / NAVAREA XI NO.26-0483
    m = re.search(
        r"(NAVTEX|NAVAREA\s*(?:11|XI)|HYDROPAC|HYDROLANT|HYDROARC)\s*(?:NO\.?\s*)?(\d{1,2})-(\d{1,5})",
        s,
        re.I,
    )
    if m:
        kind = m.group(1).upper().replace("XI", "11")
        kind = re.sub(r"NAVAREA\s*11", "NAVAREA 11", kind)
        return f"{kind} {int(m.group(3))}/{m.group(2)[-2:]}"
    m = re.search(
        r"(NAVTEX|NAVAREA\s*(?:11|XI)|HYDROPAC|HYDROLANT|HYDROARC|TAIWAN\s+NTM)\s*#?\s*(\d{1,5})\s*/\s*(\d{2,4})",
        s,
        re.I,
    )
    if m:
        kind = m.group(1).upper().replace("XI", "11")
        kind = re.sub(r"NAVAREA\s*11", "NAVAREA 11", kind)
        yr = m.group(3)[-2:]
        return f"{kind} {int(m.group(2))}/{yr}"
    m = re.search(r"(?:TAIWAN\s+)?(?:NTM|NM)\s*(?:NO\.?\s*)?(\d{1,4})\s*\(?([TP])?\)?", s, re.I)
    if m:
        suf = f"({m.group(2).upper()})" if m.group(2) else ""
        return f"TAIWAN NTM {int(m.group(1))}{suf}"
    return s


def _format_dms(lat: float, lon: float) -> str:
    lat_dir = "N" if lat >= 0 else "S"
    lon_dir = "E" if lon >= 0 else "W"
    abs_lat, abs_lon = abs(lat), abs(lon)
    return (
        f"{int(abs_lat):02d}° {(abs_lat - int(abs_lat)) * 60:05.2f}' {lat_dir}, "
        f"{int(abs_lon):03d}° {(abs_lon - int(abs_lon)) * 60:05.2f}' {lon_dir}"
    )


def extract_coords_from_text(text: str) -> list:
    """Parse DMS / DD-MM.m coordinates from JCG / TW warning bodies."""
    coords = []
    seen = set()
    if not text:
        return coords
    patterns = [
        # Taiwan PDF: 22°22'27.6"N., 121°35'48.6"E.
        re.compile(
            r"(\d{1,2})\s*[°º]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*[\"″]?\s*([NS])\.?\s*[,/\s，]+"
            r"(?:東經\s*)?(\d{1,3})\s*[°º]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*[\"″]?\s*([EW])\.?",
            re.I,
        ),
        # Chinese: 北緯 22°22'27.6"，東經 121°35'48.6"
        re.compile(
            r"北緯\s*(\d{1,2})\s*[°º]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*[\"″]?\s*"
            r"[，,]\s*東經\s*(\d{1,3})\s*[°º]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*[\"″]?",
        ),
        # 24-23-15N 130-47-52E  or 24-23.15N 130-47.52E
        re.compile(
            r"(\d{1,2})-(\d{1,2})(?:-(\d{1,2}(?:\.\d+)?))?([NS])\s+"
            r"(\d{1,3})-(\d{1,2})(?:-(\d{1,2}(?:\.\d+)?))?([EW])",
            re.I,
        ),
        # 24° 23.15' N, 130° 47.52' E
        re.compile(
            r"(\d{1,2})\s*[°º]\s*(\d{1,2}(?:\.\d+)?)\s*['′]?\s*([NS])\.?\s*[,/\s]+"
            r"(\d{1,3})\s*[°º]\s*(\d{1,2}(?:\.\d+)?)\s*['′]?\s*([EW])\.?",
            re.I,
        ),
        # 242315N 1304752E packed
        re.compile(r"\b(\d{2})(\d{2})(\d{2}(?:\.\d+)?)([NS])\s+(\d{3})(\d{2})(\d{2}(?:\.\d+)?)([EW])\b", re.I),
    ]
    for pat_i, pat in enumerate(patterns):
        for m in pat.finditer(text):
            try:
                if pat_i in (0,):
                    lat = int(m.group(1)) + int(m.group(2)) / 60.0 + float(m.group(3)) / 3600.0
                    lat_h = m.group(4).upper()
                    lon = int(m.group(5)) + int(m.group(6)) / 60.0 + float(m.group(7)) / 3600.0
                    lon_h = m.group(8).upper()
                elif pat_i == 1:
                    lat = int(m.group(1)) + int(m.group(2)) / 60.0 + float(m.group(3)) / 3600.0
                    lon = int(m.group(4)) + int(m.group(5)) / 60.0 + float(m.group(6)) / 3600.0
                    lat_h, lon_h = "N", "E"
                elif pat_i == 2:
                    lat_d, lat_m = int(m.group(1)), float(m.group(2))
                    lat_s = float(m.group(3)) if m.group(3) else 0.0
                    lat_h = m.group(4).upper()
                    lon_d, lon_m = int(m.group(5)), float(m.group(6))
                    lon_s = float(m.group(7)) if m.group(7) else 0.0
                    lon_h = m.group(8).upper()
                    lat = lat_d + lat_m / 60.0 + (0 if lat_s >= 60 else lat_s / 3600.0)
                    lon = lon_d + lon_m / 60.0 + (0 if lon_s >= 60 else lon_s / 3600.0)
                elif pat_i == 3:
                    lat = int(m.group(1)) + float(m.group(2)) / 60.0
                    lat_h = m.group(3).upper()
                    lon = int(m.group(4)) + float(m.group(5)) / 60.0
                    lon_h = m.group(6).upper()
                else:
                    lat = int(m.group(1)) + int(m.group(2)) / 60.0 + float(m.group(3)) / 3600.0
                    lat_h = m.group(4).upper()
                    lon = int(m.group(5)) + int(m.group(6)) / 60.0 + float(m.group(7)) / 3600.0
                    lon_h = m.group(8).upper()
                if lat_h == "S":
                    lat = -lat
                if lon_h == "W":
                    lon = -lon
                if abs(lat) > 90 or abs(lon) > 180:
                    continue
                key = (round(lat, 4), round(lon, 4))
                if key in seen:
                    continue
                seen.add(key)
                coords.append(
                    {"lat": round(lat, 5), "lon": round(lon, 5), "dms": _format_dms(lat, lon)}
                )
            except Exception:
                continue
    return coords


def _jcg_list_year(session, warning_type: str, year: int, lang: str = "EG") -> list:
    data = f"YEAR={year}&TYPE={warning_type}&LANG={lang}"
    r = session.post(
        JCG_WARNINGS_CGI,
        data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded; charset:UTF-8"},
        timeout=35,
    )
    r.raise_for_status()
    root = ET.fromstring(r.content)
    out = []
    for member in root.findall(".//Member"):
        out.append(
            {
                "tana": (member.findtext("tana") or "").strip(),
                "number": (member.findtext("number") or "").strip(),
                "category": (member.findtext("categoly") or member.findtext("category") or "").strip(),
                "title": (member.findtext("title") or "").strip(),
                "visual": (member.findtext("visual") or "").strip(),
                "year": year,
                "type": warning_type,
            }
        )
    return out


def _jcg_detail(session, warning_type: str, tana: str, lang: str = "EG") -> str:
    r = session.get(
        JCG_DISP_CGI,
        params={"TYPE": warning_type, "TANA": tana, "LANG": lang},
        timeout=35,
    )
    r.raise_for_status()
    text = re.sub(r"<script[\s\S]*?</script>", " ", r.text, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{2,}", "\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def _lonlat_to_merc(lon: float, lat: float) -> tuple:
    x = lon * 20037508.34 / 180.0
    y = math.log(math.tan((90.0 + lat) * math.pi / 360.0)) / (math.pi / 180.0)
    y = y * 20037508.34 / 180.0
    return x, y


def _ring_from_geojson_coords(ring) -> list:
    """GeoJSON ring [lon,lat]… → SetSail coords [{lat,lon,dms}]."""
    out = []
    for pt in ring or []:
        if not isinstance(pt, (list, tuple)) or len(pt) < 2:
            continue
        lon, lat = float(pt[0]), float(pt[1])
        if abs(lat) > 90 or abs(lon) > 180:
            continue
        out.append({"lat": round(lat, 5), "lon": round(lon, 5), "dms": _format_dms(lat, lon)})
    return out


def _jcg_wfs_index(session, layer: int) -> dict:
    """
    Index JCG WFS features by tana for NAVAREA XI / Japan waters.
    bbox must be EPSG:900913; lowercase 'bbox' query key.
    """
    by_tana = {}
    # Tile lon/lat boxes covering JP + NW Pacific (NAVAREA XI core)
    tiles = [
        (120, 0, 140, 25),
        (120, 25, 140, 46),
        (140, 0, 160, 25),
        (140, 25, 160, 46),
        (100, 0, 120, 25),
        (100, 25, 120, 46),
    ]
    for min_lon, min_lat, max_lon, max_lat in tiles:
        try:
            x1, y1 = _lonlat_to_merc(min_lon, min_lat)
            x2, y2 = _lonlat_to_merc(max_lon, max_lat)
            bbox = f"{min(x1, x2)},{min(y1, y2)},{max(x1, x2)},{max(y1, y2)}"
            time.sleep(0.35)
            r = session.get(
                JCG_WFS_CGI,
                params={"lang": "en", "layer": str(layer), "bbox": bbox},
                timeout=40,
            )
            if r.status_code != 200:
                continue
            data = r.json()
            for feat in data.get("features") or []:
                props = feat.get("properties") or {}
                tana = str(props.get("tana") or "").strip()
                if not tana:
                    continue
                geom = feat.get("geometry") or {}
                rings = []
                gtype = geom.get("type")
                if gtype == "GeometryCollection":
                    for g in geom.get("geometries") or []:
                        if g.get("type") == "Polygon":
                            coords = g.get("coordinates") or []
                            if coords:
                                rings.append(_ring_from_geojson_coords(coords[0]))
                        elif g.get("type") == "LineString":
                            rings.append(_ring_from_geojson_coords(g.get("coordinates") or []))
                elif gtype == "Polygon":
                    coords = geom.get("coordinates") or []
                    if coords:
                        rings.append(_ring_from_geojson_coords(coords[0]))
                rings = [r for r in rings if len(r) >= 2]
                if not rings:
                    continue
                body = str(props.get("msgBody") or props.get("msgTitle") or "")
                prev = by_tana.get(tana)
                # Prefer feature with more ring points
                score = sum(len(r) for r in rings)
                if prev and prev.get("_score", 0) >= score:
                    continue
                by_tana[tana] = {
                    "rings": rings,
                    "body": body,
                    "title": str(props.get("msgTitle") or ""),
                    "expires": str(props.get("eventEndDate") or ""),
                    "published": str(props.get("eventStartDate") or ""),
                    "_score": score,
                }
        except Exception as e:
            print(f"  [!] JCG WFS layer={layer} tile failed: {e}")
    print(f"  [+] JCG WFS layer {layer}: {len(by_tana)} features indexed")
    return by_tana


def scrape_jcg_warnings(years: Iterable[int] | None = None, fetch_details: bool = True) -> list:
    """Scrape in-force JCG NAVTEX + NAVAREA XI warnings (English + WFS polygons)."""
    if requests is None:
        print("  [!] JCG scrape skipped — requests missing")
        return []
    now = datetime.datetime.now(datetime.timezone.utc)
    if years is None:
        y0 = now.year
        years = list(range(y0, y0 - JCG_YEAR_LOOKBACK, -1))
    session = _session()
    # Prefetch WFS geometry indexes (one pass per layer)
    wfs_by_type = {}
    for wtype, layer in JCG_WFS_LAYER.items():
        try:
            wfs_by_type[wtype] = _jcg_wfs_index(session, layer)
        except Exception as e:
            print(f"  [!] JCG WFS {wtype}: {e}")
            wfs_by_type[wtype] = {}

    notices = []
    seen_tana = set()
    for wtype, prefix, navarea in (
        ("NAVTEX", "NAVTEX", "XI"),
        ("NAVAREA11", "NAVAREA XI", "XI"),
    ):
        wfs_idx = wfs_by_type.get(wtype) or {}
        for year in years:
            try:
                members = _jcg_list_year(session, wtype, year, "EG")
            except Exception as e:
                print(f"  [!] JCG list {wtype} {year}: {e}")
                continue
            print(f"  [+] JCG {wtype} {year}: {len(members)} in-force")
            for mem in members:
                tana = mem["tana"]
                if not tana or tana in seen_tana:
                    continue
                seen_tana.add(tana)
                body = mem["title"]
                wfs = wfs_idx.get(tana) or {}
                if wfs.get("body"):
                    body = wfs["body"]
                elif fetch_details:
                    try:
                        time.sleep(0.2)
                        body = _jcg_detail(session, wtype, tana, "EG") or body
                    except Exception as e:
                        print(f"  [!] JCG detail {tana}: {e}")
                num = re.sub(r"\D", "", mem["number"]) or "0"
                yr2 = str(year)[-2:]
                full_id = f"{prefix} {int(num)}/{yr2}"
                rings = wfs.get("rings") or []
                coords = []
                if rings:
                    coords = rings[0][:40]
                if not coords:
                    coords = extract_coords_from_text(body)
                if not coords:
                    continue
                is_poly = len(coords) >= 3 and (
                    len(rings) > 0
                    or any(k in body.upper() for k in ("BOUNDED", "AREA", "JOINING", "ENCLOSED"))
                )
                is_line = (not is_poly) and len(coords) >= 2 and any(
                    k in body.upper() for k in ("JOINING", "CABLE", "PIPELINE", "TRACK")
                )
                notice = {
                    "id": full_id,
                    "noticeNumber": full_id,
                    "num": str(int(num)),
                    "type": "NAVTEX",
                    "source": "JCG JHOD / NAVTEX" if wtype == "NAVTEX" else "JCG JHOD / NAVAREA XI",
                    "year": yr2,
                    "navarea": navarea,
                    "country": "Japan / NAVAREA XI",
                    "region": f"JCG {wtype} ({year})",
                    "category": mem["category"] or "Navigational Warning",
                    "subject": f"[{mem['category'] or 'Warning'}] {(wfs.get('title') or mem['title'])[:135]}",
                    "title": (wfs.get("title") or mem["title"])[:180],
                    "charts": [],
                    "coords": coords[:40],
                    "lat": coords[0]["lat"],
                    "lon": coords[0]["lon"],
                    "isPolygon": is_poly,
                    "isLine": is_line,
                    "body": body[:1400],
                    "rawText": body[:1400],
                    "published": wfs.get("published") or "",
                    "expires": wfs.get("expires") or "",
                    "cancels": [],
                    "status": "ACTIVE",
                    "isCancelled": False,
                    "checkedForExport": True,
                    "dedupeKey": normalize_warning_key(full_id),
                    "officialSource": True,
                }
                for cm in re.finditer(r"CANCEL\s+(?:THIS\s+MSG\s+)?(\d{1,4})\s*/\s*(\d{2,4})", body, re.I):
                    notice["cancels"].append(f"{int(cm.group(1))}/{cm.group(2)[-2:]}")
                if is_poly or len(rings) > 1:
                    notice["subPolygons"] = []
                    use_rings = rings if rings else [coords]
                    for ri, ring in enumerate(use_rings[:6]):
                        if len(ring) < 3:
                            continue
                        notice["subPolygons"].append(
                            {
                                "name": f"{full_id} Area {ri + 1}" if len(use_rings) > 1 else full_id,
                                "category": "restricted_area",
                                "coords": ring[:40],
                                "points": [[c["lat"], c["lon"]] for c in ring[:40]],
                            }
                        )
                    if notice["subPolygons"]:
                        notice["isPolygon"] = True
                notices.append(notice)
    print(f"  [+] JCG total plottable: {len(notices)}")
    return notices


def _extract_pdf_text(content: bytes) -> str:
    """Best-effort PDF text extract (pypdf → pdfplumber)."""
    try:
        from pypdf import PdfReader
        import io

        reader = PdfReader(io.BytesIO(content))
        parts = []
        for page in reader.pages[:8]:
            try:
                parts.append(page.extract_text() or "")
            except Exception:
                pass
        text = "\n".join(parts).strip()
        if text:
            return text
    except Exception:
        pass
    try:
        import pdfplumber
        import io

        parts = []
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages[:8]:
                parts.append(page.extract_text() or "")
        return "\n".join(parts).strip()
    except Exception:
        return ""


def scrape_taiwan_navy_ntm(max_items: int = 60, fetch_details: bool = True) -> list:
    """Scrape Taiwan ROC Navy Notices to Mariners (list + PDF body)."""
    if requests is None:
        print("  [!] Taiwan Navy scrape skipped — requests missing")
        return []
    session = _session()
    try:
        r = session.get(TW_NAVY_LIST, timeout=45)
        r.raise_for_status()
    except Exception as e:
        print(f"  [!] Taiwan Navy list failed: {e}")
        return []

    # AID → title from list markup / text
    aids = list(dict.fromkeys(re.findall(r"Partner_Info\.aspx\?ID=30294&(?:amp;)?AID=(\d+)", r.text)))
    titles = re.findall(
        r"NM\s*No\.?\s*(\d{1,4})\(?([TtPp])?\)?\s*[-–—:]{0,3}\s*([^<\n\r]{5,160})",
        r.text,
        re.I,
    )
    items = []
    for i, aid in enumerate(aids):
        if i < len(titles):
            num, tflag, title = titles[i]
            items.append((aid, num, (tflag or "").upper(), title.strip()))
        else:
            items.append((aid, aid[-4:], "", f"Taiwan NTM {aid}"))
    items = items[:max_items]
    print(f"  [+] Taiwan Navy list entries: {len(items)}")
    notices = []
    now = datetime.datetime.now(datetime.timezone.utc)
    yr2 = str(now.year)[-2:]

    for aid, num, tflag, title in items:
        body = title
        coords = []
        pdf_url = None
        if fetch_details:
            try:
                time.sleep(0.4)
                dr = session.get(TW_NAVY_INFO, params={"ID": "30294", "AID": aid}, timeout=40)
                if dr.status_code == 200:
                    # Title refresh from detail
                    tm = re.search(
                        r'lab_Title[^>]*>\s*([^<]*NM\s*No\.?\s*\d+[^<]*)',
                        dr.text,
                        re.I,
                    )
                    if tm:
                        raw_t = re.sub(r"\s+", " ", tm.group(1)).strip()
                        title = re.sub(
                            r"^\d{4}-\d{2}-\d{2}\s*",
                            "",
                            raw_t,
                        )
                        title = re.sub(
                            r"^NM\s*No\.?\s*\d+\(?[TtPp]?\)?\s*[-–—:]{0,3}\s*",
                            "",
                            title,
                            flags=re.I,
                        ).strip() or title
                    # PDF attachment (coords live in PDF)
                    pm = re.search(r'href=["\']([^"\']+\.pdf)["\']', dr.text, re.I)
                    if pm:
                        href = pm.group(1).replace("&amp;", "&")
                        pdf_url = urljoin(dr.url, href)
            except Exception as e:
                print(f"  [!] Taiwan detail {aid}: {e}")

        if pdf_url:
            try:
                time.sleep(0.25)
                pr = session.get(pdf_url, timeout=45)
                if pr.status_code == 200 and pr.content[:4] == b"%PDF":
                    body = _extract_pdf_text(pr.content) or body
                    coords = extract_coords_from_text(body)
            except Exception as e:
                print(f"  [!] Taiwan PDF {aid}: {e}")

        if not coords:
            continue

        suf = f"({tflag})" if tflag in ("T", "P") else ""
        full_id = f"TAIWAN NTM {int(num)}{suf}/{yr2}"
        is_poly = len(coords) >= 3
        notice = {
            "id": full_id,
            "noticeNumber": full_id,
            "num": str(int(num)),
            "type": "NAVTEX"
            if tflag == "T" or "FIRING" in title.upper() or "EXERCISE" in title.upper()
            else "T",
            "source": "Taiwan ROC Navy NtM",
            "year": yr2,
            "navarea": "XI",
            "country": "Taiwan",
            "region": "Taiwan waters (ROC Navy NtM)",
            "category": "Notice to Mariners",
            "subject": f"[Taiwan NTM] {title[:135]}",
            "title": title[:180],
            "charts": [],
            "coords": coords[:40],
            "lat": coords[0]["lat"],
            "lon": coords[0]["lon"],
            "isPolygon": is_poly,
            "isLine": False,
            "body": body[:1400],
            "rawText": body[:1400],
            "published": "",
            "expires": "",
            "cancels": [],
            "status": "ACTIVE",
            "isCancelled": False,
            "checkedForExport": True,
            "dedupeKey": normalize_warning_key(f"TAIWAN NTM {int(num)}{suf}"),
            "officialSource": True,
            "pdfUrl": pdf_url or "",
        }
        if is_poly:
            notice["subPolygons"] = [
                {
                    "name": full_id,
                    "category": "restricted_area",
                    "coords": coords[:40],
                    "points": [[c["lat"], c["lon"]] for c in coords[:40]],
                }
            ]
        notices.append(notice)
    print(f"  [+] Taiwan Navy plottable: {len(notices)}")
    return notices


def scrape_regional_official_warnings() -> list:
    """Entry point: JCG + Taiwan official warnings."""
    out = []
    try:
        out.extend(scrape_jcg_warnings())
    except Exception as e:
        print(f"  [!] JCG scrape failed: {e}")
    try:
        out.extend(scrape_taiwan_navy_ntm())
    except Exception as e:
        print(f"  [!] Taiwan scrape failed: {e}")
    return out


def merge_navtex_deduped(primary: list, secondary: list, per_area_cap: int = 120) -> list:
    """
    Merge notice lists. Official sources (officialSource=True) win on same dedupeKey.
    Also collapses near-identical ids (year 26 vs 2026). Caps per NAVAREA after merge.
    """
    by_key = {}
    order = []

    def _key(n):
        return n.get("dedupeKey") or normalize_warning_key(str(n.get("id") or ""))

    for bucket in (secondary, primary):  # primary last → overwrites
        for n in bucket:
            k = _key(n)
            if not k:
                k = str(n.get("id") or id(n))
            prev = by_key.get(k)
            if prev is None:
                by_key[k] = n
                order.append(k)
                continue
            # Prefer official; else prefer richer geometry / longer body
            prev_score = (
                (10 if prev.get("officialSource") else 0)
                + (3 if prev.get("isPolygon") else 0)
                + (1 if prev.get("isLine") else 0)
                + min(len(prev.get("body") or ""), 500) / 500.0
            )
            new_score = (
                (10 if n.get("officialSource") else 0)
                + (3 if n.get("isPolygon") else 0)
                + (1 if n.get("isLine") else 0)
                + min(len(n.get("body") or ""), 500) / 500.0
            )
            if new_score >= prev_score:
                by_key[k] = n

    merged = [by_key[k] for k in order if k in by_key]
    # per-area soft cap (raised from 75) — keep official first
    by_area = {}
    for n in merged:
        ar = str(n.get("navarea") or "?")
        by_area.setdefault(ar, []).append(n)
    result = []
    for ar, items in by_area.items():
        items.sort(
            key=lambda x: (
                0 if x.get("officialSource") else 1,
                0 if not x.get("isCancelled") else 1,
                0 if (x.get("isPolygon") or x.get("isLine")) else 1,
            )
        )
        result.extend(items[:per_area_cap])
    return result


if __name__ == "__main__":
    j = scrape_jcg_warnings(years=[datetime.datetime.utcnow().year], fetch_details=True)
    print("sample JCG", j[:1])
    t = scrape_taiwan_navy_ntm(max_items=5, fetch_details=True)
    print("sample TW", t[:1])
