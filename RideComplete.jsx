// درست پاتھ: ہم پہلے سے src کے اندر ہیں، اس لیے براہ راست '../firebase' استعمال کریں گے
// اگر یہ فائل src/utils یا کسی اور فولڈر میں ہے تو پاتھ کو اس کے مطابق سیٹ کریں
import { db } from '../../firebase'; 

// فائر بیس لائبریری کو npm سے امپورٹ کریں، CDN سے نہیں
import { 
    doc, 
    getDoc, 
    updateDoc, 
    increment, 
    collection, 
    addDoc, 
    serverTimestamp 
} from "firebase/firestore";

/**
 * Tezro رائیڈ مکمل ہونے پر کمیشن کاٹنے اور والٹ اپ ڈیٹ کرنے کا فنکشن
 */
export async function processRideCommission(driverId, rideFare) {
    try {
        console.log("Tezro: پروسیسنگ شروع ہو رہی ہے...");

        // 1. ایڈمن کی سیٹنگز سے کمیشن حاصل کریں
        const configRef = doc(db, "system", "appConfig");
        const configSnap = await getDoc(configRef);
        
        let commissionRate = 10; 
        if (configSnap.exists()) {
            commissionRate = configSnap.data().commission || 10;
        }

        // 2. حساب کتاب
        const commissionAmount = (rideFare * commissionRate) / 100;
        const driverNetEarnings = rideFare - commissionAmount;

        // 3. ڈرائیور کا والٹ اپ ڈیٹ کریں
        const driverRef = doc(db, "users", driverId);
        await updateDoc(driverRef, {
            walletBalance: increment(-commissionAmount),
            totalEarnings: increment(driverNetEarnings),
            completedRides: increment(1)
        });

        // 4. ٹرانزیکشن ریکارڈ
        const historyRef = collection(db, "users", driverId, "transactions");
        await addDoc(historyRef, {
            type: "commission_deduction",
            amount: commissionAmount,
            rideFare: rideFare,
            commissionRate: commissionRate,
            timestamp: serverTimestamp(),
            description: "Ride commission deducted"
        });

        // 5. ایڈمن ریونیو
        const adminStatsRef = doc(db, "system", "adminStats");
        await updateDoc(adminStatsRef, {
            totalCompanyRevenue: increment(commissionAmount)
        }).catch(() => console.log("Admin stats doc missing, skipping..."));

        console.log(`✅ کامیابی: ${commissionAmount} روپے کمیشن کٹ گیا`);
        return { success: true, deducted: commissionAmount };

    } catch (error) {
        console.error("❌ Tezro Error:", error);
        return { success: false, error: error.message };
    }
}
