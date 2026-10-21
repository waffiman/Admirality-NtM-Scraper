/**
 * Open Waters — Seamap / Seascape + per-port Tides / Currents
 * Seamap/Seascape use a custom Leaflet layer that hosts MapLibre and syncs via jumpTo
 * (no maplibre-gl-leaflet bridge — that breaks on MapLibre v4 transform API).
 */
(function (global) {
  "use strict";

  const SEAMAP_STYLE = "https://tiles.openwaters.io/seamap/style.json";
  const SEASCAPE_STYLE = "https://tiles.openwaters.io/seascape/style.json";
  const TIDES_EXTREMES = "https://api.openwaters.io/tides/extremes";
  const CURRENTS_EVENTS = "https://api.openwaters.io/currents/events";

  // Prefer local MapLibre (no CDN flake); then unpkg / jsdelivr
  const ML_BUNDLES = [
    {
      css: "assets/Auto%20NtM%20Plotting/maplibre-gl.css",
      js: "assets/Auto%20NtM%20Plotting/maplibre-gl.js"
    },
    {
      css: "https://unpkg.com/maplibre-gl@5.0.1/dist/maplibre-gl.css",
      js: "https://unpkg.com/maplibre-gl@5.0.1/dist/maplibre-gl.js"
    },
    {
      css: "https://cdn.jsdelivr.net/npm/maplibre-gl@5.0.1/dist/maplibre-gl.css",
      js: "https://cdn.jsdelivr.net/npm/maplibre-gl@5.0.1/dist/maplibre-gl.js"
    }
  ];
  // Leaflet 256px vs MapLibre 512px vector tiles → zoom − 1
  const GL_ZOOM_OFFSET = 1;

  let readyPromise = null;
  let OwGlLayerClass = null;

  function loadCss(href) {
    if (document.querySelector('link[data-ow-ml="1"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-ow-ml", "1");
    document.head.appendChild(link);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-ow-src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute("data-ow-loaded") === "1") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed " + src)));
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.setAttribute("data-ow-src", src);
      s.onload = () => {
        s.setAttribute("data-ow-loaded", "1");
        resolve();
      };
      s.onerror = () => reject(new Error("Failed to load " + src));
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

        this._onMove = this._syncView.bind(this);
        this._onZoom = this._syncView.bind(this);
        this._onResize = this._resizeGl.bind(this);

        map.on("move", this._onMove);
        map.on("zoom", this._onZoom);
        map.on("resize", this._onResize);
        map.on("zoomanim", this._onZoomanim, this);

        this._glMap.on("load", () => {
          this._resizeGl();
          this._syncView();
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
        map.off("resize", this._onResize);
        map.off("zoomanim", this._onZoomanim, this);
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

      _syncView: function () {
        if (!this._glMap || !this._map || this._zooming) return;
        try {
          const c = this._map.getCenter();
          this._glMap.jumpTo({
            center: [c.lng, c.lat],
            zoom: this._glZoom(),
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
          this._glMap.jumpTo({
            center: [center.lng, center.lat],
            zoom: Math.max(0, zoom),
            bearing: 0,
            pitch: 0
          });
        } catch (err) {}
        const done = () => {
          this._zooming = false;
          this._syncView();
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
          this._syncView();
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
            await loadScript(b.js);
            if (typeof global.maplibregl !== "undefined") break;
            lastErr = new Error("maplibregl global missing after " + b.js);
          } catch (err) {
            lastErr = err;
          }
        }
        if (typeof global.maplibregl === "undefined") {
          throw lastErr || new Error("maplibre-gl failed to load (local+CDN)");
        }
      }
      if (typeof L === "undefined") throw new Error("Leaflet required");
      ensureOwGlLayerClass();
    })().catch((err) => {
      readyPromise = null;
      throw err;
    });
    return readyPromise;
  }

  /**
   * Seascape official style uses `color-relief` (MapLibre 5+ / not in all builds) and OSM base.
   * Build a lean overlay: transparent bg + DEM hillshade + depth area fills (no OSM, no color-relief).
   */
  function buildSeascapeOverlayStyle() {
    return {
      version: 8,
      name: "SetSail Seascape overlay",
      glyphs: "https://tiles.openwaters.io/fonts/{fontstack}/{range}.pbf",
      sources: {
        "seascape-dem": {
          type: "raster-dem",
          tiles: ["https://tiles.openwaters.io/seascape/{z}/{x}/{y}.webp"],
          tileSize: 512,
          maxzoom: 14,
          encoding: "terrarium",
          attribution: "Open Waters Seascape"
        },
        "seascape-vector": {
          type: "vector",
          tiles: ["https://tiles.openwaters.io/seascape/{z}/{x}/{y}.pbf"],
          maxzoom: 14,
          attribution: "Open Waters Seascape"
        }
      },
      layers: [
        {
          id: "ow-transparent-bg",
          type: "background",
          paint: { "background-color": "rgba(0,0,0,0)" }
        },
        {
          id: "ow-depth-hillshade",
          type: "hillshade",
          source: "seascape-dem",
          paint: {
            "hillshade-exaggeration": 0.7,
            "hillshade-shadow-color": "#041526",
            "hillshade-highlight-color": "#7dd3fc",
            "hillshade-accent-color": "#0e7490",
            "hillshade-illumination-direction": 315
          }
        },
        {
          id: "ow-depth-areas",
          type: "fill",
          source: "seascape-vector",
          "source-layer": "depare",
          paint: {
            "fill-color": [
              "interpolate",
              ["linear"],
              ["coalesce", ["get", "DRVAL1"], ["get", "drval1"], 0],
              -20, "#082f49",
              -10, "#0c4a6e",
              -5, "#0369a1",
              0, "#0ea5e9",
              5, "#67e8f9",
              20, "#ecfeff"
            ],
            "fill-opacity": 0.48
          }
        },
        {
          id: "ow-contour-lines",
          type: "line",
          source: "seascape-vector",
          "source-layer": "depcnt",
          minzoom: 8,
          paint: {
            "line-color": "rgba(224,242,254,0.55)",
            "line-width": 0.8
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
          gl.off("error", onErr);
        } catch (e) {}
        if (err) reject(err);
        else resolve();
      };
      const onLoad = () => finish(null);
      const onErr = (e) => {
        const msg = (e && e.error && e.error.message) || (e && e.message) || "";
        // Ignore per-tile 404s; only fail hard on style parse failures
        if (/style|parse|source|layer|color-relief|unsupported/i.test(String(msg))) {
          finish(new Error(msg || "MapLibre style error"));
        }
      };
      const timer = setTimeout(() => {
        try {
          if (gl.isStyleLoaded && gl.isStyleLoaded()) finish(null);
          else finish(new Error("Style timeout (" + Math.round(timeoutMs / 1000) + "s) — tiles.openwaters.io slow/blocked?"));
        } catch (e) {
          finish(new Error("Style timeout"));
        }
      }, timeoutMs || 18000);
      try {
        if (gl.isStyleLoaded && gl.isStyleLoaded()) {
          finish(null);
          return;
        }
      } catch (e) {}
      gl.on("load", onLoad);
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

  async function createSeamapLayer() {
    await ensureMapLibreReady();
    return createMapLibreLayer(SEAMAP_STYLE, "Open Waters Seamap");
  }

  async function createSeascapeLayer() {
    await ensureMapLibreReady();
    return createMapLibreLayer(buildSeascapeOverlayStyle(), "Open Waters Seascape");
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
  global.createOpenWatersSeamapLayer = createSeamapLayer;
  global.createOpenWatersSeascapeLayer = createSeascapeLayer;
  global.wireOpenWatersGlLayerResize = wireGlLayerResize;
  global.waitForOpenWatersGlStyle = waitForGlStyle;
  global.flashOpenWatersLayerStatus = flashOwStatus;
  global.togglePortOwHydro = togglePortHydro;
  global.buildPortOwHydroControlsHtml = buildPortHydroControlsHtml;
})(typeof window !== "undefined" ? window : globalThis);
