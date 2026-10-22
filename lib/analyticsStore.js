"use strict";

const REPO = process.env.SETSAIL_ANALYTICS_REPO || "waffiman/Admirality-NtM-Scraper";
const FILE_PATH = process.env.SETSAIL_ANALYTICS_PATH || "analytics/stats.json";
const BRANCH = process.env.SETSAIL_ANALYTICS_BRANCH || "main";
const KEEP_DAYS = 120;

function emptyStats() {
  return {
    version: 1,
    updatedAt: null,
    visitsByDay: {},
    visitSidsByDay: {},
    profiles: {}
  };
}

function githubToken() {
  return (
    process.env.SETSAIL_ANALYTICS_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  ).trim();
}

function dayKey(d = new Date()) {
  const x = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(x.getTime())) return dayKey(new Date());
  return x.toISOString().slice(0, 10);
}

function pruneStats(stats) {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - KEEP_DAYS);
  const cut = cutoff.toISOString().slice(0, 10);
  Object.keys(stats.visitsByDay || {}).forEach((k) => {
    if (k < cut) delete stats.visitsByDay[k];
  });
  Object.keys(stats.visitSidsByDay || {}).forEach((k) => {
    if (k < cut) delete stats.visitSidsByDay[k];
  });
  return stats;
}

async function githubRequest(method, urlPath, body) {
  const token = githubToken();
  if (!token) throw new Error("SETSAIL_ANALYTICS_GITHUB_TOKEN not configured");
  const res = await fetch(`https://api.github.com${urlPath}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "SetSail-Analytics",
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

async function readStatsFromGitHub() {
  const encPath = FILE_PATH.split("/").map(encodeURIComponent).join("/");
  const data = await githubRequest(
    "GET",
    `/repos/${REPO}/contents/${encPath}?ref=${encodeURIComponent(BRANCH)}`
  );
  const content = Buffer.from(data.content || "", "base64").toString("utf8");
  const stats = content ? JSON.parse(content) : emptyStats();
  return { stats: pruneStats({ ...emptyStats(), ...stats }), sha: data.sha };
}

async function readStatsFromStatic() {
  try {
    const base =
      process.env.SETSAIL_PUBLIC_BASE ||
      process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
      "https://setsail-ai.vercel.app";
    const res = await fetch(`${String(base).replace(/\/$/, "")}/analytics/stats.json`, {
      cache: "no-store"
    });
    if (!res.ok) return emptyStats();
    const stats = await res.json();
    return pruneStats({ ...emptyStats(), ...stats });
  } catch (e) {
    return emptyStats();
  }
}

async function loadStats() {
  if (githubToken()) {
    try {
      return await readStatsFromGitHub();
    } catch (e) {
      if (e.status === 404) return { stats: emptyStats(), sha: null };
      throw e;
    }
  }
  return { stats: await readStatsFromStatic(), sha: null, readOnly: true };
}

async function saveStats(stats, sha) {
  const token = githubToken();
  if (!token) {
    const err = new Error("Analytics persistence not configured");
    err.code = "NO_TOKEN";
    throw err;
  }
  const next = pruneStats({ ...stats, updatedAt: new Date().toISOString(), version: 1 });
  const encPath = FILE_PATH.split("/").map(encodeURIComponent).join("/");
  const body = {
    message: `chore(analytics): update stats ${next.updatedAt}`,
    content: Buffer.from(JSON.stringify(next, null, 2), "utf8").toString("base64"),
    branch: BRANCH
  };
  if (sha) body.sha = sha;
  await githubRequest("PUT", `/repos/${REPO}/contents/${encPath}`, body);
  return next;
}

function summarize(stats, fromDay, toDay) {
  const visitsByDay = stats.visitsByDay || {};
  const days = Object.keys(visitsByDay).sort();
  const from = fromDay || (days[0] || dayKey());
  const to = toDay || dayKey();
  let visitors = 0;
  const series = [];
  days.forEach((d) => {
    if (d < from || d > to) return;
    const n = Number(visitsByDay[d]) || 0;
    visitors += n;
    series.push({ day: d, visitors: n });
  });
  const profiles = stats.profiles || {};
  const profileCount = Object.keys(profiles).length;
  return {
    from,
    to,
    visitors,
    series,
    profilesTotal: profileCount,
    updatedAt: stats.updatedAt || null,
    persistence: githubToken() ? "github" : "static-readonly"
  };
}

async function recordVisit(sid, day) {
  const d = day || dayKey();
  const sidSafe = String(sid || "").slice(0, 64);
  if (!sidSafe) return { ok: false, reason: "no_sid" };

  let attempt = 0;
  while (attempt < 3) {
    attempt += 1;
    const loaded = await loadStats();
    if (loaded.readOnly) {
      return { ok: false, reason: "read_only", summary: summarize(loaded.stats, d, d) };
    }
    const stats = loaded.stats;
    if (!stats.visitSidsByDay[d]) stats.visitSidsByDay[d] = [];
    const list = stats.visitSidsByDay[d];
    if (list.includes(sidSafe)) {
      return { ok: true, duplicate: true, summary: summarize(stats, d, d) };
    }
    list.push(sidSafe);
    if (list.length > 5000) list.splice(0, list.length - 5000);
    stats.visitsByDay[d] = (Number(stats.visitsByDay[d]) || 0) + 1;
    try {
      await saveStats(stats, loaded.sha);
      return { ok: true, summary: summarize(stats, d, d) };
    } catch (e) {
      if (e.status === 409 && attempt < 3) continue;
      throw e;
    }
  }
  return { ok: false, reason: "conflict" };
}

async function recordLogin(emailHash, day) {
  const d = day || dayKey();
  const hash = String(emailHash || "").slice(0, 64);
  if (!hash || hash.length < 16) return { ok: false, reason: "no_hash" };

  let attempt = 0;
  while (attempt < 3) {
    attempt += 1;
    const loaded = await loadStats();
    if (loaded.readOnly) {
      return { ok: false, reason: "read_only", profilesTotal: Object.keys(loaded.stats.profiles || {}).length };
    }
    const stats = loaded.stats;
    const prev = stats.profiles[hash] || null;
    stats.profiles[hash] = {
      firstSeen: (prev && prev.firstSeen) || new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      lastDay: d
    };
    try {
      await saveStats(stats, loaded.sha);
      return {
        ok: true,
        isNew: !prev,
        profilesTotal: Object.keys(stats.profiles).length
      };
    } catch (e) {
      if (e.status === 409 && attempt < 3) continue;
      throw e;
    }
  }
  return { ok: false, reason: "conflict" };
}

module.exports = {
  emptyStats,
  dayKey,
  loadStats,
  summarize,
  recordVisit,
  recordLogin,
  githubToken,
  ADMIN_EMAIL: "michael200686@gmail.com",
  GOOGLE_CLIENT_ID:
    process.env.SETSAIL_GOOGLE_CLIENT_ID ||
    "1072660724894-mbo68vdrl6t3a66s048qdhv8jb6sl6kd.apps.googleusercontent.com"
};
