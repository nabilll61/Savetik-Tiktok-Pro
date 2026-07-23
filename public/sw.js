const CACHE_NAME = 'savetik-pwa-v4';
const ASSETS_TO_CACHE = [
  '/favicon.svg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Do not intercept or cache API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Network-First with Cache Fallback strategy
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If it's a valid response, we can return it
        return networkResponse;
      })
      .catch(() => {
        // If network fails (offline), fall back to cached response
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If navigation request fails and is offline, return cached root/index
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
