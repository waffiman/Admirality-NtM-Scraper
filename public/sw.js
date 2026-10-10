/**
 * SetSail Marine Navigation Suite — Service Worker (PWA Offline Engine v3.9)
 * Vessel: LPG/C IINO INEOS VESTA
 * Fully offline-capable bridge cockpit — Zero Google Dinosaur & Zero Unstyled Blocks!
 */

const CACHE_NAME = 'setsail-cache-v4.0';
const TILE_CACHE_NAME = 'setsail-tiles-cache-v4';

const OFFLINE_CORE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'notices.json',
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
  'assets/Auto NtM Plotting/ntm_styles.css?v=4.0',
  'assets/Auto NtM Plotting/port_depths.js?v=4.0',
  'assets/Auto NtM Plotting/ntm_module.js?v=4.0',
  'assets/Auto NtM Plotting/setsail_core.js?v=4.0',
  'assets/Auto NtM Plotting/xlsx.full.min.js',
  'assets/Auto NtM Plotting/tesseract.min.js',
  'assets/Auto NtM Plotting/pdf.min.js',
  'assets/Auto NtM Plotting/pdf.worker.min.js',
  'assets/SetSail LOGOS/setsail_logo_square.webp',
  'assets/SetSail LOGOS/setsail_logo_horizontal.webp',
  'assets/SetSail LOGOS/setsail_logo_square.png',
  'assets/SetSail LOGOS/setsail_logo_horizontal.png'
];

// Helper: fetch with fast timeout for satellite/offline bridge networks
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

// Helper: resilient cache lookup for same-origin app assets only (never map tiles)
async function matchAssetInCache(request) {
  try {
    const reqUrl = new URL(request.url);
    if (reqUrl.origin !== self.location.origin) {
      return null;
    }
    const appCache = await caches.open(CACHE_NAME);
    let hit = (await appCache.match(request)) || (await appCache.match(request, { ignoreSearch: true }));
    if (hit) return hit;

    const decodedPath = decodeURIComponent(reqUrl.pathname);
    const baseName = decodedPath.split('/').pop();
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

// Pre-cache all core assets on install
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[SetSail SW] Pre-caching core navigation assets...');
      const cachePromises = OFFLINE_CORE_ASSETS.map(async (assetUrl) => {
        try {
          const response = await fetch(assetUrl, { cache: 'reload' });
          if (response && (response.ok || response.type === 'opaque')) {
            await cache.put(assetUrl, response);
          }
        } catch (err) {
          console.warn('[SetSail SW] Could not pre-cache:', assetUrl, err);
        }
      });
      await Promise.all(cachePromises);
      console.log('[SetSail SW] Pre-caching completed.');
    })
  );
});

// Activate immediately & migrate any missing entries before purging obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      const newCache = await caches.open(CACHE_NAME);
      const newKeys = await newCache.keys();
      // Only remove older caches if the new cache successfully populated core files
      if (newKeys.length >= 5) {
        const keys = await caches.keys();
        await Promise.all(
          keys.filter((key) => key !== CACHE_NAME && key !== TILE_CACHE_NAME).map((key) => {
            console.log('[SetSail SW] Removing deprecated cache:', key);
            return caches.delete(key);
          })
        );
      }
    })()
  );
});

// Fetch routing
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Navigation (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetchWithTimeout(event.request, 4000);
          if (response && response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, response.clone());
            cache.put('index.html', response.clone());
            return response;
          }
        } catch (err) {
          // Network failed or offline - serve from cache
        }

        const cached =
          (await caches.match(event.request)) ||
          (await caches.match('index.html')) ||
          (await caches.match('./index.html')) ||
          (await caches.match('./')) ||
          (await matchAssetInCache(new Request(self.registration.scope + 'index.html')));

        if (cached) return cached;

        const cacheNames = await caches.keys();
        for (const cName of cacheNames) {
          const cache = await caches.open(cName);
          const keys = await cache.keys();
          for (const req of keys) {
            if (req.url.endsWith('index.html') || req.url.endsWith('/')) {
              const match = await cache.match(req);
              if (match) return match;
            }
          }
        }

        return new Response(
          '<!DOCTYPE html><html><head><title>SetSail Offline</title></head><body style="background:#080e20;color:#e2e8f0;font-family:sans-serif;padding:40px;text-align:center;"><h2>SetSail Offline Mode</h2><p>Please open SetSail once with internet to enable complete offline caching.</p></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })()
    );
    return;
  }

  // 2. notices.json (Network-first with 3s timeout & cached fallback)
  if (url.pathname.endsWith('notices.json')) {
    event.respondWith(
      fetchWithTimeout(event.request, 3000)
        .then((netRes) => {
          if (netRes && netRes.ok) {
            const copy = netRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
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
        })
    );
    return;
  }

  // 3. Map Tiles: Persistent Tile Cache with 0ms local response
  const isMapTile = (
    url.hostname.includes('tile.openstreetmap.org') ||
    url.hostname.includes('arcgisonline.com') ||
    url.hostname.includes('openseamap.org') ||
    url.hostname.includes('cartocdn.com') ||
    url.hostname.includes('stadiamaps.com')
  );

  if (isMapTile) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME).then(async (tileCache) => {
        const cachedTile = await tileCache.match(event.request);
        if (cachedTile) {
          return cachedTile;
        }

        try {
          const networkTile = await fetchWithTimeout(event.request, 4500);
          if (networkTile && (networkTile.ok || networkTile.type === 'opaque')) {
            tileCache.put(event.request, networkTile.clone());
          }
          return networkTile;
        } catch (fetchErr) {
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

  // 4a. Core JS & CSS scripts: Fast Network-First (2.5s timeout) with Multi-Fallback Offline Cache
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(
      fetchWithTimeout(event.request, 2500)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await matchAssetInCache(event.request);
          if (cached) return cached;
          throw new Error('Offline and not in cache: ' + url.pathname);
        })
    );
    return;
  }

  // 4. Static assets: Cache-First with Stale-While-Revalidate
  event.respondWith(
    matchAssetInCache(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetchWithTimeout(event.request, 3500)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetchWithTimeout(event.request, 4000)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(async (err) => {
          const fallback = await matchAssetInCache(event.request);
          if (fallback) return fallback;
          throw err;
        });
    })
  );
});
