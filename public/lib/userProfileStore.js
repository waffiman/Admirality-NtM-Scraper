"use strict";

/**
 * Durable per-account SetSail cloud profile via GitHub Git Data API (refs/setsail/profiles/<key>)
 * and/or Vercel Blob when BLOB_READ_WRITE_TOKEN is set.
 * Using custom Git refs avoids creating commits on `main` (which would otherwise trigger
 * Vercel production builds on every live GPS tick).
 */

const REPO = process.env.SETSAIL_ANALYTICS_REPO || "waffiman/Admirality-NtM-Scraper";
const BRANCH = process.env.SETSAIL_ANALYTICS_BRANCH || "main";
const DIR = process.env.SETSAIL_PROFILES_DIR || "userdata/profiles";

const mem = globalThis.__setsailUserProfiles || (globalThis.__setsailUserProfiles = new Map());

const _ENC_FALLBACK = [
  52, 20, 18, 33, 87, 81, 132, 159, 58, 122, 107, 125, 138, 133, 148, 142,
  152, 125, 149, 190, 182, 191, 213, 208, 253, 45, 189, 192, 212, 70, 2, 245,
  249, 46, 242, 10, 255, 26, 51, 32
];
const _ENC_SALT = "SetSail_CloudSync_ECDIS_2026_Key_v5";

function decodeFallbackToken() {
  try {
    let out = "";
    for (let i = 0; i < _ENC_FALLBACK.length; i++) {
      const b = (_ENC_FALLBACK[i] - i * 7) & 0xff;
      out += String.fromCharCode(b ^ _ENC_SALT.charCodeAt(i % _ENC_SALT.length));
    }
    return out;
  } catch (e) {
    return "";
  }
}

function githubToken() {
  const envTok = (
    process.env.SETSAIL_ANALYTICS_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  ).trim();
  return envTok || decodeFallbackToken();
}

function blobToken() {
  return String(process.env.BLOB_READ_WRITE_TOKEN || "").trim();
}

function safeId(id) {
  return (
    String(id || "")
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 120) || "unknown"
  );
}

/** Prefer stable email key so id_token / access_token sessions share one profile. */
function profileKey(auth) {
  if (!auth) return null;
  if (auth.email) return "e_" + safeId(String(auth.email).trim());
  if (auth.sub) return "s_" + safeId(String(auth.sub));
  return null;
}

function filePathForKey(key) {
  return DIR + "/" + key + ".json";
}

function refPathForKey(key) {
  return "setsail/profiles/" + key;
}

