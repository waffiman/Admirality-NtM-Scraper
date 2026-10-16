/**
 * SetSail AIS Overlay — live vessel positions (non-exportable)
 *
 * Live: Open Waters open AIS (ais.openwaters.io) for the map viewport
 *       + Digitraffic open AIS when Baltic/FI is in view.
 * Snapshot: ais.json from GitHub Actions (Digitraffic + worldwide corridor tiles).
 *
 * MarineTraffic / VesselFinder are NOT scraped (ToS forbid automated extraction).
 * Refresh: ~90s while ON + debounced moveend.
 */
(function () {
  const AIS_REFRESH_MS = 90 * 1000;
  const AIS_SNAPSHOT = "ais.json";
  const OPENWATERS_VESSELS = "https://ais.openwaters.io/v1/vessels";
  const DIGITRAFFIC_LOC = "https://meri.digitraffic.fi/api/ais/v1/locations";
  const DIGITRAFFIC_VES = "https://meri.digitraffic.fi/api/ais/v1/vessels";
  /** Anonymous Open Waters area cap (square degrees). */
  const OW_AREA_CAP = 95;
  const OW_MAX_TILES = 6;

  let leafletAisLayer = null;
  let aisTimer = null;
  let aisMetaByMmsi = Object.create(null);
  let aisLastPayload = null;
  let aisMoveTimer = null;
  let aisSnapshotCache = null;

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

    const zoom = map.getZoom ? map.getZoom() : 5;
    const max = zoom >= 8 ? 6000 : zoom >= 5 ? 3500 : 2000;
    let list = targets;
    if (list.length > max) {
      // Prefer moving ships when sampling
      const moving = list.filter((v) => Number(v.sog) >= 0.5);
      const rest = list.filter((v) => Number(v.sog) < 0.5);
      list = moving.concat(rest).slice(0, max);
    }

    list.forEach((v) => {
      const lat = Number(v.lat);
      const lon = Number(v.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
      const col = shipColor(v.navStat, v.sog);
      const heading = Number(v.heading);
      const rot =
        Number.isFinite(heading) && heading < 360
          ? heading
          : Number(v.cog) < 360
            ? Number(v.cog)
            : 0;
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

    // AIS dock tile: no target count (user request)
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
      // Prefer named / newer-looking records
      if ((!prev.name && t.name) || (Number(t.sog) || 0) > (Number(prev.sog) || 0)) {
        by[key] = Object.assign({}, prev, t);
      }
    });
    return Object.keys(by).map((k) => by[k]);
  }

  function openWatersFeatureToTarget(f) {
    const p = f.properties || {};
    const c = (f.geometry && f.geometry.coordinates) || [];
    const nav = p.nav_status != null ? p.nav_status : p.navStat;
    return {
      mmsi: p.mmsi,
      lat: c[1],
      lon: c[0],
      sog: p.sog,
      cog: p.cog,
      heading: p.heading,
      navStat: nav,
      name: p.name || "",
      destination: p.destination || "",
      shipType: p.type || p.shipType || "",
      callSign: p.callsign || "",
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
    let minLat = b.getSouth();
    let maxLat = b.getNorth();
    let minLon = b.getWest();
    let maxLon = b.getEast();
    // Clamp latitude
    minLat = Math.max(-85, Math.min(85, minLat));
    maxLat = Math.max(-85, Math.min(85, maxLat));
    if (maxLat <= minLat) maxLat = minLat + 0.5;

    const dLat = maxLat - minLat;
    let dLon = maxLon - minLon;
    if (dLon <= 0) dLon += 360;
    const area = dLat * dLon;

    // Very zoomed out: caller uses snapshot instead of live tiles
    if (area > 2500) return { mode: "snapshot", boxes: [], area };

    if (area <= OW_AREA_CAP) {
      return {
        mode: "live",
        boxes: [[minLat, normalizeLon(minLon), maxLat, normalizeLon(maxLon)]],
        area
      };
    }

    // Tile viewport into cells of ~sqrt(cap) degrees
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
        let o0 = minLon + j * stepLon;
        let o1 = o0 + stepLon;
        boxes.push([a0, normalizeLon(o0), a1, normalizeLon(o1)]);
      }
      if (boxes.length >= OW_MAX_TILES) break;
    }
    return { mode: "live", boxes, area, tiled: true };
  }

  function overlapsBaltic(boxes) {
    // Rough Baltic/FI box
    const bMinLat = 53,
      bMaxLat = 66,
      bMinLon = 9,
      bMaxLon = 31;
    return boxes.some(([a0, o0, a1, o1]) => {
      return !(a1 < bMinLat || a0 > bMaxLat || o1 < bMinLon || o0 > bMaxLon);
    });
  }

  async function loadOpenWatersBoxes(boxes) {
    const out = [];
    for (const box of boxes) {
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
    }
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
    } catch (e) {
      /* optional */
    }
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

  async function loadSnapshotAis() {
    if (aisSnapshotCache && Date.now() - aisSnapshotCache.at < 10 * 60 * 1000) {
      return aisSnapshotCache.targets;
    }
    const geo = await fetchJson(AIS_SNAPSHOT + "?t=" + Date.now());
    let targets = [];
    if (Array.isArray(geo.targets)) targets = geo.targets;
    else if (geo.features) {
      targets = (geo.features || []).map((f) => {
        const p = f.properties || {};
        const c = (f.geometry && f.geometry.coordinates) || [];
        return {
          mmsi: p.mmsi,
          lat: c[1],
          lon: c[0],
          sog: p.sog,
          cog: p.cog,
          heading: p.heading,
          navStat: p.navStat || p.nav_status,
          name: p.name || "",
          destination: p.destination || "",
          shipType: p.shipType || p.type || "",
          source: geo.source || "ais.json snapshot"
        };
      });
    }
    aisSnapshotCache = { at: Date.now(), targets };
    return targets;
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
      if (plan.mode === "snapshot") {
        const snap = await loadSnapshotAis();
        targets = filterToViewport(snap, map);
        if (targets.length < 50) targets = snap;
      } else {
        const live = await loadOpenWatersBoxes(plan.boxes);
        let digi = [];
        if (overlapsBaltic(plan.boxes)) {
          try {
            digi = await loadLiveDigitraffic();
          } catch (e) {
            /* optional densify */
          }
        }
        targets = mergeByMmsi([live, digi]);
        if (targets.length < 30) {
          try {
            const snap = await loadSnapshotAis();
            targets = mergeByMmsi([targets, filterToViewport(snap, map)]);
          } catch (e2) {
            /* ignore */
          }
        }
      }
    } catch (e) {
      try {
        targets = await loadSnapshotAis();
      } catch (e2) {
        console.warn("[SetSail AIS] all feeds failed", e, e2);
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
        aisMoveTimer = setTimeout(() => refreshAisOverlay(), 700);
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
        "AIS: Open Waters (worldwide, live in view) + Digitraffic (Baltic). " +
          "MT/VF not scraped. View-only, not exportable. ~90s refresh." +
          (n != null ? " Now showing ~" + n + " targets." : ""),
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
