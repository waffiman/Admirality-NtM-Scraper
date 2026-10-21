/**
 * Open Waters — Bathymetry overlay + per-port Tides / Currents
 * Bathymetry uses a custom Leaflet layer that hosts MapLibre and syncs via jumpTo
 * (no maplibre-gl-leaflet bridge — that breaks on MapLibre v4 transform API).
 */
(function (global) {
  "use strict";

  const TIDES_EXTREMES = "https://api.openwaters.io/tides/extremes";
  const CURRENTS_EVENTS = "https://api.openwaters.io/currents/events";

  // Prefer already-loaded <script> from index.html; then same-origin files (no CDN — SW/CDN flakes)
  const ML_BUNDLES = [
    {
      css: "assets/Auto%20NtM%20Plotting/maplibre-gl.css?v=5.50",
      js: "assets/Auto%20NtM%20Plotting/maplibre-gl.js?v=5.50"
    }
  ];
  // Leaflet 256px vs MapLibre 512px vector tiles → zoom − 1
  const GL_ZOOM_OFFSET = 1;

  // ECDIS-like discrete depth bands (same cyan-blue family, stronger contrast).
  // Sharp stop pairs keep band edges crisp; land (≥0) stays transparent.
  const BATHY_COLOR_RELIEF = [
    "interpolate",
    ["linear"],
    ["elevation"],
    -10000, "#f0f9ff",
    -50.01, "#f0f9ff",
    -50, "#93c5fd",
    -20.01, "#93c5fd",
    -20, "#38bdf8",
    -10.01, "#38bdf8",
    -10, "#0ea5e9",
    -5.01, "#0ea5e9",
    -5, "#0284c7",
    -2.01, "#0284c7",
    -2, "#0369a1",
    -0.01, "#0369a1",
    0, "rgba(247,240,221,0)",
    2, "rgba(247,240,221,0)"
  ];

  let readyPromise = null;
  let OwGlLayerClass = null;

  function loadCss(href) {
    if (document.querySelector('link[data-ow-href="' + href + '"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-ow-ml", "1");
    link.setAttribute("data-ow-href", href);
    document.head.appendChild(link);
  }

  function loadScript(src, timeoutMs) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-ow-src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute("data-ow-loaded") === "1") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed " + src)));
        return;
      }
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        reject(new Error("Timeout loading MapLibre (" + Math.round((timeoutMs || 15000) / 1000) + "s)"));
      }, timeoutMs || 15000);
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.setAttribute("data-ow-src", src);
      s.onload = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        s.setAttribute("data-ow-loaded", "1");
        resolve();
      };
      s.onerror = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(new Error("Failed to load " + src));
      };
      document.head.appendChild(s);
    });
  }

  function flashOwStatus(msg, isErr) {
    try {
      let el = document.getElementById("setsailOwLayerStatus");
      if (!el) {
        el = document.createElement("div");
        el.id = "setsailOwLayerStatus";
        el.setAttribute("role", "status");
        el.style.cssText =
          "position:absolute;top:56px;right:12px;z-index:950;max-width:min(320px,70vw);" +
          "padding:8px 10px;border-radius:8px;font:600 12px/1.35 system-ui,sans-serif;" +
          "pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.45);transition:opacity .25s ease;";
        const host = document.getElementById("ntmMapContainer") || document.body;
        host.appendChild(el);
      }
      el.style.background = isErr ? "rgba(127,29,29,0.94)" : "rgba(8,47,73,0.94)";
      el.style.color = isErr ? "#fecaca" : "#e0f2fe";
      el.style.border = isErr ? "1px solid rgba(248,113,113,0.55)" : "1px solid rgba(56,189,248,0.45)";
      el.textContent = msg;
      el.style.opacity = "1";
      clearTimeout(el._hideTimer);
      el._hideTimer = setTimeout(() => {
        el.style.opacity = "0";
      }, isErr ? 8000 : 3200);
    } catch (e) {}
  }

  function ensureOwGlLayerClass() {
    if (OwGlLayerClass) return OwGlLayerClass;
    if (typeof L === "undefined") throw new Error("Leaflet required");

    OwGlLayerClass = L.Layer.extend({
      options: {
        style: null,
        opacity: 1,
        attribution: "Open Waters"
      },

      initialize: function (options) {
        L.setOptions(this, options);
      },

      onAdd: function (map) {
        this._map = map;
        // Host inside Leaflet map-pane stack (below marker/ports panes) so port tags stay above Bathymetry
        if (!map.getPane("owBathyPane")) {
          const pane = map.createPane("owBathyPane");
          pane.style.zIndex = 450;
          pane.style.pointerEvents = "none";
        }
        const root = (this._container = L.DomUtil.create("div", "setsail-ow-gl-root"));
        root.style.cssText =
          "position:absolute;left:0;top:0;width:100%;height:100%;" +
          "pointer-events:none;overflow:hidden;background:transparent;";
        map.getPane("owBathyPane").appendChild(root);

        const center = map.getCenter();
        const glZoom = Math.max(0, map.getZoom() - GL_ZOOM_OFFSET);
        const lowEnd = !!(global._setsailLowEndMap);
        const dpr = (typeof window !== "undefined" && window.devicePixelRatio) || 1;

        this._glMap = new global.maplibregl.Map({
          container: root,
          style: this.options.style,
          center: [center.lng, center.lat],
          zoom: glZoom,
          bearing: 0,
          pitch: 0,
          interactive: false,
          attributionControl: false,
          fadeDuration: 0,
          trackResize: true,
          antialias: false,
          refreshExpiredTiles: false,
          maxTileCacheSize: lowEnd ? 40 : 80,
          pixelRatio: lowEnd ? Math.min(1, dpr) : Math.min(1.5, dpr)
        });

        this._syncRaf = 0;
        this._panRaf = 0;
        this._lastSyncKey = "";
        this._freezeCenter = null;
        // Pane already moves with Leaflet — only re-sync MapLibre after pan/zoom settles
        this._onMoveEnd = this._handleMoveEnd.bind(this);
        this._onZoomStart = this._handleZoomStart.bind(this);
        this._onZoomEnd = this._handleZoomEnd.bind(this);
        this._onResize = this._resizeGl.bind(this);

        map.on("moveend", this._onMoveEnd);
        map.on("zoomstart", this._onZoomStart);
        map.on("zoomend", this._onZoomEnd);
        map.on("resize", this._onResize);

        this._glMap.on("load", () => {
          this._resizeGl();
          this._syncView(true);
        });
        this._glMap.on("error", (e) => {
          const msg = (e && e.error && e.error.message) || (e && e.message) || "tile/style error";
          console.warn("[SetSail] MapLibre error:", msg, e);
        });

        // Attribution
        if (map.attributionControl && this.options.attribution) {
          map.attributionControl.addAttribution(this.options.attribution);
        }

        setTimeout(() => this._resizeGl(), 50);
        setTimeout(() => this._resizeGl(), 300);
      },

      onRemove: function (map) {
        map.off("moveend", this._onMoveEnd);
        map.off("zoomstart", this._onZoomStart);
        map.off("zoomend", this._onZoomEnd);
        map.off("resize", this._onResize);
        if (this._syncRaf) {
          try { cancelAnimationFrame(this._syncRaf); } catch (e) {}
          this._syncRaf = 0;
        }
        if (this._panRaf) {
          try { cancelAnimationFrame(this._panRaf); } catch (e) {}
          this._panRaf = 0;
        }
        if (map.attributionControl && this.options.attribution) {
          map.attributionControl.removeAttribution(this.options.attribution);
        }
        try {
          if (this._glMap) {
            this._glMap.remove();
            this._glMap = null;
          }
        } catch (e) {}
        if (this._container && this._container.parentNode) {
          this._container.parentNode.removeChild(this._container);
        }
        this._container = null;
        this._map = null;
      },

      getMaplibreMap: function () {
        return this._glMap;
      },

      _glZoom: function () {
        return Math.max(0, this._map.getZoom() - GL_ZOOM_OFFSET);
      },

      _clearPanTransform: function () {
        if (!this._container) return;
        this._container.style.transform = "";
        this._container.style.willChange = "";
      },

      _handleMoveEnd: function () {
        this._clearPanTransform();
        this._syncView(true);
      },

      // Zoom: wait until idle — mid-zoom jumpTo was the main Bathymetry jank source
      _handleZoomStart: function () {
        this._zooming = true;
        this._clearPanTransform();
        try {
          if (this._glMap && typeof this._glMap.stop === "function") this._glMap.stop();
        } catch (e) {}
      },

      _handleZoomEnd: function () {
        this._zooming = false;
        this._clearPanTransform();
        this._syncView(true);
      },

      _syncView: function (force) {
        if (!this._glMap || !this._map || this._zooming) return;
        try {
          const c = this._map.getCenter();
          const z = this._glZoom();
          const key = c.lng.toFixed(5) + "," + c.lat.toFixed(5) + "," + z.toFixed(3);
          if (!force && key === this._lastSyncKey) return;
          this._lastSyncKey = key;
          this._clearPanTransform();
          this._glMap.jumpTo({
            center: [c.lng, c.lat],
            zoom: z,
            bearing: 0,
            pitch: 0
          });
        } catch (e) {}
      },

      _resizeGl: function () {
        if (!this._glMap || !this._map || !this._container) return;
        try {
          const size = this._map.getSize();
          this._container.style.width = size.x + "px";
          this._container.style.height = size.y + "px";
          this._glMap.resize();
          this._syncView(true);
        } catch (e) {}
      }
    });

    return OwGlLayerClass;
  }

  function ensureMapLibreReady() {
    if (readyPromise) return readyPromise;
    readyPromise = (async () => {
      if (typeof global.maplibregl === "undefined") {
        let lastErr = null;
        for (let i = 0; i < ML_BUNDLES.length; i++) {
          const b = ML_BUNDLES[i];
          try {
            loadCss(b.css);
            await loadScript(b.js, 18000);
            if (typeof global.maplibregl !== "undefined") break;
            lastErr = new Error("maplibregl global missing after " + b.js);
          } catch (err) {
            lastErr = err;
          }
        }
        if (typeof global.maplibregl === "undefined") {
          throw lastErr || new Error("MapLibre failed to load");
        }
      }
      // Self-hosted worker (avoids blob/CDN worker flakes)
      try {
        if (global.maplibregl && !global.maplibregl.workerUrl) {
          const workerUrl = new URL(
            "assets/Auto%20NtM%20Plotting/maplibre-gl-csp-worker.js",
            global.location.href
          ).href;
          global.maplibregl.workerUrl = workerUrl;
        }
      } catch (e) {}
      if (typeof L === "undefined") throw new Error("Leaflet required");
      ensureOwGlLayerClass();
    })().catch((err) => {
      readyPromise = null;
      throw err;
    });
    return readyPromise;
  }

  /**
   * Bathymetry overlay: ECDIS-like depth bands + subtle isobath borders + numerical labels.
   * Contours come from Open Waters Seascape vector tiles (MVT; MapLibre ≥5.14 also accepts MLT).
   */
  function buildBathymetryOverlayStyle() {
    return {
      version: 8,
      name: "SetSail Bathymetry overlay",
      glyphs: "https://tiles.openwaters.io/fonts/{fontstack}/{range}.pbf",
      sources: {
        "seascape-dem": {
          type: "raster-dem",
          tiles: ["https://tiles.openwaters.io/seascape/{z}/{x}/{y}.webp"],
          tileSize: 512,
          maxzoom: 14,
          encoding: "terrarium",
          attribution: "Open Waters Bathymetry"
        },
        "seascape-vector": {
          type: "vector",
          tiles: ["https://tiles.openwaters.io/seascape/{z}/{x}/{y}.pbf"],
          minzoom: 4,
          maxzoom: 15
        }
      },
      layers: [
        {
          id: "ow-transparent-bg",
          type: "background",
          paint: { "background-color": "rgba(0,0,0,0)" }
        },
        {
          id: "ow-bathy-color-relief",
          type: "color-relief",
          source: "seascape-dem",
          paint: {
            "color-relief-color": BATHY_COLOR_RELIEF,
            "color-relief-opacity": 0.78
          }
        },
        {
          id: "ow-bathy-contours",
          type: "line",
          source: "seascape-vector",
          "source-layer": "contours",
          filter: ["!=", ["get", "sys"], "ft"],
          minzoom: 4,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": [
              "case",
              ["in", ["get", "depth_abs_m"], ["literal", [10, 20, 50]]],
              "rgba(15, 55, 90, 0.45)",
              "rgba(30, 70, 110, 0.32)"
            ],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              4,
              ["case", ["in", ["get", "depth_abs_m"], ["literal", [10, 20, 50]]], 0.75, 0.4],
              11,
              ["case", ["in", ["get", "depth_abs_m"], ["literal", [10, 20, 50]]], 1.1, 0.6]
            ]
          }
        },
        {
          id: "ow-bathy-contour-labels",
          type: "symbol",
          source: "seascape-vector",
          "source-layer": "contours",
          filter: ["!=", ["get", "sys"], "ft"],
          minzoom: 6,
          layout: {
            "symbol-placement": "line",
            "symbol-spacing": 200,
            "text-field": ["to-string", ["coalesce", ["get", "depth_abs_m"], ["get", "depth_m"]]],
            "text-size": ["interpolate", ["linear"], ["zoom"], 6, 11, 10, 13, 14, 15],
            "text-font": ["Noto Sans Regular"],
            "text-letter-spacing": 0.04,
            "text-max-angle": 35,
            "text-padding": 12,
            "text-allow-overlap": false,
            "text-optional": true,
            "text-rotation-alignment": "map",
            "text-pitch-alignment": "viewport"
          },
          paint: {
            "text-color": "#082f49",
            "text-halo-color": "rgba(255, 255, 255, 0.95)",
            "text-halo-width": 2,
            "text-halo-blur": 0.15
          }
        },
        {
          id: "ow-bathy-soundings",
          type: "symbol",
          source: "seascape-vector",
          "source-layer": "soundings",
          minzoom: 9,
          layout: {
            "text-field": ["to-string", ["round", ["get", "depth_m"]]],
            "text-size": ["interpolate", ["linear"], ["zoom"], 9, 10, 13, 13],
            "text-font": ["Noto Sans Regular"],
            "text-padding": 10,
            "text-optional": true,
            "text-allow-overlap": false
          },
          paint: {
            "text-color": "#0c4a6e",
            "text-halo-color": "rgba(255, 255, 255, 0.9)",
            "text-halo-width": 1.5
          }
        }
      ]
    };
  }

  function waitForGlStyle(layer, timeoutMs) {
    return new Promise((resolve, reject) => {
      const gl = layer && layer.getMaplibreMap && layer.getMaplibreMap();
      if (!gl) {
        reject(new Error("MapLibre map not created"));
        return;
      }
      let settled = false;
      const finish = (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try {
          gl.off("load", onLoad);
          gl.off("idle", onIdle);
          gl.off("error", onErr);
        } catch (e) {}
        if (err) reject(err);
        else resolve();
      };
      const onLoad = () => finish(null);
      const onIdle = () => finish(null);
      const onErr = (e) => {
        const msg = (e && e.error && e.error.message) || (e && e.message) || "";
        const s = String(msg);
        // Tile stream errors shouldn't kill the overlay after style is accepted
        if (/Unimplemented type|Unable to parse the tile|Failed to load tile/i.test(s)) {
          console.warn("[SetSail] MapLibre tile warning:", s);
          return;
        }
        if (/raster-dem source can only|unsupported layer type|unknown layer type/i.test(s)) {
          finish(new Error(s || "MapLibre style error"));
        }
      };
      const timer = setTimeout(() => {
        try {
          // Prefer success if anything rendered; avoid infinite spinner
          if (gl.isStyleLoaded && gl.isStyleLoaded()) finish(null);
          else finish(null); // still show layer; tiles may continue streaming
        } catch (e) {
          finish(null);
        }
      }, timeoutMs || 12000);
      try {
        if (gl.isStyleLoaded && gl.isStyleLoaded()) {
          finish(null);
          return;
        }
      } catch (e) {}
      gl.on("load", onLoad);
      gl.on("idle", onIdle);
      gl.on("error", onErr);
    });
  }

  function wireGlLayerResize(layer, map) {
    if (!layer || !map) return;
    const kick = () => {
      try {
        if (typeof layer._resizeGl === "function") layer._resizeGl();
        else {
          const gl = layer.getMaplibreMap && layer.getMaplibreMap();
          if (gl && typeof gl.resize === "function") gl.resize();
        }
        map.invalidateSize({ animate: false });
      } catch (e) {}
    };
    setTimeout(kick, 40);
    setTimeout(kick, 280);
  }

  function createMapLibreLayer(style, attribution) {
    const Cls = ensureOwGlLayerClass();
    return new Cls({
      style: style,
      attribution: attribution || "Open Waters"
    });
  }

  async function createBathymetryLayer() {
    await ensureMapLibreReady();
    return createMapLibreLayer(buildBathymetryOverlayStyle(), "Open Waters Bathymetry");
  }

  const TIDES_STATIONS = "https://api.openwaters.io/tides/stations";
  const ALMANAC_ESM = "https://cdn.jsdelivr.net/npm/@openwaters/almanac@0.8.0/+esm";
  const OW_PORT_HUBS = [
    [1.26, 103.85], [51.5, 0.1], [40.7, -74.0], [35.65, 139.75],
    [22.3, 114.17], [-33.85, 151.2], [25.0, 55.3], [53.55, 9.97],
    [31.2, 121.5], [-23.95, -46.3], [-6.1, 106.88], [13.7, 100.5],
    [37.8, -122.4], [48.4, -4.5], [41.0, 28.98], [25.77, -80.18],
    [35.1, 129.04], [19.07, 72.87], [-36.84, 174.76], [1.15, 104.0],
    [33.75, -118.25], [51.95, 1.32], [22.61, 120.29], [24.83, 66.97]
  ];

  let almanacModPromise = null;
  let owPortsExpandPromise = null;

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatOwTime(iso, opts) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return String(iso || "");
      return d.toLocaleString(undefined, opts || {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return String(iso || "");
    }
  }

  function formatSpeed(speed) {
    const n = Number(speed);
    if (!Number.isFinite(n)) return "—";
    const abs = Math.abs(n);
    if (abs < 0.05) return "0.0 kn";
    return abs.toFixed(1) + " kn";
  }

  function kindLabel(kind) {
    const k = String(kind || "").toLowerCase();
    if (k === "maxflood") return "Max flood";
    if (k === "maxebb") return "Max ebb";
    if (k === "slack") return "Slack";
    return kind || "Event";
  }

  function skyKindLabel(kind) {
    const k = String(kind || "");
    const map = {
      rise: "Sunrise",
      set: "Sunset",
      transit: "Solar noon",
      civilDawn: "Civil dawn",
      civilDusk: "Civil dusk",
      nauticalDawn: "Nautical dawn",
      nauticalDusk: "Nautical dusk",
      astronomicalDawn: "Astronomical dawn",
      astronomicalDusk: "Astronomical dusk"
    };
    return map[k] || k;
  }

  function isoDayStart(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function toIsoZ(d) {
    return new Date(d).toISOString();
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toR = (d) => (d * Math.PI) / 180;
    const dLat = toR(lat2 - lat1);
    const dLon = toR(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function portLatLon(port) {
    const coords = (port && (port.approachCoords || port.coords)) || [];
    return { lat: Number(coords[0]), lon: Number(coords[1]) };
  }

  function emptyInfo(msg) {
    return (
      '<div class="ss-port-empty">' +
      '<span class="ss-port-empty-ico" aria-hidden="true">◌</span>' +
      "<p>" + escHtml(msg || "No information found for this port.") + "</p>" +
      "</div>"
    );
  }

  function renderTidesTableHtml(data, meta) {
    const extremes = (data && (data.extremes || data.events)) || [];
    if (!extremes.length) {
      return emptyInfo("Tide information for this port was not found in Open Waters.");
    }
    const station = (data && data.station && data.station.name) || (meta && meta.station) || "";
    const datum = (data && data.datum) || "";
    const rows = extremes.map((e) => {
      const label = e.label || (e.high ? "High" : e.low ? "Low" : "—");
      const level = Number.isFinite(Number(e.level)) ? Number(e.level).toFixed(2) : "—";
      const cls = e.high || /high/i.test(label) ? "hi" : "lo";
      return (
        "<tr class=\"" + cls + "\"><td>" + escHtml(label) + "</td><td>" +
        escHtml(formatOwTime(e.time)) + "</td><td>" + escHtml(level) + " m</td></tr>"
      );
    }).join("");
    return (
      '<div class="ss-port-meta">' +
      (station ? "<span>Station · " + escHtml(station) + "</span>" : "") +
      (datum ? "<span>Datum · " + escHtml(datum) + "</span>" : "") +
      '<span>Source · Open Waters</span></div>' +
      '<div class="ss-port-table-wrap"><table class="ss-port-table"><thead><tr><th>Tide</th><th>Time</th><th>Height</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>"
    );
  }

  function renderCurrentsTableHtml(data) {
    const events = (data && data.events) || [];
    if (!events.length) {
      return emptyInfo("Current information for this port was not found in Open Waters.");
    }
    const station = (data && data.station && data.station.name) || "";
    const rows = events.map((e) => {
      const dir = Number.isFinite(Number(e.direction)) ? Math.round(Number(e.direction)) + "°" : "—";
      return (
        "<tr><td>" + escHtml(kindLabel(e.kind)) + "</td><td>" +
        escHtml(formatOwTime(e.time)) + "</td><td>" + escHtml(formatSpeed(e.speed)) +
        "</td><td>" + escHtml(dir) + "</td></tr>"
      );
    }).join("");
    return (
      '<div class="ss-port-meta">' +
      (station ? "<span>Station · " + escHtml(station) + "</span>" : "") +
      '<span>Source · Open Waters</span></div>' +
      '<div class="ss-port-table-wrap"><table class="ss-port-table"><thead><tr><th>Event</th><th>Time</th><th>Speed</th><th>Dir</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>"
    );
  }

  function renderSkyHtml(events, dayLabel) {
    if (!events || !events.length) {
      return emptyInfo("Sky information for this port was not found (Open Waters Almanac).");
    }
    const order = [
      "astronomicalDawn", "nauticalDawn", "civilDawn", "rise", "transit",
      "set", "civilDusk", "nauticalDusk", "astronomicalDusk"
    ];
    const sorted = events.slice().sort((a, b) => {
      const ia = order.indexOf(a.kind);
      const ib = order.indexOf(b.kind);
      if (ia >= 0 && ib >= 0) return ia - ib;
      return new Date(a.time) - new Date(b.time);
    });
    const rows = sorted.map((e) => {
      const accent = e.kind === "rise" ? "sun-up" : e.kind === "set" ? "sun-down" : "";
      return (
        '<div class="ss-sky-row ' + accent + '"><span class="ss-sky-kind">' +
        escHtml(skyKindLabel(e.kind)) + '</span><span class="ss-sky-time">' +
        escHtml(formatOwTime(e.time, { hour: "2-digit", minute: "2-digit" })) +
        "</span></div>"
      );
    }).join("");
    return (
      '<div class="ss-port-meta"><span>' + escHtml(dayLabel || "Selected day") +
      "</span><span>Source · Open Waters Almanac</span></div>" +
      '<div class="ss-sky-list">' + rows + "</div>"
    );
  }

  function loadAlmanac() {
    if (!almanacModPromise) {
      almanacModPromise = import(ALMANAC_ESM).catch((err) => {
        almanacModPromise = null;
        throw err;
      });
    }
    return almanacModPromise;
  }

  function buildPortCardHtml(port) {
    const id = String((port && port.id) || "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const { lat, lon } = portLatLon(port);
    if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) return "";
    const cc = String((port && port.countryCode) || "un").toLowerCase();
    const name = escHtml((port && port.name) || "Port");
    const unlocode = escHtml((port && port.unlocode) || (port && port.owStationId ? "OW" : ""));
    const country = escHtml((port && port.country) || "");
    const region = escHtml((port && port.region) || "");
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const weekEnd = new Date(today.getTime() + 6 * 86400000).toISOString().slice(0, 10);

    return (
      '<div class="ss-port-card" data-port-id="' + id + '" data-lat="' + lat + '" data-lon="' + lon + '">' +
      '<div class="ss-port-head">' +
      '<div class="ss-port-title">' +
      '<span class="port-flag-box ss-port-flag"><img src="assets/flags/' + cc + '.png" onerror="this.onerror=null;this.src=\'https://flagcdn.com/w40/' + cc + '.png\';" alt="" class="port-flag-img"></span>' +
      "<div><h4>" + name + "</h4>" +
      '<div class="ss-port-sub">' +
      (unlocode ? '<span class="ss-port-chip">' + unlocode + "</span>" : "") +
      (country ? "<span>" + country + "</span>" : "") +
      (region ? "<span>" + region + "</span>" : "") +
      "</div></div></div>" +
      '<div class="ss-port-coords">' + lat.toFixed(3) + "°, " + lon.toFixed(3) + "°</div>" +
      "</div>" +
      '<div class="ss-port-tabs" role="tablist">' +
      '<button type="button" class="ss-port-tab is-active" data-tab="tides" role="tab" aria-selected="true" onclick="window.ssPortCardTab(this)">' +
      '<span class="ss-tab-ico" aria-hidden="true">≋</span> Tides</button>' +
      '<button type="button" class="ss-port-tab" data-tab="currents" role="tab" aria-selected="false" onclick="window.ssPortCardTab(this)">' +
      '<span class="ss-tab-ico" aria-hidden="true">↝</span> Currents</button>' +
      '<button type="button" class="ss-port-tab" data-tab="sky" role="tab" aria-selected="false" onclick="window.ssPortCardTab(this)">' +
      '<span class="ss-tab-ico" aria-hidden="true">☀</span> Sky</button>' +
      "</div>" +
      '<div class="ss-port-body">' +
      '<div class="ss-port-panel is-active" data-panel="tides">' +
      '<div class="ss-port-toolbar">' +
      '<label>From <input type="date" class="ss-port-date" data-role="tide-from" value="' + todayStr + '"></label>' +
      '<label>To <input type="date" class="ss-port-date" data-role="tide-to" value="' + weekEnd + '"></label>' +
      '<button type="button" class="ss-port-btn" onclick="window.ssPortCardLoad(this,\'tides\')">Show</button>' +
      '<button type="button" class="ss-port-btn ss-port-btn-ghost" onclick="window.ssPortCardPrint(this,\'tides\')">Print</button>' +
      "</div>" +
      '<div class="ss-port-content" data-role="tide-out"><div class="ss-port-loading">Loading tides…</div></div>' +
      "</div>" +
      '<div class="ss-port-panel" data-panel="currents">' +
      '<div class="ss-port-toolbar">' +
      '<label>From <input type="date" class="ss-port-date" data-role="cur-from" value="' + todayStr + '"></label>' +
      '<label>To <input type="date" class="ss-port-date" data-role="cur-to" value="' + weekEnd + '"></label>' +
      '<button type="button" class="ss-port-btn" onclick="window.ssPortCardLoad(this,\'currents\')">Show</button>' +
      "</div>" +
      '<div class="ss-port-content" data-role="cur-out"><div class="ss-port-loading">Open the Currents tab to load…</div></div>' +
      "</div>" +
      '<div class="ss-port-panel" data-panel="sky">' +
      '<div class="ss-port-toolbar">' +
      '<label>Date <input type="date" class="ss-port-date" data-role="sky-date" value="' + todayStr + '"></label>' +
      '<button type="button" class="ss-port-btn" onclick="window.ssPortCardLoad(this,\'sky\')">Show</button>' +
      "</div>" +
      '<div class="ss-port-content" data-role="sky-out"><div class="ss-port-loading">Open the Sky tab to load…</div></div>' +
      "</div>" +
      "</div>" +
      '<div class="ss-port-foot">Hydro &amp; sky via <a href="https://openwaters.io" target="_blank" rel="noopener">Open Waters</a></div>' +
      "</div>"
    );
  }

  // Back-compat alias used by older popup builders
  function buildPortHydroControlsHtml(port) {
    return buildPortCardHtml(port);
  }

  function cardRootFromEl(el) {
    return el && el.closest ? el.closest(".ss-port-card") : null;
  }

  function ssPortCardTab(btn) {
    const card = cardRootFromEl(btn);
    if (!card || !btn) return;
    const tab = btn.getAttribute("data-tab");
    card.querySelectorAll(".ss-port-tab").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    card.querySelectorAll(".ss-port-panel").forEach((p) => {
      p.classList.toggle("is-active", p.getAttribute("data-panel") === tab);
    });
    if (tab === "tides" || tab === "currents" || tab === "sky") {
      ssPortCardLoad(btn, tab);
    }
  }

  async function ssPortCardLoad(el, kind) {
    const card = cardRootFromEl(el);
    if (!card) return;
    const lat = Number(card.getAttribute("data-lat"));
    const lon = Number(card.getAttribute("data-lon"));
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    if (kind === "tides") {
      const out = card.querySelector('[data-role="tide-out"]');
      const fromEl = card.querySelector('[data-role="tide-from"]');
      const toEl = card.querySelector('[data-role="tide-to"]');
      if (!out) return;
      out.innerHTML = '<div class="ss-port-loading">Loading tides…</div>';
      try {
        const start = isoDayStart(fromEl && fromEl.value ? fromEl.value : new Date());
        const endRaw = toEl && toEl.value ? toEl.value : start;
        const end = new Date(isoDayStart(endRaw).getTime() + 86400000);
        const url =
          TIDES_EXTREMES +
          "?latitude=" + encodeURIComponent(lat) +
          "&longitude=" + encodeURIComponent(lon) +
          "&start=" + encodeURIComponent(toIsoZ(start)) +
          "&end=" + encodeURIComponent(toIsoZ(end));
        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        out.innerHTML = renderTidesTableHtml(data);
      } catch (err) {
        out.innerHTML = emptyInfo("Tide information for this port was not found in Open Waters.");
      }
      return;
    }

    if (kind === "currents") {
      const out = card.querySelector('[data-role="cur-out"]');
      const fromEl = card.querySelector('[data-role="cur-from"]');
      const toEl = card.querySelector('[data-role="cur-to"]');
      if (!out) return;
      out.innerHTML = '<div class="ss-port-loading">Loading currents…</div>';
      try {
        const start = isoDayStart(fromEl && fromEl.value ? fromEl.value : new Date());
        const endRaw = toEl && toEl.value ? toEl.value : start;
        const end = new Date(isoDayStart(endRaw).getTime() + 86400000);
        const url =
          CURRENTS_EVENTS +
          "?latitude=" + encodeURIComponent(lat) +
          "&longitude=" + encodeURIComponent(lon) +
          "&start=" + encodeURIComponent(toIsoZ(start)) +
          "&end=" + encodeURIComponent(toIsoZ(end));
        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        out.innerHTML = renderCurrentsTableHtml(data);
      } catch (err) {
        out.innerHTML = emptyInfo("Current information for this port was not found in Open Waters.");
      }
      return;
    }

    if (kind === "sky") {
      const out = card.querySelector('[data-role="sky-out"]');
      const dateEl = card.querySelector('[data-role="sky-date"]');
      if (!out) return;
      out.innerHTML = '<div class="ss-port-loading">Computing sky…</div>';
      try {
        const mod = await loadAlmanac();
        const sunEvents = mod && (mod.sunEvents || (mod.default && mod.default.sunEvents));
        if (typeof sunEvents !== "function") throw new Error("sunEvents missing");
        const day = isoDayStart(dateEl && dateEl.value ? dateEl.value : new Date());
        const next = new Date(day.getTime() + 86400000);
        const observer = { latitudeDeg: lat, longitudeDeg: lon };
        const events = sunEvents(day, next, observer) || [];
        const dayLabel = day.toLocaleDateString(undefined, {
          weekday: "short", year: "numeric", month: "short", day: "numeric"
        });
        out.innerHTML = renderSkyHtml(events, dayLabel);
      } catch (err) {
        out.innerHTML = emptyInfo("Sky information for this port was not found (Open Waters Almanac).");
      }
    }
  }

  function ssPortCardPrint(el, kind) {
    const card = cardRootFromEl(el);
    if (!card) return;
    const panel = card.querySelector('.ss-port-panel[data-panel="' + (kind || "tides") + '"] .ss-port-content');
    const title = (card.querySelector(".ss-port-title h4") || {}).textContent || "Port";
    if (!panel) return;
    const w = global.open("", "_blank", "noopener,noreferrer,width=720,height=900");
    if (!w) return;
    w.document.write(
      "<!DOCTYPE html><html><head><title>" + escHtml(title) + " — Tides</title>" +
      "<style>body{font:14px/1.45 system-ui,sans-serif;color:#0f172a;padding:24px}" +
      "h1{font-size:18px;margin:0 0 8px}table{width:100%;border-collapse:collapse}" +
      "th,td{border-bottom:1px solid #cbd5e1;padding:6px 8px;text-align:left;font-size:13px}" +
      "th{color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:.04em}" +
      ".meta{color:#64748b;font-size:12px;margin-bottom:12px;display:flex;gap:12px;flex-wrap:wrap}" +
      "@media print{body{padding:0}}</style></head><body>" +
      "<h1>" + escHtml(title) + " — Tide table</h1>" +
      panel.innerHTML +
      "<script>window.onload=function(){window.print();}<\/script></body></html>"
    );
    w.document.close();
  }

  function stationToPort(st) {
    const lat = Number(st.latitude);
    const lon = Number(st.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    const rawId = String(st.id || "").replace(/[^a-zA-Z0-9_-]/g, "_");
    if (!rawId) return null;
    const cc = String(st.country_code || "").slice(0, 2).toUpperCase() || "UN";
    return {
      id: "ow-" + rawId.slice(0, 48),
      name: st.name || "Tide station",
      country: st.country || "",
      countryCode: cc,
      region: st.region || st.locality || "",
      unlocode: "",
      coords: [lat, lon],
      approachCoords: [lat, lon],
      owStationId: st.id,
      source: "openwaters",
      fairways: [],
      timezone: st.timezone || ""
    };
  }

  function nearExistingPort(lat, lon, db, maxKm) {
    for (let i = 0; i < db.length; i++) {
      const p = db[i];
      const c = portLatLon(p);
      if (!Number.isFinite(c.lat) || !Number.isFinite(c.lon)) continue;
      if (haversineKm(lat, lon, c.lat, c.lon) <= maxKm) return true;
    }
    return false;
  }

  async function expandPortsFromOpenWaters(opts) {
    if (owPortsExpandPromise) return owPortsExpandPromise;
    owPortsExpandPromise = (async () => {
      const db = global.PORT_DEPTHS_DB;
      if (!db || !Array.isArray(db)) return { added: 0 };
      const maxPerHub = (opts && opts.maxPerHub) || 8;
      const minSepKm = (opts && opts.minSepKm) || 35;
      const added = [];
      const seenIds = new Set(db.map((p) => p.id));

      await Promise.all(
        OW_PORT_HUBS.map(async ([lat, lon]) => {
          try {
            const url =
              TIDES_STATIONS +
              "?latitude=" + encodeURIComponent(lat) +
              "&longitude=" + encodeURIComponent(lon) +
              "&maxDistance=900&maxResults=" + encodeURIComponent(maxPerHub);
            const res = await fetch(url, { credentials: "omit" });
            if (!res.ok) return;
            const list = await res.json();
            if (!Array.isArray(list)) return;
            for (let i = 0; i < list.length; i++) {
              const port = stationToPort(list[i]);
              if (!port || seenIds.has(port.id)) continue;
              if (nearExistingPort(port.coords[0], port.coords[1], db.concat(added), minSepKm)) continue;
              seenIds.add(port.id);
              added.push(port);
            }
          } catch (e) {}
        })
      );

      added.forEach((p) => db.push(p));
      return { added: added.length };
    })().catch((err) => {
      owPortsExpandPromise = null;
      throw err;
    });
    return owPortsExpandPromise;
  }

  // Auto-load tides when a port popup opens
  if (typeof document !== "undefined") {
    document.addEventListener(
      "click",
      (ev) => {
        const tab = ev.target && ev.target.closest && ev.target.closest(".ss-port-tab");
        if (tab && !tab.getAttribute("onclick")) ssPortCardTab(tab);
      },
      true
    );
  }

  global.ensureOpenWatersMapLibre = ensureMapLibreReady;
  global.createOpenWatersBathymetryLayer = createBathymetryLayer;
  global.wireOpenWatersGlLayerResize = wireGlLayerResize;
  global.waitForOpenWatersGlStyle = waitForGlStyle;
  global.flashOpenWatersLayerStatus = flashOwStatus;
  global.buildPortOwHydroControlsHtml = buildPortHydroControlsHtml;
  global.buildPortCardHtml = buildPortCardHtml;
  global.ssPortCardTab = ssPortCardTab;
  global.ssPortCardLoad = ssPortCardLoad;
  global.ssPortCardPrint = ssPortCardPrint;
  global.expandPortsFromOpenWaters = expandPortsFromOpenWaters;
  // Legacy no-op so old onclick handlers don't throw
  global.togglePortOwHydro = function () {};
})(typeof window !== "undefined" ? window : globalThis);
