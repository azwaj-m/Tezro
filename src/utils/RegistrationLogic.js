// Tezro Universal Registration Logic 
// یہ فائل طے کرتی ہے کہ کس صارف سے کون سی معلومات لینی ہیں

export const RegistrationLogic = {
  
  /**
   * صارف کی قسم کے لحاظ سے ضروری فیلڈز فراہم کرتا ہے
   * @param {string} userType - 'BUYER', 'DRIVER', 'VENDOR', 'DELIVERY', 'HOTEL'
   */
  getRequiredFields: (userType) => {
    // تمام صارفین کے لیے بنیادی ضروریات
    const commonFields = {
      fullName: { label: "مکمل نام", required: true, type: "text" },
      phone: { label: "فون نمبر", required: true, type: "tel" },
      emergencyContacts: { label: "ایمرجنسی نمبرز (1-5)", required: true, type: "array", min: 1, max: 5 },
    };

    switch (userType) {
      case 'BUYER': // رائیڈ لینے والا یا خریدار
        return {
          ...commonFields,
          address: { label: "پتہ / ڈیلیوری لوکیشن", required: true, type: "text" },
          locationCoords: { label: "مطلوبہ منزل (GPS)", required: true, type: "geo" }
        };

      case 'DRIVER': // ٹیکسی، رکشہ، بائیک ڈرائیور
        return {
          ...commonFields,
          cnic: { label: "شناختی کارڈ نمبر", required: true, type: "number" },
          license: { label: "ڈرائیونگ لائسنس", required: true, type: "file" },
          vehicleType: { label: "گاڑی کی نوعیت (کار/رکشہ/موٹرسائیکل)", required: true, type: "select" },
          plateNo: { label: "گاڑی کا نمبر", required: true, type: "text" },
          faceAuth: { label: "لائیو سیلفی (تصدیق کے لیے)", required: true, type: "camera" }
        };

      case 'VENDOR': // دکاندار، سیلر، شادی ہال
        return {
          ...commonFields,
          shopName: { label: "دکان/کاروبار کا نام", required: true, type: "text" },
          businessDocs: { label: "کاروباری دستاویزات", required: true, type: "file" },
          managerCnic: { label: "مینیجر کا شناختی کارڈ", required: true, type: "number" },
          location: { label: "دکان کی لوکیشن (Geo-Lock)", required: true, type: "geo" }
        };

      case 'HOTEL': // ہوٹل مالکان و مینیجرز
        return {
          ...commonFields,
          hotelLicense: { label: "ہوٹل رجسٹریشن لائسنس", required: true, type: "file" },
          managerID: { label: "مینیجر کی شناخت", required: true, type: "file" },
          totalRooms: { label: "کمروں کی تعداد", required: true, type: "number" },
          exactLocation: { label: "ہوٹل لوکیشن (میپ)", required: true, type: "geo" }
        };

      case 'DELIVERY': // ڈلیوری بوائے
        return {
          ...commonFields,
          bikeDocs: { label: "بائیک کے کاغذات", required: true, type: "file" },
          cnic: { label: "شناختی کارڈ", required: true, type: "number" },
          currentArea: { label: "کام کا علاقہ", required: true, type: "text" }
        };

      default:
        return commonFields;
    }
  },

  /**
   * ڈیٹا ویریفیکیشن کے بعد حساس ڈیٹا کو فلٹر کرنا
   * آپ کی شرط کے مطابق: صرف تصویر، آدھا نام اور گاڑی کی تفصیل باقی رہے گی
   */
  sanitizeAfterVerification: (rawData) => {
    return {
      publicID: Math.random().toString(36).substr(2, 9).toUpperCase(),
      displayName: rawData.fullName.split(' ')[0] + "...", // صرف آدھا نام
      profileImage: rawData.faceAuth || rawData.profilePic, // صرف شفاف تصویر
      vehicleInfo: rawData.plateNo ? `${rawData.vehicleType} (${rawData.plateNo})` : null,
      isVerified: true,
      // باقی حساس ڈیٹا (CNIC, License) یہاں سے حذف (Delete) ہو جائے گا
    };
  }
};
