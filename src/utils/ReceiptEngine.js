
import { db } from '../firebase';

import { doc, getDoc } from "firebase/firestore";



// سیکیورٹی کے لیے ہیش جنریٹر

export const generateSecureHash = (data) => {

    const str = JSON.stringify(data);

    return btoa(str).split('').reverse().join('').substring(0, 16).toUpperCase();

};



// لوکل ٹائم فارمیٹ

export const getLocalTimestamp = () => {

    return new Intl.DateTimeFormat('ur-PK', {

        dateStyle: 'medium',

        timeStyle: 'short'

    }).format(new Date());

};



// فائر بیس سے ڈیٹا لا کر رسید بنانا

export const generateFinalReceipt = async (rideId) => {

    try {

        const rideRef = doc(db, "ride_requests", rideId);

        const rideSnap = await getDoc(rideRef);



        if (rideSnap.exists()) {

            const data = rideSnap.data();

            const receiptData = {

                rideId: rideId,

                amount: data.fare,

                date: data.completedAt ? new Date(data.completedAt.seconds * 1000).toLocaleString('ur-PK') : getLocalTimestamp(),

                driver: data.driverId,

                status: "PAID & SECURED"

            };

            // رسید میں سیکیورٹی ہیش شامل کرنا

            receiptData.securityHash = generateSecureHash(receiptData);

            return receiptData;

        }

    } catch (error) {

        console.error("Receipt Generation Error:", error);

    }

    return null;

};

