/**
 * Adapt Cloudflare Pages Function Request → Vercel-style (req, res) handlers.
 */
export async function runVercelHandler(handler, request, env) {
  if (env && typeof process !== "undefined" && process.env) {
    for (const [k, v] of Object.entries(env)) {
      if (v == null) continue;
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        process.env[k] = String(v);
      }
    }
    if (!process.env.SETSAIL_PUBLIC_BASE) {
      try {
        process.env.SETSAIL_PUBLIC_BASE = new URL(request.url).origin;
      } catch (_) {}
    }
  }

  const url = new URL(request.url);
  let body = undefined;
  if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
    const text = await request.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch (_) {
        body = text;
      }
    } else {
      body = {};
    }
  }

  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const req = {
    method: request.method,
    url: url.pathname + url.search,
    headers,
    body,
    query: Object.fromEntries(url.searchParams.entries()),
    _cfAssets: env && env.ASSETS && typeof env.ASSETS.fetch === "function" ? env.ASSETS : null,
    on() {}
  };

  let statusCode = 200;
  const resHeaders = {};
  const chunks = [];
  let ended = false;

  const res = {
    get statusCode() {
      return statusCode;
    },
    set statusCode(v) {
      statusCode = Number(v) || 200;
    },
    setHeader(k, v) {
      resHeaders[String(k)] = String(v);
    },
    getHeader(k) {
      return resHeaders[String(k)];
    },
    status(code) {
      statusCode = Number(code) || 200;
      return res;
    },
    json(obj) {
      if (!resHeaders["Content-Type"] && !resHeaders["content-type"]) {
        resHeaders["Content-Type"] = "application/json; charset=utf-8";
      }
      chunks.push(JSON.stringify(obj));
      ended = true;
      return res;
    },
    end(data) {
      if (data != null && data !== "") chunks.push(typeof data === "string" ? data : String(data));
      ended = true;
      return res;
    },
    send(data) {
      return res.end(data);
    }
  };

  await handler(req, res);

  if (!ended && chunks.length === 0 && statusCode === 200) {
    // handler set status only
  }

  const payload = chunks.length ? chunks.join("") : null;
  return new Response(payload, { status: statusCode, headers: resHeaders });
}
