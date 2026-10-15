# SetSail — Agent Playbook

**Source of truth:** https://github.com/waffiman/Admirality-NtM-Scraper (`main`) / https://setsail-ai.vercel.app

**Local folder:** `SetSail/` (shared flash or clone). Do not treat corrupt USB files as authoritative.

## Before any edit
1. Pull / download latest `index.html`, `sw.js`, `assets/Auto NtM Plotting/*`, data JSON from GitHub or Vercel.
2. Work in a clean directory if the flash returns `WinError 1392`.
3. After push to `main`, sync the same layout back into local `SetSail/`.

## Do not
- Invent Google login forms (official GIS/OAuth popup only).
- Force navigation to Home on load.
- Trust flash copies over the server when they disagree.
