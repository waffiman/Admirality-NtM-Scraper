/**
 * SetSail Marine Navigation Suite — Service Worker (PWA Offline Engine v4.8)
 * Vessel: LPG/C IINO INEOS VESTA
 * High-Speed Satellite & Offline Engine — Instant Tile Pre-Warming & Zero API-Key Watermarks
 */

const CACHE_NAME = 'setsail-cache-v5.274.0';
const TILE_CACHE_NAME = 'setsail-tiles-cache-v5.274.0';

const OFFLINE_CORE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'notices.json',
  'weather.json',
  'news.json',
  'ais.json',
  'ais/zones/index.json',
  'ais/zones/names.json',
  'assets/geo/setroute_subsea_cables_pipelines.json',
  'assets/geo/setroute_tss_world.json',
  'assets/geo/setroute_tss_chart.json',
  'assets/geo/setroute_iala_marks.json',
  'assets/geo/setroute_light_sectors.json',
  'assets/geo/ne_50m_coastline.geojson',
  'assets/geo/ne_110m_land.geojson',
  'assets/geo/ne_50m_land.geojson',
  'assets/geo/ne_110m_lakes.geojson',
  'assets/geo/ne_110m_rivers.geojson',
  'assets/geo/ne_50m_lakes.geojson',
  'assets/geo/ne_50m_rivers.geojson',
  'assets/geo/setroute_coast_grid.json',
  'assets/geo/setroute_land_mask.json',
  'assets/home_bg.mp4',
  'assets/home_bg_poster.jpg',
  'assets/gyro_compass_logbook.ico',
  'assets/ship_stamp.png',
  'assets/wilhelmsen_logo.png',
  'assets/waffi-logo.png',
  'assets/leaflet/leaflet.js',
  'assets/leaflet/leaflet.css',
  'assets/leaflet/images/marker-icon.png',
  'assets/leaflet/images/marker-icon-2x.png',
  'assets/leaflet/images/marker-shadow.png',
  'assets/Auto NtM Plotting/ntm_styles.css?v=5.274',
  'assets/Auto NtM Plotting/port_depths.js?v=5.274',
  'assets/Auto NtM Plotting/ntm_module.js?v=5.274',
  'assets/Auto NtM Plotting/setsail_core.js?v=5.274',
  'assets/Auto NtM Plotting/setroute_brain_calibration.js?v=5.274',
  'assets/Auto NtM Plotting/setsail_wx_synoptic.js?v=5.274',
  'assets/Auto NtM Plotting/route_course_labels.js?v=5.274',
  'assets/Auto NtM Plotting/ecdis_scale_corner.js?v=5.274',
  'assets/about/founder.jpg?v=5.274',
  'assets/home/install_bg_lng.jpg',
  'assets/about/mykhailo_byshliaha.jpg?v=5.274',
  'assets/geo/setroute_corridor_templates.json',
  'assets/geo/setroute_passage_knowledge.json',
  'assets/about/mykhailo_byshliaha.jpg',
  'assets/Auto NtM Plotting/openwaters_chart_layers.js?v=5.274',
  'assets/Auto NtM Plotting/ais_overlay.js?v=5.274',
  'assets/Auto NtM Plotting/userchart_draw.js?v=5.274',
  'assets/Auto NtM Plotting/setroute_core_a.js?v=5.274',
  'assets/authority-logos/noaa.svg',
  'assets/authority-logos/nasa.svg',
  'assets/Auto NtM Plotting/xlsx.full.min.js',
  'assets/Auto NtM Plotting/tesseract.min.js',
  'assets/Auto NtM Plotting/pdf.min.js',
  'assets/Auto NtM Plotting/pdf.worker.min.js',
  'assets/SetSail LOGOS/setsail_logo_square.webp',
  'assets/SetSail LOGOS/setsail_logo_horizontal.svg',
  'assets/SetSail LOGOS/setsail_logo_square.png',
  'assets/flags/ae.png',
  'assets/flags/au.png',
  'assets/flags/be.png',
  'assets/flags/br.png',
  'assets/flags/ca.png',
  'assets/flags/cn.png',
  'assets/flags/de.png',
  'assets/flags/eg.png',
  'assets/flags/es.png',
  'assets/flags/fr.png',
  'assets/flags/gb.png',
  'assets/flags/gr.png',
  'assets/flags/hk.png',
  'assets/flags/id.png',
  'assets/flags/in.png',
  'assets/flags/it.png',
  'assets/flags/jp.png',
  'assets/flags/kr.png',
  'assets/flags/lk.png',
  'assets/flags/ma.png',
  'assets/flags/my.png',
  'assets/flags/nl.png',
  'assets/flags/pa.png',
  'assets/flags/ph.png',
  'assets/flags/pl.png',
  'assets/flags/ru.png',
  'assets/flags/sa.png',
  'assets/flags/sg.png',
  'assets/flags/th.png',
  'assets/flags/tw.png',
  'assets/flags/us.png',
  'assets/flags/vn.png',
  'assets/flags/za.png'
];

