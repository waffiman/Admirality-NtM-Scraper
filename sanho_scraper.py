#!/usr/bin/env python3
"""
SANHO (South African Navy Hydrographic Office) Notices to Mariners Provider.

Non-breaking, fault-isolated scraper & parser extending SetSail's NtM pipeline:
- Scrapes https://www.sanho.co.za/notices_mariners/notices_to_mariners.htm
- Resolves relative Monthly Edition, Annual Summary, and Cumulative List PDF links
  (recovering cleanly from server-side YYYY_Series path typos and missing current-year links)
- Extracts PDF text via pdfplumber (with pypdf fallback)
- Parses Section I (Cancelled + T&P in force), Section II (SAN Chart Updates w/ '*' original flag),
  Section III (New/Withdrawn SAN Charts & Publications), and Sections IV/V (HO Publications & SAN HO-1)
- Emits records conforming to SetSail's unified notices.json schema with authority="SANHO"
  and prefixed IDs ("SANHO ...") so UKHO notices and cancellations are never collided with.
"""

import datetime
import io
import json
import os
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request

try:
    import requests
except ImportError:
    requests = None

try:
    from bs4 import BeautifulSoup
except ImportError:
    BeautifulSoup = None

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

try:
    from pypdf import PdfReader as _PypdfReader
except ImportError:
    _PypdfReader = None

SANHO_AUTHORITY = "SANHO"
SANHO_INDEX_URL = "https://www.sanho.co.za/notices_mariners/notices_to_mariners.htm"
SANHO_BASE_URL = "https://www.sanho.co.za/"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

MONTH_MAP = {
    "JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6,
    "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12,
}
MONTH_ABBR = {v: k for k, v in MONTH_MAP.items()}
MONTH_NAMES = {
    1: "January", 2: "February", 3: "March", 4: "April",
    5: "May", 6: "June", 7: "July", 8: "August",
    9: "September", 10: "October", 11: "November", 12: "December",
}

# SANHO monthly Section II / IV / V / III numbered notice header regex:
# e.g. "67/25* SOUTH AFRICA - South West Coast - Submarine Pipeline."
# or   "28(T)/26* NAMIBIA - Offshore Walvis Bay - Wreck."
# or   "70/25 SA LIST OF LIGHTS AND RADIO SIGNALS (SAN HO-1) 2025 EDITION"
_SEC2_HEADER_RE = re.compile(
    r"(?m)^\s*(\d{1,4}(?:\s*\([TP]\))?\s*/\s*\d{2,4}\*?)\s+([^\n\r]+)"
)

# Section I T&P index entry: e.g. "28(T)/26 Namibia Offshore Walvis Bay Wreck."
_SEC1_TP_HEADER_RE = re.compile(
    r"(?m)^\s*(\d{1,4}\s*\([TP]\)\s*/\s*\d{2,4})\s+([^\n\r]+)"
)

# Coordinates: handles PDF kerning spaces inside degree digits (e.g. "0 14° 25.042' E")
_COORD_DM_RE = re.compile(
    r"(\d(?:\s*\d)?)\s*[°\xb0\u00ba]\s*(\d{1,2})[.,·\xb7](\d{1,4})\s*['\u2032\xb4´]*\s*([NS])"
    r"[\s,;:-]+"
    r"(\d(?:\s*\d){0,2})\s*[°\xb0\u00ba]\s*(\d{1,2})[.,·\xb7](\d{1,4})\s*['\u2032\xb4´]*\s*([EW])",
    re.IGNORECASE,
)

_COORD_DMS_RE = re.compile(
    r"(\d(?:\s*\d)?)\s*[°\xb0\u00ba]\s*(\d{1,2})\s*['\u2032]\s*(\d{1,2}(?:[.,]\d+)?)\s*[\"”\u2033]?\s*([NS])"
    r"[\s,;:-]+"
    r"(\d(?:\s*\d){0,2})\s*[°\xb0\u00ba]\s*(\d{1,2})\s*['\u2032]\s*(\d{1,2}(?:[.,]\d+)?)\s*[\"”\u2033]?\s*([EW])",
    re.IGNORECASE,
)

_POLYGON_KW_RE = re.compile(
    r"bounded\s+by|joining\s+the\s+following|limited\s+by|the\s+following\s+positions"
    r"|enclosed\s+by|prohibited\s+area|restricted\s+area|safety\s+zone",
    re.IGNORECASE,
)

_LINE_KW_RE = re.compile(
    r"joining(?:\s+the\s+following)?\s+positions|between\s+the\s+following"
    r"|submarine\s+(?:pipeline|cable)|oyster\s+lines?|pipeline|cable|route|channel|leading\s+line",
    re.IGNORECASE,
)

_ACTION_KW_RE = re.compile(r"(?m)\b(Insert|Amend|Delete|Substitute|Block|Replace|Move)\s*:", re.IGNORECASE)


def _format_dms(lat, lon):
    lat_dir = "N" if lat >= 0 else "S"
    lon_dir = "E" if lon >= 0 else "W"
    la = abs(lat)
    lo = abs(lon)
    lad = int(la)
    lam = (la - lad) * 60.0
    lod = int(lo)
    lom = (lo - lod) * 60.0
    return f"{lad}° {lam:06.3f}' {lat_dir}, {lod:03d}° {lom:06.3f}' {lon_dir}"


def _clean_deg_spaces(raw_digits):
    return int(re.sub(r"\s+", "", raw_digits))


