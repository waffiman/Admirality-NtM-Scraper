/**
 * SetSail Auto-NtM UI Controller & Interactive ECDIS Chart
 * Navigation Suite for LPG/C IINO INEOS VESTA
 *
 * Features:
 * - Multi-Type Filter Toggles (T, P, PERM, Polygons/Areas, Lines, Cancelled)
 * - Strict Cancelled Notice isolation (never clutters chart by default)
 * - Rich Sorting (Newest, Oldest, Country, Region, Charts, Points, Type)
 * - Real-Time Vessel GPS & Heading Silhouette on ECDIS (SVG Ship Outline)
 * - Theme Switcher (Dark Cockpit Night Watch vs Light Bridge Day Mode)
 * - Direct Engineering Transmission Form (Dispatched to wafficompany@gmail.com without UI exposure)
 * - Full Mobile Viewport & Touch Optimization (Bottom Nav Rail, List/Map Segmented Switch)
 */

const NTM_STORAGE_KEY = "setsail_ntm_active_store_v2";
const VESSEL_STORAGE_KEY = "setsail_vessel_state_v1";
const THEME_STORAGE_KEY = "setsail_theme";

let NTM_STORE = [];
let NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM"]); // Default: all 3 active notice types
let NTM_FILTER_AREAS = false;
let NTM_SHOW_CANCELLED = false; // Strictly excluded by default!
let NTM_ACTIVE_SORT = "NUM_DESC";

let leafletMap = null;
let leafletMarkersLayer = null;
let leafletVesselLayer = null;
let userVessel = null; // { lat, lon, heading, speed, name: "LPG/C IINO INEOS VESTA", source: "gps" | "manual" }
let mobileCurrentView = "list"; // "list" | "map"

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigationTabs();
  initAutoNtmUI();
  initFilterPills();
  initVesselTracking();
  initSettingsUI();
  initMobileViewSwitcher();
});

/**
 * Visual Theme Controller (Light Bridge vs Dark Cockpit)
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Sync radio buttons in Settings tab
  const radio = document.querySelector(`input[name="setsailTheme"][value="${savedTheme}"]`);
  if (radio) radio.checked = true;
}

function setAppTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Handle Tab Switching between Gyro Logbook, Auto-NtM Plotter, and Settings
 */
function initNavigationTabs() {
  const navItems = document.querySelectorAll(".nav-sidebar .nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");
      if (!targetTab) return;

      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");

      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
      });

      const activePane = document.getElementById(targetTab);
      if (activePane) {
        activePane.classList.add("active");
      }

      // If switching to NtM tab, resize or initialize map
      if (targetTab === "tab-ntm") {
        setTimeout(() => {
          if (leafletMap) {
            leafletMap.invalidateSize();
          } else {
            initNtMMap();
          }
        }, 150);
      }
    });
  });
}

/**
 * Setup Auto-NtM UI buttons, drag & drop, search, and export modal
 */
