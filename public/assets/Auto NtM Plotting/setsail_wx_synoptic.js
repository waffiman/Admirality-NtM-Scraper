/**
 * SetSail Unified Synoptic Weather Engine v5.245
 *
 * Fixes & Upgrades:
 * 1. Calibrated 10-stop Nautical Wave Height (Hs) Color Gradient (0.0m -> 13.0m+)
 *    with periodic [-180, +180] longitude wrapping & multi-batch Open-Meteo fetching
 *    so colors render across 100% of world oceans even at maximum zoom-out (z=2..4).
 * 2. High-density Bicubic/Hermite Pressure Field + analytical Holland (1980) cyclone
 *    vortex & synoptic High/Low pressureCenters superposition at every contour cell
 *    for realistic curved isobars (4 hPa step).
 * 3. Full-range WMO Wind Barbs (5-150+ kt, non-overlapping 50-kt pennants, 6-tier Beaufort colors)
 *    & graduated Ocean Current Vectors (all zoom levels, 4-tier speed colors + chevron ticks),
 *    backed by scalar+vector interpolation (zero opposing-vector cancellation) and unified
 *    with the bottom-left Cursor Weather HUD (#ntmWxCursorTile).
 * 4. Physically consistent variation of ALL 5 weather parameters (Wind, Pressure, Wave Hs,
 *    Ocean Current, Air/SST Temperature) as distance approaches any active Cyclone / Hurricane.
 * 5. Zero-lag hardware-composited panning (overscanned pane-anchored canvas + LUT/bbox/scalar
 *    fast paths + shadowBlur elimination + adaptive low-end fallback for weak laptops).
 */
