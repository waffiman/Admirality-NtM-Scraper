"use strict";

/**
 * SetRoute Core B — multi-provider intent proxy (Gemini primary, Cohere fallback).
 * Env: GEMINI_API_KEY | SETROUTE_GEMINI_KEY, COHERE_API_KEY | SETROUTE_COHERE_KEY
 * Geometry is NEVER produced here — intent / exception hints only.
 */

const COHERE_URL = "https://api.cohere.com/v2/chat";
const COHERE_MODEL = "command-r-08-2024";
const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-flash-latest"];
const COHERE_KEY_B64 = "QzdoRFdmaFlER0JpRnJHdE5uNVBKNlNJdE8xdHgxRXFYa2YydDRyUg==";
/* Gemini key fallback (prefer Vercel env). Rotate if leaked. */
const GEMINI_KEY_B64 = "QUlemFN5RGN6QWVEVkxIWTlHdkpKQnZJYzEyQVowZ24zbDFaYW9R";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function decodeB64(s) {
  try {
    return Buffer.from(s, "base64").toString("utf8");
  } catch (e) {
    return "";
  }
}

function getGeminiKey() {
  return process.env.GEMINI_API_KEY || process.env.SETROUTE_GEMINI_KEY || decodeB64(GEMINI_KEY_B64) || "";
}

function getCohereKey() {
  return process.env.COHERE_API_KEY || process.env.SETROUTE_COHERE_KEY || decodeB64(COHERE_KEY_B64) || "";
}

function messagesToGeminiContents(messages) {
  const systemParts = [];
  const contents = [];
  for (const m of messages) {
    const text = String(m.content || "").slice(0, 8000);
    if (!text) continue;
    if (m.role === "system") {
      systemParts.push(text);
      continue;
    }
    const role = m.role === "assistant" ? "model" : "user";
    contents.push({ role, parts: [{ text }] });
  }
  return {
    systemInstruction: systemParts.length
      ? { parts: [{ text: systemParts.join("\n\n") }] }
      : null,
    contents
  };
}

function extractGeminiText(data) {
  const cands = (data && data.candidates) || [];
  for (const c of cands) {
    const parts = (((c || {}).content || {}).parts) || [];
    const t = parts.map((p) => p.text || "").join("");
    if (t.trim()) return t.trim();
  }
  return "";
}

async function callGemini(messages, temperature, preferredModel) {
  const key = getGeminiKey();
  if (!key) return { ok: false, error: "gemini_not_configured" };

  const { systemInstruction, contents } = messagesToGeminiContents(messages);
  if (!contents.length) return { ok: false, error: "messages_required" };

  const models = preferredModel && preferredModel.indexOf("gemini") === 0
    ? [preferredModel, ...GEMINI_MODELS.filter((m) => m !== preferredModel)]
    : GEMINI_MODELS.slice();

  let lastErr = null;
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
      const body = {
        contents,
        generationConfig: {
          temperature: Number.isFinite(temperature) ? temperature : 0.15,
          maxOutputTokens: 2048
        }
      };
      if (systemInstruction) body.systemInstruction = systemInstruction;

      const upstream = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body)
      });
      const text = await upstream.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        lastErr = { status: upstream.status, error: "gemini_bad_json" };
        continue;
      }
      if (!upstream.ok) {
        lastErr = {
          status: upstream.status,
          error: "gemini_upstream",
          detail: (data.error && data.error.message) || null
        };
        // Try next model on quota / not found
        if (upstream.status === 429 || upstream.status === 404) continue;
        continue;
      }
      const reply = extractGeminiText(data);
      return { ok: true, text: reply, model, provider: "gemini" };
    } catch (e) {
      lastErr = { error: "gemini_fetch", message: e && e.message ? e.message : "error" };
    }
  }
  return { ok: false, ...(lastErr || { error: "gemini_failed" }) };
}

async function callCohere(messages, temperature, preferredModel) {
  const key = getCohereKey();
  if (!key) return { ok: false, error: "cohere_not_configured" };

  const model = preferredModel && preferredModel.indexOf("command") === 0
    ? preferredModel
    : COHERE_MODEL;

  const upstream = await fetch(COHERE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: Number.isFinite(temperature) ? temperature : 0.15
    })
  });

  const text = await upstream.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: "cohere_bad_json", status: upstream.status };
  }
  if (!upstream.ok) {
    return {
      ok: false,
      error: "cohere_upstream",
      status: upstream.status,
      detail: (data && (data.message || data.error)) || null
    };
  }
  const reply = (((data.message || {}).content || [])[0]
    ? data.message.content[0].text
    : "") || "";
  return { ok: true, text: String(reply).trim(), model, provider: "cohere" };
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
    const messages = Array.isArray(body.messages) ? body.messages.slice(0, 16) : null;
    if (!messages || messages.length === 0) {
      res.statusCode = 400;
      return res.json({ error: "messages_required" });
    }

    const safeMessages = messages.map((m) => ({
      role: m.role === "assistant" || m.role === "system" ? m.role : "user",
      content: String(m.content || "").slice(0, 8000)
    }));

    const preferredModel = typeof body.model === "string" && body.model.length < 80
      ? body.model
      : "";
    const temperature = Number.isFinite(Number(body.temperature))
      ? Math.min(1, Math.max(0, Number(body.temperature)))
      : 0.15;

    // Prefer Gemini (stronger free intent); fall back to Cohere
    let result = await callGemini(safeMessages, temperature, preferredModel);
    if (!result.ok) {
      const cohere = await callCohere(safeMessages, temperature, preferredModel);
      if (cohere.ok) result = cohere;
      else {
        res.statusCode = 502;
        return res.json({
          error: "intent_providers_failed",
          gemini: result,
          cohere
        });
      }
    }

    res.statusCode = 200;
    return res.json({
      ok: true,
      text: result.text,
      model: result.model,
      provider: result.provider || "unknown"
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
