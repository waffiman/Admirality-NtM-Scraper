/**
 * Auto-NtM UI Controller & Interactive Map
 * Full support for all notice types (PERM, T, P)
 * Checkbox selection for export, filtering, and local storage persistence.
 */

const NTM_STORAGE_KEY = "admiralty_ntm_active_store_v1";
let NTM_STORE = [];
let NTM_ACTIVE_FILTER = "ALL";
let NTM_ACTIVE_SORT = "NUM_DESC";
let leafletMap = null;
let leafletMarkersLayer = null;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initNavigationTabs();
  initAutoNtmUI();
});

/**
 * Handle Tab Switching between Gyro Logbook and Auto-NtM Plotter
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

      // If switching to NtM tab, resize map
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
 * Setup Auto-NtM UI buttons, drag & drop, filters, and export modal
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
    pasteCancel.addEventListener("click", () => {
      pasteModal.classList.remove("open");
    });
    pasteApply.addEventListener("click", () => {
      const text = pasteText.value;
      if (text.trim()) {
        const parsed = parseAdmiraltyNtMText(text);
        addNoticesToStore(parsed.notices, parsed.cancelledIds);
      }
      pasteModal.classList.remove("open");
      pasteText.value = "";
    });
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

  // Filter Dropdown
  const filterSelect = document.getElementById("ntmFilterSelect");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      NTM_ACTIVE_FILTER = e.target.value || "ALL";
      renderNtMListAndMap();
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

  // Legacy Filter Buttons (if any)
  const filterBtns = document.querySelectorAll(".ntm-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      NTM_ACTIVE_FILTER = btn.getAttribute("data-filter") || "ALL";
      if (filterSelect) filterSelect.value = NTM_ACTIVE_FILTER;
      renderNtMListAndMap();
    });
  });

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
    expBtnClose.addEventListener("click", () => {
      exportModal.classList.remove("open");
    });
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
      downloadJrcUchmFile(selected, "Admiralty_NtM_Overlay.uchm");
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
      const jsonStr = exportToGeoJson(selected);
      downloadTextFile(jsonStr, "Admiralty_NtM_Overlay.geojson", "application/geo+json");
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
      const csvStr = exportToCsv(selected);
      downloadTextFile(csvStr, "Admiralty_NtM_Coordinates.csv", "text/csv");
      if (exportModal) exportModal.classList.remove("open");
    });
  }

  // Try loading live notices.json first (auto-synced by Admiralty Scraper), then LocalStorage, then samples
  loadRemoteNoticesJson().then(loadedRemote => {
    if (!loadedRemote) {
      if (!loadStoreFromStorage()) {
        loadSampleNtMData();
      }
    }
  });


  // Fit View Button
  const fitBtn = document.getElementById("ntmFitAllBtn");
  if (fitBtn) {
    fitBtn.addEventListener("click", fitAllNoticesOnMap);
  }

  // Clear All Button
  const clearAllBtn = document.getElementById("ntmClearAllBtn");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      if (!confirm("Clear ALL notices from the map and storage? This cannot be undone.")) return;
      NTM_STORE = [];
      try { localStorage.removeItem(NTM_STORAGE_KEY); } catch(e) {}
      if (leafletMarkersLayer) leafletMarkersLayer.clearLayers();
      renderNtMListAndMap();
      const statusEl = document.getElementById("ntmStatusMsg");
      if (statusEl) {
        statusEl.textContent = "All notices cleared.";
        setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 3000);
      }
    });
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

  // Sidebar Bottom Export Button
  const sidebarExpBtn = document.getElementById("ntmSidebarExportBtn");
  if (sidebarExpBtn && exportModal) {
    sidebarExpBtn.addEventListener("click", () => {
      updateExportModalCounts();
      exportModal.classList.add("open");
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
      if (text && text.trim().length > 0) {
        const parsed = parseAdmiraltyNtMText(text);
        if (parsed.notices && parsed.notices.length > 0) {
          addNoticesToStore(parsed.notices, parsed.cancelledIds);
          totalNewNotices += parsed.notices.length;
        } else {
          console.warn("No notices matched in text of", file.name);
        }
      }
    } catch (err) {
      console.warn("Could not read PDF directly:", err);
    }
  }

  if (totalNewNotices > 0) {
    if (statusEl) {
      statusEl.textContent = `Added ${totalNewNotices} notices. Total: ${NTM_STORE.length}`;
      setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 5000);
    }
    // Auto-fit view to show the newly plotted notices
    fitAllNoticesOnMap();
  } else {
    if (statusEl) {
      statusEl.textContent = "No notices detected in uploaded PDF.";
      setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 6000);
    }
    const pasteModal = document.getElementById("ntmPasteModal");
    if (pasteModal) pasteModal.classList.add("open");
  }
}

/**
 * In-browser PDF text extractor using pdf.js if available, or direct stream scanner
 */
