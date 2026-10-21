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
      css: "assets/Auto%20NtM%20Plotting/maplibre-gl.css?v=5.48",
      js: "assets/Auto%20NtM%20Plotting/maplibre-gl.js?v=5.48"
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
        const root = (this._container = L.DomUtil.create("div", "setsail-ow-gl-root"));
        // Above basemap tiles, below controls; pointer-events none so map stays usable
        root.style.cssText =
          "position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%;" +
          "z-index:550;pointer-events:none;overflow:hidden;background:transparent;";
        map.getContainer().appendChild(root);

        const center = map.getCenter();
        const glZoom = Math.max(0, map.getZoom() - GL_ZOOM_OFFSET);

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
          trackResize: true
        });

        this._onMove = this._scheduleSync.bind(this);
        this._onZoom = this._scheduleSync.bind(this);
        this._onResize = this._resizeGl.bind(this);
        this._syncRaf = 0;
        this._lastSyncKey = "";

        map.on("move", this._onMove);
        map.on("zoom", this._onZoom);
        map.on("moveend", this._onMove);
        map.on("zoomend", this._onMove);
        map.on("resize", this._onResize);
        map.on("zoomanim", this._onZoomanim, this);

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
        map.off("move", this._onMove);
        map.off("zoom", this._onZoom);
        map.off("moveend", this._onMove);
        map.off("zoomend", this._onMove);
        map.off("resize", this._onResize);
        map.off("zoomanim", this._onZoomanim, this);
        if (this._syncRaf) {
          try {
            cancelAnimationFrame(this._syncRaf);
          } catch (e) {}
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

      _glZoom: function () {
        return Math.max(0, this._map.getZoom() - GL_ZOOM_OFFSET);
      },

      _scheduleSync: function () {
        if (!this._glMap || !this._map || this._zooming) return;
        if (this._syncRaf) return;
        this._syncRaf = requestAnimationFrame(() => {
          this._syncRaf = 0;
          this._syncView(false);
        });
      },

      _syncView: function (force) {
        if (!this._glMap || !this._map || this._zooming) return;
        try {
          const c = this._map.getCenter();
          const z = this._glZoom();
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

      _onZoomanim: function (e) {
        if (!this._glMap || !this._map) return;
        this._zooming = true;
        try {
          const center = e.center || this._map.getCenter();
          const zoom = (typeof e.zoom === "number" ? e.zoom : this._map.getZoom()) - GL_ZOOM_OFFSET;
          const z = Math.max(0, zoom);
          this._lastSyncKey = center.lng.toFixed(5) + "," + center.lat.toFixed(5) + "," + z.toFixed(3);
          this._glMap.jumpTo({
            center: [center.lng, center.lat],
            zoom: z,
            bearing: 0,
            pitch: 0
          });
        } catch (err) {}
        const done = () => {
          this._zooming = false;
          this._syncView(true);
        };
        this._map.once("zoomend", done);
        setTimeout(done, 400);
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

  function formatOwTime(iso) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return String(iso || "");
      return d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
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

  function renderTidesHtml(data) {
    const extremes = (data && (data.extremes || data.events)) || [];
    const now = Date.now();
    const upcoming = extremes
      .filter((e) => e && e.time && new Date(e.time).getTime() >= now - 3600000)
      .slice(0, 6);
    const rows = (upcoming.length ? upcoming : extremes.slice(0, 6)).map((e) => {
      const label = e.label || (e.high ? "High" : e.low ? "Low" : "—");
      const level = Number.isFinite(Number(e.level)) ? Number(e.level).toFixed(2) + " m" : "—";
      const color = e.high || /high/i.test(label) ? "#34d399" : "#38bdf8";
      return (
        '<div style="display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:1px solid rgba(148,163,184,0.12);font-size:0.68rem;">' +
        '<span style="color:' + color + ';font-weight:700;min-width:42px;">' + label + "</span>" +
        '<span style="color:#94a3b8;flex:1;">' + formatOwTime(e.time) + "</span>" +
        '<span style="color:#e2e8f0;font-weight:600;">' + level + "</span>" +
        "</div>"
      );
    });
    if (!rows.length) {
      return '<div style="font-size:0.68rem;color:#94a3b8;padding:4px 0;">No tide extremes for this position.</div>';
    }
    return (
      '<div style="margin-top:6px;padding:6px 7px;background:rgba(15,23,42,0.72);border:1px solid rgba(56,189,248,0.28);border-radius:6px;">' +
      '<div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.04em;color:#7dd3fc;font-weight:700;margin-bottom:4px;">Tides · Open Waters</div>' +
      rows.join("") +
      "</div>"
    );
  }

  function renderCurrentsHtml(data) {
    const events = (data && data.events) || [];
    const now = Date.now();
    const upcoming = events
      .filter((e) => e && e.time && new Date(e.time).getTime() >= now - 3600000)
      .slice(0, 6);
    const rows = (upcoming.length ? upcoming : events.slice(0, 6)).map((e) => {
      const dir =
        Number.isFinite(Number(e.direction))
          ? Math.round(Number(e.direction)) + "°"
          : "—";
      return (
        '<div style="display:flex;justify-content:space-between;gap:6px;padding:3px 0;border-bottom:1px solid rgba(148,163,184,0.12);font-size:0.68rem;">' +
        '<span style="color:#fbbf24;font-weight:700;min-width:72px;">' + kindLabel(e.kind) + "</span>" +
        '<span style="color:#94a3b8;flex:1;">' + formatOwTime(e.time) + "</span>" +
        '<span style="color:#e2e8f0;font-weight:600;white-space:nowrap;">' + formatSpeed(e.speed) +
        (dir !== "—" ? " · " + dir : "") + "</span>" +
        "</div>"
      );
    });
    if (!rows.length) {
      return '<div style="font-size:0.68rem;color:#94a3b8;padding:4px 0;">No current events for this position.</div>';
    }
    return (
      '<div style="margin-top:6px;padding:6px 7px;background:rgba(15,23,42,0.72);border:1px solid rgba(251,191,36,0.28);border-radius:6px;">' +
      '<div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.04em;color:#fcd34d;font-weight:700;margin-bottom:4px;">Currents · Open Waters</div>' +
      rows.join("") +
      "</div>"
    );
  }

  const portHydroState = Object.create(null);

  async function togglePortHydro(kind, portId, lat, lon, btn) {
    const id = String(portId || "");
    const panelId = "port-ow-" + kind + "-" + id;
    const panel = document.getElementById(panelId);
    if (!panel || !btn) return;

    const st = portHydroState[id] || (portHydroState[id] = { tides: false, currents: false });
    const turningOn = !st[kind];

    if (!turningOn) {
      st[kind] = false;
      panel.style.display = "none";
      panel.innerHTML = "";
      btn.setAttribute("aria-pressed", "false");
      btn.style.opacity = "0.85";
      btn.style.outline = "none";
      return;
    }

    btn.setAttribute("aria-pressed", "true");
    btn.style.opacity = "1";
    btn.style.outline = "1px solid rgba(34,211,238,0.7)";
    panel.style.display = "block";
    panel.innerHTML = '<div style="font-size:0.68rem;color:#94a3b8;padding:6px 0;">Loading…</div>';

    const latN = Number(lat);
    const lonN = Number(lon);
    if (!Number.isFinite(latN) || !Number.isFinite(lonN)) {
      panel.innerHTML = '<div style="font-size:0.68rem;color:#f87171;">Invalid port coordinates.</div>';
      return;
    }

    try {
      const url =
        kind === "currents"
          ? CURRENTS_EVENTS + "?latitude=" + encodeURIComponent(latN) + "&longitude=" + encodeURIComponent(lonN)
          : TIDES_EXTREMES + "?latitude=" + encodeURIComponent(latN) + "&longitude=" + encodeURIComponent(lonN);
      const res = await fetch(url, { credentials: "omit" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      st[kind] = true;
      panel.innerHTML = kind === "currents" ? renderCurrentsHtml(data) : renderTidesHtml(data);
    } catch (err) {
      st[kind] = false;
      btn.setAttribute("aria-pressed", "false");
      btn.style.outline = "none";
      panel.innerHTML =
        '<div style="font-size:0.68rem;color:#f87171;">' +
        (kind === "currents" ? "Currents" : "Tides") +
        " unavailable here.</div>";
    }
  }

  function buildPortHydroControlsHtml(port) {
    const id = String((port && port.id) || "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const coords = (port && (port.approachCoords || port.coords)) || [];
    const lat = Number(coords[0]);
    const lon = Number(coords[1]);
    if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) return "";
    return (
      '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;">' +
      '<button type="button" aria-pressed="false" title="Toggle Open Waters tides at this port" ' +
      'onclick="window.togglePortOwHydro && window.togglePortOwHydro(\'tides\',\'' + id + "'," + lat + "," + lon + ',this)" ' +
      'style="background:rgba(8,145,178,0.22);border:1px solid rgba(34,211,238,0.55);color:#e0f2fe;font-size:0.68rem;padding:3px 8px;border-radius:4px;cursor:pointer;font-weight:600;opacity:0.85;">Tides</button>' +
      '<button type="button" aria-pressed="false" title="Toggle Open Waters currents at this port" ' +
      'onclick="window.togglePortOwHydro && window.togglePortOwHydro(\'currents\',\'' + id + "'," + lat + "," + lon + ',this)" ' +
      'style="background:rgba(180,83,9,0.22);border:1px solid rgba(251,191,36,0.55);color:#fef3c7;font-size:0.68rem;padding:3px 8px;border-radius:4px;cursor:pointer;font-weight:600;opacity:0.85;">Currents</button>' +
      "</div>" +
      '<div id="port-ow-tides-' + id + '" style="display:none;"></div>' +
      '<div id="port-ow-currents-' + id + '" style="display:none;"></div>'
    );
  }

  global.ensureOpenWatersMapLibre = ensureMapLibreReady;
  global.createOpenWatersBathymetryLayer = createBathymetryLayer;
  global.wireOpenWatersGlLayerResize = wireGlLayerResize;
  global.waitForOpenWatersGlStyle = waitForGlStyle;
  global.flashOpenWatersLayerStatus = flashOwStatus;
  global.togglePortOwHydro = togglePortHydro;
  global.buildPortOwHydroControlsHtml = buildPortHydroControlsHtml;
})(typeof window !== "undefined" ? window : globalThis);