// World overview tiles (Zoom 1 & 2) pre-warmed asynchronously so Global Dark & Coast layers render in 0ms
const PREWARM_WORLD_TILES = [];
for (let z = 1; z <= 2; z++) {
  const maxCoord = 1 << z;
  for (let x = 0; x < maxCoord; x++) {
    for (let y = 0; y < maxCoord; y++) {
      PREWARM_WORLD_TILES.push(`https://a.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`);
      PREWARM_WORLD_TILES.push(`https://a.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`);
    }
  }
}

function fetchWithTimeout(request, timeoutMs) {
  const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      try { if (ctrl) ctrl.abort(); } catch (e) {}
      reject(new Error('Network timeout'));
    }, timeoutMs);
    const opts = ctrl ? { signal: ctrl.signal } : undefined;
    fetch(request, opts)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

async function matchAssetInCache(request) {
  try {
    const reqUrl = new URL(request.url);
    const decodedPath = decodeURIComponent(reqUrl.pathname);
    const baseName = decodedPath.split('/').pop();
    const isSharedJson = (baseName === 'notices.json' || baseName === 'weather.json' || baseName === 'news.json' || baseName === 'ais.json');
    // Cross-origin: check CACHE_NAME or any other cache for shared JSON
    if (reqUrl.origin !== self.location.origin) {
      if (!isSharedJson) return null;
      const appCache = await caches.open(CACHE_NAME);
      const crossHit = (await appCache.match(request)) || (await appCache.match(request, { ignoreSearch: true }));
      if (crossHit) return crossHit;
      const allNames = await caches.keys();
      for (const name of allNames) {
        if (name === CACHE_NAME) continue;
        try {
          const c = await caches.open(name);
          const h = (await c.match(request)) || (await c.match(request, { ignoreSearch: true })) || (await c.match(baseName));
          if (h) return h;
        } catch (eC) {}
      }
      return null;
    }
    const appCache = await caches.open(CACHE_NAME);
    let hit = (await appCache.match(request)) || (await appCache.match(request, { ignoreSearch: true }));
    if (hit) return hit;

    if (!baseName) return null;

    const keys = await appCache.keys();
    for (const k of keys) {
      try {
        if (new URL(k.url).origin !== self.location.origin) continue;
      } catch (eOrig) { continue; }
      const kDecoded = decodeURIComponent(new URL(k.url).pathname);
      if (kDecoded.endsWith('/' + baseName) || kDecoded === decodedPath) {
        const matched = await appCache.match(k);
        if (matched) return matched;
      }
    }

    if (isSharedJson) {
      const allNames = await caches.keys();
      for (const name of allNames) {
        if (name === CACHE_NAME) continue;
        try {
          const c = await caches.open(name);
          const h = (await c.match(request)) || (await c.match(request, { ignoreSearch: true })) || (await c.match(baseName)) || (await c.match('./' + baseName));
          if (h) {
            try { await appCache.put(request, h.clone()); } catch (ePut) {}
            return h;
          }
        } catch (eC) {}
      }
    }
  } catch (e) {}
  return null;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachePromises = OFFLINE_CORE_ASSETS.map(async (assetUrl) => {
        try {
          const response = await fetch(assetUrl, { cache: 'reload' });
          if (response && (response.ok || response.type === 'opaque')) {
            await cache.put(assetUrl, response);
          }
        } catch (err) {}
      });
      await Promise.all(cachePromises);

      // Non-blocking background pre-warm of Zoom 1-2 world base tiles
      caches.open(TILE_CACHE_NAME).then((tileCache) => {
        PREWARM_WORLD_TILES.forEach((tileUrl) => {
          tileCache.match(tileUrl).then((hit) => {
            if (!hit) {
              fetch(tileUrl, { mode: 'cors' })
                .then((res) => {
                  if (res && (res.ok || res.type === 'opaque')) {
                    tileCache.put(tileUrl, res);
                  }
                })
                .catch(() => {});
            }
          });
        });
      }).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const oldCaches = keys.filter((key) => key !== CACHE_NAME && key !== TILE_CACHE_NAME);

      // Migrate large shared JSON data from old caches before deletion
      try {
        const newAppCache = await caches.open(CACHE_NAME);
        for (const oKey of oldCaches) {
          try {
            const oldC = await caches.open(oKey);
            for (const assetName of ['notices.json', 'weather.json', 'news.json', 'ais.json']) {
              const alreadyHas = await newAppCache.match(assetName);
              if (!alreadyHas) {
                const oldHit = await oldC.match(assetName);
                if (oldHit && oldHit.ok) {
                  await newAppCache.put(assetName, oldHit.clone());
                }
              }
            }
          } catch (eMig) {}
        }
      } catch (eMigrate) {}

      if (oldCaches.length > 0) {
        await Promise.all(oldCaches.map((key) => caches.delete(key)));
      }
      // Drop stale shell HTML that still showed "Manual" + old Core A
      try {
        const appCache = await caches.open(CACHE_NAME);
        const shellKeys = await appCache.keys();
        await Promise.all(
          shellKeys
            .filter((req) => {
              const p = new URL(req.url).pathname;
              return p === '/' || p.endsWith('/index.html') || p.endsWith('OPEN_SETSAIL.html') || p.endsWith('/');
            })
            .map((req) => appCache.delete(req))
        );
      } catch (e) {}
      await self.clients.claim();
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      clients.forEach((c) => {
        try { c.postMessage({ type: 'SETSAIL_SW_UPDATED', cache: CACHE_NAME }); } catch (e) {}
      });
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 0a. Same-origin API + Open Waters / Almanac CDN: network-only
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  if (
    url.hostname === 'api.openwaters.io' ||
    url.hostname.includes('jsdelivr.net') ||
    url.hostname === 'esm.sh' ||
    url.hostname.endsWith('.esm.sh')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 0a2. SetSail analytics/admin API — never cache
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 0. Intercept any legacy Stadia Maps or Thunderforest tile request and rewrite to CARTO Voyager
  if (url.hostname.includes('stadiamaps.com') || url.hostname.includes('thunderforest.com')) {
    const matchZXY = url.pathname.match(/\/(\d+)\/(\d+)\/(\d+)/);
    if (matchZXY) {
      const [, z, x, y] = matchZXY;
      const replacementUrl = `https://a.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`;
      event.respondWith(fetch(replacementUrl));
      return;
    }
  }

  // 1. Navigation (HTML pages) — network-first with longer timeout (ship sat links)
  // Stale cached index.html was trapping users on pre-v5.77 UI ("Manual") + land-chord Core A.
  if (event.request.mode === 'navigate') {
    const isLegacyVercelHost =
      self.location &&
      typeof self.location.hostname === 'string' &&
      self.location.hostname.toLowerCase().indexOf('vercel.app') !== -1;

    const buildTransferOrOfflineHtml = (autoRedirect) =>
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      (autoRedirect ? '<meta http-equiv="refresh" content="0;url=https://setsail-nav.com/">' : '') +
      '<title>SetSail — Moved to setsail-nav.com</title></head>' +
      '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#080f24;color:#e2e8f0;font-family:Segoe UI,system-ui,sans-serif;padding:24px;text-align:center;box-sizing:border-box;">' +
      '<div style="max-width:480px;background:rgba(15,23,42,0.92);border:1px solid rgba(56,189,248,0.35);border-radius:16px;padding:32px 28px;box-shadow:0 20px 50px rgba(0,0,0,0.6);">' +
      '<div style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.4);color:#38bdf8;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;">Official Domain Transfer</div>' +
      '<h2 style="margin:0 0 10px;font-size:24px;color:#f8fafc;">SetSail Has Moved to setsail-nav.com</h2>' +
      '<p style="margin:0 0 22px;font-size:15px;line-height:1.55;color:#94a3b8;">The previous <strong style="color:#cbd5e1;">vercel.app</strong> address has been retired. SetSail is now permanently hosted on our new official maritime domain:</p>' +
      '<a href="https://setsail-nav.com/" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:10px;background:linear-gradient(135deg,#0284c7,#38bdf8);color:#041022;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 8px 24px rgba(56,189,248,0.35);">Continue to setsail-nav.com &rarr;</a>' +
      '<p style="margin:18px 0 0;font-size:12px;color:#64748b;">If you are offline at sea, please open <a href="https://setsail-nav.com/" style="color:#38bdf8;">https://setsail-nav.com</a> once with internet to enable full offline bridge caching.</p>' +
      '</div>' +
      (autoRedirect
        ? '<script>try{window.location.replace("https://setsail-nav.com/"+(location.pathname||"").replace(/^\\/+/,"")+(location.search||"")+(location.hash||""));}catch(e){}</script>'
        : '<script>try{if(location.hostname.indexOf("vercel.app")!==-1){window.location.replace("https://setsail-nav.com/"+(location.pathname||"").replace(/^\\/+/,"")+(location.search||"")+(location.hash||""));}}catch(e){}</script>') +
      '</body></html>';

    if (isLegacyVercelHost) {
      event.respondWith(
        new Response(buildTransferOrOfflineHtml(true), {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }
        })
      );
      return;
    }

    event.respondWith(
      (async () => {
        try {
          const response = await fetchWithTimeout(new Request(event.request.url, { cache: 'reload' }), 12000);
          if (response && response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, response.clone());
            cache.put('index.html', response.clone());
            return response;
          }
        } catch (err) {}

        const cached =
          (await caches.match(event.request)) ||
          (await caches.match('index.html')) ||
          (await caches.match('./index.html')) ||
          (await caches.match('./')) ||
          (await matchAssetInCache(new Request(self.registration.scope + 'index.html')));

        if (cached) return cached;

        return new Response(
          buildTransferOrOfflineHtml(false),
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })()
    );
    return;
  }

  // 2. notices.json (~2MB): CACHE-FIRST then background revalidate.
  //    Network-first with long timeout made the NtM tile wait 30–90s every click
  //    (and show nothing if the sat link hiccuped). Serve cached corpus instantly.
  if (url.pathname.endsWith('notices.json') || url.pathname.endsWith('weather.json') || url.pathname.endsWith('news.json') || url.pathname.endsWith('ais.json')) {
    const jsonBaseName = url.pathname.split('/').pop();
    const isNotices = jsonBaseName === 'notices.json';
    const jsonTimeoutMs = isNotices ? 12000 : 15000;
    event.respondWith((async () => {
      const cached =
        (await matchAssetInCache(event.request)) ||
        (jsonBaseName
          ? await matchAssetInCache(new Request(self.registration.scope + jsonBaseName))
          : null);

      const fetchAndCache = async () => {
        const netRes = await fetchWithTimeout(event.request, jsonTimeoutMs);
        if (netRes && netRes.ok) {
          try {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, netRes.clone());
            if (jsonBaseName && url.origin === self.location.origin) {
              cache.put(jsonBaseName, netRes.clone());
            }
          } catch (ePut) {}
        }
        return netRes;
      };

      // Reject poisoned tiny notices.json caches (old demo stubs) — force network
      let usableCached = cached;
      if (usableCached && isNotices) {
        try {
          const probe = await usableCached.clone().json();
          const n = probe && Array.isArray(probe.notices) ? probe.notices.length : 0;
          if (n < 50) {
            try {
              const cache = await caches.open(CACHE_NAME);
              const keys = await cache.keys();
              await Promise.all(keys.map((k) => {
                try {
                  const p = new URL(k.url).pathname;
                  return (p.endsWith('/notices.json') || p === '/notices.json' || k.url.endsWith('notices.json'))
                    ? cache.delete(k) : Promise.resolve(false);
                } catch (eDel) { return Promise.resolve(false); }
              }));
            } catch (ePurge) {}
            usableCached = null;
          }
        } catch (eProbe) {
          usableCached = null;
        }
      }

      if (usableCached) {
        // Stale-while-revalidate — do not block the tile spinner on a 2MB download
        fetchAndCache().catch(() => {});
        const blob = await usableCached.blob();
        const headers = new Headers(usableCached.headers);
        headers.set('X-SetSail-From-Cache', '1');
        return new Response(blob, { status: 200, statusText: 'OK (Cache)', headers });
      }

      try {
        const netRes = await fetchAndCache();
        if (netRes) return netRes;
      } catch (eNet) {}

      return new Response(JSON.stringify({ offline: true, notices: [] }), {
        status: 503,
        statusText: 'Service Unavailable (Offline)',
        headers: { 'Content-Type': 'application/json' }
      });
    })());
    return;
  }

  // 3. Map Tiles: Instant 0ms Cache-First + Stale-While-Revalidate refresh
  const isOpenWatersVector =
    url.hostname === 'tiles.openwaters.io' &&
    /\.(pbf|mvt|mlt)$/i.test(url.pathname);
  const isMapTile = (
    url.hostname.includes('tile.openstreetmap.org') ||
    url.hostname.includes('arcgisonline.com') ||
    url.hostname.includes('openseamap.org') ||
    url.hostname.includes('cartocdn.com') ||
    url.hostname === 'tiles.openwaters.io' ||
    url.hostname === 'tiles.versatiles.org'
  );

  // Vector bathymetry contours/labels: never serve PNG fallback (breaks MapLibre MVT decode
  // with "Unimplemented type: 4"). Network-first, longer timeout, cache only real protobuf.
  if (isOpenWatersVector) {
    event.respondWith(
      (async () => {
        try {
          const networkTile = await fetchWithTimeout(event.request, 12000);
          const ct = (networkTile && networkTile.headers && networkTile.headers.get('content-type')) || '';
          const looksBinary =
            networkTile &&
            networkTile.ok &&
            !/text\/html|application\/json|image\//i.test(ct);
          if (looksBinary) {
            const tileCache = await caches.open(TILE_CACHE_NAME);
            tileCache.put(event.request, networkTile.clone());
            return networkTile;
          }
          if (networkTile) return networkTile;
        } catch (e) {}
        const tileCache = await caches.open(TILE_CACHE_NAME);
        const cached = await tileCache.match(event.request);
        if (cached) {
          const ct = cached.headers.get('content-type') || '';
          if (!/image\/|text\/html/i.test(ct)) return cached;
        }
        return new Response('', { status: 204, statusText: 'No Content' });
      })()
    );
    return;
  }

  if (isMapTile) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME).then(async (tileCache) => {
        const cachedTile = await tileCache.match(event.request);
        // Drop corrupt PNG stubs previously cached for Open Waters vector URLs
        if (cachedTile) {
          const ct = cachedTile.headers.get('content-type') || '';
          if (/image\/png/i.test(ct) && url.hostname === 'tiles.openwaters.io') {
            try { await tileCache.delete(event.request); } catch (e) {}
          } else {
            return cachedTile;
          }
        }

        const isSparseOverlayTile = url.hostname.includes('openseamap.org');
        const makeTransparentPngResponse = () => {
          const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
          const bin = atob(b64);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          return new Response(bytes.buffer, {
            status: 200,
            headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' }
          });
        };

        try {
          const networkTile = await fetchWithTimeout(event.request, 18000);
          if (networkTile && (networkTile.ok || networkTile.type === 'opaque')) {
            tileCache.put(event.request, networkTile.clone());
            return networkTile;
          }
          if (isSparseOverlayTile) {
            return makeTransparentPngResponse();
          }
          return networkTile || new Response('', { status: 504, statusText: 'Tile Gateway Timeout' });
        } catch (fetchErr) {
          if (isSparseOverlayTile) {
            return makeTransparentPngResponse();
          }
          // Return HTTP 504 (never HTTP 200 1x1 blank PNG) so Leaflet keeps tile hidden and triggers CDN failover
          return new Response('', { status: 504, statusText: 'Tile Gateway Timeout' });
        }
      })
    );
    return;
  }

  // 3.5. Images (Unsplash, news thumbnails & national flags): Cache-First + Background Refresh
  const isImageRequest = (
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/i) ||
    url.hostname.includes('images.unsplash.com') ||
    url.hostname.includes('flagcdn.com') ||
    url.hostname.includes('gcaptain.com')
  );

  if (isImageRequest && !isMapTile) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) {
          fetch(event.request)
            .then((netRes) => {
              if (netRes && (netRes.ok || netRes.type === 'opaque')) {
                cache.put(event.request, netRes.clone());
              }
            })
            .catch(() => {});
          return cached;
        }

        try {
          const netRes = await fetchWithTimeout(event.request, 4500);
          if (netRes && (netRes.ok || netRes.type === 'opaque')) {
            cache.put(event.request, netRes.clone());
          }
          return netRes;
        } catch (fetchErr) {
          return new Response('', { status: 404 });
        }
      })
    );
    return;
  }

  // 4. Core JS & CSS: Network-First. Large MapLibre bundles need a long timeout
  // (old 2s cap returned 503 "/* Offline */" and broke Seamap/Seascape).
  const isCoreScriptOrStyle = (
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))
  );

  if (isCoreScriptOrStyle) {
    const pathLower = decodeURIComponent(url.pathname).toLowerCase();
    const isHeavyMapLibre =
      pathLower.indexOf('maplibre-gl') !== -1 ||
      pathLower.indexOf('maplibre_gl') !== -1;
    const scriptTimeoutMs = isHeavyMapLibre ? 45000 : 8000;
    event.respondWith(
      (async () => {
        try {
          const netRes = await fetchWithTimeout(event.request, scriptTimeoutMs);
          if (netRes && netRes.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, netRes.clone());
            return netRes;
          }
        } catch (e) {}
        const cached = await matchAssetInCache(event.request);
        if (cached) return cached;
        // Never serve a fake 503 JS stub for MapLibre — let the page see a real failure
        if (isHeavyMapLibre) {
          return fetch(event.request);
        }
        return new Response('/* Offline */', {
          status: 503,
          headers: { 'Content-Type': url.pathname.endsWith('.css') ? 'text/css' : 'application/javascript' }
        });
      })()
    );
    return;
  }

  // 5. All other local assets: Cache-first with background refresh
  event.respondWith(
    (async () => {
      const cached = await matchAssetInCache(event.request);
      if (cached) {
        fetch(event.request)
          .then((netRes) => {
            if (netRes && netRes.ok && url.origin === self.location.origin) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, netRes));
            }
          })
          .catch(() => {});
        return cached;
      }

      try {
        const netRes = await fetchWithTimeout(event.request, 3500);
        if (netRes && netRes.ok && url.origin === self.location.origin) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, netRes.clone());
        }
        return netRes;
      } catch (err) {
        return new Response('', { status: 503, statusText: 'Offline' });
      }
    })()
  );
});

