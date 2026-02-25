/**
 * TEZRO BOOKING GUARD (The Risk Engine)
 * یہ فائل ہر سروس کی سیکیورٹی ریکوائرمنٹس اور پیمنٹ رولز طے کرتی ہے
 */

export const BookingGuard = {
  
  /**
   * سروس کی قسم اور آرڈر کی مالیت کی بنیاد پر ریکوائرمنٹس فراہم کرتا ہے
   * @param {string} serviceType - RIDE, FOOD, SHOP, HOTEL, FUNCTION_HALL, PARCEL
   * @param {number} orderValue - آرڈر کی کل رقم
   */
  getRequirements: (serviceType, orderValue = 0) => {
    
    // ڈیفالٹ بیسک ریکوائرمنٹس
    const baseConfig = {
      title: "کنفرمیشن",
      fields: ["fullName", "phone"],
      payment: "CASH_ON_DELIVERY",
      securityLevel: 1, // 1: Basic, 2: Medium, 3: High Security
    };

    switch (serviceType) {
      case 'RIDE':
        return {
          ...baseConfig,
          title: "Rider Verification",
          fields: ["fullName", "phone", "emergencyContacts", "selfie_auth"],
          payment: orderValue > 10000 ? "WALLET_HOLD_MANDATORY" : "CASH_OR_WALLET",
          securityLevel: 2
        };

      case 'FOOD':
      case 'SHOP':
      case 'PARCEL':
        return {
          ...baseConfig,
          title: "Order Details",
          fields: ["fullName", "phone", "address"],
          // اگر شاپنگ 5000 سے اوپر ہے تو پارشل ایڈوانس
          payment: orderValue > 5000 ? "PARTIAL_ADVANCE_30" : "CASH_ON_DELIVERY",
          securityLevel: 1
        };

      case 'HOTEL':
        return {
          ...baseConfig,
          title: "Guest Security Verification",
          fields: ["fullName", "phone", "cnic_passport", "address"],
          payment: "ADVANCE_BOOKING_FEE",
          securityLevel: 2
        };

      case 'FUNCTION_HALL':
        return {
          ...baseConfig,
          title: "Event Security & Booking",
          fields: ["fullName", "phone", "cnic_passport", "address", "liability_agreement"],
          // فنکشن ہال کے لیے 50% ایڈوانس لازمی ہے
          payment: "50_PERCENT_ADVANCE_MANDATORY",
          securityLevel: 3
        };

      default:
        return baseConfig;
    }
  },

  /**
   * کینسلشن پالیسی چیکر
   * @param {string} serviceType 
   * @param {number} hoursBefore - بکنگ سے کتنے گھنٹے پہلے کینسل کیا جا رہا ہے
   */
  canCancelWithRefund: (serviceType, hoursBefore) => {
    const policies = {
      RIDE: 0.1, // 6 منٹ پہلے تک فری
      FOOD: 0,   // کچن شروع ہونے کے بعد ریفنڈ نہیں
      HOTEL: 24, // 24 گھنٹے پہلے لازمی
      FUNCTION_HALL: 72, // 3 دن پہلے لازمی
    };
    
    const limit = policies[serviceType] || 0;
    return hoursBefore >= limit;
  }
};
