#!/usr/bin/env python3
"""
Admiralty Notices to Mariners (NtM) Scraper & Parser — SetSail Navigation Suite
=================================================================================
Automated UKHO Admiralty scraper that:
1. Scrapes Weekly bulletins (wknm / snii) from msi.admiralty.co.uk/NoticesToMariners/Weekly
2. Scrapes Annual Summary (NP247 / File 27 T&P in force) from .../NoticesToMariners/Annual
3. Scrapes Cumulative Lists (NP234) from .../NoticesToMariners/Cumulative
4. Extracts and resolves all Cancellations (Former Notice ... is cancelled)
5. Retains and marks cancelled notices so they are plottable and inspectable in ECDIS
6. Publishes to `public/notices.json` and `notices.json` for live SetSail navigation
"""

import os
import re
import sys
import json
import ssl
import datetime
import urllib.request
import urllib.parse

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

# Base URLs
BASE_URL = "https://msi.admiralty.co.uk"
WEEKLY_URL = f"{BASE_URL}/NoticesToMariners/Weekly"
ANNUAL_URL = f"{BASE_URL}/NoticesToMariners/Annual"
CUMULATIVE_URL = f"{BASE_URL}/NoticesToMariners/Cumulative"

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

# ── Regular Expressions ──

NTM_ALL_HEADER_REGEX = re.compile(
    r'(?:^|\n)\s*(\d{1,5}(?:\s*\([TP]\))?(?:\s*/\s*\d{2,4})?)\s*(?:\n|\s{1,6})'
    r'([A-Z\s\-\u00C0-\u024F\u2013\u2014\ufffd]{3,35}?)\s*[\-\u2013\u2014]\s*'
    r'([A-Za-z0-9\s\-\(\)\.\u00C0-\u024F\u2013\u2014\ufffd]{2,45}?)\s*[\-\u2013\u2014]\s*'
    r'([^\n\r]+)',
    re.MULTILINE
)

NTM_COORD_STD_REGEX = re.compile(
    r'(\d{1,2})\s*[\xb0\ufffd\xb7\s\u00B0\u00BA°]+\s*(\d{1,2})[\.\,\xb7\ufffd\u00B7\xb4\'´\s]+(\d{1,4})\s*[\'\u2032\s]*([NS])\.?\s*,?\s*'
    r'(\d{1,3})\s*[\xb0\ufffd\xb7\s\u00B0\u00BA°]+\s*(\d{1,2})[\.\,\xb7\ufffd\u00B7\xb4\'´\s]+(\d{1,4})\s*[\'\u2032\s]*([EW])\.?',
    re.IGNORECASE
)

NTM_COORD_DASH_REGEX = re.compile(
    r'(\d{2})-(\d{2}[\.\,]\d+)\s*([NS])\.?\s*,?\s*(\d{2,3})-(\d{2}[\.\,]\d+)\s*([EW])\.?',
    re.IGNORECASE
)

CHARTS_REGEX = re.compile(r'Charts?\s+affected\s*[:\u2014\-~\s]+([0-9\s_\-\u2014~]+)', re.IGNORECASE)

POLYGON_KEYWORDS = re.compile(
    r'bounded\s+by\s+the\s+following|joining\s+the\s+following|limited\s+by\s+the\s+following'
    r'|the\s+following\s+positions|bounded\s+by\s+positions'
    r'|the\s+following\s+co[- ]?ordinates|the\s+following\s+coordinates'
    r'|between\s+the\s+following|enclosed\s+by'
    r'|prohibited\s+area\s+bounded|restricted\s+area\s+bounded|within\s+the\s+area\s+bounded'
    r'|limit\s+of\s+restricted\s+area.*joining|limit\s+of.*area.*joining|maritime\s+limit.*joining'
    r'|within:\s*\(a\)',
    re.IGNORECASE
)

LINE_KEYWORDS = re.compile(
    r'\bjoining:\s*\(a\)|submarine\s+pipeline|pipeline.*joining|radio\s+reporting\s+line'
    r'|traffic\s+separation|traffic\s+lane|leading\s+line|range\s+line|pecked\s+line.*joining'
    r'|transit\s+lane|pier|cable|pipe',
    re.IGNORECASE
)

try:
    import requests
except ImportError:
    requests = None


