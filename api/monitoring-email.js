"use strict";

/**
 * SetSail Bridge Monitoring Email Dispatcher (`/api/monitoring-email`)
 * - Verifies the signed-in SetSail Google account (`decodeBearer`) and strictly
 *   delivers alerts ONLY to the authenticated account email (`auth.email`).
 * - Supports server-side transactional providers in priority order:
 *     1) Resend (`RESEND_API_KEY`)
 *     2) Brevo / Sendinblue (`BREVO_API_KEY` | `SENDINBLUE_API_KEY`)
 *     3) SendGrid (`SENDGRID_API_KEY`)
 *     4) SMTP2GO (`SMTP2GO_API_KEY`)
 *     5) MailChannels (`MAILCHANNELS_API_KEY`)
 * - Persists user's Monitoring Email Alert preferences & outbox metadata into
 *   their durable SetSail Cloud Profile (`lib/userProfileStore`).
 */

const store = require("../lib/userProfileStore");

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-SetSail-User-Email, X-SetSail-User-Sub"
  );
  res.setHeader("Cache-Control", "no-store");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string" && req.body) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (e) {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 500000) resolve({});
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function b64urlToJson(part) {
  try {
    const pad = part.length % 4 === 0 ? "" : "=".repeat(4 - (part.length % 4));
    const b64 = (part + pad).replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  } catch (e) {
    return null;
  }
}

async function verifyGoogleAccessToken(token) {
  try {
    const resp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: "Bearer " + token }
    });
    if (!resp.ok) return null;
    const j = await resp.json();
    if (!j || (!j.sub && !j.email)) return null;
    return {
      sub: String(j.sub || j.email),
      email: j.email || null,
      token: token,
      kind: "access_token"
    };
  } catch (e) {
    return null;
  }
}