async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();

  if (window.pdfjsLib) {
    try {
      const loadingTask = window.pdfjsLib.getDocument({
        data: arrayBuffer,
        disableWorker: true
      });
      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let lastY = null;
        let pageStr = "";
        
        for (let i = 0; i < textContent.items.length; i++) {
          const item = textContent.items[i];
          if (!item.str) continue;
          
          const curY = item.transform ? item.transform[5] : null;
          if (lastY !== null && curY !== null && Math.abs(curY - lastY) > 4) {
            pageStr += "\n";
          } else if (pageStr.length > 0 && !pageStr.endsWith("\n") && !pageStr.endsWith(" ")) {
            pageStr += " ";
          }
          pageStr += item.str;
          lastY = curY;
        }
        
        fullText += "\n" + pageStr;
      }
      return fullText;
    } catch (e) {
      console.error("PDF.js extraction error:", e);
    }
  }

  // Fallback stream scanner
  const bytes = new Uint8Array(arrayBuffer);
  let text = "";
  let inString = false;
  let strBuf = "";
  for (let i = 0; i < bytes.length - 2; i++) {
    if (bytes[i] === 0x28) {
      inString = true;
      strBuf = "";
    } else if (bytes[i] === 0x29 && inString) {
      inString = false;
      if (strBuf.length > 2) text += " " + strBuf;
    } else if (inString && bytes[i] >= 32 && bytes[i] <= 126) {
      strBuf += String.fromCharCode(bytes[i]);
    }
  }
  return text;
}

/**
 * Add parsed notices to store, apply cancellations, and save to LocalStorage
 */
function addNoticesToStore(newNotices, cancelledIds = []) {
  // 1. Process cancellations first
  if (cancelledIds && cancelledIds.length > 0) {
    NTM_STORE = NTM_STORE.filter(item => !cancelledIds.includes(item.id));
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
  if (badge) {
    badge.textContent = NTM_STORE.length;
    badge.style.display = NTM_STORE.length > 0 ? "block" : "none";
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
        const badge = document.getElementById("ntmBadge");
        if (badge) {
          badge.textContent = NTM_STORE.length;
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
        statusEl.innerHTML = `<span style="color:#4ade80;font-weight:600;">🟢 Live NtM ${wk}: ${NTM_STORE.length} active</span>`;
      }
      return true;
    }
  } catch (err) {
    // Expected on local file:/// origin without a local web server
  }
  return false;
}


/**
 * Initialize Leaflet Map (with offline OpenStreetMap or Canvas fallback)
 */
function initNtMMap() {
  const mapDiv = document.getElementById("ntmMap");
  if (!mapDiv) return;

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

    // Live Cursor Coordinates HUD
    leafletMap.on("mousemove", (e) => {
      const hud = document.getElementById("ntmHudCoords");
      if (hud) {
        hud.textContent = formatLatLonDMS(e.latlng.lat, e.latlng.lng);
      }
    });

    renderNtMListAndMap();
  } else {
    initOfflineCanvasMap();
  }
}

/**
 * Offline Canvas World Map with Mercator grid & markers
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
  NTM_STORE.forEach(n => {
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
 * Filter helper for currently active tab filter
 */
