// Service Worker for PWA functionality
const CACHE_NAME = 'greenbite-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/recipes.html',
  '/calculator.html',
  '/workout.html',
  '/mindfulness.html',
  '/contact.html',
  '/assets/styles.css',
  '/assets/main.js',
  '/assets/recipes.js',
  '/assets/calculator.js',
  '/assets/workout.js',
  '/assets/mindfulness.js',
  '/assets/contact.js',
  '/assets/recipes.json',
  '/assets/images/logo.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});