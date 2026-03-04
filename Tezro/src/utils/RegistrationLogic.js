/**
 * TEZRO MASTER REGISTRATION LOGIC
 * پروٹیکشن لیول: ہائی (GDPR & Vault Standards)
 */

export const RegistrationLogic = {
  
  // 1. ڈائنامک کنفیگریشن (کون سی فیلڈ کس کے لیے ہے)
  getRequiredFields: (role) => {
    const common = {
      businessName: { label: "بزنس کا نام", type: "text", required: true },
      cnic: { label: "شناختی کارڈ نمبر", type: "number", min: 13, required: true },
    };

    const roles = {
      driver: { ...common, vehicleNo: "text", vehicleType: "select" },
      hotel: { ...common, totalRooms: "number", license: "text" },
      vendor: { ...common, storeCategory: "text", ntn: "text" },
      logistic: { ...common, vehicleType: "select", insurance: "text" }
    };

    return roles[role] || common;
  },

  // 2. سیکیورٹی فلٹر (حساس ڈیٹا کو ماسک کرنا)
  // یہ فنکشن پبلک ویو کے لیے ڈیٹا کو فلٹر کرتا ہے
  sanitizeForPublic: (data) => {
    return {
      bizName: data.businessName,
      category: data.role,
      isVerified: true,
      // نام کو ماسک کرنا (Privacy Shield)
      displayName: data.businessName.split(' ')[0] + "...",
      joinedAt: Date.now()
    };
  },

  // 3. ڈیٹا ویلیڈیشن (Registration Guard)
  validateCNIC: (cnic) => {
    return /^[0-9]{13}$/.test(cnic); // صرف 13 ہندسے
  }
};
