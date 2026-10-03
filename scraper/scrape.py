#!/usr/bin/env python3
"""
Admiralty Notices to Mariners (NtM) Scraper & Parser
====================================================
Automatically fetches the latest weekly bulletin PDFs from the official UKHO
Admiralty Maritime Safety Information website (msi.admiralty.co.uk), extracts
all notices (Permanent, Temporary T, Preliminary P, Areas, Lines), checks for
cancellations, and produces an up-to-date `public/notices.json` file for the
OPEN CALC / Auto-NtM interactive navigation map.

Runs automatically via GitHub Actions every Thursday when UKHO issues new updates.
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
CUMULATIVE_URL = f"{BASE_URL}/NoticesToMariners/Cumulative"

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AdmiraltyNtMScraper/1.0"

# ── 1. Regular Expressions for All Notice Types ──

# Header regex: Captures notice number, country, region, subject
NTM_ALL_HEADER_REGEX = re.compile(
    r'(?:^|\n)\s*(\d{1,5}(?:\s*\([TP]\))?(?:\s*/\s*\d{2,4})?)\s*(?:\n|\s{1,6})'
    r'([A-Z\s\-\u00C0-\u024F\u2013\u2014\ufffd]{3,35}?)\s*[\-\u2013\u2014]\s*'
    r'([A-Za-z0-9\s\-\(\)\.\u00C0-\u024F\u2013\u2014\ufffd]{2,45}?)\s*[\-\u2013\u2014]\s*'
    r'([^\n\r]+)',
    re.MULTILINE
)

# Standard Admiralty coordinates: e.g. 58° 37.70'N., 17° 46.30'E.
NTM_COORD_STD_REGEX = re.compile(
    r'(\d{1,2})\s*[\xb0\ufffd\xb7\s\u00B0\u00BA°]+\s*(\d{1,2})[\.\,\xb7\ufffd\u00B7\xb4\'´\s]+(\d{1,4})\s*[\'\u2032\s]*([NS])\.?\s*,?\s*'
    r'(\d{1,3})\s*[\xb0\ufffd\xb7\s\u00B0\u00BA°]+\s*(\d{1,2})[\.\,\xb7\ufffd\u00B7\xb4\'´\s]+(\d{1,4})\s*[\'\u2032\s]*([EW])\.?',
    re.IGNORECASE
)

# NAVAREA dash coordinates: e.g. 60-06.7N 002-35.5E
NTM_COORD_DASH_REGEX = re.compile(
    r'(\d{2})-(\d{2}[\.\,]\d+)\s*([NS])\.?\s*,?\s*(\d{2,3})-(\d{2}[\.\,]\d+)\s*([EW])\.?',
    re.IGNORECASE
)

# Affected charts regex
CHARTS_REGEX = re.compile(r'Charts?\s+affected\s*[:\u2014\-~\s]+([0-9\s_\-\u2014~]+)', re.IGNORECASE)

# Cancellation regex: e.g. Former Notice 4267(T)/24 is cancelled
CANCELLATION_REGEX = re.compile(
    r'Former\s+Notice\s+(\d+)(?:\s*\(([TP])\))?(?:\s*/\s*(\d{2,4}))?\s+is\s+cancelled',
    re.IGNORECASE
)

# Specific UKHO area / polygon boundary keywords (excludes generic "area")
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

# Specific line keywords (pipelines, reporting lines, channels)
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
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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


def download_file(url, target_path, session=None):
    """Download file from URL to disk using session cookies."""
    print(f"  Downloading: {url} -> {target_path}")
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    if session is not None:
        headers = {"Referer": WEEKLY_URL}
        r = session.get(url, headers=headers, stream=True, timeout=60)
        r.raise_for_status()
        with open(target_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=65536):
                if chunk:
                    f.write(chunk)
        size = os.path.getsize(target_path)
        print(f"  Saved ({size:,} bytes)")
        return target_path
    
    data = fetch_url(url, timeout=60)
    with open(target_path, "wb") as f:
        f.write(data)
    print(f"  Saved ({len(data):,} bytes)")
    return target_path



def extract_text_from_pdf(pdf_path):
    """Extract full text from PDF preserving line breaks."""
    if pdfplumber is not None:
        try:
            full_text = []
            with pdfplumber.open(pdf_path) as pdf:
                total_pages = len(pdf.pages)
                print(f"  Reading {total_pages} pages from PDF...")
                for idx, page in enumerate(pdf.pages, 1):
                    txt = page.extract_text() or ""
                    full_text.append(txt)
                    if idx % 25 == 0 or idx == total_pages:
                        print(f"    Page {idx}/{total_pages} processed...")
            return "\n".join(full_text)
        except Exception as e:
            print(f"  [warn] pdfplumber failed on {pdf_path}: {e}")

    
    # Fallback to pypdf
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        full_text = [p.extract_text() or "" for p in reader.pages]
        return "\n".join(full_text)
    except Exception as e:
        print(f"  [warn] pypdf failed on {pdf_path}: {e}")
    
    return ""


def parse_admiralty_ntm_text(full_text, default_year="26"):
    """
    Parse full bulletin text into structured notice objects.
    Same logic as tested in ntm_module.js.
    """
    if not full_text:
        return {"notices": [], "cancelledIds": []}
    
    clean_text = full_text.replace("\r\n", "\n")
    
    # Detect bulletin year
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
        
        # 1. Coordinates (Standard Admiralty degrees/minutes)
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
        
        # 2. Coordinates (Dash NAVAREA format fallback)
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
        
        # 4. Cancellations
        for can in CANCELLATION_REGEX.finditer(block_text):
            c_num = can.group(1)
            c_type = can.group(2) or ""
            c_yr = can.group(3) or detected_year
            c_id = f"{c_num}{'(' + c_type + ')' if c_type else ''}/{c_yr}"
            cancelled_ids.add(c_id)
        
        # 5. Geometry classification & geographic sanity check
        sane = True
        if len(coords) >= 2:
            lats = [c["lat"] for c in coords]
            lons = [c["lon"] for c in coords]
            if (max(lats) - min(lats)) > 8 or (max(lons) - min(lons)) > 12:
                sane = False
        
        is_poly = len(coords) >= 3 and bool(POLYGON_KEYWORDS.search(block_text)) and sane
        is_line = len(coords) >= 2 and not is_poly and sane and bool(LINE_KEYWORDS.search(block_text))
        
        results.append({
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
            "checkedForExport": True
        })
    
    return {
        "notices": results,
        "cancelledIds": sorted(list(cancelled_ids))
    }


def main():
    print("=" * 65)
    print(" Admiralty Notices to Mariners (UKHO) Automated Scraper")
    now_utc = datetime.datetime.now(datetime.timezone.utc).isoformat()
    print(f" Run timestamp: {now_utc}")
    print("=" * 65)
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    public_dir = os.path.join(repo_root, "public")
    cache_dir = os.path.join(script_dir, "cache")
    notices_json_path = os.path.join(public_dir, "notices.json")
    
    os.makedirs(cache_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    
    session = get_http_session()
    
    # Step 1: Scrape Weekly NtM Page
    print("\n[1/4] Fetching weekly bulletins from Admiralty MSI...")
    try:
        weekly_html = fetch_url(WEEKLY_URL, session=session).decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  [error] Failed to fetch {WEEKLY_URL}: {e}")
        return 1
    
    pdf_links = find_pdf_links(weekly_html)
    print(f"  Found {len(pdf_links)} PDF download links on Weekly page.")
    
    # Prioritize weekly full bulletin (e.g. 41wknm26.pdf) and Section II (41snii26.pdf)
    weekly_bulletin = None
    for item in pdf_links:
        fn = item["filename"].lower()
        if "wknm" in fn and fn.endswith(".pdf"):
            weekly_bulletin = item
            break
    if not weekly_bulletin:
        for item in pdf_links:
            fn = item["filename"].lower()
            if "snii" in fn and fn.endswith(".pdf"):
                weekly_bulletin = item
                break
    
    if not weekly_bulletin and pdf_links:
        weekly_bulletin = pdf_links[0]
        
    if not weekly_bulletin:
        print("  [warn] No suitable bulletin PDF found on Weekly page.")
        return 1
    
    print(f"  Target weekly bulletin: {weekly_bulletin['filename']}")
    
    # Step 2: Download PDF
    print("\n[2/4] Downloading latest bulletin PDF...")
    pdf_cache_file = os.path.join(cache_dir, weekly_bulletin["filename"])
    try:
        download_file(weekly_bulletin["url"], pdf_cache_file, session=session)
    except Exception as e:
        print(f"  [error] Download failed: {e}")
        return 1

    
    # Step 3: Extract Text & Parse Notices
    print("\n[3/4] Extracting text and parsing notices...")
    text = extract_text_from_pdf(pdf_cache_file)
    if not text:
        print("  [error] No text extracted from PDF.")
        return 1
    print(f"  Extracted {len(text):,} characters of text.")
    
    parsed = parse_admiralty_ntm_text(text)
    new_notices = parsed["notices"]
    new_cancellations = set(parsed["cancelledIds"])
    print(f"  Parsed {len(new_notices)} notices ({len(new_cancellations)} cancellations referenced).")
    
    # Step 4: Merge with existing notices.json
    print("\n[4/4] Updating notices.json...")
    existing_store = []
    all_cancelled = set()
    
    if os.path.exists(notices_json_path):
        try:
            with open(notices_json_path, "r", encoding="utf-8") as f:
                old_data = json.load(f)
                existing_store = old_data.get("notices", [])
                all_cancelled = set(old_data.get("cancelledIds", []))
            print(f"  Existing store had {len(existing_store)} notices.")
        except Exception as e:
            print(f"  [warn] Could not load old notices.json: {e}")
    
    all_cancelled.update(new_cancellations)
    
    # Apply cancellations to store
    store_dict = {n["id"]: n for n in existing_store if n["id"] not in all_cancelled}
    
    # Add or update newly parsed notices
    for n in new_notices:
        if n["id"] not in all_cancelled:
            store_dict[n["id"]] = n
    
    final_notices = list(store_dict.values())
    
    # Extract week and year from filename e.g. 41wknm26.pdf
    fn = weekly_bulletin["filename"]
    wm = re.search(r'(\d{1,2})wknm(\d{2})', fn, re.I) or re.search(r'(\d{1,2})snii(\d{2})', fn, re.I)
    week_num = int(wm.group(1)) if wm else None
    year_num = int(wm.group(2)) if wm else None
    
    out_payload = {
        "metadata": {
            "generatedAt": datetime.datetime.utcnow().isoformat() + "Z",
            "weeklyBulletin": weekly_bulletin["filename"],
            "batchId": weekly_bulletin.get("batch_id", ""),
            "weekNumber": week_num,
            "year": year_num,
            "totalNotices": len(final_notices),
            "countT": len([n for n in final_notices if n.get("type") == "T"]),
            "countP": len([n for n in final_notices if n.get("type") == "P"]),
            "countPerm": len([n for n in final_notices if n.get("type") == "PERM"]),
            "countPoly": len([n for n in final_notices if n.get("isPolygon")]),
            "countLine": len([n for n in final_notices if n.get("isLine")])
        },
        "cancelledIds": sorted(list(all_cancelled)),
        "notices": final_notices
    }
    
    with open(notices_json_path, "w", encoding="utf-8") as f:
        json.dump(out_payload, f, indent=2, ensure_ascii=False)
    
    print(f"\nSUCCESS! notices.json saved with {len(final_notices)} active notices.")
    print(f"  - Permanent:   {out_payload['metadata']['countPerm']}")
    print(f"  - Temporary T: {out_payload['metadata']['countT']}")
    print(f"  - Prelim P:    {out_payload['metadata']['countP']}")
    print(f"  - Polygons:    {out_payload['metadata']['countPoly']}")
    print(f"  - Lines:       {out_payload['metadata']['countLine']}")
    print("=" * 65)
    return 0


if __name__ == "__main__":
    sys.exit(main())
