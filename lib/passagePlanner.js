"use strict";

/**
 * SetSail Agent API — multi-option corridor-aware passage planner.
 * Uses the same OPW-style templates / sea nodes as SetRoute Core A (lite).
 * Still advisory for agents; browser SetRoute remains the navigational engine.
 */

const fs = require("fs");
const path = require("path");

let _nodes = null;
let _knowledge = null;

function loadJson(rel) {
  const candidates = [
    path.join(process.cwd(), rel),
    path.join(__dirname, "..", rel),
    path.join(process.cwd(), "public", rel.replace(/^assets\//, "assets/"))
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch (e) {}
  }
  return null;
}

function getNodes() {
  if (_nodes) return _nodes;
  const data = loadJson("assets/geo/setroute_sea_nodes_lite.json");
  _nodes = (data && data.nodes) || {};
  return _nodes;
}

function getKnowledge() {
  if (_knowledge) return _knowledge;
  _knowledge = loadJson("assets/geo/setroute_passage_knowledge.json") || { templates: [] };
  return _knowledge;
}

function toRad(d) {
  return (d * Math.PI) / 180;
}
function toDeg(r) {
  return (r * 180) / Math.PI;
}

function haversineNm(a, b) {
  const R = 3440.065;
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

function densifySegment(a, b, maxLegNm) {
  const dist = haversineNm(a, b);
  const legs = Math.max(1, Math.min(32, Math.ceil(dist / (maxLegNm || 180))));
  const pts = [];
  for (let i = 0; i <= legs; i++) pts.push(intermediate(a, b, i / legs));
  return { waypoints: pts, distanceNm: dist };
}

function buildChainRoute(points, name, mode, speedKn, meta) {
  if (!points || points.length < 2) return null;
  let totalNm = 0;
  const waypoints = [{ lat: points[0].lat, lon: points[0].lon, name: points[0].name || "Origin" }];
  for (let i = 0; i < points.length - 1; i++) {
    const seg = densifySegment(points[i], points[i + 1], 160);
    totalNm += seg.distanceNm;
    for (let j = 1; j < seg.waypoints.length; j++) {
      const p = seg.waypoints[j];
      const isLast = i === points.length - 2 && j === seg.waypoints.length - 1;
      waypoints.push({
        lat: Math.round(p.lat * 1e5) / 1e5,
        lon: Math.round(p.lon * 1e5) / 1e5,
        name: isLast ? (points[points.length - 1].name || "Destination") : undefined
      });
    }
  }
  const speed = speedKn > 0 ? speedKn : 14;
  return {
    id: "agent-" + mode + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6),
    name,
    mode,
    distanceNm: Math.round(totalNm * 10) / 10,
    speedKn: speed,
    etaHours: Math.round((totalNm / speed) * 10) / 10,
    createdAt: new Date().toISOString(),
    waypoints: waypoints.map((p, i) => ({ i, lat: p.lat, lon: p.lon, name: p.name })),
    meta: meta || {}
  };
}

function nearestNodeKey(lat, lon, maxNm) {
  const nodes = getNodes();
  let best = null;
  let bestD = Infinity;
  Object.keys(nodes).forEach((k) => {
    const n = nodes[k];
    const d = haversineNm({ lat, lon }, { lat: n.lat, lon: n.lon });
    if (d < bestD) {
      bestD = d;
      best = k;
    }
  });
  if (bestD > (maxNm || 900)) return null;
  return best;
}

function nodePoint(key) {
  const n = getNodes()[key];
  if (!n) return null;
  return { lat: n.lat, lon: n.lon, name: n.name || key, nodeKey: key };
}

function hintMatch(name, hints) {
  const s = String(name || "").toLowerCase();
  if (!s) return false;
  return (hints || []).some((h) => s.includes(String(h).toLowerCase()));
}

function matchTemplates(originName, destName) {
  const templates = (getKnowledge().templates || []).slice();
  const hits = [];
  templates.forEach((t) => {
    const fwd =
      hintMatch(originName, t.originHints) && hintMatch(destName, t.destHints);
    const rev =
      hintMatch(originName, t.destHints) && hintMatch(destName, t.originHints);
    if (fwd) hits.push({ template: t, reversed: false });
    else if (rev) hits.push({ template: t, reversed: true });
  });
  return hits;
}

function routeFromTemplate(origin, destination, hit, speedKn) {
  const keys = (hit.template.nodeKeys || []).slice();
  if (hit.reversed) keys.reverse();
  const pts = [origin];
  keys.forEach((k) => {
    const p = nodePoint(k);
    if (p) pts.push(p);
  });
  pts.push(destination);
  // Dedupe near-duplicates
  const cleaned = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const prev = cleaned[cleaned.length - 1];
    if (haversineNm(prev, pts[i]) > 25) cleaned.push(pts[i]);
  }
  if (cleaned.length < 2) return null;
  const label = hit.template.id.replace(/_/g, " ");
  return buildChainRoute(
    cleaned,
    `${origin.name || "Origin"} → ${destination.name || "Dest"} (${label})`,
    "corridor_template",
    speedKn,
    {
      templateId: hit.template.id,
      refs: hit.template.refs || [],
      reversed: hit.reversed,
      technique: "opw_style_corridor + densified GC legs"
    }
  );
}

function classicViaOptions(origin, destination, speedKn) {
  const out = [];
  const hubs = {
    suez: ["GIBRALTAR_MID", "MED_SICILY", "PORT_SAID_APP", "SUEZ_CANAL_MID", "BAB_EL_MANDEB", "DONDRA_HEAD", "MALACCA_MID", "SINGAPORE_MAIN"],
    cape: ["CANARY_PASS", "CAPE_VERDE_PASS", "CAPE_AGULHAS", "MAURITIUS_PASS", "SUNDA_STRAIT", "SCS_SOUTH", "SINGAPORE_MAIN"],
    panama: ["NPAC_GC_WEST", "NPAC_GC_MID", "NPAC_GC_EAST", "PACIFIC_PANAMA_APP", "PANAMA_BALBOA", "PANAMA_COLON", "CARIBBEAN_MID"],
    npac: ["OSUMI_STRAIT", "TOKYO_APP", "NPAC_GC_WEST", "NPAC_GC_MID", "NPAC_GC_EAST"],
    natl: ["NATL_GC_WEST", "NATL_GC_MID", "USHANT", "DOVER_STRAIT"]
  };

  const oKey = nearestNodeKey(origin.lat, origin.lon, 1200);
  const dKey = nearestNodeKey(destination.lat, destination.lon, 1200);
  const lonSpan = Math.abs(((destination.lon - origin.lon + 540) % 360) - 180);
  const crossesOcean = lonSpan > 40 || haversineNm(origin, destination) > 2500;

  const tryHub = (id, keys, title) => {
    const pts = [origin];
    keys.forEach((k) => {
      const p = nodePoint(k);
      if (p) pts.push(p);
    });
    pts.push(destination);
    if (pts.length < 4) return;
    const r = buildChainRoute(pts, title, "via_" + id, speedKn, {
      technique: "classic_ocean_hubs",
      hubs: keys,
      nearestOriginNode: oKey,
      nearestDestNode: dKey
    });
    if (r) out.push(r);
  };

  if (crossesOcean) {
    tryHub("suez", hubs.suez, `${origin.name || "A"} → ${destination.name || "B"} (via Suez)`);
    tryHub("cape", hubs.cape, `${origin.name || "A"} → ${destination.name || "B"} (via Cape)`);
    tryHub("panama", hubs.panama, `${origin.name || "A"} → ${destination.name || "B"} (via Panama)`);
    tryHub("npac", hubs.npac, `${origin.name || "A"} → ${destination.name || "B"} (NPac GC hubs)`);
    tryHub("natl", hubs.natl, `${origin.name || "A"} → ${destination.name || "B"} (NAtl GC hubs)`);
  }
  return out;
}

function greatCircleOption(origin, destination, via, speedKn) {
  const chain = [origin, ...(via || []), destination];
  return buildChainRoute(
    chain,
    `${origin.name || "Origin"} → ${destination.name || "Destination"} (great circle)`,
    "great_circle",
    speedKn,
    { technique: "haversine_gc", warning: "May cross land — prefer corridor options when available." }
  );
}

/**
 * Plan one or more passage options.
 * @returns {{ primary, alternatives, appraisal }}
 */
function planPassages(input) {
  const origin = input.origin;
  const destination = input.destination;
  const via = Array.isArray(input.via) ? input.via : [];
  const speedKn = Number(input.speedKn) > 0 ? Number(input.speedKn) : 14;
  const originName = String(input.originName || origin.name || "").trim();
  const destName = String(input.destName || destination.name || "").trim();
  const wantMulti = input.multi !== false;

  const options = [];
  const gc = greatCircleOption(
    Object.assign({ name: originName || "Origin" }, origin),
    Object.assign({ name: destName || "Destination" }, destination),
    via,
    speedKn
  );
  if (gc) options.push(gc);

  const tmplHits = matchTemplates(originName, destName);
  tmplHits.forEach((hit) => {
    const r = routeFromTemplate(
      Object.assign({ name: originName || "Origin" }, origin),
      Object.assign({ name: destName || "Destination" }, destination),
      hit,
      speedKn
    );
    if (r) options.push(r);
  });

  if (wantMulti) {
    classicViaOptions(
      Object.assign({ name: originName || "Origin" }, origin),
      Object.assign({ name: destName || "Destination" }, destination),
      speedKn
    ).forEach((r) => options.push(r));
  }

  // Deduplicate by similar distance+mode
  const uniq = [];
  const seen = new Set();
  options.forEach((r) => {
    if (!r) return;
    const key = r.mode + ":" + Math.round(r.distanceNm / 50);
    if (seen.has(key) && r.mode !== "corridor_template") return;
    seen.add(key);
    uniq.push(r);
  });

  // Prefer corridor templates, then shorter among non-GC, keep GC last unless only option
  uniq.sort((a, b) => {
    const rank = (r) =>
      r.mode === "corridor_template" ? 0 : r.mode === "great_circle" ? 2 : 1;
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return a.distanceNm - b.distanceNm;
  });

  const primary = uniq[0] || gc;
  const alternatives = uniq.slice(1, 6);

  const appraisal = {
    technique:
      "Independent-agent style: match OPW corridor templates → classic Suez/Cape/Panama/NPac hubs → densified GC legs; rank templates first.",
    matchedTemplates: tmplHits.map((h) => h.template.id),
    optionCount: 1 + alternatives.length,
    imoHints: [
      "Appraisal (A.893): charts/NtM, routeing, weather, traffic, draught — use /api/v1/chart alongside this geometry.",
      "Execution geometry for bridge use remains SetRoute Core A (sea-graph + storm space-time) in the SetSail UI."
    ],
    nodeCatalog: Object.keys(getNodes()).length
  };

  return { primary, alternatives, appraisal };
}

function toGeoJson(route) {
  if (!route) return null;
  return {
    type: "Feature",
    properties: {
      name: route.name,
      distanceNm: route.distanceNm,
      id: route.id,
      mode: route.mode
    },
    geometry: {
      type: "LineString",
      coordinates: (route.waypoints || []).map((p) => [p.lon, p.lat])
    }
  };
}

module.exports = {
  planPassages,
  toGeoJson,
  haversineNm
};
