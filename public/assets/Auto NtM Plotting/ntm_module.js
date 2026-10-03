/**
 * Auto-NtM Module for OPEN CALC
 * Parses ALL UKHO Admiralty Notices to Mariners (Permanent, Temporary T, Preliminary P, NAVAREA),
 * plots notices on interactive map, tracks cancellations,
 * and exports selected notice types to JRC ECDIS (.uchm), GeoJSON, and CSV.
 */

// ── 1. Regular Expressions for All Notice Types ──

// Captures both Permanent ("57 SWEDEN - East Coast - Foul.")
// and Temporary/Preliminary ("52(T)/26 IRELAND - East Coast - Buoy.")
const NTM_ALL_HEADER_REGEX = /(?:^|\n)\s*(\d{1,5}(?:\s*\([TP]\))?(?:\s*\/\s*\d{2,4})?)\s*(?:\n|\s{1,6})([A-Z\s\-\u00C0-\u024F\u2013\u2014\ufffd]{3,35}?)\s*[\-\u2013\u2014]\s*([A-Za-z0-9\s\-\(\)\.\u00C0-\u024F\u2013\u2014\ufffd]{2,45}?)\s*[\-\u2013\u2014]\s*([^\n\r]+)/gm;

// Standard Admiralty coordinates with all character variants:
// e.g. 58° 37.70'N., 17° 46.30'E. or 58° 37´·70N., 17° 46´·30E. or 59 19406N, 18 04933E
const NTM_COORD_STD_REGEX = /(\d{1,2})\s*[\xb0\ufffd\xb7\s\u00B0\u00BA°]+\s*(\d{1,2})[\.\,\xb7\ufffd\u00B7\xb4\'´\s]+(\d{1,4})\s*['\u2032\s]*([NS])\.?\s*,?\s*(\d{1,3})\s*[\xb0\ufffd\xb7\s\u00B0\u00BA°]+\s*(\d{1,2})[\.\,\xb7\ufffd\u00B7\xb4\'´\s]+(\d{1,4})\s*['\u2032\s]*([EW])\.?/gi;

// NAVAREA dash coordinates: e.g. 60-06.7N 002-35.5E or 53-34.0N 003-27.2W
const NTM_COORD_DASH_REGEX = /(\d{2})-(\d{2}[\.\,]\d+)\s*([NS])\.?\s*,?\s*(\d{2,3})-(\d{2}[\.\,]\d+)\s*([EW])\.?/gi;

// Charts affected regex
const CHARTS_REGEX = /Charts?\s+affected\s*[:\u2014\-~\s]+([0-9\s_\-\u2014~]+)/i;

// Cancellation detection: e.g. Former Notice 4267(T)/24 is cancelled
const CANCELLATION_REGEX = /Former\s+Notice\s+(\d+)(?:\s*\(([TP])\))?(?:\s*\/\s*(\d{2,4}))?\s+is\s+cancelled/gi;

/**
 * Parse text from Admiralty Notices to Mariners bulletin (All types: PERM, T, P)
 * @param {string} fullText
 * @param {string} defaultYear e.g. "26"
 * @returns {Array<Object>} list of parsed notices
 */
