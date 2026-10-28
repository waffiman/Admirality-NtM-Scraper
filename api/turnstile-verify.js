"use strict";

/**
 * Official Cloudflare Turnstile Siteverify.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * Env: TURNSTILE_SECRET_KEY (required in production)
 * Test secret when unset: 1x0000000000000000000000000000000AA (always passes)
 */

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string" && req.body) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (e) {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 8192) {
        resolve({});
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
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
    const body = await readBody(req);
    const token = String(body.token || body.response || "").trim();
    if (!token || token.length > 2048) {
      res.statusCode = 400;
      return res.json({ success: false, error: "missing_token" });
    }

    const secret =
      String(process.env.TURNSTILE_SECRET_KEY || "").trim() ||
      "1x0000000000000000000000000000000AA";

    const ip =
      (req.headers["x-forwarded-for"] && String(req.headers["x-forwarded-for"]).split(",")[0].trim()) ||
      req.headers["x-real-ip"] ||
      undefined;

    const form = new URLSearchParams();
    form.set("secret", secret);
    form.set("response", token);
    if (ip) form.set("remoteip", String(ip));

    const cf = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString()
    });
    const data = await cf.json().catch(() => ({ success: false }));

    if (!data || data.success !== true) {
      res.statusCode = 403;
      return res.json({
        success: false,
        error: "turnstile_failed",
        "error-codes": data && data["error-codes"] ? data["error-codes"] : []
      });
    }

    res.statusCode = 200;
    return res.json({
      success: true,
      hostname: data.hostname || null,
      challenge_ts: data.challenge_ts || null
    });
  } catch (err) {
    console.error("[SetSail Turnstile]", err);
    res.statusCode = 500;
    return res.json({
      success: false,
      error: "verify_failed",
      message: err && err.message ? err.message : "error"
    });
  }
};
