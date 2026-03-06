/**
 * TEZRO VAULT & SECURITY ENGINE (Merged)
 * پیتھ: src/Tezro_Vault/SecurityEngine.js
 */

import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// 1. خاموش سیکیورٹی گارڈ (Internal Private Function)
const triggerSecurityLog = async (userId, reason, severity = "MEDIUM") => {
    try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const logData = {
                uid: userId || "UNKNOWN_ACCESS",
                reason: reason,
                severity: severity,
                location: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                },
                device: navigator.userAgent.slice(0, 50),
                time: serverTimestamp()
            };
            await addDoc(collection(db, "Security_Logs"), logData);
        });
    } catch (e) {
        console.error("Silent Log Failed", e);
    }
};

// 2. مین سیکیورٹی انجن (وہی نام جو آپ کے پراجیکٹ میں استعمال ہو رہا ہے)
export const SecurityEngine = {
    // والٹ لاک کرنا (Old Logic + Improvements)
    encryptVault: (data) => {
        try {
            console.log("🔐 Vault Encrypting...");
            const stringifiedData = JSON.stringify(data);
            return btoa(stringifiedData).split('').reverse().join('');
        } catch (error) {
            console.error("Encryption Error:", error);
            return null;
        }
    },

    // والٹ ان لاک کرنا (With Automatic Intelligence)
    decryptVault: async (encryptedData, userId) => {
        try {
            console.log("🔓 Vault Decrypting...");
            const reversedData = encryptedData.split('').reverse().join('');
            const decrypted = JSON.parse(atob(reversedData));
            return decrypted;
        } catch (error) {
            // 🚨 یہاں جادو ہے: اگر ڈیکرپشن فیل ہوئی، تو چپکے سے لاگ بھیج دو
            console.error("❌ Decryption Failed! Reporting to HQ...");
            await triggerSecurityLog(userId, "UNAUTHORIZED_VAULT_DECRYPTION_ATTEMPT", "CRITICAL");
            return null;
        }
    }
};
