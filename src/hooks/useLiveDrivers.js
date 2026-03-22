import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, limit } from 'firebase/firestore';
import { SecurityEngine } from '../finance/SecurityEngine';

export const useLiveDrivers = (userLocation) => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // صرف ان ڈرائیورز کو ڈھونڈنا جو 'Online' ہیں اور فارغ ہیں
        const q = query(
            collection(db, "drivers"),
            where("isOnline", "==", true),
            where("currentStatus", "==", "AVAILABLE"),
            limit(10) // سسٹم پر بوجھ کم کرنے کے لیے صرف قریبی 10 ڈرائیورز
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const liveData = snapshot.docs.map(doc => {
                const rawData = doc.data();
                
                // 🛡️ SECURITY LAYER: حساس ڈیٹا کو ماسک کرنا
                // صارف کو صرف عرفیت (Nickname) اور ریٹنگ نظر آئے گی
                return {
                    id: doc.id,
                    lat: rawData.location.latitude,
                    lng: rawData.location.longitude,
                    nickname: rawData.displayName.split(' ')[0], // صرف پہلا نام
                    rating: rawData.rating || "5.0",
                    carType: rawData.vehicleInfo?.type || "Tezro Standard",
                    plateNo: rawData.vehicleInfo?.plate?.substring(0, 2) + "-***", // نمبر پلیٹ چھپانا
                    integrity: SecurityEngine.encryptVault(doc.id) // سیشن سیکیورٹی ہیش
                };
            });

            setDrivers(liveData);
            setLoading(false);
        }, (error) => {
            console.error("Vault Security Alert: Driver Stream Interrupted", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return drivers;
};
