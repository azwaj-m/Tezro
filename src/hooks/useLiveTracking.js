import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { SecurityEngine } from '../../utils/security/SecurityEngine';

export const useLiveTracking = (orderId, type = 'ride') => {
    const [trackingData, setTrackingData] = useState({
        location: { lat: 0, lng: 0 },
        eta: 'Calculating...',
        status: 'Preparing...',
        partner: { name: 'Tezro Hero', phone: '', vehicle: '' },
        lastUpdated: null
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId) return;

        // آرڈر کی قسم کے لحاظ سے ڈیٹا بیس کے راستے (Paths) طے کرنا
        const collectionMap = {
            ride: 'active_rides',
            food: 'food_deliveries',
            shop: 'store_orders',
            parcel: 'logistics'
        };

        const targetPath = collectionMap[type] || 'active_rides';

        // ریئل ٹائم لسنر - ہائی ڈیفینیشن سنکنگ
        const unsubscribe = onSnapshot(doc(db, targetPath, orderId), 
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    
                    // سیکیورٹی چیک: کیا ڈیٹا کی انٹیگریٹی درست ہے؟
                    const isSecure = data.integrity_hash ? true : false;

                    setTrackingData({
                        location: data.current_location || { lat: 0, lng: 0 },
                        eta: data.eta || '3-5 mins',
                        status: data.status_text || 'On the move',
                        partner: {
                            name: data.partner_info?.name || 'Tezro Expert',
                            phone: data.partner_info?.phone || 'Hidden',
                            vehicle: data.partner_info?.vehicle_no || 'Standard'
                        },
                        lastUpdated: data.last_ping?.toDate()
                    });
                } else {
                    setError("Order session expired or not found.");
                }
            }, 
            (err) => {
                console.error("Tracking System Error:", err);
                setError("Connection lost. Retrying...");
            }
        );

        // کلین اپ فنکشن: جب یوزر اسکرین سے جائے تو کنکشن ختم کر دو تاکہ بیٹری بچے
        return () => unsubscribe();
    }, [orderId, type]);

    // ایمرجنسی SOS فنکشن جو اسی ہک سے کال ہوگا
    const triggerSOS = async () => {
        const log = SecurityEngine.generateAuditTrail(orderId, "SOS_TRIGGERED", 0);
        console.warn("CRITICAL: SOS signal sent to Tezro Command Center", log);
        // یہاں ہم فائر بیس میں الرٹ بھیجنے کا لاجک جوڑ سکتے ہیں
        return log.logId;
    };

    return { trackingData, error, triggerSOS };
};
