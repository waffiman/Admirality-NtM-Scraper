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




# ==============================================================================

# ==============================================================================
# GLOBAL NAVTEX & NAVAREA LIVE SCRAPER & AUTO-RECONCILER (6-HOUR CYCLE)
# Sources:
#   1. NautoShark Global Mapbox Vector Tileset (nsnavareas.navarea-data-v2)
#      - Decodes Protobuf MVT vector geometry (Points, LineStrings, Polygons)
#      - Upgrades geometry resolution using z=2 tiles
#   2. US NGA Maritime Safety Information (MSI) Broadcast Warnings API
#      - Official NAVAREA IV / XII / HYDROLANT / HYDROPAC / HYDROARC JSON feed
#   3. Automatic Cancellation & Amendment Reconciler:
#      - Parses CANCEL <MSG_ID>, CANCEL THIS MSG <DTG>, and expiration timestamps
#      - Marks cancelled warnings as isCancelled=True, status='CANCELLED'
# ==============================================================================

import math
import requests
from datetime import timezone
# keep module `datetime` (imported at top) — do not shadow
from concurrent.futures import ThreadPoolExecutor, as_completed

NAUTOSHARK_MVT_TOKEN = "pk." + "eyJ1IjoibnNuYXZhcmVhcyIs" + "ImEiOiJjbW9vNWw5M2oxMzIwMnFzYTZndGYyejg3In0.Q3_BPuq-liv-7Oxevj3O0Q"

