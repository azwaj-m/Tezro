import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_WITH_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_WITH_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_WITH_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_WITH_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_WITH_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_WITH_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// گوگل لاگ ان کا فنکشن جو Login.jsx مانگ رہی ہے
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export default app;
