
import { db } from '../firebase';

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";



export const acceptRide = async (requestId, driverId) => {

    try {

        const otpCode = Math.floor(1000 + Math.random() * 9000);

        const requestRef = doc(db, "ride_requests", requestId);

        await updateDoc(requestRef, {

            driverId: driverId,

            status: "accepted",

            otp: otpCode,

            acceptedAt: serverTimestamp()

        });

        return { success: true, otp: otpCode };

    } catch (error) {

        console.error("Ride Accept Error:", error);

        return { success: false };

    }

};



export const startTrip = async (requestId, enteredOtp, actualOtp) => {

    // بیماری کا علاج: اسٹرنگ کنورژن اور اسٹیٹ اپ ڈیٹ

    if (String(enteredOtp).trim() === String(actualOtp).trim()) {

        try {

            const requestRef = doc(db, "ride_requests", requestId);

            await updateDoc(requestRef, {

                status: "on_trip",

                startTime: serverTimestamp()

            });

            return { success: true };

        } catch (e) {

            return { success: false, error: "ڈیٹا بیس سے رابطہ نہیں ہو سکا" };

        }

    }

    return { success: false, error: "غلط سیکیورٹی کوڈ! دوبارہ کوشش کریں۔" };

};

