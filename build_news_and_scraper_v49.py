# -*- coding: utf-8 -*-
"""
Scrapes live global maritime news from 7 authoritative maritime RSS feeds:
- gCaptain
- Splash247
- Seatrade Maritime
- MarineLink
- Offshore Energy
- Hellenic Shipping News
- Container News
Builds news.json & public/news.json for SetNews (#tab-news).
"""
import os
import re
import json
import html
import hashlib
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

SCRAPER_DIR = os.path.dirname(os.path.abspath(__file__))
GYRO_DIR = os.path.join(r"E:\IINO INEOS VESTA", "SetSail")


def safe_write_text(path, content):
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
    except Exception as e:
        print(f"[!] Write warning on {path}: {e}")


MARITIME_FEEDS = [
    ("gCaptain", "https://gcaptain.com/feed/", "USA / Global", "⚓"),
    ("Splash247", "https://splash247.com/feed/", "Singapore / Global", "🌊"),
    ("Seatrade Maritime", "https://www.seatrade-maritime.com/rss.xml", "UK / Global", "🚢"),
    ("MarineLink", "https://www.marinelink.com/news/rss", "USA / Maritime Tech", "🧭"),
    ("Offshore Energy", "https://www.offshore-energy.biz/feed/", "Netherlands / Energy", "⚡"),
    ("Hellenic Shipping News", "https://www.hellenicshippingnews.com/feed/", "Greece / Markets", "📊"),
    ("Container News", "https://container-news.com/feed/", "Europe / Liner & Ports", "📦"),
]

MARITIME_GEO_HUBS = [
    {"name": "Strait of Hormuz & Persian Gulf", "keywords": ["hormuz", "iran", "persian gulf", "arabian gulf", "adnoc", "uae", "dubai", "fujairah", "qatar", "bahrain"], "coords": [26.56, 56.25], "navarea": "IX"},
    {"name": "Red Sea & Bab el-Mandeb", "keywords": ["red sea", "houthi", "bab el-mandeb", "aden", "yemen", "ukmto", "djibouti", "jeddah"], "coords": [13.50, 42.80], "navarea": "IX"},
    {"name": "Suez Canal & Eastern Med", "keywords": ["suez", "egypt", "port said", "mediterranean", "greece", "pirate", "black sea", "turkey", "bosphorus", "cyprus"], "coords": [30.58, 32.34], "navarea": "III"},
    {"name": "Panama Canal & Caribbean", "keywords": ["panama", "gatun", "colon", "balboa", "caribbean", "venezuela", "guyana", "jamaica"], "coords": [9.08, -79.68], "navarea": "IV"},
    {"name": "US Gulf & Port of Houston", "keywords": ["houston", "galveston", "gulf of mexico", "corpus christi", "new orleans", "louisiana", "sabine", "uscg", "texas", "beaumont"], "coords": [29.35, -94.78], "navarea": "IV"},
    {"name": "US East Coast & New York", "keywords": ["new york", "baltimore", "savannah", "virginia", "norfolk", "boston", "charleston", "us east", "philadelphia"], "coords": [40.50, -73.95], "navarea": "IV"},
    {"name": "Rotterdam & North Sea", "keywords": ["rotterdam", "antwerp", "north sea", "ukho", "london", "hamburg", "english channel", "netherlands", "norway", "uk ", "britain", "scotland"], "coords": [51.95, 4.14], "navarea": "I"},
    {"name": "Baltic Sea & Northern Europe", "keywords": ["baltic", "finland", "sweden", "estonia", "lithuania", "latvia", "poland", "gdansk", "russian", "st petersburg", "denmark"], "coords": [57.50, 19.50], "navarea": "I"},
    {"name": "Singapore & Malacca Strait", "keywords": ["singapore", "malacca", "malaysia", "indonesia", "batam", "mpa", "johor"], "coords": [1.26, 103.82], "navarea": "XI"},
    {"name": "China & East Asia", "keywords": ["china", "chinese", "shanghai", "ningbo", "qingdao", "shenzhen", "hong kong", "taiwan", "south china sea", "cosco", "yangzijiang", "dalian"], "coords": [30.60, 122.10], "navarea": "XI"},
    {"name": "Japan & Korea", "keywords": ["japan", "tokyo", "yokohama", "korea", "busan", "hd hyundai", "hanwha", "mol ", "nyk", "k line", "koguma"], "coords": [35.10, 129.04], "navarea": "XI"},
    {"name": "India & Indian Ocean", "keywords": ["india", "chennai", "mumbai", "mundra", "colombo", "sri lanka", "bay of bengal", "arabian sea"], "coords": [13.08, 80.29], "navarea": "VIII"},
    {"name": "Australia & Pilbara", "keywords": ["australia", "hedland", "dampier", "sydney", "melbourne", "brisbane", "tasman"], "coords": [-20.31, 118.58], "navarea": "X"},
    {"name": "US West Coast & Pacific", "keywords": ["los angeles", "long beach", "oakland", "seattle", "tacoma", "vancouver", "alaska", "hawaii", "california", "pacific"], "coords": [33.73, -118.26], "navarea": "XII"},
    {"name": "Brazil & South Atlantic", "keywords": ["brazil", "santos", "rio", "argentina", "paranagua", "petrobras"], "coords": [-23.96, -46.33], "navarea": "V"},
]

