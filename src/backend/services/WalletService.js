import { db } from '../../firebase-config';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

export const processVaultPayment = async (userId, vendorId, amount, orderId) => {
    const userRef = doc(db, "users", userId);
    const vendorRef = doc(db, "users", vendorId);
    const orderRef = doc(db, "orders", orderId);

    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists() || userDoc.data().balance < amount) {
                throw "Insufficient Vault Balance!";
            }

            // 1. صارف کے پیسے کاٹنا
            transaction.update(userRef, { 
                balance: userDoc.data().balance - amount 
            });

            // 2. وینڈر کو پیسے منتقل کرنا (کمیشن کاٹ کر)
            const commission = amount * 0.10; // 10% Platform Fee
            const vendorPay = amount - commission;
            
            transaction.update(vendorRef, { 
                balance: (vendorDoc?.data()?.balance || 0) + vendorPay 
            });

            // 3. ٹرانزیکشن لاگ محفوظ کرنا
            transaction.set(doc(db, "vault_logs", `TXN_${Date.now()}`), {
                orderId,
                total: amount,
                commission,
                vendorPay,
                status: 'COMPLETED',
                timestamp: serverTimestamp()
            });
        });
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};
