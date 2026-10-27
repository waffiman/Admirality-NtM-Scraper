/**
 * SetSail AIS Overlay — multi-feed AIS (deduped by MMSI)
 * Feeds: AISStream.io WS + OpenSeaFeed WS + Open Waters REST + Digitraffic (Baltic) + zone snapshots
 */
(function () {
  const AIS_REFRESH_MS = 60 * 1000;
  const ZONES_INDEX = "ais/zones/index.json";
  const OPENWATERS_VESSELS = "https://ais.openwaters.io/v1/vessels";
  const DIGITRAFFIC_LOC = "https://meri.digitraffic.fi/api/ais/v1/locations";
  const DIGITRAFFIC_VES = "https://meri.digitraffic.fi/api/ais/v1/vessels";
  const AISSTREAM_WS_URL = "wss://stream.aisstream.io/v0/stream";
  // OpenSeaFeed — free community AIS, aisstream.io-compatible protocol (no key for free tier)
  const OPENSEAFEED_WS_URL = "wss://stream.openseafeed.com/v1/stream";
  const AISSTREAM_KEY_STORAGE = "setsail_aisstream_api_key";
  // Shared SetSail key — all users connect by default; optional localStorage override.
  const DEFAULT_AISSTREAM_API_KEY = "d340d8078f597170e53ff92ddd194609b2d5fc8b";

  // Wide viewport still loads live AIS — targets appear as soon as the AIS tile is on.
  // OW_AREA_CAP is spanLon*spanLat (deg²). Above this we still show zone snapshots + stream.
  const OW_AREA_CAP = 4200;
  const OW_MAX_TILES = 28;
  const ABS_MARKER_CAP = 8000;
  const MIN_ZOOM_ZONES = 1;
  const MIN_ZOOM_DENSE_ZONES = 4;
  // Digitraffic = dense Baltic-only feed — never at world overview (it crowds the map).
  const MIN_ZOOM_DIGITRAFFIC = 6;
  // Even world corridors for Open Waters (Baltic intentionally last / not privileged).
  const OVERVIEW_SAMPLE_BOXES = [
    { minLat: 25, minLon: -80, maxLat: 42, maxLon: -55 },   // NW Atlantic / US East
    { minLat: 5, minLon: -95, maxLat: 28, maxLon: -60 },    // Gulf / Caribbean
    { minLat: -40, minLon: -60, maxLat: -20, maxLon: -30 }, // SW Atlantic
    { minLat: 35, minLon: -25, maxLat: 52, maxLon: 5 },     // NE Atlantic / Europe W
    { minLat: 30, minLon: -20, maxLat: 45, maxLon: 10 },    // Med W approaches
    { minLat: -38, minLon: 10, maxLat: -20, maxLon: 40 },   // Cape of Good Hope
    { minLat: 5, minLon: 40, maxLat: 25, maxLon: 70 },      // Arabian Sea
    { minLat: -10, minLon: 90, maxLat: 15, maxLon: 120 },   // Malacca / Singapore
    { minLat: 20, minLon: 115, maxLat: 42, maxLon: 145 },   // East China / Japan
    { minLat: 30, minLon: -150, maxLat: 48, maxLon: -120 }, // NE Pacific
    { minLat: -35, minLon: 145, maxLat: -15, maxLon: 175 }, // Coral / Tasman
    { minLat: 50, minLon: 0, maxLat: 62, maxLon: 22 }       // North Sea (Baltic gate — last)
  ];

  /** Zoom LOD: triangles at every zoom; keep counts modest for pan/zoom. */
  function aisLodForZoom(z) {
    const zoom = Number(z) || 2;
    if (zoom <= 2) {
      return { maxMarkers: 180, cellDeg: 12, maxPerZone: 22, maxZones: 10, digi: false, triPx: 9 };
    }
    if (zoom <= 3) {
      return { maxMarkers: 280, cellDeg: 8, maxPerZone: 40, maxZones: 10, digi: false, triPx: 10 };
    }
    if (zoom <= 5) {
      return { maxMarkers: 520, cellDeg: 4, maxPerZone: 90, maxZones: 10, digi: false, triPx: 11 };
    }
    if (zoom <= 7) {
      return { maxMarkers: 820, cellDeg: 2, maxPerZone: 220, maxZones: 8, digi: true, triPx: 12 };
    }
    if (zoom <= 9) {
      return { maxMarkers: 1200, cellDeg: 0.9, maxPerZone: 550, maxZones: 6, digi: true, triPx: 13 };
    }
    return { maxMarkers: 1600, cellDeg: 0.4, maxPerZone: 1200, maxZones: 5, digi: true, triPx: 14 };
  }

  /**
   * Even geographic sample — prevents Baltic/Europe from monopolizing the marker budget.
   * Takes up to ceil(maxN / nCells) from each lat/lon cell, then fills remainder round-robin.
   */
  function sampleEvenlyByGrid(targets, maxN, cellDeg) {
    if (!Array.isArray(targets) || !targets.length) return [];
    const cap = Math.max(1, maxN | 0);
    if (targets.length <= cap) return targets.slice();
    const cell = Math.max(0.2, Number(cellDeg) || 5);
    const buckets = Object.create(null);
    const keys = [];
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      const lat = Number(t.lat);
      const lon = Number(t.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
      const ki = Math.floor(lat / cell);
      const kj = Math.floor(lon / cell);
      const key = ki + ":" + kj;
      if (!buckets[key]) {
        buckets[key] = [];
        keys.push(key);
      }
      buckets[key].push(t);
    }
    if (!keys.length) return targets.slice(0, cap);
    // Shuffle keys lightly by hash so no region is always first
    keys.sort((a, b) => {
      const ha = (a.charCodeAt(0) * 31 + a.length) % 97;
      const hb = (b.charCodeAt(0) * 31 + b.length) % 97;
      return ha - hb;
    });
    const perCell = Math.max(1, Math.ceil(cap / keys.length));
    const out = [];
    const cursor = Object.create(null);
    keys.forEach((k) => { cursor[k] = 0; });
    // First pass: equal share
    keys.forEach((k) => {
      const arr = buckets[k];
      const n = Math.min(perCell, arr.length);
      for (let i = 0; i < n && out.length < cap; i++) {
        out.push(arr[i]);
        cursor[k] = i + 1;
      }
    });
    // Second pass: fill leftovers round-robin (prefer moving vessels)
    let guard = 0;
    while (out.length < cap && guard < targets.length * 2) {
      guard++;
      let added = false;
      for (let k = 0; k < keys.length && out.length < cap; k++) {
        const key = keys[k];
        const arr = buckets[key];
        let i = cursor[key] || 0;
        while (i < arr.length) {
          const t = arr[i++];
          cursor[key] = i;
          // Prefer underway when filling overflow
          if (Number(t.sog) >= 0.5 || out.length < cap * 0.85) {
            out.push(t);
            added = true;
            break;
          }
        }
      }
      if (!added) break;
    }
    return out;
  }

  let leafletAisLayer = null;
  let aisCanvasRenderer = null;
  let aisTimer = null;
  let aisMetaByMmsi = Object.create(null);
  let aisLastPayload = null;
  let aisMoveTimer = null;
  let zonesManifest = null;
  let zoneCache = Object.create(null);
  let aisRefreshSeq = 0;
  let aisMarkerByMmsi = Object.create(null);
  let aisRefreshBusy = false;
  let aisRenderQueued = false;

  /** Shared canvas renderer — NAVTOR-like overview density without thousands of DOM icons. */
  function getAisCanvasRenderer() {
    if (!aisCanvasRenderer && typeof L !== "undefined" && L.canvas) {
      aisCanvasRenderer = L.canvas({ padding: 0.4 });
    }
    return aisCanvasRenderer || undefined;
  }

  // Live WebSocket feeds (AISStream + OpenSeaFeed) → one MMSI map (no duplicate markers)
  let aisStreamWs = null;
  let openSeaFeedWs = null;
  let aisStreamTargets = Object.create(null);
  let aisStreamReconnectTimer = null;
  let openSeaFeedReconnectTimer = null;
  let aisStreamRenderTimer = null;
  let aisStreamPendingRender = false;
  let lastRestTargets = [];
  let liveFeedStatus = { aisstream: "DISCONNECTED", openseafeed: "DISCONNECTED" };

  function getPersonalAisStreamApiKey() {
    return "";
  }

  function getAisStreamApiKey() {
    try {
      const winKey = (window.SETSAIL_AISSTREAM_API_KEY || "").trim();
      if (winKey) return winKey;
    } catch (e) {}
    return DEFAULT_AISSTREAM_API_KEY;
  }

  function isUsingSharedAisStreamKey() {
    return true;
  }

  function ensureLayer(map) {
    if (!leafletAisLayer) {
      leafletAisLayer = L.layerGroup();
      window.leafletAisLayer = leafletAisLayer;
    }
    if (map && !map.hasLayer(leafletAisLayer)) leafletAisLayer.addTo(map);
    return leafletAisLayer;
  }

  function shipColor(navStat, sog) {
    // Brand coral for moving targets; muted slate when anchored/moored
    if (navStat === 1 || navStat === 5) return "#94a3b8";
    if (Number(sog) >= 0.5) return "#ea4c25"; // Underway — SetSail coral
    return "#f05a36";
  }

  function formatAisPopup(v) {
    const name = v.name || v.shipName || ("MMSI " + v.mmsi);
    const dest = v.destination || "—";
    const sog = v.sog != null ? Number(v.sog).toFixed(1) + " kn" : "—";
    const cog = v.cog != null && Number(v.cog) < 360 ? Math.round(Number(v.cog)) + "°" : "—";
    const type = v.shipTypeName || v.shipType || v.type || "Vessel";
    // Light text on dark leaflet popup chrome — no source line (minimal)
    return (
      '<div class="ss-ais-popup-body" style="min-width:200px;max-width:260px;font-family:Segoe UI,sans-serif;font-size:12.5px;line-height:1.5;color:#f1f5f9;">' +
      '<div style="font-weight:800;color:#fb923c;margin-bottom:6px;font-size:13.5px;">' +
      String(name).replace(/</g, "&lt;") +
      "</div>" +
      '<div style="color:#e2e8f0;"><span style="color:#94a3b8;">MMSI</span> ' +
      (v.mmsi || "—") +
      (v.callSign ? ' &nbsp;·&nbsp; <span style="color:#94a3b8;">Call</span> ' + String(v.callSign).replace(/</g, "&lt;") : "") +
      "</div>" +
      '<div style="color:#e2e8f0;"><span style="color:#94a3b8;">Type</span> ' +
      String(type).replace(/</g, "&lt;") +
      "</div>" +
      '<div style="color:#e2e8f0;"><span style="color:#94a3b8;">SOG / COG</span> ' +
      sog +
      " / " +
      cog +
      "</div>" +
      '<div style="color:#e2e8f0;"><span style="color:#94a3b8;">Dest</span> ' +
      String(dest).replace(/</g, "&lt;") +
      "</div></div>"
    );
  }

  function clearAisMarkerPool(layer) {
    const host = layer || leafletAisLayer;
    for (const mmsi in aisMarkerByMmsi) {
      const entry = aisMarkerByMmsi[mmsi];
      try {
        if (host && entry && entry.marker) host.removeLayer(entry.marker);
      } catch (eRm) {}
    }
    aisMarkerByMmsi = Object.create(null);
  }

  function aisTriangleIcon(col, rot, px) {
    return L.divIcon({
      className: "ais-target-icon",
      html:
        '<div style="transform:rotate(' +
        rot +
        "deg);width:" +
        px +
        "px;height:" +
        px +
        'px;display:flex;align-items:center;justify-content:center;">' +
        '<svg viewBox="0 0 24 24" width="' +
        px +
        '" height="' +
        px +
        '">' +
        '<polygon points="12,2 20,20 12,16 4,20" fill="' +
        col +
        '" stroke="#0f172a" stroke-width="1.5"/>' +
        "</svg></div>",
      iconSize: [px, px],
      iconAnchor: [px / 2, px / 2]
    });
  }

  /**
   * Incremental AIS paint — triangles at every zoom, reuse by MMSI.
   * Markers still inside a padded viewport are kept even if this sample skipped them
   * (prevents the “vanish after pan/zoom reload” flicker).
   */
  function renderAisTargets(targets, map) {
    const layer = ensureLayer(map);
    const z = map && map.getZoom ? map.getZoom() : 3;
    const lod = aisLodForZoom(z);
    const list = Array.isArray(targets)
      ? sampleEvenlyByGrid(targets, Math.min(lod.maxMarkers, 1600), lod.cellDeg)
      : [];

    const px = lod.triPx || 12;
    const seen = Object.create(null);
    const interactive = z >= 4;
    let padBounds = null;
    try {
      padBounds = map && map.getBounds ? map.getBounds().pad(0.45) : null;
    } catch (eB) {}

    for (let i = 0; i < list.length; i++) {
      const v = list[i];
      const lat = Number(v.lat);
      const lonRaw = Number(v.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lonRaw)) continue;
      if (Math.abs(lat) > 90 || Math.abs(lonRaw) > 180) continue;
      const mmsi = String(v.mmsi || (lat.toFixed(3) + ":" + lonRaw.toFixed(3)));
      seen[mmsi] = 1;
      const lon = lonOnVisibleCopy(lonRaw, map);
      const col = shipColor(v.navStat, v.sog);
      const heading = Number(v.heading);
      const rot =
        Number.isFinite(heading) && heading < 360
          ? heading
          : Number(v.cog) < 360
            ? Number(v.cog)
            : 0;
      let entry = aisMarkerByMmsi[mmsi];

      // Migrate any leftover circleMarkers to triangles
      if (entry && entry.mode !== "tri") {
        try { layer.removeLayer(entry.marker); } catch (eSw) {}
        delete aisMarkerByMmsi[mmsi];
        entry = null;
      }

      if (!entry) {
        const m = L.marker([lat, lon], {
          icon: aisTriangleIcon(col, rot, px),
          keyboard: false,
          interactive: interactive
        });
        if (interactive) m.bindPopup(() => formatAisPopup(v), { maxWidth: 280, className: "ss-ais-popup" });
        layer.addLayer(m);
        aisMarkerByMmsi[mmsi] = { marker: m, mode: "tri", col: col, rot: rot, px: px };
      } else {
        try {
          entry.marker.setLatLng([lat, lon]);
          if (entry.col !== col || entry.rot !== rot || entry.px !== px) {
            entry.marker.setIcon(aisTriangleIcon(col, rot, px));
            entry.col = col;
            entry.rot = rot;
            entry.px = px;
          }
        } catch (eUp) {}
      }
    }

    for (const mmsi in aisMarkerByMmsi) {
      if (seen[mmsi]) continue;
      const entry = aisMarkerByMmsi[mmsi];
      // Keep on-screen targets that the LOD sample skipped this frame
      try {
        if (padBounds && entry && entry.marker && padBounds.contains(entry.marker.getLatLng())) {
          continue;
        }
      } catch (eKeep) {}
      try { layer.removeLayer(entry.marker); } catch (eDel) {}
      delete aisMarkerByMmsi[mmsi];
    }

    const badge = document.querySelector('.excel-tab[data-overlay="ais"] .excel-tab-badge');
    if (badge) {
      badge.textContent = "";
      badge.style.display = "none";
    }
  }

  /** Instant re-paint from cached REST+stream so pan/zoom never blanks the layer. */
  function paintAisFromCache(map) {
    if (!map || !(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
    try {
      const cached = getCombinedAisTargets(map);
      if (cached && cached.length) renderAisTargets(cached, map);
    } catch (e) {}
  }

  function getCombinedAisTargets(map) {
    const streamList = Object.values(aisStreamTargets);
    let combined = mergeByMmsi([lastRestTargets, streamList]);
    if (map) combined = filterToViewport(combined, map);
    const z = map && map.getZoom ? map.getZoom() : 3;
    const lod = aisLodForZoom(z);
    return sampleEvenlyByGrid(combined, lod.maxMarkers, lod.cellDeg);
  }

  function pruneStaleStreamTargets() {
    const cutoff = Date.now() - 30 * 60 * 1000;
    for (const mmsi in aisStreamTargets) {
      if (aisStreamTargets[mmsi].updatedAt < cutoff) {
        delete aisStreamTargets[mmsi];
      }
    }
  }

  function scheduleAisStreamRender() {
    if (aisRefreshBusy) return;
    if (aisStreamPendingRender) return;
    aisStreamPendingRender = true;
    clearTimeout(aisStreamRenderTimer);
    aisStreamRenderTimer = setTimeout(() => {
      aisStreamPendingRender = false;
      if (aisRefreshBusy) return;
      const map = window.leafletMap;
      if (!map || !(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
      // Skip stream repaint while the user is actively dragging/zooming.
      try {
        if (map.dragging && map.dragging._dragging) return;
        if (map._animatingZoom) return;
      } catch (eDrag) {}
      pruneStaleStreamTargets();
      const allInView = getCombinedAisTargets(map);
      renderAisTargets(allInView, map);
      if (aisLastPayload) {
        aisLastPayload.count = allInView.length;
      }
    }, 1800);
  }

  function getMapAisStreamBoxes(map) {
    if (!map) return [[[-85, -180], [85, 180]]];
    const b = map.getBounds();
    let s = Math.max(-85, Math.min(85, b.getSouth()));
    let n = Math.max(-85, Math.min(85, b.getNorth()));
    let w = b.getWest();
    let e = b.getEast();
    if (n <= s) n = s + 0.5;

    while (w < -180) w += 360;
    while (w > 180) w -= 360;
    while (e < -180) e += 360;
    while (e > 180) e -= 360;

    if (w > e) {
      return [
        [[Number(s.toFixed(4)), Number(w.toFixed(4))], [Number(n.toFixed(4)), 180]],
        [[Number(s.toFixed(4)), -180], [Number(n.toFixed(4)), Number(e.toFixed(4))]]
      ];
    }
    if (Math.abs(e - w) < 0.2) e = Math.min(180, w + 0.5);
    return [[[Number(s.toFixed(4)), Number(w.toFixed(4))], [Number(n.toFixed(4)), Number(e.toFixed(4))]]];
  }

  function connectAisStream() {
    connectLiveAisFeeds();
  }

  function connectLiveAisFeeds() {
    const map = window.leafletMap;
    if (!map || !(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) {
      disconnectAisStream();
      return;
    }
    connectAisStreamFeed();
    connectOpenSeaFeed();
  }

  function openCompatibleAisWs(url, feedId, onOpen) {
    let ws;
    try {
      ws = new WebSocket(url);
    } catch (e) {
      console.warn("[SetSail AIS] WS init error (" + feedId + "):", e);
      liveFeedStatus[feedId] = "ERROR";
      updateAisStreamStatusUI();
      return null;
    }
    ws.onopen = function () {
      liveFeedStatus[feedId] = "CONNECTED";
      updateAisStreamStatusUI();
      if (typeof onOpen === "function") onOpen(ws);
    };
    ws.onmessage = function (event) {
      try {
        const msg = JSON.parse(event.data);
        handleAisStreamMessage(msg, feedId);
      } catch (e) {}
    };
    ws.onerror = function () {
      liveFeedStatus[feedId] = "ERROR";
      updateAisStreamStatusUI();
    };
    return ws;
  }

  function connectAisStreamFeed() {
    const apiKey = getAisStreamApiKey();
    if (!apiKey) return;
    if (aisStreamWs && (aisStreamWs.readyState === WebSocket.OPEN || aisStreamWs.readyState === WebSocket.CONNECTING)) {
      sendAisStreamSubscription();
      return;
    }
    aisStreamWs = openCompatibleAisWs(AISSTREAM_WS_URL, "aisstream", function () {
      console.log("[SetSail AIS] Connected to AISStream.io");
      sendAisStreamSubscription();
    });
    if (!aisStreamWs) return;
    aisStreamWs.onclose = function () {
      liveFeedStatus.aisstream = "DISCONNECTED";
      updateAisStreamStatusUI();
      aisStreamWs = null;
      if (window.OVERLAY_STATES && window.OVERLAY_STATES.ais && getAisStreamApiKey()) {
        clearTimeout(aisStreamReconnectTimer);
        aisStreamReconnectTimer = setTimeout(connectAisStreamFeed, 6000);
      }
    };
  }

  function connectOpenSeaFeed() {
    if (openSeaFeedWs && (openSeaFeedWs.readyState === WebSocket.OPEN || openSeaFeedWs.readyState === WebSocket.CONNECTING)) {
      sendOpenSeaFeedSubscription();
      return;
    }
    openSeaFeedWs = openCompatibleAisWs(OPENSEAFEED_WS_URL, "openseafeed", function () {
      console.log("[SetSail AIS] Connected to OpenSeaFeed (community)");
      sendOpenSeaFeedSubscription();
    });
    if (!openSeaFeedWs) return;
    openSeaFeedWs.onclose = function () {
      liveFeedStatus.openseafeed = "DISCONNECTED";
      updateAisStreamStatusUI();
      openSeaFeedWs = null;
      if (window.OVERLAY_STATES && window.OVERLAY_STATES.ais) {
        clearTimeout(openSeaFeedReconnectTimer);
        openSeaFeedReconnectTimer = setTimeout(connectOpenSeaFeed, 8000);
      }
    };
  }

  function buildAisstreamStyleSub(apiKey) {
    const map = window.leafletMap;
    const boxes = getMapAisStreamBoxes(map);
    if (!boxes) return null;
    const sub = {
      BoundingBoxes: boxes,
      FilterMessageTypes: ["PositionReport", "StandardClassBPositionReport", "ShipStaticData"]
    };
    if (apiKey) sub.APIKey = apiKey;
    return sub;
  }

  function sendAisStreamSubscription() {
    if (!aisStreamWs || aisStreamWs.readyState !== WebSocket.OPEN) return;
    const sub = buildAisstreamStyleSub(getAisStreamApiKey());
    if (!sub || !sub.APIKey) return;
    try {
      aisStreamWs.send(JSON.stringify(sub));
    } catch (e) {
      console.warn("[SetSail AIS] AISStream subscribe error:", e);
    }
  }

  function sendOpenSeaFeedSubscription() {
    if (!openSeaFeedWs || openSeaFeedWs.readyState !== WebSocket.OPEN) return;
    // Free tier: omit APIKey (OpenSeaFeed docs)
    const sub = buildAisstreamStyleSub(null);
    if (!sub) return;
    try {
      openSeaFeedWs.send(JSON.stringify(sub));
    } catch (e) {
      console.warn("[SetSail AIS] OpenSeaFeed subscribe error:", e);
    }
  }

  function sendAisStreamSubscriptionAll() {
    sendAisStreamSubscription();
    sendOpenSeaFeedSubscription();
  }

  function disconnectAisStream() {
    clearTimeout(aisStreamReconnectTimer);
    clearTimeout(openSeaFeedReconnectTimer);
    clearTimeout(aisStreamRenderTimer);
    if (aisStreamWs) {
      try {
        aisStreamWs.onclose = null;
        aisStreamWs.close();
      } catch (e) {}
      aisStreamWs = null;
    }
    if (openSeaFeedWs) {
      try {
        openSeaFeedWs.onclose = null;
        openSeaFeedWs.close();
      } catch (e) {}
      openSeaFeedWs = null;
    }
    liveFeedStatus.aisstream = "DISCONNECTED";
    liveFeedStatus.openseafeed = "DISCONNECTED";
    updateAisStreamStatusUI();
  }

  function handleAisStreamMessage(msg, feedId) {
    if (!msg) return;
    const meta = msg.MetaData || {};
    const posMsg = (msg.Message && (msg.Message.PositionReport || msg.Message.StandardClassBPositionReport)) || {};
    const staticMsg = (msg.Message && msg.Message.ShipStaticData) || {};

    const mmsi = meta.MMSI || meta.MMSI_String || posMsg.UserID || staticMsg.UserID;
    if (!mmsi) return;
    const mmsiKey = String(mmsi);

    let lat = Number(meta.latitude != null ? meta.latitude : (meta.Latitude != null ? meta.Latitude : posMsg.Latitude));
    let lon = Number(meta.longitude != null ? meta.longitude : (meta.Longitude != null ? meta.Longitude : posMsg.Longitude));

    const prev = aisStreamTargets[mmsiKey] || {};

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      if (prev.lat != null && prev.lon != null) {
        lat = prev.lat;
        lon = prev.lon;
      } else {
        return;
      }
    }

    const sourceLabel =
      feedId === "openseafeed"
        ? "OpenSeaFeed (community)"
        : "AISStream.io (Live Satellite/Terrestrial)";

    const shipName = (meta.ShipName || staticMsg.Name || prev.name || ("MMSI " + mmsi)).trim();
    const callSign = (staticMsg.CallSign || prev.callSign || "").trim();
    const sog = posMsg.Sog != null ? posMsg.Sog : prev.sog;
    const cog = posMsg.Cog != null ? posMsg.Cog : prev.cog;
    const heading = posMsg.TrueHeading != null && posMsg.TrueHeading < 360 ? posMsg.TrueHeading : prev.heading;
    const navStat = posMsg.NavigationalStatus != null ? posMsg.NavigationalStatus : prev.navStat;
    const destination = (staticMsg.Destination || prev.destination || "").trim();
    const shipType = staticMsg.Type != null ? staticMsg.Type : prev.shipType;

    // One marker per MMSI — later frames overwrite position; static fields fill gaps
    const next = {
      mmsi: mmsi,
      lat: lat,
      lon: lon,
      name: shipName || prev.name,
      callSign: callSign || prev.callSign,
      sog: sog,
      cog: cog,
      heading: heading,
      navStat: navStat,
      destination: destination || prev.destination,
      shipType: shipType != null ? shipType : prev.shipType,
      source: prev.source && prev.source !== sourceLabel
        ? (String(prev.source).indexOf(sourceLabel) >= 0 ? prev.source : prev.source + " + " + sourceLabel)
        : sourceLabel,
      updatedAt: Date.now()
    };
    aisStreamTargets[mmsiKey] = next;

    scheduleAisStreamRender();
  }

  function updateAisStreamStatusUI() {
    const badge = document.getElementById("aisStreamStatusBadge");
    const label = document.getElementById("aisStreamStatusLabel");
    if (!badge) return;
    const a = liveFeedStatus.aisstream === "CONNECTED";
    const o = liveFeedStatus.openseafeed === "CONNECTED";
    if (a || o) {
      badge.textContent = a && o ? "CONNECTED (2 LIVE FEEDS)" : "CONNECTED (LIVE STREAM)";
      badge.style.background = "#10b981";
      if (label) {
        label.textContent = a && o
          ? "AISStream.io + OpenSeaFeed"
          : a
            ? "Live Global AISStream.io"
            : "OpenSeaFeed (community)";
      }
    } else if (getAisStreamApiKey()) {
      badge.textContent = "RECONNECTING";
      badge.style.background = "#0284c7";
      if (label) label.textContent = "AISStream.io + OpenSeaFeed";
    } else {
      badge.textContent = "COMMUNITY FALLBACK";
      badge.style.background = "#eab308";
      if (label) label.textContent = "OpenSeaFeed + Open Waters";
    }
  }

  async function fetchJson(url, headers) {
    const res = await fetch(url, { headers: headers || {} });
    if (!res.ok) throw new Error("HTTP " + res.status + " " + url);
    return res.json();
  }

  function mergeByMmsi(lists) {
    const map = Object.create(null);
    for (const list of lists) {
      if (!Array.isArray(list)) continue;
      for (const t of list) {
        if (!t) continue;
        const key = t.mmsi != null && t.mmsi !== ""
          ? String(t.mmsi)
          : (Number(t.lat).toFixed(3) + "," + Number(t.lon).toFixed(3));
        const prev = map[key];
        if (!prev) {
          map[key] = Object.assign({}, t);
          continue;
        }
        // Same MMSI from multiple feeds → keep one target; prefer fresher position, fill blanks
        const prevTs = Number(prev.updatedAt) || 0;
        const nextTs = Number(t.updatedAt) || 0;
        const preferNewPos = nextTs >= prevTs;
        const merged = Object.assign({}, prev);
        Object.keys(t).forEach((k) => {
          const v = t[k];
          if (v == null || v === "") return;
          if (k === "lat" || k === "lon" || k === "sog" || k === "cog" || k === "heading" || k === "navStat") {
            if (preferNewPos || prev[k] == null || prev[k] === "") merged[k] = v;
          } else if (k === "source") {
            const a = String(prev.source || "");
            const b = String(v);
            if (a && b && a !== b && a.indexOf(b) < 0) merged.source = a + " + " + b;
            else if (!a) merged.source = b;
          } else if (k === "updatedAt") {
            merged.updatedAt = Math.max(prevTs, nextTs) || nextTs || prevTs;
          } else if (prev[k] == null || prev[k] === "") {
            merged[k] = v;
          }
        });
        map[key] = merged;
      }
    }
    return Object.values(map);
  }

  function openWatersFeatureToTarget(f) {
    const g = f.geometry || {};
    const c = g.coordinates || [];
    const p = f.properties || {};
    return {
      mmsi: p.mmsi != null ? p.mmsi : p.mmsi_string,
      name: p.name || p.vessel_name || "",
      shipTypeName: p.ship_type || p.type_name || "",
      lat: Number(c[1]),
      lon: Number(c[0]),
      sog: p.speed != null ? p.speed : p.sog,
      cog: p.course != null ? p.course : p.cog,
      heading: p.heading,
      navStat: p.navigational_status != null ? p.navigational_status : p.status,
      destination: p.destination || "",
      source: "Open Waters"
    };
  }

  function digitrafficFeatureToTarget(f) {
    const g = f.geometry || {};
    const c = g.coordinates || [];
    const p = f.properties || {};
    const mmsi = p.mmsi;
    const meta = (mmsi && aisMetaByMmsi[mmsi]) || {};
    return {
      mmsi: mmsi,
      name: meta.name || "",
      shipTypeName: meta.shipType != null ? "Type " + meta.shipType : "",
      destination: meta.destination || "",
      lat: Number(c[1]),
      lon: Number(c[0]),
      sog: p.sog,
      cog: p.cog,
      heading: p.heading,
      navStat: p.navStat,
      source: "Digitraffic (Baltic)"
    };
  }

  function normalizeLon(lon) {
    let x = Number(lon);
    while (x < -180) x += 360;
    while (x > 180) x -= 360;
    return x;
  }

  function mapViewportBoxes(map) {
    const b = map.getBounds();
    const zoom = map.getZoom();
    const s = Math.max(-85, Math.min(85, b.getSouth()));
    const n = Math.max(-85, Math.min(85, b.getNorth()));
    const w = b.getWest();
    const e = b.getEast();

    const pickOverviewBoxes = (limit) => {
      const view = { minLat: s, maxLat: n, minLon: w, maxLon: e };
      const scored = OVERVIEW_SAMPLE_BOXES.map((box) => {
        const hit = bboxOverlaps(box, view);
        return { box, hit };
      });
      const preferred = scored.filter((x) => x.hit).map((x) => x.box);
      const rest = scored.filter((x) => !x.hit).map((x) => x.box);
      return preferred.concat(rest).slice(0, limit || 10);
    };

    if (e - w >= 355 || zoom <= 1) {
      return {
        mode: "world",
        zoom: zoom,
        skipLive: false,
        skipZones: false,
        boxes: pickOverviewBoxes(OVERVIEW_SAMPLE_BOXES.length)
      };
    }

    const spanLon = e - w;
    const spanLat = Math.max(0.01, n - s);
    const approxArea = spanLon * spanLat;

    if (approxArea > OW_AREA_CAP) {
      // Still fetch sample corridors so AIS tile shows traffic immediately (MarineTraffic-like density cue)
      return {
        mode: "overview",
        zoom: zoom,
        skipLive: false,
        skipZones: false,
        boxes: pickOverviewBoxes(8)
      };
    }

    const boxes = [];
    let curW = w;
    while (curW < e) {
      const nextW = Math.min(e, curW + 180);
      const bW = normalizeLon(curW);
      const bE = normalizeLon(nextW);
      if (bW <= bE) {
        boxes.push({ minLat: s, minLon: bW, maxLat: n, maxLon: bE });
      } else {
        boxes.push({ minLat: s, minLon: bW, maxLat: n, maxLon: 180 });
        boxes.push({ minLat: s, minLon: -180, maxLat: n, maxLon: bE });
      }
      curW = nextW;
    }
    return {
      mode: "viewport",
      zoom: zoom,
      skipLive: false,
      skipZones: zoom < MIN_ZOOM_ZONES,
      boxes: boxes.slice(0, OW_MAX_TILES)
    };
  }

  function overlapsBaltic(boxes) {
    if (!boxes || !boxes.length) return false;
    const baltic = { minLat: 53.0, maxLat: 66.5, minLon: 9.0, maxLon: 30.5 };
    return boxes.some((b) => bboxOverlaps(b, baltic));
  }

  function bboxOverlaps(a, b) {
    return (
      a.minLat <= b.maxLat &&
      a.maxLat >= b.minLat &&
      a.minLon <= b.maxLon &&
      a.maxLon >= b.minLon
    );
  }

  function zoneAreaSqDeg(bbox) {
    if (!bbox || bbox.length < 4) return 9999;
    const [minLon, minLat, maxLon, maxLat] = bbox;
    return Math.abs(maxLon - minLon) * Math.abs(maxLat - minLat);
  }

  async function loadZonesManifest() {
    if (zonesManifest) return zonesManifest;
    try {
      zonesManifest = await fetchJson(ZONES_INDEX);
    } catch (e) {
      zonesManifest = { zones: [] };
    }
    return zonesManifest;
  }

  async function loadZoneFile(file) {
    if (!file) return [];
    if (zoneCache[file]) return zoneCache[file];
    try {
      const data = await fetchJson("ais/zones/" + file);
      const list = Array.isArray(data) ? data : data.vessels || [];
      zoneCache[file] = list;
      return list;
    } catch (e) {
      return [];
    }
  }

  async function loadZonesForMap(map, zoom) {
    const z = zoom != null ? zoom : map.getZoom();
    if (z < MIN_ZOOM_ZONES) return [];
    const lod = aisLodForZoom(z);

    const b = map.getBounds();
    const vp = {
      minLat: b.getSouth(),
      maxLat: b.getNorth(),
      minLon: b.getWest(),
      maxLon: b.getEast()
    };
    const man = await loadZonesManifest();
    const candidates = [];
    for (const entry of man.zones || []) {
      const [w, s, e, n] = entry.bbox || [];
      if (w == null) continue;
      const zb = { minLat: s, maxLat: n, minLon: w, maxLon: e };
      if (!bboxOverlaps(vp, zb)) continue;
      const area = zoneAreaSqDeg(entry.bbox);
      // At overview skip ultra-dense regional packs unless we take a tiny sample from each ocean
      if (area > 40 && z < MIN_ZOOM_DENSE_ZONES && z > 3) continue;
      candidates.push(entry);
    }
    // Prefer even ocean coverage: sort by id hash, not by European order in the manifest
    candidates.sort((a, b) => String(a.id || a.file).localeCompare(String(b.id || b.file)));
    // Interleave so Baltic is not always first among loaded files
    const capFiles = candidates.slice(0, lod.maxZones);
    const loaded = await Promise.all(
      capFiles.map(async (entry) => {
        const list = await loadZoneFile(entry.file);
        return sampleEvenlyByGrid(list, lod.maxPerZone, Math.max(lod.cellDeg, 2));
      })
    );
    return sampleEvenlyByGrid(loaded.flat(), lod.maxMarkers, lod.cellDeg);
  }

  async function loadOpenWatersBoxes(boxes) {
    // Open Waters expects bbox=minLat,minLon,maxLat,maxLon (min_latitude=… params no longer work).
    const fetches = boxes.map(async (box) => {
      const bbox =
        Number(box.minLat).toFixed(4) +
        "," +
        Number(box.minLon).toFixed(4) +
        "," +
        Number(box.maxLat).toFixed(4) +
        "," +
        Number(box.maxLon).toFixed(4);
      try {
        const gj = await fetchJson(OPENWATERS_VESSELS + "?bbox=" + bbox, {
          Accept: "application/json"
        });
        const feats = gj.features || [];
        return feats.map(openWatersFeatureToTarget);
      } catch (e) {
        return [];
      }
    });
    const parts = await Promise.all(fetches);
    return mergeByMmsi(parts);
  }

  async function loadDigitrafficMeta() {
    try {
      const arr = await fetchJson(DIGITRAFFIC_VES, {
        Accept: "application/json",
        "Digitraffic-User": "SetSailMarineSuite/AIS"
      });
      if (Array.isArray(arr)) {
        arr.forEach((item) => {
          if (!item.mmsi) return;
          aisMetaByMmsi[item.mmsi] = {
            name: item.name || "",
            shipType: item.shipType,
            destination: item.destination || "",
            callSign: item.callSign || ""
          };
        });
      }
    } catch (e) {}
  }

  async function loadLiveDigitraffic() {
    const geo = await fetchJson(DIGITRAFFIC_LOC, {
      Accept: "application/json",
      "Digitraffic-User": "SetSailMarineSuite/AIS"
    });
    if (!Object.keys(aisMetaByMmsi).length) await loadDigitrafficMeta();
    return (geo.features || [])
      .map(digitrafficFeatureToTarget)
      .filter((t) => Number.isFinite(t.lat) && Number.isFinite(t.lon));
  }

  /** Place lon on the world copy nearest the current map center (seamless ±180°). */
  function lonOnVisibleCopy(lon, map) {
    let x = Number(lon);
    if (!Number.isFinite(x) || !map || typeof map.getCenter !== "function") return x;
    const c = map.getCenter().lng;
    while (x - c > 180) x -= 360;
    while (x - c < -180) x += 360;
    return x;
  }

  function filterToViewport(targets, map) {
    const b = map.getBounds();
    return targets.filter((t) => {
      try {
        const lat = Number(t.lat);
        const lon = Number(t.lon);
        if (b.contains([lat, lon])) return true;
        if (b.contains([lat, lon + 360])) return true;
        if (b.contains([lat, lon - 360])) return true;
        return false;
      } catch (e) {
        return true;
      }
    });
  }

  async function refreshAisOverlay(opts) {
    const map = window.leafletMap;
    if (!map) return;
    if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
    if (aisRefreshBusy && !(opts && opts.force)) {
      aisRenderQueued = true;
      return;
    }
    const showSpinner = !!(opts && opts.spinner);
    const seq = ++aisRefreshSeq;
    aisRefreshBusy = true;
    let spinnerTimer = null;
    let spinnerShown = false;
    if (showSpinner && typeof window.setOverlayTileLoading === "function") {
      // Delay spinner so short fetches don't lock the UI feel.
      spinnerTimer = setTimeout(function () {
        spinnerShown = true;
        window.setOverlayTileLoading("ais", true);
      }, 500);
    }

    const plan = mapViewportBoxes(map);
    let targets = [];
    try {
      let live = [];
      if (!plan.skipLive && plan.boxes && plan.boxes.length) {
        try {
          live = await loadOpenWatersBoxes(plan.boxes);
        } catch (e) {}
      }
      if (seq !== aisRefreshSeq) {
        paintAisFromCache(map);
        return;
      }
      let digi = [];
      const zNow = plan.zoom != null ? plan.zoom : map.getZoom();
      const lod = aisLodForZoom(zNow);
      // Digitraffic only when zoomed into / near Baltic — never flood world overview
      const balticFocused = (() => {
        try {
          const bb = map.getBounds();
          const span = Math.abs(bb.getEast() - bb.getWest()) * Math.abs(bb.getNorth() - bb.getSouth());
          if (span > 800) return false;
          const vp = {
            minLat: bb.getSouth(),
            maxLat: bb.getNorth(),
            minLon: bb.getWest(),
            maxLon: bb.getEast()
          };
          return bboxOverlaps(vp, { minLat: 53.0, maxLat: 66.5, minLon: 9.0, maxLon: 30.5 });
        } catch (e) {
          return false;
        }
      })();
      if (lod.digi && balticFocused && zNow >= MIN_ZOOM_DIGITRAFFIC) {
        try {
          digi = await loadLiveDigitraffic();
          digi = sampleEvenlyByGrid(digi, Math.min(500, lod.maxMarkers), lod.cellDeg);
        } catch (e) {}
      }
      if (seq !== aisRefreshSeq) {
        paintAisFromCache(map);
        return;
      }
      if (live.length && (plan.mode === "overview" || plan.mode === "world")) {
        live = sampleEvenlyByGrid(live, lod.maxMarkers, lod.cellDeg);
      }
      let rest = mergeByMmsi([live, digi]);
      if (plan.mode === "viewport") {
        rest = filterToViewport(rest, map);
      }

      if (!plan.skipZones) {
        const zoneAll = await loadZonesForMap(map, zNow);
        if (seq !== aisRefreshSeq) {
          paintAisFromCache(map);
          return;
        }
        const zFiltered = plan.mode === "viewport" ? filterToViewport(zoneAll, map) : zoneAll;
        rest = mergeByMmsi([rest, zFiltered]);
      }

      rest = sampleEvenlyByGrid(rest, lod.maxMarkers * 2, lod.cellDeg);
      // Merge into cache — never wipe previous REST hits with an empty fetch
      // (that was blanking triangles right after pan/zoom).
      if (rest.length) {
        lastRestTargets = mergeByMmsi([lastRestTargets, rest]);
        // Soft-cap cache so memory stays bounded
        if (lastRestTargets.length > lod.maxMarkers * 4) {
          lastRestTargets = sampleEvenlyByGrid(lastRestTargets, lod.maxMarkers * 3, lod.cellDeg);
        }
      }
      targets = getCombinedAisTargets(map);
      // Yield to the browser before the marker pass so zoom/pan stay responsive.
      await new Promise(function (r) {
        if (typeof requestAnimationFrame === "function") requestAnimationFrame(function () { r(); });
        else setTimeout(r, 0);
      });
      if (seq !== aisRefreshSeq) {
        paintAisFromCache(map);
        return;
      }
      renderAisTargets(targets, map);
    } catch (e) {
      console.warn("[SetSail AIS] refresh failed", e);
      paintAisFromCache(map);
    } finally {
      if (spinnerTimer) clearTimeout(spinnerTimer);
      if (spinnerShown && typeof window.setOverlayTileLoading === "function") {
        window.setOverlayTileLoading("ais", false);
      }
      // Only the latest refresh may clear the busy flag
      if (seq === aisRefreshSeq) {
        aisRefreshBusy = false;
        if (aisRenderQueued) {
          aisRenderQueued = false;
          setTimeout(function () { refreshAisOverlay({ spinner: false }); }, 50);
        }
      }
    }

    aisLastPayload = {
      at: new Date().toISOString(),
      count: targets.length,
      mode: plan.mode,
      area: plan.area,
      zoom: plan.zoom
    };
    return targets.length;
  }

  function startAisPolling() {
    stopAisPolling();
    refreshAisOverlay({ spinner: true, force: true });
    connectAisStream();
    aisTimer = setInterval(() => refreshAisOverlay({ spinner: false }), AIS_REFRESH_MS);
    const map = window.leafletMap;
    if (map && !map._setsailAisMoveHooked) {
      map._setsailAisMoveHooked = true;
      map.on("moveend zoomend", () => {
        if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
        // Reposition from cache immediately — don't wait for REST or markers vanish.
        paintAisFromCache(map);
        clearTimeout(aisMoveTimer);
        aisMoveTimer = setTimeout(() => {
          refreshAisOverlay({ spinner: false });
          sendAisStreamSubscriptionAll();
        }, 750);
      });
      // During active pan/zoom keep triangles glued to the viewport from cache.
      if (!map._setsailAisMovePaintHooked) {
        map._setsailAisMovePaintHooked = true;
        let movePaintTick = 0;
        map.on("move", () => {
          if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
          const now = Date.now();
          if (now - movePaintTick < 120) return;
          movePaintTick = now;
          paintAisFromCache(map);
        });
      }
    }
  }

  function stopAisPolling() {
    aisRefreshSeq++;
    aisRefreshBusy = false;
    aisRenderQueued = false;
    if (aisTimer) {
      clearInterval(aisTimer);
      aisTimer = null;
    }
    clearTimeout(aisMoveTimer);
    disconnectAisStream();
    if (leafletAisLayer) {
      clearAisMarkerPool(leafletAisLayer);
      leafletAisLayer.clearLayers();
      const map = window.leafletMap;
      if (map && map.hasLayer(leafletAisLayer)) map.removeLayer(leafletAisLayer);
    }
  }

  function showAisInfoModal() {
    const modal = document.getElementById("aisOverlayInfoModal");
    if (!modal) {
      const n = aisLastPayload && aisLastPayload.count;
      if (typeof showSetSailToast === "function") {
        showSetSailToast(
          "AIS live feeds: AISStream.io + OpenSeaFeed (MMSI-deduped)." + (n != null ? " Targets: " + n : ""),
          "info"
        );
      }
      return;
    }

    const input = document.getElementById("inputAisStreamApiKey");
    if (input) {
      // Never prefill the shared key into the password field.
      input.value = getPersonalAisStreamApiKey();
      input.placeholder = isUsingSharedAisStreamKey()
        ? "Optional override — leave blank for SetSail shared key"
        : "Personal AISStream.io API key";
    }

    const note = document.getElementById("aisStreamKeyStatusNote");
    if (note) {
      if (isUsingSharedAisStreamKey()) {
        note.style.display = "block";
        note.textContent = "✓ Using SetSail shared AISStream.io key (live stream on by default).";
      } else {
        note.style.display = "block";
        note.textContent = "✓ Personal API key stored in this browser (overrides shared key).";
      }
    }

    const countEl = document.getElementById("aisTargetsCountSummary");
    if (countEl) {
      const streamCount = Object.keys(aisStreamTargets).length;
      const total = (aisLastPayload && aisLastPayload.count) || streamCount;
      countEl.textContent = "Targets in view: " + total + " (Live stream: " + streamCount + ")";
    }

    updateAisStreamStatusUI();
    modal.classList.add("open");
  }

  function initAisModalEvents() {
    const closeBtn1 = document.getElementById("aisOverlayModalClose");
    const closeBtn2 = document.getElementById("aisOverlayModalCloseBtn");
    const saveBtn = document.getElementById("btnSaveAisStreamKey");
    const modal = document.getElementById("aisOverlayInfoModal");

    if (closeBtn1 && modal) closeBtn1.addEventListener("click", () => modal.classList.remove("open"));
    if (closeBtn2 && modal) closeBtn2.addEventListener("click", () => modal.classList.remove("open"));
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });
    }

    /* API key field removed — SetSail shared key only. */
    if (saveBtn) saveBtn.style.display = "none";
    try { localStorage.removeItem(AISSTREAM_KEY_STORAGE); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAisModalEvents);
  } else {
    initAisModalEvents();
  }

  window.refreshAisOverlay = refreshAisOverlay;
  window.startAisPolling = startAisPolling;
  window.stopAisPolling = stopAisPolling;
  window.showAisInfoModal = showAisInfoModal;
  window.AIS_REFRESH_MS = AIS_REFRESH_MS;
  /** Snapshot of live AIS targets for SetRoute Core A hazard costing (not UI). */
  window.getAisTargetsSnapshot = function getAisTargetsSnapshot(limit) {
    const out = [];
    const cap = Math.max(50, Math.min(4000, Number(limit) || 800));
    try {
      const stream = aisStreamTargets || Object.create(null);
      Object.keys(stream).forEach(function (mmsi) {
        if (out.length >= cap) return;
        const v = stream[mmsi];
        if (!v) return;
        const lat = Number(v.lat != null ? v.lat : v.latitude);
        const lon = Number(v.lon != null ? v.lon : v.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
        out.push({
          mmsi: v.mmsi || mmsi,
          lat: lat,
          lon: lon,
          sog: v.sog != null ? Number(v.sog) : null,
          cog: v.cog != null ? Number(v.cog) : null,
          name: v.name || v.shipName || null,
          source: "aisstream"
        });
      });
      if (out.length < cap && aisLastPayload && Array.isArray(aisLastPayload.vessels)) {
        aisLastPayload.vessels.forEach(function (v) {
          if (out.length >= cap || !v) return;
          const lat = Number(v.lat != null ? v.lat : v.latitude);
          const lon = Number(v.lon != null ? v.lon : v.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
          out.push({
            mmsi: v.mmsi,
            lat: lat,
            lon: lon,
            sog: v.sog != null ? Number(v.sog) : null,
            cog: v.cog != null ? Number(v.cog) : null,
            name: v.name || null,
            source: v.source || "ais"
          });
        });
      }
    } catch (e) {}
    return out;
  };
})();
