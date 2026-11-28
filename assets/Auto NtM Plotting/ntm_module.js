// Parse GMDSS NAVTEX / NAVAREA self-cancellation timestamp (e.g. "CANCEL THIS MSG 311830 UTC OCT 26")
function extractNavtexCancelTimeIso(text, fallbackYearTwoDigit) {
  if (!text) return null;
  const monthMap = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, ABR: 3, MAY: 4, MAI: 4, JUN: 5,
    JUL: 6, AUG: 7, AGO: 7, SEP: 8, SET: 8, OCT: 9, OUT: 9, NOV: 10, DEC: 11, DEZ: 11
  };
  const rx = /(?:CANCEL\s+THIS\s+(?:MSG|MESSAGE|WARNING)|THIS\s+(?:MSG|MESSAGE|WARNING)\s+CANCELS\s+ITSELF|VALID\s+UNTIL)\s*[:\-]?\s*(\d{2})(\d{2})(\d{2})\s*(?:UTC|Z|GMT)?\s*([A-Z]{3})\s*(\d{2,4})?/i;
  const m = String(text).match(rx);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const hour = parseInt(m[2], 10);
  const min = parseInt(m[3], 10);
  const monStr = m[4].toUpperCase();
  const monIdx = monthMap[monStr];
  if (monIdx === undefined || day < 1 || day > 31 || hour > 23 || min > 59) return null;
  let yr = m[5] ? parseInt(m[5], 10) : (2000 + (parseInt(fallbackYearTwoDigit, 10) || 26));
  if (yr < 100) yr += 2000;
  const dt = new Date(Date.UTC(yr, monIdx, day, hour, min, 0));
  return isNaN(dt.getTime()) ? null : dt.toISOString();
}
window.extractNavtexCancelTimeIso = extractNavtexCancelTimeIso;

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


  // ?? 1B. Parse Raw NAVTEX / NAVAREA Broadcast Warnings & Cancellations ??
  const NAVTEX_MSG_REGEX = /(?:^|\n)\s*(?:ZCZC\s+([A-Z]{2}\d{2})\s*\n+)?\s*((?:NAVAREA\s+(?:XXI|XX|XIX|XVIII|XVII|XVI|XV|XIV|XIII|XII|XI|IX|VIII|VII|VI|IV|III|II|I|X|V|\d{1,2})|HYDROLANT|HYDROPAC|HYDROARC|NAVTEX)\s+\d{1,5}\s*\/\s*\d{2,4})/gi;
  const NAVTEX_CANCEL_REGEX = /CANCEL\s+((?:NAVAREA\s+(?:XXI|XX|XIX|XVIII|XVII|XVI|XV|XIV|XIII|XII|XI|IX|VIII|VII|VI|IV|III|II|I|X|V|\d{1,2})\s+|HYDROLANT\s+|HYDROPAC\s+|HYDROARC\s+)?\d{1,5}\s*\/\s*\d{2,4})/gi;
  const NAVTEX_COMPACT_COORD_REGEX = /\b(\d{2})(\d{2}(?:\.\d+)?)\s*([NS])\s*[,/\s]+\s*(\d{3})(\d{2}(?:\.\d+)?)\s*([EW])\b/gi;

  let navCancelMatch;
  NAVTEX_CANCEL_REGEX.lastIndex = 0;
  while ((navCancelMatch = NAVTEX_CANCEL_REGEX.exec(cleanText)) !== null) {
    const rawRef = navCancelMatch[1].trim().replace(/\s+/g, " ");
    cancelledIds.add(rawRef);
    const shortNum = rawRef.match(/(\d{1,5}\/\d{2,4})$/);
    if (shortNum) cancelledIds.add(shortNum[1]);
  }

  const navHeaders = [];
  let nmMatch;
  NAVTEX_MSG_REGEX.lastIndex = 0;
  while ((nmMatch = NAVTEX_MSG_REGEX.exec(cleanText)) !== null) {
    const b1b2 = nmMatch[1] ? nmMatch[1].toUpperCase() : "";
    const msgId = nmMatch[2].trim().replace(/\s+/g, " ").toUpperCase();
    navHeaders.push({
      index: nmMatch.index,
      id: msgId,
      b1b2: b1b2
    });
  }

  if (headers.length === 0 && navHeaders.length === 0 && /(?:ZCZC|NAVAREA|HYDROLANT|HYDROPAC|HYDROARC|NAVTEX|NNNN)/i.test(cleanText)) {
    const zczcM = cleanText.match(/ZCZC\s+([A-Z]{2}\d{2})/i);
    const fallbackId = zczcM ? `NAVTEX ${zczcM[1].toUpperCase()}/${detectedYear}` : `NAVTEX MSG/${detectedYear}`;
    navHeaders.push({ index: 0, id: fallbackId, b1b2: zczcM ? zczcM[1].toUpperCase() : "" });
  }

  for (let j = 0; j < navHeaders.length; j++) {
    const curNav = navHeaders[j];
    const sPos = curNav.index;
    const ePos = (j + 1 < navHeaders.length) ? navHeaders[j + 1].index : cleanText.length;
    const navBlock = cleanText.substring(sPos, ePos).trim();

    const navCoords = [];
    let cM;
    NTM_COORD_DASH_REGEX.lastIndex = 0;
    while ((cM = NTM_COORD_DASH_REGEX.exec(navBlock)) !== null) {
      const latD = parseInt(cM[1], 10);
      const latM = parseFloat(cM[2].replace(",", "."));
      let lat = latD + latM / 60.0;
      if (cM[3].toUpperCase() === "S") lat = -lat;
      const lonD = parseInt(cM[4], 10);
      const lonM = parseFloat(cM[5].replace(",", "."));
      let lon = lonD + lonM / 60.0;
      if (cM[6].toUpperCase() === "W") lon = -lon;
      navCoords.push({
        lat: Number(lat.toFixed(5)),
        lon: Number(lon.toFixed(5)),
        dms: `${cM[1]}? ${cM[2]}' ${cM[3].toUpperCase()}, ${cM[4]}? ${cM[5]}' ${cM[6].toUpperCase()}`
      });
    }
    if (navCoords.length === 0) {
      NTM_COORD_STD_REGEX.lastIndex = 0;
      while ((cM = NTM_COORD_STD_REGEX.exec(navBlock)) !== null) {
        const latD = parseInt(cM[1], 10);
        const latM = parseFloat(cM[2] + "." + cM[3]);
        let lat = latD + latM / 60.0;
        if (cM[4].toUpperCase() === "S") lat = -lat;
        const lonD = parseInt(cM[5], 10);
        const lonM = parseFloat(cM[6] + "." + cM[7]);
        let lon = lonD + lonM / 60.0;
        if (cM[8].toUpperCase() === "W") lon = -lon;
        navCoords.push({
          lat: Number(lat.toFixed(5)),
          lon: Number(lon.toFixed(5)),
          dms: `${cM[1]}? ${cM[2]}.${cM[3]}' ${cM[4].toUpperCase()}, ${cM[5]}? ${cM[6]}.${cM[7]}' ${cM[8].toUpperCase()}`
        });
      }
    }
    if (navCoords.length === 0) {
      NAVTEX_COMPACT_COORD_REGEX.lastIndex = 0;
      while ((cM = NAVTEX_COMPACT_COORD_REGEX.exec(navBlock)) !== null) {
        const latD = parseInt(cM[1], 10);
        const latM = parseFloat(cM[2]);
        let lat = latD + latM / 60.0;
        if (cM[3].toUpperCase() === "S") lat = -lat;
        const lonD = parseInt(cM[4], 10);
        const lonM = parseFloat(cM[5]);
        let lon = lonD + lonM / 60.0;
        if (cM[6].toUpperCase() === "W") lon = -lon;
        navCoords.push({
          lat: Number(lat.toFixed(5)),
          lon: Number(lon.toFixed(5)),
          dms: `${cM[1]}? ${cM[2]}' ${cM[3].toUpperCase()}, ${cM[4]}? ${cM[5]}' ${cM[6].toUpperCase()}`
        });
      }
    }

    const msgCancels = [];
    NAVTEX_CANCEL_REGEX.lastIndex = 0;
    let mc;
    while ((mc = NAVTEX_CANCEL_REGEX.exec(navBlock)) !== null) {
      msgCancels.push(mc[1].trim().replace(/\s+/g, " "));
    }

    const romMatch = curNav.id.match(/NAVAREA\s+(XXI|XX|XIX|XVIII|XVII|XVI|XV|XIV|XIII|XII|XI|IX|VIII|VII|VI|IV|III|II|I|X|V)/i);
    const navareaRom = romMatch ? romMatch[1].toUpperCase() : "I";
    const lines = navBlock.split(/\n+/).map(s => s.trim()).filter(Boolean);
    const subjLine = lines.length > 1 ? lines[1] : (lines[0] || "NAVTEX Navigational Warning");
    const isPoly = navCoords.length >= 3 && /AREA\s+BOUNDED|BOUNDED\s+BY|WITHIN\s+AREA/i.test(navBlock);
    // CENTERLINE / survey corridors (e.g. Arctic East Siberian coastal warnings) are real lines, not point clouds
    const isLn = !isPoly && navCoords.length >= 2 && /TRACKLINE|CABLE|PIPELINE|JOINING|CENTERLINE|CENTRELINE|1\s+MILE\s+ON\s+EACH\s+SIDE/i.test(navBlock);
    const numM = curNav.id.match(/(\d{1,5})\s*\/\s*(\d{2,4})/);

    if (navCoords.length > 0) {
      results.push({
        id: curNav.id,
        noticeNumber: curNav.id,
        num: numM ? numM[1] : "1",
        type: "NAVTEX",
        source: "NAVTEX / NAVAREA",
        year: numM ? numM[2].slice(-2) : detectedYear,
        navarea: navareaRom,
        country: `NAVAREA ${navareaRom}`,
        region: curNav.b1b2 ? `NAVTEX [${curNav.b1b2}]` : `NAVAREA ${navareaRom}`,
        category: "Broadcast Warning",
        subject: `[Broadcast Warning] ${subjLine.slice(0, 130)}`,
        title: `[Broadcast Warning] ${subjLine.slice(0, 130)}`,
        charts: [],
        coords: navCoords,
        lat: navCoords[0].lat,
        lon: navCoords[0].lon,
        isPolygon: isPoly,
        isLine: isLn,
        body: navBlock.slice(0, 1500),
        rawText: navBlock.slice(0, 1500),
        cancels: msgCancels,
        expires: extractNavtexCancelTimeIso(navBlock, numM ? numM[2].slice(-2) : detectedYear),
        status: (function() {
          const expIso = extractNavtexCancelTimeIso(navBlock, numM ? numM[2].slice(-2) : detectedYear);
          return (expIso && Date.parse(expIso) <= Date.now()) ? "CANCELLED" : "ACTIVE";
        })(),
        isCancelled: (function() {
          const expIso = extractNavtexCancelTimeIso(navBlock, numM ? numM[2].slice(-2) : detectedYear);
          return Boolean(expIso && Date.parse(expIso) <= Date.now());
        })(),
        checkedForExport: true
      });
    }
  }

  return {
    notices: results,
    cancelledIds: Array.from(cancelledIds)
  };
}

