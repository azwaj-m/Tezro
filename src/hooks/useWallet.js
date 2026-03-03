import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';

export const useWallet = (userId, role) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // رول کے حساب سے صحیح کلیکشن کا انتخاب
    const collectionName = role === 'admin' ? 'system_stats' : 'users';
    const docId = role === 'admin' ? 'finances' : userId;

    const unsubscribe = onSnapshot(doc(db, collectionName, docId), (doc) => {
      if (doc.exists()) {
        setBalance(doc.data().balance || doc.data().totalEarnings || 0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, role]);

  return { balance, loading };
};
