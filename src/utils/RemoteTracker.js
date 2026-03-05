/**
 * TEZRO PHANTOM GUARD - REMOTE CONTROL
 * پیتھ: src/utils/RemoteTracker.js
 */

// 1. پیتھ کی درستگی: اگر config.js فائل src/firebase میں ہے تو یہ پیتھ استعمال کریں
import { db } from '../firebase/config'; 
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export const generateGoogleMapsLink = (lat, lng) => {
  // لنک فارمیٹ درست کیا گیا تاکہ لوکیشن صحیح کھلے
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

export const PhantomGuard = {
  // 1. ریموٹ کمانڈز کو سننا
  listenForRemoteCommands: (userId) => {
    // ایرر فکس: اگر userId نہیں ہے تو فنکشن کو روک دیں
    if (!userId) return;

    const deviceRef = doc(db, "devices", userId);
    
    onSnapshot(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data?.status === "STOLEN") {
          // ایرر فکس: userId کو اگلے فنکشن میں پاس کرنا ضروری ہے
          PhantomGuard.initiateHardLockdown(userId);
        }
      }
    });
  },

  // 2. ہارڈ لاک ڈاؤن اور جی پی ایس
  initiateHardLockdown: async (userId) => {
    console.log("🔒 گوگل کمانڈ موصول: ڈیوائس لاک ہو رہی ہے...");
    
    navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      
      // ایرر فکس: یہاں 'userId' ڈیفائن نہیں تھا، اسے اب فنکشن سے لیا جا رہا ہے
      updateDoc(doc(db, "lost_locations", userId), {
        lat: latitude,
        lng: longitude,
        lastSeen: new Date().toISOString()
      }).catch(err => console.error("Update failed:", err));

    }, null, { enableHighAccuracy: true });

    window.location.href = "/secure-lock-screen";
  }
};
