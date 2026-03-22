import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useHotelStats = () => {
  const [hotelData, setHotelData] = useState({ activeBookings: 0, totalRevenue: 0 });

  useEffect(() => {
    const q = query(collection(db, 'hotel_bookings'), where('status', '==', 'confirmed'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      snapshot.forEach(doc => total += doc.data().totalPrice);
      setHotelData({
        activeBookings: snapshot.size,
        totalRevenue: total
      });
    });

    return () => unsubscribe();
  }, []);

  return hotelData;
};
