importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAuUIf3BnmA_HoFMAuWD42BlgM4z8z9cIA",
  authDomain: "doost-8726b.firebaseapp.com",
  projectId: "doost-8726b",
  storageBucket: "doost-8726b.appspot.com",
  messagingSenderId: "62115236124",
  appId: "1:62115236124:web:a727409af337f0140552d9",
  measurementId: "G-48LNGMKQXN",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: "./logo.png",
  });

  // biome-ignore lint/nursery/noConsole: <explanation>
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
self.addEventListener("notificationclick", (event) => {
  const clickAction = "/homepage";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const client = clientList.find((c) => c.url === clickAction);

        if (client) {
          client.focus();
        } else {
          clients.openWindow(clickAction);
        }

        event.notification.close();

        if (clientList.length > 0) {
          clientList[0].postMessage({
            type: "NOTIFICATION_CLICK",
            notificationData: event.notification.data,
          });
        }
      })
  );
});
