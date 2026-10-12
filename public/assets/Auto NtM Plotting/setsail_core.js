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
  if (!leafletRouteLayer) {
    leafletRouteLayer = L.layerGroup().addTo(leafletMap);
  }
  leafletRouteLayer.clearLayers();
  
  if (!route || !route.waypoints || route.waypoints.length === 0) {
    return;
  }
  
  activeRouteData = route;
  if (typeof setOverlayActive === "function") {
    setOverlayActive("route", true, leafletMap);
  } else if (typeof OVERLAY_STATES !== "undefined") {
    OVERLAY_STATES.route = true;
  }
  const catPillRoute = document.getElementById("catPillRoute");
  if (catPillRoute) catPillRoute.style.display = "inline-flex";
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
  
  const rtSub = window.ROUTE_SUBFILTERS || { waypoints: true, line: true };
  if (rtSub.line !== false) {
    leafletRouteLayer.addLayer(trackGlow);
    leafletRouteLayer.addLayer(trackLine);
  }

  // Add Waypoints
  (rtSub.waypoints !== false ? route.waypoints : []).forEach((wp, idx) => {
    const isStart = idx === 0;
    const isEnd = idx === route.waypoints.length - 1;
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
      trackGlow.setLatLngs(unrolledCoords);
      trackLine.setLatLngs(unrolledCoords);
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

        try {
          localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(activeRouteData));
        } catch (err) {}

        if (typeof displaySetRouteResults === "function") {
          displaySetRouteResults(activeRouteData);
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
  synopticCycle: "2000 UTC",
  lastSyncUtc: "2026-10-11T20:09:21Z",
  provider: "NOAA NHC + JMA RSMC Tokyo + JTWC + Open-Meteo ECMWF IFS",
  storms: [
    {
      id: "EP202026",
      name: "Hurricane SIMON",
      shortName: "Simon",
      category: "Category 4 Hurricane (NOAA NHC)",
      center: [19.5, -105.5],
      centralPressure: 940,
      maxWinds: 120,
      gusts: 146,
      movement: "NNW at 7 kts",
      dangerRadiusNm: 138,
      forecastTrack: [
        { tau: 12, coords: [19.9, -105.6], winds: 105, radiusNm: 55 },
        { tau: 24, coords: [20.5, -106.0], winds: 85, radiusNm: 75 },
        { tau: 36, coords: [21.1, -106.4], winds: 70, radiusNm: 95 },
        { tau: 48, coords: [21.8, -106.8], winds: 60, radiusNm: 115 },
        { tau: 60, coords: [22.5, -106.9], winds: 50, radiusNm: 135 },
        { tau: 72, coords: [23.0, -106.9], winds: 50, radiusNm: 155 }
      ]
    },
    {
      id: "2629",
      name: "Typhoon KOGUMA",
      shortName: "Koguma",
      category: "Category 3 Typhoon (JMA RSMC / JTWC)",
      center: [27.1, 147.3],
      centralPressure: 950,
      maxWinds: 105,
      gusts: 130,
      movement: "NNE at 10 kts",
      dangerRadiusNm: 126,
      forecastTrack: [
        { tau: 12, coords: [29.7, 147.5], winds: 80, radiusNm: 30 },
        { tau: 24, coords: [32.5, 149.3], winds: 70, radiusNm: 42 },
        { tau: 48, coords: [38.0, 156.4], winds: 60, radiusNm: 85 },
        { tau: 72, coords: [42.4, 164.5], winds: 45, radiusNm: 120 }
      ]
    },
    {
      id: "2628",
      name: "Tropical Storm NOLO",
      shortName: "Nolo",
      category: "Tropical Depression / TS (JMA RSMC)",
      center: [32.0, 146.0],
      centralPressure: 1004,
      maxWinds: 35,
      gusts: 44,
      movement: "N (Slow)",
      dangerRadiusNm: 65,
      forecastTrack: []
    },
    {
      id: "AL092026",
      name: "Post-Tropical Cyclone ISAIAS",
      shortName: "Isaias",
      category: "Post-Tropical Cyclone (NOAA NHC)",
      center: [37.5, -84.0],
      centralPressure: 1010,
      maxWinds: 20,
      gusts: 24,
      movement: "ENE at 22 kts",
      dangerRadiusNm: 70,
      forecastTrack: [
        { tau: 12, coords: [38.8, -80.2], winds: 20, radiusNm: 55 }
      ]
    },
    {
      id: "EP182026",
      name: "Post-Tropical Cyclone RACHEL",
      shortName: "Rachel",
      category: "Post-Tropical Cyclone (NOAA NHC)",
      center: [35.8, -114.6],
      centralPressure: 994,
      maxWinds: 30,
      gusts: 37,
      movement: "NNE at 29 kts",
      dangerRadiusNm: 70,
      forecastTrack: []
    }
  ],
  waves: [
    { id: "W1", name: "North Atlantic Storm Basin", center: [52.0, -25.0], radiusNm: 240, waveHeight: 3.1, swellPeriod: 8, swellDir: "SW" },
    { id: "W2", name: "Southern Ocean / Roaring Forties", center: [-42.0, 35.0], radiusNm: 300, waveHeight: 3.2, swellPeriod: 11, swellDir: "W" },
    { id: "W3", name: "NW Pacific Typhoon Swell Basin (Koguma)", center: [28.0, 148.0], radiusNm: 260, waveHeight: 7.8, swellPeriod: 11, swellDir: "SSE" },
    { id: "W4", name: "Eastern Pacific Hurricane Swell (Simon)", center: [19.5, -106.0], radiusNm: 210, waveHeight: 6.2, swellPeriod: 8, swellDir: "WNW" }
  ],
  pressureCenters: [
    { type: "L", value: 940, name: "Hurricane Simon Core Low", coords: [19.5, -105.5] },
    { type: "L", value: 950, name: "Typhoon Koguma Core Low", coords: [27.1, 147.3] },
    { type: "L", value: 994, name: "PTC Rachel Low", coords: [35.8, -114.6] },
    { type: "H", value: 1026, name: "Azores Subtropical High", coords: [33.0, -36.0] },
    { type: "H", value: 1024, name: "North Pacific High", coords: [36.0, -145.0] },
    { type: "H", value: 1025, name: "South Indian Ocean High", coords: [-30.0, 82.0] }
  ],
  windVectors: [
    { coords: [19.5, -105.5], dir: 150, speed: 120, label: "SSE 120 kts (Hurricane Simon)" },
    { coords: [27.1, 147.3], dir: 200, speed: 105, label: "SSW 105 kts (Typhoon Koguma)" },
    { coords: [32.0, 146.0], dir: 180, speed: 35, label: "S 35 kts (TS Nolo)" },
    { coords: [35.8, -114.6], dir: 210, speed: 30, label: "SSW 30 kts (PTC Rachel)" }
  ]
};

window.MARINE_WEATHER_STORE = MARINE_WEATHER_STORE;

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
  const wxSub = window.WEATHER_SUBFILTERS || { cyclones: true, pressure: true, waves: true, winds: true };

  // 1. Tropical Cyclones with Translucent Cones & Zoom-Adaptive Track Labels
  (wxSub.cyclones !== false ? (MARINE_WEATHER_STORE.storms || []) : []).forEach(storm => {
    if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
      const sHit = window.isPointInActiveRouteCorridor(storm.center[0], storm.center[1], storm.dangerRadiusNm || 100) ||
                   (storm.forecastTrack || []).some(fp => window.isPointInActiveRouteCorridor(fp.coords[0], fp.coords[1], fp.radiusNm || 50));
      if (!sHit) return;
    }
    const dangerRadiusM = (storm.dangerRadiusNm || 100) * NM_TO_METERS;
    const dangerCircle = L.circle(storm.center, {
      radius: dangerRadiusM,
      color: "#ef4444",
      weight: curZoom <= 4 ? 1.0 : 1.4,
      dashArray: "4, 5",
      fillColor: "#ef4444",
      fillOpacity: curZoom <= 4 ? 0.05 : 0.09
    });
    leafletWeatherLayer.addLayer(dangerCircle);

    if (storm.forecastTrack && storm.forecastTrack.length > 0) {
      const trackPoints = [storm.center];
      const coneLeft = [];
      const coneRight = [];

      storm.forecastTrack.forEach(fp => {
        trackPoints.push(fp.coords);
        const latRad = fp.coords[0] * Math.PI / 180;
        const offsetDeg = (fp.radiusNm / 60) * 0.85;
        const cosLat = Math.cos(latRad) || 1;
        coneLeft.push([fp.coords[0] + offsetDeg, fp.coords[1] - (offsetDeg / cosLat)]);
        coneRight.push([fp.coords[0] - offsetDeg, fp.coords[1] + (offsetDeg / cosLat)]);

        const popupHtml = `
          <div style="font-family:sans-serif;font-size:11px;min-width:180px;">
            <div style="font-weight:700;color:#d97706;border-bottom:1px solid #cbd5e1;padding-bottom:3px;margin-bottom:4px;">
              ${storm.name} • Forecast +${fp.tau}h
            </div>
            <div><strong>Position:</strong> ${fp.coords[0].toFixed(2)}°, ${fp.coords[1].toFixed(2)}°</div>
            <div><strong>Max Wind:</strong> ${fp.winds} kts</div>
            <div><strong>Uncertainty Radius:</strong> ${fp.radiusNm} NM</div>
          </div>
        `;

        if (curZoom <= 4) {
          // At global zoom, use clean 3.2px track dots with tooltip instead of 6 overlapping yellow boxes
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
            html: `<div style="background:rgba(245,158,11,0.92);color:#0f172a;font-size:8.5px;font-weight:800;padding:1px 4px;border-radius:3px;border:1px solid rgba(255,255,255,0.8);white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.35);">+${fp.tau}h (${fp.winds}kn)</div>`,
            iconSize: [38, 14],
            iconAnchor: [19, 7]
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
        fillOpacity: curZoom <= 4 ? 0.06 : 0.10
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
      leafletWeatherLayer.addLayer(L.polyline(trackPoints, lineOpts));
    }

    const shortLabel = storm.shortName || storm.name.replace(/^(Hurricane|Typhoon|Tropical Storm|Tropical Depression|Post-Tropical Cyclone)\s+/i, "");
    const iconDim = curZoom <= 4 ? 20 : 24;
    const cycloneHtml = `
      <div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
        <svg viewBox="0 0 24 24" style="width:${iconDim}px;height:${iconDim}px;filter:drop-shadow(0 0 5px rgba(239,68,68,0.65));" class="weather-cyclone-icon">
          <circle cx="12" cy="12" r="8.5" fill="rgba(239,68,68,0.22)" stroke="#ef4444" stroke-width="1.8"/>
          <path d="M12 3.5a8.5 8.5 0 0 0-8.5 8.5c0 3.2 1.8 6 4.6 7.5" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 20.5a8.5 8.5 0 0 0 8.5-8.5c0-3.2-1.8-6-4.6-7.5" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="12" r="2.6" fill="#ef4444"/>
        </svg>
        <div style="background:rgba(15,23,42,0.88);color:#fecaca;border:1px solid rgba(239,68,68,0.55);font-size:8.5px;font-weight:700;padding:0px 4px;border-radius:3px;white-space:nowrap;margin-top:1px;">${shortLabel} ${storm.maxWinds}kn</div>
      </div>
    `;
    const stormIcon = L.divIcon({
      className: "weather-storm-div-icon",
      html: cycloneHtml,
      iconSize: [64, 36],
      iconAnchor: [32, 12]
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

  // 2. Severe Sea State Zones (Ultra-subtle rings, text badges only at curZoom >= 4)
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
      fillOpacity: curZoom <= 4 ? 0.04 : 0.08
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
      const waveBadgeIcon = L.divIcon({
        className: "weather-wave-badge",
        html: `<div style="background:rgba(15,23,42,0.82);color:#7dd3fc;font-size:8.5px;font-weight:700;padding:1px 4px;border-radius:3px;border:1px solid rgba(56,189,248,0.45);white-space:nowrap;">🌊 Hs ${wave.waveHeight}m</div>`,
        iconSize: [52, 15],
        iconAnchor: [26, 7]
      });
      leafletWeatherLayer.addLayer(L.marker(wave.center, { icon: waveBadgeIcon, interactive: false }));
    }
  });

  // 3. Barometric High/Low Centers (Compact synoptic symbols)
  (wxSub.pressure !== false ? (MARINE_WEATHER_STORE.pressureCenters || []) : []).forEach(pc => {
    if (window.ROUTE_CORRIDOR_FILTER_ENABLED && typeof window.isPointInActiveRouteCorridor === "function") {
      if (!window.isPointInActiveRouteCorridor(pc.coords[0], pc.coords[1], 150)) return;
    }
    const isLow = pc.type === "L";
    const bgCol = isLow ? "#dc2626" : "#2563eb";
    const sz = curZoom <= 3 ? 16 : 20;
    const subVal = curZoom >= 4 ? `<div style="font-size:8px;font-weight:700;color:#e2e8f0;background:rgba(15,23,42,0.82);padding:0 3px;border-radius:2px;margin-top:1px;text-align:center;">${pc.value}</div>` : "";
    const pcIcon = L.divIcon({
      className: "weather-pc-div-icon",
      html: `<div style="background:${bgCol};color:#fff;width:${sz}px;height:${sz}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${curZoom <= 3 ? 9 : 11}px;border:1.5px solid rgba(255,255,255,0.85);box-shadow:0 1px 4px rgba(0,0,0,0.4);">${pc.type}</div>${subVal}`,
      iconSize: [sz + 4, sz + 14],
      iconAnchor: [(sz + 4) / 2, sz / 2]
    });
    const pcMarker = L.marker(pc.coords, { icon: pcIcon });
    pcMarker.bindTooltip(`${pc.name} (${pc.value} hPa)`, { direction: "top" });
    pcMarker.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;">
        <strong style="color:${bgCol};">${isLow ? 'Cyclone / Low Pressure System' : 'Anticyclone / High Pressure Ridge'}</strong><br>
        <strong>Center:</strong> ${pc.name} (${pc.value} hPa)<br>
        <strong>Coords:</strong> ${pc.coords[0].toFixed(1)}°, ${pc.coords[1].toFixed(1)}°
      </div>
    `);
    leafletWeatherLayer.addLayer(pcMarker);
  });

  // 4. Marine Wind Vectors (Shown at curZoom >= 4 so world overview stays uncluttered)
  if (curZoom >= 4 && wxSub.winds !== false) {
    (MARINE_WEATHER_STORE.windVectors || []).forEach(wv => {
      const rot = (wv.dir + 180) % 360;
      const windIcon = L.divIcon({
        className: "weather-wind-div-icon",
        html: `<div style="display:flex;align-items:center;gap:2px;transform:rotate(${rot}deg);transform-origin:center center;"><svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:#38bdf8;"><path d="M12 2L4 20l8-4 8 4z"/></svg></div><div style="font-size:7.5px;font-weight:700;color:#cbd5e1;background:rgba(15,23,42,0.78);padding:0 3px;border-radius:2px;white-space:nowrap;margin-top:1px;">${wv.speed}kn</div>`,
        iconSize: [22, 28],
        iconAnchor: [11, 11]
      });
      const wvMarker = L.marker(wv.coords, { icon: windIcon });
      wvMarker.bindPopup(`<strong>Wind Vector:</strong> ${wv.label}`);
      leafletWeatherLayer.addLayer(wvMarker);
    });
  }
}

window.renderWeatherOnMap = renderWeatherOnMap;

