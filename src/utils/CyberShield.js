/**
 * TEZRO CYBER-SHIELD ENGINE
 * پیتھ: src/utils/CyberShield.js
 */

export const CyberShield = {
  // 1. مشکوک لنکس کی پہچان (Phishing Detection)
  scanLink: (url) => {
    const suspiciousPatterns = [/bit\.ly/, /tinyurl\.com/, /gift-card/, /free-money/];
    const isMalicious = suspiciousPatterns.some(pattern => pattern.test(url.toLowerCase()));
    
    if (isMalicious) {
      return { safe: false, warning: "⚠️ یہ لنک خطرناک ہو سکتا ہے! اسے نہ کھولیں۔" };
    }
    return { safe: true };
  },

  // 2. میسج فلٹرنگ (SMS/WhatsApp Scam Detection)
  analyzeMessage: (message) => {
    const scamKeywords = ["otp", "pin", "password", "انعام", "لاٹری", "account blocked"];
    const containsScam = scamKeywords.some(word => message.toLowerCase().includes(word));

    if (containsScam) {
      return { risk: "HIGH", action: "BLOCK_NOTIFICATION", message: "🔒 مشکوک پیغام بلاک کر دیا گیا ہے۔" };
    }
    return { risk: "LOW" };
  },

  // 3. ہیکنگ اٹیمپٹ الرٹ (Brute Force or Unauthorized Access)
  monitorAppAccess: (appData) => {
    // اگر کوئی ایپ بیک گراؤنڈ میں غیر ضروری ڈیٹا لے رہی ہو
    if (appData.isBackground && appData.dataUsage > 50) { // 50MB سے زیادہ بیک گراؤنڈ ڈیٹا
      return "🚨 الرٹ: ایک ایپ غیر معمولی ڈیٹا ٹرانسفر کر رہی ہے۔";
    }
    return null;
  }
};
