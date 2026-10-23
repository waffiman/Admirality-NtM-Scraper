"use strict";

/**
 * GET /api/v1/routes — list Agent-API routes for the account.
 * Auth: SetSail Agent API key (ssk_live_…) OR Google token (id/access).
 */

const {
  cors,
  extractBearer,
  verifyApiKey,
  requireScope,
  verifyGoogleAuth,
  KEY_PREFIX
} = require("../../lib/agentApiAuth");
const { listAgentRoutes } = require("../../lib/agentRoutesStore");

async function resolveOwner(req) {
  const raw = extractBearer(req);
  if (!raw) return { ok: false, reason: "missing_token" };

  if (raw.startsWith(KEY_PREFIX)) {
    const auth = verifyApiKey(raw);
    if (!auth.ok) return { ok: false, reason: auth.reason };
    if (!requireScope(auth, "route.plan") && !requireScope(auth, "chart.read")) {
      return { ok: false, reason: "forbidden_scope" };
    }
    return { ok: true, email: auth.email, via: "api_key" };
  }

  const google = await verifyGoogleAuth(raw);
  if (!google.ok) return { ok: false, reason: google.reason };
  return { ok: true, email: google.email, via: "google" };
}

module.exports = async function handler(req, res) {
  cors(res, "GET, OPTIONS");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.json({ error: "method_not_allowed" });
  }

  try {
    const owner = await resolveOwner(req);
    if (!owner.ok) {
      res.statusCode = 401;
      return res.json({ error: "unauthorized", reason: owner.reason });
    }
    const routes = await listAgentRoutes(owner.email);
    res.statusCode = 200;
    return res.json({
      ok: true,
      api: "setsail.agent.v1",
      owner: owner.email,
      via: owner.via,
      count: routes.length,
      routes
    });
  } catch (e) {
    res.statusCode = 500;
    return res.json({ error: "list_failed" });
  }
};
