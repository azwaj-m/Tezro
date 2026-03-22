import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const useRiderLocation = (orderId, isTracking) => {
  useEffect(() => {
    let watchId;

    if (isTracking && navigator.geolocation) {
      // High Accuracy GPS Tracking
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const orderRef = doc(db, 'food_orders', orderId);
            await updateDoc(orderRef, {
              riderLocation: {
                lat: latitude,
                lng: longitude,
                lastUpdated: new Date().toISOString()
              }
            });
            console.log("Location Synced:", latitude, longitude);
          } catch (error) {
            console.error("Firebase Update Error:", error);
          }
        },
        (error) => console.error("GPS Error:", error),
        {
          enableHighAccuracy: true,
          distanceFilter: 10, // Update only if rider moves 10 meters
          interval: 5000      // Sync every 5 seconds
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [orderId, isTracking]);
};