function getFilteredNotices() {
  const searchVal = (document.getElementById("ntmSearchInput")?.value || "").toLowerCase().trim();

  let list = NTM_STORE.filter(item => {
    if (NTM_ACTIVE_FILTER === "T" && item.type !== "T") return false;
    if (NTM_ACTIVE_FILTER === "P" && item.type !== "P") return false;
    if (NTM_ACTIVE_FILTER === "PERM" && item.type !== "PERM") return false;
    if (NTM_ACTIVE_FILTER === "POLY" && !item.isPolygon && !(item.coords && item.coords.length >= 3)) return false;
    if (NTM_ACTIVE_FILTER === "LINE" && !item.isLine) return false;

    if (searchVal) {
      const searchStr = `${item.id} ${item.country} ${item.region} ${item.subject} ${(item.charts||[]).join(' ')}`.toLowerCase();
      if (!searchStr.includes(searchVal)) return false;
    }
    return true;
  });

  // Sorting
  list.sort((a, b) => {
    if (NTM_ACTIVE_SORT === "NUM_ASC") {
      const numA = parseInt(a.num, 10) || 0;
      const numB = parseInt(b.num, 10) || 0;
      return numA - numB;
    }
    if (NTM_ACTIVE_SORT === "COUNTRY") {
      const cA = (a.country || "").toLowerCase();
      const cB = (b.country || "").toLowerCase();
      return cA.localeCompare(cB);
    }
    if (NTM_ACTIVE_SORT === "TYPE") {
      const typeOrder = { "T": 1, "P": 2, "PERM": 3 };
      const orderA = typeOrder[a.type] || 4;
      const orderB = typeOrder[b.type] || 4;
      if (orderA !== orderB) return orderA - orderB;
      const numA = parseInt(a.num, 10) || 0;
      const numB = parseInt(b.num, 10) || 0;
      return numB - numA;
    }
    // Default: NUM_DESC (Newest notice number first)
    const numA = parseInt(a.num, 10) || 0;
    const numB = parseInt(b.num, 10) || 0;
    return numB - numA;
  });

  return list;
}

/**
 * Filter & render notice items in sidebar and on map
 */

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
 * Fit all notices into view on Leaflet map
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