(function initSetSailSynopticWxV5243() {
  "use strict";

  var WX_PANE = "wxSynopticPane";
  var WX_PANE_Z = 385;
  var NODE_TTL_MS = 10 * 60 * 1000;
  var MAX_CACHE_NODES = 1600;
  var _nodeCache = new Map();
  var _autoLowEndUntil = 0;

  function isWeakDeviceMode() {
    if (typeof window !== "undefined") {
      if (window.SETSAIL_LOW_END) return true;
      var hc = typeof navigator !== "undefined" ? Number(navigator.hardwareConcurrency) : 0;
      var dm = typeof navigator !== "undefined" ? Number(navigator.deviceMemory) : 0;
      if ((hc > 0 && hc <= 4) || (dm > 0 && dm <= 4)) return true;
    }
    return Date.now() < _autoLowEndUntil;
  }

  // Finer steps at global zoom so max zoom-out (z=2..4) has dense coverage (~20 deg instead of 72 deg)
  var _lonSteps = [0.1, 0.25, 0.5, 1, 2, 4, 6, 8, 12, 16, 20, 24, 30];
  var _latSteps = [0.1, 0.25, 0.5, 1, 2, 4, 6, 8, 12, 16, 20, 24];

  // 10-stop Nautical Wave Height (Hs, meters) Color Scale:
  // Visible across all seas (0.1m calm blue -> 1.5m cyan -> 3m teal/lime -> 4.5m amber -> 6m orange -> 8m+ red/magenta)
  var WAVE_STOPS = [
    [0.0,  14,  65, 130, 0.25],
    [0.6,  10, 108, 182, 0.29],
    [1.2,   6, 152, 204, 0.33],
    [2.0,  16, 185, 158, 0.37],
    [3.0, 132, 204,  22, 0.41],
    [4.0, 250, 204,  21, 0.46],
    [5.5, 249, 115,  22, 0.52],
    [7.5, 239,  68,  68, 0.58],
    [10.0, 217, 24, 114, 0.63],
    [13.0, 168, 85, 247, 0.68]
  ];

  // Precomputed 281-entry RGBA lookup table (0.00 m -> 14.00 m at 0.05 m resolution) for O(1) pixel coloring
  var WAVE_LUT_MAX = 14;
  var WAVE_LUT_STEPS = 280;
  var WAVE_LUT_R = new Uint8Array(WAVE_LUT_STEPS + 1);
  var WAVE_LUT_G = new Uint8Array(WAVE_LUT_STEPS + 1);
  var WAVE_LUT_B = new Uint8Array(WAVE_LUT_STEPS + 1);
  var WAVE_LUT_A = new Float32Array(WAVE_LUT_STEPS + 1);
  (function buildWaveLut() {
    for (var idx = 0; idx <= WAVE_LUT_STEPS; idx++) {
      var h = (idx / WAVE_LUT_STEPS) * WAVE_LUT_MAX;
      var r = 168, g = 85, b = 247, a = 0.68;
      for (var i = 1; i < WAVE_STOPS.length; i++) {
        var sA = WAVE_STOPS[i - 1];
        var sB = WAVE_STOPS[i];
        if (h <= sB[0] || i === WAVE_STOPS.length - 1) {
          var t = sB[0] > sA[0] ? (h - sA[0]) / (sB[0] - sA[0]) : 1;
          if (t < 0) t = 0;
          else if (t > 1) t = 1;
          r = Math.round(sA[1] + (sB[1] - sA[1]) * t);
          g = Math.round(sA[2] + (sB[2] - sA[2]) * t);
          b = Math.round(sA[3] + (sB[3] - sA[3]) * t);
          a = sA[4] + (sB[4] - sA[4]) * t;
          break;
        }
      }
      WAVE_LUT_R[idx] = r;
      WAVE_LUT_G[idx] = g;
      WAVE_LUT_B[idx] = b;
      WAVE_LUT_A[idx] = a * 255;
    }
  })();

  function wrapLon180(lon) {
    return ((((Number(lon) + 180) % 360) + 360) % 360) - 180;
  }

  function clampNum(v, lo, hi) {
    return v < lo ? lo : (v > hi ? hi : v);
  }

  function smoothstep01(t) {
    var c = clampNum(t, 0, 1);
    return c * c * (3 - 2 * c);
  }

  function gcdNm(lat1, lon1, lat2, lon2) {
    if (typeof window.calculateHaversineDistanceNM === "function") {
      return window.calculateHaversineDistanceNM(lat1, lon1, lat2, lon2);
    }
    var r = Math.PI / 180;
    var rLat1 = lat1 * r;
    var rLat2 = lat2 * r;
    var dLat = rLat2 - rLat1;
    var dLon = wrapLon180(lon2 - lon1) * r;
    var s = Math.sin(dLat * 0.5) * Math.sin(dLat * 0.5) +
      Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon * 0.5) * Math.sin(dLon * 0.5);
    return 3440.065 * 2 * Math.atan2(Math.sqrt(Math.max(0, s)), Math.sqrt(Math.max(0, 1 - s)));
  }

  function extractStormCenter(st) {
    if (!st) return null;
    if (Array.isArray(st.center) && st.center.length >= 2) {
      var la = Number(st.center[0]);
      var lo = Number(st.center[1]);
      if (Number.isFinite(la) && Number.isFinite(lo)) return [la, lo];
    }
    if (st.center && typeof st.center === "object") {
      var la2 = Number(st.center.lat);
      var lo2 = Number(st.center.lng != null ? st.center.lng : st.center.lon);
      if (Number.isFinite(la2) && Number.isFinite(lo2)) return [la2, lo2];
    }
    if (Number.isFinite(Number(st.lat)) && Number.isFinite(Number(st.lon))) {
      return [Number(st.lat), Number(st.lon)];
    }
    return null;
  }

  function extractCoordsPair(obj) {
    if (!obj) return null;
    if (Array.isArray(obj.coords) && obj.coords.length >= 2) {
      var la = Number(obj.coords[0]);
      var lo = Number(obj.coords[1]);
      if (Number.isFinite(la) && Number.isFinite(lo)) return [la, lo];
    }
    if (Array.isArray(obj.center) && obj.center.length >= 2) {
      var la2 = Number(obj.center[0]);
      var lo2 = Number(obj.center[1]);
      if (Number.isFinite(la2) && Number.isFinite(lo2)) return [la2, lo2];
    }
    if (Number.isFinite(Number(obj.lat)) && Number.isFinite(Number(obj.lon != null ? obj.lon : obj.lng))) {
      return [Number(obj.lat), Number(obj.lon != null ? obj.lon : obj.lng)];
    }
    return null;
  }

  // Fast coarse continent interior check so coastal/island seas are never blanked out at z=2..4,
  // while deep continental interiors (Sahara, Siberia, North America interior, Amazon, Australia interior) are masked.
  var CONTINENT_INTERIOR_BOXES = [
    // North America interior
    [32, 64, -120, -82],
    [48, 66, -135, -95],
    // South America interior
    [-26, 4, -72, -46],
    // North Africa / Sahara
    [12, 31, -10, 32],
    // Central/Southern Africa interior
    [-24, 10, 16, 36],
    // Arabian interior
    [18, 28, 40, 50],
    // Eurasia / Siberia / Central Asia interior
    [45, 68, 32, 132],
    [30, 45, 62, 114],
    // Australia interior
    [-30, -18, 120, 146],
    // Greenland interior
    [66, 80, -52, -28]
  ];

  function isDeepLandInterior(lat, lon) {
    var wLon = wrapLon180(lon);
    if (lat < -74) return true; // Antarctic ice sheet interior
    for (var i = 0; i < CONTINENT_INTERIOR_BOXES.length; i++) {
      var b = CONTINENT_INTERIOR_BOXES[i];
      if (lat >= b[0] && lat <= b[1] && wLon >= b[2] && wLon <= b[3]) {
        return true;
      }
    }
    return false;
  }

  // Realistic multi-gyre global ocean surface current climatology (knots & degrees toward)
  function climatologicalOceanCurrent(lat, lon) {
    var wLon = wrapLon180(lon);
    var absLat = Math.abs(lat);
    var u = 0;
    var v = 0;

    // 1. Zonal trade-wind equatorial currents & westerlies drift
    if (absLat < 8) {
      // Equatorial counter-current / South Equatorial
      u = -0.55 * Math.cos((lat / 8) * Math.PI * 0.5);
      v = 0.08 * Math.sin(wLon * Math.PI / 90);
    } else if (absLat < 24) {
      // North & South Equatorial Currents (westward 0.45 - 0.85 kt)
      u = -0.62 * Math.cos(((absLat - 14) / 12) * Math.PI * 0.5);
      v = (lat >= 0 ? 0.12 : -0.12) * Math.cos(wLon * Math.PI / 60);
    } else if (absLat < 58) {
      // North Atlantic / North Pacific / ACC West Wind Drift (eastward 0.4 - 1.1 kt)
      var belt = Math.exp(-Math.pow((absLat - 42) / 14, 2));
      u = (lat < -34 ? 0.95 : 0.58) * belt;
      v = 0.15 * Math.sin(wLon * Math.PI / 45);
    } else {
      u = -0.28;
      v = -0.10;
    }

    // 2. Major Western Boundary Currents (Gulf Stream, Kuroshio, Agulhas, Brazil, EAC, Somali)
    var STREAMS = [
      // Gulf Stream (30N - 42N, 80W - 55W) -> NE at 1.8 - 2.4 kt
      { lat: 35.5, lon: -72.0, rLat: 7.0, rLon: 14.0, spd: 1.95, dir: 52 },
      // Kuroshio Current (24N - 38N, 125E - 150E) -> ENE at 1.6 - 2.2 kt
      { lat: 32.0, lon: 137.0, rLat: 7.0, rLon: 14.0, spd: 1.75, dir: 58 },
      // Agulhas Current (27S - 38S, 22E - 38E) -> SW at 1.7 - 2.3 kt
      { lat: -33.0, lon: 29.0, rLat: 6.5, rLon: 10.0, spd: 1.85, dir: 225 },
      // Somali / North Indian Ocean Current (8N - 16N, 52E - 68E)
      { lat: 11.5, lon: 58.0, rLat: 7.0, rLon: 12.0, spd: 1.15, dir: 55 },
      // Bay of Bengal / East India Coastal Current
      { lat: 14.0, lon: 84.0, rLat: 7.5, rLon: 8.5, spd: 0.75, dir: 35 },
      // Brazil Current (20S - 35S, 48W - 35W) -> SSW
      { lat: -27.0, lon: -42.0, rLat: 8.0, rLon: 9.0, spd: 1.05, dir: 205 },
      // East Australian Current (25S - 37S, 151E - 160E) -> S
      { lat: -31.0, lon: 155.0, rLat: 7.0, rLon: 7.0, spd: 1.20, dir: 188 }
    ];

    for (var i = 0; i < STREAMS.length; i++) {
      var st = STREAMS[i];
      var dLa = (lat - st.lat) / st.rLat;
      var dLo = wrapLon180(wLon - st.lon) / st.rLon;
      var d2 = dLa * dLa + dLo * dLo;
      if (d2 < 6.0) {
        var g = Math.exp(-0.5 * d2);
        var rad = st.dir * Math.PI / 180;
        u += st.spd * Math.sin(rad) * g;
        v += st.spd * Math.cos(rad) * g;
      }
    }

    var spd = clampNum(Math.hypot(u, v), 0.12, 3.8);
    var dir = ((Math.atan2(u, v) * 180 / Math.PI) + 360) % 360;
    return {
      currKt: spd,
      currDir: dir,
      currU: spd * Math.sin(dir * Math.PI / 180),
      currV: spd * Math.cos(dir * Math.PI / 180)
    };
  }

  // Analytical Synoptic + Cyclone/Hurricane Vortex Overlay evaluated at ANY (lat, lon)
  // Guarantees that approaching a cyclone smoothly and consistently transforms:
  // 1) Pressure (Holland profile -> centralPressure),
  // 2) Wind Speed & Cyclonic Direction (Rankine/Holland vortex -> maxWinds),
  // 3) Wave Height Hs (wind-sea + swell peak -> extreme cyclone waves),
  // 4) Ocean Current (cyclonic Ekman surface drift -> 1.2-3.5 kt),
  // 5) Air & Sea Surface Temperature (warm tropical core SST + rain-cooled air temp).
  function applyMesoscaleSystemsAtPoint(lat, lon, base, opts) {
    opts = opts || {};
    var wLon = wrapLon180(lon);
    var store = (typeof window.MARINE_WEATHER_STORE !== "undefined" && window.MARINE_WEATHER_STORE)
      ? window.MARINE_WEATHER_STORE
      : ((typeof MARINE_WEATHER_STORE !== "undefined" && MARINE_WEATHER_STORE) ? MARINE_WEATHER_STORE : {});

    var pressure = Number.isFinite(base.pressure) ? base.pressure : 1013.2;
    var windKt = Number.isFinite(base.windKt) ? base.windKt : 11;
    var windDir = Number.isFinite(base.windDir) ? base.windDir : 70;
    var windU = windKt * Math.sin(windDir * Math.PI / 180);
    var windV = windKt * Math.cos(windDir * Math.PI / 180);
    var wave = (base.wave != null && Number.isFinite(base.wave))
      ? base.wave
      : clampNum(0.45 + 0.062 * Math.pow(windKt, 1.12), 0.3, 12.0);
    var currKt = Number.isFinite(base.currKt) ? base.currKt : 0.32;
    var currDir = Number.isFinite(base.currDir) ? base.currDir : 90;
    var currU = currKt * Math.sin(currDir * Math.PI / 180);
    var currV = currKt * Math.cos(currDir * Math.PI / 180);
    var tempC = Number.isFinite(base.tempC) ? base.tempC : (26.8 - 0.35 * Math.abs(lat));
    var sst = Number.isFinite(base.sst) ? base.sst : clampNum(tempC + 0.6, -1.8, 31.0);
    var isSea = base.isSea !== false;

    // 1. Synoptic High / Low Pressure Centers from weather.json (supports pc.coords & pc.value)
    // Skip L centers that duplicate an active storm center (handled by full Holland storm profile below)
    var storms = Array.isArray(store.storms) ? store.storms : [];
    var pCenters = Array.isArray(store.pressureCenters) ? store.pressureCenters : [];
    for (var i = 0; i < pCenters.length; i++) {
      var pc = pCenters[i];
      var pcCoords = extractCoordsPair(pc);
      if (!pcCoords) continue;
      var pcLat = pcCoords[0];
      var pcLon = pcCoords[1];
      var isDupStorm = false;
      if (pc.type === "L") {
        for (var sIdx = 0; sIdx < storms.length; sIdx++) {
          var sc0 = extractStormCenter(storms[sIdx]);
          if (sc0 && Math.hypot(sc0[0] - pcLat, wrapLon180(sc0[1] - pcLon)) < 2.0) {
            isDupStorm = true;
            break;
          }
        }
      }
      if (isDupStorm) continue;
      var targetMb = Number(
        pc.value != null ? pc.value :
        (pc.pressureMb != null ? pc.pressureMb :
        (pc.pressure != null ? pc.pressure : (pc.type === "H" ? 1025 : 996)))
      );
      if (!Number.isFinite(targetMb)) continue;
      var dPc = gcdNm(lat, wLon, pcLat, pcLon);
      if (dPc < 1400) {
        var gPc = Math.exp(-(dPc * dPc) / (2 * 540 * 540));
        // Blend smoothly towards the synoptic center value
        if (base.source === "open-meteo") {
          pressure = pressure * (1 - 0.35 * gPc) + targetMb * (0.35 * gPc);
        } else {
          pressure += (targetMb - 1013.2) * gPc;
        }
      }
    }

    // 2. Named Wave Basins from weather.json (supports wa.waveHeight & wa.center)
    var waveAreas = Array.isArray(store.waves) ? store.waves : [];
    for (var wIdx = 0; wIdx < waveAreas.length; wIdx++) {
      var wa = waveAreas[wIdx];
      var wCoords = extractCoordsPair(wa);
      if (!wCoords) continue;
      var hM = Number(
        wa.waveHeight != null ? wa.waveHeight :
        (wa.significantWaveHeightM != null ? wa.significantWaveHeightM :
        (wa.heightM != null ? wa.heightM : wa.height))
      );
      if (!Number.isFinite(hM)) continue;
      var radNm = Number(wa.radiusNm) || 220;
      var dWv = gcdNm(lat, wLon, wCoords[0], wCoords[1]);
      if (dWv < radNm * 2.8) {
        var gWv = Math.exp(-(dWv * dWv) / (2 * (radNm * 0.95) * (radNm * 0.95)));
        var targetWave = wave * (1 - gWv) + hM * gWv;
        if (targetWave > wave) wave = targetWave;
      }
    }

    // 3. Explicit Wind Vectors from weather.json (outside storm core)
    var windVectors = Array.isArray(store.windVectors) ? store.windVectors : [];
    for (var vIdx = 0; vIdx < windVectors.length; vIdx++) {
      var wv = windVectors[vIdx];
      var vCoords = extractCoordsPair(wv);
      if (!vCoords) continue;
      var vSpd = Number(wv.speed != null ? wv.speed : wv.speedKt);
      var vDir = Number(wv.dir != null ? wv.dir : wv.dirDeg);
      if (!Number.isFinite(vSpd) || !Number.isFinite(vDir)) continue;
      var dVec = gcdNm(lat, wLon, vCoords[0], vCoords[1]);
      if (dVec < 240) {
        var gVec = Math.exp(-(dVec * dVec) / (2 * 95 * 95)) * 0.45;
        windU = windU * (1 - gVec) + (vSpd * Math.sin(vDir * Math.PI / 180)) * gVec;
        windV = windV * (1 - gVec) + (vSpd * Math.cos(vDir * Math.PI / 180)) * gVec;
      }
    }

    // 4. Full Mesoscale Tropical Cyclone / Hurricane Vortex Model (ALL 5 parameters)
    var nearestStormNm = 99999;
    var activeStormName = null;
    for (var s = 0; s < storms.length; s++) {
      var st = storms[s];
      var sc = extractStormCenter(st);
      if (!sc) continue;
      var sLat = sc[0];
      var sLon = sc[1];
      var dNm = gcdNm(lat, wLon, sLat, sLon);
      if (dNm < nearestStormNm) {
        nearestStormNm = dNm;
        activeStormName = st.shortName || st.name || "Cyclone";
      }

      var maxKt = Number(
        st.maxWinds != null ? st.maxWinds :
        (st.maxWindKt != null ? st.maxWindKt :
        (st.windKt != null ? st.windKt : 65))
      );
      var coreMb = Number(
        st.centralPressure != null ? st.centralPressure :
        (st.pressureMb != null ? st.pressureMb :
        (st.centralPressureMb != null ? st.centralPressureMb :
        Math.round(1010 - maxKt * 0.55)))
      );
      var dangerNm = Math.max(55, Number(st.dangerRadiusNm) || 90);
      var outerNm = Math.max(380, dangerNm * 3.6);
      if (dNm >= outerNm) continue;

      // Radius of Maximum Wind (RMW): ~20-28 NM
      var rmw = clampNum(dangerNm * 0.26, 18, 30);
      var outerTapering = smoothstep01(1 - dNm / outerNm);

      // (A) Atmospheric Pressure: Holland (1980) Hurricane Profile
      // P(r) = Pc + (Penv - Pc) * exp(-(Rmw / r)^B)
      var envP = Math.max(pressure, coreMb + 8, 1009.5);
      var hollandB = clampNum(1.15 + (maxKt - 35) * 0.004, 1.05, 1.65);
      var effR = Math.max(dNm, 2.5);
      var hollandFactor = Math.exp(-Math.pow(rmw / effR, hollandB));
      var hollandP = coreMb + (envP - coreMb) * hollandFactor;
      // Guarantee smooth transition to ambient pressure at outerNm and exact coreMb at dNm -> 0
      var pBlend = Math.pow(outerTapering, 0.75);
      var stormP = hollandP * pBlend + pressure * (1 - pBlend);
      if (stormP < pressure) {
        pressure = stormP;
      }

      // (B) Cyclonic Wind Speed & Direction (Coriolis rotation + 22 deg cross-isobaric inflow)
      var dLat = lat - sLat;
      var dLonScaled = wrapLon180(wLon - sLon) * Math.cos(sLat * Math.PI / 180);
      var bearingFromCenterRad = Math.atan2(dLonScaled, dLat); // 0 = North of center, PI/2 = East
      // Tangential flow direction (TOWARD which air moves):
      // Northern Hemisphere (sLat >= 0): CCW around low -> bearing - PI/2, plus 22 deg (0.38 rad) inward toward center
      // Southern Hemisphere (sLat < 0): CW around low -> bearing + PI/2, plus 22 deg inward toward center
      var inflowRad = 0.38;
      var flowTowardRad = (sLat >= 0)
        ? (bearingFromCenterRad - Math.PI * 0.5 - inflowRad)
        : (bearingFromCenterRad + Math.PI * 0.5 + inflowRad);
      // Meteorological wind direction is FROM:
      var windFromRad = flowTowardRad + Math.PI;

      // Speed profile:
      // For dNm >= rmw: modified Rankine/Holland decay (rmw / dNm)^0.58
      // Inside dNm <= rmw: reaches full maxKt at center/eyewall so approaching 0 NM is monotonically increasing
      var vortexSpd;
      if (dNm >= rmw) {
        var ratio = rmw / dNm;
        vortexSpd = maxKt * Math.pow(ratio, 0.56) * outerTapering;
      } else {
        var innerT = 1 - (dNm / rmw);
        vortexSpd = maxKt * (1.0 + 0.02 * innerT);
      }

      var wBlend = clampNum(Math.pow(outerTapering, 0.68) * 1.15, 0, 1);
      var sWindU = vortexSpd * Math.sin(windFromRad);
      var sWindV = vortexSpd * Math.cos(windFromRad);
      windU = windU * (1 - wBlend) + sWindU * wBlend;
      windV = windV * (1 - wBlend) + sWindV * wBlend;
      var combinedWindKt = Math.hypot(windU, windV);
      var targetMinKt = vortexSpd * wBlend + windKt * (1 - wBlend);
      if (combinedWindKt < targetMinKt && combinedWindKt > 0.01) {
        var scaleW = targetMinKt / combinedWindKt;
        windU *= scaleW;
        windV *= scaleW;
      }
      if (dNm <= rmw) {
        var exactKt = Math.max(maxKt, combinedWindKt);
        windU = exactKt * Math.sin(windFromRad);
        windV = exactKt * Math.cos(windFromRad);
      }
      windKt = Math.hypot(windU, windV);
      windDir = ((Math.atan2(windU, windV) * 180 / Math.PI) + 360) % 360;

      // (C) Significant Wave Height (Hs): scales physically with cyclone maxWinds & radial profile
      var peakWaveM = Math.max(2.6, 0.8 + 0.072 * maxKt + 0.00034 * maxKt * maxKt);
      var waveProfile = dNm <= rmw
        ? (1.0 + 0.02 * (1 - dNm / rmw))
        : Math.exp(-Math.pow((dNm - rmw) / (dangerNm * 1.45), 1.35));
      var stormWaveM = (1.0 + (peakWaveM - 1.0) * waveProfile) * outerTapering + wave * (1 - outerTapering);
      if (stormWaveM > wave) {
        wave = stormWaveM;
      }

      // (D) Cyclonic Ocean Surface Current (Ekman wind-driven surge ~ 3.0% of wind speed, deflected 25 deg)
      var ekmanDeflectRad = (sLat >= 0) ? (25 * Math.PI / 180) : (-25 * Math.PI / 180);
      var stormCurrTowardRad = flowTowardRad + ekmanDeflectRad;
      var stormCurrKt = clampNum(vortexSpd * 0.030, 0.25, 3.8);
      var cBlend = clampNum(Math.pow(outerTapering, 0.75) * 1.1, 0, 1);
      var sCurrU = stormCurrKt * Math.sin(stormCurrTowardRad);
      var sCurrV = stormCurrKt * Math.cos(stormCurrTowardRad);
      currU = currU * (1 - cBlend) + sCurrU * cBlend;
      currV = currV * (1 - cBlend) + sCurrV * cBlend;
      var combinedCurrKt = Math.hypot(currU, currV);
      var targetCurrKt = stormCurrKt * cBlend + currKt * (1 - cBlend);
      if (combinedCurrKt < targetCurrKt && combinedCurrKt > 0.005) {
        var scaleC = targetCurrKt / combinedCurrKt;
        currU *= scaleC;
        currV *= scaleC;
      }
      currKt = Math.hypot(currU, currV);
      currDir = ((Math.atan2(currU, currV) * 180 / Math.PI) + 360) % 360;

      // (E) Air & Sea Surface Temperature: warm tropical ocean core + rain/evaporative air cooling & cold wake
      var coreEnvSst = Math.max(sst, 27.8);
      var coreCoolWake = 1.1 * Math.exp(-Math.pow(dNm / (dangerNm * 0.9), 2));
      var coreRainAirCool = (1.6 + 0.012 * maxKt) * Math.exp(-Math.pow(dNm / (dangerNm * 1.25), 1.5));
      var tBlend = Math.pow(outerTapering, 0.8);
      sst = sst * (1 - tBlend) + (coreEnvSst - coreCoolWake) * tBlend;
      tempC = tempC * (1 - tBlend) + (coreEnvSst - 0.4 - coreRainAirCool) * tBlend;
      isSea = true;
    }

    return {
      isSea: isSea,
      wave: isSea ? wave : null,
      waveFallback: wave,
      pressure: pressure,
      windKt: windKt,
      windDir: windDir,
      windU: windU,
      windV: windV,
      currKt: isSea ? currKt : 0,
      currDir: currDir,
      currU: isSea ? currU : 0,
      currV: isSea ? currV : 0,
      tempC: tempC,
      sst: sst,
      nearestStormNm: nearestStormNm,
      activeStormName: activeStormName,
      source: base.source || "baseline"
    };
  }

  var DEG2RAD = Math.PI / 180;
  var _DEG_STEP_NM = 60;

  function fastSphereNm(lat1, wLon1, cosLat1, sinLat1, item) {
    var dLat = lat1 - item.lat;
    if (dLat > item.maxDLat || dLat < -item.maxDLat) return 99999;
    var dLonDeg = wLon1 - item.lon;
    if (dLonDeg > 180) dLonDeg -= 360;
    else if (dLonDeg < -180) dLonDeg += 360;
    if (dLonDeg > item.maxDLon || dLonDeg < -item.maxDLon) return 99999;
    if (Math.abs(dLat) < 0.025 && Math.abs(dLonDeg) < 0.025) {
      return _DEG_STEP_NM * Math.hypot(dLat, dLonDeg * cosLat1);
    }
    var cosD = sinLat1 * item.sinLat + cosLat1 * item.cosLat * Math.cos(dLonDeg * DEG2RAD);
    if (cosD >= 1) return 0;
    if (cosD <= -1) return 10808;
    return Math.acos(cosD) * 3440.065;
  }

  function prepareFrameMesoscale() {
    var store = (typeof window.MARINE_WEATHER_STORE !== "undefined" && window.MARINE_WEATHER_STORE)
      ? window.MARINE_WEATHER_STORE
      : ((typeof MARINE_WEATHER_STORE !== "undefined" && MARINE_WEATHER_STORE) ? MARINE_WEATHER_STORE : {});

    var rawStorms = Array.isArray(store.storms) ? store.storms : [];
    var storms = [];
    for (var s = 0; s < rawStorms.length; s++) {
      var st = rawStorms[s];
      var sc = extractStormCenter(st);
      if (!sc) continue;
      var sLat = sc[0];
      var sLon = wrapLon180(sc[1]);
      var maxKt = Number(
        st.maxWinds != null ? st.maxWinds :
        (st.maxWindKt != null ? st.maxWindKt :
        (st.windKt != null ? st.windKt : 65))
      );
      var coreMb = Number(
        st.centralPressure != null ? st.centralPressure :
        (st.pressureMb != null ? st.pressureMb :
        (st.centralPressureMb != null ? st.centralPressureMb :
        Math.round(1010 - maxKt * 0.55)))
      );
      var dangerNm = Math.max(55, Number(st.dangerRadiusNm) || 90);
      var outerNm = Math.max(380, dangerNm * 3.6);
      var rmw = clampNum(dangerNm * 0.26, 18, 30);
      var cosS = Math.cos(sLat * DEG2RAD);
      var degPad = outerNm / 58.0 + 1.5;
      storms.push({
        lat: sLat,
        lon: sLon,
        cosLat: cosS,
        sinLat: Math.sin(sLat * DEG2RAD),
        maxDLat: degPad,
        maxDLon: Math.min(180, degPad / Math.max(0.18, Math.abs(cosS))),
        maxKt: maxKt,
        coreMb: coreMb,
        dangerNm: dangerNm,
        outerNm: outerNm,
        invOuterNm: 1 / outerNm,
        rmw: rmw,
        hollandB: clampNum(1.15 + (maxKt - 35) * 0.004, 1.05, 1.65),
        peakWaveM: Math.max(2.6, 0.8 + 0.072 * maxKt + 0.00034 * maxKt * maxKt),
        wavePowScale: 1 / (dangerNm * 1.45)
      });
    }

    var rawP = Array.isArray(store.pressureCenters) ? store.pressureCenters : [];
    var pCenters = [];
    for (var i = 0; i < rawP.length; i++) {
      var pc = rawP[i];
      var pcCoords = extractCoordsPair(pc);
      if (!pcCoords) continue;
      var pcLat = pcCoords[0];
      var pcLon = wrapLon180(pcCoords[1]);
      var dup = false;
      if (pc.type === "L") {
        for (var si = 0; si < storms.length; si++) {
          if (Math.hypot(storms[si].lat - pcLat, wrapLon180(storms[si].lon - pcLon)) < 2.0) {
            dup = true;
            break;
          }
        }
      }
      if (dup) continue;
      var targetMb = Number(
        pc.value != null ? pc.value :
        (pc.pressureMb != null ? pc.pressureMb :
        (pc.pressure != null ? pc.pressure : (pc.type === "H" ? 1025 : 996)))
      );
      if (!Number.isFinite(targetMb)) continue;
      var cosP = Math.cos(pcLat * DEG2RAD);
      var pDegPad = 1400 / 58.0 + 1.5;
      pCenters.push({
        lat: pcLat,
        lon: pcLon,
        cosLat: cosP,
        sinLat: Math.sin(pcLat * DEG2RAD),
        maxDLat: pDegPad,
        maxDLon: Math.min(180, pDegPad / Math.max(0.18, Math.abs(cosP))),
        targetMb: targetMb,
        deltaAmbientMb: targetMb - 1013.2,
        invTwoSigSq: 1 / (2 * 540 * 540)
      });
    }

    var rawW = Array.isArray(store.waves) ? store.waves : [];
    var waveAreas = [];
    for (var w = 0; w < rawW.length; w++) {
      var wa = rawW[w];
      var wCoords = extractCoordsPair(wa);
      if (!wCoords) continue;
      var hM = Number(
        wa.waveHeight != null ? wa.waveHeight :
        (wa.significantWaveHeightM != null ? wa.significantWaveHeightM :
        (wa.heightM != null ? wa.heightM : wa.height))
      );
      if (!Number.isFinite(hM)) continue;
      var radNm = Number(wa.radiusNm) || 220;
      var cutoffNm = radNm * 2.8;
      var cosW = Math.cos(wCoords[0] * DEG2RAD);
      var wDegPad = cutoffNm / 58.0 + 1.5;
      waveAreas.push({
        lat: wCoords[0],
        lon: wrapLon180(wCoords[1]),
        cosLat: cosW,
        sinLat: Math.sin(wCoords[0] * DEG2RAD),
        maxDLat: wDegPad,
        maxDLon: Math.min(180, wDegPad / Math.max(0.18, Math.abs(cosW))),
        hM: hM,
        cutoffNm: cutoffNm,
        invTwoSigSq: 1 / (2 * (radNm * 0.95) * (radNm * 0.95))
      });
    }

    return {
      storms: storms,
      pCenters: pCenters,
      waveAreas: waveAreas
    };
  }

  function ensureWxSynopticPane(map) {
    if (!map || !map.getPane || !map.createPane) return "overlayPane";
    var pane = map.getPane(WX_PANE);
    if (!pane) pane = map.createPane(WX_PANE);
    if (pane) {
      pane.style.zIndex = String(WX_PANE_Z);
      pane.style.pointerEvents = "none";
    }
    return WX_PANE;
  }

  function nodeCacheKey(lat, lon) {
    var wLon = wrapLon180(lon);
    var latS = (Math.round(lat * 100) / 100).toFixed(2);
    var lonS = (Math.round(wLon * 100) / 100).toFixed(2);
    return latS + "," + lonS;
  }

  function pruneCacheIfNeeded() {
    if (_nodeCache.size <= MAX_CACHE_NODES) return;
    var dropCount = _nodeCache.size - MAX_CACHE_NODES;
    var i = 0;
    var iter = _nodeCache.keys();
    var step = iter.next();
    while (!step.done && i < dropCount) {
      _nodeCache.delete(step.value);
      i += 1;
      step = iter.next();
    }
  }

  function getLiveCachedNode(lat, lon) {
    var key = nodeCacheKey(lat, lon);
    var hit = _nodeCache.get(key);
    if (!hit) return null;
    if ((Date.now() - hit.ts) > NODE_TTL_MS) return null;
    return hit;
  }

  // Synthesize background synoptic node (without mesoscale cyclone superposition, which is applied once at exact query points)
  function synthesizeBaselineNode(lat, lon) {
    var wLon = wrapLon180(lon);
    var latRad = lat * Math.PI / 180;
    var lonRad = wLon * Math.PI / 180;

    // 1. Check Open-Meteo point cache (correctly reading nested .wind, .marine, .current objects!)
    var cachedOm = (typeof window.getCachedOpenMeteoPointWx === "function")
      ? window.getCachedOpenMeteoPointWx(lat, wLon) : null;
    if (cachedOm && (cachedOm.wind || cachedOm.marine || cachedOm.current)) {
      var cw = cachedOm.wind || {};
      var cm = cachedOm.marine || {};
      var cc = cachedOm.current || {};
      var climC0 = climatologicalOceanCurrent(lat, wLon);
      var wSpd = cw.windKt != null ? Number(cw.windKt) : 11;
      var wDir = cw.windDir != null ? Number(cw.windDir) : 240;
      var pMb = cw.pressureMb != null ? Number(cw.pressureMb) : 1013.2;
      var tC = cw.airC != null ? Number(cw.airC) : (cm.sstC != null ? Number(cm.sstC) : (26.0 - 0.35 * Math.abs(lat)));
      var sstC = cm.sstC != null ? Number(cm.sstC) : tC;
      var hasWave = cm.waveHs != null && Number.isFinite(Number(cm.waveHs));
      var waveEst = hasWave ? Number(cm.waveHs) : clampNum(0.35 + 0.048 * Math.pow(wSpd, 1.10), 0.3, 11.0);
      var curKt = (cc.ok && cc.speedKn != null) ? Number(cc.speedKn) : climC0.currKt;
      var curDir = (cc.ok && cc.dirDeg != null) ? Number(cc.dirDeg) : climC0.currDir;
      return {
        isSea: hasWave ? true : !isDeepLandInterior(lat, wLon),
        wave: waveEst,
        waveFallback: waveEst,
        pressure: pMb,
        windKt: wSpd,
        windDir: wDir,
        windU: wSpd * Math.sin(wDir * Math.PI / 180),
        windV: wSpd * Math.cos(wDir * Math.PI / 180),
        currKt: curKt,
        currDir: curDir,
        currU: curKt * Math.sin(curDir * Math.PI / 180),
        currV: curKt * Math.cos(curDir * Math.PI / 180),
        tempC: tC,
        sst: sstC,
        source: "om-point"
      };
    }

    // 2. Realistic multi-cell synoptic baseline (subtropical highs, subpolar lows, Rossby planetary waves)
    var pressure = 1013.2
      + 7.5 * Math.cos((Math.abs(lat) - 31) * Math.PI / 34) * Math.exp(-Math.pow((Math.abs(lat) - 31) / 26, 2))
      - 9.2 * Math.exp(-Math.pow((Math.abs(lat) - 58) / 14, 2))
      - 3.4 * Math.exp(-Math.pow(lat / 11, 2))
      + 4.2 * Math.sin(2 * lonRad + 0.7) * Math.cos(latRad)
      + 3.1 * Math.cos(3 * lonRad - 0.9 * latRad) * Math.sin(latRad);

    var windSpd = 8.5
      + 11.0 * Math.exp(-Math.pow((Math.abs(lat) - 52) / 13, 2))
      + 3.5 * Math.exp(-Math.pow((Math.abs(lat) - 16) / 10, 2))
      + 2.4 * Math.sin(2 * lonRad + latRad);
    windSpd = clampNum(windSpd, 4, 34);

    var windDir;
    if (Math.abs(lat) < 27) {
      windDir = (lat >= 0 ? 62 : 118) + 18 * Math.sin(2 * lonRad);
    } else if (Math.abs(lat) < 62) {
      windDir = (lat >= 0 ? 252 : 278) + 24 * Math.cos(2 * lonRad - latRad);
    } else {
      windDir = (lat >= 0 ? 75 : 105) + 15 * Math.sin(lonRad);
    }
    windDir = ((windDir % 360) + 360) % 360;

    // Calibrated baseline wave heights:
    // Tropics/Subtropics: ~0.6 - 1.3m (Deep Blue / Cyan), Mid-latitudes: ~1.4 - 2.2m (Cyan / Teal),
    // Subpolar storm belts (50N/50S): ~2.4 - 3.4m (Teal / Lime), Storm basins & Cyclones: 4m - 13.5m (Amber -> Red -> Magenta)
    var wave = clampNum(
      0.38 + 0.046 * Math.pow(windSpd, 1.12) + 0.65 * Math.exp(-Math.pow((Math.abs(lat) - 52) / 12, 2)),
      0.3,
      11.0
    );

    var climCurr = climatologicalOceanCurrent(lat, wLon);
    var tempC = 27.6 - 0.38 * Math.abs(lat) + 1.6 * Math.cos(lonRad - 0.4);
    var sst = clampNum(tempC + 0.7, -1.8, 30.5);

    return {
      isSea: !isDeepLandInterior(lat, wLon),
      wave: wave,
      waveFallback: wave,
      pressure: pressure,
      windKt: windSpd,
      windDir: windDir,
      windU: windSpd * Math.sin(windDir * Math.PI / 180),
      windV: windSpd * Math.cos(windDir * Math.PI / 180),
      currKt: climCurr.currKt,
      currDir: climCurr.currDir,
      currU: climCurr.currU,
      currV: climCurr.currV,
      tempC: tempC,
      sst: sst,
      source: "baseline"
    };
  }

  function buildViewportGeoGrid(map, marginPx) {
    var sz = map.getSize();
    var w = sz.x;
    var h = sz.y;
    if (w < 8 || h < 8) return null;

    var pad = marginPx > 0 ? marginPx : 0;
    var zoom = map.getZoom ? map.getZoom() : 3;
    var nw = map.containerPointToLatLng([-pad, -pad]);
    var se = map.containerPointToLatLng([w + pad, h + pad]);
    var rawMinLat = Math.min(nw.lat, se.lat);
    var rawMaxLat = Math.max(nw.lat, se.lat);
    var rawMinLon = Math.min(nw.lng, se.lng);
    var rawMaxLon = Math.max(nw.lng, se.lng);

    var isGlobalZoom = zoom <= 4 || (rawMaxLon - rawMinLon) >= 240;

    var minLat, maxLat, startLon, endLon, dLat, dLon;
    if (isGlobalZoom) {
      minLat = -80;
      maxLat = 80;
      startLon = -180;
      endLon = 180;
      dLon = 24;
      dLat = 20;
    } else {
      var latSpan = Math.max(0.15, rawMaxLat - rawMinLat);
      var lonSpan = Math.min(360, Math.max(0.2, rawMaxLon - rawMinLon));
      minLat = clampNum(rawMinLat - latSpan * 0.20, -82, 82);
      maxLat = clampNum(rawMaxLat + latSpan * 0.20, -82, 82);
      var minLon = rawMinLon - lonSpan * 0.20;
      var maxLon = Math.min(rawMaxLon + lonSpan * 0.20, minLon + 360);
      var latExt = Math.max(0.2, maxLat - minLat);
      var lonExt = Math.max(0.2, maxLon - minLon);

      var lonIdx = _lonSteps.length - 1;
      for (var i = 0; i < _lonSteps.length; i++) {
        if (Math.floor(lonExt / _lonSteps[i]) + 2 <= 11) {
          lonIdx = i;
          break;
        }
      }
      var latIdx = _latSteps.length - 1;
      for (var j = 0; j < _latSteps.length; j++) {
        if (Math.floor(latExt / _latSteps[j]) + 2 <= 9) {
          latIdx = j;
          break;
        }
      }

      var countCols = function (s) {
        var sLo = Math.floor(minLon / s) * s;
        var eLo = Math.min(sLo + 360, Math.ceil(maxLon / s) * s);
        return Math.max(2, Math.floor((eLo - sLo) / s) + 1);
      };
      var countRows = function (s) {
        var sLa = Math.max(-80, Math.floor(minLat / s) * s);
        var eLa = Math.min(80, Math.ceil(maxLat / s) * s);
        return Math.max(2, Math.floor((eLa - sLa) / s) + 1);
      };

      while (countCols(_lonSteps[lonIdx]) * countRows(_latSteps[latIdx]) > 96 &&
             (lonIdx < _lonSteps.length - 1 || latIdx < _latSteps.length - 1)) {
        var cols = countCols(_lonSteps[lonIdx]);
        var rows = countRows(_latSteps[latIdx]);
        if (cols >= rows && lonIdx < _lonSteps.length - 1) lonIdx += 1;
        else if (latIdx < _latSteps.length - 1) latIdx += 1;
        else lonIdx += 1;
      }

      dLon = _lonSteps[lonIdx];
      dLat = _latSteps[latIdx];
      minLat = Math.max(-80, Math.floor(minLat / dLat) * dLat);
      maxLat = Math.min(80, Math.ceil(maxLat / dLat) * dLat);
      startLon = Math.floor(minLon / dLon) * dLon;
      endLon = Math.min(startLon + 360, Math.ceil(maxLon / dLon) * dLon);
    }

    var lats = [];
    for (var la = minLat; la <= maxLat + 1e-6 && lats.length < 13; la += dLat) {
      lats.push(Math.round(la * 1000) / 1000);
    }
    if (lats.length < 2) lats.push(Math.min(82, minLat + dLat));

    var lons = [];
    for (var lo = startLon; lo <= endLon + 1e-6 && lons.length < 17; lo += dLon) {
      lons.push(Math.round(lo * 1000) / 1000);
    }
    if (lons.length < 2) lons.push(startLon + dLon);

    var nRows = lats.length;
    var nCols = lons.length;
    var len = nRows * nCols;
    var nodes = new Array(len);
    var pArr = new Float32Array(len);
    var wArr = new Float32Array(len);
    var sArr = new Uint8Array(len);
    var missing = [];
    var seenMissing = new Set();

    for (var r = 0; r < nRows; r++) {
      var rLat = lats[r];
      for (var c = 0; c < nCols; c++) {
        var cLon = lons[c];
        var idx = r * nCols + c;
        var nd = getLiveCachedNode(rLat, cLon);
        if (!nd) {
          nd = synthesizeBaselineNode(rLat, cLon);
          var k = nodeCacheKey(rLat, cLon);
          if (!seenMissing.has(k)) {
            seenMissing.add(k);
            missing.push({ lat: rLat, lon: wrapLon180(cLon), key: k });
          }
        }
        nodes[idx] = nd;
        pArr[idx] = Number.isFinite(nd.pressure) ? nd.pressure : 1013.2;
        wArr[idx] = (nd.wave != null && Number.isFinite(nd.wave))
          ? nd.wave
          : (nd.waveFallback != null ? nd.waveFallback : clampNum(0.45 + 0.062 * Math.pow(nd.windKt || 10, 1.12), 0.35, 10));
        sArr[idx] = nd.isSea ? 1 : 0;
      }
    }

    return {
      lats: lats,
      lons: lons,
      nRows: nRows,
      nCols: nCols,
      dLat: dLat,
      dLon: dLon,
      isGlobal: isGlobalZoom,
      nodes: nodes,
      _pressure: pArr,
      _wave: wArr,
      _sea: sArr,
      missing: missing
    };
  }

  function buildGridAxisLookup(grid, map, cw, ch, step, countX, countY, originX, originY, zoom) {
    var nRows = grid.nRows;
    var nCols = grid.nCols;
    var lats = grid.lats;
    var lons = grid.lons;
    var lat0 = lats[0];
    var latMax = lats[nRows - 1];
    var lon0 = lons[0];
    var lonMax = lons[nCols - 1];
    var span = lonMax - lon0;
    var invDLat = 1 / (grid.dLat || 1);
    var invDLon = 1 / (grid.dLon || 1);

    var rowLat = new Float64Array(countY);
    var rowCos = new Float64Array(countY);
    var rowSin = new Float64Array(countY);
    var rowR0 = new Uint16Array(countY);
    var rowR1 = new Uint16Array(countY);
    var rowTy = new Float32Array(countY);

    for (var py = 0; py < countY; py++) {
      var wy = originY + Math.min(ch, py * step);
      var la = map.unproject(L.point(originX, wy), zoom).lat;
      rowLat[py] = la;
      rowCos[py] = Math.cos(la * DEG2RAD);
      rowSin[py] = Math.sin(la * DEG2RAD);
      var clLat = clampNum(la, lat0, latMax);
      var fRow = clampNum((clLat - lat0) * invDLat, 0, nRows - 1.0001);
      var r0 = Math.floor(fRow);
      var r1 = r0 + 1 < nRows ? r0 + 1 : nRows - 1;
      rowR0[py] = r0 * nCols;
      rowR1[py] = r1 * nCols;
      var ftY = fRow - r0;
      rowTy[py] = ftY * ftY * (3 - 2 * ftY);
    }

    var colRawLon = new Float64Array(countX);
    var colWLon = new Float64Array(countX);
    var colC0 = new Uint16Array(countX);
    var colC1 = new Uint16Array(countX);
    var colTx = new Float32Array(countX);

    for (var px = 0; px < countX; px++) {
      var wx = originX + Math.min(cw, px * step);
      var rawLo = map.unproject(L.point(wx, originY), zoom).lng;
      colRawLon[px] = rawLo;
      colWLon[px] = wrapLon180(rawLo);
      var lo = grid.isGlobal ? colWLon[px] : rawLo;
      while (lo < lon0) lo += 360;
      while (lo > lonMax) {
        if (lo - 360 >= lon0) lo -= 360;
        else break;
      }
      if (lo > lonMax && span >= 336) {
        lo = lon0 + ((((lo - lon0) % 360) + 360) % 360);
      }
      var clLon = clampNum(lo, lon0, lonMax);
      var fCol = clampNum((clLon - lon0) * invDLon, 0, nCols - 1.0001);
      var c0 = Math.floor(fCol);
      var c1 = c0 + 1 < nCols ? c0 + 1 : nCols - 1;
      colC0[px] = c0;
      colC1[px] = c1;
      var ftX = fCol - c0;
      colTx[px] = ftX * ftX * (3 - 2 * ftX);
    }

    return {
      rowLat: rowLat, rowCos: rowCos, rowSin: rowSin, rowR0: rowR0, rowR1: rowR1, rowTy: rowTy,
      colRawLon: colRawLon, colWLon: colWLon, colC0: colC0, colC1: colC1, colTx: colTx
    };
  }

  // Smooth Hermite + Scalar-Preserving Bilinear Interpolation + Point-Exact Cyclone Superposition
  function sampleGridFieldAtLatLon(grid, lat, rawLon) {
    var nRows = grid.nRows;
    var nCols = grid.nCols;
    var lats = grid.lats;
    var lons = grid.lons;

    var lon = grid.isGlobal ? wrapLon180(rawLon) : rawLon;
    var span = lons[nCols - 1] - lons[0];
    while (lon < lons[0]) lon += 360;
    while (lon > lons[nCols - 1]) {
      if (lon - 360 >= lons[0]) lon -= 360;
      else break;
    }
    if (lon > lons[nCols - 1] && span >= 336) {
      lon = lons[0] + ((((lon - lons[0]) % 360) + 360) % 360);
    }

    var clLat = clampNum(lat, lats[0], lats[nRows - 1]);
    var clLon = clampNum(lon, lons[0], lons[nCols - 1]);

    var fRow = clampNum((clLat - lats[0]) / (grid.dLat || 1), 0, nRows - 1.0001);
    var fCol = clampNum((clLon - lons[0]) / (grid.dLon || 1), 0, nCols - 1.0001);
    var r0 = Math.floor(fRow);
    var c0 = Math.floor(fCol);
    var r1 = Math.min(nRows - 1, r0 + 1);
    var c1 = Math.min(nCols - 1, c0 + 1);

    // Smoothstep weights remove blocky Mach-band edges on isobars & wave heatmap
    var ty = smoothstep01(fRow - r0);
    var tx = smoothstep01(fCol - c0);

    var w00 = (1 - tx) * (1 - ty);
    var w10 = tx * (1 - ty);
    var w01 = (1 - tx) * ty;
    var w11 = tx * ty;

    var n00 = grid.nodes[r0 * nCols + c0];
    var n10 = grid.nodes[r0 * nCols + c1];
    var n01 = grid.nodes[r1 * nCols + c0];
    var n11 = grid.nodes[r1 * nCols + c1];

    var pressure = n00.pressure * w00 + n10.pressure * w10 + n01.pressure * w01 + n11.pressure * w11;
    var tempC = n00.tempC * w00 + n10.tempC * w10 + n01.tempC * w01 + n11.tempC * w11;
    var sst = (n00.sst != null ? n00.sst : n00.tempC) * w00
      + (n10.sst != null ? n10.sst : n10.tempC) * w10
      + (n01.sst != null ? n01.sst : n01.tempC) * w01
      + (n11.sst != null ? n11.sst : n11.tempC) * w11;

    // Scalar speed + unit-vector direction interpolation prevents opposing wind/current cancellation
    var scalarWindKt = n00.windKt * w00 + n10.windKt * w10 + n01.windKt * w01 + n11.windKt * w11;
    var rawWindU = n00.windU * w00 + n10.windU * w10 + n01.windU * w01 + n11.windU * w11;
    var rawWindV = n00.windV * w00 + n10.windV * w10 + n01.windV * w01 + n11.windV * w11;
    var windDir = (Math.hypot(rawWindU, rawWindV) > 0.01)
      ? (((Math.atan2(rawWindU, rawWindV) * 180 / Math.PI) + 360) % 360)
      : n00.windDir;

    var seaFrac = 0;
    var waveSum = 0;
    var cSpdSum = 0;
    var cU = 0;
    var cV = 0;

    var corners = [
      [n00, w00],
      [n10, w10],
      [n01, w01],
      [n11, w11]
    ];
    for (var i = 0; i < 4; i++) {
      var nd = corners[i][0];
      var wt = corners[i][1];
      var wVal = (nd.wave != null && Number.isFinite(nd.wave))
        ? nd.wave
        : (nd.waveFallback != null ? nd.waveFallback : clampNum(0.45 + 0.062 * Math.pow(nd.windKt || 10, 1.12), 0.35, 10));
      waveSum += wVal * wt;
      if (nd.isSea) {
        seaFrac += wt;
        cSpdSum += (nd.currKt || 0) * wt;
        cU += (nd.currU || 0) * wt;
        cV += (nd.currV || 0) * wt;
      }
    }

    // At coarse global zoom (dLon >= 12), if a pixel is not in a deep continental interior,
    // ensure coastal/enclosed seas (Mediterranean, Red Sea, Persian Gulf, North Sea, etc.) always color!
    if (grid.dLon >= 8 && !isDeepLandInterior(lat, rawLon)) {
      seaFrac = Math.max(seaFrac, 0.78);
    }

    var isSea = seaFrac >= 0.18;
    var currKt = 0;
    var currDir = 90;
    if (isSea) {
      if (seaFrac > 0.05 && cSpdSum > 0.01) {
        currKt = cSpdSum / Math.max(0.25, seaFrac);
        currDir = (Math.hypot(cU, cV) > 0.005)
          ? (((Math.atan2(cU, cV) * 180 / Math.PI) + 360) % 360)
          : n00.currDir;
      } else {
        var cc = climatologicalOceanCurrent(lat, rawLon);
        currKt = cc.currKt;
        currDir = cc.currDir;
      }
    }

    var baseInterp = {
      isSea: isSea,
      seaFrac: seaFrac,
      wave: isSea ? waveSum : null,
      waveFallback: waveSum,
      pressure: pressure,
      windKt: scalarWindKt,
      windDir: windDir,
      windU: scalarWindKt * Math.sin(windDir * Math.PI / 180),
      windV: scalarWindKt * Math.cos(windDir * Math.PI / 180),
      currKt: currKt,
      currDir: currDir,
      currU: currKt * Math.sin(currDir * Math.PI / 180),
      currV: currKt * Math.cos(currDir * Math.PI / 180),
      tempC: tempC,
      sst: sst,
      source: n00.source
    };

    var out = applyMesoscaleSystemsAtPoint(lat, rawLon, baseInterp);
    out.seaFrac = out.isSea ? Math.max(seaFrac, 0.65) : seaFrac;
    return out;
  }

  function waveColorRgba(waveM, seaFrac) {
    var seaMult = seaFrac >= 0.55 ? 1 : clampNum((seaFrac - 0.15) / 0.40, 0, 1);
    if (seaMult <= 0.01 || waveM == null || !Number.isFinite(waveM)) return [0, 0, 0, 0];
    var h = clampNum(waveM, 0, 14);
    for (var i = 1; i < WAVE_STOPS.length; i++) {
      var a = WAVE_STOPS[i - 1];
      var b = WAVE_STOPS[i];
      if (h <= b[0] || i === WAVE_STOPS.length - 1) {
        var t = b[0] > a[0] ? clampNum((h - a[0]) / (b[0] - a[0]), 0, 1) : 1;
        return [
          Math.round(a[1] + (b[1] - a[1]) * t),
          Math.round(a[2] + (b[2] - a[2]) * t),
          Math.round(a[3] + (b[3] - a[3]) * t),
          Math.round((a[4] + (b[4] - a[4]) * t) * seaMult * 255)
        ];
      }
    }
    return [168, 85, 247, Math.round(0.68 * seaMult * 255)];
  }

  function renderWaveHeatmap(ctx, map, grid, cw, ch, originX, originY, zoom, sys, fastDragMode) {
    var lowEnd = isWeakDeviceMode() || Boolean(fastDragMode);
    var step = fastDragMode ? 10 : (lowEnd ? 8 : 6);
    var bw = Math.max(8, Math.ceil(cw / step) + 1);
    var bh = Math.max(8, Math.ceil(ch / step) + 1);

    if (!renderWaveHeatmap._offCanvas) {
      renderWaveHeatmap._offCanvas = document.createElement("canvas");
    }
    var off = renderWaveHeatmap._offCanvas;
    if (off.width !== bw || off.height !== bh) {
      off.width = bw;
      off.height = bh;
      renderWaveHeatmap._img = null;
    }
    var oCtx = off.getContext("2d");
    var img = renderWaveHeatmap._img;
    if (!img || img.width !== bw || img.height !== bh) {
      img = oCtx.createImageData(bw, bh);
      renderWaveHeatmap._img = img;
    }
    var data = img.data;

    var axis = buildGridAxisLookup(grid, map, cw, ch, step, bw, bh, originX, originY, zoom);
    var rowLat = axis.rowLat;
    var rowCos = axis.rowCos;
    var rowSin = axis.rowSin;
    var rowR0 = axis.rowR0;
    var rowR1 = axis.rowR1;
    var rowTy = axis.rowTy;
    var colRawLon = axis.colRawLon;
    var colWLon = axis.colWLon;
    var colC0 = axis.colC0;
    var colC1 = axis.colC1;
    var colTx = axis.colTx;

    var wArr = grid._wave;
    var sArr = grid._sea;
    var isGlobal = grid.dLon >= 8;
    var storms = sys ? sys.storms : [];
    var waveAreas = sys ? sys.waveAreas : [];
    var nStorms = storms.length;
    var nWaves = waveAreas.length;

    for (var py = 0; py < bh; py++) {
      var la = rowLat[py];
      var cosLa = rowCos[py];
      var sinLa = rowSin[py];
      var r0Base = rowR0[py];
      var r1Base = rowR1[py];
      var ty = rowTy[py];
      var oneMinusTy = 1 - ty;
      var rowPixBase = py * bw;

      for (var px = 0; px < bw; px++) {
        var tx = colTx[px];
        var oneMinusTx = 1 - tx;
        var w00 = oneMinusTx * oneMinusTy;
        var w10 = tx * oneMinusTy;
        var w01 = oneMinusTx * ty;
        var w11 = tx * ty;

        var c0 = colC0[px];
        var c1 = colC1[px];
        var i00 = r0Base + c0;
        var i10 = r0Base + c1;
        var i01 = r1Base + c0;
        var i11 = r1Base + c1;

        var seaFrac = sArr[i00] * w00 + sArr[i10] * w10 + sArr[i01] * w01 + sArr[i11] * w11;
        var rawLon = colRawLon[px];
        if (isGlobal && seaFrac < 0.78 && !isDeepLandInterior(la, rawLon)) {
          seaFrac = 0.78;
        }
        var isSea = seaFrac >= 0.18;
        var pIdx = (rowPixBase + px) * 4;

        if (!isSea && nStorms === 0) {
          data[pIdx] = 0;
          data[pIdx + 1] = 0;
          data[pIdx + 2] = 0;
          data[pIdx + 3] = 0;
          continue;
        }

        var wave = wArr[i00] * w00 + wArr[i10] * w10 + wArr[i01] * w01 + wArr[i11] * w11;
        var wLon = colWLon[px];

        if (nWaves > 0) {
          for (var wIdx = 0; wIdx < nWaves; wIdx++) {
            var wa = waveAreas[wIdx];
            var dWv = fastSphereNm(la, wLon, cosLa, sinLa, wa);
            if (dWv < wa.cutoffNm) {
              var gWv = Math.exp(-(dWv * dWv) * wa.invTwoSigSq);
              var targetWave = wave * (1 - gWv) + wa.hM * gWv;
              if (targetWave > wave) wave = targetWave;
            }
          }
        }

        if (nStorms > 0) {
          for (var s = 0; s < nStorms; s++) {
            var st = storms[s];
            var dNm = fastSphereNm(la, wLon, cosLa, sinLa, st);
            if (dNm < st.outerNm) {
              isSea = true;
              seaFrac = Math.max(seaFrac, 0.65);
              var outerTapering = smoothstep01(1 - dNm * st.invOuterNm);
              var waveProfile = dNm <= st.rmw
                ? (1.0 + 0.02 * (1 - dNm / st.rmw))
                : Math.exp(-Math.pow((dNm - st.rmw) * st.wavePowScale, 1.35));
              var stormWaveM = (1.0 + (st.peakWaveM - 1.0) * waveProfile) * outerTapering + wave * (1 - outerTapering);
              if (stormWaveM > wave) wave = stormWaveM;
            }
          }
        }

        if (!isSea || seaFrac < 0.16) {
          data[pIdx] = 0;
          data[pIdx + 1] = 0;
          data[pIdx + 2] = 0;
          data[pIdx + 3] = 0;
        } else {
          var seaMult = seaFrac >= 0.55 ? 1 : clampNum((seaFrac - 0.15) / 0.40, 0, 1);
          if (seaMult <= 0.01) {
            data[pIdx + 3] = 0;
          } else {
            var hc = wave < 0 ? 0 : (wave > WAVE_LUT_MAX ? WAVE_LUT_MAX : wave);
            var lutIdx = ((hc * (WAVE_LUT_STEPS / WAVE_LUT_MAX)) + 0.5) | 0;
            data[pIdx] = WAVE_LUT_R[lutIdx];
            data[pIdx + 1] = WAVE_LUT_G[lutIdx];
            data[pIdx + 2] = WAVE_LUT_B[lutIdx];
            data[pIdx + 3] = (WAVE_LUT_A[lutIdx] * seaMult + 0.5) | 0;
          }
        }
      }
    }

    oCtx.putImageData(img, 0, 0);
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = lowEnd ? "low" : "medium";
    ctx.drawImage(off, 0, 0, (bw - 1) * step, (bh - 1) * step);
    ctx.restore();
  }

  function renderIsobarContours(ctx, map, grid, cw, ch, stormPts, originX, originY, zoom, sys, fastDragMode) {
    var lowEnd = isWeakDeviceMode() || Boolean(fastDragMode);
    var cell = fastDragMode ? 24 : (lowEnd ? 22 : 18);
    var nx = Math.ceil(cw / cell) + 2;
    var ny = Math.ceil(ch / cell) + 2;
    var needSize = nx * ny;
    if (!renderIsobarContours._pField || renderIsobarContours._pField.length < needSize) {
      renderIsobarContours._pField = new Float32Array(needSize);
    }
    var pField = renderIsobarContours._pField;

    var axis = buildGridAxisLookup(grid, map, cw, ch, cell, nx, ny, originX, originY, zoom);
    var rowLat = axis.rowLat;
    var rowCos = axis.rowCos;
    var rowSin = axis.rowSin;
    var rowR0 = axis.rowR0;
    var rowR1 = axis.rowR1;
    var rowTy = axis.rowTy;
    var colWLon = axis.colWLon;
    var colC0 = axis.colC0;
    var colC1 = axis.colC1;
    var colTx = axis.colTx;

    var pArr = grid._pressure;
    var nodes = grid.nodes;
    var storms = sys ? sys.storms : [];
    var pCenters = sys ? sys.pCenters : [];
    var nStorms = storms.length;
    var nPC = pCenters.length;

    var minP = 1100;
    var maxP = 800;
    for (var py = 0; py < ny; py++) {
      var la = rowLat[py];
      var cosLa = rowCos[py];
      var sinLa = rowSin[py];
      var r0Base = rowR0[py];
      var r1Base = rowR1[py];
      var ty = rowTy[py];
      var oneMinusTy = 1 - ty;
      var rowOut = py * nx;

      for (var px = 0; px < nx; px++) {
        var tx = colTx[px];
        var oneMinusTx = 1 - tx;
        var w00 = oneMinusTx * oneMinusTy;
        var w10 = tx * oneMinusTy;
        var w01 = oneMinusTx * ty;
        var w11 = tx * ty;

        var c0 = colC0[px];
        var c1 = colC1[px];
        var i00 = r0Base + c0;
        var pressure = pArr[i00] * w00
          + pArr[r0Base + c1] * w10
          + pArr[r1Base + c0] * w01
          + pArr[r1Base + c1] * w11;

        var wLon = colWLon[px];
        if (nPC > 0) {
          var isOm = nodes[i00].source === "open-meteo";
          for (var i = 0; i < nPC; i++) {
            var pc = pCenters[i];
            var dPc = fastSphereNm(la, wLon, cosLa, sinLa, pc);
            if (dPc < 1400) {
              var gPc = Math.exp(-(dPc * dPc) * pc.invTwoSigSq);
              if (isOm) {
                pressure = pressure * (1 - 0.35 * gPc) + pc.targetMb * (0.35 * gPc);
              } else {
                pressure += pc.deltaAmbientMb * gPc;
              }
            }
          }
        }
        if (nStorms > 0) {
          for (var s = 0; s < nStorms; s++) {
            var st = storms[s];
            var dNm = fastSphereNm(la, wLon, cosLa, sinLa, st);
            if (dNm < st.outerNm) {
              var outerTapering = smoothstep01(1 - dNm * st.invOuterNm);
              var envP = Math.max(pressure, st.coreMb + 8, 1009.5);
              var effR = dNm > 2.5 ? dNm : 2.5;
              var hollandFactor = Math.exp(-Math.pow(st.rmw / effR, st.hollandB));
              var hollandP = st.coreMb + (envP - st.coreMb) * hollandFactor;
              var pBlend = Math.pow(outerTapering, 0.75);
              var stormP = hollandP * pBlend + pressure * (1 - pBlend);
              if (stormP < pressure) pressure = stormP;
            }
          }
        }

        pField[rowOut + px] = pressure;
        if (pressure < minP) minP = pressure;
        if (pressure > maxP) maxP = pressure;
      }
    }

    var firstLvl = Math.ceil(minP / 4) * 4;
    var lastLvl = Math.floor(maxP / 4) * 4;
    if (lastLvl < firstLvl) return 0;

    var edgeTotal = needSize * 2;
    if (!renderIsobarContours._eA || renderIsobarContours._eA.length < edgeTotal) {
      renderIsobarContours._eA = new Int32Array(edgeTotal);
      renderIsobarContours._eB = new Int32Array(edgeTotal);
    }
    var eA = renderIsobarContours._eA;
    var eB = renderIsobarContours._eB;

    var placedPills = [];
    var levelCount = 0;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (var level = firstLvl; level <= lastLvl; level += 4) {
      var segs = [];
      eA.fill(-1, 0, edgeTotal);
      eB.fill(-1, 0, edgeTotal);

      for (var iy = 0; iy < ny - 1; iy++) {
        var yTop = iy * cell;
        var yBot = (iy + 1) * cell;
        var rowA = iy * nx;
        var rowB = (iy + 1) * nx;
        for (var ix = 0; ix < nx - 1; ix++) {
          var v0 = pField[rowA + ix];
          var v1 = pField[rowA + ix + 1];
          var v2 = pField[rowB + ix + 1];
          var v3 = pField[rowB + ix];
          var mask = (v0 >= level ? 8 : 0) | (v1 >= level ? 4 : 0) | (v2 >= level ? 2 : 0) | (v3 >= level ? 1 : 0);
          if (mask === 0 || mask === 15) continue;

          var xL = ix * cell;
          var xR = (ix + 1) * cell;
          var kT = (rowA + ix) * 2;
          var kR = (rowA + ix + 1) * 2 + 1;
          var kB = (rowB + ix) * 2;
          var kL = (rowA + ix) * 2 + 1;

          var pairs;
          if (mask === 1 || mask === 14) pairs = [[3, 2]];
          else if (mask === 2 || mask === 13) pairs = [[2, 1]];
          else if (mask === 3 || mask === 12) pairs = [[3, 1]];
          else if (mask === 4 || mask === 11) pairs = [[0, 1]];
          else if (mask === 5) pairs = (0.25 * (v0 + v1 + v2 + v3)) >= level ? [[0, 3], [1, 2]] : [[0, 1], [3, 2]];
          else if (mask === 6 || mask === 9) pairs = [[0, 2]];
          else if (mask === 7 || mask === 8) pairs = [[0, 3]];
          else pairs = (0.25 * (v0 + v1 + v2 + v3)) >= level ? [[0, 1], [3, 2]] : [[0, 3], [1, 2]];

          for (var q = 0; q < pairs.length; q++) {
            var e1 = pairs[q][0];
            var e2 = pairs[q][1];
            var kA, ax, ay, kB2, bx, by, dm, t;

            if (e1 === 0) { kA = kT; dm = v1 - v0; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v0) / dm, 0.001, 0.999); ax = xL + cell * t; ay = yTop; }
            else if (e1 === 1) { kA = kR; dm = v2 - v1; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v1) / dm, 0.001, 0.999); ax = xR; ay = yTop + cell * t; }
            else if (e1 === 2) { kA = kB; dm = v2 - v3; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v3) / dm, 0.001, 0.999); ax = xL + cell * t; ay = yBot; }
            else { kA = kL; dm = v3 - v0; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v0) / dm, 0.001, 0.999); ax = xL; ay = yTop + cell * t; }

            if (e2 === 0) { kB2 = kT; dm = v1 - v0; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v0) / dm, 0.001, 0.999); bx = xL + cell * t; by = yTop; }
            else if (e2 === 1) { kB2 = kR; dm = v2 - v1; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v1) / dm, 0.001, 0.999); bx = xR; by = yTop + cell * t; }
            else if (e2 === 2) { kB2 = kB; dm = v2 - v3; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v3) / dm, 0.001, 0.999); bx = xL + cell * t; by = yBot; }
            else { kB2 = kL; dm = v3 - v0; t = Math.abs(dm) < 1e-6 ? 0.5 : clampNum((level - v0) / dm, 0.001, 0.999); bx = xL; by = yTop + cell * t; }

            var sIdx = segs.length;
            segs.push({ kA: kA, ax: ax, ay: ay, kB: kB2, bx: bx, by: by, used: false });
            if (eA[kA] === -1) eA[kA] = sIdx;
            else eB[kA] = sIdx;
            if (eA[kB2] === -1) eA[kB2] = sIdx;
            else eB[kB2] = sIdx;
          }
        }
      }

      if (!segs.length) continue;
      levelCount += 1;

      var polylines = [];
      for (var i2 = 0; i2 < segs.length; i2++) {
        var sg = segs[i2];
        if (sg.used) continue;
        sg.used = true;
        var tailX = [sg.ax, sg.bx];
        var tailY = [sg.ay, sg.by];
        var headKey = sg.kA;
        var tailKey = sg.kB;

        var guard = 0;
        while (guard++ < 4000) {
          var s1 = eA[tailKey];
          var cSeg = (s1 >= 0 && !segs[s1].used) ? segs[s1] : null;
          if (!cSeg) {
            var s2 = eB[tailKey];
            if (s2 >= 0 && !segs[s2].used) cSeg = segs[s2];
          }
          if (!cSeg) break;
          cSeg.used = true;
          if (cSeg.kA === tailKey) {
            tailX.push(cSeg.bx);
            tailY.push(cSeg.by);
            tailKey = cSeg.kB;
          } else {
            tailX.push(cSeg.ax);
            tailY.push(cSeg.ay);
            tailKey = cSeg.kA;
          }
        }

        var headX = [];
        var headY = [];
        guard = 0;
        while (guard++ < 4000) {
          var p1 = eA[headKey];
          var pSeg = (p1 >= 0 && !segs[p1].used) ? segs[p1] : null;
          if (!pSeg) {
            var p2 = eB[headKey];
            if (p2 >= 0 && !segs[p2].used) pSeg = segs[p2];
          }
          if (!pSeg) break;
          pSeg.used = true;
          if (pSeg.kA === headKey) {
            headX.push(pSeg.bx);
            headY.push(pSeg.by);
            headKey = pSeg.kB;
          } else {
            headX.push(pSeg.ax);
            headY.push(pSeg.ay);
            headKey = pSeg.kA;
          }
        }

        var totalPts = headX.length + tailX.length;
        if (totalPts >= 2) {
          var plX = new Array(totalPts);
          var plY = new Array(totalPts);
          var ptr = 0;
          for (var hx = headX.length - 1; hx >= 0; hx--) {
            plX[ptr] = headX[hx];
            plY[ptr] = headY[hx];
            ptr += 1;
          }
          for (var tx2 = 0; tx2 < tailX.length; tx2++) {
            plX[ptr] = tailX[tx2];
            plY[ptr] = tailY[tx2];
            ptr += 1;
          }
          polylines.push({ x: plX, y: plY, n: totalPts });
        }
      }

      var isDeepLow = level <= 996;
      var isStandard1012 = level === 1012;
      ctx.strokeStyle = isDeepLow
        ? "rgba(251, 146, 60, 0.62)"
        : (isStandard1012 ? "rgba(248, 250, 252, 0.56)" : "rgba(226, 232, 240, 0.42)");
      ctx.lineWidth = isDeepLow ? 1.35 : (isStandard1012 ? 1.25 : 1.0);

      ctx.beginPath();
      var labelSpots = [];
      for (var pIdx = 0; pIdx < polylines.length; pIdx++) {
        var pl = polylines[pIdx];
        var pxArr = pl.x;
        var pyArr = pl.y;
        var pn = pl.n;
        ctx.moveTo(pxArr[0], pyArr[0]);
        var arcLen = 0;
        for (var k = 1; k < pn; k++) {
          arcLen += Math.hypot(pxArr[k] - pxArr[k - 1], pyArr[k] - pyArr[k - 1]);
        }
        if (pn === 2) {
          ctx.lineTo(pxArr[1], pyArr[1]);
        } else {
          for (var k2 = 1; k2 < pn - 1; k2++) {
            ctx.quadraticCurveTo(pxArr[k2], pyArr[k2], 0.5 * (pxArr[k2] + pxArr[k2 + 1]), 0.5 * (pyArr[k2] + pyArr[k2 + 1]));
          }
          ctx.lineTo(pxArr[pn - 1], pyArr[pn - 1]);
        }

        if (!fastDragMode && arcLen >= 115) {
          var targetFracs = arcLen > 400 ? [0.28, 0.72] : [0.5];
          for (var f = 0; f < targetFracs.length; f++) {
            var mIdx = Math.min(pn - 1, Math.floor(pn * targetFracs[f]));
            var lx = pxArr[mIdx];
            var ly = pyArr[mIdx];
            if (lx < 40 || lx > cw - 40 || ly < 28 || ly > ch - 28) continue;
            var nearStorm = false;
            for (var sIdx2 = 0; sIdx2 < stormPts.length; sIdx2++) {
              if (Math.hypot(lx - stormPts[sIdx2].x, ly - stormPts[sIdx2].y) < 44) {
                nearStorm = true;
                break;
              }
            }
            if (nearStorm) continue;
            var clash = false;
            for (var q2 = 0; q2 < placedPills.length; q2++) {
              if (Math.hypot(lx - placedPills[q2].x, ly - placedPills[q2].y) < 98) {
                clash = true;
                break;
              }
            }
            if (!clash) {
              placedPills.push({ x: lx, y: ly, label: String(level) });
              labelSpots.push({ x: lx, y: ly, label: String(level) });
            }
          }
        }
      }
      ctx.stroke();

      if (labelSpots.length) {
        ctx.save();
        ctx.font = "600 10px \"JetBrains Mono\", \"Consolas\", monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (var q3 = 0; q3 < labelSpots.length; q3++) {
          var sp = labelSpots[q3];
          var tw = ctx.measureText(sp.label).width;
          var pw = tw + 10;
          var ph = 15;
          var rx = sp.x - pw / 2;
          var ry = sp.y - ph / 2;
          ctx.fillStyle = "rgba(8, 16, 30, 0.82)";
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(rx, ry, pw, ph, 4);
          } else {
            ctx.rect(rx, ry, pw, ph);
          }
          ctx.fill();
          ctx.strokeStyle = isDeepLow ? "rgba(251, 146, 60, 0.45)" : "rgba(255, 255, 255, 0.24)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.fillStyle = isDeepLow ? "#FDBA74" : "rgba(241, 245, 249, 0.92)";
          ctx.fillText(sp.label, sp.x, sp.y + 0.5);
        }
        ctx.restore();
      }
    }

    ctx.restore();
    return levelCount;
  }

  // 6-tier Beaufort / WMO Wind Barb Color Scale (up to Hurricane Force >= 64 kt)
  function windBarbColor(kt) {
    if (kt >= 64) return "#F43F5E"; // Hurricane force (Beaufort 12)
    if (kt >= 48) return "#F87171"; // Storm / Violent Storm (Beaufort 10-11)
    if (kt >= 34) return "#FB923C"; // Gale / Strong Gale (Beaufort 8-9)
    if (kt >= 24) return "#FACC15"; // Strong Breeze / Near Gale (Beaufort 6-7)
    if (kt >= 15) return "#7DD3FC"; // Moderate / Fresh Breeze (Beaufort 4-5)
    return "#F8FAFC";               // Light Breeze (Beaufort 0-3)
  }

  // WMO Meteorological Wind Barb with clean non-overlapping 50-kt pennants, 10-kt full barbs, 5-kt half barbs
  function drawWindBarb(ctx, x, y, spdKt, dirFromDeg, lat) {
    if (!Number.isFinite(spdKt)) return;
    var color = windBarbColor(spdKt);
    var rounded = Math.round(spdKt / 5) * 5;
    ctx.save();
    ctx.translate(x, y);

    if (rounded < 5) {
      ctx.strokeStyle = "rgba(6, 12, 24, 0.72)";
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.arc(0, 0, 3.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(0, 0, 3.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return;
    }

    var rad = (Number(dirFromDeg) || 0) * Math.PI / 180;
    var ux = Math.sin(rad);
    var uy = -Math.cos(rad);
    var hemi = lat < 0 ? -1 : 1;
    var nx = hemi * (-uy);
    var ny = hemi * ux;

    var rem = Math.min(rounded, 165);
    var shapes = [];
    while (rem >= 50) { shapes.push("P"); rem -= 50; }
    while (rem >= 10) { shapes.push("F"); rem -= 10; }
    while (rem >= 5) { shapes.push("H"); rem -= 5; }

    var staffLen = shapes.length >= 4 ? 29 : 25;
    var fullLen = 9.5;
    var halfLen = 5.2;
    var slant = 0.28;
    // Tip vector for parallel feathers & pennant leading edge
    var fx = nx + ux * slant;
    var fy = ny + uy * slant;

    function traceLinesAndPennants(fillPass) {
      var pos = staffLen;
      if (shapes.length === 1 && shapes[0] === "H") {
        pos = staffLen - 4.5;
      }
      if (!fillPass) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(ux * staffLen, uy * staffLen);
      }
      for (var i = 0; i < shapes.length; i++) {
        var s = shapes[i];
        if (s === "P") {
          var baseTop = pos;
          var baseBot = Math.max(5, pos - 5.4);
          var tipX = ux * baseTop + fx * (fullLen + 0.6);
          var tipY = uy * baseTop + fy * (fullLen + 0.6);
          if (fillPass) {
            ctx.beginPath();
            ctx.moveTo(ux * baseTop, uy * baseTop);
            ctx.lineTo(tipX, tipY);
            ctx.lineTo(ux * baseBot, uy * baseBot);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.moveTo(ux * baseTop, uy * baseTop);
            ctx.lineTo(tipX, tipY);
            ctx.lineTo(ux * baseBot, uy * baseBot);
          }
          pos = baseBot - 2.6;
        } else {
          if (!fillPass) {
            var flen = s === "F" ? fullLen : halfLen;
            var bx = ux * pos;
            var by = uy * pos;
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + fx * flen, by + fy * flen);
          }
          pos -= 3.7;
        }
      }
    }

    // Halo stroke
    traceLinesAndPennants(false);
    ctx.strokeStyle = "rgba(6, 12, 24, 0.78)";
    ctx.lineWidth = 2.9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    // Primary color stroke
    traceLinesAndPennants(false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Filled 50-kt pennants
    ctx.fillStyle = color;
    traceLinesAndPennants(true);

    // Station base dot
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 4-tier Ocean Current Color & Chevron Speed Encoding (0.05 kt -> 3.5+ kt)
  function currentVectorColor(currKt) {
    if (currKt >= 2.0) return "#FB7185"; // Extreme current (>= 2.0 kt)
    if (currKt >= 1.2) return "#FBBF24"; // Strong current (1.2 - 1.9 kt)
    if (currKt >= 0.5) return "#2DD4BF"; // Moderate current (0.5 - 1.1 kt)
    return "#38BDF8";                    // Weak drift (< 0.5 kt)
  }

  function drawCurrentVector(ctx, x, y, currKt, currDirDeg, scaleMult) {
    if (!Number.isFinite(currKt) || currKt < 0.05) return;
    var sc = scaleMult || 1;
    var rad = (Number(currDirDeg) || 0) * Math.PI / 180;
    var dx = Math.sin(rad);
    var dy = -Math.cos(rad);
    var px = -dy;
    var py = dx;

    var color = currentVectorColor(currKt);
    var len = clampNum((11 + currKt * 6.5) * sc, 10 * sc, 29 * sc);
    var startX = x - dx * (len * 0.44);
    var startY = y - dy * (len * 0.44);
    var tipX = x + dx * (len * 0.56);
    var tipY = y + dy * (len * 0.56);
    var ctrlX = (startX + tipX) * 0.5 + px * (2.4 * sc);
    var ctrlY = (startY + tipY) * 0.5 + py * (2.4 * sc);

    ctx.save();
    var headBaseX = tipX - dx * (5.4 * sc);
    var headBaseY = tipY - dy * (5.4 * sc);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(ctrlX + px * 1.3 * sc, ctrlY + py * 1.3 * sc, headBaseX + px * 1.7 * sc, headBaseY + py * 1.7 * sc);
    ctx.lineTo(headBaseX + px * 3.9 * sc, headBaseY + py * 3.9 * sc);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(headBaseX - px * 3.9 * sc, headBaseY - py * 3.9 * sc);
    ctx.lineTo(headBaseX - px * 1.7 * sc, headBaseY - py * 1.7 * sc);
    ctx.quadraticCurveTo(ctrlX - px * 1.0 * sc, ctrlY - py * 1.0 * sc, startX, startY);
    ctx.closePath();

    ctx.strokeStyle = "rgba(6, 12, 24, 0.78)";
    ctx.lineWidth = 1.7;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();

    // Speed chevron ticks near tail (1 tick >= 0.5kt, 2 ticks >= 1.2kt, 3 ticks >= 2.0kt)
    var ticks = currKt >= 2.0 ? 3 : (currKt >= 1.2 ? 2 : (currKt >= 0.5 ? 1 : 0));
    if (ticks > 0) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.35;
      ctx.beginPath();
      for (var t = 0; t < ticks; t++) {
        var bx = startX + dx * (t * 2.8 * sc);
        var by = startY + dy * (t * 2.8 * sc);
        ctx.moveTo(bx - dx * 2.0 * sc + px * 2.8 * sc, by - dy * 2.0 * sc + py * 2.8 * sc);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx - dx * 2.0 * sc - px * 2.8 * sc, by - dy * 2.0 * sc - py * 2.8 * sc);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawMicroBadge(ctx, x, y, waveM, tempC, currKt) {
    if (!Number.isFinite(waveM)) return;
    var tStr = Number.isFinite(tempC) ? (Math.round(tempC) + "\u00B0C") : "--";
    var cStr = (Number.isFinite(currKt) && currKt >= 0.05) ? (" \u2022 " + currKt.toFixed(1) + "kn") : "";
    var text = waveM.toFixed(1) + "m \u2022 " + tStr + cStr;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }

  function getActiveStormScreenPoints(map, originX, originY, zoom) {
    var out = [];
    var store = (typeof window.MARINE_WEATHER_STORE !== "undefined" && window.MARINE_WEATHER_STORE)
      ? window.MARINE_WEATHER_STORE
      : ((typeof MARINE_WEATHER_STORE !== "undefined" && MARINE_WEATHER_STORE) ? MARINE_WEATHER_STORE : {});
    var storms = Array.isArray(store.storms) ? store.storms : [];
    var ctrLng = map.getCenter ? map.getCenter().lng : 0;
    for (var i = 0; i < storms.length; i++) {
      var sc = extractStormCenter(storms[i]);
      if (!sc) continue;
      var sLon = sc[1];
      while (sLon - ctrLng > 180) sLon -= 360;
      while (sLon - ctrLng < -180) sLon += 360;
      var pt = (originX != null && map.project)
        ? map.project([sc[0], sLon], zoom)
        : map.latLngToContainerPoint([sc[0], sLon]);
      if (pt) {
        out.push(originX != null ? { x: pt.x - originX, y: pt.y - originY } : pt);
      }
    }
    return out;
  }

  var _latestSynopticGrid = null;

  // Public Point Sampler: guarantees 100% consistency between Canvas symbols and Cursor HUD (#ntmWxCursorTile)
  function sampleSynopticWeatherAtLatLon(lat, lon) {
    if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) {
      return null;
    }
    var la = Number(lat);
    var lo = wrapLon180(Number(lon));
    if (_latestSynopticGrid) {
      return sampleGridFieldAtLatLon(_latestSynopticGrid, la, lo);
    }
    var live = getLiveCachedNode(la, lo);
    if (live) {
      return applyMesoscaleSystemsAtPoint(la, lo, live);
    }
    return applyMesoscaleSystemsAtPoint(la, lo, synthesizeBaselineNode(la, lo));
  }

  var EcdisSynopticWeatherLayerV5243 = (typeof L !== "undefined" && L.Layer) ? L.Layer.extend({
    onAdd: function (map) {
      this._map = map;
      this._paneName = ensureWxSynopticPane(map);
      var pane = map.getPane(this._paneName) || map.getPanes().overlayPane;
      // Remove any stale canvas left by an older layer instance
      var oldCanvas = pane.querySelector("#wxSynopticCanvas");
      if (oldCanvas && oldCanvas.parentNode) {
        oldCanvas.parentNode.removeChild(oldCanvas);
      }
      this._canvas = document.createElement("canvas");
      this._canvas.id = "wxSynopticCanvas";
      this._canvas.className = "wx-synoptic-canvas";
      this._canvas.style.position = "absolute";
      this._canvas.style.top = "0";
      this._canvas.style.left = "0";
      this._canvas.style.pointerEvents = "none";
      this._canvas.style.willChange = "transform";
      pane.appendChild(this._canvas);

      this._rafId = null;
      this._panThrottleTimer = null;
      this._recenterTimer = null;
      this._fetchTimer = null;
      this._activeCtrls = new Set();
      this._inFlightNodes = new Map();
      this._hasValidCache = false;
      this._dirty = true;
      this._isMoving = false;
      this._lastPanDrawTs = 0;
      this._renderedFast = false;
      this._lastStats = { zoom: map.getZoom(), nodes: 0, liveNodes: 0, barbs: 0, currents: 0, badges: 0, isobars: 0, drawMs: 0 };

      map.on("movestart dragstart", this._onMoveStart, this);
      map.on("move", this._onMapMoving, this);
      map.on("moveend dragend", this._onMoveEnd, this);
      map.on("zoom zoomend viewreset resize", this._onMapZoomOrReset, this);

      this._drawImmediate({ force: true });
      this._scheduleViewportFetch(10);
    },

    onRemove: function (map) {
      if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
      if (this._panThrottleTimer) { clearTimeout(this._panThrottleTimer); this._panThrottleTimer = null; }
      if (this._recenterTimer) { clearTimeout(this._recenterTimer); this._recenterTimer = null; }
      if (this._fetchTimer) { clearTimeout(this._fetchTimer); this._fetchTimer = null; }
      if (this._activeCtrls) {
        this._activeCtrls.forEach(function (c) { try { c.abort(); } catch (eA) {} });
        this._activeCtrls.clear();
      }
      map._wxIsMoving = false;
      map.off("movestart dragstart", this._onMoveStart, this);
      map.off("move", this._onMapMoving, this);
      map.off("moveend dragend", this._onMoveEnd, this);
      map.off("zoom zoomend viewreset resize", this._onMapZoomOrReset, this);
      if (this._canvas && this._canvas.parentNode) {
        this._canvas.parentNode.removeChild(this._canvas);
      }
      this._canvas = null;
      this._hasValidCache = false;
      this._map = null;
    },

    refreshNow: function () {
      if (!this._map) return;
      this._dirty = true;
      this._hasValidCache = false;
      this._scheduleDraw(false);
      this._scheduleViewportFetch(20);
    },

    _isViewportCovered: function () {
      var map = this._map;
      if (!map || !this._hasValidCache || this._dirty) return false;
      var sz = map.getSize();
      var w = Math.max(0, Math.round(sz.x));
      var h = Math.max(0, Math.round(sz.y));
      var zoom = map.getZoom();
      if (zoom !== this._renderedZoom || w !== this._renderedVpW || h !== this._renderedVpH) {
        return false;
      }
      var vpLayer = map.containerPointToLayerPoint([0, 0]);
      return (
        vpLayer.x >= this._covMinX + 2 &&
        vpLayer.y >= this._covMinY + 2 &&
        (vpLayer.x + w) <= this._covMaxX - 2 &&
        (vpLayer.y + h) <= this._covMaxY - 2
      );
    },

    _onMoveStart: function () {
      this._isMoving = true;
      if (this._map) this._map._wxIsMoving = true;
      if (this._recenterTimer) { clearTimeout(this._recenterTimer); this._recenterTimer = null; }
    },

    _onMapMoving: function () {
      if (!this._map) return;
      // Fast path: Leaflet's mapPane already shifts our overscanned canvas on GPU compositor in 0.00ms!
      if (this._isViewportCovered()) {
        return;
      }
      // If zoom changed or continuous drag exceeded +/-220px overscan margin, throttle fast pan redraw
      if (this._map.getZoom() !== this._renderedZoom || !this._hasValidCache) {
        this._scheduleDraw(false);
        return;
      }
      var now = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
      var since = now - (this._lastPanDrawTs || 0);
      if (since >= 110) {
        this._lastPanDrawTs = now;
        this._drawImmediate({ force: true, fastDrag: true });
      } else if (!this._panThrottleTimer) {
        var self = this;
        this._panThrottleTimer = setTimeout(function () {
          self._panThrottleTimer = null;
          if (!self._map) return;
          self._lastPanDrawTs = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
          self._drawImmediate({ force: true, fastDrag: Boolean(self._isMoving) });
        }, Math.max(16, 110 - since));
      }
    },

    _onMoveEnd: function () {
      this._isMoving = false;
      if (this._map) this._map._wxIsMoving = false;
      if (this._panThrottleTimer) { clearTimeout(this._panThrottleTimer); this._panThrottleTimer = null; }
      if (!this._map) return;
      this._scheduleViewportFetch(140);

      if (!this._isViewportCovered() || this._renderedFast) {
        this._dirty = true;
        this._scheduleDraw(false);
        return;
      }

      // If user panned more than 40% of overscan margin, quietly re-center overscan after settle
      var vpLayer = this._map.containerPointToLayerPoint([0, 0]);
      var dx = Math.abs(vpLayer.x - (this._covCenterVpX || 0));
      var dy = Math.abs(vpLayer.y - (this._covCenterVpY || 0));
      var lim = Math.max(60, (this._covMargin || 180) * 0.42);
      if (dx > lim || dy > lim) {
        var self = this;
        if (this._recenterTimer) clearTimeout(this._recenterTimer);
        this._recenterTimer = setTimeout(function () {
          self._recenterTimer = null;
          if (!self._map || self._isMoving) return;
          self._dirty = true;
          self._scheduleDraw(false);
        }, 50);
      }
    },

    _onMapZoomOrReset: function (ev) {
      this._dirty = true;
      this._hasValidCache = false;
      this._scheduleDraw(false);
      if (!ev || ev.type === "zoomend" || ev.type === "resize") {
        this._scheduleViewportFetch(140);
      }
    },

    _scheduleDraw: function (fastDrag) {
      if (this._rafId || !this._map) return;
      var self = this;
      this._rafId = requestAnimationFrame(function () {
        self._rafId = null;
        self._drawImmediate({ force: true, fastDrag: Boolean(fastDrag) });
      });
    },

    _scheduleViewportFetch: function (delayMs) {
      if (this._fetchTimer) clearTimeout(this._fetchTimer);
      var self = this;
      this._fetchTimer = setTimeout(function () {
        self._fetchTimer = null;
        self._fetchMissingGridNodes();
      }, delayMs == null ? 140 : delayMs);
    },

    _fetchMissingGridNodes: function () {
      var map = this._map;
      var self = this;
      if (!map) return;
      if (typeof window.OVERLAY_STATES !== "undefined" && window.OVERLAY_STATES.weather === false) return;
      var grid = buildViewportGeoGrid(map, 0);
      if (!grid || !grid.missing.length) return;

      var now = Date.now();
      var inFlight = this._inFlightNodes || (this._inFlightNodes = new Map());
      inFlight.forEach(function (expTs, k) {
        if (expTs <= now) inFlight.delete(k);
      });

      var pending = grid.missing.filter(function (pt) {
        var exp = inFlight.get(pt.key);
        return !(exp && exp > now);
      });
      if (!pending.length) return;

      // Fetch up to 135 nodes in parallel chunks of 45 so global z=2..4 loads 100% of its grid
      var CHUNK_SIZE = 45;
      var MAX_TOTAL = 135;
      var toFetch = pending.slice(0, MAX_TOTAL);

      function fetchWithEndpointTimeout(url) {
        var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
        if (ctrl && self._activeCtrls) self._activeCtrls.add(ctrl);
        var timer = setTimeout(function () {
          if (ctrl) { try { ctrl.abort(); } catch (eT) {} }
        }, 15000);
        var opts = ctrl ? { signal: ctrl.signal } : {};
        return fetch(url, opts)
          .then(function (r) { return r.ok ? r.json() : null; })
          .catch(function () { return null; })
          .finally(function () {
            clearTimeout(timer);
            if (ctrl && self._activeCtrls) self._activeCtrls.delete(ctrl);
          });
      }

      for (var cStart = 0; cStart < toFetch.length; cStart += CHUNK_SIZE) {
        (function (batch) {
          for (var i = 0; i < batch.length; i++) {
            inFlight.set(batch[i].key, now + 16000);
          }
          var lats = batch.map(function (pt) { return pt.lat.toFixed(3); }).join(",");
          var lons = batch.map(function (pt) { return pt.lon.toFixed(3); }).join(",");
          var fcUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lats + "&longitude=" + lons
            + "&current=wind_speed_10m,wind_direction_10m,pressure_msl,temperature_2m&wind_speed_unit=kn&timezone=GMT";
          var marUrl = "https://marine-api.open-meteo.com/v1/marine?latitude=" + lats + "&longitude=" + lons
            + "&current=wave_height,ocean_current_velocity,ocean_current_direction,sea_surface_temperature&timezone=GMT";

          fetchWithEndpointTimeout(fcUrl).then(function (fcRaw) {
            if (!self._map || !fcRaw) return;
            var fcArr = Array.isArray(fcRaw) ? fcRaw : (fcRaw.current ? [fcRaw] : []);
            var ts = Date.now();
            var stored = 0;
            for (var j = 0; j < batch.length; j++) {
              var fcCur = fcArr[j] && fcArr[j].current ? fcArr[j].current : null;
              if (!fcCur) continue;
              var prev = _nodeCache.get(batch[j].key) || synthesizeBaselineNode(batch[j].lat, batch[j].lon);
              var windKt = fcCur.wind_speed_10m != null ? Number(fcCur.wind_speed_10m) : prev.windKt;
              var windDir = fcCur.wind_direction_10m != null ? Number(fcCur.wind_direction_10m) : prev.windDir;
              var pressure = fcCur.pressure_msl != null ? Number(fcCur.pressure_msl) : prev.pressure;
              var tempC = fcCur.temperature_2m != null ? Number(fcCur.temperature_2m) : prev.tempC;
              var safeWindKt = Number.isFinite(windKt) ? windKt : prev.windKt;
              var safeWindDir = Number.isFinite(windDir) ? windDir : prev.windDir;
              var waveEst = (prev.wave != null && Number.isFinite(prev.wave))
                ? prev.wave
                : clampNum(0.45 + 0.062 * Math.pow(safeWindKt, 1.12), 0.35, 11.0);
              _nodeCache.set(batch[j].key, {
                ts: ts,
                isSea: prev.isSea,
                wave: waveEst,
                waveFallback: waveEst,
                pressure: Number.isFinite(pressure) ? pressure : prev.pressure,
                windKt: safeWindKt,
                windDir: safeWindDir,
                windU: safeWindKt * Math.sin(safeWindDir * Math.PI / 180),
                windV: safeWindKt * Math.cos(safeWindDir * Math.PI / 180),
                currKt: prev.currKt,
                currDir: prev.currDir,
                currU: prev.currU,
                currV: prev.currV,
                tempC: Number.isFinite(tempC) ? tempC : prev.tempC,
                sst: prev.sst != null ? prev.sst : (Number.isFinite(tempC) ? tempC : prev.tempC),
                hasFc: true,
                hasMar: Boolean(prev.hasMar),
                source: "open-meteo"
              });
              stored += 1;
            }
            if (stored > 0) {
              pruneCacheIfNeeded();
              self._dirty = true;
              self._scheduleDraw(false);
            }
          });

          fetchWithEndpointTimeout(marUrl).then(function (marRaw) {
            if (!self._map || !marRaw) return;
            var marArr = Array.isArray(marRaw) ? marRaw : (marRaw.current ? [marRaw] : []);
            var ts = Date.now();
            var stored = 0;
            for (var j = 0; j < batch.length; j++) {
              var marCur = marArr[j] && marArr[j].current ? marArr[j].current : null;
              if (!marCur) continue;
              var prev = _nodeCache.get(batch[j].key) || synthesizeBaselineNode(batch[j].lat, batch[j].lon);
              var rawWave = marCur.wave_height != null ? Number(marCur.wave_height) : null;
              var hasMarineWave = rawWave !== null && Number.isFinite(rawWave);
              var isSea = hasMarineWave || !isDeepLandInterior(batch[j].lat, batch[j].lon);
              var waveFallback = hasMarineWave
                ? rawWave
                : (prev.waveFallback != null ? prev.waveFallback : clampNum(0.45 + 0.062 * Math.pow(prev.windKt || 10, 1.12), 0.35, 11.0));
              var wave = hasMarineWave ? rawWave : (isSea ? waveFallback : null);
              var currKmH = (marCur.ocean_current_velocity != null) ? Number(marCur.ocean_current_velocity) : null;
              var climC = climatologicalOceanCurrent(batch[j].lat, batch[j].lon);
              var currKt = (currKmH !== null && Number.isFinite(currKmH) && currKmH > 0.02)
                ? (currKmH / 1.852)
                : (isSea ? (prev.currKt || climC.currKt) : 0);
              var currDir = (marCur.ocean_current_direction != null && Number.isFinite(Number(marCur.ocean_current_direction)))
                ? Number(marCur.ocean_current_direction)
                : (prev.currDir != null ? prev.currDir : climC.currDir);
              var safeCurrKt = Number.isFinite(currKt) ? currKt : climC.currKt;
              var safeCurrDir = Number.isFinite(currDir) ? currDir : climC.currDir;
              var sst = (marCur.sea_surface_temperature != null && Number.isFinite(Number(marCur.sea_surface_temperature)))
                ? Number(marCur.sea_surface_temperature)
                : (prev.sst != null ? prev.sst : prev.tempC);
              _nodeCache.set(batch[j].key, {
                ts: ts,
                isSea: hasMarineWave ? true : !isDeepLandInterior(batch[j].lat, batch[j].lon),
                wave: wave,
                waveFallback: waveFallback,
                pressure: prev.pressure,
                windKt: prev.windKt,
                windDir: prev.windDir,
                windU: prev.windU,
                windV: prev.windV,
                currKt: safeCurrKt,
                currDir: safeCurrDir,
                currU: safeCurrKt * Math.sin(safeCurrDir * Math.PI / 180),
                currV: safeCurrKt * Math.cos(safeCurrDir * Math.PI / 180),
                tempC: (Number.isFinite(prev.tempC) && prev.hasFc) ? prev.tempC : sst,
                sst: sst,
                hasFc: Boolean(prev.hasFc),
                hasMar: true,
                source: "open-meteo"
              });
              stored += 1;
            }
            if (stored > 0) {
              pruneCacheIfNeeded();
              self._dirty = true;
              self._scheduleDraw(false);
            }
          });
        })(toFetch.slice(cStart, cStart + CHUNK_SIZE));
      }
    },

    _drawImmediate: function (opts) {
      var map = this._map;
      var canvas = this._canvas;
      if (!map || !canvas) return;
      ensureWxSynopticPane(map);

      var force = opts === true || Boolean(opts && opts.force);
      var fastDragMode = Boolean(opts && opts.fastDrag);
      if (!force && this._isViewportCovered()) {
        return;
      }

      var sz = map.getSize();
      var w = Math.max(0, Math.round(sz.x));
      var h = Math.max(0, Math.round(sz.y));
      if (w < 8 || h < 8) return;

      if (typeof window.OVERLAY_STATES !== "undefined" && window.OVERLAY_STATES.weather === false) {
        var ctxEmpty = canvas.getContext("2d");
        ctxEmpty.setTransform(1, 0, 0, 1, 0, 0);
        ctxEmpty.clearRect(0, 0, canvas.width, canvas.height);
        this._hasValidCache = false;
        return;
      }

      var tStart = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
      var lowEnd = isWeakDeviceMode() || fastDragMode;
      var dpr = lowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      var margin = (w < 640 || lowEnd) ? 160 : 220;
      var cw = w + margin * 2;
      var ch = h + margin * 2;
      var pw = Math.round(cw * dpr);
      var ph = Math.round(ch * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        canvas.style.width = cw + "px";
        canvas.style.height = ch + "px";
      }

      var vpLayer0 = map.containerPointToLayerPoint([0, 0]);
      var anchorLayer = L.point(Math.round(vpLayer0.x - margin), Math.round(vpLayer0.y - margin));
      L.DomUtil.setPosition(canvas, anchorLayer);
      var originWorld = map.getPixelOrigin().add(anchorLayer);
      var originX = originWorld.x;
      var originY = originWorld.y;

      var ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      var wxSub = window.WEATHER_SUBFILTERS ||
        (typeof window.loadWeatherSubfilters === "function" ? window.loadWeatherSubfilters() : {});

      var grid = buildViewportGeoGrid(map, margin);
      if (!grid) return;
      _latestSynopticGrid = grid;

      var zoom = map.getZoom();
      var sys = prepareFrameMesoscale();
      var stormPts = getActiveStormScreenPoints(map, originX, originY, zoom);

      // Channel 1: Wave Height Background Heatmap (renders across all zoom levels including z=2..4 max zoom-out)
      if (wxSub.waves !== false) {
        renderWaveHeatmap(ctx, map, grid, cw, ch, originX, originY, zoom, sys, fastDragMode);
      }

      // Channel 2: Atmospheric Pressure Isobar Contours (4 hPa step + Holland cyclone contours)
      var isobarCount = 0;
      if (wxSub.pressure !== false) {
        isobarCount = renderIsobarContours(ctx, map, grid, cw, ch, stormPts, originX, originY, zoom, sys, fastDragMode);
      }

      // World-pixel anchored cell grid so barbs/currents/badges pan smoothly without jitter across overscan tiles
      var cellPx = zoom <= 3 ? 118 : (zoom <= 4 ? 110 : (zoom <= 6 ? 100 : 96));
      var ixStart = Math.floor((originX - 24) / cellPx);
      var ixEnd = Math.ceil((originX + cw + 24) / cellPx);
      var iyStart = Math.floor((originY - 24) / cellPx);
      var iyEnd = Math.ceil((originY + ch + 24) / cellPx);
      var numSymCols = Math.max(0, ixEnd - ixStart + 1);
      var symLngs = new Float64Array(numSymCols);
      for (var ic = 0; ic < numSymCols; ic++) {
        symLngs[ic] = map.unproject(L.point((ixStart + ic) * cellPx, originY), zoom).lng;
      }

      var showWinds = wxSub.winds !== false;
      var showCurrents = wxSub.currents !== false;
      var showBadges = zoom >= 6 && !fastDragMode;
      var currScale = zoom <= 3 ? 0.78 : (zoom <= 4 ? 0.88 : 1.0);
      var barbCount = 0;
      var currCount = 0;
      var badgeQueue = [];

      for (var iy = iyStart; iy <= iyEnd; iy++) {
        var wy = iy * cellPx;
        var cy = wy - originY;
        if (cy < -20 || cy > ch + 20) continue;
        var rowSymLat = map.unproject(L.point(originX, wy), zoom).lat;
        if (Math.abs(rowSymLat) > 82) continue;

        for (var ic2 = 0; ic2 < numSymCols; ic2++) {
          var wx = (ixStart + ic2) * cellPx;
          var cx = wx - originX;
          if (cx < -20 || cx > cw + 20) continue;

          var nearStorm = false;
          for (var s = 0; s < stormPts.length; s++) {
            if (Math.hypot(cx - stormPts[s].x, cy - stormPts[s].y) < 30) {
              nearStorm = true;
              break;
            }
          }
          if (nearStorm) continue;

          var colSymLng = symLngs[ic2];
          var val = sampleGridFieldAtLatLon(grid, rowSymLat, colSymLng);

          // Channel 3: Meteorological Wind Barb
          if (showWinds) {
            drawWindBarb(ctx, cx, cy, val.windKt, val.windDir, rowSymLat);
            barbCount += 1;
          }

          // Channel 4: Ocean Current Vector (all zoom levels, sea only, speed color + chevrons)
          if (showCurrents && val.isSea && val.currKt >= 0.05) {
            drawCurrentVector(ctx, cx + 15 * currScale, cy + 9 * currScale, val.currKt, val.currDir, currScale);
            currCount += 1;
          }

          // Channel 5: Wave + Temp + Current Micro-Badge (Zoom >= 6, sea only, batched without shadowBlur)
          if (showBadges && val.isSea && val.wave != null && cx >= 32 && cx <= cw - 32 && cy >= 0 && cy <= ch - 24) {
            badgeQueue.push(cx, cy + 16, val.wave, val.tempC, val.currKt);
          }
        }
      }

      var badgeCount = badgeQueue.length / 5;
      if (badgeCount > 0) {
        ctx.save();
        ctx.font = "500 9.5px \"JetBrains Mono\", \"Consolas\", monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.6;
        ctx.strokeStyle = "rgba(4, 9, 18, 0.92)";
        ctx.fillStyle = "rgba(226, 232, 240, 0.88)";
        for (var bq = 0; bq < badgeQueue.length; bq += 5) {
          drawMicroBadge(ctx, badgeQueue[bq], badgeQueue[bq + 1], badgeQueue[bq + 2], badgeQueue[bq + 3], badgeQueue[bq + 4]);
        }
        ctx.restore();
      }

      var liveNodes = 0;
      for (var nIdx = 0; nIdx < grid.nodes.length; nIdx++) {
        if (grid.nodes[nIdx].source === "open-meteo") liveNodes += 1;
      }

      var tNow = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
      var drawMs = Math.max(0, tNow - tStart);
      this._drawCount = (this._drawCount || 0) + 1;
      if (!fastDragMode && this._drawCount > 2) {
        if (drawMs > 28) {
          this._slowFrameCount = (this._slowFrameCount || 0) + 1;
          if (this._slowFrameCount >= 2) {
            _autoLowEndUntil = Date.now() + 30000;
          }
        } else {
          this._slowFrameCount = 0;
        }
      }

      this._hasValidCache = true;
      this._dirty = false;
      this._renderedFast = fastDragMode;
      this._renderedZoom = zoom;
      this._renderedVpW = w;
      this._renderedVpH = h;
      this._covMinX = anchorLayer.x;
      this._covMinY = anchorLayer.y;
      this._covMaxX = anchorLayer.x + cw;
      this._covMaxY = anchorLayer.y + ch;
      this._covCenterVpX = vpLayer0.x;
      this._covCenterVpY = vpLayer0.y;
      this._covMargin = margin;

      this._lastStats = {
        zoom: zoom,
        nodes: grid.nodes.length,
        liveNodes: liveNodes,
        barbs: barbCount,
        currents: currCount,
        badges: badgeCount,
        isobars: isobarCount,
        drawMs: Math.round(drawMs * 10) / 10,
        overscanMargin: margin
      };
    }
  }) : null;

  function syncWxSynopticLayerV5243(map, enabled) {
    if (!map || !EcdisSynopticWeatherLayerV5243) return;
    // Upgrade any pre-existing legacy _wxSynopticLayer instance
    if (map._wxSynopticLayer && !map._wxSynopticLayer._isV5245) {
      try { map.removeLayer(map._wxSynopticLayer); } catch (eOld) {}
      map._wxSynopticLayer = null;
    }
    if (!enabled) {
      if (map._wxSynopticLayer) {
        try { map.removeLayer(map._wxSynopticLayer); } catch (eR) {}
      }
      return;
    }
    ensureWxSynopticPane(map);
    if (!map._wxSynopticLayer) {
      var inst = new EcdisSynopticWeatherLayerV5243();
      inst._isV5243 = true;
      inst._isV5245 = true;
      map._wxSynopticLayer = inst;
    }
    if (!map.hasLayer(map._wxSynopticLayer)) {
      map._wxSynopticLayer.addTo(map);
    } else {
      map._wxSynopticLayer.refreshNow();
    }
  }

  // Upgrade global samplers & cursor HUD so numbers in #ntmWxCursorTile 100% match the canvas symbols & cyclone vortex
  var _origSampleWind = window.sampleWindAtLatLon;
  window.sampleWindAtLatLon = function (lat, lon) {
    var syn = sampleSynopticWeatherAtLatLon(lat, lon);
    var orig = typeof _origSampleWind === "function" ? _origSampleWind(lat, lon) : null;
    // If near an active cyclone (< 320 NM), always use the cyclone-modulated synoptic field
    if (syn && syn.nearestStormNm < 320) {
      return {
        ok: true,
        windKt: Math.round(syn.windKt * 10) / 10,
        speedKt: Math.round(syn.windKt * 10) / 10,
        windDir: Math.round(syn.windDir),
        dirDeg: Math.round(syn.windDir),
        gustKt: Math.round(syn.windKt * 1.24),
        source: "cyclone-vortex",
        nearestNm: 0
      };
    }
    if (orig && orig.ok && Number.isFinite(orig.windKt)) {
      return Object.assign({}, orig, {
        speedKt: orig.windKt,
        dirDeg: orig.windDir != null ? orig.windDir : (syn ? Math.round(syn.windDir) : 0)
      });
    }
    if (syn && Number.isFinite(syn.windKt)) {
      return {
        ok: true,
        windKt: Math.round(syn.windKt * 10) / 10,
        speedKt: Math.round(syn.windKt * 10) / 10,
        windDir: Math.round(syn.windDir),
        dirDeg: Math.round(syn.windDir),
        gustKt: Math.round(syn.windKt * 1.22),
        source: syn.source || "synoptic",
        nearestNm: 0
      };
    }
    return { ok: false };
  };

  var _origSampleCurrent = window.sampleCurrentAtLatLon;
  window.sampleCurrentAtLatLon = function (lat, lon) {
    var syn = sampleSynopticWeatherAtLatLon(lat, lon);
    if (syn && syn.nearestStormNm < 320 && syn.isSea) {
      return {
        ok: true,
        speedKn: Math.round(syn.currKt * 100) / 100,
        speedKt: Math.round(syn.currKt * 100) / 100,
        dirDeg: Math.round(syn.currDir),
        nearestNm: 0,
        source: "cyclone-vortex"
      };
    }
    var orig = typeof _origSampleCurrent === "function" ? _origSampleCurrent(lat, lon) : null;
    if (orig && orig.ok && Number.isFinite(orig.speedKn)) {
      return Object.assign({}, orig, { speedKt: orig.speedKn });
    }
    if (syn && syn.isSea && Number.isFinite(syn.currKt)) {
      return {
        ok: true,
        speedKn: Math.round(syn.currKt * 100) / 100,
        speedKt: Math.round(syn.currKt * 100) / 100,
        dirDeg: Math.round(syn.currDir),
        nearestNm: 0,
        source: syn.source || "synoptic"
      };
    }
    return { ok: false, message: "No current data" };
  };

  var _origSamplePressure = window.samplePressureGridAtLatLon;
  window.samplePressureGridAtLatLon = function (lat, lon) {
    var syn = sampleSynopticWeatherAtLatLon(lat, lon);
    if (syn && syn.nearestStormNm < 350 && Number.isFinite(syn.pressure)) {
      return {
        ok: true,
        pressureMb: Math.round(syn.pressure * 10) / 10,
        nearestNm: Math.round(syn.nearestStormNm),
        mode: "cyclone-vortex"
      };
    }
    var orig = typeof _origSamplePressure === "function" ? _origSamplePressure(lat, lon) : null;
    if (orig && orig.ok && Number.isFinite(orig.pressureMb)) {
      return orig;
    }
    if (syn && Number.isFinite(syn.pressure)) {
      return {
        ok: true,
        pressureMb: Math.round(syn.pressure * 10) / 10,
        nearestNm: 0,
        mode: syn.source || "synoptic"
      };
    }
    return { ok: false };
  };

  // Upgraded Cursor HUD (#ntmWxCursorTile) updater:
  // Ensures all 5 chips (Wind, Waves Hs, Pressure, Air/SST, Ocean Current) always show full numerical data
  // matching the map symbols & cyclone vortex at the cursor position.
  window.updateNdbcCursorTile = function (lat, lon) {
    var tile = document.getElementById("ntmWxCursorTile");
    if (!tile || tile.hidden) return;
    var activeMap = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
    if (activeMap && activeMap._wxIsMoving) return;
    var body = document.getElementById("ntmWxCursorBody");
    var meta = document.getElementById("ntmWxCursorMeta");
    if (!body) return;

    var la = Number(lat);
    var lo = Number(lon);
    if (!Number.isFinite(la) || !Number.isFinite(lo)) return;

    var syn = sampleSynopticWeatherAtLatLon(la, lo);
    var nearStorm = syn && syn.nearestStormNm < 320;

    var s = (!nearStorm && typeof window.sampleNdbcAtLatLon === "function")
      ? window.sampleNdbcAtLatLon(la, lo)
      : { ok: false };
    var omPack = typeof window.getCachedOpenMeteoPointWx === "function"
      ? window.getCachedOpenMeteoPointWx(la, lo)
      : null;

    if (!omPack && typeof window.prefetchOpenMeteoPointWx === "function") {
      try {
        var p = window.prefetchOpenMeteoPointWx(la, lo);
        if (p && typeof p.then === "function") {
          p.then(function () {
            var curLat = window._wxCursorLat != null ? window._wxCursorLat : la;
            var curLon = window._wxCursorLon != null ? window._wxCursorLon : lo;
            if (Math.abs(curLat - la) < 0.3 && Math.abs(curLon - lo) < 0.3) {
              window.updateNdbcCursorTile(curLat, curLon);
            }
          });
        }
      } catch (ePf) {}
    }

    var wKt = (s && s.ok && s.windKt != null)
      ? s.windKt
      : (!nearStorm && omPack && omPack.wind && omPack.wind.windKt != null ? omPack.wind.windKt : (syn ? syn.windKt : null));
    var wDir = (s && s.ok && s.windDir != null)
      ? s.windDir
      : (!nearStorm && omPack && omPack.wind && omPack.wind.windDir != null ? omPack.wind.windDir : (syn ? syn.windDir : null));
    var waveHs = (s && s.ok && s.waveHs != null)
      ? s.waveHs
      : (!nearStorm && omPack && omPack.marine && omPack.marine.waveHs != null ? omPack.marine.waveHs : (syn ? (syn.wave != null ? syn.wave : syn.waveFallback) : null));
    var pressureMb = (s && s.ok && s.pressureMb != null)
      ? s.pressureMb
      : (!nearStorm && omPack && omPack.wind && omPack.wind.pressureMb != null ? omPack.wind.pressureMb : (syn ? syn.pressure : null));
    var airC = (s && s.ok && s.airC != null)
      ? s.airC
      : (!nearStorm && omPack && omPack.wind && omPack.wind.airC != null ? omPack.wind.airC : (syn ? syn.tempC : null));
    var sstC = (s && s.ok && s.sstC != null)
      ? s.sstC
      : (!nearStorm && omPack && omPack.marine && omPack.marine.sstC != null ? omPack.marine.sstC : (syn ? syn.sst : null));
    var curObj = window.sampleCurrentAtLatLon(la, lo);
    var curKt = (curObj && curObj.ok && curObj.speedKn != null) ? curObj.speedKn : (syn ? syn.currKt : null);
    var curDir = (curObj && curObj.ok && curObj.dirDeg != null) ? curObj.dirDeg : (syn ? syn.currDir : null);

    var fmt = function (v, d) {
      if (v == null || !Number.isFinite(Number(v))) return "\u2014";
      var n = Number(v);
      return d === 0 ? String(Math.round(n)) : n.toFixed(d);
    };

    var windTxt = wKt != null ? (fmt(wKt, 0) + " kn" + (wDir != null ? (" " + fmt(wDir, 0) + "\u00B0") : "")) : "\u2014";
    var waveTxt = waveHs != null ? (fmt(waveHs, 1) + " m") : "\u2014";
    var pressureTxt = pressureMb != null ? (fmt(pressureMb, 0) + " mb") : "\u2014 mb";
    var airSstTxt = (airC != null || sstC != null) ? (fmt(airC, 0) + "\u00B0/" + fmt(sstC, 0) + "\u00B0") : "\u2014\u00B0/\u2014\u00B0";
    var curTxt = (curKt != null && curKt >= 0.01) ? (fmt(curKt, 1) + " kn " + fmt(curDir, 0) + "\u00B0") : "\u2014";

    tile.classList.add("is-live");
    tile.classList.remove("is-loading-data");

    if (typeof window.renderNdbcCursorChips === "function") {
      body.innerHTML = window.renderNdbcCursorChips(windTxt, waveTxt, pressureTxt, airSstTxt, curTxt);
    }
    if (meta) { meta.textContent = ""; meta.title = ""; }
  };

  window.ensureWxSynopticPane = ensureWxSynopticPane;
  window.syncWxSynopticLayer = syncWxSynopticLayerV5243;
  window.sampleSynopticWeatherAtLatLon = sampleSynopticWeatherAtLatLon;
  window._wxSynopticDebug = {
    getStats: function () {
      var m = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
      var layer = m && m._wxSynopticLayer ? m._wxSynopticLayer : null;
      return {
        version: "v5.245",
        weakMode: isWeakDeviceMode(),
        hasLayer: Boolean(layer && m && m.hasLayer(layer)),
        cacheSize: _nodeCache.size,
        stats: layer ? layer._lastStats : null
      };
    }
  };

  // Pre-install upgraded _wxSynopticLayer on leafletMap as soon as map is available
  function attachToExistingMap() {
    var m = (typeof window.leafletMap !== "undefined" && window.leafletMap) ? window.leafletMap : null;
    if (!m) return;
    if (!m._wxSynopticLayer || !m._wxSynopticLayer._isV5245) {
      if (m._wxSynopticLayer) {
        try { m.removeLayer(m._wxSynopticLayer); } catch (e0) {}
      }
      var inst = new EcdisSynopticWeatherLayerV5243();
      inst._isV5243 = true;
      inst._isV5245 = true;
      m._wxSynopticLayer = inst;
      var enabled = (typeof window.OVERLAY_STATES !== "undefined") ? Boolean(window.OVERLAY_STATES.weather) : false;
      if (enabled) {
        inst.addTo(m);
      }
    }
  }

  if (typeof window.initNtMMap === "function" && !window.initNtMMap._wxV5243Wrapped) {
    var _origInitMap = window.initNtMMap;
    var wrappedInit = function () {
      var r = _origInitMap.apply(this, arguments);
      attachToExistingMap();
      return r;
    };
    wrappedInit._wxV5243Wrapped = true;
    window.initNtMMap = wrappedInit;
  }

  attachToExistingMap();
})();
