import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

export const verifyDriverStatus = async (driverId) => {
    try {
        // 1. فائر بیس سے ڈیٹا فیچ کرنا (براہ راست سرور ٹو سرور تصدیق)
        const docRef = doc(db, "drivers", driverId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // 2. سیکیورٹی چیکس (اسٹیٹس اور رجسٹریشن کی تاریخ)
            if (data.status === 'verified' && data.selfie) {
                // مقامی طور پر سیکیور ٹوکن محفوظ کریں
                localStorage.setItem('tezro_driver_token', driverId);
                localStorage.setItem('driver_active', 'true');
                return { success: true, data: data };
            }
        }
        return { success: false, error: "تصدیق ناکام: ڈیٹا موجود نہیں یا غیر قانونی ہے۔" };
    } catch (error) {
        console.error("Security Scan Error:", error);
        return { success: false, error: "نیٹ ورک یا سیکیورٹی ایرر" };
    }
};
