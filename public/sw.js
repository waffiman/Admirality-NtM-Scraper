/**
 * SetSail Marine Navigation Suite — Service Worker (PWA Offline Engine)
 * Vessel: LPG/C IINO INEOS VESTA
 * Fully offline-capable bridge cockpit — Zero Google Dinosaur!
 */

const CACHE_NAME = 'setsail-cache-v2.9';
const TILE_CACHE_NAME = 'setsail-tiles-cache-v2';

const OFFLINE_CORE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'notices.json',
  'assets/home_bg.mp4',
  'assets/gyro_compass_logbook.ico',
  'assets/ship_stamp.png',
  'assets/wilhelmsen_logo.png',
  'assets/leaflet/leaflet.js',
  'assets/leaflet/leaflet.css',
  'assets/leaflet/images/marker-icon.png',
  'assets/leaflet/images/marker-icon-2x.png',
  'assets/leaflet/images/marker-shadow.png',
  'assets/Auto NtM Plotting/ntm_styles.css',
  'assets/Auto NtM Plotting/ntm_ui.js',
  'assets/Auto NtM Plotting/setsail_ui.js',
  'assets/Auto NtM Plotting/port_depths.js',
  'assets/Auto NtM Plotting/ntm_module.js',
  'assets/Auto NtM Plotting/pdf.min.js',
  'assets/Auto NtM Plotting/pdf.worker.min.js'
];

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

// Activate immediately & purge obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME && key !== TILE_CACHE_NAME).map((key) => {
            console.log('[SetSail SW] Removing deprecated cache:', key);
            return caches.delete(key);
          })
        );
      })
    ])
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
          // Fast network race (2.5s)
          const netPromise = fetch(event.request);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Network timeout')), 2500)
          );
          const response = await Promise.race([netPromise, timeoutPromise]);
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
          (await caches.match('./'));

        if (cached) return cached;

        // Fallback: search any html in cache
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        for (const req of keys) {
          if (req.url.endsWith('index.html') || req.url.endsWith('/')) {
            const match = await cache.match(req);
            if (match) return match;
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

  // 2. notices.json (Network-first with cached fallback)
  if (url.pathname.endsWith('notices.json')) {
    event.respondWith(
      fetch(event.request)
        .then((netRes) => {
          if (netRes && netRes.ok) {
            const copy = netRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return netRes;
        })
        .catch(async () => {
          const cached = (await caches.match(event.request)) || (await caches.match('notices.json'));
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
    url.hostname.includes('openseamap.org')
  );

  if (isMapTile) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME).then(async (tileCache) => {
        const cachedTile = await tileCache.match(event.request);
        if (cachedTile) {
          return cachedTile;
        }

        try {
          const networkTile = await fetch(event.request);
          if (networkTile && (networkTile.ok || networkTile.type === 'opaque')) {
            tileCache.put(event.request, networkTile.clone());
          }
          return networkTile;
        } catch (fetchErr) {
          // Transparent 1x1 fallback tile when offline and uncached
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

  // 4. Static assets: Cache-First with Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Revalidate in background if online
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // Not cached: fetch from network & store
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(async (err) => {
          // If offline request for Leaflet unpkg, fallback to local assets
          if (url.hostname === 'unpkg.com' && url.pathname.includes('leaflet')) {
            if (url.pathname.endsWith('.js')) {
              const localJs = await caches.match('assets/leaflet/leaflet.js');
              if (localJs) return localJs;
            } else if (url.pathname.endsWith('.css')) {
              const localCss = await caches.match('assets/leaflet/leaflet.css');
              if (localCss) return localCss;
            }
          }
          throw err;
        });
    })
  );
});
