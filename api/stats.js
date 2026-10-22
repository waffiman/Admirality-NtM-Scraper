"use strict";

const {
  loadStats,
  summarize,
  dayKey,
  ADMIN_EMAIL,
  GOOGLE_CLIENT_ID
} = require("../lib/analyticsStore");

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function decodeJwtPayload(token) {
  try {
    const part = String(token || "").split(".")[1];
    if (!part) return null;
    const json = Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

async function verifyAdmin(authHeader) {
  const raw = String(authHeader || "");
  const token = raw.replace(/^Bearer\s+/i, "").trim();
  if (!token) return { ok: false, reason: "missing_token" };

  // Prefer Google tokeninfo (works for GIS id_tokens)
  try {
    const ti = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`
    );
    if (ti.ok) {
      const data = await ti.json();
      const email = String(data.email || "").trim().toLowerCase();
      const aud = String(data.aud || "");
      if (email === ADMIN_EMAIL && (!aud || aud === GOOGLE_CLIENT_ID || aud.startsWith(GOOGLE_CLIENT_ID.split(".")[0]))) {
        return { ok: true, email, via: "id_token" };
      }
    }
  } catch (e) {}

  // OAuth access token → userinfo
  try {
    const ui = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (ui.ok) {
      const data = await ui.json();
      const email = String(data.email || "").trim().toLowerCase();
      if (email === ADMIN_EMAIL) return { ok: true, email, via: "access_token" };
    }
  } catch (e) {}

  // Last resort: decode JWT locally (exp + email + aud)
  const payload = decodeJwtPayload(token);
  if (payload) {
    const email = String(payload.email || "").trim().toLowerCase();
    const exp = Number(payload.exp) || 0;
    const aud = String(payload.aud || "");
    if (
      email === ADMIN_EMAIL &&
      exp * 1000 > Date.now() - 60000 &&
      (!aud || aud === GOOGLE_CLIENT_ID)
    ) {
      return { ok: true, email, via: "jwt_decode" };
    }
  }

  return { ok: false, reason: "forbidden" };
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.json({ error: "Method not allowed" });
  }

  try {
    const auth = await verifyAdmin(req.headers.authorization || req.headers.Authorization);
    if (!auth.ok) {
      res.statusCode = 401;
      return res.json({ error: "unauthorized", reason: auth.reason });
    }

    const url = new URL(req.url, "http://localhost");
    const to = url.searchParams.get("to") || dayKey();
    let from = url.searchParams.get("from");
    if (!from) {
      const t = new Date(`${to}T00:00:00Z`);
      t.setUTCDate(t.getUTCDate() - 6);
      from = t.toISOString().slice(0, 10);
    }

    const loaded = await loadStats();
    const summary = summarize(loaded.stats, from, to);
    res.statusCode = 200;
    return res.json({
      ok: true,
      admin: auth.email,
      ...summary,
      readOnly: Boolean(loaded.readOnly)
    });
  } catch (err) {
    console.error("[SetSail stats]", err);
    res.statusCode = 500;
    return res.json({ error: "stats_failed", message: err && err.message ? err.message : "error" });
  }
};
