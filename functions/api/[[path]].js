/**
 * Cloudflare Pages Functions catch-all for legacy Vercel /api/* handlers.
 * Static imports so esbuild can bundle the existing CJS modules from /api.
 */
import { runVercelHandler } from "../_lib/runVercelHandler.js";

import utc from "../../api/utc.js";
import track from "../../api/track.js";
import stats from "../../api/stats.js";
import userProfile from "../../api/user-profile.js";
import monitoringEmail from "../../api/monitoring-email.js";
import setrouteIntent from "../../api/setroute-intent.js";
import turnstileConfig from "../../api/turnstile-config.js";
import turnstileVerify from "../../api/turnstile-verify.js";
import v1Keys from "../../api/v1/keys.js";
import v1Routes from "../../api/v1/routes.js";
import v1Route from "../../api/v1/route.js";
import v1Chart from "../../api/v1/chart.js";

const HANDLERS = {
  utc,
  track,
  stats,
  "user-profile": userProfile,
  "monitoring-email": monitoringEmail,
  "setroute-intent": setrouteIntent,
  "turnstile-config": turnstileConfig,
  "turnstile-verify": turnstileVerify,
  "v1/keys": v1Keys,
  "v1/routes": v1Routes,
  "v1/route": v1Route,
  "v1/chart": v1Chart
};

function resolveKey(params) {
  const p = params && params.path;
  if (Array.isArray(p)) return p.filter(Boolean).join("/");
  if (typeof p === "string") return p.replace(/^\/+|\/+$/g, "");
  return "";
}

function asHandler(mod) {
  if (typeof mod === "function") return mod;
  if (mod && typeof mod.default === "function") return mod.default;
  if (mod && typeof mod.handler === "function") return mod.handler;
  return null;
}

export async function onRequest(context) {
  const key = resolveKey(context.params);
  const handler = asHandler(HANDLERS[key]);
  if (!key || !handler) {
    return new Response(JSON.stringify({ error: "not_found", path: key || null }), {
      status: 404,
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
