import { db } from '../firebase-config.js';
import { 
    doc, 
    getDoc, 
    updateDoc, 
    increment, 
    collection, 
    addDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Tezro رائیڈ مکمل ہونے پر کمیشن کاٹنے اور والٹ اپ ڈیٹ کرنے کا فنکشن
 */
export async function processRideCommission(driverId, rideFare) {
    try {
        console.log("Tezro: پروسیسنگ شروع ہو رہی ہے...");

        // 1. ایڈمن کی سیٹنگز سے موجودہ کمیشن ریٹ حاصل کریں
        const configRef = doc(db, "system", "appConfig");
        const configSnap = await getDoc(configRef);
        
        // ایڈمن پینل میں ہم نے فیلڈ کا نام 'commission' رکھا تھا
        let commissionRate = 10; 
        if (configSnap.exists()) {
            commissionRate = configSnap.data().commission || 10;
        }

        // 2. حساب کتاب (Calculation)
        const commissionAmount = (rideFare * commissionRate) / 100;
        const driverNetEarnings = rideFare - commissionAmount;

        // 3. ڈرائیور کا والٹ اپ ڈیٹ کریں
        const driverRef = doc(db, "users", driverId);
        await updateDoc(driverRef, {
            walletBalance: increment(-commissionAmount), // والٹ سے کمیشن کٹ گیا
            totalEarnings: increment(driverNetEarnings), // ڈرائیور کی نیٹ کمائی میں اضافہ
            completedRides: increment(1)               // مکمل رائیڈز کا ریکارڈ
        });

        // 4. ٹرانزیکشن ہسٹری میں ریکارڈ محفوظ کریں (ڈرائیور کے دیکھنے کے لیے)
        const historyRef = collection(db, "users", driverId, "transactions");
        await addDoc(historyRef, {
            type: "commission_deduction",
            amount: commissionAmount,
            rideFare: rideFare,
            commissionRate: commissionRate,
            timestamp: serverTimestamp(),
            description: "Ride commission deducted"
        });

        // 5. ایڈمن کے لیے کل آمدنی (Revenue) کو اپ ڈیٹ کرنا (اختیاری)
        const adminStatsRef = doc(db, "system", "adminStats"); // اگر آپ الگ سے ٹریک کرنا چاہیں
        await updateDoc(adminStatsRef, {
            totalCompanyRevenue: increment(commissionAmount)
        }).catch(() => console.log("Admin stats document not found, skipping..."));

        console.log(`✅ کامیابی: ${commissionAmount} روپے کمیشن کاٹ لیا گیا (شرح: ${commissionRate}%)`);
        return { success: true, deducted: commissionAmount };

    } catch (error) {
        console.error("❌ Tezro Error (Commission):", error);
        return { success: false, error: error.message };
    }
}
