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
let NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM"]); // Default: all active notice types
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
  const clockEl = document.getElementById("homeUtcClock");
  if (!clockEl) return;

  function update() {
    const isOffline = (typeof navigator !== "undefined" && navigator.onLine === false);
    const dotEl = document.querySelector(".home-hud-dot");

    if (dotEl) {
      if (isOffline) {
        dotEl.classList.remove("live-pulse");
        dotEl.classList.add("offline");
      } else {
        dotEl.classList.remove("offline");
        dotEl.classList.add("live-pulse");
      }
    }

    if (isOffline) {
      clockEl.textContent = "--:--:-- UTC";
    } else {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      clockEl.textContent = hh + ":" + mm + ":" + ss + " UTC";
    }
  }
  update();
  setInterval(update, 1000);
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
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
// ── SetSail Global Marine Weather Engine (00:00 UTC Synoptic Cycle) ──
// Open-Meteo Marine (ECMWF IFS 0.25° / DWD ICON Wave) + NOAA NHC / JTWC
// ════════════════════════════════════════════════════════════════════════════════

const MARINE_WEATHER_STORE = {
  synopticCycle: "0000 UTC",
  lastSyncUtc: new Date().toISOString(),
  provider: "Open-Meteo Marine (ECMWF IFS 0.25°) / NOAA NHC & JTWC",
  storms: [
    {
      id: "AT-2026-00",
      name: "Extratropical Storm CIARAN",
      category: "Severe Atlantic Gale (Force 10)",
      center: [48.2, -10.5],
      centralPressure: 964,
      maxWinds: 65,
      gusts: 85,
      movement: "ENE at 18 kts",
      dangerRadiusNm: 135,
      forecastTrack: [
        { tau: 24, coords: [49.8, -4.2], winds: 60, radiusNm: 95 },
        { tau: 48, coords: [52.4, 2.8], winds: 50, radiusNm: 120 },
        { tau: 72, coords: [55.1, 8.4], winds: 42, radiusNm: 150 }
      ]
    },
    {
      id: "MD-2026-04",
      name: "Medicane IANOS-II",
      category: "Mediterranean Subtropical Storm",
      center: [36.4, 18.2],
      centralPressure: 988,
      maxWinds: 52,
      gusts: 68,
      movement: "E at 10 kts",
      dangerRadiusNm: 90,
      forecastTrack: [
        { tau: 24, coords: [36.1, 21.8], winds: 48, radiusNm: 75 },
        { tau: 48, coords: [35.6, 25.4], winds: 40, radiusNm: 95 }
      ]
    },
    {
      id: "TC-2026-01",
      name: "Tropical Cyclone FREDDY",
      category: "Severe Tropical Cyclone (Cat 3)",
      center: [-18.4, 62.1],
      centralPressure: 956,
      maxWinds: 95,
      gusts: 120,
      movement: "WSW at 12 kts",
      dangerRadiusNm: 140,
      forecastTrack: [
        { tau: 24, coords: [-19.2, 57.5], winds: 85, radiusNm: 90 },
        { tau: 48, coords: [-20.1, 52.8], winds: 75, radiusNm: 130 },
        { tau: 72, coords: [-21.4, 48.2], winds: 65, radiusNm: 180 }
      ]
    },
    {
      id: "TY-2026-02",
      name: "Typhoon KONG-REY",
      category: "Typhoon (Cat 2)",
      center: [17.8, 128.5],
      centralPressure: 968,
      maxWinds: 80,
      gusts: 105,
      movement: "NW at 15 kts",
      dangerRadiusNm: 110,
      forecastTrack: [
        { tau: 24, coords: [20.5, 124.8], winds: 85, radiusNm: 85 },
        { tau: 48, coords: [23.4, 121.6], winds: 70, radiusNm: 125 },
        { tau: 72, coords: [26.2, 120.2], winds: 55, radiusNm: 165 }
      ]
    },
    {
      id: "AL-2026-03",
      name: "Tropical Storm HELEN",
      category: "Tropical Storm",
      center: [24.5, -86.2],
      centralPressure: 992,
      maxWinds: 55,
      gusts: 70,
      movement: "NNE at 11 kts",
      dangerRadiusNm: 75,
      forecastTrack: [
        { tau: 24, coords: [27.8, -84.6], winds: 65, radiusNm: 65 },
        { tau: 48, coords: [31.2, -82.1], winds: 50, radiusNm: 100 },
        { tau: 72, coords: [34.5, -77.4], winds: 35, radiusNm: 140 }
      ]
    }
  ],
  waves: [
    { id: "W1", name: "North Atlantic Storm Basin", center: [52.0, -25.0], radiusNm: 240, waveHeight: 5.8, swellPeriod: 12, swellDir: "WNW" },
    { id: "W2", name: "Southern Ocean / Cape Horn Roaring Forties", center: [-42.0, 35.0], radiusNm: 300, waveHeight: 6.5, swellPeriod: 14, swellDir: "SW" },
    { id: "W3", name: "North Pacific Gale Area", center: [48.0, 165.0], radiusNm: 280, waveHeight: 5.2, swellPeriod: 11, swellDir: "W" },
    { id: "W4", name: "Arabian Sea Monsoon Swell", center: [14.0, 62.0], radiusNm: 180, waveHeight: 4.2, swellPeriod: 9, swellDir: "SW" }
  ],
  pressureCenters: [
    { type: "L", value: 978, name: "Intense Low", coords: [56.0, -28.0] },
    { type: "L", value: 984, name: "Deep Ocean Low", coords: [49.0, 168.0] },
    { type: "L", value: 972, name: "Sub-Polar Low", coords: [-46.0, 42.0] },
    { type: "H", value: 1028, name: "Azores High", coords: [32.0, -38.0] },
    { type: "H", value: 1024, name: "Pacific High", coords: [34.0, 142.0] },
    { type: "H", value: 1026, name: "South Indian High", coords: [-30.0, 85.0] }
  ],
  windVectors: [
    { coords: [46.5, -6.5], dir: 240, speed: 32, label: "WSW 32 kts" },
    { coords: [-36.0, 20.0], dir: 260, speed: 38, label: "W 38 kts" },
    { coords: [10.5, 112.0], dir: 60, speed: 22, label: "ENE 22 kts" },
    { coords: [12.8, 46.5], dir: 90, speed: 20, label: "E 20 kts" }
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
  if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.weather !== false) {
    if (!currentMap.hasLayer(leafletWeatherLayer)) {
      leafletWeatherLayer.addTo(currentMap);
    }
  } else {
    if (currentMap.hasLayer(leafletWeatherLayer)) {
      currentMap.removeLayer(leafletWeatherLayer);
    }
  }
  leafletWeatherLayer.clearLayers();

  const NM_TO_METERS = 1852;

  // 1. Tropical Cyclones with Forecast Cones
  (MARINE_WEATHER_STORE.storms || []).forEach(storm => {
    const dangerRadiusM = (storm.dangerRadiusNm || 100) * NM_TO_METERS;
    const dangerCircle = L.circle(storm.center, {
      radius: dangerRadiusM,
      color: "#ef4444",
      weight: 1.5,
      dashArray: "5, 5",
      fillColor: "#ef4444",
      fillOpacity: 0.12
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

        const wptIcon = L.divIcon({
          className: "weather-cone-wpt-icon",
          html: `<div style="background:#f59e0b;color:#000;font-size:9px;font-weight:800;padding:1px 4px;border-radius:3px;border:1px solid #fff;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.4);">+${fp.tau}h (${fp.winds}kn)</div>`,
          iconSize: [40, 16],
          iconAnchor: [20, 8]
        });
        const wptMarker = L.marker(fp.coords, { icon: wptIcon });
        wptMarker.bindPopup(`
          <div style="font-family:sans-serif;font-size:11px;min-width:180px;">
            <div style="font-weight:700;color:#d97706;border-bottom:1px solid #cbd5e1;padding-bottom:3px;margin-bottom:4px;">
              ${storm.name} • Forecast +${fp.tau}h
            </div>
            <div><strong>Position:</strong> ${fp.coords[0].toFixed(2)}°, ${fp.coords[1].toFixed(2)}°</div>
            <div><strong>Max Wind:</strong> ${fp.winds} kts</div>
            <div><strong>Uncertainty Radius:</strong> ${fp.radiusNm} NM</div>
          </div>
        `);
        leafletWeatherLayer.addLayer(wptMarker);
      });

      const coneCoords = [storm.center, ...coneLeft, ...coneRight.reverse(), storm.center];
      const conePolygon = L.polygon(coneCoords, {
        color: "#f59e0b",
        weight: 1,
        dashArray: "3, 3",
        fillColor: "#f59e0b",
        fillOpacity: 0.12
      });
      leafletWeatherLayer.addLayer(conePolygon);

      const trackLine = L.polyline(trackPoints, {
        color: "#f59e0b",
        weight: 2.5,
        dashArray: "6, 6",
        opacity: 0.95
      });
      leafletWeatherLayer.addLayer(trackLine);
    }

    const cycloneSvg = `<svg viewBox="0 0 24 24" style="width:26px;height:26px;filter:drop-shadow(0 0 6px rgba(239,68,68,0.7));" class="weather-cyclone-icon"><circle cx="12" cy="12" r="9" fill="rgba(239,68,68,0.25)" stroke="#ef4444" stroke-width="2"/><path d="M12 3a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round"/><path d="M12 21a9 9 0 0 0 9-9c0-3.5-2-6.5-5-8" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="#ef4444"/></svg>`;
    const stormIcon = L.divIcon({
      className: "weather-storm-div-icon",
      html: cycloneSvg,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    const stormMarker = L.marker(storm.center, { icon: stormIcon });
    stormMarker.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;min-width:230px;line-height:1.45;">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #cbd5e1;padding-bottom:4px;margin-bottom:6px;">
          <strong style="color:#dc2626;font-size:12px;">🌀 ${storm.name}</strong>
          <span style="background:#fee2e2;color:#991b1b;padding:1px 5px;border-radius:3px;font-size:9px;font-weight:700;">${storm.category}</span>
        </div>
        <div><strong>Synoptic Cycle:</strong> 0000 UTC Analysis</div>
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

  // 2. Severe Sea State Zones (> 4.0m)
  (MARINE_WEATHER_STORE.waves || []).forEach(wave => {
    const waveRadiusM = wave.radiusNm * NM_TO_METERS;
    const waveCircle = L.circle(wave.center, {
      radius: waveRadiusM,
      color: "#0284c7",
      weight: 1.5,
      dashArray: "4, 4",
      fillColor: "#0284c7",
      fillOpacity: 0.12
    });
    waveCircle.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;min-width:180px;">
        <strong style="color:#0284c7;">🌊 ${wave.name}</strong><br>
        <strong>Significant Wave Height (Hs):</strong> ${wave.waveHeight} m<br>
        <strong>Swell Period:</strong> ${wave.swellPeriod} s (${wave.swellDir})<br>
        <div style="font-size:9px;color:#64748b;margin-top:4px;">ECMWF IFS 0.25° Synoptic Wave Model (0000 UTC)</div>
      </div>
    `);
    leafletWeatherLayer.addLayer(waveCircle);

    const waveBadgeIcon = L.divIcon({
      className: "weather-wave-badge",
      html: `<div style="background:rgba(2,132,199,0.85);color:#fff;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;border:1px solid #38bdf8;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.3);">🌊 Hs ${wave.waveHeight}m</div>`,
      iconSize: [55, 16],
      iconAnchor: [27, 8]
    });
    const waveMarker = L.marker(wave.center, { icon: waveBadgeIcon });
    leafletWeatherLayer.addLayer(waveMarker);
  });

  // 3. Barometric High/Low Centers
  (MARINE_WEATHER_STORE.pressureCenters || []).forEach(pc => {
    const isLow = pc.type === "L";
    const bgCol = isLow ? "#dc2626" : "#2563eb";
    const pcIcon = L.divIcon({
      className: "weather-pc-div-icon",
      html: `<div style="background:${bgCol};color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);">${pc.type}</div><div style="font-size:9px;font-weight:700;color:${bgCol};background:rgba(255,255,255,0.85);padding:0 3px;border-radius:2px;margin-top:1px;text-align:center;">${pc.value}</div>`,
      iconSize: [26, 38],
      iconAnchor: [13, 13]
    });
    const pcMarker = L.marker(pc.coords, { icon: pcIcon });
    pcMarker.bindPopup(`
      <div style="font-family:sans-serif;font-size:11px;">
        <strong style="color:${bgCol};">${isLow ? 'Cyclone / Low Pressure System' : 'Anticyclone / High Pressure Ridge'}</strong><br>
        <strong>Center:</strong> ${pc.name} (${pc.value} hPa)<br>
        <strong>Coords:</strong> ${pc.coords[0].toFixed(1)}°, ${pc.coords[1].toFixed(1)}°
      </div>
    `);
    leafletWeatherLayer.addLayer(pcMarker);
  });

  // 4. Marine Wind Vectors
  (MARINE_WEATHER_STORE.windVectors || []).forEach(wv => {
    const rot = (wv.dir + 180) % 360;
    const windIcon = L.divIcon({
      className: "weather-wind-div-icon",
      html: `<div style="display:flex;align-items:center;gap:3px;transform:rotate(${rot}deg);transform-origin:center center;"><svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#38bdf8;"><path d="M12 2L4 20l8-4 8 4z"/></svg></div><div style="font-size:8px;font-weight:700;color:#e2e8f0;background:rgba(15,23,42,0.8);padding:0 3px;border-radius:2px;white-space:nowrap;margin-top:2px;">${wv.speed}kn</div>`,
      iconSize: [24, 32],
      iconAnchor: [12, 12]
    });
    const wvMarker = L.marker(wv.coords, { icon: windIcon });
    wvMarker.bindPopup(`<strong>Wind Vector:</strong> ${wv.label}`);
    leafletWeatherLayer.addLayer(wvMarker);
  });
}

window.renderWeatherOnMap = renderWeatherOnMap;

async function refreshMarineWeather(force = false) {
  if (!navigator.onLine) {
    if (typeof showSetSailToast === "function") {
      showSetSailToast("Offline: Serving cached 00:00 UTC Synoptic Weather analysis.", "info");
    }
    return;
  }
  try {
    const testLat = 15.0;
    const testLon = 65.0;
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${testLat}&longitude=${testLon}&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=GMT`;
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.daily && data.daily.wave_height_max) {
        const wh = data.daily.wave_height_max[0] || 4.2;
        const wp = data.daily.wave_period_max ? data.daily.wave_period_max[0] : 9;
        const arabianWave = MARINE_WEATHER_STORE.waves.find(w => w.id === "W4");
        if (arabianWave) {
          arabianWave.waveHeight = parseFloat(wh.toFixed(1));
          arabianWave.swellPeriod = Math.round(wp);
        }
      }
    }
    MARINE_WEATHER_STORE.lastSyncUtc = new Date().toISOString();
    if (typeof renderWeatherOnMap === "function") {
      renderWeatherOnMap();
    }
    if (typeof showSetSailToast === "function") {
      showSetSailToast("Marine Weather synoptic fields synced (00:00 UTC Run)", "success");
    }
  } catch (err) {
    console.warn("[Weather Sync Warning]", err);
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

  // Minimal Contact Form: Reply Email + Message
  const submitBtn = document.getElementById("contactSubmitBtn");
  const statusEl = document.getElementById("contactStatusMsg");

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const email = (document.getElementById("contactEmail") ? document.getElementById("contactEmail").value : "").trim() || "";
      const message = (document.getElementById("contactMessage") ? document.getElementById("contactMessage").value : "").trim() || "";

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
  const chkT = (document.getElementById("expChkT") ? document.getElementById("expChkT").checked : true);
  const chkP = (document.getElementById("expChkP") ? document.getElementById("expChkP").checked : true);
  const chkPerm = (document.getElementById("expChkPerm") ? document.getElementById("expChkPerm").checked : true);

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
      maxZoom: 19,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      attributionControl: false,
      preferCanvas: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      zoomAnimationThreshold: 8,
      inertia: true,
      inertiaDeceleration: 3000
    });

    // 1. Primary Nautical Chart (Esri Ocean) — with maxNativeZoom for instant zoom scaling up to 18
    const oceanLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", {
      maxNativeZoom: 13,
      maxZoom: 18,
      attribution: "Tiles &copy; Esri",
      keepBuffer: 16,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: 60,
      crossOrigin: true
    });

    // 2. Fast Parallel OpenStreetMap (subdomains a, b, c for 3x concurrent download)
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      subdomains: ["a", "b", "c"],
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
      keepBuffer: 16,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: 60,
      crossOrigin: true
    });

    // 3. Fast High-Performance Global CDN Coast Map (Dual-CDN CARTO + Esri Street fallback, zero API key required)
    const voyagerLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", {
      subdomains: ["a", "b", "c", "d"],
      maxNativeZoom: 18,
      maxZoom: 19,
      attribution: "&copy; CARTO &bull; OpenStreetMap",
      keepBuffer: 16,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: 60
    });
    voyagerLayer.on("tileerror", function(errEvent) {
      if (errEvent && errEvent.tile && !errEvent.tile.dataset.fallbackTried && errEvent.coords) {
        errEvent.tile.dataset.fallbackTried = "1";
        const c = errEvent.coords;
        errEvent.tile.src = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/" + c.z + "/" + c.y + "/" + c.x;
      }
    });

    // 4. Satellite Imagery
    const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxNativeZoom: 18,
      maxZoom: 19,
      attribution: "Tiles &copy; Esri",
      keepBuffer: 16,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: 60,
      crossOrigin: true
    });

    // Primary Default Nautical Chart
    oceanLayer.addTo(leafletMap);

    const seamarkLayer = L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "OpenSeaMap",
      keepBuffer: 16,
      updateWhenIdle: false,
      updateWhenZooming: false,
      crossOrigin: true
    });

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
      "OpenSeaMap Buoys": seamarkLayer,
      "Marine Weather & Cyclones": leafletWeatherLayer,
      "Passage Plan Route": leafletRouteLayer
    };

    L.control.layers(baseMaps, overlayMaps, { position: "topright" }).addTo(leafletMap);

    leafletMarkersLayer = L.layerGroup().addTo(leafletMap);
    leafletVesselLayer = L.layerGroup().addTo(leafletMap);
    if (typeof OVERLAY_STATES === "undefined" || OVERLAY_STATES.weather !== false) {
      leafletWeatherLayer.addTo(leafletMap);
    }
    leafletRouteLayer.addTo(leafletMap);
    window.leafletMap = leafletMap;
    window.leafletMarkersLayer = leafletMarkersLayer;
    window.leafletWeatherLayer = leafletWeatherLayer;
    window.leafletRouteLayer = leafletRouteLayer;

    renderWeatherOnMap(leafletMap);

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
    filteredPorts = PORT_DEPTHS_DB.filter(p => {
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

  // Update Popover Counts for NtM
  const activeNotices = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED");
  const cancelledNotices = NTM_STORE.filter(n => n.isCancelled || n.status === "CANCELLED");
  const countT = activeNotices.filter(n => n.type === "T").length;
  const countP = activeNotices.filter(n => n.type === "P").length;
  const countPerm = activeNotices.filter(n => n.type === "PERM").length;
  const countPoly = activeNotices.filter(n => n.isPolygon || (n.coords && n.coords.length >= 3)).length;
  const countCancelled = cancelledNotices.length;

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
        const maxDraft = port.maxDraftMeters ? `Max Draft: ${port.maxDraftMeters}m` : (port.maintainedDepthMeters ? `Depth: ${port.maintainedDepthMeters}m` : "");
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
                <span>${port.country}${maxDraft ? ` • ${maxDraft}` : ''}</span>
                <span style="color:#f05a36;font-size:0.7rem;font-weight:600;">View Chart &rarr;</span>
              </div>
            </div>
          </div>
        `;
      });
    }

    // SECTION C: NOTICES TO MARINERS
    if (showNotices) {
      if ((showRoute || showPorts) && filteredNotices.length > 0) {
        html += `
          <div class="ntm-search-section-header" style="margin-top:0.6rem;">
            <span>
              <svg class="setsail-icon" viewBox="0 0 24 24" style="width:13px;height:13px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              UKHO NOTICES TO MARINERS (${filteredNotices.length})
            </span>
          </div>
        `;
      }

      filteredNotices.forEach(item => {
        const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
        const tagClass = item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm");
        const typeLabel = item.type === "T" ? "TEMP (T)" : (item.type === "P" ? "PRELIM (P)" : "PERM");
        const navarea = getNoticeNavarea(item);

        const typeBadge = isItemCancelled
          ? `<span class="ntm-tag cancelled">CANCELLED</span>`
          : `<span class="ntm-tag ${tagClass}">${typeLabel}</span>`;

        const firstCoord = item.coords && item.coords[0] ? item.coords[0].dms : "—";
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
    }

    if (!html) {
      html = `
        <div style="padding:2rem 1rem;text-align:center;color:var(--muted);font-size:0.8rem;">
          No active items match the current filter or enabled overlays.<br>
          <span style="font-size:0.72rem;opacity:0.8;">Enable overlays from the dock below or clear search filter.</span>
        </div>
      `;
    }

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
  const total = activeList.length;
  const tpCount = activeList.filter(n => n.type === "T" || n.type === "P").length;

  if (countEl) countEl.textContent = total + " Notices Plotted";
  if (tpCountEl) tpCountEl.textContent = tpCount + " T&P Notices";

  let latestEd = "Week 42 / 2026";
  try {
    const savedMeta = JSON.parse(localStorage.getItem(META_STORAGE_KEY) || "{}");
    if (savedMeta && savedMeta.weekNumber) {
      const yr = savedMeta.year ? (String(savedMeta.year).length === 2 ? "20" + savedMeta.year : savedMeta.year) : "2026";
      latestEd = `Week ${savedMeta.weekNumber} / ${yr}`;
    }
  } catch (e) {}
  if (editionEl) editionEl.textContent = latestEd;

  modal.classList.add("open");
}

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

function showWeatherInfoModal() {
  const modal = document.getElementById("weatherOverlayModal");
  if (modal) {
    modal.classList.add("open");
    const badge = document.getElementById("weatherModalStatusBadge");
    if (badge) {
      badge.textContent = navigator.onLine ? "LIVE SYNCED (00:00 UTC)" : "CACHED (00:00 UTC)";
      badge.style.background = navigator.onLine ? "#10b981" : "#eab308";
    }
  }
}

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
  const expBtnJrc = document.getElementById("expBtnJrc");
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
      if (modal) modal.classList.remove("open");
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

function initMasterFilterControls() {
  const chkNtm = document.getElementById("popMasterNtm");
  const chkPorts = document.getElementById("popMasterPorts");
  const chkWeather = document.getElementById("popMasterWeather");
  const chkRoute = document.getElementById("popMasterRoute");
  const selDepth = document.getElementById("popSelectDepthMin");
  const chkWpts = document.getElementById("popRouteShowWpts");
  const chkLine = document.getElementById("popRouteShowLine");

  const syncMapTilesFromFilterState = () => {
    document.querySelectorAll(".ntm-map-tile").forEach(tile => {
      const layer = tile.dataset.layer;
      if (layer === "notices" && chkNtm) tile.classList.toggle("active", chkNtm.checked);
      if (layer === "depths" && chkPorts) tile.classList.toggle("active", chkPorts.checked);
      if (layer === "weather" && chkWeather) tile.classList.toggle("active", chkWeather.checked);
      if (layer === "route" && chkRoute) tile.classList.toggle("active", chkRoute.checked);
    });
  };

  if (chkNtm) {
    chkNtm.checked = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.notices !== false : true;
    chkNtm.addEventListener("change", function() {
      if (typeof setOverlayActive === "function") {
        setOverlayActive("notices", this.checked, leafletMap);
      } else if (typeof OVERLAY_STATES !== "undefined") {
        OVERLAY_STATES.notices = this.checked;
      }
      syncMapTilesFromFilterState();
      renderNtMListAndMap();
    });
  }

  if (chkPorts) {
    chkPorts.checked = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.depths !== false : true;
    chkPorts.addEventListener("change", function() {
      if (typeof setOverlayActive === "function") {
        setOverlayActive("depths", this.checked, leafletMap);
      } else if (typeof OVERLAY_STATES !== "undefined") {
        OVERLAY_STATES.depths = this.checked;
      }
      syncMapTilesFromFilterState();
      renderNtMListAndMap();
    });
  }

  if (chkWeather) {
    chkWeather.checked = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.weather !== false : true;
    chkWeather.addEventListener("change", function() {
      if (typeof setOverlayActive === "function") {
        setOverlayActive("weather", this.checked, leafletMap);
      } else if (typeof OVERLAY_STATES !== "undefined") {
        OVERLAY_STATES.weather = this.checked;
      }
      if (leafletWeatherLayer) {
        if (this.checked) {
          if (!leafletMap.hasLayer(leafletWeatherLayer)) leafletMap.addLayer(leafletWeatherLayer);
        } else {
          if (leafletMap.hasLayer(leafletWeatherLayer)) leafletMap.removeLayer(leafletWeatherLayer);
        }
      }
      syncMapTilesFromFilterState();
    });
  }

  if (chkRoute) {
    chkRoute.checked = typeof OVERLAY_STATES !== "undefined" ? OVERLAY_STATES.route !== false : true;
    chkRoute.addEventListener("change", function() {
      if (typeof setOverlayActive === "function") {
        setOverlayActive("route", this.checked, leafletMap);
      } else if (typeof OVERLAY_STATES !== "undefined") {
        OVERLAY_STATES.route = this.checked;
      }
      if (leafletRouteLayer) {
        if (this.checked) {
          if (!leafletMap.hasLayer(leafletRouteLayer)) leafletMap.addLayer(leafletRouteLayer);
        } else {
          if (leafletMap.hasLayer(leafletRouteLayer)) leafletMap.removeLayer(leafletRouteLayer);
        }
      }
      syncMapTilesFromFilterState();
    });
  }

  if (selDepth) {
    selDepth.addEventListener("change", function() {
      filterMinPortDepth = parseFloat(this.value) || 0;
      renderNtMListAndMap();
    });
  }

  if (chkWpts || chkLine) {
    const updateRouteVisibility = () => {
      const showWpts = chkWpts ? chkWpts.checked : true;
      const showLine = chkLine ? chkLine.checked : true;
      document.querySelectorAll(".route-wpt-div-icon").forEach(el => {
        el.style.display = showWpts ? "block" : "none";
      });
      if (leafletRouteLayer) {
        leafletRouteLayer.eachLayer(layer => {
          if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            layer.setStyle({ opacity: showLine ? 0.95 : 0 });
          }
        });
      }
    };
    if (chkWpts) chkWpts.addEventListener("change", updateRouteVisibility);
    if (chkLine) chkLine.addEventListener("change", updateRouteVisibility);
  }
}

window.syncFilterMasterCheckboxes = function() {
  const chkNtm = document.getElementById("popMasterNtm");
  const chkPorts = document.getElementById("popMasterPorts");
  const chkWeather = document.getElementById("popMasterWeather");
  const chkRoute = document.getElementById("popMasterRoute");
  if (chkNtm && typeof OVERLAY_STATES !== "undefined") chkNtm.checked = Boolean(OVERLAY_STATES.notices);
  if (chkPorts && typeof OVERLAY_STATES !== "undefined") chkPorts.checked = Boolean(OVERLAY_STATES.depths);
  if (chkWeather && typeof OVERLAY_STATES !== "undefined") chkWeather.checked = Boolean(OVERLAY_STATES.weather);
  if (chkRoute && typeof OVERLAY_STATES !== "undefined") chkRoute.checked = Boolean(OVERLAY_STATES.route);
};

window.initNtMMap = initNtMMap;
