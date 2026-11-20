/**
 * SetSail ECDIS True Course Leg Labels Overlay (v5.246)
 *
 * Displays the 3-digit True Course + "T" (e.g. 000T, 045T, 273T) beside every
 * loaded route track along each leg. Uses screen-space Liang-Barsky segment
 * clipping so that when zoomed in and panning along a long leg, the True Course
 * label glides smoothly along the visible portion of that leg and remains visible.
 */
(function initSetSailRouteCourseLabels() {
  "use strict";

  if (typeof window === "undefined") return;

  var COURSE_PANE = "routeCoursePane";
  var COURSE_PANE_Z = 760;
  var DEG_TO_RAD = Math.PI / 180;
  var RAD_TO_DEG = 180 / Math.PI;
  var MIN_LEG_PX = 34;

  function wrapLon180(lon) {
    return ((((Number(lon) + 180) % 360) + 360) % 360) - 180;
  }

  /** Rhumb-line (Mercator straight-segment) True Course in degrees [0, 360). */
  function computeRhumbTrueCourseDeg(lat1, lon1, lat2, lon2) {
    var phi1 = Math.max(-85, Math.min(85, Number(lat1))) * DEG_TO_RAD;
    var phi2 = Math.max(-85, Math.min(85, Number(lat2))) * DEG_TO_RAD;
    var dLonDeg = wrapLon180(Number(lon2) - Number(lon1));
    var dLam = dLonDeg * DEG_TO_RAD;
    var tan1 = Math.tan(Math.PI * 0.25 + phi1 * 0.5);
    var tan2 = Math.tan(Math.PI * 0.25 + phi2 * 0.5);
    var dPsi = Math.log(Math.max(1e-12, tan2) / Math.max(1e-12, tan1));
    if (Math.abs(dLam) < 1e-12 && Math.abs(dPsi) < 1e-12) return 0;
    var brng = Math.atan2(dLam, dPsi) * RAD_TO_DEG;
    return ((brng % 360) + 360) % 360;
  }

  function formatTrueCourse3T(deg) {
    var r = ((Math.round(deg) % 360) + 360) % 360;
    if (r < 10) return "00" + r + "T";
    if (r < 100) return "0" + r + "T";
    return String(r) + "T";
  }

  function ensureRouteCoursePane(map) {
    if (!map || !map.getPane || !map.createPane) return "overlayPane";
    var pane = map.getPane(COURSE_PANE);
    if (!pane) pane = map.createPane(COURSE_PANE);
    if (pane) {
      pane.style.zIndex = String(COURSE_PANE_Z);
      pane.style.pointerEvents = "none";
    }
    return COURSE_PANE;
  }

  /** Liang-Barsky screen-space clipping of segment (x0,y0)->(x1,y1) against [xmin,xmax]x[ymin,ymax]. */
  function clipSegmentToRect(x0, y0, x1, y1, xmin, ymin, xmax, ymax) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var t0 = 0;
    var t1 = 1;

    var p = [-dx, dx, -dy, dy];
    var q = [x0 - xmin, xmax - x0, y0 - ymin, ymax - y0];

    for (var i = 0; i < 4; i++) {
      var pi = p[i];
      var qi = q[i];
      if (Math.abs(pi) < 1e-9) {
        if (qi < 0) return null;
      } else {
        var t = qi / pi;
        if (pi < 0) {
          if (t > t1) return null;
          if (t > t0) t0 = t;
        } else {
          if (t < t0) return null;
          if (t < t1) t1 = t;
        }
      }
    }
    if (t0 > t1) return null;
    return {
      cx0: x0 + dx * t0,
      cy0: y0 + dy * t0,
      cx1: x0 + dx * t1,
      cy1: y0 + dy * t1,
      tMid: 0.5 * (t0 + t1)
    };
  }

  function isRouteHaloOrCorridorEdge(layer) {
    if (!layer || !layer.options) return true;
    var opt = layer.options;
    var cls = String(opt.className || "");
    if (cls.indexOf("setsail-route-centerline") >= 0 || opt.isRouteTrack === true) {
      return false;
    }
    if (cls.indexOf("setsail-route-port-edge") >= 0 || cls.indexOf("setsail-route-stbd-edge") >= 0) {
      return true;
    }
    // Halo strokes in renderRouteOnMap / renderRouteBufferCorridorOnMap use #fecaca and interactive:false
    if (opt.color === "#fecaca" || (opt.interactive === false && !opt.dashArray)) {
      return true;
    }
    return false;
  }

  function extractPolylineCoordChains(pl) {
    if (!pl || typeof pl.getLatLngs !== "function") return [];
    var raw = pl.getLatLngs();
    if (!Array.isArray(raw) || raw.length === 0) return [];
    // MultiPolyline support: array of arrays of LatLngs
    if (Array.isArray(raw[0])) {
      var out = [];
      for (var i = 0; i < raw.length; i++) {
        if (Array.isArray(raw[i]) && raw[i].length >= 2) out.push(raw[i]);
      }
      return out;
    }
    return raw.length >= 2 ? [raw] : [];
  }

  function collectLoadedRouteChains(map, layerInstance) {
    if (!map) return [];
    if (typeof window.OVERLAY_STATES !== "undefined" && window.OVERLAY_STATES.route === false) {
      return [];
    }
    if (typeof window.ROUTE_SUBFILTERS !== "undefined" && window.ROUTE_SUBFILTERS.line === false) {
      return [];
    }

    var chains = [];
    var seenPolylines = new Set();

    function scanGroup(group) {
      if (!group || !map.hasLayer(group) || typeof group.eachLayer !== "function") return;
      group.eachLayer(function (lyr) {
        if (!lyr || typeof L === "undefined" || !(lyr instanceof L.Polyline) || (L.Polygon && lyr instanceof L.Polygon)) {
          return;
        }
        if (seenPolylines.has(lyr) || isRouteHaloOrCorridorEdge(lyr)) return;
        seenPolylines.add(lyr);
        if (layerInstance) layerInstance._watchPolyline(lyr);
        var parts = extractPolylineCoordChains(lyr);
        for (var p = 0; p < parts.length; p++) {
          chains.push(parts[p]);
        }
      });
    }

    if (typeof window.leafletRouteLayer !== "undefined" && window.leafletRouteLayer) {
      scanGroup(window.leafletRouteLayer);
    }
    if (typeof window.leafletRouteBufferLayer !== "undefined" && window.leafletRouteBufferLayer && chains.length === 0) {
      scanGroup(window.leafletRouteBufferLayer);
    }

    // Also pick up any additional visible route centerline polylines attached directly to map or custom route groups
    if (typeof map.eachLayer === "function") {
      map.eachLayer(function (lyr) {
        if (!lyr || lyr === window.leafletRouteLayer || lyr === window.leafletRouteBufferLayer) return;
        if (typeof L !== "undefined" && lyr instanceof L.Polyline && !(L.Polygon && lyr instanceof L.Polygon)) {
          var cls = String((lyr.options && lyr.options.className) || "");
          if ((cls.indexOf("setsail-route-centerline") >= 0 || (lyr.options && lyr.options.isRouteTrack)) && !seenPolylines.has(lyr)) {
            seenPolylines.add(lyr);
            if (layerInstance) layerInstance._watchPolyline(lyr);
            var parts = extractPolylineCoordChains(lyr);
            for (var p = 0; p < parts.length; p++) chains.push(parts[p]);
          }
        }
      });
    }

    // Fallback: if polyline object was replaced or activeRouteData exists while route layer is active
    if (chains.length === 0 && window._setsailRouteStrokeRefs) {
      var ref = window._setsailRouteStrokeRefs.center || window._setsailRouteStrokeRefs.centerBuf;
      if (ref && map.hasLayer(ref)) {
        if (layerInstance) layerInstance._watchPolyline(ref);
        var rParts = extractPolylineCoordChains(ref);
        for (var k = 0; k < rParts.length; k++) chains.push(rParts[k]);
      }
    }

    return chains;
  }

  var EcdisRouteCourseLayer = (typeof L !== "undefined" && L.Layer) ? L.Layer.extend({
    onAdd: function (map) {
      this._map = map;
      this._paneName = ensureRouteCoursePane(map);
      var pane = map.getPane(this._paneName) || map.getPanes().overlayPane;

      var old = pane.querySelector("#setsailRouteCourseCanvas");
      if (old && old.parentNode) old.parentNode.removeChild(old);

      this._canvas = document.createElement("canvas");
      this._canvas.id = "setsailRouteCourseCanvas";
      this._canvas.className = "setsail-route-course-canvas";
      this._canvas.style.position = "absolute";
      this._canvas.style.top = "0";
      this._canvas.style.left = "0";
      this._canvas.style.pointerEvents = "none";
      pane.appendChild(this._canvas);

      this._rafId = null;
      this._isZooming = false;
      this._lastStats = { chains: 0, legsVisible: 0, labelsDrawn: 0 };

      map.on("move zoom moveend zoomend viewreset resize layeradd layerremove", this._scheduleDraw, this);
      map.on("zoomanim", this._onZoomAnim, this);

      this._drawImmediate();
    },

    onRemove: function (map) {
      if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
      map.off("move zoom moveend zoomend viewreset resize layeradd layerremove", this._scheduleDraw, this);
      map.off("zoomanim", this._onZoomAnim, this);
      if (this._canvas && this._canvas.parentNode) {
        this._canvas.parentNode.removeChild(this._canvas);
      }
      this._canvas = null;
      this._map = null;
    },

    _watchPolyline: function (pl) {
      if (!pl || pl._rcCourseWatched) return;
      pl._rcCourseWatched = true;
      var self = this;
      if (typeof pl.setLatLngs === "function") {
        var origSet = pl.setLatLngs;
        pl.setLatLngs = function () {
          var res = origSet.apply(this, arguments);
          self._scheduleDraw();
          return res;
        };
      }
    },

    _onZoomAnim: function () {
      this._isZooming = true;
      if (this._canvas) {
        this._canvas.style.opacity = "0";
      }
    },

    _scheduleDraw: function () {
      if (!this._map) return;
      if (this._isZooming) {
        this._isZooming = false;
        if (this._canvas) this._canvas.style.opacity = "1";
      }
      if (this._rafId) return;
      var self = this;
      this._rafId = requestAnimationFrame(function () {
        self._rafId = null;
        self._drawImmediate();
      });
    },

    refreshNow: function () {
      this._isZooming = false;
      if (this._canvas) this._canvas.style.opacity = "1";
      this._drawImmediate();
    },

    _drawImmediate: function () {
      var map = this._map;
      var canvas = this._canvas;
      if (!map || !canvas) return;
      ensureRouteCoursePane(map);

      var sz = map.getSize();
      var w = Math.max(0, Math.round(sz.x));
      var h = Math.max(0, Math.round(sz.y));
      if (w < 8 || h < 8) return;

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var pw = Math.round(w * dpr);
      var ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
      }

      var topLeftLayer = map.containerPointToLayerPoint([0, 0]);
      L.DomUtil.setPosition(canvas, topLeftLayer);

      var ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var chains = collectLoadedRouteChains(map, this);
      if (!chains.length) {
        this._lastStats = { chains: 0, legsVisible: 0, labelsDrawn: 0 };
        return;
      }

      // Safe clipping bounds inside viewport edges so sliding labels never clip under borders
      var padX = Math.min(34, Math.max(18, Math.round(w * 0.03)));
      var padTop = Math.min(54, Math.max(24, Math.round(h * 0.06)));
      var padBot = Math.min(44, Math.max(22, Math.round(h * 0.05)));
      var xmin = padX;
      var ymin = padTop;
      var xmax = Math.max(xmin + 10, w - padX);
      var ymax = Math.max(ymin + 10, h - padBot);

      var candidates = [];

      for (var cIdx = 0; cIdx < chains.length; cIdx++) {
        var pts = chains[cIdx];
        if (!pts || pts.length < 2) continue;

        // Pre-project every vertex once
        var scrX = new Float64Array(pts.length);
        var scrY = new Float64Array(pts.length);
        for (var vi = 0; vi < pts.length; vi++) {
          var p = map.latLngToContainerPoint(pts[vi]);
          scrX[vi] = p.x;
          scrY[vi] = p.y;
        }

        for (var i = 0; i < pts.length - 1; i++) {
          var x0 = scrX[i];
          var y0 = scrY[i];
          var x1 = scrX[i + 1];
          var y1 = scrY[i + 1];

          var fullLen = Math.hypot(x1 - x0, y1 - y0);
          if (fullLen < MIN_LEG_PX) continue;

          var clipped = clipSegmentToRect(x0, y0, x1, y1, xmin, ymin, xmax, ymax);
          if (!clipped) continue;

          var visLen = Math.hypot(clipped.cx1 - clipped.cx0, clipped.cy1 - clipped.cy0);
          if (visLen < MIN_LEG_PX) continue;

          var aLL = pts[i];
          var bLL = pts[i + 1];
          var courseDeg = computeRhumbTrueCourseDeg(aLL.lat, aLL.lng, bLL.lat, bLL.lng);
          var text = formatTrueCourse3T(courseDeg);

          // Screen-space angle along leg (keep text upright: [-90 deg, +90 deg))
          var ang = Math.atan2(y1 - y0, x1 - x0);
          if (ang > Math.PI * 0.499) ang -= Math.PI;
          else if (ang < -Math.PI * 0.501) ang += Math.PI;

          // Center label along the VISIBLE clipped portion of the leg, offset beside the centerline
          var mx = 0.5 * (clipped.cx0 + clipped.cx1);
          var my = 0.5 * (clipped.cy0 + clipped.cy1);
          var nx = -Math.sin(ang);
          var ny = Math.cos(ang);
          var offsetPx = -12;
          var lx = mx + nx * offsetPx;
          var ly = my + ny * offsetPx;

          // If offset pushed near screen rim, flip to the opposite side of the route line
          if (lx < 26 || lx > w - 26 || ly < 22 || ly > h - 22) {
            lx = mx - nx * offsetPx;
            ly = my - ny * offsetPx;
          }

          candidates.push({
            lx: lx,
            ly: ly,
            ang: ang,
            text: text,
            visLen: visLen,
            chainIdx: cIdx,
            legIdx: i
          });
        }
      }

      if (!candidates.length) {
        this._lastStats = { chains: chains.length, legsVisible: 0, labelsDrawn: 0 };
        return;
      }

      // Draw longest visible legs first so short harbor bends never crowd out main leg labels
      candidates.sort(function (a, b) {
        return b.visLen - a.visLen;
      });

      ctx.save();
      ctx.font = "700 10.5px \"JetBrains Mono\", \"Consolas\", monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      var placed = [];
      var pillW = 36;
      var pillH = 15;
      var halfW = pillW * 0.5;
      var halfH = pillH * 0.5;
      var drawnCount = 0;

      for (var k = 0; k < candidates.length; k++) {
        var c = candidates[k];
        var clash = false;
        for (var pIdx = 0; pIdx < placed.length; pIdx++) {
          var prev = placed[pIdx];
          if (Math.hypot(c.lx - prev.x, c.ly - prev.y) < 34) {
            clash = true;
            break;
          }
        }
        if (clash) continue;

        placed.push({ x: c.lx, y: c.ly, text: c.text, legIdx: c.legIdx });
        drawnCount += 1;

        ctx.save();
        ctx.translate(c.lx, c.ly);
        ctx.rotate(c.ang);

        ctx.fillStyle = "rgba(9, 17, 31, 0.84)";
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(-halfW, -halfH, pillW, pillH, 4);
        } else {
          ctx.rect(-halfW, -halfH, pillW, pillH);
        }
        ctx.fill();

        ctx.strokeStyle = "rgba(252, 165, 165, 0.62)";
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.fillStyle = "#F8FAFC";
        ctx.fillText(c.text, 0, 0.5);
        ctx.restore();
      }

      ctx.restore();

      this._lastStats = {
        chains: chains.length,
        legsVisible: candidates.length,
        labelsDrawn: drawnCount,
        placed: placed
      };
    }
  }) : null;

  function ensureRouteCourseLayer(map) {
    if (!map || !EcdisRouteCourseLayer) return null;
    if (!map._routeCourseLayer) {
      map._routeCourseLayer = new EcdisRouteCourseLayer();
    }
    if (!map.hasLayer(map._routeCourseLayer)) {
      map._routeCourseLayer.addTo(map);
    }
    return map._routeCourseLayer;
  }

  function refreshRouteCourseLabels() {
    var m = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
    if (!m) return;
    var layer = ensureRouteCourseLayer(m);
    if (layer) layer.refreshNow();
  }

  // Wrap route lifecycle hooks so True Course labels refresh immediately on load, edit, corridor render, or clear
  function wrapRouteFn(fnName) {
    if (typeof window[fnName] === "function" && !window[fnName]._rcWrapped) {
      var orig = window[fnName];
      var wrapped = function () {
        var r = orig.apply(this, arguments);
        setTimeout(refreshRouteCourseLabels, 0);
        return r;
      };
      wrapped._rcWrapped = true;
      window[fnName] = wrapped;
    }
  }

  wrapRouteFn("renderRouteOnMap");
  wrapRouteFn("renderRouteBufferCorridorOnMap");
  wrapRouteFn("clearActiveRoute");
  wrapRouteFn("updateRouteMiniWindowUI");

  if (typeof window.initNtMMap === "function" && !window.initNtMMap._rcWrapped) {
    var _origInitMap = window.initNtMMap;
    var wrappedInit = function () {
      var r = _origInitMap.apply(this, arguments);
      var m = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
      if (m) ensureRouteCourseLayer(m);
      return r;
    };
    wrappedInit._rcWrapped = true;
    window.initNtMMap = wrappedInit;
  }

  window.refreshRouteCourseLabels = refreshRouteCourseLabels;
  window.computeRhumbTrueCourseDeg = computeRhumbTrueCourseDeg;
  window.formatTrueCourse3T = formatTrueCourse3T;

  window._routeCourseDebug = {
    getStats: function () {
      var m = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
      var lyr = m && m._routeCourseLayer ? m._routeCourseLayer : null;
      return {
        version: "v5.246",
        hasLayer: Boolean(lyr && m && m.hasLayer(lyr)),
        stats: lyr ? lyr._lastStats : null
      };
    }
  };

  var existingMap = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
  if (existingMap) {
    ensureRouteCourseLayer(existingMap);
  }
})();
