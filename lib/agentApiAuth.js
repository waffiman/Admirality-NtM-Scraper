"use strict";

/**
 * SetSail Agent API — opaque scoped keys for chart.read + route.plan only.
 * Keys are HMAC-signed tokens; no source tree / scraper / admin access.
 */

const crypto = require("crypto");

const SCOPES = Object.freeze(["chart.read", "route.plan"]);
const KEY_PREFIX = "ssk_live_";
/** 0 = non-expiring (forever) Agent API key — default for SetSail Agent keys. */
const DEFAULT_TTL_SEC = 0;
const MAX_TTL_SEC = 10 * 365 * 24 * 3600; // if a finite TTL is requested, cap at 10y

const GOOGLE_CLIENT_ID =
  process.env.SETSAIL_GOOGLE_CLIENT_ID ||
  "1072660724894-mbo68vdrl6t3a66s048qdhv8jb6sl6kd.apps.googleusercontent.com";

function cors(res, methods) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", methods || "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-SetSail-Key"
  );
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(str) {
  const s = String(str || "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s + pad, "base64");
}

function signingSecret() {
  const env = (process.env.SETSAIL_API_SIGNING_SECRET || "").trim();
  if (env && env.length >= 16) return env;
  // Soft fallback so local/dev still works — production must set SETSAIL_API_SIGNING_SECRET
  return crypto
    .createHash("sha256")
    .update("setsail-agent-api-dev|" + GOOGLE_CLIENT_ID)
    .digest("hex");
}

function signPayload(obj) {
  const body = b64url(JSON.stringify(obj));
  const sig = b64url(
    crypto.createHmac("sha256", signingSecret()).update(body).digest()
  );
  return KEY_PREFIX + body + "." + sig;
}

function verifyApiKey(rawKey) {
  const key = String(rawKey || "").trim();
  if (!key.startsWith(KEY_PREFIX)) {
    return { ok: false, reason: "invalid_prefix" };
  }
  const rest = key.slice(KEY_PREFIX.length);
  const dot = rest.lastIndexOf(".");
  if (dot < 1) return { ok: false, reason: "malformed" };
  const body = rest.slice(0, dot);
  const sig = rest.slice(dot + 1);
  const expect = b64url(
    crypto.createHmac("sha256", signingSecret()).update(body).digest()
  );
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad_signature" };
  }
  let payload;
  try {
    payload = JSON.parse(fromB64url(body).toString("utf8"));
  } catch (e) {
    return { ok: false, reason: "bad_payload" };
  }
  const forever = payload.forever === true || payload.exp == null || Number(payload.exp) === 0;
  const exp = Number(payload.exp) || 0;
  if (!forever && exp * 1000 < Date.now()) return { ok: false, reason: "expired" };
  const scopes = Array.isArray(payload.scopes)
    ? payload.scopes.filter((s) => SCOPES.includes(s))
    : [];
  if (!scopes.length) return { ok: false, reason: "no_scopes" };
  const email = String(payload.sub || "").trim().toLowerCase();
  if (!email || !email.includes("@")) return { ok: false, reason: "no_subject" };
  return {
    ok: true,
    email,
    scopes,
    jti: String(payload.jti || ""),
    exp: forever ? null : exp,
    forever,
    iat: Number(payload.iat) || 0
  };
}

function issueApiKey(email, opts) {
  const now = Math.floor(Date.now() / 1000);
  const optTtl = opts && opts.ttlSec != null ? Number(opts.ttlSec) : DEFAULT_TTL_SEC;
  const wantForever =
    (opts && (opts.forever === true || opts.ttlSec === 0 || opts.ttlSec === "forever")) ||
    optTtl === 0 ||
    !Number.isFinite(optTtl);
  const payload = {
    v: 1,
    sub: String(email).trim().toLowerCase(),
    scopes: SCOPES.slice(),
    iat: now,
    jti: crypto.randomBytes(12).toString("hex")
  };
  if (wantForever) {
    payload.forever = true;
    // No exp field — verifyApiKey treats forever / missing exp as non-expiring
  } else {
    const ttl = Math.min(Math.max(60, optTtl), MAX_TTL_SEC);
    payload.exp = now + ttl;
  }
  return {
    apiKey: signPayload(payload),
    scopes: payload.scopes,
    createdAt: new Date(payload.iat * 1000).toISOString(),
    expiresAt: wantForever ? null : new Date(payload.exp * 1000).toISOString(),
    forever: wantForever,
    jti: payload.jti
  };
}

function extractBearer(req) {
  const h =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers["x-setsail-key"] ||
    "";
  const raw = String(h);
  if (/^Bearer\s+/i.test(raw)) return raw.replace(/^Bearer\s+/i, "").trim();
  if (raw.startsWith(KEY_PREFIX)) return raw.trim();
  return "";
}

function requireScope(auth, scope) {
  return !!(auth && auth.ok && Array.isArray(auth.scopes) && auth.scopes.includes(scope));
}

async function verifyGoogleIdToken(idToken) {
  const token = String(idToken || "").trim();
  if (!token) return { ok: false, reason: "missing_token" };
  try {
    const ti = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`
    );
    if (!ti.ok) return { ok: false, reason: "tokeninfo_failed" };
    const data = await ti.json();
    const email = String(data.email || "").trim().toLowerCase();
    const aud = String(data.aud || "");
    const emailVerified = String(data.email_verified || "") === "true" || data.email_verified === true;
    if (!email || !emailVerified) return { ok: false, reason: "email_unverified" };
    if (aud && aud !== GOOGLE_CLIENT_ID && !aud.startsWith(GOOGLE_CLIENT_ID.split(".")[0])) {
      return { ok: false, reason: "aud_mismatch" };
    }
    return {
      ok: true,
      email,
      name: String(data.name || "").trim(),
      picture: String(data.picture || "").trim()
    };
  } catch (e) {
    return { ok: false, reason: "tokeninfo_error" };
  }
}

/** Accept GIS id_token OR OAuth access_token (userinfo). */
async function verifyGoogleAuth(token) {
  const raw = String(token || "").trim();
  if (!raw) return { ok: false, reason: "missing_token" };

  const asId = await verifyGoogleIdToken(raw);
  if (asId.ok) return asId;

  try {
    const ui = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: "Bearer " + raw }
    });
    if (ui.ok) {
      const data = await ui.json();
      const email = String(data.email || "").trim().toLowerCase();
      if (email) {
        return {
          ok: true,
          email,
          name: String(data.name || "").trim(),
          picture: String(data.picture || "").trim()
        };
      }
    }
  } catch (e) {}

  return { ok: false, reason: asId.reason || "google_auth_failed" };
}

module.exports = {
  SCOPES,
  KEY_PREFIX,
  cors,
  issueApiKey,
  verifyApiKey,
  extractBearer,
  requireScope,
  verifyGoogleIdToken,
  verifyGoogleAuth,
  GOOGLE_CLIENT_ID
};
