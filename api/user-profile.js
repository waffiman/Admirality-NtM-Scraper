"use strict";

/**
 * Google-keyed cloud profile (vessel / route / wifi AIS).
 * Durable: GitHub Contents (SETSAIL_ANALYTICS_GITHUB_TOKEN) and/or Vercel Blob.
 */

const store = require("../lib/userProfileStore");

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
      if (raw.length > 900000) resolve({});
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

  const bits = token.split(".");
  if (bits.length >= 2) {
    const payload = b64urlToJson(bits[1]);
    if (payload && payload.sub) {
      if (!(payload.exp && Number(payload.exp) * 1000 < Date.now() - 60000)) {
        return {
          sub: String(payload.sub),
          email: payload.email || null,
          token: token,
          kind: "id_token"
        };
      }
    }
  }
  return verifyGoogleAccessToken(token);
}

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
    try {
      const profile = await store.loadProfile(auth);
      res.statusCode = 200;
      return res.json({
        ok: true,
        sub: auth.sub,
        email: auth.email || null,
        profileKey: store.profileKey(auth),
        profile: profile || null,
        durable: store.hasDurableBackend()
      });
    } catch (e) {
      res.statusCode = 500;
      return res.json({ ok: false, error: "load_failed", message: e && e.message });
    }
  }

  if (req.method === "PUT") {
    const body = await readBody(req);
    const profile = body.profile && typeof body.profile === "object" ? body.profile : body;
    if (!profile || typeof profile !== "object") {
      res.statusCode = 400;
      return res.json({ ok: false, error: "missing_profile" });
    }
    sanitizeProfileVessel(profile);
    try {
      const saved = await store.saveProfile(auth, profile);
      res.statusCode = 200;
      return res.json({
        ok: true,
        profile: saved.profile,
        durable: saved.durable,
        backend: saved.backend
      });
    } catch (e) {
      res.statusCode = 500;
      return res.json({ ok: false, error: "save_failed", message: e && e.message });
    }
  }

  res.statusCode = 405;
  return res.json({ ok: false, error: "method_not_allowed" });
};
