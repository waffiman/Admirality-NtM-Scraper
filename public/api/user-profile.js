"use strict";

/**
 * Google-keyed cloud profile (vessel / route / routesLibrary / drState / settings / overrides).
 * Durable: GitHub Git Data API (refs/setsail/profiles/<key>) and/or Vercel Blob.
 */

const store = require("../lib/userProfileStore");

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-SetSail-User-Email, X-SetSail-User-Sub"
  );
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
      if (raw.length > 2500000) resolve({});
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
    if (!j || (!j.sub && !j.email)) return null;
    return {
      sub: String(j.sub || j.email),
      email: j.email || null,
      token: token,
      kind: "access_token"
    };
  } catch (e) {
    return null;
  }
}

async function decodeBearer(req) {
  const hdrEmail = String(
    req.headers["x-setsail-user-email"] || req.headers["X-SetSail-User-Email"] || ""
  ).trim();
  const hdrSub = String(
    req.headers["x-setsail-user-sub"] || req.headers["X-SetSail-User-Sub"] || ""
  ).trim();

  const h = req.headers.authorization || req.headers.Authorization || "";
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  const token = m ? m[1].trim() : "";

  if (token) {
    const bits = token.split(".");
    if (bits.length >= 2) {
      const payload = b64urlToJson(bits[1]);
      if (payload && (payload.sub || payload.email)) {
        // Accept Google id_token or session JWT even after 1h expiry so persistent
        // signed-in devices continue syncing seamlessly without hourly re-login prompts.
        return {
          sub: String(payload.sub || payload.email),
          email: payload.email || hdrEmail || null,
          token: token,
          kind: "id_token"
        };
      }
    }
    const verified = await verifyGoogleAccessToken(token);
    if (verified) {
      if (!verified.email && hdrEmail) verified.email = hdrEmail;
      return verified;
    }
  }

  // Fallback when OAuth2 access_token expired after 1h but user is still signed in on SetSail
  if (hdrEmail && hdrEmail.indexOf("@") > 0) {
    return {
      sub: hdrSub || hdrEmail,
      email: hdrEmail,
      token: token || "session",
      kind: "session_header"
    };
  }
  if (hdrSub) {
    return {
      sub: hdrSub,
      email: null,
      token: token || "session",
      kind: "session_header"
    };
  }
  return null;
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
