/**
 * Cloudflare Worker (static assets + /api/*).
 * Use when the project is deployed as a Worker with Assets, not classic Pages Functions.
 */
import { runVercelHandler } from "./functions/_lib/runVercelHandler.js";

import utc from "./api/utc.js";
import track from "./api/track.js";
import stats from "./api/stats.js";
import userProfile from "./api/user-profile.js";
import setrouteIntent from "./api/setroute-intent.js";
import turnstileConfig from "./api/turnstile-config.js";
import turnstileVerify from "./api/turnstile-verify.js";
import v1Keys from "./api/v1/keys.js";
import v1Routes from "./api/v1/routes.js";
import v1Route from "./api/v1/route.js";
import v1Chart from "./api/v1/chart.js";

const HANDLERS = {
  utc,
  track,
  stats,
  "user-profile": userProfile,
  "setroute-intent": setrouteIntent,
  "turnstile-config": turnstileConfig,
  "turnstile-verify": turnstileVerify,
  "v1/keys": v1Keys,
  "v1/routes": v1Routes,
  "v1/route": v1Route,
  "v1/chart": v1Chart
};

function asHandler(mod) {
  if (typeof mod === "function") return mod;
  if (mod && typeof mod.default === "function") return mod.default;
  if (mod && typeof mod.handler === "function") return mod.handler;
  return null;
}

function apiKeyFromPath(pathname) {
  const m = String(pathname || "").match(/^\/api\/(.+?)\/?$/);
  if (!m) return "";
  return m[1].replace(/\/+$/g, "");
}

export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      const key = apiKeyFromPath(url.pathname);
      const handler = asHandler(HANDLERS[key]);
      if (!handler) {
        return new Response(JSON.stringify({ error: "not_found", path: key || null }), {
          status: 404,
          headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
        });
      }
      try {
        return await runVercelHandler(handler, request, env);
      } catch (err) {
        console.error("[SetSail worker api]", key, err);
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

    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }
    return new Response("Not found", { status: 404 });
  }
};