def get_http_session():
    """Create requests.Session with proper User-Agent and headers."""
    if requests is not None:
        s = requests.Session()
        s.headers.update({
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf,*/*;q=0.8"
        })
        return s
    return None


def fetch_url(url, session=None, timeout=30):
    """Fetch URL with session cookies."""
    if session is not None:
        r = session.get(url, timeout=timeout)
        r.raise_for_status()
        return r.content
    
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, context=ctx, timeout=timeout) as response:
        return response.read()


def find_pdf_links(html_text):
    """Extract all PDF download links from Admiralty HTML page."""
    pattern = r'href=["\'](/NoticesToMariners/DownloadFile\?[^"\']+)["\']'
    raw_links = re.findall(pattern, html_text)
    
    results = []
    seen = set()
    for rel_link in raw_links:
        clean_link = rel_link.replace("&amp;", "&")
        if clean_link in seen:
            continue
        seen.add(clean_link)
        
        qs = urllib.parse.urlparse(clean_link).query
        params = urllib.parse.parse_qs(qs)
        filename = params.get("fileName", [""])[0]
        batch_id = params.get("batchId", [""])[0]
        
        full_url = urllib.parse.urljoin(BASE_URL, clean_link)
        results.append({
            "filename": filename,
            "batch_id": batch_id,
            "url": full_url
        })
    return results


def download_file(url, target_path, session=None, referer=WEEKLY_URL):
    """Download file from URL to disk using session cookies."""
    print(f"  Downloading: {url} -> {target_path}")
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    if session is not None:
        headers = {"Referer": referer}
        r = session.get(url, headers=headers, stream=True, timeout=90)
        r.raise_for_status()
        with open(target_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=65536):
                if chunk:
                    f.write(chunk)
        size = os.path.getsize(target_path)
        print(f"  Saved ({size:,} bytes)")
        return target_path
    
    data = fetch_url(url, timeout=90)
    with open(target_path, "wb") as f:
        f.write(data)
    print(f"  Saved ({len(data):,} bytes)")
    return target_path


def extract_cancellations(block_text, default_year="26"):
    """
    Extract all cancelled notice IDs from text blocks:
    - Former Notice 4267(T)/24 is cancelled
    - Former Notices 1234/25 and 5678(T)/25 are cancelled
    - Notice 4267(T)/24 is (hereby) cancelled
    """
    cancelled = set()
    
    pattern1 = re.compile(r'Former\s+Notices?\s+([0-9\s,\(\)/TPand&]+?)\s+(?:is|are)\s+(?:hereby\s+)?cancelled', re.IGNORECASE)
    for m in pattern1.finditer(block_text):
        raw_ids = m.group(1)
        sub_ids = re.findall(r'(\d+(?:\s*\([TP]\))?(?:\s*/\s*\d{2,4})?)', raw_ids)
        for sid in sub_ids:
            clean_id = re.sub(r'\s+', '', sid)
            if "/" not in clean_id:
                clean_id = f"{clean_id}/{default_year}"
            cancelled.add(clean_id)
            
    pattern2 = re.compile(r'(?:^|\n)\s*(?:[0-9]+\.\s*)?Notice\s+(\d+(?:\s*\([TP]\))?(?:\s*/\s*\d{2,4})?)\s+is\s+(?:hereby\s+)?cancelled', re.IGNORECASE)
    for m in pattern2.finditer(block_text):
        clean_id = re.sub(r'\s+', '', m.group(1))
        if "/" not in clean_id:
            clean_id = f"{clean_id}/{default_year}"
        cancelled.add(clean_id)
        
    return cancelled



