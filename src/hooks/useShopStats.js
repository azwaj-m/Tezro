import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useShopStats = () => {
  const [shopData, setShopData] = useState({ activeOrders: 0, dailySales: 0 });

  useEffect(() => {
    const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      snapshot.forEach(doc => total += doc.data().amount);
      setShopData({
        activeOrders: snapshot.size,
        dailySales: total
      });
    });

    return () => unsubscribe();
  }, []);

  return shopData;
};