FALLBACK_IMAGES = {
    "Navigation & Safety": [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    ],
    "Ports & Terminals": [
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    ],
    "Weather & Cyclones": [
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
    ],
    "Shipping & Tankers": [
        "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=900&q=80",
    ],
    "Geopolitics & Chokepoints": [
        "https://images.unsplash.com/photo-1519074069444-1ba4ea16e66c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    ],
}


def strip_html_tags(raw_html):
    if not raw_html:
        return ""
    text = re.sub(r"<script[^>]*>.*?</script>", " ", raw_html, flags=re.S | re.I)
    text = re.sub(r"<style[^>]*>.*?</style>", " ", text, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"The post .*? appeared first on .*?\.$", "", text, flags=re.I).strip()
    return text


def extract_article_body_from_html(page_html):
    """Pull main article prose from a publisher HTML page (best-effort)."""
    if not page_html:
        return ""
    chunk = page_html
    # Prefer common article containers
    patterns = [
        r'<article[^>]*>([\s\S]*?)</article>',
        r'<div[^>]+class=["\'][^"\']*(?:entry-content|post-content|article-content|article-body|story-body|td-post-content|content-body)[^"\']*["\'][^>]*>([\s\S]*?)</div>',
        r'<div[^>]+itemprop=["\']articleBody["\'][^>]*>([\s\S]*?)</div>',
    ]
    best = ""
    for pat in patterns:
        for m in re.finditer(pat, chunk, re.I):
            text = strip_html_tags(m.group(1))
            if len(text) > len(best):
                best = text
    if len(best) < 400:
        # Fallback: concatenate <p> tags
        paras = re.findall(r"<p[^>]*>([\s\S]*?)</p>", chunk, re.I)
        joined = strip_html_tags(" ".join(paras[:80]))
        if len(joined) > len(best):
            best = joined
    # Hard cap to keep news.json reasonable (~80 KB/article max edge)
    if len(best) > 60000:
        best = best[:60000].rsplit(" ", 1)[0] + "…"
    return best.strip()


def fetch_full_article_text(url, timeout=14):
    if not url or not url.startswith("http"):
        return ""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; SetSailNewsBot/5.12; +https://setsail-ai.vercel.app)",
                "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.8",
            },
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
        # charset guess
        try:
            page = raw.decode("utf-8")
        except UnicodeDecodeError:
            page = raw.decode("latin-1", errors="replace")
        return extract_article_body_from_html(page)
    except Exception as e:
        print(f"    [!] full-text fetch miss: {e}")
        return ""


def classify_article_category(title, summary):
    blob = f"{title} {summary}".lower()
    if any(k in blob for k in ["cyclone", "typhoon", "hurricane", "storm", "gale", "monsoon", "swell", "weather", "nhc", "jtwc", "koguma", "simon", "rachel", "isaias", "nolo"]):
        return "Weather & Cyclones"
    if any(k in blob for k in ["hormuz", "houthi", "red sea", "sanction", "blockade", "navy", "military", "war ", "missile", "drone", "geopolit", "seized", "detained", "tariff", "strait"]):
        return "Geopolitics & Chokepoints"
    if any(k in blob for k in ["collision", "grounding", "rescue", "casualt", "fire", "explosion", "safety", "uscg", "salvage", "sink", "sank", "capsiz", "hazard", "buoy", "hydrograph", "ntm", "navtex"]):
        return "Navigation & Safety"
    if any(k in blob for k in ["port", "canal", "terminal", "dredg", "berth", "panama", "suez", "draft", "harbour", "harbor", "pilot", "container", "boxship", "teu"]):
        return "Ports & Terminals"
    return "Shipping & Tankers"


