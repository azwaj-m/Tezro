// Tezro Smart Notification & Alert System
export const sendSmartNotification = (userRole, actionType, payload) => {
  const deviceLang = navigator.language || 'en-US';

  const templates = {
    customer: {
      ride_confirmed: { ur: "آپ کی سواری بک ہو گئی ہے", en: "Your ride is confirmed" },
      delivery_near: { ur: "آپ کا پارسل قریب ہے", en: "Your delivery is nearby" }
    },
    driver: {
      new_request: { ur: "نئی سواری کی درخواست", en: "New ride request available" },
      security_alert: { ur: "گارڈین الرٹ: اپنا ماحول چیک کریں", en: "Guardian Alert: Check surroundings" }
    },
    vendor: {
      new_order: { ur: "نیا آرڈر موصول ہوا", en: "New order received" },
      payment_success: { ur: "ادائیگی موصول ہو گئی", en: "Payment received successfully" }
    }
  };

  const langCode = deviceLang.startsWith('ur') ? 'ur' : 'en';
  const message = templates[userRole]?.[actionType]?.[langCode] || templates[userRole]?.[actionType]?.['en'];

  // براؤزر نوٹیفکیشن (ہلکا ترین طریقہ)
  if (Notification.permission === "granted") {
    new Notification("Tezro Ultra", { body: message, icon: "/assets/logo.png" });
  }

  return message;
};
