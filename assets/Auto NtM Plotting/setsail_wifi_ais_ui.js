/**
 * SetSail Wi-Fi AIS connection panel (adaptive Auto-detect + Manual).
 */
(function (global) {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function ensureModal() {
    if ($("setsailWifiAisModal")) return;
    var wrap = document.createElement("div");
    wrap.id = "setsailWifiAisModal";
    wrap.className = "ss-wifi-ais-modal";
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="ss-wifi-ais-backdrop" data-ss-wifi-close="1"></div>' +
      '<div class="ss-wifi-ais-panel" role="dialog" aria-labelledby="ssWifiAisTitle">' +
      '<div class="ss-wifi-ais-head">' +
      "<h3 id=\"ssWifiAisTitle\">Wi‑Fi AIS</h3>" +
      '<button type="button" class="ss-wifi-ais-x" data-ss-wifi-close="1" aria-label="Close">×</button>' +
      "</div>" +
      '<p class="ss-wifi-ais-lead">Join the module Wi‑Fi in system Settings first (e.g. SafePilotP3), then Auto-detect. Works with any NMEA Wi‑Fi AIS / PPU AP.</p>' +
      '<div class="ss-wifi-ais-actions">' +
      '<button type="button" class="ntm-btn-primary" id="ssWifiAisAuto">Auto-detect &amp; connect</button>' +
      '<button type="button" class="ntm-btn-glass" id="ssWifiAisOpenWifi">Open Wi‑Fi settings</button>' +
      "</div>" +
      '<details class="ss-wifi-ais-manual"><summary>Manual host / port</summary>' +
      '<div class="ss-wifi-ais-manual-grid">' +
      '<label>Host <input id="ssWifiAisHost" class="min-input" placeholder="192.168.5.1" /></label>' +
      '<label>Port <input id="ssWifiAisPort" class="min-input" type="number" value="10110" /></label>' +
      '<label>Proto <select id="ssWifiAisProto" class="min-input"><option value="udp">UDP</option><option value="tcp">TCP</option></select></label>' +
      '<button type="button" class="ntm-btn-primary" id="ssWifiAisManualGo">Connect</button>' +
      "</div></details>" +
      '<div class="ss-wifi-ais-status" id="ssWifiAisStatus">Idle</div>' +
      '<button type="button" class="ntm-btn-glass ss-wifi-ais-disc" id="ssWifiAisDisconnect" hidden>Disconnect Wi‑Fi AIS</button>' +
      "</div>";
    document.body.appendChild(wrap);

    wrap.addEventListener("click", function (ev) {
      if (ev.target && ev.target.getAttribute("data-ss-wifi-close")) close();
    });
    $("ssWifiAisAuto").addEventListener("click", function () {
      runConnect({ auto: true });
    });
    $("ssWifiAisManualGo").addEventListener("click", function () {
      runConnect({
        auto: false,
        host: ($("ssWifiAisHost").value || "").trim(),
        port: Number($("ssWifiAisPort").value) || 10110,
        proto: $("ssWifiAisProto").value || "udp",
        mode: "manual"
      });
    });
    $("ssWifiAisDisconnect").addEventListener("click", function () {
      if (global.SetSailLanAis) global.SetSailLanAis.disconnect();
      setStatus("Disconnected");
      $("ssWifiAisDisconnect").hidden = true;
    });
    $("ssWifiAisOpenWifi").addEventListener("click", openWifiSettings);

    var saved = global.SetSailLanAis && global.SetSailLanAis.loadSavedProfile && global.SetSailLanAis.loadSavedProfile();
    if (saved) {
      if (saved.host) $("ssWifiAisHost").value = saved.host;
      if (saved.port) $("ssWifiAisPort").value = String(saved.port);
      if (saved.proto) $("ssWifiAisProto").value = saved.proto;
    }

    if (global.SetSailLanAis && global.SetSailLanAis.onChange) {
      global.SetSailLanAis.onChange(function (snap) {
        if (!snap) return;
        if (snap.connected) {
          $("ssWifiAisDisconnect").hidden = false;
          setStatus(
            "Connected " +
              (snap.proto || "") +
              " " +
              (snap.host || "") +
              ":" +
              (snap.port || "") +
              " · pkts " +
              snap.packets +
              " · " +
              ((snap.own && snap.own.quality) || "…")
          );
        }
      });
    }
  }

  function setStatus(msg) {
    var el = $("ssWifiAisStatus");
    if (el) el.textContent = msg || "";
  }

  function open() {
    ensureModal();
    $("setsailWifiAisModal").hidden = false;
    document.documentElement.classList.add("ss-wifi-ais-open");
  }

  function close() {
    var m = $("setsailWifiAisModal");
    if (m) m.hidden = true;
    document.documentElement.classList.remove("ss-wifi-ais-open");
  }

  async function openWifiSettings() {
    try {
      if (global.SetSailNativeLan && typeof global.SetSailNativeLan.openWifiSettings === "function") {
        await global.SetSailNativeLan.openWifiSettings();
        return;
      }
    } catch (e) {}
    setStatus("Open system Wi‑Fi settings and join the module network, then return here.");
  }

  async function runConnect(opts) {
    if (!global.SetSailLanAis) {
      setStatus("LAN AIS module not loaded");
      return;
    }
    setStatus("Connecting…");
    try {
      var snap = await global.SetSailLanAis.connect(opts);
      setStatus(
        "Listening " +
          (snap.proto || "") +
          " " +
          (snap.host || "?") +
          ":" +
          (snap.port || "?") +
          (global.SetSailLanAis.isNativeShell && global.SetSailLanAis.isNativeShell()
            ? ""
            : " — install Android/Windows app for live LAN sockets")
      );
      $("ssWifiAisDisconnect").hidden = false;
    } catch (err) {
      setStatus("Failed: " + (err && err.message ? err.message : String(err)));
    }
  }

  function wireVesselButtons() {
    ensureModal();
    document.querySelectorAll("[data-vessel-form]").forEach(function (form) {
      if (form.querySelector(".ss-wifi-ais-launch")) return;
      var row = form.querySelector(".vessel-primary-fields") || form;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ntm-btn-glass ss-wifi-ais-launch";
      btn.textContent = "Connect Wi‑Fi AIS";
      btn.title = "Adaptive link to shipboard Wi‑Fi AIS / PPU (SafePilot and similar)";
      btn.style.cssText = "width:100%;margin-top:0.45rem;justify-content:center;font-weight:600;font-size:0.75rem;";
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        open();
      });
      var after = row.querySelector(".vessel-coords-row");
      if (after && after.parentNode) after.parentNode.insertBefore(btn, after.nextSibling);
      else row.appendChild(btn);
    });
  }

  function boot() {
    wireVesselButtons();
    // Native shell: require Google (no Guest)
    try {
      if (global.SetSailLanAis && global.SetSailLanAis.isNativeShell && global.SetSailLanAis.isNativeShell()) {
        document.documentElement.classList.add("setsail-native-shell");
        // maybeNativeAuthGate(); // disabled - optional sign-in only
      }
    } catch (e) {}
  }

  function maybeNativeAuthGate() {
    var auth = null;
    try {
      auth = JSON.parse(localStorage.getItem("setsail_auth_user_v1") || "null");
    } catch (e) {}
    if (auth && auth.email) return;
    var gate = document.createElement("div");
    gate.id = "setsailNativeAuthGate";
    gate.className = "ss-native-auth-gate";
    gate.innerHTML =
      '<div class="ss-native-auth-card">' +
      "<h2>Sign in to SetSail</h2>" +
      "<p>The native app requires Google Sign-In to sync your vessel and routes from the website.</p>" +
      '<div id="setsailNativeGoogleBtn"></div>' +
      "</div>";
    document.body.appendChild(gate);
    // Rely on existing GIS button render if present
    setTimeout(function () {
      try {
        if (typeof global.renderGoogleSignInButtons === "function") global.renderGoogleSignInButtons();
      } catch (e2) {}
    }, 800);
    var obs = setInterval(function () {
      try {
        var u = JSON.parse(localStorage.getItem("setsail_auth_user_v1") || "null");
        if (u && u.email) {
          gate.remove();
          clearInterval(obs);
          if (global.SetSailProfileSync) global.SetSailProfileSync.pull();
        }
      } catch (e3) {}
    }, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  global.SetSailWifiAisUi = { open: open, close: close };
})(typeof window !== "undefined" ? window : globalThis);