function parseAdmiraltyNtMText(fullText, defaultYear = "26") {
  if (!fullText) return { notices: [], cancelledIds: [] };
  const cleanText = fullText.replace(/\r\n/g, "\n");


  // Attempt to extract bulletin year if mentioned in text (e.g. Wk01/26 or 2026)
  const yrMatch = cleanText.match(/Weekly\s+Edition\s+\d+[\s\S]{1,80}?(\d{4})/i) || cleanText.match(/Wk\d+\/(\d{2})/i);
  let detectedYear = defaultYear;
  if (yrMatch && yrMatch[1]) {
    detectedYear = yrMatch[1].length === 4 ? yrMatch[1].slice(-2) : yrMatch[1];
  }

  const headers = [];
  let match;
  
  NTM_ALL_HEADER_REGEX.lastIndex = 0;
  while ((match = NTM_ALL_HEADER_REGEX.exec(cleanText)) !== null) {
    const rawNum = match[1].trim();
    const rawSubject = match[4].trim();

    // Skip continued blocks
    if (/\(continued\)/i.test(rawSubject)) {
      continue;
    }

    let noticeType = "PERM";
    const typeMatch = rawNum.match(/\(([TP])\)/i) || rawSubject.match(/\(([TP])\)/i);
    if (typeMatch) {
      noticeType = typeMatch[1].toUpperCase();
    }

    let num = rawNum;
    const numMatch = rawNum.match(/^\d+/);
    if (numMatch) {
      num = numMatch[0];
    }

    let year = detectedYear;
    const ym = rawNum.match(/\/(\d{2,4})/);
    if (ym) {
      year = ym[1].length === 4 ? ym[1].slice(-2) : ym[1];
    }

    const fullId = `${num}${noticeType !== 'PERM' ? '(' + noticeType + ')' : ''}/${year}`;

    headers.push({
      index: match.index,
      fullId: fullId,
      num: num,
      type: noticeType,
      year: year,
      country: match[2].trim(),
      region: match[3].trim(),
      subject: rawSubject
    });
  }

  const results = [];
  const cancelledIds = new Set();

  for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];
    const startPos = cur.index;
    let endPos = cleanText.length;

    // Find next header
    if (i + 1 < headers.length) {
      endPos = headers[i + 1].index;
    }

    const blockText = cleanText.substring(startPos, endPos);

    // Extract coordinates (Standard degrees + dash format)
    const coords = [];
    NTM_COORD_STD_REGEX.lastIndex = 0;
    let cMatch;
    while ((cMatch = NTM_COORD_STD_REGEX.exec(blockText)) !== null) {
      const latD = parseInt(cMatch[1], 10);
      const latM = parseFloat(cMatch[2] + "." + cMatch[3]);
      let lat = latD + latM / 60.0;
      if (cMatch[4].toUpperCase() === "S") lat = -lat;

      const lonD = parseInt(cMatch[5], 10);
      const lonM = parseFloat(cMatch[6] + "." + cMatch[7]);
      let lon = lonD + lonM / 60.0;
      if (cMatch[8].toUpperCase() === "W") lon = -lon;

      coords.push({
        lat: Number(lat.toFixed(5)),
        lon: Number(lon.toFixed(5)),
        dms: `${cMatch[1]}° ${cMatch[2]}.${cMatch[3]}' ${cMatch[4]}, ${cMatch[5]}° ${cMatch[6]}.${cMatch[7]}' ${cMatch[8]}`
      });
    }

    // Try dash format if no standard coords found
    if (coords.length === 0) {
      NTM_COORD_DASH_REGEX.lastIndex = 0;
      let dMatch;
      while ((dMatch = NTM_COORD_DASH_REGEX.exec(blockText)) !== null) {
        const latD = parseInt(dMatch[1], 10);
        const latM = parseFloat(dMatch[2].replace(",", "."));
        let lat = latD + latM / 60.0;
        if (dMatch[3].toUpperCase() === "S") lat = -lat;

        const lonD = parseInt(dMatch[4], 10);
        const lonM = parseFloat(dMatch[5].replace(",", "."));
        let lon = lonD + lonM / 60.0;
        if (dMatch[6].toUpperCase() === "W") lon = -lon;

        coords.push({
          lat: Number(lat.toFixed(5)),
          lon: Number(lon.toFixed(5)),
          dms: `${dMatch[1]}° ${dMatch[2]}' ${dMatch[3]}, ${dMatch[4]}° ${dMatch[5]}' ${dMatch[6]}`
        });
      }
    }

    // Extract charts affected
    let charts = [];
    const chartMatch = CHARTS_REGEX.exec(blockText);
    if (chartMatch && chartMatch[1]) {
      charts = chartMatch[1].split(/[\s\u2014\-~]+/).filter(c => /^\d+(_\d+)?$/.test(c));
    }

    // Check for cancellations mentioned in this notice
    CANCELLATION_REGEX.lastIndex = 0;
    let canMatch;
    while ((canMatch = CANCELLATION_REGEX.exec(blockText)) !== null) {
      const cNum = canMatch[1];
      const cType = canMatch[2] || "";
      const cYr = canMatch[3] || detectedYear;
      const targetId = `${cNum}${cType ? '(' + cType + ')' : ''}/${cYr}`;
      cancelledIds.add(targetId);
    }

    // Geometry classification based on real UKHO NtM text patterns.
    // Real UKHO area/line indicators:
    //   POLYGON:  "joining: (a)...(b)...(c)..." with 3+ coords AND closing reference like "within:", "enclosed", "limit of restricted area", etc.
    //   LINE:     "joining: (a)...(b)..." with 2+ coords (pipelines, reporting lines, leading lines)
    //   POINT:    Everything else (default)
    //
    // NOTE: Generic "area" is excluded as it appears in virtually every NtM body.

    const POLYGON_KEYWORDS = /bounded\s+by\s+the\s+following|joining\s+the\s+following|limited\s+by\s+the\s+following|the\s+following\s+positions|bounded\s+by\s+positions|the\s+following\s+co[- ]?ordinates|the\s+following\s+coordinates|between\s+the\s+following|enclosed\s+by|prohibited\s+area\s+bounded|restricted\s+area\s+bounded|within\s+the\s+area\s+bounded|limit\s+of\s+restricted\s+area.*joining|limit\s+of.*area.*joining|maritime\s+limit.*joining|within:\s*\(a\)/i;

    const LINE_KEYWORDS = /\bjoining:\s*\(a\)|submarine\s+pipeline|pipeline.*joining|radio\s+reporting\s+line|traffic\s+separation|traffic\s+lane|leading\s+line|range\s+line|pecked\s+line.*joining|transit\s+lane|pier|cable|pipe/i;

    // Sanity check: reject polygons/lines whose coords span more than 8° lat or 12° lon.
    // (real NtM features are always local – no legitimate NtM area spans an ocean basin)
    let coordsGeographicallySane = true;
    if (coords.length >= 2) {
      const lats = coords.map(c => c.lat);
      const lons = coords.map(c => c.lon);
      const latSpread = Math.max(...lats) - Math.min(...lats);
      const lonSpread = Math.max(...lons) - Math.min(...lons);
      if (latSpread > 8 || lonSpread > 12) {
        coordsGeographicallySane = false;
      }
    }

    const isPolygon = coords.length >= 3 && POLYGON_KEYWORDS.test(blockText) && coordsGeographicallySane;
    const isLine = coords.length >= 2 && !isPolygon && coordsGeographicallySane && LINE_KEYWORDS.test(blockText);

    const fullId = cur.fullId || `${cur.num}${cur.type !== 'PERM' ? '(' + cur.type + ')' : ''}/${cur.year}`;

    results.push({
      id: fullId,
      num: cur.num,
      type: cur.type, // 'PERM', 'T', 'P'
      year: cur.year,
      country: cur.country,
      region: cur.region,
      subject: cur.subject,
      charts: charts,
      coords: coords,
      isPolygon: isPolygon,
      isLine: isLine,
      body: blockText.substring(0, 1500).trim(),
      checkedForExport: true // default enabled
    });
  }

  return {
    notices: results,
    cancelledIds: Array.from(cancelledIds)
  };
}

