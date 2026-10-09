# ?? SetSail Navigation Suite ? Complete System & Architecture Overview

> **Confidential Operational & Architectural Reference for AI Coding Assistants**  
> **Vessel:** LPG/C IINO INEOS VESTA | **Registry:** Monrovia, Liberia  
> **Target Production:** [https://setsail-ai.vercel.app](https://setsail-ai.vercel.app)  
> **GitHub Repository:** [https://github.com/waffiman/Admirality-NtM-Scraper](https://github.com/waffiman/Admirality-NtM-Scraper)  

---

## 1. ?? CRITICAL RULES & ENVIRONMENT CONSTRAINTS (MUST OBSERVE AT ALL TIMES)

1. **STRICTLY NO HEADLESS BROWSERS:**
   * **Rule:** Never launch headless Chrome, Chromium, Edge, Puppeteer, or Playwright on this machine.
   * **Reason:** Explicit vessel workstation constraint ordered by user (*"???, ?????? ????????? ??????? ?? ???? ??????"*).

2. **DRIVE D NTFS FILE LOCK CONSTRAINTS ([WinError 1392]):**
   * **Rule:** Do not call direct IDE in-place editing tools (`replace_file_content`) on Drive `D:` if NTFS lock or `[WinError 1392]` triggers.
   * **Remedy:** Always perform file reads, writes, and transformations via Python scripts (`open(path, 'w', encoding='utf-8')`).

3. **MANDATORY AST JAVASCRIPT SYNTAX VALIDATION (Esprima):**
   * **Rule:** Never deploy or save JavaScript code or HTML inline `<script>` tags without running `esprima` AST syntax validation in Python.
   * **Reason:** Avoid unescaped template string errors (`${hh}:: UTC;`, unquoted strings) which cause `Uncaught SyntaxError` and kill all browser event listeners.

4. **CAPTURE-PHASE CLICK DELEGATION (`useCapture: true`):**
   * **Rule:** Navigation and critical tab switching must use `document.addEventListener('click', handler, true)` (capture phase).
   * **Reason:** Ensures clicks on nested SVG, `<path>`, `<picture>` or `<span>` elements are caught before any child elements can intercept them.

5. **PWA SERVICE WORKER CACHE VERSIONING:**
   * **Rule:** Whenever client scripts, styles, or HTML are updated, always increment `CACHE_NAME` in `sw.js` and `public/sw.js` (e.g., `setsail-cache-v3.2`).
   * **Reason:** Prevents browsers on ship computers from indefinitely executing stale cached scripts.

6. **AVOID UNESCAPED SHELL INTERPOLATION:**
   * **Rule:** When writing JavaScript code from Python or PowerShell, use string concatenation (`+`) instead of unescaped backtick template literals (`${...}`) whenever possible to prevent the shell from stripping variables.

---

## 2. ?? CONFIDENTIAL CREDENTIALS & API KEYS

| Service / Resource | Key / Token | Purpose | Location |
| :--- | :--- | :--- | :--- |
| **GitHub Personal Access Token** | `ghp_XGljoy... (Full token stored locally in deploy_production.py and local OVERVIEW.md)` | Deploying releases to `waffiman/Admirality-NtM-Scraper` | `deploy_production.py` |
| **Cohere AI API Key** | `C7hDWfhYDGBiFrGtNn5PJ6SItO1tx1EqXkf2t4rR` | SetRoute AI passage planning & Deviation card OCR fallback | Client & deployer |
| **Vercel Production Host** | `https://setsail-ai.vercel.app` | Main live progressive web application | Live Cloud |
| **GitHub Repository** | `waffiman/Admirality-NtM-Scraper` (`main`) | Code repository & GitHub Actions runner | GitHub |

---

## 3. ?? PROJECT STRUCTURE & CODEBASE DIRECTORY MAP

* `D:\IINO INEOS VESTA\Admirality-NtM-Scraper\`
  * `index_build.html` ? **Primary Production HTML source**. Contains SetSail UI, SetStar celestial logbook, SetChart, SetRoute, and inline Zero-Dependency controller. (Deployed to root `index.html` and `public/index.html`).
  * `deploy_production.py` ? Python deployment script using GitHub API with SHA1 comparison to sync modified files directly to production.
  * `sw.js` & `public/sw.js` ? PWA Service Worker (offline cache manager, background tile caching).
  * `manifest.json` ? Web App Manifest for PWA standalone installation on ECDIS / tablets.
  * `scraper_github.py` ? Weekly Admiralty NtM auto-scraper parsing UKHO notice PDFs.
  * `requirements.txt` & `vercel_config.json` ? Cloud environment configurations.
* `D:\IINO INEOS VESTA\6. GYRO ERROR CALC\`
  * `assets\Auto NtM Plotting\setsail_core.js` ? Core application controller (icons, chart controls, route management, popovers, toast notifications).
  * `assets\Auto NtM Plotting\ntm_styles.css` ? Core dark-cockpit CSS styles, responsive layouts, HUD indicators.
  * `assets\Auto NtM Plotting\port_depths.js` ? 52 World Ports bathymetry database with fairways and coordinates.
  * `assets\Auto NtM Plotting\xlsx.full.min.js` ? 100% offline client-side Excel (.xlsx, .xls, .csv) parser for deviation cards.
  * `assets\Auto NtM Plotting\tesseract.min.js` ? Client-side OCR library for image deviation cards.
  * `assets\SetStar\Deviation Cards\` ? Reference deviation cards (.xls, .pdf, images) for testing.

---

## 4. ?? SETSAIL CORE APPLICATIONS

### 1. Home Dashboard (`tab-home`)
* Real-time bridge HUD top bar with UTC digital chronometer (`#homeUtcClock`) and connection status dot (`.home-hud-dot`).
* **Offline behavior:** When disconnected (`!navigator.onLine`), clock displays `--:--:-- UTC` and status dot turns static red (`#ef4444`). When online, live UTC time and pulsating green dot (`#10b981 live-pulse`).
* Cinematic marine background video with graceful fallback to poster image.
* 4 Launchpad tiles: SetChart, SetStar, SetRoute, Bridge Settings.

### 2. SetChart (`tab-ntm`)
* Interactive marine chart with Leaflet engine, OpenSeaMap navigation aids, TSS corridors.
* 52 World Ports bathymetry overlay with depth soundings and dynamic popup inspect cards.
* UKHO Admiralty Notices to Mariners (NtM) weekly overlays with polygons, radio hazards, T&P notices.
* Multi-overlay unified search/filter column on the left.
* Direct 1-Click Map Export: exports all currently visible chart objects (NtMs, depths, route waypoints) to GeoJSON and JRC ECDIS (.uchm) with timestamped filename.
* Waypoint management: upload `.rtz` (ECDIS XML) or `.csv` route files, inspect waypoints, click-to-center on chart, and edit individual waypoint parameters (lat/lon, speed, port/starboard XTD, turn radius).

### 3. SetStar (`tab-gyro`)
* Celestial navigation almanac & compass calculation engine (Sun, Moon, and 57 navigational stars).
* Calculates GHA, Dec, LHA, True Azimuth, Gyro Error, and Magnetic Compass Deviation.
* **"Use current data" feature:** 1-click sync for local date, live UTC date/time, and GPS position via browser geolocation.
* **Collapsible Overrides:** Manual inputs (LHA, Dec, Az, Dev) tucked away under an expandable toggle.
* **Magnetic Compass Deviation Management:**
  * Replaced bulky 37-row inline table with two sleek action buttons:
    1. **"Manual Deviation Table":** Opens dark-cockpit modal popup for direct numeric entry & adjustments.
    2. **"Upload Deviation Card":** Parses uploaded deviation files (.xlsx, .xls, .csv, .pdf, .png, .jpg) automatically, extracts headings (0..360) and deviation, smoothly updates chart curve, with Cohere AI fallback for complex formats.
  * Visual Deviation Curve: Canvas-based curve chart with active ship heading crosshair indicator.

### 4. SetRoute (Beta AI) (`tab-route`)
* AI-assisted passage planner powered by Cohere API (`C7hDWfhYDGBiFrGtNn5PJ6SItO1tx1EqXkf2t4rR`).
* Generates navigational passage plans between ports with waypoint coordinates, rhumb-line / great-circle legs, and safety margins.
* Automatically plots the generated route onto the SetChart map under the "My Route" overlay.

### 5. Bridge Settings (`tab-settings`)
* Visual cockpit theme toggle (Dark Cockpit vs Light Bridge).
* Developer feedback submission form.
* PWA cache reset and offline diagnostics.

---

## 5. ??? HOW TO DEPLOY UPDATES

Run from PowerShell or terminal:
```powershell
python "d:\IINO INEOS VESTA\Admirality-NtM-Scraper\deploy_production.py"
```
The deployer script computes SHA1 hashes of all 86 project files and pushes only changed assets directly to GitHub, triggering immediate Vercel redeployment.