def extract_subpolygons_from_text(notice_id, notice_subject, full_text):
    """
    Extract structured sub-polygons/areas from notice text.
    Handles:
    - Multi-scheme TSS (e.g. 3935(P)/22)
    - Multiple areas separated by 'and' (e.g. 4675(T)/26, 4745/26, 4752/26)
    - Distinct numbered / lettered sub-sections
    """
    lines = full_text.splitlines()
    sub_polygons = []
    
    current_scheme = ""
    current_sub = ""
    current_pts = []
    area_counter = 1
    
    def flush():
        nonlocal current_pts, area_counter
        if not current_pts:
            return
        
        name_parts = []
        if current_scheme:
            name_parts.append(current_scheme)
        if current_sub:
            name_parts.append(current_sub)
        if not name_parts:
            short_subj = notice_subject.split(".")[0].strip() or "Area"
            name_parts.append(f"{short_subj} (Zone {area_counter})")
        elif len(current_pts) >= 3 and not any(k in " ".join(name_parts).lower() for k in ["zone", "area", "lane"]):
            name_parts.append(f"Area {area_counter}")
            
        full_name = " — ".join(name_parts)
        low = full_name.lower()
        
        cat = "general"
        if "separation zone" in low:
            cat = "separation_zone"
        elif "precautionary" in low:
            cat = "precautionary_area"
        elif "restricted" in low or "prohibited" in low or "anchoring prohibited" in low:
            cat = "restricted_area"
        elif "traffic lane" in low:
            cat = "traffic_lane"
        elif "spoil ground" in low:
            cat = "spoil_ground"
        elif "anchorage" in low or "waiting area" in low:
            cat = "anchorage_area"
        elif "works" in low:
            cat = "works_area"
            
        sub_polygons.append({
            "name": full_name,
            "category": cat,
            "coords": current_pts,
            "points": [[p["lat"], p["lon"]] for p in current_pts]
        })
        area_counter += 1
        current_pts = []

    for line in lines:
        l_str = line.strip()
        if not l_str:
            continue
            
        if re.match(r'^\d+\.\d+$', l_str) or "(continued)" in l_str.lower() or "source: " in l_str.lower():
            continue
            
        # 1. Scheme / Section header
        m_main = re.match(r'^(\d+)\.\s*(.*)', l_str)
        if m_main:
            hdr = m_main.group(2).strip()
            cm_inline = NTM_COORD_STD_REGEX.search(hdr)
            if cm_inline and "centred on" in hdr.lower():
                flush()
                current_scheme = hdr.split("centred on")[0].strip()
                current_sub = "Navigation Prohibited"
                lat_d = int(cm_inline.group(1))
                lat_m = float(f"{cm_inline.group(2)}.{cm_inline.group(3)}")
                lat = round(lat_d + lat_m / 60.0, 5)
                if cm_inline.group(4).upper() == "S": lat = -lat
                lon_d = int(cm_inline.group(5))
                lon_m = float(f"{cm_inline.group(6)}.{cm_inline.group(7)}")
                lon = round(lon_d + lon_m / 60.0, 5)
                if cm_inline.group(8).upper() == "W": lon = -lon
                dms = f"{cm_inline.group(1)}° {cm_inline.group(2)}.{cm_inline.group(3)}' {cm_inline.group(4).upper()}, {cm_inline.group(5)}° {cm_inline.group(6)}.{cm_inline.group(7)}' {cm_inline.group(8).upper()}"
                current_pts.append({"lat": lat, "lon": lon, "dms": dms})
                flush()
                continue
                
            flush()
            if "Traffic scheme" in hdr:
                m_s = re.search(r'Traffic scheme\s+([A-Z0-9]+)', hdr, re.I)
                current_scheme = f"Scheme {m_s.group(1)}" if m_s else hdr
            elif "traffic separation scheme" in hdr.lower():
                current_scheme = "TSS Scheme"
            elif "precautionary area" in hdr.lower():
                current_scheme = "Precautionary Area"
            elif "anchoring prohibited" in hdr.lower():
                current_scheme = "Anchoring Prohibited Area"
            elif "offshore works" in hdr.lower() or "works" in hdr.lower():
                current_scheme = "Works Area"
            else:
                current_scheme = hdr
            current_sub = ""
            continue
            
        # 2. Sub-section header
        m_sub = re.match(r'^([a-z])\.\s*([A-Za-z\s\-]+?)(?:\s+are reported|\s+is reported|\s+bound by|:|$)', l_str, re.I)
        if m_sub:
            flush()
            current_sub = m_sub.group(2).strip()
            continue
            
        # 3. 'and' separator
        if l_str.lower() == "and":
            flush()
            continue
            
        # 4. Check coordinate
        cm = NTM_COORD_STD_REGEX.search(l_str)
        if cm:
            lat_d = int(cm.group(1))
            lat_m = float(f"{cm.group(2)}.{cm.group(3)}")
            lat = round(lat_d + lat_m / 60.0, 5)
            if cm.group(4).upper() == "S": lat = -lat
            lon_d = int(cm.group(5))
            lon_m = float(f"{cm.group(6)}.{cm.group(7)}")
            lon = round(lon_d + lon_m / 60.0, 5)
            if cm.group(8).upper() == "W": lon = -lon
            dms = f"{cm.group(1)}° {cm.group(2)}.{cm.group(3)}' {cm.group(4).upper()}, {cm.group(5)}° {cm.group(6)}.{cm.group(7)}' {cm.group(8).upper()}"
            current_pts.append({"lat": lat, "lon": lon, "dms": dms})

    flush()
    return sub_polygons

