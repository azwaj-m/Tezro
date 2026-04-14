import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const requestHallQuote = async (quoteData) => {
  try {
    await addDoc(collection(db, "hall_inquiries"), {
      ...quoteData,
      timestamp: new Date()
    });
    return true;
  } catch (error) {
    return false;
  }
};
