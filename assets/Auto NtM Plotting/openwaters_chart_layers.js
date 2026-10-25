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
      css: "assets/Auto%20NtM%20Plotting/maplibre-gl.css?v=5.51",
      js: "assets/Auto%20NtM%20Plotting/maplibre-gl.js?v=5.51"
    }
  ];
  // Open Waters seascape tiles are 512px; Leaflet basemap tiles are 256px → MapLibre zoom = Leaflet zoom − 1
  const GL_ZOOM_OFFSET = 1;

  // ECDIS-like depth bands: deep/mid blues, pale green for shoals / very shallow (< ~10 m).
  // Elevation is negative underwater (terrarium DEM). Land (≥0) stays transparent.
  // Shoal threshold: depth_abs < 10 m → pale ECDIS green (#c5dfb8 family).
  const BATHY_COLOR_RELIEF = [
    "interpolate",
    ["linear"],
    ["elevation"],
    -10000, "#e8f4fc",
    -50.01, "#e8f4fc",
    -50, "#93c5fd",
    -20.01, "#93c5fd",
    -20, "#38bdf8",
    -10.01, "#38bdf8",
    -10, "#b9d6a8",
    -5.01, "#b9d6a8",
    -5, "#c8e0b6",
    -2.01, "#c8e0b6",
    -2, "#d5e9c6",
    -0.01, "#d5e9c6",
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
        // Overlay on the map container (NOT a CSS-transformed tile pane) so we fully own alignment.
        // Continuous jumpTo on move/zoom keeps Bathymetry locked to the basemap.
        if (!map.getPane("owBathyPane")) {
          const pane = map.createPane("owBathyPane");
          pane.style.zIndex = 350;
          pane.style.pointerEvents = "none";
        }
        const root = (this._container = L.DomUtil.create("div", "setsail-ow-gl-root leaflet-zoom-hide"));
        root.style.cssText =
          "position:absolute;left:0;top:0;width:100%;height:100%;" +
          "pointer-events:none;overflow:hidden;background:transparent;transform-origin:0 0;";
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
          trackResize: false,
          antialias: false,
          refreshExpiredTiles: true,
          maxTileCacheSize: lowEnd ? 64 : 160,
          pixelRatio: lowEnd ? Math.min(1, dpr) : Math.min(1.25, dpr)
        });

        this._syncRaf = 0;
        this._lastSyncKey = "";
        this._boundSchedule = this._scheduleSync.bind(this);
        this._boundResize = this._resizeGl.bind(this);
        this._boundZoomAnim = this._handleZoomAnim.bind(this);

        // Continuous sync — prevents bathymetry "swim" during pan/zoom
        map.on("move", this._boundSchedule);
        map.on("moveend", this._boundSchedule);
        map.on("zoom", this._boundSchedule);
        map.on("zoomend", this._boundSchedule);
        map.on("zoomanim", this._boundZoomAnim);
        map.on("resize", this._boundResize);
        map.on("viewreset", this._boundSchedule);

        this._glMap.on("load", () => {
          this._resizeGl();
          this._syncView(true);
          this._applyProgressiveDetail(map.getZoom());
        });
        this._glMap.on("error", (e) => {
          const msg = (e && e.error && e.error.message) || (e && e.message) || "tile/style error";
          console.warn("[SetSail] MapLibre error:", msg, e);
        });

        if (map.attributionControl && this.options.attribution) {
          map.attributionControl.addAttribution(this.options.attribution);
        }

        setTimeout(() => this._resizeGl(), 40);
        setTimeout(() => this._resizeGl(), 250);
      },

      onRemove: function (map) {
        map.off("move", this._boundSchedule);
        map.off("moveend", this._boundSchedule);
        map.off("zoom", this._boundSchedule);
        map.off("zoomend", this._boundSchedule);
        map.off("zoomanim", this._boundZoomAnim);
        map.off("resize", this._boundResize);
        map.off("viewreset", this._boundSchedule);
        if (this._syncRaf) {
          try { cancelAnimationFrame(this._syncRaf); } catch (e) {}
          this._syncRaf = 0;
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

      _glZoomFromLeaflet: function (leafletZoom) {
        const z = Number.isFinite(leafletZoom) ? leafletZoom : this._map.getZoom();
        return Math.max(0, z - GL_ZOOM_OFFSET);
      },

      _scheduleSync: function () {
        if (this._syncRaf) return;
        this._syncRaf = requestAnimationFrame(() => {
          this._syncRaf = 0;
          this._syncView(false);
          if (this._map) this._applyProgressiveDetail(this._map.getZoom());
        });
      },

      _handleZoomAnim: function (e) {
        // Keep MapLibre locked during Leaflet CSS zoom animation
        if (!this._glMap || !this._map || !e) return;
        try {
          const center = e.center || this._map.getCenter();
          const z = this._glZoomFromLeaflet(e.zoom);
          this._glMap.jumpTo({
            center: [center.lng, center.lat],
            zoom: z,
            bearing: 0,
            pitch: 0
          });
          this._lastSyncKey =
            center.lng.toFixed(5) + "," + center.lat.toFixed(5) + "," + z.toFixed(3);
        } catch (err) {}
      },

      _syncView: function (force) {
        if (!this._glMap || !this._map) return;
        try {
          // Pin GL container to the visible map viewport (cancels any pane CSS transform drift)
          const topLeft = this._map.containerPointToLayerPoint([0, 0]);
          L.DomUtil.setPosition(this._container, topLeft);

          const c = this._map.getCenter();
          const z = this._glZoomFromLeaflet(this._map.getZoom());
          const key = c.lng.toFixed(5) + "," + c.lat.toFixed(5) + "," + z.toFixed(3);
          if (!force && key === this._lastSyncKey) return;
          this._lastSyncKey = key;
          this._glMap.jumpTo({
            center: [c.lng, c.lat],
            zoom: z,
            bearing: 0,
            pitch: 0
          });
        } catch (e) {}
      },

      /** Progressive bathymetry detail: tint first, contours/labels/soundings as zoom rises. */
      _applyProgressiveDetail: function (leafletZoom) {
        if (!this._glMap || !this._glMap.getLayer) return;
        const z = Number(leafletZoom) || 0;
        const setVis = (id, vis) => {
          try {
            if (this._glMap.getLayer(id)) {
              this._glMap.setLayoutProperty(id, "visibility", vis ? "visible" : "none");
            }
          } catch (e) {}
        };
        // Always show color relief; unlock detail with zoom (faster tile budget at low z)
        setVis("ow-bathy-color-relief", true);
        setVis("ow-bathy-contours", z >= 5);
        setVis("ow-bathy-contour-labels", z >= 7);
        setVis("ow-bathy-soundings", z >= 10);
        try {
          if (this._glMap.getLayer("ow-bathy-color-relief")) {
            this._glMap.setPaintProperty(
              "ow-bathy-color-relief",
              "color-relief-opacity",
              z < 4 ? 0.55 : z < 7 ? 0.68 : 0.78
            );
          }
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
          minzoom: 5,
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
          minzoom: 7,
          layout: {
            "symbol-placement": "line",
            "symbol-spacing": 220,
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
          minzoom: 10,
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
    [33.75, -118.25], [51.95, 1.32], [22.61, 120.29], [24.83, 66.97],
    [51.95, 4.14], [29.73, -95.12], [6.94, 79.84], [-20.31, 118.58],
    [36.14, -5.43], [18.95, 72.95], [36.07, 120.32], [-33.85, 18.43]
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

  /** Always English nautical formatting; optional IANA tz or lon-based local offset. */
  function formatOwTime(iso, opts, tzCtx) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return String(iso || "");
      const base = Object.assign(
        { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false },
        opts || {}
      );
      const tz = resolvePortTimeZone(tzCtx);
      if (tz && tz.iana) {
        return d.toLocaleString("en-GB", Object.assign({}, base, { timeZone: tz.iana }));
      }
      if (tz && Number.isFinite(tz.offsetMin)) {
        const shifted = new Date(d.getTime() + tz.offsetMin * 60000);
        return shifted.toLocaleString("en-GB", Object.assign({}, base, { timeZone: "UTC" }));
      }
      return d.toLocaleString("en-GB", base);
    } catch (e) {
      return String(iso || "");
    }
  }

  function resolvePortTimeZone(tzCtx) {
    if (!tzCtx) return null;
    if (typeof tzCtx === "string" && tzCtx.trim()) return { iana: tzCtx.trim() };
    const iana = tzCtx.timezone || tzCtx.tz || "";
    if (iana) return { iana: String(iana) };
    const lon = Number(tzCtx.lon != null ? tzCtx.lon : tzCtx.longitude);
    if (Number.isFinite(lon)) {
      return { offsetMin: Math.round(lon / 15) * 60 };
    }
    return null;
  }

  function portDayStartUtc(dateStr, tzCtx) {
    const ymd = String(dateStr || "").slice(0, 10);
    const tz = resolvePortTimeZone(tzCtx);
    if (tz && tz.iana) {
      // Binary-search UTC instant of local midnight for ymd in IANA zone
      let lo = Date.parse(ymd + "T00:00:00Z") - 14 * 3600000;
      let hi = Date.parse(ymd + "T00:00:00Z") + 14 * 3600000;
      for (let i = 0; i < 40; i++) {
        const mid = Math.floor((lo + hi) / 2);
        const parts = new Intl.DateTimeFormat("en-CA", {
          timeZone: tz.iana,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).formatToParts(new Date(mid));
        const get = (t) => (parts.find((p) => p.type === t) || {}).value;
        const localYmd = get("year") + "-" + get("month") + "-" + get("day");
        const localMin = Number(get("hour")) * 60 + Number(get("minute"));
        if (localYmd < ymd || (localYmd === ymd && localMin > 0)) hi = mid;
        else if (localYmd > ymd) lo = mid;
        else if (localMin === 0) return new Date(mid);
        else hi = mid;
      }
      return new Date(lo);
    }
    const offsetMin = tz && Number.isFinite(tz.offsetMin) ? tz.offsetMin : 0;
    return new Date(Date.parse(ymd + "T00:00:00Z") - offsetMin * 60000);
  }

  function minutesOfDayInTz(date, tzCtx) {
    const tz = resolvePortTimeZone(tzCtx);
    if (tz && tz.iana) {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz.iana,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).formatToParts(date);
      const get = (t) => Number((parts.find((p) => p.type === t) || {}).value);
      return get("hour") * 60 + get("minute");
    }
    const offsetMin = tz && Number.isFinite(tz.offsetMin) ? tz.offsetMin : 0;
    const shifted = new Date(date.getTime() + offsetMin * 60000);
    return shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
  }

  function localYmdInTz(date, tzCtx) {
    const tz = resolvePortTimeZone(tzCtx);
    if (tz && tz.iana) {
      return new Intl.DateTimeFormat("en-CA", {
        timeZone: tz.iana,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(date);
    }
    const offsetMin = tz && Number.isFinite(tz.offsetMin) ? tz.offsetMin : 0;
    const shifted = new Date(date.getTime() + offsetMin * 60000);
    return shifted.toISOString().slice(0, 10);
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
      '<div class="ss-port-empty"><p>' +
      escHtml(msg || "No information found for this port.") +
      "</p></div>"
    );
  }

  function renderTidesTableHtml(data, tzCtx) {
    const extremes = (data && (data.extremes || data.events)) || [];
    if (!extremes.length) {
      return emptyInfo("Tide information for this port was not found in Open Waters.");
    }
    const station = (data && data.station && data.station.name) || "";
    const rows = extremes.map((e) => {
      const label = e.label || (e.high ? "High" : e.low ? "Low" : "—");
      const level = Number.isFinite(Number(e.level)) ? Number(e.level).toFixed(2) : "—";
      const cls = e.high || /high/i.test(label) ? "hi" : "lo";
      return (
        "<tr class=\"" + cls + "\"><td>" + escHtml(label) + "</td><td>" +
        escHtml(formatOwTime(e.time, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }, tzCtx)) +
        "</td><td>" + escHtml(level) + "</td></tr>"
      );
    }).join("");
    return (
      (station ? '<div class="ss-port-meta">' + escHtml(station) + " · local time</div>" : '<div class="ss-port-meta">Local time</div>') +
      '<div class="ss-port-table-wrap"><table class="ss-port-table"><thead><tr><th></th><th>Time</th><th>m</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>"
    );
  }

  function renderCurrentsTableHtml(data, tzCtx) {
    const events = (data && data.events) || [];
    if (!events.length) {
      return emptyInfo("Current information for this port was not found in Open Waters.");
    }
    const rows = events.map((e) => {
      const dir = Number.isFinite(Number(e.direction)) ? Math.round(Number(e.direction)) + "°" : "—";
      return (
        "<tr><td>" + escHtml(kindLabel(e.kind)) + "</td><td>" +
        escHtml(formatOwTime(e.time, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }, tzCtx)) +
        "</td><td>" + escHtml(formatSpeed(e.speed)) + " " + escHtml(dir) + "</td></tr>"
      );
    }).join("");
    return (
      '<div class="ss-port-table-wrap"><table class="ss-port-table"><thead><tr><th></th><th>Time</th><th></th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>"
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

  function almanacFn(mod, name) {
    if (!mod) return null;
    if (typeof mod[name] === "function") return mod[name];
    if (mod.default && typeof mod.default[name] === "function") return mod.default[name];
    return null;
  }

  function dateAtMinutes(dayStart, mins) {
    return new Date(dayStart.getTime() + Math.max(0, Math.min(1439, mins)) * 60000);
  }

  function formatSkyClock(d, tzCtx) {
    try {
      return formatOwTime(
        d,
        { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" },
        tzCtx
      ) + " LT";
    } catch (e) {
      return d.toISOString();
    }
  }

  /**
   * South-facing sky dome: continuous E–S–W projection (no hard az cuts = no scrub jumps).
   * Below horizon → hidden. Northern sky (behind viewer) → hidden at the limbs.
   */
  function skyStagePos(altDeg, azDeg) {
    let az = Number(azDeg);
    const alt = Number(altDeg);
    if (!Number.isFinite(az) || !Number.isFinite(alt)) return null;
    while (az < 0) az += 360;
    while (az >= 360) az -= 360;
    if (alt < -0.5) return { visible: false };
    const rad = ((az - 180) * Math.PI) / 180;
    if (Math.cos(rad) < -0.08) return { visible: false };
    const x = 50 + Math.sin(rad) * 46;
    const y = 10 + (1 - Math.min(alt, 90) / 90) * 68;
    return {
      visible: true,
      x: Math.max(3, Math.min(97, x)),
      y: Math.max(6, Math.min(82, y))
    };
  }

  function skyGradientForAlt(alt) {
    if (alt > 12) return "linear-gradient(180deg,#1d4ed8 0%,#38bdf8 55%,#bae6fd 100%)";
    if (alt > 0) return "linear-gradient(180deg,#1e3a8a 0%,#7c3aed 40%,#fb923c 78%,#fecaca 100%)";
    if (alt > -6) return "linear-gradient(180deg,#0f172a 0%,#312e81 45%,#9a3412 100%)";
    return "linear-gradient(180deg,#020617 0%,#0f172a 60%,#1e293b 100%)";
  }

  const PRINT_ICON_SVG =
    '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>' +
    '<rect x="6" y="14" width="12" height="8"/></svg>';

  /* Simple rise/set marks: sun disc + horizon + arrow */
  const SUN_UP_SVG =
    '<svg class="ss-sky-ev-ico" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">' +
    '<circle cx="10" cy="11" r="3.2" fill="currentColor"/>' +
    '<path d="M3 15h14" stroke="currentColor" stroke-width="1.6" fill="none"/>' +
    '<path d="M10 3v5M7.5 5.5L10 3l2.5 2.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  const SUN_DOWN_SVG =
    '<svg class="ss-sky-ev-ico" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">' +
    '<circle cx="10" cy="9" r="3.2" fill="currentColor"/>' +
    '<path d="M3 15h14" stroke="currentColor" stroke-width="1.6" fill="none"/>' +
    '<path d="M10 17v-5M7.5 14.5L10 17l2.5-2.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  function buildPortCardHtml(port) {
    const id = String((port && port.id) || "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const { lat, lon } = portLatLon(port);
    if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) return "";
    const cc = String((port && port.countryCode) || "un").toLowerCase();
    const name = escHtml((port && port.name) || "Port");
    const unlocode = escHtml((port && port.unlocode) || (port && port.owStationId ? "OW" : ""));
    const tz = escHtml((port && (port.timezone || port.tz)) || "");
    const tzCtx = { timezone: (port && (port.timezone || port.tz)) || "", lon: lon };
    const todayStr = localYmdInTz(new Date(), tzCtx);
    const weekEnd = localYmdInTz(new Date(Date.now() + 6 * 86400000), tzCtx);

    return (
      '<div class="ss-port-card" data-port-id="' + id + '" data-lat="' + lat + '" data-lon="' + lon +
      '" data-tz="' + tz + '">' +
      '<div class="ss-port-head">' +
      '<span class="port-flag-box ss-port-flag"><img src="assets/flags/' + cc + '.png" onerror="this.onerror=null;this.src=\'https://flagcdn.com/w40/' + cc + '.png\';" alt="" class="port-flag-img"></span>' +
      '<h4 class="ss-port-name">' + name + "</h4>" +
      (unlocode ? '<span class="ss-port-chip">' + unlocode + "</span>" : "") +
      "</div>" +
      '<div class="ss-port-tabs ss-port-tabs-mini" role="tablist">' +
      '<button type="button" class="ss-port-tab is-active" data-tab="tides" role="tab" aria-selected="true" onclick="window.ssPortCardTab(this)">Tides</button>' +
      '<button type="button" class="ss-port-tab" data-tab="currents" role="tab" aria-selected="false" onclick="window.ssPortCardTab(this)">Currents</button>' +
      '<button type="button" class="ss-port-tab" data-tab="sky" role="tab" aria-selected="false" onclick="window.ssPortCardTab(this)">Sky</button>' +
      "</div>" +
      '<div class="ss-port-body">' +
      '<div class="ss-port-panel is-active" data-panel="tides">' +
      '<div class="ss-port-toolbar">' +
      '<input type="date" class="ss-port-date" data-role="tide-from" value="' + todayStr + '" title="From" onchange="window.ssPortCardLoad(this,\'tides\')">' +
      '<span class="ss-port-dash">–</span>' +
      '<input type="date" class="ss-port-date" data-role="tide-to" value="' + weekEnd + '" title="To" onchange="window.ssPortCardLoad(this,\'tides\')">' +
      '<button type="button" class="ss-port-icon-btn" title="Print tide table" onclick="window.ssPortCardPrint(this,\'tides\')">' +
      PRINT_ICON_SVG + "</button>" +
      "</div>" +
      '<div class="ss-port-content" data-role="tide-out"><div class="ss-port-loading">…</div></div>' +
      "</div>" +
      '<div class="ss-port-panel" data-panel="currents">' +
      '<div class="ss-port-toolbar">' +
      '<input type="date" class="ss-port-date" data-role="cur-from" value="' + todayStr + '" title="From" onchange="window.ssPortCardLoad(this,\'currents\')">' +
      '<span class="ss-port-dash">–</span>' +
      '<input type="date" class="ss-port-date" data-role="cur-to" value="' + weekEnd + '" title="To" onchange="window.ssPortCardLoad(this,\'currents\')">' +
      "</div>" +
      '<div class="ss-port-content" data-role="cur-out"><div class="ss-port-loading">…</div></div>' +
      "</div>" +
      '<div class="ss-port-panel" data-panel="sky">' +
      '<div class="ss-sky-widget" data-role="sky-widget">' +
      '<div class="ss-sky-topbar">' +
      '<input type="date" class="ss-port-date" data-role="sky-date" value="' + todayStr + '" onchange="window.ssSkyOnDateChange(this)">' +
      '<span class="ss-sky-caption">Sun &amp; Moon · local</span>' +
      "</div>" +
      '<div class="ss-sky-stage" data-role="sky-stage">' +
      '<div class="ss-sky-grad" data-role="sky-grad"></div>' +
      '<div class="ss-sky-body ss-sun" data-role="sky-sun" hidden></div>' +
      '<div class="ss-sky-body ss-moon" data-role="sky-moon" hidden></div>' +
      '<div class="ss-sky-horizon"><span>E</span><span>S</span><span>W</span></div>' +
      "</div>" +
      '<div class="ss-sky-controls">' +
      '<div class="ss-sky-play">' +
      '<button type="button" class="ss-sky-step" onclick="window.ssSkyStep(this,-30)" aria-label="Back">‹</button>' +
      '<button type="button" class="ss-sky-now" onclick="window.ssSkyNow(this)">Now</button>' +
      '<button type="button" class="ss-sky-step" onclick="window.ssSkyStep(this,30)" aria-label="Forward">›</button>' +
      "</div>" +
      '<div class="ss-sky-clock" data-role="sky-clock">—</div>' +
      "</div>" +
      '<input type="range" class="ss-sky-slider" data-role="sky-slider" min="0" max="1439" value="0" ' +
      'oninput="window.ssSkyScrub(this)" ontouchstart="event.stopPropagation()" onmousedown="event.stopPropagation()">' +
      '<div class="ss-sky-events" data-role="sky-events"></div>' +
      "</div>" +
      "</div>" +
      "</div></div>"
    );
  }

  function buildPortHydroControlsHtml(port) {
    return buildPortCardHtml(port);
  }

  function cardRootFromEl(el) {
    return el && el.closest ? el.closest(".ss-port-card") : null;
  }

  function wirePortCardInteractions(card) {
    if (!card || card._ssWired) return;
    card._ssWired = true;
    try {
      if (typeof L !== "undefined" && L.DomEvent) {
        L.DomEvent.disableClickPropagation(card);
        L.DomEvent.disableScrollPropagation(card);
      }
    } catch (e) {}
  }

  function ssPortCardTab(btn) {
    const card = cardRootFromEl(btn);
    if (!card || !btn) return;
    wirePortCardInteractions(card);
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

  function cardTzCtx(card) {
    return {
      timezone: (card && card.getAttribute("data-tz")) || "",
      lon: Number(card && card.getAttribute("data-lon"))
    };
  }

  async function ssPortCardLoad(el, kind) {
    const card = cardRootFromEl(el);
    if (!card) return;
    wirePortCardInteractions(card);
    const lat = Number(card.getAttribute("data-lat"));
    const lon = Number(card.getAttribute("data-lon"));
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const tzCtx = cardTzCtx(card);

    if (kind === "tides") {
      const out = card.querySelector('[data-role="tide-out"]');
      const fromEl = card.querySelector('[data-role="tide-from"]');
      const toEl = card.querySelector('[data-role="tide-to"]');
      if (!out) return;
      if (out.dataset.loading === "1") return;
      out.dataset.loading = "1";
      out.innerHTML = '<div class="ss-port-loading">Loading…</div>';
      try {
        const fromYmd = (fromEl && fromEl.value) || localYmdInTz(new Date(), tzCtx);
        const toYmd = (toEl && toEl.value) || fromYmd;
        const start = portDayStartUtc(fromYmd, tzCtx);
        const end = new Date(portDayStartUtc(toYmd, tzCtx).getTime() + 86400000);
        const url =
          TIDES_EXTREMES +
          "?latitude=" + encodeURIComponent(lat) +
          "&longitude=" + encodeURIComponent(lon) +
          "&start=" + encodeURIComponent(toIsoZ(start)) +
          "&end=" + encodeURIComponent(toIsoZ(end));
        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        out.innerHTML = renderTidesTableHtml(data, tzCtx);
      } catch (err) {
        out.innerHTML = emptyInfo("Tide information for this port was not found in Open Waters.");
      }
      out.dataset.loading = "0";
      return;
    }

    if (kind === "currents") {
      const out = card.querySelector('[data-role="cur-out"]');
      const fromEl = card.querySelector('[data-role="cur-from"]');
      const toEl = card.querySelector('[data-role="cur-to"]');
      if (!out) return;
      if (out.dataset.loading === "1") return;
      out.dataset.loading = "1";
      out.innerHTML = '<div class="ss-port-loading">Loading…</div>';
      try {
        const fromYmd = (fromEl && fromEl.value) || localYmdInTz(new Date(), tzCtx);
        const toYmd = (toEl && toEl.value) || fromYmd;
        const start = portDayStartUtc(fromYmd, tzCtx);
        const end = new Date(portDayStartUtc(toYmd, tzCtx).getTime() + 86400000);
        const url =
          CURRENTS_EVENTS +
          "?latitude=" + encodeURIComponent(lat) +
          "&longitude=" + encodeURIComponent(lon) +
          "&start=" + encodeURIComponent(toIsoZ(start)) +
          "&end=" + encodeURIComponent(toIsoZ(end));
        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        out.innerHTML = renderCurrentsTableHtml(data, tzCtx);
      } catch (err) {
        out.innerHTML = emptyInfo("Current information for this port was not found in Open Waters.");
      }
      out.dataset.loading = "0";
      return;
    }

    if (kind === "sky") {
      await initSkyWidget(card);
    }
  }

  async function initSkyWidget(card) {
    const widget = card.querySelector('[data-role="sky-widget"]');
    const eventsEl = card.querySelector('[data-role="sky-events"]');
    if (!widget) return;
    const lat = Number(card.getAttribute("data-lat"));
    const lon = Number(card.getAttribute("data-lon"));
    const tzCtx = cardTzCtx(card);
    const dateEl = card.querySelector('[data-role="sky-date"]');
    const ymd = (dateEl && dateEl.value) || localYmdInTz(new Date(), tzCtx);
    const day = portDayStartUtc(ymd, tzCtx);
    card._skyDay = day;
    card._skyTz = tzCtx;
    card._skyObserver = { latitudeDeg: lat, longitudeDeg: lon };

    try {
      const mod = await loadAlmanac();
      card._skyMod = mod;
      const sunEvents = almanacFn(mod, "sunEvents");
      if (typeof sunEvents === "function" && eventsEl) {
        const next = new Date(day.getTime() + 86400000);
        const events = sunEvents(day, next, card._skyObserver) || [];
        const rise = events.find((e) => e.kind === "rise");
        const set = events.find((e) => e.kind === "set");
        const bits = [];
        if (rise) {
          bits.push(
            '<span class="ss-sky-ev ss-sky-ev-rise" title="Sunrise (port local)">' + SUN_UP_SVG +
            '<span class="ss-sky-ev-lbl">Rise</span>' +
            '<span class="ss-sky-ev-tm">' + escHtml(formatOwTime(rise.time, { hour: "2-digit", minute: "2-digit" }, tzCtx)) +
            "</span></span>"
          );
        }
        if (set) {
          bits.push(
            '<span class="ss-sky-ev ss-sky-ev-set" title="Sunset (port local)">' + SUN_DOWN_SVG +
            '<span class="ss-sky-ev-lbl">Set</span>' +
            '<span class="ss-sky-ev-tm">' + escHtml(formatOwTime(set.time, { hour: "2-digit", minute: "2-digit" }, tzCtx)) +
            "</span></span>"
          );
        }
        eventsEl.innerHTML = bits.length ? bits.join("") : "Sky data unavailable";
      } else if (eventsEl) {
        eventsEl.textContent = "Sky data unavailable";
      }
    } catch (err) {
      card._skyMod = null;
      if (eventsEl) eventsEl.textContent = "Sky information not found";
    }

    const now = new Date();
    const sameDay = localYmdInTz(now, tzCtx) === ymd;
    const mins = sameDay ? minutesOfDayInTz(now, tzCtx) : 12 * 60;
    const slider = card.querySelector('[data-role="sky-slider"]');
    if (slider) slider.value = String(mins);
    updateSkyFrame(card, mins);
  }

  function updateSkyFrame(card, mins) {
    const day = card._skyDay || portDayStartUtc(localYmdInTz(new Date(), cardTzCtx(card)), cardTzCtx(card));
    const tzCtx = card._skyTz || cardTzCtx(card);
    const minute = Number(mins) || 0;
    const t = dateAtMinutes(day, minute);
    const clock = card.querySelector('[data-role="sky-clock"]');
    if (clock) clock.textContent = formatSkyClock(t, tzCtx);
    const slider = card.querySelector('[data-role="sky-slider"]');
    if (slider) {
      const pct = (minute / 1439) * 100;
      slider.style.background =
        "linear-gradient(90deg,#38bdf8 0%,#38bdf8 " + pct + "%,#334155 " + pct + "%,#334155 100%)";
    }
    const grad = card.querySelector('[data-role="sky-grad"]');
    const sunEl = card.querySelector('[data-role="sky-sun"]');
    const moonEl = card.querySelector('[data-role="sky-moon"]');
    const observer = card._skyObserver;
    const mod = card._skyMod;
    const sunAltAz = almanacFn(mod, "sunAltAz");
    const moonAltAz = almanacFn(mod, "moonAltAz");

    let sunAlt = -90;
    if (typeof sunAltAz === "function" && observer) {
      try {
        const s = sunAltAz(t, observer);
        sunAlt = Number(s && (s.altDeg != null ? s.altDeg : s.altitudeDeg));
        const az = Number(s && (s.azDeg != null ? s.azDeg : s.azimuthDeg));
        const pos = skyStagePos(sunAlt, az);
        if (sunEl) {
          if (pos && pos.visible) {
            sunEl.hidden = false;
            sunEl.style.left = pos.x + "%";
            sunEl.style.top = pos.y + "%";
            sunEl.classList.remove("is-below");
          } else {
            sunEl.hidden = true;
          }
        }
      } catch (e) {
        if (sunEl) sunEl.hidden = true;
      }
    } else if (sunEl) {
      sunEl.hidden = true;
    }

    if (grad) grad.style.background = skyGradientForAlt(sunAlt);

    if (typeof moonAltAz === "function" && observer && moonEl) {
      try {
        const m = moonAltAz(t, observer);
        const malt = Number(m && (m.altDeg != null ? m.altDeg : m.altitudeDeg));
        const maz = Number(m && (m.azDeg != null ? m.azDeg : m.azimuthDeg));
        const pos = skyStagePos(malt, maz);
        /* Moon only after civil dusk — never a daytime ghost */
        const showMoon = !!(pos && pos.visible && sunAlt < -4);
        if (showMoon) {
          moonEl.hidden = false;
          moonEl.style.left = pos.x + "%";
          moonEl.style.top = pos.y + "%";
        } else {
          moonEl.hidden = true;
        }
      } catch (e) {
        moonEl.hidden = true;
      }
    } else if (moonEl) {
      moonEl.hidden = true;
    }
  }

  function ssSkyScrub(el) {
    const card = cardRootFromEl(el);
    if (!card) return;
    updateSkyFrame(card, Number(el.value) || 0);
  }

  function ssSkyStep(el, delta) {
    const card = cardRootFromEl(el);
    if (!card) return;
    const slider = card.querySelector('[data-role="sky-slider"]');
    if (!slider) return;
    const next = Math.max(0, Math.min(1439, (Number(slider.value) || 0) + (Number(delta) || 0)));
    slider.value = String(next);
    updateSkyFrame(card, next);
  }

  function ssSkyNow(el) {
    const card = cardRootFromEl(el);
    if (!card) return;
    const dateEl = card.querySelector('[data-role="sky-date"]');
    const local = localYmdInTz(new Date(), cardTzCtx(card));
    if (dateEl) dateEl.value = local;
    initSkyWidget(card);
  }

  function ssSkyOnDateChange(el) {
    const card = cardRootFromEl(el);
    if (!card) return;
    initSkyWidget(card);
  }

  function ssPortCardPrint(el, kind) {
    const card = cardRootFromEl(el);
    if (!card) return;
    const panel = card.querySelector('.ss-port-panel[data-panel="' + (kind || "tides") + '"] .ss-port-content');
    const title = (card.querySelector(".ss-port-name") || {}).textContent || "Port";
    if (!panel) return;
    const w = global.open("", "_blank", "noopener,noreferrer,width=720,height=900");
    if (!w) return;
    w.document.write(
      "<!DOCTYPE html><html><head><title>" + escHtml(title) + " — Tides</title>" +
      "<style>body{font:14px/1.45 system-ui,sans-serif;color:#0f172a;padding:24px}" +
      "h1{font-size:18px;margin:0 0 8px}table{width:100%;border-collapse:collapse}" +
      "th,td{border-bottom:1px solid #cbd5e1;padding:6px 8px;text-align:left;font-size:13px}" +
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
  global.ssSkyScrub = ssSkyScrub;
  global.ssSkyStep = ssSkyStep;
  global.ssSkyNow = ssSkyNow;
  global.ssSkyOnDateChange = ssSkyOnDateChange;
  global.wirePortCardInteractions = wirePortCardInteractions;
  global.expandPortsFromOpenWaters = expandPortsFromOpenWaters;
  // Legacy no-op so old onclick handlers don't throw
  global.togglePortOwHydro = function () {};
})(typeof window !== "undefined" ? window : globalThis);
