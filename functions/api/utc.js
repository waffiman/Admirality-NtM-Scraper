/** Direct ESM fallback for /api/utc (also covered by [[path]]). */
export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-store"
      }
    });
  }
  const ms = Date.now();
  const iso = new Date(ms).toISOString();
  if (context.request.method === "HEAD") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Date: new Date(ms).toUTCString(),
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  }
  return new Response(JSON.stringify({ ok: true, utcMs: ms, utc: iso }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Date: new Date(ms).toUTCString(),
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}
