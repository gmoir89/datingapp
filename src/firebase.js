// This file initializes Firebase and exports the Firestore instance for use in the web application.
//         The data collected will be used to improve the accuracy of fake profile detection algorithms.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase web app configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);

console.log("Firebase config:", firebaseConfig);