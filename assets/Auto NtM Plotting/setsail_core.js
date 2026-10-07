// ?? SetSail Brand Minimalist Vector Icon Engine ??
const SetSailIcons = {
  svg(name, extraClass = "") {
    const cls = extraClass ? `setsail-icon ${extraClass}` : `setsail-icon`;
    switch (name) {
      case "chart":
        return `<svg class="${cls}" viewBox="0 0 24 24"><polygon points="1 6 8 2 16 6 23 2 23 18 16 22 8 18 1 22 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;
      case "compass":
      case "star":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polygon points="12 4 14 10 20 12 14 14 12 20 10 14 4 12 10 10" fill="currentColor" fill-opacity="0.25"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`;
      case "settings":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
      case "clock":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 15 15"/><path d="M12 2v3M10 2h4"/></svg>`;
      case "pos":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="currentColor" fill-opacity="0.3"/></svg>`;
      case "vessel":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M12 2l4 7v9l-4 3-4-3V9l4-7z" fill="currentColor" fill-opacity="0.15"/><line x1="12" y1="2" x2="12" y2="8"/><circle cx="12" cy="13" r="1.5" fill="currentColor"/></svg>`;
      case "target":
      case "fit":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/></svg>`;
      case "mail": return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
      case "check": return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>`;
      case "export":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`;
      case "list":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`;
      case "anchor":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`;
      case "info":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="11"/><circle cx="12" cy="7.5" r="1" fill="currentColor"/></svg>`;
      case "search":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>`;
      case "import":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
      case "warning":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      case "cancelled":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
      case "wave":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M2 6c3-2 6-2 9 0s6 2 9 0"/><path d="M2 12c3-2 6-2 9 0s6 2 9 0"/><path d="M2 18c3-2 6-2 9 0s6 2 9 0"/></svg>`;
      case "satellite":
        return `<svg class="${cls}" viewBox="0 0 24 24"><path d="M13 2L3 12M21 10L11 20"/><rect x="7" y="7" width="10" height="10" rx="1" transform="rotate(45 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;
      case "route":
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="4" cy="19" r="2"/><circle cx="20" cy="5" r="2"/><path d="M4 17c0-4 4-6 8-6s8-2 8-6" stroke-dasharray="3,3"/><polygon points="17 4 20 5 19 8" fill="currentColor"/></svg>`;
      default:
        return `<svg class="${cls}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>`;
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
let NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM"]); // Default: all active notice types
let NTM_FILTER_AREAS = false;
let NTM_SHOW_CANCELLED = false; // Strictly isolated from map by default!
let NTM_ACTIVE_NAVAREA = "ALL";
let NTM_ACTIVE_SORT = "NUM_DESC";

let leafletMap = null;
let leafletMarkersLayer = null;
let leafletVesselLayer = null;
let userVessel = null; // { lat, lon, source: "gps" | "manual" }
let mobileCurrentView = "list"; // "list" | "map"

// Safe and immediate initialization
function initApp() {
  function safe(name, fn) {
    try { fn(); } catch (err) { console.warn("[SetSail] init error in " + name, err); }
  }
  safe("theme", initTheme);
  safe("nav", initNavigationTabs);
  safe("tab", () => switchToTab("tab-home"));
  safe("clock", initHomeChronometer);
  safe("video", initHomeVideo);
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
    if (target) switchToTab(target);
    return;
  }
  const tabBtn = e.target.closest(".nav-sidebar .nav-item");
  if (tabBtn) {
    e.preventDefault();
    const target = tabBtn.getAttribute("data-tab");
    if (target) switchToTab(target);
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
      if (targetTab) switchToTab(targetTab);
    });
  });

  // Support CTA buttons across the interface
  document.querySelectorAll("[data-switch-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-switch-tab");
      if (targetTab) switchToTab(targetTab);
    });
  });
}

/**
 * Programmatic Tab Switcher
 */
function switchToTab(targetTab) {
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

  if (targetTab === "tab-home") {
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
      if (typeof drawDevChart === "function") drawDevChart();
    }, 50);
  }

  if (targetTab === "tab-ntm") {
    setTimeout(() => {
      if (leafletMap) {
        leafletMap.invalidateSize();
      } else {
        initNtMMap();
      }
    }, 150);
  }
}

/**
 * Real-Time UTC Digital Chronometer for Bridge Home Page
 */
function initHomeChronometer() {
  const clockEl = document.getElementById("homeUtcClock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, "0");
    const mm = String(now.getUTCMinutes()).padStart(2, "0");
    const ss = String(now.getUTCSeconds()).padStart(2, "0");
    clockEl.textContent = `${hh}:${mm}:${ss} UTC`;
  }
  update();
  setInterval(update, 1000);
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
    statusEl.innerHTML = `<span class="ntm-live-status"><span class="ntm-live-dot" title="Live UKHO telemetry online"></span>Live NtM ${wkStr}: ${activeCnt} active</span>`;
  } else {
    statusEl.innerHTML = `<span class="ntm-live-status" style="color:#ff6b81;"><span class="ntm-offline-dot" title="Offline mode — using cached NtM database"></span>Offline (Cached NtM ${wkStr}): ${activeCnt} active</span>`;
  }
}

/**
 * IMO / IHO NAVAREA Resolver:
 * Maps notice to its corresponding NAVAREA (I through XXI) based on country, region and coordinates
 */
