"use strict";

/**
 * Durable per-account SetSail profile (vessel + route) via GitHub Contents API.
 * Reuses SETSAIL_ANALYTICS_GITHUB_TOKEN / GITHUB_TOKEN (same as analyticsStore).
 * Optional faster path: Vercel Blob when BLOB_READ_WRITE_TOKEN is set.
 */

const REPO = process.env.SETSAIL_ANALYTICS_REPO || "waffiman/Admirality-NtM-Scraper";
const BRANCH = process.env.SETSAIL_ANALYTICS_BRANCH || "main";
const DIR = process.env.SETSAIL_PROFILES_DIR || "userdata/profiles";

const mem = globalThis.__setsailUserProfiles || (globalThis.__setsailUserProfiles = new Map());

function githubToken() {
  return (
    process.env.SETSAIL_ANALYTICS_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  ).trim();
}

function blobToken() {
  return String(process.env.BLOB_READ_WRITE_TOKEN || "").trim();
}

function safeId(id) {
  return String(id || "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 120) || "unknown";
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
    body: body ? JSON.stringify(body) : undefined
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

function vesselStampMs(v) {
  if (!v || typeof v !== "object") return 0;
  const raw = v.syncedAt || v.gpsLastFixAt || v.aisLastFixAt || v.updatedAt || 0;
  const n = typeof raw === "number" ? raw : Date.parse(raw);
  return Number.isFinite(n) ? n : 0;
}

function routeStampMs(r) {
  if (!r || typeof r !== "object") return 0;
  const raw = r.syncedAt || r.updatedAt || r.savedAt || 0;
  const n = typeof raw === "number" ? raw : Date.parse(raw);
  return Number.isFinite(n) ? n : 0;
}

function mergeProfiles(existing, incoming) {
  const base = existing && typeof existing === "object" ? Object.assign({}, existing) : {};
  const next = incoming && typeof incoming === "object" ? incoming : {};
  const out = Object.assign({}, base, next);

  // Vessel: keep the fresher live fix (don't let stale desktop wipe phone GPS)
  const ev = base.vessel;
  const iv = next.vessel;
  if (iv && typeof iv === "object") {
    if (!ev) out.vessel = iv;
    else if (vesselStampMs(iv) + 400 >= vesselStampMs(ev)) out.vessel = iv;
    else out.vessel = ev;
  } else if (ev) {
    out.vessel = ev;
  }

  // Route: never delete cloud route because a device pushed null/empty
  const er = base.route;
  const ir = next.route;
  const irOk = ir && typeof ir === "object" && Array.isArray(ir.waypoints) && ir.waypoints.length > 0;
  const erOk = er && typeof er === "object" && Array.isArray(er.waypoints) && er.waypoints.length > 0;
  if (irOk) {
    if (!erOk || routeStampMs(ir) + 400 >= routeStampMs(er)) out.route = Object.assign({}, ir, {
      syncedAt: ir.syncedAt || new Date().toISOString()
    });
    else out.route = er;
  } else if (erOk) {
    out.route = er;
  }

  if (next.wifiAis) out.wifiAis = next.wifiAis;
  else if (base.wifiAis) out.wifiAis = base.wifiAis;

  if (next.ntmOverrides) out.ntmOverrides = next.ntmOverrides;
  else if (base.ntmOverrides) out.ntmOverrides = base.ntmOverrides;

  out.updatedAt = Date.now();
  return out;
}

async function loadFromBlob(key) {
  const token = blobToken();
  if (!token) return null;
  try {
    const { list } = require("@vercel/blob");
    const pathname = "setsail-profiles/" + key + ".json";
    const listed = await list({ prefix: "setsail-profiles/" + key, token, limit: 8 });
    const hit = (listed && listed.blobs || []).find((b) => b && String(b.pathname || "").indexOf(key) >= 0);
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

async function saveToGitHub(key, profile, sha) {
  if (!githubToken()) return false;
  const encPath = filePathForKey(key).split("/").map(encodeURIComponent).join("/");
  const body = {
    message: "chore(profile): sync " + key + " " + new Date().toISOString(),
    content: Buffer.from(JSON.stringify(profile), "utf8").toString("base64"),
    branch: BRANCH
  };
  if (sha) body.sha = sha;
  await githubRequest("PUT", "/repos/" + REPO + "/contents/" + encPath, body);
  return true;
}

async function loadProfile(auth) {
  const key = profileKey(auth);
  if (!key) return null;
  if (mem.has(key)) return mem.get(key);

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
  if (profile) mem.set(key, profile);
  return profile || null;
}

async function saveProfile(auth, incoming) {
  const key = profileKey(auth);
  if (!key) throw Object.assign(new Error("no_profile_key"), { code: "NO_KEY" });

  let existing = mem.get(key) || null;
  if (!existing) {
    existing = await loadFromBlob(key);
  }
  let sha = mem.get(key + "::sha") || null;
  if (!existing && githubToken()) {
    try {
      const gh = await loadFromGitHub(key);
      existing = gh.profile;
      sha = gh.sha;
    } catch (e) {}
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
      // retry once on SHA conflict
      for (let i = 0; i < 2; i++) {
        try {
          await saveToGitHub(key, merged, sha);
          ghOk = true;
          // refresh sha
          try {
            const again = await loadFromGitHub(key);
            if (again.sha) mem.set(key + "::sha", again.sha);
          } catch (e2) {}
          break;
        } catch (e) {
          if (e.status === 409) {
            const again = await loadFromGitHub(key);
            sha = again.sha;
            existing = again.profile;
            Object.assign(merged, mergeProfiles(existing, incoming));
            mem.set(key, merged);
            continue;
          }
          throw e;
        }
      }
    } catch (e) {
      console.warn("[SetSail profile] github save", e && e.message);
    }
  }

  return {
    profile: merged,
    durable: !!(blobOk || ghOk),
    backend: blobOk ? "blob" : (ghOk ? "github" : "memory")
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
