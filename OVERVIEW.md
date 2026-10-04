# ⛵ SetSail — Marine Navigation Suite
### Comprehensive Technical Wiki & Operational Manual
**Vessel:** LPG/C *IINO INEOS VESTA* &bull; **Developer:** WAFFi &bull; **Version:** 2.4.0 (Production)  
**Live Portal:** [https://waffiman.github.io/Admirality-NtM-Scraper/](https://waffiman.github.io/Admirality-NtM-Scraper/)

---

## 📑 Table of Contents
1. [Executive Summary & Philosophy](#1-executive-summary--philosophy)
2. [System Architecture](#2-system-architecture)
3. [Module 1: Gyro & Magnetic Compass Logbook](#3-module-1-gyro--magnetic-compass-logbook)
   - [3.1 Celestial Ephemeris Engine](#31-celestial-ephemeris-engine)
   - [3.2 Magnetic Compass Deviation Model](#32-magnetic-compass-deviation-model)
   - [3.3 SOLAS / IMO Compliance & Logbook Formatting](#33-solas--imo-compliance--logbook-formatting)
4. [Module 2: Auto-NtM Automated ECDIS Plotter](#4-module-2-auto-ntm-automated-ecdis-plotter)
   - [4.1 UKHO Admiralty Weekly Scraping Pipeline](#41-ukho-admiralty-weekly-scraping-pipeline)
   - [4.2 Coordinate Parsing & Geometric Heuristics](#42-coordinate-parsing--geometric-heuristics)
   - [4.3 Cancellation Tracking Engine](#43-cancellation-tracking-engine)
   - [4.4 ECDIS Export Engines (JRC `.uchm`, GeoJSON, CSV)](#44-ecdis-export-engines-jrc-uchm-geojson-csv)
5. [User Interface & Navigator Cockpit](#5-user-interface--navigator-cockpit)
   - [5.1 Left Navigation Rail](#51-left-navigation-rail)
   - [5.2 Filter & Sort Controls](#52-filter--sort-controls)
   - [5.3 Map Viewport & Offline Fallback](#53-map-viewport--offline-fallback)
6. [CI/CD & Deployment Guide](#6-cicd--deployment-guide)
7. [Navigator FAQ & Troubleshooting](#7-navigator-faq--troubleshooting)

---

## 1. Executive Summary & Philosophy

**SetSail** is a specialized, dual-environment electronic navigation instrument developed for bridge watchkeeping officers, navigators, and masters aboard ocean-going vessels. It combines the rigorous astronomical precision required for daily compass error determination with a fully automated, cloud-synced chart correction feed directly from the United Kingdom Hydrographic Office (UKHO).

### Dual-Environment Operational Principle
* **100% Offline Bridge Cockpit (Primary):** The Gyro/Compass Logbook and 59-body Star Almanac run completely offline in the local ship environment without external server calls, CDNs, or internet access.
* **Autonomous Weekly Cloud Pipeline (Secondary):** Every Thursday at 10:00 UTC, an automated GitHub Actions crawler downloads the official Admiralty Notice to Mariners (NtM) bulletin, extracts, parses, and resolves cancellations, updating the active navigational dataset (`notices.json`) served to the vessel via web.

---

## 2. System Architecture

```
                                  ┌────────────────────────────────┐
                                  │   UKHO Admiralty MSI Portal    │
                                  │    (msi.admiralty.co.uk)       │
                                  └───────────────┬────────────────┘
                                                  │ 1. Publishes weekly bulletin (Thu 10:00 UTC)
                                                  ▼
┌────────────────────────────┐    ┌────────────────────────────────┐
│   Ship's Bridge PC         │    │   GitHub Actions Workflow      │
│   (Offline Browser)        │    │   (.github/workflows/scrape.yml)│
├────────────────────────────┤    ├────────────────────────────────┤
│ • Gyro & Magnetic Logbook  │    │ • requests.Session (Cookies)   │
│ • Star Almanac (59 bodies) │    │ • pdfplumber text extraction   │
│ • Local Canvas Map / DMS   │    │ • Regex notice classifier      │
│ • Deviation Card Spline    │    │ • Cancellation resolver        │
└──────────────▲─────────────┘    └───────────────┬────────────────┘
               │                                  │ 2. Commits notices.json
               │ 3. Fetches live notices.json      ▼
               │    (when online)         ┌────────────────────────────────┐
               └──────────────────────────┤   GitHub Pages / Static CDN    │
                                          │   (waffiman.github.io)         │
                                          └────────────────────────────────┘
```

---

## 3. Module 1: Gyro & Magnetic Compass Logbook

### 3.1 Celestial Ephemeris Engine
The celestial engine calculates Greenwich Hour Angle (GHA), Declination ($\delta$), Local Hour Angle (LHA), and True Azimuth ($Zn$) for:
1. **The Sun** (Semi-diameter, refraction, and equation of time accounted for).
2. **The Moon** (Horizontal parallax, semi-diameter, and phase adjustments).
3. **Navigational Planets:** Venus, Mars, Jupiter, Saturn.
4. **57 Selected Navigational Stars:** (Polaris, Sirius, Canopus, Vega, Arcturus, Rigel, etc.) using Epoch 2026 Sidereal Hour Angle (SHA) and Declination coordinates.

#### Core Azimuth Formula (Cosine-Haversine / Spherical Trigonometry):
$$\tan Z = \frac{\sin \text{LHA}}{\cos \phi \tan \delta - \sin \phi \cos \text{LHA}}$$
$$\text{Zn} = \begin{cases} Z & \text{if } \text{LHA} > 180^\circ \text{ and } Z \ge 0 \\ 360^\circ - Z & \text{otherwise} \end{cases}$$

Where:
* $\phi$ = Ship's Latitude
* $\lambda$ = Ship's Longitude
* $\delta$ = Declination of celestial body
* $\text{LHA} = \text{GHA} \pm \lambda$

### 3.2 Magnetic Compass Deviation Model
* Accommodates the vessel's official Table of Residual Deviations across 16 standard headings ($000^\circ, 022.5^\circ, 045^\circ, \dots, 337.5^\circ$).
* Employs cubic spline / linear interpolation to resolve intermediate courses to $0.1^\circ$ precision.
* Seamlessly computes:
  $$\text{Compass Error} = \text{Variation} + \text{Deviation}$$
  $$\text{True Heading} = \text{Compass Course} \pm \text{Compass Error}$$

### 3.3 SOLAS / IMO Compliance & Logbook Formatting
* Satisfies **SOLAS Chapter V, Regulation 19.2.5** (requirement to determine compass errors once per watch and after large course alterations).
* Complies with **IMO Resolution A.424(XI)** (performance standards for gyro-compasses) and **IMO Resolution A.224(VII)** (magnetic compasses).
* Features one-click **A4 Landscape Print View** complete with vessel header (*IINO INEOS VESTA*), Wilhelmsen ship agency livery, and formal Master/OOW signature blocks.

---

## 4. Module 2: Auto-NtM Automated ECDIS Plotter

### 4.1 UKHO Admiralty Weekly Scraping Pipeline
* **Target:** `https://msi.admiralty.co.uk/NoticesToMariners/Weekly`
* **Session Handling:** Uses ASP.NET Antiforgery cookie tracking (`cookiesession1`, `.AspNetCore.Antiforgery`) via Python `requests.Session` to avoid HTTP 500 rejection.
* **Extraction Engine:** Automated download of the primary Section II bulletin (e.g. `41wknm26.pdf`), parsed line-by-line using `pdfplumber`.

### 4.2 Coordinate Parsing & Geometric Heuristics
The parser extracts geographical positions using UKHO DMS formatting:
$$\text{Regex: } (\d{1,2})[°\s\?]+(\d{1,2}(?:\.\d{1,3})?)['\s]*([NSns])[\.,\s]+(\d{1,3})[°\s\?]+(\d{1,2}(?:\.\d{1,3})?)['\s]*([EWew])$$

#### Geometry Classification:
* **Polygons / Restricted Areas:** Identified by UKHO boundary terms (`bounded by the following coordinates`, `joining: (a)...(d)`, `maritime limit`). Enforces maximum geographic envelope threshold ($< 8^\circ$ Lat spread, $< 12^\circ$ Lon spread) to prevent false cross-ocean polygons.
* **Linear Features:** Submarine pipelines, power cables, reporting lines, and channels (`pecked line, joining:`).
* **Point Hazards:** Wrecks, light buoys, depths, foul grounds, and platform installations.

### 4.3 Cancellation Tracking Engine
* Automatically scans bulletins for former notice annulments (`Former Notice (\d+)(?:\([TP]\))?\/(\d{2,4}) is cancelled`).
* Removes revoked notices from the active layer and preserves historical metadata to maintain ECDIS hygiene.

### 4.4 ECDIS Export Engines
1. **JRC ECDIS User Chart Map (`.uchm`):** Binary structure readable by JRC JAN-9201 / JAN-7201 ECDIS consoles via USB drive.
2. **GeoJSON (`.geojson`):** Standard RFC 7946 geographic features importable into NavStation, Transas, Sperry Marine, and OpenCPN.
3. **Voyage Planning CSV (`.csv`):** Tabular DMS coordinates formatted for official passage plans and passage briefs.

---

## 5. User Interface & Navigator Cockpit

### 5.1 Left Navigation Rail
A compact 58px sidebar allows instantaneous one-click switching:
* 🧭 **Gyro & Compass Logbook:** Error entry, star sights, deviation curve.
* 🗺️ **Auto-NtM Plotter:** Interactive chart with live active notice badges.

### 5.2 Filter & Sort Controls
Located directly in the notices header bar, adjacent to the **Select All** checkbox:
* **Type Filter:**
  * `All Types (85)`
  * `Temp (T) (14)`
  * `Prelim (P) (10)`
  * `Permanent (61)`
  * `Areas (12)`
  * `Lines (2)`
* **Sort Modes:**
  * `# Newest` (Descending bulletin notice numbers)
  * `# Oldest` (Ascending)
  * `Country A-Z` (Geographic order)
  * `Type` ($T \to P \to \text{Perm}$)
* **Live Export Counter:** Dynamically updates how many notices are checked for ECDIS export.

### 5.3 Map Viewport & Offline Fallback
* Interactive Leaflet vector layer featuring standard nautical symbology:
  * 🟡 **Amber:** Temporary (T) notices
  * 🔵 **Cyan:** Preliminary (P) notices
  * 🔴 **Ruby:** Permanent notices & new dangers
  * 🟣 **Purple / Violet:** Marine protected zones & pipelines
* If tile servers are unreachable (mid-ocean voyage without Starlink), the app switches automatically to the local **Canvas DMS Radar-Grid Renderer**.

---

## 6. CI/CD & Deployment Guide

### Automated Workflow (`.github/workflows/scrape.yml`)
* **Schedule:** `cron: '0 10 * * 4'` (Every Thursday at 10:00 UTC).
* **Job Steps:**
  1. Checks out repository.
  2. Sets up Python 3.11 with `pdfplumber`, `requests`, `beautifulsoup4`.
  3. Executes `python scraper/scrape.py`.
  4. Commits and pushes updated `notices.json`.
  5. GitHub Pages automatically rebuilds and deploys the production site in $< 30$ seconds.

---

## 7. Navigator FAQ & Troubleshooting

**Q: Can I use SetSail when the ship is completely offline?**  
**A:** Yes! Open `SetSail.html` directly from the ship's bridge drive (`D:\IINO INEOS VESTA\6. GYRO ERROR CALC\SetSail.html`). All calculations, almanac bodies, and deviation curves function with 0 internet connection.

**Q: Why was the "Clear All" button removed from Auto-NtM?**  
**A:** Under UKHO Admiralty regulations, notices to mariners remain in force until officially cancelled by a subsequent weekly Admiralty bulletin. The scraper automatically cancels obsolete notices each Thursday, preventing accidental deletion by watchkeepers.

**Q: How do I load notices into JRC ECDIS?**  
**A:**
1. Check the desired notices in the sidebar.
2. Click **💾 Export to ECDIS**.
3. Select **JRC User Chart (.uchm)**.
4. Save the file to an ECDIS-approved USB flash drive.
5. In JRC ECDIS: Select *Menu* &rarr; *User Chart* &rarr; *Import* &rarr; Select `.uchm` &rarr; Activate Overlay.

---
*Maintained by Navigation Department &bull; LPG/C IINO INEOS VESTA &bull; SetSail v2.4*
