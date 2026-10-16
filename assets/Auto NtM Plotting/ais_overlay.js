/**
 * SetSail AIS Overlay — all targets in view (non-exportable)
 *
 * Live: Open Waters (viewport tiles) + Digitraffic when Baltic in view
 * Fallback/coverage: ais/zones/*.json ocean-sea snapshots (ALL ships in intersecting zones)
 *
 * No MarineTraffic / VesselFinder scrape. Refresh ~90s + moveend.
 */
(function () {
  const AIS_REFRESH_MS = 90 * 1000;
  const ZONES_INDEX = "ais/zones/index.json";
  const OPENWATERS_VESSELS = "https://ais.openwaters.io/v1/vessels";
  const DIGITRAFFIC_LOC = "https://meri.digitraffic.fi/api/ais/v1/locations";
  const DIGITRAFFIC_VES = "https://meri.digitraffic.fi/api/ais/v1/vessels";
  const OW_AREA_CAP = 95;
  const OW_MAX_TILES = 16;
  /** Hard browser safety only — not a "priority" sample. */
  const ABS_MARKER_CAP = 20000;

  let leafletAisLayer = null;
  let aisTimer = null;
  let aisMetaByMmsi = Object.create(null);
  let aisLastPayload = null;
  let aisMoveTimer = null;
  let zonesManifest = null;
  let zoneCache = Object.create(null);

  function ensureLayer(map) {
    if (!leafletAisLayer) {
      leafletAisLayer = L.layerGroup();
      window.leafletAisLayer = leafletAisLayer;
    }
    if (map && !map.hasLayer(leafletAisLayer)) leafletAisLayer.addTo(map);
    return leafletAisLayer;
  }

  function shipColor(navStat, sog) {
    if (navStat === 1 || navStat === 5) return "#94a3b8";
    if (Number(sog) >= 0.5) return "#22d3ee";
    return "#38bdf8";
  }

  function formatAisPopup(v) {
    const name = v.name || v.shipName || ("MMSI " + v.mmsi);
    const dest = v.destination || "—";
    const sog = v.sog != null ? Number(v.sog).toFixed(1) + " kn" : "—";
    const cog = v.cog != null && Number(v.cog) < 360 ? Math.round(Number(v.cog)) + "°" : "—";
    const type = v.shipTypeName || v.shipType || v.type || "AIS target";
    const src = v.source || "AIS";
    return (
      '<div style="min-width:200px;font-family:Segoe UI,sans-serif;font-size:12px;line-height:1.45;">' +
      '<div style="font-weight:800;color:#0ea5e9;margin-bottom:4px;">🚢 ' + name + "</div>" +
      "<div><b>MMSI:</b> " + (v.mmsi || "—") + "</div>" +
      "<div><b>Type:</b> " + type + "</div>" +
      "<div><b>SOG / COG:</b> " + sog + " / " + cog + "</div>" +
      "<div><b>Destination:</b> " + dest + "</div>" +
      '<div style="margin-top:4px;font-size:10px;color:#64748b;">Source: ' + src + " · not exportable</div></div>"
    );
  }

  function renderAisTargets(targets, map) {
    const layer = ensureLayer(map);
    layer.clearLayers();
    if (!Array.isArray(targets) || !targets.length) return;

    let list = targets;
    if (list.length > ABS_MARKER_CAP) {
      // Uniform stride — every Nth ship, NOT priority filtering
      const step = Math.ceil(list.length / ABS_MARKER_CAP);
      const sampled = [];
      for (let i = 0; i < list.length; i += step) sampled.push(list[i]);
      list = sampled;
    }

    const useCanvasDots = list.length > 800;
    list.forEach((v) => {
      const lat = Number(v.lat);
      const lon = Number(v.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
      const col = shipColor(v.navStat, v.sog);
      if (useCanvasDots) {
        const m = L.circleMarker([lat, lon], {
          radius: Number(v.sog) >= 0.5 ? 3.2 : 2.4,
          color: "#0f172a",
          weight: 0.6,
          fillColor: col,
          fillOpacity: 0.92
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
          '<div style="width:14px;height:14px;transform:rotate(' +
          rot +
          'deg);transform-origin:center center;"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2 L20 20 L12 16 L4 20 Z" fill="' +
          col +
          '" stroke="#0f172a" stroke-width="1.2"/></svg></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      const m = L.marker([lat, lon], { icon, keyboard: false });
      m.bindPopup(() => formatAisPopup(v), { maxWidth: 280 });
      layer.addLayer(m);
    });

    const badge = document.querySelector('.excel-tab[data-overlay="ais"] .excel-tab-badge');
    if (badge) {
      badge.textContent = "";
      badge.style.display = "none";
    }
  }

  async function fetchJson(url, headers) {
    const resp = await fetch(url, {
      headers: headers || { Accept: "application/json" },
      cache: "no-store"
    });
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    return resp.json();
  }

  function mergeByMmsi(lists) {
    const by = Object.create(null);
    lists.flat().forEach((t) => {
      if (!t || t.mmsi == null) return;
      const key = String(t.mmsi);
      const prev = by[key];
      if (!prev) {
        by[key] = t;
        return;
      }
      if ((!prev.name && t.name) || (Number(t.sog) || 0) > (Number(prev.sog) || 0)) {
        by[key] = Object.assign({}, prev, t);
      }
    });
    return Object.keys(by).map((k) => by[k]);
  }

  function openWatersFeatureToTarget(f) {
    const p = f.properties || {};
    const c = (f.geometry && f.geometry.coordinates) || [];
    return {
      mmsi: p.mmsi,
      lat: c[1],
      lon: c[0],
      sog: p.sog,
      cog: p.cog,
      heading: p.heading,
      navStat: p.nav_status != null ? p.nav_status : p.navStat,
      name: p.name || "",
      destination: p.destination || "",
      shipType: p.type || p.shipType || "",
      source: "Open Waters AIS (" + (p.source || "community") + ")"
    };
  }

  function digitrafficFeatureToTarget(f) {
    const p = f.properties || {};
    const c = (f.geometry && f.geometry.coordinates) || [];
    const mmsi = p.mmsi;
    const meta = aisMetaByMmsi[mmsi] || {};
    return {
      mmsi,
      lat: c[1],
      lon: c[0],
      sog: p.sog,
      cog: p.cog,
      heading: p.heading,
      navStat: p.navStat,
      name: meta.name || p.name || "",
      destination: meta.destination || "",
      shipType: meta.shipType || "",
      source: "Digitraffic open AIS (Baltic/FI)"
    };
  }

  function normalizeLon(lon) {
    while (lon > 180) lon -= 360;
    while (lon < -180) lon += 360;
    return lon;
  }

  function mapViewportBoxes(map) {
    const b = map.getBounds();
    let minLat = Math.max(-85, Math.min(85, b.getSouth()));
    let maxLat = Math.max(-85, Math.min(85, b.getNorth()));
    if (maxLat <= minLat) maxLat = minLat + 0.5;
    let minLon = b.getWest();
    let maxLon = b.getEast();
    const dLat = maxLat - minLat;
    let dLon = maxLon - minLon;
    if (dLon <= 0) dLon += 360;
    const area = dLat * dLon;

    if (area <= OW_AREA_CAP) {
      return {
        mode: "live",
        boxes: [[minLat, normalizeLon(minLon), maxLat, normalizeLon(maxLon)]],
        area
      };
    }
    const side = Math.sqrt(OW_AREA_CAP);
    const boxes = [];
    const nLat = Math.max(1, Math.ceil(dLat / side));
    const nLon = Math.max(1, Math.ceil(dLon / side));
    const stepLat = dLat / nLat;
    const stepLon = dLon / nLon;
    for (let i = 0; i < nLat; i++) {
      for (let j = 0; j < nLon; j++) {
        if (boxes.length >= OW_MAX_TILES) break;
        const a0 = minLat + i * stepLat;
        const a1 = Math.min(maxLat, a0 + stepLat);
        const o0 = minLon + j * stepLon;
        boxes.push([a0, normalizeLon(o0), a1, normalizeLon(o0 + stepLon)]);
      }
      if (boxes.length >= OW_MAX_TILES) break;
    }
    return { mode: "live", boxes, area, tiled: true };
  }

  function overlapsBaltic(boxes) {
    return boxes.some(([a0, o0, a1, o1]) => !(a1 < 53 || a0 > 66 || o1 < 9 || o0 > 31));
  }

  function bboxOverlaps(a, b) {
    // a,b = [minLat,minLon,maxLat,maxLon]
    const a0 = a[0], o0 = a[1], a1 = a[2], o1 = a[3];
    const b0 = b[0], p0 = b[1], b1 = b[2], p1 = b[3];
    if (a1 < b0 || a0 > b1) return false;
    // simplify lon (no dateline math for zone files that wrap — treat as overlap if either wraps world)
    if (o0 <= o1 && p0 <= p1) return !(o1 < p0 || o0 > p1);
    return true;
  }

  async function loadZonesManifest() {
    if (zonesManifest) return zonesManifest;
    zonesManifest = await fetchJson(ZONES_INDEX + "?t=" + Date.now());
    return zonesManifest;
  }

  async function loadZoneFile(file) {
    if (zoneCache[file] && Date.now() - zoneCache[file].at < 15 * 60 * 1000) {
      return zoneCache[file].targets;
    }
    const geo = await fetchJson(file + "?t=" + Date.now());
    const targets = Array.isArray(geo.targets) ? geo.targets : [];
    zoneCache[file] = { at: Date.now(), targets };
    return targets;
  }

  async function loadZonesForMap(map) {
    const man = await loadZonesManifest();
    const b = map.getBounds();
    const view = [b.getSouth(), b.getWest(), b.getNorth(), b.getEast()];
    const lists = [];
    for (const z of man.zones || []) {
      if (!z.bbox || !bboxOverlaps(view, z.bbox)) continue;
      try {
        lists.push(await loadZoneFile(z.file));
      } catch (e) {
        console.warn("[SetSail AIS] zone fail", z.id, e);
      }
    }
    return mergeByMmsi(lists);
  }

  async function loadOpenWatersBoxes(boxes) {
    const out = [];
    await Promise.all(
      boxes.map(async (box) => {
        const [minLat, minLon, maxLat, maxLon] = box;
        const url =
          OPENWATERS_VESSELS +
          "?bbox=" +
          [minLat, minLon, maxLat, maxLon].map((n) => Number(n).toFixed(4)).join(",");
        try {
          const geo = await fetchJson(url, {
            Accept: "application/geo+json, application/json",
            "User-Agent": "SetSailMarineSuite/AIS"
          });
          (geo.features || []).forEach((f) => {
            const t = openWatersFeatureToTarget(f);
            if (Number.isFinite(t.lat) && Number.isFinite(t.lon)) out.push(t);
          });
        } catch (e) {
          console.warn("[SetSail AIS] Open Waters tile failed", box, e);
        }
      })
    );
    return out;
  }

  async function loadDigitrafficMeta() {
    try {
      const vessels = await fetchJson(DIGITRAFFIC_VES, {
        Accept: "application/json",
        "Digitraffic-User": "SetSailMarineSuite/AIS"
      });
      const arr = Array.isArray(vessels) ? vessels : vessels.vessels || vessels.data || [];
      arr.forEach((v) => {
        const mmsi = v.mmsi || v.MMSI;
        if (!mmsi) return;
        aisMetaByMmsi[mmsi] = {
          name: v.name || v.shipName || "",
          destination: v.destination || v.dest || "",
          shipType: v.shipType || v.shipTypeName || v.type || "",
          callSign: v.callSign || ""
        };
      });
    } catch (e) { /* optional */ }
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
    if (typeof window.setOverlayTileLoading === "function") {
      window.setOverlayTileLoading("ais", true);
    }

    let targets = [];
    const plan = mapViewportBoxes(map);
    try {
      const zoneAll = await loadZonesForMap(map);
      let live = [];
      try {
        live = await loadOpenWatersBoxes(plan.boxes);
      } catch (e) { /* zones still apply */ }
      let digi = [];
      if (overlapsBaltic(plan.boxes)) {
        try {
          digi = await loadLiveDigitraffic();
        } catch (e) { /* optional */ }
      }
      // Merge: live densifies zones; show ALL in current view
      targets = filterToViewport(mergeByMmsi([zoneAll, live, digi]), map);
      // If view filter emptied (dateline edge), keep merged set
      if (!targets.length) targets = mergeByMmsi([zoneAll, live, digi]);
    } catch (e) {
      console.warn("[SetSail AIS] refresh failed", e);
      try {
        targets = filterToViewport(await loadZonesForMap(map), map);
      } catch (e2) {
        console.warn("[SetSail AIS] zones failed", e2);
      }
    }

    aisLastPayload = {
      at: new Date().toISOString(),
      count: targets.length,
      mode: plan.mode,
      area: plan.area
    };
    renderAisTargets(targets, map);
    if (typeof window.setOverlayTileLoading === "function") {
      window.setOverlayTileLoading("ais", false);
    }
    return targets.length;
  }

  function startAisPolling() {
    stopAisPolling();
    refreshAisOverlay();
    aisTimer = setInterval(() => refreshAisOverlay(), AIS_REFRESH_MS);
    const map = window.leafletMap;
    if (map && !map._setsailAisMoveHooked) {
      map._setsailAisMoveHooked = true;
      map.on("moveend", () => {
        if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
        clearTimeout(aisMoveTimer);
        aisMoveTimer = setTimeout(() => refreshAisOverlay(), 500);
      });
    }
  }

  function stopAisPolling() {
    if (aisTimer) {
      clearInterval(aisTimer);
      aisTimer = null;
    }
    if (leafletAisLayer) {
      leafletAisLayer.clearLayers();
      const map = window.leafletMap;
      if (map && map.hasLayer(leafletAisLayer)) map.removeLayer(leafletAisLayer);
    }
  }

  function showAisInfoModal() {
    const n = aisLastPayload && aisLastPayload.count;
    if (typeof showSetSailToast === "function") {
      showSetSailToast(
        "AIS: all vessels in view (ocean-zone snapshots + live Open Waters; Digitraffic densifies Baltic). Not MT/VF. Not exportable." +
          (n != null ? " In view now: " + n + "." : ""),
        "info"
      );
    }
  }

  window.refreshAisOverlay = refreshAisOverlay;
  window.startAisPolling = startAisPolling;
  window.stopAisPolling = stopAisPolling;
  window.showAisInfoModal = showAisInfoModal;
  window.AIS_REFRESH_MS = AIS_REFRESH_MS;
})();
