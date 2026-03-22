import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// آپ کی فائر بیس کنفیگریشن (یہاں پہلے سے موجود کنفیگریشن برقرار رہے گی)
const firebaseConfig = {
  // اپنی اصل کنفیگریشن یہاں رہنے دیں
  apiKey: "YOUR_API_KEY",
  authDomain: "tezro-app.firebaseapp.com",
  projectId: "tezro-app",
  storageBucket: "tezro-app.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

// ایکسپورٹس جن کی ضرورت ہے
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider(); // یہ وہ لائن ہے جو مسنگ تھی

export default app;