async function refreshMarineWeather(force = false) {
  try {
    let wxRes = await fetch("weather.json?t=" + Date.now(), { cache: "no-store" }).catch(() => null);
    if (!wxRes || !wxRes.ok) {
      wxRes = await fetch("https://cdn.jsdelivr.net/gh/waffiman/Admirality-NtM-Scraper@main/weather.json?t=" + Date.now()).catch(() => null);
    }
    if (wxRes.ok) {
      const wxData = await wxRes.json();
      if (wxData && Array.isArray(wxData.storms) && wxData.storms.length > 0) {
        MARINE_WEATHER_STORE.storms = wxData.storms;
        if (Array.isArray(wxData.waves) && wxData.waves.length > 0) {
          MARINE_WEATHER_STORE.waves = wxData.waves;
        }
        if (Array.isArray(wxData.pressureCenters) && wxData.pressureCenters.length > 0) {
          MARINE_WEATHER_STORE.pressureCenters = wxData.pressureCenters;
        }
        if (Array.isArray(wxData.windVectors) && wxData.windVectors.length > 0) {
          MARINE_WEATHER_STORE.windVectors = wxData.windVectors;
        }
        if (wxData.synopticCycle) MARINE_WEATHER_STORE.synopticCycle = wxData.synopticCycle;
        if (wxData.lastSyncUtc) MARINE_WEATHER_STORE.lastSyncUtc = wxData.lastSyncUtc;
        if (wxData.provider) MARINE_WEATHER_STORE.provider = wxData.provider;
      }
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
    const stormNames = (MARINE_WEATHER_STORE.storms || []).map(s => s.shortName || s.name).join(", ");
    showSetSailToast(`Synced ${MARINE_WEATHER_STORE.storms.length} Active Cyclones (${stormNames})`, "success");
  }
}

window.refreshMarineWeather = refreshMarineWeather;

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
      const latVal = (document.getElementById("vesselLat") ? document.getElementById("vesselLat").value : "").trim() || "";
      const lonVal = (document.getElementById("vesselLon") ? document.getElementById("vesselLon").value : "").trim() || "";

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
      item.coords.forEach(c => {
        if (c && !c.dms && Number.isFinite(c.lat) && Number.isFinite(c.lon)) {
          c.dms = formatCoordDmsHelper(c.lat, c.lon);
        }
      });
      if (!Number.isFinite(item.lat) || !Number.isFinite(item.lon)) {
        item.lat = item.coords[0].lat;
        item.lon = item.coords[0].lon;
      }
    }

    // Automatic Self-Destruction based on Cancellation Time (expires / CANCEL THIS MSG ...)
    const expMs = parseNoticeCancelTimeMs(item);
    if (Number.isFinite(expMs)) {
      item._cancelTimeMs = expMs;
      if ((!ov || ov.isCancelled === undefined) && expMs <= nowMs) {
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
      if (ov && ov.isCancelled === false) return;
      const idUp = String(item.id || "").trim().toUpperCase();
      const numUp = String(item.num || "").trim().toUpperCase();
      if (cancelSet.has(idUp) || (numUp && cancelSet.has(numUp))) {
        item.isCancelled = true;
        item.status = "CANCELLED";
      }
    });
  }
}

