import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";


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
const messaging = getMessaging(app)

messaging.onBackgroundMessage(payload =>{
    console.log("Recibiste mensaje mientras estabas ausente");

    const notificationTitle = payload.cotification.tittle;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo.jpg"
    }

    return self.ServiceWorkerRegistration.showNotification(
        notificationTitle,
        notificationOptions
    )
})