"use strict";

/**
 * GET /api/v1/chart — sanitized chart layer snapshot for Agent API keys.
 * Scope: chart.read
 * Intentionally omits scraper URLs, repo paths, provider pipeline, and source code.
 */

const {
  cors,
  extractBearer,
  verifyApiKey,
  requireScope
} = require("../../lib/agentApiAuth");

function pick(obj, keys) {
  const out = {};
  keys.forEach((k) => {
    if (obj && obj[k] != null) out[k] = obj[k];
  });
  return out;
}

function sanitizeStorm(s) {
  if (!s || typeof s !== "object") return null;
  return pick(s, [
    "name",
    "basin",
    "category",
    "center",
    "maxWindKt",
    "dangerRadiusNm",
    "movement",
    "advisoryUtc",
    "waypoints"
  ]);
}

function sanitizeWave(w) {
  if (!w || typeof w !== "object") return null;
  return pick(w, ["name", "center", "radiusNm", "waveHeight", "swellPeriod", "swellDir"]);
}

function sanitizeBuoy(b) {
  if (!b || typeof b !== "object") return null;
  return pick(b, [
    "id",
    "lat",
    "lon",
    "windKt",
    "gustKt",
    "windDir",
    "waveHs",
    "wavePeriod",
    "waveDir",
    "pressureMb",
    "airC",
    "sstC",
    "timeUtc"
  ]);
}

function sanitizeNotice(n) {
  if (!n || typeof n !== "object") return null;
  return pick(n, [
    "id",
    "week",
    "year",
    "type",
    "country",
    "region",
    "subject",
    "coords",
    "isPolygon",
    "isLine",
    "charts"
  ]);
}

function sanitizeWeather(data) {
  if (!data || typeof data !== "object") return {};
  return {
    asOf: data.lastSyncUtc || data.synopticCycle || null,
    storms: (data.storms || []).map(sanitizeStorm).filter(Boolean).slice(0, 80),
    waves: (data.waves || []).map(sanitizeWave).filter(Boolean).slice(0, 120),
    buoys: (data.buoys || []).map(sanitizeBuoy).filter(Boolean).slice(0, 400),
    opcWarnings: (data.opcWarnings || []).slice(0, 80).map((w) =>
      pick(w, ["id", "name", "severity", "center", "radiusNm", "text"])
    ),
    pressureCenters: (data.pressureCenters || []).slice(0, 40).map((p) =>
      pick(p, ["type", "name", "value", "coords"])
    ),
    currents: (data.currents || []).slice(0, 200).map((c) =>
      pick(c, ["lat", "lon", "speedKn", "dirDeg"])
    )
  };
}

async function fetchJson(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) return null;
  return r.json();
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

  const auth = verifyApiKey(extractBearer(req));
  if (!auth.ok) {
    res.statusCode = 401;
    return res.json({ error: "unauthorized", reason: auth.reason });
  }
  if (!requireScope(auth, "chart.read")) {
    res.statusCode = 403;
    return res.json({ error: "forbidden_scope", need: "chart.read" });
  }

  try {
    const origin = `https://${req.headers.host || "setsail-ai.vercel.app"}`;
    const [weather, notices] = await Promise.all([
      fetchJson(`${origin}/weather.json`),
      fetchJson(`${origin}/notices.json`)
    ]);

    const noticeList = Array.isArray(notices)
      ? notices
      : Array.isArray(notices && notices.notices)
        ? notices.notices
        : Array.isArray(notices && notices.items)
          ? notices.items
          : [];

    res.statusCode = 200;
    return res.json({
      ok: true,
      api: "setsail.agent.v1",
      owner: auth.email,
      scopesUsed: ["chart.read"],
      generatedAt: new Date().toISOString(),
      layers: {
        weather: sanitizeWeather(weather || {}),
        notices: noticeList.map(sanitizeNotice).filter(Boolean).slice(0, 500)
      },
      capabilities: {
        layers: ["weather", "notices"],
        note: "Product layer snapshot for agents. Upstream provenance and internal pipelines are not exposed."
      }
    });
  } catch (e) {
    res.statusCode = 502;
    return res.json({ error: "chart_unavailable" });
  }
};