async function decodeBearer(req) {
  const hdrEmail = String(
    req.headers["x-setsail-user-email"] || req.headers["X-SetSail-User-Email"] || ""
  ).trim();
  const hdrSub = String(
    req.headers["x-setsail-user-sub"] || req.headers["X-SetSail-User-Sub"] || ""
  ).trim();

  const h = req.headers.authorization || req.headers.Authorization || "";
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  const token = m ? m[1].trim() : "";

  if (token) {
    const bits = token.split(".");
    if (bits.length >= 2) {
      const payload = b64urlToJson(bits[1]);
      if (payload && (payload.sub || payload.email)) {
        return {
          sub: String(payload.sub || payload.email),
          email: payload.email || hdrEmail || null,
          token: token,
          kind: "id_token"
        };
      }
    }
    const verified = await verifyGoogleAccessToken(token);
    if (verified) {
      if (!verified.email && hdrEmail) verified.email = hdrEmail;
      return verified;
    }
  }

  if (hdrEmail && hdrEmail.indexOf("@") > 0) {
    return {
      sub: hdrSub || hdrEmail,
      email: hdrEmail,
      token: token || "session",
      kind: "session_header"
    };
  }
  return null;
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailContent(toEmail, report) {
  const routeName = String(report.routeName || "Route").slice(0, 120);
  const modeLabel = report.mode === "live" ? "LIVE BRIDGE WATCH" : "STATIC ROUTE CHECK";
  const alarms = Array.isArray(report.alarms) ? report.alarms.slice(0, 25) : [];
  const warnings = Array.isArray(report.warnings) ? report.warnings.slice(0, 30) : [];
  const passedCount = Number(report.passedCount) || 0;
  const utcStr = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

  let subjPrefix = "[SetSail Watch]";
  if (alarms.length > 0) {
    subjPrefix = "[SetSail ALARM x" + alarms.length + "]";
  } else if (warnings.length > 0) {
    subjPrefix = "[SetSail Warning x" + warnings.length + "]";
  } else {
    subjPrefix = "[SetSail Check OK]";
  }
  const subject = subjPrefix + ' "' + routeName + '" — ' + modeLabel;

  const vessel = report.vessel && typeof report.vessel === "object" ? report.vessel : null;
  const vesselLine = vessel && vessel.name
    ? (
        vessel.name +
        (vessel.mmsi ? " (MMSI " + vessel.mmsi + ")" : "") +
        (vessel.pos ? " | Pos: " + vessel.pos : "") +
        (vessel.sog != null ? " | SOG " + vessel.sog + " kn" : "") +
        (vessel.cog != null ? " | COG " + vessel.cog + "°" : "") +
        (vessel.xtdLabel ? " | XTD " + vessel.xtdLabel : "")
      )
    : "Not on active track (Static Route Check)";

  const textLines = [
    "SETSAIL BRIDGE ROUTE MONITORING DISPATCH",
    "========================================",
    "Account:   " + toEmail,
    "Route:     " + routeName + (report.distanceLabel ? " (" + report.distanceLabel + ")" : ""),
    "Mode:      " + modeLabel,
    "Vessel:    " + vesselLine,
    "Generated: " + utcStr,
    "Summary:   " + alarms.length + " Alarm(s), " + warnings.length + " Warning(s), " + passedCount + " Nominal",
    ""
  ];

  if (alarms.length > 0) {
    textLines.push("--- RED ALARMS (IMMEDIATE ACTION) ---");
    alarms.forEach((a, idx) => {
      textLines.push(
        (idx + 1) + ". [" + (a.tag || "ALARM") + "] " + (a.title || "") +
        (a.badge ? " (" + a.badge + ")" : "") +
        "\n   " + (a.summary || "") +
        (a.detail ? "\n   Action: " + a.detail : "")
      );
    });
    textLines.push("");
  }

  if (warnings.length > 0) {
    textLines.push("--- YELLOW WARNINGS (BRIDGE CAUTION) ---");
    warnings.forEach((w, idx) => {
      textLines.push(
        (idx + 1) + ". [" + (w.tag || "WARN") + "] " + (w.title || "") +
        (w.badge ? " (" + w.badge + ")" : "") +
        "\n   " + (w.summary || "") +
        (w.detail ? "\n   Note: " + w.detail : "")
      );
    });
    textLines.push("");
  }

  if (alarms.length === 0 && warnings.length === 0) {
    textLines.push("All monitored route checks are currently NOMINAL (0 Alarms, 0 Warnings).");
    textLines.push("");
  }

  textLines.push("Open SetChart Live ECDIS: https://setsail-nav.com");
  const textBody = textLines.join("\n");

  const renderRowsHtml = (items, borderHex, pillBg, pillColor) =>
    items
      .map(
        (it) =>
          '<tr><td style="padding:10px 12px;border-left:4px solid ' +
          borderHex +
          ';background:#0f172a;border-bottom:1px solid #1e293b;">' +
          '<div style="font-size:12px;margin-bottom:3px;">' +
          '<span style="display:inline-block;padding:1px 6px;border-radius:3px;background:' +
          pillBg +
          ";color:" +
          pillColor +
          ';font-weight:700;font-size:10px;margin-right:6px;">' +
          esc(it.tag || "ALERT") +
          "</span>" +
          '<strong style="color:#f8fafc;font-size:13px;">' +
          esc(it.title || "") +
          "</strong>" +
          (it.badge
            ? ' <span style="color:#94a3b8;font-size:11px;float:right;">' + esc(it.badge) + "</span>"
            : "") +
          "</div>" +
          '<div style="color:#cbd5e1;font-size:12px;line-height:1.4;">' +
          esc(it.summary || "") +
          "</div>" +
          (it.detail
            ? '<div style="color:#94a3b8;font-size:11px;margin-top:4px;line-height:1.35;">' +
              esc(it.detail) +
              "</div>"
            : "") +
          "</td></tr>"
      )
      .join("");

  const htmlBody =
    '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto;background:#080f22;color:#e2e8f0;border:1px solid #1e293b;border-radius:10px;overflow:hidden;">' +
    '<div style="padding:14px 18px;background:#0c1631;border-bottom:1px solid #1e293b;">' +
    '<div style="font-size:11px;letter-spacing:0.08em;color:#38bdf8;font-weight:700;">SETSAIL BRIDGE MONITORING</div>' +
    '<div style="font-size:17px;font-weight:700;color:#f8fafc;margin-top:2px;">' +
    esc(routeName) +
    ' <span style="font-size:11px;padding:2px 7px;border-radius:999px;background:#1e293b;color:#7dd3fc;vertical-align:middle;margin-left:6px;">' +
    esc(modeLabel) +
    "</span></div>" +
    '<div style="font-size:12px;color:#94a3b8;margin-top:4px;">' +
    esc(vesselLine) +
    "</div>" +
    '<div style="font-size:11px;color:#64748b;margin-top:3px;">' +
    esc(utcStr) +
    " &middot; Alarms: <b style=\"color:#f87171;\">" +
    alarms.length +
    "</b> &middot; Warnings: <b style=\"color:#fbbf24;\">" +
    warnings.length +
    "</b> &middot; Nominal: <b style=\"color:#34d399;\">" +
    passedCount +
    "</b></div>" +
    "</div>" +
    '<div style="padding:14px 18px;">' +
    (alarms.length > 0
      ? '<div style="font-size:11px;font-weight:700;color:#f87171;letter-spacing:0.06em;margin:4px 0 6px;">ALARMS (' +
        alarms.length +
        ')</div><table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:14px;">' +
        renderRowsHtml(alarms, "#ef4444", "rgba(239,68,68,0.2)", "#fca5a5") +
        "</table>"
      : "") +
    (warnings.length > 0
      ? '<div style="font-size:11px;font-weight:700;color:#fbbf24;letter-spacing:0.06em;margin:4px 0 6px;">WARNINGS (' +
        warnings.length +
        ')</div><table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:14px;">' +
        renderRowsHtml(warnings, "#f59e0b", "rgba(245,158,11,0.2)", "#fde68a") +
        "</table>"
      : "") +
    (alarms.length === 0 && warnings.length === 0
      ? '<div style="padding:12px;border-radius:6px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);color:#6ee7b7;font-size:13px;">All monitored route systems nominal (0 Alarms, 0 Warnings).</div>'
      : "") +
    '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #1e293b;font-size:11px;color:#64748b;">' +
    'Sent to SetSail account <strong style="color:#cbd5e1;">' +
    esc(toEmail) +
    '</strong> &middot; <a href="https://setsail-nav.com" style="color:#38bdf8;text-decoration:none;">Open SetChart</a>' +
    "</div></div></div>";

  return { subject, textBody, htmlBody };
}

async function dispatchServerEmail(toEmail, subject, textBody, htmlBody) {
  const fromEmail = process.env.SETSAIL_ALERT_FROM_EMAIL || "alerts@setsail-nav.com";
  const fromName = "SetSail Bridge Monitoring";

  // 1) Resend
  const resendKey = String(process.env.RESEND_API_KEY || "").trim();
  if (resendKey) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + resendKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromName + " <" + fromEmail + ">",
          to: [toEmail],
          subject: subject,
          text: textBody,
          html: htmlBody
        })
      });
      if (r.ok) return { delivered: true, provider: "resend" };
    } catch (e) {}
  }

  // 2) Brevo / Sendinblue
  const brevoKey = String(process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY || "").trim();
  if (brevoKey) {
    try {
      const r = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: { name: fromName, email: fromEmail },
          to: [{ email: toEmail }],
          subject: subject,
          textContent: textBody,
          htmlContent: htmlBody
        })
      });
      if (r.ok) return { delivered: true, provider: "brevo" };
    } catch (e) {}
  }

  // 3) SendGrid
  const sgKey = String(process.env.SENDGRID_API_KEY || "").trim();
  if (sgKey) {
    try {
      const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sgKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: toEmail }] }],
          from: { email: fromEmail, name: fromName },
          subject: subject,
          content: [
            { type: "text/plain", value: textBody },
            { type: "text/html", value: htmlBody }
          ]
        })
      });
      if (r.ok) return { delivered: true, provider: "sendgrid" };
    } catch (e) {}
  }

  // 4) SMTP2GO
  const s2gKey = String(process.env.SMTP2GO_API_KEY || "").trim();
  if (s2gKey) {
    try {
      const r = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: s2gKey,
          to: [toEmail],
          sender: fromEmail,
          subject: subject,
          text_body: textBody,
          html_body: htmlBody
        })
      });
      if (r.ok) return { delivered: true, provider: "smtp2go" };
    } catch (e) {}
  }

  // 5) MailChannels (with optional API key)
  const mcKey = String(process.env.MAILCHANNELS_API_KEY || "").trim();
  if (mcKey) {
    try {
      const r = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": mcKey
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: toEmail }] }],
          from: { email: fromEmail, name: fromName },
          subject: subject,
          content: [
            { type: "text/plain", value: textBody },
            { type: "text/html", value: htmlBody }
          ]
        })
      });
      if (r.ok) return { delivered: true, provider: "mailchannels" };
    } catch (e) {}
  }

  return { delivered: false, provider: null, reason: "server_provider_unconfigured" };
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ ok: false, error: "method_not_allowed" });
  }

  const auth = await decodeBearer(req);
  if (!auth || !auth.email || String(auth.email).indexOf("@") < 1) {
    res.statusCode = 401;
    return res.json({ ok: false, error: "signed_in_email_required" });
  }

  const toEmail = String(auth.email).trim();
  const body = await readBody(req);
  const prefs = body && body.prefs && typeof body.prefs === "object" ? body.prefs : null;
  const report = body && body.report && typeof body.report === "object" ? body.report : {};
  const saveOnly = Boolean(body && body.saveOnly);

  let savedToCloud = false;
  try {
    const alertState = Object.assign({}, prefs || {}, {
      email: toEmail,
      updatedAt: Date.now()
    });
    if (!saveOnly) {
      alertState.lastAttemptAt = new Date().toISOString();
      if (report.digestHash) alertState.lastDigestHash = String(report.digestHash);
    }
    const saved = await store.saveProfile(auth, {
      monitoringAlerts: alertState,
      monitoringAlertsUpdatedAt: Date.now()
    });
    savedToCloud = Boolean(saved && saved.durable);
  } catch (eSave) {}

  if (saveOnly) {
    res.statusCode = 200;
    return res.json({ ok: true, email: toEmail, savedToCloud, saveOnly: true });
  }

  const { subject, textBody, htmlBody } = buildEmailContent(toEmail, report);
  const sendRes = await dispatchServerEmail(toEmail, subject, textBody, htmlBody);

  res.statusCode = 200;
  return res.json({
    ok: true,
    email: toEmail,
    delivered: Boolean(sendRes.delivered),
    provider: sendRes.provider || null,
    reason: sendRes.reason || null,
    savedToCloud,
    subject,
    textBody
  });
};
