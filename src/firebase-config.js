import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmMWdn-xQ6Ziq0S6Qzc6efXq7hsaYcftE",
  authDomain: "tezro-2.firebaseapp.com",
  projectId: "tezro-2",
  storageBucket: "tezro-2.firebasestorage.app",
  messagingSenderId: "954821667016",
  appId: "1:954821667016:web:809decb67cd0a2bd22ddfd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// فون لاگ ان کے لیے ضروریی  ایکسپورٹس
export { RecaptchaVerifier, signInWithPhoneNumber };