def extract_sanho_coords(text):
    """Extract WGS-84 coordinates from a SANHO notice block."""
    if not text:
        return []
    coords = []
    seen = set()

    for m in _COORD_DM_RE.finditer(text):
        try:
            lad = _clean_deg_spaces(m.group(1))
            lam = float(f"{m.group(2)}.{m.group(3)}")
            lat = lad + lam / 60.0
            if m.group(4).upper() == "S":
                lat = -lat

            lod = _clean_deg_spaces(m.group(5))
            lom = float(f"{m.group(6)}.{m.group(7)}")
            lon = lod + lom / 60.0
            if m.group(8).upper() == "W":
                lon = -lon

            if abs(lat) > 90 or abs(lon) > 180:
                continue
            rlat, rlon = round(lat, 5), round(lon, 5)
            key = (rlat, rlon)
            if key in seen:
                continue
            seen.add(key)
            coords.append({"lat": rlat, "lon": rlon, "dms": _format_dms(rlat, rlon)})
        except Exception:
            continue

    if not coords:
        for m in _COORD_DMS_RE.finditer(text):
            try:
                lad = _clean_deg_spaces(m.group(1))
                lam = int(m.group(2))
                las = float(m.group(3).replace(",", "."))
                lat = lad + lam / 60.0 + las / 3600.0
                if m.group(4).upper() == "S":
                    lat = -lat

                lod = _clean_deg_spaces(m.group(5))
                lom = int(m.group(6))
                los = float(m.group(7).replace(",", "."))
                lon = lod + lom / 60.0 + los / 3600.0
                if m.group(8).upper() == "W":
                    lon = -lon

                if abs(lat) > 90 or abs(lon) > 180:
                    continue
                rlat, rlon = round(lat, 5), round(lon, 5)
                key = (rlat, rlon)
                if key in seen:
                    continue
                seen.add(key)
                coords.append({"lat": rlat, "lon": rlon, "dms": _format_dms(rlat, rlon)})
            except Exception:
                continue

    return coords


def extract_sanho_subpolygons(text):
    """Split named Line 1 / Line 2 / Area N sub-geometries so lines do not zigzag."""
    if not text:
        return []
    line_markers = list(re.finditer(r"\b(Line|Area|Zone|Track|Sector)\s+(\d+|[A-Z])\b", text, re.I))
    if len(line_markers) < 2:
        return []
    subs = []
    for idx, m in enumerate(line_markers):
        start = m.start()
        end = line_markers[idx + 1].start() if idx + 1 < len(line_markers) else len(text)
        seg_text = text[start:end]
        kind = m.group(1).lower()
        seg_coords = None
        if kind in ("area", "zone", "sector"):
            # Inside "Area N:", SANHO often repeats identical limits per chart scale (SAN 79, SAN 118, SAN 1010...).
            # Keep the most detailed single chart chunk rather than concatenating duplicate rings.
            chart_chunks = re.split(r"(?m)(?=^\s*(?:PEXA\s+)?SAN\s+\d)", seg_text)
            candidates = [extract_sanho_coords(ch) for ch in chart_chunks if ch.strip()]
            valid_cands = [c for c in candidates if len(c) >= 3]
            if valid_cands:
                # Prefer largest vertex count (larger-scale chart), break ties by last (largest-scale SAN 10xx)
                seg_coords = max(valid_cands, key=lambda c: len(c))
        if not seg_coords:
            seg_coords = extract_sanho_coords(seg_text)
        if not seg_coords:
            continue
        cat = "line" if kind in ("line", "track") or len(seg_coords) == 2 else "area"
        subs.append({
            "name": f"{m.group(1).title()} {m.group(2).upper()}",
            "category": cat,
            "points": [[c["lat"], c["lon"]] for c in seg_coords],
        })
    return subs if len(subs) >= 2 else []


def extract_sanho_charts(text):
    """Extract SAN / INT / PEXA / SC chart numbers and HO publication codes."""
    if not text:
        return []
    charts = []
    seen = set()

    def _add(label):
        norm = re.sub(r"\s+", " ", label.strip().upper())
        if norm and norm not in seen:
            seen.add(norm)
            charts.append(norm)

    # Explicit "SAN 1005 (INT 2613)" or "SAN PEXA 1016"
    for m in re.finditer(r"\bSAN\s+(?:(PEXA|SC)\s+)?(\d{1,4}[A-Z]?)", text, re.I):
        prefix = f"SAN {m.group(1).upper()}" if m.group(1) else "SAN"
        _add(f"{prefix} {m.group(2).upper()}")

    # Explicit "(INT 2613)" or "INT 2613"
    for m in re.finditer(r"\bINT\s+(\d{3,5})\b", text, re.I):
        _add(f"INT {m.group(1)}")

    # Section I "Chart 73 (INT 2610), 90 (INT 2051), 1005, SC 3, PEXA 150"
    for m in re.finditer(r"\bCharts?\s+([^\n\r]+(?:\n(?![ \t]*\d+\([TP]\)/)[^\n\r]+){0,3})", text, re.I):
        chunk = m.group(1)
        for token in re.findall(r"(?:(PEXA|SC|INT)\s+)?(\d{1,5}[A-Z]?)", chunk, re.I):
            pref = token[0].upper()
            num = token[1].upper()
            if pref == "INT":
                _add(f"INT {num}")
            elif pref in ("PEXA", "SC"):
                _add(f"SAN {pref} {num}")
            else:
                _add(f"SAN {num}")

    # Closing chart paren "(SAN 73, 90, 1005)"
    for m in re.finditer(r"\((?:SAN\s+)([0-9A-Za-z,\s]+)\)", text, re.I):
        for part in m.group(1).split(","):
            p = part.strip().upper()
            if re.match(r"^(?:(?:PEXA|SC)\s+)?\d{1,4}[A-Z]?$", p):
                _add(f"SAN {p}" if not p.startswith("SAN ") else p)

    # SAN HO Publications (HO-1, HO-3, HO-21, HO-22, HO-23)
    for m in re.finditer(r"\b(?:SAN\s+)?(HO[-\s]?\d{1,2})\b", text, re.I):
        code = re.sub(r"\s+", "-", m.group(1).upper())
        if not code.startswith("HO-"):
            code = code.replace("HO", "HO-", 1)
        _add(f"SAN {code}")

    return charts


