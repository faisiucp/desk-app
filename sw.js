/* Service worker stub for web push + offline shell. */
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("push", (event) => {
  let data = { title: "Grok Bot", body: "", url: "/" };
  try { data = Object.assign(data, event.data ? event.data.json() : {}); } catch (_) {}
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    data: { url: data.url },
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(clients.openWindow(url));
});