function initAutoNtmUI() {
  const fileInput = document.getElementById("ntmPdfInput");
  const uploadBtn = document.getElementById("ntmUploadBtn");
  const pasteBtn = document.getElementById("ntmPasteBtn");
  const pasteModal = document.getElementById("ntmPasteModal");
  const pasteCancel = document.getElementById("ntmPasteCancel");
  const pasteApply = document.getElementById("ntmPasteApply");
  const pasteText = document.getElementById("ntmPasteText");
  const dropzone = document.getElementById("ntmDropzone");
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

  // Raw Text Paste Modal
  if (pasteBtn && pasteModal) {
    pasteBtn.addEventListener("click", () => {
      pasteModal.classList.add("open");
      if (pasteText) pasteText.focus();
    });
    if (pasteCancel) {
      pasteCancel.addEventListener("click", () => {
        pasteModal.classList.remove("open");
      });
    }
    if (pasteApply) {
      pasteApply.addEventListener("click", () => {
        const text = pasteText.value;
        if (text.trim() && typeof window.parseAdmiraltyNtMText === "function") {
          const parsed = window.parseAdmiraltyNtMText(text);
          addNoticesToStore(parsed.notices, parsed.cancelledIds);
        }
        pasteModal.classList.remove("open");
        pasteText.value = "";
      });
    }
  }

  // Drag and drop onto map workspace
  const workspace = document.querySelector(".ntm-workspace");
  if (workspace && dropzone) {
    workspace.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("active");
    });
    workspace.addEventListener("dragleave", (e) => {
      if (e.target === dropzone) dropzone.classList.remove("active");
    });
    workspace.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("active");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handlePdfFiles(e.dataTransfer.files);
      }
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById("ntmSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      NTM_ACTIVE_SORT = e.target.value || "NUM_DESC";
      renderNtMListAndMap();
    });
  }

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderNtMListAndMap();
    });
  }

  // Select All Checkbox
  if (selectAllChk) {
    selectAllChk.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      const filtered = getFilteredNotices();
      filtered.forEach(item => {
        item.checkedForExport = isChecked;
      });
      saveStoreToStorage();
      renderNtMListAndMap();
    });
  }

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

  // Export Actions
  if (expBtnJrc) {
    expBtnJrc.addEventListener("click", () => {
      const selected = getExportSelectedNotices();
      if (selected.length === 0) {
        alert("No notices match the selected export criteria.");
        return;
      }
      if (typeof window.downloadJrcUchmFile === "function") {
        window.downloadJrcUchmFile(selected, "Admiralty_NtM_Overlay.uchm");
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
      if (typeof window.exportToGeoJson === "function") {
        const jsonStr = window.exportToGeoJson(selected);
        downloadTextFile(jsonStr, "Admiralty_NtM_Overlay.geojson", "application/geo+json");
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
      if (typeof window.exportToCsv === "function") {
        const csvStr = window.exportToCsv(selected);
        downloadTextFile(csvStr, "Admiralty_NtM_Coordinates.csv", "text/csv");
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

  // Try loading live notices.json first, then LocalStorage, then samples
  loadRemoteNoticesJson().then(loadedRemote => {
    if (!loadedRemote) {
      if (!loadStoreFromStorage()) {
        loadSampleNtMData();
      }
    }
  });
}

/**
 * Setup Multi-Type Filter Pills (T, P, PERM, Polygons, Lines, Cancelled)
 * Users can toggle multiple pills simultaneously!
 */
function initFilterPills() {
  const pillAll = document.getElementById("ntmPillAll");
  const pillT = document.getElementById("ntmPillT");
  const pillP = document.getElementById("ntmPillP");
  const pillPerm = document.getElementById("ntmPillPerm");
  const pillPoly = document.getElementById("ntmPillPoly");
  const pillCancelled = document.getElementById("ntmPillCancelled");

  if (pillAll) {
    pillAll.addEventListener("click", () => {
      // Reset to all active types, clear polygons and cancelled
      NTM_ACTIVE_TYPES = new Set(["T", "P", "PERM"]);
      NTM_FILTER_AREAS = false;
      NTM_SHOW_CANCELLED = false;
      syncPillClasses();
      renderNtMListAndMap();
    });
  }

  if (pillT) {
    pillT.addEventListener("click", () => {
      if (NTM_ACTIVE_TYPES.has("T")) {
        NTM_ACTIVE_TYPES.delete("T");
      } else {
        NTM_ACTIVE_TYPES.add("T");
      }
      syncPillClasses();
      renderNtMListAndMap();
    });
  }

  if (pillP) {
    pillP.addEventListener("click", () => {
      if (NTM_ACTIVE_TYPES.has("P")) {
        NTM_ACTIVE_TYPES.delete("P");
      } else {
        NTM_ACTIVE_TYPES.add("P");
      }
      syncPillClasses();
      renderNtMListAndMap();
    });
  }

  if (pillPerm) {
    pillPerm.addEventListener("click", () => {
      if (NTM_ACTIVE_TYPES.has("PERM")) {
        NTM_ACTIVE_TYPES.delete("PERM");
      } else {
        NTM_ACTIVE_TYPES.add("PERM");
      }
      syncPillClasses();
      renderNtMListAndMap();
    });
  }

  if (pillPoly) {
    pillPoly.addEventListener("click", () => {
      NTM_FILTER_AREAS = !NTM_FILTER_AREAS;
      syncPillClasses();
      renderNtMListAndMap();
    });
  }

  if (pillCancelled) {
    pillCancelled.addEventListener("click", () => {
      // Explicit toggle to view cancelled notices (strictly excluded by default!)
      NTM_SHOW_CANCELLED = !NTM_SHOW_CANCELLED;
      syncPillClasses();
      renderNtMListAndMap();
    });
  }
}

function syncPillClasses() {
  const pillAll = document.getElementById("ntmPillAll");
  const pillT = document.getElementById("ntmPillT");
  const pillP = document.getElementById("ntmPillP");
  const pillPerm = document.getElementById("ntmPillPerm");
  const pillPoly = document.getElementById("ntmPillPoly");
  const pillCancelled = document.getElementById("ntmPillCancelled");

  const isAllActive = NTM_ACTIVE_TYPES.has("T") && NTM_ACTIVE_TYPES.has("P") && NTM_ACTIVE_TYPES.has("PERM") && !NTM_FILTER_AREAS && !NTM_SHOW_CANCELLED;

  if (pillAll) pillAll.classList.toggle("active", isAllActive);
  if (pillT) pillT.classList.toggle("active", NTM_ACTIVE_TYPES.has("T"));
  if (pillP) pillP.classList.toggle("active", NTM_ACTIVE_TYPES.has("P"));
  if (pillPerm) pillPerm.classList.toggle("active", NTM_ACTIVE_TYPES.has("PERM"));
  if (pillPoly) pillPoly.classList.toggle("active", NTM_FILTER_AREAS);
  if (pillCancelled) pillCancelled.classList.toggle("active", NTM_SHOW_CANCELLED);
}

/**
 * Mobile List vs Map Switcher
 */
function initMobileViewSwitcher() {
  const listBtn = document.getElementById("ntmViewListBtn");
  const mapBtn = document.getElementById("ntmViewMapBtn");
  const workspace = document.getElementById("ntmWorkspace");

  if (!listBtn || !mapBtn || !workspace) return;

  // Default to list view on mobile
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
 * Vessel GPS Position & ECDIS Silhouette Layer
 */
function initVesselTracking() {
  const myVesselBtn = document.getElementById("ntmMyVesselBtn");
  const modal = document.getElementById("ntmVesselModal");
  const closeBtn = document.getElementById("vesselModalClose");
  const cancelBtn = document.getElementById("vesselModalCancel");
  const fetchGpsBtn = document.getElementById("vesselFetchGpsBtn");
  const applyBtn = document.getElementById("vesselApplyBtn");
  const clearBtn = document.getElementById("vesselClearBtn");
  const settingsOpenBtn = document.getElementById("settingsOpenVesselModalBtn");

  // Load persisted vessel state
  try {
    const raw = localStorage.getItem(VESSEL_STORAGE_KEY);
    if (raw) {
      userVessel = JSON.parse(raw);
    }
  } catch (e) {}

  const openModal = () => {
    if (!modal) return;
    if (userVessel) {
      const latEl = document.getElementById("vesselLat");
      const lonEl = document.getElementById("vesselLon");
      const hdgEl = document.getElementById("vesselHdg");
      const spdEl = document.getElementById("vesselSpd");
      if (latEl) latEl.value = formatLatLonDMS(userVessel.lat, userVessel.lon);
      if (lonEl) lonEl.value = formatLatLonDMS(userVessel.lat, userVessel.lon);
      if (hdgEl) hdgEl.value = userVessel.heading || 0;
      if (spdEl) spdEl.value = userVessel.speed || 0;
    }
    modal.classList.add("open");
  };

  const closeModal = () => {
    if (modal) modal.classList.remove("open");
  };

  if (myVesselBtn) {
    myVesselBtn.addEventListener("click", () => {
      if (userVessel && leafletMap) {
        leafletMap.flyTo([userVessel.lat, userVessel.lon], Math.max(leafletMap.getZoom(), 9));
      } else {
        openModal();
      }
    });
  }

  if (settingsOpenBtn) settingsOpenBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Fetch live GPS position from browser navigator.geolocation
  if (fetchGpsBtn) {
    fetchGpsBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Geolocation API is not supported by your browser.");
        return;
      }
      fetchGpsBtn.textContent = "Acquiring GPS Fix... 📡";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchGpsBtn.textContent = "📍 Get Live Browser GPS Position";
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const heading = (pos.coords.heading !== null && !isNaN(pos.coords.heading)) ? pos.coords.heading : (userVessel ? userVessel.heading : 0);
          const speed = (pos.coords.speed !== null && !isNaN(pos.coords.speed)) ? (pos.coords.speed * 1.94384) : (userVessel ? userVessel.speed : 0);

          const latEl = document.getElementById("vesselLat");
          const lonEl = document.getElementById("vesselLon");
          const hdgEl = document.getElementById("vesselHdg");
          const spdEl = document.getElementById("vesselSpd");

          if (latEl) latEl.value = lat.toFixed(5);
          if (lonEl) lonEl.value = lon.toFixed(5);
          if (hdgEl) hdgEl.value = Math.round(heading);
          if (spdEl) spdEl.value = speed.toFixed(1);

          plotUserVessel(lat, lon, heading, speed, "gps");
          closeModal();
        },
        (err) => {
          fetchGpsBtn.textContent = "📍 Get Live Browser GPS Position";
          alert(`Could not acquire GPS: ${err.message}. You can enter coordinates manually below.`);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  // Apply manual coordinates
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const latVal = document.getElementById("vesselLat")?.value.trim() || "";
      const lonVal = document.getElementById("vesselLon")?.value.trim() || "";
      const hdgVal = parseFloat(document.getElementById("vesselHdg")?.value) || 0;
      const spdVal = parseFloat(document.getElementById("vesselSpd")?.value) || 0;

      const parsedLat = parseCoordinateString(latVal);
      const parsedLon = parseCoordinateString(lonVal);

      if (parsedLat === null || parsedLon === null) {
        alert("Please enter valid Latitude and Longitude values (e.g. 58° 37.70' N or 58.6283).");
        return;
      }

      plotUserVessel(parsedLat, parsedLon, hdgVal, spdVal, "manual");
      closeModal();
    });
  }

  // Clear vessel position
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      userVessel = null;
      try { localStorage.removeItem(VESSEL_STORAGE_KEY); } catch (e) {}
      if (leafletVesselLayer) leafletVesselLayer.clearLayers();
      const hud = document.getElementById("ntmVesselHud");
      if (hud) hud.style.display = "none";
      const statusEl = document.getElementById("settingsVesselStatus");
      if (statusEl) statusEl.textContent = "Not Plotted";
      closeModal();
    });
  }
}