def _normalize_notice_token(raw_tok):
    """Canonicalize '28 (T) / 26*' -> ('28(T)/26', '28', 'T', '26', True)."""
    tok = re.sub(r"\s+", "", raw_tok.strip())
    is_orig = tok.endswith("*")
    core = tok.rstrip("*")
    m = re.match(r"^(\d{1,4})(?:\(([TP])\))?/(\d{2,4})$", core, re.I)
    if not m:
        return core, core, "PERM", "", is_orig
    num = m.group(1)
    tp = m.group(2).upper() if m.group(2) else "PERM"
    yr_raw = m.group(3)
    yr2 = yr_raw[-2:] if len(yr_raw) >= 2 else yr_raw.zfill(2)
    full_id = f"{num}{'(' + tp + ')' if tp != 'PERM' else ''}/{yr2}"
    return full_id, num, tp, yr2, is_orig


def _normalize_sanho_country(raw_country):
    c = re.sub(r"\s+", " ", (raw_country or "").strip()).upper()
    if c in ("RSA", "SOUTH AFRICA", "REPUBLIC OF SOUTH AFRICA"):
        return "SOUTH AFRICA"
    if c in ("RSA / NAMIBIA", "RSA/NAMIBIA"):
        return "SOUTH AFRICA / NAMIBIA"
    return c or "SOUTH AFRICA"


def _strip_sanho_page_furniture(text):
    """Remove repeating monthly footer/header lines while keeping section starts."""
    lines = text.replace("\r\n", "\n").split("\n")
    cleaned = []
    i = 0
    while i < len(lines):
        s = lines[i].strip()
        if re.match(r"^Monthly Edition$", s, re.I):
            if i + 1 < len(lines) and re.match(
                r"^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}$",
                lines[i + 1].strip(),
                re.I,
            ):
                i += 2
                continue
            i += 1
            continue
        # Running continuation markers ("I cont/...", "II cont/...", etc.) never mark new sections
        if re.match(r"^(?:I{1,3}[ABC]?|IV|V|VI)\s+cont/[…\.\ufffd]+$", s, re.I):
            i += 1
            continue
        # Skip standalone page numbers right at bottom/top margins
        if re.match(r"^\d{1,3}$", s):
            i += 1
            continue
        cleaned.append(lines[i])
        i += 1
    return "\n".join(cleaned)


_SECTION_ORDER = {
    "FRONT": 0,
    "I": 1,
    "II": 2,
    "IIA": 3,
    "IIB": 4,
    "IIC": 5,
    "IIIA": 6,
    "IIIB": 7,
    "IIIC": 8,
    "III": 8,
    "IV": 9,
    "V": 10,
    "VI": 11,
}


def split_sanho_sections(full_text):
    """Split SANHO Monthly Edition text monotonically into sections I..VI."""
    cleaned = _strip_sanho_page_furniture(full_text)
    sections = {}
    current = "FRONT"
    buf = []

    sec_re = re.compile(
        r"^(?:"
        r"(I)|"
        r"(II[ABC]?)|"
        r"(III[ABC]?)|"
        r"(IV)|"
        r"(V)|"
        r"(VI)"
        r")\s*$"
    )
    heading_guards = {
        "I": ("INDEX OF CHARTS", "TEMPORARY NOTICES", "EXPLANATORY"),
        "II": ("SAN NOTICES TO MARINERS", "LIST OF TEMPORARY"),
        "III": ("CHARTS AND PUBLICATIONS", "SAN HO CHARTS"),
        "IV": ("CORRECTIONS TO HO PUBLICATIONS", "SAILING DIRECTIONS", "CATALOGUE"),
        "V": ("CORRECTIONS TO SA LIST OF LIGHTS", "SAN HO-1"),
        "VI": ("NAVAREA VII", "ANNEX A", "RADIO NAVIGATIONAL"),
    }

    lines = cleaned.split("\n")
    for idx, line in enumerate(lines):
        s = line.strip()
        m = sec_re.match(s)
        if m:
            tok = next(g for g in m.groups() if g is not None)
            if _SECTION_ORDER.get(tok, -1) > _SECTION_ORDER.get(current, -1):
                base = re.match(r"^(I{1,3}|IV|V|VI)", tok).group(1)
                next_blob = " ".join(l.strip() for l in lines[idx + 1: idx + 4]).upper()
                if (
                    tok != base
                    or any(h in next_blob for h in heading_guards.get(base, ()))
                    or "NIL" in next_blob
                    or re.search(r"\b(?:CHARTS|CORRECTIONS|NAVAREA|SAN)\b", next_blob)
                ):
                    sections[current] = sections.get(current, "") + "\n" + "\n".join(buf)
                    current = tok
                    buf = []
                    continue
        buf.append(line)

    sections[current] = sections.get(current, "") + "\n" + "\n".join(buf)
    return {k: v.strip() for k, v in sections.items() if v.strip()}


