/**
 * SetSail SetRoute — Core A (deterministic passage geometry)
 * =============================================================================
 * EDIT THIS FILE when extending routing skills (TSS, shoals, COLREG, weather…).
 * Safe for Antigravity / Claude / other agents — keep UI/chat in setsail_core.js.
 *
 * Loaded BEFORE setsail_core.js. Exposes window.SetRouteCoreA + helpers.
 *
 * Skills currently in this module:
 *  - COLREG Rule 10: hard ban Traffic Separation Zones; prefer Traffic Lanes
 *  - World TSS from OpenSeaMap/OSM seamarks (assets/geo/setroute_tss_world.json)
 *  - Seed schemes (Singapore / Dover / Gibraltar) until world JSON loads
 *  - Edge cost hooks used by the sea-graph Dijkstra in setsail_core.js
 * =============================================================================
 */
(function (global) {
  "use strict";

  const MODULE_VERSION = "5.135.0-core-a";
  const WORLD_TSS_URL = "assets/geo/setroute_tss_world.json";

  /**
   * Seed TSS schemes as closed rings [lat, lon][].
   * Categories: separation_zone (HARD BAN), traffic_lane (prefer + direction),
   * traffic_lane_centerline (prefer near directed arrow), precautionary_area.
   * directionDeg: preferred course through lane (null = either way / precautionary).
   */
  const SETROUTE_TSS_SEED = [
    {
      id: "singapore_strait",
      name: "Singapore Strait TSS",
      colreg: "Rule 10",
      parts: [
        {
          category: "separation_zone",
          ring: [
            [1.12, 103.55], [1.18, 103.72], [1.22, 103.95], [1.24, 104.15],
            [1.22, 104.35], [1.16, 104.45], [1.10, 104.35], [1.08, 104.10],
            [1.06, 103.85], [1.05, 103.65], [1.12, 103.55]
          ]
        },
        {
          category: "traffic_lane",
          name: "Singapore Strait Eastbound",
          directionDeg: 75,
          ring: [
            [1.02, 103.55], [1.08, 103.75], [1.12, 104.00], [1.14, 104.25],
            [1.12, 104.48], [1.05, 104.48], [1.00, 104.20], [0.98, 103.90],
            [0.97, 103.65], [1.02, 103.55]
          ]
        },
        {
          category: "traffic_lane",
          name: "Singapore Strait Westbound",
          directionDeg: 255,
          ring: [
            [1.18, 103.55], [1.28, 103.75], [1.32, 104.00], [1.34, 104.25],
            [1.30, 104.48], [1.22, 104.48], [1.20, 104.20], [1.18, 103.90],
            [1.16, 103.65], [1.18, 103.55]
          ]
        },
        {
          category: "precautionary_area",
          name: "Eastern Boarding Ground / precautionary",
          directionDeg: null,
          ring: [
            [1.15, 104.35], [1.28, 104.40], [1.30, 104.55], [1.18, 104.58],
            [1.12, 104.48], [1.15, 104.35]
          ]
        }
      ]
    },
    {
      id: "dover_strait",
      name: "Dover Strait / Pas-de-Calais TSS",
      colreg: "Rule 10",
      parts: [
        {
          category: "separation_zone",
          ring: [
            [51.05, 1.35], [51.15, 1.55], [51.22, 1.75], [51.18, 1.95],
            [51.08, 1.85], [51.00, 1.60], [51.05, 1.35]
          ]
        },
        {
          category: "traffic_lane",
          name: "SW-bound",
          directionDeg: 230,
          ring: [
            [50.95, 1.25], [51.05, 1.50], [51.12, 1.75], [51.08, 1.95],
            [50.95, 1.85], [50.88, 1.55], [50.95, 1.25]
          ]
        },
        {
          category: "traffic_lane",
          name: "NE-bound",
          directionDeg: 50,
          ring: [
            [51.15, 1.25], [51.28, 1.50], [51.32, 1.80], [51.25, 2.00],
            [51.18, 1.90], [51.15, 1.55], [51.15, 1.25]
          ]
        }
      ]
    },
    {
      id: "gibraltar",
      name: "Strait of Gibraltar TSS",
      colreg: "Rule 10",
      parts: [
        {
          category: "separation_zone",
          ring: [
            [35.92, -5.75], [35.97, -5.55], [35.99, -5.35], [35.97, -5.15],
            [35.92, -5.20], [35.90, -5.45], [35.92, -5.75]
          ]
        },
        {
          category: "traffic_lane",
          name: "E-bound",
          directionDeg: 85,
          ring: [
            [35.85, -5.75], [35.90, -5.50], [35.92, -5.25], [35.90, -5.10],
            [35.84, -5.15], [35.82, -5.45], [35.85, -5.75]
          ]
        },
        {
          category: "traffic_lane",
          name: "W-bound",
          directionDeg: 265,
          ring: [
            [36.00, -5.75], [36.05, -5.50], [36.06, -5.25], [36.04, -5.10],
            [35.98, -5.15], [35.97, -5.45], [36.00, -5.75]
          ]
        }
      ]
    }
  ];

  /** Live catalogue — starts as seeds; replaced/merged when world JSON loads. */
  let SETROUTE_TSS_SCHEMES = SETROUTE_TSS_SEED.slice();
  let _worldLoaded = false;
  let _worldMeta = null;

  function pointInRing(lat, lon, ring) {
    if (!ring || ring.length < 3) return false;
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const yi = ring[i][0], xi = ring[i][1];
      const yj = ring[j][0], xj = ring[j][1];
      const intersect = ((yi > lat) !== (yj > lat)) &&
        (lon < ((xj - xi) * (lat - yi)) / ((yj - yi) || 1e-12) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function courseDeg(lat1, lon1, lat2, lon2) {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }

  function angleDiffDeg(a, b) {
    let d = Math.abs(a - b) % 360;
    if (d > 180) d = 360 - d;
    return d;
  }

  function sampleLeg(lat1, lon1, lat2, lon2, n) {
    const out = [];
    const steps = Math.max(2, n || 5);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      out.push([lat1 + (lat2 - lat1) * t, lon1 + (lon2 - lon1) * t]);
    }
    return out;
  }

  /** Approximate NM distance from point to polyline (local equirectangular). */
  function distPointToLineNm(lat, lon, line) {
    if (!line || line.length < 2) return Infinity;
    const cosLat = Math.cos(lat * Math.PI / 180);
    let best = Infinity;
    for (let i = 0; i < line.length - 1; i++) {
      const a = line[i], b = line[i + 1];
      const ax = (a[1] - lon) * cosLat * 60;
      const ay = (a[0] - lat) * 60;
      const bx = (b[1] - lon) * cosLat * 60;
      const by = (b[0] - lat) * 60;
      const dx = bx - ax, dy = by - ay;
      const len2 = dx * dx + dy * dy;
      let t = 0;
      if (len2 > 1e-12) {
        t = Math.max(0, Math.min(1, (-ax * dx + -ay * dy) / len2));
      }
      const px = ax + t * dx;
      const py = ay + t * dy;
      const d = Math.sqrt(px * px + py * py);
      if (d < best) best = d;
    }
    return best;
  }

  function applyLaneDirection(legCourse, dir, frac, scheme, part, hits, preferLaneRef, penaltyRef, label) {
    const diff = angleDiffDeg(legCourse, dir);
    if (diff <= 55) {
      preferLaneRef.v += 180 * frac;
      penaltyRef.v -= 120 * frac;
      hits.push({
        scheme: scheme.id,
        name: part.name || scheme.name,
        category: "traffic_lane",
        rule: "COLREG Rule 10(b) — proceed in general direction of traffic flow",
        frac: Math.round(frac * 100),
        courseDiffDeg: Math.round(diff),
        via: label || "lane"
      });
    } else if (diff >= 110) {
      penaltyRef.v += 4500 * frac;
      hits.push({
        scheme: scheme.id,
        name: part.name || scheme.name,
        category: "traffic_lane_wrong_way",
        rule: "COLREG Rule 10(b) — against traffic flow (avoid)",
        frac: Math.round(frac * 100),
        courseDiffDeg: Math.round(diff),
        via: label || "lane"
      });
    } else {
      penaltyRef.v += 900 * frac;
      hits.push({
        scheme: scheme.id,
        name: part.name || scheme.name,
        category: "traffic_lane_oblique",
        rule: "COLREG Rule 10(c) — cross on heading as nearly as practicable at right angles",
        frac: Math.round(frac * 100),
        courseDiffDeg: Math.round(diff),
        via: label || "lane"
      });
    }
  }

  /**
   * COLREG Rule 10 costing for a graph/route leg.
   * Returns { penalty, hardBan, hits, preferLane }.
   * hardBan → edge must be dropped from adjacency (separation zone).
   */
  function setrouteTssLegAnalysis(lat1, lon1, lat2, lon2) {
    const samples = sampleLeg(lat1, lon1, lat2, lon2, 6);
    const legCourse = courseDeg(lat1, lon1, lat2, lon2);
    const penaltyRef = { v: 0 };
    const preferLaneRef = { v: 0 };
    let hardBan = false;
    const hits = [];

    // Attraction: if any TSS scheme is nearby, lightly prefer getting into its lanes
    let nearbyScheme = false;

    for (let s = 0; s < SETROUTE_TSS_SCHEMES.length; s++) {
      const scheme = SETROUTE_TSS_SCHEMES[s];
      for (let p = 0; p < scheme.parts.length; p++) {
        const part = scheme.parts[p];

        if (part.category === "traffic_lane_centerline" && part.line && part.line.length >= 2) {
          const halfW = Number(part.halfWidthNm) > 0 ? Number(part.halfWidthNm) : 0.55;
          let nearHits = 0;
          let minDist = Infinity;
          for (let i = 0; i < samples.length; i++) {
            const d = distPointToLineNm(samples[i][0], samples[i][1], part.line);
            if (d < minDist) minDist = d;
            if (d <= halfW) nearHits++;
          }
          if (minDist < 40) nearbyScheme = true;
          if (!nearHits) {
            // Soft pull toward lane when within ~8 nm
            if (minDist < 8) {
              penaltyRef.v += 35 * (1 - minDist / 8);
            }
            continue;
          }
          const frac = nearHits / samples.length;
          const dir = Number(part.directionDeg);
          if (Number.isFinite(dir)) {
            applyLaneDirection(legCourse, dir, frac, scheme, part, hits, preferLaneRef, penaltyRef, "centerline");
          } else {
            preferLaneRef.v += 80 * frac;
            penaltyRef.v -= 60 * frac;
          }
          continue;
        }

        if (!part.ring || part.ring.length < 3) continue;

        let hitsPart = 0;
        for (let i = 0; i < samples.length; i++) {
          if (pointInRing(samples[i][0], samples[i][1], part.ring)) hitsPart++;
        }
        // Proximity for attraction (use first ring vertex as rough cue)
        if (!hitsPart && part.ring[0]) {
          const c = part.ring[0];
          const dlat = (lat1 - c[0]) * 60;
          const dlon = (lon1 - c[1]) * 60 * Math.cos(lat1 * Math.PI / 180);
          if (Math.sqrt(dlat * dlat + dlon * dlon) < 40) nearbyScheme = true;
        }
        if (!hitsPart) continue;
        const frac = hitsPart / samples.length;

        if (part.category === "separation_zone") {
          hardBan = true;
          penaltyRef.v += 1e6 * frac;
          hits.push({
            scheme: scheme.id,
            name: scheme.name,
            category: "separation_zone",
            rule: "COLREG Rule 10 — separation zone (hard ban)",
            frac: Math.round(frac * 100)
          });
        } else if (part.category === "traffic_lane") {
          const dir = Number(part.directionDeg);
          if (Number.isFinite(dir)) {
            applyLaneDirection(legCourse, dir, frac, scheme, part, hits, preferLaneRef, penaltyRef, "polygon");
          } else {
            penaltyRef.v -= 40 * frac;
            preferLaneRef.v += 40 * frac;
          }
        } else if (part.category === "precautionary_area") {
          // Caution areas may interrupt lanes — allowed but careful (not hard ban)
          penaltyRef.v += 120 * frac;
          hits.push({
            scheme: scheme.id,
            name: part.name || "Precautionary area",
            category: "precautionary_area",
            rule: "COLREG Rule 10 — precautionary / boarding ground (caution)",
            frac: Math.round(frac * 100)
          });
        }
      }
    }

    // If TSS exists nearby but leg is not using a lane, nudge planner toward lanes
    if (nearbyScheme && preferLaneRef.v < 1 && !hardBan) {
      penaltyRef.v += 80;
    }

    return {
      penalty: penaltyRef.v,
      hardBan,
      hits,
      preferLane: preferLaneRef.v
    };
  }

  function setrouteTssEdgePenalty(lat1, lon1, lat2, lon2) {
    return setrouteTssLegAnalysis(lat1, lon1, lat2, lon2).penalty;
  }

  function setrouteTssHardBan(lat1, lon1, lat2, lon2) {
    return setrouteTssLegAnalysis(lat1, lon1, lat2, lon2).hardBan;
  }

  /** Nearest TSS scheme summary for appraisal / agent reports. */
  function setrouteNearbyTssSummary(lat, lon, radiusNm) {
    const R = Number(radiusNm) || 80;
    const found = [];
    SETROUTE_TSS_SCHEMES.forEach((scheme) => {
      let near = false;
      scheme.parts.forEach((part) => {
        if (part.line && part.line.length) {
          if (distPointToLineNm(lat, lon, part.line) < R) near = true;
        }
        const c = (part.ring && part.ring[0]) || (part.line && part.line[0]);
        if (!c) return;
        const dlat = (lat - c[0]) * 60;
        const dlon = (lon - c[1]) * 60 * Math.cos(lat * Math.PI / 180);
        const d = Math.sqrt(dlat * dlat + dlon * dlon);
        if (d < R || (part.ring && pointInRing(lat, lon, part.ring))) near = true;
      });
      if (near) {
        found.push({
          id: scheme.id,
          name: scheme.name,
          colreg: scheme.colreg,
          parts: scheme.parts.map((p) => p.category + (p.name ? ":" + p.name : ""))
        });
      }
    });
    return found;
  }

  function mergeWorldSchemes(world) {
    if (!world || !Array.isArray(world.schemes) || !world.schemes.length) return;
    // Prefer OSM world coverage; keep seed schemes only where OSM has no cell overlap
    const osm = world.schemes.filter((s) => s && Array.isArray(s.parts) && s.parts.length);
    const seedKeep = SETROUTE_TSS_SEED.filter((seed) => {
      // Drop seed if any OSM scheme shares a rough centroid cell
      const seedPt = seed.parts && seed.parts[0] && (seed.parts[0].ring || seed.parts[0].line);
      if (!seedPt || !seedPt[0]) return true;
      const slat = seedPt[0][0], slon = seedPt[0][1];
      for (let i = 0; i < osm.length; i++) {
        const p0 = osm[i].parts[0];
        const pt = (p0 && (p0.ring || p0.line) || [])[0];
        if (!pt) continue;
        if (Math.abs(pt[0] - slat) < 2.5 && Math.abs(pt[1] - slon) < 2.5) return false;
      }
      return true;
    });
    SETROUTE_TSS_SCHEMES = osm.concat(seedKeep);
    _worldLoaded = true;
    _worldMeta = {
      generatedAt: world.generatedAt || null,
      counts: world.counts || null,
      schemes: SETROUTE_TSS_SCHEMES.length
    };
    if (typeof console !== "undefined" && console.info) {
      console.info(
        "[SetRoute Core A] world TSS loaded: " +
          osm.length + " OSM schemes + " + seedKeep.length + " seed (" +
          SETROUTE_TSS_SCHEMES.length + " total)"
      );
    }
  }

  function loadWorldTss() {
    if (typeof fetch !== "function") return Promise.resolve(false);
    return fetch(WORLD_TSS_URL, { cache: "force-cache" })
      .then((r) => (r && r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return false;
        mergeWorldSchemes(data);
        return true;
      })
      .catch(() => false);
  }

  // Kick off load immediately
  try {
    loadWorldTss();
  } catch (e) {}

  const api = {
    MODULE_VERSION,
    get SETROUTE_TSS_SCHEMES() {
      return SETROUTE_TSS_SCHEMES;
    },
    setrouteTssLegAnalysis,
    setrouteTssEdgePenalty,
    setrouteTssHardBan,
    setrouteNearbyTssSummary,
    pointInRing,
    loadWorldTss,
    isWorldTssLoaded: function () {
      return _worldLoaded;
    },
    worldTssMeta: function () {
      return _worldMeta;
    }
  };

  global.SetRouteCoreA = api;
  global.setrouteTssLegAnalysis = setrouteTssLegAnalysis;
  global.setrouteTssEdgePenalty = setrouteTssEdgePenalty;
  global.setrouteTssHardBan = setrouteTssHardBan;
  global.setrouteNearbyTssSummary = setrouteNearbyTssSummary;

  if (typeof console !== "undefined" && console.info) {
    console.info(
      "[SetRoute Core A] module " + MODULE_VERSION + " ready (" +
        SETROUTE_TSS_SCHEMES.length + " TSS schemes, world pending)"
    );
  }
})(typeof window !== "undefined" ? window : globalThis);
