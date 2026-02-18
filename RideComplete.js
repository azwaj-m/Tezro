import { db } from '../firebase-config.js';
import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * رائیڈ مکمل ہونے پر کمیشن کاٹنے کا فنکشن
 * @param {string} driverId - ڈرائیور کی یونیک آئی ڈی
 * @param {number} rideFare - رائیڈ کا کل کرایہ (Total Bill)
 */
async function processRideCommission(driverId, rideFare) {
    try {
        // 1. سب سے پہلے گلوبل سیٹنگز سے کمیشن کی شرح (Percentage) حاصل کریں
        const configRef = doc(db, "system", "appConfig");
        const configSnap = await getDoc(configRef);
        
        let commissionRate = 10; // اگر ڈیٹا بیس میں نہ ملے تو ڈیفالٹ 10 فیصد
        if (configSnap.exists()) {
            commissionRate = configSnap.data().commissionRate;
        }

        // 2. کمیشن کی رقم نکالیں (مثلاً: 500 کا 10% = 50 روپے)
        const commissionAmount = (rideFare * commissionRate) / 100;

        // 3. ڈرائیور کے والٹ سے رقم کاٹیں (منفی کریں)
        const driverRef = doc(db, "users", driverId);
        await updateDoc(driverRef, {
            walletBalance: increment(-commissionAmount), // رقم مائنس کرنے کے لیے منفی کا نشان
            totalEarnings: increment(rideFare - commissionAmount) // ڈرائیور کی کل کمائی میں اضافہ
        });

        console.log(`کامیابی: ${commissionAmount} روپے کمیشن کاٹ لیا گیا (شرح: ${commissionRate}%)`);
        return true;

    } catch (error) {
        console.error("کمیشن پروسیسنگ میں غلطی:", error);
        return false;
    }
}
