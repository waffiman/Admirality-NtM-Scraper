"use strict";

/**
 * POST /api/v1/keys — issue a scoped SetSail Agent API key (Google sign-in required).
 * Body: { idToken } OR Authorization: Bearer <google_id_token>
 * Returns apiKey once; store securely. Scopes fixed: chart.read, route.plan.
 */

const {
  cors,
  issueApiKey,
  verifyGoogleAuth,
  SCOPES
} = require("../../lib/agentApiAuth");

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body || "{}");
    } catch (e) {
      return {};
    }
  }
  return req.body || {};
}

module.exports = async function handler(req, res) {
  cors(res, "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ error: "method_not_allowed" });
  }

  try {
    const body = readBody(req);
    const authHeader = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "").trim();
    const idToken = String(body.idToken || body.credential || authHeader || "").trim();
    const google = await verifyGoogleAuth(idToken);
    if (!google.ok) {
      res.statusCode = 401;
      return res.json({
        error: "google_auth_required",
        reason: google.reason,
        message: "Sign in with Google, then request an API key."
      });
    }

    const issued = issueApiKey(google.email, {});
    res.statusCode = 200;
    return res.json({
      ok: true,
      apiKey: issued.apiKey,
      scopes: issued.scopes,
      createdAt: issued.createdAt,
      expiresAt: issued.expiresAt,
      owner: google.email,
      note:
        "Capability key only: chart.read + route.plan. Does not grant admin, source, or account write access. Treat like a password."
    });
  } catch (e) {
    res.statusCode = 500;
    return res.json({ error: "issue_failed", message: "Could not issue API key." });
  }
};

module.exports.SCOPES = SCOPES;
