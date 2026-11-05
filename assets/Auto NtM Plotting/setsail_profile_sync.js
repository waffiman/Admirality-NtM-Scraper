/**
 * Pull/push vessel + route profile keyed by Google account.
 * Live GPS on phone mirrors to other signed-in devices; routes merge without wiping.
 */
(function (global) {
  "use strict";

  var API = "/api/user-profile";
  var PUSH_DEBOUNCE_MS = 1600;
  var GPS_PUSH_MS = 12000;
  var PULL_MS = 10000;
  var ROUTE_KEYS = ["setsail_active_route", "setsail_route_v1", "setsail_active_route_v1"];

  function getToken() {
    try {
      return (
        sessionStorage.getItem("setsail_google_auth_token") ||
        localStorage.getItem("setsail_google_auth_token") ||
        ""
      );
    } catch (e) {
      return "";
    }
  }

  function getAuthUser() {
    try {
      return JSON.parse(localStorage.getItem("setsail_auth_user_v1") || "null");
    } catch (e) {
      return null;
    }
  }

  function sanitizeVesselForCloud(vessel) {
    if (!vessel || typeof vessel !== "object") return vessel;
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
    // Prefer live chart route
    try {
      if (global.activeRouteData && Array.isArray(global.activeRouteData.waypoints) &&
          global.activeRouteData.waypoints.length > 0) {
        var live = global.activeRouteData;
        if (!live.syncedAt) live.syncedAt = new Date().toISOString();
        return live;
      }
    } catch (e0) {}
    for (var i = 0; i < ROUTE_KEYS.length; i++) {
      try {
        var raw = localStorage.getItem(ROUTE_KEYS[i]);
        if (!raw) continue;
        var r = JSON.parse(raw);
        if (r && Array.isArray(r.waypoints) && r.waypoints.length > 0) {
          if (!r.syncedAt) r.syncedAt = r.updatedAt || new Date().toISOString();
          return r;
        }
      } catch (e1) {}
    }
    return null;
  }

  function collectLocal() {
    var vessel = null;
    var wifi = null;
    var ntmOverrides = null;
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
    var route = readLocalRoute();
    return {
      vessel: sanitizeVesselForCloud(vessel),
      route: route,
      wifiAis: wifi,
      ntmOverrides: ntmOverrides,
      updatedAt: Date.now()
    };
  }

  function vesselStampMs(v) {
    if (!v) return 0;
    var n = Date.parse(v.syncedAt || v.gpsLastFixAt || v.aisLastFixAt || v.updatedAt || 0);
    return isFinite(n) ? n : 0;
  }

  function remoteVesselIsNewer(remote, local) {
    if (!remote) return false;
    if (!local) return true;
    return vesselStampMs(remote) > vesselStampMs(local) + 400;
  }

  function applyRemoteRoute(route) {
    if (!route || !Array.isArray(route.waypoints) || route.waypoints.length < 2) return;
    try {
      localStorage.setItem("setsail_active_route", JSON.stringify(route));
      localStorage.setItem("setsail_route_v1", JSON.stringify(route));
    } catch (e) {}
    try {
      global.activeRouteData = route;
      if (typeof global.renderRouteOnMap === "function" && global.leafletMap) {
        // Avoid flyTo on every pull
        global.renderRouteOnMap(route, false);
      } else if (typeof global.persistActiveRouteToStorage === "function") {
        global.persistActiveRouteToStorage(route);
      }
      if (typeof global.saveRouteToLibrary === "function") {
        try { global.saveRouteToLibrary(route); } catch (eLib) {}
      }
      if (typeof global.updateRouteMiniWindowUI === "function") {
        try { global.updateRouteMiniWindowUI(); } catch (eUi) {}
      }
    } catch (e2) {}
  }

  function applyRemote(profile) {
    if (!profile || typeof profile !== "object") return;

    try {
      if (profile.wifiAis) localStorage.setItem("setsail_wifi_ais_profile_v1", JSON.stringify(profile.wifiAis));
      if (profile.ntmOverrides) localStorage.setItem("setsail_ntm_overrides_v1", JSON.stringify(profile.ntmOverrides));
    } catch (e) {}

    // Route always merges (even while local GPS watch is active)
    try {
      if (profile.route) applyRemoteRoute(profile.route);
    } catch (eR) {}

    if (!profile.vessel) return;
    var remote = profile.vessel;
    var local = global.userVessel || null;

    // Local GPS watch owns motion — only merge AIS identity / static fields
    if (global._setsailGpsWatchActive) {
      try {
        var idOnly = {
          name: remote.name || (local && local.name),
          callSign: remote.callSign || (local && local.callSign),
          mmsi: remote.mmsi || (local && local.mmsi),
          shipType: remote.shipType || (local && local.shipType),
          destination: remote.destination || (local && local.destination),
          aisFixLat: remote.aisFixLat != null ? remote.aisFixLat : (local && local.aisFixLat),
          aisFixLon: remote.aisFixLon != null ? remote.aisFixLon : (local && local.aisFixLon),
          aisLastFixAt: remote.aisLastFixAt || (local && local.aisLastFixAt)
        };
        if (typeof global.applyVesselProfile === "function") {
          global.applyVesselProfile(idOnly, { skipAisSchedule: true, toast: null, keepPrevCoords: true });
        }
      } catch (eId) {}
      return;
    }

    if (!remoteVesselIsNewer(remote, local)) return;

    try {
      localStorage.setItem("setsail_vessel_state_v2", JSON.stringify(remote));
    } catch (eLs) {}

    try {
      if (typeof global.applyVesselProfile === "function") {
        global.applyVesselProfile(remote, { skipAisSchedule: true, toast: null, keepPrevCoords: false });
      } else if (typeof global.loadUserVesselFromStorage === "function") {
        global.loadUserVesselFromStorage();
      }
      if (typeof global.refreshOwnShipCcrpPopup === "function") {
        global.refreshOwnShipCcrpPopup();
      }
      if (
        typeof global.plotUserVessel === "function" &&
        typeof global.isValidVesselLatLon === "function" &&
        global.isValidVesselLatLon(remote.lat, remote.lon)
      ) {
        global.plotUserVessel(Number(remote.lat), Number(remote.lon), remote.source || "gps", true);
      }
    } catch (e2) {}
  }

  async function pull() {
    var token = getToken();
    var user = getAuthUser();
    if (!token || !user) return { ok: false, reason: "no_auth" };
    try {
      var r = await fetch(API, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        cache: "no-store"
      });
      var j = await r.json().catch(function () {
        return {};
      });
      if (r.ok && j && j.profile) {
        applyRemote(j.profile);
        return { ok: true, profile: j.profile, durable: j.durable, backend: j.backend };
      }
      // Empty cloud profile is still ok — seed via push
      if (r.ok && j && j.ok && !j.profile) {
        return { ok: true, profile: null, empty: true, durable: j.durable };
      }
      return { ok: false, status: r.status, j: j };
    } catch (e) {
      return { ok: false, error: String(e && e.message) };
    }
  }

  async function push() {
    var token = getToken();
    var user = getAuthUser();
    if (!token || !user) return { ok: false, reason: "no_auth" };
    var body = { profile: collectLocal() };
    try {
      var r = await fetch(API, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        cache: "no-store"
      });
      var j = await r.json().catch(function () {
        return {};
      });
      return { ok: r.ok, status: r.status, j: j, durable: j && j.durable, backend: j && j.backend };
    } catch (e) {
      return { ok: false, error: String(e && e.message) };
    }
  }

  var pushTimer = null;
  function schedulePush() {
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      push();
    }, PUSH_DEBOUNCE_MS);
  }

  function boot() {
    var user = getAuthUser();
    if (user && getToken()) {
      pull().then(function () {
        schedulePush();
      });
    }
    window.addEventListener("setsail-auth-changed", function () {
      pull().then(function () {
        schedulePush();
      });
    });

    setInterval(function () {
      if (!getAuthUser() || !getToken() || !navigator.onLine) return;
      if (global._setsailGpsWatchActive) push();
      else pull();
    }, GPS_PUSH_MS);

    setInterval(function () {
      if (!getAuthUser() || !getToken() || !navigator.onLine) return;
      if (!global._setsailGpsWatchActive) pull();
    }, PULL_MS);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.SetSailProfileSync = {
    pull: pull,
    push: push,
    schedulePush: schedulePush,
    collectLocal: collectLocal
  };
})(typeof window !== "undefined" ? window : globalThis);