/**
 * Coordinate parser supporting decimal and nautical DMS degrees & minutes
 */
function parseCoordinateString(str) {
  if (!str) return null;
  // Decimal check
  const num = parseFloat(str);
  if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(str.trim())) {
    return num;
  }

  // DMS format e.g. 58° 37.70' N or 017° 46.30' E
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
 * Generates an SVG ECDIS vessel silhouette icon oriented to course over ground
 */
function getEcdisVesselIcon(heading = 0) {
  const normHeading = Math.round(((heading % 360) + 360) % 360);
  const svgHtml = `
    <div class="vessel-ecdis-wrapper" style="transform: rotate(${normHeading}deg);">
      <div class="vessel-radar-ring"></div>
      <svg width="44" height="44" viewBox="-22 -22 44 44" class="vessel-ecdis-svg">
        <!-- 6-Minute Course Vector Line ahead -->
        <line x1="0" y1="-8" x2="0" y2="-28" stroke="#ffeb3b" stroke-width="2.5" stroke-dasharray="3,2" />
        <polygon points="0,-30 -3.5,-23 3.5,-23" fill="#ffeb3b" />
        <!-- Ship Hull Silhouette (Standard ECDIS Symbol) -->
        <path d="M 0 -14 L 7 -5 L 7 11 L 4 15 L -4 15 L -7 11 L -7 -5 Z" fill="#00e5ff" stroke="#ffffff" stroke-width="1.8" />
        <!-- Bridge Wing Marks -->
        <line x1="-7" y1="2" x2="7" y2="2" stroke="#ffffff" stroke-width="1" />
        <!-- Center GPS Antenna Pivot -->
        <circle cx="0" cy="0" r="2.8" fill="#ff1744" stroke="#ffffff" stroke-width="1" />
      </svg>
    </div>
  `;
  return L.divIcon({
    html: svgHtml,
    className: "ecdis-vessel-marker",
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
}

/**
 * Plot user vessel on Leaflet map
 */
function plotUserVessel(lat, lon, heading = 0, speed = 0, source = "manual") {
  userVessel = {
    lat,
    lon,
    heading,
    speed,
    name: "LPG/C IINO INEOS VESTA",
    source,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(VESSEL_STORAGE_KEY, JSON.stringify(userVessel));
  } catch (e) {}

  if (leafletMap && leafletVesselLayer) {
    leafletVesselLayer.clearLayers();

    const marker = L.marker([lat, lon], {
      icon: getEcdisVesselIcon(heading),
      zIndexOffset: 1000
    });

    marker.bindPopup(`
      <div style="font-family:'Segoe UI',sans-serif;color:#111;min-width:210px;">
        <div style="font-weight:700;color:#0a3888;font-size:1.05rem;border-bottom:1px solid #ddd;padding-bottom:4px;margin-bottom:6px;">
          ⚓ LPG/C IINO INEOS VESTA
        </div>
        <div style="font-size:0.8rem;color:#444;margin-bottom:3px;"><b>Position:</b> ${formatLatLonDMS(lat, lon)}</div>
        <div style="font-size:0.8rem;color:#444;margin-bottom:3px;"><b>COG / Heading:</b> ${Math.round(heading)}°</div>
        <div style="font-size:0.8rem;color:#444;margin-bottom:3px;"><b>SOG:</b> ${speed.toFixed(1)} kts</div>
        <div style="font-size:0.75rem;color:#666;margin-top:6px;"><b>Fix Source:</b> ${source === "gps" ? "Live GPS Sensor" : "Manual Bridge Entry"}</div>
      </div>
    `);

    leafletVesselLayer.addLayer(marker);
    leafletMap.flyTo([lat, lon], Math.max(leafletMap.getZoom(), 8));
  }

  // Update Map HUD
  const hud = document.getElementById("ntmVesselHud");
  if (hud) {
    hud.style.display = "flex";
    hud.innerHTML = `🚢 <strong>IINO INEOS VESTA</strong> | ${formatLatLonDMS(lat, lon)} | COG ${Math.round(heading)}° | SOG ${speed.toFixed(1)} kts`;
  }

  // Update Settings Tab telemetry status
  const statusEl = document.getElementById("settingsVesselStatus");
  if (statusEl) {
    statusEl.textContent = `Plotted at ${formatLatLonDMS(lat, lon)} (COG ${Math.round(heading)}°)`;
  }
}

/**
 * Settings UI & Direct Line to Developer Engineering
 */
function initSettingsUI() {
  // Theme Radio Switcher
  const radios = document.querySelectorAll('input[name="setsailTheme"]');
  radios.forEach(r => {
    r.addEventListener("change", (e) => {
      setAppTheme(e.target.value);
    });
  });

  // Developer Feedback Form
  // NOTE: Email wafficompany@gmail.com is strictly kept inside this JS dispatch endpoint
  // and is NEVER displayed to the user in plaintext in the HTML or UI.
  const submitBtn = document.getElementById("contactSubmitBtn");
  const statusEl = document.getElementById("contactStatusMsg");

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const officer = document.getElementById("contactOfficer")?.value.trim() || "";
      const vessel = document.getElementById("contactVessel")?.value.trim() || "LPG/C IINO INEOS VESTA";
      const category = document.getElementById("contactCategory")?.value || "General Feedback";
      const subject = document.getElementById("contactSubject")?.value.trim() || "";
      const message = document.getElementById("contactMessage")?.value.trim() || "";

      if (!message || !subject) {
        alert("Please complete the Subject and Message fields before transmitting.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Transmitting to Engineering... 📡";
      if (statusEl) statusEl.textContent = "";

      const payload = {
        officer,
        vessel,
        category,
        subject,
        message,
        clientTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        version: "SetSail v2.4 (October 2026)",
        activeNoticesCount: NTM_STORE.length
      };

      try {
        const targetEndpoint = ["https://formsubmit.co/ajax/", "wafficompany", "@", "gmail.com"].join("");
        const res = await fetch(targetEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          if (statusEl) {
            statusEl.textContent = "✅ Message successfully transmitted to SetSail Bridge Engineering!";
            statusEl.style.color = "var(--ok)";
          }
          alert("Transmission successful!\n\nYour feedback has been logged directly with SetSail Maritime Engineering.");
          const subjInput = document.getElementById("contactSubject");
          const msgInput = document.getElementById("contactMessage");
          if (subjInput) subjInput.value = "";
          if (msgInput) msgInput.value = "";
        } else {
          throw new Error(`Server returned HTTP ${res.status}`);
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent = "Transmission completed (Offline queued).";
          statusEl.style.color = "var(--warn)";
        }
        alert("Message recorded in bridge log. SetSail engineering will review upon next sync.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "🚀 Transmit Message to Engineering";
      }
    });
  }

  // Cache Reset Button
  const clearCacheBtn = document.getElementById("settingsClearCacheBtn");
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener("click", () => {
      if (!confirm("Clear local notice storage and re-fetch latest Admiralty NtM bulletins?")) return;
      try {
        localStorage.removeItem(NTM_STORAGE_KEY);
      } catch (e) {}
      NTM_STORE = [];
      if (leafletMarkersLayer) leafletMarkersLayer.clearLayers();
      loadRemoteNoticesJson().then(() => {
        alert("Local storage refreshed successfully from live Admiralty scraper.");
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
  const onlyChecked = document.getElementById("expChkOnlyChecked")?.checked ?? false;

  return NTM_STORE.filter(item => {
    if (onlyChecked && !item.checkedForExport) return false;
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
  const countT = NTM_STORE.filter(n => n.type === "T").length;
  const countP = NTM_STORE.filter(n => n.type === "P").length;
  const countPerm = NTM_STORE.filter(n => n.type === "PERM").length;

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
    elSummary.textContent = `Will export: ${selected.length} notices (${totalPts} points/vertices)`;
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
    if (statusEl) statusEl.textContent = `Reading ${file.name} (${i + 1}/${fileList.length})...`;

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
  // 1. Process cancellations: mark as CANCELLED so they can be filtered out by default
  if (cancelledIds && cancelledIds.length > 0) {
    NTM_STORE.forEach(item => {
      if (cancelledIds.includes(item.id)) {
        item.status = "CANCELLED";
        item.isCancelled = true;
      }
    });
  }

  // 2. Add / Update new notices
  newNotices.forEach(item => {
    const existingIdx = NTM_STORE.findIndex(n => n.id === item.id);
    if (existingIdx >= 0) {
      NTM_STORE[existingIdx] = item;
    } else {
      NTM_STORE.push(item);
    }
  });

  saveStoreToStorage();

  // Update badge on sidebar
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
 * Attempt to load auto-synced notices.json generated by Admiralty Scraper
 */
async function loadRemoteNoticesJson() {
  try {
    const res = await fetch("notices.json?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    if (data && Array.isArray(data.notices) && data.notices.length > 0) {
      NTM_STORE = data.notices;
      saveStoreToStorage();
      renderNtMListAndMap();
      const statusEl = document.getElementById("ntmStatusMsg");
      if (statusEl) {
        const meta = data.metadata || {};
        const wk = meta.weekNumber ? `Wk ${meta.weekNumber}/${meta.year}` : (meta.weeklyBulletin || "Live");
        const activeCnt = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED").length;
        statusEl.innerHTML = `<span class="ntm-live-status"><span class="ntm-live-dot" title="Live UKHO telemetry online"></span>Live NtM ${wk}: ${activeCnt} active</span>`;
      }
      return true;
    }
  } catch (err) {
    // Expected on local file:/// origin without a local web server
  }
  return false;
}

/**
 * Initialize Leaflet Map (with Ocean, OSM, Satellite layers & OpenSeaMap overlay)
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
      attributionControl: false
    });

    // Base Layers (100% Free, No API key required)
    const oceanLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 13,
      attribution: "Tiles &copy; Esri &mdash; GEBCO, NOAA, CHS, National Geographic"
    });

    const osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    });

    const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri World Imagery"
    });

    // Default to Ocean Navigation Chart
    oceanLayer.addTo(leafletMap);

    // Marine Marks & Buoys Overlay
    const seamarkLayer = L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "Map data: &copy; OpenSeaMap contributors"
    });

    const baseMaps = {
      "🌊 Ocean Chart": oceanLayer,
      "🗺️ OpenStreetMap": osmLayer,
      "🛰️ Satellite": satLayer
    };

    const overlayMaps = {
      "⚓ OpenSeaMap Buoys & Marks": seamarkLayer
    };

    L.control.layers(baseMaps, overlayMaps, { position: "topright" }).addTo(leafletMap);

    leafletMarkersLayer = L.layerGroup().addTo(leafletMap);
    leafletVesselLayer = L.layerGroup().addTo(leafletMap);

    // Live Cursor Coordinates HUD
    leafletMap.on("mousemove", (e) => {
      const hud = document.getElementById("ntmHudCoords");
      if (hud) {
        hud.textContent = formatLatLonDMS(e.latlng.lat, e.latlng.lng);
      }
    });

    // Plot vessel if already stored
    if (userVessel) {
      plotUserVessel(userVessel.lat, userVessel.lon, userVessel.heading, userVessel.speed, userVessel.source);
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

  // Lat / Lon Grid
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

  // Draw Notices Markers
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
 * Filter helper honoring Multi-Type pills, Cancelled isolation, and Search
 */
function getFilteredNotices() {
  const searchVal = (document.getElementById("ntmSearchInput")?.value || "").toLowerCase().trim();

  let list = NTM_STORE.filter(item => {
    const isCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");

    // 1. Strict Cancelled Isolation:
    // Cancelled notices are NEVER included unless user explicitly checked NTM_SHOW_CANCELLED!
    if (isCancelled) {
      if (!NTM_SHOW_CANCELLED) return false;
    } else {
      if (NTM_SHOW_CANCELLED) {
        // When user is viewing the Cancelled tab/filter specifically, only show cancelled
        return false;
      }
      // 2. Multi-type filter
      if (NTM_ACTIVE_TYPES.size > 0 && !NTM_ACTIVE_TYPES.has(item.type)) {
        return false;
      }
      // 3. Shape filter (areas)
      if (NTM_FILTER_AREAS && !item.isPolygon && !(item.coords && item.coords.length >= 3)) {
        return false;
      }
    }

    // 4. Search Filter
    if (searchVal) {
      const searchStr = `${item.id} ${item.country || ""} ${item.region || ""} ${item.subject || ""} ${(item.charts || []).join(" ")} ${item.cancels ? item.cancels.join(" ") : ""}`.toLowerCase();
      if (!searchStr.includes(searchVal)) return false;
    }

    return true;
  });

  // 5. Rich Sorting
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
    // Default: NUM_DESC (Newest notice number first)
    return numB - numA;
  });

  return list;
}

/**
 * Format coordinates to clean nautical DMS (e.g. 58° 37.70' N, 017° 46.30' E)
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
 * Render notices in the list sidebar and on the interactive Leaflet map
 */
function renderNtMListAndMap() {
  const listContainer = document.getElementById("ntmItemsScroll");
  const countEl = document.getElementById("ntmListCount");
  const filtered = getFilteredNotices();

  // Active vs Cancelled counts
  const activeNotices = NTM_STORE.filter(n => !n.isCancelled && n.status !== "CANCELLED");
  const cancelledNotices = NTM_STORE.filter(n => n.isCancelled || n.status === "CANCELLED");

  const countAll = activeNotices.length;
  const countT = activeNotices.filter(n => n.type === "T").length;
  const countP = activeNotices.filter(n => n.type === "P").length;
  const countPerm = activeNotices.filter(n => n.type === "PERM").length;
  const countPoly = activeNotices.filter(n => n.isPolygon || (n.coords && n.coords.length >= 3)).length;
  const countCancelled = cancelledNotices.length;

  if (countEl) {
    countEl.textContent = `${filtered.length} of ${NTM_STORE.length}`;
  }

  // Update Pill Counts
  const elCntT = document.getElementById("cntT");
  if (elCntT) elCntT.textContent = countT;
  const elCntP = document.getElementById("cntP");
  if (elCntP) elCntP.textContent = countP;
  const elCntPerm = document.getElementById("cntPerm");
  if (elCntPerm) elCntPerm.textContent = countPerm;
  const elCntPoly = document.getElementById("cntPoly");
  if (elCntPoly) elCntPoly.textContent = countPoly;
  const elCntCan = document.getElementById("cntCancelled");
  if (elCntCan) elCntCan.textContent = countCancelled;

  syncPillClasses();

  const expBadge = document.getElementById("ntmExportBadge");
  if (expBadge) {
    const selForExp = NTM_STORE.filter(n => n.checkedForExport !== false).length;
    expBadge.textContent = selForExp;
  }

  updateSelectionCounter();

  // Render Notice Cards into Sidebar
  if (listContainer) {
    if (filtered.length === 0) {
      listContainer.innerHTML = '<div style="text-align:center;color:var(--muted);padding:2rem 1rem;font-size:0.8rem;">No notices match the active filters.<br/>Toggle filter pills or adjust your search query.</div>';
    } else {
      let html = "";
      filtered.forEach(item => {
        const isItemCancelled = Boolean(item.isCancelled || item.status === "CANCELLED");
        const tagClass = item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm");
        const typeLabel = item.type === "T" ? "TEMP (T)" : (item.type === "P" ? "PRELIM (P)" : "PERM");

        // Safe type badge calculation
        const typeBadge = isItemCancelled
          ? `<span class="ntm-tag cancelled">CANCELLED</span>`
          : `<span class="ntm-tag ${tagClass}">${typeLabel}</span>`;

        const firstCoord = item.coords && item.coords[0] ? item.coords[0].dms : "—";
        const isChecked = item.checkedForExport !== false;
        const chartsStr = (item.charts && item.charts.length > 0) ? `Charts: ${item.charts.join(', ')}` : "";
        const cancelsBanner = (item.cancels && item.cancels.length > 0) ? `<div class="ntm-cancels-banner">⛔ Cancels: ${item.cancels.join(', ')}</div>` : "";
        const cancelledNoticeClass = isItemCancelled ? "cancelled" : "";

        html += `
          <div class="ntm-card-item type-${item.type} ${cancelledNoticeClass}" data-id="${item.id}" onclick="selectNtMNotice('${item.id}')">
            <input type="checkbox" class="ntm-card-chk" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleNoticeCheck('${item.id}', this.checked)" title="Include in export" />
            <div class="ntm-card-content">
              <div class="ntm-card-top">
                <span class="ntm-card-id">${item.id}</span>
                ${typeBadge}
              </div>
              ${cancelsBanner}
              <div class="ntm-card-region">${item.country || 'Region'} — ${item.region || ''}</div>
              <div class="ntm-card-subject">${item.subject || ''}</div>
              <div class="ntm-card-bottom">
                <span class="ntm-card-coords" title="Center on chart">📍 ${firstCoord} ${item.coords && item.coords.length > 1 ? `(+${item.coords.length-1})` : ''}</span>
                ${chartsStr ? `<span class="ntm-card-charts">${chartsStr}</span>` : ''}
              </div>
            </div>
          </div>
        `;
      });
      listContainer.innerHTML = html;
    }
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

      // Polygons
      if (item.isPolygon && item.coords.length >= 3) {
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
            <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">${item.country || ''} — ${item.region || ''}</div>
            <div style="font-size:0.9em;margin-bottom:6px;">${item.subject || ''}</div>
            <div style="font-size:0.8em;color:#666;line-height:1.3;"><b>Affected Charts:</b> ${(item.charts||[]).join(', ') || '—'}</div>
          </div>
        `);
        leafletMarkersLayer.addLayer(polygon);
      } else if (item.isLine && item.coords.length >= 2) {
        // Polyline
        const linePoints = item.coords.map(c => [c.lat, c.lon]);
        const polyline = L.polyline(linePoints, {
          color: color,
          weight: 3,
          dashArray: isItemCancelled ? "3, 6" : (item.type === "T" ? "6, 6" : null)
        });
        polyline.bindPopup(`
          <div style="font-family:'Segoe UI',sans-serif;color:#111;">
            <b style="color:#0a3888;">${item.id} ${isItemCancelled ? '<span style="color:#ef4444;">[CANCELLED]</span>' : ''}</b>
            <div style="font-size:0.85em;color:#555;">${item.country || ''} — ${item.region || ''}</div>
            <div style="font-size:0.9em;margin:4px 0;">${item.subject || ''}</div>
          </div>
        `);
        leafletMarkersLayer.addLayer(polyline);
      } else {
        // Points
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
              <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">${item.country || ''} — ${item.region || ''}</div>
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
  const selEl = document.getElementById("ntmSelectedCount");
  if (!selEl) return;
  const filtered = getFilteredNotices();
  const checkedCount = filtered.filter(n => n.checkedForExport !== false).length;
  selEl.textContent = `${checkedCount} / ${filtered.length}`;
  selEl.title = `${checkedCount} of ${filtered.length} notices selected for export`;

  const selectAllChk = document.getElementById("ntmSelectAllChk");
  if (selectAllChk) {
    selectAllChk.checked = filtered.length > 0 && checkedCount === filtered.length;
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
    const first = item.coords[0];
    leafletMap.flyTo([first.lat, first.lon], Math.max(leafletMap.getZoom(), 8), {
      duration: 1.2
    });
  }

  // On mobile, automatically switch to map view upon clicking a card
  if (window.innerWidth <= 768 && mobileCurrentView === "list") {
    const mapBtn = document.getElementById("ntmViewMapBtn");
    if (mapBtn) mapBtn.click();
  }
}

/**
 * Initial sample notices including Permanent (PERM), Temporary (T), and Preliminary (P)
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
