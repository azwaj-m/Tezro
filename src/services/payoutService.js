import { db } from '../firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

export const processPayout = async (id, amount, rate) => {
  const comm = (amount * rate) / 100;
  const net = amount - comm;

  try {
    // ایڈمن کے والٹ میں کمیشن ڈالیں اور وینڈر کا ریکارڈ اپ ڈیٹ کریں
    await updateDoc(doc(db, 'stats', 'global'), { totalEarnings: increment(comm) });
    await updateDoc(doc(db, 'vendors', id), { 
      paid: increment(net), 
      history: arrayUnion({ date: new Date().toISOString(), amt: net }) 
    });
    return { success: true };
  } catch (e) { return { success: false }; }
};