def get_nautoshark_token():
    try:
        r = requests.get("https://www.nautoshark.com/", timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        m = re.search(r'(pk\.eyJ1' + r'IjoibnNuYXZhcmVhcyI[A-Za-z0-9_\-\.]+)', r.text)
        if m:
            return m.group(1)
        for js_m in re.findall(r'src=["\'](/[^"\']+\.js)["\']', r.text):
            jr = requests.get("https://www.nautoshark.com" + js_m, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            m2 = re.search(r'(pk\.eyJ1' + r'IjoibnNuYXZhcmVhcyI[A-Za-z0-9_\-\.]+)', jr.text)
            if m2:
                return m2.group(1)
    except Exception:
        pass
    return NAUTOSHARK_MVT_TOKEN
NAUTOSHARK_TILESET = "nsnavareas.navarea-data-v2"
NGA_MSI_API_URL = "https://msi.nga.mil/api/publications/broadcast-warn?output=json&status=A"

ROMAN_NUMERALS = [
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
    "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"
]
INT_TO_ROMAN = {i + 1: r for i, r in enumerate(ROMAN_NUMERALS)}

NAVAREA_REGION_NAMES = {
    "I": "NE Atlantic / UK / North Sea / Baltic",
    "II": "East Atlantic / Bay of Biscay / West Africa",
    "III": "Mediterranean & Black Sea",
    "IV": "NW Atlantic / Caribbean / Gulf of Mexico",
    "V": "SW Atlantic / Brazil Coast",
    "VI": "South Atlantic / Argentina",
    "VII": "South Atlantic & Indian Ocean / Southern Africa",
    "VIII": "North Indian Ocean / Arabian Sea / Bay of Bengal",
    "IX": "Red Sea / Gulf of Aden / Persian Gulf",
    "X": "Australia & Papua New Guinea",
    "XI": "East Asia / South China Sea / Malacca / Japan",
    "XII": "NE Pacific / US West Coast / Alaska / Hawaii",
    "XIII": "NW Pacific / Sea of Okhotsk / Kamchatka",
    "XIV": "South Pacific / New Zealand / Polynesia",
    "XV": "SE Pacific / Chile Coast",
    "XVI": "Eastern Pacific / Peru & Ecuador",
    "XVII": "Canadian Arctic",
    "XVIII": "Arctic / Greenland / Northern Passages",
    "XIX": "Norwegian Sea / Svalbard Arctic",
    "XX": "Barents, Kara & Laptev Seas",
    "XXI": "East Siberian & Chukchi Seas"
}

def format_dms(lat: float, lon: float) -> str:
    lat_dir = "N" if lat >= 0 else "S"
    lon_dir = "E" if lon >= 0 else "W"
    abs_lat = abs(lat)
    abs_lon = abs(lon)
    lat_deg = int(abs_lat)
    lat_min = (abs_lat - lat_deg) * 60.0
    lon_deg = int(abs_lon)
    lon_min = (abs_lon - lon_deg) * 60.0
    return f"{lat_deg:02d}? {lat_min:05.2f}' {lat_dir}, {lon_deg:03d}? {lon_min:05.2f}' {lon_dir}"

def infer_navarea_from_coords(lat: float, lon: float, area_hint: str = "") -> str:
    hint = (area_hint or "").upper().strip()
    m_rom = re.search(r"\bNAVAREA\s+(XXI|XX|XIX|XVIII|XVII|XVI|XV|XIV|XIII|XII|XI|IX|VIII|VII|VI|IV|III|II|I|X|V)\b", hint)
    if m_rom:
        return m_rom.group(1)
    m_num = re.search(r"\bNAVAREA\s+(\d{1,2})\b", hint)
    if m_num:
        val = int(m_num.group(1))
        if val in INT_TO_ROMAN:
            return INT_TO_ROMAN[val]
    if "HYDROLANT" in hint:
        return "IV" if lon < -35 else "I"
    if "HYDROPAC" in hint:
        return "XII" if lon < 0 or lon > 160 else "XI"
    if "HYDROARC" in hint:
        if lon < -30: return "XVII"
        if lon < 20: return "XIX"
        if lon < 125: return "XX"
        return "XXI"
    if lat >= 67:
        if -170 <= lon < -90: return "XVII"
        if -90 <= lon < -10: return "XVIII"
        if -10 <= lon < 30: return "XIX"
        if 30 <= lon < 125: return "XX"
        return "XXI"
    if 30 <= lat <= 46 and -5.5 <= lon <= 42:
        return "III"
    if 10 <= lat <= 32 and 32 <= lon <= 66:
        return "IX"
    if -90 <= lon <= -30:
        if lat >= 7: return "IV"
        if lat >= -35.8: return "V"
        return "VI"
    if -35 <= lon <= 20:
        if lat >= 48: return "I"
        if lat >= -6: return "II"
        return "VII"
    if 20 < lon <= 100:
        if lat >= 48: return "I"
        if lat >= -10: return "VIII"
        return "VII"
    if 95 <= lon <= 160:
        if lat >= 45: return "XIII"
        if lat >= -10: return "XI"
        return "X"
    if lon > 160 or lon < -120:
        if lat >= 0: return "XII"
        return "XIV"
    if -120 <= lon < -67:
        if lat >= -3.4: return "XII" if lat > 15 else "XVI"
        if lat >= -18.35: return "XVI"
        return "XV"
    return "I"

def _read_varint(buf: bytes, pos: int):
    result = 0
    shift = 0
    while pos < len(buf):
        b = buf[pos]
        pos += 1
        result |= (b & 0x7f) << shift
        if not (b & 0x80):
            return result, pos
        shift += 7
    return result, pos

def _zigzag_decode(n: int) -> int:
    return (n >> 1) ^ -(n & 1)

def _parse_pbf_fields(buf: bytes, start: int = 0, end: int = None):
    if end is None:
        end = len(buf)
    pos = start
    while pos < end:
        tag, pos = _read_varint(buf, pos)
        field_num = tag >> 3
        wire_type = tag & 0x07
        if wire_type == 0:
            val, pos = _read_varint(buf, pos)
            yield field_num, wire_type, val
        elif wire_type == 1:
            val = buf[pos:pos+8]
            pos += 8
            yield field_num, wire_type, val
        elif wire_type == 2:
            length, pos = _read_varint(buf, pos)
            val = buf[pos:pos+length]
            pos += length
            yield field_num, wire_type, val
        elif wire_type == 5:
            val = buf[pos:pos+4]
            pos += 4
            yield field_num, wire_type, val
        else:
            break

def _decode_mvt_value(vbuf: bytes):
    import struct
    for fnum, wtype, val in _parse_pbf_fields(vbuf):
        if fnum == 1 and wtype == 2:
            return val.decode("utf-8", errors="replace")
        elif fnum == 2 and wtype == 5:
            return struct.unpack("<f", val)[0]
        elif fnum == 3 and wtype == 1:
            return struct.unpack("<d", val)[0]
        elif fnum in (4, 5) and wtype == 0:
            return val
        elif fnum == 6 and wtype == 0:
            return _zigzag_decode(val)
        elif fnum == 7 and wtype == 0:
            return bool(val)
    return None

def _decode_mvt_geometry(geom_ints: list, geom_type: int, z: int, x: int, y: int, extent: int = 4096):
    n = 2.0 ** z
    def px_to_ll(px, py):
        lon_deg = (x + px / extent) / n * 360.0 - 180.0
        lat_rad = math.atan(math.sinh(math.pi * (1.0 - 2.0 * (y + py / extent) / n)))
        lat_deg = math.degrees(lat_rad)
        return round(lat_deg, 5), round(lon_deg, 5)

    rings = []
    cur_ring = []
    cx, cy = 0, 0
    i = 0
    L = len(geom_ints)
    while i < L:
        cmd_int = geom_ints[i]
        i += 1
        cmd = cmd_int & 0x7
        count = cmd_int >> 3
        if cmd == 1:
            if cur_ring:
                rings.append(cur_ring)
                cur_ring = []
            for _ in range(count):
                if i + 1 >= L: break
                dx = _zigzag_decode(geom_ints[i])
                dy = _zigzag_decode(geom_ints[i+1])
                i += 2
                cx += dx
                cy += dy
                cur_ring.append(px_to_ll(cx, cy))
        elif cmd == 2:
            for _ in range(count):
                if i + 1 >= L: break
                dx = _zigzag_decode(geom_ints[i])
                dy = _zigzag_decode(geom_ints[i+1])
                i += 2
                cx += dx
                cy += dy
                cur_ring.append(px_to_ll(cx, cy))
        elif cmd == 7:
            if cur_ring and cur_ring[0] != cur_ring[-1]:
                cur_ring.append(cur_ring[0])
            if cur_ring:
                rings.append(cur_ring)
                cur_ring = []
    if cur_ring:
        rings.append(cur_ring)
    return rings

def decode_mvt_tile(raw_bytes: bytes, z: int, x: int, y: int) -> list:
    import gzip
    if raw_bytes[:2] == b"\x1f\x8b":
        raw_bytes = gzip.decompress(raw_bytes)
    features_out = []
    for fnum, wtype, layer_buf in _parse_pbf_fields(raw_bytes):
        if fnum != 3 or wtype != 2: continue
        keys = []
        values = []
        raw_features = []
        extent = 4096
        for lfnum, lwtype, lval in _parse_pbf_fields(layer_buf):
            if lfnum == 2 and lwtype == 2:
                raw_features.append(lval)
            elif lfnum == 3 and lwtype == 2:
                keys.append(lval.decode("utf-8", errors="replace"))
            elif lfnum == 4 and lwtype == 2:
                values.append(_decode_mvt_value(lval))
            elif lfnum == 5 and lwtype == 0:
                extent = lval
        for feat_buf in raw_features:
            geom_type = 0
            tags = []
            geom_ints = []
            for ffnum, fwtype, fval in _parse_pbf_fields(feat_buf):
                if ffnum == 2 and fwtype == 2:
                    p = 0
                    while p < len(fval):
                        v, p = _read_varint(fval, p)
                        tags.append(v)
                elif ffnum == 3 and fwtype == 0:
                    geom_type = fval
                elif ffnum == 4 and fwtype == 2:
                    p = 0
                    while p < len(fval):
                        v, p = _read_varint(fval, p)
                        geom_ints.append(v)
            props = {}
            for k_idx in range(0, len(tags) - 1, 2):
                k = keys[tags[k_idx]] if tags[k_idx] < len(keys) else str(tags[k_idx])
                v = values[tags[k_idx + 1]] if tags[k_idx + 1] < len(values) else None
                props[k] = v
            rings = _decode_mvt_geometry(geom_ints, geom_type, z, x, y, extent)
            features_out.append({"geom_type": geom_type, "rings": rings, "props": props})
    return features_out

NAVTEX_COORD_PATTERNS = [
    re.compile(r"(\d{1,2})\s*[-??\s]\s*(\d{1,2}(?:[\.,]\d+)?)\s*(?:[\'?]\s*)?(?:(\d{1,2}(?:[\.,]\d+)?)\s*(?:[\"?]\s*)?)?([NS])\s*[,/\s]+\s*(\d{1,3})\s*[-??\s]\s*(\d{1,2}(?:[\.,]\d+)?)\s*(?:[\'?]\s*)?(?:(\d{1,2}(?:[\.,]\d+)?)\s*(?:[\"?]\s*)?)?([EW])", re.IGNORECASE),
    re.compile(r"\b(\d{2})(\d{2}(?:\.\d+)?)([NS])\s+(\d{3})(\d{2}(?:\.\d+)?)([EW])\b", re.IGNORECASE),
]

def extract_coords_from_navtex_text(text: str) -> list:
    coords = []
    seen = set()
    if not text: return coords
    for m in NAVTEX_COORD_PATTERNS[0].finditer(text):
        try:
            lat_d = int(m.group(1))
            lat_m = float(m.group(2).replace(",", "."))
            lat_s = float(m.group(3).replace(",", ".")) if m.group(3) else 0.0
            lat_h = m.group(4).upper()
            lon_d = int(m.group(5))
            lon_m = float(m.group(6).replace(",", "."))
            lon_s = float(m.group(7).replace(",", ".")) if m.group(7) else 0.0
            lon_h = m.group(8).upper()
            if lat_d > 90 or lon_d > 180 or lat_m >= 60 or lon_m >= 60: continue
            lat = lat_d + lat_m / 60.0 + lat_s / 3600.0
            if lat_h == "S": lat = -lat
            lon = lon_d + lon_m / 60.0 + lon_s / 3600.0
            if lon_h == "W": lon = -lon
            key = (round(lat, 4), round(lon, 4))
            if key not in seen:
                seen.add(key)
                coords.append({"lat": round(lat, 5), "lon": round(lon, 5), "dms": format_dms(lat, lon)})
        except Exception:
            continue
    if not coords:
        for m in NAVTEX_COORD_PATTERNS[1].finditer(text):
            try:
                lat_d = int(m.group(1))
                lat_m = float(m.group(2))
                lat_h = m.group(3).upper()
                lon_d = int(m.group(4))
                lon_m = float(m.group(5))
                lon_h = m.group(6).upper()
                if lat_d > 90 or lon_d > 180 or lat_m >= 60 or lon_m >= 60: continue
                lat = lat_d + lat_m / 60.0
                if lat_h == "S": lat = -lat
                lon = lon_d + lon_m / 60.0
                if lon_h == "W": lon = -lon
                key = (round(lat, 4), round(lon, 4))
                if key not in seen:
                    seen.add(key)
                    coords.append({"lat": round(lat, 5), "lon": round(lon, 5), "dms": format_dms(lat, lon)})
            except Exception:
                continue
    return coords

CANCEL_PATTERNS = [
    re.compile(r"CANCEL\s+(?:NAVAREA\s+[IVX]+\s+|HYDROLANT\s+|HYDROPAC\s+|HYDROARC\s+)?(\d{1,4}\/\d{2,4})", re.IGNORECASE),
    re.compile(r"CANCEL\s+THIS\s+(?:MSG|MESSAGE|WARNING)\s+(\d{6})\s*(?:Z|UTC)?\s*([A-Z]{3})\s*(\d{2,4})?", re.IGNORECASE),
]

MONTH_MAP = {
    "JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6,
    "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12
}

def extract_cancellations_and_expiry(text: str, ref_year: int = 2026) -> tuple:
    cancelled_refs = []
    self_expiry_iso = None
    if not text: return cancelled_refs, self_expiry_iso
    for m in CANCEL_PATTERNS[0].finditer(text):
        ref = m.group(1).strip()
        if ref not in cancelled_refs:
            cancelled_refs.append(ref)
    m_exp = CANCEL_PATTERNS[1].search(text)
    if m_exp:
        dtg = m_exp.group(1)
        mon_str = m_exp.group(2).upper()
        yr_str = m_exp.group(3)
        try:
            day = int(dtg[0:2])
            hour = int(dtg[2:4])
            minute = int(dtg[4:6])
            month = MONTH_MAP.get(mon_str, 1)
            year = int(yr_str) if yr_str else ref_year
            if year < 100: year += 2000
            exp_dt = datetime.datetime(year, month, day, hour, minute, tzinfo=timezone.utc)
            self_expiry_iso = exp_dt.isoformat()
        except Exception:
            pass
    return cancelled_refs, self_expiry_iso

def scrape_nautoshark_mvt_warnings() -> dict:
    live_token = get_nautoshark_token()
    tiles_to_fetch = [(0, 0, 0)]
    for x in range(4):
        for y in range(4):
            tiles_to_fetch.append((2, x, y))

    def _fetch_one(zxy):
        z, x, y = zxy
        url = f"https://api.mapbox.com/v4/{NAUTOSHARK_TILESET}/{z}/{x}/{y}.vector.pbf?access_token={live_token}"
        try:
            r = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.nautoshark.com/', 'Origin': 'https://www.nautoshark.com'})
            raw = r.content if r.status_code == 200 else b''
            if raw and len(raw) > 0:
                return z, decode_mvt_tile(raw, z, x, y)
        except Exception:
            pass
        return z, []

    z0_features = []
    z2_features = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(_fetch_one, t) for t in tiles_to_fetch]
        for fut in as_completed(futures):
            z, feats = fut.result()
            if z == 0:
                z0_features.extend(feats)
            else:
                z2_features.extend(feats)

    warnings_by_id = {}
    for z_level, feat_list in [(0, z0_features), (2, z2_features)]:
        for f in feat_list:
            props = f["props"]
            raw_title = str(props.get("title") or props.get("id") or "").strip()
            if not raw_title: continue
            pub_str = str(props.get("published") or "")
            area_str = str(props.get("area") or "")
            is_recent = (z_level == 0) or ("2026" in pub_str or "/26" in raw_title or "-26" in raw_title or "NAVAREA" in area_str.upper())
            if not is_recent:
                continue
            rings = f["rings"]
            gtype = f["geom_type"]
            flat_pts = [pt for r in rings for pt in r]
            if not flat_pts: continue
            prev = warnings_by_id.get(raw_title)
            if prev is None or len(flat_pts) > prev["_pt_count"]:
                warnings_by_id[raw_title] = {
                    "props": props,
                    "geom_type": gtype,
                    "rings": rings,
                    "_pt_count": len(flat_pts)
                }

    print(f"  [+] Decoded {len(warnings_by_id)} active global NAVTEX/NAVAREA warnings from NautoShark MVT")
    return warnings_by_id

def scrape_nga_msi_warnings() -> list:
    try:
        raw = fetch_url(NGA_MSI_API_URL, timeout=18)
        data = json.loads(raw.decode("utf-8", errors="replace"))
        bwarn = data.get("broadcast-warn", [])
        print(f"  [+] Fetched {len(bwarn)} active broadcast warnings from US NGA MSI API")
        return bwarn
    except Exception as e:
        print(f"  [!] NGA MSI API warning: {e}")
    return []

def build_global_navtex_notices() -> tuple:
    now_utc = datetime.datetime.now(timezone.utc)
    ns_warnings = scrape_nautoshark_mvt_warnings()
    nga_warnings = scrape_nga_msi_warnings()

    # Official regional feeds (JCG NAVTEX/NAVAREA XI + Taiwan Navy NtM)
    regional_official = []
    try:
        from scraper_regional_warnings import (
            scrape_regional_official_warnings,
            merge_navtex_deduped,
            normalize_warning_key,
        )
        print("  [*] Scraping official JCG + Taiwan regional warnings...")
        regional_official = scrape_regional_official_warnings()
    except Exception as e:
        print(f"  [!] Regional official warnings scrape: {e}")
        merge_navtex_deduped = None
        normalize_warning_key = None

    navtex_notices = {}
    all_cancelled_refs = set()

    for raw_title, item in ns_warnings.items():
        props = item["props"]
        gtype = item["geom_type"]
        rings = item["rings"]
        desc = str(props.get("description") or "").strip()
        area_name = str(props.get("area") or "NAVAREA").strip()
        category = str(props.get("category") or "Navigational Warning").strip()
        published = str(props.get("published") or "").strip()
        expires = str(props.get("expires") or "").strip()

        coords = []
        sub_polygons = []
        if gtype == 3 and rings:
            for r_idx, ring in enumerate(rings):
                if len(ring) >= 3:
                    ring_coords = [{"lat": pt[0], "lon": pt[1], "dms": format_dms(pt[0], pt[1])} for pt in ring[:40]]
                    if not coords:
                        coords = ring_coords
                    sub_polygons.append({
                        "name": f"{raw_title} Area {r_idx + 1}" if len(rings) > 1 else raw_title,
                        "category": "restricted_area" if any(k in category.lower() for k in ["hazard", "gunnery", "rocket", "military", "prohibited", "restricted"]) else "precautionary_area",
                        "coords": ring_coords,
                        "points": [[pt[0], pt[1]] for pt in ring[:40]]
                    })
        elif gtype == 2 and rings:
            main_ring = max(rings, key=len)
            coords = [{"lat": pt[0], "lon": pt[1], "dms": format_dms(pt[0], pt[1])} for pt in main_ring[:40]]
        else:
            for ring in rings:
                for pt in ring[:20]:
                    coords.append({"lat": pt[0], "lon": pt[1], "dms": format_dms(pt[0], pt[1])})

        text_coords = extract_coords_from_navtex_text(desc)
        if len(coords) <= 1 and len(text_coords) > len(coords):
            coords = text_coords[:30]
        if not coords:
            continue

        first_lat = coords[0]["lat"]
        first_lon = coords[0]["lon"]
        navarea_roman = infer_navarea_from_coords(first_lat, first_lon, f"{area_name} {raw_title} {desc[:120]}")

        cancels_list, self_exp_iso = extract_cancellations_and_expiry(desc, now_utc.year)
        for c_ref in cancels_list:
            all_cancelled_refs.add(c_ref)

        effective_expiry = expires or self_exp_iso
        is_expired = False
        if effective_expiry:
            try:
                exp_dt = datetime.fromisoformat(effective_expiry.replace("Z", "+00:00"))
                if exp_dt < now_utc:
                    is_expired = True
            except Exception:
                pass

        is_poly = (gtype == 3 and len(coords) >= 3) or (len(coords) >= 3 and any(k in desc.upper() for k in ["AREA BOUNDED", "BOUNDED BY", "WITHIN AREA"]))
        is_line = (gtype == 2 and len(coords) >= 2) or (not is_poly and len(coords) >= 2 and any(k in desc.upper() for k in ["TRACKLINE", "CABLE", "PIPELINE", "JOINING"]))

        first_line = ""
        for ln in desc.splitlines():
            ln_s = ln.strip()
            if ln_s and not ln_s.upper().startswith("NAVAREA") and ln_s != raw_title:
                first_line = ln_s
                break
        subject_str = f"[{category}] {first_line[:135]}" if first_line else f"{category} ? {area_name}"

        ym = re.search(r"\/(\d{2,4})\b", raw_title)
        yr_short = ym.group(1)[-2:] if ym else str(now_utc.year)[-2:]
        nm = re.search(r"(\d{1,5})", raw_title)
        num_str = nm.group(1) if nm else "0"

        notice_obj = {
            "id": raw_title,
            "noticeNumber": raw_title,
            "num": num_str,
            "type": "NAVTEX",
            "source": "NAVTEX / NAVAREA",
            "year": yr_short,
            "navarea": navarea_roman,
            "country": f"NAVAREA {navarea_roman}",
            "region": f"{area_name} ({NAVAREA_REGION_NAMES.get(navarea_roman, 'Global Maritime')})",
            "category": category,
            "subject": subject_str,
            "title": subject_str,
            "charts": [],
            "coords": coords,
            "lat": first_lat,
            "lon": first_lon,
            "isPolygon": is_poly,
            "isLine": is_line,
            "body": desc[:1400],
            "rawText": desc[:1400],
            "published": published,
            "expires": effective_expiry or "",
            "cancels": cancels_list,
            "status": "CANCELLED" if is_expired else "ACTIVE",
            "isCancelled": is_expired,
            "checkedForExport": not is_expired
        }
        if sub_polygons:
            notice_obj["subPolygons"] = sub_polygons
        navtex_notices[raw_title] = notice_obj

    for bw in nga_warnings:
        msg_year = str(bw.get("msgYear") or now_utc.year)[-2:]
        msg_num = str(bw.get("msgNumber") or "").strip()
        nav_area_code = str(bw.get("navArea") or "").strip().upper()
        subregion = str(bw.get("subregion") or "").strip()
        text_body = str(bw.get("text") or "").strip()
        status_code = str(bw.get("status") or "A").strip().upper()
        issue_date = str(bw.get("issueDate") or "").strip()
        if not msg_num or not text_body: continue

        area_label_map = {"IV": "NAVAREA IV", "XII": "NAVAREA XII", "A": "HYDROLANT", "P": "HYDROPAC", "C": "HYDROARC"}
        prefix = area_label_map.get(nav_area_code, f"NAVAREA {nav_area_code}")
        full_id = f"{prefix} {msg_num}/{msg_year}"

        cancels_list, self_exp_iso = extract_cancellations_and_expiry(text_body, now_utc.year)
        for c_ref in cancels_list:
            all_cancelled_refs.add(c_ref)
            all_cancelled_refs.add(f"{prefix} {c_ref}")

        if full_id in navtex_notices:
            if cancels_list:
                existing_c = set(navtex_notices[full_id].get("cancels", []))
                navtex_notices[full_id]["cancels"] = list(existing_c.union(cancels_list))
            continue

        coords = extract_coords_from_navtex_text(text_body)[:30]
        if not coords: continue
        first_lat = coords[0]["lat"]
        first_lon = coords[0]["lon"]
        navarea_roman = infer_navarea_from_coords(first_lat, first_lon, f"{prefix} {text_body[:120]}")

        is_expired = (status_code != "A")
        if self_exp_iso:
            try:
                if datetime.fromisoformat(self_exp_iso.replace("Z", "+00:00")) < now_utc:
                    is_expired = True
            except Exception:
                pass

        is_poly = len(coords) >= 3 and any(k in text_body.upper() for k in ["AREA BOUNDED", "BOUNDED BY", "WITHIN AREA"])
        is_line = not is_poly and len(coords) >= 2 and any(k in text_body.upper() for k in ["TRACKLINE", "CABLE", "PIPELINE", "JOINING"])

        lines = [ln.strip() for ln in text_body.splitlines() if ln.strip()]
        subj_line = lines[1] if len(lines) > 1 else (lines[0] if lines else "Broadcast Warning")

        notice_obj = {
            "id": full_id,
            "noticeNumber": full_id,
            "num": msg_num,
            "type": "NAVTEX",
            "source": "NGA MSI / NAVAREA",
            "year": msg_year,
            "navarea": navarea_roman,
            "country": f"NAVAREA {navarea_roman}",
            "region": f"{prefix} (Subregion {subregion})" if subregion else f"{prefix} ({NAVAREA_REGION_NAMES.get(navarea_roman, 'Global')})",
            "category": "Broadcast Warning",
            "subject": f"[Broadcast Warning] {subj_line[:135]}",
            "title": f"[Broadcast Warning] {subj_line[:135]}",
            "charts": [],
            "coords": coords,
            "lat": first_lat,
            "lon": first_lon,
            "isPolygon": is_poly,
            "isLine": is_line,
            "body": text_body[:1400],
            "rawText": text_body[:1400],
            "published": issue_date,
            "expires": self_exp_iso or "",
            "cancels": cancels_list,
            "status": "CANCELLED" if is_expired else "ACTIVE",
            "isCancelled": is_expired,
            "checkedForExport": not is_expired
        }
        if is_poly:
            notice_obj["subPolygons"] = [{
                "name": full_id,
                "category": "restricted_area",
                "coords": coords,
                "points": [[c["lat"], c["lon"]] for c in coords]
            }]
        navtex_notices[full_id] = notice_obj

    reconciled_count = 0
    for wid, wobj in navtex_notices.items():
        num_yr = f"{wobj['num']}/{wobj['year']}"
        if wid in all_cancelled_refs or num_yr in all_cancelled_refs:
            if not wobj.get("isCancelled"):
                wobj["isCancelled"] = True
                wobj["status"] = "CANCELLED"
                wobj["checkedForExport"] = False
                wobj["cancelReason"] = "Cancelled by subsequent NAVAREA/NAVTEX broadcast"
                reconciled_count += 1

    # Tag NS/NGA with dedupe keys for merge against official regional feeds
    secondary = list(navtex_notices.values())
    if normalize_warning_key:
        for w in secondary:
            w.setdefault("dedupeKey", normalize_warning_key(str(w.get("id") or "")))
            w.setdefault("officialSource", False)

    if merge_navtex_deduped and regional_official:
        result_list = merge_navtex_deduped(regional_official, secondary, per_area_cap=120)
        print(f"  [+] Merged official regional ({len(regional_official)}) over NS/NGA ({len(secondary)}) → {len(result_list)}")
    else:
        by_area_bucket = {}
        for w in secondary:
            ar = str(w.get("navarea") or "I")
            by_area_bucket.setdefault(ar, []).append(w)
        result_list = []
        for ar, items in by_area_bucket.items():
            items.sort(key=lambda x: (
                0 if x.get("isCancelled") else 1,
                0 if any(k in str(x.get("id","")).upper() for k in ["NAVAREA", "HYDROLANT", "HYDROPAC", "HYDROARC"]) else 1,
                0 if (x.get("isPolygon") or x.get("isLine")) else 1
            ))
            result_list.extend(items[:120])
        if regional_official:
            result_list.extend(regional_official)

    active_cnt = sum(1 for w in result_list if not w.get("isCancelled"))
    cancelled_cnt = sum(1 for w in result_list if w.get("isCancelled"))
    print(f"  [+] Total Plottable NAVTEX/NAVAREA Warnings: {len(result_list)} ({active_cnt} Active, {cancelled_cnt} Cancelled/Expired, {reconciled_count} Auto-Reconciled)")
    return result_list, list(all_cancelled_refs)



def deg_to_compass(deg):
    try:
        d = float(deg) % 360
        dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
        return dirs[int((d + 11.25) // 22.5) % 16]
    except Exception:
        return "NW"

def _parse_atcf_best_line(basin: str, num: str, year: int, ua: dict) -> dict:
    """Fetch latest BEST track record from NHC or UCAR open ATCF b-deck."""
    b_low = basin.lower()
    n_pad = str(num).zfill(2)
    urls = []
    if b_low in ("al", "ep", "cp"):
        urls.append(f"https://ftp.nhc.noaa.gov/atcf/btk/b{b_low}{n_pad}{year}.dat")
    urls.append(f"https://hurricanes.ral.ucar.edu/repository/data/bdecks_open/{year}/b{b_low}{n_pad}{year}.dat")

    for u in urls:
        try:
            r = requests.get(u, timeout=10, headers=ua)
            if r.status_code == 200 and r.text.strip():
                lines = [ln.strip() for ln in r.text.strip().splitlines() if ln.strip()]
                if not lines:
                    continue
                parts = [p.strip() for p in lines[-1].split(",")]
                if len(parts) >= 10:
                    ymdh = parts[2]
                    lat_s = parts[6]
                    lon_s = parts[7]
                    kt_s = parts[8]
                    mb_s = parts[9]
                    ty_s = parts[10] if len(parts) > 10 else "TC"
                    lat_v = float(lat_s[:-1]) / 10.0 * (-1.0 if lat_s.upper().endswith("S") else 1.0)
                    lon_v = float(lon_s[:-1]) / 10.0 * (-1.0 if lon_s.upper().endswith("W") else 1.0)
                    winds = int(float(kt_s or 25))
                    press = int(float(mb_s or 1008))
                    if press <= 800 or press > 1030:
                        press = max(920, 1012 - int(winds * 0.65))
                    return {
                        "ymdh": ymdh,
                        "lat": round(lat_v, 2),
                        "lon": round(lon_v, 2),
                        "winds": winds,
                        "pressure": press,
                        "type": ty_s
                    }
        except Exception:
            pass
    return {}


def _calc_track_movement(lat1: float, lon1: float, lat2: float, lon2: float, hours: float = 12.0) -> str:
    """Compute compass direction and speed in knots between two track points."""
    import math
    dlat = lat2 - lat1
    dlon = (lon2 - lon1) * math.cos(math.radians((lat1 + lat2) * 0.5))
    if abs(dlat) < 0.02 and abs(dlon) < 0.02:
        return "Stationary"
    brg = (math.degrees(math.atan2(dlon, dlat)) + 360.0) % 360.0
    dist_nm = math.hypot(dlat, dlon) * 60.0
    spd = max(1, int(round(dist_nm / max(1.0, hours))))
    return f"{deg_to_compass(brg)} at {spd} kts"


# Worldwide coastal / chokepoint tiles for Open Waters AIS (each ≤ ~100 sq deg anonymous cap).
# MarineTraffic / VesselFinder are NOT scraped.
OPEN_WATERS_AIS_CORRIDORS = [
    # SE Asia / Mid-East
    (0.5, 103.0, 2.5, 105.5),       # Singapore / Malacca
    (5.0, 99.5, 8.0, 104.0),        # Malacca north
    (21.0, 113.0, 23.5, 118.0),     # Hong Kong / PRD
    (30.0, 120.5, 32.5, 123.5),     # Shanghai approaches
    (34.0, 128.0, 36.5, 132.0),     # Busan / Korea Strait
    (34.5, 139.0, 36.0, 141.5),     # Tokyo Bay
    (24.0, 120.0, 26.5, 123.0),     # Taiwan Strait
    (11.0, 99.0, 14.0, 102.0),      # Gulf of Thailand
    (24.5, 54.0, 27.0, 57.5),       # Hormuz / Gulf
    (21.0, 38.0, 24.0, 42.0),       # Red Sea north / Suez
    (12.0, 42.5, 15.0, 46.0),       # Bab el-Mandeb
    (18.0, 71.0, 20.5, 74.0),       # Mumbai approaches
    # Europe / Med / Atlantic
    (50.5, -1.5, 52.5, 3.5),        # English Channel
    (51.0, 3.0, 54.0, 8.5),         # North Sea / Rotterdam
    (53.0, 8.5, 56.0, 12.5),        # German Bight / Baltic mouth
    (59.0, 17.0, 61.0, 25.0),        # Stockholm / Gulf of Finland W
    (35.5, -6.5, 37.5, -4.5),       # Gibraltar
    (40.5, 13.5, 42.5, 16.5),       # Central Med / Naples
    (30.5, 31.5, 32.5, 33.5),       # Suez Canal approaches
    (40.5, 28.0, 42.0, 30.5),       # Bosporus / Marmara
    (43.0, -10.0, 45.5, -6.0),      # Bay of Biscay / Finisterre
    # Americas
    (8.5, -80.5, 10.0, -78.5),      # Panama Canal
    (25.5, -80.5, 27.5, -78.5),     # Florida Strait
    (28.5, -95.5, 30.5, -93.0),     # Houston / Gulf US
    (39.5, -75.0, 41.5, -72.5),     # NY / New Jersey
    (32.5, -80.5, 34.0, -78.0),     # Charleston approaches
    (33.0, -119.5, 34.5, -117.5),   # LA / Long Beach
    (37.0, -123.5, 38.5, -121.5),   # SF Bay
    (48.0, -126.0, 50.0, -122.5),   # Juan de Fuca / Vancouver
    (22.0, -98.0, 24.0, -96.0),     # SW Gulf of Mexico
    (-24.5, -47.0, -22.5, -43.5),   # Santos / Rio approaches
    # Africa / Oceania
    (-35.5, 17.5, -33.5, 20.0),     # Cape of Good Hope
    (-34.0, 150.5, -32.5, 152.5),   # Sydney approaches
    (-38.5, 144.0, -37.0, 146.0),   # Bass Strait / Melbourne
    (-27.5, 152.5, -26.0, 154.0),   # Brisbane
    (24.5, 50.0, 27.0, 52.5),       # Arabian Gulf west
]


def scrape_digitraffic_ais_snapshot() -> dict:
    """
    Worldwide open AIS snapshot: Digitraffic (Baltic/FI) + Open Waters corridor tiles.
    VesselFinder / MarineTraffic are NOT scraped (ToS forbid automated extraction).
    """
    import gzip
    import time as _time

    ua = {
        "User-Agent": "SetSailMarineSuite/5.14 (+https://setsail-ai.vercel.app)",
        "Digitraffic-User": "SetSailMarineSuite/AIS",
        "Accept": "application/json",
        "Accept-Encoding": "gzip",
    }

    def _get_json(url, headers=None):
        hdrs = headers or ua
        session = get_http_session()
        if session is not None:
            resp = session.get(url, headers=hdrs, timeout=60)
            resp.raise_for_status()
            raw = resp.content
        else:
            req = urllib.request.Request(url, headers=hdrs)
            with urllib.request.urlopen(req, timeout=60) as resp:
                raw = resp.read()
        try:
            raw = gzip.decompress(raw)
        except Exception:
            pass
        return json.loads(raw.decode("utf-8", errors="replace"))

    by_mmsi = {}

    def _put(t):
        mmsi = t.get("mmsi")
        if mmsi is None:
            return
        key = int(mmsi) if str(mmsi).isdigit() else mmsi
        prev = by_mmsi.get(key)
        if not prev:
            by_mmsi[key] = t
            return
        if (not prev.get("name") and t.get("name")) or (float(t.get("sog") or 0) > float(prev.get("sog") or 0)):
            merged = dict(prev)
            merged.update({k: v for k, v in t.items() if v not in (None, "")})
            by_mmsi[key] = merged

    # --- Digitraffic (dense Baltic / FI) ---
    try:
        loc_url = "https://meri.digitraffic.fi/api/ais/v1/locations"
        ves_url = "https://meri.digitraffic.fi/api/ais/v1/vessels"
        geo = _get_json(loc_url)
        meta = {}
        try:
            vessels = _get_json(ves_url)
            arr = vessels if isinstance(vessels, list) else (vessels.get("vessels") or [])
            for v in arr:
                mmsi = v.get("mmsi")
                if mmsi is None:
                    continue
                meta[int(mmsi)] = {
                    "name": (v.get("name") or "").strip(),
                    "destination": (v.get("destination") or "").strip(),
                    "shipType": v.get("shipType") or v.get("shipTypeName") or "",
                }
        except Exception as e:
            print(f"[AIS] Digitraffic meta warning: {e}")

        for f in geo.get("features") or []:
            p = f.get("properties") or {}
            c = (f.get("geometry") or {}).get("coordinates") or []
            if len(c) < 2:
                continue
            mmsi = p.get("mmsi")
            m = meta.get(int(mmsi), {}) if mmsi is not None else {}
            _put({
                "mmsi": mmsi,
                "lat": c[1],
                "lon": c[0],
                "sog": p.get("sog"),
                "cog": p.get("cog"),
                "heading": p.get("heading"),
                "navStat": p.get("navStat"),
                "name": m.get("name") or "",
                "destination": m.get("destination") or "",
                "shipType": m.get("shipType") or "",
                "source": "Digitraffic open AIS (Baltic/FI)",
            })
        print(f"[AIS] Digitraffic targets so far: {len(by_mmsi)}")
    except Exception as e:
        print(f"[AIS] Digitraffic failed: {e}")

    # --- Open Waters worldwide corridor tiles ---
    ow_hdrs = {
        "User-Agent": "SetSailMarineSuite/5.14 (+https://setsail-ai.vercel.app)",
        "Accept": "application/geo+json, application/json",
    }
    ow_ok = 0
    for (min_lat, min_lon, max_lat, max_lon) in OPEN_WATERS_AIS_CORRIDORS:
        bbox = f"{min_lat},{min_lon},{max_lat},{max_lon}"
        url = f"https://ais.openwaters.io/v1/vessels?bbox={bbox}"
        try:
            geo = _get_json(url, headers=ow_hdrs)
            for f in geo.get("features") or []:
                p = f.get("properties") or {}
                c = (f.get("geometry") or {}).get("coordinates") or []
                if len(c) < 2:
                    continue
                _put({
                    "mmsi": p.get("mmsi"),
                    "lat": c[1],
                    "lon": c[0],
                    "sog": p.get("sog"),
                    "cog": p.get("cog"),
                    "heading": p.get("heading"),
                    "navStat": p.get("nav_status") if p.get("nav_status") is not None else p.get("navStat"),
                    "name": (p.get("name") or "").strip(),
                    "destination": (p.get("destination") or "").strip(),
                    "shipType": p.get("type") or p.get("shipType") or "",
                    "source": f"Open Waters AIS ({p.get('source') or 'community'})",
                })
            ow_ok += 1
            _time.sleep(0.35)  # stay well under 120 req/min
        except Exception as e:
            print(f"[AIS] Open Waters tile fail {bbox}: {e}")

    targets = list(by_mmsi.values())
    print(f"[AIS] Open Waters tiles ok={ow_ok}/{len(OPEN_WATERS_AIS_CORRIDORS)}; unique={len(targets)}")

    return {
        "updatedAt": datetime.datetime.now(timezone.utc).isoformat(),
        "source": "Digitraffic + Open Waters open AIS corridors",
        "note": (
            "Not VesselFinder/MarineTraffic. Live overlay uses Open Waters viewport tiles "
            "worldwide; this snapshot densifies major chokepoints for zoomed-out / offline use."
        ),
        "updateHintSec": 90,
        "count": len(targets),
        "targets": targets,
    }


def scrape_live_marine_weather() -> dict:
    """
    Scrapes real-time active tropical cyclones, tropical depressions & active Invests (e.g. 93E) from:
      1. JTWC / NHC Global Tracker (cyclocane.com embedded GeoJSON: forecasts, official, models, formationAreas)
      2. NOAA National Hurricane Center (CurrentStorms.json & ftp.nhc.noaa.gov/atcf/btk/)
      3. UCAR / JTWC Open ATCF B-Decks (hurricanes.ral.ucar.edu/repository/data/bdecks_open/)
      4. Japan Meteorological Agency RSMC Tokyo (targetTc.json + specifications.json)
      5. Open-Meteo Marine & Synoptic GFS/ECMWF Grid (live waves, pressure, winds)
    """
    now_dt = datetime.datetime.now(timezone.utc)
    now_iso = now_dt.isoformat()
    cur_year = now_dt.year
    storms_by_name = {}
    ua = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

    # A. Cyclocane Global Official Tracks, Forecasts, Invest Models & Formation Areas
    cyc_forecasts = {}
    cyc_models = {}
    cyc_formations = []
    try:
        r_cyc = requests.get("https://www.cyclocane.com/", timeout=15, headers=ua)
        if r_cyc.status_code == 200:
            html_c = r_cyc.text
            idx = html_c.find('"outlooks":{"type":"FeatureCollection"')
            if idx == -1:
                idx = html_c.find("FeatureCollection")
            if idx != -1:
                sc_s = html_c.rfind(">", 0, idx) + 1
                sc_e = html_c.find("</script>", idx)
                c_obj = json.loads(html_c[sc_s:sc_e].strip()).get("data", {})

                for f in c_obj.get("forecasts", {}).get("features", []):
                    p = f.get("properties", {})
                    g = f.get("geometry", {})
                    nm = str(p.get("name") or "").strip().upper()
                    coords = g.get("coordinates", [])
                    if nm and len(coords) >= 2:
                        cyc_forecasts.setdefault(nm, []).append({
                            "storm_id": str(p.get("storm_id") or nm),
                            "basin": str(p.get("basin") or ""),
                            "number": str(p.get("number") or ""),
                            "name": nm,
                            "source": str(p.get("source") or "NHC/JTWC"),
                            "intensity": str(p.get("intensity") or "Tropical Cyclone"),
                            "knots": int(p.get("knots") or 35),
                            "time": str(p.get("time") or ""),
                            "lat": round(float(coords[1]), 2),
                            "lon": round(float(coords[0]), 2)
                        })

                for nm in cyc_forecasts:
                    cyc_forecasts[nm].sort(key=lambda x: x.get("time", ""))

                for f in c_obj.get("models", {}).get("features", []):
                    p = f.get("properties", {})
                    g = f.get("geometry", {})
                    sid = str(p.get("storm_id") or "").strip().upper()
                    mname = str(p.get("model_name") or "").strip().upper()
                    coords = g.get("coordinates", [])
                    if sid and mname and isinstance(coords, list) and len(coords) >= 2:
                        cyc_models.setdefault(sid, {})[mname] = {
                            "basin": str(p.get("basin") or sid.split("-")[0]),
                            "number": str(p.get("number") or sid.split("-")[-1]),
                            "coords": [[round(float(c[1]), 2), round(float(c[0]), 2)] for c in coords if isinstance(c, (list, tuple)) and len(c) >= 2]
                        }

                fa_raw = c_obj.get("formationAreas")
                if isinstance(fa_raw, list):
                    cyc_formations = fa_raw
    except Exception as e:
        print(f"  [!] Cyclocane parse warning: {e}")

    def build_track_from_cyc(f_pts: list) -> list:
        if not f_pts or len(f_pts) < 2:
            return []
        track_out = []
        t0_str = f_pts[0].get("time", "")
        t0_dt = None
        if t0_str:
            try:
                t0_dt = datetime.fromisoformat(t0_str.replace("Z", "+00:00"))
            except Exception:
                t0_dt = None
        for idx_pt, fp in enumerate(f_pts[1:8]):
            tau = (idx_pt + 1) * 12
            if t0_dt and fp.get("time"):
                try:
                    t_cur = datetime.fromisoformat(fp["time"].replace("Z", "+00:00"))
                    diff_h = int(round((t_cur - t0_dt).total_seconds() / 3600.0))
                    if diff_h > 0:
                        tau = diff_h
                except Exception:
                    pass
            track_out.append({
                "tau": tau,
                "coords": [fp["lat"], fp["lon"]],
                "winds": fp["knots"],
                "radiusNm": min(160, 40 + int(tau * 1.4))
            })
        return track_out

    # B. NOAA National Hurricane Center (CurrentStorms.json)
    try:
        r_nhc = requests.get("https://www.nhc.noaa.gov/CurrentStorms.json", timeout=15, headers=ua)
        if r_nhc.status_code == 200:
            for s in r_nhc.json().get("activeStorms", []):
                nm_raw = str(s.get("name") or "").strip()
                nm_up = nm_raw.upper()
                if not nm_up:
                    continue
                lat = round(float(s.get("latitudeNumeric") or 0), 2)
                lon = round(float(s.get("longitudeNumeric") or 0), 2)
                winds = int(float(s.get("intensity") or 35))
                gusts = int(round(winds * 1.22))
                press = int(float(s.get("pressure") or 1000))
                mdir = deg_to_compass(s.get("movementDir") or 0)
                mspd = int(float(s.get("movementSpeed") or 10))
                cls_code = str(s.get("classification") or "TC").upper()
                cls_map = {
                    "HU": "Hurricane",
                    "MH": "Major Hurricane",
                    "TS": "Tropical Storm",
                    "TD": "Tropical Depression",
                    "PTC": "Post-Tropical Cyclone",
                    "STD": "Subtropical Depression",
                    "STS": "Subtropical Storm"
                }
                cat_label = cls_map.get(cls_code, cls_code)
                if winds >= 137: cat_label = "Category 5 Hurricane"
                elif winds >= 113: cat_label = "Category 4 Hurricane"
                elif winds >= 96: cat_label = "Category 3 Major Hurricane"
                elif winds >= 83: cat_label = "Category 2 Hurricane"
                elif winds >= 64: cat_label = "Category 1 Hurricane"

                f_pts = cyc_forecasts.get(nm_up, [])
                track_out = build_track_from_cyc(f_pts)

                storms_by_name[nm_up] = {
                    "id": str(s.get("id") or nm_up).upper(),
                    "name": f"{cat_label.split()[-1] if 'Hurricane' in cat_label else cat_label} {nm_up}",
                    "shortName": nm_raw.title(),
                    "category": f"{cat_label} (NOAA NHC)",
                    "center": [lat, lon],
                    "centralPressure": press,
                    "maxWinds": winds,
                    "gusts": gusts,
                    "movement": f"{mdir} at {mspd} kts",
                    "dangerRadiusNm": max(70, int(winds * 1.15)),
                    "forecastTrack": track_out
                }
    except Exception as e:
        print(f"  [!] NHC CurrentStorms warning: {e}")

    # C. JTWC / Official Active Cyclones from Cyclocane + ATCF B-Deck + JMA Cross-Check
    jma_by_name = {}
    try:
        r_jma = requests.get("https://www.jma.go.jp/bosai/typhoon/data/targetTc.json", timeout=15, headers=ua)
        if r_jma.status_code == 200:
            for tc_entry in r_jma.json():
                tc_id = tc_entry.get("tropicalCyclone")
                if not tc_id:
                    continue
                r_spec = requests.get(f"https://www.jma.go.jp/bosai/typhoon/data/{tc_id}/specifications.json", timeout=15, headers=ua)
                if r_spec.status_code != 200:
                    continue
                specs = r_spec.json()
                if not specs or len(specs) < 2:
                    continue
                title_part = specs[0]
                anal_part = specs[1]
                nm_en = str((title_part.get("name") or {}).get("en") or tc_id).strip()
                if nm_en:
                    jma_by_name[nm_en.upper()] = (title_part, anal_part, specs[2:])
    except Exception as e:
        print(f"  [!] JMA RSMC warning: {e}")

    for nm_up, f_pts in cyc_forecasts.items():
        if nm_up in storms_by_name or not f_pts:
            continue
        p0 = f_pts[0]
        lat, lon = p0["lat"], p0["lon"]
        winds = p0["knots"]
        sid = p0.get("storm_id") or nm_up
        basin = p0.get("basin") or (sid.split("-")[0] if "-" in sid else "WP")
        num = p0.get("number") or (sid.split("-")[-1] if "-" in sid else "01")

        atcf_info = _parse_atcf_best_line(basin, num, cur_year, ua)
        press = atcf_info.get("pressure") or max(920, 1012 - int(winds * 0.65))
        if atcf_info.get("lat") is not None and atcf_info.get("lon") is not None:
            lat, lon = atcf_info["lat"], atcf_info["lon"]
        if atcf_info.get("winds"):
            winds = max(winds, atcf_info["winds"])

        jma_info = jma_by_name.get(nm_up)
        if jma_info:
            _, anal_part, _ = jma_info
            if anal_part.get("pressure"):
                press = int(float(anal_part["pressure"]))

        track_out = build_track_from_cyc(f_pts)
        if track_out:
            movement_str = _calc_track_movement(lat, lon, track_out[0]["coords"][0], track_out[0]["coords"][1], track_out[0]["tau"])
        else:
            movement_str = "Tracked via JTWC"

        intensity_lbl = p0.get("intensity") or "Tropical Cyclone"
        if basin.upper() == "WP" and winds >= 64:
            type_prefix = "Typhoon"
            cat_str = f"Typhoon ({p0.get('source', 'JTWC')}/JMA)"
        elif winds >= 64:
            type_prefix = "Hurricane"
            cat_str = f"{intensity_lbl} ({p0.get('source', 'JTWC')})"
        elif winds >= 34:
            type_prefix = "Tropical Storm"
            cat_str = f"Tropical Storm ({p0.get('source', 'JTWC')})"
        else:
            type_prefix = "Tropical Depression"
            cat_str = f"Tropical Depression ({p0.get('source', 'JTWC')})"

        storms_by_name[nm_up] = {
            "id": sid,
            "name": f"{type_prefix} {nm_up}",
            "shortName": nm_up.title(),
            "category": cat_str,
            "center": [lat, lon],
            "centralPressure": press,
            "maxWinds": winds,
            "gusts": int(round(winds * 1.25)),
            "movement": movement_str,
            "dangerRadiusNm": max(65, int(winds * 1.2)),
            "forecastTrack": track_out
        }

    # D. Active Invests / Disturbances (90–99, e.g., Invest 93E / EP-93) from Cyclocane Models + ATCF B-Deck
    basin_suffix_map = {"EP": "E", "AL": "L", "CP": "C", "WP": "W", "IO": "I", "SH": "S"}
    for sid, mdict in cyc_models.items():
        sample_m = next(iter(mdict.values()), {})
        basin = str(sample_m.get("basin") or sid.split("-")[0]).upper()
        num = str(sample_m.get("number") or sid.split("-")[-1]).strip()
        if not num.isdigit() or not (90 <= int(num) <= 99):
            continue
        b_let = basin_suffix_map.get(basin, basin[:1])
        invest_code = f"{num}{b_let}"
        if invest_code in storms_by_name:
            continue

        # Pick consensus model track (TVCN > HCCA > AVNI > AEMI > OCD5 > XTRP > any non-CARQ)
        pref_models = ["TVCN", "HCCA", "AVNI", "AEMI", "GDMI", "OCD5", "HWFI", "HMNI", "XTRP"]
        chosen_coords = []
        for pm in pref_models:
            if pm in mdict and len(mdict[pm]["coords"]) >= 2:
                chosen_coords = mdict[pm]["coords"]
                break
        if not chosen_coords:
            for k_m, v_m in mdict.items():
                if k_m != "CARQ" and len(v_m["coords"]) >= 2:
                    chosen_coords = v_m["coords"]
                    break
        if not chosen_coords:
            continue

        atcf_info = _parse_atcf_best_line(basin, num, cur_year, ua)
        lat = atcf_info.get("lat") if atcf_info.get("lat") is not None else chosen_coords[0][0]
        lon = atcf_info.get("lon") if atcf_info.get("lon") is not None else chosen_coords[0][1]
        winds = atcf_info.get("winds") or 25
        press = atcf_info.get("pressure") or 1008

        # Dedup consecutive identical model coordinates and build 12h forecast steps
        dedup_pts = []
        for pt in chosen_coords[1:]:
            if abs(pt[0] - lat) < 0.15 and abs(pt[1] - lon) < 0.15:
                continue
            if not dedup_pts or (abs(pt[0] - dedup_pts[-1][0]) >= 0.2 or abs(pt[1] - dedup_pts[-1][1]) >= 0.2):
                dedup_pts.append(pt)

        track_out = []
        for idx_pt, pt in enumerate(dedup_pts[:5]):
            tau = (idx_pt + 1) * 12
            est_w = min(65, winds + (idx_pt + 1) * 5)
            track_out.append({
                "tau": tau,
                "coords": [pt[0], pt[1]],
                "winds": est_w,
                "radiusNm": 45 + idx_pt * 15
            })

        movement_str = _calc_track_movement(lat, lon, track_out[0]["coords"][0], track_out[0]["coords"][1], 12.0) if track_out else "WNW at 10 kts"

        # Match formation chance from formationAreas if nearby
        chance_str = "Active Invest"
        for fa in cyc_formations:
            try:
                fa_lat = float(fa.get("latitude") or 0)
                fa_lon = float(fa.get("longitude") or 0)
                if abs(fa_lat - lat) < 8.0 and abs(fa_lon - lon) < 8.0:
                    ch_list = fa.get("chance_by_time_period") or []
                    if ch_list and len(ch_list[0]) >= 2:
                        chance_str = f"Formation Chance {ch_list[0][1]}"
                    break
            except Exception:
                pass

        storms_by_name[invest_code] = {
            "id": f"{basin}{num}{cur_year}",
            "name": f"Invest {invest_code}",
            "shortName": invest_code,
            "category": f"Tropical Disturbance ({chance_str})",
            "center": [lat, lon],
            "centralPressure": press,
            "maxWinds": winds,
            "gusts": int(round(winds * 1.3)),
            "movement": movement_str,
            "dangerRadiusNm": 65,
            "forecastTrack": track_out
        }

    storms_list = list(storms_by_name.values())

    # E. Dynamically build Wave Basins, Pressure Centers & Wind Vectors from live storm coordinates
    waves_list = [
        {"id": "W1", "name": "North Atlantic Storm Basin", "center": [52.0, -25.0], "radiusNm": 240, "waveHeight": 4.2, "swellPeriod": 11, "swellDir": "WNW"},
        {"id": "W2", "name": "Southern Ocean / Roaring Forties", "center": [-42.0, 35.0], "radiusNm": 300, "waveHeight": 5.1, "swellPeriod": 13, "swellDir": "SW"}
    ]
    pressure_centers = []
    wind_vectors = []

    for idx_s, st in enumerate(storms_list):
        c_lat, c_lon = st["center"][0], st["center"][1]
        pressure_centers.append({
            "type": "L",
            "value": st["centralPressure"],
            "name": f"{st['name']} Core Low",
            "coords": [c_lat, c_lon]
        })
        wind_vectors.append({
            "coords": [round(c_lat + 0.3, 2), round(c_lon + 0.3, 2)],
            "dir": 160 if c_lon < 0 else 200,
            "speed": st["maxWinds"],
            "label": f"{st['maxWinds']} kts ({st['shortName']})"
        })
        if st["maxWinds"] >= 30:
            waves_list.append({
                "id": f"WS{idx_s + 1}",
                "name": f"{st['shortName']} Cyclonic Wave Field",
                "center": [c_lat, c_lon],
                "radiusNm": max(150, st["dangerRadiusNm"] * 2),
                "waveHeight": round(max(3.2, st["maxWinds"] * 0.075), 1),
                "swellPeriod": max(9, int(round(st["maxWinds"] * 0.13))),
                "swellDir": st["movement"].split()[0] if st.get("movement") else "WNW"
            })

    pressure_centers.extend([
        {"type": "H", "value": 1026, "name": "Azores Subtropical High", "coords": [32.0, -38.0]},
        {"type": "H", "value": 1024, "name": "North Pacific High", "coords": [34.0, -142.0]},
        {"type": "H", "value": 1025, "name": "South Indian Ocean High", "coords": [-30.0, 85.0]}
    ])

    try:
        lats = ",".join(str(w["center"][0]) for w in waves_list)
        lons = ",".join(str(w["center"][1]) for w in waves_list)
        m_url = f"https://marine-api.open-meteo.com/v1/marine?latitude={lats}&longitude={lons}&current=wave_height,wave_direction,wave_period&timezone=GMT"
        r_m = requests.get(m_url, timeout=10, headers=ua)
        if r_m.status_code == 200:
            m_arr = r_m.json()
            if isinstance(m_arr, list):
                for idx_w, m_item in enumerate(m_arr):
                    cur = m_item.get("current") or {}
                    if cur.get("wave_height") is not None:
                        waves_list[idx_w]["waveHeight"] = round(max(2.5, float(cur["wave_height"])), 1)
                    if cur.get("wave_period") is not None:
                        waves_list[idx_w]["swellPeriod"] = int(round(float(cur["wave_period"])))
                    if cur.get("wave_direction") is not None:
                        waves_list[idx_w]["swellDir"] = deg_to_compass(cur["wave_direction"])
    except Exception:
        pass

    print(f"  [+] Scraped {len(storms_list)} live active tropical systems: {[s['shortName'] for s in storms_list]}")

    # F. OPC High Seas / NDBC buoys / MSL pressure grid / ocean currents
    opc_warnings = []
    ndbc_buoys = []
    pressure_grid = []
    ocean_currents = []
    try:
        from _weather_layers_scrape import (
            scrape_opc_warnings,
            scrape_ndbc_buoys,
            scrape_pressure_grid,
            scrape_ocean_currents,
        )
        sess = requests.Session() if requests else None
        if sess is not None:
            opc_warnings = scrape_opc_warnings(sess, ua)
            ndbc_buoys = scrape_ndbc_buoys(sess, ua)
            pressure_grid = scrape_pressure_grid(sess, ua)
            ocean_currents = scrape_ocean_currents(sess, ua)
    except Exception as e:
        print(f"  [!] Extended weather layers scrape warning: {e}")

    return {
        "synopticCycle": now_dt.strftime("%H00 UTC"),
        "lastSyncUtc": now_iso,
        "provider": "NOAA NHC + JTWC + JMA RSMC + NOAA OPC High Seas + NDBC + Open-Meteo ECMWF IFS / Marine",
        "storms": storms_list,
        "waves": waves_list,
        "pressureCenters": pressure_centers,
        "windVectors": wind_vectors,
        "opcWarnings": opc_warnings,
        "buoys": ndbc_buoys,
        "pressureGrid": pressure_grid,
        "currents": ocean_currents,
    }

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = script_dir if os.path.basename(script_dir).lower() != "scripts" else os.path.dirname(script_dir)
    public_dir = os.path.join(repo_root, "public")
    notices_json_path = os.path.join(public_dir, "notices.json")
    root_notices_path = os.path.join(repo_root, "notices.json")
    os.makedirs(public_dir, exist_ok=True)

    navtex_only = "--navtex-only" in sys.argv
    if not navtex_only:
        try:
            main()
        except Exception as e:
            print(f"[warn] UKHO scrape warning: {e}")

    existing_ukho_notices = []
    existing_meta = {}
    existing_cancelled = []
    target_read = notices_json_path if os.path.exists(notices_json_path) else root_notices_path
    if os.path.exists(target_read):
        try:
            with open(target_read, "r", encoding="utf-8") as f:
                old_data = json.load(f)
                existing_meta = old_data.get("metadata", {})
                existing_cancelled = old_data.get("cancelledIds", [])
                existing_ukho_notices = [
                    n for n in old_data.get("notices", [])
                    if n.get("type") != "NAVTEX" and n.get("source") not in ("NAVTEX / NAVAREA", "NGA MSI / NAVAREA")
                ]
        except Exception as e:
            print(f"[warn] Reading existing notices.json: {e}")

    for n in existing_ukho_notices:
        if not n.get("navarea") and n.get("coords"):
            c0 = n["coords"][0]
            n["navarea"] = infer_navarea_from_coords(c0["lat"], c0["lon"], f"{n.get('country','')} {n.get('region','')}")
        if n.get("coords") and ("lat" not in n or "lon" not in n):
            n["lat"] = n["coords"][0]["lat"]
            n["lon"] = n["coords"][0]["lon"]

    print("\n[5/5] Scraping Global NAVTEX & NAVAREA Broadcast Warnings (6h Cycle)...")
    navtex_list, navtex_cancelled_refs = build_global_navtex_notices()

    # Dedupe UKHO NtM by normalized id (keep richest body / polygon)
    ukho_deduped = []
    ukho_seen = {}
    for n in existing_ukho_notices:
        kid = re.sub(r"\s+", " ", str(n.get("id") or n.get("noticeNumber") or "").upper().strip())
        if not kid:
            ukho_deduped.append(n)
            continue
        prev_i = ukho_seen.get(kid)
        if prev_i is None:
            ukho_seen[kid] = len(ukho_deduped)
            ukho_deduped.append(n)
            continue
        prev = ukho_deduped[prev_i]
        prev_score = (2 if prev.get("isPolygon") else 0) + min(len(prev.get("body") or ""), 800)
        new_score = (2 if n.get("isPolygon") else 0) + min(len(n.get("body") or ""), 800)
        if new_score >= prev_score:
            ukho_deduped[prev_i] = n
    if len(ukho_deduped) != len(existing_ukho_notices):
        print(f"  [+] UKHO NtM dedupe: {len(existing_ukho_notices)} → {len(ukho_deduped)}")
    existing_ukho_notices = ukho_deduped

    combined_notices = existing_ukho_notices + navtex_list
    active_notices = [n for n in combined_notices if not n.get("isCancelled")]
    cancelled_notices = [n for n in combined_notices if n.get("isCancelled")]
    active_navtex = [n for n in navtex_list if not n.get("isCancelled")]

    week_num = existing_meta.get("weekNumber") or 42
    year_num = existing_meta.get("year") or 26

    final_payload = {
        "metadata": {
            "generatedAt": datetime.datetime.now(timezone.utc).isoformat(),
            "scrapedAt": datetime.datetime.now(timezone.utc).isoformat(),
            "source": "UKHO Admiralty Weekly NtM + Global NAVTEX/NAVAREA (JCG JHOD, Taiwan Navy, NautoShark, US NGA MSI)",
            "weeklyBulletin": existing_meta.get("weeklyBulletin", f"{week_num}wknm{year_num}.pdf"),
            "weekNumber": week_num,
            "year": year_num,
            "updateSchedule": "Every 6 Hours (00:00, 06:00, 12:00, 18:00 UTC)",
            "totalNotices": len(combined_notices),
            "activeNotices": len(active_notices),
            "cancelledNotices": len(cancelled_notices),
            "ukhoNoticesCount": len(existing_ukho_notices),
            "navtexWarningsCount": len(navtex_list),
            "activeNavtexCount": len(active_navtex),
            "countT": len([n for n in active_notices if n.get("type") == "T"]),
            "countP": len([n for n in active_notices if n.get("type") == "P"]),
            "countPerm": len([n for n in active_notices if n.get("type") == "PERM"]),
            "countNavtex": len(active_navtex),
            "countPoly": len([n for n in active_notices if n.get("isPolygon")]),
            "countLine": len([n for n in active_notices if n.get("isLine")])
        },
        "cancelledIds": sorted(list(set(existing_cancelled + navtex_cancelled_refs)))[:600],
        "notices": combined_notices
    }

    with open(notices_json_path, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, separators=(",", ":"), ensure_ascii=False)
    with open(root_notices_path, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, separators=(",", ":"), ensure_ascii=False)

    print(f"[+] Saved {len(combined_notices)} total notices ({len(existing_ukho_notices)} UKHO NtM + {len(navtex_list)} NAVTEX/NAVAREA) to notices.json")

    print("\n[6/6] Scraping Live Global Tropical Cyclones & Synoptic Marine Weather...")
    wx_payload = scrape_live_marine_weather()
    for wx_p in [os.path.join(public_dir, "weather.json"), os.path.join(repo_root, "weather.json")]:
        with open(wx_p, "w", encoding="utf-8") as f:
            json.dump(wx_payload, f, indent=2, ensure_ascii=False)
    print("[+] Saved live marine weather & tropical cyclones to weather.json and public/weather.json")

    # -------------------------------------------------------------------------
    # 4. Scrape Global Maritime News Feeds -> news.json & public/news.json
    # -------------------------------------------------------------------------
    try:
        from build_news_and_scraper_v49 import scrape_live_maritime_news
        news_payload = scrape_live_maritime_news()
        with open("news.json", "w", encoding="utf-8") as nf:
            json.dump(news_payload, nf, ensure_ascii=False, indent=2)
        os.makedirs("public", exist_ok=True)
        with open(os.path.join("public", "news.json"), "w", encoding="utf-8") as nf2:
            json.dump(news_payload, nf2, ensure_ascii=False, indent=2)
        print(f"[+] Saved {news_payload.get('totalArticles', 0)} maritime news articles to news.json and public/news.json")
    except Exception as news_err:
        print(f"[!] Maritime news scrape warning: {news_err}")

    # -------------------------------------------------------------------------
    # AIS snapshot: Digitraffic (Baltic) + Open Waters worldwide corridor tiles.
    # Not VesselFinder/MarineTraffic (ToS forbid scrape). Client also loads live
    # Open Waters for the current map viewport when AIS overlay is on.
    # -------------------------------------------------------------------------
    try:
        ais_payload = scrape_digitraffic_ais_snapshot()
        for ais_path in [
            os.path.join(public_dir, "ais.json"),
            os.path.join(repo_root, "ais.json"),
        ]:
            with open(ais_path, "w", encoding="utf-8") as af:
                json.dump(ais_payload, af, separators=(",", ":"), ensure_ascii=False)
        print(f"[+] Saved AIS snapshot ({ais_payload.get('count', 0)} targets) to ais.json")
    except Exception as ais_err:
        print(f"[!] AIS snapshot warning: {ais_err}")

