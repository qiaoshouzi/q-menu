/* eslint-disable no-undef */
console.log("Successful registered service worker.");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js");

workbox.routing.registerRoute(
  /^https:\/\/.+\/assets\/.+\.(js|css)$/,
  new workbox.strategies.CacheFirst(),
);

workbox.routing.registerRoute(
  new RegExp(".*.(?:png|jpg|jpeg|svg|gif|webp)"),
  new workbox.strategies.StaleWhileRevalidate(),
);
workbox.routing.registerRoute(
  new RegExp(".*.(css|js)"),
  new workbox.strategies.StaleWhileRevalidate(),
);
workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
  }),
);
