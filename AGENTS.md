# SetSail — Agent Playbook

**Source of truth:** https://github.com/waffiman/Admirality-NtM-Scraper (`main`) / https://setsail-ai.vercel.app

**Local workspace (use this):** `E:\IINO INEOS VESTA\SetSail_App\`

Open Antigravity / Cursor / other agents **here**. Do **not** use the old `SetSail\` folder (NTFS WinError 1392).

| Path | Role |
|------|------|
| `SetSail_App\` | **Primary local project** — all assets, edits, agent root |
| `_setsail_server_mirror\` | Extra healthy mirror (legacy) |
| `SetSail\` | **Corrupt — do not edit** |
| `_setsail_archive\` | Old backups only |
| `C:\Users\micha\setsail_work_v58\` | Optional C: deploy/work copy |

## Open locally
- Prefer: `OPEN_SETSAIL.html` or `index.html` in `SetSail_App\`
- Or live: https://setsail-ai.vercel.app

## Before any edit
1. Pull latest `index.html`, `sw.js`, `assets/Auto NtM Plotting/*`, data JSON from GitHub or Vercel.
2. Edit only in `SetSail_App\` (or the C: work copy if E: fails).
3. Push to `main`, then sync back into `SetSail_App\`.

## Do not
- Invent Google login forms (official GIS/OAuth popup only).
- Force navigation to Home on load.
- Trust flash/`SetSail\` copies over the server when they disagree.
- Scrape MarineTraffic / VesselFinder (ToS forbid automated extraction; use Digitraffic / licensed APIs / open feeds only).

## Google Sign-In
Authorized JavaScript origins must include:
- `https://setsail-ai.vercel.app`
- `http://localhost` (for local tests)

## SetRoute Core A (edit this for routing skills)
Standalone module (safe for Antigravity / Claude / other agents):
- `assets/Auto NtM Plotting/setroute_core_a.js`

Add TSS / COLREG / shoal / weather costing skills **here**. Keep chat UI & Dijkstra shell in `setsail_core.js`.
Loaded in `index.html` **before** `setsail_core.js`. Exposes `window.SetRouteCoreA`.