def parse_sanho_section_i(sec_i_text, edition_meta):
    """Parse Section I T&P in-force list and CANCELLED NOTICES list."""
    notices = []
    cancelled_ids = []
    if not sec_i_text:
        return notices, cancelled_ids

    # 1. Cancelled notices block between CANCELLED NOTICES and TEMPORARY NOTICES
    can_m = re.search(
        r"CANCELLED\s+NOTICES\s*(.*?)(?=TEMPORARY\s+NOTICES|PRELIMINARY\s+NOTICES|\Z)",
        sec_i_text,
        re.I | re.S,
    )
    if can_m:
        can_body = can_m.group(1)
        if not re.match(r"^\s*(?:\d{4}\s+Series\s*)?Nil\b", can_body, re.I):
            for nm in re.finditer(r"\b(\d{1,4}(?:\s*\([TP]\))?\s*/\s*\d{2,4})\b", can_body, re.I):
                full_id, _, _, _, _ = _normalize_notice_token(nm.group(1))
                cancelled_ids.append(full_id)

    # 2. Extract Temporary and Preliminary notices in force
    tp_section_m = re.search(
        r"(TEMPORARY\s+NOTICES.*?)(?=SUMMARY\s+OF\s+CHARTS|SA\s+NAVY\s+CHARTS|MISCELLANEOUS|\Z)",
        sec_i_text,
        re.I | re.S,
    )
    if not tp_section_m:
        return notices, cancelled_ids
    tp_text = tp_section_m.group(1)

    # Trim at PRELIMINARY NOTICES boundaries accurately to determine series subsection
    headers = list(_SEC1_TP_HEADER_RE.finditer(tp_text))
    for i, m in enumerate(headers):
        start = m.start()
        end = headers[i + 1].start() if i + 1 < len(headers) else len(tp_text)
        block = tp_text[start:end].strip()
        raw_tok = m.group(1)
        rest_first = m.group(2).strip()
        full_id, num, ntype, yr2, is_orig = _normalize_notice_token(raw_tok)

        # Country heuristic: first token ("Namibia", "RSA", "RSA / Namibia", "South Africa")
        cm = re.match(r"^(RSA\s*/\s*Namibia|South\s+Africa|Namibia|RSA|Mozambique|Angola|Madagascar)\b\s*(.*)", rest_first, re.I)
        if cm:
            country = _normalize_sanho_country(cm.group(1))
            subj_head = cm.group(2).strip()
        else:
            country = "SOUTH AFRICA"
            subj_head = rest_first

        # Collect multi-line title lines before "Chart ..." / "SAN HO-1" / series headers
        extra_lines = []
        for ln in block.splitlines()[1:]:
            ls = ln.strip()
            if not ls or re.match(r"^(?:TEMPORARY|PRELIMINARY)\s+NOTICES|20\d{2}\s+Series|Nil\.?$", ls, re.I):
                break
            if re.match(r"^(?:Charts?|SAN\s+HO|INT\s+\d|PEXA|SC\s+\d)\b", ls, re.I):
                break
            extra_lines.append(ls)
        subject = re.sub(r"\s+", " ", f"{subj_head} {' '.join(extra_lines)}".strip()).rstrip(".")
        if not subject:
            subject = f"SANHO {full_id}"

        charts = extract_sanho_charts(block)
        notices.append(_build_sanho_record(
            full_id=full_id,
            raw_token=raw_tok.strip(),
            num=num,
            ntype=ntype,
            yr2=yr2,
            is_orig=is_orig,
            country=country,
            region="Section I — T&P Notice in Force",
            subject=subject,
            charts=charts,
            coords=[],
            body=block[:1500],
            cancels=[],
            section="I",
            actions=[],
            is_block=False,
            edition_meta=edition_meta,
        ))

    return notices, cancelled_ids


def parse_sanho_section_ii(sec_ii_text, edition_meta):
    """Parse Section II Standard Navigational Chart Updates."""
    notices = []
    cancelled_ids = []
    if not sec_ii_text or re.match(r"^\s*(?:SAN\s+NOTICES[^\n]*\n\s*)+Nil\.?\s*$", sec_ii_text, re.I):
        return notices, cancelled_ids

    headers = list(_SEC2_HEADER_RE.finditer(sec_ii_text))
    for i, m in enumerate(headers):
        start = m.start()
        end = headers[i + 1].start() if i + 1 < len(headers) else len(sec_ii_text)
        block = sec_ii_text[start:end].strip()

        raw_tok = m.group(1)
        head_rest = m.group(2).strip()
        full_id, num, ntype, yr2, is_orig = _normalize_notice_token(raw_tok)

        # Split dash-separated "SOUTH AFRICA - South West Coast - Port of Cape Town - Depths."
        parts = [p.strip() for p in re.split(r"\s*[\u2013\u2014]\s*|\s+-\s+", head_rest) if p.strip()]
        country = _normalize_sanho_country(parts[0]) if parts else "SOUTH AFRICA"
        if len(parts) >= 3:
            region = " — ".join(parts[1:-1])
            subject = parts[-1].rstrip(".")
        elif len(parts) == 2:
            region = parts[1].rstrip(".")
            subject = parts[1].rstrip(".")
        else:
            region = "South African Waters"
            subject = head_rest.rstrip(".")

        coords = extract_sanho_coords(block)
        sub_polys = extract_sanho_subpolygons(block)
        charts = extract_sanho_charts(block)
        actions = sorted({a.group(1).title() for a in _ACTION_KW_RE.finditer(block)})
        is_block = bool(re.search(r"\bblock\b", block, re.I))

        item_cancels = []
        for pm in re.finditer(
            r"(?:Previously\s+issued\s+as\s+NTM|Former\s+Notice)\s+(\d{1,4}(?:\s*\([TP]\))?\s*/\s*\d{2,4})",
            block,
            re.I,
        ):
            cid, _, _, _, _ = _normalize_notice_token(pm.group(1))
            item_cancels.append(cid)
            cancelled_ids.append(cid)

        notices.append(_build_sanho_record(
            full_id=full_id,
            raw_token=raw_tok.strip(),
            num=num,
            ntype=ntype,
            yr2=yr2,
            is_orig=is_orig,
            country=country,
            region=region,
            subject=subject,
            charts=charts,
            coords=coords,
            body=block[:1800],
            cancels=item_cancels,
            section="II",
            actions=actions,
            is_block=is_block,
            edition_meta=edition_meta,
            sub_polys=sub_polys,
        ))

    return notices, cancelled_ids


