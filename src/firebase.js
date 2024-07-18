import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getMessaging } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyCSgA161VcTMhbMjRSZtmiacN9hUuFC1Vs",
  authDomain: "misyvbase.firebaseapp.com",
  projectId: "misyvbase",
  storageBucket: "misyvbase.appspot.com",
  messagingSenderId: "98342681260",
  appId: "1:98342681260:web:58d63957461fbab899bd09",
  measurementId: "G-ECPQ2X8CZQ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
