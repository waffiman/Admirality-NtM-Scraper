# ⛵ SetSail — Marine Navigation Suite
### Comprehensive Technical Wiki & Operational Manual
**Vessel:** LPG/C *IINO INEOS VESTA* &bull; **Developer:** SetSail Maritime Engineering &bull; **Version:** 2.4.0 (Production)  
**Live Portal:** [https://waffiman.github.io/Admirality-NtM-Scraper/](https://waffiman.github.io/Admirality-NtM-Scraper/)

---

## 📑 Table of Contents
1. [Executive Summary & Philosophy](#1-executive-summary--philosophy)
2. [System Architecture](#2-system-architecture)
3. [Module 1: Gyro & Magnetic Compass Logbook](#3-module-1-gyro--magnetic-compass-logbook)
   - [3.1 Celestial Ephemeris Engine (59 Bodies)](#31-celestial-ephemeris-engine-59-bodies)
   - [3.2 Magnetic Compass Deviation Model & Splines](#32-magnetic-compass-deviation-model--splines)
   - [3.3 SOLAS / IMO Compliance & A4 Printing](#33-solas--imo-compliance--a4-printing)
4. [Module 2: Auto-NtM Automated ECDIS Plotter](#4-module-2-auto-ntm-automated-ecdis-plotter)
   - [4.1 UKHO Admiralty Weekly & Annual Scraping Pipeline](#41-ukho-admiralty-weekly--annual-scraping-pipeline)
   - [4.2 Coordinate Parsing & Geometric Heuristics](#42-coordinate-parsing--geometric-heuristics)
   - [4.3 Cancellation Tracking & Map Isolation Policy](#43-cancellation-tracking--map-isolation-policy)
   - [4.4 Multi-Type Filter Toggles & Rich Sorting](#44-multi-type-filter-toggles--rich-sorting)
   - [4.5 ECDIS Export Engines (JRC `.uchm`, GeoJSON, CSV)](#45-ecdis-export-engines-jrc-uchm-geojson-csv)
5. [Module 3: Real-Time Vessel GPS & ECDIS Silhouette](#5-module-3-real-time-vessel-gps--ecdis-silhouette)
   - [5.1 ECDIS Silhouette Marker & Heading Vectors](#51-ecdis-silhouette-marker--heading-vectors)
   - [5.2 Live Sensor Geolocation & Manual Bridge Fallback](#52-live-sensor-geolocation--manual-bridge-fallback)
6. [Module 4: System Settings & Visual Profiles](#6-module-4-system-settings--visual-profiles)
   - [6.1 Dark Cockpit vs Light Bridge Day Profiles](#61-dark-cockpit-vs-light-bridge-day-profiles)
   - [6.2 Direct Transmission to Engineering Team](#62-direct-transmission-to-engineering-team)
   - [6.3 Vessel Profile & Local Storage Telemetry](#63-vessel-profile--local-storage-telemetry)
7. [Mobile Optimization & Tablet Workflows](#7-mobile-optimization--tablet-workflows)
8. [CI/CD & Deployment Pipeline](#8-cicd--deployment-pipeline)
9. [Navigator FAQ & Troubleshooting](#9-navigator-faq--troubleshooting)

---

## 1. Executive Summary & Philosophy

**SetSail** is an integrated marine navigation suite engineered for bridge watchkeeping officers, navigators, and masters aboard ocean-going vessels. It bridges astronomical precision navigation with modern automated Notice to Mariners chart corrections feed directly from the United Kingdom Hydrographic Office (UKHO).

### Core Operational Principles
* **100% Offline Bridge Cockpit (Primary):** The Gyro/Magnetic Logbook, Celestial Ephemeris (59 celestial bodies), Deviation Card Spline, and local Canvas Mercator Chart operate entirely offline with zero network connectivity or external dependencies.
* **Automated Weekly Hydrographic Pipeline (Secondary):** Every Thursday at 10:00 UTC, a cloud crawler extracts official Admiralty Notices to Mariners (NtM) bulletins, parses coordinates, tracks cancellations, and updates the production dataset (`notices.json`).
* **Strict Chart Hygiene:** Cancelled or revoked notices are quarantined by default to eliminate visual clutter on the chart, appearing only under explicit review filters.

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
│   Ship's Bridge PC / Tablet│    │   GitHub Actions Workflow      │
│   (Offline Browser)        │    │   (.github/workflows/scrape.yml)│
├────────────────────────────┤    ├────────────────────────────────┤
│ • Gyro & Magnetic Logbook  │    │ • requests.Session (Cookies)   │
│ • Star Almanac (59 bodies) │    │ • pdfplumber text extraction   │
│ • ECDIS Vessel Silhouette  │    │ • Regex notice classifier      │
│ • Dark/Light Bridge Theme  │    │ • Cancellation resolver        │
│ • Deviation Card Spline    │    │ • Automated Email Alerts       │
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

### 3.1 Celestial Ephemeris Engine (59 Bodies)
The celestial engine calculates Greenwich Hour Angle (GHA), Declination ($\delta$), Local Hour Angle (LHA), and True Azimuth ($Zn$) for:
1. **The Sun:** Semi-diameter, horizontal parallax, atmospheric refraction, and equation of time.
2. **The Moon:** Dynamic horizontal parallax, semi-diameter, and phase adjustments.
3. **Navigational Planets:** Venus, Mars, Jupiter, and Saturn.
4. **57 Selected Navigational Stars:** Epoch 2026 Sidereal Hour Angle (SHA) and Declination coordinates.

#### Core Azimuth Formula (Cosine-Haversine / Spherical Trigonometry):
$$	an Z = rac{\sin 	ext{LHA}}{\cos \phi 	an \delta - \sin \phi \cos 	ext{LHA}}$$
$$	ext{Zn} = egin{cases} Z & 	ext{if } 	ext{LHA} > 180^\circ 	ext{ and } Z \ge 0 \ 360^\circ - Z & 	ext{otherwise} \end{cases}$$

### 3.2 Magnetic Compass Deviation Model & Splines
* Accommodates the vessel's official Table of Residual Deviations across 16 cardinal and intercardinal headings.
* Employs cubic spline / linear interpolation to resolve intermediate headings to $0.1^\circ$ precision.
* Computes compass error and true heading automatically:
  $$	ext{Compass Error} = 	ext{Variation} + 	ext{Deviation}$$
  $$	ext{True Heading} = 	ext{Compass Course} \pm 	ext{Compass Error}$$

### 3.3 SOLAS / IMO Compliance & A4 Printing
* Fulfills **SOLAS Chapter V, Regulation 19.2.5** (determination of compass errors once per watch and after large course alterations).
* Complies with **IMO Resolution A.424(XI)** and **IMO Resolution A.224(VII)**.
* Includes one-click **A4 Landscape Print View** formatted for official bridge log archives.

---

## 4. Module 2: Auto-NtM Automated ECDIS Plotter

### 4.1 UKHO Admiralty Weekly & Annual Scraping Pipeline
* **Target:** `https://msi.admiralty.co.uk/NoticesToMariners/Weekly` and `/Annual`
* **Session Handling:** ASP.NET Antiforgery cookie tracking with `requests.Session`.
* **Parsing Engine:** Automated extraction of Section II bulletins, Annual NP247 T&P lists, and Cumulative NP234 updates.

### 4.2 Coordinate Parsing & Geometric Heuristics
* Converts degrees, minutes, and hundredths of minutes from UKHO formatting to precise decimal coordinates and standard DMS representations.
* **Polygons / Restricted Areas:** Boundary detection (`bounded by the following coordinates`, `joining (a)...(d)`) with automatic latitude/longitude spread bounds protection.
* **Linear Features:** Submarine cables, pipelines, channels, and leading lines.
* **Point Hazards:** Wrecks, buoys, lights, foul grounds, platforms.

### 4.3 Cancellation Tracking & Map Isolation Policy
* Automatically scans bulletins for former notice annulments (`Former Notice ... is cancelled`).
* **Strict Map Hygiene:** Cancelled notices are **quarantined from the active chart layer by default**.
* To view revoked notices (e.g. for chart audit purposes), the navigator can click the `[🚫 Cancelled]` pill. When activated, cancelled notices render in red with strikethrough badges.

### 4.4 Multi-Type Filter Toggles & Rich Sorting
* **Multi-Select Filter Pills:**
  * `[All]` — Quick reset to all active notice types.
  * `[🟡 (T)]` — Temporary notices with live counter.
  * `[🟣 (P)]` — Preliminary notices with live counter.
  * `[🔵 Perm]` — Permanent notices with live counter.
  * `[📐 Areas]` — Polygon restricted zones and areas.
  * `[🚫 Cancelled]` — Isolated revoked notice archive.
  * Multiple pills can be toggled simultaneously (e.g. `(T)` + `(P)` simultaneously).
* **Rich Sorting Options:**
  * `⚡ Newest #` — Descending bulletin notice numbers.
  * `🔢 Oldest #` — Ascending bulletin notice numbers.
  * `🌍 Country A-Z` — Alphabetical country ordering.
  * `🗺️ Region A-Z` — Alphabetical regional grouping.
  * `📑 Most Charts` — Prioritizes notices affecting multiple navigational charts.
  * `📍 Most Points` — Complex multi-coordinate notices first.
  * `🏷️ Type` — Grouped by Temporary $	o$ Preliminary $	o$ Permanent.

### 4.5 ECDIS Export Engines
1. **JRC ECDIS User Chart Map (`.uchm`):** Binary structure readable by JRC JAN-9201 / JAN-7201 ECDIS consoles via USB drive.
2. **GeoJSON (`.geojson`):** Standard RFC 7946 geographic features importable into NavStation, Transas, Sperry Marine, and OpenCPN.
3. **Voyage Planning CSV (`.csv`):** Tabular DMS coordinates formatted for official passage plans.

---

## 5. Module 3: Real-Time Vessel GPS & ECDIS Silhouette

### 5.1 ECDIS Silhouette Marker & Heading Vectors
* SetSail plots the vessel's live position using an official **ECDIS ship silhouette**:
  * Sharp bow, bridge wings, and transom stern.
  * Rotates dynamically to match the vessel's true heading ($	ext{000}^\circ - 	ext{359}^\circ$).
  * Yellow dashed 6-minute course vector projecting ahead from the bow.
  * Radar pulsating ring centered on the GPS antenna pivot point.
  * Interactive popup and live overlay HUD displaying vessel name (*LPG/C IINO INEOS VESTA*), position in DMS, COG, and SOG.

### 5.2 Live Sensor Geolocation & Manual Bridge Fallback
* **Browser Geolocation:** One-click GPS fix acquisition via `navigator.geolocation` (`enableHighAccuracy: true`).
* **Manual Bridge Input:** On computers lacking direct browser GPS connectivity, navigators can enter coordinates in either DMS (`58° 37.70' N, 017° 46.30' E`) or decimal degrees, along with heading and speed.
* Vessel position is persisted locally in `localStorage` across restarts.

---

## 6. Module 4: System Settings & Visual Profiles

### 6.1 Dark Cockpit vs Light Bridge Day Profiles
* **🌙 Dark Cockpit (Night Watch):** Deep navy blue bridge layout (`#050814`) with amber and soft cyan accents, preserving the watchkeeper's night vision during dark hours.
* **☀️ Light Bridge (Day Mode):** High-contrast crisp nautical slate layout (`#f1f5f9` / `#ffffff`) with navy text and ocean blue highlights, designed for bright daylight operations.
* Selection is instantly applied across all modules and persisted in `localStorage`.

### 6.2 Direct Transmission to Engineering Team
* Located in the **Settings** tab (gear icon at the bottom of the left nav rail).
* Provides a secure direct communication line to the SetSail software development and engineering team.
* Fields: Officer Rank/Name, Vessel Name (*LPG/C IINO INEOS VESTA*), Category (Bug, Scraper Discrepancy, Feature Request), Subject, and Message.
* Submits securely without exposing developer email in plaintext.
* Includes automated client diagnostics (browser version, screen resolution, active notices count).

### 6.3 Vessel Profile & Local Storage Telemetry
* Pre-configured vessel parameters:
  * **Vessel Name:** LPG/C *IINO INEOS VESTA*
  * **IMO:** 9681326 &bull; **MMSI:** 563004000 &bull; **Call Sign:** 9V2743
* **Cache Management:** One-click cache reset button to clear local storage and re-synchronize fresh notice bulletins.

---

## 7. Mobile Optimization & Tablet Workflows

* **Responsive Bottom Navigation Rail:** On screens $\le 768	ext{px}$, the 58px side rail transforms into a fixed 58px bottom navigation bar with large touch-friendly buttons.
* **Segmented Mobile Viewport Switcher:** Quick toggle between `📋 List` view and `🗺️ Chart` view on mobile devices.
* **Touch Targets:** All interactive pills, buttons, and form inputs feature minimum 44px touch targets compliant with maritime tablet and smartphone handling.
* **Automatic Chart Invalidation:** Smooth Leaflet chart re-renders when switching between portrait and landscape orientations.

---

## 8. CI/CD & Deployment Pipeline

* **Workflow File:** `.github/workflows/scrape.yml`
* **Trigger:** Weekly schedule (`cron: '0 10 * * 4'` — every Thursday at 10:00 UTC) and manual `workflow_dispatch`.
* **Automated Failure Alert:** In the event of scraping failures or layout alterations on the UKHO portal, an automated email alert is immediately transmitted to engineering.
* **GitHub Pages:** Production site auto-deploys within 30 seconds upon new commit.

---

## 9. Navigator FAQ & Troubleshooting

**Q: Can I use SetSail when the ship is completely offline?**  
**A:** Yes! Open `SetSail.html` directly from the ship's local drive (`D:\IINO INEOS VESTA. GYRO ERROR CALC\SetSail.html`). All calculations, almanac bodies, deviation curves, and local canvas charts work with zero internet connectivity.

**Q: Are cancelled notices displayed on the ECDIS map?**  
**A:** By default, no. Cancelled notices are strictly isolated from the chart to prevent clutter. To inspect cancelled notices during a passage planning audit, click the `[🚫 Cancelled]` pill in the filter bar.

**Q: How do I plot our vessel on the ECDIS chart?**  
**A:** Click the **📡 My Vessel** button in the Auto-NtM toolbar. If using a GPS-enabled tablet or bridge PC, click *Get Live Browser GPS Position*. On offline PCs, type your current latitude, longitude, heading, and speed, then click *Plot Vessel on Chart*.

**Q: How do I report a missing notice or bug?**  
**A:** Navigate to the **⚙️ Settings** tab at the bottom of the left navigation rail, fill in the *Direct Line to SetSail Maritime Engineering* form, and click *Transmit Message*.

---
*Maintained by SetSail Bridge Engineering &bull; LPG/C IINO INEOS VESTA &bull; Production Release v2.4*
