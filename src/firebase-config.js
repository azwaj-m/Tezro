import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// آپ کا فائر بیس کنفگریشن آبجیکٹ
// نوٹ: API Key وہی ہے جو آپ کے 2 مارچ کے پروجیکٹ (tezro-2) سے منسلک ہے
const firebaseConfig = {
  apiKey: "AIzaSyCmMWdn-xQ6Ziq0S6Qzc6efXq7hsaYcftE",
  authDomain: "tezro-2.firebaseapp.com",
  projectId: "tezro-2",
  storageBucket: "tezro-2.appspot.com",
  messagingSenderId: "774812345678", // یہ آپ کے کنسول سے ملے گا
  appId: "1:774812345678:web:abcdef123456"  // یہ آپ کے کنسول سے ملے گا
};

// فائر بیس کو انیشلائز کریں
const app = initializeApp(firebaseConfig);

// سروسز کو ایکسپورٹ کریں تاکہ پورے پراجیکٹ میں استعمال ہو سکیں
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
