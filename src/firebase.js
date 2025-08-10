// firebase.js
// Initializes Firebase, Firestore, and Anonymous Auth, and exposes a promise you can await.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";

// ---- Config (Create React App reads REACT_APP_* at build time) ----
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

// Expose a promise that resolves once we have a user (after anon sign-in if needed).
export const authReady = new Promise((resolve, reject) => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        await signInAnonymously(auth);
        // onAuthStateChanged will fire again with a user; we’ll resolve then.
        return;
      }
      unsub();
      resolve(user);
    } catch (e) {
      console.error("Anonymous sign-in failed:", e);
      unsub();
      reject(e);
    }
  });
});

// (Safe to log; apiKey is public client-side)
console.log("Firebase config loaded", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
});

export default app;