def parse_sanho_pub_or_chart_section(sec_text, section_code, edition_meta):
    """Parse Section III (IIIC New/Withdrawn), Section IV (HO Pubs), or Section V (SAN HO-1)."""
    notices = []
    if not sec_text:
        return notices

    section_titles = {
        "III": "New Charts / Editions / Withdrawn",
        "IIIC": "New Charts / Editions / Withdrawn",
        "IV": "Corrections to SAN Sailing Directions & Catalogue",
        "V": "Corrections to SA List of Lights & Radio (SAN HO-1)",
    }

    headers = list(_SEC2_HEADER_RE.finditer(sec_text))
    for i, m in enumerate(headers):
        start = m.start()
        end = headers[i + 1].start() if i + 1 < len(headers) else len(sec_text)
        block = sec_text[start:end].strip()

        raw_tok = m.group(1)
        head_rest = m.group(2).strip()
        full_id, num, ntype, yr2, is_orig = _normalize_notice_token(raw_tok)

        coords = extract_sanho_coords(block)
        charts = extract_sanho_charts(block)
        actions = sorted({a.group(1).title() for a in _ACTION_KW_RE.finditer(block)})
        is_block = bool(re.search(r"\bblock\b", block, re.I))

        sec_norm = "III" if section_code.startswith("III") else section_code
        subject = head_rest.rstrip(".")
        if subject.lower() in ("", "new editions") and len(block.splitlines()) > 1:
            second = block.splitlines()[1].strip()
            subject = re.sub(r"^\d+\.\s*", "", second).rstrip(".") or subject

        notices.append(_build_sanho_record(
            full_id=full_id,
            raw_token=raw_tok.strip(),
            num=num,
            ntype=ntype,
            yr2=yr2,
            is_orig=is_orig,
            country="SOUTH AFRICA",
            region=section_titles.get(section_code, f"Section {sec_norm}"),
            subject=subject,
            charts=charts,
            coords=coords,
            body=block[:1800],
            cancels=[],
            section=sec_norm,
            actions=actions,
            is_block=is_block,
            edition_meta=edition_meta,
        ))

    return notices


def _classify_geometry(coords, block_text, sub_polys):
    is_sounding = bool(re.search(r"\b(?:Depth|Depths|Drying\s+height|Sounding)\s+in\s+position\b", block_text, re.I))
    sane = True
    if len(coords) >= 2:
        lats = [c["lat"] for c in coords]
        lons = [c["lon"] for c in coords]
        if (max(lats) - min(lats)) > 8 or (max(lons) - min(lons)) > 12:
            sane = False

    if sub_polys:
        has_area = any(sp.get("category") == "area" for sp in sub_polys)
        return has_area, (not has_area)

    is_poly = len(coords) >= 3 and bool(_POLYGON_KW_RE.search(block_text)) and sane and not is_sounding
    is_line = len(coords) >= 2 and not is_poly and sane and bool(_LINE_KW_RE.search(block_text)) and not is_sounding
    return is_poly, is_line


def _build_sanho_record(
    full_id,
    raw_token,
    num,
    ntype,
    yr2,
    is_orig,
    country,
    region,
    subject,
    charts,
    coords,
    body,
    cancels,
    section,
    actions,
    is_block,
    edition_meta,
    sub_polys=None,
):
    is_poly, is_line = _classify_geometry(coords, body, sub_polys or [])
    canon_id = f"{SANHO_AUTHORITY} {full_id}"
    rec = {
        "id": canon_id,
        "noticeNumber": raw_token,
        "num": str(num),
        "type": ntype,
        "year": str(yr2),
        "authority": SANHO_AUTHORITY,
        "source": SANHO_AUTHORITY,
        "navarea": "VII",
        "country": country,
        "region": region,
        "subject": subject,
        "charts": charts,
        "coords": coords,
        "isPolygon": is_poly,
        "isLine": is_line,
        "body": body.strip(),
        "cancels": [f"{SANHO_AUTHORITY} {c}" if not c.startswith(SANHO_AUTHORITY) else c for c in (cancels or [])],
        "isCancelled": False,
        "status": "ACTIVE",
        "checkedForExport": True,
        "section": section,
        "isOriginal": bool(is_orig),
        "isTemp": ntype == "T",
        "isPrelim": ntype == "P",
        "actions": actions or [],
        "isBlockCorrection": bool(is_block),
        "edition": dict(edition_meta) if edition_meta else {},
    }
    if coords:
        rec["lat"] = coords[0]["lat"]
        rec["lon"] = coords[0]["lon"]
    if sub_polys:
        rec["subPolygons"] = sub_polys
    return rec


