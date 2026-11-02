"use strict";

/**
 * Trusted UTC clock for clients whose device time may be wrong.
 * Used by own-ship route DR age (AIS fix UTC → now UTC).
 */
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  const ms = Date.now();
  const iso = new Date(ms).toISOString();
  res.setHeader("Date", new Date(ms).toUTCString());
  if (req.method === "HEAD") {
    res.statusCode = 204;
    return res.end();
  }
  res.statusCode = 200;
  return res.json({ ok: true, utcMs: ms, utc: iso });
};
