import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// آپ کی اصل فائر بیس کنفیگریشن یہاں ہونی چاہیے
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "tezro-app.firebaseapp.com",
  projectId: "tezro-app",
  storageBucket: "tezro-app.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