def detect_article_geo(title, summary):
    blob = f"{title} {summary}".lower()
    matched_regions = []
    primary_coords = None
    primary_navarea = "GLOBAL"
    for hub in MARITIME_GEO_HUBS:
        if any(kw in blob for kw in hub["keywords"]):
            matched_regions.append(hub["name"])
            if primary_coords is None:
                primary_coords = hub["coords"]
                primary_navarea = hub["navarea"]
    if not matched_regions:
        matched_regions.append("Global Maritime")
        primary_coords = [25.0, -40.0]
    return matched_regions[:3], primary_coords, primary_navarea


def extract_tags(title, summary, category, region):
    blob = f"{title} {summary}".lower()
    candidates = ["tanker", "lng", "lpg", "container", "port", "dredging", "hormuz", "red sea", "suez", "panama", "houston", "singapore", "china", "safety", "uscg", "imo", "bunker", "cyclone", "typhoon", "hurricane", "autonomous", "shipyard"]
    found = [c for c in candidates if c in blob][:5]
    if not found:
        found = [category.split()[0].lower(), region.split()[0].lower()]
    return found


def extract_key_takeaways(title, full_text, category, regions):
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", full_text) if 35 <= len(s.strip()) <= 220]
    bullets = []
    for s in sentences:
        if s.lower() not in title.lower() and len(bullets) < 3:
            bullets.append(s)
    if len(bullets) < 2:
        bullets.append(f"Operational Area: {', '.join(regions)}.")
    if len(bullets) < 3:
        cat_map = {
            "Navigation & Safety": "Watchkeepers transiting affected waters should cross-check active NAVAREA & UKMTO advisories on SetChart.",
            "Shipping & Tankers": "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning.",
            "Ports & Terminals": "Monitor port controlling depths, berth UKC allowances, and canal transit slot advisories in SetChart.",
            "Geopolitics & Chokepoints": "Assess strait transit security posture, war-risk advisories, and routing alternatives.",
            "Weather & Cyclones": "Cross-check live NOAA NHC / JMA / JTWC tropical cyclone cones and ECMWF wave heights on SetChart."
        }
        bullets.append(cat_map.get(category, "Tracked by SetSail Maritime Intelligence."))
    return bullets[:3]


