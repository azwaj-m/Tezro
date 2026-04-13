import { db } from '../firebase';
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export const acceptRide = async (requestId, driverId) => {
    try {
        // 4 ہندسوں کا سیکیور OTP بنانا
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
    if (String(enteredOtp) === String(actualOtp)) {
        const requestRef = doc(db, "ride_requests", requestId);
        await updateDoc(requestRef, {
            status: "on_trip",
            startTime: serverTimestamp()
        });
        return { success: true };
    }
    return { success: false, error: "غلط سیکیورٹی کوڈ!" };
};