def parse_admiralty_ntm_text(full_text, default_year="26"):
    """
    Parse full bulletin text into structured notice objects.
    """
    if not full_text:
        return {"notices": [], "cancelledIds": []}
    
    clean_text = full_text.replace("\r\n", "\n")
    
    yr_match = re.search(r'Weekly\s+Edition\s+\d+[\s\S]{1,80}?(\d{4})', clean_text, re.I) or re.search(r'Wk\d+/(\d{2})', clean_text, re.I)
    detected_year = default_year
    if yr_match:
        val = yr_match.group(1)
        detected_year = val[-2:] if len(val) == 4 else val
    
    headers = []
    for m in NTM_ALL_HEADER_REGEX.finditer(clean_text):
        raw_num = m.group(1).strip()
        raw_subj = m.group(4).strip()
        
        if re.search(r'\(continued\)', raw_subj, re.I):
            continue
        
        notice_type = "PERM"
        tm = re.search(r'\(([TP])\)', raw_num, re.I) or re.search(r'\(([TP])\)', raw_subj, re.I)
        if tm:
            notice_type = tm.group(1).upper()
        
        num = raw_num
        nm = re.match(r'^\d+', raw_num)
        if nm:
            num = nm.group(0)
        
        year = detected_year
        ym = re.search(r'/(\d{2,4})', raw_num)
        if ym:
            yval = ym.group(1)
            year = yval[-2:] if len(yval) == 4 else yval
        
        full_id = f"{num}{'(' + notice_type + ')' if notice_type != 'PERM' else ''}/{year}"
        
        headers.append({
            "index": m.start(),
            "fullId": full_id,
            "num": num,
            "type": notice_type,
            "year": year,
            "country": m.group(2).strip(),
            "region": m.group(3).strip(),
            "subject": raw_subj
        })
    
    results = []
    cancelled_ids = set()
    
    for i, cur in enumerate(headers):
        start_pos = cur["index"]
        end_pos = headers[i + 1]["index"] if i + 1 < len(headers) else len(clean_text)
        block_text = clean_text[start_pos:end_pos]
        
        # 1. Coordinates
        coords = []
        for cm in NTM_COORD_STD_REGEX.finditer(block_text):
            try:
                lat_d = int(cm.group(1))
                lat_m = float(f"{cm.group(2)}.{cm.group(3)}")
                lat = lat_d + lat_m / 60.0
                if cm.group(4).upper() == "S":
                    lat = -lat
                
                lon_d = int(cm.group(5))
                lon_m = float(f"{cm.group(6)}.{cm.group(7)}")
                lon = lon_d + lon_m / 60.0
                if cm.group(8).upper() == "W":
                    lon = -lon
                
                coords.append({
                    "lat": round(lat, 5),
                    "lon": round(lon, 5),
                    "dms": f"{cm.group(1)}° {cm.group(2)}.{cm.group(3)}' {cm.group(4).upper()}, {cm.group(5)}° {cm.group(6)}.{cm.group(7)}' {cm.group(8).upper()}"
                })
            except Exception:
                continue
        
        # 2. Coordinates Dash NAVAREA fallback
        if not coords:
            for dm in NTM_COORD_DASH_REGEX.finditer(block_text):
                try:
                    lat_d = int(dm.group(1))
                    lat_m = float(dm.group(2).replace(",", "."))
                    lat = lat_d + lat_m / 60.0
                    if dm.group(3).upper() == "S":
                        lat = -lat
                    
                    lon_d = int(dm.group(4))
                    lon_m = float(dm.group(5).replace(",", "."))
                    lon = lon_d + lon_m / 60.0
                    if dm.group(6).upper() == "W":
                        lon = -lon
                    
                    coords.append({
                        "lat": round(lat, 5),
                        "lon": round(lon, 5),
                        "dms": f"{dm.group(1)}° {dm.group(2)}' {dm.group(3).upper()}, {dm.group(4)}° {dm.group(5)}' {dm.group(6).upper()}"
                    })
                except Exception:
                    continue
        
        # 3. Charts affected
        charts = []
        ch_m = CHARTS_REGEX.search(block_text)
        if ch_m:
            charts = [c for c in re.split(r'[\s\u2014\-~]+', ch_m.group(1)) if re.match(r'^\d+(_\d+)?$', c)]
        
        # 4. Cancellations referenced in this notice
        item_cancels = list(extract_cancellations(block_text, default_year=detected_year))
        cancelled_ids.update(item_cancels)
        
        # 5. Geometry classification
        sane = True
        if len(coords) >= 2:
            lats = [c["lat"] for c in coords]
            lons = [c["lon"] for c in coords]
            if (max(lats) - min(lats)) > 8 or (max(lons) - min(lons)) > 12:
                sane = False
        
        # Check if sounding / depth / light table (discrete points, not a polygon)
        is_sounding_table = bool(re.search(r'\b(?:Depth|Depths|Drying\s+height|Obstructions?|Wrecks?|Sounding)\s+Position\b', block_text, re.I))
        
        is_poly = len(coords) >= 3 and bool(POLYGON_KEYWORDS.search(block_text)) and sane and not is_sounding_table
        is_line = len(coords) >= 2 and not is_poly and sane and bool(LINE_KEYWORDS.search(block_text)) and not is_sounding_table
        
        # Extract subPolygons if TSS or multi-area notice
        sub_polys = []
        if is_poly or "traffic separation" in block_text.lower() or "separation zone" in block_text.lower():
            sub_polys = extract_subpolygons_from_text(cur["fullId"], cur["subject"], block_text)
            if len(sub_polys) > 1:
                is_poly = True
        
        notice_obj = {
            "id": cur["fullId"],
            "num": cur["num"],
            "type": cur["type"],
            "year": cur["year"],
            "country": cur["country"],
            "region": cur["region"],
            "subject": cur["subject"],
            "charts": charts,
            "coords": coords,
            "isPolygon": is_poly,
            "isLine": is_line,
            "body": block_text[:1500].strip(),
            "cancels": item_cancels,
            "isCancelled": False,
            "status": "ACTIVE",
            "checkedForExport": True
        }
        if sub_polys and len(sub_polys) > 1:
            notice_obj["subPolygons"] = sub_polys
            
        results.append(notice_obj)
    
    return {
        "notices": results,
        "cancelledIds": sorted(list(cancelled_ids))
    }


