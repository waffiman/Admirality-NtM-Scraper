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
 *  - IALA A/B regions + Lateral/Cardinal buoy chart knowledge (OpenSeaMap symbology)
 *  - World lateral/cardinal marks (assets/geo/setroute_iala_marks.json) for approaches
 *  - Seed schemes (Singapore / Dover / Gibraltar) until world JSON loads
 *  - Edge cost hooks used by the sea-graph Dijkstra in setsail_core.js
 * =============================================================================
 */
(function (global) {
  "use strict";

  const MODULE_VERSION = "5.136.0-core-a";
  const WORLD_TSS_URL = "assets/geo/setroute_tss_world.json";
  const IALA_MARKS_URL = "assets/geo/setroute_iala_marks.json";

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

  // ---------------------------------------------------------------------------
  // IALA Maritime Buoyage — Region A / B + Lateral / Cardinal (SetChart look)
  // Chart symbology matches OpenSeaMap / S-52 style used by SetSail Buoys layer.
  // ---------------------------------------------------------------------------

  /**
   * IALA Region B: Americas + Japan + Korea + Philippines.
   * Everywhere else coastal = Region A (Europe, Africa, Australia, most Asia…).
   * Returning from seaward: Port = left hand, Starboard = right hand.
   */
  const IALA_REGION_B_BOXES = [
    // North America + Caribbean + Central America
    { south: 5, west: -170, north: 75, east: -50, name: "N America / Caribbean" },
    // South America
    { south: -56, west: -82, north: 13, east: -34, name: "S America" },
    // Japan
    { south: 24, west: 122, north: 46, east: 146, name: "Japan" },
    // Korea
    { south: 33, west: 124, north: 43, east: 132, name: "Korea" },
    // Philippines
    { south: 4, west: 116, north: 21, east: 127, name: "Philippines" }
  ];

  /** Chart appearance as drawn on OpenSeaMap / SetChart Buoys overlay. */
  const IALA_CHART_SYMBOLS = {
    A: {
      region: "A",
      port: {
        hand: "port",
        colour: "red",
        colourHex: "#e53935",
        shape: "can",
        topmark: "cylinder",
        chartNote: "Red can / flat-top (port hand when entering from seaward)"
      },
      starboard: {
        hand: "starboard",
        colour: "green",
        colourHex: "#43a047",
        shape: "conical",
        topmark: "cone_point_up",
        chartNote: "Green cone / pointed (starboard hand when entering from seaward)"
      }
    },
    B: {
      region: "B",
      port: {
        hand: "port",
        colour: "green",
        colourHex: "#43a047",
        shape: "can",
        topmark: "cylinder",
        chartNote: "Green can / flat-top (port hand — Region B)"
      },
      starboard: {
        hand: "starboard",
        colour: "red",
        colourHex: "#e53935",
        shape: "conical",
        topmark: "cone_point_up",
        chartNote: "Red cone / pointed (starboard hand — Region B)"
      }
    },
    cardinal: {
      N: {
        bands: "black over yellow",
        topmark: "two cones point up",
        safeSectorDeg: [270, 90],
        pass: "north",
        dangerRelative: "south of mark",
        chartNote: "Black/yellow; ▲▲ — keep mark to the south (pass north)"
      },
      E: {
        bands: "black-yellow-black",
        topmark: "two cones base to base",
        safeSectorDeg: [0, 180],
        pass: "east",
        dangerRelative: "west of mark",
        chartNote: "BYB; cones base-to-base — keep mark to the west (pass east)"
      },
      S: {
        bands: "yellow over black",
        topmark: "two cones point down",
        safeSectorDeg: [90, 270],
        pass: "south",
        dangerRelative: "north of mark",
        chartNote: "Yellow/black; ▼▼ — keep mark to the north (pass south)"
      },
      W: {
        bands: "yellow-black-yellow",
        topmark: "two cones point to point",
        safeSectorDeg: [180, 360],
        pass: "west",
        dangerRelative: "east of mark",
        chartNote: "YBY; cones tip-to-tip — keep mark to the east (pass west)"
      }
    }
  };

  function inBox(lat, lon, b) {
    return lat >= b.south && lat <= b.north && lon >= b.west && lon <= b.east;
  }

  function setrouteIalaRegion(lat, lon) {
    for (let i = 0; i < IALA_REGION_B_BOXES.length; i++) {
      if (inBox(lat, lon, IALA_REGION_B_BOXES[i])) {
        return {
          region: "B",
          name: "IALA Region B",
          box: IALA_REGION_B_BOXES[i].name,
          symbols: IALA_CHART_SYMBOLS.B,
          difference:
            "Region B: Port = GREEN can, Starboard = RED cone (opposite of Region A colours)."
        };
      }
    }
    return {
      region: "A",
      name: "IALA Region A",
      box: "Europe / Africa / Australia / most Asia",
      symbols: IALA_CHART_SYMBOLS.A,
      difference:
        "Region A: Port = RED can, Starboard = GREEN cone when entering from seaward."
    };
  }

  function setrouteIalaLateralMeaning(lat, lon, roleOrColour) {
    const reg = setrouteIalaRegion(lat, lon);
    const key = String(roleOrColour || "").toLowerCase();
    let hand = null;
    if (key === "port" || key === "p") hand = "port";
    else if (key === "starboard" || key === "s") hand = "starboard";
    else if (key === "r" || key === "colour_red" || key === "red") {
      hand = reg.region === "A" ? "port" : "starboard";
    } else if (key === "g" || key === "colour_green" || key === "green") {
      hand = reg.region === "A" ? "starboard" : "port";
    }
    if (!hand) return { region: reg.region, hand: null, symbol: null };
    const symbol = reg.symbols[hand];
    return { region: reg.region, hand: hand, symbol: symbol, chart: symbol.chartNote };
  }

  function setrouteIalaCardinalSafeBearing(cardinal, fromLat, fromLon, markLat, markLon) {
    const c = String(cardinal || "").toUpperCase().charAt(0);
    const sym = IALA_CHART_SYMBOLS.cardinal[c];
    if (!sym) return null;
    // Bearing from mark to sample point — should lie in safe half-plane
    const brg = courseDeg(markLat, markLon, fromLat, fromLon);
    let safe = false;
    if (c === "N") safe = brg >= 270 || brg <= 90;
    else if (c === "E") safe = brg >= 0 && brg <= 180;
    else if (c === "S") safe = brg >= 90 && brg <= 270;
    else if (c === "W") safe = brg >= 180 || brg === 0;
    return {
      cardinal: c,
      bearingFromMarkDeg: Math.round(brg),
      safe: safe,
      pass: sym.pass,
      chart: sym.chartNote,
      bands: sym.bands,
      topmark: sym.topmark
    };
  }

  // Compact OSM marks: [lat, lon, kind0|1, role]
  let _ialaMarks = [];
  let _ialaGrid = null;
  let _ialaMeta = null;

  function ialaCellKey(lat, lon) {
    return Math.floor(lat) + "_" + Math.floor(lon);
  }

  function buildIalaGrid(marks) {
    const g = Object.create(null);
    for (let i = 0; i < marks.length; i++) {
      const m = marks[i];
      const k = ialaCellKey(m[0], m[1]);
      if (!g[k]) g[k] = [];
      g[k].push(i);
    }
    return g;
  }

  function queryIalaMarksNear(lat, lon, radiusNm) {
    const R = Number(radiusNm) || 8;
    const dLat = R / 60;
    const dLon = R / (60 * Math.max(0.2, Math.cos(lat * Math.PI / 180)));
    const out = [];
    if (!_ialaGrid) return out;
    const i0 = Math.floor(lat - dLat);
    const i1 = Math.floor(lat + dLat);
    const j0 = Math.floor(lon - dLon);
    const j1 = Math.floor(lon + dLon);
    for (let i = i0; i <= i1; i++) {
      for (let j = j0; j <= j1; j++) {
        const bucket = _ialaGrid[i + "_" + j];
        if (!bucket) continue;
        for (let b = 0; b < bucket.length; b++) {
          const m = _ialaMarks[bucket[b]];
          const dlat = (lat - m[0]) * 60;
          const dlon = (lon - m[1]) * 60 * Math.cos(lat * Math.PI / 180);
          const d = Math.sqrt(dlat * dlat + dlon * dlon);
          if (d <= R) out.push({ lat: m[0], lon: m[1], kind: m[2], role: m[3], distNm: d });
        }
      }
    }
    return out;
  }

  /**
   * Costing for a leg using nearby laterals (port approach channel) + cardinals (danger side).
   * Returns { penalty, hardBan, hits, preferChannel }.
   */
  function setrouteIalaLegAnalysis(lat1, lon1, lat2, lon2) {
    const midLat = (lat1 + lat2) * 0.5;
    const midLon = (lon1 + lon2) * 0.5;
    const legCourse = courseDeg(lat1, lon1, lat2, lon2);
    const region = setrouteIalaRegion(midLat, midLon);
    let penalty = 0;
    let hardBan = false;
    let preferChannel = 0;
    const hits = [];
    const near = queryIalaMarksNear(midLat, midLon, 6);
    if (!near.length) {
      return { penalty: 0, hardBan: false, hits: [], preferChannel: 0, region: region.region };
    }

    let portMarks = 0;
    let stbdMarks = 0;
    let channelAligned = 0;

    for (let i = 0; i < near.length; i++) {
      const m = near[i];
      if (m.kind === 1) {
        // Cardinal — danger on one side
        const chk = setrouteIalaCardinalSafeBearing(m.role, midLat, midLon, m.lat, m.lon);
        if (!chk) continue;
        if (!chk.safe && m.distNm < 1.2) {
          hardBan = true;
          penalty += 8e5;
          hits.push({
            category: "cardinal_danger",
            cardinal: m.role,
            rule: "IALA cardinal — do not pass on danger side (" + chk.chart + ")",
            distNm: Math.round(m.distNm * 10) / 10
          });
        } else if (!chk.safe && m.distNm < 3) {
          penalty += 2200 * (1 - m.distNm / 3);
          hits.push({
            category: "cardinal_caution",
            cardinal: m.role,
            rule: "IALA cardinal — prefer " + chk.pass + " of mark",
            distNm: Math.round(m.distNm * 10) / 10
          });
        } else if (chk.safe && m.distNm < 4) {
          preferChannel += 40;
          penalty -= 50;
        }
      } else {
        // Lateral
        const meaning = setrouteIalaLateralMeaning(m.lat, m.lon, m.role);
        if (!meaning.hand) continue;
        // Relative position of mark vs leg midpoint (port/stbd of track)
        const brgToMark = courseDeg(midLat, midLon, m.lat, m.lon);
        const rel = ((brgToMark - legCourse + 540) % 360) - 180; // -180..180, + = mark to starboard of track
        const markOnStbdOfTrack = rel > 0;
        if (meaning.hand === "port") {
          portMarks++;
          // Inbound channel: port-hand buoy should sit to port of vessel track (rel < 0)
          if (rel < -5) {
            channelAligned++;
            preferChannel += 90;
            penalty -= 70;
          } else if (rel > 15 && m.distNm < 2) {
            // Port buoy on starboard side of track → likely wrong side / outbound
            penalty += 600;
          }
        } else if (meaning.hand === "starboard") {
          stbdMarks++;
          if (rel > 5) {
            channelAligned++;
            preferChannel += 90;
            penalty -= 70;
          } else if (rel < -15 && m.distNm < 2) {
            penalty += 600;
          }
        }
      }
    }

    if (portMarks + stbdMarks >= 2 && channelAligned >= 1) {
      preferChannel += 120;
      penalty -= 100;
      hits.push({
        category: "lateral_channel",
        rule: "IALA " + region.region + " laterals — following buoyed port approach channel",
        port: portMarks,
        starboard: stbdMarks,
        chart:
          region.region === "A"
            ? "A: port RED can / stbd GREEN cone"
            : "B: port GREEN can / stbd RED cone"
      });
    } else if (portMarks + stbdMarks >= 1) {
      hits.push({
        category: "lateral_near",
        rule: "IALA " + region.region + " lateral marks nearby (port approach aids)",
        port: portMarks,
        starboard: stbdMarks
      });
    }

    return {
      penalty: penalty,
      hardBan: hardBan,
      hits: hits,
      preferChannel: preferChannel,
      region: region.region
    };
  }

  function setrouteIalaEdgePenalty(lat1, lon1, lat2, lon2) {
    return setrouteIalaLegAnalysis(lat1, lon1, lat2, lon2).penalty;
  }

  function setrouteIalaHardBan(lat1, lon1, lat2, lon2) {
    return setrouteIalaLegAnalysis(lat1, lon1, lat2, lon2).hardBan;
  }

  function mergeIalaMarks(data) {
    if (!data || !Array.isArray(data.marks)) return;
    _ialaMarks = data.marks;
    _ialaGrid = buildIalaGrid(_ialaMarks);
    _ialaMeta = { counts: data.counts || null, generatedAt: data.generatedAt || null };
    if (typeof console !== "undefined" && console.info) {
      console.info(
        "[SetRoute Core A] IALA marks loaded: " +
          _ialaMarks.length +
          " (lateral+cardinal)"
      );
    }
  }

  function loadIalaMarks() {
    if (typeof fetch !== "function") return Promise.resolve(false);
    return fetch(IALA_MARKS_URL, { cache: "force-cache" })
      .then((r) => (r && r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return false;
        mergeIalaMarks(data);
        return true;
      })
      .catch(() => false);
  }

  // Kick off load immediately
  try {
    loadWorldTss();
    loadIalaMarks();
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
    },
    IALA_CHART_SYMBOLS,
    setrouteIalaRegion,
    setrouteIalaLateralMeaning,
    setrouteIalaCardinalSafeBearing,
    setrouteIalaLegAnalysis,
    setrouteIalaEdgePenalty,
    setrouteIalaHardBan,
    queryIalaMarksNear,
    loadIalaMarks,
    ialaMarksMeta: function () {
      return _ialaMeta;
    }
  };

  global.SetRouteCoreA = api;
  global.setrouteTssLegAnalysis = setrouteTssLegAnalysis;
  global.setrouteTssEdgePenalty = setrouteTssEdgePenalty;
  global.setrouteTssHardBan = setrouteTssHardBan;
  global.setrouteNearbyTssSummary = setrouteNearbyTssSummary;
  global.setrouteIalaRegion = setrouteIalaRegion;
  global.setrouteIalaLegAnalysis = setrouteIalaLegAnalysis;
  global.setrouteIalaEdgePenalty = setrouteIalaEdgePenalty;
  global.setrouteIalaHardBan = setrouteIalaHardBan;

  if (typeof console !== "undefined" && console.info) {
    console.info(
      "[SetRoute Core A] module " + MODULE_VERSION + " ready (" +
        SETROUTE_TSS_SCHEMES.length + " TSS schemes, IALA+TSS world pending)"
    );
  }
})(typeof window !== "undefined" ? window : globalThis);
