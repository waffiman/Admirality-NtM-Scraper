"use strict";

/**
 * SetRoute Core B — server-side Cohere intent proxy.
 * Keeps the API key off the client. Set COHERE_API_KEY (or SETROUTE_COHERE_KEY) in Vercel env.
 */

const COHERE_URL = "https://api.cohere.com/v2/chat";
const DEFAULT_MODEL = "command-r-08-2024";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function getApiKey() {
  return (
    process.env.COHERE_API_KEY ||
    process.env.SETROUTE_COHERE_KEY ||
    ""
  );
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

  const key = getApiKey();
  if (!key) {
    res.statusCode = 503;
    return res.json({
      error: "cohere_not_configured",
      message: "Set COHERE_API_KEY in Vercel environment variables."
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const messages = Array.isArray(body.messages) ? body.messages.slice(0, 16) : null;
    if (!messages || messages.length === 0) {
      res.statusCode = 400;
      return res.json({ error: "messages_required" });
    }

    // Sanitize: only role/content strings, cap size
    const safeMessages = messages.map((m) => ({
      role: m.role === "assistant" || m.role === "system" ? m.role : "user",
      content: String(m.content || "").slice(0, 8000)
    }));

    const model = typeof body.model === "string" && body.model.length < 80
      ? body.model
      : DEFAULT_MODEL;
    const temperature = Number.isFinite(Number(body.temperature))
      ? Math.min(1, Math.max(0, Number(body.temperature)))
      : 0.15;

    const upstream = await fetch(COHERE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        model,
        messages: safeMessages,
        temperature
      })
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      res.statusCode = 502;
      return res.json({ error: "cohere_bad_json", status: upstream.status });
    }

    if (!upstream.ok) {
      res.statusCode = upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502;
      return res.json({
        error: "cohere_upstream",
        status: upstream.status,
        detail: (data && (data.message || data.error)) || null
      });
    }

    const reply = (((data.message || {}).content || [])[0]
      ? data.message.content[0].text
      : "") || "";

    res.statusCode = 200;
    return res.json({
      ok: true,
      text: String(reply).trim(),
      model
    });
  } catch (err) {
    console.error("[SetRoute intent]", err);
    res.statusCode = 500;
    return res.json({
      error: "intent_failed",
      message: err && err.message ? err.message : "error"
    });
  }
};
