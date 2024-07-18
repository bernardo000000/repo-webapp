importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyCSgA161VcTMhbMjRSZtmiacN9hUuFC1Vs",
    authDomain: "misyvbase.firebaseapp.com",
    projectId: "misyvbase",
    storageBucket: "misyvbase.appspot.com",
    messagingSenderId: "98342681260",
    appId: "1:98342681260:web:58d63957461fbab899bd09",
    measurementId: "G-ECPQ2X8CZQ"
  };


const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app)

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