def main():
    print("=" * 70)
    print(" [SetSail] Navigation Suite — UKHO Admiralty Notices Scraper")
    now_utc = datetime.datetime.now(datetime.timezone.utc).isoformat()
    print(f" Run timestamp: {now_utc}")
    print("=" * 70)
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = script_dir if os.path.basename(script_dir).lower() != "scripts" else os.path.dirname(script_dir)
    public_dir = os.path.join(repo_root, "public")
    cache_dir = os.path.join(script_dir, "cache")
    notices_json_path = os.path.join(public_dir, "notices.json")
    root_notices_path = os.path.join(repo_root, "notices.json")
    annual_cache_path = os.path.join(cache_dir, "annual_notices.json")
    
    os.makedirs(cache_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    
    session = get_http_session()
    
    # ── Step 1: Scrape Weekly NtM Page ──
    print("\n[1/5] Fetching weekly bulletins from Admiralty MSI...")
    try:
        weekly_html = fetch_url(WEEKLY_URL, session=session).decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  [error] Failed to fetch {WEEKLY_URL}: {e}")
        return 1
    
    weekly_pdf_links = find_pdf_links(weekly_html)
    print(f"  Found {len(weekly_pdf_links)} PDF links on Weekly page.")
    
    weekly_bulletin = None
    for item in weekly_pdf_links:
        fn = item["filename"].lower()
        if "wknm" in fn and fn.endswith(".pdf"):
            weekly_bulletin = item
            break
    if not weekly_bulletin:
        for item in weekly_pdf_links:
            fn = item["filename"].lower()
            if "snii" in fn and fn.endswith(".pdf"):
                weekly_bulletin = item
                break
    if not weekly_bulletin and weekly_pdf_links:
        weekly_bulletin = weekly_pdf_links[0]
        
    if not weekly_bulletin:
        print("  [error] No weekly bulletin PDF found.")
        return 1
    
    print(f"  Target weekly bulletin: {weekly_bulletin['filename']}")
    
    # ── Step 2: Download Weekly PDF ──
    print("\n[2/5] Downloading weekly bulletin PDF...")
    pdf_weekly_file = os.path.join(cache_dir, weekly_bulletin["filename"])
    try:
        download_file(weekly_bulletin["url"], pdf_weekly_file, session=session, referer=WEEKLY_URL)
    except Exception as e:
        print(f"  [error] Weekly download failed: {e}")
        return 1
    
    # ── Step 3: Parse Weekly Bulletin ──
    print("\n[3/5] Extracting text and parsing weekly notices...")
    weekly_text = ""
    if pdfplumber is not None:
        try:
            with pdfplumber.open(pdf_weekly_file) as pdf:
                print(f"  Reading {len(pdf.pages)} pages from weekly PDF...")
                pages_text = [p.extract_text() or "" for p in pdf.pages]
                weekly_text = "\n".join(pages_text)
        except Exception as e:
            print(f"  [warn] pdfplumber error: {e}")
            
    parsed_weekly = parse_admiralty_ntm_text(weekly_text)
    weekly_notices = parsed_weekly["notices"]
    new_cancellations = set(parsed_weekly["cancelledIds"])
    print(f"  Parsed {len(weekly_notices)} weekly notices, {len(new_cancellations)} cancellations referenced.")
    
    # ── Step 4: Check Annual Bulletin (NP247 / File 27) ──
    print("\n[4/5] Checking Annual Notices to Mariners bulletin...")
    annual_notices = []
    
    if os.path.exists(annual_cache_path):
        try:
            with open(annual_cache_path, "r", encoding="utf-8") as f:
                annual_data = json.load(f)
                annual_notices = annual_data.get("notices", [])
                new_cancellations.update(annual_data.get("cancelledIds", []))
            print(f"  Loaded {len(annual_notices)} annual T&P notices from cache.")
        except Exception as e:
            print(f"  [warn] Could not load annual cache: {e}")
    else:
        annual_pdf_path = None
        try:
            annual_html = fetch_url(ANNUAL_URL, session=session).decode("utf-8", errors="replace")
            annual_links = find_pdf_links(annual_html)
            for al in annual_links:
                if "27" in al["filename"] and "temporary" in al["filename"].lower():
                    target_annual = os.path.join(cache_dir, al["filename"])
                    download_file(al["url"], target_annual, session=session, referer=ANNUAL_URL)
                    annual_pdf_path = target_annual
                    break
        except Exception as e:
            print(f"  [warn] Could not fetch annual link from MSI: {e}")
                
        if annual_pdf_path and os.path.exists(annual_pdf_path) and pdfplumber is not None:
            print(f"  Parsing Annual T&P bulletin ({annual_pdf_path})...")
            try:
                annual_text_pages = []
                with pdfplumber.open(annual_pdf_path) as pdf:
                    total_p = len(pdf.pages)
                    print(f"  Total annual pages: {total_p}. Extracting...")
                    for idx, page in enumerate(pdf.pages):
                        txt = page.extract_text() or ""
                        annual_text_pages.append(txt)
                        if (idx + 1) % 60 == 0 or (idx + 1) == total_p:
                            print(f"    Annual Page {idx+1}/{total_p} parsed...")
                            
                parsed_annual = parse_admiralty_ntm_text("\n".join(annual_text_pages), default_year="26")
                annual_notices = parsed_annual["notices"]
                new_cancellations.update(parsed_annual["cancelledIds"])
                print(f"  Extracted {len(annual_notices)} active T&P notices from Annual bulletin.")
                
                with open(annual_cache_path, "w", encoding="utf-8") as f:
                    json.dump({"notices": annual_notices, "cancelledIds": list(new_cancellations)}, f)
            except Exception as e:
                print(f"  [warn] Error parsing Annual PDF: {e}")
                
    # ── Step 5: Merge, Resolve Cancellations, and Output ──
    print("\n[5/5] Compiling master database and resolving cancellations...")
    
    existing_store = []
    historical_cancelled = set()
    if os.path.exists(notices_json_path):
        try:
            with open(notices_json_path, "r", encoding="utf-8") as f:
                old_data = json.load(f)
                existing_store = old_data.get("notices", [])
                historical_cancelled = set(old_data.get("cancelledIds", []))
        except Exception:
            pass
            
    all_cancellations = historical_cancelled.union(new_cancellations)
    
    master_store = {}
    for n in annual_notices:
        master_store[n["id"]] = n
    for n in existing_store:
        master_store[n["id"]] = n
    for n in weekly_notices:
        master_store[n["id"]] = n
        
    # Mark cancellations
    for can_id in all_cancellations:
        if can_id in master_store:
            master_store[can_id]["isCancelled"] = True
            master_store[can_id]["status"] = "CANCELLED"
            master_store[can_id]["checkedForExport"] = False
        else:
            m_parts = re.match(r'(\d+)(?:\(([TP])\))?(?:/(\d+))?', can_id)
            c_num = m_parts.group(1) if m_parts else can_id
            c_type = m_parts.group(2) if m_parts and m_parts.group(2) else "PERM"
            c_yr = m_parts.group(3) if m_parts and m_parts.group(3) else "26"
            master_store[can_id] = {
                "id": can_id,
                "num": c_num,
                "type": c_type,
                "year": c_yr,
                "country": "UKHO",
                "region": "Notice Cancelled",
                "subject": f"Notice {can_id} officially cancelled by UKHO Admiralty",
                "charts": [],
                "coords": [],
                "isPolygon": False,
                "isLine": False,
                "isCancelled": True,
                "status": "CANCELLED",
                "checkedForExport": False
            }
            
    for n in master_store.values():
        if not n.get("isCancelled"):
            n["isCancelled"] = False
            n["status"] = "ACTIVE"
            
    final_notices = list(master_store.values())
    active_notices = [n for n in final_notices if not n["isCancelled"]]
    cancelled_notices = [n for n in final_notices if n["isCancelled"]]
    
    fn = weekly_bulletin["filename"]
    wm = re.search(r'(\d{1,2})wknm(\d{2})', fn, re.I) or re.search(r'(\d{1,2})snii(\d{2})', fn, re.I)
    week_num = int(wm.group(1)) if wm else None
    year_num = int(wm.group(2)) if wm else None
    
    out_payload = {
        "metadata": {
            "generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "weeklyBulletin": weekly_bulletin["filename"],
            "batchId": weekly_bulletin.get("batch_id", ""),
            "weekNumber": week_num,
            "year": year_num,
            "totalNotices": len(final_notices),
            "activeNotices": len(active_notices),
            "cancelledNotices": len(cancelled_notices),
            "countT": len([n for n in active_notices if n.get("type") == "T"]),
            "countP": len([n for n in active_notices if n.get("type") == "P"]),
            "countPerm": len([n for n in active_notices if n.get("type") == "PERM"]),
            "countPoly": len([n for n in active_notices if n.get("isPolygon")]),
            "countLine": len([n for n in active_notices if n.get("isLine")])
        },
        "cancelledIds": sorted(list(all_cancellations)),
        "notices": final_notices
    }
    
    # Save to public/notices.json AND root notices.json
    with open(notices_json_path, "w", encoding="utf-8") as f:
        json.dump(out_payload, f, indent=2, ensure_ascii=False)
    with open(root_notices_path, "w", encoding="utf-8") as f:
        json.dump(out_payload, f, indent=2, ensure_ascii=False)
        
    print(f"\n[SUCCESS]! Database saved to public/notices.json & notices.json")
    print(f"  - Total Notices:     {len(final_notices)}")
    print(f"  - Active Notices:    {len(active_notices)}")
    print(f"  - Cancelled Notices: {len(cancelled_notices)}")
    print(f"  - Temporary (T):     {out_payload['metadata']['countT']}")
    print(f"  - Preliminary (P):   {out_payload['metadata']['countP']}")
    print(f"  - Permanent:         {out_payload['metadata']['countPerm']}")
    print("=" * 70)
    return 0


if __name__ == "__main__":
    sys.exit(main())
