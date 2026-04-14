import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchHotels = async (city) => {
  try {
    const q = query(collection(db, "hotels"), where("city", "==", city));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Hotel Fetch Error:", error);
    return [];
  }
};

export const bookHotel = async (bookingData) => {
  // Booking logic here
};
