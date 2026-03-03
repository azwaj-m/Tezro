import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useFoodStats = () => {
  const [foodData, setFoodData] = useState({ activeOrders: 0, pendingPayouts: 0 });

  useEffect(() => {
    const q = query(collection(db, 'food_orders'), where('status', 'in', ['preparing', 'out_for_delivery']));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFoodData({ activeOrders: snapshot.size, pendingPayouts: snapshot.docs.reduce((a, b) => a + b.data().total, 0) });
    });
    return () => unsubscribe();
  }, []);

  return foodData;
};
