/**
 * Full 1-to-1 Google-account cloud synchronization for SetSail.
 * Syncs My Vessel (including live GPS broadcast from phone to PC, AIS link, DR state, and Clear),
 * Active Route, Saved Routes Library (with chat transcripts & deletions), DR active route rails,
 * Warnings/NtM overrides, Wi-Fi AIS profile, Gyro deviation table, SetNews profile, and UI/Chart settings.
 */
(function (global) {
  "use strict";

  var API = "/api/user-profile";
  var PUSH_DEBOUNCE_MS = 1200;
  var GPS_PUSH_MS = 4000;
  var PULL_MS = 5000;
  var ROUTE_KEYS = ["setsail_active_route", "setsail_route_v1", "setsail_active_route_v1"];

  var initialPullDone = false;
  var syncInFlight = 0;
  var applyingRemote = false;

  function getAuthUser() {
    try {
      return JSON.parse(localStorage.getItem("setsail_auth_user_v1") || "null");
    } catch (e) {
      return null;
    }
  }

  function makeFallbackJwt(user) {
    if (!user || (!user.email && !user.sub)) return "";
    try {
      var hdr = btoa(JSON.stringify({ alg: "none", typ: "JWT" }))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      var pay = btoa(
        unescape(
          encodeURIComponent(
            JSON.stringify({
              sub: String(user.sub || user.email),
              email: String(user.email || ""),
              iss: "setsail-session"
            })
          )
        )
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      return hdr + "." + pay + ".setsail";
    } catch (e) {
      return "session";
    }
  }

  function getToken() {
    try {
      var tok =
        sessionStorage.getItem("setsail_google_auth_token") ||
        localStorage.getItem("setsail_google_auth_token") ||
        "";
      if (tok) return tok;
      var u = getAuthUser();
      if (u && (u.email || u.sub)) return makeFallbackJwt(u);
      return "";
    } catch (e) {
      return "";
    }
  }

  function buildAuthHeaders(extra) {
    var token = getToken();
    var user = getAuthUser() || {};
    var h = Object.assign({}, extra || {});
    if (token) h.Authorization = "Bearer " + token;
    if (user.email) h["X-SetSail-User-Email"] = String(user.email);
    if (user.sub) h["X-SetSail-User-Sub"] = String(user.sub);
    return h;
  }

  function parseStampMs(raw) {
    if (!raw) return 0;
    if (typeof raw === "number") return isFinite(raw) ? raw : 0;
    var n = Date.parse(String(raw));
    return isFinite(n) ? n : 0;
  }

  function getLocalStamp(key) {
    try {
      return Number(localStorage.getItem(key)) || 0;
    } catch (e) {
      return 0;
    }
  }

  function setLocalStamp(key, ts) {
    try {
      if (ts) localStorage.setItem(key, String(ts));
      else localStorage.removeItem(key);
    } catch (e) {}
  }

  function vesselStampMs(v) {
    if (!v || typeof v !== "object") return 0;
    return Math.max(
      parseStampMs(v.updatedAt),
      parseStampMs(v.gpsLastFixAt),
      parseStampMs(v.aisLastFixAt),
      parseStampMs(v.syncedAt),
      getLocalStamp("setsail_vessel_updated_at_v1")
    );
  }

  function routeStampMs(r) {
    if (!r || typeof r !== "object") return 0;
    return Math.max(
      parseStampMs(r.updatedAt),
      parseStampMs(r.savedAt),
      parseStampMs(r.syncedAt),
      parseStampMs(r.createdAt)
    );
  }

  function sanitizeVesselForCloud(vessel) {
    if (!vessel || typeof vessel !== "object") return null;
    try {
      if (typeof global.vesselStateForAccountSync === "function") {
        return global.vesselStateForAccountSync(vessel);
      }
    } catch (e) {}
    try {
      if (typeof global.vesselStateForDurableStore === "function") {
        return global.vesselStateForDurableStore(vessel);
      }
    } catch (e2) {}
    return vessel;
  }

  function readLocalRoute() {
    try {
      if (
        global.activeRouteData &&
        Array.isArray(global.activeRouteData.waypoints) &&
        global.activeRouteData.waypoints.length > 0
      ) {
        return global.activeRouteData;
      }
    } catch (e0) {}
    for (var i = 0; i < ROUTE_KEYS.length; i++) {
      try {
        var raw = localStorage.getItem(ROUTE_KEYS[i]);
        if (!raw) continue;
        var r = JSON.parse(raw);
        if (r && Array.isArray(r.waypoints) && r.waypoints.length > 0) {
          return r;
        }
      } catch (e1) {}
    }
    return null;
  }

  function readLocalRoutesLibrary() {
    try {
      if (typeof global.getSavedRoutesLibrary === "function") {
        return global.getSavedRoutesLibrary();
      }
      var raw = localStorage.getItem("setsail_routes_library_v1");
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function readDeletedRouteIds() {
    try {
      var raw = localStorage.getItem("setsail_deleted_route_ids_v1");
      var obj = raw ? JSON.parse(raw) : {};
      return obj && typeof obj === "object" ? obj : {};
    } catch (e) {
      return {};
    }
  }

  function collectLocal() {
    var vessel = null;
    var wifi = null;
    var ntmOverrides = null;
    var gyroDevTable = undefined;
    var newsProfile = null;
    var drActiveRouteId = null;
    var drHandoff = null;
    var drLastRails = null;

    try {
      if (global.userVessel) vessel = global.userVessel;
      else vessel = JSON.parse(localStorage.getItem("setsail_vessel_state_v2") || "null");
    } catch (e) {}
    try {
      wifi = JSON.parse(localStorage.getItem("setsail_wifi_ais_profile_v1") || "null");
    } catch (e3) {}
    try {
      ntmOverrides = JSON.parse(localStorage.getItem("setsail_ntm_overrides_v1") || "null");
    } catch (e4) {}
    try {
      var gRaw = localStorage.getItem("gyro_calc_dev_table_v1");
      if (gRaw != null) gyroDevTable = JSON.parse(gRaw);
    } catch (e5) {}
    try {
      newsProfile = JSON.parse(localStorage.getItem("setsail_news_user_profile_v1") || "null");
    } catch (e6) {}
    try {
      drActiveRouteId = localStorage.getItem("setsail_dr_active_route_id_v1") || null;
      var hoRaw = localStorage.getItem("setsail_dr_route_handoff_v1");
      drHandoff = hoRaw ? JSON.parse(hoRaw) : null;
      var lrRaw = localStorage.getItem("setsail_dr_last_rails_wps_v1");
      drLastRails = lrRaw ? JSON.parse(lrRaw) : null;
    } catch (e7) {}

    var route = readLocalRoute();
    var routesLibrary = readLocalRoutesLibrary();
    var deletedRouteIds = readDeletedRouteIds();

    var cleanVessel = sanitizeVesselForCloud(vessel);
    var vStamp = cleanVessel ? vesselStampMs(cleanVessel) : 0;
    var vCleared = getLocalStamp("setsail_vessel_cleared_at_v1");

    var rStamp = route ? Math.max(routeStampMs(route), getLocalStamp("setsail_active_route_updated_at_v1")) : 0;
    var rCleared = getLocalStamp("setsail_route_cleared_at_v1");

    var settings = {
      routeBufferNm: Number(global.ROUTE_CORRIDOR_BUFFER_NM || localStorage.getItem("setsail_route_buffer_nm") || 25),
      routeCorridorFilter: Boolean(global.ROUTE_CORRIDOR_FILTER_ENABLED),
      overlayStates: global.OVERLAY_STATES ? Object.assign({}, global.OVERLAY_STATES) : null,
      clockMode: localStorage.getItem("setsail_clock_mode") || "UTC",
      theme: localStorage.getItem("setsail_theme") || "dark"
    };

    return {
      vessel: cleanVessel,
      vesselUpdatedAt: vStamp,
      vesselClearedAt: vCleared,
      route: route,
      activeRouteUpdatedAt: rStamp,
      routeClearedAt: rCleared,
      routesLibrary: routesLibrary,
      routesLibraryUpdatedAt: getLocalStamp("setsail_routes_library_updated_at_v1"),
      deletedRouteIds: deletedRouteIds,
      drActiveRouteId: drActiveRouteId,
      drHandoff: drHandoff,
      drLastRails: drLastRails,
      drUpdatedAt: getLocalStamp("setsail_dr_updated_at_v1"),
      wifiAis: wifi,
      wifiAisUpdatedAt: getLocalStamp("setsail_wifi_ais_updated_at_v1"),
      ntmOverrides: ntmOverrides,
      ntmOverridesUpdatedAt: getLocalStamp("setsail_ntm_overrides_updated_at_v1"),
      gyroDevTable: gyroDevTable,
      gyroUpdatedAt: getLocalStamp("setsail_gyro_updated_at_v1"),
      newsProfile: newsProfile,
      newsUpdatedAt: getLocalStamp("setsail_news_updated_at_v1"),
      settings: settings,
      settingsUpdatedAt: getLocalStamp("setsail_settings_updated_at_v1"),
      updatedAt: Date.now()
    };
  }

  function applyRemoteRoutesLibrary(profile) {
    if (!profile || !Array.isArray(profile.routesLibrary)) return;
    try {
      if (profile.deletedRouteIds && typeof profile.deletedRouteIds === "object") {
        var curDel = readDeletedRouteIds();
        Object.assign(curDel, profile.deletedRouteIds);
        localStorage.setItem("setsail_deleted_route_ids_v1", JSON.stringify(curDel));
      }
      var localLib = readLocalRoutesLibrary();
      var remoteLib = profile.routesLibrary;
      var localIds = localLib.map(function (r) { return (r && r.id) + ":" + routeStampMs(r); }).join("|");
      var remoteIds = remoteLib.map(function (r) { return (r && r.id) + ":" + routeStampMs(r); }).join("|");
      if (localIds === remoteIds && localLib.length === remoteLib.length) return;

      localStorage.setItem("setsail_routes_library_v1", JSON.stringify(remoteLib.slice(0, 35)));
      if (profile.routesLibraryUpdatedAt) {
        setLocalStamp("setsail_routes_library_updated_at_v1", profile.routesLibraryUpdatedAt);
      }
      if (typeof global.renderNavSavedRoutesTree === "function") {
        try { global.renderNavSavedRoutesTree(); } catch (e1) {}
      }
      if (typeof global.renderVesselRouteLibraryList === "function") {
        try { global.renderVesselRouteLibraryList(); } catch (e2) {}
      }
    } catch (e) {}
  }

  function applyRemoteRoute(profile) {
    if (!profile) return;
    var remoteCleared = Number(profile.routeClearedAt) || 0;
    var remoteUpdated = Math.max(Number(profile.activeRouteUpdatedAt) || 0, routeStampMs(profile.route));
    var localRoute = readLocalRoute();
    var localUpdated = Math.max(getLocalStamp("setsail_active_route_updated_at_v1"), routeStampMs(localRoute));
    var localCleared = getLocalStamp("setsail_route_cleared_at_v1");

    // Remote explicitly cleared active route more recently than local route
    if (remoteCleared > remoteUpdated && remoteCleared > localUpdated) {
      if (localRoute || remoteCleared > localCleared) {
        setLocalStamp("setsail_route_cleared_at_v1", remoteCleared);
        setLocalStamp("setsail_active_route_updated_at_v1", remoteCleared);
        try {
          ROUTE_KEYS.forEach(function (k) { localStorage.removeItem(k); });
          if (typeof global.clearActiveRoute === "function") {
            global.clearActiveRoute({ fromCloudSync: true });
          } else {
            global.activeRouteData = null;
          }
        } catch (eClr) {}
      }
      return;
    }

    var route = profile.route;
    if (!route || !Array.isArray(route.waypoints) || route.waypoints.length < 2) return;
    if (localRoute && localUpdated > remoteUpdated + 200) return;

    var sameRoute =
      localRoute &&
      localRoute.id === route.id &&
      localRoute.waypoints &&
      localRoute.waypoints.length === route.waypoints.length &&
      Math.abs(localUpdated - remoteUpdated) < 500;
    if (sameRoute) return;

    try {
      setLocalStamp("setsail_active_route_updated_at_v1", remoteUpdated || Date.now());
      localStorage.setItem("setsail_active_route", JSON.stringify(route));
      localStorage.setItem("setsail_route_v1", JSON.stringify(route));
    } catch (e) {}
    try {
      global.activeRouteData = route;
      if (typeof global.renderRouteOnMap === "function" && global.leafletMap) {
        global.renderRouteOnMap(route, false);
      }
      if (typeof global.updateRouteMiniWindowUI === "function") {
        try { global.updateRouteMiniWindowUI(); } catch (eUi) {}
      }
      if (typeof global.renderVesselRouteLibraryList === "function") {
        try { global.renderVesselRouteLibraryList(); } catch (eVr) {}
      }
    } catch (e2) {}
  }

  function applyRemoteDrState(profile) {
    if (!profile) return;
    var remoteDrTs = Number(profile.drUpdatedAt) || 0;
    var localDrTs = getLocalStamp("setsail_dr_updated_at_v1");
    if (remoteDrTs <= localDrTs) return;
    setLocalStamp("setsail_dr_updated_at_v1", remoteDrTs);
    try {
      if (profile.drActiveRouteId) {
        localStorage.setItem("setsail_dr_active_route_id_v1", String(profile.drActiveRouteId));
      } else {
        localStorage.removeItem("setsail_dr_active_route_id_v1");
      }
      if (profile.drHandoff) {
        localStorage.setItem("setsail_dr_route_handoff_v1", JSON.stringify(profile.drHandoff));
        global._setsailDrHandoff = profile.drHandoff;
      } else {
        localStorage.removeItem("setsail_dr_route_handoff_v1");
        global._setsailDrHandoff = null;
      }
      if (Array.isArray(profile.drLastRails) && profile.drLastRails.length >= 2) {
        localStorage.setItem("setsail_dr_last_rails_wps_v1", JSON.stringify(profile.drLastRails));
        global._setsailDrLastRailsWps = profile.drLastRails;
      } else {
        localStorage.removeItem("setsail_dr_last_rails_wps_v1");
        global._setsailDrLastRailsWps = null;
      }
      if (typeof global.renderVesselRouteLibraryList === "function") {
        global.renderVesselRouteLibraryList();
      }
    } catch (eDr) {}
  }

  function applyRemoteSettingsAndExtras(profile) {
    if (!profile) return;
    try {
      var rWifiTs = Number(profile.wifiAisUpdatedAt) || 0;
      if (profile.wifiAis && rWifiTs >= getLocalStamp("setsail_wifi_ais_updated_at_v1")) {
        localStorage.setItem("setsail_wifi_ais_profile_v1", JSON.stringify(profile.wifiAis));
        if (rWifiTs) setLocalStamp("setsail_wifi_ais_updated_at_v1", rWifiTs);
      }
    } catch (eW) {}

    try {
      var rNtmTs = Number(profile.ntmOverridesUpdatedAt) || 0;
      if (profile.ntmOverrides && rNtmTs > getLocalStamp("setsail_ntm_overrides_updated_at_v1")) {
        localStorage.setItem("setsail_ntm_overrides_v1", JSON.stringify(profile.ntmOverrides));
        setLocalStamp("setsail_ntm_overrides_updated_at_v1", rNtmTs);
        if (typeof global.reconcileAndApplyNoticeOverrides === "function") {
          global.reconcileAndApplyNoticeOverrides();
        }
        if (typeof global.renderNtMListAndMap === "function") {
          global.renderNtMListAndMap();
        }
      }
    } catch (eN) {}

    try {
      var rGyroTs = Number(profile.gyroUpdatedAt) || 0;
      if (profile.gyroDevTable !== undefined && rGyroTs > getLocalStamp("setsail_gyro_updated_at_v1")) {
        localStorage.setItem("gyro_calc_dev_table_v1", JSON.stringify(profile.gyroDevTable));
        setLocalStamp("setsail_gyro_updated_at_v1", rGyroTs);
      }
    } catch (eG) {}

    try {
      var rNewsTs = Number(profile.newsUpdatedAt) || 0;
      if (profile.newsProfile && rNewsTs > getLocalStamp("setsail_news_updated_at_v1")) {
        localStorage.setItem("setsail_news_user_profile_v1", JSON.stringify(profile.newsProfile));
        setLocalStamp("setsail_news_updated_at_v1", rNewsTs);
      }
    } catch (eNw) {}

    try {
      var rSetTs = Number(profile.settingsUpdatedAt) || 0;
      if (profile.settings && rSetTs > getLocalStamp("setsail_settings_updated_at_v1")) {
        var s = profile.settings;
        setLocalStamp("setsail_settings_updated_at_v1", rSetTs);
        if (isFinite(Number(s.routeBufferNm)) && Number(s.routeBufferNm) > 0) {
          global.ROUTE_CORRIDOR_BUFFER_NM = Number(s.routeBufferNm);
          localStorage.setItem("setsail_route_buffer_nm", String(s.routeBufferNm));
        }
        if (typeof s.routeCorridorFilter === "boolean") {
          global.ROUTE_CORRIDOR_FILTER_ENABLED = s.routeCorridorFilter;
        }
        if (s.clockMode === "LMT" || s.clockMode === "UTC") {
          localStorage.setItem("setsail_clock_mode", s.clockMode);
        }
      }
    } catch (eS) {}
  }

  function applyRemote(profile) {
    if (!profile || typeof profile !== "object") return;
    applyingRemote = true;
    try {
      applyRemoteSettingsAndExtras(profile);
      applyRemoteRoutesLibrary(profile);
      applyRemoteRoute(profile);
      applyRemoteDrState(profile);

      var remoteCleared = Number(profile.vesselClearedAt) || 0;
      var remoteVessel = profile.vessel && typeof profile.vessel === "object" ? profile.vessel : null;
      var remoteVStamp = Math.max(Number(profile.vesselUpdatedAt) || 0, vesselStampMs(remoteVessel));
      var localVessel = null;
      try {
        localVessel = global.userVessel || JSON.parse(localStorage.getItem("setsail_vessel_state_v2") || "null");
      } catch (eLv) {}
      var localVStamp = vesselStampMs(localVessel);
      var localCleared = getLocalStamp("setsail_vessel_cleared_at_v1");

      // Check if vessel was explicitly cleared on another device
      if (remoteCleared > remoteVStamp && remoteCleared > localVStamp) {
        if (localVessel || remoteCleared > localCleared) {
          setLocalStamp("setsail_vessel_cleared_at_v1", remoteCleared);
          setLocalStamp("setsail_vessel_updated_at_v1", remoteCleared);
          if (!global._setsailGpsWatchActive && typeof global.clearVesselProfile === "function") {
            global.clearVesselProfile(null, { fromCloudSync: true });
          }
        }
        return;
      }

      if (!remoteVessel) return;

      // Local GPS watch on THIS device owns motion — only merge static identity fields
      if (global._setsailGpsWatchActive) {
        try {
          var idOnly = {
            name: remoteVessel.name || (localVessel && localVessel.name),
            callSign: remoteVessel.callSign || (localVessel && localVessel.callSign),
            mmsi: remoteVessel.mmsi || (localVessel && localVessel.mmsi),
            shipType: remoteVessel.shipType || (localVessel && localVessel.shipType),
            destination: remoteVessel.destination || (localVessel && localVessel.destination),
            aisFixLat: remoteVessel.aisFixLat != null ? remoteVessel.aisFixLat : (localVessel && localVessel.aisFixLat),
            aisFixLon: remoteVessel.aisFixLon != null ? remoteVessel.aisFixLon : (localVessel && localVessel.aisFixLon),
            aisLastFixAt: remoteVessel.aisLastFixAt || (localVessel && localVessel.aisLastFixAt)
          };
          if (typeof global.applyVesselProfile === "function") {
            global.applyVesselProfile(idOnly, {
              skipAisSchedule: true,
              toast: null,
              keepPrevCoords: true,
              fromCloudSync: true
            });
          }
        } catch (eId) {}
        return;
      }

      var hasLocalVessel = !!(
        localVessel &&
        ((localVessel.name && String(localVessel.name).trim()) ||
          (typeof global.isValidVesselLatLon === "function" &&
            global.isValidVesselLatLon(localVessel.lat, localVessel.lon)))
      );

      // Accept remote vessel if we don't have one locally OR remote is newer OR remote has live GPS coords that changed
      var coordsChanged =
        typeof global.isValidVesselLatLon === "function" &&
        global.isValidVesselLatLon(remoteVessel.lat, remoteVessel.lon) &&
        (!localVessel ||
          Math.abs(Number(remoteVessel.lat) - Number(localVessel.lat || 0)) > 1e-6 ||
          Math.abs(Number(remoteVessel.lon) - Number(localVessel.lon || 0)) > 1e-6);

      if (hasLocalVessel && remoteVStamp <= localVStamp && !coordsChanged) {
        return;
      }

      setLocalStamp("setsail_vessel_updated_at_v1", remoteVStamp || Date.now());
      try {
        localStorage.setItem("setsail_vessel_state_v2", JSON.stringify(remoteVessel));
      } catch (eLs) {}

      try {
        if (typeof global.applyVesselProfile === "function") {
          global.applyVesselProfile(remoteVessel, {
            skipAisSchedule: remoteVessel.source === "gps" || remoteVessel.preferredNav === "gps",
            toast: null,
            keepPrevCoords: false,
            fromCloudSync: true
          });
        } else if (typeof global.loadUserVesselFromStorage === "function") {
          global.loadUserVesselFromStorage();
        }
        if (typeof global.refreshOwnShipCcrpPopup === "function") {
          global.refreshOwnShipCcrpPopup();
        }
        if (
          typeof global.plotUserVessel === "function" &&
          typeof global.isValidVesselLatLon === "function" &&
          global.isValidVesselLatLon(remoteVessel.lat, remoteVessel.lon)
        ) {
          global.plotUserVessel(
            Number(remoteVessel.lat),
            Number(remoteVessel.lon),
            remoteVessel.source || "gps",
            true
          );
        }
        if (typeof global.updateHomeVesselHudLabel === "function") {
          global.updateHomeVesselHudLabel();
        }
      } catch (e2) {}
    } finally {
      applyingRemote = false;
    }
  }

  function setSyncing(on) {
    if (on) syncInFlight += 1;
    else syncInFlight = Math.max(0, syncInFlight - 1);
    try {
      window.dispatchEvent(
        new CustomEvent("setsail-profile-sync", {
          detail: {
            syncing: syncInFlight > 0,
            initialPullDone: initialPullDone,
            phase: on ? "start" : "done"
          }
        })
      );
    } catch (eEv) {}
    try {
      if (typeof global.updateHomeVesselHudLabel === "function") global.updateHomeVesselHudLabel();
    } catch (eHud) {}
  }

  async function pull() {
    var user = getAuthUser();
    var token = getToken();
    if (!user || !token) {
      initialPullDone = true;
      return { ok: false, reason: "no_auth" };
    }
    setSyncing(true);
    try {
      var r = await fetch(API, {
        method: "GET",
        headers: buildAuthHeaders(),
        cache: "no-store"
      });
      var j = await r.json().catch(function () {
        return {};
      });
      if (r.ok && j && j.profile) {
        applyRemote(j.profile);
        initialPullDone = true;
        return { ok: true, profile: j.profile, durable: j.durable, backend: j.backend };
      }
      if (r.ok && j && j.ok && !j.profile) {
        initialPullDone = true;
        return { ok: true, profile: null, empty: true, durable: j.durable };
      }
      initialPullDone = true;
      return { ok: false, status: r.status, j: j };
    } catch (e) {
      initialPullDone = true;
      return { ok: false, error: String(e && e.message) };
    } finally {
      setSyncing(false);
    }
  }

  async function push() {
    if (applyingRemote) return { ok: false, reason: "applying_remote" };
    var user = getAuthUser();
    var token = getToken();
    if (!user || !token) return { ok: false, reason: "no_auth" };
    var body = { profile: collectLocal() };
    try {
      var r = await fetch(API, {
        method: "PUT",
        headers: buildAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(body),
        cache: "no-store"
      });
      var j = await r.json().catch(function () {
        return {};
      });
      if (r.ok && j && j.profile) {
        // Apply merged profile back in case another device pushed concurrently
        applyRemote(j.profile);
      }
      return { ok: r.ok, status: r.status, j: j, durable: j && j.durable, backend: j && j.backend };
    } catch (e) {
      return { ok: false, error: String(e && e.message) };
    }
  }

  var pushTimer = null;
  function schedulePush(delayMs) {
    if (applyingRemote) return;
    if (pushTimer) clearTimeout(pushTimer);
    var wait = typeof delayMs === "number" && delayMs >= 0 ? delayMs : PUSH_DEBOUNCE_MS;
    pushTimer = setTimeout(function () {
      pushTimer = null;
      push();
    }, wait);
  }

  function touchDomain(domain, extra) {
    if (applyingRemote) return;
    var now = Date.now();
    if (domain === "vessel") {
      setLocalStamp("setsail_vessel_updated_at_v1", now);
      setLocalStamp("setsail_vessel_cleared_at_v1", 0);
    } else if (domain === "vessel_clear") {
      setLocalStamp("setsail_vessel_cleared_at_v1", now);
      setLocalStamp("setsail_vessel_updated_at_v1", now);
    } else if (domain === "route") {
      setLocalStamp("setsail_active_route_updated_at_v1", now);
      setLocalStamp("setsail_route_cleared_at_v1", 0);
    } else if (domain === "route_clear") {
      setLocalStamp("setsail_route_cleared_at_v1", now);
      setLocalStamp("setsail_active_route_updated_at_v1", now);
    } else if (domain === "routes_library") {
      setLocalStamp("setsail_routes_library_updated_at_v1", now);
      if (extra && extra.deletedId) {
        var del = readDeletedRouteIds();
        del[String(extra.deletedId)] = now;
        try {
          localStorage.setItem("setsail_deleted_route_ids_v1", JSON.stringify(del));
        } catch (eD) {}
      }
    } else if (domain === "dr") {
      setLocalStamp("setsail_dr_updated_at_v1", now);
    } else if (domain === "ntm") {
      setLocalStamp("setsail_ntm_overrides_updated_at_v1", now);
    } else if (domain === "wifi") {
      setLocalStamp("setsail_wifi_ais_updated_at_v1", now);
    } else if (domain === "gyro") {
      setLocalStamp("setsail_gyro_updated_at_v1", now);
    } else if (domain === "news") {
      setLocalStamp("setsail_news_updated_at_v1", now);
    } else if (domain === "settings") {
      setLocalStamp("setsail_settings_updated_at_v1", now);
    }
    schedulePush(domain === "vessel" && global._setsailGpsWatchActive ? 400 : PUSH_DEBOUNCE_MS);
  }

  function boot() {
    var user = getAuthUser();
    if (user && getToken()) {
      pull().then(function (res) {
        if (res && res.ok) {
          schedulePush(800);
        }
      });
    } else {
      initialPullDone = true;
    }

    window.addEventListener("setsail-auth-changed", function () {
      initialPullDone = false;
      pull().then(function (res) {
        if (res && res.ok) {
          schedulePush(800);
        }
      });
    });

    setInterval(function () {
      if (!getAuthUser() || !navigator.onLine) return;
      if (global._setsailGpsWatchActive) push();
    }, GPS_PUSH_MS);

    setInterval(function () {
      if (!getAuthUser() || !navigator.onLine) return;
      pull();
    }, PULL_MS);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  Object.defineProperty(global, "__setsailProfileSyncing", {
    configurable: true,
    get: function () {
      return syncInFlight > 0 && !initialPullDone;
    },
    set: function () {}
  });

  global.SetSailProfileSync = {
    pull: pull,
    push: push,
    schedulePush: schedulePush,
    touchDomain: touchDomain,
    collectLocal: collectLocal,
    get isSyncing() {
      return syncInFlight > 0 && !initialPullDone;
    },
    get initialPullDone() {
      return initialPullDone;
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
