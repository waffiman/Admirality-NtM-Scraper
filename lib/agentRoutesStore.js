"use strict";

/**
 * Persist Agent-API routes per Google account email (GitHub JSON).
 * Falls back to ephemeral memory when SETSAIL_ANALYTICS_GITHUB_TOKEN is absent.
 */

const crypto = require("crypto");

const REPO = process.env.SETSAIL_ANALYTICS_REPO || "waffiman/Admirality-NtM-Scraper";
const FILE_PATH = process.env.SETSAIL_AGENT_ROUTES_PATH || "analytics/agent_routes.json";
const BRANCH = process.env.SETSAIL_ANALYTICS_BRANCH || "main";
const MAX_PER_USER = 40;

const memoryStore = { byEmail: {}, updatedAt: null };

function githubToken() {
  return (
    process.env.SETSAIL_ANALYTICS_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  ).trim();
}

function emptyDb() {
  return { version: 1, updatedAt: null, byEmail: {} };
}

async function githubRequest(method, urlPath, body) {
  const token = githubToken();
  if (!token) throw new Error("NO_TOKEN");
  const res = await fetch(`https://api.github.com${urlPath}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "SetSail-AgentRoutes",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    json = { raw: text };
  }
  if (!res.ok) {
    const err = new Error((json && json.message) || `GitHub HTTP ${res.status}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

async function loadDb() {
  if (!githubToken()) {
    return { db: { ...emptyDb(), byEmail: { ...memoryStore.byEmail } }, sha: null, ephemeral: true };
  }
  try {
    const encPath = FILE_PATH.split("/").map(encodeURIComponent).join("/");
    const data = await githubRequest(
      "GET",
      `/repos/${REPO}/contents/${encPath}?ref=${encodeURIComponent(BRANCH)}`
    );
    const content = Buffer.from(data.content || "", "base64").toString("utf8");
    const db = content ? JSON.parse(content) : emptyDb();
    return { db: { ...emptyDb(), ...db, byEmail: db.byEmail || {} }, sha: data.sha, ephemeral: false };
  } catch (e) {
    if (e.status === 404) return { db: emptyDb(), sha: null, ephemeral: false };
    throw e;
  }
}

async function saveDb(db, sha) {
  const next = {
    version: 1,
    updatedAt: new Date().toISOString(),
    byEmail: db.byEmail || {}
  };
  if (!githubToken()) {
    memoryStore.byEmail = next.byEmail;
    memoryStore.updatedAt = next.updatedAt;
    return { db: next, ephemeral: true };
  }
  const encPath = FILE_PATH.split("/").map(encodeURIComponent).join("/");
  const body = {
    message: `chore(agent-routes): sync ${next.updatedAt}`,
    content: Buffer.from(JSON.stringify(next, null, 2), "utf8").toString("base64"),
    branch: BRANCH
  };
  if (sha) body.sha = sha;
  await githubRequest("PUT", `/repos/${REPO}/contents/${encPath}`, body);
  return { db: next, ephemeral: false };
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function compactRoute(route, ownerEmail) {
  const wps = Array.isArray(route.waypoints)
    ? route.waypoints.slice(0, 200).map((w, i) => ({
        i,
        lat: Number(w.lat),
        lon: Number(w.lon),
        name: w.name ? String(w.name).slice(0, 48) : undefined
      }))
    : [];
  return {
    id: String(route.id || ("agent-" + crypto.randomBytes(6).toString("hex"))),
    name: String(route.name || "Agent passage").slice(0, 80),
    source: "agent_api",
    mode: String(route.mode || "great_circle").slice(0, 32),
    distanceNm: Number(route.distanceNm) || 0,
    speedKn: Number(route.speedKn) || 14,
    etaHours: Number(route.etaHours) || null,
    waypoints: wps,
    owner: normalizeEmail(ownerEmail),
    createdAt: route.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

async function saveAgentRoute(email, route) {
  const owner = normalizeEmail(email);
  if (!owner || !route) return { ok: false, reason: "bad_input" };

  let attempt = 0;
  while (attempt < 3) {
    attempt += 1;
    const loaded = await loadDb();
    const db = loaded.db;
    if (!db.byEmail[owner]) db.byEmail[owner] = [];
    const entry = compactRoute(route, owner);
    const list = db.byEmail[owner].filter((r) => r.id !== entry.id);
    list.unshift(entry);
    db.byEmail[owner] = list.slice(0, MAX_PER_USER);
    try {
      await saveDb(db, loaded.sha);
      return { ok: true, route: entry, ephemeral: !!loaded.ephemeral };
    } catch (e) {
      if (e.status === 409 && attempt < 3) continue;
      if (e.message === "NO_TOKEN" || e.code === "NO_TOKEN") {
        memoryStore.byEmail[owner] = db.byEmail[owner];
        return { ok: true, route: entry, ephemeral: true };
      }
      throw e;
    }
  }
  return { ok: false, reason: "conflict" };
}

async function listAgentRoutes(email) {
  const owner = normalizeEmail(email);
  if (!owner) return [];
  const loaded = await loadDb();
  const list = (loaded.db.byEmail && loaded.db.byEmail[owner]) || [];
  return list.slice(0, MAX_PER_USER);
}

module.exports = {
  saveAgentRoute,
  listAgentRoutes,
  compactRoute
};
