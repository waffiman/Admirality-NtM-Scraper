/**
 * SetChart ECDIS 10x10 NM Dual-Axis Scale Corner (#ntmScaleCorner).
 * Always anchored in the bottom-right corner of #ntmMap, dynamically scaling
 * both axes to true 10 NM x 10 NM at the chart's Mercator latitude and hiding
 * "10 Nm" axis callouts when zoomed out too far for readable text.
 */
(function (global) {
  "use strict";

  var EARTH_RADIUS_M = 6378137;
  var METERS_PER_NM = 1852;
  var SCALE_NM = 10;
  var BAR_THICK = 4;
  var DIM_OFFSET = 9;
  var LABEL_MIN_PX = 84;
  var SUBDIV_10_MIN_PX = 24;
  var SUBDIV_5_MIN_PX = 12;
  var ANCHOR_MIN_PX = 8;
  var RIGHT_PAD = 12;
  var BOTTOM_PAD = 12;
  var TOP_CLEAR_PX = 64;
  var LEFT_CLEAR_PX = 20;

  var _boundMap = null;
  var _rafId = 0;
  var _lastKey = "";

  function ensureStyles() {
    if (document.getElementById("ecdis-scale-corner-styles")) return;
    var style = document.createElement("style");
    style.id = "ecdis-scale-corner-styles";
    style.textContent = [
      ".ss-ecdis-scale-corner {",
      "  position: absolute;",
      "  right: " + RIGHT_PAD + "px;",
      "  bottom: " + BOTTOM_PAD + "px;",
      "  z-index: 680;",
      "  pointer-events: none;",
      "  user-select: none;",
      "  line-height: 0;",
      "  opacity: 0.85;",
      "}",
      ".ss-ecdis-scale-corner svg {",
      "  display: block;",
      "  overflow: visible;",
      "}",
      ".ss-ecdis-scale-label {",
      '  font: 600 10px/1 "Segoe UI", system-ui, -apple-system, sans-serif;',
      "  letter-spacing: 0.03em;",
      "  fill: #e2e8f0;",
      "  stroke: rgba(7, 13, 30, 0.92);",
      "  stroke-width: 2.8px;",
      "  paint-order: stroke fill;",
      "  stroke-linejoin: round;",
      "}",
      "[data-theme='light'] .ss-ecdis-scale-label {",
      "  fill: #0f172a;",
      "  stroke: rgba(248, 250, 252, 0.94);",
      "}",
      ".ss-ecdis-scale-dim {",
      "  fill: none;",
      "  stroke: rgba(226, 232, 240, 0.85);",
      "  stroke-width: 1px;",
      "  shape-rendering: crispEdges;",
      "}",
      ".ss-ecdis-scale-dim-halo {",
      "  fill: none;",
      "  stroke: rgba(7, 13, 30, 0.65);",
      "  stroke-width: 2.2px;",
      "  shape-rendering: crispEdges;",
      "}",
      "[data-theme='light'] .ss-ecdis-scale-dim {",
      "  stroke: rgba(30, 41, 59, 0.82);",
      "}",
      "[data-theme='light'] .ss-ecdis-scale-dim-halo {",
      "  stroke: rgba(248, 250, 252, 0.82);",
      "}",
      ".ss-ecdis-scale-frame {",
      "  fill: none;",
      "  stroke: rgba(148, 163, 184, 0.72);",
      "  stroke-width: 0.95px;",
      "  shape-rendering: crispEdges;",
      "}",
      "[data-theme='light'] .ss-ecdis-scale-frame {",
      "  stroke: rgba(51, 65, 85, 0.72);",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function mercatorPxPer10Nm(latDeg, zoom) {
    var clampedLat = Math.max(-82, Math.min(82, Number(latDeg) || 0));
    var cosLat = Math.max(0.12, Math.cos((clampedLat * Math.PI) / 180));
    var worldPx = 256 * Math.pow(2, zoom);
    var mPerPx = ((2 * Math.PI * EARTH_RADIUS_M) / worldPx) * cosLat;
    return (SCALE_NM * METERS_PER_NM) / mPerPx;
  }

  function resolveScaleLat(map, zoom, centerOverride) {
    try {
      var size = map.getSize();
      if (size && size.x > 40 && size.y > 40 && zoom > 3.5) {
        var cornerLL = map.containerPointToLatLng([
          Math.max(0, size.x - RIGHT_PAD - BAR_THICK),
          Math.max(0, size.y - BOTTOM_PAD - BAR_THICK)
        ]);
        if (cornerLL && isFinite(cornerLL.lat) && Math.abs(cornerLL.lat) <= 82) {
          return cornerLL.lat;
        }
      }
    } catch (e) {}
    var c = centerOverride || (map.getCenter ? map.getCenter() : null);
    return c && isFinite(c.lat) ? c.lat : 0;
  }

  function buildAxisFills(isHoriz, cx, cy, visLen, exactLen, segCount) {
    var out = [];
    var step = exactLen / segCount;
    var lightFill = "#e2e8f0";
    var darkFill = "#15233c";
    var i;

    for (i = 0; i < segCount; i++) {
      var d0 = i * step;
      var d1 = Math.min(visLen, (i + 1) * step);
      if (d0 >= visLen - 0.1) break;
      if (!isHoriz && i === 0) d0 = Math.max(d0, BAR_THICK);
      var span = d1 - d0;
      if (span <= 0.1) continue;
      var fill = i % 2 === 0 ? lightFill : darkFill;
      if (isHoriz) {
        out.push(
          '<rect x="' + (cx - d1).toFixed(2) +
          '" y="' + (cy - BAR_THICK).toFixed(2) +
          '" width="' + span.toFixed(2) +
          '" height="' + BAR_THICK +
          '" fill="' + fill + '"/>'
        );
      } else {
        out.push(
          '<rect x="' + (cx - BAR_THICK).toFixed(2) +
          '" y="' + (cy - d1).toFixed(2) +
          '" width="' + BAR_THICK +
          '" height="' + span.toFixed(2) +
          '" fill="' + fill + '"/>'
        );
      }
    }
    return out.join("");
  }

  function buildCornerOutline(cx, cy, visW, visH) {
    var xLeft = (cx - visW).toFixed(2);
    var xIn = (cx - BAR_THICK).toFixed(2);
    var yTop = (cy - visH).toFixed(2);
    var yIn = (cy - BAR_THICK).toFixed(2);
    var xR = cx.toFixed(2);
    var yB = cy.toFixed(2);
    var d =
      "M" + xLeft + "," + yIn +
      " H" + xIn +
      " V" + yTop +
      " H" + xR +
      " V" + yB +
      " H" + xLeft + " Z";
    return '<path class="ss-ecdis-scale-frame" d="' + d + '"/>';
  }

  function buildHorizCallout(cx, cy, visW, isClipped) {
    if (visW < LABEL_MIN_PX) return "";
    var y = cy - BAR_THICK - DIM_OFFSET;
    var xInner = cx - BAR_THICK - DIM_OFFSET;
    var xOuter = cx - visW + 0.5;
    if (xInner - xOuter < 48) return "";

    var midX = (xOuter + cx - BAR_THICK) * 0.5;
    if (midX > xInner - 20) midX = (xOuter + xInner) * 0.5;
    var gapHalf = 19;
    var leftLineEnd = Math.max(xOuter, midX - gapHalf);
    var rightLineStart = Math.min(xInner, midX + gapHalf);

    var d = "";
    if (!isClipped) {
      d += "M" + xOuter.toFixed(1) + "," + (y - 3.5).toFixed(1) + " v7 ";
    } else {
      d += "M" + (xOuter + 4).toFixed(1) + "," + (y - 2.5).toFixed(1) +
           " L" + xOuter.toFixed(1) + "," + y.toFixed(1) +
           " L" + (xOuter + 4).toFixed(1) + "," + (y + 2.5).toFixed(1) + " ";
    }
    if (leftLineEnd > xOuter + 1) {
      d += "M" + xOuter.toFixed(1) + "," + y.toFixed(1) + " H" + leftLineEnd.toFixed(1) + " ";
    }
    if (xInner > rightLineStart + 1) {
      d += "M" + rightLineStart.toFixed(1) + "," + y.toFixed(1) + " H" + xInner.toFixed(1);
    }

    return (
      '<path class="ss-ecdis-scale-dim-halo" d="' + d + '"/>' +
      '<path class="ss-ecdis-scale-dim" d="' + d + '"/>' +
      '<text class="ss-ecdis-scale-label" x="' + midX.toFixed(1) + '" y="' + y.toFixed(1) +
      '" text-anchor="middle" dominant-baseline="central">10 Nm</text>'
    );
  }

  function buildVertCallout(cx, cy, visH, isClipped) {
    if (visH < LABEL_MIN_PX) return "";
    var x = cx - BAR_THICK - DIM_OFFSET;
    var yInner = cy - BAR_THICK - DIM_OFFSET;
    var yOuter = cy - visH + 0.5;
    if (yInner - yOuter < 48) return "";

    var midY = (yOuter + cy - BAR_THICK) * 0.5;
    if (midY > yInner - 20) midY = (yOuter + yInner) * 0.5;
    var gapHalf = 19;
    var topLineEnd = Math.max(yOuter, midY - gapHalf);
    var botLineStart = Math.min(yInner, midY + gapHalf);

    var d = "";
    if (!isClipped) {
      d += "M" + (x - 3.5).toFixed(1) + "," + yOuter.toFixed(1) + " h7 ";
    } else {
      d += "M" + (x - 2.5).toFixed(1) + "," + (yOuter + 4).toFixed(1) +
           " L" + x.toFixed(1) + "," + yOuter.toFixed(1) +
           " L" + (x + 2.5).toFixed(1) + "," + (yOuter + 4).toFixed(1) + " ";
    }
    if (topLineEnd > yOuter + 1) {
      d += "M" + x.toFixed(1) + "," + yOuter.toFixed(1) + " V" + topLineEnd.toFixed(1) + " ";
    }
    if (yInner > botLineStart + 1) {
      d += "M" + x.toFixed(1) + "," + botLineStart.toFixed(1) + " V" + yInner.toFixed(1);
    }

    return (
      '<path class="ss-ecdis-scale-dim-halo" d="' + d + '"/>' +
      '<path class="ss-ecdis-scale-dim" d="' + d + '"/>' +
      '<text class="ss-ecdis-scale-label" x="' + x.toFixed(1) + '" y="' + midY.toFixed(1) +
      '" transform="rotate(-90 ' + x.toFixed(1) + " " + midY.toFixed(1) +
      ')" text-anchor="middle" dominant-baseline="central">10 Nm</text>'
    );
  }

  function renderScale(map, overrideCenter, overrideZoom) {
    var host = document.getElementById("ntmScaleCorner");
    if (!host || !map) return;

    var size = map.getSize ? map.getSize() : null;
    var mapW = size && size.x ? size.x : (host.parentElement ? host.parentElement.clientWidth : 0);
    var mapH = size && size.y ? size.y : (host.parentElement ? host.parentElement.clientHeight : 0);
    if (!mapW || !mapH) return;

    var zoom = typeof overrideZoom === "number" ? overrideZoom : map.getZoom();
    var lat = resolveScaleLat(map, zoom, overrideCenter);
    var rawPx = mercatorPxPer10Nm(lat, zoom);
    if (!isFinite(rawPx) || rawPx <= 0) return;

    var maxW = Math.max(24, mapW - RIGHT_PAD - LEFT_CLEAR_PX);
    var maxH = Math.max(24, mapH - BOTTOM_PAD - TOP_CLEAR_PX);

    var trueOrFloor = rawPx < ANCHOR_MIN_PX ? ANCHOR_MIN_PX : rawPx;
    var visW = Math.min(trueOrFloor, maxW);
    var visH = Math.min(trueOrFloor, maxH);

    var segCount;
    if (rawPx >= SUBDIV_10_MIN_PX) segCount = 10;
    else if (rawPx >= SUBDIV_5_MIN_PX) segCount = 5;
    else segCount = 2;

    var showH = visW >= LABEL_MIN_PX;
    var showV = visH >= LABEL_MIN_PX;
    var key = [
      visW.toFixed(1),
      visH.toFixed(1),
      trueOrFloor.toFixed(1),
      segCount,
      showH ? 1 : 0,
      showV ? 1 : 0
    ].join("|");
    if (key === _lastKey) return;
    _lastKey = key;

    var svgW = Math.ceil(Math.max(visW, showV ? BAR_THICK + DIM_OFFSET + 14 : visW)) + 2;
    var svgH = Math.ceil(Math.max(visH, showH ? BAR_THICK + DIM_OFFSET + 14 : visH)) + 2;
    var cx = svgW - 1;
    var cy = svgH - 1;

    var markup =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + svgW + '" height="' + svgH +
      '" viewBox="0 0 ' + svgW + " " + svgH + '" data-px10nm="' + rawPx.toFixed(2) + '" data-zoom="' + Number(zoom).toFixed(2) + '">' +
      buildAxisFills(true, cx, cy, visW, trueOrFloor, segCount) +
      buildAxisFills(false, cx, cy, visH, trueOrFloor, segCount) +
      buildCornerOutline(cx, cy, visW, visH) +
      buildHorizCallout(cx, cy, visW, trueOrFloor > maxW) +
      buildVertCallout(cx, cy, visH, trueOrFloor > maxH) +
      "</svg>";

    host.innerHTML = markup;
  }

  function scheduleRender(overrideCenter, overrideZoom) {
    if (!_boundMap) return;
    if (_rafId) cancelAnimationFrame(_rafId);
    _rafId = requestAnimationFrame(function () {
      _rafId = 0;
      renderScale(_boundMap, overrideCenter, overrideZoom);
    });
  }

  function initEcdisScaleCorner(map) {
    if (!map || typeof map.getContainer !== "function") return;
    var container = map.getContainer();
    if (!container) return;

    ensureStyles();

    var el = document.getElementById("ntmScaleCorner");
    if (!el) {
      el = document.createElement("div");
      el.id = "ntmScaleCorner";
      el.className = "ss-ecdis-scale-corner";
      el.setAttribute("aria-hidden", "true");
    }
    if (el.parentElement !== container) {
      container.appendChild(el);
    }

    if (_boundMap !== map) {
      _boundMap = map;
      _lastKey = "";
      map.on("zoom move viewreset zoomend moveend resize", function () {
        scheduleRender();
      });
      map.on("zoomanim", function (ev) {
        if (ev && typeof ev.zoom === "number") {
          scheduleRender(ev.center, ev.zoom);
        }
      });
    }

    renderScale(map);
  }

  global.initEcdisScaleCorner = initEcdisScaleCorner;
  global.updateEcdisScaleCorner = function () {
    if (_boundMap) renderScale(_boundMap);
  };

  function hookMapInit() {
    if (global.leafletMap) {
      initEcdisScaleCorner(global.leafletMap);
    }
    if (typeof global.initNtMMap === "function" && !global.initNtMMap.__ssScaleWrapped) {
      var origInit = global.initNtMMap;
      var wrapped = function () {
        var res = origInit.apply(this, arguments);
        if (global.leafletMap) initEcdisScaleCorner(global.leafletMap);
        return res;
      };
      wrapped.__ssScaleWrapped = true;
      global.initNtMMap = wrapped;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hookMapInit);
  } else {
    hookMapInit();
  }
  setTimeout(hookMapInit, 0);
})(window);
