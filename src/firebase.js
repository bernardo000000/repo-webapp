import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
