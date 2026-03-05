/**
 * TEZRO PHANTOM GUARD - REMOTE CONTROL
 * پیتھ: src/utils/RemoteTracker.js
 */

import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

// اس فنکشن کو اپنی فائل میں شامل کریں
export const generateGoogleMapsLink = (lat, lng) => {
  // یہ لنک کسی بھی براؤزر پر ڈائریکٹ گوگل میپس کھول دے گا
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};
export const PhantomGuard = {
  // 1. ریموٹ کمانڈز کو سننا (کسی بھی دوسرے فون یا گوگل براؤزر سے)
  listenForRemoteCommands: (userId) => {
    const deviceRef = doc(db, "devices", userId);
    
    // لائیو لسنر جو گوگل کلاؤڈ سے کمانڈز پکڑے گا
    onSnapshot(deviceRef, (snapshot) => {
      const data = snapshot.data();
      
      if (data?.status === "STOLEN") {
        PhantomGuard.initiateHardLockdown();
      }
    });
  },

  // 2. ہارڈ لاک ڈاؤن اور جی پی ایس (صرف ساکن یا مشکوک حالات میں)
  initiateHardLockdown: async () => {
    console.log("🔒 گوگل کمانڈ موصول: ڈیوائس لاک ہو رہی ہے...");
    
    // جی پی ایس کو زبردستی آن کرنا اور لوکیشن بھیجنا
    navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      // لوکیشن کو فائر بیس میں اپڈیٹ کرنا تاکہ دوسرے فون پر نقشہ نظر آئے
      updateDoc(doc(db, "lost_locations", userId), {
        lat: latitude,
        lng: longitude,
        lastSeen: new Date().toISOString()
      });
    }, null, { enableHighAccuracy: true });

    // اسکرین پر صرف وائس ان لاک مینو دکھانا
    window.location.href = "/secure-lock-screen";
  }
};
