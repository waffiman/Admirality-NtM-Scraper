/**
 * Pull/push vessel + route + Wi‑Fi AIS profile keyed by Google account.
 */
(function (global) {
  "use strict";

  var API = "/api/user-profile";

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

  function collectLocal() {
    var vessel = null;
    var route = null;
    var wifi = null;
    var ntmOverrides = null;
    try {
      vessel = JSON.parse(localStorage.getItem("setsail_vessel_state_v2") || "null");
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
    return { vessel: vessel, route: route, wifiAis: wifi, ntmOverrides: ntmOverrides, updatedAt: Date.now() };
  }

  function applyRemote(profile) {
    if (!profile || typeof profile !== "object") return;
    try {
      if (profile.vessel) localStorage.setItem("setsail_vessel_state_v2", JSON.stringify(profile.vessel));
      if (profile.route) localStorage.setItem("setsail_route_v1", JSON.stringify(profile.route));
      if (profile.wifiAis) localStorage.setItem("setsail_wifi_ais_profile_v1", JSON.stringify(profile.wifiAis));
      if (profile.ntmOverrides) localStorage.setItem("setsail_ntm_overrides_v1", JSON.stringify(profile.ntmOverrides));
    } catch (e) {}
    try {
      if (profile.vessel && typeof global.applyVesselProfile === "function") {
        global.applyVesselProfile(profile.vessel);
      } else if (typeof global.loadUserVesselFromStorage === "function") {
        global.loadUserVesselFromStorage();
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
    }, 2500);
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
    // opportunistic push while online
    setInterval(function () {
      if (navigator.onLine && getAuthUser() && getToken()) push();
    }, 120000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.SetSailProfileSync = { pull: pull, push: push, schedulePush: schedulePush, collectLocal: collectLocal };
})(typeof window !== "undefined" ? window : globalThis);
