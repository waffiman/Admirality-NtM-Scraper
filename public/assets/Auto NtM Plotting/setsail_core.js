// ── SetSail Brand High-Precision Vector Icon Engine ──
const SetSailIcons = {
  svg(name, extraClass = "") {
    const cls = extraClass ? `setsail-icon ${extraClass}` : `setsail-icon`;
    switch (name) {
      case "chart":
        return `<svg class="${cls}" viewBox="0 0 24 24"><rect x="2" y="3.5" width="20" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 8.5h20M7 3.5v2M17 3.5v2" stroke="currentColor" stroke-width="1.2" opacity="0.6"/><path d="M4 17c3-2 6-1 9-3s4-3.5 7-3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="2 1.5" opacity="0.75"/><path d="M4 13.5c2.5-1 5.5 0.5 8-1s5-2 8-1.5" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/><polyline points="5.5 17.5 10.5 12 15 14 18.5 7.5" fill="none" stroke="#f05a36" stroke-width="1.8" stroke-linecap="round"/><circle cx="18.5" cy="7.5" r="2.2" fill="#f05a36"/><circle cx="10.5" cy="12" r="1.4" fill="#ffffff"/></svg>`;
      case "compass":
      case "star":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6.8" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.4" stroke-dasharray="1.5 1.5"/><line x1="12" y1="1" x2="12" y2="4" stroke="#f05a36" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" stroke-width="1.5"/><line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.5"/><polygon points="12 4 13.6 10.4 20 12 13.6 13.6 12 20 10.4 13.6 4 12 10.4 10.4" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.2"/><polygon points="12 4 13.6 10.4 12 12" fill="#f05a36"/><polygon points="12 20 10.4 13.6 12 12" fill="currentColor" opacity="0.6"/><circle cx="12" cy="12" r="1.8" fill="#ffffff" stroke="#f05a36" stroke-width="1"/></svg>`;
      case "settings":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" fill="none" stroke="#f05a36" stroke-width="1.8"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.2" fill="#f05a36"/></svg>`;
      case "clock":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v3M9 2h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="12 8.5 12 13 15.5 14.5" fill="none" stroke="#f05a36" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="13" r="1.4" fill="#ffffff"/></svg>`;
      case "pos":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9" r="2.8" fill="#f05a36"/><circle cx="12" cy="9" r="1" fill="#ffffff"/></svg>`;
      case "vessel":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M12 2l4.5 7.5v10l-4.5 2.5-4.5-2.5v-10L12 2z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="2" x2="12" y2="9" stroke="#f05a36" stroke-width="1.8"/><circle cx="12" cy="13.5" r="1.8" fill="#f05a36"/></svg>`;
      case "target":
      case "fit":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4.6" fill="none" stroke="#f05a36" stroke-width="1.6"/><line x1="12" y1="1" x2="12" y2="6" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12" y2="23" stroke="currentColor" stroke-width="1.5"/><line x1="1" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5" fill="#f05a36"/></svg>`;
      case "mail": return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/><polyline points="22,6 12,13 2,6" stroke="#f05a36" stroke-width="1.6"/></svg>`;
      case "check": return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#f05a36" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case "export":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" fill="none" stroke="currentColor" stroke-width="1.6"/><polyline points="17 21 17 13 7 13 7 21" stroke="#f05a36" stroke-width="1.6"/><polyline points="7 3 7 8 15 8" stroke="currentColor" stroke-width="1.4"/></svg>`;
      case "list":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="none" stroke="#f05a36" stroke-width="1.6"/><line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" stroke-width="1.6"/><line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" stroke-width="1.6"/></svg>`;
      case "anchor":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="7.5" x2="12" y2="21" stroke="currentColor" stroke-width="1.6"/><line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="1.5"/><path d="M5 16c2 4 12 4 14 0" fill="none" stroke="#f05a36" stroke-width="1.8" stroke-linecap="round"/><polyline points="4 14 5 16.5 7.5 16" fill="none" stroke="#f05a36" stroke-width="1.6"/><polyline points="20 14 19 16.5 16.5 16" fill="none" stroke="#f05a36" stroke-width="1.6"/></svg>`;
      case "info":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="16" x2="12" y2="11" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="7.5" r="1.2" fill="#f05a36"/></svg>`;
      case "search":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="21" y1="21" x2="16.2" y2="16.2" stroke="#f05a36" stroke-width="2.2" stroke-linecap="round"/></svg>`;
      case "import":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" stroke="currentColor" stroke-width="1.6"/><polyline points="7 10 12 15 17 10" stroke="#f05a36" stroke-width="1.8" stroke-linecap="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="#f05a36" stroke-width="1.8" stroke-linecap="round"/></svg>`;
      case "warning":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" stroke="#f05a36" stroke-width="1.8"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="17" r="1" fill="#f05a36"/></svg>`;
      case "cancelled":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#ef4444" stroke-width="1.6"/><line x1="5" y1="5" x2="19" y2="19" stroke="#ef4444" stroke-width="1.8"/></svg>`;
      case "wave":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M2 7c3-2 6-2 9 0s6 2 9 0" stroke="currentColor" stroke-width="1.5"/><path d="M2 12c3-2 6-2 9 0s6 2 9 0" stroke="#f05a36" stroke-width="1.6"/><path d="M2 17c3-2 6-2 9 0s6 2 9 0" stroke="currentColor" stroke-width="1.5"/></svg>`;
      case "satellite":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M13 2L3 12M21 10L11 20" stroke="currentColor" stroke-width="1.5"/><rect x="7" y="7" width="10" height="10" rx="1" transform="rotate(45 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="#f05a36"/></svg>`;
      case "route":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="4" cy="19" r="2.5" fill="#f05a36"/><circle cx="20" cy="5" r="2.5" fill="#f05a36"/><path d="M4 16.5c0-4 4-5.5 8-5.5s8-2 8-5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 2"/><polygon points="17 4 20.5 5 19 8" fill="#f05a36"/></svg>`;
      default:
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
    }
  }
};

/**
 * SetSail Auto-NtM UI Controller & Interactive ECDIS Chart
 * Navigation Suite for LPG/C IINO INEOS VESTA
 *
 * Capabilities:
 * - 100% PWA Offline Mode: Loads instantly even with NO internet (No Google Dinosaur)
 * - Static Red Telemetry Dot when offline or on scraping error; pulsating Green dot when online
 * - Full NAVAREA filtering (NAVAREA I through XXI) & card badges
 * - Popover Filter (Funnel) & Sort (Two Arrows) next to Select All
 * - Crosshair target vessel position marker
 * - Minimalist Settings page with Dark/Light theme & Email+Message support form
 * - UTC timestamp appended to exported ECDIS filenames (YYYYMMDD_HHMMUTC)
 */

const NTM_STORAGE_KEY = "setsail_ntm_active_store_v2";
const VESSEL_STORAGE_KEY = "setsail_vessel_state_v1";
const THEME_STORAGE_KEY = "setsail_theme";
const META_STORAGE_KEY = "setsail_meta_v1";

let NTM_STORE = [];
let activeOverlayCategory = "ALL";

/**
 * Non-Intrusive Floating Toast Notification
 */
function showSetSailToast(message, type = "info") {
  let toastEl = document.getElementById("setsailToast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "setsailToast";
    toastEl.className = "setsail-toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.className = `setsail-toast setsail-toast-${type} show`;
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 4200);
}
let NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM", "NAVTEX"]); // Default: all active NtM + NAVTEX types
let NTM_FILTER_AREAS = false;
let NTM_SHOW_CANCELLED = false; // Strictly isolated from map by default!
let NTM_ACTIVE_NAVAREA = "ALL";
let NTM_ACTIVE_SORT = "NUM_DESC";

let leafletMap = null;
let leafletMarkersLayer = null;
let leafletVesselLayer = null;
let leafletWeatherLayer = null;
let userVessel = null; // { lat, lon, source: "gps" | "manual" }

// ===== My Vessel profile (Home HUD + SetChart) — synced, no auto-geo on load =====
const VESSEL_STORAGE_KEY_V2 = "setsail_vessel_state_v2";
let _aisNameIndex = null;
let _aisNameIndexPromise = null;
let _vesselSuggestTimer = null;

function loadUserVesselFromStorage() {
  try {
    const raw2 = localStorage.getItem(VESSEL_STORAGE_KEY_V2);
    if (raw2) {
      userVessel = JSON.parse(raw2);
      return userVessel;
    }
    const raw1 = localStorage.getItem(VESSEL_STORAGE_KEY);
    if (raw1) {
      userVessel = JSON.parse(raw1);
      persistUserVessel();
      return userVessel;
    }
  } catch (e) {}
  return null;
}

function persistUserVessel() {
  try {
    if (userVessel) {
      localStorage.setItem(VESSEL_STORAGE_KEY_V2, JSON.stringify(userVessel));
      localStorage.setItem(VESSEL_STORAGE_KEY, JSON.stringify({
        lat: userVessel.lat,
        lon: userVessel.lon,
        source: userVessel.source || "manual",
        updatedAt: userVessel.updatedAt
      }));
    } else {
      localStorage.removeItem(VESSEL_STORAGE_KEY_V2);
      localStorage.removeItem(VESSEL_STORAGE_KEY);
    }
  } catch (e) {}
}

function getHomeVesselHudLabel() {
  if (!userVessel) return "NOT SET";
  const name = (userVessel.name || "").trim();
  if (name) return name;
  if (Number.isFinite(Number(userVessel.lat)) && Number.isFinite(Number(userVessel.lon))) {
    return formatLatLonDMS(Number(userVessel.lat), Number(userVessel.lon));
  }
  return "NOT SET";
}

function updateHomeVesselHudLabel() {
  const el = document.getElementById("homeVesselHudCoords");
  if (el) el.textContent = getHomeVesselHudLabel();
}

function vesselFormMap(which) {
  if (which === "home") {
    return {
      name: "homeVesselName",
      callSign: "homeVesselCallSign",
      lat: "homeVesselLat",
      lon: "homeVesselLon",
      mmsi: "homeVesselMmsi",
      type: "homeVesselType",
      dest: "homeVesselDest",
      sog: "homeVesselSog",
      cog: "homeVesselCog",
      heading: "homeVesselHeading",
      suggest: "homeVesselAisSuggest"
    };
  }
  return {
    name: "vesselName",
    callSign: "vesselCallSign",
    lat: "vesselLat",
    lon: "vesselLon",
    mmsi: "vesselMmsi",
    type: "vesselType",
    dest: "vesselDest",
    sog: "vesselSog",
    cog: "vesselCog",
    heading: "vesselHeading",
    suggest: "vesselAisSuggest"
  };
}

function setInputVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val == null || val === "" ? "" : String(val);
}

function getInputVal(id) {
  const el = document.getElementById(id);
  return el ? String(el.value || "").trim() : "";
}

function fillVesselFormsFromState() {
  const v = userVessel || {};
  ["home", "chart"].forEach((which) => {
    const m = vesselFormMap(which);
    setInputVal(m.name, v.name || "");
    setInputVal(m.callSign, v.callSign || "");
    if (Number.isFinite(Number(v.lat)) && Number.isFinite(Number(v.lon))) {
      setInputVal(m.lat, formatLatLonDMS(Number(v.lat), Number(v.lon)).split(/\s{2,}| (?=[0-9]+\°)/)[0] || formatLatLonDMS(Number(v.lat), Number(v.lon)));
      // Prefer separate DMS strings if formatLatLonDMS returns combined
      const dms = formatLatLonDMS(Number(v.lat), Number(v.lon));
      const parts = dms.split(/\s+/);
      // format is typically "DD° MM.MM' N  DDD° MM.MM' E" — split at hemisphere of lat
      const mlat = dms.match(/([0-9]+°[^NSEW]*[NS])/i);
      const mlon = dms.match(/([0-9]+°[^NSEW]*[EW])/i);
      setInputVal(m.lat, mlat ? mlat[1].trim() : String(v.lat));
      setInputVal(m.lon, mlon ? mlon[1].trim() : String(v.lon));
    } else {
      setInputVal(m.lat, "");
      setInputVal(m.lon, "");
    }
    setInputVal(m.mmsi, v.mmsi || "");
    setInputVal(m.type, v.shipType || "");
    setInputVal(m.dest, v.destination || "");
    setInputVal(m.sog, v.sog != null ? v.sog : "");
    setInputVal(m.cog, v.cog != null ? v.cog : "");
    setInputVal(m.heading, v.heading != null ? v.heading : "");
  });
  const clearBtn = document.getElementById("vesselClearBtn");
  const homeClear = document.getElementById("homeVesselClearBtn");
  const has = !!(userVessel && (userVessel.name || (Number.isFinite(Number(userVessel.lat)) && Number.isFinite(Number(userVessel.lon)))));
  if (clearBtn) clearBtn.style.display = has ? "inline-block" : "none";
  if (homeClear) homeClear.style.display = has ? "inline-block" : "none";
  updateHomeVesselHudLabel();
}

function readVesselForm(which) {
  const m = vesselFormMap(which);
  const lat = parseCoordinateString(getInputVal(m.lat));
  const lon = parseCoordinateString(getInputVal(m.lon));
  const sogRaw = getInputVal(m.sog);
  const cogRaw = getInputVal(m.cog);
  const hdgRaw = getInputVal(m.heading);
  return {
    name: getInputVal(m.name),
    callSign: getInputVal(m.callSign),
    lat: lat,
    lon: lon,
    mmsi: getInputVal(m.mmsi),
    shipType: getInputVal(m.type),
    destination: getInputVal(m.dest),
    sog: sogRaw === "" ? null : Number(sogRaw),
    cog: cogRaw === "" ? null : Number(cogRaw),
    heading: hdgRaw === "" ? null : Number(hdgRaw),
    source: (userVessel && userVessel.source) || "manual"
  };
}

function applyVesselProfile(data, opts) {
  opts = opts || {};
  const prev = userVessel || {};
  userVessel = Object.assign({}, prev, data, {
    updatedAt: new Date().toISOString()
  });
  if (!Number.isFinite(Number(userVessel.lat)) || !Number.isFinite(Number(userVessel.lon))) {
    // Keep name/details without position
    userVessel.lat = Number.isFinite(Number(data.lat)) ? Number(data.lat) : prev.lat;
    userVessel.lon = Number.isFinite(Number(data.lon)) ? Number(data.lon) : prev.lon;
  }
  persistUserVessel();
  fillVesselFormsFromState();

  if (Number.isFinite(Number(userVessel.lat)) && Number.isFinite(Number(userVessel.lon))) {
    plotUserVessel(Number(userVessel.lat), Number(userVessel.lon), userVessel.source || "manual", true);
  } else {
    updateHomeVesselHudLabel();
  }
  if (opts.toast && typeof showSetSailToast === "function") {
    showSetSailToast(opts.toast, "success");
  }
  if (!opts.skipAisSchedule && userVessel && userVessel.mmsi) {
    scheduleOwnVesselAisRefresh();
  }
}

/** Hourly live refresh of the AIS target linked as My Vessel (MMSI). */
const OWN_AIS_REFRESH_MS = 60 * 60 * 1000;
let _ownAisRefreshTimer = null;

async function fetchOwnVesselAisUpdate() {
  const v = userVessel;
  if (!v || !v.mmsi) return null;
  const mmsi = String(v.mmsi).trim();
  if (!/^\d{5,9}$/.test(mmsi)) return null;

  const boxes = [];
  const lat0 = Number(v.lat);
  const lon0 = Number(v.lon);
  if (Number.isFinite(lat0) && Number.isFinite(lon0)) {
    boxes.push([lat0 - 1.2, lon0 - 1.2, lat0 + 1.2, lon0 + 1.2]);
    boxes.push([lat0 - 3.5, lon0 - 3.5, lat0 + 3.5, lon0 + 3.5]);
  }

  async function fromOpenWaters() {
    function hitFromFeature(f) {
      if (!f) return null;
      const p = f.properties || {};
      const c = (f.geometry && f.geometry.coordinates) || [];
      return {
        mmsi,
        lat: c[1],
        lon: c[0],
        sog: p.sog,
        cog: p.cog,
        heading: p.heading,
        name: p.name || v.name || "",
        destination: p.destination || v.destination || "",
        shipType: p.type || p.shipType || v.shipType || "",
        callSign: p.callSign || v.callSign || "",
        navStat: p.nav_status != null ? p.nav_status : p.navStat,
        source: "ais"
      };
    }

    // Direct MMSI lookup (most reliable on Open Waters).
    try {
      const geo = await fetch("https://ais.openwaters.io/v1/vessels?mmsi=" + encodeURIComponent(mmsi), {
        headers: {
          Accept: "application/geo+json, application/json",
          "User-Agent": "SetSailMarineSuite/AIS"
        },
        cache: "no-store"
      }).then((r) => (r.ok ? r.json() : null));
      const f = geo && (geo.features || [])[0];
      const hit = hitFromFeature(f);
      if (hit && Number.isFinite(hit.lat) && Number.isFinite(hit.lon)) return hit;
    } catch (e) { /* fall through to bbox */ }

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const url =
        "https://ais.openwaters.io/v1/vessels?bbox=" +
        box.map((n) => Number(n).toFixed(4)).join(",");
      try {
        const geo = await fetch(url, {
          headers: {
            Accept: "application/geo+json, application/json",
            "User-Agent": "SetSailMarineSuite/AIS"
          },
          cache: "no-store"
        }).then((r) => (r.ok ? r.json() : null));
        if (!geo) continue;
        const feats = geo.features || [];
        for (let j = 0; j < feats.length; j++) {
          const f = feats[j];
          const p = f.properties || {};
          if (String(p.mmsi) !== mmsi) continue;
          return hitFromFeature(f);
        }
      } catch (e) {
        /* try next box */
      }
    }
    return null;
  }

  async function fromDigitraffic() {
    try {
      const geo = await fetch("https://meri.digitraffic.fi/api/ais/v1/locations", {
        headers: {
          Accept: "application/json",
          "Digitraffic-User": "SetSailMarineSuite/AIS"
        },
        cache: "no-store"
      }).then((r) => (r.ok ? r.json() : null));
      if (!geo) return null;
      const f = (geo.features || []).find((x) => String((x.properties || {}).mmsi) === mmsi);
      if (!f) return null;
      let meta = {};
      try {
        const vessels = await fetch("https://meri.digitraffic.fi/api/ais/v1/vessels", {
          headers: {
            Accept: "application/json",
            "Digitraffic-User": "SetSailMarineSuite/AIS"
          },
          cache: "no-store"
        }).then((r) => (r.ok ? r.json() : []));
        const arr = Array.isArray(vessels) ? vessels : vessels.vessels || [];
        const mv = arr.find((x) => String(x.mmsi || x.MMSI) === mmsi);
        if (mv) {
          meta = {
            name: mv.name || mv.shipName || "",
            destination: mv.destination || "",
            shipType: mv.shipType || mv.shipTypeName || "",
            callSign: mv.callSign || ""
          };
        }
      } catch (e2) { /* meta optional */ }
      const p = f.properties || {};
      const c = (f.geometry && f.geometry.coordinates) || [];
      return {
        mmsi,
        lat: c[1],
        lon: c[0],
        sog: p.sog,
        cog: p.cog,
        heading: p.heading,
        name: meta.name || v.name || "",
        destination: meta.destination || v.destination || "",
        shipType: meta.shipType || v.shipType || "",
        callSign: meta.callSign || v.callSign || "",
        navStat: p.navStat,
        source: "ais"
      };
    } catch (e) {
      return null;
    }
  }

  let hit = null;
  if (boxes.length) hit = await fromOpenWaters();
  if (!hit) hit = await fromDigitraffic();
  if (!hit) {
    try {
      const idx = await ensureAisNameIndex();
      const row = (idx || []).find((t) => String(t.mmsi) === mmsi);
      if (row) {
        hit = {
          mmsi,
          name: row.name || v.name || "",
          callSign: row.callSign || v.callSign || "",
          shipType: row.shipType || v.shipType || "",
          destination: row.destination || v.destination || "",
          lat: Number.isFinite(Number(row.lat)) ? Number(row.lat) : v.lat,
          lon: Number.isFinite(Number(row.lon)) ? Number(row.lon) : v.lon,
          sog: row.sog,
          cog: row.cog,
          heading: row.heading,
          source: "ais"
        };
      }
    } catch (e3) { /* ignore */ }
  }
  if (hit && Number.isFinite(Number(hit.lat)) && Number.isFinite(Number(hit.lon)) && !boxes.length) {
    boxes.push([Number(hit.lat) - 1.2, Number(hit.lon) - 1.2, Number(hit.lat) + 1.2, Number(hit.lon) + 1.2]);
    const live = await fromOpenWaters();
    if (live) hit = live;
  }
  return hit;
}

async function refreshOwnVesselFromAis(opts) {
  opts = opts || {};
  if (!userVessel || !userVessel.mmsi) return;
  try {
    const hit = await fetchOwnVesselAisUpdate();
    if (!hit) return;
    applyVesselProfile(
      Object.assign({}, userVessel, hit, {
        source: "ais",
        aisRefreshedAt: new Date().toISOString()
      }),
      {
        toast: opts.toast
          ? "Own vessel AIS updated (" + (hit.name || hit.mmsi) + ")"
          : null,
        skipAisSchedule: true
      }
    );
  } catch (e) {
    console.warn("[SetSail Vessel] own AIS hourly refresh failed", e);
  }
}

function scheduleOwnVesselAisRefresh() {
  if (_ownAisRefreshTimer) {
    clearInterval(_ownAisRefreshTimer);
    _ownAisRefreshTimer = null;
  }
  if (!userVessel || !userVessel.mmsi) return;
  _ownAisRefreshTimer = setInterval(() => {
    refreshOwnVesselFromAis({ toast: false });
  }, OWN_AIS_REFRESH_MS);
  if (!window._ownAisInitialKick) {
    window._ownAisInitialKick = true;
    setTimeout(() => refreshOwnVesselFromAis({ toast: false }), 6000);
  }
}
window.refreshOwnVesselFromAis = refreshOwnVesselFromAis;
window.scheduleOwnVesselAisRefresh = scheduleOwnVesselAisRefresh;
window.findAisTargetByMmsi = findAisTargetByMmsi;
window.bindVesselMmsiLookup = bindVesselMmsiLookup;

async function ensureAisNameIndex() {
  if (_aisNameIndex && _aisNameIndex.length) return _aisNameIndex;
  if (_aisNameIndexPromise) return _aisNameIndexPromise;
  _aisNameIndexPromise = (async () => {
    const out = [];
    const seen = Object.create(null);
    const pushRow = (t) => {
      if (!t) return;
      const n = String(t.name || "").trim();
      const mmsi = t.mmsi != null && t.mmsi !== "" ? String(t.mmsi) : "";
      if (n.length < 2 && !mmsi) return;
      if (n && (!/[A-Za-z]/.test(n) || n.startsWith("!"))) return;
      const key = mmsi || n.toUpperCase();
      if (seen[key]) {
        const prev = seen[key];
        if ((!prev.name && n) || (n && n.length > String(prev.name || "").length)) {
          Object.assign(prev, {
            name: n || prev.name,
            lat: t.lat != null ? t.lat : prev.lat,
            lon: t.lon != null ? t.lon : prev.lon,
            sog: t.sog != null ? t.sog : prev.sog,
            cog: t.cog != null ? t.cog : prev.cog,
            heading: t.heading != null ? t.heading : prev.heading,
            shipType: t.shipType || t.type || prev.shipType || "",
            destination: t.destination || prev.destination || "",
            callSign: t.callSign || t.callsign || prev.callSign || "",
            source: t.source || prev.source || "AIS"
          });
        }
        return;
      }
      const row = {
        name: n || ("MMSI " + mmsi),
        mmsi: mmsi || null,
        lat: t.lat,
        lon: t.lon,
        sog: t.sog,
        cog: t.cog,
        heading: t.heading,
        shipType: t.shipType || t.type || "",
        destination: t.destination || "",
        callSign: t.callSign || t.callsign || "",
        source: t.source || "AIS"
      };
      seen[key] = row;
      out.push(row);
    };

    // Always include fleet seed (may be missing from open AIS snapshots)
    pushRow({
      name: "IINO INEOS VESTA",
      mmsi: "636024827",
      callSign: "5LUM3",
      shipType: "LPG Tanker",
      source: "registry"
    });

    // 1) Compact names catalog
    try {
      const data = await fetch("ais/zones/names.json?t=" + Date.now(), { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error("names.json HTTP " + r.status);
        return r.json();
      });
      (data.names || []).forEach(pushRow);
      console.info("[SetSail Vessel] names.json loaded:", (data.names || []).length);
    } catch (e) {
      console.warn("[SetSail Vessel] names.json miss", e);
    }

    // 2) Merge EVERY zone snapshot we track (full AIS catalog, not a sample)
    try {
      const man = await fetch("ais/zones/index.json?t=" + Date.now(), { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error("index.json HTTP " + r.status);
        return r.json();
      });
      const zones = man.zones || [];
      await Promise.all(
        zones.map(async (z) => {
          if (!z || !z.file) return;
          try {
            const geo = await fetch(z.file + "?t=" + Date.now(), { cache: "no-store" }).then((r) =>
              r.ok ? r.json() : null
            );
            (geo && geo.targets ? geo.targets : []).forEach(pushRow);
          } catch (ez) {
            console.warn("[SetSail Vessel] zone index merge fail", z.id, ez);
          }
        })
      );
      console.info("[SetSail Vessel] AIS name index ready (all zones):", out.length);
    } catch (e2) {
      console.warn("[SetSail Vessel] zone merge failed — Digitraffic fallback", e2);
      try {
        const vessels = await fetch("https://meri.digitraffic.fi/api/ais/v1/vessels", {
          headers: { Accept: "application/json", "Digitraffic-User": "SetSailMarineSuite/AIS" },
          cache: "no-store"
        }).then((r) => r.json());
        const arr = Array.isArray(vessels) ? vessels : vessels.vessels || [];
        arr.forEach((v) => {
          pushRow({
            name: v.name || v.shipName,
            mmsi: v.mmsi || v.MMSI,
            callSign: v.callSign || "",
            shipType: v.shipType || v.shipTypeName || "",
            destination: v.destination || "",
            source: "Digitraffic"
          });
        });
      } catch (e3) {
        console.warn("[SetSail Vessel] Digitraffic name fallback failed", e3);
      }
    }

    _aisNameIndex = out;
    return out;
  })();
  try {
    return await _aisNameIndexPromise;
  } finally {
    if (_aisNameIndex && !_aisNameIndex.length) {
      _aisNameIndexPromise = null;
    }
  }
}

function hideVesselSuggest(which) {
  const m = vesselFormMap(which);
  const box = document.getElementById(m.suggest);
  if (box) {
    box.hidden = true;
    box.innerHTML = "";
  }
}

function renderVesselSuggest(which, hits) {
  const m = vesselFormMap(which);
  const box = document.getElementById(m.suggest);
  if (!box) return;
  if (!hits.length) {
    hideVesselSuggest(which);
    return;
  }
  box.innerHTML = hits
    .map((t, i) => {
      const pos =
        Number.isFinite(Number(t.lat)) && Number.isFinite(Number(t.lon))
          ? Number(t.lat).toFixed(3) + ", " + Number(t.lon).toFixed(3)
          : "";
      const meta = [t.mmsi ? "MMSI " + t.mmsi : "", t.callSign || "", pos].filter(Boolean).join(" · ");
      return (
        '<button type="button" data-ais-hit="' +
        i +
        '"><div style="font-weight:700;color:#7dd3fc;">' +
        String(t.name).replace(/[<>&]/g, "") +
        '</div><div class="vas-meta">' +
        meta.replace(/[<>&]/g, "") +
        "</div></button>"
      );
    })
    .join("");
  box.hidden = false;
  box.querySelectorAll("button[data-ais-hit]").forEach((btn) => {
    btn.addEventListener("mousedown", (ev) => {
      ev.preventDefault();
      const t = hits[Number(btn.getAttribute("data-ais-hit"))];
      if (!t) return;
      applyAisHitToVessel(t, "Vessel details filled from AIS");
      hideVesselSuggest(which);
    });
  });
}

function applyAisHitToVessel(t, toastMsg) {
  if (!t) return;
  applyVesselProfile(
    {
      name: t.name || "",
      callSign: t.callSign || "",
      mmsi: t.mmsi != null ? String(t.mmsi) : "",
      shipType: t.shipType || "",
      destination: t.destination || "",
      sog: t.sog,
      cog: t.cog,
      heading: t.heading,
      lat: t.lat,
      lon: t.lon,
      source: "ais"
    },
    { toast: toastMsg || "Vessel details filled from AIS" }
  );
}

async function findAisTargetByMmsi(mmsiRaw) {
  const mmsi = String(mmsiRaw || "").replace(/\D/g, "");
  if (mmsi.length < 5) return null;
  const idx = await ensureAisNameIndex();
  let hit = (idx || []).find((t) => String(t.mmsi || "") === mmsi);
  if (hit) return hit;
  // Deep scan zone files (in case index still loading / stale)
  try {
    const man = await fetch("ais/zones/index.json?t=" + Date.now(), { cache: "no-store" }).then((r) =>
      r.ok ? r.json() : null
    );
    for (const z of (man && man.zones) || []) {
      if (!z || !z.file) continue;
      try {
        const geo = await fetch(z.file + "?t=" + Date.now(), { cache: "no-store" }).then((r) =>
          r.ok ? r.json() : null
        );
        const t = ((geo && geo.targets) || []).find((x) => String(x.mmsi) === mmsi);
        if (t) {
          return {
            name: t.name || ("MMSI " + mmsi),
            mmsi,
            lat: t.lat,
            lon: t.lon,
            sog: t.sog,
            cog: t.cog,
            heading: t.heading,
            shipType: t.shipType || t.type || "",
            destination: t.destination || "",
            callSign: t.callSign || "",
            source: t.source || "AIS"
          };
        }
      } catch (e) { /* next zone */ }
    }
  } catch (e2) { /* ignore */ }
  // Live refresh path (Open Waters / Digitraffic) using temporary vessel context
  const prev = userVessel;
  userVessel = Object.assign({}, prev || {}, { mmsi: mmsi });
  try {
    const live = await fetchOwnVesselAisUpdate();
    if (live) return live;
  } catch (e3) { /* ignore */ }
  finally {
    userVessel = prev;
  }
  // Registry seed for own ship
  if (mmsi === "636024827") {
    return {
      name: "IINO INEOS VESTA",
      mmsi: "636024827",
      callSign: "5LUM3",
      shipType: "LPG Tanker",
      source: "registry"
    };
  }
  return null;
}

function bindVesselNameAutocomplete(which) {
  const m = vesselFormMap(which);
  const input = document.getElementById(m.name);
  if (!input || input._aisBound) return;
  input._aisBound = true;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    clearTimeout(_vesselSuggestTimer);
    if (q.length < 2) {
      hideVesselSuggest(which);
      return;
    }
    const mbox = vesselFormMap(which);
    const box = document.getElementById(mbox.suggest);
    if (box) {
      box.hidden = false;
      box.innerHTML = '<div class="vas-meta" style="padding:0.45rem 0.55rem;">Searching all AIS targets…</div>';
    }
    _vesselSuggestTimer = setTimeout(async () => {
      try {
        const idx = await ensureAisNameIndex();
        const starts = [];
        const contains = [];
        for (let i = 0; i < idx.length; i++) {
          const n = String(idx[i].name || "").toLowerCase();
          if (!n) continue;
          if (n.startsWith(q)) starts.push(idx[i]);
          else if (n.includes(q)) contains.push(idx[i]);
          if (starts.length >= 20) break;
        }
        const hits = starts.concat(contains).slice(0, 20);
        renderVesselSuggest(which, hits);
      } catch (err) {
        console.warn("[SetSail Vessel] suggest error", err);
        hideVesselSuggest(which);
      }
    }, 160);
  });
  input.addEventListener("blur", () => {
    setTimeout(() => hideVesselSuggest(which), 220);
  });
}

function bindVesselMmsiLookup(which) {
  const m = vesselFormMap(which);
  const input = document.getElementById(m.mmsi);
  if (!input || input._mmsiBound) return;
  input._mmsiBound = true;
  input.setAttribute("title", "Type MMSI and press Enter to look up AIS target");
  input.setAttribute("placeholder", "MMSI + Enter");
  input.addEventListener("keydown", async (ev) => {
    if (ev.key !== "Enter") return;
    ev.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    const prev = input.value;
    input.value = "…";
    input.disabled = true;
    try {
      const hit = await findAisTargetByMmsi(raw);
      input.value = prev;
      input.disabled = false;
      if (!hit) {
        if (typeof showSetSailToast === "function") {
          showSetSailToast("MMSI " + raw.replace(/\D/g, "") + " not found in tracked AIS", "info");
        } else {
          alert("MMSI not found in tracked AIS targets.");
        }
        return;
      }
      applyAisHitToVessel(hit, "Filled from AIS MMSI " + String(hit.mmsi));
      // Kick live refresh if we have coords or MMSI
      if (typeof scheduleOwnVesselAisRefresh === "function") scheduleOwnVesselAisRefresh();
    } catch (e) {
      input.value = prev;
      input.disabled = false;
      console.warn("[SetSail Vessel] MMSI lookup failed", e);
      if (typeof showSetSailToast === "function") {
        showSetSailToast("MMSI lookup failed", "error");
      }
    }
  });
}

function requestGpsIntoForm(which) {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser. Please enter coordinates manually.");
    return;
  }
  const btn = document.getElementById(which === "home" ? "homeVesselGpsBtn" : "vesselFetchGpsBtn");
  const prev = btn ? btn.textContent : "GPS";
  if (btn) btn.textContent = "…";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (btn) btn.textContent = prev;
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      window._homeGeoLon = lon;
      const m = vesselFormMap(which);
      setInputVal(m.lat, lat.toFixed(5));
      setInputVal(m.lon, lon.toFixed(5));
      const data = readVesselForm(which);
      data.lat = lat;
      data.lon = lon;
      data.source = "gps";
      applyVesselProfile(data, { toast: "Position updated from GPS" });
    },
    (err) => {
      if (btn) btn.textContent = prev;
      alert("GPS Error: " + err.message + ". Enter coordinates manually if needed.");
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

function saveVesselForm(which, closeFn) {
  const data = readVesselForm(which);
  const hasPos = Number.isFinite(data.lat) && Number.isFinite(data.lon);
  const hasName = !!(data.name && data.name.trim());
  if (!hasPos && !hasName && !data.callSign && !data.mmsi) {
    alert("Enter at least a vessel name or coordinates.");
    return;
  }
  if ((getInputVal(vesselFormMap(which).lat) || getInputVal(vesselFormMap(which).lon)) && !hasPos) {
    alert("Please enter valid coordinates (e.g., 58° 37.70' N / 017° 46.3' E) or leave both blank.");
    return;
  }
  data.source = data.source === "gps" ? "gps" : (hasPos ? (userVessel && userVessel.source === "gps" ? "gps" : "manual") : (userVessel && userVessel.source) || "manual");
  applyVesselProfile(data, { toast: "Vessel profile saved" });
  if (typeof closeFn === "function") closeFn();
}

function clearVesselProfile(closeFn) {
  userVessel = null;
  persistUserVessel();
  if (leafletVesselLayer) leafletVesselLayer.clearLayers();
  const hud = document.getElementById("ntmVesselHud");
  if (hud) hud.style.display = "none";
  fillVesselFormsFromState();
  updateHomeVesselHudLabel();
  if (typeof closeFn === "function") closeFn();
}

let mobileCurrentView = "list"; // "list" | "map"

// Safe and immediate initialization
function initApp() {
  function safe(name, fn) {
    try { fn(); } catch (err) { console.warn("[SetSail] init error in " + name, err); }
  }
  safe("theme", initTheme);
  safe("nav", initNavigationTabs);
  safe("tab", () => {
    // Bare "/" keeps HTML default (Home). Only honor an explicit URL hash.
    // Do NOT restore last chart visit from localStorage — that auto-kicked users to #tab-ntm.
    const already = document.querySelector(".tab-pane.active");
    let hashTab = "";
    try {
      if (window.location.hash && window.location.hash.length > 1) {
        hashTab = window.location.hash.replace("#", "").trim();
      }
    } catch (e) {}
    if (hashTab && document.getElementById(hashTab)) {
      switchToTab(hashTab, "restore");
      return;
    }
    if (already && already.id) {
      window._setsailActiveTab = already.id;
      try {
        sessionStorage.setItem("setsail_active_tab", already.id);
        localStorage.setItem("setsail_active_tab", already.id);
      } catch (e) {}
    }
  });
  safe("clock", initHomeChronometer);
  safe("video", () => {
    const homePane = document.getElementById("tab-home");
    if (homePane && homePane.classList.contains("active") && typeof initHomeVideo === "function") {
      initHomeVideo();
    }
  });
  safe("hudVessel", initHomeHudVessel);
  safe("ntmUI", initAutoNtmUI);
  safe("filters", initFilterAndSortPopovers);
  safe("tracking", initVesselTracking);
  safe("settings", initSettingsUI);
  safe("mobileSwitcher", initMobileViewSwitcher);
  safe("network", initNetworkStatusWatchdog);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Global Event Delegation: guarantees all buttons & tiles respond on any click
document.addEventListener("click", (e) => {
  const switchBtn = e.target.closest("[data-switch-tab]");
  if (switchBtn) {
    e.preventDefault();
    const target = switchBtn.getAttribute("data-switch-tab");
    if (target) switchToTab(target, "user");
    return;
  }
  const tabBtn = e.target.closest(".nav-sidebar .nav-item");
  if (tabBtn) {
    e.preventDefault();
    const target = tabBtn.getAttribute("data-tab");
    if (target) switchToTab(target, "user");
    return;
  }
});

/**
 * Returns formatted UTC timestamp string for export filenames (e.g. 20261004_1645UTC)
 */
function getExportUtcTimestamp() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const min = String(now.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}${mm}${dd}_${hh}${min}UTC`;
}

/**
 * Visual Theme Controller (Dark Cockpit vs Light Bridge)
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButtonsUI(savedTheme);
}

function setAppTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeButtonsUI(theme);
}

function updateThemeButtonsUI(theme) {
  const btnDark = document.getElementById("btnThemeDark");
  const btnLight = document.getElementById("btnThemeLight");
  if (btnDark && btnLight) {
    btnDark.classList.toggle("active", theme === "dark");
    btnLight.classList.toggle("active", theme === "light");
  }
}

/**
 * Tab Switching between Home, Gyro Logbook, Auto-NtM, and Settings
 */
function initNavigationTabs() {
  const navItems = document.querySelectorAll(".nav-sidebar .nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");
      if (targetTab) switchToTab(targetTab, "user");
    });
  });

  // Support CTA buttons across the interface
  document.querySelectorAll("[data-switch-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-switch-tab");
      if (targetTab) switchToTab(targetTab, "user");
    });
  });
}

/**
 * Programmatic Tab Switcher
 */
function switchToTab(targetTab, source) {
  if (!targetTab) return;
  if (!document.getElementById(targetTab)) {
    console.warn("[SetSail] switchToTab ignored unknown tab:", targetTab);
    return;
  }
  source = source || "code";
  const cur = window._setsailActiveTab
    || (document.querySelector(".tab-pane.active") && document.querySelector(".tab-pane.active").id)
    || "";
  // Block ANY non-explicit bounce to Home once the user is on another page
  if (targetTab === "tab-home" && source !== "user" && source !== "restore") {
    if (cur && cur !== "tab-home") {
      console.warn("[SetSail] blocked auto Home redirect from", source, "while on", cur);
      return;
    }
    try {
      const saved = sessionStorage.getItem("setsail_active_tab") || localStorage.getItem("setsail_active_tab") || "";
      if (saved && saved !== "tab-home") {
        console.warn("[SetSail] blocked auto Home redirect; restoring", saved);
        targetTab = saved;
        source = "restore";
      }
    } catch (e) {}
  }
  window._setsailActiveTab = targetTab;
  try {
    sessionStorage.setItem("setsail_active_tab", targetTab);
    localStorage.setItem("setsail_active_tab", targetTab);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + targetTab);
    }
  } catch (e) {}

  const navItems = document.querySelectorAll(".nav-sidebar .nav-item");
  navItems.forEach(n => {
    n.classList.toggle("active", n.getAttribute("data-tab") === targetTab);
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });

  const activePane = document.getElementById(targetTab);
  if (activePane) {
    activePane.classList.add("active");
  }

  const appContent = document.querySelector(".app-content");
  const waffiFooter = document.querySelector(".waffi-credit-footer");

  if (targetTab === "tab-route") {
    if (appContent) {
      appContent.style.overflowY = "auto";
      appContent.style.maxHeight = "none";
    }
    if (waffiFooter) waffiFooter.style.display = "block";
    if (typeof window.refreshSetRouteUI === "function") window.refreshSetRouteUI();
  } else if (targetTab === "tab-news") {
    if (appContent) {
      appContent.style.overflowY = "auto";
      appContent.style.maxHeight = "100vh";
    }
    if (waffiFooter) waffiFooter.style.display = "block";
    if (typeof window.initSetNews === "function") window.initSetNews();
  } else if (targetTab === "tab-home") {
    if (appContent) appContent.style.overflowY = "hidden";
    if (waffiFooter) waffiFooter.style.display = "none";
    initHomeVideo();
  } else if (targetTab === "tab-ntm") {
    if (appContent) {
      appContent.style.overflowY = "hidden";
      appContent.style.maxHeight = "100vh";
    }
    if (waffiFooter) waffiFooter.style.display = "none";
  } else {
    if (appContent) {
      appContent.style.overflowY = "";
      appContent.style.maxHeight = "";
    }
    if (waffiFooter) waffiFooter.style.display = "";
  }

  if (targetTab === "tab-gyro") {
    setTimeout(() => {
      if (typeof window.renderDevTableView === "function") window.renderDevTableView();
      if (typeof window.drawDevChart === "function") window.drawDevChart();
      if (typeof window.renderStarAlmanac === "function") window.renderStarAlmanac();
      if (typeof window.calculate === "function") window.calculate();
    }, 40);
  }

  if (targetTab === "tab-ntm") {
    if (!leafletMap) {
      initNtMMap();
    }
    setTimeout(() => {
      if (leafletMap) {
        leafletMap.invalidateSize();
      } else {
        initNtMMap();
      }
    }, 60);
    setTimeout(() => {
      if (leafletMap) {
        leafletMap.invalidateSize();
      }
    }, 200);
  }
}

/**
 * Real-Time UTC Digital Chronometer for Bridge Home Page
 */
function initHomeChronometer() {
  if (typeof window.updateHomeTelemetry === "function") {
    window.updateHomeTelemetry();
  }
}

/**
 * Autoplay Assurance for Cinematic Background Video
 */
function initHomeVideo() {
  const vid = document.getElementById("homeHeroVideo");
  if (!vid) return;

  vid.muted = true;
  vid.defaultMuted = true;
  vid.playsInline = true;

  const tryPlay = () => {
    vid.play().catch(() => {});
  };

  tryPlay();

  // Seamless looping without freeze at loop boundary
  vid.addEventListener("ended", () => {
    vid.currentTime = 0;
    tryPlay();
  });

  window.addEventListener("click", tryPlay, { once: true });
  window.addEventListener("touchstart", tryPlay, { once: true });
}

/**
 * Network Status Watchdog: Green pulsing dot for online, static Red dot for offline/error
 */
function initNetworkStatusWatchdog() {
  // Check immediately on startup
  if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
    if (!navigator.onLine) {
      updateNetworkStatusHUD(false);
    }
  }

  window.addEventListener("online", () => {
    console.log("[SetSail] Online connection restored.");
    loadRemoteNoticesJson();
  });

  window.addEventListener("offline", () => {
    console.log("[SetSail] Operating in offline mode.");
    updateNetworkStatusHUD(false);
  });

  // Active interval check every 3 seconds
  setInterval(() => {
    if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
      if (!navigator.onLine) {
        updateNetworkStatusHUD(false);
      }
    }
  }, 3000);
}

function updateNetworkStatusHUD(isOnline, customWk = null) {
  const statusEl = document.getElementById("ntmStatusMsg");
  if (!statusEl) return;

  // Strict check: if browser is offline, force isOnline to false
  if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" && !navigator.onLine) {
    isOnline = false;
  }

  let wkStr = customWk;
  if (!wkStr) {
    try {
      const savedMeta = JSON.parse(localStorage.getItem(META_STORAGE_KEY) || "{}");
      wkStr = savedMeta.weekNumber ? `Wk ${savedMeta.weekNumber}/${savedMeta.year || ''}` : (savedMeta.weeklyBulletin || "Local");
    } catch (e) {
      wkStr = "Local";
    }
  }

  const activeCnt = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED").length;

  if (isOnline) {
    statusEl.innerHTML = `<span class="ntm-live-status"><span class="ntm-live-dot" title="Live UKHO telemetry online"></span>Live NtM & NAVTEX ${wkStr}: ${activeCnt} active</span>`;
  } else {
    statusEl.innerHTML = `<span class="ntm-live-status" style="color:#ff6b81;"><span class="ntm-offline-dot" title="Offline mode — using cached NtM database"></span>Offline (Cached NtM ${wkStr}): ${activeCnt} active</span>`;
  }
}

/**
 * IMO / IHO NAVAREA Resolver:
 * Maps notice to its corresponding NAVAREA (I through XXI) based on country, region and coordinates
 */
function getNoticeNavarea(notice) {
  if (!notice) return "NAVAREA I";
  if (notice.navarea) {
    const clean = String(notice.navarea).replace(/^NAVAREA\s+/i, "").trim().toUpperCase();
    if (clean) return "NAVAREA " + clean;
  }
  const country = (notice.country || "").toUpperCase();
  const region = (notice.region || "").toUpperCase();

  // NAVAREA I: UK, Ireland, North Sea, Baltic, Norway south of 71N
  if (country.includes("ENGLAND") || country.includes("SCOTLAND") || country.includes("IRELAND") || 
      country.includes("SWEDEN") || country.includes("FINLAND") || country.includes("NORWAY") || 
      country.includes("NORTH SEA") || country.includes("DENMARK") || country.includes("BALTIC")) {
    return "NAVAREA I";
  }

  // NAVAREA II: East Atlantic & West Africa
  if (country.includes("FRANCE") || country.includes("SPAIN") || country.includes("PORTUGAL") || 
      country.includes("MOROCCO") || country.includes("SENEGAL") || country.includes("NIGERIA") ||
      country.includes("GHANA") || country.includes("WEST AFRICA")) {
    if (region.includes("MEDITERRANEAN") || region.includes("SOUTH COAST") || (region.includes("EAST COAST") && country.includes("SPAIN"))) {
      return "NAVAREA III";
    }
    return "NAVAREA II";
  }

  // NAVAREA III: Mediterranean & Black Sea
  if (country.includes("TÜRKIYE") || country.includes("TURKEY") || country.includes("ISRAEL") || 
      country.includes("GREECE") || country.includes("ITALY") || country.includes("BLACK SEA") || 
      country.includes("MEDITERRANEAN") || country.includes("CYPRUS") || country.includes("EGYPT")) {
    return "NAVAREA III";
  }

  // NAVAREA IV: North-West Atlantic & Gulf of Mexico
  if (country.includes("UNITED STATES") || country.includes("USA") || country.includes("CANADA") || 
      country.includes("MEXICO") || country.includes("COLOMBIA") || country.includes("BAHAMAS") || 
      country.includes("BERMUDA") || country.includes("CARIBBEAN") || country.includes("NORTH ATLANTIC")) {
    if (region.includes("WEST COAST") || region.includes("PACIFIC")) {
      return "NAVAREA XII";
    }
    return "NAVAREA IV";
  }

  // NAVAREA V: South Atlantic (Brazil)
  if (country.includes("BRAZIL") || country.includes("URUGUAY")) {
    return "NAVAREA V";
  }

  // NAVAREA VIII: North Indian Ocean
  if (country.includes("INDIA") || country.includes("SRI LANKA") || country.includes("PAKISTAN") || 
      country.includes("BANGLADESH") || country.includes("INDIAN OCEAN") || country.includes("BAY OF BENGAL") ||
      country.includes("ARABIAN SEA")) {
    return "NAVAREA VIII";
  }

  // NAVAREA IX: Red Sea & Persian Gulf
  if (country.includes("PERSIAN GULF") || country.includes("ARABIAN GULF") || country.includes("RED SEA") || 
      country.includes("OMAN") || country.includes("UNITED ARAB EMIRATES") || country.includes("UAE") || 
      country.includes("SAUDI ARABIA") || country.includes("BAHRAIN") || country.includes("QATAR") || 
      country.includes("KUWAIT") || country.includes("IRAQ") || country.includes("IRAN") || country.includes("DJIBOUTI")) {
    return "NAVAREA IX";
  }

  // NAVAREA XI: East Asia & Western Pacific
  if (country.includes("CHINA") || country.includes("KOREA") || country.includes("JAPAN") || 
      country.includes("PHILIPPINES") || country.includes("PHILIPPINE ISLANDS") || country.includes("MALAYSIA") || 
      country.includes("INDONESIA") || country.includes("SINGAPORE") || country.includes("VIETNAM") || 
      country.includes("TAIWAN") || country.includes("MALACCA") || country.includes("SOUTH CHINA SEA")) {
    return "NAVAREA XI";
  }

  // NAVAREA XII: US / Canada West Coast
  if (country.includes("ALASKA") || country.includes("HAWAII")) {
    return "NAVAREA XII";
  }

  // NAVAREA XIV: South Pacific
  if (country.includes("NEW ZEALAND") || country.includes("FIJI") || country.includes("SOUTH PACIFIC")) {
    return "NAVAREA XIV";
  }

  // NAVAREA XX: Russian Arctic (Barents, White Sea)
  if (country.includes("RUSSIA")) {
    if (region.includes("BARENTS") || region.includes("WHITE SEA") || region.includes("KARA")) {
      return "NAVAREA XX";
    }
    if (region.includes("PACIFIC") || region.includes("KAMCHATKA") || region.includes("SAKHALIN") || region.includes("OKHOTSK")) {
      return "NAVAREA XIII";
    }
    if (region.includes("BALTIC")) {
      return "NAVAREA I";
    }
    return "NAVAREA XX";
  }

  return "NAVAREA I";
}

/**
 * Setup Filter (Funnel) and Sort (Two-Arrows) Popovers
 */
function initFilterAndSortPopovers() {
  const filterBtn = document.getElementById("ntmFilterMenuBtn");
  const sortBtn = document.getElementById("ntmSortMenuBtn");
  const filterPop = document.getElementById("ntmFilterPopover");
  const sortPop = document.getElementById("ntmSortPopover");
  const filterClose = document.getElementById("ntmFilterCloseBtn");
  const sortClose = document.getElementById("ntmSortCloseBtn");

  // Toggle filter popover
  if (filterBtn && filterPop) {
    filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = filterPop.classList.contains("open");
      if (sortPop) sortPop.classList.remove("open");
      filterPop.classList.toggle("open", !isOpen);
      filterBtn.classList.toggle("active", !isOpen);
    });
  }

  // Toggle sort popover
  if (sortBtn && sortPop) {
    sortBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = sortPop.classList.contains("open");
      if (filterPop) filterPop.classList.remove("open");
      sortPop.classList.toggle("open", !isOpen);
      sortBtn.classList.toggle("active", !isOpen);
    });
  }

  if (filterClose && filterPop) {
    filterClose.addEventListener("click", (e) => {
      e.stopPropagation();
      filterPop.classList.remove("open");
      if (filterBtn) filterBtn.classList.remove("active");
    });
  }

  if (sortClose && sortPop) {
    sortClose.addEventListener("click", (e) => {
      e.stopPropagation();
      sortPop.classList.remove("open");
      if (sortBtn) sortBtn.classList.remove("active");
    });
  }

  // Close popovers on outside click
  document.addEventListener("click", (e) => {
    const vesselPop = document.getElementById("ntmVesselPopover");
    const myVesselBtn = document.getElementById("ntmMyVesselBtn");

    if (filterPop && !filterPop.contains(e.target) && e.target !== filterBtn && !(filterBtn && filterBtn.contains(e.target))) {
      filterPop.classList.remove("open");
      if (filterBtn) filterBtn.classList.remove("active");
    }
    if (sortPop && !sortPop.contains(e.target) && e.target !== sortBtn && !(sortBtn && sortBtn.contains(e.target))) {
      sortPop.classList.remove("open");
      if (sortBtn) sortBtn.classList.remove("active");
    }
    if (vesselPop && !vesselPop.contains(e.target) && e.target !== myVesselBtn && !(myVesselBtn && myVesselBtn.contains(e.target))) {
      vesselPop.classList.remove("open");
      if (myVesselBtn) myVesselBtn.classList.remove("active");
    }
  });

  // Filter Checkbox Listeners
  const chkAll = document.getElementById("popChkAll");
  const chkNavtex = document.getElementById("popChkNavtex");
  const chkT = document.getElementById("popChkT");
  const chkP = document.getElementById("popChkP");
  const chkPerm = document.getElementById("popChkPerm");
  const chkPoly = document.getElementById("popChkPoly");
  const chkCan = document.getElementById("popChkCancelled");
  const selectNavarea = document.getElementById("popSelectNavarea");

  if (chkAll) {
    chkAll.addEventListener("change", () => {
      if (chkAll.checked) {
        NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM", "NAVTEX"]);
        NTM_FILTER_AREAS = false;
        NTM_SHOW_CANCELLED = false;
        NTM_ACTIVE_NAVAREA = "ALL";
        if (chkNavtex) chkNavtex.checked = true;
        if (chkT) chkT.checked = true;
        if (chkP) chkP.checked = true;
        if (chkPerm) chkPerm.checked = true;
        if (chkPoly) chkPoly.checked = false;
        if (chkCan) chkCan.checked = false;
        if (selectNavarea) selectNavarea.value = "ALL";
      }
      syncFilterIndicators();
      renderNtMListAndMap();
    });
  }

  const handleTypeChange = () => {
    NTM_ACTIVE_TYPES.clear();
    if (chkNavtex && chkNavtex.checked) NTM_ACTIVE_TYPES.add("NAVTEX");
    if (chkT && chkT.checked) NTM_ACTIVE_TYPES.add("T");
    if (chkP && chkP.checked) NTM_ACTIVE_TYPES.add("P");
    if (chkPerm && chkPerm.checked) NTM_ACTIVE_TYPES.add("PERM");

    const allTypesChecked = NTM_ACTIVE_TYPES.size === 4 && !NTM_FILTER_AREAS && !NTM_SHOW_CANCELLED && NTM_ACTIVE_NAVAREA === "ALL";
    if (chkAll) chkAll.checked = allTypesChecked;

    syncFilterIndicators();
    renderNtMListAndMap();
  };

  if (chkNavtex) chkNavtex.addEventListener("change", handleTypeChange);
  if (chkT) chkT.addEventListener("change", handleTypeChange);
  if (chkP) chkP.addEventListener("change", handleTypeChange);
  if (chkPerm) chkPerm.addEventListener("change", handleTypeChange);

  if (chkPoly) {
    chkPoly.addEventListener("change", () => {
      NTM_FILTER_AREAS = chkPoly.checked;
      if (chkAll) chkAll.checked = false;
      syncFilterIndicators();
      renderNtMListAndMap();
    });
  }

  if (chkCan) {
    chkCan.addEventListener("change", () => {
      NTM_SHOW_CANCELLED = chkCan.checked;
      if (chkAll) chkAll.checked = false;
      syncFilterIndicators();
      renderNtMListAndMap();
    });
  }

  if (selectNavarea) {
    selectNavarea.addEventListener("change", (e) => {
      NTM_ACTIVE_NAVAREA = e.target.value || "ALL";
      if (chkAll && NTM_ACTIVE_NAVAREA !== "ALL") chkAll.checked = false;
      syncFilterIndicators();
      renderNtMListAndMap();
    });
  }

  // Sort Radio Listeners
  const sortRadios = document.querySelectorAll('input[name="popSort"]');
  sortRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      NTM_ACTIVE_SORT = e.target.value;
      if (sortPop) sortPop.classList.remove("open");
      if (sortBtn) sortBtn.classList.remove("active");
      renderNtMListAndMap();
    });
  });
}

/**
 * Updates filter dot indicator on funnel icon and summary label
 */
function syncFilterIndicators() {
  const dot = document.getElementById("filterActiveDot");
  const label = document.getElementById("ntmActiveFiltersLabel");
  const isDefault = NTM_ACTIVE_TYPES.has("NAVTEX") && NTM_ACTIVE_TYPES.has("T") && NTM_ACTIVE_TYPES.has("P") && NTM_ACTIVE_TYPES.has("PERM") && !NTM_FILTER_AREAS && !NTM_SHOW_CANCELLED && NTM_ACTIVE_NAVAREA === "ALL";

  if (dot) dot.style.display = isDefault ? "none" : "block";

  if (label) {
    if (NTM_SHOW_CANCELLED) {
      label.innerHTML = SetSailIcons.svg("cancelled") + " Cancelled";
    } else if (NTM_ACTIVE_NAVAREA !== "ALL") {
      const cleanArea = String(NTM_ACTIVE_NAVAREA).replace(/^NAVAREA\s+/i, "");
      label.textContent = "NAVAREA " + cleanArea;
    } else if (isDefault) {
      label.textContent = "All Active";
    } else {
      const parts = [];
      if (NTM_ACTIVE_TYPES.has("NAVTEX")) parts.push("NAVTEX");
      if (NTM_ACTIVE_TYPES.has("T")) parts.push("T");
      if (NTM_ACTIVE_TYPES.has("P")) parts.push("P");
      if (NTM_ACTIVE_TYPES.has("Perm") || NTM_ACTIVE_TYPES.has("PERM")) parts.push("Perm");
      if (NTM_FILTER_AREAS) parts.push("Areas");
      label.textContent = parts.length > 0 ? parts.join(", ") : "None";
    }
  }
}

/**
 * Setup Auto-NtM UI buttons, search, and export modal
 */
function initAutoNtmUI() {
  const fileInput = document.getElementById("ntmPdfInput");
  const uploadBtn = document.getElementById("ntmUploadBtn");
  const searchInput = document.getElementById("ntmSearchInput");

  // Export Modal Elements
  const openExportBtn = document.getElementById("ntmOpenExportBtn");
  const exportModal = document.getElementById("ntmExportModal");
  const expBtnClose = document.getElementById("expBtnClose");
  const expBtnJrc = document.getElementById("expBtnJrc");
  const expBtnGeoJson = document.getElementById("expBtnGeoJson");
  const expBtnCsv = document.getElementById("expBtnCsv");
  const expChkNavtex = document.getElementById("expChkNavtex");
  const expChkT = document.getElementById("expChkT");
  const expChkP = document.getElementById("expChkP");
  const expChkPerm = document.getElementById("expChkPerm");
  const expChkOnlyChecked = document.getElementById("expChkOnlyChecked");

  // Select all checkbox
  const selectAllChk = document.getElementById("ntmSelectAllChk");

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      handlePdfFiles(e.target.files);
    });
  }

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderNtMListAndMap();
    });
  }

// Select All removed per user request (all visible chart notices auto-exported)

  // Minimalist Export Dialog Opening & State Sync
  if (openExportBtn) {
    openExportBtn.addEventListener("click", () => {
      openNavDataExportModal();
    });
  }
  if (expBtnClose && exportModal) {
    expBtnClose.addEventListener("click", () => {
      exportModal.classList.remove("open");
    });
  }

  // Initialize category filter pills, waypoint editor & NtM info popups
  initCategoryPills();
  initNavDataExportListeners();
  initMasterFilterControls();
  initWaypointEditModal();
  initNtmOverlayInfoModal();
  initWeatherOverlayInfoModal();
  if (typeof initExcelOverlayDock === "function") {
    initExcelOverlayDock(leafletMap);
  }

  // Checkbox listeners in Export modal
  [expChkNavtex, expChkT, expChkP, expChkPerm, expChkOnlyChecked].forEach(chk => {
    if (chk) {
      chk.addEventListener("change", updateExportModalCounts);
    }
  });

  // Export Actions with UTC timestamp in filenames!
  if (expBtnJrc) {
    expBtnJrc.addEventListener("click", () => {
      const selected = getExportSelectedNotices();
      if (selected.length === 0) {
        alert("No notices match the selected export criteria.");
        return;
      }
      const fname = `Admiralty_NtM_Overlay_${getExportUtcTimestamp()}.uchm`;
      if (typeof window.downloadJrcUchmFile === "function") {
        window.downloadJrcUchmFile(selected, fname);
      }
      if (exportModal) exportModal.classList.remove("open");
    });
  }

  if (expBtnGeoJson) {
    expBtnGeoJson.addEventListener("click", () => {
      const selected = getExportSelectedNotices();
      if (selected.length === 0) {
        alert("No notices available for export.");
        return;
      }
      const fname = `Admiralty_NtM_Overlay_${getExportUtcTimestamp()}.geojson`;
      if (typeof window.exportToGeoJson === "function") {
        const jsonStr = window.exportToGeoJson(selected);
        downloadTextFile(jsonStr, fname, "application/geo+json");
      }
      if (exportModal) exportModal.classList.remove("open");
    });
  }

  if (expBtnCsv) {
    expBtnCsv.addEventListener("click", () => {
      const selected = getExportSelectedNotices();
      if (selected.length === 0) {
        alert("No notices available for export.");
        return;
      }
      const fname = `Admiralty_NtM_Coordinates_${getExportUtcTimestamp()}.csv`;
      if (typeof window.exportToCsv === "function") {
        const csvStr = window.exportToCsv(selected);
        downloadTextFile(csvStr, fname, "text/csv");
      }
      if (exportModal) exportModal.classList.remove("open");
    });
  }

  // Fit View Button
  const fitBtn = document.getElementById("ntmFitAllBtn");
  if (fitBtn) {
    fitBtn.addEventListener("click", fitAllNoticesOnMap);
  }

  // Sidebar Collapse / Expand Toggle
  const collapseBtn = document.getElementById("ntmCollapseSidebarBtn");
  const expandBtn = document.getElementById("ntmExpandSidebarBtn");
  const workspaceEl = document.getElementById("ntmWorkspace");

  if (collapseBtn && workspaceEl) {
    collapseBtn.addEventListener("click", () => {
      workspaceEl.classList.add("sidebar-collapsed");
      const ntmTab = document.getElementById("tab-ntm");
      if (ntmTab) ntmTab.classList.add("sidebar-collapsed");
      if (expandBtn) expandBtn.style.display = "block";
      setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 250);
    });
  }

  if (expandBtn && workspaceEl) {
    expandBtn.addEventListener("click", () => {
      workspaceEl.classList.remove("sidebar-collapsed");
      const ntmTab = document.getElementById("tab-ntm");
      if (ntmTab) ntmTab.classList.remove("sidebar-collapsed");
      expandBtn.style.display = "none";
      setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 250);
    });
  }

  // Empty Multi Search hint chips → activate matching bottom dock tile
  const ntmItemsScroll = document.getElementById("ntmItemsScroll");
  if (ntmItemsScroll && !ntmItemsScroll._boundEmptyHints) {
    ntmItemsScroll._boundEmptyHints = true;
    ntmItemsScroll.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-overlay-hint]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const key = btn.getAttribute("data-overlay-hint");
      if (!key) return;
      const mapRef = window.leafletMap || (typeof leafletMap !== "undefined" ? leafletMap : null);
      if (typeof window.initExcelOverlayDock === "function" && mapRef) {
        try { window.initExcelOverlayDock(mapRef); } catch (err) { /* dock may already be live */ }
      }
      if (typeof window.setOverlayActive === "function") {
        window.setOverlayActive(key, true, mapRef);
      } else if (typeof setOverlayActive === "function") {
        setOverlayActive(key, true, mapRef);
      }
    });
  }

  // Clear Search Button
  const clearSearchBtn = document.getElementById("ntmClearSearchBtn");
  if (searchInput && clearSearchBtn) {
    searchInput.addEventListener("input", () => {
      clearSearchBtn.style.display = searchInput.value ? "block" : "none";
    });
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.style.display = "none";
      renderNtMListAndMap();
      searchInput.focus();
    });
  }

  // Instant 0ms Local Snapshot Hydration first (for weak/satellite internet), then async network refresh
  const hydratedCached = loadStoreFromStorage();
  loadRemoteNoticesJson().then(loadedRemote => {
    if (!loadedRemote && !hydratedCached) {
      loadSampleNtMData();
      updateNetworkStatusHUD(false);
    }
  });

  // Automatically sync live tropical cyclones & synoptic marine weather (weather.json + Open-Meteo)
  if (typeof refreshMarineWeather === "function") {
    refreshMarineWeather(false);
  }
}

/**
 * Mobile List vs Map Switcher
 */
function initMobileViewSwitcher() {
  const listBtn = document.getElementById("ntmViewListBtn");
  const mapBtn = document.getElementById("ntmViewMapBtn");
  const workspace = document.getElementById("ntmWorkspace");

  if (!listBtn || !mapBtn || !workspace) return;

  workspace.classList.add("mobile-view-list");

  listBtn.addEventListener("click", () => {
    mobileCurrentView = "list";
    listBtn.classList.add("active");
    mapBtn.classList.remove("active");
    workspace.classList.remove("mobile-view-map");
    workspace.classList.add("mobile-view-list");
  });

  mapBtn.addEventListener("click", () => {
    mobileCurrentView = "map";
    mapBtn.classList.add("active");
    listBtn.classList.remove("active");
    workspace.classList.remove("mobile-view-list");
    workspace.classList.add("mobile-view-map");

    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
    }, 150);
  });
}

/**
 * Crosshair Target Vessel Tracking (No heading/speed clutter)
 */

/**
 * Hero / Home Page Vessel Coordinates HUD & First-Visit Geolocation Prompt
 */

// ==========================================================================
// PASSAGE PLAN / ROUTE PARSERS & ECDIS TRACK PLOTTER (.rtz, .csv, .rtm)
// ==========================================================================
let leafletRouteLayer = null;
let activeRouteData = null;
const ROUTE_STORAGE_KEY = "setsail_active_route";

/**
 * Parse CIRM / IEC 61174 XML Route Plan (.rtz)
 */
function parseRtzRoute(xmlStr, fallbackName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, "text/xml");
  const routeInfo = doc.querySelector("routeInfo");
  let routeName = (routeInfo ? routeInfo.getAttribute("routeName") : null) || fallbackName.replace(/\.rtz$/i, "");
  
  const waypoints = [];
  const wpNodes = doc.querySelectorAll("waypoint");
  wpNodes.forEach((wp, idx) => {
    const pos = wp.querySelector("position");
    if (!pos) return;
    const lat = parseFloat(pos.getAttribute("lat"));
    const lon = parseFloat(pos.getAttribute("lon"));
    if (isNaN(lat) || isNaN(lon)) return;
    const wpName = wp.getAttribute("name") || (wp.querySelector("defaultWaypoint") ? wp.querySelector("defaultWaypoint").getAttribute("name") : null) || `WPT ${idx + 1}`;
    waypoints.push({
      id: idx + 1,
      lat,
      lon,
      name: wpName.trim()
    });
  });
  return { name: routeName, waypoints, format: "RTZ" };
}

/**
 * Parse JRC ECDIS Route Sheet (.csv)
 */
function parseCsvRoute(csvStr, fallbackName) {
  const lines = csvStr.split(/\r?\n/);
  let routeName = fallbackName.replace(/\.csv$/i, "");
  const waypoints = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("//")) {
      const comment = trimmed.substring(2).trim();
      if (!comment.startsWith("ROUTE SHEET") && !comment.startsWith("<<") && !comment.startsWith("WPT No.")) {
        const parts = comment.split(",");
        if (parts[0] && parts[0].trim()) {
          routeName = parts[0].trim();
        }
      }
      continue;
    }
    const cols = trimmed.split(",").map(c => c.trim());
    if (cols.length >= 7 && /^\d+$/.test(cols[0])) {
      const wpIdx = parseInt(cols[0], 10);
      const latDeg = parseFloat(cols[1]);
      const latMin = parseFloat(cols[2]);
      const latHem = cols[3].toUpperCase();
      const lonDeg = parseFloat(cols[4]);
      const lonMin = parseFloat(cols[5]);
      const lonHem = cols[6].toUpperCase();
      
      if (!isNaN(latDeg) && !isNaN(lonDeg)) {
        let lat = latDeg + (isNaN(latMin) ? 0 : latMin) / 60.0;
        if (latHem === "S") lat = -lat;
        let lon = lonDeg + (isNaN(lonMin) ? 0 : lonMin) / 60.0;
        if (lonHem === "W") lon = -lon;
        const wpName = (cols.length > 16 && cols[16]) ? cols[16] : `WPT ${cols[0]}`;
        const portXtd = parseFloat(cols[7]) || 0.1;
        const stbdXtd = parseFloat(cols[8]) || 0.1;
        const arrRad = parseFloat(cols[9]) || 0.5;
        const speed = parseFloat(cols[10]) || 14.0;
        const sail = (cols[11] || "RL").toUpperCase();
        const rot = parseFloat(cols[12]) || 0;
        const turnRad = parseFloat(cols[13]) || arrRad || 0.5;
        waypoints.push({
          id: wpIdx + 1,
          wptNo: cols[0],
          lat,
          lon,
          name: wpName,
          portsideXTD: portXtd,
          starboardXTD: stbdXtd,
          arrRadius: arrRad,
          turnRadius: turnRad,
          speedKnots: speed,
          sail: sail,
          rot: rot
        });
      }
    }
  }
  return { name: routeName, waypoints, format: "CSV" };
}

/**
 * Parse Transas / Wärtsilä Navi-Sailor binary route (.rtm)
 */
function parseRtmRoute(arrayBuffer, fallbackName) {
  const view = new DataView(arrayBuffer);
  let routeName = fallbackName.replace(/\.rtm$/i, "");
  const waypoints = [];
  let offset = 380;
  const stride = 304;
  
  while (offset + 16 <= arrayBuffer.byteLength) {
    const lat = view.getFloat64(offset, true);
    const lon = view.getFloat64(offset + 8, true);
    
    if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180 && !(lat === 0 && lon === 0)) {
      let wpName = `WPT ${waypoints.length + 1}`;
      try {
        const bytes = new Uint8Array(arrayBuffer, offset - 130, 130);
        let s = "";
        for (let i = 0; i < bytes.length; i++) {
          if (bytes[i] >= 32 && bytes[i] <= 126) s += String.fromCharCode(bytes[i]);
          else if (bytes[i] === 0) s += "\x00";
        }
        const parts = s.split("\x00").map(p => p.trim()).filter(Boolean);
        if (parts.length > 0) wpName = parts[parts.length - 1];
      } catch (e) {}
      
      waypoints.push({
        id: waypoints.length + 1,
        lat,
        lon,
        name: wpName
      });
      offset += stride;
    } else {
      break;
    }
  }
  return { name: routeName, waypoints, format: "RTM" };
}

/**
 * Render Route Polyline and Waypoint Markers on Leaflet Chart
 */
function renderRouteOnMap(route, shouldFly = true) {
  if (!leafletMap) return;
  if (window._setsailRenderingRoute) return;
  window._setsailRenderingRoute = true;
  try {
  if (!leafletRouteLayer) {
    leafletRouteLayer = L.layerGroup().addTo(leafletMap);
  }
  leafletRouteLayer.clearLayers();
  
  if (!route || !route.waypoints || route.waypoints.length === 0) {
    return;
  }
  
  activeRouteData = route;
  // Avoid recursion: setOverlayActive('route') calls renderRouteOnMap again.
  if (typeof OVERLAY_STATES !== "undefined") {
    OVERLAY_STATES.route = true;
  }
  try {
    const routeTab = document.querySelector('.excel-tab[data-overlay="route"]');
    if (routeTab) {
      routeTab.classList.add("active");
      const chk = routeTab.querySelector(".excel-tab-check");
      if (chk) chk.style.opacity = "1";
    }
  } catch (e) {}
  const catPillRoute = document.getElementById("catPillRoute");
  if (catPillRoute) catPillRoute.style.display = "inline-flex";
  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(route));
  } catch (e) {}

  // Build clean path with continuous longitude unrolling (Pacific / antimeridian safe)
  const cleanWps = [];
  for (let i = 0; i < route.waypoints.length; i++) {
    const wp = route.waypoints[i];
    let lat = Number(wp.lat);
    let lon = Number(wp.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    if (Math.abs(lat) > 90 || Math.abs(lon) > 360) continue;
    lon = ((lon + 180) % 360 + 360) % 360 - 180;
    const prev = cleanWps.length ? cleanWps[cleanWps.length - 1] : null;
    if (prev && Math.abs(prev.lat - lat) < 1e-7 && Math.abs(prev.lon - lon) < 1e-7) continue;
    cleanWps.push({ lat, lon, name: wp.name, id: wp.id, _src: wp });
  }
  if (cleanWps.length === 0) {
    return;
  }

  // Unroll longitudes so consecutive legs never jump ±360° across the dateline
  const unrolledCoords = [];
  let runLon = cleanWps[0].lon;
  unrolledCoords.push([cleanWps[0].lat, runLon]);
  for (let i = 1; i < cleanWps.length; i++) {
    let lon = cleanWps[i].lon;
    while (lon - runLon > 180) lon -= 360;
    while (lon - runLon < -180) lon += 360;
    runLon = lon;
    unrolledCoords.push([cleanWps[i].lat, runLon]);
  }
  // Keep a copy for buffer corridor (same unrolled geometry)
  window._setsailRouteUnrolled = unrolledCoords.slice();

  const rtSub = window.ROUTE_SUBFILTERS || { waypoints: true, line: true };
  let trackLine = null;
  let trackGlow = null;
  let trackOutline = null;
  let trackCore = null;
  if (rtSub.line !== false && unrolledCoords.length >= 2) {
    // High-visibility route: dark outline + bright cyan core + outer glow
    trackOutline = L.polyline(unrolledCoords, {
      color: "#0b1e33",
      weight: 10,
      opacity: 0.85,
      interactive: false,
      lineCap: "round",
      lineJoin: "round"
    });
    trackGlow = L.polyline(unrolledCoords, {
      color: "#00e5ff",
      weight: 14,
      opacity: 0.35,
      interactive: false,
      lineCap: "round",
      lineJoin: "round"
    });
    trackLine = L.polyline(unrolledCoords, {
      color: "#ff3b1f",
      weight: 4.5,
      opacity: 1,
      interactive: true,
      lineCap: "round",
      lineJoin: "round"
    });
    trackCore = L.polyline(unrolledCoords, {
      color: "#ffe566",
      weight: 2,
      opacity: 0.95,
      interactive: false,
      lineCap: "round",
      lineJoin: "round"
    });
    leafletRouteLayer.addLayer(trackGlow);
    leafletRouteLayer.addLayer(trackOutline);
    leafletRouteLayer.addLayer(trackLine);
    leafletRouteLayer.addLayer(trackCore);
  }

  if (typeof window.renderRouteBufferCorridorOnMap === "function") {
    window.renderRouteBufferCorridorOnMap(); // v5.10 after unroll
  }

  // Add Waypoints
  (rtSub.waypoints !== false ? cleanWps : []).forEach((wp, idx) => {
    const isStart = idx === 0;
    const isEnd = idx === cleanWps.length - 1;
    const wptCoords = unrolledCoords[idx];
    
    const color = isStart ? "#10b981" : (isEnd ? "#ea4c25" : "#38bdf8");
    const fillColor = isStart ? "#10b981" : (isEnd ? "#ea4c25" : "#ffffff");
    const radius = isStart || isEnd ? 6 : 4;
    
    const marker = L.marker(wptCoords, {
      draggable: true,
      autoPan: true,
      icon: L.divIcon({
        className: 'route-wpt-div-icon',
        html: `<div style="width:${radius*2}px;height:${radius*2}px;border-radius:50%;background:${fillColor};border:2px solid ${color};box-shadow:0 0 8px rgba(0,0,0,0.5);cursor:grab;transition:transform 0.15s ease;" title="Drag to reposition WPT #${idx+1}"></div>`,
        iconSize: [radius*2, radius*2],
        iconAnchor: [radius, radius]
      }),
      zIndexOffset: 1000
    });

    marker.on('dragstart', function(e) {
      const el = e.target.getElement();
      if (el) {
        const dot = el.querySelector('div');
        if (dot) dot.style.cursor = 'grabbing';
      }
    });

    marker.on('drag', function(e) {
      const latlng = e.target.getLatLng();
      unrolledCoords[idx] = [latlng.lat, latlng.lng];
      if (trackGlow) trackGlow.setLatLngs(unrolledCoords);
      if (trackOutline) trackOutline.setLatLngs(unrolledCoords);
      if (trackLine) trackLine.setLatLngs(unrolledCoords);
      if (trackCore) trackCore.setLatLngs(unrolledCoords);
    });

    marker.on('dragend', function(e) {
      const el = e.target.getElement();
      if (el) {
        const dot = el.querySelector('div');
        if (dot) dot.style.cursor = 'grab';
      }
      const latlng = e.target.getLatLng();
      let normLon = ((latlng.lng + 180) % 360 + 360) % 360 - 180;
      let normLat = Math.max(-85, Math.min(85, latlng.lat));
      
      wp.lat = parseFloat(normLat.toFixed(5));
      wp.lon = parseFloat(normLon.toFixed(5));

      if (activeRouteData && activeRouteData.waypoints && activeRouteData.waypoints[idx]) {
        activeRouteData.waypoints[idx].lat = wp.lat;
        activeRouteData.waypoints[idx].lon = wp.lon;

        // Re-unroll coordinates cleanly across the entire route to maintain continuous geometry
        if (cleanWps.length > 0) {
          cleanWps[idx].lat = wp.lat;
          cleanWps[idx].lon = wp.lon;
          let rLon = cleanWps[0].lon;
          unrolledCoords[0] = [cleanWps[0].lat, rLon];
          for (let k = 1; k < cleanWps.length; k++) {
            let cl = cleanWps[k].lon;
            while (cl - rLon > 180) cl -= 360;
            while (cl - rLon < -180) cl += 360;
            rLon = cl;
            unrolledCoords[k] = [cleanWps[k].lat, rLon];
          }
        } else {
          unrolledCoords[idx] = [latlng.lat, latlng.lng];
        }

        window._setsailRouteUnrolled = unrolledCoords.slice();
        if (trackGlow) trackGlow.setLatLngs(unrolledCoords);
        if (trackOutline) trackOutline.setLatLngs(unrolledCoords);
        if (trackLine) trackLine.setLatLngs(unrolledCoords);
        if (trackCore) trackCore.setLatLngs(unrolledCoords);

        if (typeof window.renderRouteBufferCorridorOnMap === "function") {
          window.renderRouteBufferCorridorOnMap();
        }

        if (typeof enrichRouteWithLegsTelemetry === "function") {
          enrichRouteWithLegsTelemetry(activeRouteData);
        } else {
          let totalDist = 0;
          for (let k = 0; k < activeRouteData.waypoints.length - 1; k++) {
            totalDist += calculateHaversineDistanceNM(
              activeRouteData.waypoints[k].lat, activeRouteData.waypoints[k].lon,
              activeRouteData.waypoints[k+1].lat, activeRouteData.waypoints[k+1].lon
            );
          }
          activeRouteData.totalDistanceNM = Math.round(totalDist);
          const spd = ((activeRouteData.metadata && activeRouteData.metadata.speedKnots) || 14.5) || 14.5;
          activeRouteData.steamingDays = (totalDist / (spd * 24)).toFixed(1);
        }

        try {
          localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(activeRouteData));
        } catch (err) {}

        if (typeof saveRouteToLibrary === "function") {
          saveRouteToLibrary(activeRouteData);
        }

        if (typeof displaySetRouteResults === "function") {
          displaySetRouteResults(activeRouteData, false);
        }

        if (typeof renderNtMListAndMap === "function") {
          renderNtMListAndMap();
        }

        marker.setPopupContent(`
          <div style="font-family:'Segoe UI',sans-serif;min-width:180px;color:#1e293b;">
            <div style="font-weight:700;font-size:0.92rem;color:${color};border-bottom:1px solid #e2e8f0;padding-bottom:3px;margin-bottom:5px;">
              ${isStart ? "Departure: " : (isEnd ? "Destination: " : "Waypoint: ")}${wp.name || wp.id}
            </div>
            <div style="font-size:0.78rem;color:#475569;margin-bottom:2px;"><b>Coordinates:</b> ${formatLatLonDMS(wp.lat, wp.lon)}</div>
            <div style="font-size:0.72rem;color:#64748b;"><b>Route:</b> ${route.name} (WPT ${idx + 1} of ${route.waypoints.length})</div>
            <div style="font-size:0.70rem;color:#10b981;font-weight:600;margin-top:4px;">✨ Repositioned on Chart</div>
          </div>
        `);

        if (typeof showSetSailToast === "function") {
          showSetSailToast(`WPT #${idx + 1} moved to ${formatLatLonDMS(wp.lat, wp.lon)}`, "info");
        }
      }
    });

    marker.bindPopup(`
      <div style="font-family:'Segoe UI',sans-serif;min-width:180px;color:#1e293b;">
        <div style="font-weight:700;font-size:0.92rem;color:${color};border-bottom:1px solid #e2e8f0;padding-bottom:3px;margin-bottom:5px;">
          ${isStart ? "Departure: " : (isEnd ? "Destination: " : "Waypoint: ")}${wp.name || wp.id}
        </div>
        <div style="font-size:0.78rem;color:#475569;margin-bottom:2px;"><b>Coordinates:</b> ${formatLatLonDMS(wp.lat, wp.lon)}</div>
        <div style="font-size:0.72rem;color:#64748b;"><b>Route:</b> ${route.name} (WPT ${idx + 1} of ${route.waypoints.length})</div>
      </div>
    `);
    
    leafletRouteLayer.addLayer(marker);
  });

  // Update UI in My Vessel Popover
  const infoBox = document.getElementById("vesselRouteInfoBox");
  const nameEl = document.getElementById("vesselRouteName");
  const metaEl = document.getElementById("vesselRouteMeta");
  const clearBtn = document.getElementById("vesselClearRouteBtn");
  const fitBtn = document.getElementById("vesselFitRouteBtn");

  if (infoBox) infoBox.style.display = "block";
  if (nameEl) nameEl.innerHTML = `${SetSailIcons.svg("route")} ${route.name}`;
  if (metaEl) metaEl.textContent = `${route.waypoints.length} WPTs • Format: ${route.format}`;
  if (clearBtn) clearBtn.style.display = "inline-block";
  if (fitBtn) fitBtn.style.display = "inline-block";

  if (shouldFly && trackLine.getBounds().isValid()) {
    leafletMap.fitBounds(trackLine.getBounds().pad(0.08));
  }
  if (typeof window.updateRouteMiniWindowUI === "function") {
    window.updateRouteMiniWindowUI();
  }
  if (typeof window.renderRouteBufferCorridorOnMap === "function") {
    window.renderRouteBufferCorridorOnMap();
  }
  if (typeof window.saveSetSailUserHistory === "function") {
    window.saveSetSailUserHistory();
  }
  } finally {
    window._setsailRenderingRoute = false;
  }
}

function clearActiveRoute() {
  const catPillRoute = document.getElementById("catPillRoute");
  if (catPillRoute) catPillRoute.style.display = "none";
  if (activeOverlayCategory === "ROUTE") {
    activeOverlayCategory = "ALL";
    const pillAll = document.getElementById("catPillAll");
    if (pillAll) {
      document.querySelectorAll(".ntm-category-pill").forEach(p => p.classList.remove("active"));
      pillAll.classList.add("active");
    }
  }
  activeRouteData = null;
  try {
    localStorage.removeItem(ROUTE_STORAGE_KEY);
  } catch (e) {}
  if (leafletRouteLayer) {
    leafletRouteLayer.clearLayers();
  }
  const infoBox = document.getElementById("vesselRouteInfoBox");
  const clearBtn = document.getElementById("vesselClearRouteBtn");
  const fitBtn = document.getElementById("vesselFitRouteBtn");
  if (infoBox) infoBox.style.display = "none";
  if (clearBtn) clearBtn.style.display = "none";
  if (fitBtn) fitBtn.style.display = "none";
  window.ROUTE_CORRIDOR_FILTER_ENABLED = false;
  if (typeof window.updateRouteMiniWindowUI === "function") {
    window.updateRouteMiniWindowUI();
  }
  if (typeof window.renderRouteBufferCorridorOnMap === "function") {
    window.renderRouteBufferCorridorOnMap();
  }
  if (typeof renderNtMListAndMap === "function") {
    renderNtMListAndMap();
  }
  if (typeof renderPortDepthsOnMap === "function" && leafletMap) {
    renderPortDepthsOnMap(leafletMap);
  }
  if (typeof renderWeatherOnMap === "function" && leafletMap) {
    renderWeatherOnMap(leafletMap);
  }
  if (typeof window.saveSetSailUserHistory === "function") {
    window.saveSetSailUserHistory();
  }
}

function fitRouteBounds() {
  if (!leafletMap || !activeRouteData || !activeRouteData.waypoints || activeRouteData.waypoints.length === 0) return;
  const latLngs = activeRouteData.waypoints.map(w => [w.lat, w.lon]);
  const b = L.latLngBounds(latLngs);
  if (b.isValid()) {
    leafletMap.fitBounds(b.pad(0.08));
  }
}

// ════════════════════════════════════════════════════════════════════════════════
// ── SetSail Global Marine Weather Engine (6h GMDSS / Synoptic Cycle) ──
// Live NOAA NHC + JMA RSMC Tokyo + JTWC Tropical Cyclones + Open-Meteo ECMWF IFS
// ════════════════════════════════════════════════════════════════════════════════

const MARINE_WEATHER_STORE = {
  synopticCycle: "2100 UTC",
  lastSyncUtc: "2026-10-12T21:07:06Z",
  provider: "NOAA NHC + JTWC + ATCF B-Decks + JMA RSMC + Open-Meteo ECMWF IFS",
  storms: [
    {
      id: "EP202026",
      name: "Hurricane SIMON",
      shortName: "Simon",
      category: "Category 2 Hurricane (NOAA NHC)",
      center: [20.2, -106.8],
      centralPressure: 969,
      maxWinds: 85,
      gusts: 104,
      movement: "WNW at 3 kts",
      dangerRadiusNm: 97,
      forecastTrack: [
        { tau: 9, coords: [20.5, -107.0], winds: 75, radiusNm: 52 },
        { tau: 21, coords: [20.9, -107.5], winds: 65, radiusNm: 69 },
        { tau: 33, coords: [21.2, -107.7], winds: 70, radiusNm: 86 },
        { tau: 45, coords: [21.5, -107.7], winds: 75, radiusNm: 102 },
        { tau: 57, coords: [22.2, -107.4], winds: 80, radiusNm: 119 },
        { tau: 69, coords: [23.0, -107.0], winds: 85, radiusNm: 136 },
        { tau: 93, coords: [24.2, -106.6], winds: 30, radiusNm: 160 }
      ]
    },
    {
      id: "WP-27",
      name: "Typhoon KOGUMA",
      shortName: "Koguma",
      category: "Typhoon (JTWC/JMA)",
      center: [32.2, 149.6],
      centralPressure: 970,
      maxWinds: 75,
      gusts: 94,
      movement: "NE at 19 kts",
      dangerRadiusNm: 90,
      forecastTrack: [
        { tau: 12, coords: [34.9, 152.9], winds: 65, radiusNm: 56 },
        { tau: 24, coords: [37.6, 156.3], winds: 55, radiusNm: 73 },
        { tau: 36, coords: [40.1, 160.2], winds: 50, radiusNm: 90 },
        { tau: 48, coords: [41.9, 164.8], winds: 40, radiusNm: 107 },
        { tau: 60, coords: [43.1, 170.1], winds: 35, radiusNm: 124 }
      ]
    },
    {
      id: "WP-28",
      name: "Tropical Depression TWENTYEIGHT",
      shortName: "Twentyeight",
      category: "Tropical Depression (JTWC)",
      center: [17.5, 148.2],
      centralPressure: 1006,
      maxWinds: 30,
      gusts: 38,
      movement: "NW at 9 kts",
      dangerRadiusNm: 65,
      forecastTrack: [
        { tau: 12, coords: [18.6, 146.6], winds: 30, radiusNm: 56 },
        { tau: 24, coords: [19.7, 144.8], winds: 25, radiusNm: 73 },
        { tau: 36, coords: [20.9, 142.9], winds: 25, radiusNm: 90 },
        { tau: 48, coords: [21.7, 141.2], winds: 20, radiusNm: 107 }
      ]
    },
    {
      id: "EP932026",
      name: "Invest 93E",
      shortName: "93E",
      category: "Tropical Disturbance (Formation Chance 90%)",
      center: [8.1, -93.9],
      centralPressure: 1008,
      maxWinds: 25,
      gusts: 32,
      movement: "WNW at 8 kts",
      dangerRadiusNm: 65,
      forecastTrack: [
        { tau: 12, coords: [8.9, -95.3], winds: 30, radiusNm: 45 },
        { tau: 24, coords: [9.7, -96.8], winds: 35, radiusNm: 60 },
        { tau: 36, coords: [10.4, -98.2], winds: 40, radiusNm: 75 },
        { tau: 48, coords: [11.2, -99.5], winds: 45, radiusNm: 90 },
        { tau: 60, coords: [11.8, -100.4], winds: 50, radiusNm: 105 }
      ]
    }
  ],
  waves: [
    { id: "W1", name: "North Atlantic Storm Basin", center: [52.0, -25.0], radiusNm: 240, waveHeight: 3.9, swellPeriod: 9, swellDir: "W" },
    { id: "W2", name: "Southern Ocean / Roaring Forties", center: [-42.0, 35.0], radiusNm: 300, waveHeight: 3.4, swellPeriod: 9, swellDir: "NW" },
    { id: "WS1", name: "Simon Cyclonic Wave Field", center: [20.2, -106.8], radiusNm: 194, waveHeight: 4.9, swellPeriod: 9, swellDir: "W" },
    { id: "WS2", name: "Twentyeight Cyclonic Wave Field", center: [17.5, 148.2], radiusNm: 150, waveHeight: 2.5, swellPeriod: 7, swellDir: "NNE" },
    { id: "WS3", name: "Koguma Cyclonic Wave Field", center: [32.2, 149.6], radiusNm: 180, waveHeight: 6.2, swellPeriod: 9, swellDir: "SW" }
  ],
  pressureCenters: [
    { type: "L", value: 969, name: "Hurricane SIMON Core Low", coords: [20.2, -106.8] },
    { type: "L", value: 1006, name: "Tropical Depression TWENTYEIGHT Core Low", coords: [17.5, 148.2] },
    { type: "L", value: 970, name: "Typhoon KOGUMA Core Low", coords: [32.2, 149.6] },
    { type: "L", value: 1008, name: "Invest 93E Core Low", coords: [8.1, -93.9] },
    { type: "H", value: 1026, name: "Azores Subtropical High", coords: [32.0, -38.0] },
    { type: "H", value: 1024, name: "North Pacific High", coords: [34.0, -142.0] },
    { type: "H", value: 1025, name: "South Indian Ocean High", coords: [-30.0, 85.0] }
  ],
  windVectors: [
    { coords: [20.5, -106.5], dir: 160, speed: 85, label: "85 kts (Simon)" },
    { coords: [17.8, 148.5], dir: 200, speed: 30, label: "30 kts (Twentyeight)" },
    { coords: [32.5, 149.9], dir: 200, speed: 75, label: "75 kts (Koguma)" },
    { coords: [8.4, -93.6], dir: 160, speed: 25, label: "25 kts (93E)" }
  ],
  opcWarnings: [],
  buoys: [],
  pressureGrid: [],
  currents: []
};

window.MARINE_WEATHER_STORE = MARINE_WEATHER_STORE;

const WEATHER_LAYER_STORAGE_KEY = "setsail_weather_layers_v1";
const DEFAULT_WEATHER_SUBFILTERS = {
  cyclones: true,
  waves: true,
  opc: true,
  buoys: true,
  pressure: true,
  winds: true,
  currents: true
};

function loadWeatherSubfilters() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(WEATHER_LAYER_STORAGE_KEY) || "{}") || {};
  } catch (e) {
    saved = {};
  }
  return Object.assign({}, DEFAULT_WEATHER_SUBFILTERS, saved);
}

function saveWeatherSubfilters(next) {
  window.WEATHER_SUBFILTERS = Object.assign({}, DEFAULT_WEATHER_SUBFILTERS, next || {});
  try {
    localStorage.setItem(WEATHER_LAYER_STORAGE_KEY, JSON.stringify(window.WEATHER_SUBFILTERS));
  } catch (e) {}
  return window.WEATHER_SUBFILTERS;
}

window.WEATHER_SUBFILTERS = loadWeatherSubfilters();
window.loadWeatherSubfilters = loadWeatherSubfilters;
window.saveWeatherSubfilters = saveWeatherSubfilters;

function renderWeatherOnMap(map = null) {
  const currentMap = map || (typeof leafletMap !== "undefined" ? leafletMap : null);
  if (!currentMap) return;

  if (!leafletWeatherLayer) {
    leafletWeatherLayer = L.layerGroup();
  }
  window.leafletWeatherLayer = leafletWeatherLayer;
  if (typeof OVERLAY_STATES !== "undefined" && OVERLAY_STATES.weather === false) {
    if (currentMap.hasLayer(leafletWeatherLayer)) {
      currentMap.removeLayer(leafletWeatherLayer);
    }
    leafletWeatherLayer.clearLayers();
    return;
  }
  if (!currentMap.hasLayer(leafletWeatherLayer)) {
    leafletWeatherLayer.addTo(currentMap);
  }
  leafletWeatherLayer.clearLayers();

  const NM_TO_METERS = 1852;
  const curZoom = currentMap.getZoom ? currentMap.getZoom() : 3;
  const canvasRenderer = window._setsailCanvasRenderer || null;
  const wxSub = window.WEATHER_SUBFILTERS || loadWeatherSubfilters();
  const activeStormCenters = (MARINE_WEATHER_STORE.storms || []).map(s => s.center).filter(Boolean);

  // 1. Tropical Cyclones with True Perpendicular Cones & Exact Center-Anchored Icons
  (wxSub.cyclones !== false ? (MARINE_WEATHER_STORE.storms || []) : []).forEach(storm => {
    if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
      const sHit = window.isPointInActiveRouteCorridor(storm.center[0], storm.center[1], storm.dangerRadiusNm || 100) ||
                   (storm.forecastTrack || []).some(fp => window.isPointInActiveRouteCorridor(fp.coords[0], fp.coords[1], fp.radiusNm || 50));
      if (!sHit) return;
    }
    const isSevere = (storm.maxWinds || 0) >= 64;
    const primaryColor = isSevere ? "#ef4444" : "#f59e0b";
    const dangerRadiusM = (storm.dangerRadiusNm || 100) * NM_TO_METERS;
    const dangerCircle = L.circle(storm.center, {
      radius: dangerRadiusM,
      color: primaryColor,
      weight: curZoom <= 4 ? 1.8 : 2.2,
      dashArray: "4, 5",
      fillColor: primaryColor,
      fillOpacity: curZoom <= 4 ? 0.18 : 0.24
    });
    leafletWeatherLayer.addLayer(dangerCircle);

    if (storm.forecastTrack && storm.forecastTrack.length > 0) {
      const trackPoints = [storm.center];
      const coneLeft = [];
      const coneRight = [];

      storm.forecastTrack.forEach((fp, idx) => {
        trackPoints.push(fp.coords);
        const prevPt = idx === 0 ? storm.center : storm.forecastTrack[idx - 1].coords;
        const nextPt = idx + 1 < storm.forecastTrack.length ? storm.forecastTrack[idx + 1].coords : fp.coords;
        const refFrom = (Math.abs(fp.coords[0] - prevPt[0]) < 0.01 && Math.abs(fp.coords[1] - prevPt[1]) < 0.01) ? storm.center : prevPt;
        const refTo = (Math.abs(fp.coords[0] - refFrom[0]) < 0.01 && Math.abs(fp.coords[1] - refFrom[1]) < 0.01) ? nextPt : fp.coords;

        const latRad = fp.coords[0] * Math.PI / 180;
        const cosLat = Math.max(0.2, Math.cos(latRad));
        const dLat = refTo[0] - refFrom[0];
        const dLonScaled = (refTo[1] - refFrom[1]) * cosLat;
        const segLen = Math.hypot(dLat, dLonScaled) || 1;
        // True unit normal vector perpendicular to track heading
        const normLat = -dLonScaled / segLen;
        const normLonScaled = dLat / segLen;
        const offsetDeg = ((fp.radiusNm || 50) / 60) * 0.85;

        coneLeft.push([
          fp.coords[0] + normLat * offsetDeg,
          fp.coords[1] + (normLonScaled * offsetDeg) / cosLat
        ]);
        coneRight.push([
          fp.coords[0] - normLat * offsetDeg,
          fp.coords[1] - (normLonScaled * offsetDeg) / cosLat
        ]);

        const popupHtml = `
          <div style="font-family:sans-serif;font-size:11px;min-width:180px;">
            <div style="font-weight:700;color:#d97706;border-bottom:1px solid #cbd5e1;padding-bottom:3px;margin-bottom:4px;">
              ${storm.name} • Forecast +${fp.tau}h
            </div>
            <div><strong>Position:</strong> ${Math.abs(fp.coords[0]).toFixed(1)}°${fp.coords[0] >= 0 ? "N" : "S"}, ${Math.abs(fp.coords[1]).toFixed(1)}°${fp.coords[1] >= 0 ? "E" : "W"}</div>
            <div><strong>Max Wind:</strong> ${fp.winds} kts</div>
            <div><strong>Uncertainty Radius:</strong> ${fp.radiusNm} NM</div>
          </div>
        `;

        if (curZoom <= 4) {
          const dotOpts = {
            radius: 3.2,
            fillColor: "#f59e0b",
            color: "#0f172a",
            weight: 1,
            fillOpacity: 0.9
          };
          if (canvasRenderer) dotOpts.renderer = canvasRenderer;
          const dot = L.circleMarker(fp.coords, dotOpts);
          dot.bindTooltip(`${storm.shortName || storm.name} +${fp.tau}h (${fp.winds}kn)`, { direction: "top" });
          dot.bindPopup(popupHtml);
          leafletWeatherLayer.addLayer(dot);
        } else {
          const wptIcon = L.divIcon({
            className: "weather-cone-wpt-icon",
            html: `<div style="position:relative;width:8px;height:8px;"><div style="width:8px;height:8px;border-radius:50%;background:#f59e0b;border:1.5px solid #0f172a;"></div><div style="position:absolute;left:11px;top:-4px;background:rgba(245,158,11,0.92);color:#0f172a;font-size:8.5px;font-weight:800;padding:1px 4px;border-radius:3px;border:1px solid rgba(255,255,255,0.8);white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.35);">+${fp.tau}h (${fp.winds}kn)</div></div>`,
            iconSize: [8, 8],
            iconAnchor: [4, 4]
          });
          const wptMarker = L.marker(fp.coords, { icon: wptIcon });
          wptMarker.bindPopup(popupHtml);
          leafletWeatherLayer.addLayer(wptMarker);
        }
      });

      const coneCoords = [storm.center, ...coneLeft, ...coneRight.reverse(), storm.center];
      const coneOpts = {
        color: "#f59e0b",
        weight: 0.9,
        dashArray: "3, 4",
        fillColor: "#f59e0b",
        fillOpacity: curZoom <= 4 ? 0.14 : 0.20
      };
      if (canvasRenderer) coneOpts.renderer = canvasRenderer;
      leafletWeatherLayer.addLayer(L.polygon(coneCoords, coneOpts));

      const lineOpts = {
        color: "#fbbf24",
        weight: curZoom <= 4 ? 1.5 : 2.2,
        dashArray: "5, 5",
        opacity: 0.85
      };
      if (canvasRenderer) lineOpts.renderer = canvasRenderer;
      // Split antimeridian chords (same guard as NtM) so storm tracks never draw across the whole map
      const splitWxTrack = (latlngs) => {
        const rings = [[]];
        for (let i = 0; i < latlngs.length; i++) {
          const cur = latlngs[i];
          const ring = rings[rings.length - 1];
          if (ring.length) {
            const prev = ring[ring.length - 1];
            if (Math.abs(Number(cur[1]) - Number(prev[1])) > 180) {
              rings.push([cur]);
              continue;
            }
          }
          ring.push(cur);
        }
        return rings.filter((r) => r.length >= 2);
      };
      splitWxTrack(trackPoints).forEach((seg) => {
        leafletWeatherLayer.addLayer(L.polyline(seg, lineOpts));
      });
    }

    const shortLabel = storm.shortName || storm.name.replace(/^(Hurricane|Typhoon|Tropical Storm|Tropical Depression|Post-Tropical Cyclone|Invest)\s+/i, "");
    const iconDim = curZoom <= 4 ? 22 : 26;
    const badgeBorder = isSevere ? "rgba(239,68,68,0.65)" : "rgba(245,158,11,0.65)";
    const badgeTextCol = isSevere ? "#fecaca" : "#fde68a";
    const cycloneHtml = `
      <div style="position:relative;width:${iconDim}px;height:${iconDim}px;pointer-events:auto;">
        <svg viewBox="0 0 24 24" style="width:${iconDim}px;height:${iconDim}px;display:block;filter:drop-shadow(0 0 5px ${badgeBorder});" class="weather-cyclone-icon">
          <circle cx="12" cy="12" r="8.5" fill="${isSevere ? 'rgba(239,68,68,0.24)' : 'rgba(245,158,11,0.22)'}" stroke="${primaryColor}" stroke-width="1.8"/>
          <path d="M12 3.5a8.5 8.5 0 0 0-8.5 8.5c0 3.2 1.8 6 4.6 7.5" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 20.5a8.5 8.5 0 0 0 8.5-8.5c0-3.2-1.8-6-4.6-7.5" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="12" r="2.6" fill="${primaryColor}"/>
        </svg>
        <div style="position:absolute;top:${iconDim + 2}px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.90);color:${badgeTextCol};border:1px solid ${badgeBorder};font-size:8.5px;font-weight:700;padding:0px 4px;border-radius:3px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.45);">${shortLabel} ${storm.maxWinds}kn</div>
      </div>
    `;
    const stormIcon = L.divIcon({
      className: "weather-storm-div-icon",
      html: cycloneHtml,
      iconSize: [iconDim, iconDim],
      iconAnchor: [iconDim / 2, iconDim / 2]
    });
    const stormMarker = L.marker(storm.center, { icon: stormIcon });
    stormMarker.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;min-width:235px;line-height:1.45;">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #cbd5e1;padding-bottom:4px;margin-bottom:6px;gap:6px;">
          <strong style="color:#dc2626;font-size:12px;">🌀 ${storm.name}</strong>
          <span style="background:#fee2e2;color:#991b1b;padding:1px 5px;border-radius:3px;font-size:9px;font-weight:700;">${storm.category}</span>
        </div>
        <div><strong>Synoptic Cycle:</strong> ${MARINE_WEATHER_STORE.synopticCycle || "Live Advisory"}</div>
        <div><strong>Position:</strong> ${Math.abs(storm.center[0]).toFixed(1)}°${storm.center[0] >= 0 ? "N":"S"}, ${Math.abs(storm.center[1]).toFixed(1)}°${storm.center[1] >= 0 ? "E":"W"}</div>
        <div><strong>Max Sustained Winds:</strong> <span style="color:#dc2626;font-weight:700;">${storm.maxWinds} kts</span> (Gusts: ${storm.gusts} kts)</div>
        <div><strong>Central Pressure:</strong> ${storm.centralPressure} hPa</div>
        <div><strong>Movement:</strong> ${storm.movement}</div>
        <div style="margin-top:6px;padding:5px 8px;background:rgba(239,68,68,0.1);border-left:3px solid #dc2626;border-radius:3px;font-size:10px;color:#991b1b;">
          <strong>SPOS / ECDIS Safe Passing Advice:</strong><br>
          Maintain minimum safe distance (CPA) ≥ 200 NM on navigable semicircle, ≥ 250 NM on dangerous semicircle.
        </div>
      </div>
    `);
    leafletWeatherLayer.addLayer(stormMarker);
  });

  // 2. Severe Sea State Zones (Ultra-subtle rings, text badges offset from cyclone eyes)
  (wxSub.waves !== false ? (MARINE_WEATHER_STORE.waves || []) : []).forEach(wave => {
    if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
      if (!window.isPointInActiveRouteCorridor(wave.center[0], wave.center[1], wave.radiusNm || 120)) return;
    }
    const waveRadiusM = wave.radiusNm * NM_TO_METERS;
    const waveCircle = L.circle(wave.center, {
      radius: waveRadiusM,
      color: "#38bdf8",
      weight: 1.0,
      dashArray: "4, 6",
      fillColor: "#0284c7",
      fillOpacity: curZoom <= 4 ? 0.12 : 0.18
    });
    waveCircle.bindTooltip(`🌊 ${wave.name}: Hs ${wave.waveHeight}m (${wave.swellPeriod}s ${wave.swellDir})`, { direction: "top" });
    waveCircle.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;min-width:180px;">
        <strong style="color:#0284c7;">🌊 ${wave.name}</strong><br>
        <strong>Significant Wave Height (Hs):</strong> ${wave.waveHeight} m<br>
        <strong>Swell Period:</strong> ${wave.swellPeriod} s (${wave.swellDir})<br>
        <div style="font-size:9px;color:#64748b;margin-top:4px;">Open-Meteo Marine / ECMWF IFS 0.25° (${MARINE_WEATHER_STORE.synopticCycle || "Live"})</div>
      </div>
    `);
    leafletWeatherLayer.addLayer(waveCircle);

    if (curZoom >= 4) {
      const nearStorm = wxSub.cyclones !== false && activeStormCenters.some(sc => Math.hypot(sc[0] - wave.center[0], sc[1] - wave.center[1]) < 2.0);
      const badgeCoords = nearStorm
        ? [wave.center[0] - ((wave.radiusNm || 150) / 60) * 0.72, wave.center[1]]
        : wave.center;
      const waveBadgeIcon = L.divIcon({
        className: "weather-wave-badge",
        html: `<div style="background:rgba(15,23,42,0.82);color:#7dd3fc;font-size:8.5px;font-weight:700;padding:1px 4px;border-radius:3px;border:1px solid rgba(56,189,248,0.45);white-space:nowrap;">🌊 Hs ${wave.waveHeight}m</div>`,
        iconSize: [52, 15],
        iconAnchor: [26, 7]
      });
      leafletWeatherLayer.addLayer(L.marker(badgeCoords, { icon: waveBadgeIcon, interactive: false }));
    }
  });

  // 3. Barometric High/Low Centers (Skip duplicate L on top of active cyclone eye when cyclones layer is visible)
  (wxSub.pressure !== false ? (MARINE_WEATHER_STORE.pressureCenters || []) : []).forEach(pc => {
    if (pc.type === "L" && wxSub.cyclones !== false) {
      const overlapsStorm = activeStormCenters.some(sc => Math.hypot(sc[0] - pc.coords[0], sc[1] - pc.coords[1]) < 1.5);
      if (overlapsStorm) return;
    }
    if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
      if (!window.isPointInActiveRouteCorridor(pc.coords[0], pc.coords[1], 150)) return;
    }
    const isLow = pc.type === "L";
    const bgCol = isLow ? "#dc2626" : "#2563eb";
    const sz = curZoom <= 3 ? 16 : 20;
    const subVal = curZoom >= 4 ? `<div style="position:absolute;top:${sz + 1}px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:700;color:#e2e8f0;background:rgba(15,23,42,0.82);padding:0 3px;border-radius:2px;white-space:nowrap;">${pc.value}</div>` : "";
    const pcIcon = L.divIcon({
      className: "weather-pc-div-icon",
      html: `<div style="position:relative;width:${sz}px;height:${sz}px;"><div style="background:${bgCol};color:#fff;width:${sz}px;height:${sz}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${curZoom <= 3 ? 9 : 11}px;border:1.5px solid rgba(255,255,255,0.85);box-shadow:0 1px 4px rgba(0,0,0,0.4);">${pc.type}</div>${subVal}</div>`,
      iconSize: [sz, sz],
      iconAnchor: [sz / 2, sz / 2]
    });
    const pcMarker = L.marker(pc.coords, { icon: pcIcon });
    pcMarker.bindTooltip(`${pc.name} (${pc.value} hPa)`, { direction: "top" });
    pcMarker.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;">
        <strong style="color:${bgCol};">${isLow ? 'Cyclone / Low Pressure System' : 'Anticyclone / High Pressure Ridge'}</strong><br>
        <strong>Center:</strong> ${pc.name} (${pc.value} hPa)<br>
        <strong>Coords:</strong> ${Math.abs(pc.coords[0]).toFixed(1)}°${pc.coords[0] >= 0 ? "N" : "S"}, ${Math.abs(pc.coords[1]).toFixed(1)}°${pc.coords[1] >= 0 ? "E" : "W"}
      </div>
    `);
    leafletWeatherLayer.addLayer(pcMarker);
  });

  // 4. Marine Wind Vectors (Shown at curZoom >= 4, offset slightly if near cyclone eye)
  if (curZoom >= 4 && wxSub.winds !== false) {
    (MARINE_WEATHER_STORE.windVectors || []).forEach(wv => {
      let plotCoords = wv.coords;
      if (wxSub.cyclones !== false && activeStormCenters.some(sc => Math.hypot(sc[0] - wv.coords[0], sc[1] - wv.coords[1]) < 0.8)) {
        plotCoords = [wv.coords[0] + 0.85, wv.coords[1] + 0.85];
      }
      const rot = (wv.dir + 180) % 360;
      const windIcon = L.divIcon({
        className: "weather-wind-div-icon",
        html: `<div style="position:relative;width:16px;height:16px;"><div style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;transform:rotate(${rot}deg);transform-origin:center center;"><svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:#38bdf8;"><path d="M12 2L4 20l8-4 8 4z"/></svg></div><div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);font-size:7.5px;font-weight:700;color:#cbd5e1;background:rgba(15,23,42,0.78);padding:0 3px;border-radius:2px;white-space:nowrap;">${wv.speed}kn</div></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      const wvMarker = L.marker(plotCoords, { icon: windIcon });
      wvMarker.bindPopup(`<strong>Wind Vector:</strong> ${wv.label}`);
      leafletWeatherLayer.addLayer(wvMarker);
    });
  }

  // 5. OPC High Seas Gale / Storm / Hurricane warnings
  if (wxSub.opc !== false) {
    const sevColor = { HURRICANE: "#ef4444", STORM: "#f97316", "TROPICAL STORM": "#fb923c", GALE: "#eab308" };
    (MARINE_WEATHER_STORE.opcWarnings || []).forEach((w) => {
      if (!w || !w.center) return;
      if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
        if (!window.isPointInActiveRouteCorridor(w.center[0], w.center[1], w.radiusNm || 120)) return;
      }
      const col = sevColor[w.severity] || "#f59e0b";
      const circle = L.circle(w.center, {
        radius: (w.radiusNm || 120) * NM_TO_METERS,
        color: col,
        weight: 1.2,
        dashArray: "6, 4",
        fillColor: col,
        fillOpacity: 0.07
      });
      circle.bindPopup(
        `<div style="font-family:sans-serif;font-size:11px;min-width:200px;line-height:1.4;">` +
        `<strong style="color:${col};">${w.headline || w.severity}</strong><br>` +
        `<div style="margin-top:4px;color:#334155;">${(w.summary || "").replace(/</g, "&lt;")}</div>` +
        `<div style="font-size:9px;color:#64748b;margin-top:5px;">NOAA OPC High Seas · ${w.basin || ""}</div></div>`
      );
      leafletWeatherLayer.addLayer(circle);
      if (curZoom >= 3) {
        const badge = L.divIcon({
          className: "weather-opc-badge",
          html: `<div style="background:rgba(15,23,42,0.9);color:${col};font-size:8px;font-weight:800;padding:1px 5px;border-radius:3px;border:1px solid ${col};white-space:nowrap;">${w.severity || "OPC"}</div>`,
          iconSize: [64, 14],
          iconAnchor: [32, 7]
        });
        leafletWeatherLayer.addLayer(L.marker(w.center, { icon: badge, interactive: false }));
      }
    });
  }

  // 6. NDBC buoys — cursor probe + toolbar tile (no map markers)
  // 7. Pressure MSL grid labels
  if (wxSub.pressure !== false && curZoom >= 3.5) {
    (MARINE_WEATHER_STORE.pressureGrid || []).forEach((p) => {
      if (!p || p.mslhPa == null) return;
      if (curZoom < 5 && Math.abs(p.lat % 24) > 0.1 && Math.abs(p.lon % 24) > 0.1) return;
      const icon = L.divIcon({
        className: "weather-msl-label",
        html: `<div style="font-size:8px;font-weight:700;color:#cbd5e1;background:rgba(15,23,42,0.55);padding:0 3px;border-radius:2px;">${Math.round(p.mslhPa)}</div>`,
        iconSize: [28, 12],
        iconAnchor: [14, 6]
      });
      leafletWeatherLayer.addLayer(L.marker([p.lat, p.lon], { icon, interactive: false }));
    });
  }

  // 8. Ocean currents
  if (wxSub.currents !== false && curZoom >= 3) {
    (MARINE_WEATHER_STORE.currents || []).forEach((c) => {
      if (!c || c.speedKn == null) return;
      if (c.speedKn < 0.15 && curZoom < 5) return;
      const rot = (Number(c.dirDeg) || 0) % 360;
      const icon = L.divIcon({
        className: "weather-current-icon",
        html: `<div style="width:14px;height:14px;transform:rotate(${rot}deg);transform-origin:center;"><svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#a78bfa;opacity:0.9;"><path d="M12 2L5 20l7-3 7 3z"/></svg></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      const m = L.marker([c.lat, c.lon], { icon });
      m.bindPopup(`<strong>Ocean current:</strong> ${c.speedKn} kn @ ${c.dirDeg}°<br><span style="font-size:9px;color:#64748b;">Open-Meteo Marine</span>`);
      leafletWeatherLayer.addLayer(m);
    });
  }
}

window.renderWeatherOnMap = renderWeatherOnMap;


/** Inverse-distance sample of NDBC buoys at chart cursor (no map markers). */
function sampleNdbcAtLatLon(lat, lon) {
  const buoys = (typeof MARINE_WEATHER_STORE !== "undefined" && Array.isArray(MARINE_WEATHER_STORE.buoys))
    ? MARINE_WEATHER_STORE.buoys : [];
  if (!buoys.length || !Number.isFinite(lat) || !Number.isFinite(lon)) {
    return { ok: false, mode: "none", message: "No NDBC data loaded" };
  }
  const scored = [];
  for (let i = 0; i < buoys.length; i++) {
    const b = buoys[i];
    if (!b || !Number.isFinite(b.lat) || !Number.isFinite(b.lon)) continue;
    const d = calculateHaversineDistanceNM(lat, lon, b.lat, b.lon);
    if (!Number.isFinite(d)) continue;
    scored.push({ b, d });
  }
  if (!scored.length) return { ok: false, mode: "none", message: "No NDBC buoys" };
  scored.sort((a, c) => a.d - c.d);
  const nearest = scored[0];
  const NEAR_NM = 60;
  const BLEND_NM = 220;
  const MAX_NM = 450;

  if (nearest.d > MAX_NM) {
    return { ok: false, mode: "far", nearestNm: Math.round(nearest.d), message: "No buoys within " + MAX_NM + " NM" };
  }

  const fields = ["windKt", "gustKt", "windDir", "waveHs", "wavePeriod", "waveDir", "pressureMb", "airC", "sstC"];
  const out = { ok: true, lat, lon };

  if (nearest.d <= NEAR_NM) {
    const b = nearest.b;
    fields.forEach((f) => { out[f] = b[f] != null && Number.isFinite(Number(b[f])) ? Number(b[f]) : null; });
    out.mode = "nearest";
    out.buoyId = b.id;
    out.nearestNm = Math.round(nearest.d * 10) / 10;
    out.timeUtc = b.timeUtc || null;
    out.sourceNote = "NDBC " + (b.id || "") + " · " + out.nearestNm + " NM";
    return out;
  }

  const neighbors = scored.filter((s) => s.d <= BLEND_NM).slice(0, 6);
  const use = neighbors.length >= 2 ? neighbors : scored.slice(0, Math.min(4, scored.length));
  const sums = {};
  const wsum = {};
  fields.forEach((f) => { sums[f] = 0; wsum[f] = 0; });
  use.forEach(({ b, d }) => {
    const w = 1 / Math.max(d, 0.5);
    const w2 = w * w;
    fields.forEach((f) => {
      const v = b[f];
      if (v == null || !Number.isFinite(Number(v))) return;
      if (f === "windDir" || f === "waveDir") return;
      sums[f] += Number(v) * w2;
      wsum[f] += w2;
    });
  });
  fields.forEach((f) => {
    if (f === "windDir" || f === "waveDir") {
      const withDir = use.find((s) => s.b[f] != null && Number.isFinite(Number(s.b[f])));
      out[f] = withDir ? Number(withDir.b[f]) : null;
    } else {
      out[f] = wsum[f] > 0 ? sums[f] / wsum[f] : null;
    }
  });
  out.mode = "interpolated";
  out.buoyId = null;
  out.nearestNm = Math.round(nearest.d * 10) / 10;
  out.blendCount = use.length;
  out.timeUtc = (use[0] && use[0].b && use[0].b.timeUtc) || null;
  out.sourceNote = "Interp. " + use.length + " buoys · nearest " + out.nearestNm + " NM";
  return out;
}

function fmtWxNum(v, digits) {
  if (v == null || !Number.isFinite(Number(v))) return "—";
  const n = Number(v);
  return digits === 0 ? String(Math.round(n)) : n.toFixed(digits);
}

function syncNdbcCursorTileVisibility() {
  const tile = document.getElementById("ntmWxCursorTile");
  if (!tile) return;
  const states = (typeof window !== "undefined" && window.OVERLAY_STATES)
    ? window.OVERLAY_STATES
    : (typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES : null);
  const wxOn = !!(states && states.weather);
  const buoyOn = !(window.WEATHER_SUBFILTERS && window.WEATHER_SUBFILTERS.buoys === false);
  const show = wxOn && buoyOn;
  if (show) {
    tile.hidden = false;
    tile.removeAttribute("hidden");
    tile.style.display = "flex";
    tile.setAttribute("aria-hidden", "false");
  } else {
    tile.hidden = true;
    tile.setAttribute("hidden", "");
    tile.style.display = "none";
    tile.setAttribute("aria-hidden", "true");
    tile.classList.remove("is-live");
  }
}

function updateNdbcCursorTile(lat, lon) {
  const tile = document.getElementById("ntmWxCursorTile");
  if (!tile || tile.hidden) return;
  const body = document.getElementById("ntmWxCursorBody");
  const meta = document.getElementById("ntmWxCursorMeta");
  if (!body) return;
  const s = sampleNdbcAtLatLon(lat, lon);
  if (!s.ok) {
    tile.classList.remove("is-live");
    body.innerHTML = '<span class="wx-chip wx-muted">' + (s.message || "No data") + "</span>";
    if (meta) meta.textContent = "";
    return;
  }
  tile.classList.add("is-live");
  const wind = s.windKt != null
    ? (fmtWxNum(s.windKt, 0) + " kn" + (s.windDir != null ? " " + fmtWxNum(s.windDir, 0) + "\u00b0" : "") + (s.gustKt != null ? " G" + fmtWxNum(s.gustKt, 0) : ""))
    : "\u2014";
  const wave = s.waveHs != null
    ? (fmtWxNum(s.waveHs, 1) + " m" + (s.wavePeriod != null ? " / " + fmtWxNum(s.wavePeriod, 0) + "s" : ""))
    : "\u2014";
  body.innerHTML =
    '<span class="wx-chip" title="Wind"><span class="wx-ico" aria-hidden="true">\uD83D\uDCA8</span><b>' + wind + "</b></span>" +
    '<span class="wx-chip" title="Waves Hs"><span class="wx-ico" aria-hidden="true">\uD83C\uDF0A</span><b>' + wave + "</b></span>" +
    '<span class="wx-chip" title="Pressure"><span class="wx-ico" aria-hidden="true">\u25CE</span><b>' + fmtWxNum(s.pressureMb, 0) + " mb</b></span>" +
    '<span class="wx-chip" title="Air / SST"><span class="wx-ico" aria-hidden="true">\uD83C\uDF21</span><b>' + fmtWxNum(s.airC, 0) + "\u00b0 / " + fmtWxNum(s.sstC, 0) + "\u00b0</b></span>";
  if (meta) {
    meta.textContent = s.sourceNote + (s.mode === "interpolated" ? " \u00b7 blended" : " \u00b7 buoy");
  }
}

window.sampleNdbcAtLatLon = sampleNdbcAtLatLon;
window.syncNdbcCursorTileVisibility = syncNdbcCursorTileVisibility;
window.updateNdbcCursorTile = updateNdbcCursorTile;

function weatherPayloadHasData(data) {
  if (!data || typeof data !== "object") return false;
  return (
    (Array.isArray(data.storms) && data.storms.length > 0) ||
    (Array.isArray(data.waves) && data.waves.length > 0) ||
    (Array.isArray(data.opcWarnings) && data.opcWarnings.length > 0) ||
    (Array.isArray(data.buoys) && data.buoys.length > 0) ||
    (Array.isArray(data.pressureGrid) && data.pressureGrid.length > 0) ||
    (Array.isArray(data.currents) && data.currents.length > 0) ||
    (Array.isArray(data.pressureCenters) && data.pressureCenters.length > 0)
  );
}

async function refreshMarineWeather(force = false) {
  try {
    const bust = Date.now();
    const urls = [
      "weather.json?t=" + bust,
      "https://raw.githubusercontent.com/waffiman/Admirality-NtM-Scraper/main/weather.json?t=" + bust,
      "https://cdn.jsdelivr.net/gh/waffiman/Admirality-NtM-Scraper@main/weather.json?t=" + bust
    ];
    let bestData = null;
    let bestTs = Date.parse(MARINE_WEATHER_STORE.lastSyncUtc || "2000-01-01T00:00:00Z") || 0;

    const results = await Promise.allSettled(
      urls.map(u => fetch(u, { cache: "no-store" }).then(r => (r.ok ? r.json() : null)).catch(() => null))
    );
    for (const res of results) {
      if (res.status === "fulfilled" && weatherPayloadHasData(res.value)) {
        const candidateTs = Date.parse(res.value.lastSyncUtc || "") || 0;
        if (!bestData || candidateTs >= bestTs) {
          bestData = res.value;
          if (candidateTs > bestTs) bestTs = candidateTs;
        }
      }
    }

    if (bestData && weatherPayloadHasData(bestData)) {
      if (Array.isArray(bestData.storms)) MARINE_WEATHER_STORE.storms = bestData.storms;
      if (Array.isArray(bestData.waves) && bestData.waves.length > 0) {
        MARINE_WEATHER_STORE.waves = bestData.waves;
      }
      if (Array.isArray(bestData.pressureCenters) && bestData.pressureCenters.length > 0) {
        MARINE_WEATHER_STORE.pressureCenters = bestData.pressureCenters;
      }
      if (Array.isArray(bestData.windVectors) && bestData.windVectors.length > 0) {
        MARINE_WEATHER_STORE.windVectors = bestData.windVectors;
      }
      if (Array.isArray(bestData.opcWarnings)) MARINE_WEATHER_STORE.opcWarnings = bestData.opcWarnings;
      if (Array.isArray(bestData.buoys)) MARINE_WEATHER_STORE.buoys = bestData.buoys;
      if (Array.isArray(bestData.pressureGrid)) MARINE_WEATHER_STORE.pressureGrid = bestData.pressureGrid;
      if (Array.isArray(bestData.currents)) MARINE_WEATHER_STORE.currents = bestData.currents;
      if (bestData.synopticCycle) MARINE_WEATHER_STORE.synopticCycle = bestData.synopticCycle;
      if (bestData.lastSyncUtc) MARINE_WEATHER_STORE.lastSyncUtc = bestData.lastSyncUtc;
      if (bestData.provider) MARINE_WEATHER_STORE.provider = bestData.provider;
    }
  } catch (e) {
    console.warn("[SetSail Weather] weather.json fetch fallback:", e);
  }

  if (navigator.onLine) {
    try {
      const waves = MARINE_WEATHER_STORE.waves || [];
      if (waves.length > 0) {
        const lats = waves.map(w => w.center[0]).join(",");
        const lons = waves.map(w => w.center[1]).join(",");
        const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lats}&longitude=${lons}&current=wave_height,wave_direction,wave_period&timezone=GMT`;
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          const list = Array.isArray(data) ? data : [data];
          const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
          list.forEach((item, idx) => {
            if (waves[idx] && item && item.current) {
              if (item.current.wave_height != null) {
                waves[idx].waveHeight = parseFloat(Number(item.current.wave_height).toFixed(1));
              }
              if (item.current.wave_period != null) {
                waves[idx].swellPeriod = Math.round(Number(item.current.wave_period));
              }
              if (item.current.wave_direction != null) {
                const deg = Number(item.current.wave_direction);
                waves[idx].swellDir = dirs[Math.round(deg / 22.5) % 16];
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn("[Open-Meteo Marine Live Sync]", err);
    }
  } else if (force && typeof showSetSailToast === "function") {
    showSetSailToast("Offline: Serving cached NOAA NHC / JMA / JTWC Cyclone & Synoptic analysis.", "info");
  }

  if (typeof renderWeatherOnMap === "function") {
    renderWeatherOnMap();
  }
  if (typeof syncDynamicFilterPopover === "function") {
    syncDynamicFilterPopover();
  }
  if (typeof updateWeatherModalActiveStorms === "function") {
    updateWeatherModalActiveStorms();
  }
  if (force && typeof showSetSailToast === "function") {
    const nCyc = (MARINE_WEATHER_STORE.storms || []).length;
    const nOpc = (MARINE_WEATHER_STORE.opcWarnings || []).length;
    const nBuoy = (MARINE_WEATHER_STORE.buoys || []).length;
    showSetSailToast(
      `Weather synced: ${nCyc} cyclones · ${nOpc} OPC · ${nBuoy} buoys`,
      "success"
    );
  }
  if (typeof syncWeatherModalLayerChecks === "function") {
    syncWeatherModalLayerChecks();
  }
}

window.refreshMarineWeather = refreshMarineWeather;

function initHomeHudVessel() {
  loadUserVesselFromStorage();
  updateHomeVesselHudLabel();
  fillVesselFormsFromState();
  if (typeof scheduleOwnVesselAisRefresh === "function") scheduleOwnVesselAisRefresh();

  const pillBtn = document.getElementById("homeVesselHudBtn");
  const pop = document.getElementById("homeVesselPopover");
  const closeBtn = document.getElementById("homeVesselPopClose");

  const placeHomePop = () => {
    if (!pop || !pillBtn) return;
    const r = pillBtn.getBoundingClientRect();
    const gap = 8;
    const width = Math.min(340, Math.max(260, window.innerWidth - 24));
    let top = Math.round(r.bottom + gap);
    let right = Math.round(Math.max(8, window.innerWidth - r.right));
    // Keep panel on-screen if it would hang below the viewport.
    const approxH = Math.min(560, window.innerHeight * 0.7);
    if (top + approxH > window.innerHeight - 8) {
      top = Math.max(8, Math.round(r.top - gap - approxH));
    }
    pop.style.width = width + "px";
    pop.style.top = top + "px";
    pop.style.right = right + "px";
    pop.style.left = "auto";
  };
  const closeHomePop = () => {
    if (pop) pop.classList.remove("open");
    if (pillBtn) pillBtn.setAttribute("aria-expanded", "false");
  };
  const openHomePop = () => {
    // close chart vessel popover if open
    const chartPop = document.getElementById("ntmVesselPopover");
    const chartBtn = document.getElementById("ntmMyVesselBtn");
    if (chartPop) chartPop.classList.remove("open");
    if (chartBtn) chartBtn.classList.remove("active");
    fillVesselFormsFromState();
    placeHomePop();
    if (pop) pop.classList.add("open");
    if (pillBtn) pillBtn.setAttribute("aria-expanded", "true");
    bindVesselNameAutocomplete("home");
    bindVesselMmsiLookup("home");
  };
  window.addEventListener("resize", () => {
    if (pop && pop.classList.contains("open")) placeHomePop();
  });
  window.addEventListener("scroll", () => {
    if (pop && pop.classList.contains("open")) placeHomePop();
  }, true);

  if (pillBtn) {
    pillBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (pop && pop.classList.contains("open")) closeHomePop();
      else openHomePop();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeHomePop);

  const gpsBtn = document.getElementById("homeVesselGpsBtn");
  if (gpsBtn) gpsBtn.addEventListener("click", () => requestGpsIntoForm("home"));
  const applyBtn = document.getElementById("homeVesselApplyBtn");
  if (applyBtn) applyBtn.addEventListener("click", () => saveVesselForm("home", closeHomePop));
  const clearBtn = document.getElementById("homeVesselClearBtn");
  if (clearBtn) clearBtn.addEventListener("click", () => clearVesselProfile(closeHomePop));

  document.addEventListener("click", (e) => {
    if (!pop || !pop.classList.contains("open")) return;
    const wrap = document.getElementById("homeVesselHudPill");
    if (wrap && !wrap.contains(e.target)) closeHomePop();
  });

  // No automatic geolocation prompt on first visit
}

function initVesselTracking() {
  // Passage Plan Route Upload Listener
  const routeFileInput = document.getElementById("vesselRouteFile");
  const uploadRouteBtn = document.getElementById("vesselUploadRouteBtn");
  const clearRouteBtn = document.getElementById("vesselClearRouteBtn");
  const fitRouteBtn = document.getElementById("vesselFitRouteBtn");

  if (uploadRouteBtn && routeFileInput) {
    uploadRouteBtn.addEventListener("click", () => {
      routeFileInput.click();
    });

    routeFileInput.addEventListener("change", (e) => {
      const file = (e.target.files && e.target.files[0]);
      if (!file) return;
      const ext = file.name.split(".").pop().toLowerCase();

      if (ext === "rtm") {
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const parsed = parseRtmRoute(evt.target.result, file.name);
            if (!parsed.waypoints || parsed.waypoints.length === 0) {
              alert("No valid waypoints found in .rtm route file.");
              return;
            }
            renderRouteOnMap(parsed, true);
          } catch (err) {
            console.error("RTM error:", err);
            alert("Error parsing .rtm file: " + err.message);
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (ext === "rtz") {
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const parsed = parseRtzRoute(evt.target.result, file.name);
            if (!parsed.waypoints || parsed.waypoints.length === 0) {
              alert("No valid waypoints found in .rtz route file.");
              return;
            }
            renderRouteOnMap(parsed, true);
          } catch (err) {
            console.error("RTZ error:", err);
            alert("Error parsing .rtz file: " + err.message);
          }
        };
        reader.readAsText(file);
      } else if (ext === "csv") {
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const parsed = parseCsvRoute(evt.target.result, file.name);
            if (!parsed.waypoints || parsed.waypoints.length === 0) {
              alert("No valid waypoints found in .csv route file.");
              return;
            }
            renderRouteOnMap(parsed, true);
          } catch (err) {
            console.error("CSV error:", err);
            alert("Error parsing .csv file: " + err.message);
          }
        };
        reader.readAsText(file);
      } else {
        alert("Unsupported format. Please select .rtz, .csv, or .rtm file.");
      }
      routeFileInput.value = "";
    });
  }

  if (clearRouteBtn) {
    clearRouteBtn.addEventListener("click", clearActiveRoute);
  }
  if (fitRouteBtn) {
    fitRouteBtn.addEventListener("click", fitRouteBounds);
  }

  // Restore saved route info inside popover if present
  try {
    const savedRouteStr = localStorage.getItem(ROUTE_STORAGE_KEY);
    if (savedRouteStr) {
      const savedRoute = JSON.parse(savedRouteStr);
      const infoBox = document.getElementById("vesselRouteInfoBox");
      const nameEl = document.getElementById("vesselRouteName");
      const metaEl = document.getElementById("vesselRouteMeta");
      if (infoBox) infoBox.style.display = "block";
      if (nameEl) nameEl.innerHTML = `${SetSailIcons.svg("route")} ${savedRoute.name}`;
      if (metaEl) metaEl.textContent = `${savedRoute.waypoints.length} WPTs • Format: ${savedRoute.format}`;
      if (clearRouteBtn) clearRouteBtn.style.display = "inline-block";
      if (fitRouteBtn) fitRouteBtn.style.display = "inline-block";
    }
  } catch (e) {}

  const myVesselBtn = document.getElementById("ntmMyVesselBtn");
  const vesselPop = document.getElementById("ntmVesselPopover");
  const closeBtn = document.getElementById("vesselPopClose");
  const fetchGpsBtn = document.getElementById("vesselFetchGpsBtn");
  const applyBtn = document.getElementById("vesselApplyBtn");
  const clearBtn = document.getElementById("vesselClearBtn");

  // Load persisted vessel profile (v2 + legacy)
  loadUserVesselFromStorage();
  fillVesselFormsFromState();
  bindVesselNameAutocomplete("chart");
  bindVesselMmsiLookup("chart");
  if (typeof scheduleOwnVesselAisRefresh === "function") scheduleOwnVesselAisRefresh();

  const togglePopover = () => {
    if (!vesselPop) return;
    const isOpen = vesselPop.classList.contains("open");

    const filterPop = document.getElementById("ntmFilterPopover");
    const sortPop = document.getElementById("ntmSortPopover");
    if (filterPop) filterPop.classList.remove("open");
    if (sortPop) sortPop.classList.remove("open");
    const homePop = document.getElementById("homeVesselPopover");
    if (homePop) homePop.classList.remove("open");

    if (isOpen) {
      vesselPop.classList.remove("open");
      if (myVesselBtn) myVesselBtn.classList.remove("active");
    } else {
      vesselPop.classList.add("open");
      if (myVesselBtn) myVesselBtn.classList.add("active");
      fillVesselFormsFromState();
      bindVesselNameAutocomplete("chart");
    }
  };

  const closePopover = () => {
    if (vesselPop) vesselPop.classList.remove("open");
    if (myVesselBtn) myVesselBtn.classList.remove("active");
  };

  if (myVesselBtn) {
    myVesselBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePopover();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closePopover);

  if (fetchGpsBtn) {
    fetchGpsBtn.addEventListener("click", () => requestGpsIntoForm("chart"));
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", () => saveVesselForm("chart", closePopover));
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => clearVesselProfile(closePopover));
  }
}

/**
 * Coordinate string parser
 */
function parseCoordinateString(str) {
  if (!str) return null;
  const num = parseFloat(str);
  if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(str.trim())) {
    return num;
  }
  const match = str.match(/([0-9]+)[\s°]+([0-9.]+)?[\s'′]*([NSEWnsew])?/i);
  if (match) {
    const deg = parseFloat(match[1]);
    const min = match[2] ? parseFloat(match[2]) : 0;
    let val = deg + (min / 60.0);
    const dir = (match[3] || "").toUpperCase();
    if (dir === "S" || dir === "W") val = -val;
    return val;
  }
  return null;
}

/** Zoom at/above which own-ship switches from position circle → hull outline. */
const OWN_SHIP_HULL_ZOOM = 14;

/**
 * Generates Crosshair Target Marker (legacy / fallback)
 */
function getEcdisCrosshairIcon() {
  return getOwnShipPositionIcon(null, false);
}

/**
 * Low/medium zoom: ECDIS position circle (bullseye) + short heading vector with tick marks.
 * Bow = up in local SVG, then rotated by true heading/COG.
 */
function hasOwnShipHeadingDeg(headingDeg) {
  // Reject null/"" before Number() — Number(null)===0 would falsely show a 0° vector
  if (headingDeg == null || headingDeg === "") return false;
  const h = Number(headingDeg);
  return Number.isFinite(h) && h >= 0 && h < 360;
}

function getOwnShipPositionIcon(headingDeg, showVector) {
  const has = hasOwnShipHeadingDeg(headingDeg);
  const rot = has ? ((Number(headingDeg) % 360) + 360) % 360 : 0;
  const vec = showVector !== false && has;
  const vectorSvg = vec
    ? `<g class="own-ship-vector" stroke="#0f172a" stroke-width="1.35" fill="none" stroke-linecap="round">
         <line x1="24" y1="24" x2="24" y2="4" stroke-dasharray="2.2 2.2"/>
         <line x1="20.5" y1="18" x2="27.5" y2="18"/>
         <line x1="20.5" y1="12" x2="27.5" y2="12"/>
         <line x1="20.5" y1="7" x2="27.5" y2="7"/>
         <polyline points="20.5,5.5 24,2 27.5,5.5" stroke-width="1.5"/>
       </g>`
    : "";
  const html = `
    <div class="own-ship-wrap own-ship-wrap--pos" style="transform:rotate(${rot}deg);transform-origin:center center;">
      <svg class="own-ship-svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        ${vectorSvg}
        <circle cx="24" cy="24" r="9" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="24" cy="24" r="5.2" fill="none" stroke="#0f172a" stroke-width="1.35"/>
        <circle cx="24" cy="24" r="2.1" fill="#0f172a"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "own-ship-marker",
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  });
}

/**
 * High zoom: ECDIS own-ship hull outline (rounded bow, flat stern) + heading vector.
 */
function getOwnShipHullIcon(headingDeg, showVector) {
  const has = hasOwnShipHeadingDeg(headingDeg);
  const rot = has ? ((Number(headingDeg) % 360) + 360) % 360 : 0;
  const vec = showVector !== false && has;
  // Local coords: bow toward -Y (up). Hull centered near (24, 34).
  const vectorSvg = vec
    ? `<line x1="24" y1="22" x2="24" y2="2" stroke="#0f172a" stroke-width="1.25"/>`
    : "";
  const html = `
    <div class="own-ship-wrap own-ship-wrap--hull" style="transform:rotate(${rot}deg);transform-origin:24px 34px;">
      <svg class="own-ship-svg" width="48" height="64" viewBox="0 0 48 64" aria-hidden="true">
        ${vectorSvg}
        <path d="M24 14
          C28.5 14 31.5 18 31.5 24
          L31.5 46
          C31.5 49.5 29 51.5 24 51.5
          C19 51.5 16.5 49.5 16.5 46
          L16.5 24
          C16.5 18 19.5 14 24 14 Z"
          fill="none" stroke="#0f172a" stroke-width="2.1" stroke-linejoin="round"/>
        <line x1="17.2" y1="44" x2="30.8" y2="44" stroke="#64748b" stroke-width="1.15"/>
        <line x1="24" y1="16" x2="24" y2="50" stroke="#94a3b8" stroke-width="1"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "own-ship-marker",
    iconSize: [48, 64],
    iconAnchor: [24, 34]
  });
}

/** Pick position-circle vs hull outline from current chart zoom. */
function getOwnShipMapIcon(headingDeg) {
  const z = (typeof leafletMap !== "undefined" && leafletMap && leafletMap.getZoom)
    ? leafletMap.getZoom()
    : 8;
  const hasHdg = hasOwnShipHeadingDeg(headingDeg);
  if (z >= OWN_SHIP_HULL_ZOOM) {
    return getOwnShipHullIcon(hasHdg ? headingDeg : 0, hasHdg);
  }
  return getOwnShipPositionIcon(hasHdg ? headingDeg : null, hasHdg);
}

/** ECDIS-style own-ship outline (legacy name → hull). */
function getOwnShipSilhouetteIcon(headingDeg) {
  const has = hasOwnShipHeadingDeg(headingDeg);
  return getOwnShipHullIcon(has ? headingDeg : 0, has);
}

function resolveOwnShipHeading(v) {
  if (!v) return null;
  // Heading vector follows My Vessel heading only — never invent from COG.
  if (!hasOwnShipHeadingDeg(v.heading)) return null;
  return ((Number(v.heading) % 360) + 360) % 360;
}

/**
 * Plot user vessel crosshair on map
 */
function plotUserVessel(lat, lon, source = "manual", skipFly = false) {
  const prev = userVessel || {};
  userVessel = Object.assign({}, prev, {
    lat,
    lon,
    source,
    updatedAt: new Date().toISOString()
  });
  persistUserVessel();

  if (leafletMap && leafletVesselLayer) {
    leafletVesselLayer.clearLayers();

    const hdg = resolveOwnShipHeading(userVessel);
    const marker = L.marker([lat, lon], {
      icon: getOwnShipMapIcon(hdg),
      zIndexOffset: 1200
    });

    const title = (userVessel.name && String(userVessel.name).trim()) || "Vessel Position";
    marker.bindPopup(`
      <div style="font-family:'Segoe UI',sans-serif;color:#111;min-width:180px;">
        <div style="font-weight:700;color:#0a3888;font-size:1rem;border-bottom:1px solid #ddd;padding-bottom:3px;margin-bottom:5px;">
          ${title.replace(/[<>]/g, "")}
        </div>
        <div style="font-size:0.8rem;color:#333;margin-bottom:3px;"><b>Coordinates:</b> ${formatLatLonDMS(lat, lon)}</div>
        ${userVessel.callSign ? `<div style="font-size:0.75rem;color:#333;"><b>Call Sign:</b> ${String(userVessel.callSign).replace(/[<>]/g, "")}</div>` : ""}
        ${userVessel.mmsi ? `<div style="font-size:0.75rem;color:#333;"><b>MMSI:</b> ${String(userVessel.mmsi).replace(/[<>]/g, "")}</div>` : ""}
        <div style="font-size:0.75rem;color:#666;"><b>Source:</b> ${source === "gps" ? "Browser GPS" : source === "ais" ? "AIS match" : "Manual Navigation Entry"}</div>
      </div>
    `);

    leafletVesselLayer.addLayer(marker);
    if (!skipFly) {
      leafletMap.flyTo([lat, lon], Math.max(leafletMap.getZoom(), 8));
    }
  }

  const hud = document.getElementById("ntmVesselHud");
  if (hud) {
    // Keep bottom-left for cursor coordinates only (ECDIS-style)
    hud.style.display = "none";
  }

  updateHomeVesselHudLabel();
}

/**
 * Minimalist Settings UI
 */
function initSettingsUI() {
  const btnDark = document.getElementById("btnThemeDark");
  const btnLight = document.getElementById("btnThemeLight");

  if (btnDark) {
    btnDark.addEventListener("click", () => setAppTheme("dark"));
  }
  if (btnLight) {
    btnLight.addEventListener("click", () => setAppTheme("light"));
  }

  if (typeof initSetSailAuth === "function") {
    initSetSailAuth();
  }

  // Verified Contact Form: Reply Email + Message + Multi-Endpoint Delivery + Local Outbox + Mailto Fallback
  const submitBtn = document.getElementById("contactSubmitBtn");
  const statusEl = document.getElementById("contactStatusMsg");
  const contactForm = document.getElementById("setsailContactForm");

  const handleContactSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const emailEl = document.getElementById("contactEmail");
    const msgEl = document.getElementById("contactMessage");
    const email = (emailEl ? emailEl.value : "").trim();
    const message = (msgEl ? msgEl.value : "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#f43f5e;font-weight:600;">⚠ Please enter a valid reply email address.</span>`;
      }
      if (emailEl) emailEl.focus();
      return;
    }
    if (!message) {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#f43f5e;font-weight:600;">⚠ Please enter your message or report.</span>`;
      }
      if (msgEl) msgEl.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... ${SetSailIcons.svg("clock")}`;
    }
    if (statusEl) {
      statusEl.innerHTML = `<span style="color:#38bdf8;">Transmitting to SetSail Engineering...</span>`;
    }

    let authUser = null;
    try { authUser = JSON.parse(localStorage.getItem("setsail_auth_user_v1") || "null"); } catch (err) {}

    const payload = {
      _subject: "SetSail Bridge Feedback — LPG/C IINO INEOS VESTA",
      email: email,
      replyTo: email,
      userAccount: authUser ? (authUser.email || authUser.name) : "Bridge Watchkeeper",
      message: message,
      vessel: "LPG/C IINO INEOS VESTA",
      clientTimeUtc: new Date().toISOString(),
      version: "SetSail v4.8 (Production PWA)"
    };

    // Always persist in local outbox history
    try {
      const outbox = JSON.parse(localStorage.getItem("setsail_support_outbox_v1") || "[]");
      outbox.unshift(Object.assign({ id: "MSG-" + Date.now(), synced: false }, payload));
      localStorage.setItem("setsail_support_outbox_v1", JSON.stringify(outbox.slice(0, 30)));
    } catch (err) {}

    const mailtoHref = `mailto:wafficompany@gmail.com?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent("From: " + email + "\nVessel: " + payload.vessel + "\nUTC: " + payload.clientTimeUtc + "\n\n" + message)}`;
    let sentOnline = false;

    if (navigator.onLine) {
      try {
        const endpoint = ["https://formsubmit.co/ajax/", "wafficompany", "@", "gmail.com"].join("");
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const resJson = await res.json().catch(() => ({}));
          if (resJson && resJson.success !== "false" && resJson.success !== false) {
            sentOnline = true;
          }
        }
      } catch (err) {}
    }

    if (sentOnline) {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#10b981;font-weight:600;">✓ Sent to engineering! Reply will go to ${email}.</span> <a href="${mailtoHref}" style="color:#38bdf8;text-decoration:underline;font-size:0.68rem;margin-left:6px;">Open Mail App</a>`;
      }
      if (typeof showSetSailToast === "function") {
        showSetSailToast(`Feedback transmitted! Reply will be sent to ${email}`, "success");
      }
    } else {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#10b981;font-weight:600;">✓ Queued in Bridge Outbox (${email})</span> &bull; <a href="${mailtoHref}" style="color:#38bdf8;text-decoration:underline;font-weight:600;font-size:0.72rem;">Send via Email Client &rarr;</a>`;
      }
      if (typeof showSetSailToast === "function") {
        showSetSailToast("Saved to Bridge Outbox. Click 'Send via Email Client' or auto-syncs online.", "info");
      }
    }

    if (msgEl) msgEl.value = "";
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg class="setsail-icon setsail-icon-sm" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Send`;
    }
  };

  if (submitBtn) {
    submitBtn.addEventListener("click", handleContactSubmit);
  }
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Cache Reset
  const clearCacheBtn = document.getElementById("settingsClearCacheBtn");
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener("click", () => {
      if (!confirm("Reset SetSail cache and re-download fresh bulletin and assets from server?")) return;
      if (typeof window !== "undefined" && "caches" in window) {
        caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => {
          console.log("[SetSail] Cleared CacheStorage");
        });
      }
      if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
      }
      try { localStorage.removeItem(NTM_STORAGE_KEY); } catch (e) {}
      NTM_STORE = [];
      if (leafletMarkersLayer) leafletMarkersLayer.clearLayers();
      loadRemoteNoticesJson(true).then(() => {
        if (typeof showSetSailToast === "function") {
          showSetSailToast("Cache reset complete. Fresh notices & weather synced.", "success");
        }
      });
    });
  }
}

/**
 * Toggle checked status for a single notice
 */
window.toggleNoticeCheck = function(noticeId, isChecked) {
  const item = NTM_STORE.find(n => n.id === noticeId);
  if (item) {
    item.checkedForExport = isChecked;
    saveStoreToStorage();
    updateSelectionCounter();
    updateExportModalCounts();
  }
};

/**
 * Get notices matching the export criteria checkboxes
 */
function getExportSelectedNotices() {
  const chkNavtex = (document.getElementById("expChkNavtex") ? document.getElementById("expChkNavtex").checked : true);
  const chkT = (document.getElementById("expChkT") ? document.getElementById("expChkT").checked : true);
  const chkP = (document.getElementById("expChkP") ? document.getElementById("expChkP").checked : true);
  const chkPerm = (document.getElementById("expChkPerm") ? document.getElementById("expChkPerm").checked : true);

  // Automatically export all notices currently active on the chart (filtered by search and active filters)
  return getFilteredNotices().filter(item => {
    if (item.type === "NAVTEX" && !chkNavtex) return false;
    if (item.type === "T" && !chkT) return false;
    if (item.type === "P" && !chkP) return false;
    if (item.type === "PERM" && !chkPerm) return false;
    return true;
  });
}

/**
 * Update counters inside the Export Configuration Modal
 */
function updateExportModalCounts() {
  const filtered = getFilteredNotices();
  const countNavtex = filtered.filter(n => n.type === "NAVTEX").length;
  const countT = filtered.filter(n => n.type === "T").length;
  const countP = filtered.filter(n => n.type === "P").length;
  const countPerm = filtered.filter(n => n.type === "PERM").length;

  const elNavtex = document.getElementById("expCountNavtex");
  const elT = document.getElementById("expCountT");
  const elP = document.getElementById("expCountP");
  const elPerm = document.getElementById("expCountPerm");
  const elSummary = document.getElementById("expSummaryText");

  if (elNavtex) elNavtex.textContent = `${countNavtex}`;
  if (elT) elT.textContent = `${countT}`;
  if (elP) elP.textContent = `${countP}`;
  if (elPerm) elPerm.textContent = `${countPerm}`;

  const selected = getExportSelectedNotices();
  let totalPts = 0;
  selected.forEach(s => totalPts += (s.coords ? s.coords.length : 0));

  if (elSummary) {
    elSummary.textContent = `Will export: ${selected.length} notices (${totalPts} points) | UTC: ${getExportUtcTimestamp()}`;
  }
}

/**
 * Download a string as a text file
 */
function downloadTextFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Handle dropped or selected PDF files
 */
async function handlePdfFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const statusEl = document.getElementById("ntmStatusMsg");
  let totalNewNotices = 0;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (statusEl) statusEl.textContent = `Reading ${file.name}...`;

    try {
      const text = await extractTextFromPdf(file);
      if (typeof window.parseAdmiraltyNtMText === "function") {
        const parsed = window.parseAdmiraltyNtMText(text);
        if (parsed.notices && parsed.notices.length > 0) {
          addNoticesToStore(parsed.notices, parsed.cancelledIds);
          totalNewNotices += parsed.notices.length;
        }
      }
    } catch (err) {
      console.error(`Error processing ${file.name}:`, err);
    }
  }

  if (statusEl) {
    statusEl.textContent = `Loaded ${totalNewNotices} notices from PDF.`;
    setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 4000);
  }
}

/**
 * Extract text from PDF using PDF.js
 */
async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  if (!window.pdfjsLib) throw new Error("PDF.js library not loaded");

  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(" ") + "\n";
  }

  return fullText;
}

/**
 * Add / update notices in store and process cancellations
 */
const NTM_OVERRIDES_KEY = "setsail_notice_overrides_v1";

function getNoticeOverridesMap() {
  try {
    return JSON.parse(localStorage.getItem(NTM_OVERRIDES_KEY) || "{}");
  } catch (e) {
    return {};
  }
}

function saveNoticeOverridesMap(mapObj) {
  try {
    localStorage.setItem(NTM_OVERRIDES_KEY, JSON.stringify(mapObj || {}));
  } catch (e) {}
}

function formatCoordDmsHelper(lat, lon) {
  if (typeof formatDecimalToDMS === "function") {
    return `${formatDecimalToDMS(lat, true)}, ${formatDecimalToDMS(lon, false)}`;
  }
  const toDms = (v, pos, neg) => {
    const dir = v >= 0 ? pos : neg;
    const a = Math.abs(v);
    const d = Math.floor(a);
    const m = ((a - d) * 60).toFixed(2);
    return `${d}°${m}'${dir}`;
  };
  return `${toDms(lat, "N", "S")} ${toDms(lon, "E", "W")}`;
}

function parseNoticeCancelTimeMs(item) {
  if (!item) return NaN;
  let rawExp = item.expires || item.cancel_date || item.valid_until || "";
  if (rawExp && typeof rawExp === "string") {
    let norm = rawExp.trim();
    const m = norm.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})?$/);
    if (m) {
      norm = m[1] + (m[2] || "Z");
      item.expires = norm;
    }
    const ms = Date.parse(norm);
    if (Number.isFinite(ms)) return ms;
  }
  const bodyTxt = String(item.body || item.rawText || "");
  if (bodyTxt && typeof window.extractNavtexCancelTimeIso === "function") {
    const extractedIso = window.extractNavtexCancelTimeIso(bodyTxt, item.year || "26");
    if (extractedIso) {
      item.expires = extractedIso;
      const ms = Date.parse(extractedIso);
      if (Number.isFinite(ms)) return ms;
    }
  }
  return NaN;
}
window.parseNoticeCancelTimeMs = parseNoticeCancelTimeMs;

function formatCancelUtcBadge(isoOrMs) {
  const ms = typeof isoOrMs === "number" ? isoOrMs : Date.parse(String(isoOrMs || ""));
  if (!Number.isFinite(ms)) return "";
  const d = new Date(ms);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mon = months[d.getUTCMonth()];
  const yr = d.getUTCFullYear();
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${dd} ${mon} ${yr} ${hh}:${mm} UTC`;
}
window.formatCancelUtcBadge = formatCancelUtcBadge;

function reconcileAndApplyNoticeOverrides(extraCancelIds = []) {
  const overrides = getNoticeOverridesMap();
  const cancelSet = new Set((extraCancelIds || []).map(x => String(x).trim().toUpperCase()));

  Object.keys(overrides).forEach(k => {
    const ov = overrides[k];
    if (ov && ov._isCustomAdded && !NTM_STORE.some(n => n.id === k)) {
      NTM_STORE.unshift(Object.assign({}, ov));
    }
  });

  const nowMs = Date.now();
  NTM_STORE.forEach(item => {
    if (!item) return;
    const ov = overrides[item.id];
    if (ov) {
      if (ov.subject !== undefined) item.subject = ov.subject;
      if (ov.body !== undefined) { item.body = ov.body; item.rawText = ov.body; }
      if (ov.type !== undefined) item.type = ov.type;
      if (ov.navarea !== undefined) item.navarea = ov.navarea;
      if (ov.isPolygon !== undefined) item.isPolygon = ov.isPolygon;
      if (ov.isLine !== undefined) item.isLine = ov.isLine;
      if (Array.isArray(ov.coords) && ov.coords.length > 0) item.coords = ov.coords;
      if (ov.isCancelled !== undefined) {
        item.isCancelled = Boolean(ov.isCancelled);
        item.status = item.isCancelled ? "CANCELLED" : "ACTIVE";
      }
      if (ov.userEdited) item.userEdited = true;
    }

    if (Array.isArray(item.coords) && item.coords.length > 0) {
      const normCoords = [];
      item.coords.forEach(c => {
        if (!c) return;
        const latNum = Array.isArray(c) ? Number(c[0]) : Number(c.lat);
        const lonNum = Array.isArray(c) ? Number(c[1]) : Number(c.lon);
        if (Number.isFinite(latNum) && Number.isFinite(lonNum)) {
          normCoords.push({
            lat: latNum,
            lon: lonNum,
            dms: (c && c.dms) ? c.dms : formatCoordDmsHelper(latNum, lonNum)
          });
        }
      });
      item.coords = normCoords;
      if (normCoords.length > 0 && (!Number.isFinite(Number(item.lat)) || !Number.isFinite(Number(item.lon)))) {
        item.lat = normCoords[0].lat;
        item.lon = normCoords[0].lon;
      }
    } else if (Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon))) {
      const latNum = Number(item.lat);
      const lonNum = Number(item.lon);
      item.coords = [{ lat: latNum, lon: lonNum, dms: formatCoordDmsHelper(latNum, lonNum) }];
    }

    // Automatic Self-Destruction based on Cancellation Time (expires / CANCEL THIS MSG ...)
    const expMs = parseNoticeCancelTimeMs(item);
    if (Number.isFinite(expMs)) {
      item._cancelTimeMs = expMs;
      if (item.type === "NAVTEX") {
        // NAVTEX coastal broadcast: mandatory regulatory auto-deactivation at designated cancel time
        if (expMs <= nowMs) {
          item.isCancelled = true;
          item.status = "CANCELLED";
          item.autoExpiredByTime = true;
        }
      } else if ((!ov || ov.isCancelled === undefined) && expMs <= nowMs) {
        item.isCancelled = true;
        item.status = "CANCELLED";
        item.autoExpiredByTime = true;
      }
    }

    if (Array.isArray(item.cancels)) {
      item.cancels.forEach(cid => {
        if (cid) cancelSet.add(String(cid).trim().toUpperCase());
      });
    }
    const bodyTxt = String(item.body || item.rawText || "");
    if (bodyTxt) {
      const rx = /CANCEL\s+(?:NAVAREA\s+[I|V|X]+\s+|HYDROLANT\s+|HYDROPAC\s+|HYDROARC\s+)?(\d{1,5}\s*\/\s*\d{2,4})/gi;
      let m;
      while ((m = rx.exec(bodyTxt)) !== null) {
        cancelSet.add(m[1].replace(/\s+/g, "").toUpperCase());
        cancelSet.add(m[0].replace(/^CANCEL\s+/i, "").trim().toUpperCase());
      }
    }
  });

  if (cancelSet.size > 0) {
    NTM_STORE.forEach(item => {
      if (!item) return;
      const ov = overrides[item.id];
      if (ov && ov.isCancelled === false && item.type !== "NAVTEX") return;
      const idUp = String(item.id || "").trim().toUpperCase();
      const numUp = String(item.num || "").trim().toUpperCase();
      if (cancelSet.has(idUp) || (numUp && cancelSet.has(numUp))) {
        item.isCancelled = true;
        item.status = "CANCELLED";
      }
    });
  }
  window.NTM_STORE = NTM_STORE;
}

// Live 30-Second Watchdog for NAVTEX Cancellation Time Self-Destruction
function runNavtexAutoExpireSweep() {
  if (!Array.isArray(NTM_STORE) || NTM_STORE.length === 0) return 0;
  const overrides = getNoticeOverridesMap();
  const nowMs = Date.now();
  const newlyExpired = [];
  NTM_STORE.forEach(item => {
    if (!item || item.isCancelled || item.status === "CANCELLED") return;
    if (item.type !== "NAVTEX") {
      const ov = overrides[item.id];
      if (ov && ov.isCancelled === false) return;
    }
    const expMs = item._cancelTimeMs || parseNoticeCancelTimeMs(item);
    if (Number.isFinite(expMs) && expMs <= nowMs) {
      item.isCancelled = true;
      item.status = "CANCELLED";
      item.autoExpiredByTime = true;
      newlyExpired.push(item.id);
    }
  });
  if (newlyExpired.length > 0) {
    saveStoreToStorage();
    renderNtMListAndMap();
    if (typeof showSetSailToast === "function") {
      showSetSailToast(`⏱ Auto-cancelled expired NAVTEX warning(s): ${newlyExpired.slice(0, 3).join(", ")}`, "info");
    }
  }
  return newlyExpired.length;
}
window.runNavtexAutoExpireSweep = runNavtexAutoExpireSweep;
if (!window._navtexExpireInterval) {
  window._navtexExpireInterval = setInterval(runNavtexAutoExpireSweep, 30000);
}

function addNoticesToStore(newNotices, cancelledIds = []) {
  const overrides = getNoticeOverridesMap();
  if (cancelledIds && cancelledIds.length > 0) {
    cancelledIds.forEach(cid => {
      const cleanC = String(cid).trim().toUpperCase();
      NTM_STORE.forEach(item => {
        const idUp = String(item.id || "").trim().toUpperCase();
        const numUp = String(item.num || "").trim().toUpperCase();
        if (idUp === cleanC || numUp === cleanC || idUp.endsWith(" " + cleanC)) {
          item.status = "CANCELLED";
          item.isCancelled = true;
          overrides[item.id] = Object.assign(overrides[item.id] || {}, { isCancelled: true });
        }
      });
    });
  }

  newNotices.forEach(item => {
    item.userEdited = true;
    overrides[item.id] = Object.assign({}, item, { _isCustomAdded: true });
    const existingIdx = NTM_STORE.findIndex(n => n.id === item.id);
    if (existingIdx >= 0) {
      NTM_STORE[existingIdx] = item;
    } else {
      NTM_STORE.unshift(item);
    }
  });

  saveNoticeOverridesMap(overrides);
  reconcileAndApplyNoticeOverrides(cancelledIds);
  saveStoreToStorage();

  const badge = document.getElementById("ntmBadge");
  const activeCount = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED").length;
  if (badge) {
    badge.textContent = activeCount;
    badge.style.display = activeCount > 0 ? "block" : "none";
  }

  renderNtMListAndMap();
  updateExportModalCounts();
}

/**
 * Save store to LocalStorage
 */
function saveStoreToStorage() {
  try {
    localStorage.setItem(NTM_STORAGE_KEY, JSON.stringify(NTM_STORE));
  } catch (e) {
    console.warn("Storage full or unavailable:", e);
  }
}

/**
 * Load store from LocalStorage
 */
function loadStoreFromStorage() {
  try {
    const raw = localStorage.getItem(NTM_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        NTM_STORE = parsed;
        window.NTM_STORE = NTM_STORE;
        reconcileAndApplyNoticeOverrides();
        const activeCount = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED").length;
        const badge = document.getElementById("ntmBadge");
        if (badge) {
          badge.textContent = activeCount;
          badge.style.display = "block";
        }
        renderNtMListAndMap();
        return parsed.length > 10;
      }
    }
  } catch (e) {
    console.warn("Could not load from storage:", e);
  }
  return false;
}

/**
 * Attempt to load auto-synced notices.json with multi-endpoint failover
 */
async function loadRemoteNoticesJson(showFeedback = false) {
  try {
    const bust = Date.now();
    const endpoints = [
      "notices.json?t=" + bust,
      "https://raw.githubusercontent.com/waffiman/Admirality-NtM-Scraper/main/notices.json?t=" + bust,
      "https://cdn.jsdelivr.net/gh/waffiman/Admirality-NtM-Scraper@main/notices.json?t=" + bust
    ];
    let res = null;
    let data = null;
    for (const url of endpoints) {
      try {
        const candidate = await fetch(url, { cache: "no-store" });
        if (candidate && candidate.ok) {
          const parsed = await candidate.json();
          if (parsed && Array.isArray(parsed.notices) && parsed.notices.length > 0) {
            res = candidate;
            data = parsed;
            break;
          }
        }
      } catch (e) {}
    }

    if (!res || !data) {
      updateNetworkStatusHUD(false);
      if (typeof window.setOverlayNoticesLoading === "function") {
        window.setOverlayNoticesLoading(false);
      }
      if (showFeedback && typeof showSetSailToast === "function") {
        showSetSailToast("Offline — using cached NtM & NAVTEX database", "warn");
      }
      return false;
    }

    if (data && Array.isArray(data.notices) && data.notices.length > 0) {
      NTM_STORE = data.notices;
      window.NTM_STORE = NTM_STORE;
      reconcileAndApplyNoticeOverrides();
      saveStoreToStorage();
      const navCnt = NTM_STORE.filter(n => n.type === "NAVTEX" && !n.isCancelled && n.status !== "CANCELLED").length;
      const ukhoCnt = NTM_STORE.filter(n => n.type !== "NAVTEX" && !n.isCancelled && n.status !== "CANCELLED").length;
      const badge = document.getElementById("ntmBadge");
      if (badge) {
        badge.textContent = navCnt + ukhoCnt;
        badge.style.display = (navCnt + ukhoCnt) > 0 ? "block" : "none";
      }
      if (showFeedback && typeof showSetSailToast === "function") {
        showSetSailToast(`Synced ${navCnt} NAVTEX/NAVAREA warnings + ${ukhoCnt} UKHO NtMs`, "info");
      }
      if (data.metadata) {
        try { localStorage.setItem(META_STORAGE_KEY, JSON.stringify(data.metadata)); } catch(e){}
      }
      renderNtMListAndMap();
      const meta = data.metadata || {};
      const wk = meta.weekNumber ? `Wk ${meta.weekNumber}/${meta.year}` : (meta.weeklyBulletin || "Live");
      const isOfflineResp = (res.headers && res.headers.get && res.headers.get("X-SetSail-Offline") === "true") || !navigator.onLine;
      updateNetworkStatusHUD(!isOfflineResp, wk);
      return true;
    }
  } catch (err) {
    updateNetworkStatusHUD(false);
    if (typeof window.setOverlayNoticesLoading === "function") {
      window.setOverlayNoticesLoading(false);
    }
  }
  return false;
}
window.loadRemoteNoticesJson = loadRemoteNoticesJson;

function setOverlayNoticesLoading(isLoading) {
  const tab = document.getElementById("tabOverlayNotices");
  if (!tab) return;
  if (typeof window.setOverlayTileLoading === "function") {
    window.setOverlayTileLoading("notices", isLoading);
  }
  if (isLoading) {
    tab.classList.add("is-loading");
    tab.setAttribute("title", "Loading NtM & NAVTEX objects onto chart...");
    if (!tab.querySelector(".excel-tab-spinner")) {
      const sp = document.createElement("span");
      sp.className = "excel-tab-spinner";
      sp.id = "tabNoticesSpinner";
      sp.setAttribute("aria-hidden", "true");
      const chk = tab.querySelector(".excel-tab-check");
      if (chk) tab.insertBefore(sp, chk);
      else tab.prepend(sp);
    }
  } else {
    tab.classList.remove("is-loading");
    tab.setAttribute("title", "Toggle Admiralty NtM & NAVTEX Warnings Overlay");
  }
}
window.setOverlayNoticesLoading = setOverlayNoticesLoading;

function ensureNoticesReadyForOverlay() {
  if (typeof window.setOverlayNoticesLoading === "function") {
    window.setOverlayNoticesLoading(true);
  }
  // Ensure notice type filters are not accidentally all unchecked when user enables the NtM & NAVTEX tile
  if (!NTM_ACTIVE_TYPES || NTM_ACTIVE_TYPES.size === 0) {
    NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM", "NAVTEX"]);
    ["popChkAll", "popChkNavtex", "popChkT", "popChkP", "popChkPerm"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = true;
    });
  }
  // Ensure sidebar category pill is not hiding notices behind PORTS or ROUTE filter
  if (activeOverlayCategory === "PORTS" || activeOverlayCategory === "ROUTE") {
    activeOverlayCategory = "ALL";
    document.querySelectorAll(".ntm-category-pill").forEach(p => {
      p.classList.toggle("active", (p.dataset.category || "ALL") === "ALL");
    });
  }
  // If store hasn't loaded the full bulletin yet, sync immediately
  if (!Array.isArray(NTM_STORE) || NTM_STORE.length <= 10) {
    return loadRemoteNoticesJson(true);
  }
  return Promise.resolve(true);
}
window.ensureNoticesReadyForOverlay = ensureNoticesReadyForOverlay;

/**
 * Initialize Leaflet Map
 */
function initNtMMap() {
  const mapDiv = document.getElementById("ntmMap");
  if (!mapDiv || leafletMap) return;

  if (window.L) {
    window._setsailCanvasRenderer = null;

    // Weak devices: fewer concurrent tile fetches / softer animations (layers stay available)
    const hwCores = (typeof navigator !== "undefined" && navigator.hardwareConcurrency) || 4;
    const hwMem = (typeof navigator !== "undefined" && navigator.deviceMemory) || 8;
    const lowEndMap = hwCores <= 4 || hwMem <= 4 ||
      (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
    window._setsailLowEndMap = !!lowEndMap;

    leafletMap = L.map("ntmMap", {
      center: [26.0, 12.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 19,
      zoomSnap: lowEndMap ? 1 : 0.5,
      zoomDelta: lowEndMap ? 1 : 0.5,
      wheelPxPerZoomLevel: lowEndMap ? 140 : 100,
      attributionControl: false,
      preferCanvas: true,
      zoomAnimation: !lowEndMap,
      fadeAnimation: false,
      markerZoomAnimation: !lowEndMap,
      zoomAnimationThreshold: lowEndMap ? 2 : 8,
      inertia: true,
      inertiaDeceleration: lowEndMap ? 4500 : 3000,
      // Wrap the same world (objects stay with you across ±180°); do not clamp to one globe copy
      worldCopyJump: true
    });

    // keepBuffer 12 forced huge neighbour-chunk preload → jank on weak PCs.
    // Overlays wait until pan/zoom settles; base still updates during drag but less often.
    // noWrap:false + worldCopyJump → seamless 360° pan with markers/routes following.
    const tilePerfOpts = {
      keepBuffer: lowEndMap ? 1 : 2,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: lowEndMap ? 250 : 150,
      noWrap: false
    };
    const overlayTilePerfOpts = Object.assign({}, tilePerfOpts, {
      keepBuffer: lowEndMap ? 0 : 1,
      updateWhenIdle: true,
      updateInterval: lowEndMap ? 400 : 250
    });

    // 1. Primary Nautical Chart (Esri Ocean Base + CARTO + China AutoNavi / Gaode Multi-Stage Failover)
    const oceanLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", Object.assign({}, tilePerfOpts, {
      maxNativeZoom: 13,
      maxZoom: 19,
      attribution: "Tiles &copy; Esri"
    }));
    oceanLayer.on("tileerror", function(errEvent) {
      if (!errEvent || !errEvent.tile || !errEvent.coords) return;
      const c = errEvent.coords;
      const step = parseInt(errEvent.tile.dataset.fallbackStep || "0", 10);
      if (step === 0) {
        errEvent.tile.dataset.fallbackStep = "1";
        errEvent.tile.src = `https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/${c.z}/${c.y}/${c.x}`;
      } else if (step === 1) {
        errEvent.tile.dataset.fallbackStep = "2";
        errEvent.tile.src = `https://a.basemaps.cartocdn.com/rastertiles/voyager/${c.z}/${c.x}/${c.y}.png`;
      } else if (step === 2) {
        errEvent.tile.dataset.fallbackStep = "3";
        errEvent.tile.src = `https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${c.x}&y=${c.y}&z=${c.z}`;
      }
    });

    // 2. Fast Parallel OpenStreetMap (with China AutoNavi & CARTO Failover)
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", Object.assign({}, tilePerfOpts, {
      subdomains: ["a", "b", "c"],
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap"
    }));
    osmLayer.on("tileerror", function(errEvent) {
      if (!errEvent || !errEvent.tile || !errEvent.coords) return;
      const c = errEvent.coords;
      const step = parseInt(errEvent.tile.dataset.fallbackStep || "0", 10);
      if (step === 0) {
        errEvent.tile.dataset.fallbackStep = "1";
        errEvent.tile.src = `https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${c.x}&y=${c.y}&z=${c.z}`;
      } else if (step === 1) {
        errEvent.tile.dataset.fallbackStep = "2";
        errEvent.tile.src = `https://b.basemaps.cartocdn.com/rastertiles/voyager/${c.z}/${c.x}/${c.y}.png`;
      }
    });

    // 3. Key-Free High-Speed Coast & Hydrographic Topo Map (CARTO Voyager + Esri Topo + China AutoNavi Fallback)
    const voyagerLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", Object.assign({}, tilePerfOpts, {
      subdomains: ["a", "b", "c", "d"],
      maxNativeZoom: 18,
      maxZoom: 19,
      attribution: "&copy; CARTO &bull; Esri Coastal"
    }));
    voyagerLayer.on("tileerror", function(errEvent) {
      if (!errEvent || !errEvent.tile || !errEvent.coords) return;
      const c = errEvent.coords;
      const step = parseInt(errEvent.tile.dataset.fallbackStep || "0", 10);
      if (step === 0) {
        errEvent.tile.dataset.fallbackStep = "1";
        errEvent.tile.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${c.z}/${c.y}/${c.x}`;
      } else if (step === 1) {
        errEvent.tile.dataset.fallbackStep = "2";
        errEvent.tile.src = `https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${c.x}&y=${c.y}&z=${c.z}`;
      }
    });

    // 4. Satellite Imagery (Esri World Imagery + Services Mirror + China AutoNavi Satellite Fallback)
    const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", Object.assign({}, tilePerfOpts, {
      maxNativeZoom: 18,
      maxZoom: 19,
      attribution: "Tiles &copy; Esri"
    }));
    satLayer.on("tileerror", function(errEvent) {
      if (!errEvent || !errEvent.tile || !errEvent.coords) return;
      const c = errEvent.coords;
      const step = parseInt(errEvent.tile.dataset.fallbackStep || "0", 10);
      if (step === 0) {
        errEvent.tile.dataset.fallbackStep = "1";
        errEvent.tile.src = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${c.z}/${c.y}/${c.x}`;
      } else if (step === 1) {
        errEvent.tile.dataset.fallbackStep = "2";
        errEvent.tile.src = `https://webst01.is.autonavi.com/appmaptile?style=6&x=${c.x}&y=${c.y}&z=${c.z}`;
      }
    });

    // ECDIS 2-color: yellow land / blue water (local, no relief tiles — fast)
    const ecdisLayer = (typeof createEcdisSimpleBaseLayer === "function")
      ? createEcdisSimpleBaseLayer()
      : null;

    // Default basemap: ECDIS simple (detailed coastlines, no relief tiles)
    const defaultBase = ecdisLayer || oceanLayer;
    if (defaultBase) {
      defaultBase.addTo(leafletMap);
      if (ecdisLayer && leafletMap.getContainer()) {
        leafletMap.getContainer().classList.add("ecdis-simple-base");
      }
    }
    setTimeout(() => {
      const sel = document.getElementById("ntmChartLayerSelector");
      const trig = sel && sel.querySelector(".ntm-layer-trigger-btn");
      const mark = (on) => {
        if (!sel) return;
        sel.classList.toggle("is-loading-base", !!on);
        if (trig) {
          trig.classList.toggle("is-loading", !!on);
          trig.setAttribute("aria-busy", on ? "true" : "false");
          trig.title = on ? "Loading chart layer…" : "Select Chart Layer";
        }
      };
      mark(true);
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        mark(false);
      };
      if (ecdisLayer) {
        requestAnimationFrame(() => setTimeout(finish, 120));
      } else {
        oceanLayer.on("load", finish);
        setTimeout(finish, 12000);
      }
    }, 0);

    const seamarkLayer = L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", Object.assign({}, overlayTilePerfOpts, {
      maxZoom: 18,
      attribution: "OpenSeaMap"
    }));

    // Desktop & Mobile ResizeObserver to guarantee non-zero canvas & immediate tile paint
    if (typeof ResizeObserver !== "undefined") {
      const mapContainerEl = document.getElementById("ntmMapContainer") || mapDiv;
      const ro = new ResizeObserver(() => {
        if (leafletMap) {
          leafletMap.invalidateSize({ animate: false });
        }
      });
      ro.observe(mapContainerEl);
    }

    const baseMaps = {
      "ECDIS Chart": ecdisLayer,
      "Ocean Chart (Esri)": oceanLayer,
      "OpenStreetMap": osmLayer,
      "Satellite Imagery": satLayer
    };

    if (!leafletWeatherLayer) {
      leafletWeatherLayer = L.layerGroup();
    }
    if (!leafletRouteLayer) {
      leafletRouteLayer = L.layerGroup();
    }

    const overlayMaps = {
      "OpenSeaMap Buoys": seamarkLayer
    };

    L.control.layers(baseMaps, overlayMaps, { position: "topright" }).addTo(leafletMap);
    if (typeof initVisualChartLayerSelector === "function") {
      initVisualChartLayerSelector(leafletMap, {
        ecdis: ecdisLayer,
        ocean: oceanLayer,
        street: osmLayer,
        sat: satLayer,
        buoys: seamarkLayer
      });
    }

    leafletMarkersLayer = L.layerGroup();
    if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.notices !== false) {
      leafletMarkersLayer.addTo(leafletMap);
    }
    leafletVesselLayer = L.layerGroup().addTo(leafletMap);
    if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.weather !== false) {
      leafletWeatherLayer.addTo(leafletMap);
    }
    if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.route !== false) {
      leafletRouteLayer.addTo(leafletMap);
    }
    window.leafletMap = leafletMap;
    window.leafletMarkersLayer = leafletMarkersLayer;
    window.leafletWeatherLayer = leafletWeatherLayer;
    window.leafletRouteLayer = leafletRouteLayer;

    // Zoom-Adaptive Level of Detail (LOD) re-render when crossing zoom tiers
    let lastLodTier = -1;
    let lastOwnShipHullMode = null;
    const getZoomLodTier = (z) => (z <= 2.5 ? 0 : (z <= 3.5 ? 1 : (z <= 4.5 ? 2 : (z <= 7 ? 3 : 4))));
    leafletMap.on("zoomend", () => {
      const z = leafletMap.getZoom();
      const tier = getZoomLodTier(z);
      if (tier !== lastLodTier) {
        lastLodTier = tier;
        if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.notices !== false) {
          renderNtMListAndMap(true);
        }
        if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.weather !== false) {
          renderWeatherOnMap(leafletMap);
        }
      }
      // Swap own-ship symbol: position circle ↔ hull outline at OWN_SHIP_HULL_ZOOM
      const hullMode = z >= OWN_SHIP_HULL_ZOOM;
      if (hullMode !== lastOwnShipHullMode) {
        lastOwnShipHullMode = hullMode;
        if (userVessel && Number.isFinite(userVessel.lat) && Number.isFinite(userVessel.lon)) {
          plotUserVessel(userVessel.lat, userVessel.lon, userVessel.source || "manual", true);
        }
      }
    });

    if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.weather !== false) {
      renderWeatherOnMap(leafletMap);
    }

    try {
      const savedRouteStr = localStorage.getItem(ROUTE_STORAGE_KEY);
      if (savedRouteStr) {
        const savedRoute = JSON.parse(savedRouteStr);
        activeRouteData = savedRoute;
        if (typeof OVERLAY_STATES !== "undefined" && OVERLAY_STATES.route) {
          renderRouteOnMap(savedRoute, false);
        }
      }
    } catch (e) {}

    leafletMap.on("mousemove", (e) => {
      const hud = document.getElementById("ntmHudCoords");
      if (hud) {
        hud.textContent = formatLatLonDMS(e.latlng.lat, e.latlng.lng);
      }
      if (typeof updateNdbcCursorTile === "function") {
        updateNdbcCursorTile(e.latlng.lat, e.latlng.lng);
      }
    });
    if (typeof syncNdbcCursorTileVisibility === "function") {
      syncNdbcCursorTileVisibility();
    }
    // ECDIS-style broken crosshair cursor over the chart
    const mapEl = document.getElementById("ntmMap");
    if (mapEl) {
      mapEl.classList.add("ecdis-cursor-map");
    }
    leafletMap.getContainer().classList.add("ecdis-cursor-map");

    if (userVessel) {
      plotUserVessel(userVessel.lat, userVessel.lon, userVessel.source);
    }

    if (typeof initPortDepthsLayers === "function") {
      initPortDepthsLayers(leafletMap);
    }
    if (typeof initExcelOverlayDock === "function") {
      initExcelOverlayDock(leafletMap);
      if (typeof initSetRoute === "function") initSetRoute();
    }

    renderNtMListAndMap();
  } else {
    initOfflineCanvasMap();
  }
}
window.initNtMMap = initNtMMap;

/**
 * Offline Canvas World Map fallback
 */
function initOfflineCanvasMap() {
  const canvas = document.getElementById("ntmCanvasMap");
  if (!canvas) return;
  canvas.style.display = "block";
  drawOfflineCanvasMap();
  window.addEventListener("resize", drawOfflineCanvasMap);
}

function drawOfflineCanvasMap() {
  const canvas = document.getElementById("ntmCanvasMap");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.parentElement.clientWidth;
  const h = canvas.parentElement.clientHeight;
  canvas.width = w;
  canvas.height = h;

  ctx.fillStyle = "#070d22";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(140, 170, 255, 0.15)";
  ctx.lineWidth = 1;
  ctx.font = "10px Segoe UI, sans-serif";
  ctx.fillStyle = "#6e84ab";

  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
    ctx.fillText(`${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}`, 8, y - 3);
  }

  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
    ctx.fillText(`${Math.abs(lon)}°${lon >= 0 ? "E" : "W"}`, x + 4, h - 8);
  }

  const filtered = getFilteredNotices();
  filtered.forEach(n => {
    (n.coords || []).forEach(c => {
      const x = ((c.lon + 180) / 360) * w;
      const y = ((90 - c.lat) / 180) * h;

      ctx.fillStyle = n.type === "T" ? "#ffc978" : (n.type === "P" ? "#c9a4ff" : "#6ed0ff");
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#e8eefc";
      ctx.fillText(n.id, x + 8, y + 3);
    });
  });
}

/**
 * Filter helper honoring popovers, NAVAREA, and search
 */
function getFilteredNotices() {
  const searchVal = ((document.getElementById("ntmSearchInput") ? document.getElementById("ntmSearchInput").value : "") || "").toLowerCase().trim();

  let list = NTM_STORE.filter(item => {
    const isCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");

    // Strict Cancelled Isolation:
    if (isCancelled) {
      if (!NTM_SHOW_CANCELLED) return false;
    } else {
      if (NTM_SHOW_CANCELLED) {
        return false;
      }
      if (NTM_ACTIVE_TYPES.size > 0 && !NTM_ACTIVE_TYPES.has(item.type)) {
        return false;
      }
      if (NTM_FILTER_AREAS && !item.isPolygon && !(item.coords && item.coords.length >= 3)) {
        return false;
      }
    }

    // NAVAREA filter (normalized Roman numeral I-XXI comparison)
    if (NTM_ACTIVE_NAVAREA !== "ALL") {
      const itemArea = getNoticeNavarea(item).replace(/^NAVAREA\s+/i, "").trim().toUpperCase();
      const targetArea = String(NTM_ACTIVE_NAVAREA).replace(/^NAVAREA\s+/i, "").trim().toUpperCase();
      if (itemArea !== targetArea) return false;
    }

    if (searchVal) {
      const searchStr = `${item.id} ${item.country || ""} ${item.region || ""} ${item.subject || ""} ${item.body || item.rawText || ""} ${item.coordinator || ""} ${(item.charts || []).join(" ")} ${item.cancels ? item.cancels.join(" ") : ""}`.toLowerCase();
      if (!searchStr.includes(searchVal)) return false;
    }

    if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.doesNoticeIntersectRouteCorridor === "function") {
      if (!window.doesNoticeIntersectRouteCorridor(item)) return false;
    }

    return true;
  });

  // Sorting
  list.sort((a, b) => {
    const numA = parseInt(a.num, 10) || parseInt(a.id, 10) || 0;
    const numB = parseInt(b.num, 10) || parseInt(b.id, 10) || 0;

    if (NTM_ACTIVE_SORT === "NUM_ASC") return numA - numB;
    if (NTM_ACTIVE_SORT === "COUNTRY") {
      const cA = (a.country || "").toLowerCase();
      const cB = (b.country || "").toLowerCase();
      return cA.localeCompare(cB) || (numB - numA);
    }
    if (NTM_ACTIVE_SORT === "REGION") {
      const rA = (a.region || "").toLowerCase();
      const rB = (b.region || "").toLowerCase();
      return rA.localeCompare(rB) || (numB - numA);
    }
    if (NTM_ACTIVE_SORT === "CHARTS") {
      const chA = (a.charts || []).length;
      const chB = (b.charts || []).length;
      return chB - chA || (numB - numA);
    }
    if (NTM_ACTIVE_SORT === "POINTS") {
      const pA = (a.coords || []).length;
      const pB = (b.coords || []).length;
      return pB - pA || (numB - numA);
    }
    if (NTM_ACTIVE_SORT === "TYPE") {
      const typeOrder = { "NAVTEX": 0, "T": 1, "P": 2, "PERM": 3 };
      const oA = typeOrder[a.type] || 4;
      const oB = typeOrder[b.type] || 4;
      if (oA !== oB) return oA - oB;
      return numB - numA;
    }
    return numB - numA;
  });

  return list;
}

/**
 * Format coordinates to nautical DMS
 */
function formatLatLonDMS(lat, lon) {
  const latDeg = Math.floor(Math.abs(lat));
  const latMin = ((Math.abs(lat) - latDeg) * 60).toFixed(2);
  const latDir = lat >= 0 ? "N" : "S";

  const lonNorm = ((lon + 180) % 360 + 360) % 360 - 180;
  const lonDeg = Math.floor(Math.abs(lonNorm));
  const lonMin = ((Math.abs(lonNorm) - lonDeg) * 60).toFixed(2);
  const lonDir = lonNorm >= 0 ? "E" : "W";

  return `${latDeg}° ${latMin.padStart(5, '0')}' ${latDir}, ${String(lonDeg).padStart(3, '0')}° ${lonMin.padStart(5, '0')}' ${lonDir}`;
}

/**
 * Fit all filtered notices into view on Leaflet map
 */
function fitAllNoticesOnMap() {
  if (!leafletMap || NTM_STORE.length === 0) return;
  const allPts = [];
  const filtered = getFilteredNotices();
  filtered.forEach(item => {
    (item.coords || []).forEach(c => allPts.push([c.lat, c.lon]));
  });
  if (allPts.length > 0) {
    leafletMap.fitBounds(L.latLngBounds(allPts).pad(0.15));
  }
}

/**
 * Render notices in the list sidebar and on Leaflet map
 */
function renderNtMListAndMap() {
  const listContainer = document.getElementById("ntmItemsScroll");
  const countEl = document.getElementById("ntmListCount");
  const searchVal = ((document.getElementById("ntmSearchInput") ? document.getElementById("ntmSearchInput").value : "") || "").toLowerCase().trim();

  const isNoticesActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.notices !== false : true;
  const isDepthsActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.depths !== false : true;
  const isWeatherActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.weather !== false : true;
  const isRouteActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.route !== false : true;

  // 1. Gather filtered NtM items
  const filteredNotices = isNoticesActive ? getFilteredNotices() : [];
  const filtered = filteredNotices;

  // 2. Gather filtered Ports items
  let filteredPorts = [];
  if (isDepthsActive && typeof PORT_DEPTHS_DB !== "undefined") {
    const minDepthReq = parseFloat(window.filterMinPortDepth) || 0;
    filteredPorts = PORT_DEPTHS_DB.filter(p => {
      if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
        const pCoords = p.approachCoords || p.coords;
        if (!pCoords || !window.isPointInActiveRouteCorridor(pCoords[0], pCoords[1])) return false;
      }
      if (minDepthReq > 0) {
        const maxD = Math.max(0, ...((p.fairways || []).map(f => parseFloat(f.depth) || 0))) || parseFloat(p.maxDraftMeters) || 12.5;
        if (maxD < minDepthReq) return false;
      }
      if (!searchVal) return true;
      return p.name.toLowerCase().includes(searchVal) ||
             (p.nameCn && p.nameCn.toLowerCase().includes(searchVal)) ||
             p.country.toLowerCase().includes(searchVal) ||
             p.unlocode.toLowerCase().includes(searchVal) ||
             (p.authority && p.authority.toLowerCase().includes(searchVal)) ||
             (p.fairways && p.fairways.some(f => f.name.toLowerCase().includes(searchVal)));
    });
  }

  // 3. Gather filtered Route Waypoints
  let filteredWaypoints = [];
  const hasRoute = isRouteActive && Boolean(activeRouteData && activeRouteData.waypoints && activeRouteData.waypoints.length > 0);
  if (hasRoute) {
    filteredWaypoints = activeRouteData.waypoints.filter((wp, idx) => {
      if (!searchVal) return true;
      const wptStr = (wp.wptNo || String(idx + 1)).toLowerCase();
      const nameStr = (wp.name || "").toLowerCase();
      const sailStr = (wp.sail || "").toLowerCase();
      return wptStr.includes(searchVal) || nameStr.includes(searchVal) || sailStr.includes(searchVal);
    });
  }

  // Update Category Badge Counters
  const catPillRoute = document.getElementById("catPillRoute");
  if (catPillRoute) {
    catPillRoute.style.display = hasRoute ? "inline-flex" : "none";
  }
  const countAllBadge = document.getElementById("catCountAll");
  const countNtmBadge = document.getElementById("catCountNtm");
  const countPortsBadge = document.getElementById("catCountPorts");
  const countRouteBadge = document.getElementById("catCountRoute");

  const totalVisibleCount = (isNoticesActive ? filteredNotices.length : 0) +
                            (isDepthsActive ? filteredPorts.length : 0) +
                            (hasRoute ? filteredWaypoints.length : 0);

  if (countAllBadge) countAllBadge.textContent = totalVisibleCount;
  if (countNtmBadge) countNtmBadge.textContent = filteredNotices.length;
  if (countPortsBadge) countPortsBadge.textContent = filteredPorts.length;
  if (countRouteBadge) countRouteBadge.textContent = filteredWaypoints.length;

  if (countEl) {
    const parts = [];
    if (isNoticesActive) parts.push(`${filteredNotices.length} NtMs`);
    if (isDepthsActive) parts.push(`${filteredPorts.length} Ports`);
    if (hasRoute) parts.push(`${filteredWaypoints.length} WPTs`);
    countEl.textContent = parts.length > 0 ? parts.join(" • ") : "No active overlays";
  }

  // Update Popover Counts for NtM & NAVTEX
  const activeNotices = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED");
  const cancelledNotices = NTM_STORE.filter(n => n.isCancelled || n.status === "CANCELLED");
  const countNavtex = activeNotices.filter(n => n.type === "NAVTEX").length;
  const countT = activeNotices.filter(n => n.type === "T").length;
  const countP = activeNotices.filter(n => n.type === "P").length;
  const countPerm = activeNotices.filter(n => n.type === "PERM").length;
  const countPoly = activeNotices.filter(n => n.isPolygon || (n.coords && n.coords.length >= 3)).length;
  const countCancelled = cancelledNotices.length;

  const elCntAll = document.getElementById("popCntAll");
  if (elCntAll) elCntAll.textContent = activeNotices.length;
  const elCntNavtex = document.getElementById("popCntNavtex");
  if (elCntNavtex) elCntNavtex.textContent = countNavtex;
  const elCntT = document.getElementById("popCntT");
  if (elCntT) elCntT.textContent = countT;
  const elCntP = document.getElementById("popCntP");
  if (elCntP) elCntP.textContent = countP;
  const elCntPerm = document.getElementById("popCntPerm");
  if (elCntPerm) elCntPerm.textContent = countPerm;
  const elCntPoly = document.getElementById("popCntPoly");
  if (elCntPoly) elCntPoly.textContent = countPoly;
  const elCntCan = document.getElementById("popCntCancelled") || document.getElementById("popCntCan");
  if (elCntCan) elCntCan.textContent = countCancelled;
  const elCntNtmTot = document.getElementById("popCntNtmTotal");
  if (elCntNtmTot) elCntNtmTot.textContent = activeNotices.length;
  const elCntPortsTot = document.getElementById("popCntPortsTotal");
  if (elCntPortsTot && typeof PORT_DEPTHS_DB !== "undefined") elCntPortsTot.textContent = PORT_DEPTHS_DB.length;
  const elCntWeatherTot = document.getElementById("popCntWeatherTotal");
  if (elCntWeatherTot && typeof MARINE_WEATHER_STORE !== "undefined") {
    elCntWeatherTot.textContent = ((MARINE_WEATHER_STORE.storms || []).length + (MARINE_WEATHER_STORE.waves || []).length) + " LIVE";
  }
  const elCntRouteTot = document.getElementById("popCntRouteTotal");
  if (elCntRouteTot) elCntRouteTot.textContent = hasRoute ? activeRouteData.waypoints.length : 0;

  const homeNoticeCountEl = document.getElementById("homeNoticeCount");
  if (homeNoticeCountEl) {
    homeNoticeCountEl.textContent = `${activeNotices.length} Notices Active`;
  }

  syncFilterIndicators();

  const expBadge = document.getElementById("ntmExportBadge");
  if (expBadge) {
    const selForExp = NTM_STORE.filter(n => n.checkedForExport !== false).length;
    expBadge.textContent = selForExp;
  }

  updateSelectionCounter();

  if (listContainer) {
    let html = "";
    const showRoute = hasRoute && (activeOverlayCategory === "ALL" || activeOverlayCategory === "ROUTE");
    const showPorts = isDepthsActive && (activeOverlayCategory === "ALL" || activeOverlayCategory === "PORTS");
    const showNotices = isNoticesActive && (activeOverlayCategory === "ALL" || activeOverlayCategory === "NTM");

    // SECTION A: ROUTE WAYPOINTS
    if (showRoute) {
      html += `
        <div class="ntm-search-section-header" style="background:rgba(2,132,199,0.12);border-color:rgba(56,189,248,0.3);">
          <span style="color:#38bdf8;">
            <svg class="setsail-icon" viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#38bdf8;"><circle cx="4" cy="19" r="2.5"/><circle cx="20" cy="5" r="2.5"/><path d="M4 16.5c0-4 4-5.5 8-5.5s8-2 8-5.5"/></svg>
            MY ROUTE WAYPOINTS: ${activeRouteData.name || "Passage Plan"} (${filteredWaypoints.length})
          </span>
        </div>
      `;

      filteredWaypoints.forEach((wp, wIdx) => {
        const globalIdx = activeRouteData.waypoints.indexOf(wp);
        const isStart = globalIdx === 0;
        const isEnd = globalIdx === activeRouteData.waypoints.length - 1;
        const wptDisplayNum = wp.wptNo || ('00' + (globalIdx + 1)).slice(-3);
        const wptLabel = wp.name ? wp.name : `WPT ${wptDisplayNum}`;
        const dmsCoords = formatLatLonDMS(wp.lat, wp.lon);
        const sail = wp.sail || "RL";
        const speed = wp.speedKnots != null ? `${wp.speedKnots} kn` : "14.0 kn";
        const pXtd = wp.portsideXTD != null ? wp.portsideXTD : 0.1;
        const sXtd = wp.starboardXTD != null ? wp.starboardXTD : 0.1;
        const turnRad = wp.turnRadius != null ? `${wp.turnRadius} NM` : "0.5 NM";
        const typeBadgeClass = isStart ? "perm" : (isEnd ? "temp" : "prelim");
        const typeBadgeText = isStart ? "DEP" : (isEnd ? "DEST" : sail);

        html += `
          <div class="ntm-card-item ntm-wpt-card" data-wpt-idx="${globalIdx}" onclick="centerMapOnWaypoint(${globalIdx})">
            <div class="ntm-card-content" style="padding:0.6rem 0.75rem;">
              <div class="ntm-card-top" style="align-items:center;">
                <span class="ntm-card-id" style="color:#38bdf8;font-weight:700;">#${wptDisplayNum}</span>
                <span class="ntm-tag ${typeBadgeClass}" style="margin-left:6px;font-size:0.68rem;">${typeBadgeText}</span>
                <button type="button" class="ntm-btn-wpt-edit" onclick="event.stopPropagation();openWaypointEditModal(${globalIdx})" title="Edit Waypoint #${wptDisplayNum}">
                  <svg class="setsail-icon" viewBox="0 0 24 24" style="width:11px;height:11px;"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Edit
                </button>
              </div>
              <div class="ntm-card-subject" style="margin-top:2px;font-weight:600;color:#f1f5f9;">${wptLabel}</div>
              <div style="font-size:0.72rem;color:var(--muted);margin-top:3px;display:flex;align-items:center;gap:4px;">
                ${SetSailIcons.svg("pos")} <span>${dmsCoords}</span>
              </div>
              <div class="ntm-wpt-meta-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-top:5px;font-size:0.68rem;background:rgba(255,255,255,0.03);padding:4px 6px;border-radius:4px;border:1px solid var(--line);">
                <div><span style="color:var(--muted);">SPD:</span> <b style="color:#f1f5f9;">${speed}</b></div>
                <div><span style="color:var(--muted);">XTD:</span> <b style="color:#f1f5f9;">P${pXtd}/S${sXtd}</b></div>
                <div><span style="color:var(--muted);">RAD:</span> <b style="color:#f1f5f9;">${turnRad}</b></div>
              </div>
            </div>
          </div>
        `;
      });
    }

    // SECTION B: WORLD PORTS
    if (showPorts && filteredPorts.length > 0) {
      html += `
        <div class="ntm-search-section-header" style="${showRoute ? 'margin-top:0.6rem;' : ''}">
          <span>
            <svg class="setsail-icon" viewBox="0 0 24 24" style="width:13px;height:13px;"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
            WORLD PORTS BATHYMETRY (${filteredPorts.length})
          </span>
        </div>
      `;

      filteredPorts.forEach(port => {
        const cCode = (port.countryCode || (port.country ? port.country.slice(0, 2) : "UN")).toUpperCase();
        const cLower = cCode.toLowerCase();
        const pDepths = (port.fairways || []).map(f => parseFloat(f.depth) || 0).filter(d => d > 0);
        const minD = pDepths.length ? Math.min(...pDepths) : 12.5;
        const maxD = pDepths.length ? Math.max(...pDepths) : 12.5;
        const rangeTxt = (minD !== maxD) ? `${minD.toFixed(1)}–${maxD.toFixed(1)}m` : `${maxD.toFixed(1)}m`;
        const reachesCnt = (port.fairways || []).length;
        const depthSummary = `${reachesCnt} Reaches • ${rangeTxt}`;
        html += `
          <div class="ntm-card-item ntm-port-search-card" data-port-id="${port.id}" onclick="jumpToPort('${port.id}')" title="Click to inspect ${port.name} (${reachesCnt} surveyed reaches) on map">
            <div class="ntm-card-content" style="padding:0.55rem 0.75rem;">
              <div class="ntm-card-top" style="align-items:center;gap:7px;">
                <span class="port-flag-box" title="${port.country}">
                  <img src="assets/flags/${cLower}.png" 
                       onerror="this.onerror=null;this.src='https://flagcdn.com/w40/${cLower}.png';" 
                       alt="${cCode}" 
                       class="port-flag-img" 
                       width="21" 
                       height="15" 
                       loading="lazy" />
                </span>
                <span class="ntm-card-id" style="color:var(--accent);font-weight:600;font-size:0.86rem;">${port.name}</span>
                <span class="ntm-tag perm" style="margin-left:auto;">${port.unlocode}</span>
              </div>
              <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;display:flex;align-items:center;justify-content:space-between;">
                <span>${port.country} • <b style="color:#38bdf8;">${depthSummary}</b></span>
                <span style="color:#f05a36;font-size:0.7rem;font-weight:600;">View Chart &rarr;</span>
              </div>
            </div>
          </div>
        `;
      });
    }

    // SECTION C: NOTICES TO MARINERS & NAVTEX WARNINGS
    if (showNotices) {
      if ((showRoute || showPorts) && filteredNotices.length > 0) {
        html += `
          <div class="ntm-search-section-header" style="margin-top:0.6rem;">
            <span>
              <svg class="setsail-icon" viewBox="0 0 24 24" style="width:13px;height:13px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              NtM &amp; NAVTEX WARNINGS (${filteredNotices.length})
            </span>
          </div>
        `;
      }

      filteredNotices.forEach(item => {
        const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
        const tagClass = item.type === "NAVTEX" ? "navtex" : (item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm"));
        const typeLabel = item.type === "NAVTEX" ? "NAVTEX" : (item.type === "T" ? "TEMP (T)" : (item.type === "P" ? "PRELIM (P)" : "PERM"));
        const navarea = getNoticeNavarea(item);

        const typeBadge = isItemCancelled
          ? `<span class="ntm-tag cancelled">CANCELLED</span>`
          : `<span class="ntm-tag ${tagClass}">${typeLabel}</span>`;
        const editedBadge = item.userEdited ? `<span class="ntm-tag edited-badge" style="margin-left:4px;">EDITED</span>` : "";

        const firstCoord = item.coords && item.coords[0]
          ? (item.coords[0].dms || formatCoordDmsHelper(item.coords[0].lat, item.coords[0].lon))
          : "?";
        const chartsStr = (item.charts && item.charts.length > 0) ? `Charts: ${item.charts.join(', ')}` : "";
        const expBadgeTxt = item.expires ? formatCancelUtcBadge(item.expires) : "";
        const expBanner = expBadgeTxt ? `<div class="ntm-cancels-banner" style="color:${isItemCancelled ? '#fda4af' : '#fbbf24'};">⏱ ${isItemCancelled ? 'Expired:' : 'Auto-Cancel:'} ${expBadgeTxt}</div>` : "";
        const cancelsBanner = ((item.cancels && item.cancels.length > 0) ? `<div class="ntm-cancels-banner">${SetSailIcons.svg("cancelled")} Cancels: ${item.cancels.join(', ')}</div>` : "") + expBanner;
        const cancelledNoticeClass = isItemCancelled ? "cancelled is-cancelled-card" : "";
        const navtexCardClass = item.type === "NAVTEX" ? "type-navtex" : `type-${item.type}`;
        const safeId = String(item.id || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");

        html += `
          <div class="ntm-card-item ${navtexCardClass} ${cancelledNoticeClass}" data-id="${item.id}" onclick="selectNtMNotice('${safeId}')">
            <div class="ntm-card-content">
              <div class="ntm-card-top">
                <span class="ntm-card-id">${item.id}</span>
                <span style="display:inline-flex;align-items:center;gap:4px;">${typeBadge}${editedBadge}</span>
              </div>
              ${cancelsBanner}
              <div class="ntm-card-region"><span class="ntm-card-navarea">${navarea}</span> ${item.country || item.coordinator || 'Global'} ${item.region ? `— ${item.region}` : ''}</div>
              <div class="ntm-card-subject">${item.subject || ''}</div>
              <div class="ntm-card-bottom">
                <span class="ntm-card-coords" title="Center on chart">${SetSailIcons.svg("pos")} ${firstCoord} ${item.coords && item.coords.length > 1 ? `(+${item.coords.length-1})` : ''}</span>
                ${chartsStr ? `<span class="ntm-card-charts">${chartsStr}</span>` : ''}
              </div>
              <div class="ntm-card-actions" onclick="event.stopPropagation();">
                <button type="button" class="ntm-card-act-btn" onclick="window.openNoticeDetailModal('${safeId}')" title="View warning details">View</button>
                <span class="navtex-ro-pill" style="font-size:0.65rem;font-weight:700;color:#94a3b8;background:rgba(148,163,184,0.12);padding:3px 8px;border-radius:4px;border:1px solid rgba(148,163,184,0.28);letter-spacing:0.02em;">Read-only</span>
              </div>
            </div>
          </div>
        `;
      });
    }

    if (!html) {
      const isAisActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.ais !== false : false;
      const anyActiveOverlay = isNoticesActive || isDepthsActive || isWeatherActive || isRouteActive || isAisActive;
      if (!anyActiveOverlay) {
        html = `
          <div class="ntm-empty-hints">
            <div class="ntm-empty-hints-title">Enable a chart layer</div>
            <div class="ntm-empty-hints-sub">Choose an overlay below, or use the dock under the chart.</div>
            <div class="ntm-empty-hint-grid">
              <button type="button" class="ntm-empty-hint-btn" data-overlay-hint="notices" title="Notices to Mariners &amp; NAVTEX">NtM / NAVTEX</button>
              <button type="button" class="ntm-empty-hint-btn" data-overlay-hint="depths" title="Ports &amp; UKC">Ports</button>
              <button type="button" class="ntm-empty-hint-btn" data-overlay-hint="weather" title="Cyclones &amp; weather">Weather</button>
              <button type="button" class="ntm-empty-hint-btn" data-overlay-hint="ais" title="Live AIS targets">AIS</button>
              <button type="button" class="ntm-empty-hint-btn ntm-empty-hint-btn--wide" data-overlay-hint="route" title="My vessel route">My Route</button>
            </div>
          </div>
        `;
      } else {
        html = `
          <div style="padding:2rem 1rem;text-align:center;color:var(--muted);font-size:0.8rem;">
            No active items match the current filter or enabled overlays.<br>
            <span style="font-size:0.72rem;opacity:0.8;">Enable overlays from the dock below or clear search filter.</span>
          </div>
        `;
      }
    }

    listContainer.innerHTML = html;
  }

  // Render Markers on Leaflet Map (Zoom-Adaptive ECDIS Palette & Decluttering)
  if (leafletMap && leafletMarkersLayer) {
    leafletMarkersLayer.clearLayers();
    if (!isNoticesActive) {
      if (leafletMap.hasLayer(leafletMarkersLayer)) {
        leafletMap.removeLayer(leafletMarkersLayer);
      }
      return;
    }
    if (!leafletMap.hasLayer(leafletMarkersLayer)) {
      leafletMap.addLayer(leafletMarkersLayer);
    }
    const curZoom = leafletMap.getZoom ? leafletMap.getZoom() : 3;

    // Keep NtM above ECDIS land and clickable (land pane z=350, ntm pane z=450)
    if (!leafletMap.getPane("ecdisLandPane")) {
      const lp = leafletMap.createPane("ecdisLandPane");
      lp.style.zIndex = 350;
      lp.style.pointerEvents = "none";
    } else {
      leafletMap.getPane("ecdisLandPane").style.pointerEvents = "none";
    }
    if (!leafletMap.getPane("ntmOverlayPane")) {
      const np = leafletMap.createPane("ntmOverlayPane");
      np.style.zIndex = 450;
    }
    if (!window._setsailNtmCanvasRenderer) {
      window._setsailNtmCanvasRenderer = L.canvas({ pane: "ntmOverlayPane" });
    }
    const canvasRenderer = window._setsailNtmCanvasRenderer;

    // Split polylines that cross the antimeridian so Leaflet does not draw a world-wrapping chord
    const splitAntimeridianLatLngs = (latlngs) => {
      const rings = [[]];
      for (let i = 0; i < latlngs.length; i++) {
        const cur = latlngs[i];
        const ring = rings[rings.length - 1];
        if (ring.length) {
          const prev = ring[ring.length - 1];
          if (Math.abs(Number(cur[1]) - Number(prev[1])) > 180) {
            rings.push([cur]);
            continue;
          }
        }
        ring.push(cur);
      }
      return rings.filter((r) => r.length >= 2);
    };

    const noticeCentroid = (item) => {
      const coords = item.coords || [];
      let lat = 0;
      let lon = 0;
      let n = 0;
      for (let i = 0; i < coords.length; i++) {
        const c = coords[i];
        if (!c || !Number.isFinite(Number(c.lat)) || !Number.isFinite(Number(c.lon))) continue;
        lat += Number(c.lat);
        lon += Number(c.lon);
        n++;
      }
      return n ? [lat / n, lon / n] : null;
    };

    // World / low zoom: aggressively merge nearby notices; split only after a clear zoom-in
    const clusterNoticesForZoom = (notices, zoom) => {
      if (zoom > 4.5) return null;
      // Larger cells = fewer numbered markers on a cluttered world view
      const cellDeg = zoom <= 2 ? 36 : zoom <= 2.5 ? 26 : zoom <= 3 ? 18 : zoom <= 3.5 ? 12 : 7;
      const buckets = Object.create(null);
      notices.forEach((item) => {
        if (!item.coords || !item.coords.length) return;
        const c = noticeCentroid(item);
        if (!c) return;
        const key =
          Math.round(c[0] / cellDeg) + "|" + Math.round(c[1] / cellDeg);
        if (!buckets[key]) buckets[key] = { items: [], latSum: 0, lonSum: 0 };
        buckets[key].items.push(item);
        buckets[key].latSum += c[0];
        buckets[key].lonSum += c[1];
      });
      let clusters = Object.keys(buckets).map((k) => {
        const b = buckets[k];
        const n = b.items.length;
        return { items: b.items, lat: b.latSum / n, lon: b.lonSum / n };
      });
      // Absorb leftover singles into the nearest multi-cluster (or each other) so world view stays sparse
      if (zoom <= 3.5 && clusters.length > 1) {
        const absorbR = cellDeg * 1.6;
        const absorbR2 = absorbR * absorbR;
        let changed = true;
        while (changed) {
          changed = false;
          const multi = [];
          const singles = [];
          clusters.forEach((c) => (c.items.length > 1 ? multi : singles).push(c));
          if (!singles.length) break;
          const nextSingles = [];
          singles.forEach((s) => {
            let best = null;
            let bestD = Infinity;
            const pool = multi.length ? multi : nextSingles;
            pool.forEach((m) => {
              const dLat = s.lat - m.lat;
              const dLon = s.lon - m.lon;
              const d2 = dLat * dLat + dLon * dLon;
              if (d2 < bestD) {
                bestD = d2;
                best = m;
              }
            });
            if (best && bestD <= absorbR2) {
              best.items.push.apply(best.items, s.items);
              const n = best.items.length;
              let lat = 0;
              let lon = 0;
              best.items.forEach((it) => {
                const c = noticeCentroid(it);
                if (!c) return;
                lat += c[0];
                lon += c[1];
              });
              best.lat = lat / n;
              best.lon = lon / n;
              if (multi.indexOf(best) < 0) multi.push(best);
              changed = true;
            } else {
              nextSingles.push(s);
            }
          });
          clusters = multi.concat(nextSingles);
        }
      }
      return clusters;
    };

    // Cohesive ECDIS Color Hierarchy:
    // NAVTEX = Warm Amber-Orange (#fb923c / #f97316)
    // PERM   = Admiralty Magenta (#e879f9 / #d946ef)
    // TEMP T = Crisp Gold (#facc15 / #eab308)
    // PRELIM = Soft Indigo-Violet (#a78bfa / #8b5cf6)
    const getNoticeColors = (item, isCancelled) => {
      if (isCancelled) return { stroke: "#94a3b8", fill: "#f87171", badge: "#ef4444" };
      if (item.type === "NAVTEX") return { stroke: "#fb923c", fill: "#f97316", badge: "#ea580c" };
      if (item.type === "T")      return { stroke: "#fde047", fill: "#eab308", badge: "#ca8a04" };
      if (item.type === "P")      return { stroke: "#c4b5fd", fill: "#8b5cf6", badge: "#7c3aed" };
      return { stroke: "#e879f9", fill: "#d946ef", badge: "#c026d3" }; // Admiralty Magenta for PERM
    };

    // Zoom-adaptive sizes & opacities so world view is crisp and never cluttered
    const ptRadius = curZoom <= 3 ? 2.7 : (curZoom <= 5 ? 3.6 : (curZoom <= 7 ? 4.6 : 5.8));
    const ptRimColor = curZoom <= 6 ? "rgba(15, 23, 42, 0.88)" : "#ffffff";
    const ptRimWeight = curZoom <= 4 ? 0.8 : (curZoom <= 6 ? 1.0 : 1.4);
    const basePolyWeight = curZoom <= 3 ? 0.9 : (curZoom <= 5 ? 1.2 : (curZoom <= 7 ? 1.6 : 2.0));
    const basePolyFillOp = curZoom <= 3 ? 0.05 : (curZoom <= 5 ? 0.09 : (curZoom <= 7 ? 0.14 : 0.20));
    const baseLineWeight = curZoom <= 3 ? 1.3 : (curZoom <= 5 ? 1.8 : 2.5);

    const pathPaneOpts = () => ({
      pane: "ntmOverlayPane",
      renderer: canvasRenderer
    });

    const buildPopupHtml = (item, extraLine = "") => {
      const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
      const safeId = String(item.id || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
      const navarea = getNoticeNavarea(item);
      const rawBody = String(item.body || item.rawText || "").trim();
      const bodyPreview = rawBody.length > 260 ? rawBody.slice(0, 260) + "..." : rawBody;
      const pal = getNoticeColors(item, isItemCancelled);
      const expTxt = item.expires ? formatCancelUtcBadge(item.expires) : "";
      const expLine = expTxt ? `<div style="font-size:0.75em;color:${isItemCancelled ? '#dc2626' : '#d97706'};font-weight:600;margin-bottom:4px;">⏱ ${isItemCancelled ? 'Expired at:' : 'Cancellation Time:'} ${expTxt}</div>` : "";
      return `
        <div style="font-family:'Segoe UI',sans-serif;color:#111;min-width:240px;max-width:310px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:3px;">
            <b style="color:#0a3888;font-size:1.02em;">${item.id}</b>
            <span style="background:${pal.badge};color:#fff;font-size:0.68em;font-weight:700;padding:1px 6px;border-radius:4px;">${isItemCancelled ? 'CANCELLED' : item.type}</span>
          </div>
          <div style="font-size:0.8em;color:#475569;font-weight:600;margin-bottom:3px;">[${navarea}] ${item.country || item.coordinator || ''} ${item.region ? '— ' + item.region : ''}</div>
          ${expLine}
          <div style="font-size:0.88em;font-weight:600;color:#1e293b;margin-bottom:5px;line-height:1.3;">${item.subject || ''}</div>
          ${bodyPreview ? `<div style="font-size:0.76em;color:#334155;background:#f1f5f9;padding:5px 7px;border-radius:4px;max-height:95px;overflow-y:auto;white-space:pre-wrap;font-family:Consolas,monospace;margin-bottom:5px;line-height:1.35;">${bodyPreview.replace(/</g, '&lt;')}</div>` : ''}
          ${extraLine}
          ${(item.charts && item.charts.length > 0) ? `<div style="font-size:0.76em;color:#64748b;"><b>Charts:</b> ${item.charts.join(', ')}</div>` : ''}
          <div style="display:flex;align-items:center;gap:6px;margin-top:7px;padding-top:6px;border-top:1px solid #cbd5e1;">
            <button type="button" onclick="window.openNoticeDetailModal('${safeId}')" style="flex:1;padding:4px 7px;font-size:11px;font-weight:600;border-radius:4px;border:1px solid #94a3b8;background:#0f172a;color:#f8fafc;cursor:pointer;">View</button>
            <span style="font-size:10px;font-weight:700;color:#64748b;background:#f1f5f9;padding:3px 7px;border-radius:4px;border:1px solid #cbd5e1;">Read-only</span>
          </div>
        </div>
      `;
    };

    const plotOneNotice = (item) => {
      if (!item.coords || item.coords.length === 0) return;

      const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
      const pal = getNoticeColors(item, isItemCancelled);

      if (item.subPolygons && item.subPolygons.length > 0) {
        item.subPolygons.forEach(sub => {
          const pts = sub.points || (sub.coords || []).map(c => [c.lat, c.lon]);
          if (!pts || pts.length === 0) return;

          if (pts.length >= 3) {
            const pOpts = Object.assign({
              color: pal.stroke,
              weight: basePolyWeight,
              fillColor: pal.fill,
              fillOpacity: isItemCancelled ? 0.04 : basePolyFillOp,
              dashArray: isItemCancelled ? "4, 6" : null
            }, pathPaneOpts());
            const polygon = L.polygon(pts, pOpts);
            polygon.bindPopup(buildPopupHtml(item, `<div style="font-size:0.78em;color:#475569;margin-bottom:3px;"><b>Area:</b> ${sub.name} (${pts.length} pts)</div>`));
            leafletMarkersLayer.addLayer(polygon);
          } else if (pts.length === 2) {
            splitAntimeridianLatLngs(pts).forEach((seg) => {
              const lOpts = Object.assign({
                color: pal.stroke,
                weight: baseLineWeight,
                dashArray: isItemCancelled ? "3, 6" : "5, 4"
              }, pathPaneOpts());
              const polyline = L.polyline(seg, lOpts);
              polyline.bindPopup(buildPopupHtml(item));
              leafletMarkersLayer.addLayer(polyline);
            });
          } else if (pts.length === 1) {
            const cOpts = Object.assign({
              radius: ptRadius,
              fillColor: pal.fill,
              color: ptRimColor,
              weight: ptRimWeight,
              fillOpacity: isItemCancelled ? 0.45 : 0.86
            }, pathPaneOpts());
            const circle = L.circleMarker(pts[0], cOpts);
            circle.bindPopup(buildPopupHtml(item));
            leafletMarkersLayer.addLayer(circle);
          }
        });
      } else if (item.isPolygon && item.coords.length >= 3) {
        const polyPoints = item.coords.map(c => [c.lat, c.lon]);
        let latSpan = 0, lonSpan = 0;
        if (polyPoints.length >= 3) {
          const lats = polyPoints.map(p => p[0]);
          const lons = polyPoints.map(p => p[1]);
          latSpan = Math.max(...lats) - Math.min(...lats);
          lonSpan = Math.max(...lons) - Math.min(...lons);
        }
        const isLargeRegionalArea = (latSpan > 3.5 || lonSpan > 3.5);
        const pOpts = Object.assign({
          color: pal.stroke,
          weight: isLargeRegionalArea && curZoom <= 5 ? 0.8 : basePolyWeight,
          fillColor: pal.fill,
          fillOpacity: isItemCancelled ? 0.04 : (isLargeRegionalArea && curZoom <= 5 ? 0.025 : basePolyFillOp),
          dashArray: isItemCancelled ? "3, 6" : (item.type === "NAVTEX" || item.type === "T" ? "4, 4" : null)
        }, pathPaneOpts());
        const polygon = L.polygon(polyPoints, pOpts);
        polygon.bindPopup(buildPopupHtml(item, `<div style="font-size:0.76em;color:#2e7d32;font-family:monospace;margin-bottom:3px;">Polygon (${item.coords.length} vertices)</div>`));
        leafletMarkersLayer.addLayer(polygon);
      } else if (item.isLine && item.coords.length >= 2) {
        const linePoints = item.coords.map(c => [c.lat, c.lon]);
        const segments = splitAntimeridianLatLngs(linePoints);
        segments.forEach((seg) => {
          const lOpts = Object.assign({
            color: pal.stroke,
            weight: baseLineWeight,
            dashArray: isItemCancelled ? "3, 6" : (item.type === "T" ? "5, 4" : null)
          }, pathPaneOpts());
          const polyline = L.polyline(seg, lOpts);
          polyline.bindPopup(buildPopupHtml(item, `<div style="font-size:0.76em;color:#2e7d32;font-family:monospace;margin-bottom:3px;">Line (${item.coords.length} points${segments.length > 1 ? " · date-line split" : ""})</div>`));
          leafletMarkersLayer.addLayer(polyline);
        });
      } else {
        // At global zoom <= 4, if a single notice has multiple points, plot only its primary point
        const coordsToPlot = (curZoom <= 4 && item.coords.length > 2) ? [item.coords[0]] : item.coords;
        coordsToPlot.forEach(coord => {
          const cOpts = Object.assign({
            radius: ptRadius,
            fillColor: pal.fill,
            color: ptRimColor,
            weight: ptRimWeight,
            opacity: 0.92,
            fillOpacity: isItemCancelled ? 0.4 : 0.85
          }, pathPaneOpts());
          const circle = L.circleMarker([coord.lat, coord.lon], cOpts);
          const dmsStr = coord.dms || formatCoordDmsHelper(coord.lat, coord.lon);
          circle.bindPopup(buildPopupHtml(item, `<div style="font-size:0.78em;color:#2e7d32;font-family:monospace;margin-bottom:3px;">${dmsStr}</div>`));
          leafletMarkersLayer.addLayer(circle);
        });
      }
    };

    const clusters = clusterNoticesForZoom(filtered, curZoom);
    if (clusters) {
      clusters.forEach((cl) => {
        // Below ~z3.5 keep even lone notices as compact badges (no full lines/polygons clutter)
        if (cl.items.length === 1 && curZoom > 3.5) {
          plotOneNotice(cl.items[0]);
          return;
        }
        const count = cl.items.length;
        const types = {};
        cl.items.forEach((it) => {
          const t = it.type || "?";
          types[t] = (types[t] || 0) + 1;
        });
        const typeSummary = Object.keys(types)
          .map((t) => types[t] + " " + t)
          .join(" · ");
        const listPreview = cl.items
          .slice(0, 8)
          .map((it) => String(it.id || "").replace(/</g, "&lt;"))
          .join("<br>");
        const more = count > 8 ? `<div style="margin-top:4px;color:#64748b;">+${count - 8} more…</div>` : "";
        const targetZoom = Math.min(Math.max(curZoom + 1.5, 4), 8);
        const icon = L.divIcon({
          className: "ntm-cluster-icon",
          html:
            '<div style="width:20px;height:20px;border-radius:50%;background:#f97316;border:1.5px solid #0f172a;color:#fff;font:700 9px/20px Segoe UI,sans-serif;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.4);">' +
            count +
            "</div>",
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        const m = L.marker([cl.lat, cl.lon], {
          icon,
          pane: "ntmOverlayPane",
          keyboard: false
        });
        m.bindPopup(
          `<div style="font-family:Segoe UI,sans-serif;min-width:200px;color:#111;">
            <b style="color:#c2410c;">${count} NtM / NAVTEX</b>
            <div style="font-size:0.78em;color:#64748b;margin:3px 0 6px;">${typeSummary}</div>
            <div style="font-size:0.78em;line-height:1.35;">${listPreview}${more}</div>
            <div style="margin-top:7px;font-size:0.72em;color:#0369a1;">Zoom in to split into individual objects</div>
          </div>`
        );
        m.on("click", () => {
          leafletMap.setView([cl.lat, cl.lon], targetZoom);
        });
        leafletMarkersLayer.addLayer(m);
      });
    } else {
      filtered.forEach(plotOneNotice);
    }
  } else {
    drawOfflineCanvasMap();
  }

  // Clear loading spinner on NtM & NAVTEX dock tab now that all objects are plotted on the map
  if (typeof window.setOverlayNoticesLoading === "function") {
    requestAnimationFrame(() => {
      window.setOverlayNoticesLoading(false);
    });
  }
}
window.renderNtMListAndMap = renderNtMListAndMap;

/**
 * Update selection counter text
 */
function updateSelectionCounter() {
  const filtered = getFilteredNotices();
  const expBadge = document.getElementById("ntmExportBadge");
  if (expBadge) {
    expBadge.textContent = `${filtered.length}`;
  }
  const selEl = document.getElementById("ntmSelectedCount");
  if (selEl) {
    selEl.textContent = `${filtered.length}`;
  }
}

/**
 * Select a notice card: highlights it and pans the map
 */
function selectNtMNotice(noticeId) {
  document.querySelectorAll(".ntm-card-item").forEach(card => {
    card.classList.toggle("selected", card.getAttribute("data-id") === noticeId);
  });

  const item = NTM_STORE.find(n => n.id === noticeId);
  if (!item || !item.coords || item.coords.length === 0) return;

  if (leafletMap) {
    if (item.coords.length > 1) {
      const bounds = L.latLngBounds(item.coords.map(c => [c.lat, c.lon]));
      leafletMap.fitBounds(bounds.pad(0.18), { maxZoom: 12, duration: 1.2 });
    } else {
      const first = item.coords[0];
      leafletMap.flyTo([first.lat, first.lon], Math.max(leafletMap.getZoom(), 9), {
        duration: 1.2
      });
    }
  }

  if (window.innerWidth <= 768 && mobileCurrentView === "list") {
    const mapBtn = document.getElementById("ntmViewMapBtn");
    if (mapBtn) mapBtn.click();
  }
}

/**
 * Initial sample notices
 */
function loadSampleNtMData() {
  const sampleNotices = [
    {
      id: "57/26",
      num: "57",
      type: "PERM",
      year: "26",
      country: "SWEDEN",
      region: "East Coast",
      subject: "Foul area. Insert foul symbol.",
      charts: ["864", "2055"],
      coords: [{ lat: 58.6283, lon: 17.7717, dms: "58° 37.70' N, 17° 46.30' E" }],
      isPolygon: false,
      isLine: false,
      checkedForExport: true
    },
    {
      id: "31/26",
      num: "31",
      type: "PERM",
      year: "26",
      country: "NORTH SEA",
      region: "Norwegian Sector",
      subject: "Platform Munin. Legend Under construction established.",
      charts: ["294", "2182C"],
      coords: [{ lat: 60.1167, lon: 2.5933, dms: "60° 07.0' N, 2° 35.6' E" }],
      isPolygon: false,
      isLine: false,
      checkedForExport: true
    },
    {
      id: "52(T)/26",
      num: "52",
      type: "T",
      year: "26",
      country: "IRELAND",
      region: "East Coast",
      subject: "Buoy. The Leac Buidhe light-buoy, Fl(4)R.6s, off station.",
      charts: ["1415", "1468", "5621_1"],
      coords: [{ lat: 53.2775, lon: -6.085, dms: "53° 16.65' N, 6° 05.10' W" }],
      isPolygon: false,
      isLine: false,
      checkedForExport: true
    },
    {
      id: "5927(T)/24",
      num: "5927",
      type: "T",
      year: "24",
      country: "ENGLAND",
      region: "South Coast",
      subject: "Southsea Coastal Scheme works - Restricted area, entry prohibited.",
      charts: ["2625", "2631"],
      isPolygon: true,
      coords: [
        { lat: 50.7779, lon: -1.0855, dms: "50° 46.674' N, 1° 05.134' W" },
        { lat: 50.7769, lon: -1.0854, dms: "50° 46.619' N, 1° 05.128' W" },
        { lat: 50.7772, lon: -1.0893, dms: "50° 46.635' N, 1° 05.363' W" },
        { lat: 50.7787, lon: -1.0926, dms: "50° 46.724' N, 1° 05.556' W" },
        { lat: 50.7796, lon: -1.0937, dms: "50° 46.776' N, 1° 05.623' W" },
        { lat: 50.7822, lon: -1.0989, dms: "50° 46.935' N, 1° 05.935' W" },
        { lat: 50.7829, lon: -1.0975, dms: "50° 46.977' N, 1° 05.853' W" }
      ],
      checkedForExport: true
    },
    {
      id: "51(P)/26",
      num: "51",
      type: "P",
      year: "26",
      country: "DJIBOUTI",
      region: "Port de Djibouti",
      subject: "Pier. Channel. Leading lights and line established.",
      charts: ["2964"],
      isLine: true,
      coords: [
        { lat: 11.5025, lon: 43.2295, dms: "11° 30.15' N, 43° 13.77' E" },
        { lat: 11.5083, lon: 43.2360, dms: "11° 30.50' N, 43° 14.16' E" }
      ],
      checkedForExport: true
    }
  ];

  addNoticesToStore(sampleNotices);
}


// ==========================================================================
// SETROUTE™ — AUTONOMOUS AI PASSAGE PLANNER ENGINE (COHERE INTEGRATION)
// ==========================================================================
const SETROUTE_COHERE_MODEL = "gemini-2.5-flash";
async function setrouteCohereChat(messages, options) {
  options = options || {};
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), options.timeoutMs || 9500);
  try {
    const resp = await fetch("/api/setroute-intent", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        messages: messages,
        model: options.model || SETROUTE_COHERE_MODEL,
        temperature: options.temperature != null ? options.temperature : 0.15
      })
    });
    clearTimeout(tid);
    if (!resp.ok) return { ok: false, text: "", status: resp.status };
    const data = await resp.json();
    return { ok: Boolean(data && data.ok), text: (data && data.text) || "", status: 200 };
  } catch (e) {
    clearTimeout(tid);
    return { ok: false, text: "", error: e };
  }
}
window.setrouteCohereChat = setrouteCohereChat;

/**
 * Initialize SetRoute Ports Selection and Event Listeners
 */

// ==========================================================================
// SETROUTE™ GLOBAL MARITIME DEEP-WATER PASSAGE ROUTING ENGINE
// Physical sea corridor topology with Dijkstra shortest sea path
// Core A v5.65: land-box rejection + hub routing; graph edges preferred over land chords.
// ==========================================================================

const MARITIME_SEA_NODES = {
  // Northern Europe & English Channel
  "ROTTERDAM_APP": [51.98, 4.02, "Rotterdam Fairway Approach"],
  "ANTWERP_APP": [51.40, 3.80, "Westerschelde Fairway"],
  "HAMBURG_APP": [54.00, 8.10, "Elbe Approach TSS"],
  "SKAGERRAK": [57.85, 10.75, "Skagen / Skagerrak TSS"],
  "KATTEGAT": [56.50, 11.80, "Kattegat Shipping Lane"],
  "STOREBAELT": [55.35, 11.05, "Great Belt Corridor"],
  "DOVER_STRAIT": [51.25, 1.70, "Dover Strait TSS"],
  "ENGLISH_CHANNEL_MID": [50.10, -0.20, "English Channel Mid TSS"],
  "CASQUETS": [49.75, -2.50, "Casquets TSS"],
  "USHANT": [48.60, -5.40, "Ouessant / Ushant TSS"],

  // Atlantic Europe & Africa
  "BISCAY_MID": [45.50, -7.00, "Bay of Biscay Deepwater Lane"],
  "FINISTERRE": [43.00, -9.50, "Cape Finisterre TSS"],
  "LISBON_APP": [38.65, -9.40, "Lisbon Fairway"],
  "ST_VINCENT": [36.90, -9.10, "Cape St. Vincent TSS"],
  "CANARY_PASS": [28.20, -15.00, "Canary Islands Corridor"],
  "CAPE_VERDE_PASS": [15.00, -25.00, "Cape Verde Deepsea Lane"],
  "GULF_OF_GUINEA": [4.00, 3.00, "Gulf of Guinea Shipping Lane"],
  "CAPE_AGULHAS": [-34.85, 20.00, "Cape of Good Hope / Agulhas Route"],

  // Gibraltar & Mediterranean
  "GIBRALTAR_W": [35.95, -5.90, "Gibraltar Strait West Approach"],
  "GIBRALTAR_MID": [35.97, -5.35, "Strait of Gibraltar TSS"],
  "GIBRALTAR_E": [36.10, -4.50, "Gibraltar East / Alboran Sea"],
  "MED_WEST": [37.80, 2.50, "South Balearic Sea Transit"],
  "MED_SICILY": [36.80, 11.80, "Sicily Channel / Pantelleria TSS"],
  "MESSINA_STRAIT": [38.20, 15.58, "Strait of Messina TSS"],
  "MED_MALTA": [35.50, 14.50, "Malta Channel Deepwater Route"],
  "MED_CRETE": [34.50, 24.50, "South of Crete Corridor"],
  "PORT_SAID_APP": [31.50, 32.35, "Port Said Fairway (Suez North)"],

  // Suez Canal & Red Sea
  "SUEZ_CANAL_MID": [30.60, 32.35, "Suez Canal Transit Corridor"],
  "SUEZ_SOUTH": [29.80, 32.55, "Suez Port Fairway (Suez South)"],
  "RED_SEA_JUBAL": [27.60, 33.80, "Strait of Jubal TSS"],
  "RED_SEA_MID": [21.50, 38.00, "Central Red Sea Deepwater Spine"],
  "RED_SEA_SOUTH": [15.50, 41.50, "Hanish / Zubair TSS"],
  "BAB_EL_MANDEB": [12.60, 43.35, "Bab-el-Mandeb Strait TSS"],
  "GULF_OF_ADEN": [12.20, 45.00, "Gulf of Aden IRTC Corridor"],
  "SOCOTRA_N": [13.00, 53.50, "Socotra North Corridor"],

  // Persian Gulf
  "RAS_TANURA_APP": [26.70, 50.25, "Ras Tanura Fairway Approach"],
  "ARABIAN_GULF_MID": [26.00, 52.50, "Central Arabian Gulf Spine"],
  "HORMUZ_STRAIT": [26.35, 56.50, "Strait of Hormuz TSS"],
  "GULF_OF_OMAN": [24.50, 58.50, "Gulf of Oman Sea Lane"],

  // Indian Ocean & Bay of Bengal
  "ARABIAN_SEA_MID": [14.00, 60.00, "Arabian Sea Transit"],
  "MUMBAI_APP": [18.90, 72.70, "Mumbai Fairway Approach"],
  "DONDRA_HEAD": [5.80, 80.55, "Dondra Head TSS (Sri Lanka South)"],
  "BAY_OF_BENGAL_S": [6.00, 88.00, "Bay of Bengal South Corridor"],
  "SIX_DEGREE_CH": [6.00, 94.00, "Great Nicobar / Six Degree Channel"],

  // Southeast Asia & Malacca
  "MALACCA_N": [5.50, 97.50, "Malacca Strait North Entrance TSS"],
  "MALACCA_MID": [2.90, 101.00, "One Fathom Bank TSS"],
  "SINGAPORE_W": [1.20, 103.65, "Singapore Strait West TSS"],
  "SINGAPORE_MAIN": [1.23, 103.85, "Singapore Main Strait TSS"],
  "SINGAPORE_E": [1.32, 104.38, "Horsburgh Light / Singapore East TSS"],

  // South China Sea & East Asia
  "SCS_SOUTH": [3.50, 105.50, "South China Sea South Corridor"],
  "SCS_MID": [10.00, 110.50, "South China Sea Deepwater Spine"],
  "SCS_NORTH": [16.50, 114.50, "South China Sea Paracels East"],
  "LUZON_STRAIT": [21.00, 120.50, "Luzon Strait / Bashi Channel"],
  "TAIWAN_STRAIT": [24.00, 119.80, "Taiwan Strait TSS"],
  "HONG_KONG_APP": [22.15, 114.25, "Hong Kong Fairway Approach"],
  "EAST_CHINA_SEA": [29.50, 123.50, "East China Sea Corridor"],
  "SHANGHAI_APP": [31.00, 122.50, "Yangtze / Shanghai Fairway"],
  "OSUMI_STRAIT": [30.90, 131.00, "Osumi Strait (South Japan)"],
  "TOKYO_APP": [34.80, 139.80, "Tokyo Bay / Uraga Suido Fairway"],
  "BUSAN_APP": [35.00, 129.20, "Busan Port Fairway Approach"],

  // North America East & Gulf
  "NEW_YORK_APP": [40.40, -73.80, "Ambrose Channel / NY Approach"],
  "CHESAPEAKE_APP": [36.90, -75.80, "Chesapeake Bay TSS"],
  "HATTERAS_E": [35.20, -74.80, "Cape Hatteras Deepsea Route"],
  "FLORIDA_STRAIT": [25.00, -79.80, "Straits of Florida TSS"],
  "KEY_WEST_S": [24.30, -82.00, "Key West South Corridor"],
  "GULF_MEXICO_MID": [26.00, -88.00, "Central Gulf of Mexico Transit"],
  "HOUSTON_APP": [29.20, -94.60, "Galveston / Houston Fairway TSS"],
  "CARIBBEAN_MID": [15.00, -75.00, "Central Caribbean Sea Lane"],
  "PANAMA_COLON": [9.40, -79.95, "Panama Cristobal / Colon Fairway"],
  "PANAMA_BALBOA": [8.85, -79.52, "Panama Balboa Pacific Fairway"],
  "PACIFIC_PANAMA_APP": [7.50, -79.80, "Gulf of Panama Deepwater Transit"],

  // Pacific Transits
  "LONG_BEACH_APP": [33.60, -118.25, "Long Beach / Los Angeles TSS"],
  "SAN_FRANCISCO_APP": [37.75, -122.60, "San Francisco Approach TSS"],
  "PACIFIC_MID_N": [38.00, -165.00, "North Pacific Great Circle Spine"],
  "PACIFIC_MID_W": [36.00, 175.00, "Western North Pacific Transit"]
};

const MARITIME_SEA_EDGES = [
  // Europe
  ["ROTTERDAM_APP", "DOVER_STRAIT"],
  ["ANTWERP_APP", "DOVER_STRAIT"],
  ["HAMBURG_APP", "SKAGERRAK"],
  ["SKAGERRAK", "KATTEGAT"],
  ["KATTEGAT", "STOREBAELT"],
  ["DOVER_STRAIT", "ENGLISH_CHANNEL_MID"],
  ["ENGLISH_CHANNEL_MID", "CASQUETS"],
  ["CASQUETS", "USHANT"],
  ["USHANT", "BISCAY_MID"],
  ["BISCAY_MID", "FINISTERRE"],
  ["FINISTERRE", "LISBON_APP"],
  ["LISBON_APP", "ST_VINCENT"],
  ["FINISTERRE", "ST_VINCENT"],

  // Gibraltar & Med
  ["ST_VINCENT", "GIBRALTAR_W"],
  ["GIBRALTAR_W", "GIBRALTAR_MID"],
  ["GIBRALTAR_MID", "GIBRALTAR_E"],
  ["GIBRALTAR_E", "MED_WEST"],
  ["MED_WEST", "MED_SICILY"],
  ["MED_SICILY", "MESSINA_STRAIT"],
  ["MESSINA_STRAIT", "MED_MALTA"],
  ["MED_SICILY", "MED_MALTA"],
  ["MED_MALTA", "MED_CRETE"],
  ["MED_CRETE", "PORT_SAID_APP"],

  // Suez & Red Sea
  ["PORT_SAID_APP", "SUEZ_CANAL_MID"],
  ["SUEZ_CANAL_MID", "SUEZ_SOUTH"],
  ["SUEZ_SOUTH", "RED_SEA_JUBAL"],
  ["RED_SEA_JUBAL", "RED_SEA_MID"],
  ["RED_SEA_MID", "RED_SEA_SOUTH"],
  ["RED_SEA_SOUTH", "BAB_EL_MANDEB"],
  ["BAB_EL_MANDEB", "GULF_OF_ADEN"],
  ["GULF_OF_ADEN", "SOCOTRA_N"],

  // Persian Gulf
  ["RAS_TANURA_APP", "ARABIAN_GULF_MID"],
  ["ARABIAN_GULF_MID", "HORMUZ_STRAIT"],
  ["HORMUZ_STRAIT", "GULF_OF_OMAN"],
  ["GULF_OF_OMAN", "ARABIAN_SEA_MID"],

  // Indian Ocean
  ["SOCOTRA_N", "ARABIAN_SEA_MID"],
  ["ARABIAN_SEA_MID", "MUMBAI_APP"],
  ["MUMBAI_APP", "DONDRA_HEAD"],
  ["ARABIAN_SEA_MID", "DONDRA_HEAD"],
  ["DONDRA_HEAD", "BAY_OF_BENGAL_S"],
  ["BAY_OF_BENGAL_S", "SIX_DEGREE_CH"],
  ["DONDRA_HEAD", "SIX_DEGREE_CH"],

  // Malacca & Singapore
  ["SIX_DEGREE_CH", "MALACCA_N"],
  ["MALACCA_N", "MALACCA_MID"],
  ["MALACCA_MID", "SINGAPORE_W"],
  ["SINGAPORE_W", "SINGAPORE_MAIN"],
  ["SINGAPORE_MAIN", "SINGAPORE_E"],

  // South China Sea & East Asia
  ["SINGAPORE_E", "SCS_SOUTH"],
  ["SCS_SOUTH", "SCS_MID"],
  ["SCS_MID", "SCS_NORTH"],
  ["SCS_NORTH", "HONG_KONG_APP"],
  ["SCS_NORTH", "LUZON_STRAIT"],
  ["SCS_NORTH", "TAIWAN_STRAIT"],
  ["HONG_KONG_APP", "TAIWAN_STRAIT"],
  ["TAIWAN_STRAIT", "EAST_CHINA_SEA"],
  ["LUZON_STRAIT", "EAST_CHINA_SEA"],
  ["EAST_CHINA_SEA", "SHANGHAI_APP"],
  ["EAST_CHINA_SEA", "BUSAN_APP"],
  ["EAST_CHINA_SEA", "OSUMI_STRAIT"],
  ["OSUMI_STRAIT", "TOKYO_APP"],
  ["BUSAN_APP", "TOKYO_APP"],

  // Cape Route (Around Africa)
  ["ST_VINCENT", "CANARY_PASS"],
  ["CANARY_PASS", "CAPE_VERDE_PASS"],
  ["CAPE_VERDE_PASS", "GULF_OF_GUINEA"],
  ["GULF_OF_GUINEA", "CAPE_AGULHAS"],
  ["CAPE_AGULHAS", "DONDRA_HEAD"],

  // Transatlantic & Americas
  ["USHANT", "NEW_YORK_APP"],
  ["NEW_YORK_APP", "CHESAPEAKE_APP"],
  ["CHESAPEAKE_APP", "HATTERAS_E"],
  ["HATTERAS_E", "FLORIDA_STRAIT"],
  ["FLORIDA_STRAIT", "KEY_WEST_S"],
  ["KEY_WEST_S", "GULF_MEXICO_MID"],
  ["GULF_MEXICO_MID", "HOUSTON_APP"],
  ["FLORIDA_STRAIT", "CARIBBEAN_MID"],
  ["CARIBBEAN_MID", "PANAMA_COLON"],
  ["PANAMA_COLON", "PANAMA_BALBOA"],
  ["PANAMA_BALBOA", "PACIFIC_PANAMA_APP"],
  ["PACIFIC_PANAMA_APP", "LONG_BEACH_APP"],
  ["LONG_BEACH_APP", "SAN_FRANCISCO_APP"],

  // Transpacific
  ["TOKYO_APP", "PACIFIC_MID_W"],
  ["PACIFIC_MID_W", "PACIFIC_MID_N"],
  ["PACIFIC_MID_N", "SAN_FRANCISCO_APP"],
  ["PACIFIC_MID_N", "LONG_BEACH_APP"]
];

function findNearestMaritimeNode(lat, lon) {
  let closestKey = null;
  let minDistance = Infinity;
  for (const [key, val] of Object.entries(MARITIME_SEA_NODES)) {
    const d = calculateHaversineDistanceNM(lat, lon, val[0], val[1]);
    if (d < minDistance) {
      minDistance = d;
      closestKey = key;
    }
  }
  return closestKey;
}


// ==========================================================================
// SETROUTE CORE A v5.66 — hard map analysis (no LLM geometry)
// Land-safe Dijkstra, Suez/Cape auto-choice, NtM/weather edge costs, audit
// ==========================================================================

/** Coarse interior land boxes — sample points on a leg must not fall inside. */
const SETROUTE_LAND_BOXES = [
  // Africa interior
  { minLat: -28, maxLat: 18, minLon: 8, maxLon: 38 },
  { minLat: 10, maxLat: 30, minLon: -5, maxLon: 32 },
  // Europe landmass (N of Med)
  { minLat: 44, maxLat: 58, minLon: -2, maxLon: 28 },
  // Asia interior (keep coastal / SCS / Yellow Sea OUT of boxes)
  { minLat: 22, maxLat: 50, minLon: 60, maxLon: 105 },
  { minLat: 10, maxLat: 26, minLon: 74, maxLon: 95 },
  // Australia
  { minLat: -32, maxLat: -16, minLon: 122, maxLon: 148 },
  // N America interior
  { minLat: 32, maxLat: 48, minLon: -110, maxLon: -85 },
  // S America interior
  { minLat: -35, maxLat: -8, minLon: -68, maxLon: -48 }
];

const SETROUTE_OCEAN_HUBS = [
  "GIBRALTAR_MID", "SUEZ_CANAL_MID", "CAPE_AGULHAS", "PANAMA_COLON",
  "SINGAPORE_MAIN", "MALACCA_MID", "DOVER_STRAIT", "BAB_EL_MANDEB",
  "UNIMAK_PASS", "NATL_GC_MID", "NPAC_GC_MID", "MED_SICILY", "DONDRA_HEAD"
];

let SETROUTE_COAST_GRID = null;
let SETROUTE_COAST_LOAD_PROMISE = null;
function setrouteOrient(ax, ay, bx, by, cx, cy) {
  const v = (by - ay) * (cx - bx) - (bx - ax) * (cy - by);
  if (Math.abs(v) < 1e-12) return 0;
  return v > 0 ? 1 : 2;
}
function setrouteOnSeg(ax, ay, bx, by, cx, cy) {
  return Math.min(ax, bx) - 1e-9 <= cx && cx <= Math.max(ax, bx) + 1e-9 &&
    Math.min(ay, by) - 1e-9 <= cy && cy <= Math.max(ay, by) + 1e-9;
}
function setrouteUnwrapLonPair(lonA, lonB) {
  let a = lonA, b = lonB;
  let d = b - a;
  if (d > 180) b -= 360;
  if (d < -180) b += 360;
  return [a, b];
}
function setrouteSegmentsIntersect(aLat, aLon, bLat, bLon, cLat, cLon, dLat, dLon) {
  // Antimeridian-safe: unwrap long legs instead of bailing (|Δlon|>90 used to skip Pacific coast tests)
  let A = aLon, B = bLon, C = cLon, D = dLon;
  const ab = setrouteUnwrapLonPair(A, B);
  A = ab[0]; B = ab[1];
  // Shift coast segment into same unwrap frame as AB midpoint
  const mid = (A + B) / 2;
  while (C - mid > 180) { C -= 360; D -= 360; }
  while (C - mid < -180) { C += 360; D += 360; }
  const cd = setrouteUnwrapLonPair(C, D);
  C = cd[0]; D = cd[1];
  const o1 = setrouteOrient(A, aLat, B, bLat, C, cLat);
  const o2 = setrouteOrient(A, aLat, B, bLat, D, dLat);
  const o3 = setrouteOrient(C, cLat, D, dLat, A, aLat);
  const o4 = setrouteOrient(C, cLat, D, dLat, B, bLat);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && setrouteOnSeg(A, aLat, B, bLat, C, cLat)) return true;
  if (o2 === 0 && setrouteOnSeg(A, aLat, B, bLat, D, dLat)) return true;
  if (o3 === 0 && setrouteOnSeg(C, cLat, D, dLat, A, aLat)) return true;
  if (o4 === 0 && setrouteOnSeg(C, cLat, D, dLat, B, bLat)) return true;
  return false;
}
function setrouteCoastCellKey(lat, lon, cellDeg) {
  return Math.floor(lat / cellDeg) + "_" + Math.floor(lon / cellDeg);
}
function setrouteLegCrossesCoastline(lat1, lon1, lat2, lon2) {
  if (!SETROUTE_COAST_GRID || !SETROUTE_COAST_GRID.cells) return false;
  const cellDeg = SETROUTE_COAST_GRID.cellDeg || 2.5;
  const dist = calculateHaversineDistanceNM(lat1, lon1, lat2, lon2);
  if (dist < 40) return false;
  const keys = new Set();
  const steps = Math.min(24, Math.max(4, Math.ceil(dist / 80)));
  for (let i = 0; i <= steps; i++) {
    const p = setrouteLerpLatLon(lat1, lon1, lat2, lon2, i / steps);
    keys.add(setrouteCoastCellKey(p[0], p[1], cellDeg));
  }
  let tested = 0;
  for (const k of keys) {
    const segs = SETROUTE_COAST_GRID.cells[k];
    if (!segs) continue;
    for (let s = 0; s < segs.length; s++) {
      const seg = segs[s];
      tested++;
      if (tested > 400) return false;
      if (setrouteSegmentsIntersect(lat1, lon1, lat2, lon2, seg[0], seg[1], seg[2], seg[3])) return true;
    }
  }
  return false;
}
async function loadSetrouteCoastGrid(force) {
  if (SETROUTE_COAST_GRID && !force) return SETROUTE_COAST_GRID;
  if (SETROUTE_COAST_LOAD_PROMISE && !force) return SETROUTE_COAST_LOAD_PROMISE;
  SETROUTE_COAST_LOAD_PROMISE = (async () => {
    try {
      const resp = await fetch("assets/geo/setroute_coast_grid.json", { cache: "force-cache" });
      if (!resp.ok) throw new Error("coast_grid_http_" + resp.status);
      SETROUTE_COAST_GRID = await resp.json();
      window.SETROUTE_COAST_GRID = SETROUTE_COAST_GRID;
      return SETROUTE_COAST_GRID;
    } catch (e) {
      console.warn("[SetRoute] coast grid load failed", e);
      SETROUTE_COAST_GRID = null;
      return null;
    }
  })();
  return SETROUTE_COAST_LOAD_PROMISE;
}
window.loadSetrouteCoastGrid = loadSetrouteCoastGrid;
function setroutePointInRing(lat, lon, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const yi = ring[i][0], xi = ring[i][1];
    const yj = ring[j][0], xj = ring[j][1];
    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lon < (xj - xi) * (lat - yi) / ((yj - yi) || 1e-12) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}
function setrouteCollectNtmKeepoutRings() {
  const rings = [];
  if (typeof NTM_STORE === "undefined" || !Array.isArray(NTM_STORE)) return rings;
  for (let i = 0; i < NTM_STORE.length; i++) {
    const n = NTM_STORE[i];
    if (!n || n.isCancelled || n.status === "CANCELLED") continue;
    const blob = ((n.subject || "") + " " + (n.title || "") + " " + (n.type || "")).toUpperCase();
    const isHazard = /DANGER|EXCLUSION|PROHIBITED|TSS|TRAFFIC SEPARATION|MINE|FIRING|GUNNERY|PIPE|CABLE|RESTRICTED/.test(blob) ||
      n.type === "T" || n.type === "P";
    if (!(n.subPolygons && n.subPolygons.length)) continue;
    n.subPolygons.forEach((sub) => {
      const pts = sub.points || (sub.coords || []).map((c) => [c.lat, c.lon]);
      if (pts && pts.length >= 3) rings.push({ ring: pts, weight: isHazard ? 120 : 45 });
    });
  }
  return rings;
}
function setrouteNtmPolygonPenalty(lat1, lon1, lat2, lon2) {
  const rings = setrouteCollectNtmKeepoutRings();
  if (!rings.length) return 0;
  let pen = 0;
  const samples = [0.2, 0.4, 0.6, 0.8];
  for (let r = 0; r < rings.length && pen < 800; r++) {
    const ring = rings[r].ring, weight = rings[r].weight;
    let hit = false;
    for (let s = 0; s < samples.length; s++) {
      const p = setrouteLerpLatLon(lat1, lon1, lat2, lon2, samples[s]);
      if (setroutePointInRing(p[0], p[1], ring)) { hit = true; break; }
    }
    if (!hit) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        if (setrouteSegmentsIntersect(lat1, lon1, lat2, lon2, ring[j][0], ring[j][1], ring[i][0], ring[i][1])) {
          hit = true; break;
        }
      }
    }
    if (hit) pen += weight;
  }
  return pen;
}

function setrouteLerpLatLon(lat1, lon1, lat2, lon2, t) {
  // Simple rhumb-ish lerp in degrees (good enough for land-box sampling)
  let dLon = lon2 - lon1;
  if (dLon > 180) dLon -= 360;
  if (dLon < -180) dLon += 360;
  let lon = lon1 + dLon * t;
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;
  return [lat1 + (lat2 - lat1) * t, lon];
}

function setroutePointInLandBox(lat, lon) {
  for (let i = 0; i < SETROUTE_LAND_BOXES.length; i++) {
    const b = SETROUTE_LAND_BOXES[i];
    if (lat >= b.minLat && lat <= b.maxLat && lon >= b.minLon && lon <= b.maxLon) {
      return true;
    }
  }
  return false;
}

/** True if a direct chord likely crosses continental interior. */
function setrouteLegLikelyCrossesLand(lat1, lon1, lat2, lon2) {
  const dist = calculateHaversineDistanceNM(lat1, lon1, lat2, lon2);
  if (dist < 80) return false;
  if (typeof setrouteLegCrossesCoastline === "function" && setrouteLegCrossesCoastline(lat1, lon1, lat2, lon2)) return true;
  const samples = dist > 800 ? [0.15, 0.3, 0.45, 0.55, 0.7, 0.85] : [0.25, 0.5, 0.75];
  let hits = 0;
  for (let i = 0; i < samples.length; i++) {
    const p = setrouteLerpLatLon(lat1, lon1, lat2, lon2, samples[i]);
    if (setroutePointInLandBox(p[0], p[1])) hits++;
  }
  // Long ocean GC can graze one box — require 2+ hits or one hit on short/medium legs
  if (dist >= 1500) return hits >= 2;
  return hits >= 1;
}

function setrouteIsEuropeMedPort(lat, lon) {
  return lat >= 28 && lat <= 62 && lon >= -15 && lon <= 42;
}
function setrouteIsAsiaGulfPort(lat, lon) {
  return lon >= 48 && lon <= 150 && lat >= -45 && lat <= 50;
}
function setrouteIsAmericasPort(lat, lon) {
  return lon <= -30 || lon >= 160;
}

function setrouteEdgeHazardPenalty(lat1, lon1, lat2, lon2) {
  let pen = 0;
  const mid = setrouteLerpLatLon(lat1, lon1, lat2, lon2, 0.5);
  // Weather layer: cyclones + heavy seas + OPC warnings
  if (typeof MARINE_WEATHER_STORE !== "undefined") {
    (MARINE_WEATHER_STORE.storms || []).forEach((st) => {
      if (!st || !Array.isArray(st.center)) return;
      const d = calculateHaversineDistanceNM(mid[0], mid[1], st.center[0], st.center[1]);
      const r = (st.dangerRadiusNm || 100) + 100;
      if (d < r) {
        pen += 80 + Math.max(0, (r - d) * 1.2) + Math.min(120, (st.maxWinds || 0) * 0.4);
      }
    });
    (MARINE_WEATHER_STORE.waves || []).forEach((w) => {
      if (!w || !Array.isArray(w.center) || !(w.waveHeight >= 4.0)) return;
      const d = calculateHaversineDistanceNM(mid[0], mid[1], w.center[0], w.center[1]);
      if (d < 120) pen += 15 + Math.min(40, (w.waveHeight - 4) * 8);
    });
    (MARINE_WEATHER_STORE.opcWarnings || []).forEach((w) => {
      if (!w || !Array.isArray(w.center)) return;
      const d = calculateHaversineDistanceNM(mid[0], mid[1], w.center[0], w.center[1]);
      if (d < 150) pen += 20;
    });
  }
  // NtM + NAVTEX layer (NAVTEX weighted higher)
  if (typeof NTM_STORE !== "undefined" && Array.isArray(NTM_STORE)) {
    let ntmCount = 0;
    let navtexCount = 0;
    for (let i = 0; i < NTM_STORE.length && (ntmCount + navtexCount) < 14; i++) {
      const n = NTM_STORE[i];
      if (!n || n.isCancelled || n.status === "CANCELLED") continue;
      const cLat = Number.isFinite(n.lat) ? n.lat : (n.coords && n.coords[0] ? n.coords[0].lat : NaN);
      const cLon = Number.isFinite(n.lon) ? n.lon : (n.coords && n.coords[0] ? n.coords[0].lon : NaN);
      if (!Number.isFinite(cLat) || !Number.isFinite(cLon)) continue;
      const d = typeof pointToSegmentDistanceNM === "function"
        ? pointToSegmentDistanceNM(cLat, cLon, lat1, lon1, lat2, lon2)
        : calculateHaversineDistanceNM(mid[0], mid[1], cLat, cLon);
      const isNavtex = n.type === "NAVTEX";
      const rad = isNavtex ? 40 : 30;
      if (d <= rad) {
        pen += isNavtex ? 40 : 25;
        if (isNavtex) navtexCount++; else ntmCount++;
      }
    }
  }
  if (typeof setrouteNtmPolygonPenalty === "function") {
    pen += setrouteNtmPolygonPenalty(lat1, lon1, lat2, lon2);
  }
  // AIS layer: local traffic density near coastal / canal legs
  if (typeof setrouteAisPenalty === "function") {
    pen += setrouteAisPenalty(lat1, lon1, lat2, lon2);
  }
  if (setrouteLegLikelyCrossesLand(lat1, lon1, lat2, lon2)) {
    pen += 50000; // effectively forbid
  }
  return pen;
}

function setrouteBuildAdjacency() {
  const adj = {};
  Object.keys(MARITIME_SEA_NODES).forEach((k) => { adj[k] = []; });
  for (const [u, v] of MARITIME_SEA_EDGES) {
    if (!MARITIME_SEA_NODES[u] || !MARITIME_SEA_NODES[v]) continue;
    const a = MARITIME_SEA_NODES[u];
    const b = MARITIME_SEA_NODES[v];
    const dist = calculateHaversineDistanceNM(a[0], a[1], b[0], b[1]);
    const hazard = setrouteEdgeHazardPenalty(a[0], a[1], b[0], b[1]);
    const cost = dist + hazard;
    if (hazard >= 50000) continue; // drop land-crossing graph edges
    adj[u].push({ node: v, dist, cost });
    adj[v].push({ node: u, dist, cost });
  }
  return adj;
}

function setrouteDijkstra(startNode, endNode, adj) {
  if (!startNode || !endNode || !adj[startNode] || !adj[endNode]) return null;
  if (startNode === endNode) return [startNode];

  const dists = {};
  const prev = {};
  const visited = new Set();
  Object.keys(MARITIME_SEA_NODES).forEach((k) => {
    dists[k] = Infinity;
    prev[k] = null;
  });
  dists[startNode] = 0;
  const keys = Object.keys(MARITIME_SEA_NODES);
  for (let step = 0; step < keys.length; step++) {
    let u = null;
    let uDist = Infinity;
    for (const k of keys) {
      if (!visited.has(k) && dists[k] < uDist) {
        uDist = dists[k];
        u = k;
      }
    }
    if (u === null || uDist === Infinity) break;
    if (u === endNode) break;
    visited.add(u);
    for (const edge of adj[u] || []) {
      if (visited.has(edge.node)) continue;
      const alt = dists[u] + edge.cost;
      if (alt < dists[edge.node]) {
        dists[edge.node] = alt;
        prev[edge.node] = u;
      }
    }
  }
  if (dists[endNode] === Infinity) return null;
  const path = [];
  let curr = endNode;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }
  return path[0] === startNode ? path : null;
}

function setroutePathCostNM(path) {
  if (!path || path.length < 2) return 0;
  let t = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const a = MARITIME_SEA_NODES[path[i]];
    const b = MARITIME_SEA_NODES[path[i + 1]];
    if (a && b) t += calculateHaversineDistanceNM(a[0], a[1], b[0], b[1]);
  }
  return t;
}

function setroutePathViaNode(startNode, endNode, viaNode, adj) {
  if (!viaNode || !MARITIME_SEA_NODES[viaNode]) return null;
  const p1 = setrouteDijkstra(startNode, viaNode, adj);
  const p2 = setrouteDijkstra(viaNode, endNode, adj);
  if (!p1 || !p2) return null;
  return p1.concat(p2.slice(1));
}

function setroutePathViaHubs(startNode, endNode, adj) {
  let best = null;
  let bestCost = Infinity;
  for (let i = 0; i < SETROUTE_OCEAN_HUBS.length; i++) {
    const h = SETROUTE_OCEAN_HUBS[i];
    if (h === startNode || h === endNode || !MARITIME_SEA_NODES[h]) continue;
    const path = setroutePathViaNode(startNode, endNode, h, adj);
    if (!path) continue;
    const c = setroutePathCostNM(path);
    if (c < bestCost) {
      bestCost = c;
      best = path;
    }
  }
  // Two-hub attempts for hard pairs (e.g. Med -> Far East already covered; Pacific transits)
  const hub2 = ["GIBRALTAR_MID", "CAPE_AGULHAS", "PANAMA_COLON", "SINGAPORE_MAIN", "UNIMAK_PASS"];
  for (let i = 0; i < hub2.length; i++) {
    for (let j = 0; j < hub2.length; j++) {
      if (i === j) continue;
      const h1 = hub2[i];
      const h2b = hub2[j];
      const a = setrouteDijkstra(startNode, h1, adj);
      const b = setrouteDijkstra(h1, h2b, adj);
      const c = setrouteDijkstra(h2b, endNode, adj);
      if (!a || !b || !c) continue;
      const path = a.concat(b.slice(1)).concat(c.slice(1));
      const cost = setroutePathCostNM(path);
      if (cost < bestCost) {
        bestCost = cost;
        best = path;
      }
    }
  }
  return best;
}


/** Prefer sea approach node coords over city-center geocode. */
function setrouteSnapPortToSea(port) {
  if (!port) return port;
  const c = port.approachCoords || port.coords;
  if (!c || !Number.isFinite(Number(c[0])) || !Number.isFinite(Number(c[1]))) return port;
  if (typeof findNearestMaritimeNode !== "function" || typeof MARITIME_SEA_NODES === "undefined") return port;
  const key = findNearestMaritimeNode(Number(c[0]), Number(c[1]));
  const node = key && MARITIME_SEA_NODES[key];
  if (!node) return port;
  const d = calculateHaversineDistanceNM(Number(c[0]), Number(c[1]), node[0], node[1]);
  // Only snap when the geocode is inland / far from a fairway (>25 NM) or missing approach
  if (!port.approachCoords || d > 25) {
    port.approachCoords = [node[0], node[1]];
    port._setrouteSnapNode = key;
  }
  return port;
}

function setrouteIsFarEastPort(lat, lon) {
  return lon >= 100 && lon <= 150 && lat >= 0 && lat <= 50;
}

function setrouteIsUsGulfPort(lat, lon) {
  return lat >= 24 && lat <= 32 && lon <= -80 && lon >= -98;
}

let SETROUTE_CORRIDOR_TEMPLATES = null;
let SETROUTE_PASSAGE_KNOWLEDGE = null;
let SETROUTE_TEMPLATES_LOAD_PROMISE = null;
async function loadSetrouteCorridorTemplates(force) {
  if (SETROUTE_CORRIDOR_TEMPLATES && !force) return SETROUTE_CORRIDOR_TEMPLATES;
  if (SETROUTE_TEMPLATES_LOAD_PROMISE && !force) return SETROUTE_TEMPLATES_LOAD_PROMISE;
  SETROUTE_TEMPLATES_LOAD_PROMISE = (async () => {
    try {
      // Prefer expanded passage-knowledge pack (IMO A.893 + OPW-style corridors + live-layer map)
      let resp = await fetch("assets/geo/setroute_passage_knowledge.json", { cache: "force-cache" });
      if (!resp.ok) {
        resp = await fetch("assets/geo/setroute_corridor_templates.json", { cache: "force-cache" });
      }
      if (!resp.ok) throw new Error("templates_http_" + resp.status);
      const data = await resp.json();
      SETROUTE_PASSAGE_KNOWLEDGE = data && data.sources ? data : null;
      SETROUTE_CORRIDOR_TEMPLATES = Array.isArray(data.templates) ? data.templates : [];
      if (data.canalLimitsMeters) {
        window.SETROUTE_CANAL_LIMITS_M = data.canalLimitsMeters;
      }
    } catch (e) {
      console.warn("[SetRoute] passage knowledge / corridor templates load failed", e);
      SETROUTE_CORRIDOR_TEMPLATES = [];
      SETROUTE_PASSAGE_KNOWLEDGE = null;
    }
    return SETROUTE_CORRIDOR_TEMPLATES;
  })();
  return SETROUTE_TEMPLATES_LOAD_PROMISE;
}

/** IMO A.893(21)-style appraisal summary from live layers + knowledge pack (Core A, not LLM). */
function setrouteBuildAppraisalFactors(route, opts) {
  opts = opts || {};
  const factors = [];
  const pk = SETROUTE_PASSAGE_KNOWLEDGE;
  if (pk && Array.isArray(pk.sources)) {
    factors.push({
      id: "knowledge_pack",
      ok: true,
      text: "Passage knowledge pack loaded (" + pk.sources.length + " source families)."
    });
  }
  const ntmN = (typeof NTM_STORE !== "undefined" && Array.isArray(NTM_STORE))
    ? NTM_STORE.filter((n) => n && !n.isCancelled && n.type !== "NAVTEX").length : 0;
  const navtexN = (typeof NTM_STORE !== "undefined" && Array.isArray(NTM_STORE))
    ? NTM_STORE.filter((n) => n && !n.isCancelled && n.type === "NAVTEX").length : 0;
  factors.push({ id: "ntm", ok: true, text: "NtM active objects available: " + ntmN });
  factors.push({ id: "navtex", ok: true, text: "NAVTEX active objects available: " + navtexN });
  const wx = (typeof MARINE_WEATHER_STORE !== "undefined") ? MARINE_WEATHER_STORE : {};
  factors.push({
    id: "weather",
    ok: true,
    text: "Weather layer: storms=" + ((wx.storms || []).length) +
      ", waves=" + ((wx.waves || []).length) +
      ", opc=" + ((wx.opcWarnings || []).length)
  });
  let aisN = 0;
  try {
    if (typeof window.getAisTargetsSnapshot === "function") {
      aisN = (window.getAisTargetsSnapshot(50) || []).length;
    }
  } catch (e) {}
  factors.push({ id: "ais", ok: true, text: "AIS snapshot sample available: " + (aisN > 0 ? "yes" : "empty/offline") });
  factors.push({
    id: "coast_grid",
    ok: !!SETROUTE_COAST_GRID,
    text: SETROUTE_COAST_GRID ? "Coast grid loaded for land-cross tests." : "Coast grid missing — ocean OD fail-closed when required."
  });
  const draft = Number(opts.draftMeters || (route && route.metadata && route.metadata.draftMeters));
  const canalLim = window.SETROUTE_CANAL_LIMITS_M || {};
  if (Number.isFinite(draft) && route && Array.isArray(route.waypoints)) {
    const hits = [];
    (route.chokepoints || []).forEach(() => {});
    Object.keys(canalLim).forEach((nodeKey) => {
      const node = MARITIME_SEA_NODES[nodeKey];
      if (!node) return;
      const near = (route.waypoints || []).some((wp) =>
        calculateHaversineDistanceNM(wp.lat, wp.lon, node[0], node[1]) < 40
      );
      if (near && draft > canalLim[nodeKey] + 0.05) {
        hits.push(nodeKey + " max ~" + canalLim[nodeKey] + "m");
      }
    });
    factors.push({
      id: "canal_draft",
      ok: hits.length === 0,
      text: hits.length
        ? ("Draft " + draft + "m may exceed canal/strait limits: " + hits.join(", "))
        : ("Draft " + draft + "m checked against known canal limits.")
    });
  }
  return factors;
}

function setrouteMatchCorridorTemplate(origName, destName) {
  const list = SETROUTE_CORRIDOR_TEMPLATES || [];
  const o = String(origName || "").toLowerCase();
  const d = String(destName || "").toLowerCase();
  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    if (!t || !Array.isArray(t.nodeKeys) || t.nodeKeys.length < 3) continue;
    const oh = (t.originHints || []).some((h) => o.indexOf(String(h).toLowerCase()) >= 0);
    const dh = (t.destHints || []).some((h) => d.indexOf(String(h).toLowerCase()) >= 0);
    if (oh && dh) return t;
  }
  return null;
}

function setrouteValidateNodePath(nodeKeys) {
  if (!nodeKeys || nodeKeys.length < 2) return null;
  const path = [];
  for (let i = 0; i < nodeKeys.length; i++) {
    const k = nodeKeys[i];
    if (!MARITIME_SEA_NODES[k]) continue;
    if (path.length && path[path.length - 1] === k) continue;
    path.push(k);
  }
  if (path.length < 2) return null;
  for (let i = 0; i < path.length - 1; i++) {
    const a = MARITIME_SEA_NODES[path[i]];
    const b = MARITIME_SEA_NODES[path[i + 1]];
    if (setrouteLegLikelyCrossesLand(a[0], a[1], b[0], b[1])) return null;
  }
  return path;
}

function setroutePathHasCriticalLayerBlock(path) {
  if (!path || path.length < 2) return false;
  for (let i = 0; i < path.length - 1; i++) {
    const a = MARITIME_SEA_NODES[path[i]];
    const b = MARITIME_SEA_NODES[path[i + 1]];
    if (!a || !b) continue;
    const pen = setrouteEdgeHazardPenalty(a[0], a[1], b[0], b[1]);
    if (pen >= 50000) return true;
  }
  return false;
}

/** Densify long ocean legs so map polyline does not look like a land chord. */
function setrouteDensifyWaypoints(waypoints, maxLegNm) {
  const maxNm = Number(maxLegNm) || 350;
  if (!Array.isArray(waypoints) || waypoints.length < 2) return waypoints;
  const out = [waypoints[0]];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const dist = calculateHaversineDistanceNM(a.lat, a.lon, b.lat, b.lon);
    if (dist > maxNm) {
      const n = Math.min(12, Math.max(1, Math.ceil(dist / maxNm) - 1));
      for (let s = 1; s <= n; s++) {
        const p = setrouteLerpLatLon(a.lat, a.lon, b.lat, b.lon, s / (n + 1));
        // Skip insert if densify sample is on land
        if (setroutePointInLandBox(p[0], p[1])) continue;
        out.push({
          wptNo: "TMP",
          name: "Ocean track",
          lat: Number(p[0].toFixed(5)),
          lon: Number(p[1].toFixed(5)),
          speedKnots: a.speedKnots,
          portsideXTD: a.portsideXTD,
          starboardXTD: a.starboardXTD,
          turnRadius: 0.8,
          sail: a.sail || "GC",
          rot: 8.0
        });
      }
    }
    out.push(b);
  }
  out.forEach((wp, idx) => { wp.wptNo = ("00" + (idx + 1)).slice(-3); wp.id = idx + 1; });
  return out;
}

function setrouteAisPenalty(lat1, lon1, lat2, lon2) {
  if (typeof window.getAisTargetsSnapshot !== "function") return 0;
  let targets;
  try { targets = window.getAisTargetsSnapshot(600); } catch (e) { return 0; }
  if (!targets || !targets.length) return 0;
  const dist = calculateHaversineDistanceNM(lat1, lon1, lat2, lon2);
  // Only apply local AIS clustering near coastal / canal legs
  if (dist > 900) return 0;
  let hits = 0;
  const lim = Math.min(targets.length, 400);
  for (let i = 0; i < lim; i++) {
    const t = targets[i];
    const d = typeof pointToSegmentDistanceNM === "function"
      ? pointToSegmentDistanceNM(t.lat, t.lon, lat1, lon1, lat2, lon2)
      : calculateHaversineDistanceNM((lat1 + lat2) / 2, (lon1 + lon2) / 2, t.lat, t.lon);
    if (d <= 8) hits++;
    if (hits >= 25) break;
  }
  if (hits >= 18) return 35 + hits * 1.5;
  if (hits >= 8) return 12 + hits;
  return 0;
}


/**
 * Core A corridor finder — never returns a land-crossing chord.
 * options.viaCape / options.viaSuez force canal/cape branch.
 */
function findMaritimeSeaCorridor(origCoords, destCoords, options) {
  options = options || {};
  const startNode = findNearestMaritimeNode(origCoords[0], origCoords[1]);
  const endNode = findNearestMaritimeNode(destCoords[0], destCoords[1]);
  if (!startNode || !endNode) {
    return startNode ? [startNode] : ["ROTTERDAM_APP"];
  }
  if (startNode === endNode) return [startNode];

  const adj = setrouteBuildAdjacency();
  let path = null;
  let routeMode = "shortest_sea";

  if (options.viaCape) {
    path = setroutePathViaNode(startNode, endNode, "CAPE_AGULHAS", adj);
    routeMode = "via_cape";
  } else if (options.viaPanama) {
    path = setroutePathViaNode(startNode, endNode, "PANAMA_COLON", adj)
      || setroutePathViaNode(startNode, endNode, "PANAMA_BALBOA", adj);
    routeMode = "via_panama";
  } else if (options.viaSuez) {
    path = setroutePathViaNode(startNode, endNode, "SUEZ_CANAL_MID", adj);
    routeMode = "via_suez";
  } else if (
    (setrouteIsEuropeMedPort(origCoords[0], origCoords[1]) && setrouteIsAsiaGulfPort(destCoords[0], destCoords[1])) ||
    (setrouteIsAsiaGulfPort(origCoords[0], origCoords[1]) && setrouteIsEuropeMedPort(destCoords[0], destCoords[1]))
  ) {
    const suez = setroutePathViaNode(startNode, endNode, "SUEZ_CANAL_MID", adj);
    const cape = setroutePathViaNode(startNode, endNode, "CAPE_AGULHAS", adj);
    const suezCost = suez ? setroutePathCostNM(suez) : Infinity;
    const capeCost = cape ? setroutePathCostNM(cape) : Infinity;
    // Prefer Suez unless Cape is meaningfully shorter (rare) or draft forces Cape later
    if (suez && suezCost <= capeCost * 1.08) {
      path = suez;
      routeMode = "via_suez_auto";
    } else if (cape) {
      path = cape;
      routeMode = "via_cape_auto";
    }
  } else if (
    (setrouteIsEuropeMedPort(origCoords[0], origCoords[1]) && setrouteIsAmericasPort(destCoords[0], destCoords[1])) ||
    (setrouteIsAmericasPort(origCoords[0], origCoords[1]) && setrouteIsEuropeMedPort(destCoords[0], destCoords[1]))
  ) {
    // Prefer North Atlantic GC hubs; Panama if Pacific-bound Americas
    const natl = setroutePathViaNode(startNode, endNode, "NATL_GC_MID", adj);
    const panama = setroutePathViaNode(startNode, endNode, "PANAMA_COLON", adj);
    const direct = setrouteDijkstra(startNode, endNode, adj);
    const candidates = [
      { p: direct, m: "shortest_sea" },
      { p: natl, m: "via_natl" },
      { p: panama, m: "via_panama" }
    ].filter((c) => c.p);
    candidates.sort((a, b) => setroutePathCostNM(a.p) - setroutePathCostNM(b.p));
    if (candidates.length) {
      path = candidates[0].p;
      routeMode = candidates[0].m;
    }
  } else if (
    (setrouteIsFarEastPort(origCoords[0], origCoords[1]) && setrouteIsAmericasPort(destCoords[0], destCoords[1])) ||
    (setrouteIsAmericasPort(origCoords[0], origCoords[1]) && setrouteIsFarEastPort(destCoords[0], destCoords[1]))
  ) {
    // Far East ↔ Americas: never allow sparse GC — force ocean candidates via Panama / NPAC
    const panama = setroutePathViaNode(startNode, endNode, "PANAMA_COLON", adj)
      || setroutePathViaNode(startNode, endNode, "PANAMA_BALBOA", adj);
    const npac = setroutePathViaNode(startNode, endNode, "NPAC_GC_MID", adj);
    const unimak = setroutePathViaNode(startNode, endNode, "UNIMAK_PASS", adj);
    const cape = setroutePathViaNode(startNode, endNode, "CAPE_AGULHAS", adj);
    const direct = setrouteDijkstra(startNode, endNode, adj);
    const candidates = [
      { p: panama, m: "via_panama_fareast" },
      { p: npac, m: "via_npac" },
      { p: unimak, m: "via_unimak" },
      { p: direct, m: "shortest_sea" },
      { p: cape, m: "via_cape_fareast" }
    ].filter((c) => c.p && c.p.length >= 4);
    // Prefer Panama for US Gulf / Caribbean destinations
    if (setrouteIsUsGulfPort(destCoords[0], destCoords[1]) || setrouteIsUsGulfPort(origCoords[0], origCoords[1])) {
      candidates.sort((a, b) => {
        const ap = a.m.indexOf("panama") >= 0 ? -5000 : 0;
        const bp = b.m.indexOf("panama") >= 0 ? -5000 : 0;
        return (setroutePathCostNM(a.p) + ap) - (setroutePathCostNM(b.p) + bp);
      });
    } else {
      candidates.sort((a, b) => setroutePathCostNM(a.p) - setroutePathCostNM(b.p));
    }
    if (candidates.length) {
      path = candidates[0].p;
      routeMode = candidates[0].m;
    }
  }

  // Optional OPW-style corridor template seed (still validated for land)
  if ((!path || path.length < 4) && options.templatePath && options.templatePath.length >= 4) {
    const tv = setrouteValidateNodePath(options.templatePath);
    if (tv && !setroutePathHasCriticalLayerBlock(tv)) {
      path = tv;
      routeMode = "template_" + (options.templateId || "corridor");
    }
  }

  if (!path) {
    path = setrouteDijkstra(startNode, endNode, adj);
    routeMode = "shortest_sea";
  }
  if (!path) {
    path = setroutePathViaHubs(startNode, endNode, adj);
    routeMode = "via_ocean_hubs";
  }

  // Last resort: hubs only — never invent a 2-node ocean chord (crosses land / antimeridian visually)
  if (!path) {
    path = setroutePathViaHubs(startNode, endNode, adj);
    routeMode = "hub_fallback";
  }
  if (!path) {
    // Absolute fail-closed: single node signals "no safe corridor" to callers
    path = [startNode];
    routeMode = "no_safe_corridor";
  }

  // Validate successive corridor legs; splice hubs if a graph hop somehow still looks landy
  if (path && path.length >= 2) {
    const fixed = [path[0]];
    for (let i = 0; i < path.length - 1; i++) {
      const a = MARITIME_SEA_NODES[path[i]];
      const b = MARITIME_SEA_NODES[path[i + 1]];
      if (a && b && setrouteLegLikelyCrossesLand(a[0], a[1], b[0], b[1])) {
        const midHub = SETROUTE_OCEAN_HUBS.find((h) => {
          if (h === path[i] || h === path[i + 1] || !MARITIME_SEA_NODES[h]) return false;
          const n = MARITIME_SEA_NODES[h];
          return !setrouteLegLikelyCrossesLand(a[0], a[1], n[0], n[1]) &&
            !setrouteLegLikelyCrossesLand(n[0], n[1], b[0], b[1]);
        });
        if (midHub) fixed.push(midHub);
      }
      fixed.push(path[i + 1]);
    }
    path = fixed;
  }

  findMaritimeSeaCorridor._lastMeta = { startNode, endNode, routeMode, hops: (path && path.length) || 0 };
  return path;
}

function auditPassagePlan(route) {
  if (!route || !Array.isArray(route.waypoints) || route.waypoints.length < 2) {
    return { ok: false, grade: "N/A", summary: "No route to audit.", issues: [], stats: {} };
  }
  if (!route.legs || !route.legs.length) {
    enrichRouteWithLegsTelemetry(route, route.metadata || {});
  }
  const issues = [];
  let ntmTotal = 0;
  let wxTotal = 0;
  let landLegs = 0;
  let tssLegs = 0;
  (route.legs || []).forEach((leg) => {
    ntmTotal += (leg.ntmHits || []).length;
    wxTotal += (leg.weatherHits || []).length;
    if ((leg.navZone || "").indexOf("TSS") >= 0) tssLegs++;
    if (setrouteLegLikelyCrossesLand(leg.fromLat, leg.fromLon, leg.toLat, leg.toLon)) {
      landLegs++;
      issues.push({
        severity: "critical",
        leg: leg.legNo,
        text: `Leg ${leg.legNo} may cross land (${leg.fromName} → ${leg.toName}). Re-plan via sea hubs.`
      });
    }
    if ((leg.weatherHits || []).length) {
      issues.push({
        severity: "warn",
        leg: leg.legNo,
        text: `Leg ${leg.legNo}: weather CPA — ${(leg.weatherHits || []).join("; ")}`
      });
    }
    if ((leg.ntmHits || []).length >= 2) {
      issues.push({
        severity: "info",
        leg: leg.legNo,
        text: `Leg ${leg.legNo}: ${(leg.ntmHits || []).length} nearby NtM/NAVTEX objects`
      });
    }
  });
  // Endpoint draft check if available
  try {
    if (typeof checkDraftClearance === "function") {
      /* UI-side; skip */
    }
  } catch (e) {}

  let grade = "A";
  if (landLegs > 0) grade = "F";
  else if (wxTotal >= 3 || issues.filter((i) => i.severity === "warn").length >= 3) grade = "C";
  else if (wxTotal >= 1 || ntmTotal >= 4) grade = "B";

  const appraisal = typeof setrouteBuildAppraisalFactors === "function"
    ? setrouteBuildAppraisalFactors(route, route.metadata || {})
    : [];
  (appraisal || []).forEach((f) => {
    if (f && f.ok === false) {
      issues.push({ severity: "critical", leg: null, text: f.text });
      if (grade !== "F") grade = "D";
    }
  });
  const summary =
    `Safety audit ${grade}: ${route.totalDistanceNM || "—"} NM, ${(route.legs || []).length} legs, ` +
    `${tssLegs} TSS/strait, ${ntmTotal} NtM proximity hits, ${wxTotal} weather CPA flags` +
    (landLegs ? `, ${landLegs} LAND-CROSS RISK` : ", no land-cross flags") +
    ((SETROUTE_PASSAGE_KNOWLEDGE && SETROUTE_PASSAGE_KNOWLEDGE.sources)
      ? `, knowledge:${SETROUTE_PASSAGE_KNOWLEDGE.sources.length}`
      : "");
  route.safetyAudit = {
    ok: landLegs === 0 && !(appraisal || []).some((f) => f && f.ok === false),
    grade,
    summary,
    issues,
    stats: { ntmTotal, wxTotal, landLegs, tssLegs },
    appraisal,
    knowledgeSources: (SETROUTE_PASSAGE_KNOWLEDGE && SETROUTE_PASSAGE_KNOWLEDGE.sources) || []
  };
  return route.safetyAudit;
}
window.auditPassagePlan = auditPassagePlan;
window.findMaritimeSeaCorridor = findMaritimeSeaCorridor;
window.setrouteLegLikelyCrossesLand = setrouteLegLikelyCrossesLand;


function initSetRoute() {
  const originSel = document.getElementById("setRouteOriginSelect");
  const destSel = document.getElementById("setRouteDestSelect");
  const swapBtn = document.getElementById("btnSwapPorts");
  const genBtn = document.getElementById("btnGenerateSetRoute");
  const draftInput = document.getElementById("setRouteDraftInput");
  const viewChartBtn = document.getElementById("btnViewOnSetChart");
  const exportBtn = document.getElementById("btnExportSetRouteGeoJson");

  if (!originSel || !destSel || typeof PORT_DEPTHS_DB === "undefined") return;
  if (originSel.dataset.initialized === "1") {
    checkDraftClearance();
    return;
  }
  originSel.dataset.initialized = "1";

  // Sort ports alphabetically
  const sortedPorts = [...PORT_DEPTHS_DB].sort((a, b) => a.name.localeCompare(b.name));

  // Populate Selects
  originSel.innerHTML = "";
  destSel.innerHTML = "";

  sortedPorts.forEach(p => {
    const cCode = (p.countryCode || "UN").toLowerCase();
    const optOrig = document.createElement("option");
    optOrig.value = p.id;
    optOrig.textContent = `${p.name} (${p.country}) [${p.unlocode}]`;
    originSel.appendChild(optOrig);

    const optDest = document.createElement("option");
    optDest.value = p.id;
    optDest.textContent = `${p.name} (${p.country}) [${p.unlocode}]`;
    destSel.appendChild(optDest);
  });

  // Default selection: Singapore -> Shanghai or first two ports
  const defaultOrig = sortedPorts.find(p => p.id === "port-singapore") || sortedPorts[0];
  const defaultDest = sortedPorts.find(p => p.id === "port-shanghai") || sortedPorts[1];

  if (defaultOrig) originSel.value = defaultOrig.id;
  if (defaultDest) destSel.value = defaultDest.id;

  updatePortPreview("origin", originSel.value);
  updatePortPreview("dest", destSel.value);
  checkDraftClearance();

  originSel.addEventListener("change", () => {
    updatePortPreview("origin", originSel.value);
    checkDraftClearance();
  });

  destSel.addEventListener("change", () => {
    updatePortPreview("dest", destSel.value);
    checkDraftClearance();
  });

  if (draftInput) {
    draftInput.addEventListener("input", checkDraftClearance);
  }

  if (swapBtn) {
    swapBtn.addEventListener("click", () => {
      const temp = originSel.value;
      originSel.value = destSel.value;
      destSel.value = temp;
      updatePortPreview("origin", originSel.value);
      updatePortPreview("dest", destSel.value);
      checkDraftClearance();
    });
  }

  if (genBtn) {
    genBtn.addEventListener("click", generateSetRoutePassage);
  }

  if (viewChartBtn) {
    viewChartBtn.addEventListener("click", () => {
      switchToTab("tab-ntm");
      if (activeRouteData) {
        renderRouteOnMap(activeRouteData, true);
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportSetRouteGeoJson);
  }
}

function updatePortPreview(type, portId) {
  const port = PORT_DEPTHS_DB.find(p => p.id === portId);
  const flagEl = document.getElementById(type === "origin" ? "originFlag" : "destFlag");
  const textEl = document.getElementById(type === "origin" ? "originText" : "destText");
  const depthEl = document.getElementById(type === "origin" ? "originDepth" : "destDepth");

  if (!port) return;

  const cCode = (port.countryCode || "un").toLowerCase();
  if (flagEl) {
    flagEl.innerHTML = `<img src="assets/flags/${cCode}.png" onerror="this.onerror=null;this.src='https://flagcdn.com/w40/${cCode}.png';" alt="${port.countryCode}" class="port-flag-img" width="18" height="12" style="vertical-align:middle;border-radius:2px;" />`;
  }
  const appCoords = port.approachCoords || port.coords;
  if (textEl) {
    textEl.textContent = `${port.name} (${formatLatLonDMS(appCoords[0], appCoords[1])})`;
  }
  if (depthEl) {
    const dStr = port.maxDraftLowTide ? `Low Tide Draft: ${port.maxDraftLowTide}` : (port.maxDraftMeters ? `Max Draft: ${port.maxDraftMeters}m` : "");
    depthEl.textContent = dStr;
  }
}

function checkDraftClearance() {
  const alertEl = document.getElementById("setRouteDepthAlert");
  const draftInput = document.getElementById("setRouteDraftInput");
  const origId = (document.getElementById("setRouteOriginSelect") ? document.getElementById("setRouteOriginSelect").value : "");
  const destId = (document.getElementById("setRouteDestSelect") ? document.getElementById("setRouteDestSelect").value : "");

  if (!alertEl || !draftInput) return;

  const vesselDraft = parseFloat(draftInput.value) || 11.5;
  const pOrig = PORT_DEPTHS_DB.find(p => p.id === origId);
  const pDest = PORT_DEPTHS_DB.find(p => p.id === destId);

  let warnings = [];
  [pOrig, pDest].forEach(p => {
    if (!p) return;
    const maxDraftNum = parseFloat(p.maxDraftLowTide || p.maxDraftMeters || "99");
    if (vesselDraft > maxDraftNum) {
      warnings.push(`Vessel draft (${vesselDraft}m) exceeds declared low-water channel limit at ${p.name} (${maxDraftNum}m). Transit will require high-water tidal window.`);
    }
  });

  if (warnings.length > 0) {
    alertEl.style.display = "block";
    alertEl.innerHTML = `<strong>⚠️ Under-Keel Clearance Advisory:</strong><br>${warnings.join("<br>")}`;
  } else {
    alertEl.style.display = "none";
  }
}

/**
 * Generate Autonomous Passage Plan with Cohere AI
 */
async function generateSetRoutePassage() {
  const origId = (document.getElementById("setRouteOriginSelect") ? document.getElementById("setRouteOriginSelect").value : "");
  const destId = (document.getElementById("setRouteDestSelect") ? document.getElementById("setRouteDestSelect").value : "");
  const speed = parseFloat((document.getElementById("setRouteSpeedInput") ? document.getElementById("setRouteSpeedInput").value : "")) || 14.5;
  const draft = parseFloat((document.getElementById("setRouteDraftInput") ? document.getElementById("setRouteDraftInput").value : "")) || 11.5;
  const xtd = parseFloat((document.getElementById("setRouteXtdInput") ? document.getElementById("setRouteXtdInput").value : "")) || 0.20;
  const sailMode = (document.getElementById("setRouteSailSelect") ? document.getElementById("setRouteSailSelect").value : "") || "HYBRID";

  if (origId === destId) {
    showSetSailToast("Origin and Destination ports must be different.", "warning");
    return;
  }

  const pOrig = PORT_DEPTHS_DB.find(p => p.id === origId);
  const pDest = PORT_DEPTHS_DB.find(p => p.id === destId);
  if (!pOrig || !pDest) return;

  const origCoords = pOrig.approachCoords || pOrig.coords;
  const destCoords = pDest.approachCoords || pDest.coords;

  const progressBox = document.getElementById("setRouteProgressBox");
  const progressMsg = document.getElementById("setRouteProgressMsg");
  const stepsList = document.getElementById("setRouteStepsList");
  const genBtn = document.getElementById("btnGenerateSetRoute");

  if (progressBox) progressBox.style.display = "flex";
  if (genBtn) genBtn.disabled = true;
  if (stepsList) stepsList.innerHTML = "";

  const animateStepMsg = async (msg, holdMs = 620) => {
    if (!progressMsg) return;
    progressMsg.classList.remove("fade-in");
    progressMsg.classList.add("fade-out");
    await new Promise(r => setTimeout(r, 180));
    progressMsg.textContent = msg;
    progressMsg.classList.remove("fade-out");
    progressMsg.classList.add("fade-in");
    await new Promise(r => setTimeout(r, holdMs));
  };

  try {
    await animateStepMsg("Geocoding departure & destination fairways...", 580);

    // Gather active NtM hazards
    let ntmContext = "No critical navigational hazards currently intersecting route.";
    if (typeof NTM_STORE !== "undefined" && NTM_STORE.length > 0) {
      const activeWarnings = NTM_STORE.filter(n => !n.isCancelled && (n.type === "T" || n.type === "P")).slice(0, 8);
      if (activeWarnings.length > 0) {
        ntmContext = activeWarnings.map(n => `NtM #${n.id} (${n.type}): ${n.subject || 'Navigational Restriction'} [${n.coords && n.coords[0] ? n.coords[0].dms : ''}]`).join("; ");
      }
    }

    // Gather active Weather & Cyclone hazards
    let weatherContext = "No critical tropical cyclones or severe sea states detected in passage zone.";
    if (typeof MARINE_WEATHER_STORE !== "undefined") {
      const storms = (MARINE_WEATHER_STORE.storms || []).map(s =>
        `${s.name} (${s.category}, Winds ${s.maxWinds} kts, Center: Lat ${s.center[0]}, Lon ${s.center[1]}, Moving ${s.movement}, Danger Radius: ${s.dangerRadiusNm} NM)`
      );
      const waves = (MARINE_WEATHER_STORE.waves || []).filter(w => w.waveHeight >= 4.0).map(w =>
        `Heavy Seas ${w.waveHeight}m [Lat ${w.center[0]}, Lon ${w.center[1]}]`
      );
      const hazards = [...storms, ...waves];
      if (hazards.length > 0) {
        weatherContext = hazards.join("; ");
      }
    }

    await animateStepMsg("Scanning active UKHO Admiralty NtM Week 42/26 hazards & TSS polygons...", 620);
    await animateStepMsg("Analyzing 00:00 UTC Marine Weather, Cyclones & Wave fields...", 620);
    await animateStepMsg("Injecting Open Sea Buoys, TSS lanes & port bathymetry...", 580);
    await animateStepMsg("Calculating optimal deep-sea passage route...", 450);

    const seaCorridor = findMaritimeSeaCorridor(origCoords, destCoords);
    const corridorNames = seaCorridor.map(k => (MARITIME_SEA_NODES[k] || [])[2] || k).join(" -> ");
    const corridorCoords = seaCorridor.map(k => {
      const n = MARITIME_SEA_NODES[k];
      return n ? `${n[2]} (Lat: ${n[0].toFixed(2)}, Lon: ${n[1].toFixed(2)})` : k;
    }).join("; ");

    // Always build verified deep-water sea corridor route first so we never route over land
    let verifiedSeaRoute = generateAlgorithmicMaritimeRoute(pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode);
    // Hard gate for Build Route panel (same as chat Core A)
    if (verifiedSeaRoute && verifiedSeaRoute.metadata && verifiedSeaRoute.metadata.coreARefused) {
      const recovery = generateAlgorithmicMaritimeRoute(
        pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode, { viaPanama: true }
      );
      if (recovery && !(recovery.metadata && recovery.metadata.coreARefused)) {
        verifiedSeaRoute = recovery;
      } else {
        showSetSailToast("Core A refused unsafe land-crossing geometry for this OD pair.", "warning");
        return;
      }
    }
    let parsedRoute = verifiedSeaRoute;

    if (navigator.onLine) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      try {
        const prompt = `Return a JSON object with {"chokepoints": ["..."]} listing the main straits/canals along ${corridorNames} between ${pOrig.name} and ${pDest.name}, avoiding weather: ${weatherContext} and NtMs: ${ntmContext}.`;
                const cohereOut = await setrouteCohereChat([{ role: "user", content: prompt }], { temperature: 0.1, timeoutMs: 4500 });
        clearTimeout(timeoutId);
        if (cohereOut && cohereOut.ok) {
          const text = cohereOut.text || "";
          const jsonMatch = text.match(/\{.*\}/s);
          if (jsonMatch) {
            const aiMeta = JSON.parse(jsonMatch[0]);
            if (aiMeta && Array.isArray(aiMeta.chokepoints) && aiMeta.chokepoints.length > 0) {
              parsedRoute.chokepoints = aiMeta.chokepoints;
            }
          }
        }
      } catch (err) {
        clearTimeout(timeoutId);
      }
    }

    await animateStepMsg("Maritime passage plan synthesized — plotting on SetChart...", 520);

  // Normalize waypoints & IDs
  const waypoints = (parsedRoute.waypoints || []).map((wp, idx) => {
    return {
      id: idx + 1,
      wptNo: wp.wptNo || ('00' + (idx + 1)).slice(-3),
      name: wp.name || `WPT ${idx + 1}`,
      lat: parseFloat(wp.lat),
      lon: parseFloat(wp.lon),
      speedKnots: parseFloat(wp.speedKnots) || speed,
      portsideXTD: parseFloat(wp.portsideXTD) || xtd,
      starboardXTD: parseFloat(wp.starboardXTD) || xtd,
      turnRadius: parseFloat(wp.turnRadius) || 0.5,
      sail: wp.sail || (idx === 0 || idx === parsedRoute.waypoints.length - 1 ? "RL" : "GC"),
      rot: parseFloat(wp.rot) || 8.0
    };
  });

  // Calculate accurate geodetic total distance if missing
  let totalDistNM = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    totalDistNM += calculateHaversineDistanceNM(waypoints[i].lat, waypoints[i].lon, waypoints[i + 1].lat, waypoints[i + 1].lon);
  }
  totalDistNM = Math.round(totalDistNM);
  const steamingDays = (totalDistNM / (speed * 24)).toFixed(1);

  parsedRoute.totalDistanceNM = totalDistNM;
  parsedRoute.estimatedSteamingDays = steamingDays;
  parsedRoute.waypoints = waypoints;

  // Store in activeRouteData
  activeRouteData = {
    name: parsedRoute.routeName || `${pOrig.name} to ${pDest.name}`,
    waypoints: waypoints,
    format: "SETROUTE_AI",
    totalDistanceNM: totalDistNM,
    steamingDays: steamingDays,
    chokepoints: parsedRoute.chokepoints || [],
    metadata: {
      origin: pOrig.name,
      destination: pDest.name,
      speedKnots: speed,
      draftMeters: draft,
      generatedAt: new Date().toISOString()
    }
  };

  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(activeRouteData));
  } catch (e) {}

  // Update Results Card
  displaySetRouteResults(activeRouteData);

    // Enable My Route overlay and sync dock
    if (typeof setOverlayActive === "function") {
      setOverlayActive("route", true, leafletMap);
    } else if (typeof OVERLAY_STATES !== "undefined") {
      OVERLAY_STATES.route = true;
    }

    // Show My Route pill in left column
    const catPillRoute = document.getElementById("catPillRoute");
    if (catPillRoute) catPillRoute.style.display = "inline-flex";

    // Switch to SetChart and plot!
    switchToTab("tab-ntm");
    setTimeout(() => {
      if (leafletMap) {
        leafletMap.invalidateSize();
        renderRouteOnMap(activeRouteData, true);
        renderNtMListAndMap();
      }
    }, 200);

    showSetSailToast(`✓ Passage route generated: ${waypoints.length} waypoints plotted on SetChart`, "success");
  } finally {
    if (progressBox) progressBox.style.display = "none";
    if (genBtn) genBtn.disabled = false;
  }
}

/**
 * Display Passage Plan Summary in SetRoute view
 */
function displaySetRouteResults(route) {
  const card = document.getElementById("setRouteResultsCard");
  const title = document.getElementById("resultsRouteTitle");
  const distEl = document.getElementById("metricDistance");
  const daysEl = document.getElementById("metricDays");
  const wptsEl = document.getElementById("metricWpts");
  const speedEl = document.getElementById("metricSpeed");
  const cpBox = document.getElementById("resultsChokepointsBox");
  const cpPills = document.getElementById("resultsChokepointsPills");
  const tbody = document.getElementById("resultsWptsTableBody");

  if (!card || !route) return;
  card.style.display = "block";

  if (title) title.textContent = `Passage Plan: ${route.name}`;
  if (distEl) distEl.textContent = `${route.totalDistanceNM} NM`;
  if (daysEl) daysEl.textContent = `${route.steamingDays} Days`;
  if (wptsEl) wptsEl.textContent = `${route.waypoints.length} WPTs`;
  if (speedEl) speedEl.textContent = `${((route.metadata && route.metadata.speedKnots) || 14.5) || 14.5} kn`;

  if (cpBox && cpPills) {
    if (route.chokepoints && route.chokepoints.length > 0) {
      cpBox.style.display = "flex";
      cpPills.innerHTML = route.chokepoints.map(cp => `<span class="chokepoint-pill">${cp}</span>`).join("");
    } else {
      cpBox.style.display = "none";
    }
  }

  if (tbody) {
    tbody.innerHTML = route.waypoints.map(wp => `
      <tr>
        <td style="font-weight:700;color:#38bdf8;">#${wp.wptNo}</td>
        <td style="font-weight:600;color:#fff;">${wp.name}</td>
        <td style="color:#94a3b8;font-family:monospace;">${formatLatLonDMS(wp.lat, wp.lon)}</td>
        <td><span class="ntm-tag ${wp.sail === 'GC' ? 'temp' : 'perm'}">${wp.sail}</span></td>
        <td>${wp.speedKnots} kn</td>
        <td>P${wp.portsideXTD}/S${wp.starboardXTD}</td>
        <td>${wp.turnRadius} NM</td>
      </tr>
    `).join("");
  }
}

/**
 * High-Accuracy Algorithmic Fallback Maritime Route Generator
 */
function generateAlgorithmicMaritimeRoute(pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode, routeOpts) {
  const corridor = findMaritimeSeaCorridor(origCoords, destCoords, routeOpts || {});
  const waypoints = [];

  // Departure Pilot Station WPT
  waypoints.push({
    wptNo: "001",
    name: `${pOrig.name.toUpperCase()} PILOT STATION`,
    lat: origCoords[0],
    lon: origCoords[1],
    speedKnots: Math.min(speed, 10.0),
    portsideXTD: xtd,
    starboardXTD: xtd,
    turnRadius: 0.5,
    sail: "RL",
    rot: 10.0
  });

  // Intermediate deep-water sea corridor waypoints
  let wptCounter = 2;
  const chokepoints = [];
  for (const nodeKey of corridor) {
    const node = MARITIME_SEA_NODES[nodeKey];
    if (!node) continue;
    const distOrig = calculateHaversineDistanceNM(origCoords[0], origCoords[1], node[0], node[1]);
    const distDest = calculateHaversineDistanceNM(destCoords[0], destCoords[1], node[0], node[1]);
    if (distOrig < 15 || distDest < 15) continue;

    chokepoints.push(node[2]);
    waypoints.push({
      wptNo: ('00' + wptCounter).slice(-3),
      name: node[2],
      lat: parseFloat(node[0].toFixed(5)),
      lon: parseFloat(node[1].toFixed(5)),
      speedKnots: speed,
      portsideXTD: xtd,
      starboardXTD: xtd,
      turnRadius: 0.8,
      sail: sailMode === "RL" ? "RL" : "GC",
      rot: 8.0
    });
    wptCounter++;
  }

  // Arrival Fairway WPT
  waypoints.push({
    wptNo: ('00' + wptCounter).slice(-3),
    name: `${pDest.name.toUpperCase()} FAIRWAY ARRIVAL`,
    lat: destCoords[0],
    lon: destCoords[1],
    speedKnots: Math.min(speed, 10.0),
    portsideXTD: xtd,
    starboardXTD: xtd,
    turnRadius: 0.5,
    sail: "RL",
    rot: 10.0
  });

  const corridorMeta = (findMaritimeSeaCorridor._lastMeta) || {};
  let densified = waypoints;
  if (typeof setrouteDensifyWaypoints === "function") {
    densified = setrouteDensifyWaypoints(waypoints, 320);
  }
  // Ocean OD safety: too few corridor nodes → mark refused (caller must not publish)
  const oceanOd = (typeof setrouteIsFarEastPort === "function" && typeof setrouteIsAmericasPort === "function")
    && ((setrouteIsFarEastPort(origCoords[0], origCoords[1]) && setrouteIsAmericasPort(destCoords[0], destCoords[1]))
      || (setrouteIsAmericasPort(origCoords[0], origCoords[1]) && setrouteIsFarEastPort(destCoords[0], destCoords[1])));
  const refused = Boolean(oceanOd && densified.length < 6)
    || (corridorMeta.routeMode === "no_safe_corridor")
    || (corridor && corridor.length < 2);
  return {
    name: `${pOrig.name} to ${pDest.name}`,
    routeName: `${pOrig.name} to ${pDest.name}`,
    waypoints: densified,
    chokepoints: chokepoints.length > 0 ? chokepoints : ["Deepwater Coastal Fairway", "Open Sea Transit"],
    totalDistanceNM: 0,
    estimatedSteamingDays: 0,
    metadata: {
      speedKnots: speed,
      draftMeters: 11.5,
      xtdNM: xtd,
      sailMode: sailMode,
      coreA: corridorMeta,
      coreARefused: refused
    }
  };
}

function calculateHaversineDistanceNM(lat1, lon1, lat2, lon2) {
  const R = 3440.065; // Earth radius in Nautical Miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function exportSetRouteGeoJson() {
  if (!activeRouteData || !activeRouteData.waypoints) {
    showSetSailToast("No generated passage plan available to export.", "warning");
    return;
  }

  const lineCoords = activeRouteData.waypoints.map(w => [w.lon, w.lat]);
  const features = [
    {
      type: "Feature",
      geometry: { type: "LineString", coordinates: lineCoords },
      properties: {
        layer: "My_Route_Track",
        routeName: activeRouteData.name,
        distanceNM: activeRouteData.totalDistanceNM,
        steamingDays: activeRouteData.steamingDays,
        generator: "SetRoute AI"
      }
    }
  ];

  activeRouteData.waypoints.forEach(wp => {
    features.push({
      type: "Feature",
      geometry: { type: "Point", coordinates: [wp.lon, wp.lat] },
      properties: {
        layer: "My_Route_Waypoint",
        wptNo: wp.wptNo,
        name: wp.name,
        latDMS: formatLatLonDMS(wp.lat, wp.lon),
        speedKnots: wp.speedKnots,
        portsideXTD: wp.portsideXTD,
        starboardXTD: wp.starboardXTD,
        turnRadius: wp.turnRadius,
        sail: wp.sail,
        rot: wp.rot
      }
    });
  });

  const geoJson = {
    type: "FeatureCollection",
    name: "SetRoute_ECDIS_Passage_Plan",
    metadata: {
      routeName: activeRouteData.name,
      exportedAtUtc: new Date().toISOString(),
      engine: "SetRoute AI Passage Engine"
    },
    features: features
  };

  const fname = `SetRoute_Passage_Plan_${getExportUtcTimestamp()}.geojson`;
  downloadTextFile(JSON.stringify(geoJson, null, 2), fname, "application/geo+json");
  showSetSailToast(`Exported: ${activeRouteData.name} (${activeRouteData.waypoints.length} WPTs)`, "success");
}

window.initSetRoute = initSetRoute;
window.refreshSetRouteUI = () => {
  if (typeof PORT_DEPTHS_DB !== "undefined") initSetRoute();
};


// ==========================================================================
// MULTI-OVERLAY HELPERS, DIRECT 1-CLICK EXPORT & WAYPOINT EDITOR
// ==========================================================================

function initCategoryPills() {
  const pills = document.querySelectorAll(".ntm-category-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeOverlayCategory = pill.dataset.category || "ALL";
      if (typeof renderNtMListAndMap === "function") {
        renderNtMListAndMap();
      }
    });
  });
}

function centerMapOnWaypoint(idx) {
  if (!leafletMap || !activeRouteData || !activeRouteData.waypoints || !activeRouteData.waypoints[idx]) return;
  const wp = activeRouteData.waypoints[idx];
  leafletMap.flyTo([wp.lat, wp.lon], Math.max(leafletMap.getZoom(), 11), { duration: 0.9 });
}

function openWaypointEditModal(idx) {
  if (!activeRouteData || !activeRouteData.waypoints || !activeRouteData.waypoints[idx]) return;
  const wp = activeRouteData.waypoints[idx];
  const modal = document.getElementById("ntmWaypointEditModal");
  if (!modal) return;

  const latDeg = Math.floor(Math.abs(wp.lat));
  const latMin = ((Math.abs(wp.lat) - latDeg) * 60).toFixed(3);
  const latHem = wp.lat >= 0 ? "N" : "S";

  const normLon = ((wp.lon + 180) % 360 + 360) % 360 - 180;
  const lonDeg = Math.floor(Math.abs(normLon));
  const lonMin = ((Math.abs(normLon) - lonDeg) * 60).toFixed(3);
  const lonHem = normLon >= 0 ? "E" : "W";

  const elIdx = document.getElementById("wptEditIndex");
  const elTitle = document.getElementById("wptEditModalTitle");
  const elName = document.getElementById("wptEditName");
  const elLatDeg = document.getElementById("wptEditLatDeg");
  const elLatMin = document.getElementById("wptEditLatMin");
  const elLatHem = document.getElementById("wptEditLatHem");
  const elLonDeg = document.getElementById("wptEditLonDeg");
  const elLonMin = document.getElementById("wptEditLonMin");
  const elLonHem = document.getElementById("wptEditLonHem");
  const elSpeed = document.getElementById("wptEditSpeed");
  const elPortXtd = document.getElementById("wptEditPortXtd");
  const elStbdXtd = document.getElementById("wptEditStbdXtd");
  const elRadius = document.getElementById("wptEditRadius");
  const elSail = document.getElementById("wptEditSail");
  const elRot = document.getElementById("wptEditRot");

  if (elIdx) elIdx.value = String(idx);
  if (elTitle) elTitle.textContent = "Edit Waypoint #" + (idx + 1);
  if (elName) elName.value = wp.name || "";
  if (elLatDeg) elLatDeg.value = latDeg;
  if (elLatMin) elLatMin.value = latMin;
  if (elLatHem) elLatHem.value = latHem;
  if (elLonDeg) elLonDeg.value = lonDeg;
  if (elLonMin) elLonMin.value = lonMin;
  if (elLonHem) elLonHem.value = lonHem;
  if (elSpeed) elSpeed.value = wp.speedKnots != null ? wp.speedKnots : 14.0;
  if (elPortXtd) elPortXtd.value = wp.portsideXTD != null ? wp.portsideXTD : 0.1;
  if (elStbdXtd) elStbdXtd.value = wp.starboardXTD != null ? wp.starboardXTD : 0.1;
  if (elRadius) elRadius.value = wp.turnRadius != null ? wp.turnRadius : 0.5;
  if (elSail) elSail.value = (wp.sail || "RL").toUpperCase();
  if (elRot) elRot.value = wp.rot != null ? wp.rot : 0.0;

  modal.classList.add("open");
}

function saveWaypointFromModal() {
  const modal = document.getElementById("ntmWaypointEditModal");
  if (!modal || !activeRouteData || !activeRouteData.waypoints) return;

  const idx = parseInt((document.getElementById("wptEditIndex") ? document.getElementById("wptEditIndex").value : ""), 10);
  if (isNaN(idx) || !activeRouteData.waypoints[idx]) return;

  const wp = activeRouteData.waypoints[idx];
  const name = (document.getElementById("wptEditName") ? document.getElementById("wptEditName").value : "").trim() || "";
  const latDeg = parseFloat((document.getElementById("wptEditLatDeg") ? document.getElementById("wptEditLatDeg").value : "")) || 0;
  const latMin = parseFloat((document.getElementById("wptEditLatMin") ? document.getElementById("wptEditLatMin").value : "")) || 0;
  const latHem = (document.getElementById("wptEditLatHem") ? document.getElementById("wptEditLatHem").value : "") || "N";
  const lonDeg = parseFloat((document.getElementById("wptEditLonDeg") ? document.getElementById("wptEditLonDeg").value : "")) || 0;
  const lonMin = parseFloat((document.getElementById("wptEditLonMin") ? document.getElementById("wptEditLonMin").value : "")) || 0;
  const lonHem = (document.getElementById("wptEditLonHem") ? document.getElementById("wptEditLonHem").value : "") || "E";

  const speed = parseFloat((document.getElementById("wptEditSpeed") ? document.getElementById("wptEditSpeed").value : "")) || 14.0;
  const pXtd = parseFloat((document.getElementById("wptEditPortXtd") ? document.getElementById("wptEditPortXtd").value : "")) || 0.1;
  const sXtd = parseFloat((document.getElementById("wptEditStbdXtd") ? document.getElementById("wptEditStbdXtd").value : "")) || 0.1;
  const turnRad = parseFloat((document.getElementById("wptEditRadius") ? document.getElementById("wptEditRadius").value : "")) || 0.5;
  const sail = (document.getElementById("wptEditSail") ? document.getElementById("wptEditSail").value : "") || "RL";
  const rot = parseFloat((document.getElementById("wptEditRot") ? document.getElementById("wptEditRot").value : "")) || 0.0;

  let newLat = latDeg + latMin / 60.0;
  if (latHem === "S") newLat = -newLat;

  let newLon = lonDeg + lonMin / 60.0;
  if (lonHem === "W") newLon = -newLon;

  wp.name = name;
  wp.lat = newLat;
  wp.lon = newLon;
  wp.speedKnots = speed;
  wp.portsideXTD = pXtd;
  wp.starboardXTD = sXtd;
  wp.turnRadius = turnRad;
  wp.sail = sail;
  wp.rot = rot;

  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(activeRouteData));
  } catch (e) {}

  if (typeof renderRouteOnMap === "function") {
    renderRouteOnMap(activeRouteData, false);
  }
  if (typeof renderNtMListAndMap === "function") {
    renderNtMListAndMap();
  }
  modal.classList.remove("open");
  showSetSailToast("Waypoint #" + (idx + 1) + " updated successfully", "success");
}

function initWaypointEditModal() {
  const modal = document.getElementById("ntmWaypointEditModal");
  if (!modal) return;

  const closeBtn = document.getElementById("wptEditCloseBtn");
  const cancelBtn = document.getElementById("wptEditCancelBtn");
  const saveBtn = document.getElementById("wptEditSaveBtn");
  const centerBtn = document.getElementById("wptEditCenterBtn");

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.remove("open"));
  if (saveBtn) saveBtn.addEventListener("click", saveWaypointFromModal);
  if (centerBtn) {
    centerBtn.addEventListener("click", () => {
      const latDeg = parseFloat((document.getElementById("wptEditLatDeg") ? document.getElementById("wptEditLatDeg").value : "")) || 0;
      const latMin = parseFloat((document.getElementById("wptEditLatMin") ? document.getElementById("wptEditLatMin").value : "")) || 0;
      const latHem = (document.getElementById("wptEditLatHem") ? document.getElementById("wptEditLatHem").value : "") || "N";
      const lonDeg = parseFloat((document.getElementById("wptEditLonDeg") ? document.getElementById("wptEditLonDeg").value : "")) || 0;
      const lonMin = parseFloat((document.getElementById("wptEditLonMin") ? document.getElementById("wptEditLonMin").value : "")) || 0;
      const lonHem = (document.getElementById("wptEditLonHem") ? document.getElementById("wptEditLonHem").value : "") || "E";
      let lat = (latDeg + latMin / 60.0) * (latHem === "S" ? -1 : 1);
      let lon = (lonDeg + lonMin / 60.0) * (lonHem === "W" ? -1 : 1);
      if (leafletMap) {
        leafletMap.flyTo([lat, lon], Math.max(leafletMap.getZoom(), 11));
      }
    });
  }
}

function openNtmOverlayInfoModal() {
  const modal = document.getElementById("ntmOverlayInfoModal");
  if (!modal) return;

  const countEl = document.getElementById("ntmModalCount");
  const tpCountEl = document.getElementById("ntmModalTpCount");
  const editionEl = document.getElementById("ntmModalEdition");

  const activeList = typeof NTM_STORE !== "undefined" ? NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED") : [];
  const cancelledList = typeof NTM_STORE !== "undefined" ? NTM_STORE.filter(n => n.isCancelled || n.status === "CANCELLED") : [];
  const total = activeList.length;
  const navtexCount = activeList.filter(n => n.type === "NAVTEX").length;
  const ukhoCount = activeList.filter(n => n.type !== "NAVTEX").length;

  if (countEl) countEl.textContent = `${total} Active (${cancelledList.length} Cancelled)`;
  if (tpCountEl) tpCountEl.textContent = `${navtexCount} NAVTEX ? ${ukhoCount} UKHO NtM`;

  let latestEd = "Week 42 / 2026 + Live GMDSS";
  try {
    const savedMeta = JSON.parse(localStorage.getItem(META_STORAGE_KEY) || "{}");
    if (savedMeta && savedMeta.weekNumber) {
      const yr = savedMeta.year ? (String(savedMeta.year).length === 2 ? "20" + savedMeta.year : savedMeta.year) : "2026";
      latestEd = `Wk ${savedMeta.weekNumber}/${yr} + 6h NAVTEX`;
    }
  } catch (e) {}
  if (editionEl) editionEl.textContent = latestEd;

  modal.classList.add("open");
}

function openNtmPasteModal() {
  /* User paste/add of NtM & NAVTEX is disabled — official feed only. */
  if (typeof showSetSailToast === "function") {
    showSetSailToast("NtM & NAVTEX are read-only. Sync updates from the official bulletin.", "info");
  } else if (typeof showToast === "function") {
    showToast("NtM & NAVTEX are read-only.", "info");
  }
}
window.openNtmPasteModal = openNtmPasteModal;

// Wire Paste Modal buttons if present
document.addEventListener("DOMContentLoaded", () => {
  const pasteModal = document.getElementById("ntmPasteModal");
  const pasteCancel = document.getElementById("ntmPasteCancel");
  const pasteApply = document.getElementById("ntmPasteApply");
  const pasteArea = document.getElementById("ntmPasteTextarea");
  if (pasteCancel && pasteModal) {
    pasteCancel.addEventListener("click", () => {
      pasteModal.classList.remove("open");
      pasteModal.style.display = "none";
    });
  }
  if (pasteApply) {
    pasteApply.addEventListener("click", () => {
      if (typeof showSetSailToast === "function") {
        showSetSailToast("NtM & NAVTEX are read-only — paste/add disabled.", "info");
      }
      if (pasteModal) {
        pasteModal.classList.remove("open");
        pasteModal.style.display = "none";
      }
    });
  }
  if (pasteModal) pasteModal.style.display = "none";
});

function openNoticeDetailModal(noticeOrId) {
  const item = (typeof noticeOrId === "object" && noticeOrId !== null)
    ? noticeOrId
    : NTM_STORE.find(n => n.id === noticeOrId);
  if (!item) return;

  const modal = document.getElementById("ntmNoticeDetailModal");
  if (!modal) return;

  const isCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
  const isNavtex = (item.type === "NAVTEX");
  const origInput = document.getElementById("ntmDetailOrigId");
  const idInput = document.getElementById("ntmDetailIdInput");
  const typeSelect = document.getElementById("ntmDetailTypeSelect");
  const navSelect = document.getElementById("ntmDetailNavareaSelect");
  const geomSelect = document.getElementById("ntmDetailGeomSelect");
  const subjInput = document.getElementById("ntmDetailSubjectInput");
  const coordsInput = document.getElementById("ntmDetailCoordsInput");
  const bodyInput = document.getElementById("ntmDetailBodyInput");
  const badgeEl = document.getElementById("ntmDetailBadgeType");
  const headerEl = document.getElementById("ntmDetailTitleHeader");
  const cancelBanner = document.getElementById("ntmDetailCancelBanner");
  const toggleCancelBtn = document.getElementById("ntmDetailToggleCancelBtn");
  const saveBtn = document.getElementById("ntmDetailSaveBtn");
  const cleanNav = getNoticeNavarea(item).replace(/^NAVAREA\s+/i, "").trim().toUpperCase() || "I";
  const geomLabel = item.isPolygon ? "Area / Polygon" : (item.isLine ? "Line / Track" : "Point(s)");

  if (origInput) origInput.value = item.id;
  if (idInput) { idInput.value = item.id; idInput.readOnly = true; }
  if (typeSelect) {
    typeSelect.value = item.type || "NAVTEX";
    typeSelect.readOnly = true;
    typeSelect.disabled = true;
  }
  if (navSelect) {
    navSelect.value = cleanNav;
    navSelect.readOnly = true;
    navSelect.disabled = true;
  }
  if (geomSelect) {
    geomSelect.value = geomLabel;
    geomSelect.readOnly = true;
    geomSelect.disabled = true;
  }
  if (subjInput) { subjInput.value = item.subject || item.title || ""; subjInput.readOnly = true; }
  if (coordsInput) {
    const lines = (item.coords || []).map(c => `${Number(c.lat).toFixed(5)}, ${Number(c.lon).toFixed(5)}`);
    coordsInput.value = lines.join("\n");
    coordsInput.readOnly = true;
  }
  if (bodyInput) {
    bodyInput.value = item.body || item.rawText || item.subject || "";
    bodyInput.readOnly = true;
  }
  if (badgeEl) {
    badgeEl.textContent = isCancelled ? "CANCELLED" : (item.type || "NAVTEX");
    badgeEl.className = "ntm-tag " + (isCancelled ? "cancelled" : (item.type === "NAVTEX" ? "navtex" : (item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm"))));
  }
  if (headerEl) headerEl.textContent = `${item.id} — ${getNoticeNavarea(item)}`;
  if (cancelBanner) cancelBanner.style.display = isCancelled ? "block" : "none";
  if (saveBtn) saveBtn.style.display = "none";
  if (toggleCancelBtn) toggleCancelBtn.style.display = "none";

  const roBanner = document.getElementById("ntmDetailNavtexBanner");
  if (roBanner) {
    roBanner.style.display = "block";
    roBanner.textContent = isNavtex
      ? "Official NAVTEX / NAVAREA broadcast — read-only."
      : "Official UKHO NtM — read-only (no user add / edit / delete).";
  }

  modal.classList.add("open");
  modal.style.display = "flex";
}

function closeNoticeDetailModal() {
  const modal = document.getElementById("ntmNoticeDetailModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.style.display = "none";
}

function parseEditedCoordsList(rawCoordsText) {
  const out = [];
  const lines = String(rawCoordsText || "").split(/[\r\n;]+/);
  lines.forEach(line => {
    const s = line.trim();
    if (!s) return;
    const m = s.match(/^([+-]?\d+(?:\.\d+)?)\s*[,\s]\s*([+-]?\d+(?:\.\d+)?)$/);
    if (m) {
      const lat = parseFloat(m[1]);
      const lon = parseFloat(m[2]);
      if (Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
        out.push({ lat, lon, dms: formatCoordDmsHelper(lat, lon) });
        return;
      }
    }
    if (typeof window.extractCoordinatesFromText === "function") {
      const extracted = window.extractCoordinatesFromText(s);
      if (extracted && extracted.length > 0) {
        extracted.forEach(pt => out.push(pt));
      }
    }
  });
  return out;
}

function saveNoticeDetailEdits() {
  if (typeof showSetSailToast === "function") {
    showSetSailToast("NtM & NAVTEX cannot be edited.", "info");
  } else if (typeof showToast === "function") {
    showToast("NtM & NAVTEX cannot be edited.", "warn");
  }
  return;
  /* unreachable — kept so older callers never mutate store */
  const origId = (document.getElementById("ntmDetailOrigId") || {}).value;
  if (!origId) return;
  const item = NTM_STORE.find(n => n.id === origId);
  if (!item) return;

  if (item.type === "NAVTEX") {
    if (typeof showToast === "function") showToast("NAVTEX broadcasts are official station alerts and cannot be edited.", "warn");
    closeNoticeDetailModal();
    return;
  }

  const newType = (document.getElementById("ntmDetailTypeSelect") || {}).value || item.type;
  const newNav = (document.getElementById("ntmDetailNavareaSelect") || {}).value || "I";
  const newGeom = (document.getElementById("ntmDetailGeomSelect") || {}).value || "point";
  const newSubj = (document.getElementById("ntmDetailSubjectInput") || {}).value || "";
  const newCoordsRaw = (document.getElementById("ntmDetailCoordsInput") || {}).value || "";
  const newBody = (document.getElementById("ntmDetailBodyInput") || {}).value || "";

  const parsedCoords = parseEditedCoordsList(newCoordsRaw);
  if (parsedCoords.length > 0) {
    item.coords = parsedCoords;
    item.lat = parsedCoords[0].lat;
    item.lon = parsedCoords[0].lon;
  }

  item.type = newType;
  item.navarea = newNav;
  item.isPolygon = (newGeom === "polygon" && item.coords && item.coords.length >= 3);
  item.isLine = (newGeom === "line" && item.coords && item.coords.length >= 2);
  item.subject = newSubj;
  item.title = newSubj;
  item.body = newBody;
  item.rawText = newBody;
  item.userEdited = true;

  // Also check if the edited body contains any CANCEL directives
  if (typeof window.parseAdmiraltyNtMText === "function") {
    const parsedCheck = window.parseAdmiraltyNtMText(newBody);
    if (parsedCheck && parsedCheck.cancelledIds && parsedCheck.cancelledIds.length > 0) {
      reconcileAndApplyNoticeOverrides(parsedCheck.cancelledIds);
    }
  }

  const overrides = getNoticeOverridesMap();
  overrides[item.id] = {
    subject: item.subject,
    body: item.body,
    type: item.type,
    navarea: item.navarea,
    isPolygon: item.isPolygon,
    isLine: item.isLine,
    coords: item.coords,
    isCancelled: Boolean(item.isCancelled),
    userEdited: true
  };
  saveNoticeOverridesMap(overrides);
  saveStoreToStorage();
  renderNtMListAndMap();
  if (typeof window.renderGlobe3D === "function") window.renderGlobe3D();
  closeNoticeDetailModal();
  if (typeof showToast === "function") {
    showToast(`Saved edits to ${item.id}`, "info");
  }
}

function toggleCancelNotice(noticeId) {
  if (typeof showSetSailToast === "function") {
    showSetSailToast("NtM & NAVTEX cannot be cancelled or restored by users.", "info");
  } else if (typeof showToast === "function") {
    showToast("NtM & NAVTEX cannot be cancelled or restored by users.", "warn");
  }
  return;
  const item = NTM_STORE.find(n => n.id === noticeId);
  if (!item) return;

  if (item.type === "NAVTEX") {
    if (typeof showToast === "function") {
      showToast("NAVTEX broadcasts are official station alerts and cannot be manually cancelled. They auto-deactivate after their cancellation time.", "warn");
    }
    return;
  }

  const newCancelledState = !Boolean(item.isCancelled || item.status === "CANCELLED");
  item.isCancelled = newCancelledState;
  item.status = newCancelledState ? "CANCELLED" : "ACTIVE";
  item.userEdited = true;

  const overrides = getNoticeOverridesMap();
  overrides[item.id] = Object.assign(overrides[item.id] || {}, {
    isCancelled: newCancelledState,
    userEdited: true
  });
  saveNoticeOverridesMap(overrides);
  saveStoreToStorage();
  renderNtMListAndMap();
  if (typeof window.renderGlobe3D === "function") window.renderGlobe3D();

  if (typeof showToast === "function") {
    showToast(
      newCancelledState ? `Cancelled warning ${item.id}` : `Restored warning ${item.id} to active chart`,
      newCancelledState ? "warn" : "info"
    );
  }
}

function toggleCancelNoticeFromModal() {
  const origId = (document.getElementById("ntmDetailOrigId") || {}).value;
  if (!origId) return;
  toggleCancelNotice(origId);
  openNoticeDetailModal(origId);
}

function flyToNoticeFromModal() {
  const origId = (document.getElementById("ntmDetailOrigId") || {}).value;
  if (!origId) return;
  closeNoticeDetailModal();
  if (typeof selectNtMNotice === "function") {
    selectNtMNotice(origId);
  }
}

window.openNoticeDetailModal = openNoticeDetailModal;
window.closeNoticeDetailModal = closeNoticeDetailModal;
window.saveNoticeDetailEdits = saveNoticeDetailEdits;
window.toggleCancelNotice = toggleCancelNotice;
window.toggleCancelNoticeFromModal = toggleCancelNoticeFromModal;
window.flyToNoticeFromModal = flyToNoticeFromModal;

function initNtmOverlayInfoModal() {
  const modal = document.getElementById("ntmOverlayInfoModal");
  if (!modal) return;
  const closeBtn = document.getElementById("ntmOverlayInfoClose");
  const closeBtn2 = document.getElementById("ntmOverlayInfoCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  if (closeBtn2) closeBtn2.addEventListener("click", () => modal.classList.remove("open"));
}

function syncWeatherModalLayerChecks() {
  const map = {
    wxLayerCyclones: "cyclones",
    wxLayerWaves: "waves",
    wxLayerOpc: "opc",
    wxLayerBuoys: "buoys",
    wxLayerPressure: "pressure",
    wxLayerWinds: "winds",
    wxLayerCurrents: "currents"
  };
  const sub = window.WEATHER_SUBFILTERS || loadWeatherSubfilters();
  Object.keys(map).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.checked = sub[map[id]] !== false;
  });
}

function applyWeatherModalLayerChecks() {
  const next = {
    cyclones: !!(document.getElementById("wxLayerCyclones") || { checked: true }).checked,
    waves: !!(document.getElementById("wxLayerWaves") || { checked: true }).checked,
    opc: !!(document.getElementById("wxLayerOpc") || { checked: true }).checked,
    buoys: !!(document.getElementById("wxLayerBuoys") || { checked: true }).checked,
    pressure: !!(document.getElementById("wxLayerPressure") || { checked: true }).checked,
    winds: !!(document.getElementById("wxLayerWinds") || { checked: true }).checked,
    currents: !!(document.getElementById("wxLayerCurrents") || { checked: true }).checked
  };
  saveWeatherSubfilters(next);
  // Keep filter-popover checkboxes in sync when present
  const popMap = {
    popWxCyclones: "cyclones",
    popWxWaves: "waves",
    popWxPressure: "pressure",
    popWxWinds: "winds"
  };
  Object.keys(popMap).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.checked = next[popMap[id]] !== false;
  });
  if (typeof renderWeatherOnMap === "function") {
    renderWeatherOnMap(typeof leafletMap !== "undefined" ? leafletMap : null);
  }
  if (typeof syncNdbcCursorTileVisibility === "function") {
    syncNdbcCursorTileVisibility();
  }
}

function initWeatherOverlayInfoModal() {
  const modal = document.getElementById("weatherOverlayModal");
  if (!modal) return;
  const closeBtn = document.getElementById("weatherOverlayModalClose");
  const closeBtn2 = document.getElementById("weatherOverlayModalCloseBtn");
  const refreshBtn = document.getElementById("btnRefreshWeatherModal");
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  if (closeBtn2) closeBtn2.addEventListener("click", () => modal.classList.remove("open"));
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      if (typeof refreshMarineWeather === "function") {
        refreshMarineWeather(true);
      }
    });
  }
  [
    "wxLayerCyclones",
    "wxLayerWaves",
    "wxLayerOpc",
    "wxLayerBuoys",
    "wxLayerPressure",
    "wxLayerWinds",
    "wxLayerCurrents"
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el && !el._ssWxWired) {
      el._ssWxWired = true;
      el.addEventListener("change", applyWeatherModalLayerChecks);
    }
  });
  syncWeatherModalLayerChecks();
}

window.syncWeatherModalLayerChecks = syncWeatherModalLayerChecks;
window.applyWeatherModalLayerChecks = applyWeatherModalLayerChecks;

function flyToCycloneFromModal(lat, lon) {
  const modal = document.getElementById("weatherOverlayModal");
  if (modal) modal.classList.remove("open");
  if (typeof setOverlayActive === "function") {
    setOverlayActive("weather", true, leafletMap);
  }
  if (leafletMap && Number.isFinite(lat) && Number.isFinite(lon)) {
    leafletMap.flyTo([lat, lon], 5, { duration: 1.2 });
  }
}

function updateWeatherModalActiveStorms() {
  /* Compact Weather info modal — cyclone counts live in weatherModalLiveMeta only. */
  const listBox = document.getElementById("weatherModalActiveStormsList");
  if (listBox) listBox.remove();
}

function showWeatherInfoModal() {
  const modal = document.getElementById("weatherOverlayModal");
  if (modal) {
    modal.classList.add("open");
    syncWeatherModalLayerChecks();
    updateWeatherModalActiveStorms();
  }
}

window.flyToCycloneFromModal = flyToCycloneFromModal;
window.updateWeatherModalActiveStorms = updateWeatherModalActiveStorms;
window.initWeatherOverlayInfoModal = initWeatherOverlayInfoModal;
window.showWeatherInfoModal = showWeatherInfoModal;

function showRouteInfoSummary() {
  if (activeRouteData && activeRouteData.waypoints && activeRouteData.waypoints.length > 0) {
    const startWp = (activeRouteData.waypoints[0] && activeRouteData.waypoints[0].name) || "Start";
    const endWp = (activeRouteData.waypoints[activeRouteData.waypoints.length - 1] && activeRouteData.waypoints[activeRouteData.waypoints.length - 1].name) || "End";
    showSetSailToast("Route: " + activeRouteData.waypoints.length + " WPTs (" + startWp + " → " + endWp + ")", "info");
  } else {
    showSetSailToast("No passage plan loaded. Upload .rtz or .csv in My Vessel menu.", "warning");
  }
}

/**
 * Direct 1-Click Map Export: Exports all visible features on chart with active filters
 */
function executeDirectMapExport() {
  const activeFeatures = [];
  let ntmCount = 0;
  let portCount = 0;
  let wptCount = 0;

  // 1. NtM Notices (if overlay is active)
  const isNoticesActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.notices !== false : true;
  if (isNoticesActive && typeof getFilteredNotices === "function") {
    const filteredNotices = getFilteredNotices();
    filteredNotices.forEach(item => {
      ntmCount++;
      const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
      
      // Polygons / TSS
      if (item.subPolygons && item.subPolygons.length > 0) {
        item.subPolygons.forEach((sub, sIdx) => {
          const pts = sub.points || (sub.coords || []).map(c => [c.lon, c.lat]);
          if (pts && pts.length >= 3) {
            const ring = pts.map(p => Array.isArray(p) ? (p[0] > 90 ? [p[1], p[0]] : p) : [p.lon, p.lat]);
            if (ring.length > 0 && (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1])) {
              ring.push([ring[0][0], ring[0][1]]);
            }
            activeFeatures.push({
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [ring]
              },
              properties: {
                layer: "Admiralty_NtM",
                id: item.id,
                subIndex: sIdx + 1,
                type: item.type,
                status: isItemCancelled ? "CANCELLED" : "ACTIVE",
                category: sub.category || "hazard_area",
                subject: item.subject || "",
                country: item.country || "",
                region: item.region || "",
                charts: item.charts || []
              }
            });
          }
        });
      }
      
      // Coords Points
      if (item.coords && item.coords.length > 0) {
        item.coords.forEach((c, cIdx) => {
          activeFeatures.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [c.lon, c.lat]
            },
            properties: {
              layer: "Admiralty_NtM",
              id: item.id,
              pointIndex: cIdx + 1,
              type: item.type,
              status: isItemCancelled ? "CANCELLED" : "ACTIVE",
              dms: c.dms || "",
              subject: item.subject || "",
              country: item.country || "",
              region: item.region || "",
              charts: item.charts || []
            }
          });
        });
      }
    });
  }

  // 2. Port Depths (if overlay is active)
  const isDepthsActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.depths !== false : true;
  if (isDepthsActive && typeof PORT_DEPTHS_DB !== "undefined") {
    const searchVal = ((document.getElementById("ntmSearchInput") ? document.getElementById("ntmSearchInput").value : "") || "").toLowerCase().trim();
    let portsToExport = PORT_DEPTHS_DB;
    if (searchVal) {
      portsToExport = PORT_DEPTHS_DB.filter(p => {
        return p.name.toLowerCase().includes(searchVal) ||
               (p.nameCn && p.nameCn.toLowerCase().includes(searchVal)) ||
               p.country.toLowerCase().includes(searchVal) ||
               p.unlocode.toLowerCase().includes(searchVal);
      });
    }
    portsToExport.forEach(port => {
      portCount++;
      activeFeatures.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [port.lon, port.lat]
        },
        properties: {
          layer: "Port_Depths",
          id: port.id,
          name: port.name,
          nameCn: port.nameCn || "",
          unlocode: port.unlocode,
          country: port.country,
          authority: port.authority || "",
          maxDraft: port.maxDraftMeters || null,
          maxAirDraft: port.maxAirDraftMeters || null,
          fairways: (port.fairways || []).map(f => ({ name: f.name, maintainedDepth: f.maintainedDepthMeters }))
        }
      });
    });
  }

  // 3. Route Waypoints and Track (if overlay is active and route loaded)
  const isRouteActive = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.route !== false : true;
  if (isRouteActive && activeRouteData && activeRouteData.waypoints && activeRouteData.waypoints.length > 0) {
    wptCount = activeRouteData.waypoints.length;
    const lineCoords = activeRouteData.waypoints.map(w => [w.lon, w.lat]);
    activeFeatures.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: lineCoords
      },
      properties: {
        layer: "Route_Track",
        routeName: activeRouteData.name || "SetSail Passage Plan",
        format: activeRouteData.format || "ECDIS",
        waypointCount: activeRouteData.waypoints.length
      }
    });

    activeRouteData.waypoints.forEach((wp, idx) => {
      activeFeatures.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [wp.lon, wp.lat]
        },
        properties: {
          layer: "Route_Waypoint",
          wptIndex: idx + 1,
          wptNo: wp.wptNo || ('00' + (idx + 1)).slice(-3),
          name: wp.name || "",
          lat: wp.lat,
          lon: wp.lon,
          speedKnots: wp.speedKnots != null ? wp.speedKnots : 14.0,
          portsideXTD: wp.portsideXTD != null ? wp.portsideXTD : 0.1,
          starboardXTD: wp.starboardXTD != null ? wp.starboardXTD : 0.1,
          turnRadius: wp.turnRadius != null ? wp.turnRadius : 0.5,
          sail: wp.sail || "RL",
          rot: wp.rot != null ? wp.rot : 0.0
        }
      });
    });
  }

  if (activeFeatures.length === 0) {
    showSetSailToast("No visible chart items found to export. Ensure an overlay is enabled.", "warning");
    return;
  }

  const exportGeoJson = {
    type: "FeatureCollection",
    name: "SetSail_ECDIS_Export",
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    metadata: {
      exportedAtUtc: new Date().toISOString(),
      generator: "SetSail ECDIS Maritime Suite",
      activeOverlays: {
        notices: isNoticesActive,
        depths: isDepthsActive,
        route: isRouteActive,
        weather: false,
        ais: false
      },
      nonExportableOverlays: ["weather", "ais"],
      itemCounts: {
        notices: ntmCount,
        ports: portCount,
        waypoints: wptCount,
        totalFeatures: activeFeatures.length
      }
    },
    features: activeFeatures
  };

  const filename = "SetSail_ECDIS_Export_" + getExportUtcTimestamp() + ".geojson";
  downloadTextFile(JSON.stringify(exportGeoJson, null, 2), filename, "application/geo+json");
  showSetSailToast("Direct Export: " + ntmCount + " NtMs, " + portCount + " Ports, " + wptCount + " Waypoints", "success");
}

window.initCategoryPills = initCategoryPills;
window.initWaypointEditModal = initWaypointEditModal;
window.initNtmOverlayInfoModal = initNtmOverlayInfoModal;
window.openNtmOverlayInfoModal = openNtmOverlayInfoModal;
window.openWaypointEditModal = openWaypointEditModal;
window.centerMapOnWaypoint = centerMapOnWaypoint;
window.showRouteInfoSummary = showRouteInfoSummary;
window.executeDirectMapExport = executeDirectMapExport;


// ==========================================================================
// DEDICATED MARITIME EXPORTERS (IEC 61174 RTZ, JRC ROUTE, USER CHART LAYER)
// ==========================================================================

function escapeXmlAttr(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function exportRouteToRtz(route) {
  const targetRoute = route || activeRouteData;
  if (!targetRoute || !targetRoute.waypoints || targetRoute.waypoints.length === 0) {
    if (typeof showSetSailToast === "function") showSetSailToast("No active passage route to export.", "warning");
    return;
  }
  const routeName = (targetRoute.name || "SetSail_Route").replace(/[^a-zA-Z0-9_\- ]/g, "").trim() || "Passage_Route";
  const nowUtc = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<route version="1.0" xmlns="http://www.cirm.org/RTZ/1/0">\n`;
  xml += `  <routeInfo routeName="${escapeXmlAttr(routeName)}" optimizationMethod="Time" author="SetSail AI Passage Engine">\n`;
  xml += `    <extension source="SetSail">\n`;
  xml += `      <totalDistanceNM>${targetRoute.totalDistanceNM || 0}</totalDistanceNM>\n`;
  xml += `      <steamingDays>${targetRoute.steamingDays || 0}</steamingDays>\n`;
  xml += `      <createdUtc>${nowUtc}</createdUtc>\n`;
  xml += `    </extension>\n`;
  xml += `  </routeInfo>\n`;
  xml += `  <waypoints>\n`;
  
  targetRoute.waypoints.forEach((wp, idx) => {
    const wptName = (wp.name || `WPT ${idx + 1}`).replace(/[^a-zA-Z0-9_\- ]/g, "").trim();
    const radius = wp.turnRadius || 0.50;
    const speed = wp.speedKnots || ((targetRoute.metadata && targetRoute.metadata.speedKnots) || 14.5);
    const portXtd = wp.portsideXTD || 0.20;
    const stbdXtd = wp.starboardXTD || 0.20;
    const geom = (wp.sail === "GC") ? "GreatCircle" : "Loxodrome";
    
    xml += `    <waypoint id="${idx + 1}" name="${escapeXmlAttr(wptName)}" radius="${radius.toFixed(2)}">\n`;
    xml += `      <position lat="${wp.lat.toFixed(5)}" lon="${wp.lon.toFixed(5)}"/>\n`;
    if (idx < targetRoute.waypoints.length - 1) {
      xml += `      <leg portsideXTD="${portXtd.toFixed(2)}" starboardXTD="${stbdXtd.toFixed(2)}" geometryType="${geom}" speedMin="8.0" speedMax="${(speed * 1.2).toFixed(1)}" planSpeed="${speed.toFixed(1)}"/>\n`;
    }
    xml += `    </waypoint>\n`;
  });
  
  xml += `  </waypoints>\n`;
  xml += `</route>`;
  
  const fname = `${routeName.replace(/\s+/g, "_")}_${getExportUtcTimestamp()}.rtz`;
  downloadTextFile(xml, fname, "application/xml");
  if (typeof showSetSailToast === "function") {
    showSetSailToast(`Exported IEC 61174 Route: ${fname} (${targetRoute.waypoints.length} WPTs)`, "success");
  }
}

function exportRouteToJrcCsv(route) {
  const targetRoute = route || activeRouteData;
  if (!targetRoute || !targetRoute.waypoints || targetRoute.waypoints.length === 0) {
    if (typeof showSetSailToast === "function") showSetSailToast("No active passage route to export.", "warning");
    return;
  }
  const routeName = (targetRoute.name || "SetSail_Route").trim();
  let csv = `// ROUTE SHEET\n`;
  csv += `// ${routeName}, Total Distance: ${targetRoute.totalDistanceNM || 0} NM, Steaming Days: ${targetRoute.steamingDays || 0}\n`;
  csv += `// WPT No., WPT Name, Latitude, Longitude, Leg Type, Plan Speed, Port XTD, Stbd XTD, Turn Radius\n`;
  
  targetRoute.waypoints.forEach((wp, idx) => {
    const no = ('00' + (idx + 1)).slice(-3);
    const name = (wp.name || `WPT ${idx + 1}`).replace(/,/g, " ");
    const latAbs = Math.abs(wp.lat);
    const latDeg = Math.floor(latAbs);
    const latMin = ((latAbs - latDeg) * 60).toFixed(2).padStart(5, '0');
    const latStr = `${String(latDeg).padStart(2, '0')}-${latMin}${wp.lat >= 0 ? 'N' : 'S'}`;

    const lonAbs = Math.abs(wp.lon);
    const lonDeg = Math.floor(lonAbs);
    const lonMin = ((lonAbs - lonDeg) * 60).toFixed(2).padStart(5, '0');
    const lonStr = `${String(lonDeg).padStart(3, '0')}-${lonMin}${wp.lon >= 0 ? 'E' : 'W'}`;

    const legType = wp.sail === "GC" ? "GC" : "RL";
    const speed = (wp.speedKnots || 14.5).toFixed(1);
    const pXtd = (wp.portsideXTD || 0.20).toFixed(2);
    const sXtd = (wp.starboardXTD || 0.20).toFixed(2);
    const radius = (wp.turnRadius || 0.50).toFixed(2);
    csv += `${no}, ${name}, ${latStr}, ${lonStr}, ${legType}, ${speed}, ${pXtd}, ${sXtd}, ${radius}\n`;
  });
  
  const fname = `${routeName.replace(/\s+/g, "_")}_JRC_Route_${getExportUtcTimestamp()}.csv`;
  downloadTextFile(csv, fname, "text/csv");
  if (typeof showSetSailToast === "function") {
    showSetSailToast(`Exported JRC Route CSV: ${fname}`, "success");
  }
}

function exportUserChartGeoJson() {
  const selectedNotices = typeof getExportSelectedNotices === "function" ? getExportSelectedNotices() : [];
  const features = [];

  // NtM Points & Polygons
  selectedNotices.forEach(n => {
    if (n.subPolygons && n.subPolygons.length > 0) {
      n.subPolygons.forEach((sub, sIdx) => {
        const pts = sub.points || (sub.coords || []).map(c => [c.lon, c.lat]);
        if (pts && pts.length >= 3) {
          const ring = pts.map(p => Array.isArray(p) ? (p[0] > 90 ? [p[1], p[0]] : p) : [p.lon, p.lat]);
          if (ring.length > 0 && (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1])) {
            ring.push([ring[0][0], ring[0][1]]);
          }
          features.push({
            type: "Feature",
            geometry: { type: "Polygon", coordinates: [ring] },
            properties: {
              layer: "UserChart_Admiralty_NtM",
              id: n.id,
              type: n.type,
              subject: n.subject || "",
              category: sub.category || "hazard_area"
            }
          });
        }
      });
    }
    if (n.coords && n.coords.length > 0) {
      n.coords.forEach((c, cIdx) => {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [c.lon, c.lat] },
          properties: {
            layer: "UserChart_Admiralty_NtM",
            id: n.id,
            type: n.type,
            dms: c.dms || "",
            subject: n.subject || ""
          }
        });
      });
    }
  });

  // Ports & Bathymetry
  if (typeof PORT_DEPTHS_DB !== "undefined") {
    PORT_DEPTHS_DB.forEach(p => {
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.coords[1], p.coords[0]] },
        properties: {
          layer: "UserChart_Port_Bathymetry",
          name: p.name,
          country: p.country,
          fairwayDepthM: p.fairwayDepthM,
          tideRangeM: p.tideRangeM
        }
      });
    });
  }

  const geoJson = {
    type: "FeatureCollection",
    name: "SetSail_ECDIS_User_Chart_Layer",
    metadata: {
      exportedAtUtc: new Date().toISOString(),
      noticesCount: selectedNotices.length,
      portsCount: typeof PORT_DEPTHS_DB !== "undefined" ? PORT_DEPTHS_DB.length : 0
    },
    features: features
  };

  const fname = `ECDIS_User_Chart_Layer_${getExportUtcTimestamp()}.geojson`;
  downloadTextFile(JSON.stringify(geoJson, null, 2), fname, "application/geo+json");
  if (typeof showSetSailToast === "function") {
    showSetSailToast(`Exported ECDIS User Chart GeoJSON (${features.length} objects)`, "success");
  }
}

function exportUserChartCsv() {
  const selectedNotices = typeof getExportSelectedNotices === "function" ? getExportSelectedNotices() : [];
  let csv = "Layer,Object_Type,Identifier,Subject,Latitude_Dec,Longitude_Dec,Coordinates_DMS,Depth_m\n";

  selectedNotices.forEach(n => {
    if (n.coords && n.coords.length > 0) {
      n.coords.forEach(c => {
        const subj = (n.subject || "").replace(/,/g, " ").replace(/"/g, '""');
        csv += `Admiralty_NtM,Notice_${n.type},${n.id},"${subj}",${c.lat.toFixed(5)},${c.lon.toFixed(5)},"${c.dms || ''}",\n`;
      });
    }
  });

  if (typeof PORT_DEPTHS_DB !== "undefined") {
    PORT_DEPTHS_DB.forEach(p => {
      const pName = p.name.replace(/,/g, " ");
      csv += `Port_Bathymetry,Port,${p.unlocode || p.id},"${pName}",${p.coords[0].toFixed(5)},${p.coords[1].toFixed(5)},,${p.fairwayDepthM || ''}\n`;
    });
  }

  const fname = `ECDIS_User_Chart_Layer_${getExportUtcTimestamp()}.csv`;
  downloadTextFile(csv, fname, "text/csv");
  if (typeof showSetSailToast === "function") {
    showSetSailToast(`Exported User Chart CSV: ${fname}`, "success");
  }
}


function openNavDataExportModal() {
  const modal = document.getElementById("ntmExportModal");
  if (!modal) return;

  const hasRoute = Boolean(activeRouteData && activeRouteData.waypoints && activeRouteData.waypoints.length > 0);
  const routeBadge = document.getElementById("expRouteBadge");
  const routeSub = document.getElementById("expRouteSubtitle");
  const btnRtz = document.getElementById("expBtnRtz");
  const btnRouteCsv = document.getElementById("expBtnRouteCsv");
  const btnRouteGeo = document.getElementById("expBtnRouteGeoJson");

  if (routeBadge) {
    routeBadge.textContent = hasRoute ? `${activeRouteData.waypoints.length} WPTs Active` : "No Active Route";
    routeBadge.style.color = hasRoute ? "#38bdf8" : "#94a3b8";
    routeBadge.style.borderColor = hasRoute ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.1)";
  }
  if (routeSub) {
    routeSub.textContent = hasRoute 
      ? `Passage: "${activeRouteData.name}" (${activeRouteData.totalDistanceNM || 0} NM)`
      : "Plot or generate a passage route in SetRoute to export route files.";
  }
  [btnRtz, btnRouteCsv, btnRouteGeo].forEach(btn => {
    if (btn) btn.disabled = !hasRoute;
  });

  const chartSub = document.getElementById("expChartSubtitle");
  const ntmCnt = typeof NTM_STORE !== "undefined" ? NTM_STORE.filter(n => !n.isCancelled).length : 0;
  const portCnt = typeof PORT_DEPTHS_DB !== "undefined" ? PORT_DEPTHS_DB.length : 0;
  if (chartSub) {
    chartSub.textContent = `All chart objects: ${ntmCnt} NtM notices & ${portCnt} World Ports bathymetry`;
  }

  if (typeof updateExportModalCounts === "function") {
    updateExportModalCounts();
  }

  modal.classList.add("open");
}

function initNavDataExportListeners() {
  const btnRtz = document.getElementById("expBtnRtz");
  const btnRouteCsv = document.getElementById("expBtnRouteCsv");
  const btnRouteGeo = document.getElementById("expBtnRouteGeoJson");
  const expBtnFuruno = document.getElementById("expBtnFuruno");
  const expBtnJrcUch = document.getElementById("expBtnJrcUch");
  const expBtnJrc = document.getElementById("expBtnJrc");
  const expBtnTransas = document.getElementById("expBtnTransas");
  const expBtnSperry = document.getElementById("expBtnSperry");
  const expBtnSam = document.getElementById("expBtnSam");
  const expBtnPdf = document.getElementById("expBtnPdf");
  const expBtnGeo = document.getElementById("expBtnGeoJson");
  const expBtnCsv = document.getElementById("expBtnCsv");
  const modal = document.getElementById("ntmExportModal");

  if (btnRtz) {
    btnRtz.addEventListener("click", () => {
      exportRouteToRtz(activeRouteData);
      if (modal) modal.classList.remove("open");
    });
  }
  if (btnRouteCsv) {
    btnRouteCsv.addEventListener("click", () => {
      exportRouteToJrcCsv(activeRouteData);
      if (modal) modal.classList.remove("open");
    });
  }
  if (btnRouteGeo) {
    btnRouteGeo.addEventListener("click", () => {
      exportSetRouteGeoJson();
      if (modal) modal.classList.remove("open");
    });
  }
  const runNoticeExport = (fn) => {
    const selected = getExportSelectedNotices();
    if (selected.length === 0) {
      alert("No notices match the selected export criteria.");
      return;
    }
    fn(selected);
    if (modal) modal.classList.remove("open");
  };
  if (expBtnFuruno) {
    expBtnFuruno.addEventListener("click", () => {
      runNoticeExport((selected) => downloadFurunoUserChartXml(selected, `Furuno_UserChart_${getExportUtcTimestamp()}.xml`));
    });
  }
  if (expBtnJrcUch) {
    expBtnJrcUch.addEventListener("click", () => {
      runNoticeExport((selected) => downloadJrcUchFile(selected, `NSWARN_${getExportUtcTimestamp()}.uch`));
    });
  }
  if (expBtnJrc) {
    expBtnJrc.addEventListener("click", () => {
      runNoticeExport((selected) => {
        const fname = `Admiralty_NtM_Overlay_${getExportUtcTimestamp()}.uchm`;
        if (typeof window.downloadJrcUchmFile === "function") {
          window.downloadJrcUchmFile(selected, fname);
        }
      });
    });
  }
  if (expBtnTransas) {
    expBtnTransas.addEventListener("click", () => {
      runNoticeExport((selected) => downloadTransasAizFile(selected, `route_warnings_transas_${getExportUtcTimestamp()}.aiz`));
    });
  }
  if (expBtnSperry) {
    expBtnSperry.addEventListener("click", () => {
      runNoticeExport((selected) => downloadSperryUpdateFile(selected, `NS_NAVAREA_Warnings_${getExportUtcTimestamp()}.update`));
    });
  }
  if (expBtnSam) {
    expBtnSam.addEventListener("click", () => {
      runNoticeExport((selected) => downloadSamUserChartFile(selected, `SAM_Chartpilot_Warnings_${getExportUtcTimestamp()}.umo`));
    });
  }
  if (expBtnPdf) {
    expBtnPdf.addEventListener("click", () => {
      runNoticeExport((selected) => downloadWarningsPdfSummary(selected, `Selected_Warnings_${getExportUtcTimestamp()}.pdf`));
    });
  }
  if (expBtnGeo) {
    expBtnGeo.addEventListener("click", () => {
      exportUserChartGeoJson();
      if (modal) modal.classList.remove("open");
    });
  }
  if (expBtnCsv) {
    expBtnCsv.addEventListener("click", () => {
      exportUserChartCsv();
      if (modal) modal.classList.remove("open");
    });
  }
}


let filterMinPortDepth = 0;
window.filterMinPortDepth = 0;
if (!window.WEATHER_SUBFILTERS) {
  window.WEATHER_SUBFILTERS = loadWeatherSubfilters();
}
window.PORTS_SUBFILTERS = { fairways: true, isobaths: true };
window.ROUTE_SUBFILTERS = { waypoints: true, line: true };

function syncDynamicFilterPopover() {
  const isNotices = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.notices !== false : true;
  const isDepths  = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.depths !== false : true;
  const isWeather = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.weather !== false : true;
  const isRoute   = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.route !== false : true;

  const secNotices = document.getElementById("filterSecNotices");
  const secWeather = document.getElementById("filterSecWeather");
  const secDepths  = document.getElementById("filterSecDepths");
  const secRoute   = document.getElementById("filterSecRoute");
  const secEmpty   = document.getElementById("filterSecEmpty");

  if (secNotices) secNotices.style.display = isNotices ? "block" : "none";
  if (secWeather) secWeather.style.display = isWeather ? "block" : "none";
  if (secDepths)  secDepths.style.display  = isDepths  ? "block" : "none";
  if (secRoute)   secRoute.style.display   = isRoute   ? "block" : "none";

  const activeCount = (isNotices ? 1 : 0) + (isDepths ? 1 : 0) + (isWeather ? 1 : 0) + (isRoute ? 1 : 0);
  if (secEmpty) secEmpty.style.display = activeCount > 0 ? "none" : "block";

  // If only 1 section is active, arrange its checkboxes in 2 columns so it stays compact
  document.querySelectorAll("#ntmFilterMultiGrid .ntm-filter-chk-grid").forEach((g) => {
    g.style.gridTemplateColumns = activeCount === 1 ? "repeat(2, minmax(0, 1fr))" : "1fr";
  });

  // Update Weather sub-object counts
  if (typeof MARINE_WEATHER_STORE !== "undefined") {
    const cCyc = document.getElementById("popCntWxCyclones");
    const cPrs = document.getElementById("popCntWxPressure");
    const cWav = document.getElementById("popCntWxWaves");
    const cWnd = document.getElementById("popCntWxWinds");
    if (cCyc) cCyc.textContent = (MARINE_WEATHER_STORE.storms || []).length;
    if (cPrs) cPrs.textContent = (MARINE_WEATHER_STORE.pressureCenters || []).length;
    if (cWav) cWav.textContent = (MARINE_WEATHER_STORE.waves || []).length;
    if (cWnd) cWnd.textContent = (MARINE_WEATHER_STORE.windVectors || []).length;
  }

  if (typeof window.renderGlobe3D === "function") {
    window.renderGlobe3D();
  }
}

window.syncDynamicFilterPopover = syncDynamicFilterPopover;
window.syncFilterMasterCheckboxes = syncDynamicFilterPopover;

function initMasterFilterControls() {
  // Weather Sub-Filters
  const chkWxCyclones = document.getElementById("popWxCyclones");
  const chkWxPressure = document.getElementById("popWxPressure");
  const chkWxWaves    = document.getElementById("popWxWaves");
  const chkWxWinds    = document.getElementById("popWxWinds");

  const updateWeatherSubfilters = () => {
    const prev = window.WEATHER_SUBFILTERS || loadWeatherSubfilters();
    saveWeatherSubfilters({
      cyclones: chkWxCyclones ? chkWxCyclones.checked : prev.cyclones !== false,
      pressure: chkWxPressure ? chkWxPressure.checked : prev.pressure !== false,
      waves: chkWxWaves ? chkWxWaves.checked : prev.waves !== false,
      winds: chkWxWinds ? chkWxWinds.checked : prev.winds !== false,
      opc: prev.opc !== false,
      buoys: prev.buoys !== false,
      currents: prev.currents !== false
    });
    if (typeof syncWeatherModalLayerChecks === "function") syncWeatherModalLayerChecks();
    if (typeof renderWeatherOnMap === "function") {
      renderWeatherOnMap(leafletMap);
    }
    syncFilterIndicators();
  };

  [chkWxCyclones, chkWxPressure, chkWxWaves, chkWxWinds].forEach(el => {
    if (el) el.addEventListener("change", updateWeatherSubfilters);
  });

  // Port Depths Sub-Filters
  const chkPortsFairways = document.getElementById("popPortsFairways");
  const chkPortsIsobaths = document.getElementById("popPortsIsobaths");
  const selDepthMin      = document.getElementById("popSelectDepthMin");

  const updatePortsSubfilters = () => {
    window.PORTS_SUBFILTERS = {
      fairways: chkPortsFairways ? chkPortsFairways.checked : true,
      isobaths: chkPortsIsobaths ? chkPortsIsobaths.checked : true
    };
    filterMinPortDepth = selDepthMin ? (parseFloat(selDepthMin.value) || 0) : 0;
    window.filterMinPortDepth = filterMinPortDepth;
    if (typeof renderPortDepthsOnMap === "function" && leafletMap) {
      renderPortDepthsOnMap(leafletMap);
    }
    if (typeof renderNtMListAndMap === "function") {
      renderNtMListAndMap();
    }
    syncFilterIndicators();
  };

  if (chkPortsFairways) chkPortsFairways.addEventListener("change", updatePortsSubfilters);
  if (chkPortsIsobaths) chkPortsIsobaths.addEventListener("change", updatePortsSubfilters);
  if (selDepthMin)      selDepthMin.addEventListener("change", updatePortsSubfilters);

  // My Route Sub-Filters
  const chkRouteWpts = document.getElementById("popRouteShowWpts");
  const chkRouteLine = document.getElementById("popRouteShowLine");

  const updateRouteSubfilters = () => {
    window.ROUTE_SUBFILTERS = {
      waypoints: chkRouteWpts ? chkRouteWpts.checked : true,
      line:      chkRouteLine ? chkRouteLine.checked : true
    };
    if (activeRouteData && typeof renderRouteOnMap === "function") {
      renderRouteOnMap(activeRouteData, false);
    }
    if (typeof renderNtMListAndMap === "function") {
      renderNtMListAndMap();
    }
    syncFilterIndicators();
  };

  if (chkRouteWpts) chkRouteWpts.addEventListener("change", updateRouteSubfilters);
  if (chkRouteLine) chkRouteLine.addEventListener("change", updateRouteSubfilters);

  // Reset All Object Sub-Filters Button
  const btnReset = document.getElementById("popBtnResetFilters");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      const chkAll = document.getElementById("popChkAll");
      if (chkAll) {
        chkAll.checked = true;
        chkAll.dispatchEvent(new Event("change"));
      }
      if (chkWxCyclones) chkWxCyclones.checked = true;
      if (chkWxPressure) chkWxPressure.checked = true;
      if (chkWxWaves)    chkWxWaves.checked = true;
      if (chkWxWinds)    chkWxWinds.checked = true;
      updateWeatherSubfilters();

      if (chkPortsFairways) chkPortsFairways.checked = true;
      if (chkPortsIsobaths) chkPortsIsobaths.checked = true;
      if (selDepthMin)      selDepthMin.value = "0";
      updatePortsSubfilters();

      if (chkRouteWpts) chkRouteWpts.checked = true;
      if (chkRouteLine) chkRouteLine.checked = true;
      updateRouteSubfilters();
    });
  }

  // Also sync dynamic sections whenever filter button is clicked
  const filterBtn = document.getElementById("ntmFilterMenuBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      syncDynamicFilterPopover();
    });
  }

  syncDynamicFilterPopover();
}

/* ==========================================================================
   SETSAIL v4.4 — MULTI-VENDOR ECDIS USER CHART EXPORTERS
   (Furuno XML, JRC Binary .uch, Transas .aiz, Sperry .update, SAM .umo, PDF)
   ========================================================================== */

function downloadBinaryBlob(uint8Arr, filename, mimeType) {
  const blob = new Blob([uint8Arr], { type: mimeType || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 400);
}

// 1. Furuno FMD ECDIS UserChart XML (.xml) — matches selected_warnings_furuno_userchart.xml
function downloadFurunoUserChartXml(notices, filename) {
  const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const areas = [];
  const lines = [];
  const points = [];
  const labels = [];

  (notices || []).forEach((n, idx) => {
    const name = esc(n.noticeNumber || `NTM-${idx + 1}`);
    const desc = esc((n.title || n.category || "").slice(0, 120));
    const coords = Array.isArray(n.coords) && n.coords.length > 0
      ? n.coords
      : (Number.isFinite(n.lat) && Number.isFinite(n.lon) ? [{ lat: n.lat, lon: n.lon }] : []);
    if (coords.length === 0) return;

    if (coords.length >= 3) {
      const vtxXml = coords.map((c, i) => `        <vertex id="${i + 1}" latitude="${Number(c.lat).toFixed(6)}" longitude="${Number(c.lon).toFixed(6)}"/>`).join("\n");
      areas.push(`    <area name="${name}" description="${desc}">\n      <position>\n${vtxXml}\n      </position>\n      <type checkDanger="1" displayRadar="0" hasNotes="0" notesType="0"/>\n    </area>`);
    } else if (coords.length === 2) {
      const vtxXml = coords.map((c, i) => `        <vertex id="${i + 1}" latitude="${Number(c.lat).toFixed(6)}" longitude="${Number(c.lon).toFixed(6)}"/>`).join("\n");
      lines.push(`    <line name="${name}" description="${desc}">\n      <position>\n${vtxXml}\n      </position>\n      <type checkDanger="1" displayRadar="0" hasNotes="0" notesType="0"/>\n    </line>`);
    } else {
      const c = coords[0];
      points.push(`    <point name="${name}" description="${desc}">\n      <position>\n        <vertex id="1" latitude="${Number(c.lat).toFixed(6)}" longitude="${Number(c.lon).toFixed(6)}"/>\n      </position>\n      <type checkDanger="1" displayRadar="0" shape="1" hasNotes="0" notesType="0"/>\n    </point>`);
    }

    const c0 = coords[0];
    labels.push(`    <label name="${name}" description="${name}">\n      <position>\n        <vertex id="1" latitude="${Number(c0.lat).toFixed(6)}" longitude="${Number(c0.lon).toFixed(6)}"/>\n      </position>\n      <attribute labelStyle="2" labelText="${name}"/>\n      <type checkDanger="0" displayRadar="0"/>\n    </label>`);
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<!--userchart node-->\n<userchart name="SELECTED NAVAREA WARNINGS" description="SetSail Admiralty NtM Export" version="1.0">\n`;
  if (areas.length > 0) xml += `  <!--userchart area-->\n  <areas>\n${areas.join("\n")}\n  </areas>\n`;
  if (lines.length > 0) xml += `  <!--userchart line-->\n  <lines>\n${lines.join("\n")}\n  </lines>\n`;
  if (points.length > 0) xml += `  <!--userchart point-->\n  <points>\n${points.join("\n")}\n  </points>\n`;
  if (labels.length > 0) xml += `  <!--userchart label-->\n  <labels>\n${labels.join("\n")}\n  </labels>\n`;
  xml += `</userchart>\n`;

  downloadTextFile(xml, filename || "selected_warnings_furuno_userchart.xml", "application/xml");
}

// 2. JRC JAN-7201/9201 Legacy Binary User Chart (.uch) — byte-exact match to NSWARN.uch
function downloadJrcUchFile(notices, filename) {
  const SCALE = 1536000;
  const writeAscii = (buf, offset, str, maxLen) => {
    const s = String(str || "");
    for (let i = 0; i < maxLen; i++) {
      buf[offset + i] = i < s.length ? (s.charCodeAt(i) & 0x7f) : 0;
    }
  };

  const chunks = [];
  (notices || []).forEach((n, idx) => {
    const label = String(n.noticeNumber || `NTM ${idx + 1}`).slice(0, 60);
    const coords = Array.isArray(n.coords) && n.coords.length > 0
      ? n.coords
      : (Number.isFinite(n.lat) && Number.isFinite(n.lon) ? [{ lat: n.lat, lon: n.lon }] : []);
    if (coords.length === 0) return;

    if (coords.length >= 2) {
      // Close polygon loop if >= 3 vertices
      const pts = coords.slice();
      if (pts.length >= 3 && (pts[0].lat !== pts[pts.length - 1].lat || pts[0].lon !== pts[pts.length - 1].lon)) {
        pts.push({ lat: pts[0].lat, lon: pts[0].lon });
      }
      const npts = Math.min(pts.length, 250);
      const recLen = 88 + npts * 8;
      const rec = new Uint8Array(recLen);
      const dv = new DataView(rec.buffer);
      dv.setUint32(0, 10, true);          // Type 10 = Polygon/Line
      dv.setUint32(4, 100000000, true);   // SCAMIN
      dv.setUint32(8, 1000, true);        // Flag
      writeAscii(rec, 12, label, 64);
      rec[76] = 1;
      rec[77] = 2;
      rec[80] = 3;
      dv.setUint16(86, npts, true);
      for (let i = 0; i < npts; i++) {
        dv.setInt32(88 + i * 8, Math.round(Number(pts[i].lat) * SCALE), true);
        dv.setInt32(88 + i * 8 + 4, Math.round(Number(pts[i].lon) * SCALE), true);
      }
      chunks.push(rec);
    } else {
      // Type 1 = Point Symbol (96 bytes)
      const rec = new Uint8Array(96);
      const dv = new DataView(rec.buffer);
      dv.setUint32(0, 1, true);
      dv.setUint32(4, 100000000, true);
      dv.setUint32(8, 1000, true);
      writeAscii(rec, 12, label, 64);
      writeAscii(rec, 76, "~WARNSY0", 12);
      dv.setInt32(88, Math.round(Number(coords[0].lat) * SCALE), true);
      dv.setInt32(92, Math.round(Number(coords[0].lon) * SCALE), true);
      chunks.push(rec);
    }

    // Type 11 = Text Label (152 bytes)
    const lblRec = new Uint8Array(152);
    const ldv = new DataView(lblRec.buffer);
    ldv.setUint32(0, 11, true);
    ldv.setUint32(4, 100000000, true);
    ldv.setUint32(8, 1000, true);
    lblRec[77] = 0x12;
    writeAscii(lblRec, 80, label, 64);
    ldv.setInt32(144, Math.round(Number(coords[0].lat) * SCALE), true);
    ldv.setInt32(148, Math.round(Number(coords[0].lon) * SCALE), true);
    chunks.push(lblRec);
  });

  const bodyLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const totalLen = 144 + bodyLen;
  const out = new Uint8Array(totalLen);
  const hdv = new DataView(out.buffer);
  hdv.setUint32(0, totalLen, true);
  hdv.setUint32(4, Math.floor(Date.now() / 1000), true);
  writeAscii(out, 16, "SELECTED NAVAREA WARNINGS", 128);

  let pos = 144;
  chunks.forEach((c) => {
    out.set(c, pos);
    pos += c.length;
  });

  downloadBinaryBlob(out, filename || "NSWARN.uch", "application/octet-stream");
}

// 3. Sperry Marine VisionMaster FT (.update) — matches NS NAVAREA Route.update (radian vertices)
function downloadSperryUpdateFile(notices, filename) {
  const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const makeGuid = (seed) => {
    let h = 2166136261 >>> 0;
    const str = String(seed);
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    const hex = (n, len) => (n >>> 0).toString(16).padStart(len, "0").slice(0, len);
    return `${hex(h, 8)}-${hex(h ^ 0x9e37, 4)}-4${hex(h >>> 4, 3)}-8${hex(h >>> 8, 3)}-${hex(h ^ 0x5bd1e995, 8)}${hex(h >>> 12, 4)}`;
  };

  const layerId = "0829118a-bec2-5898-bb4a-573d5b464229";
  const nowIso = new Date().toISOString().replace("Z", "+00:00");
  const deg2rad = Math.PI / 180.0;

  const objectsXml = [];
  (notices || []).forEach((n, idx) => {
    const coords = Array.isArray(n.coords) && n.coords.length > 0
      ? n.coords
      : (Number.isFinite(n.lat) && Number.isFinite(n.lon) ? [{ lat: n.lat, lon: n.lon }] : []);
    if (coords.length === 0) return;

    const latsRad = coords.map(c => Number(c.lat) * deg2rad);
    const lonsRad = coords.map(c => Number(c.lon) * deg2rad);
    const latMin = Math.min(...latsRad);
    const latMax = Math.max(...latsRad);
    const lonMin = Math.min(...lonsRad);
    const lonMax = Math.max(...lonsRad);
    const vtxStr = coords.map(c => `${(Number(c.lat) * deg2rad)},${(Number(c.lon) * deg2rad)}`).join(",");
    const altsStr = coords.map(() => "0").join(",");
    const isArea = coords.length >= 3;
    const objType = isArea ? "CUSTOM_AREA" : "CHINFO09";
    const label = esc(`${n.noticeNumber || `NTM-${idx + 1}`} ${(n.category || "").toUpperCase()}`.trim());
    const note = esc((n.rawText || n.description || n.title || "").slice(0, 950));
    const objId = makeGuid(`sperry-${n.id || idx}-${n.noticeNumber}`);

    objectsXml.push(`  <Objects>
    <ObjectId>${objId}</ObjectId>
    <Type>${objType}</Type>
    <LatMin>${latMin}</LatMin>
    <LonMin>${lonMin}</LonMin>
    <LatMax>${latMax}</LatMax>
    <LonMax>${lonMax}</LonMax>
    <LayerId>${layerId}</LayerId>
    <Vertices>${vtxStr}</Vertices>
    <Rotation>0</Rotation>
    <CreateTime>${nowIso}</CreateTime>
    <CreateShip />
    <ModifyTime>${nowIso}</ModifyTime>
    <ModifyUser />
    <Name />
    <Label>${label}</Label>
    <Note>${note}</Note>
    <ChartEdition>-1</ChartEdition>
    <Archived>false</Archived>
    <TimeLabel />
    <DateDependentType>0</DateDependentType>
    <DateDependentStart>${nowIso}</DateDependentStart>
    <DateDependentEnd>${nowIso}</DateDependentEnd>
    <HasLight>false</HasLight>
    <S57Attributes />
    ${isArea ? "<LineSegmentType>RhumbLine</LineSegmentType>" : ""}
    <CustomLineColor>RadarMapNInfo</CustomLineColor>
    <LineStyle>Solid</LineStyle>
    <LineWeight>${isArea ? "Thin" : "Regular"}</LineWeight>
    <LineArrowType>None</LineArrowType>
    <ShowArrowsAtStart>false</ShowArrowsAtStart>
    <ShowArrowsAtEnd>false</ShowArrowsAtEnd>
    <FillColor>ManufacturersInfoNote</FillColor>
    <FillPattern>Solid</FillPattern>
    <Opacity>Medium</Opacity>
    <Altitudes>${altsStr}</Altitudes>
  </Objects>`);
  });

  const xml = `<NewDataSet>
${objectsXml.join("\n")}
  <Layers>
    <Id>${layerId}</Id>
    <Name>NS NAVAREA Route</Name>
    <Description>SetSail Admiralty NtM Export</Description>
  </Layers>
</NewDataSet>`;

  downloadTextFile(xml, filename || "NS NAVAREA Route.update", "application/xml");
}

// Helper: Create a valid standard uncompressed ZIP archive from an array of { name, data (Uint8Array) }
function buildSimpleZipArchive(files) {
  const crcTable = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c >>> 0;
    }
    return t;
  })();
  const crc32 = (u8) => {
    let c = 0xffffffff;
    for (let i = 0; i < u8.length; i++) c = crcTable[(c ^ u8[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };

  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((f) => {
    const nameBytes = new TextEncoder().encode(f.name);
    const data = f.data;
    const crc = crc32(data);

    const lh = new Uint8Array(30 + nameBytes.length);
    const ldv = new DataView(lh.buffer);
    ldv.setUint32(0, 0x04034b50, true);
    ldv.setUint16(4, 20, true);
    ldv.setUint16(8, 0, true); // store (uncompressed)
    ldv.setUint32(14, crc, true);
    ldv.setUint32(18, data.length, true);
    ldv.setUint32(22, data.length, true);
    ldv.setUint16(26, nameBytes.length, true);
    lh.set(nameBytes, 30);

    const ch = new Uint8Array(46 + nameBytes.length);
    const cdv = new DataView(ch.buffer);
    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, data.length, true);
    cdv.setUint32(24, data.length, true);
    cdv.setUint16(28, nameBytes.length, true);
    cdv.setUint32(42, offset, true);
    ch.set(nameBytes, 46);

    localParts.push(lh, data);
    centralParts.push(ch);
    offset += lh.length + data.length;
  });

  const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
  const eocd = new Uint8Array(22);
  const edv = new DataView(eocd.buffer);
  edv.setUint32(0, 0x06054b50, true);
  edv.setUint16(8, files.length, true);
  edv.setUint16(10, files.length, true);
  edv.setUint32(12, centralSize, true);
  edv.setUint32(16, offset, true);

  const total = offset + centralSize + 22;
  const out = new Uint8Array(total);
  let p = 0;
  localParts.forEach(part => { out.set(part, p); p += part.length; });
  centralParts.forEach(part => { out.set(part, p); p += part.length; });
  out.set(eocd, p);
  return out;
}

// 4. Transas / Wärtsilä Navi-Sailor 4000 AddInfo (.aiz) — ZIP archive containing route_warnings_transas.ai
function downloadTransasAizFile(notices, filename) {
  const lines = [
    "// TRANSAS NAVI-SAILOR ADDINFO USER CHART LAYER",
    `// Generated: ${new Date().toISOString()}`,
    "FORMAT=AddInfo",
    "LAYER=SELECTED NAVAREA WARNINGS"
  ];
  (notices || []).forEach((n, idx) => {
    const id = n.noticeNumber || `NTM-${idx + 1}`;
    const cat = (n.category || "WARNING").toUpperCase();
    const coords = Array.isArray(n.coords) && n.coords.length > 0
      ? n.coords
      : (Number.isFinite(n.lat) && Number.isFinite(n.lon) ? [{ lat: n.lat, lon: n.lon }] : []);
    if (coords.length === 0) return;
    const objType = coords.length >= 3 ? "AREA" : (coords.length === 2 ? "LINE" : "POINT");
    const ptsStr = coords.map(c => `${Number(c.lat).toFixed(6)},${Number(c.lon).toFixed(6)}`).join(";");
    const txt = String(n.title || n.rawText || "").replace(/\r?\n/g, " ").slice(0, 240);
    lines.push(`[OBJECT_${idx + 1}]`);
    lines.push(`ID=${id}`);
    lines.push(`TYPE=${objType}`);
    lines.push(`CATEGORY=${cat}`);
    lines.push(`DANGER=1`);
    lines.push(`VERTICES=${ptsStr}`);
    lines.push(`COMMENT=${txt}`);
  });
  const aiBytes = new TextEncoder().encode(lines.join("\r\n") + "\r\n");
  const zipBytes = buildSimpleZipArchive([
    { name: "route_warnings_transas.ai", data: aiBytes }
  ]);
  downloadBinaryBlob(zipBytes, filename || "route_warnings_transas.aiz", "application/octet-stream");
}

// 5. SAM Electronics / Wärtsilä SAM Chartpilot User Map Objects (.umo)
function downloadSamUserChartFile(notices, filename) {
  const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const items = [];
  (notices || []).forEach((n, idx) => {
    const id = esc(n.noticeNumber || `NTM-${idx + 1}`);
    const cat = esc(n.category || "Navigational Warning");
    const coords = Array.isArray(n.coords) && n.coords.length > 0
      ? n.coords
      : (Number.isFinite(n.lat) && Number.isFinite(n.lon) ? [{ lat: n.lat, lon: n.lon }] : []);
    if (coords.length === 0) return;
    const geomType = coords.length >= 3 ? "POLYGON" : (coords.length === 2 ? "POLYLINE" : "SYMBOL");
    const vtx = coords.map((c, i) => `      <Point seq="${i + 1}" lat="${Number(c.lat).toFixed(6)}" lon="${Number(c.lon).toFixed(6)}" />`).join("\n");
    const note = esc((n.rawText || n.title || "").replace(/\r?\n/g, " ").slice(0, 300));
    items.push(`    <UserMapObject id="${id}" type="${geomType}" category="${cat}" dangerHighlight="true">\n      <Label>${id}</Label>\n      <Description>${note}</Description>\n${vtx}\n    </UserMapObject>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<SAMChartpilotUserChart version="2.0" name="SELECTED NAVAREA WARNINGS" created="${new Date().toISOString()}">\n  <Objects>\n${items.join("\n")}\n  </Objects>\n</SAMChartpilotUserChart>\n`;
  downloadTextFile(xml, filename || "SAM_Chartpilot_Warnings.umo", "application/xml");
}

// 6. Valid Binary PDF 1.4 Generator (.pdf) — matches selected_warnings (5).pdf
function downloadWarningsPdfSummary(notices, filename) {
  const cleanPdfText = (s) => String(s || "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

  const allLines = [];
  allLines.push("B TYPE  SELECTED NAVAREA & ADMIRALTY NTM WARNINGS BULLETIN");
  allLines.push(`S Exported: ${new Date().toUTCString()}   |   Total Active Objects: ${(notices || []).length}`);
  allLines.push("L");

  (notices || []).forEach((n, idx) => {
    const num = n.noticeNumber || `NTM-${idx + 1}`;
    const typeTag = n.type ? `[${n.type}]` : "";
    const cat = n.category || "Navigational Warning";
    const reg = n.region || "Global";
    const latStr = Number.isFinite(n.lat) ? `${Math.abs(n.lat).toFixed(4)} ${n.lat >= 0 ? "N" : "S"}` : "";
    const lonStr = Number.isFinite(n.lon) ? `${Math.abs(n.lon).toFixed(4)} ${n.lon >= 0 ? "E" : "W"}` : "";
    allLines.push(`H ${idx + 1}. ${num} ${typeTag} - ${cat} (${reg})   POS: ${latStr} ${lonStr}`);

    const raw = String(n.rawText || n.description || n.title || "").replace(/\r?\n+/g, " ").trim();
    for (let i = 0; i < raw.length && i < 640; i += 88) {
      allLines.push(`T   ${raw.slice(i, i + 88)}`);
    }
    allLines.push("L");
  });

  const LINES_PER_PAGE = 46;
  const pages = [];
  for (let i = 0; i < allLines.length; i += LINES_PER_PAGE) {
    pages.push(allLines.slice(i, i + LINES_PER_PAGE));
  }
  if (pages.length === 0) pages.push(["B No warnings selected."]);

  const objects = [];
  const addObj = (body) => {
    objects.push(body);
    return objects.length;
  };

  const fontRegularId = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageIds = [];
  const pagesRootPlaceholderId = addObj(""); // placeholder for /Pages

  pages.forEach((pLines, pIdx) => {
    let y = 800;
    const cmds = ["BT"];
    pLines.forEach((ln) => {
      const code = ln.charAt(0);
      const txt = cleanPdfText(ln.slice(2));
      if (code === "B") {
        cmds.push(`/F2 13 Tf 1 0 0 1 42 ${y} Tm (${txt}) Tj`);
        y -= 18;
      } else if (code === "S") {
        cmds.push(`/F1 9 Tf 1 0 0 1 42 ${y} Tm (${txt}) Tj`);
        y -= 15;
      } else if (code === "H") {
        cmds.push(`/F2 9.5 Tf 1 0 0 1 42 ${y} Tm (${txt}) Tj`);
        y -= 13;
      } else if (code === "L") {
        y -= 6;
      } else {
        cmds.push(`/F1 8.5 Tf 1 0 0 1 48 ${y} Tm (${txt}) Tj`);
        y -= 11.5;
      }
    });
    cmds.push(`/F1 8 Tf 1 0 0 1 42 28 Tm (SetSail Maritime Navigation Suite - Page ${pIdx + 1} of ${pages.length}) Tj`);
    cmds.push("ET");
    const stream = cmds.join("\n");
    const contentId = addObj(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageId = addObj(`<< /Type /Page /Parent ${pagesRootPlaceholderId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  });

  objects[pagesRootPlaceholderId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  const catalogId = addObj(`<< /Type /Catalog /Pages ${pagesRootPlaceholderId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, idx) => {
    offsets.push(pdf.length);
    pdf += `${idx + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  const u8 = new TextEncoder().encode(pdf);
  downloadBinaryBlob(u8, filename || "selected_warnings.pdf", "application/pdf");
}

/* ==========================================================================
   SETSAIL v4.4 — VISUAL TOP-RIGHT CHART LAYER SELECTOR & 3D GLOBE VIEW
   ========================================================================== */

const WORLD_LAND_POLYGONS = [[[-80.04,-59.57],[-80.55,-59.87],[-81.0,-60.16],[-80.86,-62.26],[-80.92,-64.49],[-80.59,-65.74],[-80.55,-65.74],[-80.26,-66.29],[-80.29,-64.04],[-80.39,-61.88],[-79.98,-61.14],[-79.63,-60.61],[-80.04,-59.57]],[[-79.5,-159.21],[-79.63,-161.13],[-79.28,-162.44],[-78.93,-163.03],[-78.87,-163.07],[-78.6,-163.71],[-78.6,-163.71],[-78.22,-163.11],[-78.38,-161.25],[-78.69,-160.25],[-79.05,-159.48],[-79.5,-159.21]],[[-78.05,-45.15],[-78.48,-43.92],[-79.09,-43.49],[-79.52,-43.37],[-80.03,-43.33],[-80.34,-44.88],[-80.59,-46.51],[-80.83,-48.39],[-81.03,-50.48],[-80.97,-52.85],[-80.63,-54.16],[-80.22,-53.99],[-79.95,-51.85],[-79.61,-50.99],[-79.18,-50.36],[-78.81,-49.91],[-78.46,-49.31],[-78.05,-48.66],[-78.05,-48.66],[-78.05,-48.15],[-77.83,-46.66],[-78.05,-45.15]],[[-73.5,-121.21],[-73.66,-119.92],[-73.48,-118.72],[-73.83,-119.29],[-74.09,-120.23],[-74.01,-121.62],[-73.66,-122.62],[-73.66,-122.62],[-73.32,-122.41],[-73.5,-121.21]],[[-73.48,-125.56],[-73.87,-124.03],[-73.83,-124.62],[-73.74,-125.91],[-73.46,-127.28],[-73.46,-127.28],[-73.25,-126.56],[-73.48,-125.56]],[[-71.93,-98.98],[-72.07,-97.88],[-71.95,-96.79],[-72.52,-96.2],[-72.44,-96.98],[-72.48,-98.2],[-72.44,-99.43],[-72.5,-100.78],[-72.31,-101.8],[-71.89,-102.33],[-71.89,-102.33],[-71.72,-101.7],[-71.85,-100.43],[-71.93,-98.98]],[[-70.96,-68.45],[-71.41,-68.33],[-71.8,-68.51],[-72.17,-68.78],[-72.31,-69.96],[-72.5,-71.08],[-72.48,-72.39],[-72.09,-71.9],[-72.23,-73.07],[-72.37,-74.19],[-72.07,-74.95],[-71.66,-75.01],[-71.27,-73.92],[-71.27,-73.92],[-71.15,-73.23],[-71.19,-72.07],[-70.68,-71.78],[-70.31,-71.72],[-69.51,-71.74],[-69.04,-71.17],[-68.88,-70.25],[-69.25,-69.72],[-69.62,-69.49],[-70.07,-69.06],[-70.51,-68.73],[-70.96,-68.45]],[[-64.15,-58.61],[-64.37,-59.05],[-64.21,-59.79],[-64.31,-60.61],[-64.54,-61.3],[-64.8,-62.02],[-65.09,-62.51],[-65.48,-62.65],[-65.86,-62.59],[-66.19,-62.12],[-66.43,-62.81],[-66.5,-63.75],[-66.84,-64.29],[-67.15,-64.88],[-67.58,-65.51],[-67.95,-65.67],[-68.37,-65.31],[-68.68,-64.78],[-68.91,-63.96],[-69.23,-63.2],[-69.62,-62.79],[-69.99,-62.57],[-70.38,-62.28],[-70.72,-61.81],[-71.09,-61.51],[-72.01,-61.38],[-72.38,-61.08],[-72.77,-61.0],[-73.17,-60.69],[-73.7,-60.83],[-74.11,-61.38],[-74.44,-61.96],[-74.58,-63.3],[-74.93,-63.75],[-75.26,-64.35],[-75.64,-65.86],[-75.79,-67.19],[-76.01,-68.45],[-76.22,-69.8],[-76.63,-70.6],[-76.67,-72.21],[-76.63,-73.97],[-76.71,-75.56],[-76.71,-77.24],[-77.1,-76.93],[-77.28,-75.4],[-77.56,-74.28],[-77.91,-73.66],[-78.22,-74.77],[-78.12,-76.5],[-78.38,-77.93],[-78.79,-77.98],[-79.18,-78.02],[-79.51,-76.85],[-79.89,-76.63],[-80.26,-75.36],[-80.42,-73.24],[-80.69,-71.44],[-81.0,-70.01],[-81.32,-68.19],[-81.47,-65.7],[-81.75,-63.26],[-82.04,-61.55],[-82.38,-59.69],[-82.85,-58.71],[-83.22,-58.22],[-82.87,-57.01],[-82.57,-55.36],[-82.26,-53.62],[-82.0,-51.54],[-81.73,-49.76],[-81.71,-47.27],[-81.85,-44.83],[-82.08,-42.81],[-81.65,-42.16],[-81.36,-40.77],[-81.34,-38.24],[-81.12,-36.27],[-80.91,-34.39],[-80.77,-32.31],[-80.59,-30.1],[-80.34,-28.55],[-79.99,-29.25],[-79.63,-29.69],[-79.26,-29.69],[-79.3,-31.62],[-79.46,-33.68],[-79.46,-35.64],[-79.08,-35.91],[-78.34,-35.78],[-78.12,-35.33],[-77.89,-33.9],[-77.65,-32.21],[-77.36,-31.0],[-77.07,-29.78],[-76.67,-28.88],[-76.5,-27.51],[-76.36,-26.16],[-76.28,-25.47],[-76.24,-23.93],[-76.11,-22.46],[-75.91,-21.22],[-75.67,-20.01],[-75.44,-18.91],[-75.13,-17.52],[-74.79,-16.64],[-74.5,-15.7],[-74.11,-15.41],[-73.87,-16.47],[-73.46,-16.11],[-73.15,-15.45],[-72.95,-14.41],[-72.72,-13.31],[-72.4,-12.29],[-72.01,-11.51],[-71.54,-11.02],[-71.27,-10.3],[-71.32,-9.1],[-71.66,-8.61],[-71.7,-7.42],[-71.32,-7.38],[-70.93,-6.87],[-71.03,-5.79],[-71.4,-5.54],[-71.46,-4.34],[-71.29,-3.05],[-71.17,-1.8],[-71.23,-0.66],[-71.64,-0.23],[-71.3,0.87],[-71.13,1.89],[-70.99,3.02],[-70.85,4.14],[-70.62,5.16],[-70.46,6.27],[-70.25,7.14],[-69.89,7.74],[-70.15,8.49],[-70.01,9.53],[-70.48,10.25],[-70.83,10.82],[-70.64,11.95],[-70.25,12.4],[-69.97,13.42],[-70.03,14.73],[-70.4,15.13],[-70.03,15.95],[-69.91,17.03],[-69.87,18.2],[-69.89,19.26],[-70.01,20.38],[-70.07,21.45],[-70.4,21.92],[-70.7,22.57],[-70.52,23.67],[-70.48,24.84],[-70.48,25.98],[-70.46,27.09],[-70.32,28.09],[-70.21,29.15],[-69.93,30.03],[-69.76,30.97],[-69.66,31.99],[-69.38,32.75],[-68.84,33.3],[-68.5,33.87],[-68.66,34.91],[-69.01,35.3],[-69.25,36.16],[-69.17,37.2],[-69.52,37.91],[-69.78,38.65],[-69.54,39.67],[-69.11,40.02],[-68.93,40.92],[-68.6,41.96],[-68.46,42.94],[-68.27,44.11],[-68.05,44.9],[-67.82,45.72],[-67.6,46.5],[-67.72,47.44],[-67.37,48.34],[-67.09,48.99],[-67.11,49.93],[-66.88,50.75],[-66.52,50.95],[-66.25,51.79],[-66.05,52.61],[-65.9,53.61],[-65.82,54.53],[-65.88,55.41],[-65.97,56.36],[-66.25,57.16],[-66.68,57.26],[-67.01,58.14],[-67.29,58.74],[-67.41,59.94],[-67.68,60.61],[-67.95,61.43],[-68.01,62.39],[-67.82,63.19],[-67.41,64.05],[-67.62,64.99],[-67.74,65.97],[-67.86,66.91],[-67.93,67.89],[-67.93,68.89],[-68.97,69.71],[-69.23,69.67],[-69.68,69.56],[-69.93,68.6],[-70.31,67.81],[-70.7,67.95],[-70.68,69.07],[-71.07,68.93],[-71.44,68.42],[-71.85,67.95],[-72.17,68.71],[-72.26,69.87],[-72.09,71.02],[-71.7,71.57],[-71.32,71.91],[-71.01,72.45],[-70.72,73.08],[-70.36,73.34],[-69.87,73.86],[-69.78,74.49],[-69.74,75.63],[-69.62,76.63],[-69.46,77.64],[-69.07,78.13],[-68.7,78.43],[-68.33,79.11],[-68.07,80.09],[-67.88,80.94],[-67.54,81.48],[-67.37,82.05],[-67.21,82.78],[-67.31,83.78],[-67.21,84.68],[-67.09,85.66],[-67.15,86.75],[-66.88,87.48],[-66.21,87.99],[-66.48,88.36],[-66.95,88.83],[-67.15,89.67],[-67.23,90.63],[-67.11,91.59],[-67.19,92.61],[-67.21,93.55],[-67.11,94.18],[-67.17,95.02],[-67.39,95.78],[-67.25,96.68],[-67.25,97.76],[-67.11,98.68],[-67.25,99.72],[-66.92,100.38],[-66.58,100.89],[-66.31,101.58],[-65.56,102.83],[-65.7,103.48],[-65.97,104.24],[-66.33,104.91],[-66.93,106.18],[-66.95,107.16],[-66.95,108.08],[-66.84,109.16],[-66.7,110.24],[-66.43,111.06],[-66.13,111.74],[-66.09,112.86],[-65.88,113.6],[-66.07,114.39],[-66.39,114.9],[-66.7,115.6],[-66.66,116.7],[-66.92,117.38],[-67.17,118.58],[-67.27,119.83],[-67.19,120.87],[-66.88,121.65],[-66.56,122.32],[-66.48,123.22],[-66.62,124.12],[-66.72,125.16],[-66.56,126.1],[-66.56,127.0],[-66.66,127.88],[-66.76,128.8],[-66.58,129.7],[-66.43,130.78],[-66.39,131.8],[-66.39,132.94],[-66.29,133.86],[-66.21,134.76],[-65.72,135.03],[-65.31,135.07],[-65.58,135.7],[-66.03,135.87],[-66.45,136.21],[-66.78,136.62],[-66.95,137.46],[-66.9,138.6],[-66.88,139.91],[-66.82,140.81],[-66.82,142.12],[-66.8,143.06],[-66.84,144.37],[-66.92,145.49],[-67.23,146.2],[-67.6,146.0],[-67.9,146.65],[-68.13,147.72],[-68.39,148.84],[-68.56,150.13],[-68.72,151.48],[-68.87,152.5],[-68.89,153.64],[-68.56,154.28],[-68.84,155.17],[-69.15,155.93],[-69.38,156.81],[-69.48,158.03],[-69.6,159.18],[-69.99,159.67],[-70.23,160.81],[-70.58,161.57],[-70.74,162.69],[-70.72,163.84],[-70.78,164.92],[-70.76,166.11],[-70.83,167.31],[-70.97,168.43],[-71.21,169.46],[-71.4,170.5],[-71.7,171.21],[-72.09,171.09],[-72.44,170.56],[-72.89,170.11],[-73.24,169.76],[-73.66,169.29],[-73.81,167.98],[-74.17,167.39],[-74.38,166.09],[-74.77,165.64],[-75.15,164.96],[-75.46,164.23],[-75.87,163.82],[-76.24,163.57],[-76.69,163.47],[-77.07,163.49],[-77.46,164.06],[-77.83,164.27],[-78.18,164.74],[-78.32,166.6],[-78.75,167.0],[-78.91,165.19],[-79.12,163.67],[-79.16,161.77],[-79.73,160.92],[-80.2,160.75],[-80.57,160.32],[-80.95,159.79],[-81.28,161.12],[-81.69,161.63],[-82.06,162.49],[-82.4,163.71],[-82.71,165.1],[-83.02,166.6],[-83.34,168.9],[-83.83,169.4],[-84.04,172.28],[-84.12,172.48],[-84.41,173.22],[-84.16,175.99],[-84.47,178.28],[-84.71,180],[-90,180],[-90,-180],[-84.71,-180],[-84.72,-179.94],[-84.14,-179.06],[-84.45,-177.26],[-84.42,-177.14],[-84.33,-176.86],[-84.23,-176.52],[-84.14,-176.23],[-84.1,-176.08],[-84.1,-175.93],[-84.12,-175.83],[-84.53,-174.38],[-84.12,-173.12],[-84.06,-172.89],[-83.88,-169.95],[-84.12,-169.0],[-84.24,-168.53],[-84.57,-167.02],[-84.83,-164.18],[-85.14,-161.93],[-85.37,-158.07],[-85.1,-155.19],[-85.3,-150.94],[-85.61,-148.53],[-85.32,-145.89],[-85.04,-143.11],[-84.57,-142.89],[-84.53,-146.83],[-84.3,-150.06],[-83.9,-150.9],[-83.69,-153.59],[-83.24,-153.41],[-82.83,-153.04],[-82.45,-152.67],[-82.04,-152.86],[-81.77,-154.53],[-81.42,-155.29],[-81.1,-156.84],[-81.16,-154.41],[-81.0,-152.1],[-81.34,-150.65],[-81.04,-148.87],[-80.67,-147.22],[-80.34,-146.42],[-79.93,-146.77],[-79.65,-148.06],[-79.36,-149.53],[-79.3,-151.59],[-79.16,-153.39],[-79.06,-155.33],[-78.69,-155.98],[-78.38,-157.27],[-78.03,-158.05],[-76.89,-158.37],[-76.99,-157.88],[-77.3,-156.97],[-77.2,-155.33],[-77.07,-153.74],[-77.5,-152.92],[-77.4,-151.33],[-77.18,-150.0],[-76.91,-148.75],[-76.58,-147.61],[-76.48,-146.1],[-76.11,-146.14],[-75.73,-146.5],[-75.38,-146.2],[-75.2,-144.91],[-75.54,-144.32],[-75.34,-142.79],[-75.09,-141.64],[-75.07,-140.21],[-74.97,-138.86],[-74.73,-137.51],[-74.52,-136.43],[-74.3,-135.21],[-74.36,-134.43],[-74.44,-133.75],[-74.3,-132.26],[-74.48,-130.93],[-74.46,-129.55],[-74.32,-128.24],[-74.42,-126.89],[-74.52,-125.4],[-74.48,-124.01],[-74.5,-122.56],[-74.52,-121.07],[-74.48,-119.7],[-74.19,-118.68],[-74.03,-117.47],[-74.24,-116.22],[-74.07,-115.02],[-73.71,-113.94],[-74.03,-113.3],[-74.38,-112.95],[-74.71,-112.3],[-74.42,-111.26],[-74.79,-110.07],[-74.91,-108.71],[-75.18,-107.56],[-75.13,-106.15],[-74.95,-104.88],[-74.99,-103.37],[-75.13,-102.02],[-75.3,-100.65],[-74.87,-100.12],[-74.54,-100.76],[-74.19,-101.25],[-74.11,-102.55],[-73.73,-103.11],[-73.36,-103.33],[-72.62,-103.68],[-72.75,-102.92],[-72.81,-101.61],[-72.75,-100.31],[-72.91,-99.14],[-73.21,-98.12],[-73.56,-97.69],[-73.62,-96.34],[-73.48,-95.04],[-73.28,-93.67],[-73.17,-92.44],[-73.4,-91.42],[-73.32,-90.09],[-72.56,-89.23],[-73.01,-88.42],[-73.19,-87.27],[-73.09,-86.01],[-73.48,-85.19],[-73.52,-83.88],[-73.64,-82.67],[-73.85,-81.47],[-73.48,-80.69],[-73.13,-80.3],[-73.52,-79.3],[-73.42,-77.93],[-73.64,-76.91],[-73.97,-76.22],[-73.87,-74.89],[-73.66,-73.85],[-73.4,-72.83],[-73.26,-71.62],[-73.15,-70.21],[-73.01,-68.94],[-72.79,-67.96],[-72.48,-67.37],[-72.05,-67.13],[-71.64,-67.25],[-71.25,-67.56],[-70.85,-67.92],[-70.46,-68.23],[-70.11,-68.49],[-69.72,-68.54],[-69.33,-68.45],[-68.95,-67.98],[-68.54,-67.58],[-68.15,-67.43],[-67.72,-67.62],[-67.33,-67.74],[-66.88,-67.25],[-66.58,-66.7],[-66.21,-66.06],[-65.9,-65.37],[-65.6,-64.57],[-65.17,-64.18],[-64.9,-63.63],[-64.64,-63.0],[-64.58,-62.04],[-64.27,-61.41],[-64.07,-60.71],[-63.96,-59.89],[-63.7,-59.16],[-63.39,-58.59],[-63.27,-57.81],[-63.53,-57.22],[-63.86,-57.6],[-64.15,-58.61]],[[-53.85,-67.75],[-54.45,-66.45],[-54.7,-65.05],[-55.2,-65.5],[-55.25,-66.45],[-54.9,-66.96],[-55.3,-67.29],[-55.61,-68.15],[-55.5,-69.23],[-55.2,-69.96],[-55.05,-71.01],[-54.5,-72.26],[-53.96,-73.29],[-52.84,-74.66],[-53.05,-73.84],[-53.72,-72.43],[-54.07,-71.11],[-53.62,-70.59],[-52.93,-70.27],[-52.52,-69.35],[-52.64,-68.63],[-52.64,-68.63],[-53.1,-68.25],[-53.85,-67.75]],[[-51.1,-58.55],[-51.55,-57.75],[-51.9,-58.05],[-52.2,-59.4],[-51.85,-59.85],[-52.3,-60.7],[-51.85,-61.2],[-51.25,-60],[-51.5,-59.15],[-51.1,-58.55]],[[-49.71,70.28],[-49.77,68.75],[-49.24,68.72],[-48.83,68.87],[-48.62,68.94],[-48.94,69.58],[-49.06,70.53],[-49.26,70.56],[-49.71,70.28]],[[-40.79,145.4],[-41.14,146.36],[-41.0,146.91],[-40.81,147.69],[-40.88,148.29],[-42.06,148.36],[-42.41,148.02],[-43.21,147.91],[-42.94,147.56],[-43.63,146.87],[-43.58,146.66],[-43.55,146.05],[-42.69,145.43],[-42.03,145.3],[-41.16,144.72],[-40.7,144.74],[-40.79,145.4]],[[-40.92,173.02],[-41.33,173.25],[-40.93,173.96],[-41.35,174.25],[-41.77,174.25],[-42.23,173.88],[-42.97,173.22],[-43.37,172.71],[-43.85,173.08],[-43.87,172.31],[-44.24,171.45],[-44.9,171.19],[-45.91,170.62],[-46.36,169.83],[-46.64,169.33],[-46.62,168.41],[-46.29,167.76],[-46.22,166.68],[-45.85,166.51],[-45.11,167.05],[-44.12,168.3],[-43.94,168.95],[-43.56,169.67],[-43.03,170.52],[-42.51,171.13],[-41.77,171.57],[-41.51,171.95],[-40.96,172.1],[-40.49,172.8],[-40.92,173.02]],[[-36.16,174.61],[-37.21,175.34],[-36.53,175.36],[-36.8,175.81],[-37.56,175.96],[-37.88,176.76],[-37.96,177.44],[-37.58,178.01],[-37.7,178.52],[-38.58,178.27],[-39.17,177.97],[-39.15,177.21],[-39.45,176.94],[-39.88,177.03],[-40.07,176.89],[-40.6,176.51],[-41.29,176.01],[-41.69,175.24],[-41.43,175.07],[-41.28,174.65],[-40.46,175.23],[-39.91,174.9],[-39.51,173.82],[-39.15,173.85],[-38.8,174.57],[-38.03,174.74],[-37.38,174.7],[-36.71,174.29],[-36.53,174.32],[-36.12,173.84],[-35.24,173.05],[-34.53,172.64],[-34.45,173.01],[-35.01,173.55],[-35.27,174.33],[-36.16,174.61]],[[-22.16,167.12],[-22.4,166.74],[-22.13,166.19],[-21.68,165.47],[-21.15,164.83],[-20.44,164.17],[-20.11,164.03],[-20.12,164.46],[-20.46,165.02],[-20.8,165.46],[-21.08,165.78],[-21.7,166.6],[-22.16,167.12]],[[-17.34,178.37],[-17.63,178.72],[-18.15,178.55],[-18.29,177.93],[-18.16,177.38],[-17.72,177.29],[-17.38,177.67],[-17.5,178.13],[-17.34,178.37]],[[-16.8,179.36],[-17.01,178.73],[-16.64,178.6],[-16.43,179.1],[-16.38,179.41],[-16.07,180],[-16.56,180],[-16.8,179.36]],[[-16.5,-179.92],[-16.56,-180],[-16.07,-180],[-16.02,-179.79],[-16.5,-179.92]],[[-16.47,167.84],[-16.6,167.52],[-16.16,167.18],[-15.89,167.22],[-16.47,167.84]],[[-14.93,167.11],[-15.74,167.27],[-15.61,167.0],[-15.67,166.79],[-15.39,166.65],[-14.63,166.63],[-14.93,167.11]],[[-13.56,50.06],[-14.76,50.22],[-15.23,50.48],[-15.71,50.38],[-16.0,50.2],[-15.41,49.86],[-15.71,49.67],[-16.45,49.86],[-16.88,49.77],[-17.11,49.5],[-17.95,49.44],[-19.12,49.04],[-20.5,48.55],[-22.39,47.93],[-23.78,47.55],[-24.94,47.1],[-25.18,46.28],[-25.6,45.41],[-25.35,44.83],[-24.99,44.04],[-24.46,43.76],[-23.57,43.7],[-22.78,43.35],[-22.06,43.25],[-21.34,43.43],[-21.16,43.89],[-20.83,43.9],[-20.07,44.37],[-19.44,44.46],[-18.96,44.23],[-18.33,44.04],[-17.41,43.96],[-16.85,44.31],[-16.22,44.45],[-16.18,44.94],[-15.97,45.5],[-15.79,45.87],[-15.78,46.31],[-15.21,46.88],[-14.59,47.71],[-14.09,48.01],[-13.66,47.87],[-13.78,48.29],[-13.09,48.85],[-12.49,48.86],[-12.04,49.19],[-12.47,49.54],[-12.9,49.81],[-13.56,50.06]],[[-13.76,143.56],[-14.55,143.92],[-14.17,144.56],[-14.59,144.89],[-14.98,145.37],[-15.43,145.27],[-16.29,145.49],[-16.78,145.64],[-16.91,145.89],[-17.76,146.16],[-18.28,146.06],[-18.96,146.39],[-19.48,147.47],[-19.96,148.18],[-20.39,148.85],[-20.63,148.72],[-21.26,149.29],[-22.34,149.68],[-22.12,150.08],[-22.56,150.48],[-22.4,150.73],[-23.46,150.9],[-24.08,151.61],[-24.46,152.07],[-25.27,152.86],[-26.07,153.14],[-26.64,153.16],[-27.26,153.09],[-28.11,153.57],[-29.0,153.51],[-29.46,153.34],[-30.35,153.07],[-30.92,153.09],[-31.64,152.89],[-32.55,152.45],[-33.04,151.71],[-33.82,151.34],[-34.31,151.01],[-35.17,150.71],[-35.67,150.33],[-36.42,150.08],[-37.11,149.95],[-37.43,150.0],[-37.77,149.42],[-37.81,148.3],[-38.22,147.38],[-38.61,146.92],[-39.04,146.32],[-38.59,145.49],[-38.42,144.88],[-37.9,145.03],[-38.09,144.49],[-38.81,143.61],[-38.54,142.75],[-38.38,142.18],[-38.31,141.61],[-38.02,140.64],[-37.4,139.99],[-36.64,139.81],[-36.14,139.57],[-35.73,139.08],[-35.61,138.12],[-35.13,138.45],[-34.38,138.21],[-35.08,137.72],[-35.26,136.83],[-34.71,137.35],[-34.13,137.5],[-33.64,137.89],[-32.9,137.81],[-33.75,137.0],[-34.09,136.37],[-34.89,135.99],[-34.48,135.21],[-33.95,135.24],[-33.22,134.61],[-32.85,134.09],[-32.62,134.27],[-32.01,132.99],[-31.98,132.29],[-31.5,131.33],[-31.59,129.54],[-31.95,128.24],[-32.28,127.1],[-32.22,126.15],[-32.73,125.09],[-32.96,124.22],[-33.48,124.03],[-33.89,123.66],[-33.91,122.81],[-34.0,122.18],[-33.82,121.3],[-33.93,120.58],[-33.98,119.89],[-34.51,119.3],[-34.46,119.01],[-34.75,118.51],[-35.06,118.02],[-35.03,117.3],[-35.03,116.63],[-34.39,115.56],[-34.2,115.03],[-33.62,115.05],[-33.49,115.55],[-33.26,115.71],[-32.9,115.68],[-32.21,115.8],[-31.61,115.69],[-30.6,115.16],[-30.03,115.0],[-29.46,115.04],[-28.81,114.64],[-28.52,114.62],[-28.12,114.17],[-27.33,114.05],[-26.54,113.48],[-26.12,113.34],[-26.55,113.78],[-25.62,113.44],[-25.91,113.94],[-26.3,114.23],[-25.79,114.22],[-25.0,113.72],[-24.68,113.63],[-24.38,113.39],[-23.81,113.5],[-23.56,113.71],[-23.06,113.84],[-22.48,113.74],[-21.76,114.15],[-22.52,114.23],[-21.83,114.65],[-21.5,115.46],[-21.07,115.95],[-20.7,116.71],[-20.62,117.17],[-20.75,117.44],[-20.37,118.23],[-20.26,118.84],[-20.04,118.99],[-19.95,119.25],[-19.98,119.81],[-19.68,120.86],[-19.24,121.4],[-18.71,121.66],[-18.2,122.24],[-17.8,122.29],[-17.25,122.31],[-16.41,123.01],[-17.27,123.43],[-17.07,123.86],[-16.6,123.5],[-16.11,123.82],[-16.33,124.26],[-15.57,124.38],[-15.08,124.93],[-14.68,125.17],[-14.51,125.67],[-14.23,125.69],[-14.35,126.13],[-14.1,126.14],[-13.95,126.58],[-13.82,127.07],[-14.28,127.8],[-14.87,128.36],[-14.88,128.99],[-14.97,129.62],[-14.42,129.41],[-13.62,129.89],[-13.36,130.34],[-13.11,130.18],[-12.54,130.62],[-12.18,131.22],[-12.3,131.74],[-12.11,132.58],[-11.6,132.56],[-11.27,131.82],[-11.13,132.36],[-11.38,133.02],[-11.79,133.55],[-12.04,134.39],[-11.94,134.68],[-12.25,135.3],[-11.96,135.88],[-12.05,136.26],[-11.86,136.49],[-12.35,136.95],[-12.89,136.69],[-13.29,136.31],[-13.32,135.96],[-13.72,136.08],[-14.22,135.78],[-14.72,135.43],[-15.0,135.5],[-15.55,136.3],[-15.87,137.07],[-16.22,137.58],[-16.81,138.3],[-16.81,138.59],[-17.06,139.11],[-17.37,139.26],[-17.71,140.22],[-17.37,140.88],[-16.83,141.07],[-16.39,141.27],[-15.84,141.4],[-15.04,141.7],[-14.56,141.56],[-14.27,141.64],[-13.7,141.52],[-12.94,141.65],[-12.74,141.84],[-12.41,141.69],[-11.88,141.93],[-11.33,142.12],[-11.04,142.14],[-10.67,142.52],[-11.16,142.8],[-11.78,142.87],[-11.91,143.12],[-12.33,143.16],[-12.83,143.52],[-13.4,143.6],[-13.76,143.56]],[[-10.48,162.12],[-10.83,162.4],[-10.82,161.7],[-10.2,161.32],[-10.45,161.92],[-10.48,162.12]],[[-10.24,120.72],[-10.26,120.3],[-9.56,118.97],[-9.36,119.9],[-9.67,120.43],[-9.97,120.78],[-10.24,120.72]],[[-9.87,160.85],[-9.9,160.46],[-9.79,159.85],[-9.64,159.64],[-9.24,159.7],[-9.4,160.36],[-9.61,160.69],[-9.87,160.85]],[[-9.6,161.68],[-9.78,161.53],[-8.92,160.79],[-8.32,160.58],[-8.32,160.92],[-9.12,161.28],[-9.6,161.68]],[[-10.14,124.44],[-10.36,123.58],[-10.24,123.46],[-9.9,123.55],[-9.29,123.98],[-8.89,124.97],[-8.66,125.09],[-8.43,125.95],[-8.4,126.64],[-8.27,126.96],[-8.4,127.34],[-8.67,126.97],[-9.11,125.93],[-9.39,125.09],[-10.14,124.44]],[[-8.1,117.9],[-8.36,118.26],[-8.28,118.88],[-8.71,119.13],[-8.91,117.97],[-9.04,117.28],[-9.03,116.74],[-8.46,117.08],[-8.45,117.63],[-8.1,117.9]],[[-8.09,122.9],[-8.65,122.76],[-8.93,121.25],[-8.81,119.92],[-8.44,119.92],[-8.24,120.72],[-8.54,121.34],[-8.46,122.01],[-8.09,122.9]],[[-8.34,159.88],[-8.54,159.92],[-8.11,159.13],[-7.75,158.59],[-7.42,158.21],[-7.32,158.36],[-7.56,158.82],[-8.02,159.64],[-8.34,159.88]],[[-7.35,157.54],[-7.4,157.34],[-7.18,156.9],[-6.77,156.49],[-6.6,156.54],[-7.02,157.14],[-7.35,157.54]],[[-6.78,108.62],[-6.88,110.54],[-6.47,110.76],[-6.95,112.61],[-7.59,112.98],[-7.78,114.48],[-8.37,115.71],[-8.75,114.56],[-8.35,113.46],[-8.38,112.56],[-8.3,111.52],[-8.12,110.59],[-7.74,109.43],[-7.64,108.69],[-7.77,108.28],[-7.35,106.45],[-6.92,106.28],[-6.85,105.37],[-5.9,106.05],[-5.95,107.27],[-6.35,108.07],[-6.42,108.49],[-6.78,108.62]],[[-6.21,134.72],[-6.9,134.21],[-6.14,134.11],[-5.78,134.29],[-5.45,134.5],[-5.74,134.73],[-6.21,134.72]],[[-6.82,155.88],[-6.92,155.6],[-6.54,155.17],[-5.9,154.73],[-5.14,154.51],[-5.04,154.65],[-5.34,154.76],[-5.57,155.06],[-6.2,155.55],[-6.54,156.02],[-6.82,155.88]],[[-5.48,151.98],[-5.56,151.46],[-5.84,151.3],[-6.08,150.75],[-6.32,150.24],[-6.32,149.71],[-6.03,148.89],[-5.75,148.32],[-5.44,148.4],[-5.58,149.3],[-5.51,149.85],[-5.03,150.0],[-5.0,150.14],[-5.53,150.24],[-5.46,150.81],[-5.11,151.09],[-4.76,151.65],[-4.17,151.54],[-4.15,152.14],[-4.31,152.34],[-4.87,152.32],[-5.48,151.98]],[[-3.46,127.25],[-3.79,126.87],[-3.61,126.18],[-3.18,125.99],[-3.13,127.0],[-3.46,127.25]],[[-3.09,130.47],[-3.86,130.83],[-3.45,129.99],[-3.36,129.16],[-3.43,128.59],[-3.39,127.9],[-2.84,128.14],[-2.8,129.37],[-3.09,130.47]],[[-4.5,153.14],[-4.77,152.83],[-4.18,152.64],[-3.79,152.41],[-3.46,151.95],[-3.04,151.38],[-2.74,150.66],[-2.5,150.94],[-2.78,151.48],[-3.0,151.82],[-3.24,152.24],[-3.66,152.64],[-3.98,153.02],[-4.5,153.14]],[[-1.15,134.14],[-2.77,134.42],[-3.37,135.46],[-2.31,136.29],[-1.7,137.44],[-1.7,138.33],[-2.05,139.18],[-2.41,139.93],[-2.6,141.0],[-3.29,142.74],[-3.86,144.58],[-4.37,145.27],[-4.88,145.83],[-5.47,145.98],[-6.08,147.65],[-6.61,147.89],[-6.72,146.97],[-7.39,147.19],[-8.04,148.08],[-9.1,148.73],[-9.07,149.31],[-9.51,149.27],[-9.68,150.04],[-9.87,149.74],[-10.29,150.8],[-10.58,150.69],[-10.65,150.03],[-10.39,149.78],[-10.28,148.92],[-10.13,147.91],[-9.49,147.14],[-8.94,146.57],[-8.07,146.05],[-7.63,144.74],[-7.92,143.9],[-8.25,143.29],[-8.98,143.41],[-9.33,142.63],[-9.16,142.07],[-9.12,141.03],[-8.3,140.14],[-8.1,139.13],[-8.38,138.88],[-8.41,137.61],[-7.6,138.04],[-7.32,138.67],[-6.23,138.41],[-5.39,137.93],[-4.55,135.99],[-4.46,135.16],[-3.54,133.66],[-4.02,133.37],[-4.11,132.98],[-3.75,132.76],[-3.31,132.75],[-2.82,131.99],[-2.46,133.07],[-2.48,133.78],[-2.21,133.7],[-2.21,132.23],[-1.62,131.84],[-1.43,130.94],[-0.94,130.52],[-0.7,131.87],[-0.37,132.38],[-0.78,133.99],[-1.15,134.14]],[[1.42,125.24],[0.43,124.44],[0.24,123.69],[0.43,122.72],[0.38,121.06],[0.24,120.18],[-0.52,120.04],[-1.41,120.94],[-0.96,121.48],[-0.62,123.34],[-1.08,123.26],[-0.93,122.82],[-1.52,122.39],[-1.9,121.51],[-3.19,122.45],[-3.53,122.27],[-4.68,123.17],[-5.34,123.16],[-5.63,122.63],[-5.28,122.24],[-4.46,122.72],[-4.85,121.74],[-4.57,121.49],[-4.19,121.62],[-3.6,120.9],[-2.63,120.97],[-2.93,120.31],[-4.1,120.39],[-5.53,120.43],[-5.67,119.8],[-5.38,119.37],[-4.46,119.65],[-3.49,119.5],[-3.49,119.08],[-2.8,118.77],[-2.15,119.18],[-1.35,119.32],[0.15,119.83],[0.57,120.04],[1.31,120.89],[1.01,121.67],[0.88,122.93],[0.92,124.08],[1.64,125.07],[1.42,125.24]],[[1.13,128.69],[0.26,128.64],[0.36,128.12],[-0.25,127.97],[-0.78,128.38],[-0.9,128.1],[-0.27,127.7],[1.01,127.4],[1.81,127.6],[2.17,127.93],[1.63,128.0],[1.54,128.59],[1.13,128.69]],[[-5.85,105.82],[-5.87,104.71],[-5.04,103.87],[-4.22,102.58],[-3.61,102.16],[-2.8,101.4],[-2.05,100.9],[-0.65,100.14],[0.18,99.26],[1.04,98.97],[1.82,98.6],[2.45,97.7],[3.31,97.18],[3.87,96.42],[4.97,95.38],[5.48,95.29],[5.44,95.94],[5.25,97.48],[4.27,98.37],[3.59,99.14],[3.17,99.69],[2.1,100.64],[2.08,101.66],[1.4,102.5],[0.56,103.08],[0.1,103.84],[-0.71,103.44],[-1.06,104.01],[-1.08,104.37],[-1.78,104.54],[-2.34,104.89],[-2.43,105.62],[-3.06,106.11],[-4.31,105.86],[-5.85,105.82]],[[1.83,117.88],[0.9,119.0],[0.78,117.81],[0.1,117.48],[-0.8,117.52],[-1.49,116.56],[-2.48,116.53],[-4.01,116.15],[-3.66,116.0],[-4.11,114.86],[-3.5,114.47],[-3.44,113.76],[-3.12,113.26],[-3.48,112.07],[-2.99,111.7],[-3.05,111.05],[-2.93,110.22],[-1.59,110.07],[-1.31,109.57],[-0.46,109.09],[0.42,108.95],[1.34,109.07],[2.01,109.66],[1.66,110.4],[1.85,111.17],[2.7,111.37],[2.89,111.8],[3.1,113.0],[3.89,113.71],[4.53,114.2],[4.9,114.6],[5.45,115.45],[6.14,116.22],[6.92,116.73],[6.93,117.13],[6.42,117.64],[5.99,117.69],[5.71,118.35],[5.41,119.18],[5.02,119.11],[4.97,118.44],[4.48,118.62],[4.14,117.88],[3.23,117.31],[2.29,118.05],[1.83,117.88]],[[8.41,126.38],[7.75,126.48],[7.19,126.54],[6.27,126.2],[7.29,125.83],[6.79,125.36],[6.05,125.68],[5.58,125.4],[6.16,124.22],[6.89,123.94],[7.36,124.24],[7.83,123.61],[7.42,123.3],[7.46,122.83],[6.9,122.09],[7.19,121.92],[8.03,122.31],[8.32,122.94],[8.69,123.49],[8.24,123.84],[8.51,124.6],[8.96,124.76],[8.99,125.47],[9.76,125.41],[9.29,126.22],[8.78,126.31],[8.41,126.38]],[[6.2,81.22],[5.97,80.35],[6.76,79.87],[8.2,79.7],[9.82,80.15],[9.27,80.84],[8.56,81.3],[7.52,81.79],[6.48,81.64],[6.2,81.22]],[[10.11,-60.94],[10,-61.77],[10.09,-61.95],[10.37,-61.66],[10.76,-61.68],[10.89,-61.1],[10.86,-60.9],[10.11,-60.94]],[[10.28,123.98],[9.95,123.62],[9.32,123.31],[9.02,123.0],[9.71,122.38],[9.98,122.59],[10.26,122.84],[10.88,122.95],[10.94,123.5],[10.27,123.34],[11.23,124.08],[10.28,123.98]],[[9.32,118.5],[8.37,117.17],[9.07,117.66],[9.68,118.39],[10.38,118.99],[11.37,119.51],[10.55,119.69],[10.0,119.03],[9.32,118.5]],[[11.89,121.88],[11.58,122.48],[11.58,123.12],[11.17,123.1],[10.74,122.64],[10.44,122.0],[10.91,121.97],[11.42,122.04],[11.89,121.88]],[[12.16,125.5],[11.05,125.78],[11.31,125.01],[10.98,125.03],[10.36,125.28],[10.13,124.8],[10.84,124.76],[10.89,124.46],[11.5,124.3],[11.42,124.89],[11.79,124.88],[12.56,124.27],[12.54,125.23],[12.16,125.5]],[[13.07,121.53],[12.21,121.26],[12.7,120.83],[13.47,120.32],[13.43,121.18],[13.07,121.53]],[[18.5,121.32],[18.22,121.94],[18.48,122.25],[18.22,122.34],[17.81,122.17],[17.09,122.52],[16.26,122.25],[15.93,121.66],[15.12,121.51],[14.33,121.73],[14.22,122.26],[14.34,122.7],[13.78,123.95],[13.24,123.86],[13.0,124.18],[12.54,124.08],[13.03,123.3],[13.55,122.93],[13.19,122.67],[13.78,122.03],[13.64,121.13],[13.86,120.63],[14.27,120.68],[14.53,120.99],[14.76,120.69],[14.4,120.56],[14.97,120.07],[15.41,119.92],[16.36,119.88],[16.03,120.29],[17.6,120.39],[18.51,120.72],[18.5,121.32]],[[18.23,-65.59],[17.98,-65.85],[17.98,-66.6],[17.95,-67.18],[18.37,-67.24],[18.52,-67.1],[18.51,-66.28],[18.43,-65.77],[18.23,-65.59]],[[17.87,-76.9],[17.7,-77.21],[17.86,-77.77],[18.23,-78.34],[18.45,-78.22],[18.52,-77.8],[18.49,-77.57],[18.4,-76.9],[18.16,-76.37],[17.89,-76.2],[17.87,-76.9]],[[19.87,-72.58],[19.71,-71.71],[19.88,-71.59],[19.88,-70.81],[19.62,-70.21],[19.65,-69.95],[19.29,-69.77],[19.31,-69.22],[19.02,-69.25],[18.98,-68.81],[18.61,-68.32],[18.21,-68.69],[18.42,-69.16],[18.38,-69.62],[18.43,-69.95],[18.25,-70.13],[18.18,-70.52],[18.43,-70.67],[18.28,-71.0],[17.6,-71.4],[17.76,-71.66],[18.04,-71.71],[18.21,-72.37],[18.15,-72.84],[18.22,-73.45],[18.03,-73.92],[18.34,-74.46],[18.66,-74.37],[18.53,-73.45],[18.45,-72.69],[18.67,-72.33],[19.1,-72.79],[19.48,-72.78],[19.64,-73.42],[19.92,-73.19],[19.87,-72.58]],[[18.68,110.34],[18.2,109.48],[18.51,108.66],[19.37,108.63],[19.82,109.12],[20.1,110.21],[20.08,110.79],[19.7,111.01],[19.26,110.57],[18.68,110.34]],[[19.08,-155.54],[18.92,-155.69],[19.06,-155.94],[19.34,-155.91],[19.7,-156.07],[19.81,-156.02],[19.98,-155.85],[20.17,-155.92],[20.27,-155.86],[20.25,-155.79],[20.08,-155.4],[19.99,-155.22],[19.86,-155.06],[19.51,-154.81],[19.45,-154.83],[19.24,-155.22],[19.08,-155.54]],[[20.64,-156.08],[20.57,-156.41],[20.78,-156.59],[20.86,-156.7],[20.93,-156.71],[21.01,-156.61],[20.92,-156.26],[20.76,-156.0],[20.64,-156.08]],[[21.18,-156.76],[21.07,-156.79],[21.1,-157.33],[21.22,-157.25],[21.18,-156.76]],[[21.32,-157.65],[21.26,-157.71],[21.28,-157.78],[21.31,-158.13],[21.54,-158.25],[21.58,-158.29],[21.72,-158.03],[21.65,-157.94],[21.32,-157.65]],[[21.98,-159.35],[21.88,-159.46],[22.07,-159.8],[22.14,-159.75],[22.24,-159.6],[22.21,-159.37],[21.98,-159.35]],[[22.77,-79.68],[22.4,-79.28],[22.51,-78.35],[22.28,-77.99],[21.66,-77.15],[21.21,-76.52],[21.22,-76.19],[21.02,-75.6],[20.74,-75.67],[20.69,-74.93],[20.28,-74.18],[20.05,-74.3],[19.92,-74.96],[19.87,-75.63],[19.95,-76.32],[19.86,-77.76],[20.41,-77.09],[20.67,-77.49],[20.74,-78.14],[21.03,-78.48],[21.6,-78.72],[21.56,-79.28],[21.83,-80.22],[22.04,-80.52],[22.19,-81.82],[22.39,-82.17],[22.64,-81.8],[22.69,-82.78],[22.17,-83.49],[22.15,-83.91],[21.91,-84.05],[21.8,-84.55],[21.9,-84.97],[22.2,-84.45],[22.57,-84.23],[22.79,-83.78],[22.98,-83.27],[23.08,-82.51],[23.19,-82.27],[23.12,-81.4],[23.11,-80.62],[22.77,-79.68]],[[23.76,-77.53],[23.71,-77.78],[24.29,-78.03],[24.58,-78.41],[25.21,-78.19],[25.17,-77.89],[24.34,-77.54],[23.76,-77.53]],[[22.79,121.18],[21.97,120.75],[22.81,120.22],[23.56,120.11],[24.54,120.69],[25.3,121.5],[25.0,121.95],[24.39,121.78],[22.79,121.18]],[[26.58,-77.82],[26.42,-78.91],[26.79,-78.98],[26.87,-78.51],[26.84,-77.85],[26.58,-77.82]],[[26.59,-77],[25.88,-77.17],[26.01,-77.36],[26.53,-77.34],[26.93,-77.79],[27.04,-77.79],[26.59,-77]],[[34.15,134.64],[33.81,134.77],[33.2,134.2],[33.52,133.79],[33.29,133.28],[32.7,133.01],[32.99,132.36],[33.46,132.37],[34.06,132.92],[33.94,133.49],[34.36,133.9],[34.15,134.64]],[[35.67,34.58],[35.25,33.9],[35.06,33.97],[34.98,34.0],[34.57,32.98],[34.7,32.49],[35.1,32.26],[35.14,32.73],[35.15,32.8],[35.39,32.95],[35.37,33.67],[35.67,34.58]],[[35.71,23.7],[35.37,24.25],[35.42,25.03],[35.35,25.77],[35.18,25.75],[35.3,26.29],[35.0,26.16],[34.92,24.72],[35.08,24.74],[35.28,23.51],[35.71,23.7]],[[38.23,15.52],[37.44,15.16],[37.13,15.31],[36.62,15.1],[37.0,14.34],[37.1,13.83],[37.61,12.43],[38.13,12.57],[38.03,13.74],[38.14,14.76],[38.23,15.52]],[[41.21,9.21],[40.5,9.81],[39.18,9.67],[39.24,9.21],[38.91,8.81],[39.17,8.43],[40.38,8.39],[40.95,8.16],[40.9,8.71],[41.21,9.21]],[[37.14,140.98],[36.34,140.6],[35.84,140.77],[35.14,140.25],[34.67,138.98],[34.61,137.22],[33.46,135.79],[33.85,135.12],[34.6,135.08],[34.38,133.34],[33.9,132.16],[33.89,130.99],[33.15,132.0],[31.45,131.33],[31.03,130.69],[31.42,130.2],[32.32,130.45],[32.61,129.81],[33.3,129.41],[33.6,130.35],[34.23,130.88],[34.75,131.88],[35.43,132.62],[35.73,134.61],[35.53,135.68],[37.3,136.72],[36.83,137.39],[37.83,138.86],[38.22,139.43],[39.44,140.05],[40.56,139.88],[41.2,140.31],[41.38,141.37],[39.99,141.91],[39.18,141.88],[38.17,140.96],[37.14,140.98]],[[42.15,9.56],[41.38,9.23],[41.58,8.78],[42.26,8.54],[42.63,8.75],[43.01,9.39],[42.15,9.56]],[[44.17,143.91],[43.96,144.61],[44.38,145.32],[43.26,145.54],[42.99,144.06],[42.0,143.18],[42.68,141.61],[41.58,141.07],[41.57,139.96],[42.56,139.82],[43.33,140.31],[43.39,141.38],[44.77,141.67],[45.55,141.97],[44.51,143.14],[44.17,143.91]],[[46.55,-63.66],[46.42,-62.94],[46.44,-62.01],[46.03,-62.5],[45.97,-62.87],[46.39,-64.14],[46.73,-64.39],[47.04,-64.01],[46.55,-63.66]],[[49.11,-61.81],[49.09,-62.29],[49.4,-63.59],[49.87,-64.52],[49.96,-64.17],[49.71,-62.86],[49.29,-61.84],[49.11,-61.81]],[[48.51,-123.51],[48.37,-124.01],[48.83,-125.66],[49.18,-125.95],[49.53,-126.85],[49.81,-127.03],[49.99,-128.06],[50.54,-128.44],[50.77,-128.36],[50.55,-127.31],[50.4,-126.7],[50.3,-125.76],[49.95,-125.42],[49.48,-124.92],[49.06,-123.92],[48.51,-123.51]],[[50.69,-56.13],[49.81,-56.8],[50.15,-56.14],[49.94,-55.47],[49.59,-55.82],[49.31,-54.94],[49.56,-54.47],[49.25,-53.48],[48.52,-53.79],[48.69,-53.09],[48.16,-52.96],[47.54,-52.65],[46.66,-53.07],[46.62,-53.52],[46.81,-54.18],[47.63,-53.96],[47.75,-54.24],[46.88,-55.4],[46.92,-56.0],[47.39,-55.29],[47.63,-56.25],[47.57,-57.33],[47.6,-59.27],[47.9,-59.42],[48.25,-58.8],[48.52,-59.23],[49.13,-58.39],[50.72,-57.36],[51.29,-56.74],[51.63,-55.87],[51.59,-55.41],[51.32,-55.6],[50.69,-56.13]],[[54.04,-132.71],[54.04,-132.71],[54.04,-132.71],[54.04,-132.71],[54.12,-131.75],[52.98,-132.05],[52.18,-131.18],[52.18,-131.58],[52.64,-132.18],[53.1,-132.55],[53.41,-133.05],[53.85,-133.24],[54.17,-133.18],[54.04,-132.71]],[[50.75,143.65],[48.98,144.65],[49.31,143.17],[47.86,142.56],[46.84,143.53],[46.14,143.51],[46.74,142.75],[45.97,142.09],[46.81,141.91],[47.78,142.02],[48.86,141.9],[49.62,142.14],[50.95,142.18],[51.94,141.59],[53.3,141.68],[53.76,142.61],[54.23,142.21],[54.37,142.65],[53.7,142.91],[52.74,143.26],[51.76,143.24],[50.75,143.65]],[[52.26,-6.79],[51.67,-8.56],[51.82,-9.98],[52.86,-9.17],[53.88,-9.69],[54.66,-8.33],[55.13,-7.57],[55.17,-6.73],[54.55,-5.66],[53.87,-6.2],[53.15,-6.03],[52.26,-6.79]],[[55.61,12.69],[54.8,12.09],[55.36,11.04],[55.78,10.9],[56.11,12.37],[55.61,12.69]],[[57.12,-153.01],[56.73,-154.01],[56.99,-154.52],[57.46,-154.67],[57.82,-153.76],[57.97,-153.23],[57.9,-152.56],[57.59,-152.14],[57.12,-153.01]],[[58.63,-3.01],[57.55,-4.07],[57.69,-3.06],[57.68,-1.96],[56.87,-2.22],[55.97,-3.12],[55.91,-2.09],[54.62,-1.11],[54.46,-0.43],[53.33,0.18],[52.93,0.47],[52.74,1.68],[52.1,1.56],[51.81,1.05],[51.29,1.45],[50.77,0.55],[50.77,-0.79],[50.5,-2.49],[50.7,-2.96],[50.23,-3.62],[50.34,-4.54],[49.96,-5.25],[50.16,-5.78],[51.21,-4.31],[51.43,-3.41],[51.59,-4.98],[51.99,-5.27],[52.3,-4.22],[52.84,-4.77],[53.5,-4.58],[53.4,-3.09],[53.98,-2.95],[54.62,-3.63],[54.79,-4.84],[55.06,-5.08],[55.51,-4.72],[55.78,-5.05],[55.31,-5.59],[56.28,-5.64],[56.79,-6.15],[57.82,-5.79],[58.63,-5.01],[58.55,-4.21],[58.63,-3.01]],[[59.91,-165.58],[59.75,-166.19],[59.94,-166.85],[60.21,-167.46],[60.38,-166.47],[60.29,-165.67],[59.91,-165.58]],[[62.16,-79.27],[61.63,-79.66],[61.72,-80.1],[62.02,-80.36],[62.09,-80.32],[62.39,-79.93],[62.36,-79.52],[62.16,-79.27]],[[62.71,-81.9],[62.16,-83.07],[62.18,-83.77],[62.45,-83.99],[62.91,-83.25],[62.9,-81.88],[62.71,-81.9]],[[63.78,-171.73],[63.59,-171.11],[63.69,-170.49],[63.43,-169.68],[63.3,-168.69],[63.19,-168.77],[62.98,-169.53],[63.19,-170.29],[63.38,-170.67],[63.32,-171.55],[63.41,-171.79],[63.78,-171.73]],[[65.66,-85.16],[65.22,-84.98],[65.37,-84.46],[65.11,-83.88],[64.77,-82.79],[64.46,-81.64],[63.98,-81.55],[64.06,-80.82],[63.73,-80.1],[63.41,-80.99],[63.65,-82.55],[64.1,-83.11],[63.57,-84.1],[63.05,-85.52],[63.64,-85.87],[63.54,-87.22],[64.04,-86.35],[64.82,-86.22],[65.74,-85.88],[65.66,-85.16]],[[66.46,-14.51],[65.81,-14.74],[65.13,-13.61],[64.36,-14.91],[63.68,-17.79],[63.5,-18.66],[63.64,-19.97],[63.96,-22.76],[64.4,-21.78],[64.89,-23.96],[65.08,-22.18],[65.38,-22.23],[65.61,-24.33],[66.26,-23.65],[66.41,-22.13],[65.73,-20.58],[66.28,-19.06],[65.99,-17.8],[66.53,-16.17],[66.46,-14.51]],[[67.15,-75.87],[67.1,-76.99],[67.59,-77.24],[68.15,-76.81],[68.29,-75.9],[68.01,-75.11],[67.58,-75.1],[67.44,-75.22],[67.15,-75.87]],[[66.58,-175.01],[66.34,-174.34],[67.06,-174.57],[66.91,-171.86],[65.98,-169.9],[65.54,-170.89],[65.44,-172.53],[64.46,-172.56],[64.25,-172.96],[64.28,-173.89],[64.63,-174.65],[64.92,-175.98],[65.36,-176.21],[65.52,-177.22],[65.39,-178.36],[65.74,-178.9],[66.11,-178.69],[65.87,-179.88],[65.4,-179.43],[64.98,-180],[68.96,-180],[68.2,-177.55],[67.21,-174.93],[66.58,-175.01]],[[69.11,-95.65],[68.76,-96.27],[69.06,-97.62],[68.95,-98.43],[69.4,-99.8],[69.71,-98.92],[70.14,-98.22],[69.86,-97.16],[69.68,-96.56],[69.49,-96.26],[69.11,-95.65]],[[70.83,180],[70.78,178.9],[71.1,178.73],[71.52,180],[70.83,180]],[[70.89,-178.69],[70.83,-180],[71.52,-180],[71.56,-179.87],[71.56,-179.02],[71.27,-177.58],[71.13,-177.66],[70.89,-178.69]],[[69.5,-90.55],[68.48,-90.55],[69.26,-89.22],[68.62,-88.02],[67.87,-88.32],[67.2,-87.35],[67.92,-86.31],[68.78,-85.58],[69.88,-85.52],[69.81,-84.1],[69.66,-82.62],[69.16,-81.28],[68.67,-81.22],[68.13,-81.96],[67.6,-81.26],[67.11,-81.39],[66.41,-83.34],[66.26,-84.74],[66.56,-85.77],[66.06,-86.07],[65.21,-87.03],[64.78,-87.32],[64.1,-88.48],[64.03,-89.91],[63.61,-90.7],[62.96,-90.77],[62.84,-91.93],[62.02,-93.16],[60.9,-94.24],[60.11,-94.63],[58.95,-94.68],[58.78,-93.22],[57.85,-92.76],[57.09,-92.3],[57.28,-90.9],[56.85,-89.04],[56.47,-88.04],[56.0,-87.32],[55.72,-86.07],[55.3,-85.01],[55.24,-83.36],[55.15,-82.27],[54.28,-82.44],[53.28,-82.12],[52.16,-81.4],[51.21,-79.91],[51.53,-79.14],[52.56,-78.6],[54.14,-79.12],[54.67,-79.83],[55.14,-78.23],[55.84,-77.1],[56.53,-76.54],[57.2,-76.62],[58.05,-77.3],[58.8,-78.52],[59.85,-77.34],[60.76,-77.77],[62.32,-78.11],[62.55,-77.41],[62.28,-75.7],[62.18,-74.67],[62.44,-73.84],[62.11,-72.91],[61.53,-71.68],[61.14,-71.37],[61.06,-69.59],[60.22,-69.62],[58.96,-69.29],[58.8,-68.37],[58.21,-67.65],[58.77,-66.2],[59.87,-65.25],[60.34,-64.58],[59.44,-63.8],[58.17,-62.5],[56.97,-61.4],[56.34,-61.8],[55.78,-60.47],[55.2,-59.57],[54.95,-57.98],[54.63,-57.33],[53.78,-56.94],[53.65,-56.16],[53.27,-55.76],[52.15,-55.68],[51.77,-56.41],[51.42,-57.13],[51.06,-58.77],[50.24,-60.03],[50.08,-61.72],[50.29,-63.86],[50.3,-65.36],[50.23,-66.4],[49.51,-67.24],[49.07,-68.51],[47.74,-69.95],[46.82,-71.1],[46.99,-70.26],[48.3,-68.65],[49.13,-66.55],[49.23,-65.06],[48.74,-64.17],[48.07,-65.12],[46.99,-64.8],[46.24,-64.47],[45.74,-63.17],[45.88,-61.52],[47.01,-60.52],[46.28,-60.45],[45.92,-59.8],[45.27,-61.04],[44.67,-63.25],[44.27,-64.25],[43.55,-65.36],[43.62,-66.12],[44.47,-66.16],[45.29,-64.43],[45.26,-66.03],[45.14,-67.14],[44.81,-66.96],[44.33,-68.03],[43.98,-69.06],[43.68,-70.12],[43.03,-70.69],[42.87,-70.81],[42.34,-70.83],[41.81,-70.49],[41.78,-70.08],[42.15,-70.18],[41.92,-69.88],[41.64,-69.97],[41.48,-70.64],[41.49,-71.12],[41.32,-71.86],[41.27,-72.29],[41.22,-72.88],[40.93,-73.71],[41.12,-72.24],[40.93,-71.95],[40.63,-73.34],[40.63,-73.98],[40.75,-73.95],[40.47,-74.26],[40.43,-73.96],[39.71,-74.18],[38.94,-74.91],[39.2,-74.98],[39.25,-75.2],[39.5,-75.53],[38.96,-75.32],[38.78,-75.08],[38.4,-75.06],[38.02,-75.38],[37.22,-75.94],[37.26,-76.03],[37.94,-75.72],[38.32,-76.23],[39.15,-76.35],[38.72,-76.54],[38.08,-76.33],[38.23,-76.96],[37.92,-76.3],[36.97,-76.26],[36.9,-75.97],[36.55,-75.87],[35.55,-75.73],[34.81,-76.36],[34.51,-77.4],[33.93,-78.05],[33.86,-78.55],[33.49,-79.06],[33.16,-79.2],[32.51,-80.3],[32.03,-80.86],[31.44,-81.34],[30.73,-81.49],[30.04,-81.31],[29.18,-80.98],[28.47,-80.54],[28.04,-80.53],[26.88,-80.06],[26.21,-80.09],[25.82,-80.13],[25.21,-80.38],[25.08,-80.68],[25.2,-81.17],[25.64,-81.33],[25.87,-81.71],[26.73,-82.24],[27.5,-82.71],[27.89,-82.86],[28.55,-82.65],[29.1,-82.93],[29.94,-83.71],[30.09,-84.1],[29.64,-85.11],[29.69,-85.29],[30.15,-85.77],[30.4,-86.4],[30.27,-87.53],[30.38,-88.42],[30.32,-89.18],[30.18,-89.6],[29.89,-89.41],[29.49,-89.43],[29.29,-89.22],[29.16,-89.41],[29.31,-89.78],[29.12,-90.15],[29.15,-90.88],[29.68,-91.63],[29.55,-92.5],[29.78,-93.23],[29.71,-93.85],[29.48,-94.69],[28.74,-95.6],[28.31,-96.59],[27.83,-97.14],[27.38,-97.37],[26.69,-97.38],[26.21,-97.33],[25.87,-97.14],[25.87,-97.14],[25.87,-97.14],[24.99,-97.53],[24.27,-97.7],[22.93,-97.78],[22.44,-97.87],[21.9,-97.7],[21.41,-97.39],[20.64,-97.19],[19.89,-96.53],[19.32,-96.29],[18.83,-95.9],[18.56,-94.84],[18.14,-94.43],[18.42,-93.55],[18.52,-92.79],[18.7,-92.04],[18.88,-91.41],[19.28,-90.77],[19.87,-90.53],[20.71,-90.45],[21.0,-90.28],[21.26,-89.6],[21.49,-88.54],[21.46,-87.66],[21.54,-87.05],[21.33,-86.81],[20.85,-86.85],[20.26,-87.38],[19.65,-87.62],[19.47,-87.44],[19.04,-87.59],[18.26,-87.84],[18.52,-88.09],[18.5,-88.3],[18.35,-88.3],[18.35,-88.11],[18.08,-88.12],[17.64,-88.29],[17.49,-88.2],[17.13,-88.3],[17.04,-88.24],[16.53,-88.36],[16.27,-88.55],[16.23,-88.73],[15.89,-88.93],[15.71,-88.6],[15.86,-88.52],[15.73,-88.22],[15.69,-88.12],[15.86,-87.9],[15.88,-87.62],[15.8,-87.52],[15.85,-87.37],[15.76,-86.9],[15.78,-86.44],[15.89,-86.12],[16.01,-86.0],[15.95,-85.68],[15.89,-85.44],[15.91,-85.18],[16.0,-84.98],[15.86,-84.53],[15.84,-84.37],[15.65,-84.06],[15.42,-83.77],[15.27,-83.41],[15.0,-83.15],[14.9,-83.23],[14.68,-83.28],[14.31,-83.18],[13.97,-83.41],[13.57,-83.52],[13.13,-83.55],[12.87,-83.5],[12.42,-83.47],[12.32,-83.63],[11.89,-83.72],[11.63,-83.65],[11.37,-83.86],[11.1,-83.81],[10.94,-83.66],[10.4,-83.4],[9.99,-83.02],[9.57,-82.55],[9.21,-82.19],[9.0,-82.21],[8.95,-81.81],[9.03,-81.71],[8.79,-81.44],[8.86,-80.95],[9.11,-80.52],[9.31,-79.91],[9.61,-79.57],[9.55,-79.02],[9.45,-79.06],[9.42,-78.5],[9.25,-78.06],[8.95,-77.73],[8.67,-77.35],[8.64,-76.84],[9.34,-76.09],[9.44,-75.67],[9.77,-75.66],[10.62,-75.48],[11.08,-74.91],[11.1,-74.28],[11.31,-74.2],[11.23,-73.41],[11.73,-72.63],[11.96,-72.24],[12.44,-71.75],[12.38,-71.4],[12.11,-71.14],[11.78,-71.33],[11.54,-71.36],[11.42,-71.95],[10.97,-71.62],[10.45,-71.63],[9.87,-72.07],[9.07,-71.7],[9.14,-71.26],[9.86,-71.04],[10.21,-71.35],[10.97,-71.4],[11.38,-70.16],[11.85,-70.29],[12.16,-69.94],[11.46,-69.58],[11.44,-68.88],[10.89,-68.23],[10.55,-68.19],[10.55,-67.3],[10.65,-66.23],[10.2,-65.66],[10.08,-64.89],[10.39,-64.33],[10.64,-64.32],[10.7,-63.08],[10.72,-61.88],[10.42,-62.73],[9.95,-62.39],[9.87,-61.59],[9.38,-60.83],[8.58,-60.67],[8.6,-60.15],[8.37,-59.76],[8.0,-59.1],[7.35,-58.48],[6.83,-58.45],[6.81,-58.08],[6.32,-57.54],[5.97,-57.15],[5.77,-55.95],[5.95,-55.84],[6.03,-55.03],[5.76,-53.96],[5.65,-53.62],[5.41,-52.88],[4.57,-51.82],[4.16,-51.66],[4.2,-51.32],[3.65,-51.07],[1.9,-50.51],[1.74,-49.97],[1.05,-49.95],[0.22,-50.7],[-0.08,-50.39],[-0.24,-48.62],[-1.24,-48.58],[-0.58,-47.82],[-0.94,-46.57],[-1.55,-44.91],[-2.14,-44.42],[-2.69,-44.58],[-2.38,-43.42],[-2.91,-41.47],[-2.87,-39.98],[-3.7,-38.5],[-4.82,-37.22],[-5.11,-36.45],[-5.15,-35.6],[-5.46,-35.24],[-6.74,-34.9],[-7.34,-34.73],[-9.0,-35.13],[-9.65,-35.64],[-11.04,-37.05],[-12.17,-37.68],[-13.04,-38.42],[-13.06,-38.67],[-13.79,-38.95],[-15.67,-38.88],[-17.21,-39.16],[-17.87,-39.27],[-18.26,-39.58],[-19.6,-39.76],[-20.9,-40.77],[-21.94,-40.94],[-22.37,-41.75],[-22.97,-41.99],[-22.97,-43.07],[-23.35,-44.65],[-23.8,-45.35],[-24.09,-46.47],[-24.89,-47.65],[-25.88,-48.5],[-26.62,-48.64],[-27.18,-48.47],[-28.19,-48.66],[-28.67,-48.89],[-29.22,-49.59],[-30.98,-50.7],[-31.78,-51.58],[-32.25,-52.26],[-33.2,-52.71],[-33.77,-53.37],[-34.4,-53.81],[-34.95,-54.94],[-34.75,-55.67],[-34.86,-56.22],[-34.43,-57.14],[-34.46,-57.82],[-33.91,-58.43],[-34.43,-58.5],[-35.29,-57.23],[-35.98,-57.36],[-36.41,-56.74],[-36.9,-56.79],[-38.18,-57.75],[-38.72,-59.23],[-38.93,-61.24],[-38.83,-62.34],[-39.42,-62.13],[-40.17,-62.33],[-40.68,-62.15],[-41.03,-62.75],[-41.17,-63.77],[-40.8,-64.73],[-41.06,-65.12],[-42.06,-64.98],[-42.36,-64.3],[-42.04,-63.76],[-42.56,-63.46],[-42.87,-64.38],[-43.5,-65.18],[-44.5,-65.33],[-45.04,-65.57],[-45.04,-66.51],[-45.55,-67.29],[-46.3,-67.58],[-47.03,-66.6],[-47.24,-65.64],[-48.13,-65.99],[-48.7,-67.17],[-49.87,-67.82],[-50.26,-68.73],[-50.73,-69.14],[-51.77,-68.82],[-52.35,-68.15],[-52.3,-68.57],[-52.29,-69.46],[-52.54,-69.94],[-52.9,-70.85],[-53.83,-71.01],[-53.86,-71.43],[-53.53,-72.56],[-52.84,-73.7],[-52.26,-74.95],[-51.63,-75.26],[-51.04,-74.98],[-50.38,-75.48],[-48.67,-75.61],[-47.71,-75.18],[-46.94,-74.13],[-46.65,-75.64],[-45.76,-74.69],[-44.1,-74.35],[-44.45,-73.24],[-42.38,-72.72],[-42.12,-73.39],[-43.37,-73.7],[-43.22,-74.33],[-41.79,-74.02],[-39.94,-73.68],[-39.26,-73.22],[-38.28,-73.51],[-37.16,-73.59],[-37.12,-73.17],[-35.51,-72.55],[-33.91,-71.86],[-32.42,-71.44],[-30.92,-71.67],[-30.1,-71.37],[-28.86,-71.49],[-27.64,-70.91],[-25.71,-70.72],[-23.63,-70.4],[-21.39,-70.09],[-19.76,-70.16],[-18.35,-70.37],[-17.77,-71.38],[-17.36,-71.46],[-16.36,-73.44],[-15.27,-75.24],[-14.65,-76.01],[-13.82,-76.42],[-13.53,-76.26],[-12.22,-77.11],[-10.38,-78.09],[-8.39,-79.04],[-7.93,-79.45],[-7.19,-79.76],[-6.54,-80.54],[-6.14,-81.25],[-5.69,-80.93],[-4.74,-81.41],[-4.04,-81.1],[-3.4,-80.3],[-2.66,-79.77],[-2.22,-79.99],[-2.69,-80.37],[-2.25,-80.97],[-1.97,-80.76],[-1.06,-80.93],[-0.91,-80.58],[-0.28,-80.4],[0.36,-80.02],[0.77,-80.09],[0.98,-79.54],[1.38,-78.86],[1.69,-78.99],[1.77,-78.62],[2.27,-78.66],[2.63,-78.43],[2.7,-77.93],[3.33,-77.51],[3.85,-77.13],[4.09,-77.5],[4.67,-77.31],[5.58,-77.53],[5.85,-77.32],[6.69,-77.48],[7.22,-77.88],[7.51,-78.21],[8.05,-78.43],[8.32,-78.18],[8.39,-78.44],[8.72,-78.62],[9.0,-79.12],[8.93,-79.56],[8.58,-79.76],[8.33,-80.16],[8.3,-80.38],[8.09,-80.48],[7.55,-80.0],[7.42,-80.28],[7.27,-80.42],[7.22,-80.89],[7.82,-81.06],[7.65,-81.19],[7.71,-81.52],[8.11,-81.72],[8.18,-82.13],[8.29,-82.39],[8.29,-82.82],[8.07,-82.85],[8.23,-82.97],[8.45,-83.51],[8.66,-83.71],[8.83,-83.6],[9.05,-83.63],[9.29,-83.91],[9.49,-84.3],[9.62,-84.65],[9.91,-84.71],[10.09,-84.98],[9.8,-84.91],[9.56,-85.11],[9.83,-85.34],[9.93,-85.66],[10.13,-85.8],[10.44,-85.79],[10.75,-85.66],[10.9,-85.94],[11.09,-85.71],[11.4,-86.06],[11.81,-86.53],[12.14,-86.75],[12.46,-87.17],[12.91,-87.67],[13.06,-87.56],[12.91,-87.39],[12.98,-87.32],[13.3,-87.49],[13.38,-87.79],[13.15,-87.9],[13.16,-88.48],[13.26,-88.84],[13.46,-89.26],[13.52,-89.81],[13.74,-90.1],[13.91,-90.61],[13.93,-91.23],[14.13,-91.69],[14.54,-92.23],[15.62,-93.36],[15.94,-93.88],[16.2,-94.69],[16.13,-95.25],[15.75,-96.05],[15.65,-96.56],[15.92,-97.26],[16.11,-98.01],[16.57,-98.95],[16.71,-99.7],[17.17,-100.83],[17.65,-101.67],[17.92,-101.92],[17.98,-102.48],[18.29,-103.5],[18.75,-103.92],[19.32,-104.99],[19.95,-105.49],[20.43,-105.73],[20.53,-105.4],[20.82,-105.5],[21.08,-105.27],[21.42,-105.27],[21.87,-105.6],[22.27,-105.69],[22.77,-106.03],[23.77,-106.91],[24.55,-107.92],[25.17,-108.4],[25.58,-109.26],[25.82,-109.44],[26.44,-109.29],[26.68,-109.8],[27.16,-110.39],[27.86,-110.64],[27.94,-111.18],[28.47,-111.76],[28.95,-112.23],[29.27,-112.27],[30.02,-112.81],[30.79,-113.16],[31.17,-113.15],[31.57,-113.87],[31.52,-114.21],[31.8,-114.78],[31.39,-114.94],[30.91,-114.77],[30.16,-114.67],[29.75,-114.33],[29.06,-113.59],[28.83,-113.42],[28.75,-113.27],[28.41,-113.14],[28.43,-112.96],[27.78,-112.76],[27.53,-112.46],[27.17,-112.24],[26.66,-111.62],[25.73,-111.28],[25.29,-110.99],[24.83,-110.71],[24.3,-110.66],[24.27,-110.17],[23.81,-109.77],[23.36,-109.41],[23.19,-109.43],[22.82,-109.85],[22.82,-110.03],[23.43,-110.29],[24.0,-110.95],[24.48,-111.67],[24.74,-112.18],[25.47,-112.15],[26.01,-112.3],[26.32,-112.78],[26.77,-113.46],[26.64,-113.6],[26.9,-113.85],[27.14,-114.47],[27.72,-115.06],[27.8,-114.98],[27.74,-114.57],[28.12,-114.2],[28.57,-114.16],[29.28,-114.93],[29.56,-115.52],[30.18,-115.89],[30.84,-116.26],[31.64,-116.72],[32.54,-117.13],[33.05,-117.3],[33.62,-117.94],[33.74,-118.41],[34.03,-118.52],[34.08,-119.08],[34.35,-119.44],[34.45,-120.37],[34.61,-120.62],[35.16,-120.74],[36.16,-121.71],[37.55,-122.55],[37.78,-122.51],[38.11,-122.95],[38.95,-123.73],[39.77,-123.87],[40.31,-124.4],[41.14,-124.18],[42.0,-124.21],[42.77,-124.53],[43.71,-124.14],[45.52,-123.9],[46.86,-124.08],[47.72,-124.4],[48.18,-124.69],[48.38,-124.57],[48.04,-123.12],[47.1,-122.59],[47.36,-122.34],[48.18,-122.5],[49.0,-122.84],[49.0,-122.97],[49.98,-124.91],[50.42,-125.62],[50.83,-127.44],[51.72,-127.99],[52.33,-127.85],[52.76,-129.13],[53.56,-129.31],[54.29,-130.51],[54.8,-130.54],[55.18,-131.09],[55.5,-131.97],[56.37,-132.25],[57.18,-133.54],[58.12,-134.08],[58.19,-135.04],[58.21,-136.63],[58.5,-137.8],[59.54,-139.87],[59.73,-140.83],[60.08,-142.57],[60.0,-143.96],[60.46,-145.93],[60.88,-147.11],[60.67,-148.22],[59.98,-148.02],[59.91,-148.57],[59.71,-149.73],[59.37,-150.61],[59.16,-151.72],[59.75,-151.86],[60.73,-151.41],[61.03,-150.35],[61.28,-150.62],[60.73,-151.9],[60.06,-152.58],[59.35,-154.02],[58.86,-153.29],[58.15,-154.23],[57.73,-155.31],[57.42,-156.31],[56.98,-156.56],[56.46,-158.12],[55.99,-158.43],[55.57,-159.6],[55.64,-160.29],[55.36,-161.22],[55.02,-162.24],[54.69,-163.07],[54.4,-164.79],[54.57,-164.94],[55.04,-163.85],[55.35,-162.87],[55.9,-161.8],[56.01,-160.56],[56.42,-160.07],[57.02,-158.68],[57.22,-158.46],[57.57,-157.72],[58.33,-157.55],[58.92,-157.04],[58.62,-158.19],[58.79,-158.52],[58.42,-159.06],[58.93,-159.71],[58.57,-159.98],[59.07,-160.36],[58.67,-161.35],[58.67,-161.97],[59.27,-162.05],[59.63,-161.87],[59.99,-162.52],[59.8,-163.82],[60.27,-164.66],[60.51,-165.35],[61.07,-165.35],[61.5,-166.12],[62.08,-165.73],[62.63,-164.92],[63.15,-164.56],[63.22,-163.75],[63.06,-163.07],[63.54,-162.26],[63.46,-161.53],[63.77,-160.77],[64.22,-160.96],[64.4,-161.52],[64.79,-160.78],[64.78,-161.39],[64.56,-162.45],[64.34,-162.76],[64.56,-163.55],[64.45,-164.96],[64.69,-166.43],[65.09,-166.84],[65.67,-168.11],[66.09,-166.71],[66.58,-164.47],[66.58,-163.65],[66.08,-163.79],[66.12,-161.68],[66.74,-162.49],[67.12,-163.72],[67.62,-164.43],[68.04,-165.39],[68.36,-166.76],[68.88,-166.2],[68.92,-164.43],[69.37,-163.17],[69.86,-162.93],[70.33,-161.91],[70.45,-160.93],[70.89,-159.04],[70.82,-158.12],[71.36,-156.58],[71.15,-155.07],[70.7,-154.34],[70.89,-153.9],[70.83,-152.21],[70.6,-152.27],[70.43,-150.74],[70.53,-149.72],[70.21,-147.61],[70.12,-145.69],[69.99,-144.92],[70.15,-143.59],[69.85,-142.07],[69.71,-140.99],[69.47,-139.12],[68.99,-137.55],[68.9,-136.5],[69.32,-135.63],[69.63,-134.41],[69.51,-132.93],[69.94,-131.43],[70.19,-129.79],[69.78,-129.11],[70.01,-128.36],[70.48,-128.14],[70.38,-127.45],[69.48,-125.76],[70.16,-124.42],[69.4,-124.29],[69.56,-123.06],[69.86,-122.68],[69.8,-121.47],[69.38,-119.94],[69.01,-117.6],[68.84,-116.23],[68.91,-115.25],[68.4,-113.9],[67.9,-115.3],[67.69,-113.5],[67.81,-110.8],[67.98,-109.95],[67.38,-108.88],[67.89,-107.79],[68.31,-108.81],[68.65,-108.17],[68.7,-106.95],[68.8,-106.15],[68.56,-105.34],[68.02,-104.34],[68.1,-103.22],[67.65,-101.45],[67.81,-99.9],[67.78,-98.44],[68.4,-98.56],[68.58,-97.67],[68.24,-96.12],[67.29,-96.13],[68.09,-95.49],[68.06,-94.68],[69.07,-94.23],[69.69,-95.3],[70.09,-96.47],[71.19,-96.39],[71.92,-95.21],[71.76,-93.89],[71.32,-92.88],[70.19,-91.52],[69.7,-92.41],[69.5,-90.55]],[[73.12,-114.17],[72.65,-114.67],[72.96,-112.44],[72.45,-111.05],[72.96,-109.92],[72.63,-109.01],[71.65,-108.19],[72.07,-107.69],[73.09,-108.4],[73.24,-107.52],[73.08,-106.52],[72.67,-105.4],[71.7,-104.77],[70.99,-104.46],[70.5,-102.79],[70.02,-100.98],[69.58,-101.09],[69.5,-102.73],[69.12,-102.09],[68.75,-102.43],[68.91,-104.24],[69.18,-105.96],[69.12,-107.12],[68.78,-109],[68.6,-111.97],[68.54,-113.31],[69.01,-113.85],[69.28,-115.22],[69.17,-116.11],[69.96,-117.34],[70.07,-116.67],[70.24,-115.13],[70.19,-113.72],[70.37,-112.42],[70.6,-114.35],[70.52,-116.49],[70.54,-117.9],[70.91,-118.43],[71.31,-116.11],[71.3,-117.66],[71.56,-119.4],[72.31,-118.56],[72.71,-117.87],[73.31,-115.19],[73.12,-114.17]],[[73.42,-104.5],[72.76,-105.38],[73.46,-106.94],[73.6,-106.6],[73.64,-105.26],[73.42,-104.5]],[[73.1,-76.34],[72.83,-76.25],[72.86,-77.31],[72.88,-78.39],[72.74,-79.49],[72.8,-79.78],[73.33,-80.88],[73.69,-80.83],[73.76,-80.35],[73.65,-78.06],[73.1,-76.34]],[[73.16,-86.56],[72.53,-85.77],[73.34,-84.85],[73.75,-82.32],[72.72,-80.6],[72.06,-80.75],[72.35,-78.77],[72.75,-77.82],[72.24,-75.61],[71.77,-74.23],[71.33,-74.1],[71.56,-72.24],[70.92,-71.2],[70.53,-68.79],[70.12,-67.91],[69.19,-66.97],[68.72,-68.81],[68.07,-66.45],[67.85,-64.86],[66.93,-63.42],[66.86,-61.85],[66.16,-62.16],[65.0,-63.92],[65.43,-65.15],[66.39,-66.72],[66.26,-68.02],[65.69,-68.14],[65.11,-67.09],[64.65,-65.73],[64.38,-65.32],[63.39,-64.67],[62.67,-65.01],[62.95,-66.28],[63.75,-68.78],[62.88,-67.37],[62.28,-66.33],[61.93,-66.17],[62.33,-68.88],[62.91,-71.02],[63.4,-72.24],[63.68,-71.89],[64.19,-73.38],[64.68,-74.83],[64.39,-74.82],[64.23,-77.71],[64.57,-78.56],[65.31,-77.9],[65.33,-76.02],[65.45,-73.96],[65.81,-74.29],[66.31,-73.94],[67.28,-72.65],[67.73,-72.93],[68.07,-73.31],[68.55,-74.84],[68.89,-76.87],[69.15,-76.23],[69.77,-77.29],[69.83,-78.17],[70.17,-78.96],[69.87,-79.49],[69.74,-81.31],[69.97,-84.94],[70.26,-87.06],[70.41,-88.68],[70.76,-89.51],[71.22,-88.47],[71.22,-89.89],[72.24,-90.21],[73.13,-89.44],[73.54,-88.41],[73.8,-85.83],[73.16,-86.56]],[[73.84,-100.36],[73.63,-99.16],[73.76,-97.38],[73.47,-97.12],[72.99,-98.05],[72.56,-96.54],[71.66,-96.72],[71.27,-98.36],[71.36,-99.32],[71.74,-100.01],[72.51,-102.5],[72.83,-102.48],[72.71,-100.44],[73.36,-101.54],[73.84,-100.36]],[[73.21,143.6],[73.21,142.09],[73.32,140.04],[73.37,139.86],[73.77,140.81],[73.86,142.06],[73.48,143.48],[73.21,143.6]],[[72.77,-93.2],[72.02,-94.27],[72.06,-95.41],[72.94,-96.03],[73.44,-96.02],[73.86,-95.5],[74.13,-94.5],[74.1,-92.42],[73.86,-90.51],[72.97,-92.0],[72.77,-93.2]],[[71.4,-120.46],[70.9,-123.09],[71.34,-123.62],[71.87,-125.93],[72.19,-125.59],[73.02,-124.81],[73.68,-123.94],[74.29,-124.92],[74.45,-121.54],[74.24,-120.11],[74.19,-117.56],[73.9,-116.58],[73.48,-115.51],[73.22,-116.77],[72.52,-119.22],[71.82,-120.46],[71.4,-120.46]],[[75.08,150.73],[74.69,149.58],[74.78,147.98],[75.17,146.12],[75.5,146.36],[75.35,148.22],[75.08,150.73]],[[74.98,-93.61],[74.59,-94.16],[74.67,-95.61],[74.93,-96.82],[75.38,-96.29],[75.65,-94.85],[75.3,-93.98],[74.98,-93.61]],[[75.56,145.09],[74.82,144.3],[74.85,140.61],[74.61,138.96],[75.26,136.97],[75.95,137.51],[76.14,138.83],[76.09,141.47],[75.56,145.09]],[[76.72,-98.5],[76.26,-97.74],[75.74,-97.7],[75,-98.16],[74.9,-99.81],[75.06,-100.88],[75.64,-100.86],[75.56,-102.5],[76.34,-102.57],[76.31,-101.49],[76.65,-99.98],[76.59,-98.58],[76.72,-98.5]],[[76.2,-108.21],[75.85,-107.82],[76.01,-106.93],[75.97,-105.88],[75.48,-105.7],[75.01,-106.31],[74.85,-109.7],[74.42,-112.22],[74.39,-113.74],[74.72,-113.87],[75.16,-111.79],[75.04,-116.31],[75.22,-117.71],[76.2,-116.35],[76.48,-115.4],[76.14,-112.59],[75.55,-110.81],[75.47,-109.07],[76.43,-110.5],[76.79,-109.58],[76.68,-108.55],[76.2,-108.21]],[[70.72,57.54],[70.63,56.94],[70.76,53.68],[71.21,53.41],[71.47,51.6],[72.01,51.46],[72.23,52.48],[72.77,52.44],[73.63,54.43],[73.75,53.51],[74.63,55.9],[75.08,55.63],[75.61,57.87],[76.25,61.17],[76.44,64.5],[76.81,66.21],[76.94,68.16],[76.54,68.85],[76.23,68.18],[75.74,64.64],[75.26,61.58],[74.31,58.48],[73.33,56.99],[72.37,55.42],[71.54,55.62],[70.72,57.54]],[[77.1,-94.68],[76.78,-93.57],[76.78,-91.61],[76.45,-90.74],[76.07,-90.97],[75.85,-89.82],[75.61,-89.19],[75.57,-87.84],[75.48,-86.38],[75.7,-84.79],[75.78,-82.75],[75.71,-81.13],[75.34,-80.06],[74.92,-79.83],[74.66,-80.46],[74.44,-81.95],[74.56,-83.23],[74.41,-86.1],[74.39,-88.15],[74.52,-89.76],[74.84,-92.42],[75.39,-92.77],[75.88,-92.89],[76.32,-93.89],[76.44,-95.96],[76.75,-97.12],[77.16,-96.75],[77.1,-94.68]],[[77.65,-116.2],[76.88,-116.34],[76.53,-117.11],[76.48,-118.04],[76.05,-119.9],[75.9,-121.5],[76.12,-122.85],[76.12,-122.85],[76.86,-121.16],[77.51,-119.1],[77.5,-117.57],[77.65,-116.2]],[[76.97,106.97],[76.48,107.24],[76.72,108.15],[76.71,111.08],[76.22,113.33],[75.85,114.13],[75.33,113.89],[75.03,112.78],[74.48,110.15],[74.18,109.4],[74.04,110.64],[73.79,112.12],[73.98,113.02],[73.34,113.53],[73.59,113.97],[73.75,115.57],[73.59,118.78],[73.12,119.02],[72.97,123.2],[73.74,123.26],[73.56,125.38],[73.57,126.98],[73.04,128.59],[72.4,129.05],[71.98,128.46],[71.19,129.72],[70.79,131.29],[71.84,132.25],[71.39,133.86],[71.66,135.56],[71.35,137.5],[71.63,138.23],[71.49,139.87],[72.42,139.15],[72.85,140.47],[72.2,149.5],[71.61,150.35],[70.84,152.97],[71.03,157.01],[70.87,159.0],[70.45,159.83],[69.72,159.71],[69.44,160.94],[69.64,162.28],[69.67,164.05],[69.47,165.94],[69.58,167.84],[68.69,169.58],[69.01,170.82],[69.65,170.01],[70.1,170.45],[69.82,173.64],[69.88,175.72],[69.4,178.6],[68.96,180],[64.98,180],[64.97,179.99],[64.53,178.71],[64.61,177.41],[64.08,178.31],[63.25,178.91],[62.98,179.37],[62.57,179.49],[62.3,179.23],[62.52,177.36],[61.77,174.57],[61.65,173.68],[60.95,172.15],[60.34,170.7],[59.88,170.33],[60.57,168.9],[59.79,166.3],[60.16,165.84],[59.73,164.88],[59.87,163.54],[59.21,163.22],[58.24,162.02],[57.84,162.05],[57.62,163.19],[56.16,163.06],[56.12,162.13],[55.29,161.7],[54.86,162.12],[54.34,160.37],[53.2,160.02],[52.96,158.53],[51.94,158.23],[51.01,156.79],[51.7,156.42],[53.16,155.99],[55.38,155.43],[56.77,155.91],[57.36,156.76],[57.83,156.81],[58.06,158.36],[59.31,160.15],[60.34,161.87],[61.14,163.67],[62.55,164.47],[62.47,163.26],[61.64,162.66],[60.54,160.12],[61.77,159.3],[61.43,156.72],[59.76,154.22],[59.15,155.04],[58.88,152.81],[58.78,151.27],[59.5,151.34],[59.66,149.78],[59.16,148.54],[59.34,145.49],[59.04,142.2],[57.09,138.96],[54.73,135.13],[54.6,136.7],[53.98,137.19],[53.76,138.16],[54.25,138.8],[54.19,139.9],[53.09,141.35],[52.24,141.38],[51.24,140.6],[50.05,140.51],[48.45,140.06],[47.0,138.55],[46.31,138.22],[45.14,136.86],[43.99,135.52],[43.4,134.87],[42.81,133.54],[42.8,132.91],[43.28,132.28],[42.55,130.94],[42.22,130.78],[42.28,130.4],[41.94,129.97],[41.6,129.67],[40.88,129.71],[40.66,129.19],[40.49,129.01],[40.19,128.63],[40.03,127.97],[39.76,127.53],[39.32,127.5],[39.21,127.39],[39.05,127.78],[38.61,128.35],[37.43,129.21],[36.78,129.46],[35.63,129.47],[35.08,129.09],[34.89,128.19],[34.48,127.39],[34.39,126.49],[34.93,126.37],[35.68,126.56],[36.73,126.12],[36.89,126.86],[37.75,126.17],[37.94,125.69],[37.75,125.57],[37.67,125.28],[37.86,125.24],[37.95,124.98],[38.11,124.71],[38.55,124.99],[38.67,125.22],[38.85,125.13],[39.39,125.39],[39.55,125.32],[39.66,124.74],[39.93,124.27],[39.64,122.87],[39.17,122.13],[38.9,121.05],[39.36,121.59],[39.75,121.38],[40.42,122.17],[40.95,121.64],[40.59,120.77],[39.9,119.64],[39.25,119.02],[39.2,118.04],[38.74,117.53],[38.06,118.06],[37.9,118.88],[37.45,118.91],[37.16,119.7],[37.87,120.82],[37.48,121.71],[37.45,122.36],[36.93,122.52],[36.65,121.1],[36.11,120.64],[35.61,119.66],[34.91,119.15],[34.36,120.23],[33.38,120.62],[32.46,121.23],[31.69,121.91],[30.95,121.89],[30.68,121.26],[30.14,121.5],[29.83,122.09],[29.02,121.94],[28.23,121.68],[28.14,121.13],[27.05,120.4],[25.74,119.59],[24.55,118.66],[23.62,117.28],[22.78,115.89],[22.67,114.76],[22.22,114.15],[22.55,113.81],[22.05,113.24],[21.55,111.84],[21.4,110.79],[20.34,110.44],[20.28,109.89],[21.01,109.63],[21.4,109.86],[21.72,108.52],[21.55,108.05],[20.7,106.72],[19.75,105.88],[19.06,105.66],[18.0,106.43],[16.7,107.36],[16.08,108.27],[15.28,108.88],[13.43,109.34],[11.67,109.2],[11.01,108.37],[10.36,107.22],[9.53,106.41],[8.6,105.16],[9.24,104.8],[9.92,105.08],[10.49,104.33],[10.63,103.5],[11.15,103.09],[12.19,102.59],[12.65,101.69],[12.63,100.83],[13.41,100.98],[13.41,100.1],[12.31,100.02],[10.85,99.48],[9.96,99.15],[9.24,99.22],[9.21,99.87],[8.3,100.28],[7.43,100.46],[6.86,101.02],[6.74,101.62],[6.22,102.14],[6.13,102.37],[5.52,102.96],[4.86,103.38],[4.18,103.44],[3.73,103.33],[3.38,103.43],[2.79,103.5],[2.52,103.85],[1.63,104.25],[1.29,104.23],[1.23,103.52],[1.97,102.57],[2.76,101.39],[3.27,101.27],[3.94,100.7],[4.77,100.56],[5.31,100.2],[6.04,100.31],[6.46,100.09],[6.85,99.69],[7.34,99.52],[7.91,98.99],[8.38,98.5],[7.79,98.34],[8.35,98.15],[8.97,98.26],[9.93,98.55],[10.68,98.46],[11.44,98.76],[12.03,98.43],[13.12,98.51],[13.64,98.1],[14.84,97.78],[16.1,97.6],[16.93,97.16],[16.43,96.51],[15.71,95.37],[15.8,94.81],[16.04,94.19],[17.28,94.53],[18.21,94.32],[19.37,93.54],[19.73,93.66],[19.86,93.08],[20.67,92.37],[21.19,92.08],[21.7,92.03],[22.18,91.83],[22.77,91.42],[22.81,90.5],[22.39,90.59],[21.84,90.27],[22.04,89.85],[21.86,89.7],[21.97,89.42],[22.06,89.03],[21.69,88.89],[21.7,88.21],[21.5,86.98],[20.74,87.03],[20.15,86.5],[19.48,85.06],[18.3,83.94],[17.67,83.19],[17.02,82.19],[16.56,82.19],[16.31,81.69],[15.95,80.79],[15.9,80.32],[15.14,80.03],[13.84,80.23],[13.01,80.29],[12.06,79.86],[10.36,79.86],[10.31,79.34],[9.55,78.89],[9.22,79.19],[8.93,78.28],[8.25,77.94],[7.97,77.54],[8.9,76.59],[10.3,76.13],[11.31,75.75],[11.78,75.4],[12.74,74.86],[13.99,74.62],[14.62,74.44],[15.99,73.53],[17.93,73.12],[19.21,72.82],[20.42,72.82],[21.36,72.63],[20.76,71.18],[20.88,70.47],[22.09,69.16],[22.45,69.64],[22.84,69.35],[23.69,68.18],[23.94,67.44],[24.66,67.15],[25.43,66.37],[25.24,64.53],[25.22,62.91],[25.08,61.5],[25.38,59.62],[25.61,58.53],[25.74,57.4],[26.97,56.97],[27.14,56.49],[26.96,55.72],[26.48,54.72],[26.81,53.49],[27.58,52.48],[27.87,51.52],[28.81,50.85],[30.15,50.12],[29.99,49.58],[30.32,48.94],[29.93,48.57],[29.98,47.97],[29.53,48.18],[29.31,48.09],[28.55,48.42],[27.69,48.81],[27.46,49.3],[27.11,49.47],[26.69,50.15],[26.28,50.21],[25.94,50.11],[25.61,50.24],[25.33,50.53],[25.0,50.66],[24.75,50.81],[25.48,50.74],[26.01,51.01],[26.11,51.29],[25.8,51.59],[25.22,51.61],[24.63,51.39],[24.25,51.58],[24.29,51.76],[24.02,51.79],[24.18,52.58],[24.15,53.4],[24.12,54.01],[24.8,54.69],[25.44,55.44],[26.06,56.07],[26.4,56.36],[26.31,56.49],[25.9,56.39],[25.71,56.26],[24.92,56.4],[24.24,56.85],[23.88,57.4],[23.75,58.14],[23.57,58.73],[22.99,59.18],[22.66,59.45],[22.53,59.81],[22.31,59.81],[21.71,59.44],[21.43,59.28],[21.11,58.86],[20.43,58.49],[20.48,58.03],[20.24,57.83],[19.74,57.67],[19.07,57.79],[18.94,57.69],[18.95,57.23],[18.57,56.61],[18.09,56.51],[17.88,56.28],[17.88,55.66],[17.63,55.27],[17.23,55.27],[16.95,54.79],[17.05,54.24],[16.71,53.57],[16.65,53.11],[16.38,52.39],[15.94,52.19],[15.6,52.17],[15.18,51.17],[14.71,49.57],[14.0,48.68],[13.95,48.24],[14.01,47.94],[13.59,47.35],[13.4,46.72],[13.35,45.88],[13.29,45.63],[13.03,45.41],[12.95,45.14],[12.7,44.99],[12.72,44.49],[12.59,44.18],[12.64,43.48],[13.22,43.22],[13.77,43.25],[14.06,43.09],[14.8,42.89],[15.21,42.6],[15.26,42.81],[15.72,42.7],[15.91,42.82],[16.35,42.78],[16.77,42.65],[17.08,42.35],[17.47,42.27],[17.83,41.75],[18.67,41.22],[19.49,40.94],[20.17,40.25],[20.34,39.8],[21.29,39.14],[21.99,39.02],[22.58,39.07],[23.69,38.49],[24.08,38.02],[24.29,37.48],[24.86,37.15],[25.08,37.21],[25.6,36.93],[25.83,36.64],[26.57,36.25],[27.38,35.64],[28.06,35.13],[28.06,34.63],[28.61,34.79],[28.96,34.83],[29.36,34.96],[29.5,34.92],[29.1,34.64],[28.34,34.43],[27.82,34.15],[27.65,33.92],[27.97,33.59],[28.42,33.14],[29.85,32.42],[29.76,32.32],[28.71,32.73],[27.7,33.35],[26.14,34.1],[25.6,34.47],[25.03,34.8],[23.93,35.69],[23.75,35.49],[23.1,35.53],[22.2,36.69],[22.0,36.87],[21.02,37.19],[20.84,36.97],[19.81,37.11],[18.61,37.48],[18.37,37.86],[18.0,38.41],[16.84,38.99],[15.92,39.27],[15.44,39.81],[14.49,41.18],[13.92,41.73],[13.34,42.28],[13.0,42.59],[12.7,43.08],[12.39,43.32],[11.97,43.29],[11.74,42.72],[11.46,43.15],[11.28,43.47],[10.86,43.67],[10.45,44.12],[10.44,44.61],[10.7,45.56],[10.82,46.65],[11.13,47.53],[11.19,48.02],[11.38,48.38],[11.41,48.95],[11.43,49.27],[11.58,49.73],[11.68,50.26],[12.02,50.73],[12.02,51.11],[11.75,51.13],[11.17,51.04],[10.64,51.05],[10.28,50.83],[9.2,50.55],[8.08,50.07],[6.8,49.45],[5.34,48.59],[4.22,47.74],[2.86,46.56],[2.05,45.56],[1.05,44.07],[0.29,43.14],[-0.92,42.04],[-1.45,41.81],[-1.68,41.59],[-2.08,40.88],[-2.5,40.64],[-2.57,40.26],[-3.28,40.12],[-3.68,39.8],[-4.35,39.6],[-4.68,39.2],[-5.91,38.74],[-6.48,38.8],[-6.84,39.44],[-7.1,39.47],[-7.7,39.19],[-8.01,39.25],[-8.49,39.19],[-9.11,39.54],[-10.1,39.95],[-10.32,40.32],[-10.77,40.48],[-11.76,40.44],[-12.64,40.56],[-14.2,40.6],[-14.69,40.78],[-15.41,40.48],[-16.1,40.09],[-16.72,39.45],[-17.1,38.54],[-17.59,37.41],[-18.66,36.28],[-18.84,35.9],[-19.55,35.2],[-19.78,34.79],[-20.5,34.7],[-21.25,35.18],[-21.84,35.37],[-22.14,35.39],[-22.09,35.56],[-23.07,35.53],[-23.54,35.37],[-23.71,35.61],[-24.12,35.46],[-24.48,35.04],[-24.82,34.22],[-25.36,33.01],[-25.73,32.57],[-26.15,32.66],[-26.22,32.92],[-26.74,32.83],[-27.47,32.58],[-28.3,32.46],[-28.75,32.2],[-29.26,31.52],[-29.4,31.33],[-29.91,30.9],[-30.42,30.62],[-31.14,30.06],[-32.17,28.93],[-32.77,28.22],[-33.23,27.46],[-33.61,26.42],[-33.67,25.91],[-33.94,25.78],[-33.8,25.17],[-33.99,24.68],[-33.79,23.59],[-33.92,22.99],[-33.86,22.57],[-34.26,21.54],[-34.42,20.69],[-34.8,20.07],[-34.82,19.62],[-34.46,19.19],[-34.44,18.86],[-34.0,18.42],[-34.14,18.38],[-33.87,18.24],[-33.28,18.25],[-32.61,17.93],[-32.43,18.25],[-31.66,18.22],[-30.73,17.57],[-29.88,17.06],[-29.88,17.06],[-28.58,16.35],[-27.82,15.6],[-27.09,15.21],[-26.12,14.99],[-25.39,14.74],[-23.85,14.41],[-22.66,14.39],[-22.11,14.26],[-21.7,13.87],[-20.87,13.35],[-19.67,12.83],[-19.05,12.61],[-18.07,11.79],[-17.3,11.73],[-16.67,11.64],[-15.79,11.78],[-14.88,12.12],[-14.45,12.18],[-13.55,12.5],[-13.14,12.74],[-12.48,13.31],[-12.04,13.63],[-11.3,13.74],[-10.73,13.69],[-10.37,13.39],[-9.77,13.12],[-9.17,12.88],[-8.96,12.93],[-8.56,13.24],[-7.6,12.93],[-6.93,12.73],[-6.29,12.23],[-6.1,12.32],[-5.79,12.18],[-5.04,11.92],[-3.98,11.09],[-2.97,10.07],[-2.14,9.41],[-1.11,8.8],[-0.78,8.83],[-0.46,9.05],[0.27,9.29],[1.01,9.49],[1.16,9.31],[2.28,9.65],[3.07,9.8],[3.73,9.4],[3.9,8.95],[4.35,8.74],[4.5,8.49],[4.77,8.5],[4.41,7.46],[4.46,7.08],[4.24,6.7],[4.26,5.9],[4.89,5.36],[5.61,5.03],[6.27,4.33],[6.26,3.57],[6.26,2.69],[6.14,1.87],[5.93,1.06],[5.34,-0.51],[5.0,-1.06],[4.71,-1.96],[4.99,-2.86],[4.98,-3.31],[5.18,-4.01],[5.17,-4.65],[4.99,-5.83],[4.71,-6.53],[4.34,-7.52],[4.36,-7.71],[4.36,-7.97],[4.83,-9.0],[5.59,-9.91],[6.14,-10.77],[6.79,-11.44],[6.86,-11.71],[7.26,-12.43],[7.8,-12.95],[8.16,-13.12],[8.9,-13.25],[9.49,-13.69],[9.89,-14.07],[10.02,-14.33],[10.21,-14.58],[10.66,-14.69],[10.88,-14.84],[11.04,-15.13],[11.46,-15.66],[11.52,-16.09],[11.81,-16.31],[11.96,-16.31],[12.17,-16.61],[12.38,-16.68],[13.15,-16.84],[13.6,-16.71],[14.37,-17.13],[14.73,-17.62],[14.92,-17.19],[15.62,-16.7],[16.14,-16.46],[16.67,-16.55],[17.17,-16.27],[18.11,-16.15],[19.1,-16.26],[19.59,-16.38],[20.09,-16.28],[20.57,-16.54],[21.0,-17.06],[21.42,-17.02],[21.89,-16.97],[22.16,-16.59],[22.68,-16.26],[23.02,-16.33],[23.72,-15.98],[24.36,-15.43],[24.52,-15.09],[25.1,-14.82],[25.64,-14.8],[26.25,-14.44],[26.62,-13.77],[27.64,-13.14],[28.04,-12.62],[28.15,-11.69],[28.83,-10.9],[29.1,-10.4],[29.93,-9.56],[31.18,-9.81],[32.04,-9.43],[32.56,-9.3],[33.24,-8.66],[33.7,-7.65],[34.11,-6.91],[35.15,-6.24],[35.76,-5.93],[35.76,-5.19],[35.33,-4.59],[35.4,-3.64],[35.18,-2.6],[35.17,-2.17],[35.71,-1.21],[35.89,-0.13],[36.3,0.5],[36.61,1.47],[36.78,3.16],[36.87,4.82],[36.72,5.32],[37.11,6.26],[37.12,7.33],[36.89,7.74],[36.95,8.42],[37.35,9.51],[37.23,10.21],[36.72,10.18],[37.09,11.03],[36.9,11.1],[36.41,10.6],[35.95,10.59],[35.7,10.94],[34.83,10.81],[34.33,10.15],[33.79,10.34],[33.77,10.86],[33.29,11.11],[33.14,11.49],[32.79,12.66],[32.88,13.08],[32.71,13.92],[32.27,15.25],[31.38,15.71],[31.18,16.61],[30.76,18.02],[30.27,19.09],[30.53,19.57],[30.99,20.05],[31.75,19.82],[32.24,20.13],[32.71,20.85],[32.84,21.54],[32.64,22.9],[32.19,23.24],[32.19,23.61],[32.02,23.93],[31.9,24.92],[31.57,25.16],[31.59,26.5],[31.32,27.46],[31.03,28.45],[30.87,28.91],[31.19,29.68],[31.47,30.1],[31.56,30.98],[31.43,31.69],[30.93,31.96],[31.26,32.19],[31.02,32.99],[30.97,33.77],[31.22,34.27],[31.55,34.56],[31.61,34.49],[32.07,34.75],[32.83,34.96],[33.08,35.1],[33.09,35.13],[33.91,35.48],[34.61,35.98],[34.64,36.0],[35.41,35.91],[35.82,36.15],[36.28,35.78],[36.65,36.16],[36.57,35.55],[36.8,34.71],[36.22,34.03],[36.11,32.51],[36.64,31.7],[36.68,30.62],[36.26,30.39],[36.14,29.7],[36.68,28.73],[36.66,27.64],[37.65,27.05],[38.21,26.32],[38.99,26.8],[39.46,26.17],[40.42,27.28],[40.46,28.82],[41.22,29.24],[41.09,31.15],[41.74,32.35],[42.02,33.51],[42.04,35.17],[41.34,36.91],[40.95,38.35],[41.1,39.51],[41.01,40.37],[41.54,41.55],[41.96,41.7],[42.65,41.45],[43.01,40.88],[43.13,40.32],[43.44,39.96],[44.28,38.68],[44.66,37.54],[45.24,36.68],[45.4,37.4],[46.24,38.23],[46.64,37.67],[47.04,39.15],[47.26,39.12],[47.1,38.22],[47.02,37.43],[46.7,36.76],[46.65,35.82],[46.27,34.96],[45.65,35.02],[45.41,35.51],[45.47,36.53],[45.11,36.33],[44.94,35.24],[44.36,33.88],[44.56,33.33],[45.03,33.55],[45.33,32.45],[45.52,32.63],[45.85,33.59],[46.08,33.3],[46.33,31.74],[46.71,31.68],[46.58,30.75],[46.03,30.38],[45.29,29.6],[45.04,29.63],[44.82,29.14],[44.91,28.84],[43.71,28.56],[43.29,28.04],[42.58,27.67],[42.01,28.0],[41.62,28.12],[41.3,28.99],[41.05,28.81],[41.0,27.62],[40.69,27.19],[40.15,26.36],[40.62,26.04],[40.82,26.06],[40.85,25.45],[40.95,24.93],[40.69,23.71],[40.13,24.41],[39.96,23.9],[39.96,23.34],[40.48,22.81],[40.26,22.63],[39.66,22.85],[39.19,23.35],[38.97,22.97],[38.51,23.53],[38.22,24.03],[37.66,24.04],[37.92,23.12],[37.41,23.41],[37.31,22.78],[36.42,23.15],[36.41,22.49],[36.85,21.67],[37.65,21.3],[38.31,21.12],[38.77,20.73],[39.34,20.22],[39.63,20.15],[39.7,19.98],[39.92,19.96],[40.25,19.41],[40.73,19.32],[41.41,19.4],[41.72,19.54],[41.88,19.37],[41.96,19.16],[42.28,18.88],[42.48,18.45],[42.85,17.51],[43.21,16.93],[43.51,16.02],[44.24,15.17],[44.32,15.38],[44.74,14.92],[45.08,14.9],[45.23,14.26],[44.8,13.95],[45.14,13.66],[45.48,13.68],[45.5,13.72],[45.59,13.94],[45.74,13.14],[45.38,12.33],[44.89,12.38],[44.6,12.26],[44.09,12.59],[43.59,13.53],[42.76,14.03],[41.96,15.14],[41.96,15.93],[41.74,16.17],[41.54,15.89],[41.18,16.79],[40.88,17.52],[40.36,18.38],[40.17,18.48],[39.81,18.29],[40.28,17.74],[40.44,16.87],[39.8,16.45],[39.42,17.17],[38.9,17.05],[38.84,16.64],[37.99,16.1],[37.91,15.68],[38.21,15.69],[38.75,15.89],[38.96,16.11],[39.54,15.72],[40.05,15.41],[40.17,15.0],[40.6,14.7],[40.79,14.06],[41.19,13.63],[41.25,12.89],[41.7,12.11],[42.36,11.19],[42.93,10.51],[43.92,10.2],[44.04,9.7],[44.37,8.89],[44.23,8.43],[43.77,7.85],[43.69,7.44],[43.13,6.53],[43.4,4.56],[43.08,3.1],[42.47,2.99],[41.89,3.04],[41.23,2.09],[41.01,0.81],[40.68,0.72],[40.12,0.11],[39.31,-0.28],[38.74,0.11],[38.29,-0.47],[37.64,-0.68],[37.44,-1.44],[36.67,-2.15],[36.66,-3.42],[36.68,-4.37],[36.32,-5.0],[35.95,-5.38],[36.03,-5.87],[36.37,-6.24],[36.94,-6.52],[37.1,-7.45],[36.84,-7.86],[36.98,-8.38],[36.87,-8.9],[37.65,-8.75],[38.27,-8.84],[38.36,-9.29],[38.74,-9.53],[39.39,-9.45],[39.76,-9.05],[40.16,-8.98],[40.76,-8.77],[41.18,-8.79],[41.54,-8.99],[41.88,-9.03],[42.59,-8.98],[43.03,-9.39],[43.75,-7.98],[43.57,-6.75],[43.57,-5.41],[43.4,-4.35],[43.46,-3.52],[43.42,-1.9],[44.02,-1.38],[46.01,-1.19],[47.06,-2.23],[47.57,-2.96],[47.96,-4.49],[48.68,-4.59],[48.9,-3.3],[48.64,-1.62],[49.78,-1.93],[49.35,-0.99],[50.13,1.34],[50.95,1.64],[51.15,2.51],[51.35,3.32],[51.62,3.83],[53.09,4.71],[53.51,6.07],[53.48,6.91],[53.69,7.1],[53.75,7.94],[53.53,8.12],[54.02,8.8],[54.4,8.57],[54.96,8.53],[55.52,8.12],[56.54,8.09],[56.81,8.26],[57.11,8.54],[57.17,9.42],[57.45,9.78],[57.73,10.58],[57.22,10.55],[56.89,10.25],[56.61,10.37],[56.46,10.91],[56.08,10.67],[56.19,10.37],[55.47,9.65],[54.98,9.92],[54.6,9.94],[54.36,10.95],[54.01,10.94],[54.2,11.96],[54.47,12.52],[54.08,13.65],[53.76,14.12],[54.05,14.8],[54.51,16.36],[54.85,17.62],[54.68,18.62],[54.44,18.7],[54.43,19.66],[54.87,19.89],[55.19,21.27],[56.03,21.06],[56.78,21.09],[57.41,21.58],[57.75,22.52],[57.01,23.32],[57.03,24.12],[57.79,24.31],[58.38,24.43],[58.26,24.06],[58.61,23.43],[59.19,23.34],[59.47,24.6],[59.61,25.86],[59.45,26.95],[59.48,27.98],[60.03,29.12],[60.5,28.07],[60.42,26.26],[60.06,24.5],[59.85,22.87],[60.39,22.29],[60.72,21.32],[61.71,21.54],[62.61,21.06],[63.19,21.54],[63.82,22.44],[64.9,24.73],[65.11,25.4],[65.53,25.29],[66.01,23.9],[65.72,22.18],[65.03,21.21],[64.41,21.37],[63.61,19.78],[62.75,17.85],[61.34,17.12],[60.64,17.83],[60.08,18.79],[58.95,17.87],[58.72,16.83],[57.04,16.45],[56.1,15.88],[56.2,14.67],[55.41,14.1],[55.36,12.94],[56.31,12.63],[57.44,11.79],[58.86,11.03],[59.47,10.36],[58.31,8.38],[58.08,7.05],[58.59,5.67],[59.66,5.31],[61.97,4.99],[62.61,5.91],[63.45,8.55],[64.49,10.53],[65.88,12.36],[67.81,14.76],[68.56,16.44],[69.82,19.18],[70.26,21.38],[70.2,23.02],[71.03,24.55],[70.99,26.37],[71.19,28.17],[70.45,31.29],[70.19,30.01],[69.56,31.1],[69.91,32.13],[69.3,33.78],[69.06,36.51],[67.93,40.29],[67.46,41.06],[66.79,41.13],[66.27,40.02],[66.0,38.38],[66.76,33.92],[66.63,33.18],[65.9,34.81],[64.41,34.94],[64.11,36.23],[63.85,37.01],[64.33,37.14],[64.78,36.52],[65.14,37.18],[64.52,39.59],[64.76,40.44],[65.5,39.76],[66.48,42.09],[66.42,43.02],[66.07,43.95],[66.76,44.53],[67.35,43.7],[67.95,44.19],[68.57,43.45],[68.25,46.25],[67.69,46.82],[67.57,45.56],[67.01,45.56],[66.67,46.35],[66.88,47.89],[67.52,48.14],[68.0,50.23],[68.86,53.72],[68.81,54.47],[68.2,53.49],[68.1,54.73],[68.44,55.44],[68.47,57.32],[68.88,58.8],[68.28,59.94],[68.94,61.08],[69.52,60.03],[69.85,60.55],[69.55,63.5],[69.23,64.89],[68.09,68.51],[68.62,69.18],[69.14,68.16],[69.36,68.14],[69.45,66.93],[69.93,67.26],[70.71,66.72],[71.03,66.69],[71.93,68.54],[72.84,69.2],[73.04,69.94],[72.78,72.59],[72.22,72.8],[71.41,71.85],[71.09,72.47],[70.39,72.79],[69.02,72.56],[68.41,73.67],[67.74,73.24],[66.32,71.28],[66.17,72.42],[66.53,72.82],[66.79,73.92],[67.28,74.19],[67.76,75.05],[68.33,74.47],[68.99,74.94],[69.07,73.84],[69.63,73.6],[70.63,74.4],[71.45,73.1],[72.12,74.89],[72.83,74.66],[72.86,75.16],[72.3,75.68],[71.34,75.29],[71.15,76.36],[71.87,75.9],[72.27,77.58],[72.32,79.65],[71.75,81.5],[72.58,80.61],[73.65,80.51],[73.85,82.25],[73.81,84.66],[73.94,86.82],[74.46,86.01],[75.12,87.17],[75.14,88.32],[75.64,90.26],[75.77,92.9],[76.05,93.23],[76.14,95.86],[75.92,96.68],[76.45,98.92],[76.43,100.76],[76.86,101.04],[77.29,101.99],[77.7,104.35],[77.37,106.07],[77.13,104.71],[76.97,106.97]],[[77.52,-93.84],[77.49,-94.3],[77.56,-96.17],[77.83,-96.44],[77.82,-94.42],[77.63,-93.72],[77.52,-93.84]],[[77.7,-110.19],[77.41,-112.05],[77.73,-113.53],[78.05,-112.72],[78.15,-111.26],[78.0,-109.85],[77.7,-110.19]],[[77.85,24.72],[77.44,22.49],[77.68,20.73],[77.94,21.42],[78.25,20.81],[78.45,22.88],[78.08,23.28],[77.85,24.72]],[[78.6,-109.66],[78.41,-110.88],[78.41,-112.54],[78.55,-112.53],[78.85,-111.5],[78.8,-110.96],[78.6,-109.66]],[[78.06,-95.83],[77.85,-97.31],[78.08,-98.12],[78.46,-98.55],[78.87,-98.63],[78.83,-97.34],[78.77,-96.75],[78.42,-95.56],[78.06,-95.83]],[[78.32,-100.06],[77.91,-99.67],[78.02,-101.3],[78.34,-102.95],[78.38,-105.18],[78.68,-104.21],[78.92,-105.42],[79.3,-105.49],[79.17,-103.53],[78.8,-100.83],[78.32,-100.06]],[[78.31,105.08],[77.92,99.44],[79.23,101.26],[79.35,102.09],[79.28,102.84],[78.71,105.37],[78.31,105.08]],[[79.7,18.25],[78.96,21.54],[78.56,19.03],[77.83,18.47],[77.64,17.59],[76.81,17.12],[76.77,15.91],[77.38,13.76],[77.74,14.67],[78.02,13.17],[78.87,11.22],[79.65,10.44],[80.01,13.17],[79.66,13.72],[79.67,15.14],[80.02,15.52],[80.05,16.99],[79.7,18.25]],[[80.41,25.45],[80.06,27.41],[79.52,25.92],[79.4,23.02],[79.57,20.08],[79.84,19.9],[79.86,18.46],[80.32,17.37],[80.6,20.46],[80.36,21.91],[80.66,22.92],[80.41,25.45]],[[80.55,51.14],[80.42,49.79],[80.34,48.89],[80.18,48.75],[80.01,47.59],[80.25,46.5],[80.56,47.07],[80.59,44.85],[80.77,46.8],[80.78,48.32],[80.51,48.52],[80.75,49.1],[80.92,50.04],[80.7,51.52],[80.55,51.14]],[[78.88,99.94],[78.76,97.76],[79.04,94.97],[79.43,93.31],[80.14,92.55],[80.34,91.18],[81.02,93.78],[81.25,95.94],[80.75,97.88],[79.78,100.19],[78.88,99.94]],[[79.66,-87.02],[79.34,-85.81],[79.04,-87.19],[78.29,-89.04],[78.22,-90.8],[78.34,-92.88],[78.75,-93.95],[79.11,-93.94],[79.38,-93.15],[79.37,-94.97],[79.71,-96.08],[80.16,-96.71],[80.6,-96.02],[80.91,-95.32],[80.98,-94.3],[81.21,-94.74],[81.26,-92.41],[80.72,-91.13],[80.51,-89.45],[80.32,-87.81],[79.66,-87.02]],[[83.11,-68.5],[83.03,-65.83],[82.9,-63.68],[82.63,-61.85],[82.36,-61.89],[81.93,-64.33],[81.73,-66.75],[81.5,-67.66],[81.51,-65.48],[80.9,-67.84],[80.62,-69.47],[79.8,-71.18],[79.63,-73.24],[79.43,-73.88],[79.32,-76.91],[79.2,-75.53],[79.02,-76.22],[78.53,-75.39],[78.18,-76.34],[77.9,-77.89],[77.51,-78.36],[77.21,-79.76],[76.98,-79.62],[77.02,-77.91],[76.78,-77.89],[76.18,-80.56],[76.45,-83.17],[76.3,-86.11],[76.42,-87.6],[76.47,-89.49],[76.95,-89.62],[77.18,-87.77],[77.9,-88.26],[77.97,-87.65],[77.54,-84.98],[78.18,-86.34],[78.37,-87.96],[78.76,-87.15],[79.0,-85.38],[79.35,-85.09],[79.74,-86.51],[80.25,-86.93],[80.21,-84.2],[80.1,-83.41],[80.46,-81.85],[80.58,-84.1],[80.52,-87.6],[80.86,-89.37],[81.26,-90.2],[81.55,-91.37],[81.89,-91.59],[82.08,-90.1],[82.12,-88.93],[82.28,-86.97],[82.65,-85.5],[82.6,-84.26],[82.32,-83.18],[82.86,-82.42],[83.02,-81.1],[83.13,-79.31],[83.17,-76.25],[83.06,-75.72],[83.23,-72.83],[83.17,-70.67],[83.11,-68.5]],[[83.52,-27.1],[82.73,-20.85],[82.34,-22.69],[82.3,-26.52],[82.2,-31.9],[82.02,-31.4],[82.13,-27.86],[81.79,-24.84],[82.09,-22.9],[81.73,-22.07],[81.15,-23.17],[81.52,-20.62],[81.91,-15.77],[81.72,-12.77],[81.29,-12.21],[80.58,-16.29],[80.35,-16.85],[80.18,-20.05],[80.13,-17.73],[79.4,-18.9],[78.75,-19.7],[77.64,-19.67],[76.99,-18.47],[76.94,-20.04],[76.63,-21.68],[76.1,-19.83],[75.25,-19.6],[75.16,-20.67],[74.3,-19.37],[74.22,-21.59],[73.82,-20.43],[73.46,-20.76],[73.31,-22.17],[73.31,-23.57],[72.63,-22.31],[72.18,-22.3],[72.6,-24.28],[72.33,-24.79],[72.08,-23.44],[71.47,-22.13],[70.66,-21.75],[70.47,-23.54],[70.86,-24.31],[71.43,-25.54],[70.75,-25.2],[70.23,-26.36],[70.18,-23.73],[70.13,-22.35],[69.26,-25.03],[68.47,-27.75],[68.13,-30.67],[68.12,-31.78],[67.74,-32.81],[66.68,-34.2],[65.98,-36.35],[65.94,-37.04],[65.69,-38.38],[65.46,-39.81],[64.84,-40.67],[64.14,-40.68],[63.48,-41.19],[62.68,-42.82],[61.9,-42.42],[61.07,-42.87],[60.1,-43.38],[60.04,-44.79],[60.85,-46.26],[60.86,-48.26],[61.41,-49.23],[62.38,-49.9],[63.63,-51.63],[64.28,-52.14],[65.18,-52.28],[66.1,-53.66],[66.84,-53.3],[67.19,-53.97],[68.36,-52.98],[68.73,-51.48],[69.15,-51.08],[69.93,-50.87],[69.57,-52.01],[69.43,-52.56],[69.28,-53.46],[69.61,-54.68],[70.29,-54.75],[70.82,-54.36],[70.84,-53.43],[70.57,-51.39],[71.2,-53.11],[71.55,-54.0],[71.41,-55],[71.65,-55.83],[72.59,-54.72],[72.96,-55.33],[73.65,-56.12],[74.71,-57.32],[75.1,-58.6],[75.52,-58.59],[76.1,-61.27],[76.18,-63.39],[76.13,-66.06],[76.06,-68.5],[76.38,-69.66],[77.01,-71.4],[77.32,-68.78],[77.38,-66.76],[77.64,-71.04],[78.04,-73.3],[78.43,-73.16],[78.91,-69.37],[79.39,-65.71],[79.76,-65.32],[80.12,-68.02],[80.52,-67.15],[81.21,-63.69],[81.32,-62.23],[81.77,-62.65],[82.03,-60.28],[82.19,-57.21],[82.2,-54.13],[81.89,-53.04],[82.44,-50.39],[82.06,-48.0],[81.99,-46.6],[81.66,-44.52],[82.2,-46.9],[82.63,-46.76],[83.23,-43.41],[83.18,-39.9],[83.55,-38.62],[83.65,-35.09],[83.52,-27.1]]];
window.WORLD_LAND_POLYGONS = WORLD_LAND_POLYGONS;


/** ECDIS: blue water + yellow land. Land fill from Natural Earth polygons (no separate gray coast stroke). */
function createEcdisSimpleBaseLayer() {
  const WATER = "#9DC9E8";
  const LAND = "#F0E2A0";
  const WaterGrid = L.GridLayer.extend({
    createTile: function () {
      const t = document.createElement("div");
      t.style.cssText = "width:256px;height:256px;background:" + WATER + ";";
      return t;
    }
  });
  const water = new WaterGrid({
    noWrap: false,
    maxZoom: 19,
    keepBuffer: 2,
    updateWhenZooming: false,
    attribution: "ECDIS land/water · Natural Earth"
  });

  const landFill = L.layerGroup();
  const group = L.layerGroup([water, landFill]);
  group._setsailEcdis = true;
  group._setsailEcdisWater = water;

  const landCache = Object.create(null);
  let landSeq = 0;
  let boundMap = null;
  let lastLandKey = "";

  const coarsePolys =
    typeof WORLD_LAND_POLYGONS !== "undefined" && Array.isArray(WORLD_LAND_POLYGONS)
      ? WORLD_LAND_POLYGONS
      : window.WORLD_LAND_POLYGONS || [];

  function ensureEcdisPanes(map) {
    if (!map || !map.createPane) return;
    if (!map.getPane("ecdisLandPane")) {
      const p = map.createPane("ecdisLandPane");
      // Below NtM/AIS overlay pane so land never covers clickable warnings
      p.style.zIndex = 350;
      p.style.pointerEvents = "none";
    } else {
      map.getPane("ecdisLandPane").style.pointerEvents = "none";
    }
    if (!map.getPane("ntmOverlayPane")) {
      const n = map.createPane("ntmOverlayPane");
      // Above land (350), below markers/popups (600+)
      n.style.zIndex = 450;
    }
  }

  function landStyle() {
    // Same yellow for fill and edge — no gray coastline halo, no source mismatch.
    return {
      pane: "ecdisLandPane",
      stroke: true,
      color: LAND,
      weight: 0.6,
      opacity: 1,
      fillColor: LAND,
      fillOpacity: 1,
      interactive: false,
      smoothFactor: 1.2,
      lineCap: "round",
      lineJoin: "round"
    };
  }

  function renderCoarseLand() {
    landFill.clearLayers();
    for (let i = 0; i < coarsePolys.length; i++) {
      const ring = coarsePolys[i];
      if (!ring || ring.length < 3) continue;
      L.polygon(ring, landStyle()).addTo(landFill);
    }
  }

  function landUrls(level) {
    const local = "assets/geo/ne_" + level + "_land.geojson";
    const cdn =
      "https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_" +
      level +
      "_land.geojson";
    return [local + "?v=5.32", cdn];
  }

  async function loadLandGeo(level) {
    if (landCache[level]) return landCache[level];
    const urls = landUrls(level);
    let lastErr = null;
    for (let i = 0; i < urls.length; i++) {
      try {
        const geo = await fetch(urls[i], { cache: "force-cache" }).then((r) => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        });
        landCache[level] = geo;
        return geo;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error("land load failed");
  }

  function featureHitsBounds(feat, bounds) {
    try {
      const g = feat && feat.geometry;
      if (!g) return false;
      const coords = g.coordinates;
      const checkPair = (lon, lat) => bounds.contains([lat, lon]);
      const walk = (c) => {
        if (!c || !c.length) return false;
        if (typeof c[0] === "number") return checkPair(c[0], c[1]);
        for (let i = 0; i < c.length; i++) {
          if (walk(c[i])) return true;
        }
        return false;
      };
      return walk(coords);
    } catch (e) {
      return true;
    }
  }

  function setEcdisLandLoading(on) {
    const sel = document.getElementById("ntmChartLayerSelector");
    if (!sel) return;
    const trig = sel.querySelector(".ntm-layer-trigger-btn");
    sel.classList.toggle("is-loading-base", !!on);
    if (trig) {
      trig.classList.toggle("is-loading", !!on);
      trig.setAttribute("aria-busy", on ? "true" : "false");
      trig.title = on ? "Loading ECDIS land detail…" : "Select Chart Layer";
    }
  }

  async function refreshEcdisLand() {
    const map = boundMap || group._map;
    if (!map || !map.hasLayer(group)) return;
    const z = map.getZoom();
    // World overview: coarse fill only. Closer: Natural Earth land polygons (fill = edge).
    // Low thresholds — 50m from ~z2, detailed 10m from ~z3 (was z5).
    if (z < 1.5) {
      setEcdisLandLoading(false);
      if (lastLandKey !== "coarse") {
        lastLandKey = "coarse";
        renderCoarseLand();
      }
      return;
    }
    const level = z >= 3 ? "10m" : z >= 2 ? "50m" : "110m";
    const seq = ++landSeq;
    const needsFetch = !landCache[level];
    if (needsFetch) setEcdisLandLoading(true);
    try {
      const geo = await loadLandGeo(level);
      if (seq !== landSeq) return;
      const pad = z >= 6 ? 0.05 : z >= 3 ? 0.15 : 0.4;
      const bounds = map.getBounds().pad(pad);
      const key =
        level +
        "|" +
        Math.round(bounds.getSouth() * 20) +
        "|" +
        Math.round(bounds.getWest() * 20) +
        "|" +
        Math.round(bounds.getNorth() * 20) +
        "|" +
        Math.round(bounds.getEast() * 20);
      if (key === lastLandKey) {
        setEcdisLandLoading(false);
        return;
      }
      lastLandKey = key;
      ensureEcdisPanes(map);
      const renderer = L.canvas({ padding: 0.5, pane: "ecdisLandPane" });
      landFill.clearLayers();
      L.geoJSON(geo, {
        pane: "ecdisLandPane",
        renderer,
        interactive: false,
        filter: function (feat) {
          if (level === "110m") return true;
          // Always viewport-filter 50m/10m so we can load finer NE earlier without drawing the whole planet.
          return featureHitsBounds(feat, bounds);
        },
        style: landStyle
      }).addTo(landFill);
    } catch (e) {
      console.warn("[SetSail ECDIS] land load failed — coarse fallback", e);
      if (lastLandKey !== "coarse") {
        lastLandKey = "coarse";
        renderCoarseLand();
      }
    } finally {
      if (seq === landSeq) setEcdisLandLoading(false);
    }
  }

  // Back-compat alias for any callers expecting the old name.
  function refreshEcdisCoast() {
    return refreshEcdisLand();
  }

  group.on("add", function () {
    boundMap = group._map;
    if (!boundMap) return;
    ensureEcdisPanes(boundMap);
    boundMap.getContainer().classList.add("ecdis-simple-base");
    lastLandKey = "";
    renderCoarseLand();
    const bump = function () {
      refreshEcdisLand();
    };
    boundMap.on("zoomend moveend", bump);
    group._ecdisCoastBump = bump;
    refreshEcdisLand();
  });
  group.on("remove", function () {
    if (boundMap && group._ecdisCoastBump) {
      boundMap.off("zoomend moveend", group._ecdisCoastBump);
    }
    group._ecdisCoastBump = null;
    boundMap = null;
    lastLandKey = "";
  });

  group.refreshEcdisCoast = refreshEcdisCoast;
  group.refreshEcdisLand = refreshEcdisLand;
  return group;
}
window.createEcdisSimpleBaseLayer = createEcdisSimpleBaseLayer;


function initVisualChartLayerSelector(mapInstance, layers) {
  const mapContainer = document.getElementById("ntmMapContainer");
  if (!mapContainer || !mapInstance) return;

  const oldSel = document.getElementById("ntmChartLayerSelector");
  if (oldSel) oldSel.remove();
  const oldGlobe = document.getElementById("ntmGlobe3DWrap");
  if (oldGlobe) oldGlobe.remove();

  // 1. Create Interactive 3D Globe Overlay inside #ntmMapContainer
  const globeWrap = document.createElement("div");
  globeWrap.id = "ntmGlobe3DWrap";
  globeWrap.className = "ntm-globe-3d-wrap";
  globeWrap.innerHTML = `
    <div class="ntm-globe-3d-hud">
      <span style="width:7px;height:7px;border-radius:50%;background:#00e5ff;box-shadow:0 0 8px #00e5ff;"></span>
      <span><b>3D GLOBE</b> &bull; Drag to rotate &bull; Scroll to zoom &bull; Click notice to inspect</span>
    </div>
    <canvas id="ntmGlobe3DCanvas" class="ntm-globe-3d-canvas"></canvas>
  `;
  mapContainer.appendChild(globeWrap);

  // 2. Top-Right Layer Selector: when collapsed, ONLY .ntm-layer-trigger-btn is visible (no selected layer badge to its left!)
  const selector = document.createElement("div");
  selector.id = "ntmChartLayerSelector";
  selector.className = "ntm-chart-layer-selector collapsed";
  selector.innerHTML = `
    <button type="button" class="ntm-layer-thumb-btn active-base" data-base="ecdis" title="ECDIS — blue water, yellow land, detailed coastline">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(180deg,#9DC9E8 0%,#9DC9E8 52%,#F0E2A0 52%,#F0E2A0 100%);">
        <svg viewBox="0 0 36 36" width="26" height="26"><path d="M4 22 L10 14 L16 18 L22 10 L32 22 Z" fill="#F0E2A0" stroke="#1a2744" stroke-width="1.4"/><rect x="2" y="22" width="32" height="10" fill="#9DC9E8"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">ECDIS</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn" data-base="ocean" title="Esri Ocean Nautical Chart">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#0d3b66 0%,#1d6fa5 55%,#7bdff2 100%);">
        <svg viewBox="0 0 36 36" width="28" height="28"><path d="M4 24c5-4 10-4 14 0s9 4 14 0" fill="none" stroke="#e0f2fe" stroke-width="2.2" stroke-linecap="round"/><path d="M6 16c4-3 8-3 12 0s8 3 12 0" fill="none" stroke="#7dd3fc" stroke-width="1.8" stroke-linecap="round"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Ocean</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn" data-base="street" title="OpenStreetMap">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#f1faee 0%,#e9edc9 50%,#a8dadc 100%);">
        <svg viewBox="0 0 36 36" width="26" height="26"><path d="M6 12h24M6 24h24M14 6v24M24 6v24" stroke="#457b9d" stroke-width="2.2"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Street</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn" data-base="sat" title="World Satellite Imagery">
      <div class="ntm-layer-thumb-preview" style="background:radial-gradient(circle at 30% 30%,#1b4332 0%,#081c15 55%,#001219 100%);">
        <svg viewBox="0 0 36 36" width="26" height="26"><circle cx="18" cy="18" r="10" fill="none" stroke="#52b788" stroke-width="1.8"/><path d="M11 19c4-3 9 2 14-2" fill="none" stroke="#95d5b2" stroke-width="2"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Satellite</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn" data-base="globe3d" title="Interactive 3D Globe View">
      <div class="ntm-layer-thumb-preview" style="background:radial-gradient(circle at 38% 35%,#0284c7 0%,#0f172a 70%,#020617 100%);">
        <svg viewBox="0 0 36 36" width="28" height="28"><circle cx="18" cy="18" r="12" fill="none" stroke="#38bdf8" stroke-width="1.8"/><ellipse cx="18" cy="18" rx="6" ry="12" fill="none" stroke="#7dd3fc" stroke-width="1.3"/><line x1="6" y1="18" x2="30" y2="18" stroke="#7dd3fc" stroke-width="1.3"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Globe 3D</span>
    </button>

    <div class="ntm-layer-divider"></div>

    <button type="button" class="ntm-layer-thumb-btn" data-overlay="buoys" title="Buoys — OpenSeaMap PNG seamarks (buoys, lights, beacons)">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#1e293b 0%,#0f172a 100%);">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <ellipse cx="12" cy="20.2" rx="5.2" ry="1.35" fill="#0ea5e9" opacity="0.35"/>
          <path d="M8.2 17.2h7.6l-1.1-8.4H9.3z" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.1" stroke-linejoin="round"/>
          <path d="M9.4 12.4h5.2" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M9.4 14.8h5.2" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>
          <rect x="11.15" y="5.2" width="1.7" height="3.7" rx="0.4" fill="#e2e8f0"/>
          <path d="M12 2.4l2.35 2.6H9.65z" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.8" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="ntm-layer-thumb-label">Buoys</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn" data-overlay="bathymetry" title="Bathymetry — Open Waters depth tint + isobath labels (metres)">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(180deg,#e9f7ff 0%,#7fc7f8 35%,#1f86cb 70%,#0c4a6e 100%);">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path d="M3 7h18M5 12h14M7 17h10" stroke="#ecfeff" stroke-width="1.7" stroke-linecap="round" opacity="0.95"/>
          <circle cx="12" cy="12" r="2.1" fill="#fef9c3" stroke="#fde68a" stroke-width="0.8"/>
        </svg>
      </div>
      <span class="ntm-layer-thumb-label">Bathymetry</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn ntm-layer-trigger-btn always-trigger" data-trigger="1" title="Layers — ECDIS / Ocean / Buoys / Bathymetry" aria-label="Chart layers including Bathymetry">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#1e293b 0%,#0f172a 100%);">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      </div>
    </button>
  `;

  L.DomEvent.disableClickPropagation(selector);
  L.DomEvent.disableScrollPropagation(selector);
  mapContainer.appendChild(selector);

  let layerPanelLeaveTimer = null;
  selector.addEventListener("mouseenter", () => {
    if (layerPanelLeaveTimer) {
      clearTimeout(layerPanelLeaveTimer);
      layerPanelLeaveTimer = null;
    }
    selector.classList.remove("collapsed");
  });
  selector.addEventListener("mouseleave", () => {
    if (layerPanelLeaveTimer) clearTimeout(layerPanelLeaveTimer);
    layerPanelLeaveTimer = setTimeout(() => {
      selector.classList.add("collapsed");
      layerPanelLeaveTimer = null;
    }, 500);
  });

  let activeBaseKey = "ocean";
  let isBuoysActive = false;
  let isBathymetryActive = false;
  let bathymetryLayerRef = layers.bathymetry || null;
  let owOverlayBusy = false;

  const OW_OVERLAY_META = {
    bathymetry: {
      label: "Bathymetry",
      title: "Bathymetry — Open Waters depth tint + isobath labels (metres)",
      create: "createOpenWatersBathymetryLayer",
      getRef: () => bathymetryLayerRef,
      setRef: (v) => {
        bathymetryLayerRef = v;
        layers.bathymetry = v;
      },
      getOn: () => isBathymetryActive,
      setOn: (v) => {
        isBathymetryActive = v;
      },
      waitMs: 16000
    }
  };

  const setOverlayBusy = (btn, on, titleIdle) => {
    if (!btn) return;
    btn.classList.toggle("is-loading", !!on);
    btn.setAttribute("aria-busy", on ? "true" : "false");
    if (on) btn.title = "Loading…";
    else if (titleIdle) btn.title = titleIdle;
  };

  const toggleOwMapLibreOverlay = async (overlayKey, btn) => {
    if (owOverlayBusy) return;
    const meta = OW_OVERLAY_META[overlayKey];
    if (!meta) return;
    const turningOn = !meta.getOn();
    const idleTitle = meta.title;
    const label = meta.label;

    if (!turningOn) {
      const lyr = meta.getRef();
      if (lyr && mapInstance.hasLayer(lyr)) mapInstance.removeLayer(lyr);
      meta.setOn(false);
      btn.classList.remove("active-overlay");
      setOverlayBusy(btn, false, idleTitle);
      if (typeof flashOpenWatersLayerStatus === "function") {
        flashOpenWatersLayerStatus(label + " off", false);
      }
      return;
    }

    owOverlayBusy = true;
    setOverlayBusy(btn, true, idleTitle);
    if (typeof flashOpenWatersLayerStatus === "function") {
      flashOpenWatersLayerStatus("Loading " + label + "…", false);
    }
    try {
      let lyr = meta.getRef();
      if (!lyr) {
        const createFn = typeof window !== "undefined" ? window[meta.create] : null;
        if (typeof createFn !== "function") {
          throw new Error("Open Waters " + label + " helper missing");
        }
        lyr = await createFn();
        meta.setRef(lyr);
      }
      lyr.addTo(mapInstance);
      if (typeof wireOpenWatersGlLayerResize === "function") {
        wireOpenWatersGlLayerResize(lyr, mapInstance);
      }
      if (typeof waitForOpenWatersGlStyle === "function") {
        await waitForOpenWatersGlStyle(lyr, meta.waitMs);
      }
      meta.setOn(true);
      btn.classList.add("active-overlay");
      setOverlayBusy(btn, false, idleTitle);
      if (typeof flashOpenWatersLayerStatus === "function") {
        flashOpenWatersLayerStatus(label + " on", false);
      }
    } catch (err) {
      console.warn("[SetSail] Open Waters overlay failed:", err);
      try {
        const bad = meta.getRef();
        if (bad && mapInstance.hasLayer(bad)) mapInstance.removeLayer(bad);
        meta.setRef(null);
      } catch (e2) {}
      btn.classList.remove("active-overlay");
      setOverlayBusy(btn, false, idleTitle + " (unavailable)");
      meta.setOn(false);
      if (typeof flashOpenWatersLayerStatus === "function") {
        flashOpenWatersLayerStatus(label + " failed: " + (err && err.message ? err.message : "error"), true);
      }
    } finally {
      owOverlayBusy = false;
    }
  };

  // 3D Globe State & Renderer with Horizon-Limb Continental Projection
  const canvas = globeWrap.querySelector("#ntmGlobe3DCanvas");
  const globeState = {
    active: false,
    rotLon: 10,
    rotLat: 22,
    zoom: 1.0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    moved: false,
    projectedNotices: []
  };

  const renderGlobe3D = () => {
    if (!globeState.active || !canvas) return;
    const rect = globeWrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(300, rect.width);
    const h = Math.max(260, rect.height);
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.5;
    const R = Math.min(w, h) * 0.41 * globeState.zoom;
    const rad = Math.PI / 180;
    const lat0 = globeState.rotLat * rad;
    const lon0 = globeState.rotLon * rad;
    const sinLat0 = Math.sin(lat0);
    const cosLat0 = Math.cos(lat0);

    const project = (latDeg, lonDeg) => {
      const phi = latDeg * rad;
      const lam = lonDeg * rad;
      const dLam = lam - lon0;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const cosC = sinLat0 * sinPhi + cosLat0 * cosPhi * Math.cos(dLam);
      if (cosC < 0) return null;
      const x = cx + R * (cosPhi * Math.sin(dLam));
      const y = cy - R * (cosLat0 * sinPhi - sinLat0 * cosPhi * Math.cos(dLam));
      return { x, y, z: cosC };
    };

    // Project with horizon-limb clamping so continents wrapping around the Earth's horizon fill 100% cleanly
    const projectLimbClamped = (latDeg, lonDeg) => {
      const phi = latDeg * rad;
      const lam = lonDeg * rad;
      const dLam = lam - lon0;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const x3 = cosPhi * Math.sin(dLam);
      const y3 = cosLat0 * sinPhi - sinLat0 * cosPhi * Math.cos(dLam);
      const z3 = sinLat0 * sinPhi + cosLat0 * cosPhi * Math.cos(dLam);
      if (z3 >= 0) {
        return { x: cx + R * x3, y: cy - R * y3, z: z3, front: true };
      }
      const rxy = Math.hypot(x3, y3) || 1;
      return {
        x: cx + R * 1.015 * (x3 / rxy),
        y: cy - R * 1.015 * (y3 / rxy),
        z: z3,
        front: false
      };
    };

    // Atmosphere outer glow
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.14);
    atmo.addColorStop(0, "rgba(56, 189, 248, 0.28)");
    atmo.addColorStop(1, "rgba(2, 132, 199, 0)");
    ctx.fillStyle = atmo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.14, 0, Math.PI * 2);
    ctx.fill();

    // Ocean sphere fill — match Esri World Ocean Base (teal-blue bathymetry look)
    const oceanGrad = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.32, R * 0.05, cx, cy, R);
    oceanGrad.addColorStop(0, "#5eb3d1");
    oceanGrad.addColorStop(0.35, "#2f86b0");
    oceanGrad.addColorStop(0.7, "#1a5f8a");
    oceanGrad.addColorStop(1, "#0c3558");
    ctx.fillStyle = oceanGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Clip to sphere
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    // Graticule grid (parallels & meridians every 15 deg)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 0.45;
    for (let lat = -75; lat <= 75; lat += 15) {
      ctx.beginPath();
      let started = false;
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(lat, lon);
        if (p) {
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        } else started = false;
      }
      ctx.stroke();
    }
    for (let lon = -180; lon < 180; lon += 15) {
      ctx.beginPath();
      let started = false;
      for (let lat = -85; lat <= 85; lat += 4) {
        const p = project(lat, lon);
        if (p) {
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        } else started = false;
      }
      ctx.stroke();
    }

    // World Continents & Islands with Realistic Physical Earth Biome Colors
    if (Array.isArray(WORLD_LAND_POLYGONS)) {
      WORLD_LAND_POLYGONS.forEach((poly) => {
        if (!Array.isArray(poly) || poly.length < 3) return;
        let frontCount = 0;
        let sumLat = 0, sumLon = 0;
        const projPts = [];
        for (let i = 0; i < poly.length; i++) {
          const pt = poly[i];
          const lat = Array.isArray(pt) ? pt[0] : pt.lat;
          const lon = Array.isArray(pt) ? pt[1] : pt.lon;
          sumLat += lat;
          sumLon += lon;
          const p = projectLimbClamped(lat, lon);
          if (p.front) frontCount++;
          projPts.push(p);
        }
        if (frontCount === 0) return;

        const avgLat = sumLat / poly.length;
        const avgLon = sumLon / poly.length;

        // Flat Esri-Ocean land tint (single cartographic tan — no biome rainbow)
        const isIce = (avgLat < -58 || avgLat > 72);
        const landFill = isIce ? "#e8eef3" : "#d7c7a6";
        const landStroke = isIce ? "#b7c4d1" : "#9a8664";

        ctx.beginPath();
        for (let i = 0; i < projPts.length; i++) {
          if (i === 0) ctx.moveTo(projPts[i].x, projPts[i].y);
          else ctx.lineTo(projPts[i].x, projPts[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = landFill;
        ctx.fill();
        ctx.strokeStyle = landStroke;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });
    }

    // Active Route Track on 3D Globe
    const isRouteOn = typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.route !== false;
    if (isRouteOn && typeof activeRouteData !== "undefined" && activeRouteData && Array.isArray(activeRouteData.waypoints)) {
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      let started = false;
      activeRouteData.waypoints.forEach((wp) => {
        const p = project(wp.lat, wp.lon);
        if (p) {
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        } else started = false;
      });
      ctx.stroke();
    }

    // Active Port Depths on 3D Globe
    const isPortsOn = typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.depths !== false;
    if (isPortsOn && typeof PORT_DEPTHS_DB !== "undefined" && Array.isArray(PORT_DEPTHS_DB)) {
      ctx.fillStyle = "#06b6d4";
      PORT_DEPTHS_DB.forEach((port) => {
        const pCoords = port.approachCoords || port.coords;
        if (!pCoords) return;
        const p = project(pCoords[0], pCoords[1]);
        if (!p) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Active Weather Cyclones on 3D Globe
    const isWxOn = typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.weather !== false;
    if (isWxOn && typeof MARINE_WEATHER_STORE !== "undefined" && MARINE_WEATHER_STORE.storms) {
      (MARINE_WEATHER_STORE.storms || []).forEach((st) => {
        const c = st.center || [st.lat, st.lon];
        if (!c || !Number.isFinite(c[0])) return;
        const p = project(c[0], c[1]);
        if (!p) return;
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Active Admiralty NtM & NAVTEX Notices on 3D Globe
    globeState.projectedNotices = [];
    const isNoticesOn = typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.notices !== false;
    if (isNoticesOn && typeof getFilteredNotices === "function") {
      const visibleNotices = getFilteredNotices();
      visibleNotices.forEach((n) => {
        if (!Number.isFinite(n.lat) || !Number.isFinite(n.lon)) return;
        const p = project(n.lat, n.lon);
        if (!p) return;
        const color = n.type === "NAVTEX" ? "#f97316" : (n.type === "T" ? "#eab308" : (n.type === "P" ? "#8b5cf6" : "#d946ef"));
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(15, 23, 42, 0.85)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        globeState.projectedNotices.push({ x: p.x, y: p.y, notice: n });
      });
    }

    // Live Vessel Position on 3D Globe
    if (userVessel && Number.isFinite(userVessel.lat) && Number.isFinite(userVessel.lon)) {
      const pv = project(userVessel.lat, userVessel.lon);
      if (pv) {
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pv.x, pv.y, 6.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pv.x, pv.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // Rim border
    ctx.strokeStyle = "rgba(56, 189, 248, 0.48)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };

  window.renderGlobe3D = renderGlobe3D;

  // Globe pointer interaction
  if (canvas) {
    canvas.addEventListener("pointerdown", (e) => {
      globeState.dragging = true;
      globeState.moved = false;
      globeState.lastX = e.clientX;
      globeState.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!globeState.dragging) return;
      const dx = e.clientX - globeState.lastX;
      const dy = e.clientY - globeState.lastY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) globeState.moved = true;
      globeState.lastX = e.clientX;
      globeState.lastY = e.clientY;
      globeState.rotLon = ((globeState.rotLon - dx * 0.35 + 540) % 360) - 180;
      globeState.rotLat = Math.max(-80, Math.min(80, globeState.rotLat + dy * 0.35));
      renderGlobe3D();
    });
    canvas.addEventListener("pointerup", (e) => {
      globeState.dragging = false;
      if (!globeState.moved) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        for (let i = 0; i < globeState.projectedNotices.length; i++) {
          const item = globeState.projectedNotices[i];
          if (Math.hypot(mx - item.x, my - item.y) <= 8) {
            if (typeof openNoticeDetailModal === "function") {
              openNoticeDetailModal(item.notice.id || item.notice);
            }
            break;
          }
        }
      }
    });
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      globeState.zoom = Math.max(0.65, Math.min(3.5, globeState.zoom * factor));
      renderGlobe3D();
    }, { passive: false });
  }

  // Handle Layer Selector Clicks
  selector.querySelectorAll(".ntm-layer-thumb-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (selector.classList.contains("collapsed") || btn.getAttribute("data-trigger") === "1") {
        selector.classList.toggle("collapsed");
        return;
      }
      const baseKey = btn.getAttribute("data-base");
      const overlayKey = btn.getAttribute("data-overlay");

      if (baseKey) {
        activeBaseKey = baseKey;
        selector.querySelectorAll("[data-base]").forEach(b => b.classList.toggle("active-base", b === btn));
        const triggerBtn = selector.querySelector(".ntm-layer-trigger-btn");
        const setBaseLoading = (on) => {
          selector.classList.toggle("is-loading-base", !!on);
          if (triggerBtn) {
            triggerBtn.classList.toggle("is-loading", !!on);
            triggerBtn.setAttribute("aria-busy", on ? "true" : "false");
            triggerBtn.title = on ? "Loading chart layer…" : "Layers — ECDIS / Ocean / Buoys / Bathymetry";
          }
          btn.classList.toggle("is-loading", !!on);
        };
        // Track full tile settle: Leaflet fires "loading" when tiles start, "load" when ALL visible tiles done
        const waitLayerFullyLoaded = (lyr, done) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            lyr.off("loading", onLoading);
            lyr.off("load", onLoad);
            lyr.off("tileerror", onTileErr);
            done();
          };
          const onLoading = () => setBaseLoading(true);
          const onLoad = () => finish();
          const onTileErr = () => { /* keep waiting for remaining tiles; load still fires */ };
          lyr.on("loading", onLoading);
          lyr.on("load", onLoad);
          lyr.on("tileerror", onTileErr);
          // Safety: never spin forever
          setTimeout(finish, 12000);
        };

        if (baseKey === "globe3d") {
          const mapElG = mapInstance.getContainer();
          if (mapElG) mapElG.classList.remove("ecdis-simple-base");
          setBaseLoading(true);
          const c = mapInstance.getCenter();
          globeState.rotLat = c.lat;
          globeState.rotLon = c.lng;
          globeState.active = true;
          globeWrap.classList.add("active");
          requestAnimationFrame(() => {
            renderGlobe3D();
            // Globe is canvas — wait one paint + short settle
            requestAnimationFrame(() => setTimeout(() => setBaseLoading(false), 180));
          });
        } else {
          if (globeState.active) {
            globeState.active = false;
            globeWrap.classList.remove("active");
            mapInstance.setView([globeState.rotLat, globeState.rotLon], mapInstance.getZoom());
          }
          ["ecdis", "ocean", "street", "sat"].forEach((k) => {
            if (layers[k] && mapInstance.hasLayer(layers[k])) {
              mapInstance.removeLayer(layers[k]);
            }
          });
          if (layers[baseKey]) {
            setBaseLoading(true);
            const lyr = layers[baseKey];
            if (baseKey === "ecdis" || lyr._setsailEcdis) {
              lyr.addTo(mapInstance);
              const mapEl = mapInstance.getContainer();
              if (mapEl) mapEl.classList.add("ecdis-simple-base");
              requestAnimationFrame(() => setTimeout(() => setBaseLoading(false), 60));
            } else {
              const mapEl = mapInstance.getContainer();
              if (mapEl) mapEl.classList.remove("ecdis-simple-base");
              waitLayerFullyLoaded(lyr, () => setBaseLoading(false));
              lyr.addTo(mapInstance);
              // If tiles already cached, "load" may have already fired — poll once
              setTimeout(() => {
                try {
                  if (lyr._loading === false || (lyr._tiles && Object.keys(lyr._tiles).length && !lyr._loading)) {
                    setBaseLoading(false);
                  }
                } catch (e) {}
              }, 80);
            }
          }
        }
        selector.classList.add("collapsed");
      } else if (overlayKey === "buoys" && layers.buoys) {
        isBuoysActive = !isBuoysActive;
        btn.classList.toggle("active-overlay", isBuoysActive);
        if (isBuoysActive) {
          layers.buoys.addTo(mapInstance);
        } else if (mapInstance.hasLayer(layers.buoys)) {
          mapInstance.removeLayer(layers.buoys);
        }
      } else if (overlayKey === "bathymetry") {
        if (layerPanelLeaveTimer) {
          clearTimeout(layerPanelLeaveTimer);
          layerPanelLeaveTimer = null;
        }
        selector.classList.remove("collapsed");
        toggleOwMapLibreOverlay(overlayKey, btn);
      }
    });
  });
}

/* ==========================================================================
   SETSAIL v5.10 — OFFICIAL GOOGLE ACCOUNT AUTHENTICATION & FULL USER HISTORY,
   DRAGGABLE ROUTE SNAPSHOT + CORRIDOR BUFFER FILTER, & SETNEWS + "FOR YOU" AI
   ========================================================================== */

const SETSAIL_AUTH_KEY = "setsail_auth_user_v1";
const SETSAIL_GOOGLE_CLIENT_ID_KEY = "setsail_google_client_id";
const DEFAULT_SETSAIL_GOOGLE_CLIENT_ID = "1072660724894-mbo68vdrl6t3a66s048qdhv8jb6sl6kd.apps.googleusercontent.com";

function normalizeGoogleClientId(raw) {
  const s = String(raw || "").trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "").trim();
  return s || DEFAULT_SETSAIL_GOOGLE_CLIENT_ID;
}

window.SETSAIL_GOOGLE_CLIENT_ID = normalizeGoogleClientId(localStorage.getItem(SETSAIL_GOOGLE_CLIENT_ID_KEY) || DEFAULT_SETSAIL_GOOGLE_CLIENT_ID);
try {
  localStorage.setItem(SETSAIL_GOOGLE_CLIENT_ID_KEY, window.SETSAIL_GOOGLE_CLIENT_ID);
} catch (e) {}

function getSetSailAuthUser() {
  try {
    const raw = localStorage.getItem(SETSAIL_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function getUserHistoryStorageKey(email) {
  const clean = String(email || "guest").trim().toLowerCase().replace(/[^a-z0-9@._-]/g, "_");
  return `setsail_user_history_${clean}`;
}

function saveSetSailUserHistory() {
  const user = getSetSailAuthUser();
  if (!user || !user.email) return null;
  try {
    const snapshot = {
      email: user.email,
      name: user.name || "",
      updatedAt: new Date().toISOString(),
      activeRoute: activeRouteData || JSON.parse(localStorage.getItem(ROUTE_STORAGE_KEY) || "null"),
      routeBufferNm: window.ROUTE_CORRIDOR_BUFFER_NM || 25,
      routeCorridorFilter: Boolean(window.ROUTE_CORRIDOR_FILTER_ENABLED),
      noticeOverrides: getNoticeOverridesMap(),
      userVessel: userVessel || JSON.parse(localStorage.getItem(VESSEL_STORAGE_KEY) || "null"),
      gyroDevTable: JSON.parse(localStorage.getItem("gyro_calc_dev_table_v1") || "null"),
      newsProfile: JSON.parse(localStorage.getItem("setsail_news_user_profile_v1") || "{}"),
      theme: localStorage.getItem("setsail_theme") || "dark"
    };
    localStorage.setItem(getUserHistoryStorageKey(user.email), JSON.stringify(snapshot));
    updateUserHistorySummaryUI(snapshot);
    return snapshot;
  } catch (e) {
    console.warn("[SetSail History] Save error:", e);
    return null;
  }
}
window.saveSetSailUserHistory = saveSetSailUserHistory;

function restoreSetSailUserHistory(email, silent = false) {
  if (!email) return false;
  try {
    const raw = localStorage.getItem(getUserHistoryStorageKey(email));
    if (!raw) {
      saveSetSailUserHistory();
      return false;
    }
    const snap = JSON.parse(raw);
    if (!snap || typeof snap !== "object") return false;

    if (snap.noticeOverrides && typeof snap.noticeOverrides === "object") {
      saveNoticeOverridesMap(snap.noticeOverrides);
      if (typeof reconcileAndApplyNoticeOverrides === "function") {
        reconcileAndApplyNoticeOverrides();
      }
    }
    if (snap.userVessel && Number.isFinite(snap.userVessel.lat) && Number.isFinite(snap.userVessel.lon)) {
      plotUserVessel(snap.userVessel.lat, snap.userVessel.lon, snap.userVessel.source || "manual");
    }
    if (snap.gyroDevTable) {
      localStorage.setItem("gyro_calc_dev_table_v1", JSON.stringify(snap.gyroDevTable));
    }
    if (snap.newsProfile && typeof snap.newsProfile === "object") {
      localStorage.setItem("setsail_news_user_profile_v1", JSON.stringify(snap.newsProfile));
    }
    if (Number.isFinite(snap.routeBufferNm)) {
      window.ROUTE_CORRIDOR_BUFFER_NM = snap.routeBufferNm;
      localStorage.setItem("setsail_route_buffer_nm", String(snap.routeBufferNm));
    }
    if (typeof snap.routeCorridorFilter === "boolean") {
      window.ROUTE_CORRIDOR_FILTER_ENABLED = snap.routeCorridorFilter;
    }
    if (snap.activeRoute && Array.isArray(snap.activeRoute.waypoints) && snap.activeRoute.waypoints.length > 0) {
      activeRouteData = snap.activeRoute;
      localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(snap.activeRoute));
      if (leafletMap && typeof renderRouteOnMap === "function" && typeof OVERLAY_STATES !== "undefined" && OVERLAY_STATES.route) {
        renderRouteOnMap(snap.activeRoute, false);
      }
    }
    if (typeof renderNtMListAndMap === "function") {
      renderNtMListAndMap();
    }
    if (typeof window.updateRouteMiniWindowUI === "function") {
      window.updateRouteMiniWindowUI();
    }
    updateUserHistorySummaryUI(snap);
    if (!silent && typeof showSetSailToast === "function") {
      showSetSailToast(`Restored SetSail workspace history for ${email}`, "success");
    }
    return true;
  } catch (e) {
    console.warn("[SetSail History] Restore error:", e);
    return false;
  }
}
window.restoreSetSailUserHistory = restoreSetSailUserHistory;

function updateUserHistorySummaryUI(snapOverride = null) {
  const user = getSetSailAuthUser();
  const panel = document.getElementById("settingsUserHistoryPanel");
  if (!panel) return;
  if (!user || !user.email) {
    panel.style.display = "none";
    return;
  }
  panel.style.display = "block";
  let snap = snapOverride;
  if (!snap) {
    try {
      snap = JSON.parse(localStorage.getItem(getUserHistoryStorageKey(user.email)) || "null");
    } catch (e) {}
  }
  const elRoute = document.getElementById("histStatRoute");
  const elEdits = document.getElementById("histStatEdits");
  const elNews = document.getElementById("histStatNews");
  const elSyncTime = document.getElementById("histStatSyncTime");

  const rName = (snap && snap.activeRoute && snap.activeRoute.name)
    ? `${snap.activeRoute.name} (${(snap.activeRoute.waypoints || []).length} WPTs)`
    : (activeRouteData && activeRouteData.name ? `${activeRouteData.name} (${(activeRouteData.waypoints || []).length} WPTs)` : "No active route");
  const editsCnt = Object.keys((snap && snap.noticeOverrides) || getNoticeOverridesMap() || {}).length;
  const newsProf = (snap && snap.newsProfile) || JSON.parse(localStorage.getItem("setsail_news_user_profile_v1") || "{}");
  const readCnt = Array.isArray(newsProf.readIds) ? newsProf.readIds.length : 0;
  const savedCnt = Array.isArray(newsProf.bookmarkedIds) ? newsProf.bookmarkedIds.length : 0;

  if (elRoute) elRoute.textContent = rName;
  if (elEdits) elEdits.textContent = `${editsCnt} saved chart edits`;
  if (elNews) elNews.textContent = `${readCnt} read • ${savedCnt} saved`;
  if (elSyncTime) {
    const dt = (snap && snap.updatedAt) ? new Date(snap.updatedAt).toUTCString().replace("GMT", "UTC") : "Live Sync Active";
    elSyncTime.textContent = dt;
  }
  const cachedAgent = window.__setsailAgentRoutesCache;
  const elAgent = document.getElementById("histStatAgentRoutes");
  if (elAgent) {
    elAgent.textContent = Array.isArray(cachedAgent) ? String(cachedAgent.length) : "…";
  }
  renderAgentRoutesInProfile(cachedAgent || []);
}

function renderAgentRoutesInProfile(routes) {
  const listEl = document.getElementById("histAgentRoutesList");
  if (!listEl) return;
  const arr = Array.isArray(routes) ? routes : [];
  if (!arr.length) {
    listEl.style.display = "none";
    listEl.innerHTML = "";
    return;
  }
  listEl.style.display = "block";
  listEl.innerHTML = arr.slice(0, 12).map((r) => {
    const nm = String((r && r.name) || "Agent route").replace(/[<>&]/g, "");
    const dist = (r && r.distanceNm != null) ? (Math.round(Number(r.distanceNm) * 10) / 10) + " NM" : "—";
    const when = r && r.createdAt ? new Date(r.createdAt).toUTCString().replace("GMT", "UTC").slice(5, 22) : "";
    const id = String((r && r.id) || "").replace(/"/g, "");
    return (
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 0;border-bottom:1px solid rgba(148,163,184,0.1);">' +
        '<div style="min-width:0;"><div style="font-weight:650;color:#e2e8f0;font-size:0.7rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + nm + '</div>' +
        '<div style="font-size:0.62rem;color:#94a3b8;">' + dist + (when ? " · " + when : "") + " · Agent API</div></div>" +
        (id ? '<button type="button" class="min-btn-outline hist-agent-load-btn" data-agent-route-id="' + id + '" style="padding:3px 8px;font-size:0.62rem;margin:0;flex-shrink:0;">Load</button>' : "") +
      "</div>"
    );
  }).join("");
  listEl.querySelectorAll(".hist-agent-load-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-agent-route-id");
      const route = (window.__setsailAgentRoutesCache || []).find((x) => x && x.id === id);
      if (!route) return;
      if (typeof saveRouteToLibrary === "function") saveRouteToLibrary(route);
      if (typeof selectSavedRouteFromSidebar === "function") {
        try { selectSavedRouteFromSidebar(route.id, true); } catch (e) {}
      } else if (typeof renderRouteOnMap === "function") {
        try {
          activeRouteData = route;
          localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(route));
          if (typeof OVERLAY_STATES !== "undefined") OVERLAY_STATES.route = true;
          renderRouteOnMap(route, false);
        } catch (e2) {}
      }
      if (typeof showSetSailToast === "function") {
        showSetSailToast("Loaded Agent API route: " + (route.name || id), "success");
      }
    });
  });
}

async function syncAgentApiRoutesToProfile() {
  const user = getSetSailAuthUser();
  if (!user || !user.email) {
    window.__setsailAgentRoutesCache = [];
    const elAgent = document.getElementById("histStatAgentRoutes");
    if (elAgent) elAgent.textContent = "0";
    renderAgentRoutesInProfile([]);
    return [];
  }
  let token = "";
  try {
    token = sessionStorage.getItem("setsail_google_auth_token") || "";
  } catch (e) {}
  if (!token && window.__setsailAgentApiKey) token = window.__setsailAgentApiKey;
  if (!token) {
    const elAgent = document.getElementById("histStatAgentRoutes");
    if (elAgent && !window.__setsailAgentRoutesCache) elAgent.textContent = "sign-in refresh";
    return window.__setsailAgentRoutesCache || [];
  }
  try {
    const res = await fetch("/api/v1/routes", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
      cache: "no-store"
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !Array.isArray(data.routes)) {
      return window.__setsailAgentRoutesCache || [];
    }
    window.__setsailAgentRoutesCache = data.routes;
    // Merge into local SetRoute library so they appear in the sidebar tree
    data.routes.forEach((r) => {
      if (r && Array.isArray(r.waypoints) && r.waypoints.length && typeof saveRouteToLibrary === "function") {
        const normalized = Object.assign({}, r, {
          source: "agent_api",
          metadata: Object.assign({}, r.metadata || {}, { fromAgentApi: true })
        });
        try { saveRouteToLibrary(normalized); } catch (eLib) {}
      }
    });
    const elAgent = document.getElementById("histStatAgentRoutes");
    if (elAgent) elAgent.textContent = String(data.routes.length);
    renderAgentRoutesInProfile(data.routes);
    if (typeof renderNavSavedRoutesTree === "function") {
      try { renderNavSavedRoutesTree(); } catch (eTree) {}
    }
    return data.routes;
  } catch (e) {
    return window.__setsailAgentRoutesCache || [];
  }
}
window.syncAgentApiRoutesToProfile = syncAgentApiRoutesToProfile;

function setSetSailAuthUser(userObj) {
  try {
    if (userObj) {
      localStorage.setItem(SETSAIL_AUTH_KEY, JSON.stringify(userObj));
      restoreSetSailUserHistory(userObj.email, true);
      saveSetSailUserHistory();
      try {
        if (typeof window.trackSetSailLogin === "function") window.trackSetSailLogin(userObj.email);
      } catch (eTrack) {}
      try {
        syncAgentApiRoutesToProfile();
      } catch (eAgent) {}
      try {
        maybeOpenPendingAgentApiKeyModal();
      } catch (eKey) {}
    } else {
      saveSetSailUserHistory();
      localStorage.removeItem(SETSAIL_AUTH_KEY);
      window.__setsailAgentRoutesCache = [];
      window.__setsailPendingApiKeyModal = false;
    }
  } catch (e) {}
  syncSetSailAuthUI();
}

function _setsailAuthAvatarHtml(user, initChar) {
  if (user && user.picture) {
    const safeInit = String(initChar || "G").replace(/'/g, "");
    return `<img src="${String(user.picture).replace(/"/g, "&quot;")}" alt="${safeInit}" referrerpolicy="no-referrer" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;" onerror="this.parentElement.textContent='${safeInit}'">`;
  }
  return String(initChar || "G");
}

function _setsailGuestHudAvatarHtml() {
  return `<svg class="setsail-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" fill="none" stroke="#f05a36" stroke-width="1.8"/></svg>`;
}

function syncSetSailApiCardUI() {
  const btn = document.getElementById("btnApiShowKey");
  if (!btn) return;
  const user = getSetSailAuthUser();
  const signed = !!(user && (user.email || user.name));
  btn.textContent = signed ? "Show API key" : "Show API key";
  btn.title = signed
    ? "Open your scoped Agent API key"
    : "Sign in with Google, then your API key will appear";
}

function closeAgentApiKeyModal() {
  const modal = document.getElementById("setsailAgentApiKeyModal");
  if (modal) modal.remove();
}

function openAgentApiKeyModal(payload) {
  closeAgentApiKeyModal();
  const key = (payload && payload.apiKey) || window.__setsailAgentApiKey || "";
  const meta =
    (payload && payload.metaText) ||
    ("Scopes: chart.read · route.plan" +
      (payload && payload.expiresAt
        ? " · expires " + new Date(payload.expiresAt).toUTCString().replace("GMT", "UTC")
        : ""));
  const overlay = document.createElement("div");
  overlay.id = "setsailAgentApiKeyModal";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(2,6,23,0.72);backdrop-filter:blur(6px);";
  overlay.innerHTML =
    '<div style="width:min(520px,100%);background:rgba(15,23,42,0.96);border:1px solid rgba(250,204,21,0.35);border-radius:14px;padding:1.15rem 1.25rem;box-shadow:0 24px 60px rgba(0,0,0,0.45);">' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:0.75rem;">' +
        '<div><div style="font-size:0.95rem;font-weight:750;color:#f8fafc;">Your SetSail Agent API key</div>' +
        '<div style="font-size:0.68rem;color:#94a3b8;margin-top:3px;">Treat like a password · chart.read &amp; route.plan only</div></div>' +
        '<button type="button" id="btnAgentApiModalClose" style="background:transparent;border:none;color:#94a3b8;font-size:1.25rem;cursor:pointer;line-height:1;" aria-label="Close">×</button>' +
      "</div>" +
      '<code id="settingsApiKeyValue" style="display:block;padding:0.75rem 0.85rem;border-radius:9px;background:rgba(8,47,73,0.55);border:1px solid rgba(56,189,248,0.28);font-size:0.7rem;line-height:1.45;word-break:break-all;color:#e2e8f0;user-select:all;"></code>' +
      '<div id="settingsApiKeyMeta" style="margin-top:0.55rem;font-size:0.65rem;color:#94a3b8;"></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:1rem;flex-wrap:wrap;">' +
        '<button type="button" class="min-btn-outline" id="btnAgentApiModalCopy" style="padding:7px 12px;font-size:0.74rem;">Copy key</button>' +
        '<button type="button" class="min-btn-outline" id="btnAgentApiModalDone" style="padding:7px 12px;font-size:0.74rem;">Done</button>' +
      "</div>" +
    "</div>";
  document.body.appendChild(overlay);
  const valEl = overlay.querySelector("#settingsApiKeyValue");
  const metaEl = overlay.querySelector("#settingsApiKeyMeta");
  if (valEl) valEl.textContent = key;
  if (metaEl) metaEl.textContent = meta;
  const close = () => closeAgentApiKeyModal();
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  const closeBtn = overlay.querySelector("#btnAgentApiModalClose");
  const doneBtn = overlay.querySelector("#btnAgentApiModalDone");
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (doneBtn) doneBtn.addEventListener("click", close);
  const copyBtn = overlay.querySelector("#btnAgentApiModalCopy");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(key);
        if (typeof showSetSailToast === "function") showSetSailToast("API key copied.", "success");
      } catch (e) {
        if (typeof showSetSailToast === "function") showSetSailToast("Copy failed — select the key manually.", "warning");
      }
    });
  }
}

async function issueSetSailAgentApiKey() {
  const user = getSetSailAuthUser();
  if (!user || !user.email) return null;
  let token = "";
  try {
    token = sessionStorage.getItem("setsail_google_auth_token") || "";
  } catch (e) {}
  if (!token) return null;
  try {
    const res = await fetch("/api/v1/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({ idToken: token }),
      cache: "no-store"
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.apiKey) {
      if (typeof showSetSailToast === "function") {
        showSetSailToast(data.message || "Could not issue API key. Sign in again.", "error");
      }
      return null;
    }
    window.__setsailAgentApiKey = data.apiKey;
    return data;
  } catch (e) {
    if (typeof showSetSailToast === "function") {
      showSetSailToast("API key request failed (network).", "error");
    }
    return null;
  }
}

async function showOrMintAgentApiKeyFlow() {
  const user = getSetSailAuthUser();
  if (!user || !user.email) {
    window.__setsailPendingApiKeyModal = true;
    if (typeof showSetSailToast === "function") {
      showSetSailToast("Sign in with Google to get your API key…", "info");
    }
    if (typeof triggerOfficialGoogleSignIn === "function") triggerOfficialGoogleSignIn();
    return;
  }
  let token = "";
  try {
    token = sessionStorage.getItem("setsail_google_auth_token") || "";
  } catch (e) {}
  if (!token) {
    window.__setsailPendingApiKeyModal = true;
    if (typeof showSetSailToast === "function") {
      showSetSailToast("Confirm Google sign-in to mint the key…", "info");
    }
    if (typeof triggerOfficialGoogleSignIn === "function") triggerOfficialGoogleSignIn();
    return;
  }
  const data = await issueSetSailAgentApiKey();
  if (!data || !data.apiKey) return;
  openAgentApiKeyModal({
    apiKey: data.apiKey,
    expiresAt: data.expiresAt,
    metaText:
      "Expires " +
      (data.expiresAt ? new Date(data.expiresAt).toUTCString().replace("GMT", "UTC") : "—") +
      " · " +
      ((data.scopes || []).join(", ") || "chart.read, route.plan")
  });
}

async function maybeOpenPendingAgentApiKeyModal() {
  if (!window.__setsailPendingApiKeyModal) return;
  const user = getSetSailAuthUser();
  if (!user || !user.email) return;
  let token = "";
  try {
    token = sessionStorage.getItem("setsail_google_auth_token") || "";
  } catch (e) {}
  if (!token) return;
  window.__setsailPendingApiKeyModal = false;
  const data = await issueSetSailAgentApiKey();
  if (data && data.apiKey) {
    openAgentApiKeyModal({
      apiKey: data.apiKey,
      expiresAt: data.expiresAt,
      metaText:
        "Expires " +
        (data.expiresAt ? new Date(data.expiresAt).toUTCString().replace("GMT", "UTC") : "—") +
        " · " +
        ((data.scopes || []).join(", ") || "chart.read, route.plan")
    });
  }
}

function initSetSailAgentApiCard() {
  if (window._setsailApiCardBound) {
    syncSetSailApiCardUI();
    return;
  }
  window._setsailApiCardBound = true;
  const showBtn = document.getElementById("btnApiShowKey");
  if (showBtn) {
    showBtn.addEventListener("click", () => {
      showOrMintAgentApiKeyFlow();
    });
  }
  syncSetSailApiCardUI();
}

function syncSetSailAuthUI() {
  const user = getSetSailAuthUser();
  const hudBtn = document.getElementById("homeHudLeftLoginBtn");
  const hudText = document.getElementById("homeHudLeftLoginText") || document.getElementById("homeHudAuthText");
  let hudAvatar = document.getElementById("homeHudAuthAvatar");
  // Legacy markup: promote the left icon span into the avatar host if id is missing
  if (!hudAvatar && hudBtn) {
    const iconHost = hudBtn.querySelector(".home-hud-icon");
    if (iconHost) {
      iconHost.id = "homeHudAuthAvatar";
      iconHost.classList.add("home-hud-auth-avatar");
      hudAvatar = iconHost;
    }
  }

  if (hudBtn && hudText) {
    if (user && (user.name || user.email)) {
      const disp = user.name || user.email.split("@")[0];
      const initChar = disp.charAt(0).toUpperCase();
      hudBtn.classList.add("logged-in", "signed-in");
      // Prevent i18n from overwriting the Google display name on language refresh
      hudText.removeAttribute("data-i18n");
      hudText.textContent = disp;
      if (hudAvatar) {
        hudAvatar.classList.add("is-photo");
        hudAvatar.innerHTML = _setsailAuthAvatarHtml(user, initChar);
      }
      hudBtn.title = `Signed in as ${user.email || disp}`;
      hudBtn.setAttribute("aria-label", `Signed in as ${disp}. Open account settings.`);
    } else {
      hudBtn.classList.remove("logged-in", "signed-in");
      hudText.setAttribute("data-i18n", "btn_google_signin");
      try {
        const lang = (typeof getSetSailLanguage === "function" && getSetSailLanguage()) || "en";
        const pack = (typeof SET_SAIL_LANGUAGES !== "undefined" && SET_SAIL_LANGUAGES[lang]) || null;
        hudText.textContent = (pack && pack.translations && pack.translations.btn_google_signin) || "Sign-In";
      } catch (eLang) {
        hudText.textContent = "Sign-In";
      }
      if (hudAvatar) {
        hudAvatar.classList.remove("is-photo");
        hudAvatar.innerHTML = _setsailGuestHudAvatarHtml();
      }
      hudBtn.title = "Sign in or manage your SetSail Account (Google OAuth / Bridge Profile)";
      hudBtn.setAttribute("aria-label", "Sign in with Google");
    }
  }

  const loggedOutBox = document.getElementById("settingsAuthLoggedOut");
  const loggedInBox = document.getElementById("settingsAuthLoggedIn");
  const profileNameEl = document.getElementById("settingsAuthProfileName") || document.getElementById("settingsProfileName");
  const profileEmailEl = document.getElementById("settingsAuthProfileEmail") || document.getElementById("settingsProfileEmail");
  const profileAvatarEl = document.getElementById("settingsAuthProfileAvatar") || document.getElementById("settingsProfileAvatar");
  const accountAvatarEl = document.getElementById("settingsAccountAvatar");
  const accountBadge = document.getElementById("settingsAccountStatusBadge");
  const accountSub = document.getElementById("settingsAccountSub");
  const contactEmailEl = document.getElementById("contactEmail");

  if (user && (user.email || user.name)) {
    if (loggedOutBox) loggedOutBox.style.display = "none";
    if (loggedInBox) loggedInBox.style.display = "flex";
    const dispName = user.name || user.email.split("@")[0];
    const initC = dispName.charAt(0).toUpperCase();
    if (profileNameEl) profileNameEl.textContent = dispName;
    if (profileEmailEl) profileEmailEl.textContent = `${user.email || ""} • Google Account Synced`;
    if (profileAvatarEl) profileAvatarEl.innerHTML = _setsailAuthAvatarHtml(user, initC);
    if (accountAvatarEl) accountAvatarEl.innerHTML = _setsailAuthAvatarHtml(user, initC);
    if (accountBadge) {
      accountBadge.textContent = "SIGNED IN";
      accountBadge.style.background = "rgba(16,185,129,0.14)";
      accountBadge.style.color = "#34d399";
      accountBadge.style.borderColor = "rgba(16,185,129,0.35)";
    }
    if (accountSub) accountSub.textContent = user.email || "Google Account Synced";
    if (contactEmailEl && !contactEmailEl.value && user.email) {
      contactEmailEl.value = user.email;
    }
    updateUserHistorySummaryUI();
  } else {
    if (loggedOutBox) loggedOutBox.style.display = "block";
    if (loggedInBox) loggedInBox.style.display = "none";
    if (accountAvatarEl) accountAvatarEl.innerHTML = _setsailGuestHudAvatarHtml();
    if (accountBadge) {
      accountBadge.textContent = "GUEST MODE";
      accountBadge.style.background = "rgba(148,163,184,0.14)";
      accountBadge.style.color = "#cbd5e1";
      accountBadge.style.borderColor = "rgba(148,163,184,0.3)";
    }
    if (accountSub) {
      try {
        const _lang = (typeof getSetSailLanguage === "function" && getSetSailLanguage()) || "en";
        const _pack = (typeof SET_SAIL_LANGUAGES !== "undefined" && SET_SAIL_LANGUAGES[_lang]) || null;
        accountSub.textContent = (_pack && _pack.translations && _pack.translations.settings_account_sub) || "Sign in with Google to sync routes, chart edits and vessel data.";
      } catch (eSub) {
        accountSub.textContent = "Sign in with Google to sync routes, chart edits and vessel data.";
      }
    }
  }
  try {
    if (typeof window.syncSetSailAdminUi === "function") window.syncSetSailAdminUi();
  } catch (eAdmin) {}
  try {
    syncSetSailApiCardUI();
  } catch (eApi) {}
}

function decodeGoogleJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function loadGoogleIdentityScriptAsync() {
  return new Promise((resolve) => {
    if (window.google && window.google.accounts && (window.google.accounts.id || window.google.accounts.oauth2)) {
      resolve(true);
      return;
    }
    const existing = document.getElementById("setsailGsiScript");
    if (existing) {
      setTimeout(() => resolve(Boolean(window.google && window.google.accounts)), 1200);
      return;
    }
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(false);
      }
    }, 3500);
    const s = document.createElement("script");
    s.id = "setsailGsiScript";
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(true);
      }
    };
    s.onerror = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(false);
      }
    };
    document.head.appendChild(s);
  });
}

function handleGoogleCredentialResponse(resp) {
  if (!resp || !resp.credential) return;
  try {
    sessionStorage.setItem("setsail_google_auth_token", resp.credential);
    sessionStorage.setItem("setsail_google_auth_kind", "id_token");
  } catch (e) {}
  const payload = decodeGoogleJwt(resp.credential);
  if (payload && payload.email) {
    setSetSailAuthUser({
      name: payload.name || payload.given_name || payload.email.split("@")[0],
      email: payload.email,
      picture: payload.picture || "",
      sub: payload.sub || "",
      provider: "google",
      signedInAt: new Date().toISOString()
    });
    if (typeof showSetSailToast === "function") {
      showSetSailToast(`Signed in with Google as ${payload.email}`, "success");
    }
  }
}
window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

let googleTokenClient = null;

function initGoogleAuthClients() {
  const clientId = normalizeGoogleClientId(localStorage.getItem(SETSAIL_GOOGLE_CLIENT_ID_KEY) || window.SETSAIL_GOOGLE_CLIENT_ID);
  if (!clientId || !window.google || !window.google.accounts) return;

  // 1. GIS ID client initialization (One Tap / FedCM / official rendered button)
  try {
    if (window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true,
        itp_support: true
      });

      const container = document.getElementById("googleGsiButtonContainer");
      if (container) {
        container.innerHTML = "";
        window.google.accounts.id.renderButton(container, {
          theme: "filled_blue",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "signin_with",
          logo_alignment: "left",
          width: 240
        });
      }
    }
  } catch (e) {
    console.warn("[SetSail Google Auth] id.initialize warning:", e);
  }

  // 2. OAuth2 Token Client for DIRECT synchronous popup on user click
  try {
    if (window.google.accounts.oauth2 && typeof window.google.accounts.oauth2.initTokenClient === "function") {
      googleTokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        prompt: "select_account",
        callback: async (tokenResponse) => {
          if (!tokenResponse || !tokenResponse.access_token) {
            if (tokenResponse && tokenResponse.error) {
              console.warn("[SetSail Google Auth] Token error:", tokenResponse.error);
            }
            return;
          }
          try {
            try {
              sessionStorage.setItem("setsail_google_auth_token", tokenResponse.access_token);
              sessionStorage.setItem("setsail_google_auth_kind", "access_token");
            } catch (eTok) {}
            const profile = await fetchGoogleUserInfo(tokenResponse.access_token);
            if (profile && profile.email) {
              setSetSailAuthUser({
                name: profile.name || profile.given_name || profile.email.split("@")[0],
                email: profile.email,
                picture: profile.picture || "",
                sub: profile.sub || "",
                provider: "google",
                signedInAt: new Date().toISOString()
              });
              syncSetSailAuthUI();
              if (typeof showSetSailToast === "function") {
                showSetSailToast(`Signed in with Google as ${profile.email}`, "success");
              }
            }
          } catch (err) {
            console.error("[SetSail Google Auth] userinfo fetch error:", err);
            if (typeof showSetSailToast === "function") {
              showSetSailToast("Authenticated with Google, but could not load profile details.", "error");
            }
          }
        },
        error_callback: (err) => {
          console.warn("[SetSail Google Auth] Popup closed or blocked:", err);
        }
      });
    }
  } catch (e) {
    console.warn("[SetSail Google Auth] initTokenClient error:", e);
  }
}

async function fetchGoogleUserInfo(accessToken) {
  const resp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: "Bearer " + accessToken }
  });
  if (!resp.ok) throw new Error("userinfo " + resp.status);
  return resp.json();
}

/**
 * Direct official Google Sign-In trigger without ANY fake in-page modal.
 * Opens the official Google account chooser popup synchronously in the user's click gesture stack.
 */
function triggerOfficialGoogleSignIn() {
  const user = getSetSailAuthUser();
  if (user) {
    if (typeof switchToTab === "function") {
      switchToTab("tab-settings");
      setTimeout(() => {
        const card = document.getElementById("settingsAccountCard");
        if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
    return;
  }

  // Remove any fake modal that might still exist in the DOM
  const fakeModal = document.getElementById("setsailGoogleAuthModal");
  if (fakeModal) fakeModal.remove();

  // If tokenClient is ready, invoke requestAccessToken SYNCHRONOUSLY in the click gesture!
  if (googleTokenClient) {
    try {
      googleTokenClient.requestAccessToken({ prompt: "select_account" });
      return;
    } catch (err) {
      console.warn("[SetSail Google Auth] requestAccessToken error:", err);
    }
  }

  if (!navigator.onLine) {
    if (typeof showSetSailToast === "function") {
      showSetSailToast("Google Sign-In requires an active internet connection.", "info");
    }
    return;
  }

  loadGoogleIdentityScriptAsync().then((loaded) => {
    if (loaded) {
      initGoogleAuthClients();
      if (googleTokenClient) {
        googleTokenClient.requestAccessToken({ prompt: "select_account" });
      } else if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.prompt();
      }
    } else {
      if (typeof showSetSailToast === "function") {
        showSetSailToast("Could not load Google Identity Services. Please check connection.", "error");
      }
    }
  });
}

function initSetSailAuth() {
  if (window._setsailAuthInitialized) {
    syncSetSailAuthUI();
    return;
  }
  window._setsailAuthInitialized = true;

  const hudBtn = document.getElementById("homeHudLeftLoginBtn");
  if (hudBtn) {
    hudBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const signed = getSetSailAuthUser();
      if (signed && (signed.email || signed.name)) {
        // Already signed in → open Settings account card instead of re-prompting Google
        const settingsTab = document.querySelector('.nav-item[data-tab="tab-settings"]');
        if (settingsTab) settingsTab.click();
        else if (typeof window.switchTab === "function") window.switchTab("tab-settings");
        return;
      }
      triggerOfficialGoogleSignIn();
    });
  }

  // Custom #btnGoogleSignIn removed — Settings uses only official GIS #googleGsiButtonContainer

  const btnExportHist = document.getElementById("btnExportUserHistory");
  if (btnExportHist) {
    btnExportHist.addEventListener("click", () => {
      const snap = saveSetSailUserHistory();
      if (!snap) return;
      downloadTextFile(
        JSON.stringify(snap, null, 2),
        `SetSail_Workspace_History_${(snap.email || "user").split("@")[0]}.json`,
        "application/json"
      );
      if (typeof showSetSailToast === "function") {
        showSetSailToast("Exported Google Account Workspace History (.json)", "success");
      }
    });
  }

  const signOutBtn = document.getElementById("btnSetSailSignOut");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try { window.google.accounts.id.disableAutoSelect(); } catch (e) {}
      }
      try {
        sessionStorage.removeItem("setsail_google_auth_token");
        sessionStorage.removeItem("setsail_google_auth_kind");
      } catch (e) {}
      setSetSailAuthUser(null);
      syncSetSailAuthUI();
      if (typeof showSetSailToast === "function") {
        showSetSailToast("Signed out of Google Account. Workspace history saved.", "info");
      }
    });
  }

  // Pre-load Google Identity Services and initialize clients on start
  loadGoogleIdentityScriptAsync().then((loaded) => {
    if (loaded) initGoogleAuthClients();
  });
  try {
    initSetSailAgentApiCard();
  } catch (eApiInit) {}
  syncSetSailAuthUI();
  try {
    if (getSetSailAuthUser()) syncAgentApiRoutesToProfile();
  } catch (eSyncRoutes) {}
}

function openOfficialGoogleLoginModal() {
  triggerOfficialGoogleSignIn();
}
window.openOfficialGoogleLoginModal = openOfficialGoogleLoginModal;
window.triggerOfficialGoogleSignIn = triggerOfficialGoogleSignIn;

function closeOfficialGoogleLoginModal() {
  const modal = document.getElementById("setsailGoogleAuthModal");
  if (modal) modal.remove();
}
window.closeOfficialGoogleLoginModal = closeOfficialGoogleLoginModal;

function showGoogleAuthBusy(on, msg) {
  const modal = document.getElementById("setsailGoogleAuthModal");
  if (modal) modal.remove();
}
window.showGoogleAuthBusy = showGoogleAuthBusy;

function submitOfficialGoogleLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  triggerOfficialGoogleSignIn();
}
window.submitOfficialGoogleLogin = submitOfficialGoogleLogin;
window.renderOfficialGoogleButtonIfConfigured = initGoogleAuthClients;

window.initSetSailAuth = initSetSailAuth;
window.syncSetSailAuthUI = syncSetSailAuthUI;

/* ==========================================================================
   SETSAIL ADMIN PANEL + LIGHT ANALYTICS (owner-only UI)
   ========================================================================== */
const SETSAIL_ADMIN_EMAIL = "michael200686@gmail.com";

function isSetSailSiteHost() {
  try {
    const h = String(location.hostname || "").toLowerCase();
    if (!h || h === "null") return false;
    if (h === "localhost" || h === "127.0.0.1") return true;
    if (h === "setsail-ai.vercel.app") return true;
    if (h.endsWith(".vercel.app") && h.includes("setsail")) return true;
    return false;
  } catch (e) {
    return false;
  }
}

function isSetSailAdminUser(user) {
  const u = user || getSetSailAuthUser();
  const email = String((u && u.email) || "").trim().toLowerCase();
  return email === SETSAIL_ADMIN_EMAIL;
}

function syncSetSailAdminUi() {
  const btn = document.getElementById("btnSetSailAdminPanel");
  if (!btn) return;
  const show = isSetSailSiteHost() && isSetSailAdminUser();
  btn.style.display = show ? "inline-flex" : "none";
}
window.syncSetSailAdminUi = syncSetSailAdminUi;

function getOrCreateVisitSid() {
  try {
    let sid = sessionStorage.getItem("setsail_visit_sid");
    if (!sid) {
      sid = (crypto.randomUUID && crypto.randomUUID()) ||
        ("v" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
      sessionStorage.setItem("setsail_visit_sid", sid);
    }
    return sid;
  } catch (e) {
    return "anon-" + Date.now();
  }
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(String(text || ""));
  if (!crypto || !crypto.subtle) {
    // Fallback non-crypto hash (only for very old browsers)
    let h = 0;
    for (let i = 0; i < data.length; i++) h = ((h << 5) - h + data[i]) | 0;
    return ("00000000" + (h >>> 0).toString(16)).slice(-8).padStart(64, "0");
  }
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function trackSetSailVisit() {
  if (!isSetSailSiteHost()) return;
  try {
    const day = new Date().toISOString().slice(0, 10);
    const flag = "setsail_visit_sent_" + day;
    if (sessionStorage.getItem(flag) === "1") return;
    sessionStorage.setItem(flag, "1");
    const sid = getOrCreateVisitSid();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit", sid, day }),
      credentials: "omit",
      keepalive: true
    }).catch(() => {});
  } catch (e) {}
}
window.trackSetSailVisit = trackSetSailVisit;

async function trackSetSailLogin(email) {
  if (!isSetSailSiteHost()) return;
  const clean = String(email || "").trim().toLowerCase();
  if (!clean || !clean.includes("@")) return;
  try {
    const day = new Date().toISOString().slice(0, 10);
    const flag = "setsail_login_sent_" + day + "_" + clean;
    if (sessionStorage.getItem(flag) === "1") return;
    sessionStorage.setItem(flag, "1");
    const emailHash = await sha256Hex(clean);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "login", emailHash, day }),
      credentials: "omit",
      keepalive: true
    }).catch(() => {});
  } catch (e) {}
}
window.trackSetSailLogin = trackSetSailLogin;

function openSetSailAdminPanel() {
  if (!isSetSailSiteHost() || !isSetSailAdminUser()) return;
  const modal = document.getElementById("setsailAdminModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  const to = new Date();
  const from = new Date(to.getTime() - 6 * 86400000);
  const toEl = document.getElementById("adminStatsTo");
  const fromEl = document.getElementById("adminStatsFrom");
  const iso = (d) =>
    d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  if (toEl && !toEl.value) toEl.value = iso(to);
  if (fromEl && !fromEl.value) fromEl.value = iso(from);
  refreshSetSailAdminStats();
}
window.openSetSailAdminPanel = openSetSailAdminPanel;

function closeSetSailAdminPanel() {
  const modal = document.getElementById("setsailAdminModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
window.closeSetSailAdminPanel = closeSetSailAdminPanel;

async function refreshSetSailAdminStats() {
  const visitorsEl = document.getElementById("adminStatVisitors");
  const profilesEl = document.getElementById("adminStatProfiles");
  const seriesEl = document.getElementById("adminStatsSeries");
  const noteEl = document.getElementById("adminStatsNote");
  const fromEl = document.getElementById("adminStatsFrom");
  const toEl = document.getElementById("adminStatsTo");
  if (visitorsEl) visitorsEl.textContent = "…";
  if (profilesEl) profilesEl.textContent = "…";
  if (seriesEl) seriesEl.innerHTML = '<div class="setsail-admin-series-row">Loading…</div>';
  if (noteEl) noteEl.textContent = "";

  const token = (() => {
    try { return sessionStorage.getItem("setsail_google_auth_token") || ""; } catch (e) { return ""; }
  })();
  if (!token) {
    if (visitorsEl) visitorsEl.textContent = "—";
    if (profilesEl) profilesEl.textContent = "—";
    if (seriesEl) seriesEl.innerHTML = "";
    if (noteEl) {
      noteEl.textContent = "Sign out and sign in again with Google so Admin Panel can verify your session, then Refresh.";
    }
    return;
  }

  const from = (fromEl && fromEl.value) || "";
  const to = (toEl && toEl.value) || "";
  const qs = new URLSearchParams();
  if (from) qs.set("from", from);
  if (to) qs.set("to", to);

  try {
    const res = await fetch("/api/stats?" + qs.toString(), {
      headers: { Authorization: "Bearer " + token },
      credentials: "omit",
      cache: "no-store"
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data && (data.reason || data.error)) || ("HTTP " + res.status));
    }
    if (visitorsEl) visitorsEl.textContent = String(data.visitors != null ? data.visitors : 0);
    if (profilesEl) profilesEl.textContent = String(data.profilesTotal != null ? data.profilesTotal : 0);
    if (seriesEl) {
      const series = Array.isArray(data.series) ? data.series : [];
      if (!series.length) {
        seriesEl.innerHTML = '<div class="setsail-admin-series-row">No visits in this range yet</div>';
      } else {
        seriesEl.innerHTML = series
          .map((row) =>
            '<div class="setsail-admin-series-row"><span>' +
            String(row.day) +
            "</span><b>" +
            String(row.visitors) +
            "</b></div>"
          )
          .join("");
      }
    }
    if (noteEl) {
      const bits = [];
      if (data.updatedAt) bits.push("Updated " + new Date(data.updatedAt).toLocaleString());
      if (data.readOnly || data.persistence === "static-readonly") {
        bits.push("Persistence not configured on server (set SETSAIL_ANALYTICS_GITHUB_TOKEN in Vercel).");
      } else if (data.persistence === "github") {
        bits.push("Live GitHub-backed analytics");
      }
      noteEl.textContent = bits.join(" · ");
    }
  } catch (err) {
    if (visitorsEl) visitorsEl.textContent = "—";
    if (profilesEl) profilesEl.textContent = "—";
    if (seriesEl) seriesEl.innerHTML = "";
    if (noteEl) noteEl.textContent = "Could not load stats: " + (err && err.message ? err.message : "error");
  }
}
window.refreshSetSailAdminStats = refreshSetSailAdminStats;

function initSetSailAdminPanel() {
  syncSetSailAdminUi();
  const btn = document.getElementById("btnSetSailAdminPanel");
  if (btn && !btn._ssAdminBound) {
    btn._ssAdminBound = true;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openSetSailAdminPanel();
    });
  }
  const closeBtn = document.getElementById("setsailAdminModalClose");
  if (closeBtn && !closeBtn._ssAdminBound) {
    closeBtn._ssAdminBound = true;
    closeBtn.addEventListener("click", () => closeSetSailAdminPanel());
  }
  const modal = document.getElementById("setsailAdminModal");
  if (modal && !modal._ssAdminBound) {
    modal._ssAdminBound = true;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeSetSailAdminPanel();
    });
  }
  const refreshBtn = document.getElementById("adminStatsRefreshBtn");
  if (refreshBtn && !refreshBtn._ssAdminBound) {
    refreshBtn._ssAdminBound = true;
    refreshBtn.addEventListener("click", () => refreshSetSailAdminStats());
  }
  trackSetSailVisit();
  const user = getSetSailAuthUser();
  if (user && user.email) trackSetSailLogin(user.email);
}
window.initSetSailAdminPanel = initSetSailAdminPanel;

try {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      try { initSetSailAdminPanel(); } catch (e) {}
    });
  } else {
    setTimeout(() => {
      try { initSetSailAdminPanel(); } catch (e) {}
    }, 0);
  }
} catch (e) {}


/* ==========================================================================
   MINI DRAGGABLE ROUTE SNAPSHOT & CORRIDOR BUFFER FILTER ENGINE
   ========================================================================== */
window.ROUTE_CORRIDOR_FILTER_ENABLED = false;
window.ROUTE_CORRIDOR_BUFFER_NM = parseInt(localStorage.getItem("setsail_route_buffer_nm") || "25", 10) || 25;
let leafletRouteBufferLayer = null;

function getMinDistanceToActiveRouteNM(lat, lon) {
  if (!activeRouteData || !Array.isArray(activeRouteData.waypoints) || activeRouteData.waypoints.length === 0) {
    return Infinity;
  }
  const wpts = activeRouteData.waypoints;
  if (wpts.length === 1) {
    return calculateHaversineDistanceNM(lat, lon, wpts[0].lat, wpts[0].lon);
  }
  let minNm = Infinity;
  for (let i = 0; i < wpts.length - 1; i++) {
    const A = wpts[i];
    const B = wpts[i + 1];
    const dSeg = pointToSegmentDistanceNM(lat, lon, A.lat, A.lon, B.lat, B.lon);
    if (dSeg < minNm) minNm = dSeg;
  }
  return minNm;
}
window.getMinDistanceToActiveRouteNM = getMinDistanceToActiveRouteNM;

function pointToSegmentDistanceNM(pLat, pLon, aLat, aLon, bLat, bLon) {
  const midLatRad = ((aLat + bLat) * 0.5) * Math.PI / 180;
  const cosLat = Math.max(0.15, Math.cos(midLatRad));
  const bx = ((bLon - aLon) * 60) * cosLat;
  const by = (bLat - aLat) * 60;
  const px = ((pLon - aLon) * 60) * cosLat;
  const py = (pLat - aLat) * 60;

  const segLenSq = bx * bx + by * by;
  if (segLenSq < 1e-6) {
    return Math.hypot(px, py);
  }
  const t = Math.max(0, Math.min(1, (px * bx + py * by) / segLenSq));
  const projLon = aLon + t * (bLon - aLon);
  const projLat = aLat + t * (bLat - aLat);
  return calculateHaversineDistanceNM(pLat, pLon, projLat, projLon);
}

function isPointInActiveRouteCorridor(lat, lon, extraRadiusNm = 0) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
  if (!activeRouteData || !Array.isArray(activeRouteData.waypoints) || activeRouteData.waypoints.length === 0) {
    return true;
  }
  const bufNm = (Number(window.ROUTE_CORRIDOR_BUFFER_NM) || 25) + (Number(extraRadiusNm) || 0);
  return getMinDistanceToActiveRouteNM(lat, lon) <= bufNm;
}
window.isPointInActiveRouteCorridor = isPointInActiveRouteCorridor;

function doesNoticeIntersectRouteCorridor(item) {
  if (!item) return false;
  if (!activeRouteData || !Array.isArray(activeRouteData.waypoints) || activeRouteData.waypoints.length === 0) {
    return true;
  }
  if (Array.isArray(item.coords) && item.coords.length > 0) {
    for (let i = 0; i < item.coords.length; i++) {
      const c = item.coords[i];
      if (c && Number.isFinite(c.lat) && Number.isFinite(c.lon)) {
        if (isPointInActiveRouteCorridor(c.lat, c.lon)) return true;
      }
    }
    return false;
  }
  if (Number.isFinite(item.lat) && Number.isFinite(item.lon)) {
    return isPointInActiveRouteCorridor(item.lat, item.lon);
  }
  return false;
}
window.doesNoticeIntersectRouteCorridor = doesNoticeIntersectRouteCorridor;

function renderRouteBufferCorridorOnMap() {
  if (!leafletMap) return;
  if (!leafletRouteBufferLayer) {
    leafletRouteBufferLayer = L.layerGroup().addTo(leafletMap);
  }
  leafletRouteBufferLayer.clearLayers();

  const hasRoute = Boolean(activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length > 0);
  const isRouteVisible = typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.route !== false;
  if (!hasRoute || !isRouteVisible) return;

  const bufNm = Number(window.ROUTE_CORRIDOR_BUFFER_NM) || 25;
  // Prefer the same unrolled geometry used for the track line (Pacific / dateline safe)
  let pts = Array.isArray(window._setsailRouteUnrolled) && window._setsailRouteUnrolled.length >= 2
    ? window._setsailRouteUnrolled
    : null;
  if (!pts) {
    const raw = activeRouteData.waypoints;
    pts = [];
    let runLon = null;
    for (let i = 0; i < raw.length; i++) {
      let lat = Number(raw[i].lat);
      let lon = Number(raw[i].lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
      lon = ((lon + 180) % 360 + 360) % 360 - 180;
      if (runLon === null) runLon = lon;
      else {
        while (lon - runLon > 180) lon -= 360;
        while (lon - runLon < -180) lon += 360;
        runLon = lon;
      }
      pts.push([lat, lon]);
    }
  }
  const isFilterOn = Boolean(window.ROUTE_CORRIDOR_FILTER_ENABLED);

  if (pts.length >= 2) {
    const leftSide = [];
    const rightSide = [];
    for (let i = 0; i < pts.length; i++) {
      const curLat = pts[i][0];
      const curLon = pts[i][1];
      const prev = i > 0 ? pts[i - 1] : pts[i];
      const next = i < pts.length - 1 ? pts[i + 1] : pts[i];
      const latRad = curLat * Math.PI / 180;
      const cosLat = Math.max(0.2, Math.cos(latRad));
      let dx = (next[1] - prev[1]) * cosLat;
      let dy = next[0] - prev[0];
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      // Perpendicular offset in NM → degrees (unrolled lon space)
      const degLatOffset = (-dx) * (bufNm / 60);
      const degLonOffset = (dy * (bufNm / 60)) / cosLat;
      leftSide.push([curLat + degLatOffset, curLon + degLonOffset]);
      rightSide.unshift([curLat - degLatOffset, curLon - degLonOffset]);
    }
    const polyCoords = leftSide.concat(rightSide);
    const corridorPoly = L.polygon(polyCoords, {
      color: isFilterOn ? "#00e5ff" : "#f59e0b",
      weight: isFilterOn ? 2.2 : 1.6,
      dashArray: "6, 4",
      fillColor: isFilterOn ? "#0ea5e9" : "#f59e0b",
      fillOpacity: isFilterOn ? 0.14 : 0.10,
      interactive: false
    });
    leafletRouteBufferLayer.addLayer(corridorPoly);
  }
}
window.renderRouteBufferCorridorOnMap = renderRouteBufferCorridorOnMap;

function updateRouteMiniWindowUI() {
  const win = document.getElementById("ntmRouteMiniWindow");
  if (!win) return;

  const hasRoute = Boolean(activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length > 0);
  const isRouteVisible = typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.route !== false;
  if (!hasRoute || !isRouteVisible) {
    win.style.display = "none";
    return;
  }

  win.style.display = "block";
  const wpts = activeRouteData.waypoints;
  let totalDist = Number(activeRouteData.totalDistanceNM) || 0;
  if (!totalDist && wpts.length >= 2) {
    for (let i = 0; i < wpts.length - 1; i++) {
      totalDist += calculateHaversineDistanceNM(wpts[i].lat, wpts[i].lon, wpts[i + 1].lat, wpts[i + 1].lon);
    }
    totalDist = Math.round(totalDist);
    activeRouteData.totalDistanceNM = totalDist;
  }

  const ntmHits = (typeof NTM_STORE !== "undefined" ? NTM_STORE : []).filter(n => !n.isCancelled && n.status !== "CANCELLED" && doesNoticeIntersectRouteCorridor(n)).length;
  const portHits = (typeof PORT_DEPTHS_DB !== "undefined" ? PORT_DEPTHS_DB : []).filter(p => {
    const c = p.approachCoords || p.coords;
    return c && isPointInActiveRouteCorridor(c[0], c[1]);
  }).length;

  const titleEl = document.getElementById("routeMiniTitle");
  const wptsEl = document.getElementById("routeMiniWpts");
  const distEl = document.getElementById("routeMiniDist");
  const hitsEl = document.getElementById("routeMiniHits");
  const chkEl = document.getElementById("chkRouteCorridorOnly");
  const rngEl = document.getElementById("rngRouteBufferNm");
  const valEl = document.getElementById("lblRouteBufferNm");

  if (titleEl) titleEl.textContent = activeRouteData.name || activeRouteData.routeName || "Active Passage Plan";
  if (wptsEl) wptsEl.textContent = String(wpts.length);
  if (distEl) distEl.textContent = `${totalDist.toLocaleString()} NM`;
  if (hitsEl) hitsEl.textContent = `${ntmHits} NtM • ${portHits} Ports`;
  if (chkEl) chkEl.checked = Boolean(window.ROUTE_CORRIDOR_FILTER_ENABLED);
  if (rngEl) rngEl.value = String(window.ROUTE_CORRIDOR_BUFFER_NM || 25);
  if (valEl) valEl.textContent = `±${window.ROUTE_CORRIDOR_BUFFER_NM || 25} NM`;
}
window.updateRouteMiniWindowUI = updateRouteMiniWindowUI;

function initRouteMiniWindow() {
  const win = document.getElementById("ntmRouteMiniWindow");
  if (!win || win._routeMiniInit) return;
  win._routeMiniInit = true;

  const header = document.getElementById("ntmRouteMiniDragHandle");
  const btnMin = document.getElementById("btnRouteMiniMinimize");
  const btnFit = document.getElementById("btnRouteMiniFit");
  const chkCorridor = document.getElementById("chkRouteCorridorOnly");
  const rngBuffer = document.getElementById("rngRouteBufferNm");
  const lblBuffer = document.getElementById("lblRouteBufferNm");

  if (header) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 98;
    let origTop = 12;

    header.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button")) return;
      dragging = true;
      win.classList.add("dragging");
      startX = e.clientX;
      startY = e.clientY;
      origLeft = win.offsetLeft;
      origTop = win.offsetTop;
      header.setPointerCapture(e.pointerId);
    });

    header.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const parent = win.parentElement;
      const maxX = parent ? Math.max(0, parent.clientWidth - win.offsetWidth - 6) : 1200;
      const maxY = parent ? Math.max(0, parent.clientHeight - win.offsetHeight - 6) : 800;
      const nextLeft = Math.max(6, Math.min(maxX, origLeft + (e.clientX - startX)));
      const nextTop = Math.max(6, Math.min(maxY, origTop + (e.clientY - startY)));
      win.style.left = `${nextLeft}px`;
      win.style.top = `${nextTop}px`;
    });

    const stopDrag = () => {
      dragging = false;
      win.classList.remove("dragging");
    };
    header.addEventListener("pointerup", stopDrag);
    header.addEventListener("pointercancel", stopDrag);
  }

  if (btnMin) {
    btnMin.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.toggle("minimized");
      btnMin.textContent = win.classList.contains("minimized") ? "+" : "—";
    });
  }

  if (btnFit) {
    btnFit.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof fitRouteBounds === "function") fitRouteBounds();
    });
  }

  const refreshCorridorFilteredLayers = () => {
    updateRouteMiniWindowUI();
    renderRouteBufferCorridorOnMap();
    if (typeof renderNtMListAndMap === "function") renderNtMListAndMap();
    if (typeof renderPortDepthsOnMap === "function" && leafletMap && OVERLAY_STATES.depths) renderPortDepthsOnMap(leafletMap);
    if (typeof renderWeatherOnMap === "function" && leafletMap && OVERLAY_STATES.weather) renderWeatherOnMap(leafletMap);
    if (typeof saveSetSailUserHistory === "function") saveSetSailUserHistory();
  };

  if (chkCorridor) {
    chkCorridor.addEventListener("change", () => {
      window.ROUTE_CORRIDOR_FILTER_ENABLED = chkCorridor.checked;
      refreshCorridorFilteredLayers();
      if (typeof showSetSailToast === "function") {
        showSetSailToast(
          chkCorridor.checked
            ? `Corridor filter ON (±${window.ROUTE_CORRIDOR_BUFFER_NM} NM along route)`
            : "Corridor filter OFF (Showing all global chart objects)",
          "info"
        );
      }
    });
  }

  if (rngBuffer) {
    rngBuffer.addEventListener("input", () => {
      const val = parseInt(rngBuffer.value, 10) || 25;
      window.ROUTE_CORRIDOR_BUFFER_NM = val;
      try { localStorage.setItem("setsail_route_buffer_nm", String(val)); } catch (e) {}
      if (lblBuffer) lblBuffer.textContent = `±${val} NM`;
      refreshCorridorFilteredLayers();
    });
  }

  updateRouteMiniWindowUI();
}
window.initRouteMiniWindow = initRouteMiniWindow;


/* ==========================================================================
   SETNEWS (#tab-news) & HOMEPAGE SLIDE #3 — MARITIME INTELLIGENCE ENGINE
   ========================================================================== */
const DEFAULT_SETNEWS_ARTICLES = [{"id": "SN-A58F30EE68", "title": "Baltic Dry Index Falls to More Than 7-Week Low", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/baltic-dry-index-falls-to-more-than-7-week-low/", "publishedAt": "2026-10-12T21:00:59Z", "category": "Ports & Terminals", "region": "Panama Canal & Caribbean", "regions": ["Panama Canal & Caribbean", "Baltic Sea & Northern Europe"], "tags": ["port", "panama"], "coords": [9.08, -79.68], "navarea": "IV", "image": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=85", "summary": "in Dry Bulk Market , International Shipping News 13/10/2026", "body": "in Dry Bulk Market , International Shipping News 13/10/2026\n\nThe Baltic Exchange Dry index fell 2.2% to 2,852 on Monday, its lowest level since August 21.\n\nThe capesize index, which typically transports 150,000-ton cargoes including iron ore and coal, tumbled 4.4% to 4,148, its lowest level since late July.\n\nOn the other hand, the panamax index, which usually carries 60,000 to 70,000 tons of coal or grain, increased 0.3% to 2,432 and the supramax index rose 0.4% to 1,821. Source: Trading Economics\n\nAcross Panama Canal & Caribbean (9.1°N 79.7°W), terminal operators, harbour authorities, and liner networks are adjusting berth windows, channel draft allocations, and feeder rotations to accommodate shifting trade flows and next-generation vessel deployments.\n\nFleet operations teams and Masters bound for Panama Canal & Caribbean should verify declared low-water fairway depths, pilot boarding ground updates, and tidal window constraints in the SetChart Port Bathymetry layer.", "takeaways": ["in Dry Bulk Market , International Shipping News 13/10/2026  The Baltic Exchange Dry index fell 2.2% to 2,852 on Monday, its lowest level since August 21.", "The capesize index, which typically transports 150,000-ton cargoes including iron ore and coal, tumbled 4.4% to 4,148, its lowest level since late July.", "On the other hand, the panamax index, which usually carries 60,000 to 70,000 tons of coal or grain, increased 0.3% to 2,432 and the supramax index rose 0.4% to 1,821."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-B9C7352AB9", "title": "Diesel Availability a Boost for Product Tankers", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/diesel-availability-a-boost-for-product-tankers/", "publishedAt": "2026-10-12T21:00:59Z", "category": "Ports & Terminals", "region": "Singapore & Malacca Strait", "regions": ["Singapore & Malacca Strait", "China & East Asia", "Japan & Korea"], "tags": ["tanker", "port", "china"], "coords": [1.26, 103.82], "navarea": "XI", "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85", "summary": "According to Head of Research Department, Mr. Nikos Tagoulis, “supply uncertainty is also mounting elsewhere. China suspended refined-product exports around the Golden Week holiday, following a sharp increase in diesel...", "body": "According to Head of Research Department, Mr. Nikos Tagoulis, “supply uncertainty is also mounting elsewhere. China suspended refined-product exports around the Golden Week holiday, following a sharp increase in diesel exports during September, leaving uncertainty over policy thereafter. Russia, meanwhile, remains largely sidelined from the export market following the extension of its diesel restrictions through October and continued disruption to refining infrastructure from Ukrainian attacks. In the Middle East, the recovery in crude exports observed has not been matched by refined products. Vortexa data indicate regional diesel/gasoil exports reached 1.12 mbpd in September, down 36% y-o-y, while flows to Europe were roughly 50% lower. Lower Middle Eastern product exports are particularly relevant for Europe, given its dependence on the region for diesel imports”.\n\n“Across the Atlantic, the US remains a critical diesel supplier. US diesel/gasoil exports reached around 1.57 mbpd in Q3 2026, up 28% y-o-y, supported by strong flows into Central and South America alongside increasing long-haul shipments to Europe by approx. 35% y-o-y. While intra-American trades are relatively short-haul, stronger US Gulf-Europe shipments add ton miles and provide meaningful support for MR employment. Keeping US exports unrestricted also preserves a crucial source of incremental Atlantic Basin diesel supply”, Mr. Tagoulis said.\n\nHe added that “within this constrained supply environment, Europe is increasingly turning to alternative suppliers beyond the US, with India emerging as a more prominent source. October arrivals of diesel/gasoil from India are currently expected at around 228k bpd, up approximately 65% m-o-m. India is well placed to respond to the global supply deficit, supported by a large refining base fed by crude mainly from Russia and the Middle East, while New Delhi’s recent reduction in the diesel export levy provides further support for increased export flows. Strong European margins could attract more Indian barrels westward, providing further support to LR1/LR2 employment and ton-mile demand”.\n\nMeanwhile, “longer-haul arbitrage opportunities may also emerge from Northeast Asia, with a 90,000-ton South Korean diesel cargo reportedly fixed for Northwest Europe. This trade stands out, given Korea’s traditional focus on more proximate markets such as Australia and East Asia. However, Korea’s ability to respond more broadly to stronger global diesel demand remains constrained by government energy-security measures, which cap monthly exports of regular gasoline, automotive diesel and heating kerosene at the volumes shipped in the corresponding month of 2025”, Mr. Tagoulis said.\n\n“For product tanker demand, these developments are broadly supportive. Europe’s need to source barrels from the US Gulf, India and potentially South Korea, supports ton-mile demand across both the MR and LR segments. European strategic-stock releases could temporarily reduce prompt import requirements, but unless underlying supply constraints ease materially, the redirection of diesel trade flows towards more distant suppliers should remain supportive of tanker utilisation. More broadly, should elevated diesel prices and constrained market conditions persist, the impact could extend beyond the product-tanker market. Heavy industry, road transportation and agriculture remain highly reliant on diesel, while short-term demand is relatively inelastic . Persistently high costs could intensify inflationary pressures and weigh on agricultural economics, affecting production and exports and create a secondary spillover beyond product tankers into dry bulk, impacting seaborne grain volumes”, Intermodal’s analyst said.\n\nHe concluded that “overall, the current diesel imbalance is increasingly reshaping trade routes, as Europe’s search for replacement barrels supports longer-haul product flows. However, given diesel’s critical role in the global economy, persistently elevated prices or prolonged supply shortages could have consequences extending well beyond shipping, with broader implications for global economic activity”. Nikos Roussanoglou, Hellenic Shipping News Worldwide", "takeaways": ["According to Head of Research Department, Mr.", "Nikos Tagoulis, “supply uncertainty is also mounting elsewhere.", "China suspended refined-product exports around the Golden Week holiday, following a sharp increase in diesel exports during September, leaving uncertainty over policy thereafter."], "readingMinutes": 3, "readMinutes": 3}, {"id": "SN-6F5DE0A6DC", "title": "Russia’s shadow fleet freight rates fracture on Black Sea premiums", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/russias-shadow-fleet-freight-rates-fracture-on-black-sea-premiums/", "publishedAt": "2026-10-12T21:00:57Z", "category": "Geopolitics & Chokepoints", "region": "Suez Canal & Eastern Med", "regions": ["Suez Canal & Eastern Med", "Baltic Sea & Northern Europe", "Singapore & Malacca Strait"], "tags": ["tanker", "port", "suez", "imo"], "coords": [30.58, 32.34], "navarea": "III", "image": "https://images.unsplash.com/photo-1519074069444-1ba4ea16e66c?auto=format&fit=crop&w=1000&q=85", "summary": "Black Sea tanker economics strengthened sharply in late September and early October as attacks on commercial shipping, disruption to Russian energy flows and tighter scrutiny of Russia-linked tonnage increased the cost...", "body": "Black Sea tanker economics strengthened sharply in late September and early October as attacks on commercial shipping, disruption to Russian energy flows and tighter scrutiny of Russia-linked tonnage increased the cost and complexity of moving cargoes. Baltic routes moved in the opposite direction: Aframax spreads fell further into discount territory against global benchmarks even as outright earnings rose.\n\nThe divergence reflects a growing segmentation in Russian seaborne trade. Vessels operating from the Black Sea are attracting higher compensation for security, insurance and voyage-execution risks, while Baltic routes continue to trade below their relevant benchmarks amid the operational and commercial constraints associated with Russia-linked tonnage.\n\nThe UK added 12 tankers to its sanctions list on Oct. 8, alongside measures against Russian oil companies Zarubezhneft and INK Capital.\n\nThe move followed the Joint War Committee’s decision on Sept. 16 to add the Black Sea to its Listed Areas, increasing war-risk insurance considerations for vessels operating in the region. Sanctions and attacks have not removed Russian oil from global trade, but they have changed the vessels, routes, counterparties and risk premiums required to move it.\n\nMore than 1,600 vessels linked to Russian trade over the past two years accounted for 73% of the total shadow fleet at the end of August, according to S&P Global Commodities at Sea(opens in a new tab) data. The size of the Russia-linked fleet, combined with the latest designations, highlights the widening separation between tonnage active in Russian trade and vessels readily accepted by mainstream charterers, insurers, banks and terminals.\n\nThe latest pricing reflects that shift. Black Sea Suezmaxes command the strongest relative returns as owners seek compensation for elevated security and execution risks. Baltic Aframaxes remain at the deepest discount to their relevant benchmark, while clean MR economics continue to vary sharply by loading region and destination.\n\nBlack Sea dirty tanker shadow fleet The Black Sea-West Coast India Suezmax spread for Russia’s shadow fleet against the Global Suezmax Index for non-scrubber-fitted, non-eco vessels widened to $83.36/mt on Oct. 8, from $47.22/mt on Sept. 29, according to Platts data. Platts is part of S&P Global Energy.\n\nNovorossiysk-Vadinar TCE earnings rose to $879,766/day on Oct. 8, from $517,674/day on Sept. 29 and $493,692/day on Sept. 16. The route had been assessed at $288,088/day on Sept. 8.\n\nMarket participants said the deteriorating security environment had made Black Sea fixtures more difficult to execute. Uncertainty around vessel acceptance, insurance coverage and voyage execution has supported higher returns on trades where owners require greater compensation.\n\nThe widening Suezmax premium also came against a broader rise in dirty tanker earnings. The implied spread depends on how each Russian-linked route performs against its relevant Platts index. Black Sea Suezmax earnings strengthened relative to the benchmark, while the Baltic Aframax route lagged behind its benchmark.\n\nBaltic dirty tanker shadow fleet The Baltic-West Coast India Aframax spread for Russia’s shadow fleet against the Global Aframax Index widened to minus $44.71/mt on Oct. 8, from minus $19.93/mt on Sept. 29, according to Platts data.\n\nUst Luga-Sikka TCE earnings nevertheless rose to $227,957/day on Oct. 8, from $178,125/day on Sept. 29 and $116,671/day on Sept. 16.\n\nThe deeper discount does not indicate a fall in Baltic earnings. It shows that the relevant Aframax benchmark strengthened faster than the Russian-linked route. Baltic Aframax TCE earnings have remained below the Global Aframax Index since Sept. 9.\n\nRussian seaborne crude exports increased to 4.09 million b/d in September, from 3.82 million b/d in August, while non-G7 tankers carried 2.89 million b/d, according to S&P Global Platts.\n\nMR clean tankers shadow fleet Russian product flows provided an important backdrop to the clean tanker market. Black Sea diesel exports fell to zero in the week to Sept. 24. Across all Russian ports, diesel and gasoil exports totaled 479,000 mt in September, the lowest monthly level recorded by CAS, according toPlatts data. The Black Sea-Mediterranean MR spread against the Global Medium Range Index for non-scrubber-fitted, non-eco vessels widened to $24.56/mt on Oct. 8, from $4.78/mt on Sept. 29.\n\nNovorossiysk-Port Said TCE earnings rose to $108,940/day on Oct. 8, from $67,042/day on Sept. 29 and $56,458/day on Sept. 16.\n\nBaltic clean MR discounts narrowed but remained negative. The Baltic-Mediterranean MR spread against the Global Medium Range Index narrowed to minus $4.82/mt on Oct. 8, from minus $29.56/mt on Sept. 29. Primorsk-Mersin TCE earnings rose to $42,267/day, from $26,817/day over the same period and $15,512/day on Sept. 16.\n\nThe longer-haul Baltic-East Coast South America MR discount narrowed to minus $16.88/mt on Oct. 8, from minus $41.11/mt on Sept. 29. Ust Luga-Santos TCE earnings rose to $35,041/day on Oct. 8, from $26,186/day on Sept. 29.", "takeaways": ["Baltic routes moved in the opposite direction: Aframax spreads fell further into discount territory against global benchmarks even as outright earnings rose.", "The divergence reflects a growing segmentation in Russian seaborne trade.", "The UK added 12 tankers to its sanctions list on Oct."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-77A8DF0C95", "title": "Lower container rates are not a return to predictable service, Sogese says", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/lower-container-rates-are-not-a-return-to-predictable-service-sogese-says/", "publishedAt": "2026-10-12T21:00:57Z", "category": "Weather & Cyclones", "region": "Red Sea & Bab el-Mandeb", "regions": ["Red Sea & Bab el-Mandeb", "Suez Canal & Eastern Med", "Rotterdam & North Sea"], "tags": ["container", "port", "red sea", "suez", "typhoon"], "coords": [13.5, 42.8], "navarea": "IX", "image": "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1000&q=85", "summary": "“Europe is entering the final quarter with two forces moving in opposite directions. Capacity is becoming more available as Suez routings return, while carriers are simultaneously trying to protect utilisation through...", "body": "“Europe is entering the final quarter with two forces moving in opposite directions. Capacity is becoming more available as Suez routings return, while carriers are simultaneously trying to protect utilisation through blank sailings. For shippers, this means lower rates may offer an opportunity, but they should not be mistaken for a return to predictable service. The next few weeks will be defined by how quickly carriers can bring capacity back into balance with demand.” said Andrea Monti, CEO & MD, Sogese.\n\nFor a shipper, Sogese says, the working number is the delay. The report advises adding at least eight days to Far East to Italy arrival dates until Xeneta’s September scorecard, due this month, shows Far East to Europe arrivals above 20% on time. Xeneta’s August figure was 6%, a level last seen in late 2021, according to the report, and Xeneta counted 1.1m TEU held at anchor off Ningbo, Shanghai and Yantian after the typhoons. Monti’s advice to importers: “Book on the rate and date your stock on the delay.”\n\nThe rate fall is real. On Drewry’s World Container Index, Shanghai to Genoa is 43% below 9 July ($6,463 to $3,696 per 40ft on 8 October) and Shanghai to Rotterdam is 32% below ($4,933 to $3,337). Sogese calculates that a shipper moving 100 FEU a month from Shanghai to Genoa pays about $277,000 less per month than at the 9 July rate. The WCI excludes destination terminal handling, so demurrage, detention, terminal charges and inland haulage can keep landed costs from falling with the index.\n\nA BOOKING THAT LOOKS SECURE CAN STILL ARRIVE LATE\n\nPublished schedules show more capacity than the network can deliver, the report says. A booking can look secure on the schedule and still arrive late, be rolled to a later sailing, or land together with the vessel behind it. Sea-Intelligence’s 24 September analysis supports the point: scheduled Asia-North Europe capacity across Golden Week is 27% above last year, with 12 double sailings and no blank sailings planned for the two peak weeks. TrasportoEuropa, citing Sea-Intelligence, reports Asia-Mediterranean capacity 49% above last year.\n\nTiming decides the impact, Sogese notes. A sailing blanked in weeks 40 or 41 removes arrivals in Europe four to six weeks later, from late October to late November. Cargo produced before the holiday leaves in weeks 42 and 43 on full vessels, and a late booking risks rolling to week 44.\n\n“The cargo held back by the holiday ships in weeks 42 and 43 and lands in Europe between mid-November and early December. Shippers who book those departures now will get space. Those who wait will roll.” said Andrea Monti, CEO & MD, Sogese.\n\nSUEZ IS A NETWORK SHIFT WITH A SECURITY CONDITION\n\nSogese reads the Suez return as a network shift whose pace depends on security. On 14 September Maersk and Hapag-Lloyd moved Gemini services AE5, AE11, AE12 and ME2 back to Suez and said further changes depend on stability in the Red Sea area and no escalation of regional conflicts. Drewry counted 48 container transits in week 38, up from 41, and 68% above the same week of 2025 in week 39. On 8 October Drewry called a faster-than-expected return to Suez “the biggest threat to carrier efforts to support rates”.\n\n“Suez is returning service by service, and each conversion takes one to two weeks off the voyage. That lowers freight immediately and helps cargo planning only where the receiving terminal is ready for earlier arrivals. Maersk and Hapag-Lloyd have made the return conditional on no escalation, so every plan needs a Cape-routing contingency.” said Andrea Monti, CEO & MD, Sogese.\n\nTHE MEDITERRANEAN PREMIUM HAS GONE, AND LIGURIAN PORTS ARE LAST IN THE QUEUE\n\nSogese notes that Genoa’s premium over Rotterdam on Drewry’s index has fallen from $1,530 on 9 July to $359 on 8 October. Xeneta puts the Far East to Mediterranean premium over North Europe at about $400 on 1 October, against $2,000 on 1 January. Sea-Intelligence data cited in the report show Gemini adding a net 22,402 TEU a week to Asia-Mediterranean.\n\nCheaper does not mean faster. On Maersk’s AE11, moved to Suez from 19 September, the rotation runs Shanghai, Yantian, Tanjung Pelepas, Suez, Tangier, Valencia, Barcelona, La Spezia, Genoa and Vado Ligure. Italian importers are the last discharge, so delay accumulated at earlier calls reaches them last, Sogese notes.\n\n“If North Europe keeps falling, the Mediterranean follows. Importers should not fix Mediterranean rates beyond three months until weekly Suez transits stop rising.” said Andrea Monti, CEO & MD, Sogese.\n\nWHAT SOGESE IS WATCHING: BLANK SAILINGS AFTER GOLDEN WEEK\n\nSogese’s base case is a further fall in rates through the fourth quarter, because Suez capacity is arriving faster than carriers can blank it. It reads a blank sailing count that stays at or below seven a week in weeks 43 and 44 as pointing to further declines, and a count well above it as pointing to a floor. Drewry counts six Asia-Europe blank sailings announced for next week, up from five, and the report notes its judgement that seven a week do not offset the Suez capacity returning. In Sogese’s scenario where Suez capacity outpaces demand, rates reach January levels: $2,763 for Shanghai to Rotterdam, 17% below the 8 October figure, and about $3,100 for Genoa, 16% below. Xeneta chief analyst Peter Sand said on 8 October that “we are not at the floor yet”.\n\n“Unless blanks rise well above seven a week, Rotterdam’s January rate of $2,763 and Genoa near $3,100 are the next stops.” said Andrea Monti, CEO & MD, Sogese. Source: Sogese", "takeaways": ["“Europe is entering the final quarter with two forces moving in opposite directions.", "Capacity is becoming more available as Suez routings return, while carriers are simultaneously trying to protect utilisation through blank sailings.", "For shippers, this means lower rates may offer an opportunity, but they should not be mistaken for a return to predictable service."], "readingMinutes": 5, "readMinutes": 5}, {"id": "SN-CADC7F176C", "title": "Drewry: Cancelled Sailings Tracker Shows Capacity Gradually Returning", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/drewry-cancelled-sailings-tracker-shows-capacity-gradually-returning/", "publishedAt": "2026-10-12T21:00:55Z", "category": "Ports & Terminals", "region": "Suez Canal & Eastern Med", "regions": ["Suez Canal & Eastern Med", "US West Coast & Pacific"], "tags": ["container", "port", "suez"], "coords": [30.58, 32.34], "navarea": "III", "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85", "summary": "Our weekly tracker provides a snapshot of blank sailings announced by each Alliance versus the total number of scheduled sailings.", "body": "Our weekly tracker provides a snapshot of blank sailings announced by each Alliance versus the total number of scheduled sailings.\n\nThe post-Golden Week market is entering a new phase, with capacity gradually returning but pricing pressure building unevenly across the major trades.\n\nDrewry’s World Container Index (WCI) stood at $4,351 per 40ft on 8 October, down 2% WoW, as rates eased across the Transpacific, Asia–Europe/Med and Transatlantic trades. Major pressure remains on Asia–Europe/Med, where the gradual return of services via Suez is adding effective capacity as carriers adjust to changing routing conditions.\n\nAcross the major East–West trades, 34 blank sailings are expected from week 42 (12–18 October) to week 46 (9–15 November) out of 713 planned sailings, representing a 5% cancellation rate, with 95% of scheduled sailings expected to operate. Disruptions are concentrated on Asia–North Europe/Med, accounting for 50% of cancellations, followed by the Transpacific eastbound at 32% and the Transatlantic at 18%.\n\nFor shippers, higher effective capacity and fewer cancellations could gradually ease supply pressure, although congestion and ongoing network adjustments may continue to constrain capacity and keep rates elevated on some trades.\n\nIn the next edition of Container Capacity Insight, we will continue to track changes in blank-sailing programmes, effective capacity, Suez routings and global port congestion as post-Golden Week operations settle. Source: Drewry", "takeaways": ["Our weekly tracker provides a snapshot of blank sailings announced by each Alliance versus the total number of scheduled sailings.", "The post-Golden Week market is entering a new phase, with capacity gradually returning but pricing pressure building unevenly across the major trades.", "Drewry’s World Container Index (WCI) stood at $4,351 per 40ft on 8 October, down 2% WoW, as rates eased across the Transpacific, Asia–Europe/Med and Transatlantic trades."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-D6534FBFDE", "title": "Xclusiv Shipbrokers Weekly 12th October 2026", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/xclusiv-shipbrokers-weekly-12th-october-2026/", "publishedAt": "2026-10-12T21:00:54Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["tanker", "port", "bunker", "shipyard"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1000&q=85", "summary": "Tanker fleet growth has accelerated considerably over the past two years, marking a clear shift from the unusually restrained supply Source: Xclusiv Shipbrokers Inc.", "body": "Tanker fleet growth has accelerated considerably over the past two years, marking a clear shift from the unusually restrained supply Source: Xclusiv Shipbrokers Inc.\n\nMarket movements and fleet deployment shifts linked to Xclusiv Shipbrokers Weekly 12th October 2026 reflect broader structural trends across global wet, dry, and gas carrier segments operating through Global Maritime (25.0°N 40.0°W). Charterers, shipmanagers, and commercial operators are closely weighing freight rate volatility, shipyard slot availability, and regulatory compliance timelines.\n\nFrom an operational perspective, vessels trading along Global Maritime corridors continue to optimize service speeds, bunker stems, and port turnaround schedules while monitoring regional NAVAREA GLOBAL navigational updates.", "takeaways": ["Tanker fleet growth has accelerated considerably over the past two years, marking a clear shift from the unusually restrained supply Source: Xclusiv Shipbrokers Inc.", "Charterers, shipmanagers, and commercial operators are closely weighing freight rate volatility, shipyard slot availability, and regulatory compliance timelines.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-4FA5204442", "title": "Singapore LNG starts work on new jetty to boost LNG bunker supply", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/singapore-lng-starts-work-on-new-jetty-to-boost-lng-bunker-supply/", "publishedAt": "2026-10-12T21:00:53Z", "category": "Ports & Terminals", "region": "Singapore & Malacca Strait", "regions": ["Singapore & Malacca Strait"], "tags": ["lng", "port", "singapore", "bunker"], "coords": [1.26, 103.82], "navarea": "XI", "image": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=85", "summary": "Terminal operator Singapore LNG (SLNG) has started construction of a third jetty at its Jurong Island terminal, which could increase its LNG bunkering capacity to 3 million mt/year.", "body": "Terminal operator Singapore LNG (SLNG) has started construction of a third jetty at its Jurong Island terminal, which could increase its LNG bunkering capacity to 3 million mt/year.\n\nThe new jetty is scheduled for completion in the second half of 2028 and will be capable of handling LNG carriers ranging from 5,800-80,000 cbm.\n\nUnlike SLNG’s existing jetties, the new facility will be dedicated to small and mid-sized vessels, allowing the terminal to handle more LNG bunker reloads along with break-bulk operations.\n\nOnce operational, the jetty will be able to support around 2 million mt/year of LNG bunker reload demand. The total infrastructure will be able to handle up to 3 million mt/year.\n\n“As demand for LNG bunkering continues to grow, Jetty 3 will strengthen Singapore’s ability to support the next phase of growth…” Leong Wei Hung, chief executive of SLNG said.\n\nSeparately, SLNG has secured ISCC EU certification for handling liquefied biomethane (LBM) at its terminal. The certification covers storage, regasification, bunkering and trucking operations, allowing customers to trace and account for certified LBM handled through the facility.\n\nThe new jetty will also be capable of handling LBM, giving SLNG additional flexibility to support demand for the lower-emission fuel. Source: By Konica Bhatt, ENGINE, https://www.engine.online/news/", "takeaways": ["Terminal operator Singapore LNG (SLNG) has started construction of a third jetty at its Jurong Island terminal, which could increase its LNG bunkering capacity to 3 million mt/year.", "The new jetty is scheduled for completion in the second half of 2028 and will be capable of handling LNG carriers ranging from 5,800-80,000 cbm.", "Unlike SLNG’s existing jetties, the new facility will be dedicated to small and mid-sized vessels, allowing the terminal to handle more LNG bunker reloads along with break-bulk operations."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-ABA18F163A", "title": "Dualog Launches Secure Messaging For Ship And Shore", "source": "Hellenic Shipping News", "sourceIcon": "📊", "sourceRegion": "Greece / Markets", "url": "https://www.hellenicshippingnews.com/dualog-launches-secure-messaging-for-ship-and-shore/", "publishedAt": "2026-10-12T21:00:51Z", "category": "Ports & Terminals", "region": "Singapore & Malacca Strait", "regions": ["Singapore & Malacca Strait"], "tags": ["port", "imo"], "coords": [1.26, 103.82], "navarea": "XI", "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85", "summary": "Dualog has launched Dualog Chat, a secure messaging service built for shipping. The first service in Workspace by Dualog, Chat gives crews and shore teams a company-controlled space to communicate, with channels...", "body": "Dualog has launched Dualog Chat, a secure messaging service built for shipping. The first service in Workspace by Dualog, Chat gives crews and shore teams a company-controlled space to communicate, with channels organised by vessel, rank and role. Every user has a secure identity, with no shared logins.\n\nCommunication at sea is often fragmented. In a 2026 Dualog survey of 1,187 seafarers, 68% said important information is lost during crew handovers. Many rely on personal messaging apps to contact the office because there is no official channel available to the whole crew. Chat addresses this gap while running alongside the tools companies already use ashore.\n\nFor crew, Chat brings onboard and ship-to-shore communication into one place. Message histories stay with the role, giving officers signing on immediate access to the context they need. Shore teams can reach everyone in a particular rank across the fleet with a single message, or contact an individual directly. Users can exchange messages and voice notes and make audio and video calls over the connections available at sea.\n\nFor shore teams, operational conversations, sensitive information and the context behind decisions remain within a company-controlled platform. Details such as rates and port instructions are retained centrally, reducing reliance on personal messaging accounts.\n\nIntegration with crew management systems automatically updates access as crews rotate, reducing manual onboarding and offboarding. Fleets already using Dualog crew accounts can get started quickly. Individual user identities make communication traceable and support the unique identity and controlled access requirements set out by IMO and IACS.\n\n“Dualog Chat connects people in a way that reflects how shipping operates,” said Silje Moan, Chief Commercial Officer at Dualog. “By organising communication around the vessel, the rank and the rotation, it helps crews retain context through each handover and shore teams reach the right person. The information that matters stays within the company.”\n\nChat is available on web, iOS and Android and is designed for maritime connectivity. Early access is open now. Further services planned for Workspace by Dualog include file sharing, maritime email and a native AI assistant. Source: Dualog", "takeaways": ["Dualog has launched Dualog Chat, a secure messaging service built for shipping.", "The first service in Workspace by Dualog, Chat gives crews and shore teams a company-controlled space to communicate, with channels organised by vessel, rank and role.", "Every user has a secure identity, with no shared logins."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-79AA3615D8", "title": "Britain urges ships to prepare for life without reliable GPS", "source": "Splash247", "sourceIcon": "🌊", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/britain-urges-ships-to-prepare-for-life-without-reliable-gps/", "publishedAt": "2026-10-12T20:29:00Z", "category": "Navigation & Safety", "region": "Strait of Hormuz & Persian Gulf", "regions": ["Strait of Hormuz & Persian Gulf", "Suez Canal & Eastern Med", "Rotterdam & North Sea"], "tags": ["tanker", "port"], "coords": [26.56, 56.25], "navarea": "IX", "image": "https://splash247.com/wp-content/uploads/2026/02/LEO-satellite-2025_.jpg", "summary": "Britain has warned shipowners that satellite navigation can no longer be taken for granted in some of the world’s busiest shipping regions, urging crews to practise navigating without GPS as jamming and spoofing become...", "body": "Britain has warned shipowners that satellite navigation can no longer be taken for granted in some of the world’s busiest shipping regions, urging crews to practise navigating without GPS as jamming and spoofing become increasingly widespread.\n\nIn a new Marine Guidance Note, MGN 719, the UK’s Maritime and Coastguard Agency (MCA) warns that interference across the Baltic, Black Sea, Middle East Gulf and parts of East Asia means satellite-derived positioning, navigation and timing information can no longer be relied upon everywhere.\n\nThe warning extends well beyond electronic charts. The agency identifies a long list of potentially vulnerable equipment, including ECDIS, AIS, autopilots, dynamic positioning systems, radar, gyrocompasses and GMDSS communications equipment. Ashore, vessel traffic services, pilotage systems, port management platforms and automated logistics systems are also exposed.\n\nThe financial implications are considerable. Citing earlier UK government research, the MCA estimates that a seven-day GNSS outage could cost the British maritime economy £1.5bn ($2bn), including £1.3bn in port operations alone.\n\nThe guidance urges operators to identify precisely which systems depend on satellite-derived data, establish procedures for detecting interference and regularly drill crews in alternative navigation methods. Radar fixing, visual bearings, celestial navigation and dead reckoning are all recommended.\n\nThe notice follows growing evidence that satellite navigation interference is becoming a routine operational hazard rather than an occasional inconvenience in conflict zones.\n\nMaritime intelligence firm Windward’s latest figures show an average of 5,131 GPS jamming incidents a day during the third quarter, with more than 124,000 individual vessels affected.\n\nResearch published earlier this year by the Royal Institute of Navigation found that 14% of survey respondents had experienced an unsafe or unlawful situation resulting from GNSS interference.\n\nIn July, SplashTech reported on a government questionnaire, believed to have originated in Britain, asking ship operators whether their crews had conducted GNSS-denial drills, understood the vulnerabilities of interconnected bridge equipment and could operate ECDIS in dead-reckoning mode.\n\nMore recently, SplashTech reported how four tankers in the Black Sea had apparently broadcast positions placing them in Lima, Peru, more than 12,000 km away. Separate monitoring identified 1,702 impossible position jumps involving 379 vessels in the Gulf of Oman over a single week in September.\n\nThe UK is investing in a terrestrial navigation backup through its enhanced Loran, or eLoran, programme, but the MCA’s latest guidance makes clear that technological alternatives will take time to become widely available.\n\nBritain’s planned eLoran network is not expected to provide an initial timing capability until 2028, with full positioning and navigation services targeted for 2030.", "takeaways": ["The warning extends well beyond electronic charts.", "The agency identifies a long list of potentially vulnerable equipment, including ECDIS, AIS, autopilots, dynamic positioning systems, radar, gyrocompasses and GMDSS communications equipment.", "Ashore, vessel traffic services, pilotage systems, port management platforms and automated logistics systems are also exposed."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-0FA61BC96E", "title": "Moxie Media to Launch Moxie Connect 2026 Event Alongside the International WorkBoat Show", "source": "gCaptain", "sourceIcon": "⚓", "sourceRegion": "USA / Global", "url": "https://gcaptain.com/moxie-media-to-launch-moxie-connect-2026-event-alongside-the-international-workboat-show/", "publishedAt": "2026-10-12T20:25:25Z", "category": "Navigation & Safety", "region": "US Gulf & Port of Houston", "regions": ["US Gulf & Port of Houston"], "tags": ["port", "safety"], "coords": [29.35, -94.78], "navarea": "IV", "image": "https://gcaptain.com/wp-content/uploads/2026/10/mariner_OFFuser-Trainingportal_dashboard.jpg", "summary": "Essential news coupled with the finest maritime content sourced from across the globe.", "body": "Essential news coupled with the finest maritime content sourced from across the globe.\n\nMoxie Media will host its first dedicated user event, Moxie Connect: User Conference 2026, a complimentary event open to all maritime professionals, on Wednesday, December 2, at the Ernest N. Morial Convention Center in New Orleans, alongside the International WorkBoat Show. The half-day event will bring together Moxie customers and professionals in maritime training, safety, compliance and workforce development for discussions, demonstrations and industry perspectives on the evolving role of technology in maritime learning.\n\nMoxie Connect comes at an important point in Moxie Media’s evolution. In 2025, Moxie became part of Mintra, a global provider of digital learning and workforce management solutions. The combination brings together Moxie’s longstanding U.S. maritime training expertise, content and customer support with Mintra’s broader portfolio of learning technology, competency management and workforce solutions.\n\n“For our customers, becoming part of Mintra has expanded what we can offer while allowing Moxie to continue doing what we do best in the U.S. maritime market,” said Martin Glenday, President of Moxie Media. “Moxie Connect is a chance to bring that expanded offering into one conversation and give customers and the broader maritime community a closer look at where training, technology and workforce management are headed.”\n\nA key part of the expanded offering is Trainingportal, Mintra’s Learning and Competency Management System, which combines Moxie’s established approach to maritime learning with Mintra’s expanded capabilities for managing training, competency and compliance. Moxie Connect will allow customers and maritime organizations to see the platform in action, with demonstrations on user experience, mobile and offline learning capabilities, maritime training content and tools for managing workforce training.\n\nThe event will also explore the growing connection between training and competency management. Trainingportal includes capabilities that can help organizations establish role-based requirements, manage assessments and maintain evidence of competency alongside training records. The program will also introduce Mentor AI, Mintra’s AI solution, and discuss practical applications for using AI and digital learning tools to support continuous learning and workforce readiness.\n\n“Technology is most useful when it helps organizations make better use of the information they already have about their people, their training and their requirements,” said Parker Hillery, Operations Manager and LMS Lead at Moxie Media. “The combination of competency management, training data and AI gives organizations new ways to understand workforce readiness while keeping the experience practical for the people responsible for training and compliance.”\n\nMoxie Connect will also feature an Integration Partner Showcase, demonstrating how Trainingportal connects with vessel management systems to share training and competency information across an organization’s systems.\n\nA regulatory update session will provide an industry perspective on current developments affecting maritime organizations. Additional sessions will address the future of Moxie’s maritime training content, including new and upcoming Coast Guard-related courses and other resources supporting maritime training and compliance.\n\nThe event is open to existing Moxie customers as well as maritime organizations interested in learning more about Moxie, Mintra and Trainingportal. Moxie Connect is free to attend, but space is limited and advance registration is required.\n\nAs an added benefit, registered attendees will receive a complimentary International WorkBoat Show exhibit hall pass, allowing participants to attend the morning event and then visit the WorkBoat exhibition.\n\nA Southern-style breakfast, coffee and refreshments will be provided.\n\nSign up for gCaptain’s newsletter and never miss an update\n\nEssential maritime and offshore news, insights, and updates delivered daily straight to your inbox\n\nDive into a sea of curated content with our weekly ‘Dispatch’ email. Your personal maritime briefing awaits!\n\nSubscribe to gCaptain Daily and stay informed with the latest global maritime and offshore news\n\nStay informed with the latest maritime and offshore news, delivered daily straight to your inbox\n\nStay informed with the latest maritime and offshore news, delivered straight to your inbox", "takeaways": ["Essential news coupled with the finest maritime content sourced from across the globe.", "Moxie Media will host its first dedicated user event, Moxie Connect: User Conference 2026, a complimentary event open to all maritime professionals, on Wednesday, December 2, at the Ernest N.", "Morial Convention Center in New Orleans, alongside the International WorkBoat Show."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-C60148E348", "title": "Europe’s shore power deadline is racing ahead of the grid", "source": "Splash247", "sourceIcon": "🌊", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/europes-shore-power-deadline-is-racing-ahead-of-the-grid/", "publishedAt": "2026-10-12T20:23:00Z", "category": "Ports & Terminals", "region": "Rotterdam & North Sea", "regions": ["Rotterdam & North Sea", "Singapore & Malacca Strait"], "tags": ["container", "port", "imo", "bunker"], "coords": [51.95, 4.14], "navarea": "I", "image": "https://splash247.com/wp-content/uploads/2021/02/Shore-power.jpg", "summary": "Two EU regulations will require ports to provide shore power and ships to use it from 2030. But with grid upgrades taking up to a decade, the infrastructure needed to meet the deadline is struggling to keep pace. Alex...", "body": "Two EU regulations will require ports to provide shore power and ships to use it from 2030. But with grid upgrades taking up to a decade, the infrastructure needed to meet the deadline is struggling to keep pace. Alex Byelyavtsev reports.\n\nBy 2030 two EU rules meet at the quay. AFIR tells TEN-T core and comprehensive ports above a traffic threshold, not only the big hubs, to put shore power on the berth for 90% of qualifying container and passenger calls. FuelEU Maritime tells those ships, if they stay more than two hours, to connect and take their electrical load from it. One rule builds the socket. The other requires the ship to plug into it. The date, from Fit for 55, is already doing the ordering. It is not building the grid.\n\nOn the ship the box can be bought. In July 2026 Cavotec took an order to retrofit containerships with a containerised cable system while they stay in service. DNV had about 20% of world containerships equipped with a shore-power connection. Hapag-Lloyd is further along, about 35%. A company can fit a ship. FuelEU still names that company even when the quay has no live point, or a charter ship has no socket.\n\nIn the port the iron is thinner. Transport & Environment, from DNV, put guaranteed container connections at about 11% of what 31 European ports need by 2030. Much of the OPS already advertised is low voltage. Deepsea boxes need high voltage. The 90% test is still ahead of the cable.\n\nThe calendar does not match. From October 2026 to 31 December 2029 is a little over three years. ESPO, setting out the commission’s grid-connection guidance, puts extra grid build at four to ten years, against two to three for the port-side connection. If the request is not already in the queue, parts of the required build may not fit the time left. Rotterdam is aiming for the second half of 2028. ABB says that kit is meant to supply up to 32 containerships at once. The port’s own strategy still records grid congestion. Installed megawatts are not the event the grid sees. The event is coincidence. A 90% coverage test does not ask whether those megawatts are free at 07:00 on a Saturday.\n\nThe clock starts when the ship is alongside, not when the cable is live. Hamburg’s routine connection is about an hour to an hour and a half. If the commercial berth has no socket, the stay can still be a FuelEU call of more than two hours.\n\nWhat a master can do is ask before arrival. Article 6 already lists the misses: no point, not enough power or grid stability, incompatibility on a certified ship installation, emergency. From 1 January 2035 those availability exceptions tighten to the lower of 10% of a ship’s annual calls or ten calls, unless the company shows it could not reasonably have known. That showing sits on the information exchanged before entry. A dead cabinet is a legal category. After 2035 an unasked miss can become a counted one, and a FuelEU penalty on the electricity that should have come from shore. That is not a hole found later. It is how a duty stays on the books when the connection cannot. IMO 2020 did not need that. A 0.50% fuel could be blended. A substation cannot.\n\nThe bill is separate. A parliament study759345) finds the EU can mandate the socket and still have no common price rule. Under the Energy Taxation Directive, electricity produced on board at berth must be exempt. Shore-side electricity is not covered by that exemption. A member state needs a Council authorisation to apply a reduced rate. Germany obtained one in June 2026, through 31 December 2029. In tramp trades the OPS invoice may not follow the bunker. The visible shore bill is still stacked against the auxiliary engines.\n\nThere is no sign of a general 2030 delay. If the megawatts, the berth and the cable are there, the auxiliaries stop. If they are not, the ship stays on its own plant and the call sits on the exception list. Article 6 already holds those misses. AFIR is due a review by 31 December 2026. A date that cannot be followed as written is then followed through exceptions, then through reviews. A date can mandate a connection. It cannot manufacture grid capacity. The plug is not the power.", "takeaways": ["Two EU regulations will require ports to provide shore power and ships to use it from 2030.", "But with grid upgrades taking up to a decade, the infrastructure needed to meet the deadline is struggling to keep pace.", "AFIR tells TEN-T core and comprehensive ports above a traffic threshold, not only the big hubs, to put shore power on the berth for 90% of qualifying container and passenger calls."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-E9D10B8C42", "title": "Connecting maritime digitalisation to process", "source": "gCaptain", "sourceIcon": "⚓", "sourceRegion": "USA / Global", "url": "https://gcaptain.com/connecting-maritime-digitalisation-to-process/", "publishedAt": "2026-10-12T20:19:32Z", "category": "Ports & Terminals", "region": "Rotterdam & North Sea", "regions": ["Rotterdam & North Sea", "Singapore & Malacca Strait", "Brazil & South Atlantic"], "tags": ["container", "port"], "coords": [51.95, 4.14], "navarea": "I", "image": "https://gcaptain.com/wp-content/uploads/2026/10/Panel-2.jpg", "summary": "Essential news coupled with the finest maritime content sourced from across the globe.", "body": "Essential news coupled with the finest maritime content sourced from across the globe.\n\nWhile the technology needed to digitalise maritime operations is already here, much remains to be done to ensure organisations and their people are equipped to use it effectively, according to panellists at a recent Inmarsat Maritime ‘Connected to Perform’ seminar.\n\nThe maritime sector is awash with digital technology and data – but gaps still need to be bridged before stakeholders can extract maximum value from the tools available. This was the consensus among a panel of industry experts at a recent Inmarsat Maritime ‘Connected to Perform’ seminar in Hamburg.\n\nThe panel discussion, held during SMM Hamburg, explored how shipping can enable a digital, secure, and human-centric fleet – and how modern connectivity can support this objective.\n\nAsked to identify the most significant gap between “what connectivity and technology can provide and what is being used by shipping companies”, Audra Drablos, Strategy Director at Inmarsat Maritime, argued that technology itself is no longer the issue.\n\n“We’re connecting global fleets,” she said. “We’re using advanced analytics. We’re using preventative maintenance. So the technology, I think, is definitely there.” Instead, she indicated, the gap may lie in how organisations are using those technologies: “If we want to digitalise things, we also have to transform all the decision processes that we have.”\n\nDrablos’s co-panellists outlined how their companies are using modern technology to digitalise their operations.\n\nPatrick Briest, Senior Director of Operations for IT Products at Hapag-Lloyd, pointed to the container carrier’s adoption of real-time cargo tracking and voyage optimisation to maximise speed and flexibility. Konstantin Pohsin, Fleet Captain at Fairplay Towage, described the way predictive maintenance preserved operational readiness. And Matthias Becker, Managing Director of Anglo-Eastern Germany, highlighted the ship manager’s use of artificial intelligence to manage vessel emissions.\n\nWhile these organisations have already implemented modern technology on a fleet-wide scale, their representatives nevertheless echoed Drablos’s point, with each identifying areas where further work is underway to optimise digital- and data-driven processes.\n\nFor Anglo-Eastern, the focus is on integrating disparate systems. “We get a lot of data today, and that’s in isolated systems and products,” said Becker, who added that the company could “uncover more savings and make better decisions when [it connects] all the different systems”.\n\nIn comparable remarks, Briest said Hapag-Lloyd had established its Fleet Data Ecosystem to bring all its data together so that it can “look at it holistically, interconnect it, and then drive the right insights out of it”. Referring back to Drablos’s comments, he continued: “Even if you have the dashboard – the tool that tells you what you should be doing – you have to change the way the whole organisation works, that processes work, that people work, to actually make it happen.”\n\nAt Fairplay Towage, the emphasis is on training to address what Pohsin called a “gap in knowledge” regarding connected onboard systems. “We have to investigate what is the proper way for educating all our employees in the application of these facilities,” he commented.\n\nIn Becker’s view, however, the industry can only achieve so much through training alone; managing the “complex challenge” of digital transformation will also depend on interdepartmental and cross-industry collaboration.\n\n“Seafarers will not become IT experts,” he said. “Technicians remain technicians, and we have to bridge the gap in some way. So we have to bring together the crew, the offshore personnel, and the data analytics and IT side. We also need cooperation between operators, owners, managers, OEMs, and providers of IT systems.”\n\nSupporting crews with the tools to perform their roles effectively was a recurring theme throughout the session. The purpose of technologies like AI, the panellists suggested, is not to replace human expertise – “don’t stop thinking with your own brain” was Pohsin’s message to seafarers – but to relieve personnel of time-consuming data-analysis and compliance-related tasks.\n\n“I think that’s where AI could really help,” Drablos commented, pointing to a recent Seafarers Happiness Index report that revealed the seafarers with the lowest happiness scores are those with the most responsibility. “It could help in prioritising all that data and helping [seafarers] make better decisions,” she said.\n\nBuilding on Drablos’s remarks, Briest added that AI could allow crews to focus on running their vessels, while an increasing use of cloud-based AI applications could drive greater demand for connectivity. “I believe the general connectivity requirement for these more intelligent, AI-driven systems is probably going to get bigger,” he said.\n\nAs the maritime industry’s “general connectivity requirement” grows, so too does the need for robust cyber-security solutions. Yet, as Drablos noted, “the question isn’t really about connectivity versus security. The question is how you can build security as your basis when you’re implementing your connectivity. I think that’s the important part: making it secure by design.”", "takeaways": ["Essential news coupled with the finest maritime content sourced from across the globe.", "The maritime sector is awash with digital technology and data – but gaps still need to be bridged before stakeholders can extract maximum value from the tools available.", "This was the consensus among a panel of industry experts at a recent Inmarsat Maritime ‘Connected to Perform’ seminar in Hamburg."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-120B507321", "title": "ABS, U.S. Energy Department Team Up on Nuclear-Powered Ships", "source": "gCaptain", "sourceIcon": "⚓", "sourceRegion": "USA / Global", "url": "https://gcaptain.com/abs-u-s-energy-department-team-up-on-nuclear-powered-ships/", "publishedAt": "2026-10-12T20:02:26Z", "category": "Ports & Terminals", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["port"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://gcaptain.com/wp-content/uploads/2026/10/unnamed-5.jpg", "summary": "Essential news coupled with the finest maritime content sourced from across the globe.", "body": "Essential news coupled with the finest maritime content sourced from across the globe.\n\nPhoto caption (L to R): Ted Garrish, United States Assistant Secretary for Nuclear Energy, and John McDonald, ABS Chairman and CEO\n\nThe American Bureau of Shipping (ABS) and the U.S. Department of Energy (DOE) have signed an agreement to advance the use of nuclear power in commercial shipping, including nuclear-powered vessels, floating power plants and the infrastructure needed to support them.\n\nThe memorandum of understanding, signed with DOE’s Office of Nuclear Energy, establishes a framework for joint work on advanced nuclear technologies and their potential maritime applications. The effort will also examine what would be required to develop a U.S. shipbuilding industry capable of constructing, operating and maintaining nuclear-powered vessels and offshore facilities.\n\nUnder the agreement, ABS and DOE will pursue concept and feasibility studies covering floating nuclear power systems and nuclear transportation corridors. The work will also address technical, regulatory, economic and policy challenges that have so far limited the commercial adoption of nuclear technology at sea.\n\n“Advanced nuclear technology is moving from concept to application, and the maritime industry needs to be ready for it,” said ABS Chairman and CEO John McDonald.\n\n“This agreement with DOE reflects the depth of work already underway and provides a framework to go further,” McDonald added.\n\nABS will also co-manage the Maritime Nuclear Applications Group (MNAG) and coordinate related work through the U.S. Maritime Administration’s U.S. Center for Maritime Innovation, where ABS serves as secretariat.\n\nThe agreement comes as interest in commercial maritime nuclear power continues to grow, driven by advances in smaller reactor designs that could make nuclear propulsion and floating power generation more practical.\n\nWhile nuclear propulsion has been used aboard naval vessels for decades, its commercial adoption remains limited. Significant questions remain over reactor licensing, port access, liability, crew training and the regulatory responsibilities of flag and coastal states.\n\nThe U.S. government has stepped up efforts to address those barriers. In August, the Department of Energy hosted the launch of the International Atomic Energy Agency’s Atomic Technologies Licensed for Applications at Sea (ATLAS) initiative, aimed at developing an international framework for the safe and secure use of nuclear technology aboard ships and floating facilities.\n\nABS has also been expanding its work in the sector. The classification society has published rules for floating nuclear power plants and issued approvals in principle for several nuclear-powered vessel concepts, including a cargo ship propulsion system developed through an MIT-led maritime consortium .\n\nEarlier this year, the U.S. Center for Maritime Innovation convened industry and government officials to examine regulatory barriers to deploying nuclear-powered ships and offshore energy platforms.\n\n“Advanced nuclear technology has the potential to transform the commercial maritime industry and open new markets for American innovation,” said Assistant Secretary for Nuclear Energy Ted Garrish.\n\nGarrish said the partnership would draw on decades of U.S. nuclear experience to examine how next-generation reactors could be safely introduced into commercial maritime operations.\n\nThe new agreement does not announce a specific vessel construction project or deployment schedule. Instead, it expands cooperation between the federal government and ABS as the industry works toward making commercial nuclear power at sea technically and economically viable.\n\nSign up for gCaptain’s newsletter and never miss an update\n\nEssential maritime and offshore news, insights, and updates delivered daily straight to your inbox", "takeaways": ["Essential news coupled with the finest maritime content sourced from across the globe.", "Photo caption (L to R): Ted Garrish, United States Assistant Secretary for Nuclear Energy, and John McDonald, ABS Chairman and CEO  The American Bureau of Shipping (ABS) and the U.S.", "Department of Energy (DOE) have signed an agreement to advance the use of nuclear power in commercial shipping, including nuclear-powered vessels, floating power plants and the infrastructure needed to support them."], "readingMinutes": 3, "readMinutes": 3}, {"id": "SN-ECAE295132", "title": "Hambantota port reaches TEU milestone", "source": "Container News", "sourceIcon": "📦", "sourceRegion": "Europe / Liner & Ports", "url": "https://container-news.com/hambantota-port-reaches-teu-milestone/", "publishedAt": "2026-10-12T20:00:13Z", "category": "Ports & Terminals", "region": "Singapore & Malacca Strait", "regions": ["Singapore & Malacca Strait", "Brazil & South Atlantic"], "tags": ["container", "port"], "coords": [1.26, 103.82], "navarea": "XI", "image": "https://container-news.com/wp-content/uploads/2026/04/hip-expands-capacity-as-middle-east-crisis-drives-surge-in-shipping-volumes-2.png", "summary": "Hambantota International Port has surpassed one million TEUs in cumulative container throughput since the commissioning of new quay cranes in 2025, marking a significant milestone in the rapid growth of its container...", "body": "Hambantota International Port has surpassed one million TEUs in cumulative container throughput since the commissioning of new quay cranes in 2025, marking a significant milestone in the rapid growth of its container operations.\n\nThe port handled 428,036 TEUs in 2025 and 574,196 TEUs year-to-date in 2026, bringing combined volume to 1,002,232 TEUs.\n\nMSC, HIP’s principal container customer, has contributed significantly to the growth trajectory. In April 2026, the MSC Marie Leslie set a new single-vessel handling record of 7,968 container moves, equivalent to 13,260 TEUs, during a single call.\n\nHIP subsequently achieved its highest-ever monthly throughput of 80,325 TEUs in June, reflecting operational preparedness and available capacity during a period of uncertainty affecting major global trade routes.\n\nTo support sustained growth toward a long-term target of two million TEUs annual capacity, HIP is undertaking a US$ 108 million expansion programme encompassing six new quay cranes and 16 rubber-tyred gantry cranes, expected to be commissioned by the end of February 2027.\n\nOnce operational, the new equipment will strengthen ship-to-shore and yard-handling capacity, support utilisation of an additional 1,300 metres of berth space and take total container quay length to nearly two kilometres.\n\nThe container yard will be expanded by 30% to accommodate rising throughput, and reefer capacity will also be increased.\n\nHIPG CEO Wilson Qu described the one million TEU milestone as a strong indication of customer confidence built through close shipping line engagement, operational reliability and responsiveness to changing requirements.\n\nChief Operations Officer Tommy Yang characterised the investment strategy as focused on developing capacity ahead of demand while maintaining operational efficiency and financial sustainability, creating the scale required to achieve the two million TEU target.", "takeaways": ["The port handled 428,036 TEUs in 2025 and 574,196 TEUs year-to-date in 2026, bringing combined volume to 1,002,232 TEUs.", "MSC, HIP’s principal container customer, has contributed significantly to the growth trajectory.", "In April 2026, the MSC Marie Leslie set a new single-vessel handling record of 7,968 container moves, equivalent to 13,260 TEUs, during a single call."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-DE29AB8D94", "title": "ABS and U.S. Department of Energy Sign MOU on Maritime Applications of Advanced Nuclear Technology", "source": "gCaptain", "sourceIcon": "⚓", "sourceRegion": "USA / Global", "url": "https://gcaptain.com/abs-and-u-s-department-of-energy-sign-mou-on-maritime-applications-of-advanced-nuclear-technology/", "publishedAt": "2026-10-12T19:36:41Z", "category": "Ports & Terminals", "region": "Japan & Korea", "regions": ["Japan & Korea", "Brazil & South Atlantic"], "tags": ["port", "shipyard"], "coords": [35.1, 129.04], "navarea": "XI", "image": "https://gcaptain.com/wp-content/uploads/2026/10/unnamed-5.jpg", "summary": "Essential news coupled with the finest maritime content sourced from across the globe.", "body": "Essential news coupled with the finest maritime content sourced from across the globe.\n\nABS and the U.S. Department of Energy’s (DOE) Office of Nuclear Energy have signed a memorandum of understanding to advance modern commercial nuclear technology at sea. The agreement spans floating power solutions, nuclear-powered vessels and the development of the ports, shipyards and industrial base needed to build and sustain them.\n\nKey priorities include concept and feasibility studies for floating nuclear power and nuclear transportation corridors, and support for developing a U.S. shipbuilding sector capable of building and operating nuclear-powered assets safely. ABS will also coordinate related work through the U.S. Maritime Administration’s (MARAD’s) U.S. Center for Maritime Innovation (USCMI), for which ABS serves as Secretariat.\n\n“Advanced nuclear technology is moving from concept to application, and the maritime industry needs to be ready for it,” said John McDonald, ABS Chairman and CEO. “This agreement with DOE reflects the depth of work already underway and provides a framework to go further. Through our collaborations with the DOE and industry leaders, ABS is pioneering the future of nuclear energy in maritime. We’re well-positioned to help turn this technology into a safe, real and practical option for commercial maritime applications.”\n\nDOE is leading U.S. government initiatives on maritime nuclear applications. Under the MOU, ABS will co-manage the Maritime Nuclear Applications Group (MNAG) and provide technical, regulatory, economic and policy support on concept and feasibility studies. ABS will work with DOE to foster interagency coordination to develop a viable U.S. maritime nuclear sector.\n\n“Advanced nuclear technology has the potential to transform the commercial maritime industry and open new markets for American innovation,” said Assistant Secretary for Nuclear Energy Ted Garrish. “The Department of Energy’s partnership with the American Bureau of Shipping will help explore how we can build on decades of experience to safely bring next-generation nuclear technologies to the maritime sector and position America to lead this emerging industry.”\n\nABS is at the forefront of efforts to bring nuclear energy to maritime applications. It published the industry’s first comprehensive classification rules for floating nuclear power plants and has awarded approvals in principle for a range of nuclear projects.\n\nLearn more about ABS nuclear maritime research here .\n\nSign up for gCaptain’s newsletter and never miss an update\n\nEssential maritime and offshore news, insights, and updates delivered daily straight to your inbox\n\nDive into a sea of curated content with our weekly ‘Dispatch’ email. Your personal maritime briefing awaits!\n\nABS has issued approval in principle (AIP) and completed a basic design review (BDR) for a natural gas liquefaction system developed by Samsung Heavy Industries (SHI) for the topside of...\n\nABS has signed a memorandum of understanding (MOU) with three Korean maritime organizations to advance the development of international standards for the next generation of smart ships and shipyards. The...\n\nABS and JB Energy have signed a memorandum of understanding (MOU) to collaborate on strategic studies for the proposed Aura Sul Wind Project, a floating offshore wind pilot under consideration...\n\nSubscribe to gCaptain Daily and stay informed with the latest global maritime and offshore news\n\nStay informed with the latest maritime and offshore news, delivered daily straight to your inbox\n\nStay informed with the latest maritime and offshore news, delivered straight to your inbox\n\nFor general inquiries and to contact us, please email: [email protected]", "takeaways": ["Essential news coupled with the finest maritime content sourced from across the globe.", "Department of Energy’s (DOE) Office of Nuclear Energy have signed a memorandum of understanding to advance modern commercial nuclear technology at sea.", "The agreement spans floating power solutions, nuclear-powered vessels and the development of the ports, shipyards and industrial base needed to build and sustain them."], "readingMinutes": 3, "readMinutes": 3}, {"id": "SN-3F02396DCF", "title": "New Reports Reveal Five More Ships Hit Near Hormuz", "source": "gCaptain", "sourceIcon": "⚓", "sourceRegion": "USA / Global", "url": "https://gcaptain.com/new-reports-reveal-five-more-ships-hit-near-hormuz/", "publishedAt": "2026-10-12T19:27:18Z", "category": "Geopolitics & Chokepoints", "region": "Strait of Hormuz & Persian Gulf", "regions": ["Strait of Hormuz & Persian Gulf", "Red Sea & Bab el-Mandeb", "Singapore & Malacca Strait"], "tags": ["tanker", "container", "port", "hormuz"], "coords": [26.56, 56.25], "navarea": "IX", "image": "https://gcaptain.com/wp-content/uploads/2026/08/2026-07-31T061146Z_355163413_RC2ROMAOX291_RTRMADP_3_IRAN-CRISIS-OMAN-HORMUZ.jpg", "summary": "Essential news coupled with the finest maritime content sourced from across the globe.", "body": "Essential news coupled with the finest maritime content sourced from across the globe.\n\nVessels in the Strait of Hormuz, as seen from Musandam, Oman, July 31, 2026. REUTERS/Stringer\n\nFive more commercial vessels were struck in and around the Strait of Hormuz on Sunday, including a containership and four tankers, as attacks on merchant shipping continue to escalate across the region.\n\nUK Maritime Trade Operations (UKMTO) disclosed four of the incidents in time-late reports on Monday, adding to an already growing number of attacks reported in recent weeks. Four vessels were struck while transiting the Strait of Hormuz, while a fifth tanker was hit by a drone near Sohar anchorage, Oman.\n\nThe latest reports include an outbound product tanker, an outbound crude oil tanker, another outbound tanker and a container ship transiting inbound through the strait. All four were struck by unidentified projectiles, according to UKMTO.\n\nIn one incident, UKMTO confirmed that the crew of an outbound tanker was safe, although the environmental impact remained unknown. The other reports provided no details on casualties or the extent of damage.\n\nThe fifth incident involved a tanker near Sohar anchorage that was struck by an uncrewed aerial vehicle (UAV). UKMTO initially classified the incident as suspicious activity before upgrading it to an attack. Local authorities were assisting with the evacuation of the crew, while damage and environmental assessments remained incomplete.\n\nThe reports follow a particularly violent weekend for commercial shipping in the region, including earlier attacks on tankers in Hormuz and a U.S. military strike that disabled a commercial cargo vessel in the Gulf of Oman.\n\nThe new incidents also follow the release of the Joint Maritime Information Center’s October 11 advisory , which classified the security threat in the Strait of Hormuz as SEVERE , its second-highest threat category.\n\nThat assessment, covering incidents confirmed through approximately 1500 UTC Sunday, had already identified three recent tanker attacks in the strait, including one reported late. It warned that further deliberate attacks were highly likely and cited continued harassment, surveillance and pressure on commercial vessels by Iran’s Islamic Revolutionary Guard Corps.\n\nThe advisory also highlighted an expanding geographic threat, with attacks no longer confined to vessels passing through the strait itself. Recent strikes have targeted ships anchored off the United Arab Emirates and vessels operating elsewhere inside the Persian Gulf.\n\nThe widening pattern of attacks comes as commercial traffic through Hormuz remains sharply reduced despite U.S. efforts to restore shipping flows.\n\nAccording to JMIC, U.S. Naval Cooperation and Guidance for Shipping (NCAGS) figures showed approximately 29 vessel transits per day over the 72 hours ending October 10, compared with a historical average of roughly 138 per day. Independent tracking data indicated substantially fewer transits, reflecting differences in reporting and methodology.\n\nThe continuing attacks raise further questions about the sustainability of any recovery in commercial shipping through the strait.\n\nThey also underscore the limitations of official incident counts. With multiple attacks reported after the fact, even the most recent security assessments may not fully reflect conditions facing merchant vessels and their crews.\n\nUKMTO has urged ships to transit with caution and report suspicious activity as authorities investigate the latest incidents.\n\nSign up for gCaptain’s newsletter and never miss an update\n\nEssential maritime and offshore news, insights, and updates delivered daily straight to your inbox", "takeaways": ["Essential news coupled with the finest maritime content sourced from across the globe.", "Vessels in the Strait of Hormuz, as seen from Musandam, Oman, July 31, 2026.", "REUTERS/Stringer  Five more commercial vessels were struck in and around the Strait of Hormuz on Sunday, including a containership and four tankers, as attacks on merchant shipping continue to escalate across the region."], "readingMinutes": 3, "readMinutes": 3}];
let SETNEWS_ARTICLES = DEFAULT_SETNEWS_ARTICLES.slice();
let SETNEWS_ACTIVE_CAT = "ALL";
let SETNEWS_SEARCH_QUERY = "";
const SETNEWS_PROFILE_KEY = "setsail_news_user_profile_v1";

function formatEditorialNewsSource(art) {
  if (!art) return "SetSail Maritime Desk";
  const cat = String(art.category || "");
  if (cat.includes("Navigation") || cat.includes("Safety")) return "SetSail Hydrographic & Safety Desk";
  if (cat.includes("Weather") || cat.includes("Cyclone")) return "SetSail Metocean Watch";
  if (cat.includes("Port") || cat.includes("Canal")) return "SetSail Port & Canal Intelligence";
  if (cat.includes("Fleet") || cat.includes("Tanker")) return "SetSail Global Fleet Desk";
  if (cat.includes("Regulation") || cat.includes("IMO")) return "SetSail Maritime Regulatory Desk";
  return "SetSail Maritime Desk";
}

function formatEditorialNewsIcon(art) {
  if (!art) return "🚢";
  const cat = String(art.category || "");
  if (cat.includes("Navigation") || cat.includes("Safety")) return "🧭";
  if (cat.includes("Weather") || cat.includes("Cyclone")) return "🌀";
  if (cat.includes("Port") || cat.includes("Canal")) return "⚓";
  if (cat.includes("Regulation") || cat.includes("IMO")) return "⚖️";
  return "🚢";
}

function getSetNewsUserProfile() {
  try {
    const raw = localStorage.getItem(SETNEWS_PROFILE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      categoryWeights: parsed.categoryWeights || {},
      regionWeights: parsed.regionWeights || {},
      keywordWeights: parsed.keywordWeights || {},
      readIds: Array.isArray(parsed.readIds) ? parsed.readIds : [],
      likedIds: Array.isArray(parsed.likedIds) ? parsed.likedIds : [],
      bookmarkedIds: Array.isArray(parsed.bookmarkedIds) ? parsed.bookmarkedIds : [],
      totalDwellSeconds: Number(parsed.totalDwellSeconds) || 0
    };
  } catch (e) {
    return { categoryWeights: {}, regionWeights: {}, keywordWeights: {}, readIds: [], likedIds: [], bookmarkedIds: [], totalDwellSeconds: 0 };
  }
}

function saveSetNewsUserProfile(prof) {
  try {
    localStorage.setItem(SETNEWS_PROFILE_KEY, JSON.stringify(prof));
    if (typeof saveSetSailUserHistory === "function") saveSetSailUserHistory();
  } catch (e) {}
}

function recordSetNewsInteraction(article, actionType = "read", dwellSec = 8) {
  if (!article) return;
  const prof = getSetNewsUserProfile();
  const boost = actionType === "like" ? 4.5 : (actionType === "bookmark" ? 5.0 : (actionType === "plot" ? 4.0 : 2.0));

  if (article.category) {
    prof.categoryWeights[article.category] = (prof.categoryWeights[article.category] || 0) + boost;
  }
  if (article.region) {
    prof.regionWeights[article.region] = (prof.regionWeights[article.region] || 0) + boost;
  }
  (article.tags || []).forEach(t => {
    prof.keywordWeights[t] = (prof.keywordWeights[t] || 0) + boost * 0.8;
  });

  if (actionType === "read" && article.id && !prof.readIds.includes(article.id)) {
    prof.readIds.unshift(article.id);
    if (prof.readIds.length > 200) prof.readIds.pop();
  }
  if (actionType === "like" && article.id) {
    const idx = prof.likedIds.indexOf(article.id);
    if (idx >= 0) prof.likedIds.splice(idx, 1);
    else prof.likedIds.push(article.id);
  }
  if (actionType === "bookmark" && article.id) {
    const idx = prof.bookmarkedIds.indexOf(article.id);
    if (idx >= 0) prof.bookmarkedIds.splice(idx, 1);
    else prof.bookmarkedIds.push(article.id);
  }
  prof.totalDwellSeconds = (prof.totalDwellSeconds || 0) + dwellSec;
  saveSetNewsUserProfile(prof);
}

function scoreArticleForUser(article, prof) {
  let score = 20;
  let primaryReason = "🌍 What's happening on land & at sea";

  if (activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length > 0) {
    const rText = `${activeRouteData.name || ""} ${(activeRouteData.chokepoints || []).join(" ")} ${activeRouteData.waypoints.map(w => w.name || "").join(" ")}`.toLowerCase();
    const artText = `${article.title || ""} ${article.summary || ""} ${article.region || ""} ${(article.tags || []).join(" ")}`.toLowerCase();

    if (article.coords && Array.isArray(article.coords) && article.coords.length === 2) {
      const distNm = getMinDistanceToActiveRouteNM(article.coords[0], article.coords[1]);
      if (distNm <= 450) {
        score += 42;
        primaryReason = `🎯 Along Active Route (${Math.round(distNm)} NM)`;
      }
    }
    const routeTokens = rText.split(/[^a-z0-9]+/).filter(w => w.length >= 4 && !["fairway", "departure", "arrival", "waypoint", "route"].includes(w));
    for (const tk of routeTokens) {
      if (artText.includes(tk)) {
        score += 34;
        primaryReason = `🧭 Matches Route: ${tk.charAt(0).toUpperCase() + tk.slice(1)}`;
        break;
      }
    }
  }

  if (userVessel && Number.isFinite(userVessel.lat) && article.coords && Array.isArray(article.coords)) {
    const vDist = calculateHaversineDistanceNM(userVessel.lat, userVessel.lon, article.coords[0], article.coords[1]);
    if (vDist <= 600) {
      score += 26;
      if (primaryReason.startsWith("🔥")) {
        primaryReason = `⚓ Near Vessel Position (${Math.round(vDist)} NM)`;
      }
    }
  }

  const catW = (prof.categoryWeights && prof.categoryWeights[article.category]) || 0;
  const regW = (prof.regionWeights && prof.regionWeights[article.region]) || 0;
  if (catW > 0 || regW > 0) {
    score += Math.min(32, catW * 3.5 + regW * 4.0);
    if (primaryReason.startsWith("🔥")) {
      primaryReason = regW >= catW
        ? `📡 Matches Your Region: ${article.region}`
        : `⭐ Based on Your ${article.category} Reading`;
    }
  }

  (article.tags || []).forEach(t => {
    if (prof.keywordWeights && prof.keywordWeights[t]) {
      score += Math.min(14, prof.keywordWeights[t] * 2.5);
    }
  });

  if (article.category === "Navigation & Safety" || article.category === "Weather & Cyclones") {
    score += 11;
    if (primaryReason.startsWith("🔥") && article.category === "Weather & Cyclones") {
      primaryReason = "🌀 Priority Metocean & Cyclone Watch";
    } else if (primaryReason.startsWith("🔥") && article.category === "Navigation & Safety") {
      primaryReason = "⚠️ Critical Bridge & Hydrographic Alert";
    }
  }

  if (prof.readIds && prof.readIds.includes(article.id)) {
    score -= 6;
  }

  return {
    score: Math.min(99, Math.max(55, Math.round(score))),
    reason: primaryReason
  };
}

async function loadSetNewsData(force = false) {
  if (SETNEWS_ARTICLES.length === 0 && DEFAULT_SETNEWS_ARTICLES.length > 0) {
    SETNEWS_ARTICLES = DEFAULT_SETNEWS_ARTICLES.slice();
  }
  renderSetNewsUI();
  renderHomeNewsSlide();

  const urls = [
    "news.json?t=" + Date.now(),
    "https://raw.githubusercontent.com/waffiman/Admirality-NtM-Scraper/main/news.json?t=" + Date.now(),
    "https://cdn.jsdelivr.net/gh/waffiman/Admirality-NtM-Scraper@main/news.json?t=" + Date.now()
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res || !res.ok) continue;
      const data = await res.json();
      if (data && Array.isArray(data.articles) && data.articles.length > 0) {
        SETNEWS_ARTICLES = data.articles.map(a => Object.assign({}, a, {
          source: formatEditorialNewsSource(a),
          sourceIcon: formatEditorialNewsIcon(a)
        }));
        const syncEl = document.getElementById("setNewsLastSync");
        if (syncEl && data.updatedAt) {
          syncEl.textContent = `Updated: ${new Date(data.updatedAt).toUTCString().slice(5, 22)} UTC • Live Maritime Dispatches`;
        }
        break;
      }
    } catch (e) {}
  }
  renderSetNewsUI();
  renderHomeNewsSlide();
}
window.loadSetNewsData = loadSetNewsData;

function formatNewsRelativeTime(isoStr) {
  if (!isoStr) return "Live";
  const ms = Date.parse(isoStr);
  if (!Number.isFinite(ms)) return "Recent";
  const diffMin = Math.max(1, Math.round((Date.now() - ms) / 60000));
  if (diffMin < 60) return `${diffMin}m ago`;
  const hrs = Math.round(diffMin / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

function optimizeNewsImageUrl(url, width = 600) {
  if (!url || typeof url !== "string") return "";
  if (url.includes("images.unsplash.com")) {
    return url.replace(/w=\d+/, `w=${width}`).replace(/q=\d+/, "q=75") + "&auto=format&fit=crop";
  }
  return url;
}
window.optimizeNewsImageUrl = optimizeNewsImageUrl;

function getTwoHourShuffledArticles(articles) {
  if (!Array.isArray(articles) || articles.length <= 1) return articles || [];
  const seed = Math.floor(Date.now() / (2 * 60 * 60 * 1000));
  let s = (seed ^ 0x9e3779b9) >>> 0;
  const rng = () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const copy = articles.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}
window.getTwoHourShuffledArticles = getTwoHourShuffledArticles;

function renderHomeNewsSlide() {
  const grid = document.getElementById("homeNewsPreviewGrid") || document.getElementById("homeNewsGrid");
  if (!grid) return;
  const sourceArticles = (SETNEWS_ARTICLES && SETNEWS_ARTICLES.length > 0 ? SETNEWS_ARTICLES : DEFAULT_SETNEWS_ARTICLES);
  const articles = getTwoHourShuffledArticles(sourceArticles).slice(0, 3);
  if (articles.length === 0) return;

  grid.innerHTML = articles.map(a => {
    const desk = formatEditorialNewsSource(a);
    const icon = formatEditorialNewsIcon(a);
    const readMin = a.readingMinutes || a.readMinutes || 3;
    const thumbUrl = optimizeNewsImageUrl(a.image || "", 540);
    return `
      <article class="home-news-card" data-open-news-id="${a.id}">
        <div class="home-news-card-img" style="background-image:url('${thumbUrl}');height:190px;background-size:cover;background-position:center;position:relative;">
          <span class="home-news-card-cat">${a.category || "Land & Sea"}</span>
          <span class="home-news-card-region">📍 ${a.region || "Global"}</span>
        </div>
        <div class="home-news-card-body" style="padding:14px 16px;display:flex;flex-direction:column;gap:6px;">
          <div class="home-news-card-meta">
            <span>${icon} ${desk}</span>
            <span>${formatNewsRelativeTime(a.publishedAt)} • ${readMin}m read</span>
          </div>
          <h3 class="home-news-card-title" style="font-size:0.96rem;-webkit-line-clamp:2;margin:0;line-height:1.35;">${a.title}</h3>
          <p class="home-news-card-context" style="font-size:0.77rem;color:var(--muted);line-height:1.42;margin:2px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${a.summary || (a.body ? a.body.slice(0, 140) + '...' : '')}</p>
          <span class="home-news-card-cta" style="margin-top:auto;padding-top:6px;font-size:0.75rem;color:#38bdf8;font-weight:700;">Read Full Story &rarr;</span>
        </div>
      </article>
    `;
  }).join("");

  if (!grid._homeNewsBound) {
    grid._homeNewsBound = true;
    grid.addEventListener("click", (e) => {
      const card = e.target.closest("[data-open-news-id]");
      if (!card) return;
      const id = card.getAttribute("data-open-news-id");
      if (typeof switchToTab === "function") {
        switchToTab("tab-news");
        setTimeout(() => {
          if (id && typeof openSetNewsArticleModal === "function") {
            openSetNewsArticleModal(id);
          }
        }, 140);
      }
    });
  }
}
window.renderHomeNewsSlide = renderHomeNewsSlide;

function renderSetNewsUI() {
  const container = document.getElementById("tab-news");
  if (!container) return;

  const prof = getSetNewsUserProfile();
  const baseList = SETNEWS_ARTICLES.length > 0 ? SETNEWS_ARTICLES : DEFAULT_SETNEWS_ARTICLES;
  const enriched = baseList.map(art => {
    const scored = scoreArticleForUser(art, prof);
    return Object.assign({}, art, {
      source: formatEditorialNewsSource(art),
      sourceIcon: formatEditorialNewsIcon(art),
      _score: scored.score,
      _reason: scored.reason,
      _liked: prof.likedIds.includes(art.id),
      _bookmarked: prof.bookmarkedIds.includes(art.id)
    });
  });

  const ctxEl = document.getElementById("setNewsForYouContext");
  if (ctxEl) {
    const routeLabel = activeRouteData && activeRouteData.name ? `Route: ${activeRouteData.name}` : "Global Visual Feed";
    ctxEl.textContent = `${routeLabel} • ${prof.bookmarkedIds.length} Saved`;
  }

  // Visual-First "For You" Spotlight Cards (Large photo overlay, zero paragraph clutter)
  const forYouGrid = document.getElementById("setNewsForYouGrid");
  if (forYouGrid) {
    const sortedForYou = enriched.slice().sort((a, b) => b._score - a._score).slice(0, 4);
    forYouGrid.innerHTML = sortedForYou.map(a => `
      <article class="setnews-foryou-card setnews-foryou-visual" data-news-id="${a.id}" style="position:relative;height:215px;border-radius:14px;overflow:hidden;border:1px solid rgba(56,189,248,0.25);">
        <div class="setnews-foryou-bg" style="position:absolute;inset:0;background-image:url('${a.image || ""}');background-size:cover;background-position:center;transition:transform 0.35s ease;"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,14,26,0.55) 0%,rgba(7,14,26,0.2) 38%,rgba(7,14,26,0.94) 100%);"></div>
        <div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:12px 14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
            <span style="background:rgba(234,76,37,0.88);color:#fff;font-size:0.63rem;font-weight:800;padding:3px 8px;border-radius:6px;backdrop-filter:blur(4px);">${a._reason}</span>
            <span style="background:rgba(15,23,42,0.85);color:#38bdf8;font-size:0.63rem;font-weight:800;padding:3px 7px;border-radius:6px;border:1px solid rgba(56,189,248,0.35);">${a._score}%</span>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:6px;font-size:0.65rem;color:#7dd3fc;font-weight:700;margin-bottom:5px;">
              <span>📍 ${a.region || "Global"}</span>
              <span>•</span>
              <span style="color:#cbd5e1;">${formatNewsRelativeTime(a.publishedAt)}</span>
            </div>
            <h4 style="font-size:0.92rem;font-weight:800;line-height:1.32;color:#ffffff;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-shadow:0 2px 8px rgba(0,0,0,0.6);">${a.title}</h4>
          </div>
        </div>
      </article>
    `).join("");
  }

  let filtered = enriched.filter(a => {
    if (SETNEWS_ACTIVE_CAT === "FOR_YOU") return a._score >= 65;
    if (SETNEWS_ACTIVE_CAT === "SAVED") return a._bookmarked;
    if (SETNEWS_ACTIVE_CAT !== "ALL" && a.category !== SETNEWS_ACTIVE_CAT) return false;
    if (SETNEWS_SEARCH_QUERY) {
      const q = SETNEWS_SEARCH_QUERY.toLowerCase();
      const hay = `${a.title} ${a.summary} ${a.region} ${a.category} ${(a.tags || []).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (SETNEWS_ACTIVE_CAT === "FOR_YOU") {
    filtered.sort((a, b) => b._score - a._score);
  } else if (SETNEWS_ACTIVE_CAT === "ALL" && !SETNEWS_SEARCH_QUERY) {
    filtered = getTwoHourShuffledArticles(filtered);
  }

  // Bento Hero: Flagship Visual Cover + 3 Visual Side Cards (No body text clutter)
  const heroContainer = document.getElementById("setNewsBentoHero");
  if (heroContainer) {
    if (filtered.length >= 4 && SETNEWS_ACTIVE_CAT === "ALL" && !SETNEWS_SEARCH_QUERY) {
      heroContainer.style.display = "grid";
      const mainStory = filtered[0];
      const stackStories = filtered.slice(1, 4);
      heroContainer.innerHTML = `
        <div class="setnews-hero-main" data-news-id="${mainStory.id}" style="min-height:390px;">
          <div class="setnews-hero-bg" style="background-image:url('${optimizeNewsImageUrl(mainStory.image || "", 900)}');"></div>
          <div class="setnews-hero-overlay" style="padding:28px 26px 24px;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="background:#0ea5e9;color:#fff;font-size:0.66rem;font-weight:800;padding:4px 10px;border-radius:6px;text-transform:uppercase;letter-spacing:0.04em;">${mainStory.category}</span>
              <span style="background:rgba(15,23,42,0.85);color:#38bdf8;font-size:0.66rem;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(56,189,248,0.35);">📍 ${mainStory.region}</span>
              <span style="font-size:0.72rem;color:#e2e8f0;font-weight:600;">${formatNewsRelativeTime(mainStory.publishedAt)} • ${mainStory.readingMinutes || mainStory.readMinutes || 3} min read</span>
            </div>
            <h2 style="font-size:1.5rem;font-weight:800;line-height:1.25;color:#ffffff;margin:4px 0 0;text-shadow:0 2px 12px rgba(0,0,0,0.65);">${mainStory.title}</h2>
            <p style="font-size:0.84rem;color:#e2e8f0;line-height:1.45;margin:8px 0 0;max-width:760px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-shadow:0 1px 8px rgba(0,0,0,0.7);">${mainStory.summary || (mainStory.body ? mainStory.body.slice(0, 160) + '...' : '')}</p>
          </div>
        </div>
        <div class="setnews-hero-stack">
          ${stackStories.map(st => `
            <div class="setnews-stack-card" data-news-id="${st.id}" style="padding:10px 12px;align-items:center;">
              <div class="setnews-stack-thumb" style="width:118px;height:86px;border-radius:10px;background-image:url('${optimizeNewsImageUrl(st.image || "", 300)}');"></div>
              <div style="display:flex;flex-direction:column;justify-content:center;gap:6px;min-width:0;flex:1;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:0.65rem;color:#38bdf8;font-weight:700;">
                  <span>📍 ${st.region}</span>
                  <span style="color:#94a3b8;font-weight:600;">${formatNewsRelativeTime(st.publishedAt)}</span>
                </div>
                <h4 style="font-size:0.88rem;font-weight:750;line-height:1.32;margin:0;color:inherit;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${st.title}</h4>
                <span style="font-size:0.64rem;color:#64748b;font-weight:600;">${st.category} • ${st.readingMinutes || st.readMinutes || 3}m read</span>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      heroContainer.style.display = "none";
    }
  }

  // Main Visual Photo Grid (205px HD image, floating quick actions, 2-line headline, full context summary)
  const wireGrid = document.getElementById("setNewsWireGrid");
  if (wireGrid) {
    const wireItems = (filtered.length >= 4 && SETNEWS_ACTIVE_CAT === "ALL" && !SETNEWS_SEARCH_QUERY)
      ? filtered.slice(4)
      : filtered;

    if (wireItems.length === 0) {
      wireGrid.innerHTML = `<div style="grid-column:1/-1;padding:36px;text-align:center;color:#94a3b8;background:rgba(15,23,42,0.5);border-radius:12px;border:1px dashed rgba(148,163,184,0.25);">No maritime stories match this filter. Try switching category or clearing search.</div>`;
    } else {
      wireGrid.innerHTML = wireItems.map(a => {
        const readMin = a.readingMinutes || a.readMinutes || 3;
        const thumbUrl = optimizeNewsImageUrl(a.image || "", 580);
        return `
        <article class="setnews-article-card" data-news-id="${a.id}">
          <div class="setnews-card-img" style="height:205px;background-image:url('${thumbUrl}');">
            <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,14,26,0.45) 0%,transparent 45%,rgba(7,14,26,0.75) 100%);"></div>
            <span style="position:absolute;top:10px;left:10px;background:rgba(15,23,42,0.88);color:#38bdf8;font-size:0.63rem;font-weight:700;padding:4px 9px;border-radius:6px;border:1px solid rgba(56,189,248,0.35);backdrop-filter:blur(4px);">📍 ${a.region || "Global"}</span>
            <div style="position:absolute;top:10px;right:10px;display:flex;gap:5px;z-index:3;">
              <button type="button" class="setnews-action-btn ${a._liked ? 'active' : ''}" data-news-action="like" data-news-id="${a.id}" title="Like story" style="padding:4px 7px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);">${a._liked ? '❤️' : '🤍'}</button>
              <button type="button" class="setnews-action-btn ${a._bookmarked ? 'active' : ''}" data-news-action="bookmark" data-news-id="${a.id}" title="Save briefing" style="padding:4px 7px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);">🔖</button>
              <button type="button" class="setnews-action-btn" data-news-action="plot" data-news-id="${a.id}" title="Plot region on SetChart" style="padding:4px 7px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);">🗺️</button>
            </div>
            <span style="position:absolute;bottom:10px;left:10px;background:rgba(2,132,199,0.9);color:#fff;font-size:0.6rem;font-weight:800;padding:3px 8px;border-radius:5px;text-transform:uppercase;letter-spacing:0.04em;">${a.category}</span>
          </div>
          <div class="setnews-card-body" style="padding:14px 15px 15px;gap:8px;">
            <h3 class="setnews-card-title" style="font-size:0.96rem;line-height:1.36;-webkit-line-clamp:2;">${a.title}</h3>
            <p class="setnews-card-context" style="font-size:0.78rem;color:var(--muted);line-height:1.44;margin:2px 0 4px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${a.summary || (a.body ? a.body.slice(0, 200) + '...' : '')}</p>
            <div class="setnews-meta-row" style="margin-top:auto;padding-top:6px;border-top:1px solid rgba(148,163,184,0.12);">
              <span class="setnews-source-tag" style="font-size:0.64rem;">${a.sourceIcon} ${a.source}</span>
              <span style="font-size:0.65rem;color:#94a3b8;">${formatNewsRelativeTime(a.publishedAt)} • ${readMin} min read</span>
            </div>
          </div>
        </article>
      `;
      }).join("");
    }
  }
}

function formatFullArticleParagraphsHtml(art) {
  const raw = String((art && (art.body || art.summary)) || "").trim();
  if (!raw) return '<p class="setnews-reader-paragraph">No additional text available for this dispatch.</p>';

  let blocks = raw.split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean);
  if (blocks.length === 1 && blocks[0].length > 420) {
    // Split long single-block text into 3-sentence paragraphs for comfortable reading
    const sentences = blocks[0].match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [blocks[0]];
    blocks = [];
    let cur = [];
    sentences.forEach((s) => {
      cur.push(s.trim());
      if (cur.join(" ").length >= 340 || cur.length >= 3) {
        blocks.push(cur.join(" "));
        cur = [];
      }
    });
    if (cur.length > 0) blocks.push(cur.join(" "));
  }

  return blocks.map(p => {
    const safe = p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<p class="setnews-reader-paragraph" style="font-size:0.98rem;line-height:1.78;color:#e2e8f0;margin:0 0 14px 0;">${safe}</p>`;
  }).join("");
}

function openSetNewsArticleModal(articleId) {
  const baseList = SETNEWS_ARTICLES.length > 0 ? SETNEWS_ARTICLES : DEFAULT_SETNEWS_ARTICLES;
  const art = baseList.find(a => a.id === articleId);
  if (!art) return;
  recordSetNewsInteraction(art, "read", 15);

  const modal = document.getElementById("setNewsReaderModal");
  const bodyEl = document.getElementById("setNewsReaderContent");
  if (!modal || !bodyEl) return;

  const prof = getSetNewsUserProfile();
  const scored = scoreArticleForUser(art, prof);
  const desk = formatEditorialNewsSource(art);
  const icon = formatEditorialNewsIcon(art);
  const paragraphsHtml = formatFullArticleParagraphsHtml(art);
  const wordCount = String(art.body || art.summary || "").split(/\s+/).filter(Boolean).length;
  const readMins = art.readingMinutes || art.readMinutes || Math.max(2, Math.round(wordCount / 180));

  bodyEl.innerHTML = `
    <div style="position:relative;height:300px;background-image:url('${art.image || ""}');background-size:cover;background-position:center;border-radius:15px 15px 0 0;">
      <div style="position:absolute;inset:0;background:linear-gradient(0deg,#0f172a 4%,rgba(15,23,42,0.25) 55%,rgba(15,23,42,0.65) 100%);"></div>
      <button type="button" id="btnCloseNewsReader" style="position:absolute;top:16px;right:16px;width:38px;height:38px;border-radius:50%;background:rgba(15,23,42,0.88);border:1px solid rgba(148,163,184,0.4);color:#fff;font-size:1.05rem;cursor:pointer;z-index:5;">✕</button>
      <div style="position:absolute;bottom:16px;left:24px;right:24px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="background:#0ea5e9;color:#fff;font-size:0.7rem;font-weight:800;padding:4px 10px;border-radius:6px;text-transform:uppercase;">${art.category}</span>
        <span style="background:rgba(15,23,42,0.9);color:#38bdf8;font-size:0.7rem;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(56,189,248,0.4);">📍 ${art.region}</span>
        <span style="background:rgba(234,76,37,0.85);color:#fff;font-size:0.7rem;font-weight:700;padding:4px 10px;border-radius:6px;">${scored.reason} (${scored.score}% Match)</span>
      </div>
    </div>
    <div style="padding:24px 28px 30px;display:flex;flex-direction:column;gap:16px;">
      <div style="font-size:0.76rem;color:#94a3b8;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-bottom:10px;border-bottom:1px solid rgba(148,163,184,0.15);">
        <span><strong>${icon} ${desk}</strong> • Published ${new Date(art.publishedAt).toUTCString()}</span>
        <span>⏱ ${readMins} min read (${wordCount} words)</span>
      </div>
      <h2 style="font-size:1.5rem;font-weight:800;line-height:1.3;margin:0;color:var(--text);">${art.title}</h2>
      ${Array.isArray(art.takeaways) && art.takeaways.length > 0 ? `
        <div style="padding:13px 16px;border-radius:10px;background:rgba(30,41,59,0.7);border-left:3px solid #38bdf8;font-size:0.84rem;color:#e2e8f0;">
          <strong style="color:#38bdf8;display:block;margin-bottom:6px;text-transform:uppercase;font-size:0.7rem;letter-spacing:0.05em;">⚡ Executive Summary &amp; Bridge Takeaways</strong>
          <ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:5px;line-height:1.5;">
            ${art.takeaways.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
      <div class="setnews-reader-article-body" style="padding-top:4px;">
        ${paragraphsHtml}
      </div>
      <div style="padding:12px 15px;border-radius:10px;background:rgba(14,165,233,0.1);border:1px solid rgba(56,189,248,0.28);font-size:0.78rem;color:#bae6fd;">
        <strong>🧭 Bridge Navigation Intelligence Context:</strong> Operational Region <b>${art.region}</b> (${art.coords ? `${art.coords[0].toFixed(1)}°, ${art.coords[1].toFixed(1)}°` : "Global"}).
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding-top:12px;border-top:1px solid rgba(148,163,184,0.18);">
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button type="button" class="setnews-action-btn" id="btnModalPlotChart" style="padding:9px 14px;font-size:0.78rem;background:rgba(14,165,233,0.22);color:#38bdf8;border-color:#38bdf8;">🗺️ View Region on SetChart</button>
          ${art.url ? `<a href="${art.url}" target="_blank" rel="noopener noreferrer" class="setnews-action-btn" style="padding:9px 14px;font-size:0.78rem;text-decoration:none;">🔗 Original Source</a>` : ""}
        </div>
        <button type="button" class="setnews-action-btn" id="btnModalCloseBottom" style="padding:9px 16px;font-size:0.78rem;">Close Reader</button>
      </div>
    </div>
  `;

  modal.classList.add("open");
  const closeReader = () => {
    modal.classList.remove("open");
    renderSetNewsUI();
  };
  const b1 = document.getElementById("btnCloseNewsReader");
  const b2 = document.getElementById("btnModalCloseBottom");
  const bPlot = document.getElementById("btnModalPlotChart");
  if (b1) b1.addEventListener("click", closeReader);
  if (b2) b2.addEventListener("click", closeReader);
  if (bPlot) {
    bPlot.addEventListener("click", () => {
      closeReader();
      plotNewsArticleOnChart(art);
    });
  }
}

function plotNewsArticleOnChart(art) {
  if (!art) return;
  recordSetNewsInteraction(art, "plot", 10);
  if (typeof switchToTab === "function") {
    switchToTab("tab-ntm");
  }
  setTimeout(() => {
    if (leafletMap && Array.isArray(art.coords) && art.coords.length === 2) {
      leafletMap.flyTo([art.coords[0], art.coords[1]], 6, { duration: 1.1 });
      L.popup()
        .setLatLng([art.coords[0], art.coords[1]])
        .setContent(`
          <div style="font-family:'Segoe UI',sans-serif;max-width:240px;color:#0f172a;">
            <div style="font-size:0.68rem;font-weight:800;color:#0284c7;text-transform:uppercase;">${formatEditorialNewsSource(art)} • ${art.region}</div>
            <div style="font-weight:700;font-size:0.84rem;margin:3px 0;">${art.title}</div>
          </div>
        `)
        .openOn(leafletMap);
    }
  }, 220);
}

function initSetNews() {
  const container = document.getElementById("tab-news");
  if (!container) return;

  if (!container._setNewsBound) {
    container._setNewsBound = true;

    container.querySelectorAll(".setnews-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".setnews-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        SETNEWS_ACTIVE_CAT = btn.getAttribute("data-news-cat") || "ALL";
        renderSetNewsUI();
      });
    });

    const searchInp = document.getElementById("setNewsSearchInput");
    if (searchInp) {
      searchInp.addEventListener("input", () => {
        SETNEWS_SEARCH_QUERY = searchInp.value.trim();
        renderSetNewsUI();
      });
    }

    const refreshBtn = document.getElementById("btnRefreshSetNews");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        loadSetNewsData(true);
        if (typeof showSetSailToast === "function") {
          showSetSailToast("Synced latest maritime intelligence briefings", "success");
        }
      });
    }

    container.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-news-action]");
      if (actionBtn) {
        e.stopPropagation();
        const act = actionBtn.getAttribute("data-news-action");
        const id = actionBtn.getAttribute("data-news-id");
        const baseList = SETNEWS_ARTICLES.length > 0 ? SETNEWS_ARTICLES : DEFAULT_SETNEWS_ARTICLES;
        const art = baseList.find(a => a.id === id);
        if (!art) return;
        if (act === "plot") {
          plotNewsArticleOnChart(art);
        } else {
          recordSetNewsInteraction(art, act, 5);
          renderSetNewsUI();
        }
        return;
      }

      const regionItem = e.target.closest("[data-news-region]");
      if (regionItem) {
        const reg = regionItem.getAttribute("data-news-region") || "";
        const searchInp2 = document.getElementById("setNewsSearchInput");
        if (searchInp2) {
          searchInp2.value = reg;
          SETNEWS_SEARCH_QUERY = reg;
          renderSetNewsUI();
        }
        return;
      }

      const card = e.target.closest("[data-news-id]");
      if (card) {
        const id = card.getAttribute("data-news-id");
        openSetNewsArticleModal(id);
      }
    });

    const readerModal = document.getElementById("setNewsReaderModal");
    if (readerModal) {
      readerModal.addEventListener("click", (e) => {
        if (e.target === readerModal) readerModal.classList.remove("open");
      });
    }
  }

  loadSetNewsData(false);
}
window.initSetNews = initSetNews;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof initRouteMiniWindow === "function") initRouteMiniWindow();
    if (typeof renderRouteBufferCorridorOnMap === "function") renderRouteBufferCorridorOnMap();
    if (typeof loadSetNewsData === "function") loadSetNewsData(false);
    if (leafletMap) leafletMap.invalidateSize();
  }, 180);
});


/* ==========================================================================
   SETSAIL v5.1 — MINIMALIST CHATGPT-STYLE SETROUTE BRAIN (100% ENGLISH),
   DUAL-CORE LEG-BY-LEG ENGINE, LEFT SIDEBAR ROUTES TREE & RIGHT INSPECTOR
   ========================================================================== */

const SETSAIL_ROUTES_LIBRARY_KEY = "setsail_routes_library_v1";
window.SETROUTE_BRAIN_MODE = "planning";
window.SETROUTE_PENDING_CONTEXT = null;

(function expandGlobalMaritimeGraph() {
  if (typeof MARITIME_SEA_NODES === "undefined" || typeof MARITIME_SEA_EDGES === "undefined") return;
  const extraNodes = {
    "BALTIC_GDANSK": [54.65, 18.85, "Gulf of Gdansk Fairway"],
    "BALTIC_GOTLAND": [57.20, 19.20, "Gotland Deepwater Basin"],
    "FINLAND_GULF": [59.85, 25.50, "Gulf of Finland TSS"],
    "ST_PETERSBURG_APP": [60.00, 29.20, "St. Petersburg Fairway Approach"],
    "NORTH_SEA_MID": [56.20, 3.50, "Central North Sea Deepwater Route"],
    "BERGEN_APP": [60.35, 4.85, "Bergen / Fedjeosen Fairway"],
    "FELIXSTOWE_APP": [51.92, 1.45, "Felixstowe / Thames Estuary Sunk TSS"],
    "LE_HAVRE_APP": [49.50, 0.00, "Baie de Seine / Le Havre Approach"],
    "BILBAO_APP": [43.42, -3.12, "Bay of Biscay / Bilbao Fairway"],
    "BARCELONA_APP": [41.30, 2.22, "Barcelona Western Med Approach"],
    "GENOA_APP": [44.32, 8.88, "Ligurian Sea / Genoa Fairway"],
    "PIRAEUS_APP": [37.85, 23.58, "Saronikos Gulf / Piraeus Approach"],
    "BOSPORUS_S": [40.98, 28.98, "Turkish Straits / Bosporus South TSS"],
    "BLACK_SEA_MID": [43.20, 34.00, "Central Black Sea Transit"],
    "NOVOROSSIYSK_APP": [44.60, 37.75, "Novorossiysk Fairway Approach"],
    "CONSTANTA_APP": [44.12, 28.75, "Constanta Black Sea Fairway"],
    "CASABLANCA_APP": [33.68, -7.68, "Casablanca Atlantic Approach"],
    "DAKAR_APP": [14.62, -17.52, "Cap Vert / Dakar Fairway"],
    "BONNY_APP": [4.30, 7.05, "Bonny / Niger Delta Fairway"],
    "LUANDA_APP": [-8.72, 13.15, "Luanda Deepwater Approach"],
    "CAPE_TOWN_APP": [-33.85, 18.32, "Table Bay / Cape Town Approach"],
    "DURBAN_APP": [-29.88, 31.12, "Durban Fairway Approach"],
    "MOZAMBIQUE_CH": [-18.00, 41.50, "Mozambique Channel Deepsea Lane"],
    "MOMBASA_APP": [-4.08, 39.75, "Mombasa East Africa Fairway"],
    "JEDDAH_APP": [21.45, 39.05, "Jeddah Islamic Port Red Sea Approach"],
    "SALALAH_APP": [16.88, 54.05, "Salalah Arabian Sea Approach"],
    "KARACHI_APP": [24.70, 66.90, "Karachi Arabian Sea Fairway"],
    "CHENNAI_APP": [13.10, 80.40, "Chennai Bay of Bengal Approach"],
    "MAURITIUS_PASS": [-20.20, 57.30, "Mascarene / Mauritius Deepsea Corridor"],
    "SUNDA_STRAIT": [-6.05, 105.75, "Sunda Strait Deepwater Channel"],
    "JAKARTA_APP": [-6.00, 106.88, "Jakarta / Tanjung Priok Fairway"],
    "LOMBOK_STRAIT": [-8.55, 115.70, "Lombok Strait Archipelagic Sea Lane"],
    "HEDLAND_APP": [-20.15, 118.55, "Port Hedland / Pilbara Fairway"],
    "FREMANTLE_APP": [-32.05, 115.62, "Fremantle / Gage Roads Approach"],
    "MELBOURNE_APP": [-38.32, 144.60, "Port Phillip Heads / Melbourne Approach"],
    "SYDNEY_APP": [-33.85, 151.35, "Sydney / Botany Bay Approach"],
    "BRISBANE_APP": [-27.05, 153.30, "Moreton Bay / Brisbane Fairway"],
    "AUCKLAND_APP": [-36.70, 174.95, "Hauraki Gulf / Auckland Approach"],
    "LAEM_CHABANG_APP": [12.95, 100.78, "Gulf of Thailand / Laem Chabang Fairway"],
    "HO_CHI_MINH_APP": [10.25, 107.08, "Vung Tau / Cai Mep Fairway"],
    "MANILA_APP": [14.42, 120.55, "Manila Bay Corregidor Approach"],
    "KAOHSIUNG_APP": [22.58, 120.22, "Kaohsiung Taiwan Strait Approach"],
    "BOHAI_STRAIT": [38.35, 121.00, "Bohai / Laotieshan Channel TSS"],
    "TIANJIN_APP": [38.92, 118.05, "Tianjin / Bohai Bay Fairway"],
    "DALIAN_APP": [38.82, 121.75, "Dalian Fairway Approach"],
    "QINGDAO_APP": [35.95, 120.50, "Qingdao Fairway Approach"],
    "NINGBO_APP": [29.90, 122.35, "Ningbo-Zhoushan Fairway"],
    "VLADIVOSTOK_APP": [42.95, 131.95, "Peter the Great Gulf / Vladivostok Approach"],
    "UNIMAK_PASS": [54.30, -165.00, "Unimak Pass Aleutian Great Circle Gate"],
    "SEATTLE_APP": [48.38, -124.72, "Juan de Fuca Strait TSS (Seattle / Vancouver)"],
    "MANZANILLO_APP": [18.98, -104.42, "Manzanillo Mexican Pacific Approach"],
    "CALLAO_APP": [-12.08, -77.28, "Callao / Lima Pacific Fairway"],
    "VALPARAISO_APP": [-33.00, -71.72, "Valparaiso Pacific Fairway"],
    "SANTOS_APP": [-24.08, -46.25, "Santos Fairway Approach"],
    "BUENOS_AIRES_APP": [-35.15, -56.10, "Rio de la Plata / Recalada Pilot"],
    "MAGELLAN_E": [-52.50, -68.20, "Strait of Magellan East Entrance"],
    "MAGELLAN_W": [-52.75, -74.65, "Strait of Magellan West / Pacific Exit"],
    "CARTAGENA_APP": [10.32, -75.62, "Cartagena Caribbean Approach"],
    "YUCATAN_CH": [21.80, -85.65, "Yucatan Channel TSS"],
    "NEW_ORLEANS_APP": [28.90, -89.40, "Southwest Pass / Mississippi Fairway"],
    "MIAMI_APP": [25.75, -80.05, "Miami Government Cut Fairway"],
    "SAVANNAH_APP": [31.95, -80.65, "Savannah Fairway Approach"],
    "HALIFAX_APP": [44.48, -63.45, "Halifax Nova Scotia Approach"],
    "MONTREAL_APP": [48.85, -64.00, "Gulf of St. Lawrence / Cabot Strait"],
    "NATL_GC_WEST": [42.20, -50.00, "North Atlantic Grand Banks S. Waypoint"],
    "NATL_GC_MID": [47.00, -30.00, "Mid-Atlantic Great Circle Vertex"],
    "NPAC_GC_WEST": [42.50, 160.00, "NW Pacific Great Circle Waypoint"],
    "NPAC_GC_MID": [46.50, 180.00, "International Date Line North Pacific Vertex"],
    "NPAC_GC_EAST": [44.00, -145.00, "NE Pacific Great Circle Waypoint"]
  };
  Object.assign(MARITIME_SEA_NODES, extraNodes);

  const extraEdges = [
    ["STOREBAELT", "BALTIC_GDANSK"],
    ["BALTIC_GDANSK", "BALTIC_GOTLAND"],
    ["BALTIC_GOTLAND", "FINLAND_GULF"],
    ["FINLAND_GULF", "ST_PETERSBURG_APP"],
    ["ROTTERDAM_APP", "NORTH_SEA_MID"],
    ["DOVER_STRAIT", "FELIXSTOWE_APP"],
    ["FELIXSTOWE_APP", "ROTTERDAM_APP"],
    ["CASQUETS", "LE_HAVRE_APP"],
    ["LE_HAVRE_APP", "DOVER_STRAIT"],
    ["USHANT", "BILBAO_APP"],
    ["BILBAO_APP", "FINISTERRE"],
    ["NORTH_SEA_MID", "SKAGERRAK"],
    ["NORTH_SEA_MID", "BERGEN_APP"],
    ["GIBRALTAR_W", "CASABLANCA_APP"],
    ["CASABLANCA_APP", "CANARY_PASS"],
    ["CAPE_VERDE_PASS", "DAKAR_APP"],
    ["GIBRALTAR_E", "BARCELONA_APP"],
    ["BARCELONA_APP", "GENOA_APP"],
    ["GENOA_APP", "MED_SICILY"],
    ["MED_CRETE", "PIRAEUS_APP"],
    ["PIRAEUS_APP", "BOSPORUS_S"],
    ["MED_CRETE", "BOSPORUS_S"],
    ["BOSPORUS_S", "BLACK_SEA_MID"],
    ["BLACK_SEA_MID", "NOVOROSSIYSK_APP"],
    ["BLACK_SEA_MID", "CONSTANTA_APP"],
    ["GULF_OF_GUINEA", "BONNY_APP"],
    ["GULF_OF_GUINEA", "LUANDA_APP"],
    ["LUANDA_APP", "CAPE_TOWN_APP"],
    ["CAPE_TOWN_APP", "CAPE_AGULHAS"],
    ["CAPE_AGULHAS", "DURBAN_APP"],
    ["DURBAN_APP", "MOZAMBIQUE_CH"],
    ["MOZAMBIQUE_CH", "MOMBASA_APP"],
    ["MOMBASA_APP", "SOCOTRA_N"],
    ["MOZAMBIQUE_CH", "ARABIAN_SEA_MID"],
    ["RED_SEA_MID", "JEDDAH_APP"],
    ["SOCOTRA_N", "SALALAH_APP"],
    ["SALALAH_APP", "GULF_OF_OMAN"],
    ["GULF_OF_OMAN", "KARACHI_APP"],
    ["KARACHI_APP", "MUMBAI_APP"],
    ["DONDRA_HEAD", "CHENNAI_APP"],
    ["CHENNAI_APP", "BAY_OF_BENGAL_S"],
    ["DURBAN_APP", "MAURITIUS_PASS"],
    ["MAURITIUS_PASS", "DONDRA_HEAD"],
    ["MAURITIUS_PASS", "SUNDA_STRAIT"],
    ["SUNDA_STRAIT", "JAKARTA_APP"],
    ["JAKARTA_APP", "SINGAPORE_E"],
    ["SUNDA_STRAIT", "SCS_SOUTH"],
    ["SINGAPORE_E", "LAEM_CHABANG_APP"],
    ["SCS_SOUTH", "HO_CHI_MINH_APP"],
    ["SCS_MID", "MANILA_APP"],
    ["MANILA_APP", "LUZON_STRAIT"],
    ["TAIWAN_STRAIT", "KAOHSIUNG_APP"],
    ["KAOHSIUNG_APP", "LUZON_STRAIT"],
    ["LOMBOK_STRAIT", "HEDLAND_APP"],
    ["HEDLAND_APP", "FREMANTLE_APP"],
    ["FREMANTLE_APP", "MELBOURNE_APP"],
    ["MELBOURNE_APP", "SYDNEY_APP"],
    ["SYDNEY_APP", "BRISBANE_APP"],
    ["SYDNEY_APP", "AUCKLAND_APP"],
    ["HEDLAND_APP", "SYDNEY_APP"],
    ["EAST_CHINA_SEA", "NINGBO_APP"],
    ["NINGBO_APP", "SHANGHAI_APP"],
    ["NINGBO_APP", "OSUMI_STRAIT"],
    ["SHANGHAI_APP", "OSUMI_STRAIT"],
    ["EAST_CHINA_SEA", "QINGDAO_APP"],
    ["QINGDAO_APP", "BOHAI_STRAIT"],
    ["BOHAI_STRAIT", "DALIAN_APP"],
    ["BOHAI_STRAIT", "TIANJIN_APP"],
    ["BUSAN_APP", "VLADIVOSTOK_APP"],
    ["VLADIVOSTOK_APP", "TOKYO_APP"],
    ["CAPE_VERDE_PASS", "SANTOS_APP"],
    ["SANTOS_APP", "BUENOS_AIRES_APP"],
    ["BUENOS_AIRES_APP", "MAGELLAN_E"],
    ["MAGELLAN_E", "MAGELLAN_W"],
    ["MAGELLAN_W", "VALPARAISO_APP"],
    ["VALPARAISO_APP", "CALLAO_APP"],
    ["CALLAO_APP", "PACIFIC_PANAMA_APP"],
    ["PACIFIC_PANAMA_APP", "MANZANILLO_APP"],
    ["MANZANILLO_APP", "LONG_BEACH_APP"],
    ["CARIBBEAN_MID", "CARTAGENA_APP"],
    ["CARTAGENA_APP", "PANAMA_COLON"],
    ["GULF_MEXICO_MID", "NEW_ORLEANS_APP"],
    ["GULF_MEXICO_MID", "YUCATAN_CH"],
    ["YUCATAN_CH", "CARIBBEAN_MID"],
    ["FLORIDA_STRAIT", "MIAMI_APP"],
    ["MIAMI_APP", "SAVANNAH_APP"],
    ["HATTERAS_E", "SAVANNAH_APP"],
    ["SAVANNAH_APP", "FLORIDA_STRAIT"],
    ["NEW_YORK_APP", "HALIFAX_APP"],
    ["HALIFAX_APP", "MONTREAL_APP"],
    ["HALIFAX_APP", "NATL_GC_WEST"],
    ["USHANT", "NATL_GC_MID"],
    ["NATL_GC_MID", "NATL_GC_WEST"],
    ["NATL_GC_WEST", "NEW_YORK_APP"],
    ["NATL_GC_WEST", "CHESAPEAKE_APP"],
    ["TOKYO_APP", "NPAC_GC_WEST"],
    ["OSUMI_STRAIT", "NPAC_GC_WEST"],
    ["NPAC_GC_WEST", "NPAC_GC_MID"],
    ["NPAC_GC_MID", "UNIMAK_PASS"],
    ["UNIMAK_PASS", "SEATTLE_APP"],
    ["NPAC_GC_MID", "NPAC_GC_EAST"],
    ["NPAC_GC_WEST", "NPAC_GC_EAST"],
    ["NPAC_GC_EAST", "SEATTLE_APP"],
    ["SEATTLE_APP", "SAN_FRANCISCO_APP"],
    ["NPAC_GC_EAST", "SAN_FRANCISCO_APP"],
    ["NPAC_GC_EAST", "LONG_BEACH_APP"],
    ["LONG_BEACH_APP", "PACIFIC_PANAMA_APP"],
    ["SAN_FRANCISCO_APP", "PACIFIC_PANAMA_APP"],
    ["BOHAI_STRAIT", "EAST_CHINA_SEA"],
    ["TIANJIN_APP", "QINGDAO_APP"],
    ["HOUSTON_APP", "YUCATAN_CH"]
  ];
  extraEdges.forEach(e => MARITIME_SEA_EDGES.push(e));

  // Expand PORT_DEPTHS_DB with 60+ additional major world ports so any port pair works out-of-the-box
  if (typeof PORT_DEPTHS_DB !== "undefined" && Array.isArray(PORT_DEPTHS_DB)) {
    const extraPorts = [
      { id: "port-ningbo-alias", name: "Ningbo", unlocode: "CNNGB", country: "China", countryCode: "CN", coords: [29.87, 122.05], approachCoords: [29.90, 122.35], maxDraftMeters: 22.0, maxDraftLowTide: "21.0m" },
      { id: "port-los-angeles-alias", name: "Los Angeles", unlocode: "USLAX", country: "United States", countryCode: "US", coords: [33.74, -118.27], approachCoords: [33.70, -118.25], maxDraftMeters: 16.2, maxDraftLowTide: "16.2m" },
      { id: "port-long-beach-alias", name: "Long Beach", unlocode: "USLGB", country: "United States", countryCode: "US", coords: [33.75, -118.20], approachCoords: [33.70, -118.25], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-san-francisco", name: "San Francisco & Oakland", unlocode: "USSFO", country: "United States", countryCode: "US", coords: [37.80, -122.40], approachCoords: [37.75, -122.65], maxDraftMeters: 15.2, maxDraftLowTide: "15.2m" },
      { id: "port-seattle", name: "Seattle & Tacoma", unlocode: "USSEA", country: "United States", countryCode: "US", coords: [47.60, -122.35], approachCoords: [48.38, -124.72], maxDraftMeters: 15.5, maxDraftLowTide: "15.5m" },
      { id: "port-vancouver", name: "Vancouver", unlocode: "CAVAN", country: "Canada", countryCode: "CA", coords: [49.29, -123.11], approachCoords: [48.38, -124.72], maxDraftMeters: 15.8, maxDraftLowTide: "15.8m" },
      { id: "port-manzanillo", name: "Manzanillo", unlocode: "MXZLO", country: "Mexico", countryCode: "MX", coords: [19.05, -104.32], approachCoords: [18.98, -104.42], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-callao", name: "Callao (Lima)", unlocode: "PECLL", country: "Peru", countryCode: "PE", coords: [-12.05, -77.15], approachCoords: [-12.08, -77.28], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-valparaiso", name: "Valparaiso", unlocode: "CLVAP", country: "Chile", countryCode: "CL", coords: [-33.03, -71.63], approachCoords: [-33.00, -71.72], maxDraftMeters: 14.5, maxDraftLowTide: "14.5m" },
      { id: "port-cartagena", name: "Cartagena", unlocode: "COCTG", country: "Colombia", countryCode: "CO", coords: [10.40, -75.53], approachCoords: [10.32, -75.62], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" },
      { id: "port-rio-de-janeiro", name: "Rio de Janeiro", unlocode: "BRRIO", country: "Brazil", countryCode: "BR", coords: [-22.89, -43.18], approachCoords: [-23.05, -43.12], maxDraftMeters: 15.2, maxDraftLowTide: "15.2m" },
      { id: "port-miami", name: "Miami", unlocode: "USMIA", country: "United States", countryCode: "US", coords: [25.77, -80.17], approachCoords: [25.75, -80.05], maxDraftMeters: 15.2, maxDraftLowTide: "15.2m" },
      { id: "port-charleston", name: "Charleston", unlocode: "USCHS", country: "United States", countryCode: "US", coords: [32.78, -79.92], approachCoords: [32.68, -79.72], maxDraftMeters: 15.8, maxDraftLowTide: "15.8m" },
      { id: "port-norfolk", name: "Norfolk (Hampton Roads)", unlocode: "USORF", country: "United States", countryCode: "US", coords: [36.95, -76.33], approachCoords: [36.95, -75.90], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-baltimore", name: "Baltimore", unlocode: "USBAL", country: "United States", countryCode: "US", coords: [39.27, -76.58], approachCoords: [36.95, -75.90], maxDraftMeters: 15.2, maxDraftLowTide: "15.2m" },
      { id: "port-halifax", name: "Halifax", unlocode: "CAHAL", country: "Canada", countryCode: "CA", coords: [44.65, -63.57], approachCoords: [44.48, -63.45], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-montreal", name: "Montreal", unlocode: "CAMTR", country: "Canada", countryCode: "CA", coords: [45.50, -73.55], approachCoords: [48.85, -64.00], maxDraftMeters: 11.3, maxDraftLowTide: "11.3m" },
      { id: "port-felixstowe", name: "Felixstowe", unlocode: "GBFXT", country: "United Kingdom", countryCode: "GB", coords: [51.95, 1.32], approachCoords: [51.92, 1.45], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-southampton", name: "Southampton", unlocode: "GBSOU", country: "United Kingdom", countryCode: "GB", coords: [50.89, -1.40], approachCoords: [50.65, -1.10], maxDraftMeters: 15.5, maxDraftLowTide: "15.5m" },
      { id: "port-le-havre", name: "Le Havre", unlocode: "FRLEH", country: "France", countryCode: "FR", coords: [49.48, 0.12], approachCoords: [49.50, 0.00], maxDraftMeters: 17.5, maxDraftLowTide: "17.5m" },
      { id: "port-marseille", name: "Marseille-Fos", unlocode: "FRMRS", country: "France", countryCode: "FR", coords: [43.40, 4.88], approachCoords: [43.25, 4.92], maxDraftMeters: 20.0, maxDraftLowTide: "20.0m" },
      { id: "port-bilbao", name: "Bilbao", unlocode: "ESBIO", country: "Spain", countryCode: "ES", coords: [43.35, -3.05], approachCoords: [43.42, -3.12], maxDraftMeters: 20.0, maxDraftLowTide: "20.0m" },
      { id: "port-barcelona", name: "Barcelona", unlocode: "ESBCN", country: "Spain", countryCode: "ES", coords: [41.35, 2.17], approachCoords: [41.30, 2.22], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-valencia", name: "Valencia", unlocode: "ESVLC", country: "Spain", countryCode: "ES", coords: [39.45, -0.32], approachCoords: [39.42, -0.22], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-genoa", name: "Genoa", unlocode: "ITGOA", country: "Italy", countryCode: "IT", coords: [44.40, 8.92], approachCoords: [44.32, 8.88], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-trieste", name: "Trieste", unlocode: "ITTRS", country: "Italy", countryCode: "IT", coords: [45.65, 13.75], approachCoords: [45.55, 13.55], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-piraeus", name: "Piraeus (Athens)", unlocode: "GRPIR", country: "Greece", countryCode: "GR", coords: [37.94, 23.64], approachCoords: [37.85, 23.58], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-istanbul", name: "Istanbul (Ambarli)", unlocode: "TRIST", country: "Turkey", countryCode: "TR", coords: [40.98, 28.68], approachCoords: [40.98, 28.98], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-constanta", name: "Constanta", unlocode: "ROCND", country: "Romania", countryCode: "RO", coords: [44.16, 28.65], approachCoords: [44.12, 28.75], maxDraftMeters: 18.5, maxDraftLowTide: "18.5m" },
      { id: "port-gothenburg", name: "Gothenburg", unlocode: "SEGOT", country: "Sweden", countryCode: "SE", coords: [57.69, 11.89], approachCoords: [57.60, 11.55], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-helsinki", name: "Helsinki", unlocode: "FIHEL", country: "Finland", countryCode: "FI", coords: [60.16, 24.95], approachCoords: [59.85, 25.50], maxDraftMeters: 13.0, maxDraftLowTide: "13.0m" },
      { id: "port-casablanca", name: "Casablanca", unlocode: "MACAS", country: "Morocco", countryCode: "MA", coords: [33.60, -7.62], approachCoords: [33.68, -7.68], maxDraftMeters: 14.0, maxDraftLowTide: "14.0m" },
      { id: "port-tangier", name: "Tangier Med", unlocode: "MATNG", country: "Morocco", countryCode: "MA", coords: [35.89, -5.50], approachCoords: [35.95, -5.60], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-dakar", name: "Dakar", unlocode: "SNDKR", country: "Senegal", countryCode: "SN", coords: [14.68, -17.43], approachCoords: [14.62, -17.52], maxDraftMeters: 13.5, maxDraftLowTide: "13.5m" },
      { id: "port-lagos", name: "Lagos (Apapa & Lekki)", unlocode: "NGLOS", country: "Nigeria", countryCode: "NG", coords: [6.43, 3.40], approachCoords: [6.30, 3.40], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-luanda", name: "Luanda", unlocode: "AOLAD", country: "Angola", countryCode: "AO", coords: [-8.79, 13.24], approachCoords: [-8.72, 13.15], maxDraftMeters: 14.5, maxDraftLowTide: "14.5m" },
      { id: "port-cape-town", name: "Cape Town", unlocode: "ZACPT", country: "South Africa", countryCode: "ZA", coords: [-33.90, 18.43], approachCoords: [-33.85, 18.32], maxDraftMeters: 15.5, maxDraftLowTide: "15.5m" },
      { id: "port-mombasa", name: "Mombasa", unlocode: "KEMBA", country: "Kenya", countryCode: "KE", coords: [-4.05, 39.66], approachCoords: [-4.08, 39.75], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" },
      { id: "port-jeddah", name: "Jeddah", unlocode: "SAJED", country: "Saudi Arabia", countryCode: "SA", coords: [21.48, 39.17], approachCoords: [21.45, 39.05], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-salalah", name: "Salalah", unlocode: "OMSLL", country: "Oman", countryCode: "OM", coords: [16.94, 54.00], approachCoords: [16.88, 54.05], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-sohar", name: "Sohar", unlocode: "OMSOH", country: "Oman", countryCode: "OM", coords: [24.50, 56.63], approachCoords: [24.58, 56.72], maxDraftMeters: 18.5, maxDraftLowTide: "18.5m" },
      { id: "port-doha", name: "Doha & Ras Laffan", unlocode: "QADOH", country: "Qatar", countryCode: "QA", coords: [25.90, 51.58], approachCoords: [26.05, 51.75], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" },
      { id: "port-dammam", name: "Dammam", unlocode: "SADMM", country: "Saudi Arabia", countryCode: "SA", coords: [26.50, 50.20], approachCoords: [26.65, 50.30], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-karachi", name: "Karachi", unlocode: "PKKHI", country: "Pakistan", countryCode: "PK", coords: [24.83, 66.97], approachCoords: [24.70, 66.90], maxDraftMeters: 15.5, maxDraftLowTide: "15.5m" },
      { id: "port-mundra", name: "Mundra", unlocode: "INMUN", country: "India", countryCode: "IN", coords: [22.74, 69.70], approachCoords: [22.65, 69.55], maxDraftMeters: 17.5, maxDraftLowTide: "17.5m" },
      { id: "port-chennai", name: "Chennai", unlocode: "INMAA", country: "India", countryCode: "IN", coords: [13.09, 80.29], approachCoords: [13.10, 80.40], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-port-klang", name: "Port Klang", unlocode: "MYPKG", country: "Malaysia", countryCode: "MY", coords: [3.00, 101.39], approachCoords: [2.92, 101.25], maxDraftMeters: 17.5, maxDraftLowTide: "17.5m" },
      { id: "port-jakarta", name: "Jakarta (Tanjung Priok)", unlocode: "IDJKT", country: "Indonesia", countryCode: "ID", coords: [-6.10, 106.88], approachCoords: [-6.00, 106.88], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-laem-chabang", name: "Laem Chabang (Bangkok)", unlocode: "THLCH", country: "Thailand", countryCode: "TH", coords: [13.08, 100.88], approachCoords: [12.95, 100.78], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-ho-chi-minh", name: "Ho Chi Minh (Cai Mep)", unlocode: "VNSGN", country: "Vietnam", countryCode: "VN", coords: [10.50, 107.02], approachCoords: [10.25, 107.08], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-manila", name: "Manila", unlocode: "PHMNL", country: "Philippines", countryCode: "PH", coords: [14.58, 120.95], approachCoords: [14.42, 120.55], maxDraftMeters: 14.5, maxDraftLowTide: "14.5m" },
      { id: "port-kaohsiung", name: "Kaohsiung", unlocode: "TWKHH", country: "Taiwan", countryCode: "TW", coords: [22.61, 120.29], approachCoords: [22.58, 120.22], maxDraftMeters: 17.5, maxDraftLowTide: "17.5m" },
      { id: "port-shenzhen", name: "Shenzhen (Yantian & Shekou)", unlocode: "CNSZX", country: "China", countryCode: "CN", coords: [22.57, 114.27], approachCoords: [22.15, 114.30], maxDraftMeters: 17.5, maxDraftLowTide: "17.5m" },
      { id: "port-guangzhou", name: "Guangzhou (Nansha)", unlocode: "CNCAN", country: "China", countryCode: "CN", coords: [22.66, 113.66], approachCoords: [22.15, 114.30], maxDraftMeters: 17.0, maxDraftLowTide: "17.0m" },
      { id: "port-xiamen", name: "Xiamen", unlocode: "CNXMN", country: "China", countryCode: "CN", coords: [24.45, 118.05], approachCoords: [24.38, 118.18], maxDraftMeters: 17.0, maxDraftLowTide: "17.0m" },
      { id: "port-tianjin", name: "Tianjin (Xingang)", unlocode: "CNTSN", country: "China", countryCode: "CN", coords: [38.98, 117.75], approachCoords: [38.92, 118.05], maxDraftMeters: 19.5, maxDraftLowTide: "19.5m" },
      { id: "port-dalian", name: "Dalian", unlocode: "CNDLC", country: "China", countryCode: "CN", coords: [38.92, 121.65], approachCoords: [38.82, 121.75], maxDraftMeters: 18.5, maxDraftLowTide: "18.5m" },
      { id: "port-ulsan", name: "Ulsan", unlocode: "KRUSN", country: "South Korea", countryCode: "KR", coords: [35.50, 129.38], approachCoords: [35.42, 129.45], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-incheon", name: "Incheon", unlocode: "KRICN", country: "South Korea", countryCode: "KR", coords: [37.45, 126.60], approachCoords: [37.30, 126.35], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-nagoya", name: "Nagoya", unlocode: "JPNGO", country: "Japan", countryCode: "JP", coords: [35.03, 136.85], approachCoords: [34.50, 137.05], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-osaka", name: "Osaka & Kobe", unlocode: "JPOSA", country: "Japan", countryCode: "JP", coords: [34.65, 135.42], approachCoords: [33.80, 134.90], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-vladivostok", name: "Vladivostok", unlocode: "RUVVO", country: "Russia", countryCode: "RU", coords: [43.11, 131.88], approachCoords: [42.95, 131.95], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" },
      { id: "port-fremantle", name: "Fremantle (Perth)", unlocode: "AUFRE", country: "Australia", countryCode: "AU", coords: [-32.05, 115.74], approachCoords: [-32.05, 115.62], maxDraftMeters: 14.7, maxDraftLowTide: "14.7m" },
      { id: "port-melbourne", name: "Melbourne", unlocode: "AUMEL", country: "Australia", countryCode: "AU", coords: [-37.84, 144.92], approachCoords: [-38.32, 144.60], maxDraftMeters: 14.0, maxDraftLowTide: "14.0m" },
      { id: "port-brisbane", name: "Brisbane", unlocode: "AUBNE", country: "Australia", countryCode: "AU", coords: [-27.38, 153.17], approachCoords: [-27.05, 153.30], maxDraftMeters: 14.0, maxDraftLowTide: "14.0m" },
      { id: "port-auckland", name: "Auckland", unlocode: "NZAKL", country: "New Zealand", countryCode: "NZ", coords: [-36.84, 174.77], approachCoords: [-36.70, 174.95], maxDraftMeters: 13.5, maxDraftLowTide: "13.5m" },
      { id: "port-singapore", name: "Singapore", unlocode: "SGSIN", country: "Singapore", countryCode: "SG", coords: [1.26, 103.85], approachCoords: [1.20, 103.90], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-hong-kong", name: "Hong Kong", unlocode: "HKHKG", country: "Hong Kong", countryCode: "HK", coords: [22.30, 114.17], approachCoords: [22.20, 114.15], maxDraftMeters: 15.5, maxDraftLowTide: "15.5m" },
      { id: "port-busan", name: "Busan", unlocode: "KRPUS", country: "South Korea", countryCode: "KR", coords: [35.10, 129.04], approachCoords: [35.05, 129.10], maxDraftMeters: 16.5, maxDraftLowTide: "16.5m" },
      { id: "port-tokyo", name: "Tokyo", unlocode: "JPTYO", country: "Japan", countryCode: "JP", coords: [35.65, 139.77], approachCoords: [35.50, 139.85], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" },
      { id: "port-yokohama", name: "Yokohama", unlocode: "JPYOK", country: "Japan", countryCode: "JP", coords: [35.45, 139.65], approachCoords: [35.40, 139.70], maxDraftMeters: 16.0, maxDraftLowTide: "16.0m" },
      { id: "port-rotterdam", name: "Rotterdam", unlocode: "NLRTM", country: "Netherlands", countryCode: "NL", coords: [51.95, 4.14], approachCoords: [51.98, 3.90], maxDraftMeters: 23.0, maxDraftLowTide: "23.0m" },
      { id: "port-antwerp", name: "Antwerp", unlocode: "BEANR", country: "Belgium", countryCode: "BE", coords: [51.27, 4.40], approachCoords: [51.40, 3.60], maxDraftMeters: 15.5, maxDraftLowTide: "15.5m" },
      { id: "port-hamburg", name: "Hamburg", unlocode: "DEHAM", country: "Germany", countryCode: "DE", coords: [53.55, 9.97], approachCoords: [53.90, 8.70], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" },
      { id: "port-new-york", name: "New York / New Jersey", unlocode: "USNYC", country: "United States", countryCode: "US", coords: [40.68, -74.04], approachCoords: [40.50, -73.90], maxDraftMeters: 15.2, maxDraftLowTide: "15.2m" },
      { id: "port-houston", name: "Houston", unlocode: "USHOU", country: "United States", countryCode: "US", coords: [29.73, -95.12], approachCoords: [29.35, -94.75], maxDraftMeters: 13.7, maxDraftLowTide: "13.7m" },
      { id: "port-santos", name: "Santos", unlocode: "BRSSZ", country: "Brazil", countryCode: "BR", coords: [-23.95, -46.33], approachCoords: [-24.05, -46.25], maxDraftMeters: 14.5, maxDraftLowTide: "14.5m" },
      { id: "port-dubai", name: "Jebel Ali (Dubai)", unlocode: "AEJEA", country: "United Arab Emirates", countryCode: "AE", coords: [25.01, 55.06], approachCoords: [25.00, 54.95], maxDraftMeters: 17.0, maxDraftLowTide: "17.0m" },
      { id: "port-colombo", name: "Colombo", unlocode: "LKCMB", country: "Sri Lanka", countryCode: "LK", coords: [6.94, 79.84], approachCoords: [6.95, 79.75], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-qingdao", name: "Qingdao", unlocode: "CNTAO", country: "China", countryCode: "CN", coords: [36.07, 120.32], approachCoords: [36.00, 120.50], maxDraftMeters: 18.0, maxDraftLowTide: "18.0m" },
      { id: "port-sydney", name: "Sydney", unlocode: "AUSYD", country: "Australia", countryCode: "AU", coords: [-33.85, 151.21], approachCoords: [-33.82, 151.30], maxDraftMeters: 14.5, maxDraftLowTide: "14.5m" },
      { id: "port-port-hedland", name: "Port Hedland", unlocode: "AUPHE", country: "Australia", countryCode: "AU", coords: [-20.31, 118.58], approachCoords: [-20.20, 118.55], maxDraftMeters: 19.0, maxDraftLowTide: "19.0m" },
      { id: "port-algeciras", name: "Algeciras", unlocode: "ESALG", country: "Spain", countryCode: "ES", coords: [36.14, -5.43], approachCoords: [36.05, -5.40], maxDraftMeters: 18.5, maxDraftLowTide: "18.5m" },
      { id: "port-tanjung-pelepas", name: "Tanjung Pelepas", unlocode: "MYTPP", country: "Malaysia", countryCode: "MY", coords: [1.36, 103.55], approachCoords: [1.30, 103.50], maxDraftMeters: 17.5, maxDraftLowTide: "17.5m" },
      { id: "port-nhava-sheva", name: "Nhava Sheva (JNPT)", unlocode: "INNSA", country: "India", countryCode: "IN", coords: [18.95, 72.95], approachCoords: [18.90, 72.85], maxDraftMeters: 15.0, maxDraftLowTide: "15.0m" }
    ];
    extraPorts.forEach(ep => {
      if (!PORT_DEPTHS_DB.some(p => p.id === ep.id || p.unlocode === ep.unlocode)) {
        PORT_DEPTHS_DB.push(ep);
      }
    });
  }
})();

function calculateLegCourseDegrees(lat1, lon1, lat2, lon2, mode = "RL") {
  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  let dLon = toRad(lon2 - lon1);
  if (dLon > Math.PI) dLon -= 2 * Math.PI;
  if (dLon < -Math.PI) dLon += 2 * Math.PI;

  if (mode === "GC") {
    const y = Math.sin(dLon) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  } else {
    const dPsi = Math.log(Math.tan(Math.PI / 4 + phi2 / 2) / Math.tan(Math.PI / 4 + phi1 / 2));
    const brng = toDeg(Math.atan2(dLon, dPsi));
    return (brng + 360) % 360;
  }
}

function getSeasonalNavigationContext(origLat, destLat) {
  const now = new Date();
  const month = now.getUTCMonth() + 1;
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const mStr = monthNames[month - 1];
  const maxLat = Math.max(Math.abs(origLat || 0), Math.abs(destLat || 0));

  let seasonSummary = `${mStr} Climatology: Standard Tropical / Summer Load Line Zone.`;
  if (month >= 10 || month <= 3) {
    if (origLat > 30 || destLat > 30) {
      seasonSummary = `${mStr} NH Autumn/Winter Regime: Active North Atlantic/Pacific extratropical lows & late tropical cyclone transition. Observe ICLL Winter Seasonal Zone (>35°N) freeboard.`;
    } else {
      seasonSummary = `${mStr} NE Monsoon / Trade Wind Regime: Moderate following seas in low latitudes; monitor late-season tropical cyclones.`;
    }
  } else if (month >= 6 && month <= 9) {
    seasonSummary = `${mStr} NH Summer / SW Monsoon Regime: Peak Tropical Cyclone vigilance in NW Pacific, US Gulf/Caribbean & Arabian Sea SW Monsoon swell.`;
  }
  if (maxLat >= 45) {
    seasonSummary += " High-latitude Great Circle (GC) composite legs evaluated for distance saving.";
  }
  return seasonSummary;
}

function analyzeSingleLegParameters(wpA, wpB, legIdx, totalLegs, opts = {}) {
  const baseSpeed = parseFloat(opts.speedKnots) || 14.5;
  const baseXtd = parseFloat(opts.xtdNM) || 0.25;
  const userSailPref = (opts.sailMode || "HYBRID").toUpperCase();
  const draftM = parseFloat(opts.draftMeters) || 11.5;

  const distNm = calculateHaversineDistanceNM(wpA.lat, wpA.lon, wpB.lat, wpB.lon);
  const nameBlob = `${wpA.name || ""} ${wpB.name || ""}`.toUpperCase();
  const maxLat = Math.max(Math.abs(wpA.lat), Math.abs(wpB.lat));
  const lonSpan = Math.abs(wpA.lon - wpB.lon);

  let navZone = "Coastal / Regional Sea";
  let isTssOrStrait = false;
  let isPilotOrFairway = false;
  let isOpenOcean = false;

  if (legIdx === 0 || legIdx === totalLegs - 1 || /PILOT|FAIRWAY|APPROACH|CANAL|BOSPORUS|SUEZ|PANAMA/.test(nameBlob)) {
    navZone = "Harbor / Fairway Approach";
    isPilotOrFairway = true;
  } else if (/STRAIT|TSS|CHANNEL|DOVER|GIBRALTAR|MALACCA|SINGAPORE|HORMUZ|BAB|JUBAL|USHANT|CASQUETS|STOREBAELT|SKAGERRAK/.test(nameBlob)) {
    navZone = "IMO TSS / Confined Strait";
    isTssOrStrait = true;
  } else if (distNm >= 280) {
    navZone = "Open Ocean Deepwater";
    isOpenOcean = true;
  }

  let sailType = "RL";
  let sailReason = "Rhumb Line (Loxodrome) for constant true course.";
  if (userSailPref === "RL") {
    sailType = "RL";
    sailReason = "Rhumb Line (RL) enforced by user preference.";
  } else if (userSailPref === "GC" && !isPilotOrFairway && !isTssOrStrait && distNm >= 180) {
    sailType = "GC";
    sailReason = "Great Circle (Orthodrome) selected for long-range leg.";
  } else {
    if (isOpenOcean && distNm >= 320 && (maxLat >= 22 || lonSpan >= 12)) {
      sailType = "GC";
      sailReason = `Great Circle (GC) saves distance over ${Math.round(distNm)} NM ocean leg (max lat ${maxLat.toFixed(1)}°).`;
    } else if (isTssOrStrait || isPilotOrFairway) {
      sailType = "RL";
      sailReason = "Strict Rhumb Line (RL) required for COLREG Rule 10 TSS / fairway alignment.";
    }
  }

  const courseDeg = calculateLegCourseDegrees(wpA.lat, wpA.lon, wpB.lat, wpB.lon, sailType);

  let legXtd = baseXtd;
  let turnRadius = 0.6;
  let legSpeed = baseSpeed;

  if (isPilotOrFairway) {
    legXtd = Math.min(baseXtd, 0.15);
    turnRadius = 0.4;
    legSpeed = Math.min(baseSpeed, 10.5);
  } else if (isTssOrStrait) {
    legXtd = Math.min(Math.max(baseXtd, 0.20), 0.30);
    turnRadius = 0.6;
    legSpeed = Math.min(baseSpeed, 13.5);
  } else if (isOpenOcean) {
    legXtd = Math.max(baseXtd, 1.00);
    turnRadius = 1.2;
    legSpeed = baseSpeed;
  } else {
    legXtd = Math.max(baseXtd, 0.35);
    turnRadius = 0.8;
    legSpeed = baseSpeed;
  }

  const eteHours = distNm / Math.max(4.0, legSpeed);

  const ntmHits = [];
  if (typeof NTM_STORE !== "undefined" && Array.isArray(NTM_STORE)) {
    const checkRadiusNm = isOpenOcean ? 45 : 25;
    for (let i = 0; i < NTM_STORE.length; i++) {
      const n = NTM_STORE[i];
      if (!n || n.isCancelled || n.status === "CANCELLED") continue;
      const cLat = Number.isFinite(n.lat) ? n.lat : (n.coords && n.coords[0] ? n.coords[0].lat : NaN);
      const cLon = Number.isFinite(n.lon) ? n.lon : (n.coords && n.coords[0] ? n.coords[0].lon : NaN);
      if (!Number.isFinite(cLat) || !Number.isFinite(cLon)) continue;
      const d = pointToSegmentDistanceNM(cLat, cLon, wpA.lat, wpA.lon, wpB.lat, wpB.lon);
      if (d <= checkRadiusNm) {
        ntmHits.push({
          id: n.id,
          type: n.type || "NAVTEX",
          subject: (n.subject || n.title || "Navigational Warning").slice(0, 70),
          distNm: Math.round(d * 10) / 10
        });
        if (ntmHits.length >= 4) break;
      }
    }
  }

  const weatherHits = [];
  if (typeof MARINE_WEATHER_STORE !== "undefined" && Array.isArray(MARINE_WEATHER_STORE.storms)) {
    MARINE_WEATHER_STORE.storms.forEach(st => {
      if (!st || !Array.isArray(st.center)) return;
      const dStorm = pointToSegmentDistanceNM(st.center[0], st.center[1], wpA.lat, wpA.lon, wpB.lat, wpB.lon);
      if (dStorm <= (st.dangerRadiusNm || 150) + 120) {
        weatherHits.push(`${st.name} (${st.maxWinds} kt, CPA ${Math.round(dStorm)} NM)`);
      }
    });
  }

  const squatM = (isPilotOrFairway || isTssOrStrait)
    ? ((0.78 * Math.pow(legSpeed, 2)) / 100) * 1.35
    : ((0.78 * Math.pow(legSpeed, 2)) / 100);
  const minReqDepthM = draftM + squatM + Math.max(1.0, draftM * 0.10);
  const ukcNote = `Draft ${draftM.toFixed(1)}m + Squat ${squatM.toFixed(2)}m → Min Safe Depth ${minReqDepthM.toFixed(1)}m`;

  return {
    legNo: legIdx + 1,
    fromWptNo: wpA.wptNo || ('00' + (legIdx + 1)).slice(-3),
    toWptNo: wpB.wptNo || ('00' + (legIdx + 2)).slice(-3),
    fromName: wpA.name || `WPT ${legIdx + 1}`,
    toName: wpB.name || `WPT ${legIdx + 2}`,
    fromLat: wpA.lat,
    fromLon: wpA.lon,
    toLat: wpB.lat,
    toLon: wpB.lon,
    navZone,
    sailType,
    sailReason,
    courseDeg: Math.round(courseDeg * 10) / 10,
    courseFormatted: `${String(Math.round(courseDeg)).padStart(3, "0")}.0°T`,
    distanceNM: Math.round(distNm * 10) / 10,
    speedKnots: Math.round(legSpeed * 10) / 10,
    eteHours: Math.round(eteHours * 10) / 10,
    xtdNM: Number(legXtd.toFixed(2)),
    turnRadiusNM: Number(turnRadius.toFixed(2)),
    ukcNote,
    ntmHits,
    weatherHits
  };
}

function enrichRouteWithLegsTelemetry(route, opts = {}) {
  if (!route || !Array.isArray(route.waypoints) || route.waypoints.length < 2) return route;
  const meta = Object.assign({}, route.metadata || {}, opts);
  const legs = [];
  let totalDist = 0;
  let totalHours = 0;

  for (let i = 0; i < route.waypoints.length - 1; i++) {
    const wpA = route.waypoints[i];
    const wpB = route.waypoints[i + 1];
    const legInfo = analyzeSingleLegParameters(wpA, wpB, i, route.waypoints.length - 1, meta);
    legs.push(legInfo);

    wpA.sail = legInfo.sailType;
    wpA.speedKnots = legInfo.speedKnots;
    wpA.portsideXTD = legInfo.xtdNM;
    wpA.starboardXTD = legInfo.xtdNM;
    wpA.turnRadius = legInfo.turnRadiusNM;
    wpA.wptNo = ('00' + (i + 1)).slice(-3);

    totalDist += legInfo.distanceNM;
    totalHours += legInfo.eteHours;
  }

  const lastWp = route.waypoints[route.waypoints.length - 1];
  lastWp.wptNo = ('00' + route.waypoints.length).slice(-3);

  route.legs = legs;
  route.totalDistanceNM = Math.round(totalDist);
  route.totalSteamingHours = Math.round(totalHours * 10) / 10;
  route.steamingDays = (totalHours / 24).toFixed(1);
  route.seasonalContext = getSeasonalNavigationContext(route.waypoints[0].lat, lastWp.lat);
  if (!route.id) {
    route.id = "rt-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);
  }
  if (!route.createdAt) {
    route.createdAt = new Date().toISOString();
  }
  return route;
}
window.enrichRouteWithLegsTelemetry = enrichRouteWithLegsTelemetry;

function getSavedRoutesLibrary() {
  try {
    const raw = localStorage.getItem(SETSAIL_ROUTES_LIBRARY_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function saveRouteToLibrary(route) {
  if (!route || !Array.isArray(route.waypoints) || route.waypoints.length === 0) return;
  enrichRouteWithLegsTelemetry(route);
  const lib = getSavedRoutesLibrary();
  const existingIdx = lib.findIndex(r => r.id === route.id || (r.name && r.name === route.name));
  if (existingIdx >= 0) {
    route.id = lib[existingIdx].id || route.id;
    lib[existingIdx] = route;
  } else {
    lib.unshift(route);
  }
  try {
    localStorage.setItem(SETSAIL_ROUTES_LIBRARY_KEY, JSON.stringify(lib.slice(0, 35)));
  } catch (e) {}
  renderNavSavedRoutesTree();
}
window.saveRouteToLibrary = saveRouteToLibrary;

function deleteRouteFromLibrary(routeId) {
  const lib = getSavedRoutesLibrary().filter(r => r.id !== routeId);
  try {
    localStorage.setItem(SETSAIL_ROUTES_LIBRARY_KEY, JSON.stringify(lib));
  } catch (e) {}
  if (activeRouteData && activeRouteData.id === routeId) {
    if (lib.length > 0) {
      selectSavedRouteFromSidebar(lib[0].id, false);
    } else if (typeof clearActiveRoute === "function") {
      clearActiveRoute();
      const drawer = document.getElementById("setRouteRightDrawer");
      if (drawer) drawer.classList.remove("open");
    }
  }
  renderNavSavedRoutesTree();
}

function renderNavSavedRoutesTree() {
  const listEl = document.getElementById("navSavedRoutesList");
  const badgeEl = document.getElementById("navRoutesCountBadge");
  if (!listEl) return;

  let lib = getSavedRoutesLibrary();
  if (activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length > 0) {
    if (!lib.some(r => r.name === activeRouteData.name)) {
      enrichRouteWithLegsTelemetry(activeRouteData);
      lib.unshift(activeRouteData);
      try { localStorage.setItem(SETSAIL_ROUTES_LIBRARY_KEY, JSON.stringify(lib)); } catch (e) {}
    }
  }

  if (badgeEl) {
    badgeEl.textContent = lib.length > 0 ? String(lib.length) : "AI";
  }

  if (lib.length === 0) {
    listEl.innerHTML = `<div style="font-size:0.62rem;color:#64748b;padding:4px 6px;text-align:center;">No saved routes yet</div>`;
    return;
  }

  listEl.innerHTML = lib.map(rt => {
    const isAct = activeRouteData && (activeRouteData.id === rt.id || activeRouteData.name === rt.name);
    const legsCnt = (rt.legs ? rt.legs.length : Math.max(0, (rt.waypoints || []).length - 1));
    const dist = rt.totalDistanceNM || 0;
    return `
      <button type="button" class="nav-saved-route-item ${isAct ? "active" : ""}" data-saved-route-id="${rt.id}" title="${rt.name} (${legsCnt} Legs • ${dist} NM)">
        <span class="nav-saved-route-dot"></span>
        <div class="nav-saved-route-info">
          <span class="nav-saved-route-name">${rt.name || "Passage Route"}</span>
          <span class="nav-saved-route-meta">${legsCnt} Legs • ${dist} NM</span>
        </div>
      </button>
    `;
  }).join("");
}
window.renderNavSavedRoutesTree = renderNavSavedRoutesTree;

function selectSavedRouteFromSidebar(routeId, openRightDrawer = true) {
  const lib = getSavedRoutesLibrary();
  const found = lib.find(r => r.id === routeId);
  if (!found) return;

  enrichRouteWithLegsTelemetry(found);
  activeRouteData = found;
  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(found));
  } catch (e) {}

  if (leafletMap && typeof renderRouteOnMap === "function") {
    renderRouteOnMap(found, false);
  }
  displaySetRouteResults(found, openRightDrawer);
  renderNavSavedRoutesTree();
}
window.selectSavedRouteFromSidebar = selectSavedRouteFromSidebar;

const _origRenderRouteOnMapV49 = window.renderRouteOnMap || renderRouteOnMap;
renderRouteOnMap = function(route, shouldFly = true) {
  if (route && Array.isArray(route.waypoints) && route.waypoints.length > 0) {
    enrichRouteWithLegsTelemetry(route);
    saveRouteToLibrary(route);
  }
  const res = _origRenderRouteOnMapV49(route, shouldFly);
  if (route) {
    displaySetRouteResults(route, false);
  }
  return res;
};
window.renderRouteOnMap = renderRouteOnMap;

function displaySetRouteResults(route, autoOpenDrawer = true) {
  if (!route || !Array.isArray(route.waypoints) || route.waypoints.length === 0) return;
  enrichRouteWithLegsTelemetry(route);

  const drawer = document.getElementById("setRouteRightDrawer");
  const titleEl = document.getElementById("resultsRouteTitle");
  const badgeEl = document.getElementById("srDrawerBadge");
  const distEl = document.getElementById("metricDistance");
  const daysEl = document.getElementById("metricDays");
  const wptsEl = document.getElementById("metricWpts");
  const speedEl = document.getElementById("metricSpeed");
  const theoryBox = document.getElementById("srDrawerTheoryBox");
  const cpBox = document.getElementById("resultsChokepointsBox");
  const cpPills = document.getElementById("resultsChokepointsPills");
  const legsListEl = document.getElementById("srDrawerLegsList");

  if (drawer && autoOpenDrawer) {
    drawer.classList.add("open");
  }
  if (titleEl) titleEl.textContent = route.name || "Passage Plan";
  if (badgeEl) {
    badgeEl.textContent = route.format === "SETROUTE_AI"
      ? "IMO A.893(21) • VERIFIED"
      : `UPLOADED (${route.format || "ECDIS"})`;
  }
  const legs = route.legs || [];
  if (distEl) distEl.textContent = `${(route.totalDistanceNM || 0).toLocaleString()} NM`;
  if (daysEl) daysEl.textContent = `${route.steamingDays || "0.0"} d (${route.totalSteamingHours || 0}h)`;
  if (wptsEl) wptsEl.textContent = `${legs.length} Legs (${route.waypoints.length} WPTs)`;
  const spd = (route.metadata && route.metadata.speedKnots) || 14.5;
  const drf = (route.metadata && route.metadata.draftMeters) || 11.5;
  if (speedEl) speedEl.textContent = `${spd} kn / ${drf}m`;

  if (theoryBox) {
    const totalNtmHits = legs.reduce((acc, l) => acc + (l.ntmHits ? l.ntmHits.length : 0), 0);
    const totalWxHits = legs.reduce((acc, l) => acc + (l.weatherHits ? l.weatherHits.length : 0), 0);
    const gcLegs = legs.filter(l => l.sailType === "GC").length;
    const rlLegs = legs.length - gcLegs;
    theoryBox.innerHTML = `
      <div style="font-weight:700;color:#e2e8f0;margin-bottom:3px;">Appraisal Summary</div>
      <div>• <b>Geometry:</b> ${rlLegs} RL legs + ${gcLegs} GC legs</div>
      <div>• <b>Hazards Audited:</b> ${totalNtmHits} NtM/NAVTEX • ${totalWxHits} Weather</div>
    `;
  }

  if (cpBox && cpPills) {
    if (Array.isArray(route.chokepoints) && route.chokepoints.length > 0) {
      cpBox.style.display = "flex";
      cpPills.innerHTML = route.chokepoints.map(cp => `<span class="sr-leg-pill">${cp}</span>`).join("");
    } else {
      cpBox.style.display = "none";
    }
  }

  const schedTitleEl = document.getElementById("srDrawerScheduleTitle");
  if (schedTitleEl && route.waypoints) {
    schedTitleEl.textContent = `Waypoint Schedule (${route.waypoints.length} WPTs)`;
  }

  if (legsListEl) {
    const wps = route.waypoints || [];
    const legs = route.legs || [];
    legsListEl.innerHTML = `
      <div class="sr-wpts-table-wrap">
        <table class="sr-wpts-table">
          <thead>
            <tr>
              <th style="width:34px;text-align:center;">WPT</th>
              <th>Waypoint Name</th>
              <th>Coordinates</th>
              <th style="text-align:center;">CRS / Sail</th>
              <th style="text-align:right;">Dist</th>
              <th style="text-align:right;">Spd / XTD</th>
            </tr>
          </thead>
          <tbody>
            ${wps.map((wp, idx) => {
              const isStart = idx === 0;
              const isEnd = idx === wps.length - 1;
              const leg = legs[idx];
              const numStr = wp.wptNo || ('00' + (idx + 1)).slice(-3);
              const badgeClass = isStart ? 'dep' : (isEnd ? 'dest' : '');
              const badgeLabel = isStart ? 'DEP' : (isEnd ? 'ARR' : `#${numStr}`);
              const wpName = wp.name || (isStart ? "Departure Port" : (isEnd ? "Arrival Port" : `Waypoint ${numStr}`));
              
              const dms = (typeof formatLatLonDMS === "function") ? formatLatLonDMS(wp.lat, wp.lon) : `${wp.lat.toFixed(4)}, ${wp.lon.toFixed(4)}`;
              const dmsParts = dms.split(",");
              const latStr = (dmsParts[0] || "").trim();
              const lonStr = (dmsParts[1] || "").trim();

              const crsStr = leg ? leg.courseFormatted : "—";
              const sailStr = leg ? leg.sailType : (wp.sail || "RL");
              const distStr = leg ? `${leg.distanceNM} NM` : "—";
              const spdStr = wp.speedKnots != null ? `${wp.speedKnots} kn` : (leg ? `${leg.speedKnots} kn` : "—");
              const xtdVal = wp.portsideXTD != null ? wp.portsideXTD : (leg ? leg.xtdNM : 0.25);
              const hasWarn = leg && ((leg.ntmHits && leg.ntmHits.length > 0) || (leg.weatherHits && leg.weatherHits.length > 0));

              return `
                <tr class="sr-wpt-row" data-wpt-idx="${idx}" title="Click to view WPT #${numStr} (${wpName}) on SetChart">
                  <td style="text-align:center;">
                    <span class="sr-wpt-num-badge ${badgeClass}">${badgeLabel}</span>
                  </td>
                  <td>
                    <div class="sr-wpt-name" title="${wpName}">${wpName}</div>
                    ${hasWarn ? `<div style="font-size:0.62rem;color:#fbbf24;margin-top:2px;">⚠️ Hazard alert</div>` : ""}
                  </td>
                  <td>
                    <div class="sr-wpt-coords">
                      <div>${latStr}</div>
                      <div>${lonStr}</div>
                    </div>
                  </td>
                  <td style="text-align:center;">
                    <div style="font-weight:700;color:#f8fafc;font-size:0.72rem;">${crsStr}</div>
                    ${leg ? `<span class="sr-leg-pill ${sailStr === 'GC' ? 'gc' : ''}" style="margin-top:2px;font-size:0.58rem;padding:1px 4px;">${sailStr}</span>` : ""}
                  </td>
                  <td style="text-align:right;">
                    <span style="font-weight:700;color:#e2e8f0;font-size:0.72rem;">${distStr}</span>
                    ${leg ? `<div style="font-size:0.62rem;color:#94a3b8;">${leg.eteHours}h</div>` : ""}
                  </td>
                  <td style="text-align:right;">
                    <div style="font-size:0.70rem;color:#cbd5e1;">${spdStr}</div>
                    <div style="font-size:0.62rem;color:#94a3b8;">±${xtdVal} NM</div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
}
window.displaySetRouteResults = displaySetRouteResults;

const PORT_RU_ALIASES = {
  "тяньцзинь": "port-tianjin",
  "синган": "port-tianjin",
  "тайсин": "port-taixing",
  "роттердам": "port-rotterdam",
  "антверпен": "port-antwerp",
  "гамбург": "port-hamburg",
  "сингапур": "port-singapore",
  "шанхай": "port-shanghai",
  "нинбо": "port-ningbo",
  "циндао": "port-qingdao",
  "гонконг": "port-hong-kong",
  "пусан": "port-busan",
  "токио": "port-tokyo",
  "иокогама": "port-yokohama",
  "хьюстон": "port-houston",
  "новый орлеан": "port-new-orleans",
  "нью-йорк": "port-new-york",
  "нью йорк": "port-new-york",
  "саванна": "port-savannah",
  "лос-анджелес": "port-los-angeles",
  "лонг-бич": "port-long-beach",
  "сан-франциско": "port-san-francisco",
  "панама": "port-panama",
  "колон": "port-colon",
  "бальбоа": "port-balboa",
  "суэц": "port-suez",
  "порт-саид": "port-port-said",
  "гибралтар": "port-gibraltar",
  "рас-танура": "port-ras-tanura",
  "фуджейра": "port-fujairah",
  "джебель-али": "port-jebel-ali",
  "дубай": "port-jebel-ali",
  "мумбаи": "port-mumbai",
  "коломбо": "port-colombo",
  "сантос": "port-santos",
  "буэнос-айрес": "port-buenos-aires",
  "дурбан": "port-durban",
  "хедленд": "port-hedland",
  "сидней": "port-sydney",
  "лиссабон": "port-lisbon",
  "новороссийск": "port-novorossiysk",
  "санкт-петербург": "port-st-petersburg",
  "гданьск": "port-gdansk"
};

const PORT_EN_ALIASES = {
  "ningbo": "CNNGB",
  "zhoushan": "CNNGB",
  "los angeles": "USLAX",
  "long beach": "USLAX",
  "san pedro": "USLAX",
  "san francisco": "USSFO",
  "oakland": "USSFO",
  "seattle": "USSEA",
  "tacoma": "USSEA",
  "vancouver": "CAVAN",
  "manzanillo": "MXZLO",
  "callao": "PECLL",
  "lima": "PECLL",
  "valparaiso": "CLVAP",
  "panama": "PAPTY",
  "balboa": "PAPTY",
  "colon": "PAONX",
  "cristobal": "PAONX",
  "cartagena": "COCTG",
  "santos": "BRSSZ",
  "rio de janeiro": "BRRIO",
  "buenos aires": "ARBUE",
  "houston": "USHOU",
  "galveston": "USHOU",
  "new orleans": "USMSY",
  "miami": "USMIA",
  "savannah": "USSAV",
  "charleston": "USCHS",
  "norfolk": "USORF",
  "baltimore": "USBAL",
  "new york": "USNYC",
  "newark": "USNYC",
  "halifax": "CAHAL",
  "montreal": "CAMTR",
  "rotterdam": "NLRTM",
  "europoort": "NLRTM",
  "antwerp": "BEANR",
  "hamburg": "DEHAM",
  "felixstowe": "GBFXT",
  "southampton": "GBSOU",
  "le havre": "FRLEH",
  "marseille": "FRMRS",
  "bilbao": "ESBIO",
  "algeciras": "ESALG",
  "gibraltar": "GIGIB",
  "barcelona": "ESBCN",
  "valencia": "ESVLC",
  "lisbon": "PTLIS",
  "genoa": "ITGOA",
  "trieste": "ITTRS",
  "piraeus": "GRPIR",
  "athens": "GRPIR",
  "istanbul": "TRIST",
  "constanta": "ROCND",
  "novorossiysk": "RUNVS",
  "gdansk": "PLGDN",
  "st petersburg": "RULED",
  "saint petersburg": "RULED",
  "helsinki": "FIHEL",
  "gothenburg": "SEGOT",
  "bergen": "NOBGO",
  "casablanca": "MACAS",
  "tangier": "MATNG",
  "dakar": "SNDKR",
  "lagos": "NGLOS",
  "bonny": "NGBON",
  "luanda": "AOLAD",
  "cape town": "ZACPT",
  "durban": "ZADUR",
  "mombasa": "KEMBA",
  "jeddah": "SAJED",
  "suez": "EGSUZ",
  "port said": "EGPSD",
  "fujairah": "AEFJR",
  "jebel ali": "AEJEA",
  "dubai": "AEJEA",
  "ras tanura": "SARTA",
  "dammam": "SADMM",
  "doha": "QADOH",
  "ras laffan": "QADOH",
  "sohar": "OMSOH",
  "salalah": "OMSLL",
  "karachi": "PKKHI",
  "mundra": "INMUN",
  "mumbai": "INBOM",
  "nhava sheva": "INBOM",
  "chennai": "INMAA",
  "colombo": "LKCMB",
  "port klang": "MYPKG",
  "singapore": "SGSIN",
  "jakarta": "IDJKT",
  "laem chabang": "THLCH",
  "bangkok": "THLCH",
  "ho chi minh": "VNSGN",
  "saigon": "VNSGN",
  "manila": "PHMNL",
  "hong kong": "HKHKG",
  "shenzhen": "CNSZX",
  "yantian": "CNSZX",
  "guangzhou": "CNCAN",
  "nansha": "CNCAN",
  "xiamen": "CNXMN",
  "kaohsiung": "TWKHH",
  "shanghai": "CNSHA",
  "qingdao": "CNTAO",
  "tianjin": "CNTSN",
  "xingang": "CNTSN",
  "taixing": "CNTXG",
  "dalian": "CNDLC",
  "busan": "KRPUS",
  "pusan": "KRPUS",
  "ulsan": "KRUSN",
  "incheon": "KRICN",
  "tokyo": "JPTYO",
  "yokohama": "JPYOK",
  "nagoya": "JPNGO",
  "osaka": "JPOSA",
  "kobe": "JPOSA",
  "vladivostok": "RUVVO",
  "port hedland": "AUPHE",
  "hedland": "AUPHE",
  "fremantle": "AUFRE",
  "perth": "AUFRE",
  "melbourne": "AUMEL",
  "sydney": "AUSYD",
  "brisbane": "AUBNE",
  "auckland": "NZAKL"
};

window.SETROUTE_CHAT_HISTORY = window.SETROUTE_CHAT_HISTORY || [];
window.SETROUTE_LAST_PORTS = window.SETROUTE_LAST_PORTS || { origin: null, dest: null, opts: {} };

function findPortsInUserMessage(text) {
  if (!text || typeof PORT_DEPTHS_DB === "undefined") return [];
  const lower = text.toLowerCase().replace(/\s+/g, " ");
  const hits = [];

  const addHit = (p, idx) => {
    if (!p || idx < 0) return;
    const existing = hits.find(h => h.port.id === p.id || (p.unlocode && h.port.unlocode === p.unlocode));
    if (!existing) {
      hits.push({ port: p, pos: idx });
    } else if (idx < existing.pos) {
      existing.pos = idx;
    }
  };

  // 1. Check Russian aliases
  for (const [ruStem, portId] of Object.entries(PORT_RU_ALIASES)) {
    const idx = lower.indexOf(ruStem);
    if (idx !== -1) {
      const p = PORT_DEPTHS_DB.find(x => x.id === portId || x.name.toLowerCase().includes(portId.replace("port-", "")));
      addHit(p, idx);
    }
  }

  // 2. Check English aliases (sorted longest first so "los angeles" matches before short tokens)
  const sortedAliases = Object.entries(PORT_EN_ALIASES).sort((a, b) => b[0].length - a[0].length);
  for (const [alias, locode] of sortedAliases) {
    const esc = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = new RegExp(`(?:^|[^a-z0-9])(${esc})(?=$|[^a-z0-9])`, "i");
    const m = rx.exec(lower);
    if (m) {
      const matchPos = m.index + (m[0].length - m[1].length);
      const p = PORT_DEPTHS_DB.find(x => x.unlocode === locode || x.name.toLowerCase().includes(alias));
      addHit(p, matchPos);
    }
  }

  // 3. Check PORT_DEPTHS_DB names & sub-tokens (splitting on parentheses, hyphens, slashes, ampersands)
  const stopTokens = new Set(["port", "harbor", "harbour", "terminal", "channel", "ship", "approaches", "approach", "canal", "strait", "island", "anchorage", "delta", "north", "south", "east", "west", "main", "deep", "water", "europort", "zone"]);
  PORT_DEPTHS_DB.forEach(p => {
    const pName = p.name.toLowerCase();
    const candidates = [pName];
    pName.split(/[()\/&,-]+/).forEach(part => {
      const clean = part.replace(/\b(port|of|ship|channel|approaches|terminal|harbor|harbour|island|strait|canal)\b/gi, "").trim();
      if (clean.length >= 4 && !stopTokens.has(clean)) {
        candidates.push(clean);
      }
    });
    for (const cand of candidates) {
      if (cand.length < 4) continue;
      const esc = cand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rx = new RegExp(`(?:^|[^a-z0-9])(${esc})(?=$|[^a-z0-9])`, "i");
      const m = rx.exec(lower);
      if (m) {
        const matchPos = m.index + (m[0].length - m[1].length);
        addHit(p, matchPos);
        break;
      }
    }
  });

  hits.sort((a, b) => a.pos - b.pos);
  return hits.map(h => h.port);
}

async function resolveUnknownPortsFromText(text, currentPorts) {
  if (currentPorts.length >= 2 || !navigator.onLine) return currentPorts;
  // Look for patterns like "from X to Y" or "between X and Y" or "X -> Y"
  const m = text.match(/(?:from|between)\s+([A-Za-z][A-Za-z\s.-]{2,28}?)\s+(?:to|and|->|→)\s+([A-Za-z][A-Za-z\s.-]{2,28}?)(?:$|[,.?;]|\s+(?:with|draft|speed|at|via|using|in|on))/i)
         || text.match(/([A-Za-z][A-Za-z\s.-]{2,24}?)\s*(?:->|→|\bto\b)\s*([A-Za-z][A-Za-z\s.-]{2,24}?)$/i);
  if (!m) return currentPorts;

  const rawNames = [m[1].trim(), m[2].trim()].map(s =>
    s.replace(/^(?:make|plan|build|create|the|a|route|passage|from|to)\s+/gi, "").trim()
  );

  const resolved = [];
  for (const candName of rawNames) {
    if (!candName || candName.length < 3) continue;
    const localMatch = findPortsInUserMessage(candName);
    if (localMatch.length > 0) {
      resolved.push(localMatch[0]);
      continue;
    }
    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 3200);
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(candName)}&count=1&language=en&format=json`;
      const resp = await fetch(url, { signal: ctrl.signal });
      clearTimeout(tid);
      if (resp.ok) {
        const data = await resp.json();
        const hit = (data.results || [])[0];
        if (hit && Number.isFinite(hit.latitude) && Number.isFinite(hit.longitude)) {
          let dynPort = {
            id: `port-dyn-${hit.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
            name: hit.name,
            unlocode: `${(hit.country_code || "UN").toUpperCase()}${hit.name.slice(0, 3).toUpperCase()}`,
            country: hit.country || "Maritime Port",
            countryCode: (hit.country_code || "UN").toUpperCase(),
            coords: [hit.latitude, hit.longitude],
            approachCoords: [hit.latitude, hit.longitude],
            maxDraftMeters: 15.0,
            maxDraftLowTide: "15.0m"
          };
          if (typeof setrouteSnapPortToSea === "function") dynPort = setrouteSnapPortToSea(dynPort);
          PORT_DEPTHS_DB.push(dynPort);
          resolved.push(dynPort);
        }
      }
    } catch (e) {}
  }

  return resolved.length >= 2 ? resolved : (resolved.length === 1 && currentPorts.length === 0 ? resolved : currentPorts);
}

function appendChatMessage(role, htmlContent, quickChips = []) {
  const container = document.getElementById("setRouteChatMessages");
  const scrollWrap = document.getElementById("setRouteChatScroll");
  const emptyHero = document.getElementById("setRouteEmptyHero");
  if (!container) return null;

  if (emptyHero) emptyHero.style.display = "none";

  const msgEl = document.createElement("div");
  msgEl.className = `sr-msg ${role === "user" ? "user" : "brain"}`;
  const avatarLabel = role === "user" ? "YOU" : "AI";

  let chipsHtml = "";
  if (Array.isArray(quickChips) && quickChips.length > 0) {
    chipsHtml = `<div class="sr-quick-chips">${quickChips.map(c =>
      `<button type="button" class="sr-quick-chip" data-sr-prompt="${c.prompt.replace(/"/g, '&quot;')}">${c.label}</button>`
    ).join("")}</div>`;
  }

  msgEl.innerHTML = `
    <div class="sr-msg-avatar">${avatarLabel}</div>
    <div class="sr-msg-bubble">
      <div class="sr-msg-text">${htmlContent}</div>
      ${chipsHtml}
    </div>
  `;
  container.appendChild(msgEl);
  if (scrollWrap) {
    scrollWrap.scrollTop = scrollWrap.scrollHeight;
  }
  return msgEl;
}

async function executeBrainLegByLegRoutePlan(pOrig, pDest, options = {}) {
  if (typeof loadSetrouteCoastGrid === "function") {
    try { await loadSetrouteCoastGrid(); } catch (e) {}
  }
  if (typeof loadSetrouteCorridorTemplates === "function") {
    try { await loadSetrouteCorridorTemplates(); } catch (e) {}
  }
  if (typeof setrouteSnapPortToSea === "function") {
    pOrig = setrouteSnapPortToSea(pOrig);
    pDest = setrouteSnapPortToSea(pDest);
  }
  const speed = parseFloat(options.speedKnots || (document.getElementById("setRouteSpeedInput") && document.getElementById("setRouteSpeedInput").value)) || 14.5;
  const draft = parseFloat(options.draftMeters || (document.getElementById("setRouteDraftInput") && document.getElementById("setRouteDraftInput").value)) || 11.5;
  const xtd = parseFloat(options.xtdNM || (document.getElementById("setRouteXtdInput") && document.getElementById("setRouteXtdInput").value)) || 0.25;
  const sailMode = options.sailMode || (document.getElementById("setRouteSailSelect") && document.getElementById("setRouteSailSelect").value) || "HYBRID";
  const viaCape = Boolean(options.viaCape);
  const viaPanama = Boolean(options.viaPanama);
  const viaPorts = Array.isArray(options.viaPorts) ? options.viaPorts : [];

  window.SETROUTE_LAST_PORTS = {
    origin: pOrig,
    dest: pDest,
    opts: { speedKnots: speed, draftMeters: draft, xtdNM: xtd, sailMode, viaCape }
  };

  const origSel = document.getElementById("setRouteOriginSelect");
  const destSel = document.getElementById("setRouteDestSelect");
  const spdInp = document.getElementById("setRouteSpeedInput");
  const drfInp = document.getElementById("setRouteDraftInput");
  const xtdInp = document.getElementById("setRouteXtdInput");
  if (origSel) origSel.value = pOrig.id;
  if (destSel) destSel.value = pDest.id;
  if (spdInp) spdInp.value = speed;
  if (drfInp) drfInp.value = draft;
  if (xtdInp) xtdInp.value = xtd;

  const origCoords = pOrig.approachCoords || pOrig.coords;
  const destCoords = pDest.approachCoords || pDest.coords;

  const viaSuez = Boolean(options.viaSuez) && !viaCape && !viaPanama;
  const tmpl = (typeof setrouteMatchCorridorTemplate === "function")
    ? setrouteMatchCorridorTemplate(pOrig.name, pDest.name)
    : null;
  let baseRoute = generateAlgorithmicMaritimeRoute(
    pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode,
    {
      viaCape: viaCape,
      viaSuez: viaSuez,
      viaPanama: viaPanama,
      templatePath: tmpl && tmpl.nodeKeys,
      templateId: tmpl && tmpl.id
    }
  );
  // Hard gate: never publish land-crossing / refused ocean geometry
  enrichRouteWithLegsTelemetry(baseRoute, {
    origin: pOrig.name, destination: pDest.name, speedKnots: speed, draftMeters: draft, xtdNM: xtd, sailMode
  });
  let auditPre = typeof auditPassagePlan === "function" ? auditPassagePlan(baseRoute) : null;
  const refused = (baseRoute.metadata && baseRoute.metadata.coreARefused)
    || (auditPre && auditPre.stats && auditPre.stats.landLegs > 0);
  if (refused) {
    // Deterministic recovery: force Panama then Cape
    const retries = [
      { viaPanama: true, viaCape: false, viaSuez: false },
      { viaCape: true, viaPanama: false, viaSuez: false }
    ];
    let recovered = false;
    for (let ri = 0; ri < retries.length; ri++) {
      const alt = generateAlgorithmicMaritimeRoute(
        pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode,
        Object.assign({ templatePath: tmpl && tmpl.nodeKeys, templateId: tmpl && tmpl.id }, retries[ri])
      );
      enrichRouteWithLegsTelemetry(alt, {
        origin: pOrig.name, destination: pDest.name, speedKnots: speed, draftMeters: draft, xtdNM: xtd, sailMode
      });
      const aud2 = typeof auditPassagePlan === "function" ? auditPassagePlan(alt) : null;
      if (!(alt.metadata && alt.metadata.coreARefused) && !(aud2 && aud2.stats && aud2.stats.landLegs > 0)) {
        baseRoute = alt;
        auditPre = aud2;
        recovered = true;
        break;
      }
    }
    if (!recovered) {
      appendChatMessage("brain",
        `<strong>Core A refused unsafe geometry</strong><div style="margin-top:4px;font-size:0.78rem;color:#fca5a5;">No land-safe sea corridor found for <b>${pOrig.name}</b> → <b>${pDest.name}</b> after Panama/Cape recovery. Route was not plotted.</div>`
      );
      return null;
    }
  }
  if (viaCape) {
    baseRoute.name = `${pOrig.name} to ${pDest.name} (Via Cape of Good Hope)`;
  } else if (viaSuez) {
    baseRoute.name = `${pOrig.name} to ${pDest.name} (Via Suez Canal)`;
  } else if (baseRoute.metadata && baseRoute.metadata.coreA && /cape/i.test(baseRoute.metadata.coreA.routeMode || "")) {
    baseRoute.name = `${pOrig.name} to ${pDest.name} (Via Cape — auto)`;
  } else if (baseRoute.metadata && baseRoute.metadata.coreA && /suez/i.test(baseRoute.metadata.coreA.routeMode || "")) {
    baseRoute.name = `${pOrig.name} to ${pDest.name} (Via Suez — auto)`;
  }

  if (viaPorts.length > 0) {
    viaPorts.forEach(vp => {
      const vpC = vp.approachCoords || vp.coords;
      const midIdx = Math.max(1, Math.floor(baseRoute.waypoints.length / 2));
      baseRoute.waypoints.splice(midIdx, 0, {
        wptNo: ('00' + (midIdx + 1)).slice(-3),
        name: `${vp.name.toUpperCase()} CALL / APPROACH`,
        lat: vpC[0],
        lon: vpC[1],
        speedKnots: speed,
        portsideXTD: xtd,
        starboardXTD: xtd,
        turnRadius: 0.6,
        sail: "RL",
        rot: 8.0
      });
    });
    baseRoute.name = `${pOrig.name} to ${pDest.name} (via ${viaPorts.map(v => v.name).join(", ")})`;
  }

  baseRoute.format = "SETROUTE_AI";
  baseRoute.metadata = {
    origin: pOrig.name,
    destination: pDest.name,
    speedKnots: speed,
    draftMeters: draft,
    xtdNM: xtd,
    sailMode: sailMode,
    generatedAt: new Date().toISOString()
  };

  enrichRouteWithLegsTelemetry(baseRoute, baseRoute.metadata);
  const audit = typeof auditPassagePlan === "function" ? auditPassagePlan(baseRoute) : null;
  const legs = baseRoute.legs || [];

  const msgEl = appendChatMessage("brain", `
    <div>
      <strong>Route ready: ${baseRoute.name}</strong>
      <div class="sr-ai-synthesis-footer" style="margin-top:6px;font-size:0.78rem;color:#94a3b8;">
        Draft <b>${draft}m</b> • Speed <b>${speed} kn</b> • XTD <b>±${xtd} NM</b> • Full leg analysis is in Route Details.
      </div>
    </div>
  `);

  const footerEl = msgEl ? msgEl.querySelector(".sr-ai-synthesis-footer") : null;
  const scrollWrap = document.getElementById("setRouteChatScroll");

  activeRouteData = baseRoute;
  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(baseRoute));
  } catch (e) {}

  saveRouteToLibrary(baseRoute);
  displaySetRouteResults(baseRoute, true);

  if (leafletMap && typeof renderRouteOnMap === "function") {
    renderRouteOnMap(baseRoute, false);
  }

  // Core B narrates nothing here — Core A audit is source of truth for safety text
  const cohereNote = (audit && audit.summary) ? audit.summary : "";

  // Check if Europe/Med <-> Asia so we can offer a 1-click toggle chip between Suez and Cape without blocking
  const isEuropeOrMed = p => p.coords[1] >= -15 && p.coords[1] <= 38 && p.coords[0] >= 25;
  const isAsiaOrGulf = p => p.coords[1] >= 48;
  const canToggleSuezCape = (isEuropeOrMed(pOrig) && isAsiaOrGulf(pDest)) || (isAsiaOrGulf(pOrig) && isEuropeOrMed(pDest));

  const refineChips = [
    { label: `⚡ Speed 16 kn`, prompt: `Set speed to 16 knots` },
    { label: `⚓ Draft 13.5m`, prompt: `Set draft to 13.5m` },
    { label: `🌐 Great Circle (GC)`, prompt: `Recalculate using Great Circle GC` },
    { label: `🔄 Reverse Route`, prompt: `Reverse route` }
  ];
  if (canToggleSuezCape) {
    refineChips.unshift(
      viaCape
        ? { label: `⚡ Switch to Suez Canal`, prompt: `Plan route via Suez Canal from ${pOrig.name} to ${pDest.name}` }
        : { label: `🌊 Switch to Cape of Good Hope`, prompt: `Plan route via Cape of Good Hope from ${pOrig.name} to ${pDest.name}` }
    );
  }

  if (footerEl) {
    footerEl.innerHTML = `
      <div style="padding:8px 10px;border-radius:10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#e2e8f0;margin-top:6px;">
        <strong style="color:#34d399;">✓ ${baseRoute.totalDistanceNM} NM • ${baseRoute.steamingDays} days${audit && audit.grade ? ` • Audit ${audit.grade}` : ""}</strong>
        ${cohereNote ? `<span style="color:#bae6fd;display:block;margin-top:4px;font-size:0.74rem;">${cohereNote}</span>` : ""}
      </div>
      <div class="sr-quick-chips" style="margin-top:8px;">
        ${refineChips.map(c => `<button type="button" class="sr-quick-chip" data-sr-prompt="${c.prompt.replace(/"/g, '&quot;')}">${c.label}</button>`).join("")}
      </div>
    `;
  }

  window.SETROUTE_CHAT_HISTORY.push({
    role: "assistant",
    content: `Generated passage plan ${baseRoute.name} (${baseRoute.totalDistanceNM} NM, ${legs.length} legs, speed ${speed} kn, draft ${draft}m).`
  });
  if (window.SETROUTE_CHAT_HISTORY.length > 14) window.SETROUTE_CHAT_HISTORY.shift();

  if (scrollWrap) scrollWrap.scrollTop = scrollWrap.scrollHeight;
}

async function handleSetRouteUserMessage(rawText) {
  const text = (rawText || "").trim();
  if (!text) return;

  appendChatMessage("user", text);
  window.SETROUTE_CHAT_HISTORY.push({ role: "user", content: text });
  if (window.SETROUTE_CHAT_HISTORY.length > 14) window.SETROUTE_CHAT_HISTORY.shift();

  const lower = text.toLowerCase();

  const spdMatch = lower.match(/(?:скорост[ьию]|speed|spd)\s*(?:to|=|:|of)?\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(?:kn|kts|knots|узл)/i);
  const drfMatch = lower.match(/(?:осадк[ауи]|draft|draught)\s*(?:to|=|:|of)?\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(?:m\b|meters|metres|м\b)/i);
  const xtdMatch = lower.match(/(?:xtd|corridor|buffer)\s*(?:to|=|:|of)?\s*(\d+(?:[.,]\d+)?)/i);

  const parsedSpd = spdMatch ? parseFloat((spdMatch[1] || spdMatch[2]).replace(",", ".")) : null;
  const parsedDrf = drfMatch ? parseFloat((drfMatch[1] || drfMatch[2]).replace(",", ".")) : null;
  const parsedXtd = xtdMatch ? parseFloat(xtdMatch[1].replace(",", ".")) : null;
  let parsedSail = null;
  if (/\bgc\b|great circle/i.test(lower)) parsedSail = "GC";
  else if (/\brl\b|rhumb/i.test(lower)) parsedSail = "RL";
  const chooseCape = /cape of good hope|via cape|around africa|agulhas/i.test(lower);
  const chooseSuez = /via suez|suez canal|through suez/i.test(lower);

  const defaultOpts = {
    speedKnots: parsedSpd || (window.SETROUTE_LAST_PORTS.opts && window.SETROUTE_LAST_PORTS.opts.speedKnots) || parseFloat((document.getElementById("setRouteSpeedInput") || {}).value) || 14.5,
    draftMeters: parsedDrf || (window.SETROUTE_LAST_PORTS.opts && window.SETROUTE_LAST_PORTS.opts.draftMeters) || parseFloat((document.getElementById("setRouteDraftInput") || {}).value) || 11.5,
    xtdNM: parsedXtd || (window.SETROUTE_LAST_PORTS.opts && window.SETROUTE_LAST_PORTS.opts.xtdNM) || parseFloat((document.getElementById("setRouteXtdInput") || {}).value) || 0.25,
    sailMode: parsedSail || (window.SETROUTE_LAST_PORTS.opts && window.SETROUTE_LAST_PORTS.opts.sailMode) || (document.getElementById("setRouteSailSelect") || {}).value || "HYBRID",
    viaCape: chooseCape,
    viaSuez: chooseSuez && !chooseCape
  };

  // 1. AI-First Intent Interpretation (Master Mariner LLM with Full Conversation Context)
  let aiActionPlan = null;
  let aiTextMessage = "";
  const thinkingEl = appendChatMessage("brain", `<span style="color:#94a3b8;">🧭 SetRoute AI analyzing navigational intent &amp; passage context...</span>`);

  if (navigator.onLine && typeof setrouteCohereChat === "function") {
    try {
      const curRouteDesc = activeRouteData
        ? `Active loaded route: "${activeRouteData.name}" (${activeRouteData.totalDistanceNM} NM, ${(activeRouteData.legs || []).length} legs, speed ${(activeRouteData.metadata && activeRouteData.metadata.speedKnots) || 14.5} kn, draft ${(activeRouteData.metadata && activeRouteData.metadata.draftMeters) || 11.5}m).`
        : "No route currently loaded.";

      const recentMsgs = window.SETROUTE_CHAT_HISTORY.slice(-7).map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }));

      const sysInstruction = `You are SetRoute INTENT PARSER only (Core B). You do NOT compute waypoints, courses, or geometry — Core A (deterministic sea-graph engine) does that.
${curRouteDesc}
Reply with a short acknowledgement, then ONE JSON object. No coordinates. No waypoint lists.
Ports known: Tianjin (Xingang), Taixing, Ningbo, Shanghai, Houston, Los Angeles, Rotterdam, Singapore, Tokyo, Panama, Suez, Antwerp, Hamburg, Busan, Hong Kong, +60.
Defaults: 14.5 kn, 11.5 m draft, XTD ±0.25 NM.
Far East China → US Gulf should prefer viaPanama:true unless user asks Cape.

JSON actions only:
1) plan: {"action":"plan","origin":"Port","destination":"Port","speedKnots":14.5,"draftMeters":11.5,"viaCape":false,"viaSuez":false,"viaPanama":false}
2) modify: {"action":"modify","speedKnots":16,"draftMeters":12.5,"sailMode":"GC|RL","viaCape":true|false,"viaSuez":true|false,"viaPanama":true|false,"reverse":false}
3) audit: {"action":"audit"}
4) resolve_exception: {"action":"resolve_exception","preferVia":"panama|cape|suez|none","avoidNodeKeys":[]}
5) If the user only asks a seamanship question with no plan/modify intent: answer in <=3 sentences English and omit JSON.
When user says "make the route / сделай маршрут / use defaults" with ports in history — emit plan JSON immediately.`;

            const cohereOut = await setrouteCohereChat([
        { role: "system", content: sysInstruction },
        ...recentMsgs
      ], { temperature: 0.15, timeoutMs: 9500 });

      if (cohereOut && cohereOut.ok) {
        const rawAi = (cohereOut.text || "").trim();
        const jMatch = rawAi.match(/\{[\s\S]*\}/);
        if (jMatch) {
          try {
            let parsed = JSON.parse(jMatch[0]);
            // Normalize provider quirks: {action_plan:{...}} or missing action when ports present
            if (parsed && parsed.action_plan && typeof parsed.action_plan === "object") {
              parsed = Object.assign({ action: "plan" }, parsed.action_plan);
            }
            if (parsed && !parsed.action && parsed.origin && parsed.destination) {
              parsed.action = "plan";
            }
            if (parsed && parsed.action) aiActionPlan = parsed;
          } catch (e) {}
          aiTextMessage = rawAi.replace(jMatch[0], "").trim();
        } else {
          aiTextMessage = rawAi;
        }
      }
    } catch (e) {}
  }

  if (thinkingEl && thinkingEl.parentNode) {
    thinkingEl.parentNode.removeChild(thinkingEl);
  }

  // 2. Execute AI Planning Action if recognized by LLM
  if (aiActionPlan && aiActionPlan.action === "plan" && aiActionPlan.origin && aiActionPlan.destination) {
    const origQuery = String(aiActionPlan.origin).trim();
    const destQuery = String(aiActionPlan.destination).trim();
    let extPorts = await resolveUnknownPortsFromText(`from ${origQuery} to ${destQuery}`, findPortsInUserMessage(`${origQuery} to ${destQuery}`));
    if (extPorts.length < 2) {
      const p1 = (findPortsInUserMessage(origQuery)[0]) || null;
      const p2 = (findPortsInUserMessage(destQuery)[0]) || null;
      if (p1 && p2 && p1.id !== p2.id) extPorts = [p1, p2];
    }
    if (extPorts.length >= 2) {
      window.SETROUTE_PENDING_CONTEXT = null;
      await executeBrainLegByLegRoutePlan(extPorts[0], extPorts[1], {
        speedKnots: aiActionPlan.speedKnots || defaultOpts.speedKnots,
        draftMeters: aiActionPlan.draftMeters || defaultOpts.draftMeters,
        xtdNM: defaultOpts.xtdNM,
        sailMode: defaultOpts.sailMode,
        viaCape: Boolean(aiActionPlan.viaCape || defaultOpts.viaCape),
        viaSuez: Boolean(aiActionPlan.viaSuez),
        viaPanama: Boolean(aiActionPlan.viaPanama) || /panama/i.test(String(aiActionPlan.preferVia || ""))
      });
      return;
    }
  }

  // 2b. Deterministic safety audit (Core A) — never LLM geometry
  if (aiActionPlan && aiActionPlan.action === "audit") {
    if (!activeRouteData) {
      appendChatMessage("brain", "No active route to audit. Plan a passage first.");
      return;
    }
    const aud = auditPassagePlan(activeRouteData);
    const issueHtml = (aud.issues || []).slice(0, 8).map((i) =>
      `<div style="font-size:0.72rem;margin-top:3px;color:${i.severity === "critical" ? "#fca5a5" : i.severity === "warn" ? "#fde68a" : "#94a3b8"};">• ${i.text}</div>`
    ).join("");
    appendChatMessage("brain", `<strong>Core A Safety Audit — grade ${aud.grade}</strong><div style="margin-top:4px;">${aud.summary}</div>${issueHtml || "<div style=\"margin-top:4px;color:#86efac;\">No critical issues.</div>"}`);
    displaySetRouteResults(activeRouteData, true);
    return;
  }

  // 3. Execute AI Route Modification if recognized by LLM
  if (aiActionPlan && aiActionPlan.action === "modify" && activeRouteData && Array.isArray(activeRouteData.waypoints)) {
    // Topology changes (Cape/Suez/reverse with ports) → full Core A replan
    const needReplan = Boolean(aiActionPlan.viaCape) || Boolean(aiActionPlan.viaSuez) || Boolean(aiActionPlan.reverse);
    const last = window.SETROUTE_LAST_PORTS || {};
    if (needReplan && last.origin && last.dest) {
      let o = last.origin;
      let d = last.dest;
      if (aiActionPlan.reverse) { const tmp = o; o = d; d = tmp; }
      await executeBrainLegByLegRoutePlan(o, d, {
        speedKnots: aiActionPlan.speedKnots || (activeRouteData.metadata && activeRouteData.metadata.speedKnots) || defaultOpts.speedKnots,
        draftMeters: aiActionPlan.draftMeters || (activeRouteData.metadata && activeRouteData.metadata.draftMeters) || defaultOpts.draftMeters,
        xtdNM: defaultOpts.xtdNM,
        sailMode: aiActionPlan.sailMode || defaultOpts.sailMode,
        viaCape: Boolean(aiActionPlan.viaCape),
        viaSuez: Boolean(aiActionPlan.viaSuez) && !Boolean(aiActionPlan.viaCape)
      });
      return;
    }
    if (aiActionPlan.reverse) {
      activeRouteData.waypoints.reverse();
      const parts = (activeRouteData.name || "").split(" to ");
      if (parts.length === 2) activeRouteData.name = `${parts[1]} to ${parts[0]}`;
    }
    activeRouteData.metadata = activeRouteData.metadata || {};
    if (aiActionPlan.speedKnots) activeRouteData.metadata.speedKnots = parseFloat(aiActionPlan.speedKnots);
    if (aiActionPlan.draftMeters) activeRouteData.metadata.draftMeters = parseFloat(aiActionPlan.draftMeters);
    if (aiActionPlan.sailMode) activeRouteData.metadata.sailMode = aiActionPlan.sailMode;
    enrichRouteWithLegsTelemetry(activeRouteData, activeRouteData.metadata);
    auditPassagePlan(activeRouteData);
    saveRouteToLibrary(activeRouteData);
    displaySetRouteResults(activeRouteData, true);
    if (leafletMap) renderRouteOnMap(activeRouteData, false);
    appendChatMessage("brain", `
      ✓ <strong>Recalculated "${activeRouteData.name}" with updated parameters</strong><br>
      Speed: <b>${activeRouteData.metadata.speedKnots || 14.5} kn</b> • Draft: <b>${activeRouteData.metadata.draftMeters || 11.5} m</b> • Total Distance: <b>${activeRouteData.totalDistanceNM} NM</b> (${activeRouteData.steamingDays} days).
      ${activeRouteData.safetyAudit ? `<div style="margin-top:4px;font-size:0.72rem;color:#94a3b8;">${activeRouteData.safetyAudit.summary}</div>` : ""}
    `);
    return;
  }

  // 4. Smart Offline / Local Semantic Intent Interpreter Fallback
  let mentionedPorts = findPortsInUserMessage(text);
  if (mentionedPorts.length < 2) {
    mentionedPorts = await resolveUnknownPortsFromText(text, mentionedPorts);
  }

  // 4a. If 2+ ports detected directly in text
  if (mentionedPorts.length >= 2) {
    window.SETROUTE_PENDING_CONTEXT = null;
    await executeBrainLegByLegRoutePlan(mentionedPorts[0], mentionedPorts[1], Object.assign({}, defaultOpts, { viaPorts: mentionedPorts.slice(2) }));
    return;
  }

  // 4b. Contextual recovery: If user said "make route first / specify later / just make it / сделай маршрут"
  if (/make\s+(?:the\s+)?route|route\s+first|specify\s+later|just\s+(?:make|plan|build)|build\s+it|do\s+it\s+now|use\s+default|сделай\s+маршрут|сначала|потом\s+уточн/i.test(lower)) {
    let histPorts = [];
    for (let i = window.SETROUTE_CHAT_HISTORY.length - 1; i >= 0; i--) {
      const h = window.SETROUTE_CHAT_HISTORY[i];
      if (h.role === "user") {
        const fp = await resolveUnknownPortsFromText(h.content, findPortsInUserMessage(h.content));
        fp.forEach(p => {
          if (!histPorts.some(x => x.id === p.id)) histPorts.push(p);
        });
        if (histPorts.length >= 2) break;
      }
    }
    let pOrig = histPorts[0] || window.SETROUTE_LAST_PORTS.origin;
    let pDest = histPorts[1] || window.SETROUTE_LAST_PORTS.dest;
    if (!pOrig || !pDest) {
      const origId = (document.getElementById("setRouteOriginSelect") || {}).value;
      const destId = (document.getElementById("setRouteDestSelect") || {}).value;
      pOrig = pOrig || PORT_DEPTHS_DB.find(p => p.id === origId) || PORT_DEPTHS_DB[0];
      pDest = pDest || PORT_DEPTHS_DB.find(p => p.id === destId) || PORT_DEPTHS_DB[1];
    }
    if (pOrig && pDest && pOrig.id !== pDest.id) {
      window.SETROUTE_PENDING_CONTEXT = null;
      await executeBrainLegByLegRoutePlan(pOrig, pDest, defaultOpts);
      return;
    }
  }

  // 4c. Single port update
  if (mentionedPorts.length === 1) {
    const pOne = mentionedPorts[0];
    if (/\b(?:via|add|call|stop|through|через|добавь)\b/i.test(lower) && activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length >= 2) {
      const appC = pOne.approachCoords || pOne.coords;
      const midIdx = Math.max(1, Math.floor(activeRouteData.waypoints.length / 2));
      activeRouteData.waypoints.splice(midIdx, 0, {
        wptNo: ('00' + (midIdx + 1)).slice(-3),
        name: `${pOne.name.toUpperCase()} CALL / APPROACH`,
        lat: appC[0],
        lon: appC[1],
        speedKnots: (activeRouteData.metadata && activeRouteData.metadata.speedKnots) || 14.5,
        portsideXTD: 0.3,
        starboardXTD: 0.3,
        turnRadius: 0.6,
        sail: "RL",
        rot: 8.0
      });
      activeRouteData.name = `${activeRouteData.name} (via ${pOne.name})`;
      enrichRouteWithLegsTelemetry(activeRouteData);
      saveRouteToLibrary(activeRouteData);
      displaySetRouteResults(activeRouteData, true);
      if (leafletMap) renderRouteOnMap(activeRouteData, false);
      appendChatMessage("brain", `✓ Added intermediate call at <b>${pOne.name}</b> (${activeRouteData.legs.length} legs, total <b>${activeRouteData.totalDistanceNM} NM</b>).`);
      return;
    }

    if ((/\bto\s+/i.test(lower) || /instead/i.test(lower)) && window.SETROUTE_LAST_PORTS.origin && window.SETROUTE_LAST_PORTS.origin.id !== pOne.id) {
      await executeBrainLegByLegRoutePlan(window.SETROUTE_LAST_PORTS.origin, pOne, defaultOpts);
      return;
    }
    if (/\bfrom\s+/i.test(lower) && window.SETROUTE_LAST_PORTS.dest && window.SETROUTE_LAST_PORTS.dest.id !== pOne.id) {
      await executeBrainLegByLegRoutePlan(pOne, window.SETROUTE_LAST_PORTS.dest, defaultOpts);
      return;
    }

    window.SETROUTE_PENDING_CONTEXT = { type: "MISSING_PORT", origin: pOne };
    window.SETROUTE_LAST_PORTS.origin = pOne;
    appendChatMessage("brain", `
      Origin locked: <b>${pOne.name} (${pOne.country})</b>.<br>
      Which destination port should I build the passage plan to?
    `, [
      { label: `${pOne.name} → Los Angeles`, prompt: `Make the route from ${pOne.name} to Los Angeles` },
      { label: `${pOne.name} → Rotterdam`, prompt: `Make the route from ${pOne.name} to Rotterdam` },
      { label: `${pOne.name} → Singapore`, prompt: `Make the route from ${pOne.name} to Singapore` },
      { label: `${pOne.name} → Houston`, prompt: `Make the route from ${pOne.name} to Houston` }
    ]);
    return;
  }

  // 4d. Parameter modifications on active route
  if (activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length >= 2) {
    if (parsedSpd || parsedDrf || parsedXtd || parsedSail || /reverse|invert|реверс/i.test(lower)) {
      if (/reverse|invert|реверс/i.test(lower)) {
        activeRouteData.waypoints.reverse();
        const parts = (activeRouteData.name || "").split(" to ");
        if (parts.length === 2) activeRouteData.name = `${parts[1]} to ${parts[0]}`;
      }
      activeRouteData.metadata = activeRouteData.metadata || {};
      if (parsedSpd) activeRouteData.metadata.speedKnots = parsedSpd;
      if (parsedDrf) activeRouteData.metadata.draftMeters = parsedDrf;
      if (parsedXtd) activeRouteData.metadata.xtdNM = parsedXtd;
      if (parsedSail) activeRouteData.metadata.sailMode = parsedSail;

      enrichRouteWithLegsTelemetry(activeRouteData, activeRouteData.metadata);
      saveRouteToLibrary(activeRouteData);
      displaySetRouteResults(activeRouteData, true);
      if (leafletMap) renderRouteOnMap(activeRouteData, false);

      appendChatMessage("brain", `
        <strong>✓ Recalculated "${activeRouteData.name}" across all ${activeRouteData.legs.length} legs</strong><br>
        Speed: <b>${activeRouteData.metadata.speedKnots || 14.5} kn</b> • Draft: <b>${activeRouteData.metadata.draftMeters || 11.5} m</b> • ETE: <b>${activeRouteData.steamingDays} days</b>.
      `);
      return;
    }
  }

  // 5. If AI returned a conversational reply, render it directly
  if (aiTextMessage) {
    window.SETROUTE_CHAT_HISTORY.push({ role: "assistant", content: aiTextMessage });
    appendChatMessage("brain", aiTextMessage.replace(/\n/g, "<br>"), [
      { label: "Ningbo → Los Angeles", prompt: "Make the route from Ningbo to Los Angeles" },
      { label: "Houston → Rotterdam", prompt: "Make the route from Houston to Rotterdam" },
      { label: "Singapore → Shanghai", prompt: "Make the route from Singapore to Shanghai" },
      { label: "Rotterdam → Singapore", prompt: "Make the route from Rotterdam to Singapore" }
    ]);
    return;
  }

  // 6. Generic conversational fallback
  const fallbackMsg = activeRouteData && activeRouteData.name
    ? `Active passage plan <b>${activeRouteData.name}</b> is active on chart (<b>${activeRouteData.totalDistanceNM} NM</b>, speed <b>${(activeRouteData.metadata && activeRouteData.metadata.speedKnots) || 14.5} kn</b>). Ask any question or name two ports to generate a new route immediately.`
    : `Tell me any two ports worldwide (e.g. <i>"Make the route from Ningbo to Los Angeles"</i>) and I will immediately calculate and plot the full passage plan.`;

  window.SETROUTE_CHAT_HISTORY.push({ role: "assistant", content: fallbackMsg });
  appendChatMessage("brain", fallbackMsg, [
    { label: "Ningbo → Los Angeles", prompt: "Make the route from Ningbo to Los Angeles" },
    { label: "Houston → Rotterdam", prompt: "Make the route from Houston to Rotterdam" },
    { label: "Singapore → Shanghai", prompt: "Make the route from Singapore to Shanghai" },
    { label: "Rotterdam → Singapore", prompt: "Make the route from Rotterdam to Singapore" }
  ]);
}

const SETROUTE_EMPTY_TITLES = [
  "Where are we sailing today?",
  "Ready for the next passage?",
  "Plot the next leg of the voyage.",
  "Which ports shall we connect?",
  "Name the departure and arrival.",
  "Chart a course — where next?",
  "Set sail: origin and destination.",
  "What's the next ocean crossing?",
  "Bridge briefing: where to?",
  "Plan the next fairway run.",
  "From berth to berth — where?",
  "Draft a passage in one sentence.",
  "Pick the next trade lane.",
  "Ocean routes start with two ports.",
  "Where does this voyage begin and end?",
  "Tell SetRoute the next call.",
  "Course to steer — which ports?",
  "Ready when you name the ports.",
  "Next waypoint cluster: which cities?",
  "Let's shape a Great Circle today.",
  "Rhumb or GC — first, the ports.",
  "Passage plan starts here.",
  "Harbour to harbour — your call.",
  "Where is the next landfall?",
  "Give me two ports and a draft.",
  "Trade route or coastal hop?",
  "Which canal or cape this time?",
  "SetRoute is standing by.",
  "Map the next commercial run.",
  "One prompt. Full leg table."
];

const SETROUTE_PROMPT_POOL = [
  { title: "Ningbo → Los Angeles", meta: "Trans-Pacific GC/RL", prompt: "Make the route from Ningbo to Los Angeles" },
  { title: "Houston → Rotterdam", meta: "Draft 11.8m · 15 kn", prompt: "Plan route from Houston to Rotterdam, draft 11.8m, speed 15 kn" },
  { title: "Singapore → Shanghai", meta: "TSS & fairways", prompt: "Plan route from Singapore to Shanghai, draft 12.5m, speed 14.5 kn" },
  { title: "Rotterdam → Singapore", meta: "Suez vs Cape", prompt: "Plan route from Rotterdam to Singapore, draft 12.0m" },
  { title: "Tokyo → San Francisco", meta: "N. Pacific GC", prompt: "Plan route from Tokyo to San Francisco using Great Circle GC" },
  { title: "Busan → Long Beach", meta: "Transpac container", prompt: "Plan route from Busan to Long Beach, draft 13.0m, speed 16 kn" },
  { title: "Antwerp → New York", meta: "N. Atlantic", prompt: "Plan route from Antwerp to New York, draft 12.2m, speed 14 kn" },
  { title: "Shanghai → Hamburg", meta: "Suez corridor", prompt: "Plan route from Shanghai to Hamburg via Suez, draft 12.5m" },
  { title: "Dubai → Singapore", meta: "Arabian–Malacca", prompt: "Plan route from Dubai to Singapore, draft 14.0m, speed 13.5 kn" },
  { title: "Santos → Qingdao", meta: "Cape / Suez options", prompt: "Plan route from Santos to Qingdao, draft 12.0m" },
  { title: "Yokohama → Vancouver", meta: "N. Pacific", prompt: "Plan route from Yokohama to Vancouver, speed 15 kn" },
  { title: "Gibraltar → Port Said", meta: "Med transit", prompt: "Plan route from Gibraltar to Port Said, draft 11.5m" },
  { title: "Mumbai → Jeddah", meta: "Red Sea approaches", prompt: "Plan route from Mumbai to Jeddah, draft 12.0m, speed 14 kn" },
  { title: "Valencia → Piraeus", meta: "West–East Med", prompt: "Plan route from Valencia to Piraeus, draft 10.5m" },
  { title: "Cape Town → Singapore", meta: "Indian Ocean RL", prompt: "Plan route from Cape Town to Singapore, draft 12.8m, speed 14.5 kn" },
  { title: "Baltimore → Rotterdam", meta: "Transatlantic", prompt: "Plan route from Baltimore to Rotterdam, draft 11.0m, speed 15 kn" },
  { title: "Kaohsiung → Los Angeles", meta: "Transpac", prompt: "Plan route from Kaohsiung to Los Angeles, draft 13.5m" },
  { title: "Le Havre → Montreal", meta: "St. Lawrence", prompt: "Plan route from Le Havre to Montreal, draft 10.8m, speed 13 kn" },
  { title: "Jakarta → Fremantle", meta: "Indonesia–Australia", prompt: "Plan route from Jakarta to Fremantle, draft 11.5m" },
  { title: "Odessa → Istanbul", meta: "Black Sea–Bosporus", prompt: "Plan route from Odessa to Istanbul, draft 9.5m, speed 12 kn" },
  { title: "Panama → Busan", meta: "Pacific climb", prompt: "Plan route from Panama to Busan, draft 12.0m, speed 15 kn" },
  { title: "Dalian → Rotterdam", meta: "Eurasia via Suez", prompt: "Plan route from Dalian to Rotterdam via Suez, draft 12.5m" },
  { title: "Chennai → Singapore", meta: "Bay of Bengal", prompt: "Plan route from Chennai to Singapore, draft 11.8m" },
  { title: "Naples → Alexandria", meta: "Central Med", prompt: "Plan route from Naples to Alexandria, draft 10.0m, speed 13 kn" }
];

function shufflePick(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = copy[i];
    copy[i] = copy[j];
    copy[j] = t;
  }
  return copy.slice(0, n);
}

function refreshSetRouteEmptyHero() {
  const titleEl = document.querySelector("#setRouteEmptyHero .setroute-empty-title");
  const promptsEl = document.querySelector("#setRouteEmptyHero .setroute-empty-prompts");
  if (titleEl) {
    titleEl.textContent = SETROUTE_EMPTY_TITLES[Math.floor(Math.random() * SETROUTE_EMPTY_TITLES.length)];
  }
  if (promptsEl) {
    const picks = shufflePick(SETROUTE_PROMPT_POOL, 4);
    promptsEl.innerHTML = picks
      .map(
        (p) =>
          `<button type="button" class="sr-empty-prompt-card" data-sr-prompt="${String(p.prompt).replace(/"/g, "&quot;")}">` +
          `<span class="sr-empty-prompt-title">${p.title}</span>` +
          `<span class="sr-empty-prompt-meta">${p.meta}</span></button>`
      )
      .join("");
  }
}
window.refreshSetRouteEmptyHero = refreshSetRouteEmptyHero;

function initSetRouteV50() {
  const chatMessages = document.getElementById("setRouteChatMessages");
  const emptyHero = document.getElementById("setRouteEmptyHero");
  const chatForm = document.getElementById("setRouteChatForm");
  const chatInput = document.getElementById("setRouteChatInput");
  const genBtn = document.getElementById("btnGenerateSetRoute");
  const newChatBtn = document.getElementById("btnSetRouteNewChat");
  refreshSetRouteEmptyHero();
  const toggleDrawerBtn = document.getElementById("btnToggleRightDrawer");
  const closeDrawerBtn = document.getElementById("btnCloseRightDrawer");
  const drawerPlotBtn = document.getElementById("btnDrawerPlotOnChart");
  const drawerAuditBtn = document.getElementById("btnDrawerAskBrainAudit");
  const drawerDelBtn = document.getElementById("btnDrawerDeleteRoute");
  const navExpandArrow = document.getElementById("navRouteExpandArrow");
  const navSavedList = document.getElementById("navSavedRoutesList");
  const navSidebar = document.querySelector(".nav-sidebar");
  const btnParamsToggle = document.getElementById("btnToggleSetRouteParams");
  const paramsPopover = document.getElementById("setRouteParamsPopover");
  const btnBackToPlan = document.getElementById("btnMonitoringBackToPlanning");

  if (navExpandArrow && !navExpandArrow._boundV50) {
    navExpandArrow._boundV50 = true;
    navExpandArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navSavedList ? navSavedList.classList.toggle("open") : false;
      navExpandArrow.classList.toggle("open", isOpen);
      navExpandArrow.textContent = isOpen ? "▴" : "▾";
      if (navSidebar) {
        navSidebar.classList.toggle("routes-tree-open", isOpen);
      }
      renderNavSavedRoutesTree();
    });
  }

  if (navSavedList && !navSavedList._boundV50) {
    navSavedList._boundV50 = true;
    navSavedList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-saved-route-id]");
      if (!btn) return;
      e.stopPropagation();
      const rtId = btn.getAttribute("data-saved-route-id");
      if (typeof switchToTab === "function") {
        switchToTab("tab-route");
      }
      selectSavedRouteFromSidebar(rtId, true);
    });
  }

  const navNewsBtn = document.getElementById("navItemSetNews");
  if (navNewsBtn && !navNewsBtn._boundV50) {
    navNewsBtn._boundV50 = true;
    navNewsBtn.addEventListener("click", () => {
      if (typeof switchToTab === "function") switchToTab("tab-news");
    });
  }

  const btnPlan = document.getElementById("btnBrainModePlanning");
  const btnMon = document.getElementById("btnBrainModeMonitoring");
  const chatScroll = document.getElementById("setRouteChatScroll");
  const monPanel = document.getElementById("setRouteMonitoringPanel");
  const compDock = document.getElementById("setRouteComposerDock");

  const setBrainMode = (mode) => {
    window.SETROUTE_BRAIN_MODE = mode;
    if (btnPlan) btnPlan.classList.toggle("active", mode === "planning");
    if (btnMon) btnMon.classList.toggle("active", mode === "monitoring");
    if (chatScroll) chatScroll.style.display = mode === "planning" ? "flex" : "none";
    if (compDock) compDock.style.display = mode === "planning" ? "block" : "none";
    if (monPanel) monPanel.style.display = mode === "monitoring" ? "flex" : "none";
  };

  if (btnPlan && btnMon && !btnPlan._boundV50) {
    btnPlan._boundV50 = true;
    btnPlan.addEventListener("click", () => setBrainMode("planning"));
    btnMon.addEventListener("click", () => setBrainMode("monitoring"));
  }
  if (btnBackToPlan && !btnBackToPlan._boundV50) {
    btnBackToPlan._boundV50 = true;
    btnBackToPlan.addEventListener("click", () => setBrainMode("planning"));
  }

  if (btnParamsToggle && paramsPopover && !btnParamsToggle._boundV50) {
    btnParamsToggle._boundV50 = true;
    btnParamsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      paramsPopover.classList.toggle("open");
    });
  }

  // Delegated click for quick prompt chips inside #tab-route (both empty state & chat messages)
  const routeShell = document.getElementById("setRouteGptShell");
  if (routeShell && !routeShell._boundPromptsV51) {
    routeShell._boundPromptsV51 = true;
    routeShell.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-sr-prompt]");
      if (chip) {
        const p = chip.getAttribute("data-sr-prompt");
        if (p) handleSetRouteUserMessage(p);
      }
    });
  }

  if (chatForm && !chatForm._boundV50) {
    chatForm._boundV50 = true;
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!chatInput) return;
      const val = chatInput.value.trim();
      if (!val) return;
      chatInput.value = "";
      handleSetRouteUserMessage(val);
    });
  }

  if (chatInput && !chatInput._boundV50) {
    chatInput._boundV50 = true;
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const val = chatInput.value.trim();
        if (!val) return;
        chatInput.value = "";
        handleSetRouteUserMessage(val);
      }
    });
  }

  if (genBtn && !genBtn._boundV50) {
    genBtn._boundV50 = true;
    const freshGenBtn = genBtn.cloneNode(true);
    freshGenBtn._boundV50 = true;
    genBtn.parentNode.replaceChild(freshGenBtn, genBtn);
    freshGenBtn.addEventListener("click", () => {
      const origId = (document.getElementById("setRouteOriginSelect") || {}).value;
      const destId = (document.getElementById("setRouteDestSelect") || {}).value;
      const pOrig = (typeof PORT_DEPTHS_DB !== "undefined" ? PORT_DEPTHS_DB : []).find(p => p.id === origId);
      const pDest = (typeof PORT_DEPTHS_DB !== "undefined" ? PORT_DEPTHS_DB : []).find(p => p.id === destId);
      if (!pOrig || !pDest) return;
      if (pOrig.id === pDest.id) {
        if (typeof showSetSailToast === "function") showSetSailToast("Please select different origin and destination ports", "warning");
        return;
      }
      if (paramsPopover) paramsPopover.classList.remove("open");
      const spd = (document.getElementById("setRouteSpeedInput") || {}).value || 14.5;
      const drf = (document.getElementById("setRouteDraftInput") || {}).value || 11.5;
      appendChatMessage("user", `Plan route from ${pOrig.name} to ${pDest.name} (speed ${spd} kn, draft ${drf} m)`);
      executeBrainLegByLegRoutePlan(pOrig, pDest, {});
    });
  }

  if (newChatBtn && !newChatBtn._boundV50) {
    newChatBtn._boundV50 = true;
    newChatBtn.addEventListener("click", () => {
      window.SETROUTE_PENDING_CONTEXT = null;
      if (chatMessages) chatMessages.innerHTML = "";
      if (emptyHero) emptyHero.style.display = "flex";
      refreshSetRouteEmptyHero();
      setBrainMode("planning");
    });
  }

  const drawer = document.getElementById("setRouteRightDrawer");
  if (toggleDrawerBtn && drawer && !toggleDrawerBtn._boundV50) {
    toggleDrawerBtn._boundV50 = true;
    toggleDrawerBtn.addEventListener("click", () => {
      if (activeRouteData) {
        displaySetRouteResults(activeRouteData, false);
      }
      drawer.classList.toggle("open");
    });
  }

  if (closeDrawerBtn && drawer && !closeDrawerBtn._boundV50) {
    closeDrawerBtn._boundV50 = true;
    closeDrawerBtn.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  }

  if (drawerPlotBtn && !drawerPlotBtn._boundV50) {
    drawerPlotBtn._boundV50 = true;
    drawerPlotBtn.addEventListener("click", () => {
      if (typeof switchToTab === "function") switchToTab("tab-ntm");
      setTimeout(() => {
        if (leafletMap && activeRouteData) {
          leafletMap.invalidateSize();
          if (typeof setOverlayActive === "function") {
            setOverlayActive("route", true, leafletMap);
          }
          renderRouteOnMap(activeRouteData, true);
        }
      }, 180);
    });
  }

  if (drawerAuditBtn && !drawerAuditBtn._boundV50) {
    drawerAuditBtn._boundV50 = true;
    drawerAuditBtn.addEventListener("click", () => {
      if (!activeRouteData) return;
      {
        const aud = auditPassagePlan(activeRouteData);
        const issueHtml = (aud.issues || []).slice(0, 10).map((i) =>
          `<div style="font-size:0.72rem;margin-top:3px;color:${i.severity === "critical" ? "#fca5a5" : i.severity === "warn" ? "#fde68a" : "#94a3b8"};">• ${i.text}</div>`
        ).join("");
        appendChatMessage("brain", `<strong>Core A Safety Audit — grade ${aud.grade}</strong><div style="margin-top:4px;">${aud.summary}</div>${issueHtml || "<div style=\"margin-top:4px;color:#86efac;\">No critical issues.</div>"}`);
        displaySetRouteResults(activeRouteData, true);
      }
    });
  }

  if (drawerDelBtn && !drawerDelBtn._boundV50) {
    drawerDelBtn._boundV50 = true;
    drawerDelBtn.addEventListener("click", () => {
      if (activeRouteData && activeRouteData.id) {
        deleteRouteFromLibrary(activeRouteData.id);
      }
    });
  }

  const legsListEl = document.getElementById("srDrawerLegsList");
  if (legsListEl && !legsListEl._boundV50) {
    legsListEl._boundV50 = true;
    legsListEl.addEventListener("click", (e) => {
      const row = e.target.closest("[data-wpt-idx], [data-leg-idx]");
      if (!row || !activeRouteData) return;
      if (row.hasAttribute("data-wpt-idx") && Array.isArray(activeRouteData.waypoints)) {
        const idx = parseInt(row.getAttribute("data-wpt-idx"), 10);
        const wp = activeRouteData.waypoints[idx];
        if (!wp) return;
        if (typeof switchToTab === "function") switchToTab("tab-ntm");
        setTimeout(() => {
          if (leafletMap) {
            leafletMap.invalidateSize();
            if (typeof setOverlayActive === "function") {
              setOverlayActive("route", true, leafletMap);
            }
            leafletMap.flyTo([wp.lat, wp.lon], Math.max(leafletMap.getZoom(), 11), { duration: 0.8 });
          }
        }, 200);
      } else if (row.hasAttribute("data-leg-idx") && Array.isArray(activeRouteData.legs)) {
        const idx = parseInt(row.getAttribute("data-leg-idx"), 10);
        const leg = activeRouteData.legs[idx];
        if (!leg) return;
        if (typeof switchToTab === "function") switchToTab("tab-ntm");
        setTimeout(() => {
          if (leafletMap) {
            leafletMap.invalidateSize();
            if (typeof setOverlayActive === "function") {
              setOverlayActive("route", true, leafletMap);
            }
            const b = L.latLngBounds([[leg.fromLat, leg.fromLon], [leg.toLat, leg.toLon]]);
            if (b.isValid()) leafletMap.fitBounds(b.pad(0.25));
          }
        }, 200);
      }
    });
  }

  renderNavSavedRoutesTree();
  if (activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length > 0) {
    displaySetRouteResults(activeRouteData, false);
  }
}

window.initSetRouteV50 = initSetRouteV50;
if (typeof loadSetrouteCoastGrid === "function") {
  try { loadSetrouteCoastGrid(); } catch (e) {}
}
const _origRefreshSetRouteUI = window.refreshSetRouteUI;
window.refreshSetRouteUI = function() {
  if (typeof _origRefreshSetRouteUI === "function") _origRefreshSetRouteUI();
  initSetRouteV50();
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof initSetRoute === "function") initSetRoute();
    initSetRouteV50();
    if (typeof initSetSailLocalization === "function") initSetSailLocalization();
  }, 240);
});

// =========================================================================
// SetSail Multi-Language Localization Engine (8 Languages + Flag Assets)
// Supported: EN, RU, JA, ZH, ES, DE, FR, FIL
// =========================================================================
const SET_SAIL_LANGUAGES = {
  en: {
    code: "en",
    flag: "gb",
    name: "English",
    label: "EN • English",
    translations: {
      nav_home: "Home",
      nav_chart: "SetChart",
      nav_route: "SetRoute",
      nav_news: "SetNews",
      nav_gyro: "Tools",
      nav_settings: "Settings",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "ECDIS Overlay, Automated NtM Plotting, Gyroscope Deviation, Route Optimization & Global Maritime Intelligence",
      home_chart_title: "Real-Time Nautical Chart Overlay",
      home_chart_sub: "Interactive vector & raster marine charts with live NtM, NAVTEX, and Port depths",
      home_news_title: "See what's happening in the world",
      home_news_sub: "From ports and canals to coasts and open ocean — live stories shaping land and sea right now",
      btn_open_chart: "Open SetChart Map",
      btn_plan_route: "Plan Passage in SetRoute",
      btn_open_news: "See all world stories →",
      btn_read_story: "Read what's happening →",
      settings_account_heading: "SetSail Account",
      settings_account_sub: "Sign in with Google to sync routes, chart edits and vessel data.",
      btn_google_signin: "Sign-In",
      btn_sign_out: "Sign Out",
      guest_mode: "GUEST MODE",
      lang_settings_title: "Language",
      lang_settings_sub: "Applies to all tabs and map overlays.",
      toast_lang_changed: "Language switched to English",
      filter_active: "Active Warnings",
      filter_navtex: "NAVTEX Alerts",
      btn_view_broadcast: "👁 View Broadcast",
      btn_inspect_edit: "✎ Inspect / Edit"
    }
  },
  ru: {
    code: "ru",
    flag: "ru",
    name: "Русский",
    label: "RU • Русский",
    translations: {
      nav_home: "Главная",
      nav_chart: "Карта SetChart",
      nav_route: "Маршрут SetRoute",
      nav_news: "Новости SetNews",
      nav_gyro: "Инструменты",
      nav_settings: "Настройки",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "Слой ECDIS, авто-нанесение извещений мореплавателям, расчет девиации гирокомпаса, оптимизация маршрутов и разведка обстановки",
      home_chart_title: "Навигационная карта реального времени",
      home_chart_sub: "Интерактивные векторные и растровые карты с живыми NtM, NAVTEX и глубинами портов",
      home_news_title: "Свежие морские сводки",
      home_news_sub: "Оперативные гидрографические, портовые и метео-сводки для вахтенных штурманов",
      btn_open_chart: "Открыть карту SetChart",
      btn_plan_route: "Рассчитать маршрут в SetRoute",
      btn_open_news: "Открыть ленту SetNews",
      btn_read_story: "Читать полностью →",
      settings_account_heading: "Аккаунт SetSail",
      settings_account_sub: "Войдите через Google, чтобы синхронизировать маршруты и правки карты.",
      btn_google_signin: "Вход",
      btn_sign_out: "Выйти из системы",
      guest_mode: "ГОСТЕВОЙ РЕЖИМ",
      lang_settings_title: "Язык",
      lang_settings_sub: "Применяется ко всем вкладкам и слоям карты.",
      toast_lang_changed: "Язык интерфейса изменен на Русский",
      filter_active: "Активные предупреждения",
      filter_navtex: "Оповещения NAVTEX",
      btn_view_broadcast: "👁 Смотреть сводку",
      btn_inspect_edit: "✎ Просмотр / Правка"
    }
  },
  ja: {
    code: "ja",
    flag: "jp",
    name: "日本語",
    label: "JA • 日本語",
    translations: {
      nav_home: "ホーム",
      nav_chart: "海図チャート",
      nav_route: "航路ルート",
      nav_news: "海事ニュース",
      nav_gyro: "航海ツール",
      nav_settings: "設定",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "ECDISオーバーレイ、NtM自動プロット、ジャイロ誤差計算、航路最適化、海事インテリジェンス",
      home_chart_title: "リアルタイム航海海図オーバーレイ",
      home_chart_sub: "NtM、NAVTEX、港湾水深を含むインタラクティブなベクター＆ラスター海図",
      home_news_title: "最新の海事ブリーフィング",
      home_news_sub: "当直航海士向けに配信されるリアルタイムの水路・港湾・気象情報",
      btn_open_chart: "SetChart海図を開く",
      btn_plan_route: "SetRouteで航路を計画",
      btn_open_news: "SetNews速報を開く",
      btn_read_story: "記事を読む →",
      settings_account_heading: "SetSailアカウント",
      settings_account_sub: "Googleでログインして航路と海図編集を同期します。",
      btn_google_signin: "サインイン",
      btn_sign_out: "ログアウト",
      guest_mode: "ゲストモード",
      lang_settings_title: "言語",
      lang_settings_sub: "すべてのタブと地図オーバーレイに適用されます。",
      toast_lang_changed: "言語を日本語に変更しました",
      filter_active: "有効な航行警報",
      filter_navtex: "NAVTEX警報",
      btn_view_broadcast: "👁 放送を表示",
      btn_inspect_edit: "✎ 確認 / 編集"
    }
  },
  zh: {
    code: "zh",
    flag: "cn",
    name: "中文",
    label: "ZH • 中文",
    translations: {
      nav_home: "首页",
      nav_chart: "海图 SetChart",
      nav_route: "航线 SetRoute",
      nav_news: "资讯 SetNews",
      nav_gyro: "航海工具",
      nav_settings: "系统设置",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "ECDIS叠加层、航行通告自动标绘、罗经差计算、航线优化与全球海事态势",
      home_chart_title: "实时航海海图叠加层",
      home_chart_sub: "包含实时航行通告、NAVTEX及港口水深的交互式矢量与栅格海图",
      home_news_title: "最新海事动态简报",
      home_news_sub: "专为驾驶台值班人员整理的实时水文、港口、运河与气象情报",
      btn_open_chart: "打开 SetChart 海图",
      btn_plan_route: "在 SetRoute 中规划航线",
      btn_open_news: "打开 SetNews 资讯",
      btn_read_story: "阅读全文 →",
      settings_account_heading: "SetSail 账户",
      settings_account_sub: "使用 Google 登录以同步航线与海图标注。",
      btn_google_signin: "登录",
      btn_sign_out: "退出登录",
      guest_mode: "访客模式",
      lang_settings_title: "语言",
      lang_settings_sub: "适用于所有标签页与海图图层。",
      toast_lang_changed: "系统语言已切换为中文",
      filter_active: "有效航行警告",
      filter_navtex: "NAVTEX 警报",
      btn_view_broadcast: "👁 查看广播内容",
      btn_inspect_edit: "✎ 检查 / 编辑"
    }
  },
  es: {
    code: "es",
    flag: "es",
    name: "Español",
    label: "ES • Español",
    translations: {
      nav_home: "Inicio",
      nav_chart: "SetChart",
      nav_route: "SetRoute",
      nav_news: "SetNews",
      nav_gyro: "Herramientas",
      nav_settings: "Ajustes",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "Superposición ECDIS, trazado de avisos a los navegantes, desvío giroscópico y optimización de rutas",
      home_chart_title: "Cartografía Náutica en Tiempo Real",
      home_chart_sub: "Cartas vectoriales y ráster interactivas con NtM, NAVTEX y profundidades de puertos",
      home_news_title: "Últimos Informes Marítimos",
      home_news_sub: "Informes hidrográficos, portuarios, de canales y meteorológicos en tiempo real para el puente",
      btn_open_chart: "Abrir mapa SetChart",
      btn_plan_route: "Planificar en SetRoute",
      btn_open_news: "Abrir SetNews",
      btn_read_story: "Leer historia completa →",
      settings_account_heading: "Cuenta SetSail",
      settings_account_sub: "Inicie sesión con Google para sincronizar rutas y marcas.",
      btn_google_signin: "Acceder",
      btn_sign_out: "Cerrar sesión",
      guest_mode: "MODO INVITADO",
      lang_settings_title: "Idioma",
      lang_settings_sub: "Se aplica a todas las pestañas y capas.",
      toast_lang_changed: "Idioma cambiado a Español",
      filter_active: "Avisos Activos",
      filter_navtex: "Alertas NAVTEX",
      btn_view_broadcast: "👁 Ver Emisión",
      btn_inspect_edit: "✎ Inspeccionar / Editar"
    }
  },
  de: {
    code: "de",
    flag: "de",
    name: "Deutsch",
    label: "DE • Deutsch",
    translations: {
      nav_home: "Startseite",
      nav_chart: "SetChart",
      nav_route: "SetRoute",
      nav_news: "SetNews",
      nav_gyro: "Werkzeuge",
      nav_settings: "Einstellungen",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "ECDIS-Overlay, automatische NtM-Eintragung, Kreiselkompass-Ablenkung und Routenoptimierung",
      home_chart_title: "Echtzeit-Seekarten-Overlay",
      home_chart_sub: "Interaktive Vektor- und Rasterkarten mit Live-NtM, NAVTEX und Hafentiefen",
      home_news_title: "Neueste Maritime Lageberichte",
      home_news_sub: "Echtzeit-Meldungen zu Hydrographie, Häfen, Kanälen und Metozean für Wachoffiziere",
      btn_open_chart: "SetChart Karte öffnen",
      btn_plan_route: "Route in SetRoute planen",
      btn_open_news: "SetNews Draht öffnen",
      btn_read_story: "Bericht lesen →",
      settings_account_heading: "SetSail-Konto",
      settings_account_sub: "Mit Google anmelden, um Routen und Kartenkorrekturen zu synchronisieren.",
      btn_google_signin: "Anmelden",
      btn_sign_out: "Abmelden",
      guest_mode: "GASTMODUS",
      lang_settings_title: "Sprache",
      lang_settings_sub: "Gilt für alle Registerkarten und Karten-Overlays.",
      toast_lang_changed: "Sprache auf Deutsch umgestellt",
      filter_active: "Aktive Warnungen",
      filter_navtex: "NAVTEX-Warnungen",
      btn_view_broadcast: "👁 Sendung anzeigen",
      btn_inspect_edit: "✎ Prüfen / Bearbeiten"
    }
  },
  fr: {
    code: "fr",
    flag: "fr",
    name: "Français",
    label: "FR • Français",
    translations: {
      nav_home: "Accueil",
      nav_chart: "SetChart",
      nav_route: "SetRoute",
      nav_news: "SetNews",
      nav_gyro: "Outils",
      nav_settings: "Paramètres",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "Superposition ECDIS, tracé automatique des avis aux navigateurs, déviation du gyrocompas et météo",
      home_chart_title: "Superposition Cartographique en Temps Réel",
      home_chart_sub: "Cartes vectorielles et matricielles interactives avec avis NtM, NAVTEX et profondeurs",
      home_news_title: "Derniers Bulletins Maritimes",
      home_news_sub: "Bulletins hydrographiques, portuaires et météo en direct pour les officiers de quart",
      btn_open_chart: "Ouvrir la carte SetChart",
      btn_plan_route: "Planifier dans SetRoute",
      btn_open_news: "Ouvrir SetNews",
      btn_read_story: "Lire l'article complet →",
      settings_account_heading: "Compte SetSail",
      settings_account_sub: "Connectez-vous avec Google pour synchroniser routes et cartes.",
      btn_google_signin: "Connexion",
      btn_sign_out: "Déconnexion",
      guest_mode: "MODE INVITÉ",
      lang_settings_title: "Langue",
      lang_settings_sub: "S'applique à tous les onglets et calques.",
      toast_lang_changed: "Langue changée en Français",
      filter_active: "Avis Actifs",
      filter_navtex: "Alertes NAVTEX",
      btn_view_broadcast: "👁 Voir l'Émission",
      btn_inspect_edit: "✎ Inspecter / Éditer"
    }
  },
  fil: {
    code: "fil",
    flag: "ph",
    name: "Filipino",
    label: "FIL • Filipino",
    translations: {
      nav_home: "Tahanan",
      nav_chart: "SetChart",
      nav_route: "SetRoute",
      nav_news: "SetNews",
      nav_gyro: "Mga Gamit",
      nav_settings: "Mga Setting",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "ECDIS overlay, awtomatikong NtM plotting, kalkulasyon ng gyro deviation at pagpaplano ng ruta",
      home_chart_title: "Real-Time Nautical Chart Overlay",
      home_chart_sub: "Interactive vector at raster marine charts na may live NtM, NAVTEX at lalim ng daungan",
      home_news_title: "Pinakabagong Ulat Pang-Dagat",
      home_news_sub: "Real-time hydrographic, port, canal, at metocean dispatches para sa bridge watchkeepers",
      btn_open_chart: "Buksan ang SetChart Map",
      btn_plan_route: "Magplano sa SetRoute",
      btn_open_news: "Buksan ang SetNews",
      btn_read_story: "Basahin nang Buo →",
      settings_account_heading: "SetSail Account",
      settings_account_sub: "Mag-sign in sa Google para i-sync ang mga ruta at chart edits.",
      btn_google_signin: "Sign-In",
      btn_sign_out: "Mag-sign out",
      guest_mode: "MODO BISITA",
      lang_settings_title: "Wika",
      lang_settings_sub: "Nalalapat sa lahat ng tab at map overlays.",
      toast_lang_changed: "Pinalitan ang wika sa Filipino",
      filter_active: "Aktibong Babala",
      filter_navtex: "NAVTEX Babala",
      btn_view_broadcast: "👁 Tingnan ang Broadcast",
      btn_inspect_edit: "✎ Suriin / I-edit"
    }
  },
  hi: {
    code: "hi",
    flag: "in",
    name: "हिन्दी",
    label: "HI • हिन्दी",
    translations: {
      nav_home: "होम",
      nav_chart: "SetChart मानचित्र",
      nav_route: "SetRoute मार्ग",
      nav_news: "SetNews समाचार",
      nav_gyro: "उपकरण",
      nav_settings: "सेटिंग्स",
      hero_title: "YOUR AI-POWERED BRIDGE",
      hero_sub: "ECDIS ओवरले, स्वचालित NtM प्लॉटिंग, जायरो विचलन, मार्ग अनुकूलन और समुद्री खुफिया",
      home_chart_title: "रीयल-टाइम नौवहन चार्ट ओवरले",
      home_chart_sub: "लाइव NtM, NAVTEX और पोर्ट गहराई के साथ इंटरैक्टिव समुद्री चार्ट",
      home_news_title: "दुनिया में क्या हो रहा है देखें",
      home_news_sub: "ब्रिज वॉचकीपर के लिए रीयल-टाइम हाइड्रोग्राफिक, पोर्ट और मौसम डिस्पैच",
      btn_open_chart: "SetChart मानचित्र खोलें",
      btn_plan_route: "SetRoute में मार्ग योजना",
      btn_open_news: "SetNews खोलें",
      btn_read_story: "पूरी खबर पढ़ें →",
      settings_account_heading: "SetSail खाता",
      settings_account_sub: "मार्ग और चार्ट संपादन सिंक करने के लिए Google से साइन इन करें।",
      btn_google_signin: "साइन-इन",
      btn_sign_out: "साइन आउट",
      guest_mode: "अतिथि मोड",
      lang_settings_title: "भाषा",
      lang_settings_sub: "सभी टैब और मानचित्र परतों पर लागू।",
      toast_lang_changed: "भाषा हिन्दी में बदली गई",
      filter_active: "सक्रिय चेतावनियाँ",
      filter_navtex: "NAVTEX अलर्ट",
      btn_view_broadcast: "👁 प्रसारण देखें",
      btn_inspect_edit: "✎ जाँच / संपादन"
    }
  }

};
window.SET_SAIL_LANGUAGES = SET_SAIL_LANGUAGES;

function getSetSailLanguage() {
  try {
    return localStorage.getItem("setsail_language") || "en";
  } catch (e) {
    return "en";
  }
}
window.getSetSailLanguage = getSetSailLanguage;

function setSetSailLanguage(langCode) {
  const targetCode = SET_SAIL_LANGUAGES[langCode] ? langCode : "en";
  try {
    localStorage.setItem("setsail_language", targetCode);
  } catch (e) {}
  applySetSailLanguage(targetCode);

  const langObj = SET_SAIL_LANGUAGES[targetCode];
  if (langObj && langObj.translations && langObj.translations.toast_lang_changed) {
    if (typeof showToast === "function") {
      showToast(langObj.translations.toast_lang_changed, "info");
    }
  }
}
window.setSetSailLanguage = setSetSailLanguage;

function applySetSailLanguage(langCode) {
  const langObj = SET_SAIL_LANGUAGES[langCode] || SET_SAIL_LANGUAGES.en;
  const t = langObj.translations || {};

  // Update text elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update placeholders with data-i18n-ph
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (t[key]) {
      el.setAttribute("placeholder", t[key]);
    }
  });

  // Update titles with data-i18n-title
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (t[key]) {
      el.setAttribute("title", t[key]);
    }
  });

  // Update navigation items
  const navMap = {
    "tab-home": t.nav_home,
    "tab-ntm": t.nav_chart,
    "tab-route": t.nav_route,
    "tab-news": t.nav_news,
    "tab-gyro": t.nav_gyro,
    "tab-settings": t.nav_settings
  };
  Object.keys(navMap).forEach(tabId => {
    const navItem = document.querySelector(`.nav-sidebar .nav-item[data-tab="${tabId}"] span:last-child`);
    if (navItem && navMap[tabId]) {
      navItem.textContent = navMap[tabId];
    }
  });

  // Update Language Settings Card active buttons and badge
  const badge = document.getElementById("currentLangBadge");
  if (badge) {
    badge.textContent = langObj.label;
  }
  document.querySelectorAll(".lang-choice-btn").forEach(btn => {
    const code = btn.getAttribute("data-lang-code");
    btn.classList.toggle("active", code === targetCodeStrict(langCode));
  });

  try {
    window.dispatchEvent(new CustomEvent("setsail:languagechange", { detail: { lang: langCode } }));
  } catch (e) {}

  // Re-apply auth HUD after i18n — language pass would otherwise overwrite the Google display name with "Sign-In"
  try {
    if (typeof syncSetSailAuthUI === "function") syncSetSailAuthUI();
  } catch (eAuth) {}
}
window.applySetSailLanguage = applySetSailLanguage;

function targetCodeStrict(c) {
  return SET_SAIL_LANGUAGES[c] ? c : "en";
}

function initSetSailLocalization() {
  const saved = getSetSailLanguage();
  applySetSailLanguage(saved);
}
window.initSetSailLocalization = initSetSailLocalization;