def scrape_live_maritime_news():
    articles = []
    seen_titles = set()
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    for source_name, feed_url, source_region, source_icon in MARITIME_FEEDS:
        try:
            req = urllib.request.Request(
                feed_url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                    "Accept": "application/rss+xml, application/xml, text/xml, */*"
                }
            )
            with urllib.request.urlopen(req, timeout=12) as resp:
                xml_bytes = resp.read()
            root = ET.fromstring(xml_bytes)
            items = root.findall(".//item")
            count_for_source = 0

            for item in items:
                if count_for_source >= 10:
                    break
                raw_title = (item.findtext("title") or "").strip()
                title = strip_html_tags(raw_title)
                if not title or len(title) < 12:
                    continue

                norm_title = re.sub(r"[^a-z0-9]", "", title.lower())[:60]
                if norm_title in seen_titles:
                    continue
                seen_titles.add(norm_title)

                link = (item.findtext("link") or "").strip()
                pub_raw = (item.findtext("pubDate") or "").strip()
                pub_iso = now_iso
                pub_ts = datetime.now(timezone.utc).timestamp()
                if pub_raw:
                    try:
                        dt = parsedate_to_datetime(pub_raw)
                        if dt.tzinfo is None:
                            dt = dt.replace(tzinfo=timezone.utc)
                        else:
                            dt = dt.astimezone(timezone.utc)
                        pub_iso = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
                        pub_ts = dt.timestamp()
                    except Exception:
                        pass

                desc_html = item.findtext("description") or ""
                content_encoded = ""
                for child in item:
                    if child.tag.endswith("encoded") and child.text:
                        content_encoded = child.text
                        break

                img_url = ""
                for child in item:
                    tag_l = child.tag.lower()
                    if ("content" in tag_l or "thumbnail" in tag_l or "enclosure" in tag_l) and child.attrib.get("url"):
                        u = child.attrib["url"]
                        if any(ext in u.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]):
                            img_url = u
                            break
                if not img_url:
                    m_img = re.search(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', content_encoded or desc_html, re.I)
                    if m_img:
                        img_url = m_img.group(1)

                clean_desc = strip_html_tags(desc_html)
                clean_full = strip_html_tags(content_encoded) if content_encoded else clean_desc
                if len(clean_full) < len(clean_desc):
                    clean_full = clean_desc

                summary = clean_desc[:320].strip()
                if len(clean_desc) > 320:
                    summary = summary.rsplit(" ", 1)[0] + "..."
                if not summary:
                    summary = title

                # Prefer full publisher article text (not RSS excerpt)
                body_text = clean_full.strip()
                if link and len(body_text) < 1200:
                    fetched = fetch_full_article_text(link)
                    if len(fetched) > len(body_text):
                        body_text = fetched
                if not body_text or len(body_text) < 80:
                    body_text = summary
                # Keep full article (cap only extreme outliers)
                if len(body_text) > 60000:
                    body_text = body_text[:60000].rsplit(" ", 1)[0] + "…"

                category = classify_article_category(title, body_text)
                regions, coords, navarea = detect_article_geo(title, body_text)
                primary_region = regions[0] if regions else "Global Maritime"
                takeaways = extract_key_takeaways(title, body_text, category, regions)
                tags = extract_tags(title, body_text, category, primary_region)
                word_count = max(180, len(body_text.split()))
                read_mins = max(2, min(18, round(word_count / 190)))

                art_id = "SN-" + hashlib.md5(f"{source_name}:{title}".encode("utf-8")).hexdigest()[:10].upper()
                if not img_url:
                    fb_list = FALLBACK_IMAGES.get(category, FALLBACK_IMAGES["Shipping & Tankers"])
                    img_url = fb_list[len(articles) % len(fb_list)]

                articles.append({
                    "id": art_id,
                    "title": title,
                    "source": source_name,
                    "sourceIcon": source_icon,
                    "sourceRegion": source_region,
                    "url": link,
                    "publishedAt": pub_iso,
                    "_ts": pub_ts,
                    "category": category,
                    "region": primary_region,
                    "regions": regions,
                    "tags": tags,
                    "coords": coords,
                    "navarea": navarea,
                    "image": img_url,
                    "summary": summary,
                    "body": body_text,
                    "takeaways": takeaways,
                    "readingMinutes": read_mins,
                    "readMinutes": read_mins
                })
                count_for_source += 1

            print(f"  [+] SetNews scraped {count_for_source} articles from {source_name}")
        except Exception as e:
            print(f"  [!] SetNews feed warning ({source_name}): {e}")

    articles.sort(key=lambda x: x.get("_ts", 0), reverse=True)
    for a in articles:
        a.pop("_ts", None)

    return {
        "updatedAt": now_iso,
        "generatedAt": now_iso,
        "updateSchedule": "Every 6 Hours (Live Global Maritime Wire)",
        "sources": [f[0] for f in MARITIME_FEEDS],
        "totalArticles": len(articles),
        "articles": articles[:56]
    }


if __name__ == "__main__":
    print("[1/2] Scraping live maritime news across 7 global feeds...")
    news_payload = scrape_live_maritime_news()
    json_str = json.dumps(news_payload, indent=2, ensure_ascii=False)
    safe_write_text(os.path.join(SCRAPER_DIR, "news.json"), json_str)
    safe_write_text(os.path.join(SCRAPER_DIR, "public", "news.json"), json_str)
    safe_write_text(os.path.join(GYRO_DIR, "news.json"), json_str)
    print(f"[+] Saved {news_payload['totalArticles']} live maritime news articles to news.json, public/news.json & GYRO_DIR/news.json")