// ── 2. JRC ECDIS (.uchm) Binary Generator ──
/**
 * Generates a JRC User Chart Map file (Version 1.1) from filtered notices
 * @param {Array<Object>} notices List of notices with coords
 * @returns {ArrayBuffer}
 */
function buildJrcUchmBuffer(notices) {
  // Only include notices that have coordinates
  const valid = notices.filter(n => n.coords && n.coords.length > 0);
  
  const RECORD_SIZE = 296;
  const HEADER_SIZE = 220;
  const totalSize = HEADER_SIZE + valid.length * RECORD_SIZE;
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // 1. Write Header "User Map File Version 1.1\0"
  const headerStr = "User Map File Version 1.1";
  for (let i = 0; i < headerStr.length; i++) {
    bytes[i] = headerStr.charCodeAt(i);
  }

  // Record count at offset 24 (int32 little endian)
  view.setInt32(24, valid.length, true);

  // 2. Write Records
  let offset = HEADER_SIZE;
  for (let r = 0; r < valid.length; r++) {
    const item = valid[r];
    const recStart = offset;

    // Record Name (up to 63 chars + null terminator)
    const title = `${item.id} ${item.region} ${item.subject}`.substring(0, 63);
    for (let i = 0; i < title.length; i++) {
      bytes[recStart + i] = title.charCodeAt(i) & 0xff;
    }

    // Points
    const pts = item.coords.slice(0, 5);
    if (item.isPolygon && pts.length >= 3) {
      if (pts[0].lat !== pts[pts.length - 1].lat || pts[0].lon !== pts[pts.length - 1].lon) {
        pts.push({ lat: pts[0].lat, lon: pts[0].lon });
      }
    }

    // Object type flags
    view.setInt32(recStart + 68, item.isPolygon ? 2 : (item.isLine ? 1 : 0), true);
    view.setInt32(recStart + 72, pts.length, true);

    // Coordinates: deg * 600,000 (1/10000 minute)
    for (let p = 0; p < Math.min(pts.length, 5); p++) {
      const ptOff = recStart + 84 + p * 8;
      const latScaled = Math.round(pts[p].lat * 600000);
      const lonScaled = Math.round(pts[p].lon * 600000);
      view.setInt32(ptOff, latScaled, true);
      view.setInt32(ptOff + 4, lonScaled, true);
    }

    if (pts.length === 1) {
      const latScaled = Math.round(pts[0].lat * 600000);
      const lonScaled = Math.round(pts[0].lon * 600000);
      view.setInt32(recStart + 84, latScaled, true);
      view.setInt32(recStart + 88, lonScaled, true);
    }

    offset += RECORD_SIZE;
  }

  return buffer;
}

