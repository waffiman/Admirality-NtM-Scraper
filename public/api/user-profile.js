"use strict";

/**
 * Google-keyed cloud profile (vessel / route / wifi AIS).
 * Accepts Google ID token (JWT) OR OAuth access_token (verified via userinfo).
 * Durable store: in-memory + Vercel Blob when BLOB_READ_WRITE_TOKEN is set.
 */

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string" && req.body) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (e) {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 512000) resolve({});
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function b64urlToJson(part) {
  try {
    const pad = part.length % 4 === 0 ? "" : "=".repeat(4 - (part.length % 4));
    const b64 = (part + pad).replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  } catch (e) {
    return null;
  }
}

async function verifyGoogleAccessToken(token) {
  try {
    const resp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: "Bearer " + token }
    });
    if (!resp.ok) return null;
    const j = await resp.json();
    if (!j || !j.sub) return null;
    return { sub: String(j.sub), email: j.email || null, token: token, kind: "access_token" };
  } catch (e) {
    return null;
  }
}

async function decodeBearer(req) {
  const h = req.headers.authorization || req.headers.Authorization || "";
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const token = m[1].trim();
  if (!token) return null;

  // Prefer JWT id_token (GIS One Tap / credential response)
  const bits = token.split(".");
  if (bits.length >= 2) {
    const payload = b64urlToJson(bits[1]);
    if (payload && payload.sub) {
      if (payload.exp && Number(payload.exp) * 1000 < Date.now() - 60000) {
        // expired JWT — still try as access token below
      } else {
        return { sub: String(payload.sub), email: payload.email || null, token: token, kind: "id_token" };
      }
    }
  }

  // OAuth popup path stores opaque / non-profile access_token
  return verifyGoogleAccessToken(token);
}

const mem = globalThis.__setsailProfiles || (globalThis.__setsailProfiles = new Map());

function blobPath(sub) {
  return "setsail-profiles/" + encodeURIComponent(String(sub)) + ".json";
}

async function loadProfile(sub) {
  if (mem.has(sub)) return mem.get(sub);
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const { list } = require("@vercel/blob");
    const pathname = blobPath(sub);
    const listed = await list({ prefix: "setsail-profiles/" + encodeURIComponent(String(sub)), token: token, limit: 8 });
    const hit = (listed && listed.blobs || []).find((b) => b && (b.pathname === pathname || String(b.pathname || "").endsWith(sub + ".json")));
    const url = hit && hit.url;
    if (!url) return null;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const j = await res.json();
    mem.set(sub, j);
    return j;
  } catch (e) {
    console.warn("[SetSail profile] blob load skipped", e && e.message);
    return null;
  }
}

/**
 * Same-account cloud profile may keep live GPS/DR display coords so devices
 * mirror My Vessel motion. This is NOT a public AIS feed.
 */
function sanitizeProfileVessel(profile) {
  if (!profile || typeof profile !== "object" || !profile.vessel || typeof profile.vessel !== "object") {
    return profile;
  }
  const v = Object.assign({}, profile.vessel);
  if (v.lat != null) v.lat = Number(v.lat);
  if (v.lon != null) v.lon = Number(v.lon);
  profile.vessel = v;
  return profile;
}

async function saveProfile(sub, profile) {
  sanitizeProfileVessel(profile);
  mem.set(sub, profile);
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return profile;
  try {
    const { put } = require("@vercel/blob");
    await put(blobPath(sub), JSON.stringify(profile), {
      access: "public",
      token: token,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0
    });
  } catch (e) {
    console.warn("[SetSail profile] blob save skipped", e && e.message);
  }
  return profile;
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const auth = await decodeBearer(req);
  if (!auth) {
    res.statusCode = 401;
    return res.json({ ok: false, error: "unauthorized" });
  }

  if (req.method === "GET") {
    const profile = await loadProfile(auth.sub);
    res.statusCode = 200;
    return res.json({
      ok: true,
      sub: auth.sub,
      email: auth.email || null,
      profile: profile || null,
      durable: !!process.env.BLOB_READ_WRITE_TOKEN
    });
  }

  if (req.method === "PUT") {
    const body = await readBody(req);
    const profile = body.profile && typeof body.profile === "object" ? body.profile : body;
    if (!profile || typeof profile !== "object") {
      res.statusCode = 400;
      return res.json({ ok: false, error: "missing_profile" });
    }
    profile.updatedAt = Date.now();
    profile.sub = auth.sub;
    if (auth.email) profile.email = auth.email;
    await saveProfile(auth.sub, profile);
    res.statusCode = 200;
    return res.json({ ok: true, profile: profile, durable: !!process.env.BLOB_READ_WRITE_TOKEN });
  }

  res.statusCode = 405;
  return res.json({ ok: false, error: "method_not_allowed" });
};
