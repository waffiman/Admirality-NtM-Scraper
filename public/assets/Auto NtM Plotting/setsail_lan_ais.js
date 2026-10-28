/**
 * SetSail LAN / Wi-Fi AIS — adaptive NMEA ingest + motion brow + cloud-pause flag.
 * Works in browser (manual/WebSocket stubs) and Capacitor/Electron via window.SetSailNativeLan.
 */
(function (global) {
  "use strict";

  var COMMON_PORTS = [10110, 2000, 39150, 4800, 5000, 10001, 10101, 2222, 4001];
  var STALE_MS = 5000;
  var LOST_MS = 15000;

  var state = {
    connected: false,
    mode: null, // auto | manual | nmea-udp | nmea-tcp
    host: null,
    port: null,
    proto: null, // udp | tcp
    own: {
      lat: null,
      lon: null,
      sog: null,
      cog: null,
      hdg: null,
      rot: null,
      mmsi: null,
      quality: "none",
      updatedAt: 0
    },
    targets: {},
    packets: 0,
    lastPacketAt: 0,
    cloudPaused: false,
    profileKey: "setsail_wifi_ais_profile_v1"
  };

  var listeners = [];
  var browTimer = null;
  var nativeHandle = null;

  function emit() {
    for (var i = 0; i < listeners.length; i++) {
      try {
        listeners[i](getSnapshot());
      } catch (e) {}
    }
  }

  function getSnapshot() {
    return {
      connected: state.connected,
      mode: state.mode,
      host: state.host,
      port: state.port,
      proto: state.proto,
      own: Object.assign({}, state.own),
      packets: state.packets,
      lastPacketAt: state.lastPacketAt,
      cloudPaused: state.cloudPaused,
      fixAgeMs: state.lastPacketAt ? Date.now() - state.lastPacketAt : null
    };
  }

  function onChange(fn) {
    if (typeof fn === "function") listeners.push(fn);
    return function () {
      listeners = listeners.filter(function (x) {
        return x !== fn;
      });
    };
  }

  function setCloudPaused(on) {
    state.cloudPaused = !!on;
    try {
      document.documentElement.classList.toggle("setsail-lan-ais-active", state.cloudPaused);
    } catch (e) {}
    var ban = document.getElementById("setsailCloudPauseBanner");
    if (ban) ban.hidden = !state.cloudPaused;
    emit();
  }

  function fixQuality() {
    if (!state.connected || !state.lastPacketAt) return "none";
    var age = Date.now() - state.lastPacketAt;
    if (age > LOST_MS) return "lost";
    if (age > STALE_MS) return "stale";
    if (state.own.lat == null) return "no-fix";
    return "ok";
  }

  function nmeaChecksumOk(sentence) {
    var star = sentence.lastIndexOf("*");
    if (star < 0 || star + 3 > sentence.length) return true;
    var body = sentence.slice(1, star);
    var expect = sentence.slice(star + 1, star + 3).toUpperCase();
    var cs = 0;
    for (var i = 0; i < body.length; i++) cs ^= body.charCodeAt(i);
    var got = ("0" + cs.toString(16).toUpperCase()).slice(-2);
    return got === expect;
  }

  function parseCoord(raw, hemi) {
    if (raw == null || raw === "") return null;
    var v = parseFloat(raw);
    if (!isFinite(v)) return null;
    var deg = Math.floor(v / 100);
    var min = v - deg * 100;
    var dec = deg + min / 60;
    if (hemi === "S" || hemi === "W") dec = -dec;
    return dec;
  }

  function applyOwnPatch(patch) {
    var o = state.own;
    Object.keys(patch).forEach(function (k) {
      if (patch[k] != null && patch[k] !== "") o[k] = patch[k];
    });
    o.updatedAt = Date.now();
    o.quality = fixQuality();
    pushOwnToVessel();
    updateMotionBrow();
    emit();
  }

  function pushOwnToVessel() {
    var o = state.own;
    if (o.lat == null || o.lon == null) return;
    var data = {
      lat: o.lat,
      lon: o.lon,
      source: "wifi-ais",
      sog: o.sog,
      cog: o.cog,
      heading: o.hdg,
      rot: o.rot,
      mmsi: o.mmsi,
      updatedAt: new Date().toISOString()
    };
    try {
      if (typeof global.applyVesselProfile === "function") {
        global.applyVesselProfile(data);
      } else if (typeof global.plotUserVessel === "function") {
        global.plotUserVessel(o.lat, o.lon, "wifi-ais", true);
      }
    } catch (e) {}
  }

  function handleNmeaLine(line) {
    if (!line || line.charAt(0) !== "$" && line.charAt(0) !== "!") return;
    line = String(line).trim();
    if (!nmeaChecksumOk(line)) return;
    state.packets += 1;
    state.lastPacketAt = Date.now();

    var parts = line.split(",");
    var type = (parts[0] || "").slice(3).replace(/\*.*$/, "");
    if (parts[0].charAt(0) === "!") type = (parts[0] || "").slice(1, 6);

    if (type === "RMC" || parts[0].indexOf("RMC") >= 0) {
      var status = parts[2];
      if (status === "A" || status === "D" || !status) {
        applyOwnPatch({
          lat: parseCoord(parts[3], parts[4]),
          lon: parseCoord(parts[5], parts[6]),
          sog: parts[7] !== "" ? parseFloat(parts[7]) : null,
          cog: parts[8] !== "" ? parseFloat(parts[8]) : null
        });
      }
      return;
    }
    if (type === "GGA" || parts[0].indexOf("GGA") >= 0) {
      applyOwnPatch({
        lat: parseCoord(parts[2], parts[3]),
        lon: parseCoord(parts[4], parts[5])
      });
      return;
    }
    if (type === "HDT" || parts[0].indexOf("HDT") >= 0 || type === "HDG" || parts[0].indexOf("HDG") >= 0) {
      var h = parseFloat(parts[1]);
      if (isFinite(h)) applyOwnPatch({ hdg: h });
      return;
    }
    if (type === "ROT" || parts[0].indexOf("ROT") >= 0) {
      var r = parseFloat(parts[1]);
      if (isFinite(r)) applyOwnPatch({ rot: r });
      return;
    }
    if (type === "VTG" || parts[0].indexOf("VTG") >= 0) {
      applyOwnPatch({
        cog: parts[1] !== "" ? parseFloat(parts[1]) : null,
        sog: parts[5] !== "" ? parseFloat(parts[5]) : parts[7] !== "" ? parseFloat(parts[7]) : null
      });
      return;
    }
    // AIS VDM/VDO — leave for later; still count packets for link quality
    if (line.indexOf("VDM") >= 0 || line.indexOf("VDO") >= 0) {
      state.own.quality = fixQuality();
      updateMotionBrow();
      emit();
    }
  }

  function ingestBuffer(buf) {
    var text = typeof buf === "string" ? buf : String(buf || "");
    var lines = text.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
      var L = lines[i].trim();
      if (L) handleNmeaLine(L);
    }
  }

  function guessGatewayFromLocalIp(ip) {
    if (!ip || typeof ip !== "string") return null;
    var m = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if (!m) return null;
    return m[1] + "." + m[2] + "." + m[3] + ".1";
  }

  function loadSavedProfile() {
    try {
      return JSON.parse(localStorage.getItem(state.profileKey) || "null");
    } catch (e) {
      return null;
    }
  }

  function saveProfile(p) {
    try {
      localStorage.setItem(state.profileKey, JSON.stringify(p));
    } catch (e) {}
  }

  function ensureDom() {
    if (!document.getElementById("setsailMotionBrow")) {
      var brow = document.createElement("div");
      brow.id = "setsailMotionBrow";
      brow.className = "ss-motion-brow";
      brow.hidden = true;
      brow.setAttribute("role", "status");
      brow.innerHTML =
        '<div class="ss-motion-brow-inner">' +
        '<span class="ss-mb-src">Wi‑Fi AIS</span>' +
        '<span class="ss-mb-item"><abbr title="Heading">HDG</abbr> <b id="ssMbHdg">—</b></span>' +
        '<span class="ss-mb-item"><abbr title="Course over ground">COG</abbr> <b id="ssMbCog">—</b></span>' +
        '<span class="ss-mb-item"><abbr title="Speed over ground">SOG</abbr> <b id="ssMbSog">—</b><small>kn</small></span>' +
        '<span class="ss-mb-item"><abbr title="Rate of turn">ROT</abbr> <b id="ssMbRot">—</b></span>' +
        '<span class="ss-mb-item ss-mb-pos"><b id="ssMbPos">—</b></span>' +
        '<span class="ss-mb-q" id="ssMbQ">—</span>' +
        "</div>";
      var host =
        document.getElementById("ntmMap") ||
        document.querySelector("#tab-ntm .leaflet-container") ||
        document.getElementById("tab-ntm") ||
        document.body;
      if (host && host.id === "ntmMap") {
        host.style.position = host.style.position || "relative";
        host.appendChild(brow);
      } else if (host) {
        host.insertBefore(brow, host.firstChild);
      } else {
        document.body.appendChild(brow);
      }
    }
    if (!document.getElementById("setsailCloudPauseBanner")) {
      var ban = document.createElement("div");
      ban.id = "setsailCloudPauseBanner";
      ban.className = "ss-cloud-pause-banner";
      ban.hidden = true;
      ban.textContent =
        "SetChart cloud updates paused — on Wi‑Fi AIS module network. Showing cache + local feed.";
      var browEl = document.getElementById("setsailMotionBrow");
      if (browEl && browEl.parentNode) {
        browEl.parentNode.insertBefore(ban, browEl.nextSibling);
      } else {
        document.body.appendChild(ban);
      }
    }
  }

  function fmt(n, dig) {
    if (n == null || !isFinite(Number(n))) return "—";
    return Number(n).toFixed(dig == null ? 1 : dig);
  }

  function fmtPos(lat, lon) {
    if (lat == null || lon == null) return "—";
    var ns = lat >= 0 ? "N" : "S";
    var ew = lon >= 0 ? "E" : "W";
    return Math.abs(lat).toFixed(5) + "°" + ns + "  " + Math.abs(lon).toFixed(5) + "°" + ew;
  }

  function updateMotionBrow() {
    ensureDom();
    var brow = document.getElementById("setsailMotionBrow");
    if (!brow) return;
    brow.hidden = !state.connected;
    if (!state.connected) return;
    var o = state.own;
    var q = fixQuality();
    o.quality = q;
    var el = function (id) {
      return document.getElementById(id);
    };
    if (el("ssMbHdg")) el("ssMbHdg").textContent = fmt(o.hdg, 1) + (o.hdg != null ? "°" : "");
    if (el("ssMbCog")) el("ssMbCog").textContent = fmt(o.cog, 1) + (o.cog != null ? "°" : "");
    if (el("ssMbSog")) el("ssMbSog").textContent = fmt(o.sog, 1);
    if (el("ssMbRot")) el("ssMbRot").textContent = o.rot != null && isFinite(o.rot) ? fmt(o.rot, 1) : "—";
    if (el("ssMbPos")) el("ssMbPos").textContent = fmtPos(o.lat, o.lon);
    if (el("ssMbQ")) {
      el("ssMbQ").textContent = q.toUpperCase();
      el("ssMbQ").setAttribute("data-q", q);
    }
  }

  function getNative() {
    return global.SetSailNativeLan || (global.Capacitor && global.Capacitor.Plugins && global.Capacitor.Plugins.SetSailLan) || null;
  }

  function isNativeShell() {
    try {
      if (global.Capacitor && global.Capacitor.isNativePlatform && global.Capacitor.isNativePlatform()) return true;
    } catch (e) {}
    try {
      if (global.SetSailNativeLan) return true;
    } catch (e2) {}
    return !!(global.navigator && /Electron/i.test(global.navigator.userAgent || ""));
  }

  async function autoDetect() {
    var native = getNative();
    var report = { tried: [], found: null, localIp: null, gateway: null };

    if (native && typeof native.getNetworkInfo === "function") {
      try {
        var info = await native.getNetworkInfo();
        report.localIp = info && info.ip;
        report.gateway = (info && info.gateway) || guessGatewayFromLocalIp(report.localIp);
      } catch (e) {}
    }
    if (!report.gateway && report.localIp) report.gateway = guessGatewayFromLocalIp(report.localIp);
    // SafePilot-like default subnet hint from bridge phone
    if (!report.gateway) report.gateway = "192.168.5.1";

    if (native && typeof native.listenUdp === "function") {
      try {
        await native.listenUdp({ port: 10110 });
        report.tried.push("udp:10110:broadcast");
      } catch (e0) {}
    }

    var hosts = [report.gateway, "192.168.5.1", "192.168.1.1", "192.168.0.1"].filter(Boolean);
    var uniq = [];
    hosts.forEach(function (h) {
      if (uniq.indexOf(h) < 0) uniq.push(h);
    });

    if (native && typeof native.probe === "function") {
      for (var hi = 0; hi < uniq.length; hi++) {
        for (var pi = 0; pi < COMMON_PORTS.length; pi++) {
          var host = uniq[hi];
          var port = COMMON_PORTS[pi];
          report.tried.push(host + ":" + port);
          try {
            var hit = await native.probe({ host: host, port: port, timeoutMs: 600 });
            if (hit && hit.ok) {
              report.found = { host: host, port: port, proto: hit.proto || "udp" };
              return report;
            }
          } catch (e1) {}
        }
      }
    }

    var saved = loadSavedProfile();
    if (saved && saved.host && saved.port) {
      report.found = saved;
      return report;
    }
    return report;
  }

  async function connect(opts) {
    opts = opts || {};
    await disconnect();
    ensureDom();

    var host = opts.host;
    var port = Number(opts.port) || 10110;
    var proto = (opts.proto || "udp").toLowerCase();
    var mode = opts.mode || "manual";

    if (opts.auto) {
      mode = "auto";
      var det = await autoDetect();
      if (det.found) {
        host = det.found.host;
        port = Number(det.found.port) || port;
        proto = det.found.proto || proto;
      } else if (!host) {
        host = det.gateway || "192.168.5.1";
      }
    }

    state.mode = mode;
    state.host = host;
    state.port = port;
    state.proto = proto;
    state.connected = true;
    state.packets = 0;
    state.lastPacketAt = 0;
    setCloudPaused(true);
    updateMotionBrow();

    var native = getNative();
    if (native && typeof native.onData === "function") {
      try {
        native.onData(function (chunk) {
          ingestBuffer(chunk);
        });
      } catch (eOn) {}
    }
    if (native && typeof native.connect === "function") {
      nativeHandle = await native.connect({
        host: host,
        port: port,
        proto: proto
      });
    } else if (native && typeof native.start === "function") {
      await native.start({ host: host, port: port, proto: proto });
      if (typeof native.addListener === "function") {
        native.addListener("nmea", function (ev) {
          ingestBuffer((ev && ev.data) || ev);
        });
      }
    } else {
      // Browser / no native: stay "connected" for UI; ingest via simulate or future WebSocket
      console.info("[SetSailLanAis] No native LAN bridge — waiting for SetSailNativeLan / Capacitor plugin");
    }

    saveProfile({ host: host, port: port, proto: proto, mode: mode, savedAt: Date.now() });
    emit();
    if (!browTimer) browTimer = setInterval(updateMotionBrow, 1000);
    return getSnapshot();
  }

  async function disconnect() {
    state.connected = false;
    setCloudPaused(false);
    updateMotionBrow();
    try {
      var native = getNative();
      if (nativeHandle && native && native.disconnect) await native.disconnect(nativeHandle);
      else if (native && native.stop) await native.stop();
    } catch (e) {}
    nativeHandle = null;
    if (browTimer) {
      clearInterval(browTimer);
      browTimer = null;
    }
    emit();
  }

  // Electron preload may push data
  global.__setsailLanAisIngest = ingestBuffer;

  global.SetSailLanAis = {
    connect: connect,
    disconnect: disconnect,
    autoDetect: autoDetect,
    ingest: ingestBuffer,
    getSnapshot: getSnapshot,
    onChange: onChange,
    loadSavedProfile: loadSavedProfile,
    isNativeShell: isNativeShell,
    COMMON_PORTS: COMMON_PORTS.slice()
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureDom);
  } else {
    ensureDom();
  }
})(typeof window !== "undefined" ? window : globalThis);
