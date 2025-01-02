// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3gVLrQDT8B6LPQ4Sn2B6hOwpgFlEGo40",
  authDomain: "uniplanner-8b43b.firebaseapp.com",
  projectId: "uniplanner-8b43b",
  storageBucket: "uniplanner-8b43b.firebasestorage.app",
  messagingSenderId: "69903690780",
  appId: "1:69903690780:web:fc38674d66d4cc5842c3d9",
  measurementId: "G-N3X1Q5DJP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);