/**
 * Trigger download of JRC .uchm file in browser
 */
function downloadJrcUchmFile(notices, filename = "Admiralty_NtM_Overlay.uchm") {
  const buffer = buildJrcUchmBuffer(notices);
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── 3. GeoJSON & CSV Exporters ──
function exportToGeoJson(notices) {
  const features = [];
  notices.forEach(n => {
    if (!n.coords || n.coords.length === 0) return;

    if (n.coords.length === 1 || (!n.isPolygon && !n.isLine)) {
      n.coords.forEach((c) => {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [c.lon, c.lat] },
          properties: {
            id: n.id,
            type: n.type,
            title: `${n.id}: ${n.country} - ${n.region}`,
            subject: n.subject,
            charts: (n.charts || []).join(", ")
          }
        });
      });
    } else if (n.isPolygon) {
      const polyCoords = n.coords.map(c => [c.lon, c.lat]);
      if (polyCoords.length >= 3) {
        if (polyCoords[0][0] !== polyCoords[polyCoords.length-1][0] || polyCoords[0][1] !== polyCoords[polyCoords.length-1][1]) {
          polyCoords.push(polyCoords[0]);
        }
      }
      features.push({
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [polyCoords] },
        properties: {
          id: n.id,
          type: n.type,
          title: `${n.id}: ${n.country} - ${n.region}`,
          subject: n.subject,
          charts: (n.charts || []).join(", ")
        }
      });
    } else {
      features.push({
        type: "Feature",
        geometry: { type: "LineString", coordinates: n.coords.map(c => [c.lon, c.lat]) },
        properties: {
          id: n.id,
          type: n.type,
          title: `${n.id}: ${n.country} - ${n.region}`,
          subject: n.subject,
          charts: (n.charts || []).join(", ")
        }
      });
    }
  });

  return JSON.stringify({ type: "FeatureCollection", features: features }, null, 2);
}

function exportToCsv(notices) {
  let csv = "Notice_ID,Type,Country,Region,Subject,Latitude,Longitude,Position_DMS,Charts\n";
  notices.forEach(n => {
    (n.coords || []).forEach(c => {
      const cleanSubject = `"${(n.subject || '').replace(/"/g, '""')}"`;
      const cleanRegion = `"${(n.region || '').replace(/"/g, '""')}"`;
      csv += `${n.id},${n.type},${n.country},${cleanRegion},${cleanSubject},${c.lat},${c.lon},"${c.dms}","${(n.charts || []).join(' ')}"\n`;
    });
  });
  return csv;
}