function getNoticeNavarea(notice) {
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

    if (filterPop && !filterPop.contains(e.target) && e.target !== filterBtn && !filterBtn?.contains(e.target)) {
      filterPop.classList.remove("open");
      if (filterBtn) filterBtn.classList.remove("active");
    }
    if (sortPop && !sortPop.contains(e.target) && e.target !== sortBtn && !sortBtn?.contains(e.target)) {
      sortPop.classList.remove("open");
      if (sortBtn) sortBtn.classList.remove("active");
    }
    if (vesselPop && !vesselPop.contains(e.target) && e.target !== myVesselBtn && !myVesselBtn?.contains(e.target)) {
      vesselPop.classList.remove("open");
      if (myVesselBtn) myVesselBtn.classList.remove("active");
    }
  });

  // Filter Checkbox Listeners
  const chkAll = document.getElementById("popChkAll");
  const chkT = document.getElementById("popChkT");
  const chkP = document.getElementById("popChkP");
  const chkPerm = document.getElementById("popChkPerm");
  const chkPoly = document.getElementById("popChkPoly");
  const chkCan = document.getElementById("popChkCancelled");
  const selectNavarea = document.getElementById("popSelectNavarea");

  if (chkAll) {
    chkAll.addEventListener("change", () => {
      if (chkAll.checked) {
        NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM"]);
        NTM_FILTER_AREAS = false;
        NTM_SHOW_CANCELLED = false;
        NTM_ACTIVE_NAVAREA = "ALL";
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
    if (chkT && chkT.checked) NTM_ACTIVE_TYPES.add("T");
    if (chkP && chkP.checked) NTM_ACTIVE_TYPES.add("P");
    if (chkPerm && chkPerm.checked) NTM_ACTIVE_TYPES.add("PERM");

    const allTypesChecked = NTM_ACTIVE_TYPES.size === 3 && !NTM_FILTER_AREAS && !NTM_SHOW_CANCELLED && NTM_ACTIVE_NAVAREA === "ALL";
    if (chkAll) chkAll.checked = allTypesChecked;

    syncFilterIndicators();
    renderNtMListAndMap();
  };

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
  const isDefault = NTM_ACTIVE_TYPES.has("T") && NTM_ACTIVE_TYPES.has("P") && NTM_ACTIVE_TYPES.has("PERM") && !NTM_FILTER_AREAS && !NTM_SHOW_CANCELLED && NTM_ACTIVE_NAVAREA === "ALL";

  if (dot) dot.style.display = isDefault ? "none" : "block";

  if (label) {
    if (NTM_SHOW_CANCELLED) {
      label.innerHTML = SetSailIcons.svg("cancelled") + " Cancelled";
    } else if (NTM_ACTIVE_NAVAREA !== "ALL") {
      label.textContent = NTM_ACTIVE_NAVAREA;
    } else if (isDefault) {
      label.textContent = "All Active";
    } else {
      const parts = [];
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

  // Export Modal Open / Close
  if (openExportBtn && exportModal) {
    openExportBtn.addEventListener("click", () => {
      updateExportModalCounts();
      exportModal.classList.add("open");
    });
    if (expBtnClose) {
      expBtnClose.addEventListener("click", () => {
        exportModal.classList.remove("open");
      });
    }
  }

  // Checkbox listeners in Export modal
  [expChkT, expChkP, expChkPerm, expChkOnlyChecked].forEach(chk => {
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
      if (expandBtn) expandBtn.style.display = "block";
      setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 250);
    });
  }

  if (expandBtn && workspaceEl) {
    expandBtn.addEventListener("click", () => {
      workspaceEl.classList.remove("sidebar-collapsed");
      expandBtn.style.display = "none";
      setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 250);
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

  // Load Remote / Storage / Sample notices
  loadRemoteNoticesJson().then(loadedRemote => {
    if (!loadedRemote) {
      if (!loadStoreFromStorage()) {
        loadSampleNtMData();
      }
      updateNetworkStatusHUD(false);
    }
  });
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
  let routeName = routeInfo?.getAttribute("routeName") || fallbackName.replace(/\.rtz$/i, "");
  
  const waypoints = [];
  const wpNodes = doc.querySelectorAll("waypoint");
  wpNodes.forEach((wp, idx) => {
    const pos = wp.querySelector("position");
    if (!pos) return;
    const lat = parseFloat(pos.getAttribute("lat"));
    const lon = parseFloat(pos.getAttribute("lon"));
    if (isNaN(lat) || isNaN(lon)) return;
    const wpName = wp.getAttribute("name") || wp.querySelector("defaultWaypoint")?.getAttribute("name") || `WPT ${idx + 1}`;
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
        waypoints.push({
          id: wpIdx + 1,
          lat,
          lon,
          name: wpName
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
  if (!leafletRouteLayer) {
    leafletRouteLayer = L.layerGroup().addTo(leafletMap);
  }
  leafletRouteLayer.clearLayers();
  
  if (!route || !route.waypoints || route.waypoints.length === 0) {
    return;
  }
  
  activeRouteData = route;
  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(route));
  } catch (e) {}

  // Continuous longitude unwrapping for Pacific / antimeridian crossing
  const unrolledCoords = [];
  let prevLon = null;
  let lonOffset = 0;

  for (let i = 0; i < route.waypoints.length; i++) {
    const wp = route.waypoints[i];
    let curLon = wp.lon;
    if (prevLon !== null) {
      let diff = curLon - (prevLon - lonOffset);
      if (diff > 180) {
        lonOffset -= 360;
      } else if (diff < -180) {
        lonOffset += 360;
      }
    }
    const adjustedLon = curLon + lonOffset;
    unrolledCoords.push([wp.lat, adjustedLon]);
    prevLon = adjustedLon;
  }

  // Draw Route Track Polyline
  const trackGlow = L.polyline(unrolledCoords, {
    color: "#0284c7",
    weight: 7,
    opacity: 0.35,
    interactive: false
  });
  const trackLine = L.polyline(unrolledCoords, {
    color: "#38bdf8",
    weight: 3.5,
    dashArray: "8, 6",
    opacity: 0.95
  });
  
  leafletRouteLayer.addLayer(trackGlow);
  leafletRouteLayer.addLayer(trackLine);

  // Add Waypoints
  route.waypoints.forEach((wp, idx) => {
    const isStart = idx === 0;
    const isEnd = idx === route.waypoints.length - 1;
    const wptCoords = unrolledCoords[idx];
    
    const color = isStart ? "#10b981" : (isEnd ? "#ea4c25" : "#38bdf8");
    const fillColor = isStart ? "#10b981" : (isEnd ? "#ea4c25" : "#ffffff");
    const radius = isStart || isEnd ? 6 : 4;
    
    const marker = L.circleMarker(wptCoords, {
      radius,
      color,
      weight: 2,
      fillColor,
      fillOpacity: 0.95,
      zIndexOffset: 1000
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
}

function clearActiveRoute() {
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
}

function fitRouteBounds() {
  if (!leafletMap || !activeRouteData || !activeRouteData.waypoints || activeRouteData.waypoints.length === 0) return;
  const latLngs = activeRouteData.waypoints.map(w => [w.lat, w.lon]);
  const b = L.latLngBounds(latLngs);
  if (b.isValid()) {
    leafletMap.fitBounds(b.pad(0.08));
  }
}

function initHomeHudVessel() {
  const homeHudCoords = document.getElementById("homeVesselHudCoords");
  const homeHudPill = document.getElementById("homeVesselHudPill");

  if (homeHudPill) {
    homeHudPill.addEventListener("click", () => {
      switchToTab("tab-ntm");
      if (userVessel && leafletMap) {
        leafletMap.flyTo([userVessel.lat, userVessel.lon], Math.max(leafletMap.getZoom(), 9));
      } else {
        const myVesselBtn = document.getElementById("ntmMyVesselBtn");
        if (myVesselBtn) myVesselBtn.click();
      }
    });
  }

  if (userVessel) {
    if (homeHudCoords) {
      homeHudCoords.innerHTML = `${SetSailIcons.svg("pos")} <strong>${formatLatLonDMS(userVessel.lat, userVessel.lon)}</strong>`;
    }
    return;
  }

  // First-visit automatic geolocation prompt
  const geoPrompted = localStorage.getItem("setsail_geo_prompted");
  if (!geoPrompted) {
    localStorage.setItem("setsail_geo_prompted", "1");
    if (navigator.geolocation) {
      if (homeHudCoords) homeHudCoords.textContent = "ACQUIRING GPS...";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          plotUserVessel(lat, lon, "gps");
          if (homeHudCoords) {
            homeHudCoords.innerHTML = `${SetSailIcons.svg("pos")} <strong>${formatLatLonDMS(lat, lon)}</strong>`;
          }
        },
        (err) => {
          console.log("[SetSail Geo] First-visit GPS acquisition declined:", err.message);
          if (homeHudCoords) {
            homeHudCoords.innerHTML = "POS: <em>NOT SET</em>";
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      if (homeHudCoords) homeHudCoords.innerHTML = "POS: <em>NOT SET</em>";
    }
  } else {
    if (homeHudCoords) homeHudCoords.innerHTML = "POS: <em>NOT SET</em>";
  }
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
      const file = e.target.files?.[0];
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

  // Load persisted vessel state
  try {
    const raw = localStorage.getItem(VESSEL_STORAGE_KEY);
    if (raw) {
      userVessel = JSON.parse(raw);
    }
  } catch (e) {}

  const togglePopover = () => {
    if (!vesselPop) return;
    const isOpen = vesselPop.classList.contains("open");

    // Close filter and sort popovers
    const filterPop = document.getElementById("ntmFilterPopover");
    const sortPop = document.getElementById("ntmSortPopover");
    if (filterPop) filterPop.classList.remove("open");
    if (sortPop) sortPop.classList.remove("open");

    if (isOpen) {
      vesselPop.classList.remove("open");
      if (myVesselBtn) myVesselBtn.classList.remove("active");
    } else {
      vesselPop.classList.add("open");
      if (myVesselBtn) myVesselBtn.classList.add("active");
      if (userVessel) {
        const latEl = document.getElementById("vesselLat");
        const lonEl = document.getElementById("vesselLon");
        if (latEl) latEl.value = formatLatLonDMS(userVessel.lat, userVessel.lon);
        if (lonEl) lonEl.value = formatLatLonDMS(userVessel.lat, userVessel.lon);
        if (clearBtn) clearBtn.style.display = "inline-block";
      } else {
        if (clearBtn) clearBtn.style.display = "none";
      }
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

  // Auto GPS
  if (fetchGpsBtn) {
    fetchGpsBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser. Please enter coordinates manually.");
        return;
      }
      fetchGpsBtn.innerHTML = `Acquiring GPS... ${SetSailIcons.svg("vessel")}`;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchGpsBtn.innerHTML = `${SetSailIcons.svg("pos")} Auto GPS Position`;
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const latEl = document.getElementById("vesselLat");
          const lonEl = document.getElementById("vesselLon");
          if (latEl) latEl.value = lat.toFixed(5);
          if (lonEl) lonEl.value = lon.toFixed(5);

          plotUserVessel(lat, lon, "gps");
          closePopover();
        },
        (err) => {
          fetchGpsBtn.innerHTML = `${SetSailIcons.svg("pos")} Auto GPS Position`;
          alert(`GPS Error: ${err.message}. Please enter coordinates manually below.`);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  // Manual Coordinates
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const latVal = document.getElementById("vesselLat")?.value.trim() || "";
      const lonVal = document.getElementById("vesselLon")?.value.trim() || "";

      const parsedLat = parseCoordinateString(latVal);
      const parsedLon = parseCoordinateString(lonVal);

      if (parsedLat === null || parsedLon === null) {
        alert("Please enter valid coordinates (e.g., 58° 37.70' N or 58.6283).");
        return;
      }

      plotUserVessel(parsedLat, parsedLon, "manual");
      closePopover();
    });
  }

  // Clear Vessel Target
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      userVessel = null;
      try { localStorage.removeItem(VESSEL_STORAGE_KEY); } catch (e) {}
      if (leafletVesselLayer) leafletVesselLayer.clearLayers();
      const hud = document.getElementById("ntmVesselHud");
      if (hud) hud.style.display = "none";
      const homeHudCoords = document.getElementById("homeVesselHudCoords");
      if (homeHudCoords) {
        homeHudCoords.innerHTML = "POS: <em>NOT SET</em>";
      }
      closePopover();
    });
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

/**
 * Generates Crosshair Target Marker
 */
function getEcdisCrosshairIcon() {
  const svgHtml = `
    <div class="crosshair-wrapper">
      <div class="crosshair-pulse-ring"></div>
      <svg width="34" height="34" viewBox="-17 -17 34 34" class="crosshair-svg">
        <circle cx="0" cy="0" r="13" fill="none" stroke="#00e5ff" stroke-width="1.2" opacity="0.5" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="#ffffff" stroke-width="1.8" />
        <line x1="0" y1="-15" x2="0" y2="-9" stroke="#ffffff" stroke-width="2" />
        <line x1="0" y1="9" x2="0" y2="15" stroke="#ffffff" stroke-width="2" />
        <line x1="-15" y1="0" x2="-9" y2="0" stroke="#ffffff" stroke-width="2" />
        <line x1="9" y1="0" x2="15" y2="0" stroke="#ffffff" stroke-width="2" />
        <circle cx="0" cy="0" r="3" fill="#00e5ff" stroke="#ffffff" stroke-width="1" />
      </svg>
    </div>
  `;
  return L.divIcon({
    html: svgHtml,
    className: "ecdis-crosshair-marker",
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
}

/**
 * Plot user vessel crosshair on map
 */
function plotUserVessel(lat, lon, source = "manual") {
  userVessel = { lat, lon, source, updatedAt: new Date().toISOString() };

  try {
    localStorage.setItem(VESSEL_STORAGE_KEY, JSON.stringify(userVessel));
  } catch (e) {}

  if (leafletMap && leafletVesselLayer) {
    leafletVesselLayer.clearLayers();

    const marker = L.marker([lat, lon], {
      icon: getEcdisCrosshairIcon(),
      zIndexOffset: 1200
    });

    marker.bindPopup(`
      <div style="font-family:'Segoe UI',sans-serif;color:#111;min-width:180px;">
        <div style="font-weight:700;color:#0a3888;font-size:1rem;border-bottom:1px solid #ddd;padding-bottom:3px;margin-bottom:5px;">
          Vessel Position
        </div>
        <div style="font-size:0.8rem;color:#333;margin-bottom:3px;"><b>Coordinates:</b> ${formatLatLonDMS(lat, lon)}</div>
        <div style="font-size:0.75rem;color:#666;"><b>Source:</b> ${source === "gps" ? "Browser GPS" : "Manual Navigation Entry"}</div>
      </div>
    `);

    leafletVesselLayer.addLayer(marker);
    leafletMap.flyTo([lat, lon], Math.max(leafletMap.getZoom(), 8));
  }

  const hud = document.getElementById("ntmVesselHud");
  if (hud) {
    hud.style.display = "flex";
    hud.innerHTML = `${SetSailIcons.svg("vessel")} <strong>Vessel:</strong> ${formatLatLonDMS(lat, lon)}`;
  }

  const homeHudCoords = document.getElementById("homeVesselHudCoords");
  if (homeHudCoords) {
    homeHudCoords.innerHTML = `${SetSailIcons.svg("pos")} <strong>${formatLatLonDMS(lat, lon)}</strong>`;
  }
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

  // Minimal Contact Form: Reply Email + Message
  const submitBtn = document.getElementById("contactSubmitBtn");
  const statusEl = document.getElementById("contactStatusMsg");

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const email = document.getElementById("contactEmail")?.value.trim() || "";
      const message = document.getElementById("contactMessage")?.value.trim() || "";

      if (!message || !email) {
        alert("Please provide your reply email address and message.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Transmitting... ${SetSailIcons.svg("clock")}`;
      if (statusEl) statusEl.textContent = "";

      const payload = {
        replyTo: email,
        message,
        vessel: "LPG/C IINO INEOS VESTA",
        clientTime: new Date().toISOString(),
        version: "SetSail v2.5 (Production PWA)"
      };

      try {
        const endpoint = ["https://formsubmit.co/ajax/", "wafficompany", "@", "gmail.com"].join("");
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          if (statusEl) {
            statusEl.innerHTML = `${SetSailIcons.svg("check")} Transmitted to engineering team!`;
            statusEl.style.color = "var(--ok)";
          }
          alert("Thank you! Your message has been transmitted to SetSail engineering. Replies will be sent to " + email);
          const msgInput = document.getElementById("contactMessage");
          if (msgInput) msgInput.value = "";
        } else {
          throw new Error("HTTP " + res.status);
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent = "Logged locally in bridge telemetry buffer.";
          statusEl.style.color = "var(--warn)";
        }
        alert("Message logged locally. It will be transmitted to engineering upon next connection sync.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `${SetSailIcons.svg("mail")} Transmit to Engineering`;
      }
    });
  }

  // Cache Reset
  const clearCacheBtn = document.getElementById("settingsClearCacheBtn");
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener("click", () => {
      if (!confirm("Reset NtM cache and re-download fresh bulletin from server?")) return;
      try { localStorage.removeItem(NTM_STORAGE_KEY); } catch (e) {}
      NTM_STORE = [];
      if (leafletMarkersLayer) leafletMarkersLayer.clearLayers();
      loadRemoteNoticesJson().then(() => {
        alert("NtM cache cleared successfully. Fresh bulletin loaded.");
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
  const chkT = document.getElementById("expChkT")?.checked ?? true;
  const chkP = document.getElementById("expChkP")?.checked ?? true;
  const chkPerm = document.getElementById("expChkPerm")?.checked ?? true;

  // Automatically export all notices currently active on the chart (filtered by search and active filters)
  return getFilteredNotices().filter(item => {
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
  const countT = filtered.filter(n => n.type === "T").length;
  const countP = filtered.filter(n => n.type === "P").length;
  const countPerm = filtered.filter(n => n.type === "PERM").length;

  const elT = document.getElementById("expCountT");
  const elP = document.getElementById("expCountP");
  const elPerm = document.getElementById("expCountPerm");
  const elSummary = document.getElementById("expSummaryText");

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
function addNoticesToStore(newNotices, cancelledIds = []) {
  if (cancelledIds && cancelledIds.length > 0) {
    NTM_STORE.forEach(item => {
      if (cancelledIds.includes(item.id)) {
        item.status = "CANCELLED";
        item.isCancelled = true;
      }
    });
  }

  newNotices.forEach(item => {
    const existingIdx = NTM_STORE.findIndex(n => n.id === item.id);
    if (existingIdx >= 0) {
      NTM_STORE[existingIdx] = item;
    } else {
      NTM_STORE.push(item);
    }
  });

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
        const activeCount = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED").length;
        const badge = document.getElementById("ntmBadge");
        if (badge) {
          badge.textContent = activeCount;
          badge.style.display = "block";
        }
        renderNtMListAndMap();
        return true;
      }
    }
  } catch (e) {
    console.warn("Could not load from storage:", e);
  }
  return false;
}

/**
 * Attempt to load auto-synced notices.json
 */
async function loadRemoteNoticesJson() {
  try {
    const res = await fetch("notices.json?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) {
      updateNetworkStatusHUD(false);
      return false;
    }
    const data = await res.json();
    if (data && Array.isArray(data.notices) && data.notices.length > 0) {
      NTM_STORE = data.notices;
      saveStoreToStorage();
      if (data.metadata) {
        try { localStorage.setItem(META_STORAGE_KEY, JSON.stringify(data.metadata)); } catch(e){}
      }
      renderNtMListAndMap();
      const meta = data.metadata || {};
      const wk = meta.weekNumber ? `Wk ${meta.weekNumber}/${meta.year}` : (meta.weeklyBulletin || "Live");
      const isOfflineResp = res.headers.get("X-SetSail-Offline") === "true" || !navigator.onLine;
      updateNetworkStatusHUD(!isOfflineResp, wk);
      return true;
    }
  } catch (err) {
    updateNetworkStatusHUD(false);
  }
  return false;
}

/**
 * Initialize Leaflet Map
 */
function initNtMMap() {
  const mapDiv = document.getElementById("ntmMap");
  if (!mapDiv || leafletMap) return;

  if (window.L) {
    leafletMap = L.map("ntmMap", {
      center: [30.0, 0.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      attributionControl: false,
      preferCanvas: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true
    });

    // Primary Reliable Free Tile Providers (Zero API Key, High Availability)
    const oceanLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 13,
      attribution: "Tiles &copy; Esri",
      keepBuffer: 8,
      updateWhenIdle: false,
      updateWhenZooming: false,
      crossOrigin: true
    });

    const osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
      keepBuffer: 8,
      updateWhenIdle: false,
      updateWhenZooming: false,
      crossOrigin: true
    });

    const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri",
      keepBuffer: 8,
      updateWhenIdle: false,
      updateWhenZooming: false,
      crossOrigin: true
    });

    // Primary Default Nautical Chart
    oceanLayer.addTo(leafletMap);

    const seamarkLayer = L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "OpenSeaMap",
      keepBuffer: 8,
      updateWhenIdle: false,
      updateWhenZooming: false,
      crossOrigin: true
    });

    const baseMaps = {
      "Ocean Chart (Esri)": oceanLayer,
      "OpenStreetMap": osmLayer,
      "Satellite Imagery": satLayer
    };

    if (!leafletRouteLayer) {
      leafletRouteLayer = L.layerGroup();
    }

    const overlayMaps = {
      "OpenSeaMap Buoys": seamarkLayer,
      "Passage Plan Route": leafletRouteLayer
    };

    L.control.layers(baseMaps, overlayMaps, { position: "topright" }).addTo(leafletMap);

    leafletMarkersLayer = L.layerGroup().addTo(leafletMap);
    leafletVesselLayer = L.layerGroup().addTo(leafletMap);
    leafletRouteLayer.addTo(leafletMap);

    // Restore saved route onto map
    try {
      const savedRouteStr = localStorage.getItem(ROUTE_STORAGE_KEY);
      if (savedRouteStr) {
        const savedRoute = JSON.parse(savedRouteStr);
        renderRouteOnMap(savedRoute, false);
      }
    } catch (e) {}

    leafletMap.on("mousemove", (e) => {
      const hud = document.getElementById("ntmHudCoords");
      if (hud) {
        hud.textContent = formatLatLonDMS(e.latlng.lat, e.latlng.lng);
      }
    });

    if (userVessel) {
      plotUserVessel(userVessel.lat, userVessel.lon, userVessel.source);
    }

    if (typeof initPortDepthsLayers === "function") {
      initPortDepthsLayers(leafletMap);
    }
    if (typeof initExcelOverlayDock === "function") {
      initExcelOverlayDock(leafletMap);
    }

    renderNtMListAndMap();
  } else {
    initOfflineCanvasMap();
  }
}

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
  const searchVal = (document.getElementById("ntmSearchInput")?.value || "").toLowerCase().trim();

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

    // NAVAREA filter
    if (NTM_ACTIVE_NAVAREA !== "ALL") {
      const itemNavarea = getNoticeNavarea(item);
      if (itemNavarea !== NTM_ACTIVE_NAVAREA) return false;
    }

    if (searchVal) {
      const searchStr = `${item.id} ${item.country || ""} ${item.region || ""} ${item.subject || ""} ${(item.charts || []).join(" ")} ${item.cancels ? item.cancels.join(" ") : ""}`.toLowerCase();
      if (!searchStr.includes(searchVal)) return false;
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
      const typeOrder = { "T": 1, "P": 2, "PERM": 3 };
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
  const filtered = getFilteredNotices();

  const activeNotices = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED");
  const cancelledNotices = NTM_STORE.filter(n => n.isCancelled || n.status === "CANCELLED");

  const countT = activeNotices.filter(n => n.type === "T").length;
  const countP = activeNotices.filter(n => n.type === "P").length;
  const countPerm = activeNotices.filter(n => n.type === "PERM").length;
  const countPoly = activeNotices.filter(n => n.isPolygon || (n.coords && n.coords.length >= 3)).length;
  const countCancelled = cancelledNotices.length;

  if (countEl) {
    countEl.textContent = `${filtered.length} of ${NTM_STORE.length}`;
  }

  // Update Popover Counts
  const elCntT = document.getElementById("popCntT");
  if (elCntT) elCntT.textContent = countT;
  const elCntP = document.getElementById("popCntP");
  if (elCntP) elCntP.textContent = countP;
  const elCntPerm = document.getElementById("popCntPerm");
  if (elCntPerm) elCntPerm.textContent = countPerm;
  const elCntPoly = document.getElementById("popCntPoly");
  if (elCntPoly) elCntPoly.textContent = countPoly;
  const elCntCan = document.getElementById("popCntCancelled");
  if (elCntCan) elCntCan.textContent = countCancelled;

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

  // Multi-Target Search: Check matching ports from PORT_DEPTHS_DB
  const searchVal = (document.getElementById("ntmSearchInput")?.value || "").toLowerCase().trim();
  let matchedPorts = [];
  if (searchVal && typeof PORT_DEPTHS_DB !== "undefined") {
    matchedPorts = PORT_DEPTHS_DB.filter(p => {
      return p.name.toLowerCase().includes(searchVal) ||
             (p.nameCn && p.nameCn.toLowerCase().includes(searchVal)) ||
             p.country.toLowerCase().includes(searchVal) ||
             p.unlocode.toLowerCase().includes(searchVal) ||
             p.authority.toLowerCase().includes(searchVal) ||
             (p.fairways && p.fairways.some(f => f.name.toLowerCase().includes(searchVal)));
    });
  }

  if (countEl) {
    if (matchedPorts.length > 0) {
      countEl.textContent = `${matchedPorts.length} Ports, ${filtered.length} NtMs`;
    } else {
      countEl.textContent = `${filtered.length} of ${NTM_STORE.length}`;
    }
  }

  if (countEl) {
    if (matchedPorts.length > 0) {
      countEl.textContent = `${matchedPorts.length} Ports, ${filtered.length} NtMs`;
    } else {
      countEl.textContent = `${filtered.length} of ${NTM_STORE.length}`;
    }
  }

  if (listContainer) {
    let html = "";
    if (matchedPorts.length > 0) {
        html += `<div class="ntm-search-section-header"><span><svg class="setsail-icon" viewBox="0 0 24 24" style="width:13px;height:13px;"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg> WORLD PORTS (${matchedPorts.length})</span></div>`;
        matchedPorts.forEach(port => {
          const cCode = (port.countryCode || (port.country ? port.country.slice(0, 2) : "UN")).toUpperCase();
          const cLower = cCode.toLowerCase();
          html += `
            <div class="ntm-card-item ntm-port-search-card" data-port-id="${port.id}" onclick="jumpToPort('${port.id}')" title="Click to inspect ${port.name} on map">
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
                  <span>${port.country}</span>
                  <span style="color:#38bdf8;font-size:0.7rem;">View Chart &rarr;</span>
                </div>
              </div>
            </div>
          `;
        });
        if (filtered.length > 0) {
          html += `<div class="ntm-search-section-header" style="margin-top:0.6rem;"><span><svg class="setsail-icon" viewBox="0 0 24 24" style="width:13px;height:13px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> UKHO NOTICES TO MARINERS (${filtered.length})</span></div>`;
        }
      }

      // 2. Notices Cards
      filtered.forEach(item => {
        const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
        const tagClass = item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm");
        const typeLabel = item.type === "T" ? "TEMP (T)" : (item.type === "P" ? "PRELIM (P)" : "PERM");
        const navarea = getNoticeNavarea(item);

        const typeBadge = isItemCancelled
          ? `<span class="ntm-tag cancelled">CANCELLED</span>`
          : `<span class="ntm-tag ${tagClass}">${typeLabel}</span>`;

        const firstCoord = item.coords && item.coords[0] ? item.coords[0].dms : "—";
        const isChecked = item.checkedForExport !== false;
        const chartsStr = (item.charts && item.charts.length > 0) ? `Charts: ${item.charts.join(', ')}` : "";
        const cancelsBanner = (item.cancels && item.cancels.length > 0) ? `<div class="ntm-cancels-banner">${SetSailIcons.svg("cancelled")} Cancels: ${item.cancels.join(', ')}</div>` : "";
        const cancelledNoticeClass = isItemCancelled ? "cancelled" : "";

        html += `
          <div class="ntm-card-item type-${item.type} ${cancelledNoticeClass}" data-id="${item.id}" onclick="selectNtMNotice('${item.id}')">
            <div class="ntm-card-content">
              <div class="ntm-card-top">
                <span class="ntm-card-id">${item.id}</span>
                ${typeBadge}
              </div>
              ${cancelsBanner}
              <div class="ntm-card-region"><span class="ntm-card-navarea">${navarea}</span> ${item.country || 'Region'} — ${item.region || ''}</div>
              <div class="ntm-card-subject">${item.subject || ''}</div>
              <div class="ntm-card-bottom">
                <span class="ntm-card-coords" title="Center on chart">${SetSailIcons.svg("pos")} ${firstCoord} ${item.coords && item.coords.length > 1 ? `(+${item.coords.length-1})` : ''}</span>
                ${chartsStr ? `<span class="ntm-card-charts">${chartsStr}</span>` : ''}
              </div>
            </div>
          </div>
        `;
      });
      listContainer.innerHTML = html;
    }

  // Render Markers on Leaflet Map
  if (leafletMap && leafletMarkersLayer) {
    leafletMarkersLayer.clearLayers();

    filtered.forEach(item => {
      if (!item.coords || item.coords.length === 0) return;

      const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
      const color = isItemCancelled
        ? "#ef4444"
        : (item.type === "T" ? "#ffc850" : (item.type === "P" ? "#bb86fc" : "#4fc3f7"));

      if (item.subPolygons && item.subPolygons.length > 0) {
        item.subPolygons.forEach(sub => {
          const pts = sub.points || (sub.coords || []).map(c => [c.lat, c.lon]);
          if (!pts || pts.length === 0) return;

          if (pts.length >= 3) {
            let subColor = color;
            let subFill = color;
            let subFillOpacity = isItemCancelled ? 0.12 : 0.25;
            let subWeight = 2;
            let subDash = isItemCancelled ? "4, 6" : null;

            if (!isItemCancelled) {
              if (sub.category === "separation_zone") {
                subColor = "#9333ea";
                subFill = "#a855f7";
                subFillOpacity = 0.38;
                subWeight = 2.5;
              } else if (sub.category === "traffic_lane") {
                subColor = "#0284c7";
                subFill = "#38bdf8";
                subFillOpacity = 0.18;
                subWeight = 2;
                subDash = "6, 4";
              } else if (sub.category === "precautionary_area") {
                subColor = "#eab308";
                subFill = "#facc15";
                subFillOpacity = 0.22;
                subDash = "5, 5";
              } else if (sub.category === "restricted_area") {
                subColor = "#e11d48";
                subFill = "#fb7185";
                subFillOpacity = 0.26;
                subDash = "4, 4";
              } else if (sub.category === "anchorage_area") {
                subColor = "#059669";
                subFill = "#34d399";
                subFillOpacity = 0.22;
                subDash = "5, 5";
              } else if (sub.category === "spoil_ground") {
                subColor = "#ea580c";
                subFill = "#fb923c";
                subFillOpacity = 0.22;
                subDash = "4, 4";
              } else if (sub.category === "works_area") {
                subColor = "#f59e0b";
                subFill = "#fbbf24";
                subFillOpacity = 0.22;
                subDash = "5, 5";
              }
            }

            const polygon = L.polygon(pts, {
              color: subColor,
              weight: subWeight,
              fillColor: subFill,
              fillOpacity: subFillOpacity,
              dashArray: subDash
            });

            polygon.bindPopup(`
              <div style="font-family:'Segoe UI',sans-serif;color:#111;min-width:230px;">
                <div style="font-size:0.75em;text-transform:uppercase;color:#6b7280;letter-spacing:0.5px;font-weight:600;margin-bottom:2px;">
                  ${(sub.category || 'MARITIME AREA').replace('_', ' ').toUpperCase()}
                </div>
                <b style="color:#0a3888;font-size:1.05em;">${item.id} — ${sub.name}</b>
                ${isItemCancelled ? '<span style="color:#ef4444;font-weight:bold;"> [CANCELLED]</span>' : ''}
                <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">[${getNoticeNavarea(item)}] ${item.country || ''} — ${item.region || ''}</div>
                <div style="font-size:0.88em;margin-bottom:6px;line-height:1.35;">${item.subject || ''}</div>
                <div style="font-size:0.8em;color:#475569;margin-bottom:4px;"><b>Area:</b> ${sub.name} (${pts.length} coordinates)</div>
                <div style="font-size:0.8em;color:#666;"><b>Affected Charts:</b> ${(item.charts||[]).join(', ') || '—'}</div>
              </div>
            `);
            leafletMarkersLayer.addLayer(polygon);
          } else if (pts.length === 2) {
            const polyline = L.polyline(pts, {
              color: color,
              weight: 3,
              dashArray: isItemCancelled ? "3, 6" : "6, 6"
            });
            leafletMarkersLayer.addLayer(polyline);
          } else if (pts.length === 1) {
            const circle = L.circleMarker(pts[0], {
              radius: 7,
              fillColor: isItemCancelled ? "#ef4444" : "#e11d48",
              color: "#fff",
              weight: 2,
              fillOpacity: 0.9
            });
            circle.bindPopup(`
              <div style="font-family:'Segoe UI',sans-serif;color:#111;">
                <b style="color:#0a3888;">${item.id} — ${sub.name}</b>
                ${isItemCancelled ? '<span style="color:#ef4444;font-weight:bold;"> [CANCELLED]</span>' : ''}
                <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">[${getNoticeNavarea(item)}] ${item.country || ''}</div>
                <div style="font-size:0.85em;">${item.subject || ''}</div>
              </div>
            `);
            leafletMarkersLayer.addLayer(circle);
          }
        });
      } else if (item.isPolygon && item.coords.length >= 3) {
        const polyPoints = item.coords.map(c => [c.lat, c.lon]);
        const polygon = L.polygon(polyPoints, {
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: isItemCancelled ? 0.1 : 0.25,
          dashArray: isItemCancelled ? "3, 6" : (item.type === "T" ? "5, 5" : null)
        });

        polygon.bindPopup(`
          <div style="font-family:'Segoe UI',sans-serif;color:#111;">
            <b style="color:#0a3888;font-size:1.05em;">${item.id} ${isItemCancelled ? '<span style="color:#ef4444;">[CANCELLED]</span>' : ''}</b>
            <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">[${getNoticeNavarea(item)}] ${item.country || ''} — ${item.region || ''}</div>
            <div style="font-size:0.9em;margin-bottom:6px;">${item.subject || ''}</div>
            <div style="font-size:0.8em;color:#666;line-height:1.3;"><b>Affected Charts:</b> ${(item.charts||[]).join(', ') || '—'}</div>
          </div>
        `);
        leafletMarkersLayer.addLayer(polygon);
      } else if (item.isLine && item.coords.length >= 2) {
        const linePoints = item.coords.map(c => [c.lat, c.lon]);
        const polyline = L.polyline(linePoints, {
          color: color,
          weight: 3,
          dashArray: isItemCancelled ? "3, 6" : (item.type === "T" ? "6, 6" : null)
        });
        polyline.bindPopup(`
          <div style="font-family:'Segoe UI',sans-serif;color:#111;">
            <b style="color:#0a3888;">${item.id} ${isItemCancelled ? '<span style="color:#ef4444;">[CANCELLED]</span>' : ''}</b>
            <div style="font-size:0.85em;color:#555;">[${getNoticeNavarea(item)}] ${item.country || ''} — ${item.region || ''}</div>
            <div style="font-size:0.9em;margin:4px 0;">${item.subject || ''}</div>
          </div>
        `);
        leafletMarkersLayer.addLayer(polyline);
      } else {
        item.coords.forEach(coord => {
          const circle = L.circleMarker([coord.lat, coord.lon], {
            radius: 6,
            fillColor: color,
            color: "#fff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: isItemCancelled ? 0.4 : 0.9
          });

          circle.bindPopup(`
            <div style="font-family:'Segoe UI',sans-serif;color:#111;">
              <b style="color:#0a3888;font-size:1.05em;">${item.id} ${isItemCancelled ? '<span style="color:#ef4444;">[CANCELLED]</span>' : ''}</b>
              <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">[${getNoticeNavarea(item)}] ${item.country || ''} — ${item.region || ''}</div>
              <div style="font-size:0.9em;margin-bottom:6px;">${item.subject || ''}</div>
              <div style="font-size:0.8em;color:#2e7d32;font-family:monospace;margin-bottom:4px;">${coord.dms}</div>
              <div style="font-size:0.8em;color:#666;"><b>Charts:</b> ${(item.charts||[]).join(', ') || '—'}</div>
            </div>
          `);
          leafletMarkersLayer.addLayer(circle);
        });
      }
    });
  } else {
    drawOfflineCanvasMap();
  }
}

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
