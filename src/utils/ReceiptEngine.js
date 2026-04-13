import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

export const generateFinalReceipt = async (rideId) => {
    try {
        const rideRef = doc(db, "ride_requests", rideId);
        const rideSnap = await getDoc(rideRef);
        
        if (rideSnap.exists()) {
            const data = rideSnap.data();
            return {
                rideId: rideId,
                amount: data.fare,
                date: new Date(data.completedAt.seconds * 1000).toLocaleString('ur-PK'),
                driver: data.driverId,
                status: "PAID & SECURED"
            };
        }
    } catch (error) {
        console.error("Receipt Generation Error:", error);
    }
    return null;
};
