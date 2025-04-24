// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ideal-estate-7280d.firebaseapp.com",
  projectId: "ideal-estate-7280d",
  storageBucket: "ideal-estate-7280d.firebasestorage.app",
  messagingSenderId: "454892550594",
  appId: "1:454892550594:web:7e287b11d437542e6cbe5b",
  measurementId: "G-TEN37J87X3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);