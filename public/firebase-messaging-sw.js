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
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, {
    body: payload.notification.body,
  });
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
  // self.registration.showNotification(notificationTitle, notificationOptions);
});
