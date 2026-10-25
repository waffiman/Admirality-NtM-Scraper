"use strict";

/**
 * POST /api/v1/route — multi-option passage geometry for Agent API.
 * Scope: route.plan
 * Uses OPW-style corridor templates + classic ocean hubs (same knowledge as SetRoute),
 * then densified GC legs. Returns primary + ranked alternatives.
 * ADVISORY — land-safe Core A / storm space-time still lives in the SetSail UI.
 */

const {
  cors,
  extractBearer,
  verifyApiKey,
  requireScope
} = require("../../lib/agentApiAuth");
const { saveAgentRoute } = require("../../lib/agentRoutesStore");
const { planPassages, toGeoJson } = require("../../lib/passagePlanner");

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

function parseCoord(v) {
  if (Array.isArray(v) && v.length >= 2) {
    const lat = Number(v[0]);
    const lon = Number(v[1]);
    if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
  }
  if (v && typeof v === "object") {
    const lat = Number(v.lat != null ? v.lat : v.latitude);
    const lon = Number(v.lon != null ? v.lon : v.lng != null ? v.lng : v.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      return {
        lat,
        lon,
        name: v.name ? String(v.name).slice(0, 80) : undefined
      };
    }
  }
  return null;
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

  const auth = verifyApiKey(extractBearer(req));
  if (!auth.ok) {
    res.statusCode = 401;
    return res.json({ error: "unauthorized", reason: auth.reason });
  }
  if (!requireScope(auth, "route.plan")) {
    res.statusCode = 403;
    return res.json({ error: "forbidden_scope", need: "route.plan" });
  }

  try {
    const body = readBody(req);
    const origin = parseCoord(body.origin || body.from);
    const destination = parseCoord(body.destination || body.to);
    if (!origin || !destination) {
      res.statusCode = 400;
      return res.json({
        error: "origin_destination_required",
        message: "Provide origin and destination as {lat,lon,name?} or [lat,lon]."
      });
    }
    if (Math.abs(origin.lat) > 90 || Math.abs(destination.lat) > 90) {
      res.statusCode = 400;
      return res.json({ error: "invalid_latitude" });
    }

    const via = Array.isArray(body.via) ? body.via.map(parseCoord).filter(Boolean).slice(0, 12) : [];
    const speedKn = Number(body.speedKn) > 0 ? Number(body.speedKn) : 14;
    const planned = planPassages({
      origin,
      destination,
      via,
      speedKn,
      originName: body.originName || origin.name || body.fromName || "",
      destName: body.destName || destination.name || body.toName || "",
      multi: body.multi !== false
    });

    const primary = planned.primary;
    if (!primary) {
      res.statusCode = 500;
      return res.json({ error: "plan_failed" });
    }
    if (body.name) primary.name = String(body.name).slice(0, 80);

    let saved = null;
    try {
      saved = await saveAgentRoute(auth.email, primary);
    } catch (eSave) {
      saved = { ok: false, reason: "persist_failed" };
    }

    const wrap = (route) =>
      route
        ? {
            ...route,
            geojson: toGeoJson(route)
          }
        : null;

    res.statusCode = 200;
    return res.json({
      ok: true,
      api: "setsail.agent.v1",
      owner: auth.email,
      scopesUsed: ["route.plan"],
      generatedAt: new Date().toISOString(),
      savedToProfile: !!(saved && saved.ok),
      savedEphemeral: !!(saved && saved.ephemeral),
      appraisal: planned.appraisal,
      route: wrap(primary),
      alternatives: (planned.alternatives || []).map(wrap),
      limits: {
        advisoryOnly: true,
        navigational: false,
        note:
          "ADVISORY — corridor templates + ocean hubs + densified GC. For bridge-grade land-safe / cyclone space-time geometry use SetRoute Core A in the SetSail UI. Pair with GET /api/v1/chart for weather & notices appraisal."
      }
    });
  } catch (e) {
    res.statusCode = 500;
    return res.json({ error: "plan_failed", message: String((e && e.message) || e) });
  }
};
