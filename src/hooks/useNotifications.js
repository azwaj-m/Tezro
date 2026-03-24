import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../firebase"; // آپ کی اصل فائر بیس فائل کا پاتھ

const messaging = getMessaging(app);

export const useNotifications = (userId, userRole) => {
  const [notification, setNotification] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    // 1. پرمیشن کی درخواست اور ٹوکن جنریشن
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey: "YOUR_PUBLIC_VAPID_KEY" // یہاں اپنا فائر بیس VAPID key ڈالیں
          });
          if (currentToken) {
            setToken(currentToken);
            // یہاں آپ یہ ٹوکن فائر بیس ڈیٹا بیس (Firestore) میں صارف کے پروفائل میں سیو کریں گے
            console.log("Token generated for:", userRole);
          }
        }
      } catch (error) {
        console.error("Notification Error:", error);
      }
    };

    if (userId) requestPermission();

    // 2. لائیو میسج سننا (جب ایپ کھلی ہو)
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("New Notification Received:", payload);
      setNotification(payload);
      
      // سسٹم لیول نوٹیفکیشن دکھانا
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/assets/logo.png"
      });
    });

    return () => unsubscribe();
  }, [userId, userRole]);

  // 3. مخصوص رولز کے لیے نوٹیفکیشن پیغامات (Templates)
  const sendAlert = (type, data) => {
    const templates = {
      RIDE_REQUEST: "New ride request nearby!",
      ORDER_READY: "Your food is ready for pickup!",
      PLUMBING_JOB: "New plumbing task in your area.",
      PAYMENT_RECEIVED: "Payment successfully credited to your wallet."
    };
    return templates[type] || "New update from Tezro";
  };

  return { notification, token, sendAlert };
};
