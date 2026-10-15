/**
 * SetSail AIS Overlay — live vessel positions (non-exportable)
 *
 * Primary feed: Digitraffic Marine open AIS (Finland / Baltic — official, keyless).
 * VesselFinder / MarineTraffic cannot legally/technically supply ALL global AIS via scrape;
 * those sites are commercial and anti-bot protected. Snapshot also served as ais.json
 * from the GitHub Actions scrape cycle for offline / CORS fallback.
 *
 * Refresh: every 90s while overlay is ON + on map moveend (debounced).
 */
(function () {
  const AIS_REFRESH_MS = 90 * 1000;
  const AIS_SNAPSHOT = "ais.json";
  const DIGITRAFFIC_LOC = "https://meri.digitraffic.fi/api/ais/v1/locations";
  const DIGITRAFFIC_VES = "https://meri.digitraffic.fi/api/ais/v1/vessels";

  let leafletAisLayer = null;
  let aisTimer = null;
  let aisMetaByMmsi = Object.create(null);
  let aisLastPayload = null;
  let aisMoveTimer = null;

  function ensureLayer(map) {
    if (!leafletAisLayer) {
      leafletAisLayer = L.layerGroup();
      window.leafletAisLayer = leafletAisLayer;
    }
    if (map && !map.hasLayer(leafletAisLayer)) {
      leafletAisLayer.addTo(map);
    }
    return leafletAisLayer;
  }

  function shipColor(navStat, sog) {
    if (navStat === 1 || navStat === 5) return "#94a3b8"; // anchored / moored
    if (Number(sog) >= 0.5) return "#22d3ee";
    return "#38bdf8";
  }

  function formatAisPopup(v) {
    const name = v.name || v.shipName || ("MMSI " + v.mmsi);
    const dest = v.destination || "—";
    const sog = v.sog != null ? Number(v.sog).toFixed(1) + " kn" : "—";
    const cog = v.cog != null && Number(v.cog) < 360 ? Math.round(Number(v.cog)) + "°" : "—";
    const type = v.shipTypeName || v.shipType || "AIS target";
    const src = v.source || "AIS";
    return `
      <div style="min-width:200px;font-family:Segoe UI,sans-serif;font-size:12px;line-height:1.45;">
        <div style="font-weight:800;color:#0ea5e9;margin-bottom:4px;">🚢 ${name}</div>
        <div><b>MMSI:</b> ${v.mmsi || "—"}</div>
        <div><b>Type:</b> ${type}</div>
        <div><b>SOG / COG:</b> ${sog} / ${cog}</div>
        <div><b>Destination:</b> ${dest}</div>
        <div style="margin-top:4px;font-size:10px;color:#64748b;">Source: ${src} · not exportable</div>
      </div>`;
  }

  function renderAisTargets(targets, map) {
    const layer = ensureLayer(map);
    layer.clearLayers();
    if (!Array.isArray(targets) || !targets.length) return;

    // Cluster-light: at most ~2500 markers for performance
    const max = 2500;
    const list = targets.length > max ? targets.slice(0, max) : targets;
    list.forEach((v) => {
      const lat = Number(v.lat);
      const lon = Number(v.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
      const col = shipColor(v.navStat, v.sog);
      const heading = Number(v.heading);
      const rot = Number.isFinite(heading) && heading < 360 ? heading : (Number(v.cog) < 360 ? Number(v.cog) : 0);
      const icon = L.divIcon({
        className: "ais-target-icon",
        html: `<div style="width:14px;height:14px;transform:rotate(${rot}deg);transform-origin:center center;">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2 L20 20 L12 16 L4 20 Z" fill="${col}" stroke="#0f172a" stroke-width="1.2"/></svg>
        </div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      const m = L.marker([lat, lon], { icon, keyboard: false });
      m.bindPopup(() => formatAisPopup(v), { maxWidth: 280 });
      layer.addLayer(m);
    });

    const badge = document.querySelector('.excel-tab[data-overlay="ais"] .excel-tab-badge');
    if (badge) badge.textContent = String(list.length);
  }

  async function fetchJson(url, headers) {
    const resp = await fetch(url, {
      headers: headers || { Accept: "application/json" },
      cache: "no-store"
    });
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    return resp.json();
  }

  async function loadDigitrafficMeta() {
    try {
      const vessels = await fetchJson(DIGITRAFFIC_VES, {
        Accept: "application/json",
        "Digitraffic-User": "SetSailMarineSuite/AIS",
        "Accept-Encoding": "gzip"
      });
      const arr = Array.isArray(vessels) ? vessels : (vessels.vessels || vessels.data || []);
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
    } catch (e) {
      /* meta optional */
    }
  }

  function featuresToTargets(geojson, sourceLabel) {
    const feats = (geojson && geojson.features) || [];
    return feats.map((f) => {
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
        source: sourceLabel
      };
    }).filter((t) => Number.isFinite(t.lat) && Number.isFinite(t.lon));
  }

  async function loadLiveDigitraffic() {
    const geo = await fetchJson(DIGITRAFFIC_LOC, {
      Accept: "application/json",
      "Digitraffic-User": "SetSailMarineSuite/AIS",
      "Accept-Encoding": "gzip"
    });
    if (!Object.keys(aisMetaByMmsi).length) {
      await loadDigitrafficMeta();
    }
    return featuresToTargets(geo, "Digitraffic open AIS (Baltic/FI)");
  }

  async function loadSnapshotAis() {
    const geo = await fetchJson(AIS_SNAPSHOT + "?t=" + Date.now());
    if (Array.isArray(geo.targets)) return geo.targets;
    if (geo.features) return featuresToTargets(geo, geo.source || "ais.json snapshot");
    return [];
  }

  async function refreshAisOverlay(force) {
    const map = window.leafletMap;
    if (!map) return;
    if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;

    if (typeof window.setOverlayTileLoading === "function") {
      window.setOverlayTileLoading("ais", true);
    }
    let targets = [];
    let errLive = null;
    try {
      targets = await loadLiveDigitraffic();
    } catch (e) {
      errLive = e;
      try {
        targets = await loadSnapshotAis();
      } catch (e2) {
        console.warn("[SetSail AIS] live+snapshot failed", errLive, e2);
      }
    }
    aisLastPayload = { at: new Date().toISOString(), count: targets.length };
    renderAisTargets(targets, map);
    if (typeof window.setOverlayTileLoading === "function") {
      window.setOverlayTileLoading("ais", false);
    }
    return targets.length;
  }

  function startAisPolling() {
    stopAisPolling();
    refreshAisOverlay(true);
    aisTimer = setInterval(() => refreshAisOverlay(false), AIS_REFRESH_MS);
    const map = window.leafletMap;
    if (map && !map._setsailAisMoveHooked) {
      map._setsailAisMoveHooked = true;
      map.on("moveend", () => {
        if (!(window.OVERLAY_STATES && window.OVERLAY_STATES.ais)) return;
        clearTimeout(aisMoveTimer);
        aisMoveTimer = setTimeout(() => refreshAisOverlay(false), 700);
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
    if (typeof showSetSailToast === "function") {
      showSetSailToast(
        "AIS: Digitraffic open feed (Baltic/FI). VesselFinder/MarineTraffic cannot supply all-global AIS via scrape. Overlay is view-only (not exportable). Refresh ~90s.",
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
