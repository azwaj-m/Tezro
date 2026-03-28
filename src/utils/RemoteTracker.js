import L from 'leaflet';
<<<<<<< HEAD
import { db } from '../firebase'; 
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

// 1. Tezro Luxury Map Theme Config
export const mapConfig = {
  url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  attribution: '&copy; Tezro Secure Systems',
  // گولڈن فلٹر جو نقشے کی لائنوں کو چمکائے گا
  filter: 'brightness(0.6) contrast(1.2) sepia(0.5) saturate(1.5) hue-rotate(-15deg)'
};

// 2. Premium Golden Marker
=======

export const mapConfig = {
  url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  attribution: '&copy; Tezro Secure Systems'
};

>>>>>>> 53c48d2 (Integrated RemoteTracker with Golden Map Theme and Firebase Master Services)
export const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

<<<<<<< HEAD
// 3. PhantomGuard Security Logic
export const PhantomGuard = {
  listenForRemoteCommands: (userId) => {
    if (!userId) return;
    const deviceRef = doc(db, "devices", userId);
    
    return onSnapshot(deviceRef, (snapshot) => {
      if (snapshot.exists() && snapshot.data()?.status === "STOLEN") {
        PhantomGuard.initiateHardLockdown(userId);
      }
    });
  },

  initiateHardLockdown: async (userId) => {
    const options = { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 };

    navigator.geolocation.watchPosition(async (pos) => {
      const { latitude, longitude, speed } = pos.coords;
      if (speed > 0 || !this.lastUpdate) {
        await updateDoc(doc(db, "lost_locations", userId), {
          lat: latitude,
          lng: longitude,
          lastSeen: new Date().toISOString(),
          status: 'TRACKING_ACTIVE'
        }).catch(() => {});
      }
    }, null, options);

    // سیکیورٹی لاک اسکرین پر بھیجیں
    window.location.href = "/secure-lock-screen";
  }
=======
export const startLiveTracking = (callback) => {
  if (!navigator.geolocation) return;
  return navigator.geolocation.watchPosition(
    (position) => {
      callback({ lat: position.coords.latitude, lng: position.coords.longitude });
    },
    (err) => console.error(err),
    { enableHighAccuracy: true }
  );
>>>>>>> 53c48d2 (Integrated RemoteTracker with Golden Map Theme and Firebase Master Services)
};

// 4. Live UI Tracking
export const startLiveTracking = (callback) => {
  if (!navigator.geolocation) return;
  return navigator.geolocation.watchPosition(
    (position) => {
      callback({ 
        lat: position.coords.latitude, 
        lng: position.coords.longitude 
      });
    },
    (err) => console.error("GPS Error:", err),
    { enableHighAccuracy: true }
  );
};
