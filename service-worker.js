const CACHE_NAME = 'to-do-pwa-cache-v1';
const FILES_TO_CACHE = [
 '/todo-list-app/',
 '/todo-list-app /index.html',
 '/todo-list-app /style.css',
 '/todo-list-app /app.js',
 '/todo-list-app /manifest.json',
 '/todo-list-app /icons/icon-128.png',
 '/todo-list-app /icons/icon-512.png'
];
self.addEventListener('install', (event) => {
 event.waitUntil(
 caches.open(CACHE_NAME)
 .then((cache) => cache.addAll(FILES_TO_CACHE))
 );
});
self.addEventListener('fetch', (event) => {
 event.respondWith(
 caches.match(event.request)
 .then((response) => response || fetch(event.request))
 );
});