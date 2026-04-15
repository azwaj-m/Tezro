import { db } from '../firebase.js';
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

let locationWatchId = null;

export const startLocationTracking = (driverId) => {
    if (!navigator.geolocation) {
        console.error("GPS اس ڈیوائس پر دستیاب نہیں ہے۔");
        return;
    }

    // لوکیشن مانیٹر کرنا
    locationWatchId = navigator.geolocation.watchPosition(
        async (position) => {
            const { latitude, longitude, heading, speed } = position.coords;
            
            try {
                const driverRef = doc(db, "active_drivers", driverId);
                await updateDoc(driverRef, {
                    lat: latitude,
                    lng: longitude,
                    bearing: heading || 0,
                    speed: speed || 0,
                    lastUpdated: serverTimestamp()
                });
                console.log("Location Synced Safely");
            } catch (error) {
                // اگر ڈاکومینٹ موجود نہ ہو تو ایرر ہینڈلنگ
                console.error("Sync Error:", error);
            }
        },
        (error) => console.error("GPS Error:", error),
        {
            enableHighAccuracy: true,
            distanceFilter: 10, // صرف 10 میٹر کی تبدیلی پر اپ ڈیٹ کریں تاکہ بیٹری بچ سکے
        }
    );
};

export const stopLocationTracking = () => {
    if (locationWatchId) {
        navigator.geolocation.clearWatch(locationWatchId);
    }
};