def parse_sanho_edition_text(full_text, edition_meta=None):
    """Parse a full SANHO Monthly Edition text string into unified SetSail notices."""
    if not full_text:
        return {"notices": [], "cancelledIds": [], "edition": edition_meta or {}}

    ed_meta = dict(edition_meta) if edition_meta else {}
    # Try detecting edition month/year if caller did not supply it
    if not ed_meta.get("year") or not ed_meta.get("month"):
        em = re.search(
            r"\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})\s+EDITION",
            full_text,
            re.I,
        )
        if em:
            m_name = em.group(1).title()
            m_num = next((k for k, v in MONTH_NAMES.items() if v.lower() == m_name.lower()), None)
            ed_meta.setdefault("year", int(em.group(2)))
            if m_num:
                ed_meta.setdefault("month", m_num)
            ed_meta.setdefault("monthName", m_name)

    sections = split_sanho_sections(full_text)
    all_cancelled = []

    sec2_notices, sec2_cancels = parse_sanho_section_ii(sections.get("II", ""), ed_meta)
    sec1_notices, sec1_cancels = parse_sanho_section_i(sections.get("I", ""), ed_meta)
    sec4_notices = parse_sanho_pub_or_chart_section(sections.get("IV", ""), "IV", ed_meta)
    sec5_notices = parse_sanho_pub_or_chart_section(sections.get("V", ""), "V", ed_meta)
    sec3_notices = parse_sanho_pub_or_chart_section(sections.get("IIIC", sections.get("III", "")), "III", ed_meta)

    all_cancelled.extend(sec1_cancels)
    all_cancelled.extend(sec2_cancels)

    by_id = {}
    # Order so Section II/IV/V rich records take priority over summary Section I entries
    for n in sec1_notices:
        by_id[n["id"]] = n
    for n in sec3_notices + sec4_notices + sec5_notices + sec2_notices:
        existing = by_id.get(n["id"])
        if existing and existing.get("section") == "I" and not n.get("charts"):
            n["charts"] = existing.get("charts", [])
        by_id[n["id"]] = n

    prefixed_cancels = sorted({f"{SANHO_AUTHORITY} {c}" if not c.startswith(SANHO_AUTHORITY) else c for c in all_cancelled})
    for cid in prefixed_cancels:
        if cid in by_id:
            by_id[cid]["isCancelled"] = True
            by_id[cid]["status"] = "CANCELLED"
            by_id[cid]["checkedForExport"] = False

    return {
        "notices": list(by_id.values()),
        "cancelledIds": prefixed_cancels,
        "edition": ed_meta,
    }


def extract_pdf_text(pdf_source):
    """Extract text from PDF file path or bytes using pdfplumber with pypdf fallback."""
    is_bytes = isinstance(pdf_source, (bytes, bytearray))
    if pdfplumber is not None:
        try:
            ctx_mgr = pdfplumber.open(io.BytesIO(pdf_source) if is_bytes else pdf_source)
            with ctx_mgr as pdf:
                return "\n".join((p.extract_text() or "") for p in pdf.pages)
        except Exception:
            if _PypdfReader is None:
                raise

    if _PypdfReader is not None:
        reader = _PypdfReader(io.BytesIO(pdf_source) if is_bytes else pdf_source)
        return "\n".join((p.extract_text() or "") for p in reader.pages)

    raise RuntimeError("No PDF text extraction library available (need pdfplumber or pypdf).")


def _http_get_bytes(url, session=None, timeout=25):
    headers = {"User-Agent": USER_AGENT, "Referer": SANHO_INDEX_URL}
    if session is not None:
        r = session.get(url, headers=headers, timeout=timeout)
        r.raise_for_status()
        return r.content
    if requests is not None:
        r = requests.get(url, headers=headers, timeout=timeout)
        r.raise_for_status()
        return r.content
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
        return resp.read()


def _http_head_ok(url, session=None, timeout=12):
    headers = {"User-Agent": USER_AGENT, "Referer": SANHO_INDEX_URL}
    try:
        if session is not None:
            r = session.head(url, headers=headers, timeout=timeout, allow_redirects=True)
            return r.status_code == 200
        if requests is not None:
            r = requests.head(url, headers=headers, timeout=timeout, allow_redirects=True)
            return r.status_code == 200
        ctx = ssl.create_default_context()
        req = urllib.request.Request(url, method="HEAD", headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
            return getattr(resp, "status", 200) == 200
    except Exception:
        return False


def _parse_edition_from_filename(filename_or_url):
    decoded = urllib.parse.unquote(filename_or_url)
    base = decoded.rsplit("/", 1)[-1]

    # Monthly pattern: e.g. "10_OCT 26 NTM.pdf" or "07_JUL 25 NTM.pdf"
    mm = re.search(r"(?:^|/)(\d{1,2})[_\s-]([A-Z]{3})\s+(\d{2,4})\s*NTM\.pdf$", base, re.I)
    if mm:
        m_num = int(mm.group(1))
        mon_abbr = mm.group(2).upper()
        m_num = MONTH_MAP.get(mon_abbr, m_num)
        yr_raw = int(mm.group(3))
        yr_full = yr_raw + 2000 if yr_raw < 100 else yr_raw
        return {
            "kind": "monthly",
            "filename": base,
            "year": yr_full,
            "month": m_num,
            "monthName": MONTH_NAMES.get(m_num, mon_abbr),
        }

    # Annual Summary: "00_ANNUAL_2025.pdf"
    am = re.search(r"00_ANNUAL[_\s-](\d{4})\.pdf$", base, re.I)
    if am:
        return {"kind": "annual", "filename": base, "year": int(am.group(1)), "month": 0, "monthName": "Annual"}

    # Cumulative List: "CUMLIST_2026.pdf"
    cm = re.search(r"CUMLIST[_\s-](\d{4})\.pdf$", base, re.I)
    if cm:
        return {"kind": "cumlist", "filename": base, "year": int(cm.group(1)), "month": 0, "monthName": "CumList"}

    return {"kind": "other", "filename": base, "year": None, "month": None, "monthName": ""}


def _encode_url_path_spaces(url):
    parts = urllib.parse.urlsplit(url)
    encoded_path = urllib.parse.quote(urllib.parse.unquote(parts.path), safe="/_-().")
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, encoded_path, parts.query, parts.fragment))