function renderNtMListAndMap() {
  const listContainer = document.getElementById("ntmItemsScroll");
  const countEl = document.getElementById("ntmListCount");
  const filtered = getFilteredNotices();

  if (countEl) {
    countEl.textContent = `${filtered.length} of ${NTM_STORE.length}`;
  }

  // Update Top Bar Segmented Counters
  const countAll = NTM_STORE.length;
  const countT = NTM_STORE.filter(n => n.type === "T").length;
  const countP = NTM_STORE.filter(n => n.type === "P").length;
  const countPerm = NTM_STORE.filter(n => n.type === "PERM").length;
  const countPoly = NTM_STORE.filter(n => n.isPolygon || (n.coords && n.coords.length >= 3)).length;

  const elCntAll = document.getElementById("cntAll");
  if (elCntAll) elCntAll.textContent = countAll;
  const elCntT = document.getElementById("cntT");
  if (elCntT) elCntT.textContent = countT;
  const elCntP = document.getElementById("cntP");
  if (elCntP) elCntP.textContent = countP;
  const elCntPerm = document.getElementById("cntPerm");
  if (elCntPerm) elCntPerm.textContent = countPerm;
  const elCntPoly = document.getElementById("cntPoly");
  if (elCntPoly) elCntPoly.textContent = countPoly;

    // Update Dropdown Option Text with Live Counts
  const filterSelectEl = document.getElementById("ntmFilterSelect");
  if (filterSelectEl) {
    const countLine = NTM_STORE.filter(n => n.isLine).length;
    const optAll = filterSelectEl.querySelector('option[value="ALL"]');
    if (optAll) optAll.textContent = `All Types (${countAll})`;
    const optT = filterSelectEl.querySelector('option[value="T"]');
    if (optT) optT.textContent = `Temp (T) (${countT})`;
    const optP = filterSelectEl.querySelector('option[value="P"]');
    if (optP) optP.textContent = `Prelim (P) (${countP})`;
    const optPerm = filterSelectEl.querySelector('option[value="PERM"]');
    if (optPerm) optPerm.textContent = `Permanent (${countPerm})`;
    const optPoly = filterSelectEl.querySelector('option[value="POLY"]');
    if (optPoly) optPoly.textContent = `Areas (${countPoly})`;
    const optLine = filterSelectEl.querySelector('option[value="LINE"]');
    if (optLine) optLine.textContent = `Lines (${countLine})`;
  }

  const statusPill = document.getElementById("ntmStatusPill");
  if (statusPill) statusPill.textContent = `${countAll} Active`;

  const expBadge = document.getElementById("ntmExportBadge");
  if (expBadge) {
    const selForExp = NTM_STORE.filter(n => n.checkedForExport !== false).length;
    expBadge.textContent = selForExp;
  }

  updateSelectionCounter();

  // Render Sidebar List
  if (listContainer) {
    if (filtered.length === 0) {
      listContainer.innerHTML = '<div style="text-align:center;color:var(--muted);padding:2rem 1rem;font-size:0.78rem;">No notices found.<br/>Upload a PDF file or adjust the active filter.</div>';
    } else {
      let html = "";
      filtered.forEach(item => {
        const tagClass = item.type === "T" ? "temp" : (item.type === "P" ? "prelim" : "perm");
        const typeLabel = item.type === "T" ? "TEMP (T)" : (item.type === "P" ? "PRELIM (P)" : "PERM");
        const firstCoord = item.coords && item.coords[0] ? item.coords[0].dms : "—";
        const isChecked = item.checkedForExport !== false;

        const chartsStr = (item.charts && item.charts.length > 0) ? `Charts: ${item.charts.join(', ')}` : '';
        html += `
          <div class="ntm-card-item type-${item.type}" data-id="${item.id}" onclick="selectNtMNotice('${item.id}')">
            <input type="checkbox" class="ntm-card-chk" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleNoticeCheck('${item.id}', this.checked)" title="Include in export" />
            <div class="ntm-card-content">
              <div class="ntm-card-top">
                <span class="ntm-card-id">${item.id}</span>
                <span class="ntm-tag ${tagClass}">${typeLabel}</span>
              </div>
              <div class="ntm-card-region">${item.country || 'Region'} — ${item.region || ''}</div>
              <div class="ntm-card-subject">${item.subject || ''}</div>
              <div class="ntm-card-bottom">
                <span class="ntm-card-coords" title="Center on map">📍 ${firstCoord} ${item.coords && item.coords.length > 1 ? `(+${item.coords.length-1})` : ''}</span>
                ${chartsStr ? `<span class="ntm-card-charts">${chartsStr}</span>` : ''}
              </div>
            </div>
          </div>
        `;
      });
      listContainer.innerHTML = html;
    }
  }

  // Render on Leaflet Map
  if (leafletMap && leafletMarkersLayer) {
    leafletMarkersLayer.clearLayers();

    filtered.forEach(item => {
      if (!item.coords || item.coords.length === 0) return;

      const color = item.type === "T" ? "#ffc850" : (item.type === "P" ? "#bb86fc" : "#4fc3f7");

      // Polygons
      if (item.isPolygon && item.coords.length >= 3) {
        const polyPoints = item.coords.map(c => [c.lat, c.lon]);
        const polygon = L.polygon(polyPoints, {
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.25,
          dashArray: item.type === "T" ? "5, 5" : null
        });

        polygon.bindPopup(`
          <div style="font-family:'Segoe UI',sans-serif;color:#111;">
            <b style="color:#0a3888;font-size:1.05em;">${item.id}</b>
            <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">${item.country} — ${item.region}</div>
            <div style="font-size:0.9em;margin-bottom:6px;">${item.subject}</div>
            <div style="font-size:0.8em;color:#666;line-height:1.3;"><b>Affected Charts:</b> ${(item.charts||[]).join(', ') || '—'}</div>
          </div>
        `);
        leafletMarkersLayer.addLayer(polygon);
      } else if (item.isLine && item.coords.length >= 2) {
        // Line
        const linePoints = item.coords.map(c => [c.lat, c.lon]);
        const polyline = L.polyline(linePoints, {
          color: color,
          weight: 3,
          dashArray: item.type === "T" ? "6, 6" : null
        });
        polyline.bindPopup(`
          <div style="font-family:'Segoe UI',sans-serif;color:#111;">
            <b style="color:#0a3888;">${item.id}</b>
            <div style="font-size:0.85em;color:#555;">${item.country} — ${item.region}</div>
            <div style="font-size:0.9em;margin:4px 0;">${item.subject}</div>
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
            fillOpacity: 0.9
          });

          circle.bindPopup(`
            <div style="font-family:'Segoe UI',sans-serif;color:#111;">
              <b style="color:#0a3888;font-size:1.05em;">${item.id}</b>
              <div style="font-size:0.85em;color:#555;margin:2px 0 6px;">${item.country} — ${item.region}</div>
              <div style="font-size:0.9em;margin-bottom:6px;">${item.subject}</div>
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
