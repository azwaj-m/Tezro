import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase';
import { doc, onSnapshot, collection, query, where, limit } from 'firebase/firestore';

export const useShopStats = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        ordersCount: 0,
        dailySales: 0,
        activeOrders: [],
        lastUpdate: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        }

        // 1. وینڈر کے مین پروفائل اور ٹوٹل ریونیو کا لسنر
        const vendorRef = doc(db, "vendors", user.uid);
        const unSubVendor = onSnapshot(vendorRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStats(prev => ({
                    ...prev,
                    revenue: data.totalEarnings || 0,
                    ordersCount: data.completedOrdersCount || 0
                }));
            }
        }, (error) => console.error("Vendor Profile Sync Error:", error));

        // 2. لائیو آرڈرز کی کوئری (Pending اور Processing)
        const ordersQuery = query(
            collection(db, "orders"),
            where("vendorId", "==", user.uid),
            where("status", "in", ["Pending", "Processing", "pending"]), // چھوٹے بڑے حروف دونوں ہینڈل کیے
            limit(50) 
        );

        const unSubOrders = onSnapshot(ordersQuery, (snapshot) => {
            let dailyTotal = 0;
            const orders = [];

            snapshot.forEach((doc) => {
                const orderData = doc.data();
                orders.push({ id: doc.id, ...orderData });
                
                // اگر آرڈر آج کا ہے تو ڈیلی سیلز میں جمع کریں
                if (orderData.amount) {
                    dailyTotal += orderData.amount;
                }
            });

            setStats(prev => ({
                ...prev,
                activeOrders: orders,
                dailySales: dailyTotal,
                lastUpdate: new Date().toLocaleTimeString()
            }));
            setLoading(false);
        }, (error) => {
            console.error("Orders Sync Error:", error);
            setLoading(false);
        });

        // کلین اپ فنکشن
        return () => {
            unSubVendor();
            unSubOrders();
        };
    }, []);

    return { stats, loading };
};
