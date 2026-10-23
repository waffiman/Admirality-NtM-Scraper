"use strict";

/**
 * POST /api/v1/route — plan a passage from chart context (Agent API).
 * Scope: route.plan
 * Returns a great-circle polyline + metadata. Does not expose Core A internals,
 * coastline grids, or source repos. Full land-safe Dijkstra remains in SetChart UI.
 */

const {
  cors,
  extractBearer,
  verifyApiKey,
  requireScope
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

function toRad(d) {
  return (d * Math.PI) / 180;
}
function toDeg(r) {
  return (r * 180) / Math.PI;
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
    if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
  }
  return null;
}

function haversineNm(a, b) {
  const R = 3440.065; // NM
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const la1 = toRad(a.lat);
  const la2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function intermediate(a, b, f) {
  const lat1 = toRad(a.lat);
  const lon1 = toRad(a.lon);
  const lat2 = toRad(b.lat);
  const lon2 = toRad(b.lon);
  const d = 2 * Math.asin(
    Math.sqrt(
      Math.sin((lat2 - lat1) / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
    )
  );
  if (!Number.isFinite(d) || d < 1e-9) return { lat: a.lat, lon: a.lon };
  const A = Math.sin((1 - f) * d) / Math.sin(d);
  const B = Math.sin(f * d) / Math.sin(d);
  const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
  const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
  const z = A * Math.sin(lat1) + B * Math.sin(lat2);
  const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
  const lon = Math.atan2(y, x);
  return { lat: toDeg(lat), lon: ((toDeg(lon) + 540) % 360) - 180 };
}

function buildGreatCircle(origin, destination, maxLegs) {
  const dist = haversineNm(origin, destination);
  const legs = Math.max(2, Math.min(maxLegs || 24, Math.ceil(dist / 120) + 1));
  const pts = [];
  for (let i = 0; i <= legs; i++) {
    pts.push(intermediate(origin, destination, i / legs));
  }
  return { waypoints: pts, distanceNm: Math.round(dist * 10) / 10, legs };
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
        message: "Provide origin and destination as {lat,lon} or [lat,lon]."
      });
    }
    if (Math.abs(origin.lat) > 90 || Math.abs(destination.lat) > 90) {
      res.statusCode = 400;
      return res.json({ error: "invalid_latitude" });
    }

    const via = Array.isArray(body.via) ? body.via.map(parseCoord).filter(Boolean).slice(0, 12) : [];
    const chain = [origin, ...via, destination];
    let totalNm = 0;
    const waypoints = [{ ...chain[0], name: "Origin" }];
    for (let i = 0; i < chain.length - 1; i++) {
      const seg = buildGreatCircle(chain[i], chain[i + 1], body.resolution || 16);
      totalNm += seg.distanceNm;
      for (let j = 1; j < seg.waypoints.length; j++) {
        waypoints.push(seg.waypoints[j]);
      }
    }
    waypoints[waypoints.length - 1].name = "Destination";

    const speedKn = Number(body.speedKn) > 0 ? Number(body.speedKn) : 14;
    const etaHours = totalNm / speedKn;

    res.statusCode = 200;
    return res.json({
      ok: true,
      api: "setsail.agent.v1",
      owner: auth.email,
      scopesUsed: ["route.plan"],
      generatedAt: new Date().toISOString(),
      route: {
        name: String(body.name || "Agent passage").slice(0, 80),
        mode: "great_circle",
        distanceNm: Math.round(totalNm * 10) / 10,
        speedKn,
        etaHours: Math.round(etaHours * 10) / 10,
        waypoints: waypoints.map((p, i) => ({
          i,
          lat: Math.round(p.lat * 1e5) / 1e5,
          lon: Math.round(p.lon * 1e5) / 1e5,
          name: p.name || undefined
        })),
        geojson: {
          type: "Feature",
          properties: { name: String(body.name || "Agent passage").slice(0, 80), distanceNm: totalNm },
          geometry: {
            type: "LineString",
            coordinates: waypoints.map((p) => [p.lon, p.lat])
          }
        }
      },
      limits: {
        note:
          "Agent route is great-circle for planning context. Land-safe Dijkstra / Suez-Cape / NtM costs run inside SetChart; this endpoint does not expose that engine."
      }
    });
  } catch (e) {
    res.statusCode = 500;
    return res.json({ error: "route_failed" });
  }
};
