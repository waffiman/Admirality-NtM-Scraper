/**
 * SetSail AIS Overlay — AISStream.io Real-Time WebSocket + Open Waters & Digitraffic
 * Live global satellite & terrestrial vessel traffic engine.
 */
(function () {
  const AIS_REFRESH_MS = 60 * 1000;
  const ZONES_INDEX = "ais/zones/index.json";
  const OPENWATERS_VESSELS = "https://ais.openwaters.io/v1/vessels";
  const DIGITRAFFIC_LOC = "https://meri.digitraffic.fi/api/ais/v1/locations";
  const DIGITRAFFIC_VES = "https://meri.digitraffic.fi/api/ais/v1/vessels";
  const AISSTREAM_WS_URL = "wss://stream.aisstream.io/v0/stream";
  const AISSTREAM_KEY_STORAGE = "setsail_aisstream_api_key";
  // Shared SetSail key — all users connect by default; optional localStorage override.
  const DEFAULT_AISSTREAM_API_KEY = "d340d8078f597170e53ff92ddd194609b2d5fc8b";

  // Wide viewport still loads live AIS — targets appear without extreme zoom-in.
  // OW_AREA_CAP is spanLon*spanLat (deg²); ~2800 ≈ continental / multi-sea view.
  const OW_AREA_CAP = 2800;
  const OW_MAX_TILES = 24;
  const ABS_MARKER_CAP = 15000;
  const MIN_ZOOM_ZONES = 2;
  const MIN_ZOOM_DENSE_ZONES = 3;
  const MIN_ZOOM_DIGITRAFFIC = 2;

  let leafletAisLayer = null;
  let aisTimer = null;
  let aisMetaByMmsi = Object.create(null);
  let aisLastPayload = null;
  let aisMoveTimer = null;
  let zonesManifest = null;
  let zoneCache = Object.create(null);
  let aisRefreshSeq = 0;

  // AISStream.io WebSocket State
  let aisStreamWs = null;
  let aisStreamTargets = Object.create(null);
  let aisStreamReconnectTimer = null;
  let aisStreamRenderTimer = null;
  let aisStreamPendingRender = false;
  let lastRestTargets = [];

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
    const type = v.shipTypeName || v.shipType || v.type || "AIS vessel";
    const src = v.source || "AIS";
    return (
      '<div style="min-width:210px;font-family:Segoe UI,sans-serif;font-size:12px;line-height:1.45;color:#1e293b;">' +
      '<div style="font-weight:800;color:#ea4c25;margin-bottom:4px;display:flex;align-items:center;gap:5px;">🚢 ' + name + "</div>" +
      "<div><b>MMSI:</b> " + (v.mmsi || "—") + (v.callSign ? " · <b>Call:</b> " + v.callSign : "") + "</div>" +
      "<div><b>Type:</b> " + type + "</div>" +
      "<div><b>SOG / COG:</b> " + sog + " / " + cog + "</div>" +
      "<div><b>Destination:</b> " + dest + "</div>" +
      '<div style="margin-top:5px;padding-top:3px;border-top:1px solid #e2e8f0;font-size:10px;color:#64748b;">Source: ' + src + "</div></div>"
    );
  }

  function renderAisTargets(targets, map) {
    const layer = ensureLayer(map);
    layer.clearLayers();
    if (!Array.isArray(targets) || !targets.length) return;

    let list = targets;
    if (list.length > ABS_MARKER_CAP) {
      const step = Math.ceil(list.length / ABS_MARKER_CAP);
      const sampled = [];
      for (let i = 0; i < list.length; i += step) sampled.push(list[i]);
      list = sampled;
    }

    const useCanvasDots = list.length > 700;
    list.forEach((v) => {
      const lat = Number(v.lat);
      const lon = Number(v.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
      const col = shipColor(v.navStat, v.sog);
      if (useCanvasDots) {
        const m = L.circleMarker([lat, lon], {
          radius: Number(v.sog) >= 0.5 ? 3 : 2.2,
          color: "#0f172a",
          weight: 0.5,
          fillColor: col,
          fillOpacity: 0.9
        });
        m.bindPopup(() => formatAisPopup(v), { maxWidth: 280 });
        layer.addLayer(m);
        return;
      }
      const heading = Number(v.heading);
      const rot =
        Number.isFinite(heading) && heading < 360
          ? heading
          : Number(v.cog) < 360
            ? Number(v.cog)
            : 0;
      const icon = L.divIcon({
        className: "ais-target-icon",
        html:
          '<div style="transform:rotate(' +
          rot +
          'deg);width:14px;height:14px;display:flex;align-items:center;justify-content:center;">' +
          '<svg viewBox="0 0 24 24" width="14" height="14">' +
          '<polygon points="12,2 20,20 12,16 4,20" fill="' +
          col +
          '" stroke="#0f172a" stroke-width="1.5"/>' +
          "</svg></div>",
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      const m = L.marker([lat, lon], { icon, keyboard: false });
      m.bindPopup(() => formatAisPopup(v), { maxWidth: 280 });
      layer.addLayer(m);
    });

    const badge = document.querySelector('.excel-tab[data-overlay="ais"] .excel-tab-badge');
    if (badge) {
      badge.textContent = list.length > 0 ? String(list.length) : "";
      badge.style.display = list.length > 0 ? "inline-block" : "none";
    }
  }

  function getCombinedAisTargets(map) {
    const streamList = Object.values(aisStreamTargets);
    const combined = mergeByMmsi([lastRestTargets, streamList]);
    return filterToViewport(combined, map);
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
    if (aisStreamPendingRender) return;
    aisStreamPendingRender = true;
    clearTimeout(aisStreamRenderTimer);
    aisStreamRenderTimer = setTimeout(() => {
      aisStreamPendingRender = false;
      const map = window.leafletMap;
      if (!map || !(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
      pruneStaleStreamTargets();
      const allInView = getCombinedAisTargets(map);
      renderAisTargets(allInView, map);
      if (aisLastPayload) {
        aisLastPayload.count = allInView.length;
      }
    }, 1200);
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
    const apiKey = getAisStreamApiKey();
    const map = window.leafletMap;
    if (!apiKey || !map || !(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) {
      disconnectAisStream();
      return;
    }
    if (aisStreamWs && (aisStreamWs.readyState === WebSocket.OPEN || aisStreamWs.readyState === WebSocket.CONNECTING)) {
      sendAisStreamSubscription();
      return;
    }

    try {
      aisStreamWs = new WebSocket(AISSTREAM_WS_URL);
    } catch (e) {
      console.warn("[SetSail AIS] AISStream WS init error:", e);
      return;
    }

    aisStreamWs.onopen = function () {
      console.log("[SetSail AIS] Connected to AISStream.io live stream");
      updateAisStreamStatusUI("CONNECTED");
      sendAisStreamSubscription();
    };

    aisStreamWs.onmessage = function (event) {
      try {
        const msg = JSON.parse(event.data);
        handleAisStreamMessage(msg);
      } catch (e) {}
    };

    aisStreamWs.onerror = function (err) {
      console.warn("[SetSail AIS] AISStream WS error:", err);
      updateAisStreamStatusUI("ERROR");
    };

    aisStreamWs.onclose = function () {
      updateAisStreamStatusUI("DISCONNECTED");
      if (window.OVERLAY_STATES && window.OVERLAY_STATES.ais && getAisStreamApiKey()) {
        clearTimeout(aisStreamReconnectTimer);
        aisStreamReconnectTimer = setTimeout(connectAisStream, 6000);
      }
    };
  }

  function sendAisStreamSubscription() {
    if (!aisStreamWs || aisStreamWs.readyState !== WebSocket.OPEN) return;
    const apiKey = getAisStreamApiKey();
    const map = window.leafletMap;
    const boxes = getMapAisStreamBoxes(map);
    if (!apiKey || !boxes) return;

    try {
      // Do NOT set FiltersShipMMSI here — it AND-restricts the stream to those MMSIs only.
      const sub = {
        APIKey: apiKey,
        BoundingBoxes: boxes,
        FilterMessageTypes: ["PositionReport", "StandardClassBPositionReport", "ShipStaticData"]
      };
      aisStreamWs.send(JSON.stringify(sub));
    } catch (e) {
      console.warn("[SetSail AIS] send subscription error:", e);
    }
  }

  function disconnectAisStream() {
    clearTimeout(aisStreamReconnectTimer);
    clearTimeout(aisStreamRenderTimer);
    if (aisStreamWs) {
      try {
        aisStreamWs.onclose = null;
        aisStreamWs.close();
      } catch (e) {}
      aisStreamWs = null;
    }
    updateAisStreamStatusUI("DISCONNECTED");
  }

  function handleAisStreamMessage(msg) {
    if (!msg) return;
    const meta = msg.MetaData || {};
    const posMsg = (msg.Message && (msg.Message.PositionReport || msg.Message.StandardClassBPositionReport)) || {};
    const staticMsg = (msg.Message && msg.Message.ShipStaticData) || {};

    const mmsi = meta.MMSI || meta.MMSI_String || posMsg.UserID || staticMsg.UserID;
    if (!mmsi) return;

    let lat = Number(meta.latitude != null ? meta.latitude : (meta.Latitude != null ? meta.Latitude : posMsg.Latitude));
    let lon = Number(meta.longitude != null ? meta.longitude : (meta.Longitude != null ? meta.Longitude : posMsg.Longitude));

    const prev = aisStreamTargets[mmsi] || {};

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      if (prev.lat != null && prev.lon != null) {
        lat = prev.lat;
        lon = prev.lon;
      } else {
        return;
      }
    }

    const shipName = (meta.ShipName || staticMsg.Name || prev.name || ("MMSI " + mmsi)).trim();
    const callSign = (staticMsg.CallSign || prev.callSign || "").trim();
    const sog = posMsg.Sog != null ? posMsg.Sog : prev.sog;
    const cog = posMsg.Cog != null ? posMsg.Cog : prev.cog;
    const heading = posMsg.TrueHeading != null && posMsg.TrueHeading < 360 ? posMsg.TrueHeading : prev.heading;
    const navStat = posMsg.NavigationalStatus != null ? posMsg.NavigationalStatus : prev.navStat;
    const destination = (staticMsg.Destination || prev.destination || "").trim();
    const shipType = staticMsg.Type != null ? staticMsg.Type : prev.shipType;

    aisStreamTargets[mmsi] = {
      mmsi: mmsi,
      lat: lat,
      lon: lon,
      name: shipName,
      callSign: callSign,
      sog: sog,
      cog: cog,
      heading: heading,
      navStat: navStat,
      destination: destination,
      shipType: shipType,
      source: "AISStream.io (Live Satellite/Terrestrial)",
      updatedAt: Date.now()
    };

    scheduleAisStreamRender();
  }

  function updateAisStreamStatusUI(status) {
    const badge = document.getElementById("aisStreamStatusBadge");
    const label = document.getElementById("aisStreamStatusLabel");
    if (!badge) return;
    const key = getAisStreamApiKey();
    if (status === "CONNECTED") {
      badge.textContent = "CONNECTED (LIVE STREAM)";
      badge.style.background = "#10b981";
      if (label) label.textContent = "Live Global AISStream.io";
    } else if (key) {
      badge.textContent = "RECONNECTING";
      badge.style.background = "#0284c7";
      if (label) label.textContent = "Live Global AISStream.io";
    } else {
      badge.textContent = "COMMUNITY FALLBACK ONLY";
      badge.style.background = "#eab308";
      if (label) label.textContent = "Open Waters Community Feed";
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
        const key = t.mmsi ? String(t.mmsi) : t.lat.toFixed(3) + "," + t.lon.toFixed(3);
        map[key] = Object.assign({}, map[key] || {}, t);
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

    if (e - w >= 355 || zoom <= 1) {
      return {
        mode: "world",
        zoom: zoom,
        skipLive: true,
        skipZones: zoom < MIN_ZOOM_ZONES,
        boxes: []
      };
    }

    const spanLon = e - w;
    const spanLat = Math.max(0.01, n - s);
    const approxArea = spanLon * spanLat;

    if (approxArea > OW_AREA_CAP) {
      return {
        mode: "overview",
        zoom: zoom,
        skipLive: true,
        skipZones: zoom < MIN_ZOOM_ZONES,
        boxes: []
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

    const b = map.getBounds();
    const vp = {
      minLat: b.getSouth(),
      maxLat: b.getNorth(),
      minLon: b.getWest(),
      maxLon: b.getEast()
    };
    const man = await loadZonesManifest();
    const files = [];
    for (const entry of man.zones || []) {
      const [w, s, e, n] = entry.bbox || [];
      if (w == null) continue;
      const zb = { minLat: s, maxLat: n, minLon: w, maxLon: e };
      if (!bboxOverlaps(vp, zb)) continue;
      const area = zoneAreaSqDeg(entry.bbox);
      if (area > 40 && z < MIN_ZOOM_DENSE_ZONES) continue;
      files.push(entry.file);
    }
    const capFiles = files.slice(0, 16);
    const loaded = await Promise.all(capFiles.map((f) => loadZoneFile(f)));
    return loaded.flat();
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

  function filterToViewport(targets, map) {
    const b = map.getBounds();
    return targets.filter((t) => {
      try {
        return b.contains([Number(t.lat), Number(t.lon)]);
      } catch (e) {
        return true;
      }
    });
  }

  async function refreshAisOverlay() {
    const map = window.leafletMap;
    if (!map) return;
    if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
    const seq = ++aisRefreshSeq;
    if (typeof window.setOverlayTileLoading === "function") {
      window.setOverlayTileLoading("ais", true);
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
      if (seq !== aisRefreshSeq) return;
      let digi = [];
      // Use map bounds (not only OW boxes) so Baltic AIS still loads in overview when boxes are empty.
      const balticHit =
        overlapsBaltic(plan.boxes) ||
        (() => {
          try {
            const bb = map.getBounds();
            return bboxOverlaps(
              {
                minLat: bb.getSouth(),
                maxLat: bb.getNorth(),
                minLon: bb.getWest(),
                maxLon: bb.getEast()
              },
              { minLat: 53.0, maxLat: 66.5, minLon: 9.0, maxLon: 30.5 }
            );
          } catch (e) {
            return false;
          }
        })();
      const zNow = plan.zoom != null ? plan.zoom : map.getZoom();
      if (balticHit && zNow >= MIN_ZOOM_DIGITRAFFIC) {
        try {
          digi = await loadLiveDigitraffic();
        } catch (e) {}
      }
      if (seq !== aisRefreshSeq) return;
      let rest = filterToViewport(mergeByMmsi([live, digi]), map);

      if (!plan.skipZones) {
        const zoneAll = await loadZonesForMap(map, plan.zoom || map.getZoom());
        if (seq !== aisRefreshSeq) return;
        rest = filterToViewport(mergeByMmsi([rest, zoneAll]), map);
      }

      lastRestTargets = rest;
      targets = getCombinedAisTargets(map);
      renderAisTargets(targets, map);
    } catch (e) {
      console.warn("[SetSail AIS] refresh failed", e);
    }

    aisLastPayload = {
      at: new Date().toISOString(),
      count: targets.length,
      mode: plan.mode,
      area: plan.area,
      zoom: plan.zoom
    };
    if (typeof window.setOverlayTileLoading === "function") {
      window.setOverlayTileLoading("ais", false);
    }
    return targets.length;
  }

  function startAisPolling() {
    stopAisPolling();
    refreshAisOverlay();
    connectAisStream();
    aisTimer = setInterval(() => refreshAisOverlay(), AIS_REFRESH_MS);
    const map = window.leafletMap;
    if (map && !map._setsailAisMoveHooked) {
      map._setsailAisMoveHooked = true;
      map.on("moveend zoomend", () => {
        if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
        clearTimeout(aisMoveTimer);
        aisMoveTimer = setTimeout(() => {
          refreshAisOverlay();
          sendAisStreamSubscription();
        }, 450);
      });
    }
  }

  function stopAisPolling() {
    aisRefreshSeq++;
    if (aisTimer) {
      clearInterval(aisTimer);
      aisTimer = null;
    }
    disconnectAisStream();
    if (leafletAisLayer) {
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
          "AISStream.io: Live global satellite/terrestrial stream active." + (n != null ? " Targets: " + n : ""),
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

    updateAisStreamStatusUI(aisStreamWs && aisStreamWs.readyState === WebSocket.OPEN ? "CONNECTED" : "DISCONNECTED");
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
})();
