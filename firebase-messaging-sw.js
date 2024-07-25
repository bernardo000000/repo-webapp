// Importa los scripts de Firebase
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCSgA161VcTMhbMjRSZtmiacN9hUuFC1Vs",
  authDomain: "misyvbase.firebaseapp.com",
  projectId: "misyvbase",
  storageBucket: "misyvbase.appspot.com",
  messagingSenderId: "98342681260",
  appId: "1:98342681260:web:58d63957461fbab899bd09",
  measurementId: "G-ECPQ2X8CZQ"
};

// Inicializa la app de Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene una instancia de Firebase Messaging
const messaging = firebase.messaging();

// Maneja los mensajes en segundo plano
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Personaliza la notificación aquí
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/logo.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
