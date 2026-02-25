/**
 * TEZRO MASTER REGISTRATION & POPUP LOGIC
 * یہ فائل ڈیٹا کی قسم طے کرتی ہے، پاپ اپ کے فیلڈز بتاتی ہے اور سیکیورٹی ہینڈل کرتی ہے
 */

export const RegistrationLogic = {
  
  // 1. سروس کنفرم کرتے وقت پاپ اپ کی نوعیت طے کرنا (Upgraded getPopupFields)
  getPopupConfig: (type) => {
    switch (type) {
      case 'RIDE':
      case 'RIDER':
        return { 
          fields: ['fullName', 'phone', 'emergencyContacts', 'faceAuth'], 
          title: '🛡️ Rider Verification',
          note: 'رائیڈر کی حفاظت کے لیے سیلفی اور ایمرجنسی نمبرز لازمی ہیں۔'
        };
      case 'SHOP':
      case 'FOOD':
      case 'PARCEL':
      case 'BUYER':
        return { 
          fields: ['fullName', 'phone', 'address', 'locationCoords'], 
          title: '🛒 Order Confirmation',
          note: 'سامان کی درست ڈیلیوری کے لیے نام اور پتہ فراہم کریں۔'
        };
      case 'HOTEL':
      case 'HALL':
      case 'VENDOR':
        return { 
          fields: ['fullName', 'shopName', 'phone', 'managerCnic', 'businessDocs', 'location'], 
          title: '💼 Business Security Portal',
          note: 'کاروباری تصدیق کے لیے اصل دستاویزات اور لوکیشن لازمی ہے۔'
        };
      default:
        return { 
          fields: ['fullName', 'phone'], 
          title: 'Quick Login',
          note: 'آگے بڑھنے کے لیے لاگ ان کریں۔'
        };
    }
  },

  // 2. تمام فیلڈز کی تفصیلات (Detailed Fields Metadata)
  getRequiredFields: (userType) => {
    const commonFields = {
      fullName: { label: "مکمل نام", required: true, type: "text" },
      phone: { label: "فون نمبر", required: true, type: "tel" },
      emergencyContacts: { label: "ایمرجنسی نمبرز (1-5)", required: true, type: "array", min: 1, max: 5 },
    };

    const configs = {
      BUYER: {
        ...commonFields,
        address: { label: "پتہ / ڈیلیوری لوکیشن", required: true, type: "text" },
        locationCoords: { label: "مطلوبہ منزل (GPS)", required: true, type: "geo" }
      },
      DRIVER: {
        ...commonFields,
        cnic: { label: "شناختی کارڈ نمبر", required: true, type: "number" },
        license: { label: "ڈرائیونگ لائسنس", required: true, type: "file" },
        vehicleType: { label: "گاڑی کی نوعیت (کار/رکشہ/بائیک)", required: true, type: "select" },
        plateNo: { label: "گاڑی کا نمبر", required: true, type: "text" },
        faceAuth: { label: "لائیو سیلفی", required: true, type: "camera" }
      },
      VENDOR: {
        ...commonFields,
        shopName: { label: "کاروبار کا نام", required: true, type: "text" },
        businessDocs: { label: "دستاویزات", required: true, type: "file" },
        managerCnic: { label: "مینیجر کا شناختی کارڈ", required: true, type: "number" },
        location: { label: "لوکیشن (Geo-Lock)", required: true, type: "geo" }
      },
      HOTEL: {
        ...commonFields,
        hotelLicense: { label: "لائسنس", required: true, type: "file" },
        managerID: { label: "مینیجر کی شناخت", required: true, type: "file" },
        totalRooms: { label: "کمروں کی تعداد", required: true, type: "number" },
        exactLocation: { label: "ہوٹل لوکیشن", required: true, type: "geo" }
      },
      DELIVERY: {
        ...commonFields,
        bikeDocs: { label: "بائیک کاغذات", required: true, type: "file" },
        cnic: { label: "شناختی کارڈ", required: true, type: "number" }
      }
    };

    return configs[userType] || commonFields;
  },

  // 3. سیکیورٹی فلٹر (حساس ڈیٹا حذف کرنا)
  sanitizeAfterVerification: (rawData) => {
    return {
      publicID: Math.random().toString(36).substr(2, 9).toUpperCase(),
      displayName: rawData.fullName ? rawData.fullName.split(' ')[0] + "..." : "User", 
      profileImage: rawData.faceAuth || rawData.profilePic || null, 
      vehicleInfo: rawData.plateNo ? `${rawData.vehicleType} (${rawData.plateNo})` : null,
      isVerified: true,
      // حساس ڈیٹا (CNIC, Docs) یہاں سے غائب ہو جائے گا
    };
  }
};
