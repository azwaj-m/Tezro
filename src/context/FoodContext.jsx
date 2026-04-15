import React, { createContext, useContext, useState } from 'react';
import { db, auth } from '../firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);

  const placeFoodOrder = async (cartItems, totalAmount, deliveryLocation) => {
    try {
      if (!auth.currentUser) throw new Error("آرڈر کے لیے لاگ ان ضروری ہے");

      const orderData = {
        userId: auth.currentUser.uid,
        items: cartItems,
        total: totalAmount,
        location: deliveryLocation, // { lat: 0, lng: 0, address: "" }
        status: 'pending',
        type: 'food_delivery',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      setCurrentOrder({ id: docRef.id, ...orderData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("آرڈر میں غلطی:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <FoodContext.Provider value={{ currentOrder, placeFoodOrder }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
