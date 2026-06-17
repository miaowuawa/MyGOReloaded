// force_cache.js - Service Worker 强制缓存
const CACHE_NAME = 'force-cache-v1';
const CACHE_DURATION = 300 * 1000; // 300秒

const FORCE_CACHE_HOSTS = [
  'i0.hdslb.com',
  'i1.hdslb.com',
  'i2.hdslb.com',
  's1.hdslb.com',
  'mall.bilibili.com',
  'www.bilibili.com'
];

const CACHEABLE_EXTENSIONS = ['.js', '.css'];

function shouldForceCache(url) {
  try {
    const urlObj = new URL(url);
    if (!FORCE_CACHE_HOSTS.includes(urlObj.host)) return false;
    const pathname = urlObj.pathname.toLowerCase();
    return CACHEABLE_EXTENSIONS.some(ext => pathname.endsWith(ext));
  } catch {
    return false;
  }
}

function isExplicitNoCache(response) {
  const cc = response.headers.get('cache-control') || '';
  const pragma = response.headers.get('pragma') || '';
  return cc.includes('no-store') ||
         cc.includes('no-cache') ||
         cc.includes('max-age=0') ||
         pragma.includes('no-cache');
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (!shouldForceCache(event.request.url)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      const now = Date.now();

      if (cached) {
        const cachedTime = parseInt(cached.headers.get('x-sw-cached-time') || '0');
        if (now - cachedTime < CACHE_DURATION) {
          return cached;
        }
      }

      try {
        const networkResponse = await fetch(event.request, { cache: 'no-store' });
        if (!networkResponse || networkResponse.status !== 200) {
          return cached || networkResponse;
        }
        if (isExplicitNoCache(networkResponse)) {
          await cache.delete(event.request);
          return networkResponse;
        }

        const headers = new Headers(networkResponse.headers);
        headers.set('x-sw-cached-time', String(now));

        const responseToCache = new Response(networkResponse.body, {
          status: networkResponse.status,
          statusText: networkResponse.statusText,
          headers: headers
        });

        await cache.put(event.request, responseToCache.clone());
        return responseToCache;
      } catch (err) {
        return cached || new Response('', { status: 503 });
      }
    })
  );
});