def discover_sanho_pdf_links(html_text, index_url=SANHO_INDEX_URL):
    """Extract and classify all PDF URLs from SANHO's NtM index HTML page."""
    raw_items = []
    if BeautifulSoup is not None:
        soup = BeautifulSoup(html_text, "html.parser")
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if ".pdf" in href.lower():
                raw_items.append((href, a.get_text(" ", strip=True)))
    else:
        for href, label in re.findall(r'<a[^>]+href=["\']([^"\']*\.pdf[^"\']*)["\'][^>]*>(.*?)</a>', html_text, re.I | re.S):
            lbl = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", label)).strip()
            raw_items.append((href.strip(), lbl))

    entries = []
    seen_urls = set()
    for href, label in raw_items:
        resolved = _encode_url_path_spaces(urllib.parse.urljoin(index_url, href))
        meta = _parse_edition_from_filename(resolved)
        # Candidate URL fallback when SANHO places "YY NTM.pdf" inside an earlier YYYY_Series directory
        alt_url = None
        if meta["year"]:
            expected_dir = f"{meta['year']}_Series"
            if re.search(r"\b20\d{2}_Series\b", resolved) and expected_dir not in resolved:
                alt_url = re.sub(r"\b20\d{2}_Series\b", expected_dir, resolved)
        if resolved in seen_urls:
            continue
        seen_urls.add(resolved)
        entries.append({
            "url": resolved,
            "fallbackUrl": alt_url,
            "label": label,
            "kind": meta["kind"],
            "filename": meta["filename"],
            "year": meta["year"],
            "month": meta["month"],
            "monthName": meta["monthName"],
        })
    return entries


def _download_with_series_fallback(entry, session=None, timeout=25):
    """Fetch a SANHO PDF, automatically trying fallback YYYY_Series URL on 404."""
    urls = [entry["url"]]
    if entry.get("fallbackUrl") and entry["fallbackUrl"] not in urls:
        urls.append(entry["fallbackUrl"])
    last_err = None
    for u in urls:
        try:
            data = _http_get_bytes(u, session=session, timeout=timeout)
            return data, u
        except Exception as e:
            last_err = e
    raise last_err


def _discover_active_monthly_editions(catalog, year=None, month=None, session=None):
    """Return sorted monthly edition candidates, probing current YYYY_Series if HTML omits them."""
    monthly = [e for e in catalog if e["kind"] == "monthly"]
    cum_years = sorted({e["year"] for e in catalog if e.get("year")}, reverse=True)
    target_year = year or (cum_years[0] if cum_years else datetime.datetime.now(datetime.timezone.utc).year)

    if year is not None and month is not None:
        matches = [e for e in monthly if e["year"] == year and e["month"] == month]
        if matches:
            return matches
        mon_abbr = MONTH_ABBR.get(int(month), "JAN")
        fname = f"{int(month):02d}_{mon_abbr} {str(year)[-2:]} NTM.pdf"
        probe_url = _encode_url_path_spaces(f"{SANHO_BASE_URL}notices_mariners/{year}_Series/{fname}")
        return [{
            "url": probe_url,
            "fallbackUrl": None,
            "label": MONTH_NAMES.get(int(month), mon_abbr),
            "kind": "monthly",
            "filename": fname,
            "year": int(year),
            "month": int(month),
            "monthName": MONTH_NAMES.get(int(month), mon_abbr),
        }]

    # Filter catalog items matching target_year; probe missing months 1..cur_month if server hosts target_year_Series
    year_entries = {e["month"]: e for e in monthly if e["year"] == target_year and e["month"]}
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    max_probe_m = now_utc.month if target_year == now_utc.year else 12
    # Check whether target_year has its own directory (via cumlist or existing monthly fallbackUrl)
    has_year_series = any(
        (e.get("year") == target_year) for e in catalog
    )
    if has_year_series:
        for m in range(1, max_probe_m + 1):
            if m in year_entries:
                continue
            mon_abbr = MONTH_ABBR[m]
            fname = f"{m:02d}_{mon_abbr} {str(target_year)[-2:]} NTM.pdf"
            cand_url = _encode_url_path_spaces(f"{SANHO_BASE_URL}notices_mariners/{target_year}_Series/{fname}")
            if _http_head_ok(cand_url, session=session):
                year_entries[m] = {
                    "url": cand_url,
                    "fallbackUrl": None,
                    "label": MONTH_NAMES[m],
                    "kind": "monthly",
                    "filename": fname,
                    "year": target_year,
                    "month": m,
                    "monthName": MONTH_NAMES[m],
                }

    if year_entries:
        return [year_entries[m] for m in sorted(year_entries.keys())]

    # Fallback to most recent year available in HTML links
    all_years = sorted({e["year"] for e in monthly if e.get("year")}, reverse=True)
    if all_years:
        fb_yr = all_years[0]
        return sorted([e for e in monthly if e["year"] == fb_yr], key=lambda x: x["month"] or 0)
    return []


