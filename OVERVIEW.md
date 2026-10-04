# ⛵ SetSail — Marine Navigation Suite
### Comprehensive Technical Wiki & Operational Manual
**Vessel:** LPG/C *IINO INEOS VESTA* &bull; **Developer:** SetSail Maritime Engineering &bull; **Version:** 2.5.0 (Production)  
**Live Portal:** [https://waffiman.github.io/Admirality-NtM-Scraper/](https://waffiman.github.io/Admirality-NtM-Scraper/)

---

## 📑 Table of Contents
1. [Executive Summary & Philosophy](#1-executive-summary--philosophy)
2. [PWA Offline Engine & Service Worker](#2-pwa-offline-engine--service-worker)
3. [System Architecture](#3-system-architecture)
4. [Module 1: Gyro & Magnetic Compass Logbook](#4-module-1-gyro--magnetic-compass-logbook)
   - [4.1 Celestial Ephemeris Engine (59 Bodies)](#41-celestial-ephemeris-engine-59-bodies)
   - [4.2 Magnetic Compass Deviation Model & Splines](#42-magnetic-compass-deviation-model--splines)
   - [4.3 SOLAS / IMO Compliance & A4 Printing](#43-solas--imo-compliance--a4-printing)
5. [Module 2: Auto-NtM Automated ECDIS Plotter](#5-module-2-auto-ntm-automated-ecdis-plotter)
   - [5.1 UKHO Admiralty Weekly, Annual & Cumulative Scraping](#51-ukho-admiralty-weekly-annual--cumulative-scraping)
   - [5.2 Coordinate Parsing & Geometric Heuristics](#52-coordinate-parsing--geometric-heuristics)
   - [5.3 Cancellation Tracking & Map Isolation Policy](#53-cancellation-tracking--map-isolation-policy)
   - [5.4 NAVAREA Filtering & IMO/IHO WWNWS Resolution](#54-navarea-filtering--imoiho-wwnws-resolution)
   - [5.5 Telemetry Indicators: Live Pulsing Green vs Static Red Dot](#55-telemetry-indicators-live-pulsing-green-vs-static-red-dot)
   - [5.6 ECDIS Export Engines (JRC `.uchm`, GeoJSON, CSV) with UTC Timestamps](#56-ecdis-export-engines-jrc-uchm-geojson-csv-with-utc-timestamps)
6. [Module 3: Real-Time Vessel GPS Crosshair Target](#6-module-3-real-time-vessel-gps-crosshair-target)
   - [6.1 ECDIS Crosshair Reticle & Precision Coordinates](#61-ecdis-crosshair-reticle--precision-coordinates)
   - [6.2 Dual Position Acquisition (Browser GPS & Manual Bridge Fallback)](#62-dual-position-acquisition-browser-gps--manual-bridge-fallback)
7. [Module 4: Minimalist System Settings & Engineering Support](#7-module-4-minimalist-system-settings--engineering-support)
   - [7.1 Minimalist Design & Fixed Left Navigation Rail](#71-minimalist-design--fixed-left-navigation-rail)
   - [7.2 Unified Menu Button Border & Dimensions](#72-unified-menu-button-border--dimensions)
   - [7.3 Dark Cockpit vs Light Bridge Day Profiles](#73-dark-cockpit-vs-light-bridge-day-profiles)
   - [7.4 Direct Transmission to Engineering Team](#74-direct-transmission-to-engineering-team)
8. [Mobile Optimization & Tablet Workflows](#8-mobile-optimization--tablet-workflows)
9. [CI/CD & Deployment Pipeline](#9-cicd--deployment-pipeline)
10. [Navigator FAQ & Troubleshooting](#10-navigator-faq--troubleshooting)

---

## 1. Executive Summary & Philosophy

**SetSail** is an integrated marine navigation suite engineered for bridge watchkeeping officers, navigators, and masters aboard ocean-going vessels. It bridges astronomical precision navigation with modern automated Notice to Mariners chart corrections feed directly from the United Kingdom Hydrographic Office (UKHO).

### Core Operational Principles
* **100% Offline Capability (PWA & Local):** Works completely offline via browser URL without internet connection (no Google Dinosaur screen) via Service Worker pre-caching, as well as standalone local HTML execution.
* **Astronomical Precision:** Full 59-body celestial ephemeris engine, sight reduction, and magnetic deviation card spline curves.
* **Automated Weekly Hydrographic Pipeline:** Every Thursday at 10:00 UTC, a cloud crawler extracts official Admiralty Notices to Mariners (NtM) bulletins, parses coordinates, tracks cancellations, and updates the production dataset (`notices.json`).
* **Strict Chart Hygiene:** Cancelled or revoked notices are quarantined by default to eliminate visual clutter on the chart, appearing only under explicit review filters.

---

## 2. PWA Offline Engine & Service Worker

### 2.1 Eliminating the "Google Dinosaur" (Zero Network Dependency)
When navigators navigate to `https://waffiman.github.io/Admirality-NtM-Scraper/` mid-ocean without internet, standard browsers display an offline error page ("Google Dinosaur"). SetSail eliminates this through a Progressive Web App (PWA) architecture:
1. **Service Worker (`sw.js`):** Intercepts all browser HTTP requests with intelligent caching strategies:
   - **Navigation Requests (`request.mode === 'navigate'`):** Fast-race network with immediate fallback to cached `index.html`. Even with zero cellular or satellite signal, the web address loads instantly.
   - **NtM Database (`notices.json`):** Network-first with instant fallback to the last downloaded weekly bulletin. The ship always sees the latest cached NtM dataset with full plotting and export capabilities.
   - **Core Navigation Assets:** Cache-first with background revalidation for styles, scripts, icons, stamps, and logos.
2. **Local Self-Contained Leaflet Library (`assets/leaflet/`):** All map rendering scripts and stylesheet assets (`leaflet.js`, `leaflet.css`, and marker assets) are bundled locally on the origin, removing reliance on external CDNs (`unpkg.com`).
3. **Web App Manifest (`manifest.json`):** Defines standalone app display, dark marine theme `#080e20`, and ship logo icons for one-click installation on Android, iPadOS, and Windows desktops.

---

## 3. System Architecture

```
                                  ┌────────────────────────────────┐
                                  │   UKHO Admiralty MSI Portal    │
                                  │    (msi.admiralty.co.uk)       │
                                  └───────────────┬────────────────┘
                                                  │ 1. Publishes weekly bulletin (Thu 10:00 UTC)
                                                  ▼
┌────────────────────────────┐    ┌────────────────────────────────┐
│   Ship's Bridge PC / Tablet│    │   GitHub Actions Workflow      │
│   (Offline Browser / PWA)  │    │   (.github/workflows/scrape.yml)│
├────────────────────────────┤    ├────────────────────────────────┤
│ • Service Worker Cache     │    │ • requests.Session (Cookies)   │
│ • Gyro & Magnetic Logbook  │    │ • pdfplumber text extraction   │
│ • Star Almanac (59 bodies) │    │ • Regex notice classifier      │
│ • Local Leaflet Engine     │    │ • Cancellation resolver        │
│ • Cached NtM Database      │    │ • Automated email alert on fail│
│ • ECDIS Crosshair Target   │    └───────────────┬────────────────┘
└─────────────▲──────────────┘                    │ 2. Commits data
              │                                   ▼
              │ 3. PWA Cache-first sync ┌────────────────────────┐
              └─────────────────────────┤  GitHub Repository     │
                                        │  • notices.json        │
                                        │  • GitHub Pages Host   │
                                        └────────────────────────┘
```

---

## 4. Module 1: Gyro & Magnetic Compass Logbook

### 4.1 Celestial Ephemeris Engine (59 Bodies)
* **Sun & Moon:** Full VSOP87 analytical solar ephemeris and Brown lunar theory calculating GHA, Declination, Semi-Diameter, and Parallax.
* **4 Navigational Planets:** Venus, Mars, Jupiter, Saturn with accurate orbital elements.
* **53 Selected Nautical Stars:** Precision astrometric positions with proper motion corrections.
* **Sight Reduction Tables:** Automatic calculation of calculated altitude ($Hc$), azimuth angle ($Z$), and true azimuth ($Zn$).

### 4.2 Magnetic Compass Deviation Model & Splines
* Cubic spline interpolation across 8 cardinal/intercardinal deviation benchmarks from the ship's annual deviation table.
* Real-time calculation of magnetic heading ($H_m$), compass heading ($H_c$), total compass error ($CE$), and gyro error ($GE$).

### 4.3 SOLAS / IMO Compliance & A4 Printing
* Generates official A4 compass observation records compliant with SOLAS Chapter V Regulation 19.
* Clean print layout with official stamp and master signature box.

---

## 5. Module 2: Auto-NtM Automated ECDIS Plotter

### 5.1 UKHO Admiralty Weekly, Annual & Cumulative Scraping
* **Weekly Bulletins:** Automatically parses Section II of UKHO Admiralty Notices to Mariners.
* **Annual Summary (NP247 / File 27):** Incorporates all active Temporary (T) and Preliminary (P) notices in force.
* **Cumulative Lists (NP234):** Cross-checks chart editions and notice sequences.

### 5.2 Coordinate Parsing & Geometric Heuristics
* Standard degrees-minutes-seconds (`58° 37.70' N, 017° 46.30' E`) and dash notation (`58-37.70 N, 017-46.30 E`).
* Automatic bounding-box geometry detection for polygons (`bounded by`, `joining`) and submarine cables/pipelines (`isLine`).

### 5.3 Cancellation Tracking & Map Isolation Policy
* Notices marked as cancelled by subsequent bulletins (`Former Notice ... is cancelled`) are automatically flagged (`isCancelled: true`).
* **Isolation Policy:** Cancelled notices are strictly hidden from the chart by default to prevent clutter and obsolete danger overlays. Navigators can view them on demand via the dedicated filter toggle.

### 5.4 NAVAREA Filtering & IMO/IHO WWNWS Resolution
UKHO Admiralty Section II bulletins structure chart corrections by Country and Geographic Sea Area rather than explicitly stating the NAVAREA number. SetSail includes an intelligent **IMO/IHO NAVAREA Resolver** that maps notice country and geographic coordinates to the 21 World-Wide Navigational Warning Service areas:
* **NAVAREA I:** United Kingdom, Ireland, English Channel, North Sea, Baltic Sea, Norway (south of 71°N).
* **NAVAREA II:** France, Spain, Portugal, Canary Islands, West Africa, East Atlantic.
* **NAVAREA III:** Mediterranean Sea, Black Sea, Sea of Azov.
* **NAVAREA IV:** United States East Coast, Canada East Coast, Gulf of Mexico, Caribbean Sea.
* **NAVAREA V:** Brazil, South Atlantic.
* **NAVAREA VIII:** India, Arabian Sea, Bay of Bengal, Central Indian Ocean.
* **NAVAREA IX:** Persian Gulf, Gulf of Oman, Red Sea, Gulf of Aden.
* **NAVAREA XI:** China, Japan, Korea, Taiwan, Philippines, Singapore, Malacca Strait, South China Sea.
* **NAVAREA XII:** United States West Coast, Canada West Coast, Alaska, East Pacific.
* **NAVAREA XIV:** Australia, New Zealand, South Pacific.
* **NAVAREA XX:** Barents Sea, White Sea, Russian Arctic.

**User Interface Controls:**
Navigators can filter the notices list and chart overlay simultaneously by selecting a specific NAVAREA from the filter popover dropdown (`#popSelectNavarea`), instantly isolating notices for their passage area. Each notice card also prominently displays its resolved NAVAREA badge.

### 5.5 Telemetry Indicators: Live Pulsing Green vs Static Red Dot
Located in the upper-left status header, the telemetry indicator informs the bridge team of connection and data freshness:
* **🟢 Pulsating Green Radar Dot (`.ntm-live-dot`):** Indicates the bridge is connected online and receiving live UKHO scraper telemetry. Features a 1.8-second animated radar pulse effect.
* **🔴 Static Solid Red Dot (`.ntm-offline-dot`):** Indicates the app is operating in **Offline Mode** (using cached PWA/local data) or that scraping telemetry encountered a network error. Strictly static with zero animation to clearly distinguish it from active live transmission.

### 5.6 ECDIS Export Engines with UTC Timestamps
* **JRC User Chart (`.uchm`):** Exports corrections directly into JRC JAN-9201/7201 format.
* **GeoJSON & CSV:** For ECDIS overlays, passage planning spreadsheets, and GIS software.
* **Automated UTC Timestamping:** All exported filenames include the exact generation date and UTC time (e.g., `SetSail_NtM_20261004_1715UTC.uchm`) for seamless revision tracking on the bridge.

---

## 6. Module 3: Real-Time Vessel GPS Crosshair Target

### 6.1 ECDIS Crosshair Reticle & Precision Coordinates
* Replaces bulky silhouettes with a precise **ECDIS Crosshair Target (прицел)**:
  * Central high-contrast cyan radar dot.
  * Precision reticle ring with 4 cardinal crosshair ticks.
  * Pulsating radar ring indicator.
  * Eliminates unnecessary heading/speed clutter, focusing purely on exact coordinates on the chart.
  * Interactive popup and live overlay HUD displaying coordinates in standard nautical DMS format (`58° 37.70' N, 017° 46.30' E`).

### 6.2 Dual Position Acquisition Options
When clicking **My Vessel**, a clean dialog offers two choices:
1. **Auto GPS:** Acquires coordinates automatically via browser Geolocation (`enableHighAccuracy: true`).
2. **Manual Input:** Allows entering bridge GPS coordinates in DMS or decimal degrees with a single click.

---

## 7. Module 4: Minimalist System Settings & Engineering Support

### 7.1 Minimalist Design & Fixed Left Navigation Rail
* **Fixed Navigation Rail:** The left 58px sidebar is permanently fixed in place and never scrolls. Only the wide content area on the right scrolls independently.
* **Minimalist Block Layout:**
  * **Theme Switcher:** Instant toggle between `🌙 Dark (Ночь)` and `☀️ Light (День)` modes.
  * **Direct Developer Support Form:** Streamlined to two essential fields:
    * **Email for reply (Email для ответа)**: Where the engineering team will send their response.
    * **Message (Сообщение)**: Problem description or feature suggestion.
    * Developer email is kept secure in backend dispatch and strictly hidden from UI.
  * **Data Cache Reset:** One-click button to clear local storage and re-fetch live Admiralty bulletins.

### 7.2 Unified Menu Button Border & Dimensions
All navigation icons in the left rail—including the bottom **⚙️ Settings** button (`.nav-settings-item`)—share identical visual specifications:
* Size: $44	ext{px} 	imes 44	ext{px}$
* Border radius: $10	ext{px}$
* Border: `1px solid var(--line)` (Dark: `rgba(140, 170, 255, 0.18)`, Light: `#cbd5e1`)
* Consistent hover and active accent highlights.

---

## 8. Mobile Optimization & Tablet Workflows

* **Responsive Bottom Navigation Rail:** On screens $\le 768	ext{px}$, the 58px side rail transforms into a fixed 58px bottom navigation bar with large touch-friendly buttons.
* **Segmented Mobile Viewport Switcher:** Quick toggle between `📋 List` view and `🗺️ Chart` view on mobile devices.
* **Touch Targets:** All interactive pills, buttons, and form inputs feature minimum 44px touch targets compliant with maritime tablet and smartphone handling.
* **Automatic Chart Invalidation:** Smooth Leaflet chart re-renders when switching between portrait and landscape orientations.

---

## 9. CI/CD & Deployment Pipeline

* **Workflow File:** `.github/workflows/scrape.yml`
* **Trigger:** Weekly schedule (`cron: '0 10 * * 4'` — every Thursday at 10:00 UTC) and manual `workflow_dispatch`.
* **Automated Failure Alert:** In the event of scraping failures or layout alterations on the UKHO portal, an automated email alert is immediately transmitted to engineering (`wafficompany@gmail.com`).
* **GitHub Pages:** Production site auto-deploys within 30 seconds upon new commit.

---

## 10. Navigator FAQ & Troubleshooting

**Q: Can I use SetSail when the ship has no internet connection?**  
**A:** Yes! SetSail is fully offline-capable in two ways:
1. **Via Browser URL:** Open `https://waffiman.github.io/Admirality-NtM-Scraper/` in Chrome or Edge. Thanks to the PWA Service Worker, the page loads instantly without the Google Dinosaur error, serving the latest cached NtM bulletin and local chart.
2. **Via Local File:** Double-click `SetSail.html` on the ship's bridge drive (`D:\IINO INEOS VESTA. GYRO ERROR CALC\SetSail.html`). All celestial calculations, almanac bodies, deviation curves, and charts work completely standalone.

**Q: What does the red dot in the top left mean?**  
**A:** A static solid red dot indicates SetSail is operating in **Offline Mode** (using cached NtM data) or that the network connection to UKHO is unavailable. When online and synchronizing with UKHO, the dot turns into a pulsating green radar dot.

**Q: Can I filter chart corrections by my voyage's NAVAREA?**  
**A:** Yes. Open the Filter Popover (funnel icon next to Select All) and select your target NAVAREA (e.g. *NAVAREA I* for North Sea/Baltic, *NAVAREA VIII* for Indian Ocean, *NAVAREA XI* for East Asia). The list and chart will display only notices relevant to that area.

**Q: Are cancelled notices displayed on the ECDIS map?**  
**A:** By default, no. Cancelled notices are strictly isolated from the chart to prevent clutter. To inspect cancelled notices during a passage planning audit, check the `[🚫 Cancelled]` checkbox in the filter popover.

**Q: How do I plot our vessel on the ECDIS chart?**  
**A:** Click the **📡 My Vessel** button in the Auto-NtM toolbar. Choose *Auto GPS* for automatic browser geolocation, or *Manual Input* to enter your bridge GPS coordinates. An ECDIS crosshair reticle will appear at your exact position.

**Q: How do I report a missing notice or bug?**  
**A:** Navigate to the **⚙️ Settings** tab at the bottom of the left navigation rail, enter your reply email and message, and click *Transmit Message*.

---
*Maintained by SetSail Bridge Engineering &bull; LPG/C IINO INEOS VESTA &bull; Production Release v2.5*
