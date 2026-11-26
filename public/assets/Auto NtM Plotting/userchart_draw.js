/**
 * SetSail — Manual User Chart draw layer + Warnings corridor filter panel (v5.264)
 * Transparent Leaflet overlay for shapes/text; multi-layer CRUD in localStorage.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "setsail_usercharts_v1";
  var PANE = "userChartPane";
  var PANE_Z = 860;

  var state = {
    charts: [],
    activeId: null,
    tool: "select",
    color: "#f05a36",
    draftPts: [],
    draftLayer: null,
    mapHandlersBound: false,
    overlayOn: false
  };

  function uid() {
    return "uc_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  function map() {
    return global.leafletMap || null;
  }

  function loadStore() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (raw && Array.isArray(raw.charts) && raw.charts.length) {
        state.charts = raw.charts;
        state.activeId = raw.activeId || raw.charts[0].id;
        return;
      }
    } catch (e) {}
    var blank = { id: uid(), name: "User Chart 1", features: [] };
    state.charts = [blank];
    state.activeId = blank.id;
    persist();
  }

  function persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ charts: state.charts, activeId: state.activeId, v: 1 })
      );
    } catch (e) {}
  }

  function activeChart() {
    return state.charts.find(function (c) { return c.id === state.activeId; }) || state.charts[0];
  }

  function ensurePane(m) {
    if (!m || !m.createPane) return;
    if (!m.getPane(PANE)) {
      m.createPane(PANE);
      var pane = m.getPane(PANE);
      if (pane) {
        pane.style.zIndex = String(PANE_Z);
        pane.style.pointerEvents = "none";
      }
    }
  }

  function featureStyle(color) {
    var c = color || state.color || "#f05a36";
    return {
      color: c,
      weight: 2.5,
      opacity: 0.95,
      fillColor: c,
      fillOpacity: 0.18
    };
  }

  function leafletFromFeature(f) {
    if (!global.L || !f || !f.geometry) return null;
    var g = f.geometry;
    var props = f.properties || {};
    var color = props.color || state.color;
    var style = featureStyle(color);
    var layer = null;
    if (g.type === "LineString") {
      layer = L.polyline(
        (g.coordinates || []).map(function (c) { return [c[1], c[0]]; }),
        Object.assign({}, style, { fillOpacity: 0, pane: PANE })
      );
    } else if (g.type === "Polygon") {
      var ring = (g.coordinates && g.coordinates[0]) || [];
      layer = L.polygon(
        ring.map(function (c) { return [c[1], c[0]]; }),
        Object.assign({}, style, { pane: PANE })
      );
    } else if (g.type === "Point") {
      var lat = g.coordinates[1];
      var lon = g.coordinates[0];
      if (props.kind === "circle" && Number.isFinite(props.radiusM)) {
        layer = L.circle([lat, lon], {
          radius: props.radiusM,
          pane: PANE,
          color: color,
          weight: 2.5,
          opacity: 0.95,
          fillColor: color,
          fillOpacity: 0.15
        });
      } else if (props.kind === "text") {
        layer = L.marker([lat, lon], {
          pane: PANE,
          interactive: true,
          icon: L.divIcon({
            className: "ss-uc-text-marker",
            html:
              '<div class="ss-uc-text-label" style="color:' +
              color +
              ';">' +
              String(props.text || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;") +
              "</div>",
            iconSize: null
          })
        });
      } else {
        layer = L.circleMarker([lat, lon], {
          pane: PANE,
          radius: 5,
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.85
        });
      }
    }
    if (layer) {
      layer._ssUcId = props.id || f.id;
      layer.options = layer.options || {};
      layer.options.interactive = true;
      if (layer._path) layer._path.style.pointerEvents = "auto";
    }
    return layer;
  }

  function clearDraft() {
    var m = map();
    if (state.draftLayer && m) {
      try { m.removeLayer(state.draftLayer); } catch (e) {}
    }
    state.draftLayer = null;
    state.draftPts = [];
  }

  function getRenderGroup() {
    var m = map();
    if (!m || !global.L) return null;
    ensurePane(m);
    if (!m._ssUcGroup) {
      m._ssUcGroup = L.layerGroup([], { pane: PANE });
    }
    return m._ssUcGroup;
  }

  function rebuildMapLayers() {
    var m = map();
    var group = getRenderGroup();
    if (!m || !group) return;
    group.clearLayers();
    if (!state.overlayOn) {
      if (m.hasLayer(group)) m.removeLayer(group);
      return;
    }
    if (!m.hasLayer(group)) m.addLayer(group);
    var chart = activeChart();
    if (!chart) return;
    (chart.features || []).forEach(function (f) {
      var layer = leafletFromFeature(f);
      if (!layer) return;
      layer.on("click", function (ev) {
        if (state.tool !== "eraser") return;
        L.DomEvent.stopPropagation(ev);
        removeFeatureById(layer._ssUcId);
      });
      group.addLayer(layer);
      try {
        var el = layer.getElement && layer.getElement();
        if (el) el.style.pointerEvents = "auto";
      } catch (e0) {}
    });
    var pane = m.getPane(PANE);
    if (pane) {
      pane.style.pointerEvents = state.overlayOn && state.tool !== "select" ? "auto" : "none";
      // Allow hit-testing drawn paths even when pane is none for empty space
      Array.prototype.forEach.call(pane.querySelectorAll("path, .ss-uc-text-marker"), function (node) {
        node.style.pointerEvents = "auto";
      });
    }
  }

  function removeFeatureById(id) {
    var chart = activeChart();
    if (!chart || !id) return;
    chart.features = (chart.features || []).filter(function (f) {
      return (f.properties && f.properties.id) !== id && f.id !== id;
    });
    persist();
    rebuildMapLayers();
    renderLayerList();
  }

  function pushFeature(feature) {
    var chart = activeChart();
    if (!chart) return;
    if (!chart.features) chart.features = [];
    chart.features.push(feature);
    persist();
    rebuildMapLayers();
    renderLayerList();
  }

  function latLngToCoord(ll) {
    return [Number(ll.lng), Number(ll.lat)];
  }

  function finishPolyline(asPolygon) {
    if (state.draftPts.length < (asPolygon ? 3 : 2)) {
      clearDraft();
      return;
    }
    var coords = state.draftPts.map(latLngToCoord);
    var id = uid();
    if (asPolygon) {
      var ring = coords.slice();
      ring.push(coords[0]);
      pushFeature({
        type: "Feature",
        id: id,
        geometry: { type: "Polygon", coordinates: [ring] },
        properties: { id: id, kind: "polygon", color: state.color }
      });
    } else {
      pushFeature({
        type: "Feature",
        id: id,
        geometry: { type: "LineString", coordinates: coords },
        properties: { id: id, kind: "polyline", color: state.color }
      });
    }
    clearDraft();
  }

  function onMapClick(e) {
    if (!state.overlayOn) return;
    var tool = state.tool;
    if (tool === "select" || tool === "eraser") return;
    var m = map();
    if (!m || !global.L) return;
    L.DomEvent.stopPropagation(e);

    if (tool === "text") {
      var txt = window.prompt("Label text", "Note");
      if (txt == null || !String(txt).trim()) return;
      var idT = uid();
      pushFeature({
        type: "Feature",
        id: idT,
        geometry: { type: "Point", coordinates: latLngToCoord(e.latlng) },
        properties: { id: idT, kind: "text", text: String(txt).trim(), color: state.color }
      });
      return;
    }

    if (tool === "polyline" || tool === "polygon") {
      state.draftPts.push(e.latlng);
      if (state.draftLayer) {
        try { m.removeLayer(state.draftLayer); } catch (e1) {}
      }
      var style = featureStyle(state.color);
      if (tool === "polygon" && state.draftPts.length >= 3) {
        state.draftLayer = L.polygon(state.draftPts, Object.assign({}, style, { pane: PANE, dashArray: "4 4" }));
      } else {
        state.draftLayer = L.polyline(state.draftPts, Object.assign({}, style, { pane: PANE, dashArray: "4 4", fillOpacity: 0 }));
      }
      m.addLayer(state.draftLayer);
      return;
    }

    if (tool === "rect") {
      state.draftPts.push(e.latlng);
      if (state.draftPts.length === 1) return;
      var a = state.draftPts[0];
      var b = state.draftPts[1];
      var south = Math.min(a.lat, b.lat);
      var north = Math.max(a.lat, b.lat);
      var west = Math.min(a.lng, b.lng);
      var east = Math.max(a.lng, b.lng);
      var idR = uid();
      pushFeature({
        type: "Feature",
        id: idR,
        geometry: {
          type: "Polygon",
          coordinates: [[
            [west, south], [east, south], [east, north], [west, north], [west, south]
          ]]
        },
        properties: { id: idR, kind: "rect", color: state.color }
      });
      clearDraft();
      return;
    }

    if (tool === "circle") {
      state.draftPts.push(e.latlng);
      if (state.draftPts.length === 1) return;
      var c0 = state.draftPts[0];
      var c1 = state.draftPts[1];
      var radiusM = c0.distanceTo(c1);
      var idC = uid();
      pushFeature({
        type: "Feature",
        id: idC,
        geometry: { type: "Point", coordinates: latLngToCoord(c0) },
        properties: { id: idC, kind: "circle", radiusM: radiusM, color: state.color }
      });
      clearDraft();
    }
  }

  function onMapDblClick(e) {
    if (!state.overlayOn) return;
    if (state.tool === "polyline") {
      L.DomEvent.stop(e);
      finishPolyline(false);
    } else if (state.tool === "polygon") {
      L.DomEvent.stop(e);
      finishPolyline(true);
    }
  }

  function bindMapHandlers() {
    var m = map();
    if (!m || state.mapHandlersBound) return;
    m.on("click", onMapClick);
    m.on("dblclick", onMapDblClick);
    state.mapHandlersBound = true;
  }

  function setTool(tool) {
    state.tool = tool || "select";
    clearDraft();
    var m = map();
    if (m) {
      var pane = m.getPane(PANE);
      if (pane) pane.style.pointerEvents = state.overlayOn && state.tool !== "select" ? "auto" : "none";
      if (state.overlayOn && state.tool !== "select" && state.tool !== "eraser") {
        try { m.doubleClickZoom.disable(); } catch (e) {}
      } else {
        try { m.doubleClickZoom.enable(); } catch (e2) {}
      }
    }
    syncToolbarUI();
  }

  function setOverlayActive(on) {
    state.overlayOn = !!on;
    var rail = document.getElementById("ssUcDrawRail");
    if (rail) rail.hidden = !state.overlayOn;
    var tab = document.getElementById("tabOverlayUserChart");
    if (tab) {
      tab.classList.toggle("active", state.overlayOn);
      tab.setAttribute("aria-pressed", state.overlayOn ? "true" : "false");
    }
    if (state.overlayOn) {
      bindMapHandlers();
      setTool(state.tool === "select" ? "polyline" : state.tool);
    } else {
      clearDraft();
      setTool("select");
      var m = map();
      if (m) {
        try { m.doubleClickZoom.enable(); } catch (e) {}
      }
      closeLayerPanel();
    }
    rebuildMapLayers();
    if (global.OVERLAY_STATES) global.OVERLAY_STATES.userchart = state.overlayOn;
  }

  function syncToolbarUI() {
    document.querySelectorAll("#ssUcDrawRail [data-uc-tool]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-uc-tool") === state.tool);
    });
    var colorInp = document.getElementById("ssUcColorInput");
    if (colorInp && colorInp.value !== state.color) colorInp.value = state.color;
  }

  function renderLayerList() {
    var list = document.getElementById("ssUcLayerList");
    if (!list) return;
    list.innerHTML = "";
    state.charts.forEach(function (c) {
      var row = document.createElement("div");
      row.className = "ss-uc-layer-row" + (c.id === state.activeId ? " is-active" : "");
      var nFeat = (c.features || []).length;
      row.innerHTML =
        '<button type="button" class="ss-uc-layer-pick" data-id="' +
        c.id +
        '"><span class="ss-uc-layer-name"></span><span class="ss-uc-layer-meta">' +
        nFeat +
        " obj</span></button>" +
        '<button type="button" class="ss-uc-layer-del" data-id="' +
        c.id +
        '" title="Delete chart" aria-label="Delete">×</button>';
      row.querySelector(".ss-uc-layer-name").textContent = c.name || "Untitled";
      list.appendChild(row);
    });
  }

  function openLayerPanel() {
    var panel = document.getElementById("ssUcLayerPanel");
    var btn = document.getElementById("btnUserChartLayers");
    if (panel) {
      panel.hidden = false;
      panel.classList.add("is-open");
    }
    if (btn) btn.setAttribute("aria-expanded", "true");
    renderLayerList();
  }

  function closeLayerPanel() {
    var panel = document.getElementById("ssUcLayerPanel");
    var btn = document.getElementById("btnUserChartLayers");
    if (panel) {
      panel.hidden = true;
      panel.classList.remove("is-open");
    }
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function toggleLayerPanel(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    var panel = document.getElementById("ssUcLayerPanel");
    if (panel && !panel.hidden) closeLayerPanel();
    else openLayerPanel();
  }

  function createChart() {
    var n = state.charts.length + 1;
    var blank = { id: uid(), name: "User Chart " + n, features: [] };
    state.charts.push(blank);
    state.activeId = blank.id;
    persist();
    renderLayerList();
    rebuildMapLayers();
    if (!state.overlayOn && typeof global.setOverlayActive === "function") {
      global.setOverlayActive("userchart", true, map());
    } else {
      setOverlayActive(true);
    }
  }

  function deleteChart(id) {
    if (state.charts.length <= 1) {
      var only = state.charts[0];
      if (only) {
        only.features = [];
        only.name = "User Chart 1";
        state.activeId = only.id;
      }
    } else {
      state.charts = state.charts.filter(function (c) { return c.id !== id; });
      if (state.activeId === id) state.activeId = state.charts[0].id;
    }
    persist();
    renderLayerList();
    rebuildMapLayers();
  }

  function selectChart(id) {
    state.activeId = id;
    persist();
    renderLayerList();
    rebuildMapLayers();
    if (!state.overlayOn && typeof global.setOverlayActive === "function") {
      global.setOverlayActive("userchart", true, map());
    } else {
      setOverlayActive(true);
    }
  }

  /* ── Warnings corridor filter panel (replaces info "i") ── */
  function syncWarnFilterUI() {
    var enabled = !!global.ROUTE_CORRIDOR_FILTER_ENABLED;
    var nm = Number(global.ROUTE_CORRIDOR_BUFFER_NM);
    if (!Number.isFinite(nm)) nm = 25;
    nm = Math.max(1, Math.min(250, Math.round(nm)));
    var chk = document.getElementById("ssWarnCorrEnable");
    var rng = document.getElementById("ssWarnCorrNm");
    var lbl = document.getElementById("ssWarnCorrLbl");
    if (chk) chk.checked = enabled;
    if (rng) rng.value = String(nm);
    if (lbl) lbl.textContent = "±" + nm + " NM";
  }

  function applyWarnFilterFromPanel() {
    var chk = document.getElementById("ssWarnCorrEnable");
    var rng = document.getElementById("ssWarnCorrNm");
    var enabled = !!(chk && chk.checked);
    var nm = rng ? Number(rng.value) : 25;
    if (!Number.isFinite(nm)) nm = 25;
    nm = Math.max(1, Math.min(250, Math.round(nm)));
    global.ROUTE_CORRIDOR_FILTER_ENABLED = enabled;
    global.ROUTE_CORRIDOR_BUFFER_NM = nm;
    try { localStorage.setItem("setsail_route_buffer_nm", String(nm)); } catch (e) {}
    var miniRng = document.getElementById("rngRouteBufferNm");
    var miniLbl = document.getElementById("lblRouteBufferNm");
    var miniBtn = document.getElementById("btnRouteMiniFilter");
    var miniChk = document.getElementById("chkRouteCorridorOnly");
    if (miniRng) miniRng.value = String(nm);
    if (miniLbl) miniLbl.textContent = "±" + nm + " NM";
    if (miniBtn) miniBtn.setAttribute("aria-pressed", enabled ? "true" : "false");
    if (miniChk) miniChk.checked = enabled;
    if (typeof global.scheduleRouteCorridorLayersRefresh === "function") {
      global.scheduleRouteCorridorLayersRefresh();
    } else if (typeof global.renderNtMListAndMap === "function") {
      global.renderNtMListAndMap();
    }
    syncWarnFilterUI();
  }

  function toggleWarnFilterPanel(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    var panel = document.getElementById("ssWarnFilterPanel");
    var btn = document.getElementById("btnNtmWarnFilterToggle");
    if (!panel) return;
    var open = panel.hidden;
    panel.hidden = !open;
    panel.classList.toggle("is-open", open);
    if (btn) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.classList.toggle("is-open", open);
    }
    if (open) syncWarnFilterUI();
  }

  function wireDom() {
    function bindChevron(el, handler) {
      if (!el || el.dataset.ssWired) return;
      el.dataset.ssWired = "1";
      el.addEventListener("click", handler);
      el.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          handler(ev);
        }
      });
    }
    bindChevron(document.getElementById("btnNtmWarnFilterToggle"), toggleWarnFilterPanel);
    var warnPanel = document.getElementById("ssWarnFilterPanel");
    if (warnPanel && !warnPanel.dataset.ssWired) {
      warnPanel.dataset.ssWired = "1";
      warnPanel.addEventListener("click", function (e) { e.stopPropagation(); });
      var chk = document.getElementById("ssWarnCorrEnable");
      var rng = document.getElementById("ssWarnCorrNm");
      if (chk) chk.addEventListener("change", applyWarnFilterFromPanel);
      if (rng) {
        rng.addEventListener("input", function () {
          var lbl = document.getElementById("ssWarnCorrLbl");
          var nm = Number(rng.value) || 25;
          if (lbl) lbl.textContent = "±" + nm + " NM";
        });
        rng.addEventListener("change", applyWarnFilterFromPanel);
      }
    }

    bindChevron(document.getElementById("btnUserChartLayers"), toggleLayerPanel);
    var layerPanel = document.getElementById("ssUcLayerPanel");
    if (layerPanel && !layerPanel.dataset.ssWired) {
      layerPanel.dataset.ssWired = "1";
      layerPanel.addEventListener("click", function (e) { e.stopPropagation(); });
      var addBtn = document.getElementById("ssUcLayerAdd");
      if (addBtn) addBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        createChart();
      });
      layerPanel.addEventListener("click", function (e) {
        var del = e.target.closest(".ss-uc-layer-del");
        if (del) {
          e.stopPropagation();
          deleteChart(del.getAttribute("data-id"));
          return;
        }
        var pick = e.target.closest(".ss-uc-layer-pick");
        if (pick) {
          e.stopPropagation();
          selectChart(pick.getAttribute("data-id"));
        }
      });
    }

    var rail = document.getElementById("ssUcDrawRail");
    if (rail && !rail.dataset.ssWired) {
      rail.dataset.ssWired = "1";
      rail.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-uc-tool]");
        if (!btn) return;
        e.stopPropagation();
        setTool(btn.getAttribute("data-uc-tool"));
      });
      var colorInp = document.getElementById("ssUcColorInput");
      if (colorInp) {
        colorInp.addEventListener("input", function () {
          state.color = colorInp.value || "#f05a36";
        });
        colorInp.addEventListener("click", function (e) { e.stopPropagation(); });
      }
    }

    document.addEventListener("keydown", function (ev) {
      if (!state.overlayOn) return;
      if (ev.key === "Enter") {
        if (state.tool === "polyline") finishPolyline(false);
        else if (state.tool === "polygon") finishPolyline(true);
      } else if (ev.key === "Escape") {
        clearDraft();
      }
    });
  }

  function getExportFeatures() {
    var out = [];
    state.charts.forEach(function (c) {
      (c.features || []).forEach(function (f) {
        var copy = JSON.parse(JSON.stringify(f));
        copy.properties = copy.properties || {};
        copy.properties.layer = "UserChart_Manual";
        copy.properties.chartName = c.name || "";
        copy.properties.chartId = c.id;
        out.push(copy);
      });
    });
    return out;
  }

  function getActiveExportFeatures() {
    var c = activeChart();
    if (!c) return [];
    return (c.features || []).map(function (f) {
      var copy = JSON.parse(JSON.stringify(f));
      copy.properties = copy.properties || {};
      copy.properties.layer = "UserChart_Manual";
      copy.properties.chartName = c.name || "";
      copy.properties.chartId = c.id;
      return copy;
    });
  }

  function countObjects() {
    var n = 0;
    state.charts.forEach(function (c) { n += (c.features || []).length; });
    return n;
  }

  function init() {
    loadStore();
    wireDom();
    syncWarnFilterUI();
    syncToolbarUI();
    var rail = document.getElementById("ssUcDrawRail");
    if (rail) rail.hidden = true;
    closeLayerPanel();
  }

  global.SetSailUserChartDraw = {
    init: init,
    setOverlayActive: setOverlayActive,
    isActive: function () { return state.overlayOn; },
    getExportFeatures: getExportFeatures,
    getActiveExportFeatures: getActiveExportFeatures,
    countObjects: countObjects,
    rebuild: rebuildMapLayers,
    syncWarnFilterUI: syncWarnFilterUI
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
