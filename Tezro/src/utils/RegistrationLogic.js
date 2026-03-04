/**
 * TEZRO MASTER REGISTRATION LOGIC
 * پیتھ: src/utils/RegistrationLogic.js
 * پروٹیکشن لیول: ہائی (GDPR & Vault Standards)
 */

const RegistrationLogic = {
  
  // 1. ڈائنامک کنفیگریشن (کون سی فیلڈ کس کے لیے ہے)
  getRequiredFields: (role) => {
    const common = {
      fullName: { label: "مکمل نام", type: "text", required: true },
      phone: { label: "فون نمبر", type: "tel", required: true },
      address: { label: "پتہ", type: "text", required: true }
    };

    const roles = {
      driver: { ...common, vehicleNo: "text", cnic: "number" },
      vendor: { ...common, businessName: "text", ntn: "text" },
      BUYER: { ...common, emergencyContacts: "array" } // پاپ اپ کے لیے
    };

    return roles[role] || common;
  },

  // 2. ڈیٹا سینیٹائزیشن (پاپ اپ فائل کے لیے لازمی)
  sanitizeAfterVerification: (data) => {
    if (!data) return {};
    return {
      ...data,
      fullName: data.fullName?.trim().toUpperCase(),
      isVerified: true,
      vaultStatus: "PENDING",
      processedAt: new Date().toISOString()
    };
  },

  // 3. سیکیورٹی فلٹر (پبلک ویو کے لیے)
  sanitizeForPublic: (data) => {
    if (!data || !data.businessName) return {};
    return {
      bizName: data.businessName,
      category: data.role,
      isVerified: true,
      displayName: data.businessName.split(' ')[0] + "...",
      joinedAt: Date.now()
    };
  },

  // 4. ڈیٹا ویلیڈیشن (CNIC Guard)
  validateCNIC: (cnic) => {
    return /^[0-9]{13}$/.test(cnic); 
  }
};

export default RegistrationLogic;
