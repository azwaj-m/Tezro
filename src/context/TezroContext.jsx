import React, { createContext, useState, useContext } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [activeRide, setActiveRide] = useState(null);

  const requestRide = async (rideDetails) => {
    try {
      if (!auth.currentUser) throw new Error("لاگ ان ہونا ضروری ہے");
      
      const rideData = {
        ...rideDetails,
        userId: auth.currentUser.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "rides"), rideData);
      setActiveRide({ id: docRef.id, ...rideData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("بکنگ میں غلطی:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <TezroContext.Provider value={{ activeRide, requestRide }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
