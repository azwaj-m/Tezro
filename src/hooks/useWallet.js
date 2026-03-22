import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, runTransaction, serverTimestamp } from 'firebase/firestore';
import { SecurityEngine } from '../../finance/SecurityEngine';

export const useWallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        // ریئل ٹائم لسنر (Live Listener)
        const unsubscribe = onSnapshot(doc(db, "wallets", user.uid), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setBalance(data.balance);
                setTransactions(data.history || []);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const sendMoney = async (receiverId, amount, note = "") => {
        const senderId = auth.currentUser.uid;
        if (amount <= 0) throw new Error("Invalid Amount");

        try {
            await runTransaction(db, async (transaction) => {
                const senderRef = doc(db, "wallets", senderId);
                const receiverRef = doc(db, "wallets", receiverId);
                
                const senderSnap = await transaction.get(senderRef);
                if (senderSnap.data().balance < amount) throw "Insufficient Balance";

                // سیکیورٹی انجن کے ذریعے ٹرانزیکشن کو لاک کرنا
                const auditLog = SecurityEngine.generateAuditTrail(senderId, "TRANSFER", amount);

                transaction.update(senderRef, { 
                    balance: senderSnap.data().balance - amount,
                    history: [auditLog, ...senderSnap.data().history].slice(0, 20)
                });
                
                transaction.update(receiverRef, { 
                    balance: (await transaction.get(receiverRef)).data().balance + amount 
                });
            });
            return { success: true };
        } catch (e) {
            return { success: false, error: e };
        }
    };

    return { balance, transactions, loading, sendMoney };
};
