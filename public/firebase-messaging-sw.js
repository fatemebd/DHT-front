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

// messaging.onBackgroundMessage((payload) => {
//   self.registration.showNotification(payload.data.title, {
//     body: payload.data.body,
//     icon: "./logo.png",
//   });

//   // biome-ignore lint/nursery/noConsole: <explanation>
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
// });
self.addEventListener("notificationclick", (event) => {
  // Example: Open a specific URL when the notification is clicked
  event.waitUntil(
    clients.openWindow("/homepage").then((windowClient) => {
      // Send data back to the main thread using postMessage
      event.notification.close(); // Close the notification

      const promise = new Promise((resolve) => {
        setTimeout(resolve, 3000);
      }).then(() => {
        // return the promise returned by openWindow, just in case.
        // Opening any origin only works in Chrome 43+.
        if (windowClient) {
          return windowClient.focus(); // Focus the existing tab
        }
        return;
      });
      // Check if the client (tab) exists

      // Send event data to the main thread for storage
      clients
        .matchAll({ includeUncontrolled: true, type: "window" })
        .then((clients) => {
          if (clients?.length) {
            clients[0].postMessage({
              type: "NOTIFICATION_CLICK",
              notificationData: { id: event }, // Example data
            });
          }
        });
    })
  );
});