// ── 2. JRC ECDIS (.uchm) Binary Generator & Concise ECDIS Warning Snapshot Builder ──
function buildNoticeEcdisSnapshot(n, idx, maxLen = 62) {
  if (!n) return `WARN-${(idx || 0) + 1}`;
  if (n.isManualUserChart) {
    const manualTxt = String(n.manualShapeLabel || n.subject || n.title || n.id || `DRAW-${(idx || 0) + 1}`)
      .replace(/\s+/g, " ")
      .trim();
    return manualTxt.slice(0, maxLen);
  }

  // 1. Build clean Identifier prefix: e.g. "Navarea IV 1117/26" or "NtM 4687/26"
  let rawId = String(n.id || n.noticeNumber || n.num || "").replace(/\s+/g, " ").trim();
  // Shorten 4-digit year "/2026" -> "/26" for compact ECDIS display
  rawId = rawId.replace(/\/20(\d{2})\b/g, "/$1");
  const navRom = String(n.navarea || "").trim().toUpperCase();
  const isNavtex = String(n.type || "").toUpperCase() === "NAVTEX" || /NAVAREA|NAVTEX|HYDROLANT|HYDROPAC|HYDROARC/i.test(rawId);

  let idPart = "";
  const navMatch = rawId.match(/^(NAVAREA\s+[IVX0-9]+)(?:\s+[A-Z]{2,4})?\s+(\d+\/\d+)/i);
  const hydroMatch = rawId.match(/^(HYDRO(?:LANT|PAC|ARC))\s+(\d+\/\d+)/i);
  const numSlashMatch = rawId.match(/(\d+(?:\([TP]\))?\/\d{2,4})/i);

  if (navMatch) {
    const areaPart = navMatch[1].replace(/^NAVAREA/i, "Navarea");
    idPart = `${areaPart} ${navMatch[2]}`;
  } else if (hydroMatch) {
    const hPrefix = hydroMatch[1].charAt(0).toUpperCase() + hydroMatch[1].slice(1).toLowerCase();
    idPart = `${hPrefix} ${hydroMatch[2]}`;
  } else if (isNavtex) {
    const numTok = numSlashMatch ? numSlashMatch[1] : (String(n.noticeNumber || n.num || "").replace(/\/20(\d{2})\b/g, "/$1") || rawId);
    if (navRom) {
      idPart = `Navarea ${navRom} ${numTok}`.trim();
    } else if (/^NAVTEX/i.test(rawId)) {
      idPart = rawId.replace(/^NAVTEX/i, "Navtex");
    } else {
      idPart = `Navtex ${numTok}`.trim();
    }
  } else {
    const ntmTok = numSlashMatch ? numSlashMatch[1] : (rawId || `${(idx || 0) + 1}`);
    idPart = /^NtM\b/i.test(ntmTok) ? ntmTok : `NtM ${ntmTok}`;
  }

  // 2. Extract concise hazard essence: e.g. "Oil rig exists", "Diving operations", "Obstruction"
  const rawSubj = String(n.subject || n.title || "").replace(/\s+/g, " ").trim();
  const bracketMatch = rawSubj.match(/^\[([^\]]+)\]\s*(.*)$/);
  const bracketTag = bracketMatch ? bracketMatch[1].trim() : "";
  let subjClean = (bracketMatch ? bracketMatch[2] : rawSubj)
    .replace(/\b(?:OFFICIAL\s+WARNING|BROADCAST\s+WARNING)\b/gi, "")
    .replace(/\s+-\s+(?:NOTICE|CAUTION|WARNING)\.?$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  const rawBody = String(n.body || n.rawText || n.description || "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\r?\n+/g, " | ")
    .trim();

  // Check body for a high-signal maritime hazard phrase if subject is just an area name or generic
  let hazardPhrase = "";
  const hazardPatterns = [
    /\b(OIL\s+RIG\s+[A-Z0-9'\-\s]{0,24}(?:EXISTS|ESTABLISHED|MOVED|DRILLING|OPERATING)?)/i,
    /\b((?:DRILLING|SEISMIC|DIVING|DREDGING|CABLE|PIPELINE|SURVEY|GUNNERY|MISSILE|ROCKET|MILITARY|SUBSURFACE|OFFSHORE)\s+(?:RIG|OPERATIONS?|SURVEY|WORKS?|EXERCISES?|FIRING|LAYING|IN\s+PROGRESS|AREA)[A-Z0-9'\-\s]{0,18})/i,
    /\b((?:LIGHT|BUOY|BEACON|DGPS|RACON|AIS|VHF|FOG\s+SIGNAL)[A-Z0-9'\-\s]{0,26}(?:IS\s+UNLIT|UNLIT|OUT\s+OF\s+ORDER|NOT\s+VISIBLE|MISSING|ADRIFT|EXTINGUISHED|INOPERATIVE|MOVED|DAMAGED))/i,
    /\b((?:DANGEROUS\s+WRECK|WRECK|DERELICT|OBSTRUCTION|SHOAL|SHALLOW\s+DEPTH|CONTAINER|BUOY\s+ADRIFT|PROTRUDING\s+PIPES?)[A-Z0-9'\-\s]{0,22})/i,
    /\b(RIGLIST\b)/i
  ];
  for (let p = 0; p < hazardPatterns.length; p++) {
    const m = rawBody.match(hazardPatterns[p]) || subjClean.match(hazardPatterns[p]);
    if (m && m[1]) {
      hazardPhrase = m[1].replace(/\s+/g, " ").trim();
      break;
    }
  }
  if (/^RIGLIST\b/i.test(hazardPhrase)) {
    hazardPhrase = "Oil rig list active";
  }

  let essence = "";
  if (hazardPhrase) {
    essence = hazardPhrase;
  } else if (subjClean && !/^RIGLIST\b/i.test(subjClean)) {
    // Take the first meaningful clause of subject
    const firstClause = subjClean.split(/\.|\s+—\s+|\s+-\s+/)[0].trim();
    if (bracketTag && !/^(?:Navigational Warning|Broadcast Warning)$/i.test(bracketTag) && firstClause.length < 18) {
      essence = `${bracketTag}: ${firstClause}`;
    } else {
      essence = firstClause || bracketTag;
    }
  } else if (bracketTag) {
    essence = bracketTag;
  } else if (n.category) {
    essence = String(n.category).trim();
  }

  // Normalize ALL-CAPS essence into readable sentence case while preserving maritime acronyms
  essence = essence
    .replace(/['"“”‘’]+/g, "")
    .replace(/\s+/g, " ")
    .replace(/[.,;:]+$/, "")
    .trim();

  if (essence && essence === essence.toUpperCase() && essence.length > 4) {
    const keepUpper = new Set(["AIS", "DGPS", "GPS", "VHF", "TSS", "UKC", "MODU", "FPSO", "LNG", "LPG", "ODAS", "N", "S", "E", "W", "NE", "NW", "SE", "SW", "NM", "UKHO"]);
    essence = essence
      .toLowerCase()
      .split(" ")
      .map((w, wIdx) => {
        const up = w.toUpperCase();
        if (keepUpper.has(up)) return up;
        if (wIdx === 0) return w.charAt(0).toUpperCase() + w.slice(1);
        return w;
      })
      .join(" ");
  } else if (essence) {
    essence = essence.charAt(0).toUpperCase() + essence.slice(1);
  }

  const combined = (essence ? `${idPart} ${essence}` : idPart)
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (combined.length <= maxLen) return combined;
  return combined.slice(0, maxLen).replace(/\s+\S*$/, "").trim() || combined.slice(0, maxLen).trim();
}
if (typeof window !== "undefined") {
  window.buildNoticeEcdisSnapshot = buildNoticeEcdisSnapshot;
}

/**
 * Generates a JRC User Chart Map file (Version 1.1) from filtered notices
 * @param {Array<Object>} notices List of notices with coords
 * @returns {ArrayBuffer}
 */
function buildJrcUchmBuffer(notices) {
  // Authentic JRC JAN-701B/901B/7201/9201 User Map File Version 1.1 (.uchm) binary generator
  // Matches reference 'Navarea IV Warnings.uchm' byte-for-byte (208-byte header with CRC32 @ 204,
  // variable-length records with SCALE = 1,536,000, and 4-byte body CRC32 footer).
  const SCALE = 1536000;
  const SCAMIN = 100000000;
  const MAX_POLY_UNIQUE_PTS = 20;
  const MAX_LINE_PTS = 50;

  const crcTable = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      t[i] = c >>> 0;
    }
    return t;
  })();

  const crc32Slice = (u8, start, end) => {
    let c = 0xffffffff;
    for (let i = start; i < end; i++) {
      c = crcTable[(c ^ u8[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  };

  const writeAscii = (buf, offset, str, maxLen) => {
    const s = String(str || "")
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const limit = Math.max(0, maxLen - 1);
    for (let i = 0; i < maxLen; i++) {
      if (i < s.length && i < limit) {
        const code = s.charCodeAt(i);
        buf[offset + i] = (code >= 32 && code <= 126) ? code : 32;
      } else {
        buf[offset + i] = 0;
      }
    }
  };

  const toScaledPair = (pt) => ({
    lat: Number(pt.lat),
    lon: Number(pt.lon),
    latS: Math.round(Number(pt.lat) * SCALE),
    lonS: Math.round(Number(pt.lon) * SCALE)
  });

  // Type 11: On-Chart Text Label (160 bytes)
  const makeTextRecord11 = (lat, lon, textStr, fontSizePt) => {
    const rec = new Uint8Array(160);
    const dv = new DataView(rec.buffer);
    dv.setUint32(0, 11, true);
    dv.setUint32(4, SCAMIN, true);
    dv.setUint32(8, 1000, true);
    // bytes 12..83 remain 0 (name='' and rec[83]=0, matching Rec 2, 4, 14 in reference .uchm)
    rec[84] = 0x09;
    rec[85] = fontSizePt || 0x0c;
    writeAscii(rec, 88, textStr, 64);
    dv.setInt32(152, Math.round(Number(lat) * SCALE), true);
    dv.setInt32(156, Math.round(Number(lon) * SCALE), true);
    return rec;
  };

  // Type 29 / 18: Point Warning Symbol (~WARN__1, 104 bytes)
  const makePointRecord = (lat, lon, title) => {
    const rec = new Uint8Array(104);
    const dv = new DataView(rec.buffer);
    const recType = /\bRIG\b/i.test(String(title || "")) ? 18 : 29;
    dv.setUint32(0, recType, true);
    dv.setUint32(4, SCAMIN, true);
    dv.setUint32(8, 1000, true);
    writeAscii(rec, 12, title, 64);
    rec[83] = 1;
    writeAscii(rec, 84, "~WARN__1", 9);
    rec[95] = 0x09;
    dv.setInt32(96, Math.round(Number(lat) * SCALE), true);
    dv.setInt32(100, Math.round(Number(lon) * SCALE), true);
    return rec;
  };

  // Type 30: Polyline / Line (88 + npts * 84 bytes)
  const makeLineRecord30 = (rawPts, title) => {
    const dedup = [];
    rawPts.forEach((p) => {
      const sp = toScaledPair(p);
      if (!dedup.length || dedup[dedup.length - 1].latS !== sp.latS || dedup[dedup.length - 1].lonS !== sp.lonS) {
        dedup.push(sp);
      }
    });
    if (dedup.length < 2) {
      return dedup.length === 1 ? makePointRecord(dedup[0].lat, dedup[0].lon, title) : null;
    }
    let pts = dedup;
    if (pts.length > MAX_LINE_PTS) {
      const sampled = [];
      for (let i = 0; i < MAX_LINE_PTS - 1; i++) {
        sampled.push(pts[Math.floor((i * (pts.length - 1)) / (MAX_LINE_PTS - 1))]);
      }
      sampled.push(pts[pts.length - 1]);
      pts = sampled;
    }
    const npts = pts.length;
    const rec = new Uint8Array(88 + npts * 84);
    const dv = new DataView(rec.buffer);
    dv.setUint32(0, 30, true);
    dv.setUint32(4, SCAMIN, true);
    dv.setUint32(8, 1000, true);
    writeAscii(rec, 12, title, 64);
    rec[83] = 1;
    dv.setUint32(84, npts, true);
    for (let i = 0; i < npts; i++) {
      const base = 88 + i * 84;
      writeAscii(rec, base, title, 64);
      rec[base + 71] = 1;
      rec[base + 74] = 9;
      dv.setInt32(base + 76, pts[i].latS, true);
      dv.setInt32(base + 80, pts[i].lonS, true);
    }
    return rec;
  };

  // Type 31: Closed Polygon / Area (96 + npts * 8 bytes)
  const makePolyRecord31 = (rawPts, title) => {
    const unique = [];
    rawPts.forEach((p) => {
      const sp = toScaledPair(p);
      if (!unique.length || unique[unique.length - 1].latS !== sp.latS || unique[unique.length - 1].lonS !== sp.lonS) {
        unique.push(sp);
      }
    });
    if (
      unique.length >= 2 &&
      unique[0].latS === unique[unique.length - 1].latS &&
      unique[0].lonS === unique[unique.length - 1].lonS
    ) {
      unique.pop();
    }
    if (unique.length < 3) {
      if (unique.length === 2) return makeLineRecord30(unique, title);
      if (unique.length === 1) return makePointRecord(unique[0].lat, unique[0].lon, title);
      return null;
    }
    let ring = unique;
    if (ring.length > MAX_POLY_UNIQUE_PTS) {
      const sampled = [];
      for (let i = 0; i < MAX_POLY_UNIQUE_PTS; i++) {
        sampled.push(ring[Math.floor((i * ring.length) / MAX_POLY_UNIQUE_PTS)]);
      }
      ring = sampled;
    }
    const closedRing = ring.concat([ring[0]]);
    const npts = closedRing.length;
    const rec = new Uint8Array(96 + npts * 8);
    const dv = new DataView(rec.buffer);
    dv.setUint32(0, 31, true);
    dv.setUint32(4, SCAMIN, true);
    dv.setUint32(8, 1000, true);
    writeAscii(rec, 12, title, 64);
    rec[83] = 1;
    rec[84] = 3;
    rec[85] = 1;
    rec[86] = 8;
    rec[87] = 0;
    rec[88] = 3;
    rec[89] = 9;
    rec[90] = 0;
    rec[91] = 0;
    dv.setUint32(92, npts, true);
    for (let i = 0; i < npts; i++) {
      dv.setInt32(96 + i * 8, closedRing[i].latS, true);
      dv.setInt32(96 + i * 8 + 4, closedRing[i].lonS, true);
    }
    return rec;
  };

  const chunks = [];

  (notices || []).forEach((n, idx) => {
    if (!n) return;
    const rawCoords = Array.isArray(n.coords) && n.coords.length > 0
      ? n.coords
      : (Number.isFinite(Number(n.lat)) && Number.isFinite(Number(n.lon)) ? [{ lat: Number(n.lat), lon: Number(n.lon) }] : []);
    const cleanCoords = rawCoords
      .map((c) => ({ lat: Number(c.lat), lon: Number(c.lon) }))
      .filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lon) && Math.abs(c.lat) <= 90 && Math.abs(c.lon) <= 180);
    if (cleanCoords.length === 0) return;

    const rawTitle = buildNoticeEcdisSnapshot(n, idx, 62);
    const manualCaption = String(n.manualShapeLabel || "").replace(/\s+/g, " ").trim().slice(0, 62);

    // 1. Standalone Manual User Chart Text Box -> pure Type 11 Text Label record
    if (n.isManualUserChart && String(n.category || "").toUpperCase() === "TEXT") {
      chunks.push(makeTextRecord11(cleanCoords[0].lat, cleanCoords[0].lon, manualCaption || rawTitle, 0x14));
      return;
    }

    const isPoly = Boolean(n.isPolygon && cleanCoords.length >= 3);
    const isLine = Boolean(!isPoly && n.isLine && cleanCoords.length >= 2);

    // 2. Closed Polygon / Area (or multi-zone subPolygons)
    if (isPoly) {
      const subRings = [];
      if (Array.isArray(n.subPolygons) && n.subPolygons.length > 0) {
        n.subPolygons.forEach((sp) => {
          const spPts = Array.isArray(sp && sp.coords) && sp.coords.length >= 3
            ? sp.coords.map((c) => ({ lat: Number(c.lat), lon: Number(c.lon) }))
            : (Array.isArray(sp && sp.points) && sp.points.length >= 3
              ? sp.points.map((p) => (Array.isArray(p) ? { lat: Number(p[0]), lon: Number(p[1]) } : { lat: Number(p.lat), lon: Number(p.lon) }))
              : []);
          const validSp = spPts.filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lon));
          if (validSp.length >= 3) subRings.push(validSp);
        });
      }
      if (subRings.length === 0) {
        subRings.push(cleanCoords);
      }

      subRings.forEach((ring) => {
        const polyRec = makePolyRecord31(ring, rawTitle);
        if (polyRec) chunks.push(polyRec);
      });

      // Emit companion Type 11 Text Label at centroid of primary ring (for all NtM/NAVTEX polygons, and manual shapes with a caption)
      if (!n.isManualUserChart || manualCaption) {
        const pRing = subRings[0];
        let sumLat = 0, sumLon = 0;
        for (let k = 0; k < pRing.length; k++) {
          sumLat += pRing[k].lat;
          sumLon += pRing[k].lon;
        }
        const cLat = sumLat / pRing.length;
        const cLon = sumLon / pRing.length;
        chunks.push(makeTextRecord11(cLat, cLon, manualCaption || rawTitle, 0x0c));
      }
      return;
    }

    // 3. Polyline / Line / Brush Stroke / Straight Line
    if (isLine) {
      const lineRec = makeLineRecord30(cleanCoords, rawTitle);
      if (lineRec) chunks.push(lineRec);
      if (!n.isManualUserChart || manualCaption) {
        const midPt = cleanCoords[Math.floor(cleanCoords.length / 2)];
        chunks.push(makeTextRecord11(midPt.lat, midPt.lon, manualCaption || rawTitle, 0x0c));
      }
      return;
    }

    // 4. Discrete Point Warning(s) — deduplicate identical coordinates from multi-panel UKHO notices
    const uniquePts = [];
    cleanCoords.forEach((pt) => {
      const sp = toScaledPair(pt);
      if (!uniquePts.some((u) => u.latS === sp.latS && u.lonS === sp.lonS)) {
        uniquePts.push(sp);
      }
    });
    uniquePts.forEach((pt, pIdx) => {
      chunks.push(makePointRecord(pt.lat, pt.lon, rawTitle));
      if (pIdx === 0 && (!n.isManualUserChart || manualCaption)) {
        chunks.push(makeTextRecord11(pt.lat, pt.lon, manualCaption || rawTitle, 0x0c));
      }
    });
  });

  // Ensure at least one valid record exists if called with an empty list
  if (chunks.length === 0) {
    chunks.push(makeTextRecord11(0, 0, "SETSAIL USER CHART", 0x0c));
  }

  const HEADER_SIZE = 208;
  const FOOTER_SIZE = 4;
  const bodyLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const totalSize = HEADER_SIZE + bodyLen + FOOTER_SIZE;

  const buffer = new ArrayBuffer(totalSize);
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  // 1. Write 208-byte Header ("User Map File Version 1.1\0", fileSizeMinus4 @ 64, timestamp @ 68, header CRC32 @ 204)
  writeAscii(bytes, 0, "User Map File Version 1.1", 64);
  view.setUint32(64, totalSize - 4, true);
  view.setUint32(68, Math.floor(Date.now() / 1000), true);
  const hdrCrc = crc32Slice(bytes, 0, 204);
  view.setUint32(204, hdrCrc, true);

  // 2. Copy variable-length records into body [208 .. 208 + bodyLen)
  let pos = HEADER_SIZE;
  for (let i = 0; i < chunks.length; i++) {
    bytes.set(chunks[i], pos);
    pos += chunks[i].length;
  }

  // 3. Write 4-byte Body CRC32 footer at [208 + bodyLen .. totalSize)
  const bodyCrc = crc32Slice(bytes, HEADER_SIZE, HEADER_SIZE + bodyLen);
  view.setUint32(HEADER_SIZE + bodyLen, bodyCrc, true);

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
