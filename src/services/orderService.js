import { db } from '../firebase';
import { collection, doc, runTransaction, serverTimestamp, increment } from 'firebase/firestore';

export const orderService = {
  // یونیورسل آرڈر فنکشن (فوڈ، شاپ، ہوٹل سب کے لیے)
  placeOrder: async (orderData) => {
    const orderRef = doc(collection(db, 'orders'));
    const adminFinRef = doc(db, 'system_stats', 'finances');
    const vendorRef = doc(db, 'vendors', orderData.vendorId);

    try {
      await runTransaction(db, async (transaction) => {
        // 10% ایڈمن کمیشن کی لاجک
        const adminShare = orderData.total * 0.10;
        const vendorShare = orderData.total - adminShare;

        // آرڈر سیو کرنا
        transaction.set(orderRef, {
          ...orderData,
          adminCommission: adminShare,
          vendorNet: vendorShare,
          status: 'pending',
          createdAt: serverTimestamp()
        });

        // ایڈمن والٹ اپ ڈیٹ کرنا
        transaction.update(adminFinRef, {
          totalEarnings: increment(adminShare),
          platformVolume: increment(orderData.total)
        });

        // وینڈر کا پینڈنگ بیلنس اپ ڈیٹ کرنا
        transaction.update(vendorRef, {
          pendingBalance: increment(vendorShare),
          totalOrders: increment(1)
        });
      });
      return { success: true, id: orderRef.id };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
