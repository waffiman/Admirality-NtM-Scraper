/**
 * Cloudflare Pages Functions catch-all for legacy Vercel /api/* handlers.
 * Maps /api/utc, /api/v1/keys, etc. onto the existing Node CJS modules in /api.
 */
import { createRequire } from "node:module";
import { runVercelHandler } from "../_lib/runVercelHandler.js";

const require = createRequire(import.meta.url);

const HANDLERS = {
  utc: () => require("../../api/utc.js"),
  track: () => require("../../api/track.js"),
  stats: () => require("../../api/stats.js"),
  "user-profile": () => require("../../api/user-profile.js"),
  "setroute-intent": () => require("../../api/setroute-intent.js"),
  "turnstile-config": () => require("../../api/turnstile-config.js"),
  "turnstile-verify": () => require("../../api/turnstile-verify.js"),
  "v1/keys": () => require("../../api/v1/keys.js"),
  "v1/routes": () => require("../../api/v1/routes.js"),
  "v1/route": () => require("../../api/v1/route.js"),
  "v1/chart": () => require("../../api/v1/chart.js")
};

function resolveKey(params) {
  const p = params && params.path;
  if (Array.isArray(p)) return p.filter(Boolean).join("/");
  if (typeof p === "string") return p.replace(/^\/+|\/+$/g, "");
  return "";
}

function loadHandler(key) {
  const factory = HANDLERS[key];
  if (!factory) return null;
  const mod = factory();
  if (typeof mod === "function") return mod;
  if (mod && typeof mod.default === "function") return mod.default;
  if (mod && typeof mod.handler === "function") return mod.handler;
  return null;
}

export async function onRequest(context) {
  const key = resolveKey(context.params);
  if (!key || !HANDLERS[key]) {
    return new Response(JSON.stringify({ error: "not_found", path: key || null }), {
      status: 404,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  let handler;
  try {
    handler = loadHandler(key);
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "handler_load_failed",
        path: key,
        message: err && err.message ? err.message : "error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
      }
    );
  }

  if (!handler) {
    return new Response(JSON.stringify({ error: "handler_invalid", path: key }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  try {
    return await runVercelHandler(handler, context.request, context.env);
  } catch (err) {
    console.error("[SetSail CF api]", key, err);
    return new Response(
      JSON.stringify({
        error: "api_failed",
        path: key,
        message: err && err.message ? err.message : "error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
      }
    );
  }
}
