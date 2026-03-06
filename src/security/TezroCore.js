import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// 1. خاموش سیکیورٹی گارڈ (Incident Logger)
const triggerSecurityLog = async (userId, reason, severity = "MEDIUM") => {
    try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const logData = {
                uid: userId || "GUEST_USER",
                reason,
                severity,
                location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                device: navigator.userAgent.slice(0, 50),
                time: serverTimestamp()
            };
            await addDoc(collection(db, "Security_Logs"), logData);
        }, null, { enableHighAccuracy: true });
    } catch (e) { console.error("Logger Failed", e); }
};

// 2. انکرپشن اور والٹ مینجمنٹ (The Engine)
export const SecurityEngine = {
    // ڈیٹا لاک کرنا
    encrypt: (data) => {
        try {
            const stringified = JSON.stringify(data);
            return btoa(stringified).split('').reverse().join('');
        } catch (e) { return null; }
    },

    // ڈیٹا ان لاک کرنا + آٹو الرٹ
    decrypt: async (encryptedData, userId) => {
        try {
            const reversed = encryptedData.split('').reverse().join('');
            return JSON.parse(atob(reversed));
        } catch (error) {
            await triggerSecurityLog(userId, "VAULT_TAMPERING_DETECTED", "CRITICAL");
            return null;
        }
    }
};

// 3. محفوظ اسٹوریج (Secure Store)
export const secureStore = {
    save: (key, data) => {
        const encrypted = SecurityEngine.encrypt(data);
        localStorage.setItem(key, encrypted);
        return true;
    },
    get: async (key, userId) => {
        const data = localStorage.getItem(key);
        if (!data) return null;
        return await SecurityEngine.decrypt(data, userId);
    }
};

// 4. والٹ ٹرانزیکشن انجن (Backend Interface)
export const walletEngine = {
    process: async (userId, amount) => {
        // یہاں سیکیورٹی چیک لگائیں
        console.log(`Securing Transaction: ${userId}`);
        // فائر بیس کلاؤڈ کال یہاں آئے گی
        return { success: true, timestamp: serverTimestamp() };
    }
};