def scrape_sanho_notices(
    index_url=SANHO_INDEX_URL,
    year=None,
    month=None,
    cache_dir=None,
    session=None,
    max_editions=12,
):
    """
    Fetch and parse SANHO Monthly Edition PDFs into SetSail's unified NtM schema.

    Non-breaking & fault-isolated: callers receive a status dict containing notices,
    cancelledIds, latestEdition, and error (None on success).
    """
    try:
        html_bytes = _http_get_bytes(index_url, session=session, timeout=25)
        html_text = html_bytes.decode("utf-8", errors="replace")
        catalog = discover_sanho_pdf_links(html_text, index_url=index_url)
        editions = _discover_active_monthly_editions(catalog, year=year, month=month, session=session)
        if not editions:
            return {
                "notices": [],
                "cancelledIds": [],
                "latestEdition": None,
                "editionsProcessed": [],
                "error": "No SANHO monthly PDF editions resolved",
            }

        if max_editions and len(editions) > max_editions:
            editions = editions[-int(max_editions):]

        if cache_dir:
            os.makedirs(cache_dir, exist_ok=True)

        merged_by_id = {}
        all_cancelled = set()
        editions_done = []
        latest_ed = None

        for ed in editions:
            ed_meta = {
                "year": ed["year"],
                "month": ed["month"],
                "monthName": ed["monthName"],
                "filename": ed["filename"],
                "pdfUrl": ed.get("fallbackUrl") or ed["url"],
            }
            cache_json_path = (
                os.path.join(cache_dir, f"sanho_{ed['year']}_{ed['month']:02d}.json")
                if cache_dir and ed.get("year") and ed.get("month")
                else None
            )
            # Reuse cached JSON only for earlier months of the year; always re-fetch latest edition
            is_latest = (ed is editions[-1])
            parsed = None
            if cache_json_path and not is_latest and os.path.exists(cache_json_path):
                try:
                    with open(cache_json_path, "r", encoding="utf-8") as cf:
                        parsed = json.load(cf)
                except Exception:
                    parsed = None

            if parsed is None:
                try:
                    pdf_bytes, actual_url = _download_with_series_fallback(ed, session=session)
                    ed_meta["pdfUrl"] = actual_url
                    raw_text = extract_pdf_text(pdf_bytes)
                    parsed = parse_sanho_edition_text(raw_text, edition_meta=ed_meta)
                    if cache_json_path:
                        try:
                            with open(cache_json_path, "w", encoding="utf-8") as cf:
                                json.dump(parsed, cf, ensure_ascii=False)
                        except Exception:
                            pass
                except Exception as ed_err:
                    print(f"  [SANHO warn] Skipping {ed['filename']}: {ed_err}")
                    continue

            latest_ed = ed_meta
            editions_done.append(ed_meta)
            all_cancelled.update(parsed.get("cancelledIds", []))

            for n in parsed.get("notices", []):
                nid = n["id"]
                prev = merged_by_id.get(nid)
                if prev is None:
                    merged_by_id[nid] = n
                    continue
                # Preserve earlier Section II rich coordinates/body when latest Section I only carries an index stub
                if not n.get("coords") and prev.get("coords"):
                    merged = dict(prev)
                    if n.get("charts"):
                        merged["charts"] = sorted(set(prev.get("charts", [])) | set(n.get("charts", [])))
                    merged["edition"] = n.get("edition", prev.get("edition"))
                    merged_by_id[nid] = merged
                else:
                    merged_by_id[nid] = n

        # Enforce in-force pruning & cancellations on the latest edition
        latest_tp_ids = set()
        if editions_done and merged_by_id:
            last_fn = editions_done[-1]["filename"]
            latest_tp_ids = {
                n["id"]
                for n in merged_by_id.values()
                if n.get("edition", {}).get("filename") == last_fn and n.get("section") == "I"
            }

        for cid in all_cancelled:
            if cid in merged_by_id:
                merged_by_id[cid]["isCancelled"] = True
                merged_by_id[cid]["status"] = "CANCELLED"
                merged_by_id[cid]["checkedForExport"] = False

        # Any earlier T/P notice no longer present in the latest Section I index (and not newly published in latest Section II) is no longer in force
        if latest_tp_ids:
            last_fn = editions_done[-1]["filename"]
            for nid, rec in merged_by_id.items():
                if rec.get("type") in ("T", "P") and rec.get("edition", {}).get("filename") != last_fn:
                    if nid not in latest_tp_ids:
                        rec["isCancelled"] = True
                        rec["status"] = "CANCELLED"
                        rec["checkedForExport"] = False

        return {
            "notices": list(merged_by_id.values()),
            "cancelledIds": sorted(all_cancelled),
            "latestEdition": latest_ed,
            "editionsProcessed": editions_done,
            "error": None if editions_done else "No SANHO monthly PDF could be downloaded",
        }
    except Exception as exc:
        return {
            "notices": [],
            "cancelledIds": [],
            "latestEdition": None,
            "editionsProcessed": [],
            "error": str(exc),
        }


if __name__ == "__main__":
    res = scrape_sanho_notices()
    print(f"SANHO status error={res['error']}, editions={len(res['editionsProcessed'])}, notices={len(res['notices'])}")
    if res["latestEdition"]:
        print("Latest edition:", res["latestEdition"])
    for sample in res["notices"][:5]:
        print(" ", sample["id"], "|", sample["type"], "| sec=", sample["section"], "| coords=", len(sample["coords"]), "|", sample["subject"][:60])
