import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';

export const placeFoodOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "food_orders"), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
