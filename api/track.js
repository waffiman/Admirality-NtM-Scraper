"use strict";

const {
  recordVisit,
  recordLogin,
  dayKey
} = require("../lib/analyticsStore");

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const type = String(body.type || "").toLowerCase();
    const day = body.day && /^\d{4}-\d{2}-\d{2}$/.test(body.day) ? body.day : dayKey();

    if (type === "visit") {
      const out = await recordVisit(body.sid, day);
      res.statusCode = out.ok || out.reason === "read_only" ? 200 : 400;
      return res.json(out);
    }

    if (type === "login") {
      const out = await recordLogin(body.emailHash, day);
      res.statusCode = out.ok || out.reason === "read_only" ? 200 : 400;
      return res.json(out);
    }

    res.statusCode = 400;
    return res.json({ error: "Unknown type" });
  } catch (err) {
    console.error("[SetSail track]", err);
    res.statusCode = 500;
    return res.json({
      error: "track_failed",
      message: err && err.message ? err.message : "error",
      code: err && err.code ? err.code : undefined
    });
  }
};
