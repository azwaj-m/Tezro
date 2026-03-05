import { db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export const CyberShield = {
  // 1. مشکوک لنکس اسکینر
  scanLink: async (userId, url) => {
    const suspiciousPatterns = [/bit\.ly/, /tinyurl\.com/, /gift-card/, /free-money/];
    const isMalicious = suspiciousPatterns.some(pattern => pattern.test(url.toLowerCase()));
    
    if (isMalicious) {
      await reportAttack(userId, "PHISHING_LINK", url);
      return { safe: false, warning: "⚠️ خطرناک لنک بلاک کر دیا گیا ہے۔" };
    }
    return { safe: true };
  },

  // 2. میسج اینالائزر
  analyzeMessage: async (userId, message) => {
    const scamKeywords = ["otp", "pin", "password", "انعام", "لاٹری"];
    const containsScam = scamKeywords.some(word => message.toLowerCase().includes(word));

    if (containsScam) {
      await reportAttack(userId, "SCAM_MESSAGE", message.substring(0, 20));
      return { risk: "HIGH", message: "🔒 مشکوک پیغام بلاک کر دیا گیا ہے۔" };
    }
    return { risk: "LOW" };
  }
};

// ہینڈلر جو خاموشی سے بیک گراؤنڈ میں الرٹ بھیجے گا
const reportAttack = async (userId, type, details) => {
  try {
    await addDoc(collection(db, "emergency_alerts"), {
      userId,
      type: "CYBER_ATTACK",
      attackType: type,
      details,
      status: "ACTIVE",
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error("Alert failed", e);
  }
};
