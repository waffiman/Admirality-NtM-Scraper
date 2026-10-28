"use strict";

/**
 * Public Turnstile sitekey only (safe to expose).
 * Set TURNSTILE_SITE_KEY in Vercel env after creating a widget in Cloudflare Dashboard.
 */
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.json({ error: "Method not allowed" });
  }

  const sitekey = String(process.env.TURNSTILE_SITE_KEY || "").trim();
  const configured = !!sitekey && !!String(process.env.TURNSTILE_SECRET_KEY || "").trim();

  res.statusCode = 200;
  return res.json({
    ok: true,
    configured: configured,
    sitekey: configured ? sitekey : null,
    // Official Cloudflare test sitekey (always passes visible challenge) — only when unset
    // https://developers.cloudflare.com/turnstile/troubleshooting/testing/
    testMode: !configured
  });
};
