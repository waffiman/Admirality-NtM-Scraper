/**
 * SetSail — Manual User Chart Draw Suite + Warnings Corridor Filter Panel (v5.276)
 * --------------------------------------------------------------------------------
 * 6-tool floating eyebrow toolbar (#ssUcDrawRail):
 *   1. Cursor (select)  — Default on Draw activation; normal arrow cursor; pan map;
 *                         resize shapes by holding LMB on contour; move shapes/text
 *                         by holding LMB on interior area.
 *   2. Brush (brush)    — Brush cursor; map panning disabled; freehand draw with LMB.
 *   3. Shapes (shapes)  — Opens visual block/shape/polygon picker (Rectangle, Circle,
 *                         Ellipse, Triangle, Diamond, Hexagon, Arrow, Polygon);
 *                         remembers last chosen shape; auto-resets to Cursor-Arrow
 *                         immediately after placing a simple shape (polygon stays active
 *                         while clicking vertices until completed).
 *   4. Text (text)      — Places interactive text field on chart and immediately resets
 *                         the tool/cursor back to neutral Cursor-Arrow while focusing
 *                         the new text box:
 *                         - Drag corner to scale font size up/down;
 *                         - Drag vertical (left/right) borders to widen/narrow 1 line;
 *                         - Drag horizontal (top/bottom) borders to add/remove lines;
 *                         - Drag interior/handle to move across chart.
 *   5. Eraser (eraser)  — Eraser cursor; touching (click or LMB sweep) any drawn
 *                         object deletes it immediately.
 *   6. Color (palette)  — Opens color palette popover (12 marine/ECDIS swatches +
 *                         custom color picker); colors brush, shapes/blocks, and text.
 *
 * Also manages #ssUcLayerPanel ("^" popup on the Draw tile):
 *   - Select active user chart, inline-rename any user chart, add new user charts,
 *     and delete user charts.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "setsail_usercharts_v1";
  var PANE = "userChartPane";
  var PANE_Z = 860;
  var BORDER_HIT_PX = 11;

  var PALETTE_COLORS = [
    { hex: "#f05a36", name: "Coral" },
    { hex: "#ef4444", name: "Alarm Red" },
    { hex: "#f59e0b", name: "Amber" },
    { hex: "#facc15", name: "Yellow" },
    { hex: "#22c55e", name: "Green" },
    { hex: "#10b981", name: "Teal" },
    { hex: "#06b6d4", name: "Cyan" },
    { hex: "#38bdf8", name: "Sky Blue" },
    { hex: "#3b82f6", name: "Royal Blue" },
    { hex: "#a855f7", name: "Purple" },
    { hex: "#f8fafc", name: "White" },
    { hex: "#0f172a", name: "Navy Black" }
  ];

  var SHAPE_CATALOG = [
    { kind: "rect", label: "Rectangle", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="1.5"/></svg>' },
    { kind: "circle", label: "Circle", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/></svg>' },
    { kind: "line", label: "Straight Line", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="20" x2="20" y2="4"/><circle cx="4" cy="20" r="2" fill="currentColor"/><circle cx="20" cy="4" r="2" fill="currentColor"/></svg>' },
    { kind: "ellipse", label: "Ellipse", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="9.5" ry="6"/></svg>' },
    { kind: "triangle", label: "Triangle", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 4 21 19 3 19"/></svg>' },
    { kind: "diamond", label: "Diamond", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 3 21 12 12 21 3 12"/></svg>' },
    { kind: "hexagon", label: "Hexagon", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="7 4 17 4 22 12 17 20 7 20 2 12"/></svg>' },
    { kind: "arrow", label: "Arrow Block", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="3 9 13 9 13 5 21 12 13 19 13 15 3 15"/></svg>' },
    { kind: "polygon", label: "Free Polygon", icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l8 5.5-2.8 11H6.8L4 8.5 12 3z"/><circle cx="12" cy="3" r="1.6" fill="currentColor"/><circle cx="20" cy="8.5" r="1.6" fill="currentColor"/><circle cx="17.2" cy="19.5" r="1.6" fill="currentColor"/><circle cx="6.8" cy="19.5" r="1.6" fill="currentColor"/><circle cx="4" cy="8.5" r="1.6" fill="currentColor"/></svg>' }
  ];

  var state = {
    charts: [],
    activeId: null,
    tool: "select",
    shapeKind: "rect",
    color: "#f05a36",
    selectedFeatureId: null,
    editingLabelFeatureId: null,
    draftPts: [],
    draftLayer: null,
    mapHandlersBound: false,
    overlayOn: false,
    shapesMenuOpen: false,
    paletteOpen: false,
    action: null,
    suppressNextClick: false
  };

  var layerById = Object.create(null);
  var labelLayerById = Object.create(null);

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
        if (raw.lastShapeKind && SHAPE_CATALOG.some(function (s) { return s.kind === raw.lastShapeKind; })) {
          state.shapeKind = raw.lastShapeKind;
        }
        if (raw.lastColor) {
          state.color = raw.lastColor;
        }
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
        JSON.stringify({
          charts: state.charts,
          activeId: state.activeId,
          lastShapeKind: state.shapeKind,
          lastColor: state.color,
          v: 2
        })
      );
    } catch (e) {}
  }

  function activeChart() {
    return state.charts.find(function (c) { return c.id === state.activeId; }) || state.charts[0];
  }

  function findFeatureById(id) {
    var chart = activeChart();
    if (!chart || !id) return null;
    return (chart.features || []).find(function (f) {
      return (f.properties && f.properties.id) === id || f.id === id;
    }) || null;
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

  function featureStyle(color, isSelected, kind) {
    var c = color || state.color || "#f05a36";
    var isBrush = kind === "brush" || kind === "polyline";
    return {
      color: c,
      weight: isSelected ? 3.8 : (isBrush ? 3.2 : 2.6),
      opacity: 0.96,
      fillColor: c,
      fillOpacity: isBrush ? 0 : (isSelected ? 0.28 : 0.18),
      lineCap: "round",
      lineJoin: "round"
    };
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getTextBoxZoomScale(props) {
    var m = map();
    var curZoom = (m && typeof m.getZoom === "function") ? Number(m.getZoom()) : 8;
    if (!Number.isFinite(curZoom)) curZoom = 8;
    if (props && !Number.isFinite(Number(props.baseZoom))) {
      props.baseZoom = curZoom;
    }
    var baseZoom = (props && Number.isFinite(Number(props.baseZoom))) ? Number(props.baseZoom) : curZoom;
    return Math.pow(2, curZoom - baseZoom);
  }

  function syncTextBoxesZoomScale() {
    var m = map();
    var chart = activeChart();
    if (!m || !chart || !Array.isArray(chart.features)) return;
    chart.features.forEach(function (f) {
      if (!f || !f.properties || f.properties.kind !== "text") return;
      var fId = f.properties.id || f.id;
      var marker = layerById[fId];
      var el = marker && marker.getElement && marker.getElement();
      var box = el && el.querySelector(".ss-uc-textbox");
      if (!box) return;
      var zScale = getTextBoxZoomScale(f.properties);
      var invScale = Math.min(4.0, Math.max(0.25, 1 / zScale));
      box.style.transform = "scale(" + zScale.toFixed(5) + ")";
      box.style.transformOrigin = "0 0";
      box.style.setProperty("--uc-tb-inv-scale", invScale.toFixed(4));
    });
  }

  function buildTextBoxHtml(f) {
    var props = (f && f.properties) || {};
    var id = props.id || (f && f.id) || "";
    var color = props.color || state.color || "#f05a36";
    var fontSize = Math.max(8, Math.min(120, Number(props.fontSize) || 15));
    var widthPx = Math.max(48, Math.min(1200, Number(props.widthPx) || 148));
    var rows = Math.max(1, Math.min(20, Number(props.rows) || 1));
    var lineH = Math.round(fontSize * 1.32);
    var heightPx = Math.max(lineH + 10, rows * lineH + 10);
    var isSel = state.selectedFeatureId === id;
    var textVal = String(props.text != null ? props.text : "Text");
    var zScale = getTextBoxZoomScale(props);
    var invScale = Math.min(4.0, Math.max(0.25, 1 / zScale));

    return (
      '<div class="ss-uc-textbox' + (isSel ? " is-selected" : "") + '" data-uc-id="' + escapeHtml(id) + '" ' +
        'style="--uc-tb-color:' + escapeHtml(color) + ';--uc-tb-inv-scale:' + invScale.toFixed(4) + ';width:' + widthPx + 'px;transform:scale(' + zScale.toFixed(5) + ');transform-origin:0 0;">' +
        '<div class="ss-uc-tb-movebar" data-tb-handle="move" title="Hold LMB to move text box"><span>⠿</span></div>' +
        '<textarea class="ss-uc-tb-input" data-uc-id="' + escapeHtml(id) + '" rows="' + rows + '" spellcheck="false" placeholder="Type text…" ' +
          'style="color:' + escapeHtml(color) + ';font-size:' + fontSize + 'px;line-height:' + lineH + 'px;width:' + widthPx + 'px;height:' + heightPx + 'px;">' +
          escapeHtml(textVal) +
        '</textarea>' +
        '<span class="ss-uc-tb-edge ss-uc-tb-edge-l" data-tb-handle="edge-l" title="Drag vertical border to expand/shrink line width"></span>' +
        '<span class="ss-uc-tb-edge ss-uc-tb-edge-r" data-tb-handle="edge-r" title="Drag vertical border to expand/shrink line width"></span>' +
        '<span class="ss-uc-tb-edge ss-uc-tb-edge-t" data-tb-handle="edge-t" title="Drag horizontal border to add/remove lines"></span>' +
        '<span class="ss-uc-tb-edge ss-uc-tb-edge-b" data-tb-handle="edge-b" title="Drag horizontal border to add/remove lines"></span>' +
        '<span class="ss-uc-tb-corner ss-uc-tb-corner-tl" data-tb-handle="corner-tl" title="Drag corner to scale text size"></span>' +
        '<span class="ss-uc-tb-corner ss-uc-tb-corner-tr" data-tb-handle="corner-tr" title="Drag corner to scale text size"></span>' +
        '<span class="ss-uc-tb-corner ss-uc-tb-corner-bl" data-tb-handle="corner-bl" title="Drag corner to scale text size"></span>' +
        '<span class="ss-uc-tb-corner ss-uc-tb-corner-br" data-tb-handle="corner-br" title="Drag corner to scale text size"></span>' +
      '</div>'
    );
  }

  function leafletFromFeature(f) {
    if (!global.L || !f || !f.geometry) return null;
    var g = f.geometry;
    var props = f.properties || {};
    var fId = props.id || f.id;
    var color = props.color || state.color;
    var isSel = state.selectedFeatureId === fId;
    var style = featureStyle(color, isSel, props.kind);
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
          radius: Math.max(5, Number(props.radiusM) || 500),
          pane: PANE,
          color: color,
          weight: isSel ? 3.8 : 2.6,
          opacity: 0.96,
          fillColor: color,
          fillOpacity: isSel ? 0.26 : 0.16
        });
      } else if (props.kind === "text") {
        layer = L.marker([lat, lon], {
          pane: PANE,
          interactive: true,
          keyboard: false,
          icon: L.divIcon({
            className: "ss-uc-text-marker",
            html: buildTextBoxHtml(f),
            iconSize: null,
            iconAnchor: [14, 14]
          })
        });
      } else {
        layer = L.circleMarker([lat, lon], {
          pane: PANE,
          radius: 6,
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.85
        });
      }
    }
    if (layer) {
      layer._ssUcId = fId;
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

  function wireTextBoxEvents(marker, f) {
    var el = marker.getElement && marker.getElement();
    if (!el) return;
    var box = el.querySelector(".ss-uc-textbox");
    if (!box || box.dataset.ssWired === "1") return;
    box.dataset.ssWired = "1";
    var fId = (f.properties && f.properties.id) || f.id;
    var ta = box.querySelector(".ss-uc-tb-input");

    if (ta) {
      ta.addEventListener("mousedown", function (ev) {
        if (state.tool === "eraser") {
          ev.preventDefault();
          ev.stopPropagation();
          removeFeatureById(fId);
          return;
        }
        state.selectedFeatureId = fId;
        box.classList.add("is-selected");
        if (state.tool === "select") {
          startTextBoxInteriorDragOrFocus(ev, f, marker, box, ta);
          return;
        }
        ev.stopPropagation();
      });

      ta.addEventListener("input", function () {
        f.properties = f.properties || {};
        f.properties.text = ta.value;
        persist();
      });

      ta.addEventListener("focus", function () {
        state.selectedFeatureId = fId;
        box.classList.add("is-selected");
      });
    }

    box.addEventListener("mousedown", function (ev) {
      if (ev.button !== 0) return;
      if (state.tool === "eraser") {
        ev.preventDefault();
        ev.stopPropagation();
        removeFeatureById(fId);
        return;
      }
      var handleEl = ev.target.closest("[data-tb-handle]");
      if (!handleEl) return;
      var handle = handleEl.getAttribute("data-tb-handle");
      ev.preventDefault();
      ev.stopPropagation();
      state.selectedFeatureId = fId;
      box.classList.add("is-selected");
      startTextBoxHandleAction(ev, f, marker, box, ta, handle);
    });

    box.addEventListener("mouseover", function (ev) {
      if (state.tool === "eraser" && (ev.buttons & 1) === 1) {
        removeFeatureById(fId);
      }
    });
  }

  function startTextBoxInteriorDragOrFocus(ev, f, marker, box, ta) {
    if (ev.button !== 0) return;
    var m = map();
    if (!m) return;
    ev.stopPropagation();
    var startX = ev.clientX;
    var startY = ev.clientY;
    var origLat = f.geometry.coordinates[1];
    var origLon = f.geometry.coordinates[0];
    var origPt = m.latLngToContainerPoint([origLat, origLon]);
    var moved = false;

    try { m.dragging.disable(); } catch (e0) {}

    function onMove(mv) {
      var dx = mv.clientX - startX;
      var dy = mv.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 4) {
        moved = true;
        try { ta.blur(); } catch (eB) {}
      }
      if (!moved) return;
      var nextLl = m.containerPointToLatLng([origPt.x + dx, origPt.y + dy]);
      f.geometry.coordinates = [Number(nextLl.lng), Number(nextLl.lat)];
      marker.setLatLng(nextLl);
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove, true);
      window.removeEventListener("mouseup", onUp, true);
      syncMapDragState();
      if (moved) {
        persist();
      } else {
        try { ta.focus(); } catch (eF) {}
      }
    }

    window.addEventListener("mousemove", onMove, true);
    window.addEventListener("mouseup", onUp, true);
  }

  function startTextBoxHandleAction(ev, f, marker, box, ta, handle) {
    var m = map();
    if (!m) return;
    f.properties = f.properties || {};
    var startX = ev.clientX;
    var startY = ev.clientY;
    // Normalize baseZoom to current map zoom on intentional resize drag so 1px drag = 1px at current zoom
    // and the new geographic size in NM is locked to the chart from this zoom level onwards!
    var curZoom = (typeof m.getZoom === "function") ? Number(m.getZoom()) : 8;
    var zScale0 = getTextBoxZoomScale(f.properties);
    if (handle !== "move" && Math.abs(zScale0 - 1) > 1e-4) {
      f.properties.fontSize = Math.max(8, Math.min(120, Math.round((Number(f.properties.fontSize) || 15) * zScale0)));
      f.properties.widthPx = Math.max(48, Math.min(1200, Math.round((Number(f.properties.widthPx) || 148) * zScale0)));
      f.properties.baseZoom = curZoom;
    } else if (!Number.isFinite(Number(f.properties.baseZoom))) {
      f.properties.baseZoom = curZoom;
    }
    var origFontSize = Math.max(8, Math.min(120, Number(f.properties.fontSize) || 15));
    var origWidth = Math.max(48, Math.min(1200, Number(f.properties.widthPx) || 148));
    var origRows = Math.max(1, Math.min(20, Number(f.properties.rows) || 1));
    var origLat = f.geometry.coordinates[1];
    var origLon = f.geometry.coordinates[0];
    var origPt = m.latLngToContainerPoint([origLat, origLon]);

    try { m.dragging.disable(); } catch (e0) {}

    function applyBoxDom() {
      var fs = Math.max(8, Math.min(120, Number(f.properties.fontSize) || 15));
      var wp = Math.max(48, Math.min(1200, Number(f.properties.widthPx) || 148));
      var rw = Math.max(1, Math.min(20, Number(f.properties.rows) || 1));
      var lh = Math.round(fs * 1.32);
      var hp = Math.max(lh + 10, rw * lh + 10);
      var zScale = getTextBoxZoomScale(f.properties);
      var invScale = Math.min(4.0, Math.max(0.25, 1 / zScale));
      box.style.width = wp + "px";
      box.style.transform = "scale(" + zScale.toFixed(5) + ")";
      box.style.transformOrigin = "0 0";
      box.style.setProperty("--uc-tb-inv-scale", invScale.toFixed(4));
      if (ta) {
        ta.rows = rw;
        ta.style.fontSize = fs + "px";
        ta.style.lineHeight = lh + "px";
        ta.style.width = wp + "px";
        ta.style.height = hp + "px";
      }
      // Show live geographic NM dimensions while resizing Text Box
      try {
        var topLeftPt = m.latLngToContainerPoint([f.geometry.coordinates[1], f.geometry.coordinates[0]]);
        var rightLl = m.containerPointToLatLng([topLeftPt.x + wp * zScale, topLeftPt.y]);
        var botLl = m.containerPointToLatLng([topLeftPt.x, topLeftPt.y + hp * zScale]);
        var wNm = m.distance([f.geometry.coordinates[1], f.geometry.coordinates[0]], rightLl) / 1852;
        var hNm = m.distance([f.geometry.coordinates[1], f.geometry.coordinates[0]], botLl) / 1852;
        var centerLl = m.containerPointToLatLng([topLeftPt.x + (wp * zScale) * 0.5, topLeftPt.y - 12]);
        showResizeHudAtLatLng(centerLl, fmtNmVal(wNm) + " × " + fmtNmVal(hNm) + " NM");
      } catch (eHud) {}
    }

    function onMove(mv) {
      var dx = mv.clientX - startX;
      var dy = mv.clientY - startY;

      if (handle === "move") {
        var nextLl = m.containerPointToLatLng([origPt.x + dx, origPt.y + dy]);
        f.geometry.coordinates = [Number(nextLl.lng), Number(nextLl.lat)];
        marker.setLatLng(nextLl);
        return;
      }

      if (handle === "edge-r" || handle === "edge-l") {
        var signW = handle === "edge-r" ? 1 : -1;
        f.properties.widthPx = Math.round(Math.max(64, Math.min(680, origWidth + signW * dx)));
        applyBoxDom();
        return;
      }

      if (handle === "edge-b" || handle === "edge-t") {
        var signH = handle === "edge-b" ? 1 : -1;
        var lh = Math.max(14, Math.round(origFontSize * 1.32));
        var deltaRows = Math.round((signH * dy) / lh);
        var nextRows = Math.max(1, Math.min(20, origRows + deltaRows));
        if (nextRows !== f.properties.rows) {
          f.properties.rows = nextRows;
          if (ta) {
            var curLines = String(ta.value || "").split("\n");
            while (curLines.length < nextRows) {
              curLines.push("");
            }
            if (curLines.length > nextRows) {
              while (curLines.length > nextRows && curLines[curLines.length - 1] === "") {
                curLines.pop();
              }
            }
            ta.value = curLines.join("\n");
            f.properties.text = ta.value;
          }
          applyBoxDom();
        }
        return;
      }

      if (handle && handle.indexOf("corner-") === 0) {
        var sx = (handle === "corner-tr" || handle === "corner-br") ? 1 : -1;
        var sy = (handle === "corner-bl" || handle === "corner-br") ? 1 : -1;
        var diagDelta = (sx * dx + sy * dy) * 0.5;
        var nextFs = Math.round(Math.max(10, Math.min(64, origFontSize + diagDelta * 0.18)));
        var scaleRatio = nextFs / origFontSize;
        f.properties.fontSize = nextFs;
        f.properties.widthPx = Math.round(Math.max(64, Math.min(680, origWidth * scaleRatio)));
        applyBoxDom();
      }
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove, true);
      window.removeEventListener("mouseup", onUp, true);
      hideResizeHud();
      syncMapDragState();
      persist();
    }

    window.addEventListener("mousemove", onMove, true);
    window.addEventListener("mouseup", onUp, true);
  }

  /* ── Auto-Sized Inline / Above-Line Captions for Geometric Shapes ── */
  function computeShapeLabelLayout(f) {
    var m = map();
    if (!m || !f || !f.geometry) return null;
    var g = f.geometry;
    var props = f.properties || {};
    var kind = String(props.kind || "").toLowerCase();
    if (kind === "text") return null;

    var labelText = String(props.label != null ? props.label : "");
    var charCount = Math.max(4, labelText.trim().length || 6);

    // 1. Circle -> Fit inside circle (strictly proportional to geographic radius on chart)
    if (g.type === "Point" && kind === "circle" && Number.isFinite(props.radiusM)) {
      var cLl = L.latLng(g.coordinates[1], g.coordinates[0]);
      var cPt = m.latLngToContainerPoint(cLl);
      var edgeLl = L.latLng(cLl.lat, cLl.lng + (props.radiusM / (111320 * Math.max(0.1, Math.cos(cLl.lat * Math.PI / 180)))));
      var edgePt = m.latLngToContainerPoint(edgeLl);
      var radPx = Math.max(2, Math.hypot(edgePt.x - cPt.x, edgePt.y - cPt.y));
      var boxW = Math.max(4, Math.round(radPx * 1.48));
      var boxH = Math.max(4, Math.round(radPx * 1.25));
      var fsByBox = Math.min(boxW * 0.22, boxH * 0.38);
      var fsByChars = (boxW * 1.35) / Math.max(4, Math.sqrt(charCount) * 1.85);
      var fontSize = Math.max(1, Number(Math.min(fsByBox, fsByChars).toFixed(2)));
      return {
        latlng: cLl,
        placement: "inside",
        angleDeg: 0,
        boxW: boxW,
        boxH: boxH,
        fontSize: fontSize
      };
    }

    // 2. Closed Polygon / Shape -> Fit inside shape area (strictly proportional to geographic shape bounds)
    if (g.type === "Polygon" && Array.isArray(g.coordinates) && Array.isArray(g.coordinates[0])) {
      var ring = g.coordinates[0];
      if (ring.length < 3) return null;
      var minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
      var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      ring.forEach(function (c) {
        if (c[1] < minLat) minLat = c[1];
        if (c[1] > maxLat) maxLat = c[1];
        if (c[0] < minLon) minLon = c[0];
        if (c[0] > maxLon) maxLon = c[0];
        var pt = m.latLngToContainerPoint([c[1], c[0]]);
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      });
      var cLat = (minLat + maxLat) * 0.5;
      var cLon = (minLon + maxLon) * 0.5;
      if (kind === "triangle") {
        // Shift centroid slightly toward base so text sits inside the wider lower part of the triangle
        cLat = minLat + (maxLat - minLat) * 0.38;
      }
      var wPx = Math.max(4, maxX - minX);
      var hPx = Math.max(4, maxY - minY);
      var factorW = (kind === "triangle" || kind === "diamond") ? 0.62 : (kind === "arrow" ? 0.72 : 0.84);
      var factorH = (kind === "triangle" || kind === "diamond") ? 0.58 : 0.78;
      var pBoxW = Math.max(4, Math.round(wPx * factorW));
      var pBoxH = Math.max(4, Math.round(hPx * factorH));
      var pFsByBox = Math.min(pBoxW * 0.22, pBoxH * 0.42);
      var pFsByChars = (pBoxW * 1.35) / Math.max(4, Math.sqrt(charCount) * 1.85);
      var pFontSize = Math.max(1, Number(Math.min(pFsByBox, pFsByChars).toFixed(2)));
      return {
        latlng: L.latLng(cLat, cLon),
        placement: "inside",
        angleDeg: 0,
        boxW: pBoxW,
        boxH: pBoxH,
        fontSize: pFontSize
      };
    }

    // 3. LineString -> Place above the line, strictly proportional to geographic line length on chart
    if (g.type === "LineString" && Array.isArray(g.coordinates) && g.coordinates.length >= 2) {
      var coords = g.coordinates;
      var pts = coords.map(function (c) { return m.latLngToContainerPoint([c[1], c[0]]); });
      var totalPx = 0;
      var segLens = [];
      for (var i = 0; i < pts.length - 1; i++) {
        var sl = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
        segLens.push(sl);
        totalPx += sl;
      }
      var halfPx = totalPx * 0.5;
      var acc = 0;
      var midIdx = 0;
      var segFrac = 0.5;
      for (var j = 0; j < segLens.length; j++) {
        if (acc + segLens[j] >= halfPx || j === segLens.length - 1) {
          midIdx = j;
          segFrac = segLens[j] > 1e-3 ? (halfPx - acc) / segLens[j] : 0.5;
          break;
        }
        acc += segLens[j];
      }
      var pA = pts[midIdx];
      var pB = pts[Math.min(pts.length - 1, midIdx + 1)];
      var midPt = L.point(pA.x + (pB.x - pA.x) * segFrac, pA.y + (pB.y - pA.y) * segFrac);
      var midLl = m.containerPointToLatLng(midPt);
      var dx = pB.x - pA.x;
      var dy = pB.y - pA.y;
      var ang = Math.atan2(dy, dx) * (180 / Math.PI);
      if (ang > 90) ang -= 180;
      if (ang < -90) ang += 180;
      var lBoxW = Math.max(4, Math.round(totalPx * 0.86));
      var lFsByLen = totalPx * 0.12;
      var lFsByChars = (lBoxW * 1.15) / Math.max(5, charCount * 0.62);
      var lFontSize = Math.max(1, Number(Math.min(lFsByLen, lFsByChars).toFixed(2)));
      return {
        latlng: midLl,
        placement: "above-line",
        angleDeg: Math.round(ang * 10) / 10,
        boxW: lBoxW,
        boxH: Math.max(18, Math.round(lFontSize * 1.45)),
        fontSize: lFontSize
      };
    }

    return null;
  }

  function buildShapeLabelHtml(f, layout, isEditing) {
    var props = (f && f.properties) || {};
    var fId = props.id || (f && f.id) || "";
    var color = props.color || state.color || "#f05a36";
    var textVal = String(props.label != null ? props.label : "");
    var isAbove = layout.placement === "above-line";
    var lineH = Math.max(11, Math.round(layout.fontSize * 1.24));
    var rotTransform = isAbove
      ? "translate(-50%, -100%) rotate(" + (layout.angleDeg || 0) + "deg) translateY(-6px)"
      : "translate(-50%, -50%)";

    if (isEditing) {
      return (
        '<div class="ss-uc-shape-label-wrap is-editing' + (isAbove ? " is-above-line" : " is-inside") + '" ' +
          'data-uc-label-for="' + escapeHtml(fId) + '" ' +
          'style="width:' + layout.boxW + 'px;max-height:' + Math.max(24, layout.boxH) + 'px;transform:' + rotTransform + ';--uc-lbl-color:' + escapeHtml(color) + ';">' +
          '<textarea class="ss-uc-shape-label-input" data-uc-label-for="' + escapeHtml(fId) + '" rows="1" spellcheck="false" placeholder="Type label…" ' +
            'style="color:' + escapeHtml(color) + ';font-size:' + layout.fontSize + 'px;line-height:' + lineH + 'px;width:100%;">' +
            escapeHtml(textVal) +
          '</textarea>' +
        '</div>'
      );
    }

    return (
      '<div class="ss-uc-shape-label-wrap' + (isAbove ? " is-above-line" : " is-inside") + '" ' +
        'data-uc-label-for="' + escapeHtml(fId) + '" ' +
        'style="width:' + layout.boxW + 'px;max-height:' + Math.max(20, layout.boxH) + 'px;transform:' + rotTransform + ';color:' + escapeHtml(color) + ';font-size:' + layout.fontSize + 'px;line-height:' + lineH + 'px;">' +
        '<span class="ss-uc-shape-label-text">' + escapeHtml(textVal) + '</span>' +
      '</div>'
    );
  }

  function createOrUpdateShapeLabelMarker(f, group, focusLabelId) {
    var m = map();
    if (!m || !global.L || !f || !f.geometry) return null;
    var props = f.properties || {};
    if (props.kind === "text") return null;
    var fId = props.id || f.id;
    var isEditing = state.editingLabelFeatureId === fId;
    var hasLabel = Boolean(props.label && String(props.label).trim().length > 0);

    if (!isEditing && !hasLabel) {
      if (labelLayerById[fId]) {
        try {
          if (group) group.removeLayer(labelLayerById[fId]);
          else m.removeLayer(labelLayerById[fId]);
        } catch (eR) {}
        delete labelLayerById[fId];
      }
      return null;
    }

    var layout = computeShapeLabelLayout(f);
    if (!layout || !layout.latlng) return null;
    var html = buildShapeLabelHtml(f, layout, isEditing);
    var existing = labelLayerById[fId];

    if (existing && !isEditing && focusLabelId !== fId) {
      existing.setLatLng(layout.latlng);
      var el0 = existing.getElement && existing.getElement();
      if (el0) {
        el0.innerHTML = html;
        el0.style.pointerEvents = "none";
      } else {
        existing.setIcon(L.divIcon({
          className: "ss-uc-shape-label-marker",
          html: html,
          iconSize: null
        }));
      }
      return existing;
    }

    if (existing) {
      try {
        if (group) group.removeLayer(existing);
        else m.removeLayer(existing);
      } catch (eRm) {}
      delete labelLayerById[fId];
    }

    var marker = L.marker(layout.latlng, {
      pane: PANE,
      interactive: isEditing,
      keyboard: false,
      icon: L.divIcon({
        className: "ss-uc-shape-label-marker" + (isEditing ? " is-editing" : ""),
        html: html,
        iconSize: null
      })
    });
    labelLayerById[fId] = marker;
    if (group) group.addLayer(marker);
    else m.addLayer(marker);

    var el = marker.getElement && marker.getElement();
    if (el) {
      el.style.pointerEvents = isEditing ? "auto" : "none";
    }

    if (isEditing) {
      wireShapeLabelEditorEvents(marker, f);
      if (focusLabelId === fId) {
        setTimeout(function () {
          try {
            var mEl = marker.getElement && marker.getElement();
            var inp = mEl && mEl.querySelector(".ss-uc-shape-label-input");
            if (inp) {
              inp.focus();
              var len = inp.value.length;
              if (typeof inp.setSelectionRange === "function") inp.setSelectionRange(len, len);
            }
          } catch (eF) {}
        }, 20);
      }
    }
    return marker;
  }

  function wireShapeLabelEditorEvents(marker, f) {
    var el = marker.getElement && marker.getElement();
    if (!el) return;
    var inp = el.querySelector(".ss-uc-shape-label-input");
    var wrap = el.querySelector(".ss-uc-shape-label-wrap");
    if (!inp || inp.dataset.ssWired === "1") return;
    inp.dataset.ssWired = "1";
    var fId = (f.properties && f.properties.id) || f.id;

    ["mousedown", "click", "dblclick", "pointerdown"].forEach(function (evName) {
      inp.addEventListener(evName, function (ev) {
        ev.stopPropagation();
      });
    });

    inp.addEventListener("input", function () {
      f.properties = f.properties || {};
      f.properties.label = inp.value;
      persist();
      var layout = computeShapeLabelLayout(f);
      if (layout) {
        var lineH = Math.max(11, Math.round(layout.fontSize * 1.24));
        inp.style.fontSize = layout.fontSize + "px";
        inp.style.lineHeight = lineH + "px";
        if (wrap) {
          wrap.style.width = layout.boxW + "px";
          wrap.style.maxHeight = Math.max(24, layout.boxH) + "px";
        }
      }
    });

    inp.addEventListener("keydown", function (ev) {
      ev.stopPropagation();
      if (ev.key === "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        f.properties = f.properties || {};
        f.properties.label = String(inp.value || "").trim();
        state.editingLabelFeatureId = null;
        persist();
        rebuildMapLayers();
      } else if (ev.key === "Escape") {
        ev.preventDefault();
        f.properties = f.properties || {};
        f.properties.label = String(inp.value || "").trim();
        state.editingLabelFeatureId = null;
        persist();
        rebuildMapLayers();
      }
    });

    inp.addEventListener("blur", function () {
      if (state.editingLabelFeatureId !== fId) return;
      f.properties = f.properties || {};
      f.properties.label = String(inp.value || "").trim();
      state.editingLabelFeatureId = null;
      persist();
      setTimeout(function () {
        rebuildMapLayers();
      }, 15);
    });
  }

  function rebuildMapLayers(focusTextId, focusShapeLabelId) {
    var m = map();
    var group = getRenderGroup();
    if (!m || !group) return;
    group.clearLayers();
    layerById = Object.create(null);
    labelLayerById = Object.create(null);

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
      var fId = (f.properties && f.properties.id) || f.id;
      layerById[fId] = layer;
      group.addLayer(layer);

      if (f.properties && f.properties.kind === "text") {
        wireTextBoxEvents(layer, f);
        if (focusTextId && focusTextId === fId) {
          setTimeout(function () {
            try {
              var el = layer.getElement && layer.getElement();
              var ta = el && el.querySelector(".ss-uc-tb-input");
              if (ta) {
                ta.focus();
                ta.select();
              }
            } catch (eF) {}
          }, 25);
        }
      } else {
        createOrUpdateShapeLabelMarker(f, group, focusShapeLabelId);
      }

      try {
        var el = layer.getElement && layer.getElement();
        if (el) el.style.pointerEvents = "auto";
      } catch (e0) {}
    });

    var pane = m.getPane(PANE);
    if (pane) {
      pane.style.pointerEvents = "none";
      Array.prototype.forEach.call(pane.querySelectorAll("path, .ss-uc-text-marker, .ss-uc-textbox, .ss-uc-shape-label-marker.is-editing, .ss-uc-shape-label-input"), function (node) {
        node.style.pointerEvents = "auto";
      });
    }
  }

  function removeFeatureById(id) {
    var chart = activeChart();
    if (!chart || !id) return;
    var before = (chart.features || []).length;
    chart.features = (chart.features || []).filter(function (f) {
      return (f.properties && f.properties.id) !== id && f.id !== id;
    });
    if (chart.features.length === before) return;
    if (state.selectedFeatureId === id) state.selectedFeatureId = null;
    persist();
    rebuildMapLayers();
    renderLayerList();
  }

  function pushFeature(feature, focusTextId) {
    var chart = activeChart();
    if (!chart) return;
    if (!chart.features) chart.features = [];
    chart.features.push(feature);
    state.selectedFeatureId = (feature.properties && feature.properties.id) || feature.id;
    persist();
    rebuildMapLayers(focusTextId);
    renderLayerList();
  }

  function latLngToCoord(ll) {
    return [Number(ll.lng), Number(ll.lat)];
  }

  /* ── Geometry Generators for Blocks / Shapes ── */
  function buildShapeCoordsFromBox(kind, south, north, west, east) {
    var cLat = (south + north) * 0.5;
    var cLon = (west + east) * 0.5;
    var rLat = Math.max(1e-5, (north - south) * 0.5);
    var rLon = Math.max(1e-5, (east - west) * 0.5);
    var ring = [];
    var i, ang;

    if (kind === "rect") {
      ring = [
        [west, south],
        [east, south],
        [east, north],
        [west, north],
        [west, south]
      ];
    } else if (kind === "triangle") {
      ring = [
        [cLon, north],
        [east, south],
        [west, south],
        [cLon, north]
      ];
    } else if (kind === "diamond") {
      ring = [
        [cLon, north],
        [east, cLat],
        [cLon, south],
        [west, cLat],
        [cLon, north]
      ];
    } else if (kind === "hexagon") {
      for (i = 0; i < 6; i++) {
        ang = (Math.PI / 3) * i - Math.PI / 6;
        ring.push([cLon + rLon * Math.cos(ang), cLat + rLat * Math.sin(ang)]);
      }
      ring.push(ring[0].slice());
    } else if (kind === "ellipse") {
      var steps = 28;
      for (i = 0; i < steps; i++) {
        ang = (2 * Math.PI * i) / steps;
        ring.push([cLon + rLon * Math.cos(ang), cLat + rLat * Math.sin(ang)]);
      }
      ring.push(ring[0].slice());
    } else if (kind === "arrow") {
      var headLon = west + (east - west) * 0.58;
      var shaftTop = cLat + rLat * 0.42;
      var shaftBot = cLat - rLat * 0.42;
      ring = [
        [west, shaftBot],
        [headLon, shaftBot],
        [headLon, south],
        [east, cLat],
        [headLon, north],
        [headLon, shaftTop],
        [west, shaftTop],
        [west, shaftBot]
      ];
    } else {
      ring = [
        [west, south],
        [east, south],
        [east, north],
        [west, north],
        [west, south]
      ];
    }
    return ring;
  }

  function createShapeFeatureFromScreenBox(kind, ptA, ptB) {
    var m = map();
    if (!m) return null;
    var dx = Math.abs(ptB.x - ptA.x);
    var dy = Math.abs(ptB.y - ptA.y);
    var p1, p2;
    if (dx < 8 && dy < 8) {
      p1 = m.containerPointToLatLng([ptA.x - 56, ptA.y + 42]);
      p2 = m.containerPointToLatLng([ptA.x + 56, ptA.y - 42]);
    } else {
      p1 = m.containerPointToLatLng(ptA);
      p2 = m.containerPointToLatLng(ptB);
    }
    var south = Math.min(p1.lat, p2.lat);
    var north = Math.max(p1.lat, p2.lat);
    var west = Math.min(p1.lng, p2.lng);
    var east = Math.max(p1.lng, p2.lng);
    var id = uid();

    if (kind === "line") {
      var lA = (dx < 8 && dy < 8)
        ? m.containerPointToLatLng([ptA.x - 55, ptA.y + 35])
        : m.containerPointToLatLng(ptA);
      var lB = (dx < 8 && dy < 8)
        ? m.containerPointToLatLng([ptA.x + 55, ptA.y - 35])
        : m.containerPointToLatLng(ptB);
      return {
        type: "Feature",
        id: id,
        geometry: { type: "LineString", coordinates: [latLngToCoord(lA), latLngToCoord(lB)] },
        properties: { id: id, kind: "line", color: state.color }
      };
    }

    if (kind === "circle") {
      var centerLl = (dx < 8 && dy < 8)
        ? m.containerPointToLatLng(ptA)
        : L.latLng((south + north) * 0.5, (west + east) * 0.5);
      var edgeLl = (dx < 8 && dy < 8)
        ? m.containerPointToLatLng([ptA.x + 54, ptA.y])
        : L.latLng(centerLl.lat, east);
      var radiusM = Math.max(15, centerLl.distanceTo(edgeLl));
      return {
        type: "Feature",
        id: id,
        geometry: { type: "Point", coordinates: latLngToCoord(centerLl) },
        properties: { id: id, kind: "circle", radiusM: radiusM, color: state.color }
      };
    }

    var ring = buildShapeCoordsFromBox(kind, south, north, west, east);
    return {
      type: "Feature",
      id: id,
      geometry: { type: "Polygon", coordinates: [ring] },
      properties: { id: id, kind: kind, color: state.color }
    };
  }

  /* ── Screen-Space Hit Testing: Contour (Border) vs Interior vs Line ── */
  function distToSegmentPx(p, a, b) {
    var vx = b.x - a.x;
    var vy = b.y - a.y;
    var wx = p.x - a.x;
    var wy = p.y - a.y;
    var c1 = vx * wx + vy * wy;
    if (c1 <= 0) return Math.hypot(p.x - a.x, p.y - a.y);
    var c2 = vx * vx + vy * vy;
    if (c2 <= c1) return Math.hypot(p.x - b.x, p.y - b.y);
    var t = c1 / c2;
    return Math.hypot(p.x - (a.x + t * vx), p.y - (a.y + t * vy));
  }

  function pointInPolygonPx(pt, ringPts) {
    var inside = false;
    for (var i = 0, j = ringPts.length - 1; i < ringPts.length; j = i++) {
      var xi = ringPts[i].x, yi = ringPts[i].y;
      var xj = ringPts[j].x, yj = ringPts[j].y;
      var intersect = ((yi > pt.y) !== (yj > pt.y)) &&
        (pt.x < ((xj - xi) * (pt.y - yi)) / ((yj - yi) || 1e-9) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function classifyResizeCompass(pt, bbox) {
    var cx = (bbox.minX + bbox.maxX) * 0.5;
    var cy = (bbox.minY + bbox.maxY) * 0.5;
    var hw = Math.max(12, (bbox.maxX - bbox.minX) * 0.5);
    var hh = Math.max(12, (bbox.maxY - bbox.minY) * 0.5);
    var nx = (pt.x - cx) / hw;
    var ny = (pt.y - cy) / hh;
    var nearL = nx < -0.45;
    var nearR = nx > 0.45;
    var nearT = ny < -0.45;
    var nearB = ny > 0.45;

    if ((nearT && nearL) || (nearB && nearR)) return { dir: (nearT ? "n" : "s") + (nearL ? "w" : "e"), cursor: "nwse-resize" };
    if ((nearT && nearR) || (nearB && nearL)) return { dir: (nearT ? "n" : "s") + (nearR ? "e" : "w"), cursor: "nesw-resize" };
    if (Math.abs(nx) >= Math.abs(ny)) {
      return { dir: nx < 0 ? "w" : "e", cursor: "ew-resize" };
    }
    return { dir: ny < 0 ? "n" : "s", cursor: "ns-resize" };
  }

  function hitTestFeature(f, pt, m) {
    if (!f || !f.geometry || !m) return null;
    var g = f.geometry;
    var props = f.properties || {};
    var fId = props.id || f.id;

    if (g.type === "Point" && props.kind === "circle" && Number.isFinite(props.radiusM)) {
      var cLl = L.latLng(g.coordinates[1], g.coordinates[0]);
      var cPt = m.latLngToContainerPoint(cLl);
      var clickLl = m.containerPointToLatLng(pt);
      var distM = cLl.distanceTo(clickLl);
      var edgeLl = L.latLng(cLl.lat, cLl.lng + (props.radiusM / (111320 * Math.max(0.1, Math.cos(cLl.lat * Math.PI / 180)))));
      var edgePt = m.latLngToContainerPoint(edgeLl);
      var radPx = Math.max(6, Math.hypot(edgePt.x - cPt.x, edgePt.y - cPt.y));
      var distPx = Math.hypot(pt.x - cPt.x, pt.y - cPt.y);

      if (Math.abs(distPx - radPx) <= BORDER_HIT_PX) {
        var ang = Math.atan2(pt.y - cPt.y, pt.x - cPt.x);
        var deg = ((ang * 180 / Math.PI) + 360) % 180;
        var cur = (deg >= 22.5 && deg < 67.5) ? "nwse-resize"
          : (deg >= 67.5 && deg < 112.5) ? "ns-resize"
          : (deg >= 112.5 && deg < 157.5) ? "nesw-resize"
          : "ew-resize";
        return { feature: f, id: fId, zone: "border", dir: "radial", cursor: cur };
      }
      if (distPx < radPx || distM < props.radiusM) {
        return { feature: f, id: fId, zone: "interior", cursor: "move" };
      }
      return null;
    }

    if (g.type === "Polygon") {
      var ring = (g.coordinates && g.coordinates[0]) || [];
      if (ring.length < 3) return null;
      var pts = [];
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (var i = 0; i < ring.length; i++) {
        var p = m.latLngToContainerPoint([ring[i][1], ring[i][0]]);
        pts.push(p);
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
      }

      var minEdgeDist = Infinity;
      var nearestVertexIdx = -1;
      var minVertDist = Infinity;
      for (var k = 0; k < pts.length; k++) {
        var vd = Math.hypot(pt.x - pts[k].x, pt.y - pts[k].y);
        if (vd < minVertDist) {
          minVertDist = vd;
          nearestVertexIdx = k;
        }
        if (k < pts.length - 1) {
          var ed = distToSegmentPx(pt, pts[k], pts[k + 1]);
          if (ed < minEdgeDist) minEdgeDist = ed;
        }
      }

      if (minEdgeDist <= BORDER_HIT_PX) {
        var comp = classifyResizeCompass(pt, { minX: minX, minY: minY, maxX: maxX, maxY: maxY });
        return {
          feature: f,
          id: fId,
          zone: "border",
          dir: comp.dir,
          cursor: comp.cursor,
          vertexIdx: minVertDist <= BORDER_HIT_PX + 3 ? nearestVertexIdx : -1
        };
      }

      if (pointInPolygonPx(pt, pts)) {
        return { feature: f, id: fId, zone: "interior", cursor: "move" };
      }
      return null;
    }

    if (g.type === "LineString") {
      var lCoords = g.coordinates || [];
      if (lCoords.length < 2) return null;
      var lPts = lCoords.map(function (c) { return m.latLngToContainerPoint([c[1], c[0]]); });
      var dStart = Math.hypot(pt.x - lPts[0].x, pt.y - lPts[0].y);
      var dEnd = Math.hypot(pt.x - lPts[lPts.length - 1].x, pt.y - lPts[lPts.length - 1].y);
      if (dStart <= BORDER_HIT_PX + 2) {
        return { feature: f, id: fId, zone: "border", dir: "line-start", vertexIdx: 0, cursor: "nwse-resize" };
      }
      if (dEnd <= BORDER_HIT_PX + 2) {
        return { feature: f, id: fId, zone: "border", dir: "line-end", vertexIdx: lCoords.length - 1, cursor: "nwse-resize" };
      }
      for (var s = 0; s < lPts.length - 1; s++) {
        if (distToSegmentPx(pt, lPts[s], lPts[s + 1]) <= BORDER_HIT_PX) {
          return { feature: f, id: fId, zone: "stroke", cursor: "move" };
        }
      }
    }

    return null;
  }

  function hitTestAllFeatures(pt) {
    var m = map();
    var chart = activeChart();
    if (!m || !chart || !Array.isArray(chart.features)) return null;
    for (var i = chart.features.length - 1; i >= 0; i--) {
      var hit = hitTestFeature(chart.features[i], pt, m);
      if (hit) return hit;
    }
    return null;
  }

  /* ── Live NM Dimension HUD While Resizing / Sizing Shapes ── */
  var resizeHudMarker = null;

  function fmtNmVal(nm) {
    if (!Number.isFinite(nm) || nm < 0) return "0.00";
    if (nm >= 100) return nm.toFixed(1);
    if (nm >= 10) return nm.toFixed(2);
    return nm.toFixed(2);
  }

  function computeSphericalPolygonAreaNm2(ringCoords) {
    if (!Array.isArray(ringCoords) || ringCoords.length < 3) return 0;
    var R_NM = 3440.065; // Earth mean radius in Nautical Miles (6371000 / 1852)
    var deg2rad = Math.PI / 180;
    var sum = 0;
    for (var i = 0; i < ringCoords.length; i++) {
      var p1 = ringCoords[i];
      var p2 = ringCoords[(i + 1) % ringCoords.length];
      var lon1 = Number(p1[0]) * deg2rad;
      var lat1 = Number(p1[1]) * deg2rad;
      var lon2 = Number(p2[0]) * deg2rad;
      var lat2 = Number(p2[1]) * deg2rad;
      sum += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }
    return Math.abs((sum * R_NM * R_NM) / 2.0);
  }

  function computeFeatureResizeMeasurement(f) {
    var m = map();
    if (!m || !f || !f.geometry) return null;
    var g = f.geometry;
    var props = f.properties || {};
    var kind = String(props.kind || "").toLowerCase();

    // 1. Circle -> Radius in NM
    if (g.type === "Point" && kind === "circle" && Number.isFinite(props.radiusM)) {
      var radNm = Math.max(0, Number(props.radiusM)) / 1852;
      return {
        latlng: L.latLng(g.coordinates[1], g.coordinates[0]),
        label: "R: " + fmtNmVal(radNm) + " NM"
      };
    }

    // 2. Line -> Length in NM
    if (g.type === "LineString" && Array.isArray(g.coordinates) && g.coordinates.length >= 2) {
      var totalM = 0;
      for (var i = 0; i < g.coordinates.length - 1; i++) {
        var a = g.coordinates[i];
        var b = g.coordinates[i + 1];
        totalM += m.distance([a[1], a[0]], [b[1], b[0]]);
      }
      var mid = g.coordinates[Math.floor(g.coordinates.length / 2)];
      return {
        latlng: L.latLng(mid[1], mid[0]),
        label: "L: " + fmtNmVal(totalM / 1852) + " NM"
      };
    }

    // 3. Polygon -> Rectangle shows 2 sides (W × H NM); other polygons show Area (NM²)
    if (g.type === "Polygon" && Array.isArray(g.coordinates) && Array.isArray(g.coordinates[0])) {
      var ring = g.coordinates[0];
      if (ring.length < 3) return null;
      var minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
      ring.forEach(function (c) {
        if (c[1] < minLat) minLat = c[1];
        if (c[1] > maxLat) maxLat = c[1];
        if (c[0] < minLon) minLon = c[0];
        if (c[0] > maxLon) maxLon = c[0];
      });
      var cLat = (minLat + maxLat) * 0.5;
      var cLon = (minLon + maxLon) * 0.5;
      var centerLl = L.latLng(cLat, cLon);

      if (kind === "rect") {
        var widthNm = m.distance([cLat, minLon], [cLat, maxLon]) / 1852;
        var heightNm = m.distance([minLat, cLon], [maxLat, cLon]) / 1852;
        return {
          latlng: centerLl,
          label: fmtNmVal(widthNm) + " × " + fmtNmVal(heightNm) + " NM"
        };
      }

      var areaNm2 = computeSphericalPolygonAreaNm2(ring);
      return {
        latlng: centerLl,
        label: "Area: " + fmtNmVal(areaNm2) + " NM²"
      };
    }
    return null;
  }

  function showResizeHudAtLatLng(latlng, labelStr) {
    var m = map();
    if (!m || !global.L || !latlng || !labelStr) return;
    ensurePane(m);
    var html = '<div class="ss-uc-resize-hud-pill">' + escapeHtml(labelStr) + '</div>';
    if (!resizeHudMarker) {
      resizeHudMarker = L.marker(latlng, {
        pane: PANE,
        interactive: false,
        keyboard: false,
        icon: L.divIcon({
          className: "ss-uc-resize-hud",
          html: html,
          iconSize: null
        })
      });
      m.addLayer(resizeHudMarker);
    } else {
      resizeHudMarker.setLatLng(latlng);
      var el = resizeHudMarker.getElement && resizeHudMarker.getElement();
      if (el) {
        el.innerHTML = html;
      } else {
        resizeHudMarker.setIcon(L.divIcon({
          className: "ss-uc-resize-hud",
          html: html,
          iconSize: null
        }));
      }
      if (!m.hasLayer(resizeHudMarker)) m.addLayer(resizeHudMarker);
    }
  }

  function showResizeHudForFeature(f) {
    var m = map();
    if (!m || !global.L) return;
    var info = computeFeatureResizeMeasurement(f);
    if (!info || !info.latlng || !info.label) return;
    showResizeHudAtLatLng(info.latlng, info.label);
  }

  function hideResizeHud() {
    var m = map();
    if (resizeHudMarker && m) {
      try { m.removeLayer(resizeHudMarker); } catch (e) {}
    }
    resizeHudMarker = null;
  }

  function updateFeatureLayerRealtime(f) {
    var fId = (f.properties && f.properties.id) || f.id;
    var layer = layerById[fId];
    if (!layer) {
      rebuildMapLayers();
      return;
    }
    var g = f.geometry;
    if (g.type === "Polygon" && typeof layer.setLatLngs === "function") {
      var ring = (g.coordinates && g.coordinates[0]) || [];
      layer.setLatLngs(ring.map(function (c) { return [c[1], c[0]]; }));
    } else if (g.type === "LineString" && typeof layer.setLatLngs === "function") {
      layer.setLatLngs((g.coordinates || []).map(function (c) { return [c[1], c[0]]; }));
    } else if (g.type === "Point" && f.properties && f.properties.kind === "circle") {
      if (typeof layer.setLatLng === "function") {
        layer.setLatLng([g.coordinates[1], g.coordinates[0]]);
      }
      if (typeof layer.setRadius === "function") {
        layer.setRadius(Math.max(5, Number(f.properties.radiusM) || 500));
      }
    }
    createOrUpdateShapeLabelMarker(f, getRenderGroup(), null);
  }

  function finishFreePolygon() {
    if (state.draftPts.length < 3) {
      clearDraft();
      return;
    }
    var coords = state.draftPts.map(latLngToCoord);
    var ring = coords.slice();
    ring.push(coords[0].slice());
    var id = uid();
    pushFeature({
      type: "Feature",
      id: id,
      geometry: { type: "Polygon", coordinates: [ring] },
      properties: { id: id, kind: "polygon", color: state.color }
    });
    clearDraft();
  }

  /* ── Map Mouse / Pointer Interaction Engine ── */
  function setMapHoverCursor(cursorVal) {
    var mapEl = document.getElementById("ntmMap");
    if (!mapEl) return;
    if (cursorVal) {
      mapEl.setAttribute("data-uc-hover-cursor", cursorVal);
      mapEl.style.setProperty("--uc-dynamic-cursor", cursorVal);
    } else {
      mapEl.removeAttribute("data-uc-hover-cursor");
      mapEl.style.removeProperty("--uc-dynamic-cursor");
    }
  }

  function onMapMouseDown(e) {
    if (!state.overlayOn) return;
    if (!e || !e.originalEvent || e.originalEvent.button !== 0) return;
    var origTarget = e.originalEvent.target;
    if (origTarget && origTarget.closest && origTarget.closest("#ssUcDrawRail, #ssUcShapesMenu, #ssUcPalettePopover, #ssUcLayerPanel, .ss-uc-textbox")) {
      return;
    }
    var m = map();
    if (!m || !global.L) return;

    var pt = m.mouseEventToContainerPoint(e.originalEvent);
    var ll = m.containerPointToLatLng(pt);
    var tool = state.tool;

    // 1. ERASER TOOL: touch or sweep-erase any drawn object
    if (tool === "eraser") {
      L.DomEvent.stop(e);
      try { m.dragging.disable(); } catch (e0) {}
      var hitErase = hitTestAllFeatures(pt);
      if (hitErase) removeFeatureById(hitErase.id);
      state.action = { type: "erase-sweep" };
      return;
    }

    // 2. BRUSH TOOL: hold LMB to freehand-draw on the chart (map dragging disabled)
    if (tool === "brush") {
      L.DomEvent.stop(e);
      try { m.dragging.disable(); } catch (e1) {}
      var style = featureStyle(state.color, false, "brush");
      var draftPoly = L.polyline([ll], Object.assign({}, style, { pane: PANE, fillOpacity: 0 }));
      m.addLayer(draftPoly);
      state.action = {
        type: "brush-draw",
        pts: [ll],
        lastPt: pt,
        layer: draftPoly
      };
      return;
    }

    // 3. SELECT (CURSOR-ARROW) OR SHAPES TOOL: check if user pressed LMB on an existing shape's contour or interior
    if (tool === "select" || tool === "shapes") {
      var hit = hitTestAllFeatures(pt);
      if (hit && !(tool === "shapes" && state.shapeKind === "polygon" && state.draftPts.length > 0)) {
        state.selectedFeatureId = hit.id;
        L.DomEvent.stop(e);
        try { m.dragging.disable(); } catch (e2) {}
        state.suppressNextClick = true;

        var f = hit.feature;
        var origGeom = JSON.parse(JSON.stringify(f.geometry));
        var origProps = JSON.parse(JSON.stringify(f.properties || {}));

        if (hit.zone === "interior" || hit.zone === "stroke") {
          state.action = {
            type: "move-feature",
            feature: f,
            startLl: ll,
            origGeom: origGeom
          };
          return;
        }

        if (hit.zone === "border") {
          var ring = (origGeom.type === "Polygon" && origGeom.coordinates && origGeom.coordinates[0]) || [];
          var minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
          ring.forEach(function (c) {
            if (c[1] < minLat) minLat = c[1];
            if (c[1] > maxLat) maxLat = c[1];
            if (c[0] < minLon) minLon = c[0];
            if (c[0] > maxLon) maxLon = c[0];
          });
          state.action = {
            type: "resize-feature",
            feature: f,
            dir: hit.dir,
            vertexIdx: hit.vertexIdx,
            startLl: ll,
            origGeom: origGeom,
            origProps: origProps,
            bbox: { minLat: minLat, maxLat: maxLat, minLon: minLon, maxLon: maxLon }
          };
          return;
        }
      } else if (tool === "select") {
        if (state.selectedFeatureId) {
          state.selectedFeatureId = null;
          rebuildMapLayers();
        }
        return;
      }
    }

    // 4. SHAPES TOOL on empty chart space (for simple shapes, i.e. shapeKind !== "polygon"):
    //    place or drag-create the shape, then auto-reset to Cursor-Arrow ("select") on mouseup!
    if (tool === "shapes" && state.shapeKind !== "polygon") {
      closeFloatingMenus();
      L.DomEvent.stop(e);
      try { m.dragging.disable(); } catch (e3) {}
      state.suppressNextClick = true;
      state.action = {
        type: "create-shape",
        shapeKind: state.shapeKind,
        startPt: pt,
        curPt: pt,
        previewLayer: null
      };
    }
  }

  function onMapMouseMove(e) {
    if (!state.overlayOn) return;
    var m = map();
    if (!m || !e || !e.originalEvent) return;
    var pt = m.mouseEventToContainerPoint(e.originalEvent);
    var ll = m.containerPointToLatLng(pt);

    if (state.action) {
      var act = state.action;

      if (act.type === "erase-sweep") {
        var hitE = hitTestAllFeatures(pt);
        if (hitE) removeFeatureById(hitE.id);
        return;
      }

      if (act.type === "brush-draw") {
        if (Math.hypot(pt.x - act.lastPt.x, pt.y - act.lastPt.y) >= 3) {
          act.pts.push(ll);
          act.lastPt = pt;
          act.layer.setLatLngs(act.pts);
        }
        return;
      }

      if (act.type === "move-feature") {
        var dLat = ll.lat - act.startLl.lat;
        var dLon = ll.lng - act.startLl.lng;
        var fMove = act.feature;
        if (act.origGeom.type === "Polygon") {
          fMove.geometry.coordinates = [
            act.origGeom.coordinates[0].map(function (c) {
              return [c[0] + dLon, c[1] + dLat];
            })
          ];
        } else if (act.origGeom.type === "LineString") {
          fMove.geometry.coordinates = act.origGeom.coordinates.map(function (c) {
            return [c[0] + dLon, c[1] + dLat];
          });
        } else if (act.origGeom.type === "Point") {
          fMove.geometry.coordinates = [
            act.origGeom.coordinates[0] + dLon,
            act.origGeom.coordinates[1] + dLat
          ];
        }
        updateFeatureLayerRealtime(fMove);
        return;
      }

      if (act.type === "resize-feature") {
        var fRes = act.feature;
        if (act.origGeom.type === "Point" && fRes.properties && fRes.properties.kind === "circle") {
          var centerLl = L.latLng(act.origGeom.coordinates[1], act.origGeom.coordinates[0]);
          fRes.properties.radiusM = Math.max(10, centerLl.distanceTo(ll));
          updateFeatureLayerRealtime(fRes);
          showResizeHudForFeature(fRes);
          return;
        }
        if (act.origGeom.type === "LineString" && Array.isArray(act.origGeom.coordinates)) {
          var newLine = act.origGeom.coordinates.map(function (c) { return c.slice(); });
          var vIdx = act.vertexIdx >= 0 ? act.vertexIdx : (act.dir === "line-start" ? 0 : newLine.length - 1);
          if (newLine[vIdx]) {
            newLine[vIdx] = [ll.lng, ll.lat];
            fRes.geometry.coordinates = newLine;
            updateFeatureLayerRealtime(fRes);
            showResizeHudForFeature(fRes);
          }
          return;
        }
        if (act.origGeom.type === "Polygon") {
          var bb = act.bbox;
          var s = bb.minLat, n = bb.maxLat, w = bb.minLon, ea = bb.maxLon;
          var dir = act.dir || "se";
          if (dir.indexOf("n") >= 0) n = Math.max(s + 1e-5, ll.lat);
          if (dir.indexOf("s") >= 0) s = Math.min(n - 1e-5, ll.lat);
          if (dir.indexOf("e") >= 0) ea = Math.max(w + 1e-5, ll.lng);
          if (dir.indexOf("w") >= 0) w = Math.min(ea - 1e-5, ll.lng);

          var kind = (fRes.properties && fRes.properties.kind) || "polygon";
          if (kind === "polygon" && act.vertexIdx >= 0) {
            var newRing = act.origGeom.coordinates[0].map(function (c) { return c.slice(); });
            newRing[act.vertexIdx] = [ll.lng, ll.lat];
            if (act.vertexIdx === 0 || act.vertexIdx === newRing.length - 1) {
              newRing[0] = [ll.lng, ll.lat];
              newRing[newRing.length - 1] = [ll.lng, ll.lat];
            }
            fRes.geometry.coordinates = [newRing];
          } else if (kind !== "polygon") {
            fRes.geometry.coordinates = [buildShapeCoordsFromBox(kind, s, n, w, ea)];
          } else {
            var origSpanLat = Math.max(1e-6, bb.maxLat - bb.minLat);
            var origSpanLon = Math.max(1e-6, bb.maxLon - bb.minLon);
            fRes.geometry.coordinates = [
              act.origGeom.coordinates[0].map(function (c) {
                var u = (c[0] - bb.minLon) / origSpanLon;
                var v = (c[1] - bb.minLat) / origSpanLat;
                return [w + u * (ea - w), s + v * (n - s)];
              })
            ];
          }
          updateFeatureLayerRealtime(fRes);
          showResizeHudForFeature(fRes);
          return;
        }
      }

      if (act.type === "create-shape") {
        act.curPt = pt;
        if (act.previewLayer) {
          try { m.removeLayer(act.previewLayer); } catch (eP) {}
        }
        var tempFeat = createShapeFeatureFromScreenBox(act.shapeKind, act.startPt, act.curPt);
        if (tempFeat) {
          act.previewLayer = leafletFromFeature(tempFeat);
          if (act.previewLayer) m.addLayer(act.previewLayer);
          showResizeHudForFeature(tempFeat);
        }
        return;
      }
    }

    if (state.tool === "select" || state.tool === "shapes") {
      var hoverHit = hitTestAllFeatures(pt);
      if (hoverHit) {
        setMapHoverCursor(hoverHit.cursor);
      } else {
        setMapHoverCursor("");
      }
    } else {
      setMapHoverCursor("");
    }
  }

  function onGlobalMouseUp() {
    hideResizeHud();
    if (!state.action) return;
    var m = map();
    var act = state.action;
    state.action = null;

    if (act.type === "brush-draw") {
      if (act.layer && m) {
        try { m.removeLayer(act.layer); } catch (e0) {}
      }
      if (act.pts && act.pts.length >= 2) {
        var idB = uid();
        pushFeature({
          type: "Feature",
          id: idB,
          geometry: { type: "LineString", coordinates: act.pts.map(latLngToCoord) },
          properties: { id: idB, kind: "brush", color: state.color }
        });
      }
    } else if (act.type === "move-feature" || act.type === "resize-feature") {
      persist();
      rebuildMapLayers();
    } else if (act.type === "create-shape") {
      if (act.previewLayer && m) {
        try { m.removeLayer(act.previewLayer); } catch (e1) {}
      }
      var created = createShapeFeatureFromScreenBox(act.shapeKind, act.startPt, act.curPt);
      if (created) {
        pushFeature(created);
        // Auto-reset cursor back to neutral Cursor-Arrow ("select") after placing a simple shape,
        // while keeping state.shapeKind remembered for the next time the user clicks Shapes!
        setTool("select");
        return;
      }
    }

    syncMapDragState();
  }

  function onMapClick(e) {
    if (!state.overlayOn) return;
    if (state.suppressNextClick) {
      state.suppressNextClick = false;
      return;
    }
    var origTarget = e && e.originalEvent && e.originalEvent.target;
    if (origTarget && origTarget.closest && origTarget.closest("#ssUcDrawRail, #ssUcShapesMenu, #ssUcPalettePopover, #ssUcLayerPanel, .ss-uc-textbox")) {
      return;
    }
    closeFloatingMenus();

    var tool = state.tool;
    var m = map();
    if (!m || !global.L) return;

    if (tool === "text") {
      L.DomEvent.stopPropagation(e);
      var idT = uid();
      var curZ = (typeof m.getZoom === "function" && Number.isFinite(Number(m.getZoom()))) ? Number(m.getZoom()) : 8;
      pushFeature(
        {
          type: "Feature",
          id: idT,
          geometry: { type: "Point", coordinates: latLngToCoord(e.latlng) },
          properties: {
            id: idT,
            kind: "text",
            text: "Text",
            color: state.color,
            fontSize: 15,
            widthPx: 148,
            rows: 1,
            baseZoom: curZ
          }
        },
        idT
      );
      // Auto-reset tool & cursor back to neutral Cursor-Arrow ("select") as soon as the text box is placed on the chart
      setTool("select", { focusTextId: idT });
      return;
    }

    // Free Polygon exception: keeps adding new lines/vertices on each click without resetting to select
    if (tool === "shapes" && state.shapeKind === "polygon") {
      L.DomEvent.stopPropagation(e);
      if (state.draftPts.length >= 3) {
        var firstPt = m.latLngToContainerPoint(state.draftPts[0]);
        var curPt = m.latLngToContainerPoint(e.latlng);
        if (Math.hypot(curPt.x - firstPt.x, curPt.y - firstPt.y) <= 14) {
          finishFreePolygon();
          return;
        }
      }
      state.draftPts.push(e.latlng);
      if (state.draftLayer) {
        try { m.removeLayer(state.draftLayer); } catch (e1) {}
      }
      var style = featureStyle(state.color, false, "polygon");
      if (state.draftPts.length >= 3) {
        state.draftLayer = L.polygon(state.draftPts, Object.assign({}, style, { pane: PANE, dashArray: "5 4" }));
      } else {
        state.draftLayer = L.polyline(state.draftPts, Object.assign({}, style, { pane: PANE, dashArray: "5 4", fillOpacity: 0 }));
      }
      m.addLayer(state.draftLayer);
    }
  }

  function hitTestFeatureForLabelDblClick(pt) {
    var m = map();
    var chart = activeChart();
    if (!m || !chart || !Array.isArray(chart.features)) return null;
    var direct = hitTestAllFeatures(pt);
    if (direct && direct.feature && (!direct.feature.properties || direct.feature.properties.kind !== "text")) {
      return direct;
    }
    // Also check within 24px of any LineString or its above-line label center
    for (var i = chart.features.length - 1; i >= 0; i--) {
      var f = chart.features[i];
      if (!f || !f.geometry || (f.properties && f.properties.kind === "text")) continue;
      var fId = (f.properties && f.properties.id) || f.id;
      var lay = computeShapeLabelLayout(f);
      if (lay && lay.latlng) {
        var cPt = m.latLngToContainerPoint(lay.latlng);
        if (Math.abs(pt.x - cPt.x) <= lay.boxW * 0.55 && Math.abs(pt.y - cPt.y) <= Math.max(24, lay.boxH * 0.7)) {
          return { feature: f, id: fId };
        }
      }
      if (f.geometry.type === "LineString" && Array.isArray(f.geometry.coordinates)) {
        var lPts = f.geometry.coordinates.map(function (c) { return m.latLngToContainerPoint([c[1], c[0]]); });
        for (var s = 0; s < lPts.length - 1; s++) {
          if (distToSegmentPx(pt, lPts[s], lPts[s + 1]) <= 24) {
            return { feature: f, id: fId };
          }
        }
      }
    }
    return null;
  }

  function onMapDblClick(e) {
    if (!state.overlayOn) return;
    if (state.tool === "shapes" && state.shapeKind === "polygon" && state.draftPts.length > 0) {
      L.DomEvent.stop(e);
      finishFreePolygon();
      return;
    }
    var m = map();
    if (!m || !e || !e.originalEvent) return;
    var pt = m.mouseEventToContainerPoint(e.originalEvent);
    var hit = hitTestFeatureForLabelDblClick(pt);
    if (hit && hit.feature && (!hit.feature.properties || hit.feature.properties.kind !== "text")) {
      L.DomEvent.stop(e);
      state.selectedFeatureId = hit.id;
      state.editingLabelFeatureId = hit.id;
      setTool("select");
      rebuildMapLayers(null, hit.id);
    }
  }

  function bindMapHandlers() {
    var m = map();
    if (!m || state.mapHandlersBound) return;
    m.on("mousedown", onMapMouseDown);
    m.on("mousemove", onMapMouseMove);
    m.on("click", onMapClick);
    m.on("dblclick", onMapDblClick);
    m.on("zoom", function () {
      if (state.overlayOn) syncTextBoxesZoomScale();
    });
    m.on("zoom", function () {
      if (state.overlayOn) syncTextBoxesZoomScale();
    });
    m.on("zoomend", function () {
      if (state.overlayOn) rebuildMapLayers();
    });
    window.addEventListener("mouseup", onGlobalMouseUp, true);
    state.mapHandlersBound = true;
  }

  function syncMapDragState() {
    var m = map();
    if (!m) return;
    if (!state.overlayOn) {
      try { m.dragging.enable(); } catch (e0) {}
      try { m.doubleClickZoom.enable(); } catch (e1) {}
      return;
    }
    if (state.tool === "brush") {
      try { m.dragging.disable(); } catch (e2) {}
    } else {
      try { m.dragging.enable(); } catch (e3) {}
    }
    // Always disable map doubleClickZoom while Draw overlay is active so double-clicking a shape opens its label editor
    try { m.doubleClickZoom.disable(); } catch (e4) {}
  }

  function syncMapCursorClasses() {
    var mapEl = document.getElementById("ntmMap");
    if (!mapEl) return;
    if (state.overlayOn) {
      mapEl.classList.remove("ecdis-cursor-map");
      mapEl.classList.add("ss-uc-draw-active");
      mapEl.setAttribute("data-uc-tool", state.tool || "select");
    } else {
      mapEl.classList.remove("ss-uc-draw-active");
      mapEl.removeAttribute("data-uc-tool");
      mapEl.removeAttribute("data-uc-hover-cursor");
      mapEl.classList.add("ecdis-cursor-map");
    }
  }

  function closeFloatingMenus() {
    state.shapesMenuOpen = false;
    state.paletteOpen = false;
    var sm = document.getElementById("ssUcShapesMenu");
    var pm = document.getElementById("ssUcPalettePopover");
    if (sm) sm.hidden = true;
    if (pm) pm.hidden = true;
    syncToolbarUI();
  }

  function toggleShapesMenu() {
    state.paletteOpen = false;
    var pm = document.getElementById("ssUcPalettePopover");
    if (pm) pm.hidden = true;
    state.shapesMenuOpen = !state.shapesMenuOpen;
    var sm = document.getElementById("ssUcShapesMenu");
    if (sm) sm.hidden = !state.shapesMenuOpen;
    syncToolbarUI();
  }

  function togglePalettePopover() {
    state.shapesMenuOpen = false;
    var sm = document.getElementById("ssUcShapesMenu");
    if (sm) sm.hidden = true;
    state.paletteOpen = !state.paletteOpen;
    var pm = document.getElementById("ssUcPalettePopover");
    if (pm) pm.hidden = !state.paletteOpen;
    syncToolbarUI();
  }

  function setColor(newColor) {
    if (!newColor) return;
    state.color = newColor;
    persist();
    if (state.selectedFeatureId) {
      var f = findFeatureById(state.selectedFeatureId);
      if (f) {
        f.properties = f.properties || {};
        f.properties.color = state.color;
        persist();
        rebuildMapLayers();
      }
    }
    syncToolbarUI();
  }

  function setTool(tool, opts) {
    state.tool = tool || "select";
    clearDraft();
    setMapHoverCursor("");
    syncMapCursorClasses();
    syncMapDragState();
    syncToolbarUI();
    rebuildMapLayers(opts && opts.focusTextId ? opts.focusTextId : null);
  }

  function syncRailWidthToLayerBtn() {
    var rail = document.getElementById("ssUcDrawRail");
    if (!rail) return;
    var layerSel = document.querySelector(".ntm-chart-layer-selector.collapsed") || document.querySelector(".ntm-layer-trigger-btn");
    var maxW = 42;
    if (layerSel) {
      var r = layerSel.getBoundingClientRect();
      if (r && r.width >= 34 && r.width <= 54) {
        maxW = Math.floor(r.width);
      }
    }
    rail.style.setProperty("width", maxW + "px", "important");
    rail.style.setProperty("max-width", maxW + "px", "important");
    rail.style.setProperty("min-width", maxW + "px", "important");
  }

  function setOverlayActive(on, opts) {
    state.overlayOn = !!on;
    hideResizeHud();
    var rail = document.getElementById("ssUcDrawRail");
    if (rail) {
      rail.hidden = !state.overlayOn;
      if (state.overlayOn) syncRailWidthToLayerBtn();
    }
    var tab = document.getElementById("tabOverlayUserChart");
    if (tab) {
      tab.classList.toggle("active", state.overlayOn);
      tab.setAttribute("aria-pressed", state.overlayOn ? "true" : "false");
    }
    closeFloatingMenus();
    if (state.overlayOn) {
      bindMapHandlers();
      setTool("select");
    } else {
      clearDraft();
      state.selectedFeatureId = null;
      setTool("select");
      syncMapCursorClasses();
      syncMapDragState();
      if (!(opts && opts.keepLayerPanelOpen)) {
        closeLayerPanel();
      }
    }
    rebuildMapLayers();
    if (global.OVERLAY_STATES) global.OVERLAY_STATES.userchart = state.overlayOn;
  }

  function syncToolbarUI() {
    document.querySelectorAll("#ssUcDrawRail [data-uc-tool]").forEach(function (btn) {
      var t = btn.getAttribute("data-uc-tool");
      if (t === "palette") {
        btn.classList.toggle("is-active", !!state.paletteOpen);
      } else {
        btn.classList.toggle("is-active", t === state.tool);
      }
    });
    document.querySelectorAll("#ssUcShapesMenu [data-uc-shape]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-uc-shape") === state.shapeKind);
    });
    document.querySelectorAll("#ssUcPalettePopover [data-uc-swatch]").forEach(function (sw) {
      sw.classList.toggle(
        "is-active",
        (sw.getAttribute("data-uc-swatch") || "").toLowerCase() === (state.color || "").toLowerCase()
      );
    });
    var colorDot = document.getElementById("ssUcColorSwatchDot");
    if (colorDot) colorDot.style.background = state.color || "#f05a36";
    var colorInp = document.getElementById("ssUcColorInput");
    if (colorInp && colorInp.value.toLowerCase() !== (state.color || "").toLowerCase()) {
      colorInp.value = state.color || "#f05a36";
    }
  }

  /* ── Manual User Charts "^" Flyout Popup (#ssUcLayerPanel) ── */
  function renderLayerList(focusNameId) {
    var list = document.getElementById("ssUcLayerList");
    if (!list) return;
    list.innerHTML = "";
    state.charts.forEach(function (c) {
      var isAct = c.id === state.activeId;
      var row = document.createElement("div");
      row.className = "ss-uc-layer-row" + (isAct ? " is-active" : "");
      row.setAttribute("data-id", c.id);
      var nFeat = (c.features || []).length;
      row.innerHTML =
        '<button type="button" class="ss-uc-layer-pick" data-id="' + escapeHtml(c.id) + '" title="Activate this user chart" aria-label="Activate user chart">' +
          '<span class="ss-uc-layer-radio' + (isAct ? " is-on" : "") + '"></span>' +
        '</button>' +
        '<input type="text" class="ss-uc-layer-name-input" data-id="' + escapeHtml(c.id) + '" value="' + escapeHtml(c.name || "Untitled") + '" spellcheck="false" title="Click to edit user chart name" aria-label="User chart name" />' +
        '<span class="ss-uc-layer-meta" data-meta-id="' + escapeHtml(c.id) + '">' + nFeat + ' obj</span>' +
        '<button type="button" class="ss-uc-layer-del" data-id="' + escapeHtml(c.id) + '" title="Delete user chart" aria-label="Delete">×</button>';
      list.appendChild(row);
    });

    if (focusNameId) {
      setTimeout(function () {
        try {
          var inp = list.querySelector('.ss-uc-layer-name-input[data-id="' + focusNameId + '"]');
          if (inp) {
            inp.focus();
            inp.select();
          }
        } catch (eF) {}
      }, 20);
    }
  }

  function openLayerPanel() {
    var panel = document.getElementById("ssUcLayerPanel");
    var btn = document.getElementById("btnUserChartLayers");
    if (panel) {
      panel.hidden = false;
      panel.classList.add("is-open");
    }
    if (btn) {
      btn.setAttribute("aria-expanded", "true");
      btn.classList.add("is-open");
    }
    renderLayerList();
  }

  function closeLayerPanel() {
    var panel = document.getElementById("ssUcLayerPanel");
    var btn = document.getElementById("btnUserChartLayers");
    if (panel) {
      panel.hidden = true;
      panel.classList.remove("is-open");
    }
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-open");
    }
  }

  function toggleLayerPanel(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
    var panel = document.getElementById("ssUcLayerPanel");
    if (panel && !panel.hidden) closeLayerPanel();
    else openLayerPanel();
  }

  function nextChartName() {
    var used = Object.create(null);
    state.charts.forEach(function (c) {
      used[String(c.name || "").trim().toLowerCase()] = true;
    });
    var idx = state.charts.length + 1;
    while (used[("user chart " + idx).toLowerCase()]) {
      idx++;
    }
    return "User Chart " + idx;
  }

  function createChart() {
    var blank = { id: uid(), name: nextChartName(), features: [] };
    state.charts.push(blank);
    state.activeId = blank.id;
    state.selectedFeatureId = null;
    persist();
    if (!state.overlayOn) {
      if (typeof global.setOverlayActive === "function") {
        global.setOverlayActive("userchart", true, map());
      } else {
        setOverlayActive(true);
      }
    } else {
      rebuildMapLayers();
    }
    openLayerPanel();
    renderLayerList(blank.id);
  }

  function deleteChart(id) {
    if (!id) return;
    if (state.charts.length <= 1) {
      var only = state.charts[0];
      if (only) {
        only.features = [];
        only.name = "User Chart 1";
        state.activeId = only.id;
      }
    } else {
      state.charts = state.charts.filter(function (c) { return c.id !== id; });
      if (state.activeId === id) {
        state.activeId = state.charts[0].id;
      }
    }
    state.selectedFeatureId = null;
    persist();
    renderLayerList();
    rebuildMapLayers();
  }

  function selectChart(id, skipRerenderList) {
    if (!id) return;
    state.activeId = id;
    state.selectedFeatureId = null;
    persist();
    if (!skipRerenderList) {
      renderLayerList();
    } else {
      var list = document.getElementById("ssUcLayerList");
      if (list) {
        list.querySelectorAll(".ss-uc-layer-row").forEach(function (r) {
          var isAct = r.getAttribute("data-id") === id;
          r.classList.toggle("is-active", isAct);
          var rad = r.querySelector(".ss-uc-layer-radio");
          if (rad) rad.classList.toggle("is-on", isAct);
        });
      }
    }
    if (!state.overlayOn) {
      if (typeof global.setOverlayActive === "function") {
        global.setOverlayActive("userchart", true, map());
      } else {
        setOverlayActive(true);
      }
    } else {
      rebuildMapLayers();
    }
  }

  function renameChart(id, newName) {
    if (!id) return;
    var c = state.charts.find(function (item) { return item.id === id; });
    if (!c) return;
    var trimmed = String(newName != null ? newName : "").trim();
    c.name = trimmed || "Untitled Chart";
    persist();
  }

  /* ── Warnings corridor filter panel (same width as Warnings dock tile, numeric NM input) ── */
  function syncWarnFilterUI() {
    var enabled = !!global.ROUTE_CORRIDOR_FILTER_ENABLED;
    var nm = Number(global.ROUTE_CORRIDOR_BUFFER_NM);
    if (!Number.isFinite(nm)) nm = 25;
    nm = Math.max(1, Math.min(250, Math.round(nm)));
    var chk = document.getElementById("ssWarnCorrEnable");
    var rng = document.getElementById("ssWarnCorrNm");
    var lbl = document.getElementById("ssWarnCorrLbl");
    if (chk) chk.checked = enabled;
    if (rng && document.activeElement !== rng) rng.value = String(nm);
    if (lbl) lbl.textContent = "±" + nm + " NM";
  }

  function applyWarnFilterFromPanel() {
    var chk = document.getElementById("ssWarnCorrEnable");
    var rng = document.getElementById("ssWarnCorrNm");
    var enabled = !!(chk && chk.checked);
    var rawVal = rng ? String(rng.value || "").trim() : "25";
    var nm = rawVal === "" ? 25 : Number(rawVal);
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
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
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

  function ensureRailPopoversBuilt(rail) {
    if (!rail) return;
    if (!document.getElementById("ssUcShapesMenu")) {
      var sm = document.createElement("div");
      sm.id = "ssUcShapesMenu";
      sm.className = "ss-uc-flyout-menu ss-uc-shapes-menu";
      sm.hidden = true;
      sm.innerHTML =
        '<div class="ss-uc-menu-title">Shapes &amp; Polygons</div>' +
        '<div class="ss-uc-shapes-grid">' +
        SHAPE_CATALOG.map(function (s) {
          return (
            '<button type="button" class="ss-uc-shape-item" data-uc-shape="' + s.kind + '" title="' + escapeHtml(s.label) + '">' +
              '<span class="ss-uc-shape-ico">' + s.icon + '</span>' +
              '<span class="ss-uc-shape-lbl">' + escapeHtml(s.label) + '</span>' +
            '</button>'
          );
        }).join("") +
        '</div>' +
        '<div class="ss-uc-menu-hint">Hold LMB on contour to resize · Hold LMB inside to move</div>';
      rail.appendChild(sm);
    }

    if (!document.getElementById("ssUcPalettePopover")) {
      var pm = document.createElement("div");
      pm.id = "ssUcPalettePopover";
      pm.className = "ss-uc-flyout-menu ss-uc-palette-menu";
      pm.hidden = true;
      pm.innerHTML =
        '<div class="ss-uc-menu-title">Color Palette</div>' +
        '<div class="ss-uc-swatches-grid">' +
        PALETTE_COLORS.map(function (c) {
          return (
            '<button type="button" class="ss-uc-color-swatch" data-uc-swatch="' + c.hex + '" title="' + escapeHtml(c.name) + '" style="background:' + c.hex + ';"></button>'
          );
        }).join("") +
        '</div>' +
        '<label class="ss-uc-custom-color-row">' +
          '<span>Custom color</span>' +
          '<input type="color" id="ssUcColorInput" value="' + escapeHtml(state.color) + '" aria-label="Custom draw color" />' +
        '</label>';
      rail.appendChild(pm);
    }
  }

  function wireDom() {
    function bindChevron(el, handler) {
      if (!el || el.dataset.ssWired) return;
      el.dataset.ssWired = "1";
      el.addEventListener("pointerdown", function (ev) {
        ev.stopPropagation();
      }, true);
      el.addEventListener("mousedown", function (ev) {
        ev.stopPropagation();
      }, true);
      el.addEventListener("click", handler, true);
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
      ["pointerdown", "mousedown", "click", "dblclick"].forEach(function (evName) {
        warnPanel.addEventListener(evName, function (e) { e.stopPropagation(); });
      });
      var chk = document.getElementById("ssWarnCorrEnable");
      var rng = document.getElementById("ssWarnCorrNm");
      if (chk) chk.addEventListener("change", applyWarnFilterFromPanel);
      if (rng) {
        rng.addEventListener("input", function () {
          var v = String(rng.value || "").trim();
          if (v !== "" && Number.isFinite(Number(v))) {
            applyWarnFilterFromPanel();
          }
        });
        rng.addEventListener("change", function () {
          applyWarnFilterFromPanel();
          var nm = Number(global.ROUTE_CORRIDOR_BUFFER_NM) || 25;
          rng.value = String(nm);
        });
        rng.addEventListener("keydown", function (ev) {
          ev.stopPropagation();
          if (ev.key === "Enter") {
            ev.preventDefault();
            applyWarnFilterFromPanel();
            try { rng.blur(); } catch (eB) {}
          }
        });
      }
    }

    bindChevron(document.getElementById("btnUserChartLayers"), toggleLayerPanel);
    var layerPanel = document.getElementById("ssUcLayerPanel");
    if (layerPanel && !layerPanel.dataset.ssWired) {
      layerPanel.dataset.ssWired = "1";
      ["pointerdown", "mousedown", "dblclick"].forEach(function (evName) {
        layerPanel.addEventListener(evName, function (e) { e.stopPropagation(); });
      });

      layerPanel.addEventListener("click", function (e) {
        e.stopPropagation();
        var addBtn = e.target.closest("#ssUcLayerAdd, .ss-uc-layer-add");
        if (addBtn) {
          e.preventDefault();
          createChart();
          return;
        }
        var del = e.target.closest(".ss-uc-layer-del");
        if (del) {
          e.preventDefault();
          deleteChart(del.getAttribute("data-id"));
          return;
        }
        var pick = e.target.closest(".ss-uc-layer-pick");
        if (pick) {
          e.preventDefault();
          selectChart(pick.getAttribute("data-id"), false);
          return;
        }
        var nameInp = e.target.closest(".ss-uc-layer-name-input");
        if (nameInp) {
          var cid = nameInp.getAttribute("data-id");
          if (cid && cid !== state.activeId) {
            selectChart(cid, true);
          }
          return;
        }
        var row = e.target.closest(".ss-uc-layer-row");
        if (row && row.getAttribute("data-id")) {
          selectChart(row.getAttribute("data-id"), false);
        }
      });

      layerPanel.addEventListener("input", function (e) {
        var inp = e.target.closest(".ss-uc-layer-name-input");
        if (!inp) return;
        e.stopPropagation();
        var cid = inp.getAttribute("data-id");
        if (cid) {
          var c = state.charts.find(function (item) { return item.id === cid; });
          if (c) {
            c.name = inp.value;
            persist();
          }
        }
      });

      layerPanel.addEventListener("change", function (e) {
        var inp = e.target.closest(".ss-uc-layer-name-input");
        if (!inp) return;
        e.stopPropagation();
        var cid = inp.getAttribute("data-id");
        renameChart(cid, inp.value);
        var c = state.charts.find(function (item) { return item.id === cid; });
        if (c) inp.value = c.name;
      });

      layerPanel.addEventListener("keydown", function (e) {
        e.stopPropagation();
        var inp = e.target.closest(".ss-uc-layer-name-input");
        if (!inp) return;
        if (e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          renameChart(inp.getAttribute("data-id"), inp.value);
          try { inp.blur(); } catch (eB) {}
        }
      });
    }

    // Close #ssUcLayerPanel or #ssWarnFilterPanel when clicking outside their stacks
    document.addEventListener("mousedown", function (e) {
      var ucPanel = document.getElementById("ssUcLayerPanel");
      if (ucPanel && !ucPanel.hidden) {
        if (!e.target.closest("#userChartTabStack")) {
          closeLayerPanel();
        }
      }
      var wPanel = document.getElementById("ssWarnFilterPanel");
      if (wPanel && !wPanel.hidden) {
        if (!e.target.closest("#warningsTabStack")) {
          wPanel.hidden = true;
          wPanel.classList.remove("is-open");
          var wBtn = document.getElementById("btnNtmWarnFilterToggle");
          if (wBtn) {
            wBtn.setAttribute("aria-expanded", "false");
            wBtn.classList.remove("is-open");
          }
        }
      }
    });

    var rail = document.getElementById("ssUcDrawRail");
    if (rail && !rail.dataset.ssWired) {
      rail.dataset.ssWired = "1";
      ensureRailPopoversBuilt(rail);

      rail.addEventListener("mousedown", function (e) { e.stopPropagation(); });
      rail.addEventListener("dblclick", function (e) { e.stopPropagation(); });

      rail.addEventListener("click", function (e) {
        e.stopPropagation();

        var shapeItem = e.target.closest("[data-uc-shape]");
        if (shapeItem) {
          state.shapeKind = shapeItem.getAttribute("data-uc-shape") || "rect";
          persist();
          state.shapesMenuOpen = false;
          var sm = document.getElementById("ssUcShapesMenu");
          if (sm) sm.hidden = true;
          setTool("shapes");
          return;
        }

        var swatch = e.target.closest("[data-uc-swatch]");
        if (swatch) {
          setColor(swatch.getAttribute("data-uc-swatch") || "#f05a36");
          return;
        }

        var btn = e.target.closest("[data-uc-tool]");
        if (!btn) return;
        var tool = btn.getAttribute("data-uc-tool");

        if (tool === "palette") {
          togglePalettePopover();
          return;
        }
        if (tool === "shapes") {
          if (state.tool !== "shapes") {
            // Re-activate Shapes mode with the last remembered state.shapeKind
            setTool("shapes");
            state.shapesMenuOpen = true;
            var sm2 = document.getElementById("ssUcShapesMenu");
            if (sm2) sm2.hidden = false;
            state.paletteOpen = false;
            var pm2 = document.getElementById("ssUcPalettePopover");
            if (pm2) pm2.hidden = true;
            syncToolbarUI();
          } else {
            toggleShapesMenu();
          }
          return;
        }

        closeFloatingMenus();
        setTool(tool);
      });

      var colorInp = document.getElementById("ssUcColorInput");
      if (colorInp) {
        colorInp.addEventListener("input", function () {
          setColor(colorInp.value || "#f05a36");
        });
        colorInp.addEventListener("click", function (e) { e.stopPropagation(); });
      }
    }

    document.addEventListener("keydown", function (ev) {
      if (!state.overlayOn) return;
      if (ev.target && (ev.target.tagName === "TEXTAREA" || ev.target.tagName === "INPUT")) {
        if (ev.key === "Escape") {
          try { ev.target.blur(); } catch (eB) {}
        }
        return;
      }
      if (ev.key === "Enter") {
        if (state.tool === "shapes" && state.shapeKind === "polygon") finishFreePolygon();
      } else if (ev.key === "Escape") {
        clearDraft();
        closeFloatingMenus();
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
    setTool: setTool,
    setColor: setColor,
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
