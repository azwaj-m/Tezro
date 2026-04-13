import { db } from '../firebase';
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

export const executePayment = async (rideId, passengerId, driverId, amount) => {
    try {
        // 1. سواری کے والٹ سے رقم منہا کرنا
        const passengerRef = doc(db, "users", passengerId);
        await updateDoc(passengerRef, {
            walletBalance: increment(-amount)
        });

        // 2. ڈرائیور کے والٹ میں رقم جمع کرنا
        const driverRef = doc(db, "drivers", driverId);
        await updateDoc(driverRef, {
            earnings: increment(amount),
            walletBalance: increment(amount)
        });

        // 3. رائیڈ اسٹیٹس اپ ڈیٹ کرنا
        const rideRef = doc(db, "ride_requests", rideId);
        await updateDoc(rideRef, {
            status: "completed",
            paymentStatus: "paid",
            completedAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error("Payment Error:", error);
        return { success: false };
    }
};
