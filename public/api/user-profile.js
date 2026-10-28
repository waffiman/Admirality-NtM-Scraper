"use strict";

/**
 * Google-keyed cloud profile (vessel / route / wifi AIS).
 * Durable store: SETSAIL_PROFILE_DIR is not available on Vercel —
 * uses globalThis memory + optional Vercel Blob if BLOB_READ_WRITE_TOKEN set.
 * For production durability set KV later; contract is stable.
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

function decodeBearer(req) {
  const h = req.headers.authorization || req.headers.Authorization || "";
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const token = m[1].trim();
  const bits = token.split(".");
  if (bits.length < 2) return null;
  const payload = b64urlToJson(bits[1]);
  if (!payload || !payload.sub) return null;
  if (payload.exp && Number(payload.exp) * 1000 < Date.now() - 60000) return null;
  return { sub: String(payload.sub), email: payload.email || null, token: token };
}

const mem = globalThis.__setsailProfiles || (globalThis.__setsailProfiles = new Map());

async function loadProfile(sub) {
  if (mem.has(sub)) return mem.get(sub);
  // Optional Blob path (lazy require)
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { head, get } = require("@vercel/blob");
      // list not always available — try known pathname
      const pathname = `setsail-profiles/${sub}.json`;
      try {
        const res = await fetch(`https://blob.vercel-storage.com/${pathname}`, {
          headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
        });
        if (res.ok) {
          const j = await res.json();
          mem.set(sub, j);
          return j;
        }
      } catch (e) {}
      void head;
      void get;
    }
  } catch (e2) {}
  return null;
}

async function saveProfile(sub, profile) {
  mem.set(sub, profile);
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = require("@vercel/blob");
      await put(`setsail-profiles/${sub}.json`, JSON.stringify(profile), {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
        allowOverwrite: true
      });
    }
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

  const auth = decodeBearer(req);
  if (!auth) {
    res.statusCode = 401;
    return res.json({ ok: false, error: "unauthorized" });
  }

  if (req.method === "GET") {
    const profile = await loadProfile(auth.sub);
    res.statusCode = 200;
    return res.json({ ok: true, sub: auth.sub, profile: profile || null, durable: !!process.env.BLOB_READ_WRITE_TOKEN });
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
    await saveProfile(auth.sub, profile);
    res.statusCode = 200;
    return res.json({ ok: true, profile: profile });
  }

  res.statusCode = 405;
  return res.json({ ok: false, error: "method_not_allowed" });
};
