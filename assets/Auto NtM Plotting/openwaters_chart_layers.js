/**
 * Open Waters — Seamap / Seascape (MapLibre→Leaflet) + per-port Tides / Currents
 * Seamap  = Free Nautical Chart (vector ENC-style)
 * Seascape = bathymetry / depth shading (overlay; OSM base stripped)
 * Buoys   = separate OpenSeaMap PNG seamarks (not this module)
 */
(function (global) {
  "use strict";

  const SEAMAP_STYLE = "https://tiles.openwaters.io/seamap/style.json";
  const SEASCAPE_STYLE = "https://tiles.openwaters.io/seascape/style.json";
  const TIDES_EXTREMES = "https://api.openwaters.io/tides/extremes";
  const CURRENTS_EVENTS = "https://api.openwaters.io/currents/events";

  const ML_CSS = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css";
  const ML_JS = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js";
  // Local patched bridge (browser-globals only; safe canvas init for MapLibre v4)
  const ML_LEAFLET_LOCAL = "assets/Auto%20NtM%20Plotting/maplibre_gl_leaflet.js";
  const ML_LEAFLET_CDN = "https://cdn.jsdelivr.net/npm/@maplibre/maplibre-gl-leaflet@0.0.22/leaflet-maplibre-gl.js";

  let readyPromise = null;
  let seascapeStylePromise = null;

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
          "pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.45);";
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
      }, isErr ? 6000 : 2800);
    } catch (e) {}
  }

  function ensureMapLibreReady() {
    if (readyPromise) return readyPromise;
    readyPromise = (async () => {
      if (typeof global.maplibregl === "undefined") {
        loadCss(ML_CSS);
        await loadScript(ML_JS);
      }
      if (typeof global.maplibregl === "undefined") {
        throw new Error("maplibre-gl failed to load");
      }
      if (typeof L === "undefined") throw new Error("Leaflet required");
      if (typeof L.maplibreGL !== "function") {
        try {
          await loadScript(ML_LEAFLET_LOCAL);
        } catch (e1) {
          await loadScript(ML_LEAFLET_CDN);
        }
      }
      if (typeof L.maplibreGL !== "function") {
        throw new Error("maplibre-gl-leaflet unavailable");
      }
    })().catch((err) => {
      readyPromise = null;
      throw err;
    });
    return readyPromise;
  }

  async function getSeascapeOverlayStyle() {
    if (seascapeStylePromise) return seascapeStylePromise;
    seascapeStylePromise = fetch(SEASCAPE_STYLE, { credentials: "omit" })
      .then((r) => {
        if (!r.ok) throw new Error("Seascape style HTTP " + r.status);
        return r.json();
      })
      .then((style) => {
        const next = Object.assign({}, style);
        next.sources = Object.assign({}, style.sources || {});
        delete next.sources.osm;
        next.layers = (style.layers || []).filter((l) => l && l.id !== "osm-base" && l.source !== "osm");
        return next;
      })
      .catch((err) => {
        seascapeStylePromise = null;
        throw err;
      });
    return seascapeStylePromise;
  }

  function wireGlLayerResize(layer, map) {
    if (!layer || !map) return;
    const kick = () => {
      try {
        const gl = layer.getMaplibreMap && layer.getMaplibreMap();
        if (gl && typeof gl.resize === "function") gl.resize();
        map.invalidateSize({ animate: false });
      } catch (e) {}
    };
    setTimeout(kick, 40);
    setTimeout(kick, 250);
    try {
      const gl = layer.getMaplibreMap && layer.getMaplibreMap();
      if (gl && typeof gl.once === "function") {
        gl.once("load", kick);
        gl.once("idle", kick);
      }
    } catch (e) {}
  }

  function createMapLibreLayer(style, attribution) {
    return L.maplibreGL({
      style: style,
      interactive: false,
      pane: "overlayPane",
      padding: 0.08,
      attribution: attribution || "Open Waters",
      className: "setsail-ow-gl-canvas"
    });
  }

  async function createSeamapLayer() {
    await ensureMapLibreReady();
    return createMapLibreLayer(SEAMAP_STYLE, "Open Waters Seamap");
  }

  async function createSeascapeLayer() {
    await ensureMapLibreReady();
    const style = await getSeascapeOverlayStyle();
    return createMapLibreLayer(style, "Open Waters Seascape");
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
  global.flashOpenWatersLayerStatus = flashOwStatus;
  global.togglePortOwHydro = togglePortHydro;
  global.buildPortOwHydroControlsHtml = buildPortHydroControlsHtml;
})(typeof window !== "undefined" ? window : globalThis);
