/**
 * SetSail Marine Navigation Suite — Service Worker (PWA Offline Engine v4.8)
 * Vessel: LPG/C IINO INEOS VESTA
 * High-Speed Satellite & Offline Engine — Instant Tile Pre-Warming & Zero API-Key Watermarks
 */

const CACHE_NAME = 'setsail-cache-v5.141.0';
const TILE_CACHE_NAME = 'setsail-tiles-cache-v5.141.0';

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
  'assets/geo/ne_50m_coastline.geojson',
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
  'assets/Auto NtM Plotting/ntm_styles.css?v=5.141',
  'assets/Auto NtM Plotting/port_depths.js?v=5.141',
  'assets/Auto NtM Plotting/ntm_module.js?v=5.141',
  'assets/Auto NtM Plotting/setsail_core.js?v=5.141',
  'assets/about/founder.jpg?v=5.141',
  'assets/home/install_bg_lng.jpg',
  'assets/about/mykhailo_byshliaha.jpg?v=5.141',
  'assets/geo/setroute_corridor_templates.json',
  'assets/geo/setroute_passage_knowledge.json',
  'assets/about/mykhailo_byshliaha.jpg',
  'assets/Auto NtM Plotting/openwaters_chart_layers.js?v=5.141',
  'assets/Auto NtM Plotting/ais_overlay.js?v=5.141',
  'assets/Auto NtM Plotting/setroute_core_a.js?v=5.141',
  'assets/authority-logos/noaa.svg',
  'assets/authority-logos/nasa.svg',
  'assets/Auto NtM Plotting/xlsx.full.min.js',
  'assets/Auto NtM Plotting/tesseract.min.js',
  'assets/Auto NtM Plotting/pdf.min.js',
  'assets/Auto NtM Plotting/pdf.worker.min.js',
  'assets/SetSail LOGOS/setsail_logo_square.webp',
  'assets/SetSail LOGOS/setsail_logo_horizontal.webp',
  'assets/SetSail LOGOS/setsail_logo_square.png',
  'assets/SetSail LOGOS/setsail_logo_horizontal.png',
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
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Network timeout')), timeoutMs);
    fetch(request)
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
    const isSharedJson = (baseName === 'notices.json' || baseName === 'weather.json' || baseName === 'news.json');
    if (reqUrl.origin !== self.location.origin && !isSharedJson) {
      return null;
    }
    const appCache = await caches.open(CACHE_NAME);
    let hit = (await appCache.match(request)) || (await appCache.match(request, { ignoreSearch: true }));
    if (hit) return hit;

    if (!baseName) return null;

    const keys = await appCache.keys();
    for (const k of keys) {
      const kDecoded = decodeURIComponent(new URL(k.url).pathname);
      if (kDecoded.endsWith('/' + baseName) || kDecoded === decodedPath) {
        const matched = await appCache.match(k);
        if (matched) return matched;
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
          '<!DOCTYPE html><html><head><title>SetSail Offline</title></head><body style="background:#080e20;color:#e2e8f0;font-family:sans-serif;padding:40px;text-align:center;"><h2>SetSail Offline Mode</h2><p>Please open SetSail once with internet to enable complete offline caching.</p></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })()
    );
    return;
  }

  // 2. notices.json, weather.json & news.json (15s timeout for 1.8MB payload + Offline Cache fallback)
  if (url.pathname.endsWith('notices.json') || url.pathname.endsWith('weather.json') || url.pathname.endsWith('news.json') || url.pathname.endsWith('ais.json')) {
    const jsonBaseName = url.pathname.split('/').pop();
    event.respondWith(
      fetchWithTimeout(event.request, 15000)
        .then((netRes) => {
          if (netRes && netRes.ok) {
            const copy = netRes.clone();
            const canonicalCopy = netRes.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
              if (jsonBaseName) cache.put(jsonBaseName, canonicalCopy);
            });
          }
          return netRes;
        })
        .catch(async () => {
          const cached = await matchAssetInCache(event.request);
          if (cached) {
            const blob = await cached.blob();
            const headers = new Headers(cached.headers);
            headers.set('X-SetSail-Offline', 'true');
            return new Response(blob, {
              status: 200,
              statusText: 'OK (Offline Cache)',
              headers: headers
            });
          }
          return new Response(JSON.stringify({ offline: true }), {
            status: 503,
            statusText: 'Service Unavailable (Offline)',
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
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

        try {
          const networkTile = await fetchWithTimeout(event.request, 8000);
          if (networkTile && (networkTile.ok || networkTile.type === 'opaque')) {
            tileCache.put(event.request, networkTile.clone());
          }
          return networkTile;
        } catch (fetchErr) {
          // Raster-only fallback (never for .pbf — handled above)
          return new Response(
            new Uint8Array([
              137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
              0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0,
              0, 0, 10, 73, 68, 65, 84, 120, 156, 99, 0, 1, 0, 0, 5, 0, 1,
              13, 10, 45, 180, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
            ]),
            { headers: { 'Content-Type': 'image/png' } }
          );
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

