const CACHE_NAME = 'blog-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './about.html',
  './blog-detail.html',
  './profile.html',
  './signin.html',
  './signup.html',
  './styles/main.css',
  './styles/navbar.css',
  './styles/blog-cards.css',
  './js/blogData.js',
  './js/features.js',
  './js/main.js',
  './assets/profile-icon.svg',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});