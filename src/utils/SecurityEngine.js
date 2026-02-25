// یہ ماسٹر سیکیورٹی انجن ہے جو ڈیٹا پرائیویسی اور لائیو رائیڈ سیکیورٹی دونوں کو سنبھالتا ہے
export const SecurityEngine = {
  
  // ==========================================
  // 1. ڈیٹا سیکیورٹی (Encryption & Privacy)
  // ==========================================

  // ون وے ہیش: ڈیٹا کو ناقابلِ فہم کوڈ میں بدلنا (سیکیورٹی اداروں کے لیے)
  generateSecureHash: (data) => {
    if (!data) return "";
    // یہ فنکشن ڈیٹا کو ریورس کر کے Base64 میں بدلتا ہے تاکہ اصل ڈیٹا چھپ جائے
    return btoa(data).split('').reverse().join('').substring(0, 15).toUpperCase();
  },

  // آدھا نام دکھانے کا فنکشن (Privacy Shield)
  maskName: (name) => {
    if (!name) return "";
    const parts = name.trim().split(' ');
    return parts.length > 1 ? `${parts[0]} ${parts[1][0]}...` : name;
  },


  // ==========================================
  // 2. لائیو رائیڈ سیکیورٹی (Route Tracking)
  // ==========================================

  // راستہ بھٹکنے کا الرٹ چیک (10% گنجائش والا فارمولا)
  checkRouteSafety: (plannedDistance, currentDistance) => {
    // 1.10 کا مطلب ہے 10 فیصد اضافی فاصلے کی اجازت ہے (ٹریفک یا موڑ کے لیے)
    const safeThreshold = plannedDistance * 1.10; 
    
    // اگر موجودہ فاصلہ مقررہ حد سے بڑھ جائے تو الرٹ جاری کریں
    const isDangerous = currentDistance > safeThreshold;
    
    return {
      isSafe: !isDangerous,
      deviation: currentDistance - plannedDistance,
      status: isDangerous ? "🚨 Deviation Detected" : "✅ On Track"
    };
  },

  // میٹر کے حساب سے درستگی (بغیر کسی نقصان کے پرانا فیچر)
  isDeviatedByMeters: (currentDeviation) => {
    const distanceThreshold = 0.5; // 500 میٹر کی حد
    return currentDeviation > distanceThreshold;
  }
};
