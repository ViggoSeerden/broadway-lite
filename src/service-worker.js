/* eslint-disable no-restricted-globals */
const offlinePage = 'offline.html';
/* eslint-disable */
const selfManifest = self.__WB_MANIFEST;
/* eslint-enable */
const cacheName = "broadwayCache";
//Just take into account that the "files" below are request-url's and not filenames perse. So for your root of your website yous should include "./" and if you use my site (or another plain HTML-site) also "index.html". If you use a server-side language and have friendly url's that could be something like "news/this-is-a-newsarticle/".
const appFiles = [
  "manifest.json",
  "index.html",
  "./",
  "logo192.png",
  "logo512.png",
  "favicon.ico",
  "logo2.png",
  "offline.html"
];

/* eslint-disable no-restricted-globals */
self.addEventListener("install", (installing) => {
  installing.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(appFiles).catch(error => {
        console.error('Failed to cache files:', error);
      });
    })
  );
});

/* eslint-disable no-restricted-globals */
self.addEventListener("activate", () => {
});

/* eslint-disable no-restricted-globals */
self.addEventListener("fetch", (fetching) => {
  fetching.respondWith(
      caches.match(fetching.request).then((response) => {
        return response || fetch(fetching.request).catch(() => {
          return caches.match(offlinePage);
        });
      })
  );
});