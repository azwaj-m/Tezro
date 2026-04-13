import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, onSnapshot, updateDoc, increment, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    // لائیو بیلنس اپ ڈیٹ
    const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setBalance(doc.data()?.balance || 0);
    });

    return unsubscribe;
  }, []);

  const makePayment = async (amount, serviceType, description) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      // بیلنس چیک کریں
      if (balance < amount) throw new Error("بیلنس کافی نہیں ہے");

      // بیلنس کم کریں اور ٹرانزیکشن ہسٹری میں ڈالیں
      await updateDoc(userRef, {
        balance: increment(-amount)
      });

      await addDoc(collection(db, "transactions"), {
        userId: auth.currentUser.uid,
        amount,
        type: 'debit',
        service: serviceType, // e.g., 'food', 'ride', 'bill'
        description,
        timestamp: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <WalletContext.Provider value={{ balance, makePayment }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