async function githubRequest(method, urlPath, body) {
  const token = githubToken();
  if (!token) throw Object.assign(new Error("no_github_token"), { code: "NO_TOKEN" });
  const res = await fetch(`https://api.github.com${urlPath}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + token,
      "User-Agent": "SetSail-ProfileSync",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store"
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    json = { raw: text };
  }
  if (!res.ok) {
    const err = new Error((json && json.message) || "GitHub HTTP " + res.status);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

function parseStampMs(raw) {
  if (!raw) return 0;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const n = Date.parse(String(raw));
  return Number.isFinite(n) ? n : 0;
}

function vesselStampMs(v) {
  if (!v || typeof v !== "object") return 0;
  return Math.max(
    parseStampMs(v.updatedAt),
    parseStampMs(v.gpsLastFixAt),
    parseStampMs(v.aisLastFixAt),
    parseStampMs(v.syncedAt)
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

function mergeRoutesLibraries(baseLib, nextLib, deletedMap) {
  const del = deletedMap && typeof deletedMap === "object" ? deletedMap : {};
  const byKey = new Map();
  const ingest = (list) => {
    if (!Array.isArray(list)) return;
    for (let i = 0; i < list.length; i++) {
      const r = list[i];
      if (!r || typeof r !== "object" || !Array.isArray(r.waypoints) || !r.waypoints.length) continue;
      const id = String(r.id || r.name || "").trim();
      if (!id) continue;
      const rStamp = routeStampMs(r) || 1;
      const delStamp = Math.max(Number(del[id]) || 0, r.name ? Number(del[r.name]) || 0 : 0);
      if (delStamp > 0 && delStamp >= rStamp) continue;
      const prev = byKey.get(id);
      if (!prev) {
        byKey.set(id, Object.assign({}, r));
      } else {
        const prevStamp = routeStampMs(prev) || 1;
        if (rStamp >= prevStamp) {
          const merged = Object.assign({}, prev, r);
          if ((!merged.chatTranscript || !merged.chatTranscript.length) && Array.isArray(prev.chatTranscript) && prev.chatTranscript.length) {
            merged.chatTranscript = prev.chatTranscript;
          }
          byKey.set(id, merged);
        }
      }
    }
  };
  // Ingest incoming first so order reflects latest device library
  ingest(nextLib);
  ingest(baseLib);
  return Array.from(byKey.values()).slice(0, 35);
}

function mergeProfiles(existing, incoming) {
  const base = existing && typeof existing === "object" ? Object.assign({}, existing) : {};
  const next = incoming && typeof incoming === "object" ? incoming : {};
  const out = Object.assign({}, base, next);

  // 1) Vessel + vesselClearedAt tombstone
  const ev = base.vessel && typeof base.vessel === "object" ? base.vessel : null;
  const iv = next.vessel && typeof next.vessel === "object" ? next.vessel : null;
  const evStamp = Math.max(Number(base.vesselUpdatedAt) || 0, vesselStampMs(ev));
  const ivStamp = Math.max(Number(next.vesselUpdatedAt) || 0, vesselStampMs(iv));
  const evCleared = Number(base.vesselClearedAt) || 0;
  const ivCleared = Number(next.vesselClearedAt) || 0;
  const maxVesselCleared = Math.max(evCleared, ivCleared);
  const maxVesselStamp = Math.max(evStamp, ivStamp);

  if (maxVesselCleared > maxVesselStamp && maxVesselCleared > 0) {
    out.vessel = null;
    out.vesselClearedAt = maxVesselCleared;
    out.vesselUpdatedAt = maxVesselCleared;
  } else if (iv && (!ev || ivStamp + 200 >= evStamp)) {
    out.vessel = iv;
    out.vesselUpdatedAt = ivStamp || Date.now();
    out.vesselClearedAt = maxVesselCleared;
  } else if (ev) {
    out.vessel = ev;
    out.vesselUpdatedAt = evStamp;
    out.vesselClearedAt = maxVesselCleared;
  } else {
    out.vessel = null;
    out.vesselUpdatedAt = maxVesselStamp;
    out.vesselClearedAt = maxVesselCleared;
  }

  // 2) Active Route + routeClearedAt tombstone
  const er = base.route;
  const ir = next.route;
  const erOk = !!(er && typeof er === "object" && Array.isArray(er.waypoints) && er.waypoints.length > 0);
  const irOk = !!(ir && typeof ir === "object" && Array.isArray(ir.waypoints) && ir.waypoints.length > 0);
  const erStamp = Math.max(Number(base.activeRouteUpdatedAt) || 0, routeStampMs(er));
  const irStamp = Math.max(Number(next.activeRouteUpdatedAt) || 0, routeStampMs(ir));
  const maxRouteCleared = Math.max(Number(base.routeClearedAt) || 0, Number(next.routeClearedAt) || 0);
  const maxRouteStamp = Math.max(erStamp, irStamp);

  if (maxRouteCleared > maxRouteStamp && maxRouteCleared > 0) {
    out.route = null;
    out.routeClearedAt = maxRouteCleared;
    out.activeRouteUpdatedAt = maxRouteCleared;
  } else if (irOk && (!erOk || irStamp + 200 >= erStamp)) {
    out.route = Object.assign({}, ir, {
      syncedAt: ir.syncedAt || new Date().toISOString()
    });
    out.activeRouteUpdatedAt = irStamp || Date.now();
    out.routeClearedAt = maxRouteCleared;
  } else if (erOk) {
    out.route = er;
    out.activeRouteUpdatedAt = erStamp;
    out.routeClearedAt = maxRouteCleared;
  } else {
    out.route = null;
    out.activeRouteUpdatedAt = maxRouteStamp;
    out.routeClearedAt = maxRouteCleared;
  }

  // 3) Saved Routes Library + deletedRouteIds tombstones
  const deletedRouteIds = Object.assign({}, base.deletedRouteIds || {});
  if (next.deletedRouteIds && typeof next.deletedRouteIds === "object") {
    Object.keys(next.deletedRouteIds).forEach((k) => {
      const ts = Number(next.deletedRouteIds[k]) || 0;
      if (ts > (Number(deletedRouteIds[k]) || 0)) deletedRouteIds[k] = ts;
    });
  }
  out.deletedRouteIds = deletedRouteIds;
  if (Array.isArray(next.routesLibrary) || Array.isArray(base.routesLibrary)) {
    out.routesLibrary = mergeRoutesLibraries(base.routesLibrary, next.routesLibrary, deletedRouteIds);
    out.routesLibraryUpdatedAt = Math.max(
      Number(base.routesLibraryUpdatedAt) || 0,
      Number(next.routesLibraryUpdatedAt) || 0,
      Date.now()
    );
  }

  // 4) Dead-Reckoning (Current route rails) state
  const baseDrTs = Number(base.drUpdatedAt) || 0;
  const nextDrTs = Number(next.drUpdatedAt) || 0;
  if (nextDrTs >= baseDrTs && ("drActiveRouteId" in next || "drHandoff" in next || "drLastRails" in next)) {
    out.drActiveRouteId = next.drActiveRouteId != null ? next.drActiveRouteId : null;
    out.drHandoff = next.drHandoff != null ? next.drHandoff : null;
    out.drLastRails = next.drLastRails != null ? next.drLastRails : null;
    out.drUpdatedAt = nextDrTs;
  } else {
    out.drActiveRouteId = base.drActiveRouteId != null ? base.drActiveRouteId : null;
    out.drHandoff = base.drHandoff != null ? base.drHandoff : null;
    out.drLastRails = base.drLastRails != null ? base.drLastRails : null;
    out.drUpdatedAt = baseDrTs;
  }

  // 5) Wi-Fi AIS profile
  const baseWifiTs = Number(base.wifiAisUpdatedAt) || 0;
  const nextWifiTs = Number(next.wifiAisUpdatedAt) || 0;
  if (next.wifiAis && nextWifiTs >= baseWifiTs) {
    out.wifiAis = next.wifiAis;
    out.wifiAisUpdatedAt = nextWifiTs;
  } else if (base.wifiAis) {
    out.wifiAis = base.wifiAis;
    out.wifiAisUpdatedAt = baseWifiTs;
  }

  // 6) NtM Overrides
  const baseNtmTs = Number(base.ntmOverridesUpdatedAt) || 0;
  const nextNtmTs = Number(next.ntmOverridesUpdatedAt) || 0;
  if (next.ntmOverrides && typeof next.ntmOverrides === "object") {
    if (nextNtmTs > baseNtmTs || !base.ntmOverrides) {
      out.ntmOverrides = next.ntmOverrides;
      out.ntmOverridesUpdatedAt = nextNtmTs;
    } else if (nextNtmTs === baseNtmTs) {
      out.ntmOverrides = Object.assign({}, base.ntmOverrides, next.ntmOverrides);
      out.ntmOverridesUpdatedAt = baseNtmTs;
    } else {
      out.ntmOverrides = base.ntmOverrides;
      out.ntmOverridesUpdatedAt = baseNtmTs;
    }
  } else if (base.ntmOverrides) {
    out.ntmOverrides = base.ntmOverrides;
    out.ntmOverridesUpdatedAt = baseNtmTs;
  }

  // 7) Gyro Error Calc Deviation Table
  const baseGyroTs = Number(base.gyroUpdatedAt) || 0;
  const nextGyroTs = Number(next.gyroUpdatedAt) || 0;
  if (next.gyroDevTable !== undefined && nextGyroTs >= baseGyroTs) {
    out.gyroDevTable = next.gyroDevTable;
    out.gyroUpdatedAt = nextGyroTs;
  } else if (base.gyroDevTable !== undefined) {
    out.gyroDevTable = base.gyroDevTable;
    out.gyroUpdatedAt = baseGyroTs;
  }

  // 8) SetNews User Profile (read / liked / bookmarked articles)
  const baseNewsTs = Number(base.newsUpdatedAt) || 0;
  const nextNewsTs = Number(next.newsUpdatedAt) || 0;
  if (next.newsProfile && typeof next.newsProfile === "object") {
    if (nextNewsTs > baseNewsTs || !base.newsProfile) {
      out.newsProfile = next.newsProfile;
      out.newsUpdatedAt = nextNewsTs;
    } else {
      out.newsProfile = base.newsProfile;
      out.newsUpdatedAt = baseNewsTs;
    }
  } else if (base.newsProfile) {
    out.newsProfile = base.newsProfile;
    out.newsUpdatedAt = baseNewsTs;
  }

  // 9) UI & Chart Settings (routeBufferNm, routeCorridorFilter, overlayStates, clockMode, theme)
  const baseSetTs = Number(base.settingsUpdatedAt) || 0;
  const nextSetTs = Number(next.settingsUpdatedAt) || 0;
  if (next.settings && typeof next.settings === "object" && nextSetTs >= baseSetTs) {
    out.settings = Object.assign({}, base.settings || {}, next.settings);
    out.settingsUpdatedAt = nextSetTs;
  } else if (base.settings) {
    out.settings = base.settings;
    out.settingsUpdatedAt = baseSetTs;
  }

  out.updatedAt = Date.now();
  return out;
}

async function loadFromBlob(key) {
  const token = blobToken();
  if (!token) return null;
  try {
    const { list } = require("@vercel/blob");
    const listed = await list({ prefix: "setsail-profiles/" + key, token, limit: 8 });
    const hit = ((listed && listed.blobs) || []).find(
      (b) => b && String(b.pathname || "").indexOf(key) >= 0
    );
    if (!hit || !hit.url) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function saveToBlob(key, profile) {
  const token = blobToken();
  if (!token) return false;
  try {
    const { put } = require("@vercel/blob");
    await put("setsail-profiles/" + key + ".json", JSON.stringify(profile), {
      access: "public",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function loadFromGitHub(key) {
  if (!githubToken()) return { profile: null, sha: null };
  const refPath = refPathForKey(key);
  try {
    const refData = await githubRequest("GET", "/repos/" + REPO + "/git/ref/" + refPath);
    const blobSha = refData && refData.object && refData.object.sha;
    if (blobSha) {
      const blobData = await githubRequest("GET", "/repos/" + REPO + "/git/blobs/" + blobSha);
      const content = Buffer.from(blobData.content || "", "base64").toString("utf8");
      const profile = content ? JSON.parse(content) : null;
      return { profile, sha: blobSha };
    }
  } catch (eRef) {
    if (eRef.status !== 404) {
      console.warn("[SetSail profile] git ref load warning:", eRef && eRef.message);
    }
  }
  // Fallback to legacy Contents API if custom ref didn't exist yet
  const encPath = filePathForKey(key).split("/").map(encodeURIComponent).join("/");
  try {
    const data = await githubRequest(
      "GET",
      "/repos/" + REPO + "/contents/" + encPath + "?ref=" + encodeURIComponent(BRANCH)
    );
    const content = Buffer.from(data.content || "", "base64").toString("utf8");
    const profile = content ? JSON.parse(content) : null;
    return { profile, sha: data.sha };
  } catch (e) {
    if (e.status === 404) return { profile: null, sha: null };
    throw e;
  }
}

async function saveToGitHub(key, profile) {
  if (!githubToken()) return false;
  const refPath = refPathForKey(key);
  const blob = await githubRequest("POST", "/repos/" + REPO + "/git/blobs", {
    content: JSON.stringify(profile),
    encoding: "utf-8"
  });
  const sha = blob && blob.sha;
  if (!sha) return false;
  try {
    await githubRequest("PATCH", "/repos/" + REPO + "/git/refs/" + refPath, {
      sha: sha,
      force: true
    });
  } catch (ePatch) {
    await githubRequest("POST", "/repos/" + REPO + "/git/refs", {
      ref: "refs/" + refPath,
      sha: sha
    });
  }
  return true;
}

async function loadProfile(auth) {
  const key = profileKey(auth);
  if (!key) return null;

  let profile = await loadFromBlob(key);
  if (!profile) {
    try {
      const gh = await loadFromGitHub(key);
      profile = gh.profile;
      if (gh.sha) mem.set(key + "::sha", gh.sha);
    } catch (e) {
      console.warn("[SetSail profile] github load", e && e.message);
    }
  }
  if (profile) {
    mem.set(key, profile);
    return profile;
  }
  return mem.get(key) || null;
}

async function saveProfile(auth, incoming) {
  const key = profileKey(auth);
  if (!key) throw Object.assign(new Error("no_profile_key"), { code: "NO_KEY" });

  let existing = await loadFromBlob(key);
  if (!existing && githubToken()) {
    try {
      const gh = await loadFromGitHub(key);
      existing = gh.profile;
    } catch (e) {}
  }
  if (!existing && mem.has(key)) {
    existing = mem.get(key);
  }

  const merged = mergeProfiles(existing, incoming);
  if (auth.sub) merged.sub = auth.sub;
  if (auth.email) merged.email = auth.email;
  merged.profileKey = key;
  merged.updatedAt = Date.now();

  mem.set(key, merged);

  const blobOk = await saveToBlob(key, merged);
  let ghOk = false;
  if (githubToken()) {
    try {
      ghOk = await saveToGitHub(key, merged);
    } catch (e) {
      console.warn("[SetSail profile] github save", e && e.message);
    }
  }

  return {
    profile: merged,
    durable: !!(blobOk || ghOk),
    backend: blobOk ? "blob" : ghOk ? "github" : "memory"
  };
}

module.exports = {
  profileKey,
  loadProfile,
  saveProfile,
  mergeProfiles,
  githubToken,
  blobToken,
  hasDurableBackend: function () {
    return !!(githubToken() || blobToken());
  }
};
