/**
 * Pull/push vessel + route + Wi‑Fi AIS profile keyed by Google account.
 * Live GPS/DR motion on phone is mirrored to other signed-in devices.
 */
(function (global) {
  "use strict";

  var API = "/api/user-profile";
  var PUSH_DEBOUNCE_MS = 1500;
  var GPS_PUSH_MS = 8000;
  var PULL_MS = 10000;

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
    // Same-account sync: keep live GPS/DR display + full motion fields
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

  function collectLocal() {
    var vessel = null;
    var route = null;
    var wifi = null;
    var ntmOverrides = null;
    try {
      // Prefer in-memory live vessel (GPS ticks) over possibly stale localStorage
      if (global.userVessel) vessel = global.userVessel;
      else vessel = JSON.parse(localStorage.getItem("setsail_vessel_state_v2") || "null");
    } catch (e) {}
    try {
      route = JSON.parse(localStorage.getItem("setsail_route_v1") || localStorage.getItem("setsail_active_route_v1") || "null");
    } catch (e2) {}
    try {
      wifi = JSON.parse(localStorage.getItem("setsail_wifi_ais_profile_v1") || "null");
    } catch (e3) {}
    try {
      ntmOverrides = JSON.parse(localStorage.getItem("setsail_ntm_overrides_v1") || "null");
    } catch (e4) {}
    return {
      vessel: sanitizeVesselForCloud(vessel),
      route: route,
      wifiAis: wifi,
      ntmOverrides: ntmOverrides,
      updatedAt: Date.now()
    };
  }

  function remoteIsNewer(remoteVessel, localVessel) {
    if (!remoteVessel) return false;
    if (!localVessel) return true;
    var rMs = Date.parse(remoteVessel.syncedAt || remoteVessel.gpsLastFixAt || remoteVessel.updatedAt || 0);
    var lMs = Date.parse(localVessel.syncedAt || localVessel.gpsLastFixAt || localVessel.updatedAt || 0);
    if (!isFinite(rMs)) return false;
    if (!isFinite(lMs)) return true;
    return rMs > lMs + 500;
  }

  function applyRemote(profile) {
    if (!profile || typeof profile !== "object") return;
    try {
      if (profile.route) localStorage.setItem("setsail_route_v1", JSON.stringify(profile.route));
      if (profile.wifiAis) localStorage.setItem("setsail_wifi_ais_profile_v1", JSON.stringify(profile.wifiAis));
      if (profile.ntmOverrides) localStorage.setItem("setsail_ntm_overrides_v1", JSON.stringify(profile.ntmOverrides));
    } catch (e) {}

    if (!profile.vessel) return;
    var remote = profile.vessel;
    var local = global.userVessel || null;

    // Local GPS watch owns motion — only merge AIS identity / static fields from cloud
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

    if (!remoteIsNewer(remote, local)) return;

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
        return { ok: true, profile: j.profile };
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
      return { ok: r.ok, status: r.status, j: j };
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
      pull();
    });

    // Phone GPS live → push often; other devices → pull often for motion mirror
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