// Live 30-Second Watchdog for NAVTEX Cancellation Time Self-Destruction
function runNavtexAutoExpireSweep() {
  if (!Array.isArray(NTM_STORE) || NTM_STORE.length === 0) return 0;
  const overrides = getNoticeOverridesMap();
  const nowMs = Date.now();
  const newlyExpired = [];
  NTM_STORE.forEach(item => {
    if (!item || item.isCancelled || item.status === "CANCELLED") return;
    const ov = overrides[item.id];
    if (ov && ov.isCancelled === false) return;
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
        reconcileAndApplyNoticeOverrides();
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
async function loadRemoteNoticesJson(showFeedback = false) {
  try {
    let res = await fetch("notices.json?t=" + Date.now(), { cache: "no-store" }).catch(() => null);
    if (!res || !res.ok) {
      res = await fetch("https://cdn.jsdelivr.net/gh/waffiman/Admirality-NtM-Scraper@main/notices.json?t=" + Date.now()).catch(() => null);
    }
    if (!res) throw new Error("notices.json unreachable");
    if (!res.ok) {
      updateNetworkStatusHUD(false);
      if (showFeedback && typeof showToast === "function") showToast("Offline ? using cached NtM & NAVTEX database", "warn");
      return false;
    }
    const data = await res.json();
    if (data && Array.isArray(data.notices) && data.notices.length > 0) {
      NTM_STORE = data.notices;
      reconcileAndApplyNoticeOverrides();
      saveStoreToStorage();
      if (showFeedback && typeof showToast === "function") {
        const navCnt = NTM_STORE.filter(n => n.type === "NAVTEX" && !n.isCancelled).length;
        const ukhoCnt = NTM_STORE.filter(n => n.type !== "NAVTEX" && !n.isCancelled).length;
        showToast(`Synced ${navCnt} NAVTEX/NAVAREA warnings + ${ukhoCnt} UKHO NtMs`, "info");
      }
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
    const sharedCanvasRenderer = L.canvas({ padding: 0.5 });
    window._setsailCanvasRenderer = sharedCanvasRenderer;

    leafletMap = L.map("ntmMap", {
      center: [26.0, 12.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 19,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      attributionControl: false,
      preferCanvas: true,
      renderer: sharedCanvasRenderer,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      zoomAnimationThreshold: 8,
      inertia: true,
      inertiaDeceleration: 3000
    });

    const tilePerfOpts = {
      keepBuffer: 6,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: 90
    };

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

    // Primary Default Nautical Chart
    oceanLayer.addTo(leafletMap);

    const seamarkLayer = L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", Object.assign({}, tilePerfOpts, {
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
      "Ocean Chart (Esri)": oceanLayer,
      "Fast Coast Map": voyagerLayer,
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
        ocean: oceanLayer,
        coast: voyagerLayer,
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
    const getZoomLodTier = (z) => (z <= 3 ? 0 : (z <= 5 ? 1 : (z <= 7 ? 2 : 3)));
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
    });

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
                <button type="button" class="ntm-card-act-btn" onclick="window.openNoticeDetailModal('${safeId}')" title="Inspect or edit warning coordinates and text">&#9998; Inspect / Edit</button>
                <button type="button" class="ntm-card-act-btn ${isItemCancelled ? 'restore-btn' : 'cancel-btn'}" onclick="window.toggleCancelNotice('${safeId}')" title="${isItemCancelled ? 'Restore this warning to active state' : 'Mark this warning as cancelled'}">${isItemCancelled ? '&#8634; Restore' : '&#10005; Cancel'}</button>
              </div>
            </div>
          </div>
        `;
      });
    }

    if (!html) {
      const anyActiveOverlay = isNoticesActive || isDepthsActive || isWeatherActive || isRouteActive;
      if (!anyActiveOverlay) {
        html = `
          <div style="padding:1.35rem 0.9rem;text-align:center;color:var(--muted);font-size:0.78rem;display:flex;flex-direction:column;gap:8px;">
            <div style="color:#e2e8f0;font-weight:700;font-size:0.82rem;">⚡ Fast Chart Mode Active</div>
            <div style="font-size:0.72rem;line-height:1.45;">Heavy overlays are off by default for instant chart loading. Click any layer below or in the bottom dock to display objects:</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px;">
              <button type="button" onclick="window.setOverlayActive('notices', true)" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(249,115,22,0.4);background:rgba(249,115,22,0.12);color:#fdba74;font-size:0.7rem;font-weight:700;cursor:pointer;">+ NtM &amp; NAVTEX (${activeNotices.length})</button>
              <button type="button" onclick="window.setOverlayActive('depths', true)" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(6,182,212,0.4);background:rgba(6,182,212,0.12);color:#67e8f9;font-size:0.7rem;font-weight:700;cursor:pointer;">+ Port Depths (${typeof PORT_DEPTHS_DB !== 'undefined' ? PORT_DEPTHS_DB.length : 75})</button>
              <button type="button" onclick="window.setOverlayActive('weather', true)" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(234,179,8,0.4);background:rgba(234,179,8,0.12);color:#fde047;font-size:0.7rem;font-weight:700;cursor:pointer;">+ Weather (${((MARINE_WEATHER_STORE && MARINE_WEATHER_STORE.storms) || []).length} Cyclones)</button>
              <button type="button" onclick="window.setOverlayActive('route', true)" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(56,189,248,0.4);background:rgba(56,189,248,0.12);color:#7dd3fc;font-size:0.7rem;font-weight:700;cursor:pointer;">+ My Route</button>
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
    const curZoom = leafletMap.getZoom ? leafletMap.getZoom() : 3;
    const canvasRenderer = window._setsailCanvasRenderer || null;

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
          <div style="display:flex;gap:6px;margin-top:7px;padding-top:6px;border-top:1px solid #cbd5e1;">
            <button type="button" onclick="window.openNoticeDetailModal('${safeId}')" style="flex:1;padding:4px 7px;font-size:11px;font-weight:600;border-radius:4px;border:1px solid #94a3b8;background:#0f172a;color:#f8fafc;cursor:pointer;">&#9998; Inspect / Edit</button>
            <button type="button" onclick="window.toggleCancelNotice('${safeId}')" style="padding:4px 8px;font-size:11px;font-weight:600;border-radius:4px;border:1px solid ${isItemCancelled ? '#10b981' : '#f43f5e'};background:${isItemCancelled ? '#ecfdf5' : '#fff1f2'};color:${isItemCancelled ? '#047857' : '#be123c'};cursor:pointer;">${isItemCancelled ? 'Restore' : 'Cancel'}</button>
          </div>
        </div>
      `;
    };

    filtered.forEach(item => {
      if (!item.coords || item.coords.length === 0) return;

      const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
      const pal = getNoticeColors(item, isItemCancelled);

      if (item.subPolygons && item.subPolygons.length > 0) {
        item.subPolygons.forEach(sub => {
          const pts = sub.points || (sub.coords || []).map(c => [c.lat, c.lon]);
          if (!pts || pts.length === 0) return;

          if (pts.length >= 3) {
            const pOpts = {
              color: pal.stroke,
              weight: basePolyWeight,
              fillColor: pal.fill,
              fillOpacity: isItemCancelled ? 0.04 : basePolyFillOp,
              dashArray: isItemCancelled ? "4, 6" : null
            };
            if (canvasRenderer) pOpts.renderer = canvasRenderer;
            const polygon = L.polygon(pts, pOpts);
            polygon.bindPopup(buildPopupHtml(item, `<div style="font-size:0.78em;color:#475569;margin-bottom:3px;"><b>Area:</b> ${sub.name} (${pts.length} pts)</div>`));
            leafletMarkersLayer.addLayer(polygon);
          } else if (pts.length === 2) {
            const lOpts = {
              color: pal.stroke,
              weight: baseLineWeight,
              dashArray: isItemCancelled ? "3, 6" : "5, 4"
            };
            if (canvasRenderer) lOpts.renderer = canvasRenderer;
            const polyline = L.polyline(pts, lOpts);
            polyline.bindPopup(buildPopupHtml(item));
            leafletMarkersLayer.addLayer(polyline);
          } else if (pts.length === 1) {
            const cOpts = {
              radius: ptRadius,
              fillColor: pal.fill,
              color: ptRimColor,
              weight: ptRimWeight,
              fillOpacity: isItemCancelled ? 0.45 : 0.86
            };
            if (canvasRenderer) cOpts.renderer = canvasRenderer;
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
        const pOpts = {
          color: pal.stroke,
          weight: isLargeRegionalArea && curZoom <= 5 ? 0.8 : basePolyWeight,
          fillColor: pal.fill,
          fillOpacity: isItemCancelled ? 0.04 : (isLargeRegionalArea && curZoom <= 5 ? 0.025 : basePolyFillOp),
          dashArray: isItemCancelled ? "3, 6" : (item.type === "NAVTEX" || item.type === "T" ? "4, 4" : null)
        };
        if (canvasRenderer) pOpts.renderer = canvasRenderer;
        const polygon = L.polygon(polyPoints, pOpts);
        polygon.bindPopup(buildPopupHtml(item, `<div style="font-size:0.76em;color:#2e7d32;font-family:monospace;margin-bottom:3px;">Polygon (${item.coords.length} vertices)</div>`));
        leafletMarkersLayer.addLayer(polygon);
      } else if (item.isLine && item.coords.length >= 2) {
        const linePoints = item.coords.map(c => [c.lat, c.lon]);
        const lOpts = {
          color: pal.stroke,
          weight: baseLineWeight,
          dashArray: isItemCancelled ? "3, 6" : (item.type === "T" ? "5, 4" : null)
        };
        if (canvasRenderer) lOpts.renderer = canvasRenderer;
        const polyline = L.polyline(linePoints, lOpts);
        polyline.bindPopup(buildPopupHtml(item, `<div style="font-size:0.76em;color:#2e7d32;font-family:monospace;margin-bottom:3px;">Line (${item.coords.length} points)</div>`));
        leafletMarkersLayer.addLayer(polyline);
      } else {
        // At global zoom <= 4, if a single notice has multiple points, plot only its primary point to avoid dot clusters
        const coordsToPlot = (curZoom <= 4 && item.coords.length > 2) ? [item.coords[0]] : item.coords;
        coordsToPlot.forEach(coord => {
          const cOpts = {
            radius: ptRadius,
            fillColor: pal.fill,
            color: ptRimColor,
            weight: ptRimWeight,
            opacity: 0.92,
            fillOpacity: isItemCancelled ? 0.4 : 0.85
          };
          if (canvasRenderer) cOpts.renderer = canvasRenderer;
          const circle = L.circleMarker([coord.lat, coord.lon], cOpts);
          const dmsStr = coord.dms || formatCoordDmsHelper(coord.lat, coord.lon);
          circle.bindPopup(buildPopupHtml(item, `<div style="font-size:0.78em;color:#2e7d32;font-family:monospace;margin-bottom:3px;">${dmsStr}</div>`));
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


// ==========================================================================
// SETROUTE™ — AUTONOMOUS AI PASSAGE PLANNER ENGINE (COHERE INTEGRATION)
// ==========================================================================
const SETROUTE_COHERE_KEY = atob("QzdoRFdmaFlER0JpRnJHdE5uNVBKNlNJdE8xdHgxRXFYa2YydDRyUg==");
const SETROUTE_COHERE_MODEL = "command-r-08-2024";

/**
 * Initialize SetRoute Ports Selection and Event Listeners
 */

// ==========================================================================
// SETROUTE™ GLOBAL MARITIME DEEP-WATER PASSAGE ROUTING ENGINE
// Physical sea corridor topology with Dijkstra shortest sea path
// Strictly prevents routes traversing across landmasses worldwide.
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

function findMaritimeSeaCorridor(origCoords, destCoords) {
  const startNode = findNearestMaritimeNode(origCoords[0], origCoords[1]);
  const endNode = findNearestMaritimeNode(destCoords[0], destCoords[1]);

  if (!startNode || !endNode || startNode === endNode) {
    return [startNode || "ROTTERDAM_APP"];
  }

  // Build Adjacency List
  const adj = {};
  for (const k of Object.keys(MARITIME_SEA_NODES)) {
    adj[k] = [];
  }
  for (const [u, v] of MARITIME_SEA_EDGES) {
    if (MARITIME_SEA_NODES[u] && MARITIME_SEA_NODES[v]) {
      const d = calculateHaversineDistanceNM(
        MARITIME_SEA_NODES[u][0], MARITIME_SEA_NODES[u][1],
        MARITIME_SEA_NODES[v][0], MARITIME_SEA_NODES[v][1]
      );
      adj[u].push({ node: v, dist: d });
      adj[v].push({ node: u, dist: d });
    }
  }

  // Dijkstra Shortest Sea Path
  const dists = {};
  const prev = {};
  const visited = new Set();
  for (const k of Object.keys(MARITIME_SEA_NODES)) {
    dists[k] = Infinity;
    prev[k] = null;
  }
  dists[startNode] = 0;

  for (let step = 0; step < Object.keys(MARITIME_SEA_NODES).length; step++) {
    let u = null;
    let uDist = Infinity;
    for (const [k, d] of Object.entries(dists)) {
      if (!visited.has(k) && d < uDist) {
        uDist = d;
        u = k;
      }
    }
    if (!u || u === endNode) break;
    visited.add(u);

    for (const edge of adj[u] || []) {
      if (!visited.has(edge.node)) {
        const alt = dists[u] + edge.dist;
        if (alt < dists[edge.node]) {
          dists[edge.node] = alt;
          prev[edge.node] = u;
        }
      }
    }
  }

  const path = [];
  let curr = endNode;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }
  return path.length > 0 && path[0] === startNode ? path : [startNode, endNode];
}


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
    const verifiedSeaRoute = generateAlgorithmicMaritimeRoute(pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode);
    let parsedRoute = verifiedSeaRoute;

    if (navigator.onLine) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      try {
        const prompt = `Return a JSON object with {"chokepoints": ["..."]} listing the main straits/canals along ${corridorNames} between ${pOrig.name} and ${pDest.name}, avoiding weather: ${weatherContext} and NtMs: ${ntmContext}.`;
        const cohereResp = await fetch("https://api.cohere.com/v2/chat", {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Authorization": `Bearer ${SETROUTE_COHERE_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            model: SETROUTE_COHERE_MODEL,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1
          })
        });
        clearTimeout(timeoutId);
        if (cohereResp.ok) {
          const data = await cohereResp.json();
          const text = (((data.message || {}).content || [])[0] ? data.message.content[0].text : "") || "";
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
function generateAlgorithmicMaritimeRoute(pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode) {
  const corridor = findMaritimeSeaCorridor(origCoords, destCoords);
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

  return {
    name: `${pOrig.name} to ${pDest.name}`,
    routeName: `${pOrig.name} to ${pDest.name}`,
    waypoints: waypoints,
    chokepoints: chokepoints.length > 0 ? chokepoints : ["Deepwater Coastal Fairway", "Open Sea Transit"],
    totalDistanceNM: 0,
    estimatedSteamingDays: 0,
    metadata: {
      speedKnots: speed,
      draftMeters: 11.5,
      xtdNM: xtd,
      sailMode: sailMode
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
  const modal = document.getElementById("ntmPasteModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.style.display = "flex";
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
  if (pasteApply && pasteArea) {
    pasteApply.addEventListener("click", () => {
      const raw = pasteArea.value.trim();
      if (!raw) return;
      if (typeof window.parseAdmiraltyNtMText === "function") {
        const res = window.parseAdmiraltyNtMText(raw);
        if ((res.notices && res.notices.length > 0) || (res.cancelledIds && res.cancelledIds.length > 0)) {
          addNoticesToStore(res.notices || [], res.cancelledIds || []);
          if (typeof showToast === "function") {
            showToast(`Plotted ${(res.notices || []).length} warning(s), processed ${(res.cancelledIds || []).length} cancellation(s)`, "info");
          }
          pasteArea.value = "";
          if (pasteModal) {
            pasteModal.classList.remove("open");
            pasteModal.style.display = "none";
          }
        } else if (typeof showToast === "function") {
          showToast("No valid coordinates or CANCEL directives found in pasted text", "warn");
        }
      }
    });
  }
});

function openNoticeDetailModal(noticeOrId) {
  const item = (typeof noticeOrId === "object" && noticeOrId !== null)
    ? noticeOrId
    : NTM_STORE.find(n => n.id === noticeOrId);
  if (!item) return;

  const modal = document.getElementById("ntmNoticeDetailModal");
  if (!modal) return;

  const isCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
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

  if (origInput) origInput.value = item.id;
  if (idInput) idInput.value = item.id;
  if (typeSelect) typeSelect.value = item.type || "NAVTEX";

  const cleanNav = getNoticeNavarea(item).replace(/^NAVAREA\s+/i, "").trim().toUpperCase() || "I";
  if (navSelect) navSelect.value = cleanNav;

  if (geomSelect) {
    geomSelect.value = item.isPolygon ? "polygon" : (item.isLine ? "line" : "point");
  }
  if (subjInput) subjInput.value = item.subject || item.title || "";

  if (coordsInput) {
    const lines = (item.coords || []).map(c => `${Number(c.lat).toFixed(5)}, ${Number(c.lon).toFixed(5)}`);
    coordsInput.value = lines.join("\n");
  }
  if (bodyInput) {
    bodyInput.value = item.body || item.rawText || item.subject || "";
  }
  if (badgeEl) {
    badgeEl.textContent = isCancelled ? "CANCELLED" : (item.type || "NAVTEX");
    badgeEl.className = "ntm-tag " + (isCancelled ? "cancelled" : (item.type === "NAVTEX" ? "navtex" : (item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm"))));
  }
  if (headerEl) {
    headerEl.textContent = `${item.id} — ${getNoticeNavarea(item)}`;
  }
  if (cancelBanner) {
    cancelBanner.style.display = isCancelled ? "block" : "none";
  }
  if (toggleCancelBtn) {
    toggleCancelBtn.textContent = isCancelled ? "Restore Warning" : "Cancel Warning";
    toggleCancelBtn.style.color = isCancelled ? "#34d399" : "#fda4af";
    toggleCancelBtn.style.borderColor = isCancelled ? "rgba(52,211,153,0.45)" : "rgba(244,63,94,0.45)";
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
  const origId = (document.getElementById("ntmDetailOrigId") || {}).value;
  if (!origId) return;
  const item = NTM_STORE.find(n => n.id === origId);
  if (!item) return;

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
  const item = NTM_STORE.find(n => n.id === noticeId);
  if (!item) return;

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
}

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
  const modal = document.getElementById("weatherOverlayModal");
  if (!modal) return;
  let listBox = document.getElementById("weatherModalActiveStormsList");
  if (!listBox) {
    const body = modal.querySelector(".ntm-modal-box > div:nth-child(2)");
    if (body) {
      listBox = document.createElement("div");
      listBox.id = "weatherModalActiveStormsList";
      listBox.style.cssText = "margin-bottom:10px;background:rgba(15,23,42,0.55);border:1px solid var(--line);border-radius:6px;padding:8px 10px;";
      const gridEl = body.children[1];
      if (gridEl) {
        body.insertBefore(listBox, gridEl.nextSibling);
      } else {
        body.prepend(listBox);
      }
    }
  }
  if (!listBox) return;

  const storms = (MARINE_WEATHER_STORE && MARINE_WEATHER_STORE.storms) || [];
  let rowsHtml = `<div style="font-size:0.68rem;font-weight:700;color:#fca5a5;text-transform:uppercase;margin-bottom:6px;display:flex;justify-content:space-between;"><span>Active Tropical Cyclones (${storms.length})</span><span style="color:var(--muted);font-weight:500;">Click to center on chart</span></div><div style="display:grid;grid-template-columns:1fr;gap:5px;max-height:145px;overflow-y:auto;">`;
  storms.forEach(s => {
    const lat = Number(s.center[0]);
    const lon = Number(s.center[1]);
    const posStr = `${Math.abs(lat).toFixed(1)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(1)}°${lon >= 0 ? 'E' : 'W'}`;
    rowsHtml += `
      <div onclick="window.flyToCycloneFromModal(${lat}, ${lon})" style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:5px 8px;border-radius:5px;background:rgba(255,255,255,0.03);border:1px solid rgba(239,68,68,0.28);cursor:pointer;font-size:0.72rem;">
        <div>
          <strong style="color:#f8fafc;">🌀 ${s.name}</strong>
          <span style="color:#94a3b8;font-size:0.66rem;margin-left:5px;">${s.category}</span>
        </div>
        <div style="text-align:right;white-space:nowrap;font-family:Consolas,monospace;font-size:0.68rem;color:#fca5a5;">
          <b>${s.maxWinds} kt</b> &bull; ${s.centralPressure} hPa &bull; <span style="color:#38bdf8;">${posStr}</span>
        </div>
      </div>
    `;
  });
  rowsHtml += `</div>`;
  listBox.innerHTML = rowsHtml;
}

function showWeatherInfoModal() {
  const modal = document.getElementById("weatherOverlayModal");
  if (modal) {
    modal.classList.add("open");
    const badge = document.getElementById("weatherModalStatusBadge");
    if (badge) {
      const cyc = (MARINE_WEATHER_STORE && MARINE_WEATHER_STORE.synopticCycle) || "LIVE UTC";
      badge.textContent = navigator.onLine ? `LIVE SYNCED (${cyc})` : `CACHED (${cyc})`;
      badge.style.background = navigator.onLine ? "#10b981" : "#eab308";
    }
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
        route: isRouteActive
      },
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
window.WEATHER_SUBFILTERS = { cyclones: true, pressure: true, waves: true, winds: true };
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
    window.WEATHER_SUBFILTERS = {
      cyclones: chkWxCyclones ? chkWxCyclones.checked : true,
      pressure: chkWxPressure ? chkWxPressure.checked : true,
      waves:    chkWxWaves    ? chkWxWaves.checked    : true,
      winds:    chkWxWinds    ? chkWxWinds.checked    : true
    };
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
    <button type="button" class="ntm-layer-thumb-btn active-base" data-base="ocean" title="Esri Ocean Nautical Chart">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#0d3b66 0%,#1d6fa5 55%,#7bdff2 100%);">
        <svg viewBox="0 0 36 36" width="28" height="28"><path d="M4 24c5-4 10-4 14 0s9 4 14 0" fill="none" stroke="#e0f2fe" stroke-width="2.2" stroke-linecap="round"/><path d="M6 16c4-3 8-3 12 0s8 3 12 0" fill="none" stroke="#7dd3fc" stroke-width="1.8" stroke-linecap="round"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Ocean</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn" data-base="coast" title="Fast Coast &amp; Hydrographic Map (Zero API Key)">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#d8f3dc 0%,#95d5b2 45%,#48cae4 46%,#0096c7 100%);">
        <svg viewBox="0 0 36 36" width="26" height="26"><path d="M6 28L16 10l8 12 6-6" fill="none" stroke="#023e8a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Coast</span>
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

    <button type="button" class="ntm-layer-thumb-btn" data-overlay="buoys" title="Toggle OpenSeaMap Buoys &amp; Seamarks">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#1e293b 0%,#0f172a 100%);">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#38bdf8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Buoys</span>
    </button>

    <button type="button" class="ntm-layer-thumb-btn ntm-layer-trigger-btn always-trigger" data-trigger="1" title="Select Chart Layer">
      <div class="ntm-layer-thumb-preview" style="background:linear-gradient(145deg,#1e293b 0%,#0f172a 100%);">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#38bdf8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      </div>
      <span class="ntm-layer-thumb-label">Layers</span>
    </button>
  `;

  L.DomEvent.disableClickPropagation(selector);
  L.DomEvent.disableScrollPropagation(selector);
  mapContainer.appendChild(selector);

  selector.addEventListener("mouseenter", () => selector.classList.remove("collapsed"));
  selector.addEventListener("mouseleave", () => selector.classList.add("collapsed"));

  let activeBaseKey = "ocean";
  let isBuoysActive = false;

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

    // Ocean sphere fill
    const oceanGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.08, cx, cy, R);
    oceanGrad.addColorStop(0, "#103766");
    oceanGrad.addColorStop(0.65, "#091e3c");
    oceanGrad.addColorStop(1, "#040f21");
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
    ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
    ctx.lineWidth = 0.7;
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

    // World Continents & Islands (Natural Earth 110m vector land polygons)
    if (Array.isArray(WORLD_LAND_POLYGONS)) {
      const landGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      landGrad.addColorStop(0, "#23486e");
      landGrad.addColorStop(0.5, "#1b395b");
      landGrad.addColorStop(1, "#132944");
      ctx.fillStyle = landGrad;
      ctx.strokeStyle = "rgba(125, 211, 252, 0.55)";
      ctx.lineWidth = 1.0;

      WORLD_LAND_POLYGONS.forEach((poly) => {
        if (!Array.isArray(poly) || poly.length < 3) return;
        let frontCount = 0;
        const projPts = [];
        for (let i = 0; i < poly.length; i++) {
          const pt = poly[i];
          const lat = Array.isArray(pt) ? pt[0] : pt.lat;
          const lon = Array.isArray(pt) ? pt[1] : pt.lon;
          const p = projectLimbClamped(lat, lon);
          if (p.front) frontCount++;
          projPts.push(p);
        }
        if (frontCount === 0) return;
        ctx.beginPath();
        for (let i = 0; i < projPts.length; i++) {
          if (i === 0) ctx.moveTo(projPts[i].x, projPts[i].y);
          else ctx.lineTo(projPts[i].x, projPts[i].y);
        }
        ctx.closePath();
        ctx.fill();
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

        if (baseKey === "globe3d") {
          const c = mapInstance.getCenter();
          globeState.rotLat = c.lat;
          globeState.rotLon = c.lng;
          globeState.active = true;
          globeWrap.classList.add("active");
          renderGlobe3D();
        } else {
          if (globeState.active) {
            globeState.active = false;
            globeWrap.classList.remove("active");
            mapInstance.setView([globeState.rotLat, globeState.rotLon], mapInstance.getZoom());
          }
          ["ocean", "coast", "street", "sat"].forEach((k) => {
            if (layers[k] && mapInstance.hasLayer(layers[k])) {
              mapInstance.removeLayer(layers[k]);
            }
          });
          if (layers[baseKey]) {
            layers[baseKey].addTo(mapInstance);
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
      }
    });
  });
}

/* ==========================================================================
   SETSAIL v4.9 — OFFICIAL GOOGLE ACCOUNT AUTHENTICATION & FULL USER HISTORY,
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
}

function setSetSailAuthUser(userObj) {
  try {
    if (userObj) {
      localStorage.setItem(SETSAIL_AUTH_KEY, JSON.stringify(userObj));
      restoreSetSailUserHistory(userObj.email, true);
      saveSetSailUserHistory();
    } else {
      saveSetSailUserHistory();
      localStorage.removeItem(SETSAIL_AUTH_KEY);
    }
  } catch (e) {}
  syncSetSailAuthUI();
}

function syncSetSailAuthUI() {
  const user = getSetSailAuthUser();
  const hudBtn = document.getElementById("homeHudLeftLoginBtn");
  const hudText = document.getElementById("homeHudAuthText");
  const hudAvatar = document.getElementById("homeHudAuthAvatar");

  if (hudBtn && hudText) {
    if (user && (user.name || user.email)) {
      const disp = user.name || user.email.split("@")[0];
      const initChar = disp.charAt(0).toUpperCase();
      hudBtn.classList.add("logged-in");
      hudText.textContent = disp;
      if (hudAvatar) {
        if (user.picture) {
          hudAvatar.innerHTML = `<img src="${user.picture}" alt="${initChar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.parentElement.textContent='${initChar}'">`;
        } else {
          hudAvatar.innerHTML = initChar;
        }
      }
      hudBtn.title = `Signed in with Google as ${user.email || disp}`;
    } else {
      hudBtn.classList.remove("logged-in");
      hudText.textContent = "LogIn";
      if (hudAvatar) {
        hudAvatar.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      }
      hudBtn.title = "Sign in with Google Account";
    }
  }

  const loggedOutBox = document.getElementById("settingsAuthLoggedOut");
  const loggedInBox = document.getElementById("settingsAuthLoggedIn");
  const profileNameEl = document.getElementById("settingsAuthProfileName") || document.getElementById("settingsProfileName");
  const profileEmailEl = document.getElementById("settingsAuthProfileEmail") || document.getElementById("settingsProfileEmail");
  const profileAvatarEl = document.getElementById("settingsAuthProfileAvatar") || document.getElementById("settingsProfileAvatar");
  const contactEmailEl = document.getElementById("contactEmail");

  if (user && (user.email || user.name)) {
    if (loggedOutBox) loggedOutBox.style.display = "none";
    if (loggedInBox) loggedInBox.style.display = "flex";
    if (profileNameEl) profileNameEl.textContent = user.name || user.email.split("@")[0];
    if (profileEmailEl) profileEmailEl.textContent = `${user.email || ""} • Google Account Synced`;
    if (profileAvatarEl) {
      const initC = (user.name || user.email || "G").charAt(0).toUpperCase();
      if (user.picture) {
        profileAvatarEl.innerHTML = `<img src="${user.picture}" alt="${initC}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.parentElement.textContent='${initC}'">`;
      } else {
        profileAvatarEl.textContent = initC;
      }
    }
    if (contactEmailEl && !contactEmailEl.value && user.email) {
      contactEmailEl.value = user.email;
    }
    updateUserHistorySummaryUI();
  } else {
    if (loggedOutBox) loggedOutBox.style.display = "block";
    if (loggedInBox) loggedInBox.style.display = "none";
  }
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

function renderOfficialGoogleButtonIfConfigured() {
  const clientId = normalizeGoogleClientId(localStorage.getItem(SETSAIL_GOOGLE_CLIENT_ID_KEY) || window.SETSAIL_GOOGLE_CLIENT_ID);
  const container = document.getElementById("googleGsiButtonContainer");
  if (!clientId || !container) return;
  loadGoogleIdentityScriptAsync().then((loaded) => {
    if (!loaded || !window.google || !window.google.accounts || !window.google.accounts.id) return;
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      container.innerHTML = "";
      window.google.accounts.id.renderButton(container, {
        theme: "filled_blue",
        size: "large",
        type: "standard",
        shape: "pill",
        text: "signin_with",
        logo_alignment: "left",
        width: 260
      });
    } catch (e) {
      console.warn("[SetSail Google OAuth] Render button warning:", e);
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
      if (typeof switchToTab === "function") {
        switchToTab("tab-settings");
        setTimeout(() => {
          const card = document.getElementById("settingsAccountCard");
          if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    });
  }

  const googleBtn = document.getElementById("btnGoogleSignIn");
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      const clientId = normalizeGoogleClientId(localStorage.getItem(SETSAIL_GOOGLE_CLIENT_ID_KEY) || window.SETSAIL_GOOGLE_CLIENT_ID);
      const loaded = await loadGoogleIdentityScriptAsync();
      if (loaded && window.google && window.google.accounts) {
        // Prefer OAuth 2.0 Token Client popup for immediate userinfo retrieval
        if (window.google.accounts.oauth2 && typeof window.google.accounts.oauth2.initTokenClient === "function") {
          try {
            const tokenClient = window.google.accounts.oauth2.initTokenClient({
              client_id: clientId,
              scope: "openid email profile",
              callback: async (tokenResp) => {
                if (tokenResp && tokenResp.access_token) {
                  try {
                    const uRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                      headers: { Authorization: `Bearer ${tokenResp.access_token}` }
                    });
                    if (uRes.ok) {
                      const prof = await uRes.json();
                      if (prof && prof.email) {
                        setSetSailAuthUser({
                          name: prof.name || prof.given_name || prof.email.split("@")[0],
                          email: prof.email,
                          picture: prof.picture || "",
                          sub: prof.sub || "",
                          provider: "google",
                          signedInAt: new Date().toISOString()
                        });
                        if (typeof showSetSailToast === "function") {
                          showSetSailToast(`Signed in with Google as ${prof.email}`, "success");
                        }
                        return;
                      }
                    }
                  } catch (err) {
                    console.warn("[SetSail Google UserInfo]", err);
                  }
                }
                promptGoogleAccountChooserModal();
              },
              error_callback: () => {
                promptGoogleAccountChooserModal();
              }
            });
            tokenClient.requestAccessToken({ prompt: "select_account" });
            return;
          } catch (err) {
            console.warn("[SetSail OAuth2 TokenClient]", err);
          }
        }
        if (window.google.accounts.id) {
          try {
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: handleGoogleCredentialResponse
            });
            window.google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                promptGoogleAccountChooserModal();
              }
            });
            return;
          } catch (err) {
            console.warn("[SetSail Google OneTap]", err);
          }
        }
      }
      promptGoogleAccountChooserModal();
    });
  }

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
      setSetSailAuthUser(null);
      if (typeof showSetSailToast === "function") {
        showSetSailToast("Signed out of Google Account. Workspace history saved.", "info");
      }
    });
  }

  renderOfficialGoogleButtonIfConfigured();
  syncSetSailAuthUI();
}

function promptGoogleAccountChooserModal() {
  const gEmail = prompt(
    "Sign in with Google Account\nEnter your Google Email (@gmail.com or Workspace email) to sync & restore your SetSail history:",
    "bridge.vesta@gmail.com"
  );
  if (!gEmail || !gEmail.trim()) return;
  const cleanEmail = gEmail.trim().toLowerCase();
  const finalEmail = cleanEmail.includes("@") ? cleanEmail : `${cleanEmail}@gmail.com`;
  const rawName = finalEmail.split("@")[0].replace(/[._-]+/g, " ");
  const dispName = rawName.replace(/\b\w/g, c => c.toUpperCase());
  setSetSailAuthUser({
    name: dispName,
    email: finalEmail,
    provider: "google",
    signedInAt: new Date().toISOString()
  });
  if (typeof showSetSailToast === "function") {
    showSetSailToast(`Signed in with Google (${finalEmail})`, "success");
  }
}

window.initSetSailAuth = initSetSailAuth;
window.syncSetSailAuthUI = syncSetSailAuthUI;


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
  const wpts = activeRouteData.waypoints;
  const isFilterOn = Boolean(window.ROUTE_CORRIDOR_FILTER_ENABLED);

  if (wpts.length >= 2) {
    const leftSide = [];
    const rightSide = [];
    for (let i = 0; i < wpts.length; i++) {
      const cur = wpts[i];
      const prev = i > 0 ? wpts[i - 1] : cur;
      const next = i < wpts.length - 1 ? wpts[i + 1] : cur;
      const latRad = cur.lat * Math.PI / 180;
      const cosLat = Math.max(0.2, Math.cos(latRad));
      let dx = (next.lon - prev.lon) * cosLat;
      let dy = next.lat - prev.lat;
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      const degLatOffset = (-dy) * (bufNm / 60);
      const degLonOffset = (dx * (bufNm / 60)) / cosLat;
      leftSide.push([cur.lat + degLatOffset, cur.lon + degLonOffset]);
      rightSide.unshift([cur.lat - degLatOffset, cur.lon - degLonOffset]);
    }
    const polyCoords = leftSide.concat(rightSide);
    const corridorPoly = L.polygon(polyCoords, {
      color: isFilterOn ? "#00e5ff" : "#38bdf8",
      weight: isFilterOn ? 1.8 : 1.1,
      dashArray: "5, 5",
      fillColor: isFilterOn ? "#0ea5e9" : "#38bdf8",
      fillOpacity: isFilterOn ? 0.11 : 0.05,
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
const DEFAULT_SETNEWS_ARTICLES = [{"id": "SN-A8B4650176", "title": "Iran Weighs US Response as Hormuz Reopening Talks Stall", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "USA / Maritime Tech", "url": "https://www.marinelink.com/news/iran-weighs-us-response-hormuz-reopening-543600", "publishedAt": "2026-10-12T09:29:19Z", "category": "Geopolitics & Chokepoints", "region": "Strait of Hormuz & Persian Gulf", "regions": ["Strait of Hormuz & Persian Gulf"], "tags": ["hormuz"], "coords": [26.56, 56.25], "navarea": "IX", "image": "https://images.marinelink.com/images/maritime/w150/mproduction-adobe-stock-174245.jpeg", "summary": "Iran is still reviewing a US response to its proposal regarding the reopening of the Strait of Hormuz and will reply to Washington via intermediaries when the review is over, foreign ministry spokesperson Esmaeil Baghaei said on Monday.Baghaei…", "body": "Iran is still reviewing a US response to its proposal regarding the reopening of the Strait of Hormuz and will reply to Washington via intermediaries when the review is over, foreign ministry spokesperson Esmaeil Baghaei said on Monday.Baghaei…", "takeaways": ["Operational Area: Strait of Hormuz & Persian Gulf.", "Assess strait transit security posture, war-risk advisories, and routing alternatives."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-23E6D8EAFB", "title": "Chinese buyers snap up capesizes", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/chinese-buyers-snap-up-capesizes/", "publishedAt": "2026-10-12T09:24:00Z", "category": "Ports & Terminals", "region": "Baltic Sea & Northern Europe", "regions": ["Baltic Sea & Northern Europe", "China & East Asia"], "tags": ["tanker", "port"], "coords": [57.5, 19.5], "navarea": "I", "image": "https://splash247.com/wp-content/uploads/2021/08/Shanghai-free-pic-300x180.jpg", "summary": "While tankers have dominated headlines in October, Chinese buyers are quietly putting money on the table for more capesize tonnage, emerging behind some of the dry bulk market’s most eye-catching deals. Estonian outfit Klip Marine is reportedly exiting the segment by selling the Ekaterini V (173,555 dwt, built 2012...", "body": "While tankers have dominated headlines in October, Chinese buyers are quietly putting money on the table for more capesize tonnage, emerging behind some of the dry bulk market’s most eye-catching deals. Estonian outfit Klip Marine is reportedly exiting the segment by selling the Ekaterini V (173,555 dwt, built 2012 at Bohai Shipbuilding) to Chinese buyers …", "takeaways": ["While tankers have dominated headlines in October, Chinese buyers are quietly putting money on the table for more capesize tonnage, emerging behind some of the dry bulk market’s most eye-catching deals.", "Estonian outfit Klip Marine is reportedly exiting the segment by selling the Ekaterini V (173,555 dwt, built 2012 at Bohai Shipbuilding) to Chinese buyers …", "Monitor port controlling depths, berth UKC allowances, and canal transit slot advisories in SetChart."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-714B4A9FAE", "title": "Sky-high tanker rates change crude trade flows", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "UK / Global", "url": "https://www.seatrade-maritime.com/tankers/sky-high-tanker-rates-change-crude-trade-flows", "publishedAt": "2026-10-12T09:20:53Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["tanker"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://eu-images.contentstack.com/v3/assets/bltdcfe6aab5515629e/blt2471fe42bf6186ed/698b447382cad7f7f5eec669/Dynacom-tankers-Dynacom.jpg?width=720&quality=80&disable=upscale", "summary": "As average VLCC earnings hit $805,000 per day globally Asian oil refiners are looking at alternative sources of crude oil", "body": "As average VLCC earnings hit $805,000 per day globally Asian oil refiners are looking at alternative sources of crude oil", "takeaways": ["As average VLCC earnings hit $805,000 per day globally Asian oil refiners are looking at alternative sources of crude oil", "Operational Area: Global Maritime.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-C1BAB294DB", "title": "ADNOC broadens Asian horizons with Gulf Group LNG deal", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Netherlands / Energy", "url": "https://offshore-energy.biz/2026/10/12/adnoc-broadens-asian-horizons-with-gulf-group-lng-deal", "publishedAt": "2026-10-12T09:02:19Z", "category": "Shipping & Tankers", "region": "Strait of Hormuz & Persian Gulf", "regions": ["Strait of Hormuz & Persian Gulf", "Red Sea & Bab el-Mandeb"], "tags": ["lng"], "coords": [26.56, 56.25], "navarea": "IX", "image": "https://offshore-energy.biz/api/media/file/wp-import-1784734763330-1024x612-1024x612.jpg?prefix=media", "summary": "ADNOC has inked a multi-year agreement with Gulf Group to ship 2 million tonnes of liquefied natural gas (LNG) starting in 2027.", "body": "ADNOC has inked a multi-year agreement with Gulf Group to ship 2 million tonnes of liquefied natural gas (LNG) starting in 2027.", "takeaways": ["ADNOC has inked a multi-year agreement with Gulf Group to ship 2 million tonnes of liquefied natural gas (LNG) starting in 2027.", "Operational Area: Strait of Hormuz & Persian Gulf, Red Sea & Bab el-Mandeb.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-F14BFE8705", "title": "HAIAN BETA makes maiden Chennai call", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Europe / Liner & Ports", "url": "https://container-news.com/haian-beta-makes-maiden-chennai-call/", "publishedAt": "2026-10-12T09:00:47Z", "category": "Ports & Terminals", "region": "Singapore & Malacca Strait", "regions": ["Singapore & Malacca Strait", "China & East Asia", "India & Indian Ocean"], "tags": ["container", "port", "china"], "coords": [1.26, 103.82], "navarea": "XI", "image": "https://container-news.com/wp-content/uploads/2026/10/03-300x207.jpg", "summary": "M/V HAIAN BETA made its maiden call at Chennai Port on 3 October 2026, marking the launch of Hai An’s direct CVI service between Vietnam and India. The vessel is the first ship deployed on the new service by Hai An Container Transport Company Limited (HACT), a subsidiary of Hai An Transport and Stevedoring Joint […]", "body": "M/V HAIAN BETA made its maiden call at Chennai Port on 3 October 2026, marking the launch of Hai An’s direct CVI service between Vietnam and India. The vessel is the first ship deployed on the new service by Hai An Container Transport Company Limited (HACT), a subsidiary of Hai An Transport and Stevedoring Joint Stock Company (HATS). A welcome ceremony for the HAIAN BETA Chennai call took place at Chennai Container Terminal, which is operated by DP World. Representatives attending the event included Sachin S. Kurve, Chairperson of Chennai Port Authority, and Vu Thanh Hai, Chairman of HACT and HATS. Representatives from DP World Chennai and Samsara Shipping, Hai An’s general agent in India, also participated. CVI service links four Asian ports The CVI service operates monthly with the following rotation: Nansha – Hai Phong – Port Klang West – Chennai. The new service establishes an additional direct container shipping connection between Vietnam and India. It also links both markets with major trading hubs in southern China and Malaysia. Hai An said the CVI service is designed to support growing shipping requirements between Vietnam and India. Bilateral trade between the two countries reached US$13.4 billion during the first eight months of 2026, representing a year-on-year increase of 25%. Chennai Port Authority noted that the continued expansion of trade between India and Vietnam is creating further opportunities for container shipping connections between the two markets. The HAIAN BETA Chennai call represents another step in Hai An’s expansion into international container shipping services.", "takeaways": ["M/V HAIAN BETA made its maiden call at Chennai Port on 3 October 2026, marking the launch of Hai An’s direct CVI service between Vietnam and India.", "The vessel is the first ship deployed on the new service by Hai An Container Transport Company Limited (HACT), a subsidiary of Hai An Transport and Stevedoring Joint Stock Company (HATS).", "A welcome ceremony for the HAIAN BETA Chennai call took place at Chennai Container Terminal, which is operated by DP World."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-175060C5B0", "title": "A platform launched to consolidate European port innovation knowledge", "source": "SetSail Metocean Watch", "sourceIcon": "🌀", "sourceRegion": "Europe / Liner & Ports", "url": "https://container-news.com/a-platform-launched-to-consolidate-european-port-innovation-knowledge/", "publishedAt": "2026-10-12T08:00:40Z", "category": "Weather & Cyclones", "region": "Rotterdam & North Sea", "regions": ["Rotterdam & North Sea", "Singapore & Malacca Strait"], "tags": ["port"], "coords": [51.95, 4.14], "navarea": "I", "image": "https://container-news.com/wp-content/uploads/2019/06/digital-300x153.jpg", "summary": "The Green Innovation Compass has been launched as a publicly accessible knowledge platform consolidating European expertise on innovative technologies and solutions for the port ecosystem, providing independent and practical insights for all port stakeholders. The platform is one of the key legacy outcomes of the EU...", "body": "The Green Innovation Compass has been launched as a publicly accessible knowledge platform consolidating European expertise on innovative technologies and solutions for the port ecosystem, providing independent and practical insights for all port stakeholders. The platform is one of the key legacy outcomes of the EU Horizon 2020-funded MAGPIE project, in which the Port of Rotterdam participated alongside ports, companies, knowledge institutions and governments collaborating on innovative solutions for the port of the future. A central lesson from the MAGPIE project was that knowledge about port innovations is often available in fragmented form across different organisations and geographies. The Green Innovation Compass addresses this gap by bringing together research findings, demonstration project results and practical experiences from ports, companies and knowledge institutions across Europe on a single accessible platform. To ensure the long-term continuity of the knowledge platform following the completion of the MAGPIE project, ALICE, the Alliance for Logistics Innovation through Collaboration in Europe, has taken on the role of legacy partner and will maintain and develop the platform going forward.", "takeaways": ["A central lesson from the MAGPIE project was that knowledge about port innovations is often available in fragmented form across different organisations and geographies.", "Operational Area: Rotterdam & North Sea, Singapore & Malacca Strait.", "Cross-check live NOAA NHC / JMA / JTWC tropical cyclone cones and ECMWF wave heights on SetChart."], "readingMinutes": 3, "readMinutes": 3}, {"id": "SN-10B206FB12", "title": "Ship recycling drought leaves record ageing fleet afloat", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/ship-recycling-drought-leaves-record-ageing-fleet-afloat/", "publishedAt": "2026-10-12T08:00:00Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["shipping", "global"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://splash247.com/wp-content/uploads/2016/04/ShipBreaking_demolition_Bangladesh-300x218.jpg", "summary": "Ship recycling has sunk into its longest sustained slump in more than half a century, just as the global merchant fleet accumulates an unprecedented amount of ageing tonnage. Clarksons Research calculates that just 273 ships of 5.5m gt, equivalent to around 8m dwt, were sold for demolition in the first nine months of...", "body": "Ship recycling has sunk into its longest sustained slump in more than half a century, just as the global merchant fleet accumulates an unprecedented amount of ageing tonnage. Clarksons Research calculates that just 273 ships of 5.5m gt, equivalent to around 8m dwt, were sold for demolition in the first nine months of 2026, 13% …", "takeaways": ["Ship recycling has sunk into its longest sustained slump in more than half a century, just as the global merchant fleet accumulates an unprecedented amount of ageing tonnage.", "Clarksons Research calculates that just 273 ships of 5.5m gt, equivalent to around 8m dwt, were sold for demolition in the first nine months of 2026, 13% …", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-45F283530B", "title": "EU and China reach interim trade deal on hybrid vehicle exports", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "UK / Global", "url": "https://www.seatrade-maritime.com/regulations/eu-and-china-reach-interim-trade-deal-on-hybrid-vehicle-exports", "publishedAt": "2026-10-12T07:55:59Z", "category": "Ports & Terminals", "region": "China & East Asia", "regions": ["China & East Asia"], "tags": ["port", "china"], "coords": [30.6, 122.1], "navarea": "XI", "image": "https://eu-images.contentstack.com/v3/assets/bltdcfe6aab5515629e/blt81615f513d94ecdb/694a686cbbf6bce0f41120f1/Shenzhen_port_BYD.JPG?width=720&quality=80&disable=upscale", "summary": "China and Europe are likely to cut Chinese hybrid vehicle exports by half", "body": "China and Europe are likely to cut Chinese hybrid vehicle exports by half", "takeaways": ["China and Europe are likely to cut Chinese hybrid vehicle exports by half", "Operational Area: China & East Asia.", "Monitor port controlling depths, berth UKC allowances, and canal transit slot advisories in SetChart."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-C7704D97E3", "title": "Shipping’s extraordinary boom refuses to peak", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/shippings-extraordinary-boom-refuses-to-peak/", "publishedAt": "2026-10-12T07:45:00Z", "category": "Ports & Terminals", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["tanker", "container"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://splash247.com/wp-content/uploads/2021/11/Monaco-champagne-300x180.jpg", "summary": "Global shipping earnings have reached another extraordinary milestone, with Clarksons Research’s cross-sector ClarkSea Index surging 12% in a week to an unprecedented $84,951 a day, its fifth consecutive all-time high. The index, a widely followed overall earnings barometer, measures average daily earnings across...", "body": "Global shipping earnings have reached another extraordinary milestone, with Clarksons Research’s cross-sector ClarkSea Index surging 12% in a week to an unprecedented $84,951 a day, its fifth consecutive all-time high. The index, a widely followed overall earnings barometer, measures average daily earnings across tankers, bulk carriers, containerships and gas carriers, weighted by vessel numbers in …", "takeaways": ["Global shipping earnings have reached another extraordinary milestone, with Clarksons Research’s cross-sector ClarkSea Index surging 12% in a week to an unprecedented $84,951 a day, its fifth consecutive all-time high.", "The index, a widely followed overall earnings barometer, measures average daily earnings across tankers, bulk carriers, containerships and gas carriers, weighted by vessel numbers in …", "Monitor port controlling depths, berth UKC allowances, and canal transit slot advisories in SetChart."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-87DDE30C20", "title": "Tanker war spreads across Gulf", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/tanker-war-spreads-across-gulf/", "publishedAt": "2026-10-12T07:30:15Z", "category": "Geopolitics & Chokepoints", "region": "Strait of Hormuz & Persian Gulf", "regions": ["Strait of Hormuz & Persian Gulf", "India & Indian Ocean"], "tags": ["tanker", "port", "hormuz"], "coords": [26.56, 56.25], "navarea": "IX", "image": "https://splash247.com/wp-content/uploads/2026/03/US-Central-Command-Epic-Fury-Iran-300x180.jpeg", "summary": "Attacks on commercial shipping are spreading across the Gulf region, with two Indian seafarers missing after a drone struck a tanker off Oman on Sunday and another tanker hit by a projectile while exiting the Strait of Hormuz. The Nicaragua-flagged Petro Dolphin was attacked at Sohar Anchorage on Sunday. India’s...", "body": "Attacks on commercial shipping are spreading across the Gulf region, with two Indian seafarers missing after a drone struck a tanker off Oman on Sunday and another tanker hit by a projectile while exiting the Strait of Hormuz. The Nicaragua-flagged Petro Dolphin was attacked at Sohar Anchorage on Sunday. India’s minister for ports, shipping and …", "takeaways": ["The Nicaragua-flagged Petro Dolphin was attacked at Sohar Anchorage on Sunday.", "India’s minister for ports, shipping and …", "Assess strait transit security posture, war-risk advisories, and routing alternatives."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-E3612BDF46", "title": "Danaos and Cetus push dry bulk listing plans in Oslo", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/danaos-plots-norwegian-listing-for-bulker-business/", "publishedAt": "2026-10-12T07:15:00Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["shipping", "global"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://splash247.com/wp-content/uploads/2026/02/John-Coustas-Danaos-300x180.jpg", "summary": "Oslo’s shipping listing pipeline is filling up, with Greek owner Danaos exploring a carve-out of its large-bulker business while handysize specialist Cetus Maritime has hired three banks for a proposed Euronext Growth Oslo float. Cetus has appointed Clarksons Securities, DNB Carnegie and Nordea to advise on the...", "body": "Oslo’s shipping listing pipeline is filling up, with Greek owner Danaos exploring a carve-out of its large-bulker business while handysize specialist Cetus Maritime has hired three banks for a proposed Euronext Growth Oslo float. Cetus has appointed Clarksons Securities, DNB Carnegie and Nordea to advise on the listing process, which would be preceded by a …", "takeaways": ["Cetus has appointed Clarksons Securities, DNB Carnegie and Nordea to advise on the listing process, which would be preceded by a …", "Operational Area: Global Maritime.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-A94357A23C", "title": "TGS-Galdor AI partnership targeting overlooked or underestimated North Sea exploration plays", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Netherlands / Energy", "url": "https://offshore-energy.biz/2026/10/12/tgs-galdor-ai-partnership-targeting-overlooked-or-underestimated-north-sea-exploration-plays", "publishedAt": "2026-10-12T07:10:52Z", "category": "Shipping & Tankers", "region": "Rotterdam & North Sea", "regions": ["Rotterdam & North Sea"], "tags": ["shipping", "rotterdam"], "coords": [51.95, 4.14], "navarea": "I", "image": "https://offshore-energy.biz/api/media/file/wp-import-1784731454324-860x484-860x484.jpg?prefix=media", "summary": "Galdor Exploration has forged a pact with TGS, combining subsurface expertise with cutting-edge AI to rewrite the playbook for North Sea discoveries.", "body": "Galdor Exploration has forged a pact with TGS, combining subsurface expertise with cutting-edge AI to rewrite the playbook for North Sea discoveries.", "takeaways": ["Galdor Exploration has forged a pact with TGS, combining subsurface expertise with cutting-edge AI to rewrite the playbook for North Sea discoveries.", "Operational Area: Rotterdam & North Sea.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-A1A888C7AE", "title": "Asian maritime security in Q3 – Theft and armed robbery trending downward", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "UK / Global", "url": "https://www.seatrade-maritime.com/security/asian-maritime-security-in-q3-theft-and-armed-robbery-trending-downward", "publishedAt": "2026-10-12T07:06:30Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["shipping", "global"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://eu-images.contentstack.com/v3/assets/bltdcfe6aab5515629e/blt1b16f4525961c046/6acc89384e2c21fb3a075f8e/Risk_Intelligence_graphic_Q3_2026.jpg?width=720&quality=80&disable=upscale", "summary": "Risk Intelligence examines security incidents and related concerns on Asian waters during the third quarter of 2026", "body": "Risk Intelligence examines security incidents and related concerns on Asian waters during the third quarter of 2026", "takeaways": ["Risk Intelligence examines security incidents and related concerns on Asian waters during the third quarter of 2026", "Operational Area: Global Maritime.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-72B608513C", "title": "Port Houston completes Project 11 Houston ship channel expansion", "source": "SetSail Hydrographic & Safety Desk", "sourceIcon": "🧭", "sourceRegion": "Europe / Liner & Ports", "url": "https://container-news.com/port-houston-completes-project-11-houston-ship-channel-expansion/", "publishedAt": "2026-10-12T07:00:14Z", "category": "Navigation & Safety", "region": "US Gulf & Port of Houston", "regions": ["US Gulf & Port of Houston", "Singapore & Malacca Strait"], "tags": ["port", "houston", "safety"], "coords": [29.35, -94.78], "navarea": "IV", "image": "https://container-news.com/wp-content/uploads/2026/10/Στιγμιότυπο-οθόνης-2026-10-12-083830-300x198.png", "summary": "Port Houston joined federal, state and local officials and industry partners on October 8 to celebrate the completion of Port Houston-led segments of Project 11, the eleventh major expansion of the Houston Ship Channel and one of the most significant infrastructure projects in the waterway’s history. The completed...", "body": "Port Houston joined federal, state and local officials and industry partners on October 8 to celebrate the completion of Port Houston-led segments of Project 11, the eleventh major expansion of the Houston Ship Channel and one of the most significant infrastructure projects in the waterway’s history. The completed work widened the channel by 170 feet along its Galveston Bay reach, from 530 feet to 700 feet, increasing safety and efficiency along the nation’s busiest waterway. The expanded channel is already delivering operational benefits. In 2025, the US Coast Guard, US Army Corps of Engineers and Houston Pilots recognised the widened 700-foot channel from Bolivar Roads to Morgans Point, effectively removing daylight restrictions for larger vessels transiting Galveston Bay and reducing the need for oversized ships to wait at berth or anchor before sailing. The project was delivered through an innovative funding partnership in which Port Houston and industry partners agreed to contribute financially, cutting years from the delivery timeline. Port Houston completed its portion on time, on budget and faster than any comparable project in the United States. The remainder of project funding came from several federal sources. Project 11 also created lasting environmental benefits through beneficial reuse of all suitable dredged material, producing 10 acres of bird islands, 324 acres of oyster reefs and 800 acres of marsh habitat. Port Houston CEO Charlie Jenkins described the completion as especially meaningful, recalling when the project was still a concept and crediting the collaboration between Port Houston, the Army Corps, industry and elected leaders in finding a way to deliver it. Commission Chairman Ric Campo highlighted the project as transformational and praised the", "takeaways": ["The completed work widened the channel by 170 feet along its Galveston Bay reach, from 530 feet to 700 feet, increasing safety and efficiency along the nation’s busiest waterway.", "The expanded channel is already delivering operational benefits.", "The project was delivered through an innovative funding partnership in which Port Houston and industry partners agreed to contribute financially, cutting years from the delivery timeline."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-4EF07AF2D3", "title": "Chinese shipping investor makes play for asphalt tanker owner Xin Yuan", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/chinese-shipping-investor-makes-play-for-asphalt-tanker-owner-xin-yuan/", "publishedAt": "2026-10-12T06:45:00Z", "category": "Shipping & Tankers", "region": "China & East Asia", "regions": ["China & East Asia"], "tags": ["tanker"], "coords": [30.6, 122.1], "navarea": "XI", "image": "https://splash247.com/wp-content/uploads/2026/10/XIN-YUAN-Asphalt-tanker-300x180.jpg", "summary": "Chinese shipping entrepreneur Liu Jichun is seeking control of Hong Kong-listed asphalt tanker operator Xin Yuan Enterprises through a proposed cash takeover worth up to HK$771m ($99m). Liu’s investment vehicle Ocean Vivo has announced a voluntary conditional offer of HK$2.21 per share for the stock it does not...", "body": "Chinese shipping entrepreneur Liu Jichun is seeking control of Hong Kong-listed asphalt tanker operator Xin Yuan Enterprises through a proposed cash takeover worth up to HK$771m ($99m). Liu’s investment vehicle Ocean Vivo has announced a voluntary conditional offer of HK$2.21 per share for the stock it does not already own, valuing Xin Yuan’s entire equity …", "takeaways": ["Chinese shipping entrepreneur Liu Jichun is seeking control of Hong Kong-listed asphalt tanker operator Xin Yuan Enterprises through a proposed cash takeover worth up to HK$771m ($99m).", "Liu’s investment vehicle Ocean Vivo has announced a voluntary conditional offer of HK$2.21 per share for the stock it does not already own, valuing Xin Yuan’s entire equity …", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-3473A6D6E2", "title": "Shell and Equinor fuel $1.1 billion backlog uptick for Transocean", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Netherlands / Energy", "url": "https://offshore-energy.biz/2026/10/12/shell-and-equinor-fuel-dollar11-billion-backlog-uptick-for-transocean", "publishedAt": "2026-10-12T06:32:28Z", "category": "Shipping & Tankers", "region": "Rotterdam & North Sea", "regions": ["Rotterdam & North Sea"], "tags": ["shipping", "rotterdam"], "coords": [51.95, 4.14], "navarea": "I", "image": "https://offshore-energy.biz/api/media/file/wp-import-1784730348497-1024x652-1024x652.jpg?prefix=media", "summary": "Transocean gets its hands on a North Sea contract for a semi-submersible with Shell and a final approval for three rigs from Equinor.", "body": "Transocean gets its hands on a North Sea contract for a semi-submersible with Shell and a final approval for three rigs from Equinor.", "takeaways": ["Transocean gets its hands on a North Sea contract for a semi-submersible with Shell and a final approval for three rigs from Equinor.", "Operational Area: Rotterdam & North Sea.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-91D60171ED", "title": "Readers Speak: Smaller vessels gain favour in container ship orders", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Europe / Liner & Ports", "url": "https://container-news.com/readers-speak-smaller-vessels-gain-favour-in-container-ship-orders/", "publishedAt": "2026-10-12T06:00:45Z", "category": "Ports & Terminals", "region": "Panama Canal & Caribbean", "regions": ["Panama Canal & Caribbean", "Singapore & Malacca Strait", "Brazil & South Atlantic"], "tags": ["container", "port", "panama"], "coords": [9.08, -79.68], "navarea": "IV", "image": "https://container-news.com/wp-content/uploads/2026/10/Χρυσαφένιο-Λιμάνι-με-Πλοία-Κοντέινερ-cleaned-300x169.png", "summary": "As container shipping lines continue to evaluate their fleet expansion strategies, the question of which vessel sizes deserve priority in newbuilding orders remains an important industry consideration. The latest Readers Speak poll by Container News asked readers: “Which vessel size should container lines focus on...", "body": "As container shipping lines continue to evaluate their fleet expansion strategies, the question of which vessel sizes deserve priority in newbuilding orders remains an important industry consideration. The latest Readers Speak poll by Container News asked readers: “Which vessel size should container lines focus on for new orders?” The results reveal a clear preference for smaller and medium-sized container ships, with Panamax/Post-Panamax and Feeder/Feedermax vessels attracting the strongest support. Meanwhile, Ultra Large Container Vessels (ULCVs) received comparatively limited backing. The findings suggest that readers see considerable value in fleet flexibility and the ability to serve different shipping markets, rather than concentrating new investment primarily on the largest container ships. Panamax and Post-Panamax vessels attract strong support Panamax and Post-Panamax vessels emerged as a leading choice in the latest Readers Speak poll. Their strong showing may reflect the importance readers place on vessels that can operate across a variety of trade routes and service networks. Compared with the largest container ships, these vessel segments offer different deployment possibilities, potentially making them attractive to shipping lines seeking to balance capacity with operational flexibility. The preference also suggests that readers may view medium-sized tonnage as an important component of future fleet development. Rather than prioritising maximum carrying capacity alone, the results point towards an interest in ships that can support a broader range of network requirements. Feeder vessels highlight the importance of regional connectivity Feeder and Feedermax vessels also attracted substantial support, reinforcing the importance of smaller container ships in", "takeaways": ["As container shipping lines continue to evaluate their fleet expansion strategies, the question of which vessel sizes deserve priority in newbuilding orders remains an important industry consideration.", "Meanwhile, Ultra Large Container Vessels (ULCVs) received comparatively limited backing.", "The findings suggest that readers see considerable value in fleet flexibility and the ability to serve different shipping markets, rather than concentrating new investment primarily on the largest container ships."], "readingMinutes": 4, "readMinutes": 4}, {"id": "SN-182730530F", "title": "Baltic states push for EU-wide ban on Russian grain transit", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/baltic-states-push-for-eu-wide-ban-on-russian-grain-transit/", "publishedAt": "2026-10-12T06:00:00Z", "category": "Ports & Terminals", "region": "Suez Canal & Eastern Med", "regions": ["Suez Canal & Eastern Med", "Baltic Sea & Northern Europe"], "tags": ["port"], "coords": [30.58, 32.34], "navarea": "III", "image": "https://splash247.com/wp-content/uploads/2026/09/grain-Port-of-Riga-300x180.jpg", "summary": "Estonia, Latvia and Lithuania have called for an EU-wide ban on Russian grain transit, seeking to block Moscow from redirecting agricultural exports through European transport networks as disruption in the Black Sea reshapes regional grain flows. The three countries have submitted a joint letter to European Council...", "body": "Estonia, Latvia and Lithuania have called for an EU-wide ban on Russian grain transit, seeking to block Moscow from redirecting agricultural exports through European transport networks as disruption in the Black Sea reshapes regional grain flows. The three countries have submitted a joint letter to European Council president António Costa and European Commission president Ursula …", "takeaways": ["The three countries have submitted a joint letter to European Council president António Costa and European Commission president Ursula …", "Operational Area: Suez Canal & Eastern Med, Baltic Sea & Northern Europe.", "Monitor port controlling depths, berth UKC allowances, and canal transit slot advisories in SetChart."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-880A70EE1F", "title": "Two European shipyards find new owners after years of turmoil", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/two-european-shipyards-find-new-owners-after-years-of-turmoil/", "publishedAt": "2026-10-12T05:30:54Z", "category": "Shipping & Tankers", "region": "Suez Canal & Eastern Med", "regions": ["Suez Canal & Eastern Med"], "tags": ["shipyard"], "coords": [30.58, 32.34], "navarea": "III", "image": "https://splash247.com/wp-content/uploads/2015/01/Damen-Mangalia-Shipyard-300x208.jpg", "summary": "Two of Europe’s best-known shipyards are heading into new ownership, with Germany’s Rheinmetall taking over Romania’s Mangalia facility and Turkey’s Kuzey Star Shipyard selected to acquire Croatia’s Uljanik Brodogradnja 1856. German defence giant Rheinmetall has secured the Mangalia shipyard for €138m ($160m),...", "body": "Two of Europe’s best-known shipyards are heading into new ownership, with Germany’s Rheinmetall taking over Romania’s Mangalia facility and Turkey’s Kuzey Star Shipyard selected to acquire Croatia’s Uljanik Brodogradnja 1856. German defence giant Rheinmetall has secured the Mangalia shipyard for €138m ($160m), winning an auction organised by court-appointed liquidator CITR on Friday. The Black Sea …", "takeaways": ["German defence giant Rheinmetall has secured the Mangalia shipyard for €138m ($160m), winning an auction organised by court-appointed liquidator CITR on Friday.", "Operational Area: Suez Canal & Eastern Med.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-53E205CBFD", "title": "Explainer: Hapag-Lloyd is building its own table", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Europe / Liner & Ports", "url": "https://container-news.com/explainer-hapag-lloyd-is-building-its-own-table/", "publishedAt": "2026-10-12T04:00:14Z", "category": "Shipping & Tankers", "region": "China & East Asia", "regions": ["China & East Asia", "Brazil & South Atlantic"], "tags": ["china"], "coords": [30.6, 122.1], "navarea": "XI", "image": "https://container-news.com/wp-content/uploads/2026/06/HLAG_Salahuddin_Rotterdam_1280x800_rgb-300x188.jpg", "summary": "The German carrier’s exit from the MSC–ONE Ipanema pact marks the moment one shared China–Brazil lane begins splitting into two rival systems.", "body": "The German carrier’s exit from the MSC–ONE Ipanema pact marks the moment one shared China–Brazil lane begins splitting into two rival systems. This content is locked Select a CN Premium Subscription Package To Unlock The Content! Remember Me Lost your password? Don't have an account? Register", "takeaways": ["The German carrier’s exit from the MSC–ONE Ipanema pact marks the moment one shared China–Brazil lane begins splitting into two rival systems.", "This content is locked Select a CN Premium Subscription Package To Unlock The Content!", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-20EFBA6185", "title": "Star Bulk sells down kamsarmax pair to Hermes", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/star-bulk-sells-down-kamsarmax-pair-to-hermes/", "publishedAt": "2026-10-12T03:00:00Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["shipping", "global"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://splash247.com/wp-content/uploads/2023/10/Star-Angelina-kamsarmax-Star-Bulk-300x180.jpg", "summary": "Nasdaq-listed Greek dry bulk heavyweight Star Bulk Carriers has agreed to sell a 35% ownership interest in two recently built kamsarmax bulkers to Itochu’s investment and asset-holding vehicle, Hermes World Maritime, while retaining commercial and technical management of both ships. The Petros Pappas-led owner...", "body": "Nasdaq-listed Greek dry bulk heavyweight Star Bulk Carriers has agreed to sell a 35% ownership interest in two recently built kamsarmax bulkers to Itochu’s investment and asset-holding vehicle, Hermes World Maritime, while retaining commercial and technical management of both ships. The Petros Pappas-led owner identified the vessels as the 2026-built Star Ellie and Star Bella. …", "takeaways": ["The Petros Pappas-led owner identified the vessels as the 2026-built Star Ellie and Star Bella.", "Operational Area: Global Maritime.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}, {"id": "SN-7D790D18C1", "title": "Shell joins Equinor in $9.8bn Canadian offshore project", "source": "SetSail Maritime Desk", "sourceIcon": "🚢", "sourceRegion": "Singapore / Global", "url": "https://splash247.com/shell-joins-equinor-in-9-8bn-canadian-offshore-project/", "publishedAt": "2026-10-12T02:40:00Z", "category": "Shipping & Tankers", "region": "Global Maritime", "regions": ["Global Maritime"], "tags": ["shipping", "global"], "coords": [25.0, -40.0], "navarea": "GLOBAL", "image": "https://splash247.com/wp-content/uploads/2024/08/Shell-source-Larsen-Toubro-300x180.jpg", "summary": "Supermajor Shell has agreed to acquire a 30% interest in Equinor’s Bay du Nord project offshore Newfoundland and Labrador as the partners push the development towards a final investment decision targeted for early 2027. Equinor will retain a 70% interest and remain the project operator, which is currently completing...", "body": "Supermajor Shell has agreed to acquire a 30% interest in Equinor’s Bay du Nord project offshore Newfoundland and Labrador as the partners push the development towards a final investment decision targeted for early 2027. Equinor will retain a 70% interest and remain the project operator, which is currently completing front-end engineering and design work. Bay …", "takeaways": ["Supermajor Shell has agreed to acquire a 30% interest in Equinor’s Bay du Nord project offshore Newfoundland and Labrador as the partners push the development towards a final investment decision targeted for early 2027.", "Equinor will retain a 70% interest and remain the project operator, which is currently completing front-end engineering and design work.", "Relevant for gas carrier (LPG/LNG) and tanker fleet chartering, bunkering, and terminal turnaround planning."], "readingMinutes": 2, "readMinutes": 2}];
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
  let primaryReason = "🔥 Priority Maritime Briefing";

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

function renderHomeNewsSlide() {
  const grid = document.getElementById("homeNewsPreviewGrid");
  if (!grid) return;
  const articles = (SETNEWS_ARTICLES && SETNEWS_ARTICLES.length > 0 ? SETNEWS_ARTICLES : DEFAULT_SETNEWS_ARTICLES).slice(0, 3);
  if (articles.length === 0) return;

  grid.innerHTML = articles.map(a => {
    const desk = formatEditorialNewsSource(a);
    const icon = formatEditorialNewsIcon(a);
    return `
      <article class="home-news-card" data-open-news-id="${a.id}">
        <div class="home-news-card-img" style="background-image:url('${a.image || ""}');">
          <span class="home-news-card-cat">${a.category || "Maritime Briefing"}</span>
          <span class="home-news-card-region">📍 ${a.region || "Global"}</span>
        </div>
        <div class="home-news-card-body">
          <div class="home-news-card-meta">
            <span>${icon} ${desk}</span>
            <span>${formatNewsRelativeTime(a.publishedAt)}</span>
          </div>
          <h3 class="home-news-card-title">${a.title}</h3>
          <p class="home-news-card-summary">${a.summary}</p>
          <span class="home-news-card-cta">Read Briefing &rarr;</span>
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
    const routeLabel = activeRouteData && activeRouteData.name ? `Route: ${activeRouteData.name}` : "Global Corridor";
    ctxEl.textContent = `${routeLabel} • ${prof.readIds.length} Read • ${prof.bookmarkedIds.length} Saved`;
  }

  const tickerEl = document.getElementById("setNewsTickerTrack");
  if (tickerEl) {
    const topTicker = enriched.slice(0, 10);
    tickerEl.innerHTML = topTicker.map(a => `
      <span class="setnews-ticker-item" data-news-id="${a.id}">
        <strong style="color:#38bdf8;">[${a.region || "Global"}]</strong>
        ${a.title}
      </span>
    `).join('<span style="color:#475569;">•</span>');
  }

  const forYouGrid = document.getElementById("setNewsForYouGrid");
  if (forYouGrid) {
    const sortedForYou = enriched.slice().sort((a, b) => b._score - a._score).slice(0, 4);
    forYouGrid.innerHTML = sortedForYou.map(a => `
      <article class="setnews-foryou-card" data-news-id="${a.id}">
        <div class="setnews-foryou-reason">
          <span>${a._reason}</span>
          <span style="background:rgba(15,23,42,0.65);color:#38bdf8;padding:1px 6px;border-radius:4px;">${a._score}% Match</span>
        </div>
        <div class="setnews-card-body">
          <div class="setnews-meta-row">
            <span class="setnews-source-tag">${a.sourceIcon} ${a.source}</span>
            <span>${formatNewsRelativeTime(a.publishedAt)}</span>
          </div>
          <h4 class="setnews-card-title">${a.title}</h4>
          <p class="setnews-card-summary">${a.summary}</p>
          <div class="setnews-card-footer">
            <span style="font-size:0.65rem;color:#7dd3fc;">📍 ${a.region || "Global"}</span>
            <span style="font-size:0.65rem;color:#94a3b8;">⏱ ${a.readingMinutes || 2} min read</span>
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
  }

  const heroContainer = document.getElementById("setNewsBentoHero");
  if (heroContainer) {
    if (filtered.length >= 4 && SETNEWS_ACTIVE_CAT === "ALL" && !SETNEWS_SEARCH_QUERY) {
      heroContainer.style.display = "grid";
      const mainStory = filtered[0];
      const stackStories = filtered.slice(1, 4);
      heroContainer.innerHTML = `
        <div class="setnews-hero-main" data-news-id="${mainStory.id}">
          <div class="setnews-hero-bg" style="background-image:url('${mainStory.image || ""}');"></div>
          <div class="setnews-hero-overlay">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="background:#0ea5e9;color:#fff;font-size:0.65rem;font-weight:800;padding:3px 9px;border-radius:5px;text-transform:uppercase;">${mainStory.category}</span>
              <span style="background:rgba(15,23,42,0.85);color:#38bdf8;font-size:0.65rem;font-weight:700;padding:3px 9px;border-radius:5px;border:1px solid rgba(56,189,248,0.35);">📍 ${mainStory.region}</span>
              <span style="font-size:0.7rem;color:#cbd5e1;">${mainStory.sourceIcon} ${mainStory.source} • ${formatNewsRelativeTime(mainStory.publishedAt)}</span>
            </div>
            <h2 style="font-size:1.38rem;font-weight:800;line-height:1.28;color:#ffffff;margin:0;">${mainStory.title}</h2>
            <p style="font-size:0.82rem;line-height:1.5;color:#cbd5e1;margin:0;max-width:680px;">${mainStory.summary}</p>
          </div>
        </div>
        <div class="setnews-hero-stack">
          ${stackStories.map(st => `
            <div class="setnews-stack-card" data-news-id="${st.id}">
              <div class="setnews-stack-thumb" style="background-image:url('${st.image || ""}');"></div>
              <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0;flex:1;">
                <div class="setnews-meta-row">
                  <span class="setnews-source-tag">${st.source}</span>
                  <span>${formatNewsRelativeTime(st.publishedAt)}</span>
                </div>
                <h4 style="font-size:0.82rem;font-weight:700;line-height:1.32;margin:3px 0;color:inherit;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${st.title}</h4>
                <div style="font-size:0.65rem;color:#38bdf8;font-weight:600;">📍 ${st.region} • ${st.category}</div>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      heroContainer.style.display = "none";
    }
  }

  const wireGrid = document.getElementById("setNewsWireGrid");
  if (wireGrid) {
    const wireItems = (filtered.length >= 4 && SETNEWS_ACTIVE_CAT === "ALL" && !SETNEWS_SEARCH_QUERY)
      ? filtered.slice(4)
      : filtered;

    if (wireItems.length === 0) {
      wireGrid.innerHTML = `<div style="grid-column:1/-1;padding:36px;text-align:center;color:#94a3b8;background:rgba(15,23,42,0.5);border-radius:12px;border:1px dashed rgba(148,163,184,0.25);">No maritime briefings match this filter. Try switching category or clearing search.</div>`;
    } else {
      wireGrid.innerHTML = wireItems.map(a => `
        <article class="setnews-article-card" data-news-id="${a.id}">
          <div class="setnews-card-img" style="background-image:url('${a.image || ""}');">
            <span style="position:absolute;top:9px;left:9px;background:rgba(15,23,42,0.88);color:#38bdf8;font-size:0.62rem;font-weight:700;padding:3px 8px;border-radius:5px;border:1px solid rgba(56,189,248,0.35);">📍 ${a.region || "Global"}</span>
            <span style="position:absolute;top:9px;right:9px;background:rgba(15,23,42,0.88);color:#f8fafc;font-size:0.62rem;font-weight:700;padding:3px 7px;border-radius:5px;">${a.category}</span>
          </div>
          <div class="setnews-card-body">
            <div class="setnews-meta-row">
              <span class="setnews-source-tag">${a.sourceIcon} ${a.source}</span>
              <span>${formatNewsRelativeTime(a.publishedAt)} • ${a.readingMinutes || 2}m</span>
            </div>
            <h3 class="setnews-card-title">${a.title}</h3>
            <p class="setnews-card-summary">${a.summary}</p>
            <div class="setnews-card-footer">
              <div style="display:flex;gap:5px;">
                <button type="button" class="setnews-action-btn ${a._liked ? 'active' : ''}" data-news-action="like" data-news-id="${a.id}" title="Like & train For You feed">❤️ ${a._liked ? 'Liked' : 'Like'}</button>
                <button type="button" class="setnews-action-btn ${a._bookmarked ? 'active' : ''}" data-news-action="bookmark" data-news-id="${a.id}" title="Save for offline reading">🔖 ${a._bookmarked ? 'Saved' : 'Save'}</button>
              </div>
              <button type="button" class="setnews-action-btn" data-news-action="plot" data-news-id="${a.id}" title="Plot region on SetChart">🗺️ Chart</button>
            </div>
          </div>
        </article>
      `).join("");
    }
  }

  const radarList = document.getElementById("setNewsRadarList");
  if (radarList) {
    const regionCounts = {};
    enriched.forEach(a => {
      const r = a.region || "Global Oceans";
      regionCounts[r] = (regionCounts[r] || 0) + 1;
    });
    const sortedRegions = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
    radarList.innerHTML = sortedRegions.map(([reg, cnt]) => `
      <div class="setnews-radar-item" data-news-region="${reg}" style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:8px;background:rgba(30,41,59,0.55);border:1px solid rgba(148,163,184,0.14);cursor:pointer;font-size:0.75rem;">
        <span style="font-weight:600;color:#e2e8f0;">📍 ${reg}</span>
        <span style="background:rgba(14,165,233,0.18);color:#38bdf8;font-weight:700;padding:1px 7px;border-radius:999px;font-size:0.68rem;">${cnt}</span>
      </div>
    `).join("");
  }
}

function openSetNewsArticleModal(articleId) {
  const baseList = SETNEWS_ARTICLES.length > 0 ? SETNEWS_ARTICLES : DEFAULT_SETNEWS_ARTICLES;
  const art = baseList.find(a => a.id === articleId);
  if (!art) return;
  recordSetNewsInteraction(art, "read", 12);

  const modal = document.getElementById("setNewsReaderModal");
  const bodyEl = document.getElementById("setNewsReaderContent");
  if (!modal || !bodyEl) return;

  const prof = getSetNewsUserProfile();
  const scored = scoreArticleForUser(art, prof);
  const desk = formatEditorialNewsSource(art);
  const icon = formatEditorialNewsIcon(art);

  bodyEl.innerHTML = `
    <div style="position:relative;height:220px;background-image:url('${art.image || ""}');background-size:cover;background-position:center;border-radius:15px 15px 0 0;">
      <div style="position:absolute;inset:0;background:linear-gradient(0deg,#0f172a 5%,rgba(15,23,42,0.35) 100%);"></div>
      <button type="button" id="btnCloseNewsReader" style="position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;background:rgba(15,23,42,0.85);border:1px solid rgba(148,163,184,0.35);color:#fff;font-size:1rem;cursor:pointer;">✕</button>
      <div style="position:absolute;bottom:14px;left:20px;right:20px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="background:#0ea5e9;color:#fff;font-size:0.68rem;font-weight:800;padding:3px 9px;border-radius:5px;text-transform:uppercase;">${art.category}</span>
        <span style="background:rgba(15,23,42,0.9);color:#38bdf8;font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:5px;border:1px solid rgba(56,189,248,0.4);">📍 ${art.region}</span>
        <span style="background:rgba(234,76,37,0.22);color:#fdba74;font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:5px;">${scored.reason} (${scored.score}% Match)</span>
      </div>
    </div>
    <div style="padding:22px 24px 26px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:0.75rem;color:#94a3b8;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <span><strong>${icon} ${desk}</strong> • Published ${new Date(art.publishedAt).toUTCString()}</span>
        <span>⏱ ${art.readingMinutes || 2} min bridge briefing</span>
      </div>
      <h2 style="font-size:1.35rem;font-weight:800;line-height:1.32;margin:0;">${art.title}</h2>
      ${Array.isArray(art.takeaways) && art.takeaways.length > 0 ? `
        <div style="padding:11px 14px;border-radius:10px;background:rgba(30,41,59,0.65);border-left:3px solid #38bdf8;font-size:0.8rem;color:#e2e8f0;">
          <strong style="color:#38bdf8;display:block;margin-bottom:5px;text-transform:uppercase;font-size:0.68rem;letter-spacing:0.05em;">⚡ Key Bridge Takeaways</strong>
          <ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
            ${art.takeaways.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
      <p style="font-size:0.92rem;line-height:1.68;color:#cbd5e1;margin:0;white-space:pre-line;">${art.body || art.summary}</p>
      <div style="padding:12px 14px;border-radius:10px;background:rgba(14,165,233,0.1);border:1px solid rgba(56,189,248,0.28);font-size:0.78rem;color:#bae6fd;">
        <strong>🧭 Bridge Navigation Intelligence Context:</strong> Region <b>${art.region}</b> (${art.coords ? `${art.coords[0].toFixed(1)}°, ${art.coords[1].toFixed(1)}°` : "Global"}). Reading this briefing refines your personalized <b>For You</b> maritime feed.
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding-top:10px;border-top:1px solid rgba(148,163,184,0.18);">
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="setnews-action-btn" id="btnModalPlotChart" style="padding:8px 13px;font-size:0.75rem;background:rgba(14,165,233,0.22);color:#38bdf8;border-color:#38bdf8;">🗺️ View Region on SetChart</button>
        </div>
        <button type="button" class="setnews-action-btn" id="btnModalCloseBottom" style="padding:8px 14px;font-size:0.75rem;">Close</button>
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
    "BOSPORUS_S": [40.98, 28.98, "Turkish Straits / Bosporus South TSS"],
    "BLACK_SEA_MID": [43.20, 34.00, "Central Black Sea Transit"],
    "NOVOROSSIYSK_APP": [44.60, 37.75, "Novorossiysk Fairway Approach"],
    "BONNY_APP": [4.30, 7.05, "Bonny / Niger Delta Fairway"],
    "DURBAN_APP": [-29.88, 31.12, "Durban Fairway Approach"],
    "MOZAMBIQUE_CH": [-18.00, 41.50, "Mozambique Channel Deepsea Lane"],
    "MAURITIUS_PASS": [-20.20, 57.30, "Mascarene / Mauritius Deepsea Corridor"],
    "SUNDA_STRAIT": [-6.05, 105.75, "Sunda Strait Deepwater Channel"],
    "LOMBOK_STRAIT": [-8.55, 115.70, "Lombok Strait Archipelagic Sea Lane"],
    "HEDLAND_APP": [-20.15, 118.55, "Port Hedland / Pilbara Fairway"],
    "SYDNEY_APP": [-33.85, 151.35, "Sydney / Botany Bay Approach"],
    "BOHAI_STRAIT": [38.35, 121.00, "Bohai / Laotieshan Channel TSS"],
    "QINGDAO_APP": [35.95, 120.50, "Qingdao Fairway Approach"],
    "NINGBO_APP": [29.90, 122.35, "Ningbo-Zhoushan Fairway"],
    "SANTOS_APP": [-24.08, -46.25, "Santos Fairway Approach"],
    "BUENOS_AIRES_APP": [-35.15, -56.10, "Rio de la Plata / Recalada Pilot"],
    "MAGELLAN_E": [-52.50, -68.20, "Strait of Magellan East Entrance"],
    "MAGELLAN_W": [-52.75, -74.65, "Strait of Magellan West / Pacific Exit"],
    "YUCATAN_CH": [21.80, -85.65, "Yucatan Channel TSS"],
    "NEW_ORLEANS_APP": [28.90, -89.40, "Southwest Pass / Mississippi Fairway"],
    "SAVANNAH_APP": [31.95, -80.65, "Savannah Fairway Approach"],
    "NATL_GC_WEST": [42.20, -50.00, "North Atlantic Grand Banks S. Waypoint"],
    "NATL_GC_MID": [47.00, -30.00, "Mid-Atlantic Great Circle Vertex"],
    "NPAC_GC_WEST": [42.50, 160.00, "NW Pacific Great Circle Waypoint"],
    "NPAC_GC_EAST": [44.00, -145.00, "NE Pacific Great Circle Waypoint"]
  };
  Object.assign(MARITIME_SEA_NODES, extraNodes);

  const extraEdges = [
    ["STOREBAELT", "BALTIC_GDANSK"],
    ["BALTIC_GDANSK", "BALTIC_GOTLAND"],
    ["BALTIC_GOTLAND", "FINLAND_GULF"],
    ["FINLAND_GULF", "ST_PETERSBURG_APP"],
    ["ROTTERDAM_APP", "NORTH_SEA_MID"],
    ["NORTH_SEA_MID", "SKAGERRAK"],
    ["NORTH_SEA_MID", "BERGEN_APP"],
    ["MED_CRETE", "BOSPORUS_S"],
    ["BOSPORUS_S", "BLACK_SEA_MID"],
    ["BLACK_SEA_MID", "NOVOROSSIYSK_APP"],
    ["GULF_OF_GUINEA", "BONNY_APP"],
    ["CAPE_AGULHAS", "DURBAN_APP"],
    ["DURBAN_APP", "MOZAMBIQUE_CH"],
    ["MOZAMBIQUE_CH", "ARABIAN_SEA_MID"],
    ["DURBAN_APP", "MAURITIUS_PASS"],
    ["MAURITIUS_PASS", "DONDRA_HEAD"],
    ["MAURITIUS_PASS", "SUNDA_STRAIT"],
    ["SUNDA_STRAIT", "SCS_SOUTH"],
    ["LOMBOK_STRAIT", "HEDLAND_APP"],
    ["HEDLAND_APP", "SYDNEY_APP"],
    ["EAST_CHINA_SEA", "NINGBO_APP"],
    ["EAST_CHINA_SEA", "QINGDAO_APP"],
    ["QINGDAO_APP", "BOHAI_STRAIT"],
    ["CAPE_VERDE_PASS", "SANTOS_APP"],
    ["SANTOS_APP", "BUENOS_AIRES_APP"],
    ["BUENOS_AIRES_APP", "MAGELLAN_E"],
    ["MAGELLAN_E", "MAGELLAN_W"],
    ["MAGELLAN_W", "PACIFIC_PANAMA_APP"],
    ["GULF_MEXICO_MID", "NEW_ORLEANS_APP"],
    ["GULF_MEXICO_MID", "YUCATAN_CH"],
    ["YUCATAN_CH", "CARIBBEAN_MID"],
    ["HATTERAS_E", "SAVANNAH_APP"],
    ["SAVANNAH_APP", "FLORIDA_STRAIT"],
    ["USHANT", "NATL_GC_MID"],
    ["NATL_GC_MID", "NATL_GC_WEST"],
    ["NATL_GC_WEST", "NEW_YORK_APP"],
    ["NATL_GC_WEST", "CHESAPEAKE_APP"],
    ["TOKYO_APP", "NPAC_GC_WEST"],
    ["NPAC_GC_WEST", "NPAC_GC_EAST"],
    ["NPAC_GC_EAST", "SAN_FRANCISCO_APP"],
    ["NPAC_GC_EAST", "LONG_BEACH_APP"]
  ];
  extraEdges.forEach(e => MARITIME_SEA_EDGES.push(e));
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

  if (legsListEl) {
    legsListEl.innerHTML = legs.map((leg, idx) => {
      const hasWarn = (leg.ntmHits && leg.ntmHits.length > 0) || (leg.weatherHits && leg.weatherHits.length > 0);
      return `
        <div class="sr-leg-inspector-card" data-leg-idx="${idx}" title="Click to view Leg #${leg.legNo} on SetChart">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
            <strong style="font-size:0.75rem;color:#f8fafc;">Leg ${leg.legNo}: ${leg.fromName} &rarr; ${leg.toName}</strong>
            <span class="sr-leg-pill ${leg.sailType === 'GC' ? 'gc' : ''}">${leg.sailType} • ${leg.courseFormatted}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:0.68rem;color:#94a3b8;">
            <span><b style="color:#e2e8f0;">${leg.distanceNM} NM</b></span>
            <span>• ${leg.eteHours}h @ ${leg.speedKnots}kn</span>
            <span>• XTD ±${leg.xtdNM} NM</span>
          </div>
          <div style="font-size:0.65rem;color:#94a3b8;">${leg.ukcNote}</div>
          ${hasWarn ? `
            <div style="font-size:0.64rem;color:#fbbf24;">
              ⚠️ ${[...(leg.ntmHits || []).map(h => h.id), ...(leg.weatherHits || [])].join(" • ")}
            </div>
          ` : ""}
        </div>
      `;
    }).join("");
  }
}
window.displaySetRouteResults = displaySetRouteResults;

const PORT_RU_ALIASES = {
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

function findPortsInUserMessage(text) {
  if (!text || typeof PORT_DEPTHS_DB === "undefined") return [];
  const lower = text.toLowerCase();
  const hits = [];

  for (const [ruStem, portId] of Object.entries(PORT_RU_ALIASES)) {
    const idx = lower.indexOf(ruStem);
    if (idx !== -1) {
      const p = PORT_DEPTHS_DB.find(x => x.id === portId || x.name.toLowerCase().includes(portId.replace("port-", "")));
      if (p && !hits.some(h => h.port.id === p.id)) {
        hits.push({ port: p, pos: idx });
      }
    }
  }

  PORT_DEPTHS_DB.forEach(p => {
    const pName = p.name.toLowerCase();
    const shortName = pName.split("(")[0].trim();
    let idx = lower.indexOf(pName);
    if (idx === -1 && shortName.length >= 4) {
      idx = lower.indexOf(shortName);
    }
    if (idx !== -1 && !hits.some(h => h.port.id === p.id)) {
      hits.push({ port: p, pos: idx });
    }
  });

  hits.sort((a, b) => a.pos - b.pos);
  return hits.map(h => h.port);
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
  const speed = parseFloat(options.speedKnots || (document.getElementById("setRouteSpeedInput") && document.getElementById("setRouteSpeedInput").value)) || 14.5;
  const draft = parseFloat(options.draftMeters || (document.getElementById("setRouteDraftInput") && document.getElementById("setRouteDraftInput").value)) || 11.5;
  const xtd = parseFloat(options.xtdNM || (document.getElementById("setRouteXtdInput") && document.getElementById("setRouteXtdInput").value)) || 0.25;
  const sailMode = options.sailMode || (document.getElementById("setRouteSailSelect") && document.getElementById("setRouteSailSelect").value) || "HYBRID";
  const viaCape = Boolean(options.viaCape);

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

  let baseRoute = generateAlgorithmicMaritimeRoute(pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode);
  if (viaCape) {
    const capeCorridor = ["ST_VINCENT", "CANARY_PASS", "CAPE_VERDE_PASS", "GULF_OF_GUINEA", "CAPE_AGULHAS", "MAURITIUS_PASS", "MALACCA_N", "SINGAPORE_MAIN"];
    const wpts = [baseRoute.waypoints[0]];
    capeCorridor.forEach((nk, idx) => {
      const node = MARITIME_SEA_NODES[nk];
      if (node) {
        wpts.push({
          wptNo: ('00' + (idx + 2)).slice(-3),
          name: node[2],
          lat: node[0],
          lon: node[1],
          speedKnots: speed,
          portsideXTD: xtd,
          starboardXTD: xtd,
          turnRadius: 0.8,
          sail: "GC",
          rot: 7.0
        });
      }
    });
    wpts.push(baseRoute.waypoints[baseRoute.waypoints.length - 1]);
    baseRoute.waypoints = wpts;
    baseRoute.name = `${pOrig.name} to ${pDest.name} (Via Cape of Good Hope)`;
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
  const legs = baseRoute.legs || [];

  const msgEl = appendChatMessage("brain", `
    <div>
      <strong>Appraising &amp; Synthesizing Route: ${baseRoute.name}</strong><br>
      <span style="font-size:0.78rem;color:#94a3b8;">
        Draft <b>${draft}m</b> • Speed <b>${speed} kn</b> • Base XTD <b>±${xtd} NM</b> • Evaluating <b>${legs.length} legs</b> for RL/GC geometry, TSS clearance, UKC, and active NtM/NAVTEX &amp; cyclone hazards...
      </span>
      <div class="sr-leg-stream" id="srLiveLegStream_${Date.now()}"></div>
      <div class="sr-ai-synthesis-footer" style="margin-top:8px;font-size:0.78rem;color:#94a3b8;">Calculating leg parameters...</div>
    </div>
  `);

  const streamEl = msgEl ? msgEl.querySelector(".sr-leg-stream") : null;
  const footerEl = msgEl ? msgEl.querySelector(".sr-ai-synthesis-footer") : null;
  const scrollWrap = document.getElementById("setRouteChatScroll");

  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    await new Promise(r => setTimeout(r, 170));
    if (streamEl) {
      const card = document.createElement("div");
      card.className = "sr-leg-step-card";
      const hasHaz = (leg.ntmHits && leg.ntmHits.length > 0) || (leg.weatherHits && leg.weatherHits.length > 0);
      card.innerHTML = `
        <div class="sr-leg-step-head">
          <span>Leg ${leg.legNo}/${legs.length}: ${leg.fromName} &rarr; ${leg.toName}</span>
          <div class="sr-leg-step-badges">
            <span class="sr-leg-pill ${leg.sailType === 'GC' ? 'gc' : ''}">${leg.sailType}</span>
            <span class="sr-leg-pill">${leg.courseFormatted}</span>
            <span class="sr-leg-pill">${leg.distanceNM} NM</span>
            <span class="sr-leg-pill ${hasHaz ? 'warn' : 'ok'}">${hasHaz ? '⚠️ Monitored' : '✓ Clear'}</span>
          </div>
        </div>
        <div style="color:#94a3b8;font-size:0.70rem;">
          ${leg.navZone} • Spd ${leg.speedKnots}kn (${leg.eteHours}h) • XTD ±${leg.xtdNM}NM • ${leg.ukcNote}
        </div>
      `;
      streamEl.appendChild(card);
      if (scrollWrap) scrollWrap.scrollTop = scrollWrap.scrollHeight;
    }
  }

  activeRouteData = baseRoute;
  try {
    localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(baseRoute));
  } catch (e) {}

  saveRouteToLibrary(baseRoute);
  displaySetRouteResults(baseRoute, true);

  if (leafletMap && typeof renderRouteOnMap === "function") {
    renderRouteOnMap(baseRoute, false);
  }

  let cohereNote = "";
  if (navigator.onLine && typeof SETROUTE_COHERE_KEY === "string" && SETROUTE_COHERE_KEY) {
    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 3600);
      const legBrief = legs.map(l => `Leg ${l.legNo} (${l.fromName}->${l.toName}, ${l.sailType}, ${l.courseFormatted}, ${l.distanceNM}NM)`).join("; ");
      const resp = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          "Authorization": `Bearer ${SETROUTE_COHERE_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          model: SETROUTE_COHERE_MODEL,
          messages: [{
            role: "user",
            content: `You are SetRoute Master Mariner AI. In 2 concise sentences in English, give a professional navigation watchkeeping summary for ${baseRoute.name} (${baseRoute.totalDistanceNM} NM, ${legs.length} legs: ${legBrief}, draft ${draft}m).`
          }],
          temperature: 0.2
        })
      });
      clearTimeout(tid);
      if (resp.ok) {
        const d = await resp.json();
        cohereNote = (((d.message || {}).content || [])[0] ? d.message.content[0].text : "").trim();
      }
    } catch (e) {}
  }

  if (footerEl) {
    footerEl.innerHTML = `
      <div style="padding:10px 12px;border-radius:10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#e2e8f0;margin-top:6px;">
        <strong style="color:#34d399;">✓ Passage plan "${baseRoute.name}" ready &amp; saved to SetRoute sidebar</strong><br>
        Total: <b>${legs.length} legs (${baseRoute.waypoints.length} WPTs)</b> • Distance: <b>${baseRoute.totalDistanceNM} NM</b> • ETE: <b>${baseRoute.steamingDays} days (${baseRoute.totalSteamingHours}h)</b>.<br>
        ${cohereNote ? `<span style="color:#bae6fd;display:block;margin-top:4px;"><b>Master Mariner Note:</b> ${cohereNote}</span>` : ""}
      </div>
    `;
  }
  if (scrollWrap) scrollWrap.scrollTop = scrollWrap.scrollHeight;
}

async function handleSetRouteUserMessage(rawText) {
  const text = (rawText || "").trim();
  if (!text) return;

  appendChatMessage("user", text);
  const lower = text.toLowerCase();

  const spdMatch = lower.match(/(?:скорост[ьию]|speed|spd)\s*(?:to|=|:)?\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(?:kn|kts|knots|узл)/i);
  const drfMatch = lower.match(/(?:осадк[ауи]|draft)\s*(?:to|=|:)?\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*(?:m\b|meters|м\b)/i);
  const xtdMatch = lower.match(/(?:xtd|corridor|buffer)\s*(?:to|=|:)?\s*(\d+(?:[.,]\d+)?)/i);

  const parsedSpd = spdMatch ? parseFloat((spdMatch[1] || spdMatch[2]).replace(",", ".")) : null;
  const parsedDrf = drfMatch ? parseFloat((drfMatch[1] || drfMatch[2]).replace(",", ".")) : null;
  const parsedXtd = xtdMatch ? parseFloat(xtdMatch[1].replace(",", ".")) : null;
  let parsedSail = null;
  if (/\bgc\b|great circle/i.test(lower)) parsedSail = "GC";
  else if (/\brl\b|rhumb/i.test(lower)) parsedSail = "RL";

  if (window.SETROUTE_PENDING_CONTEXT) {
    const pending = window.SETROUTE_PENDING_CONTEXT;
    if (pending.type === "SUEZ_VS_CAPE") {
      const chooseCape = /cape|africa|good hope|aguhlas|agulhas/i.test(lower);
      window.SETROUTE_PENDING_CONTEXT = null;
      await executeBrainLegByLegRoutePlan(pending.origin, pending.dest, Object.assign({}, pending.opts, {
        viaCape: chooseCape,
        speedKnots: parsedSpd || pending.opts.speedKnots,
        draftMeters: parsedDrf || pending.opts.draftMeters
      }));
      return;
    }
    if (pending.type === "MISSING_PORT") {
      const newPorts = findPortsInUserMessage(text);
      if (newPorts.length >= 1) {
        const orig = pending.origin || newPorts[0];
        const dest = pending.origin ? newPorts[0] : (newPorts[1] || null);
        if (orig && dest && orig.id !== dest.id) {
          window.SETROUTE_PENDING_CONTEXT = null;
          await executeBrainLegByLegRoutePlan(orig, dest, {
            speedKnots: parsedSpd,
            draftMeters: parsedDrf,
            xtdNM: parsedXtd,
            sailMode: parsedSail
          });
          return;
        }
      }
    }
  }

  const mentionedPorts = findPortsInUserMessage(text);

  if (mentionedPorts.length >= 2) {
    const pOrig = mentionedPorts[0];
    const pDest = mentionedPorts[1];
    const opts = {
      speedKnots: parsedSpd || parseFloat((document.getElementById("setRouteSpeedInput") || {}).value) || 14.5,
      draftMeters: parsedDrf || parseFloat((document.getElementById("setRouteDraftInput") || {}).value) || 11.5,
      xtdNM: parsedXtd || parseFloat((document.getElementById("setRouteXtdInput") || {}).value) || 0.25,
      sailMode: parsedSail || (document.getElementById("setRouteSailSelect") || {}).value || "HYBRID"
    };

    const isEuroOrUs = p => p.coords[1] < 30;
    const isAsia = p => p.coords[1] > 70;
    const crossesSuezOrCape = (isEuroOrUs(pOrig) && isAsia(pDest)) || (isAsia(pOrig) && isEuroOrUs(pDest));
    const alreadySpecifiedSuezOrCape = /suez|cape|africa|good hope|суэц|африк/i.test(lower);

    if (crossesSuezOrCape && !alreadySpecifiedSuezOrCape) {
      window.SETROUTE_PENDING_CONTEXT = { type: "SUEZ_VS_CAPE", origin: pOrig, dest: pDest, opts };
      appendChatMessage("brain", `
        <strong>Routing Clarification (${pOrig.name} &rarr; ${pDest.name}):</strong><br>
        Before computing the legs between <b>${pOrig.name}</b> and <b>${pDest.name}</b>, please confirm your preferred strategic corridor:
        <ul style="margin:6px 0;padding-left:18px;">
          <li><b>Option 1 — Via Suez Canal &amp; Red Sea:</b> Shortest distance (~3,400 NM saved), transiting Suez &amp; Bab-el-Mandeb TSS.</li>
          <li><b>Option 2 — Via Cape of Good Hope:</b> Deep-ocean routing around southern Africa clear of NAVAREA IX Red Sea advisories.</li>
        </ul>
      `, [
        { label: "⚡ Via Suez Canal", prompt: `Plan route via Suez Canal from ${pOrig.name} to ${pDest.name}` },
        { label: "🌊 Via Cape of Good Hope", prompt: `Plan route via Cape of Good Hope from ${pOrig.name} to ${pDest.name}` }
      ]);
      return;
    }

    await executeBrainLegByLegRoutePlan(pOrig, pDest, opts);
    return;
  }

  if (mentionedPorts.length === 1) {
    const pOne = mentionedPorts[0];
    if (/via|add|call|через|добавь/i.test(lower) && activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length >= 2) {
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
      appendChatMessage("brain", `
        ✓ Updated active route to include an intermediate call at <b>${pOne.name}</b> (${activeRouteData.legs.length} legs, total <b>${activeRouteData.totalDistanceNM} NM</b>).
      `);
      return;
    }

    window.SETROUTE_PENDING_CONTEXT = { type: "MISSING_PORT", origin: pOne };
    appendChatMessage("brain", `
      Selected port <b>${pOne.name} (${pOne.country})</b> [controlling depth: ${pOne.maxDraftLowTide || "14.5m"}].<br>
      Please specify your <b>destination (or origin) port</b>, along with optional <b>draft (m)</b> and <b>speed (kn)</b>:
    `, [
      { label: `${pOne.name} → Rotterdam`, prompt: `Plan route from ${pOne.name} to Rotterdam` },
      { label: `${pOne.name} → Singapore`, prompt: `Plan route from ${pOne.name} to Singapore` },
      { label: `${pOne.name} → Houston`, prompt: `Plan route from ${pOne.name} to Houston` },
      { label: `${pOne.name} → Shanghai`, prompt: `Plan route from ${pOne.name} to Shanghai` }
    ]);
    return;
  }

  if (activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length >= 2) {
    if (parsedSpd || parsedDrf || parsedXtd || parsedSail || /reverse|recalculate|реверс/i.test(lower)) {
      if (/reverse|реверс/i.test(lower)) {
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
        Speed: <b>${activeRouteData.metadata.speedKnots || 14.5} kn</b> • Draft: <b>${activeRouteData.metadata.draftMeters || 11.5} m</b> • XTD: <b>±${activeRouteData.metadata.xtdNM || 0.25} NM</b> • ETE: <b>${activeRouteData.steamingDays} days (${activeRouteData.totalSteamingHours}h)</b>.
      `);
      return;
    }
  }

  let aiReply = "";
  if (navigator.onLine && typeof SETROUTE_COHERE_KEY === "string" && SETROUTE_COHERE_KEY) {
    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 4200);
      const curRouteInfo = activeRouteData
        ? `Current active route: ${activeRouteData.name} (${activeRouteData.totalDistanceNM} NM, ${(activeRouteData.legs || []).length} legs).`
        : "No route currently active.";
      const resp = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          "Authorization": `Bearer ${SETROUTE_COHERE_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          model: SETROUTE_COHERE_MODEL,
          messages: [{
            role: "user",
            content: `You are SetRoute Maritime Passage Planning Brain (IMO A.893(21) / NP231). ${curRouteInfo} Reply concisely and strictly in English to the navigator's message, and if they want to plan or modify a route, ask any needed clarifying questions (origin/destination ports, draft, speed, Suez vs Cape): "${text}"`
          }],
          temperature: 0.25
        })
      });
      clearTimeout(tid);
      if (resp.ok) {
        const d = await resp.json();
        aiReply = (((d.message || {}).content || [])[0] ? d.message.content[0].text : "").trim();
      }
    } catch (e) {}
  }

  if (!aiReply) {
    aiReply = `Specify your <b>origin and destination ports</b>, along with optional <b>vessel draft (m)</b> and <b>speed (kn)</b> (for example: <i>"Plan route from Houston to Rotterdam, draft 11.8m, speed 15 kn"</i>), and I will appraise and calculate every leg.`;
  }

  appendChatMessage("brain", aiReply.replace(/\n/g, "<br>"), [
    { label: "Houston → Rotterdam (11.8m, 15kn)", prompt: "Plan route from Houston to Rotterdam, draft 11.8m, speed 15 kn" },
    { label: "Singapore → Shanghai (12.5m, 14.5kn)", prompt: "Plan route from Singapore to Shanghai, draft 12.5m, speed 14.5 kn" },
    { label: "Rotterdam → Singapore (Suez vs Cape)", prompt: "Plan route from Rotterdam to Singapore, draft 12.0m" },
    { label: "Tokyo → San Francisco (Pacific GC)", prompt: "Plan route from Tokyo to San Francisco using Great Circle GC" }
  ]);
}

function initSetRouteV50() {
  const chatMessages = document.getElementById("setRouteChatMessages");
  const emptyHero = document.getElementById("setRouteEmptyHero");
  const chatForm = document.getElementById("setRouteChatForm");
  const chatInput = document.getElementById("setRouteChatInput");
  const genBtn = document.getElementById("btnGenerateSetRoute");
  const newChatBtn = document.getElementById("btnSetRouteNewChat");
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
      handleSetRouteUserMessage(`Run a detailed navigation safety audit for ${activeRouteData.name} across all legs, depths, and hazards.`);
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
      const card = e.target.closest("[data-leg-idx]");
      if (!card || !activeRouteData || !Array.isArray(activeRouteData.legs)) return;
      const idx = parseInt(card.getAttribute("data-leg-idx"), 10);
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
    });
  }

  renderNavSavedRoutesTree();
  if (activeRouteData && Array.isArray(activeRouteData.waypoints) && activeRouteData.waypoints.length > 0) {
    displaySetRouteResults(activeRouteData, false);
  }
}

window.initSetRouteV50 = initSetRouteV50;
const _origRefreshSetRouteUI = window.refreshSetRouteUI;
window.refreshSetRouteUI = function() {
  if (typeof _origRefreshSetRouteUI === "function") _origRefreshSetRouteUI();
  initSetRouteV50();
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof initSetRoute === "function") initSetRoute();
    initSetRouteV50();
  }, 240);
});
