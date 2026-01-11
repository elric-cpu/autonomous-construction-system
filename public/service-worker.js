/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'benson-app-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API calls: Network first, then cache (or fallback)
  // Note: Supabase calls usually go to a different domain
  if (url.pathname.includes('/rest/v1/') || url.pathname.includes('/storage/v1/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response to store in cache if needed, 
          // but usually we rely on apiCache.js for application data caching 
          // to have better control over invalidation.
          return response;
        })
        .catch(() => {
            // For API calls, if offline, we might fail or return custom offline JSON
            // For now, let the app handle the error or use internal apiCache
            return new Response(JSON.stringify({ error: 'Offline' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        })
    );
    return;
  }

  // Static assets: Cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache images and other static assets on the fly
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }

        // Cache valid responses
        if (event.request.method === 'GET') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }

        return networkResponse;
      }).catch(() => {
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
          }
      });
    })
  );
});