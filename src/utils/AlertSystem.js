export const AlertSystem = {
  // 1. راستہ بھٹکنے کا الرٹ (Deviation Alert)
  sendDeviationAlert: async (rideData, currentCoords) => {
    const { driverName, riderName, emergencyContacts, plateNo } = rideData;

    console.log(`🚨 سیکیورٹی الرٹ: رائیڈ راستہ بھٹک چکی ہے!`);

    // الف: ڈرائیور کو وارننگ (In-App Notification)
    AlertSystem.notifyDriver(driverName);

    // ب: سواری کو مطلع کرنا
    AlertSystem.notifyRider(riderName);

    // ج: تمام ایمرجنسی نمبرز کو ایس ایم ایس بھیجنا
    emergencyContacts.forEach(contact => {
      const msg = `TEZRO ALERT: ${riderName} کی رائیڈ (${plateNo}) مقررہ راستے سے 10% دور نکل گئی ہے۔ براہ کرم رابطہ کریں یا لوکیشن ٹریک کریں۔`;
      AlertSystem.sendSMS(contact, msg);
    });

    // د: ایڈمن پینل کو لائیو ایمرجنسی ڈیٹا بھیجنا
    AlertSystem.notifyAdmin(rideData, currentCoords, "Route Deviation");
  },

  // 2. براہ راست ایمرجنسی (Manual SOS Trigger)
  // یہ تب چلے گا جب سواری خود SOS بٹن دبائے
  triggerEmergency: (rideData) => {
    console.log("🆘 SOS Manual Triggered!");
    
    // موبائل فون میں وائبریشن پیدا کرنا (صرف موبائل ایپس کے لیے)
    if (navigator.vibrate) navigator.vibrate([500, 200, 500]);

    // تمام متعلقہ افراد کو فوری ایس ایم ایس
    rideData.emergencyContacts.forEach(phone => {
      const msg = `🚨 URGENT SOS: ${rideData.riderName} نے Tezro ایپ پر ایمرجنسی بٹن دبایا ہے۔ فوری مدد کی ضرورت ہو سکتی ہے!`;
      AlertSystem.sendSMS(phone, msg);
    });

    // ایڈمن کو ریڈ الرٹ بھیجنا
    AlertSystem.notifyAdmin(rideData, null, "MANUAL SOS");

    alert("سیکیورٹی الرٹ: آپ کے تمام ایمرجنسی نمبرز اور ایڈمن کو اطلاع دے دی گئی ہے!");
  },

  // --- معاون فنکشنز (Helper Functions) ---

  notifyDriver: (name) => {
    // یہاں ہم آواز (Audio) بھی چلا سکتے ہیں
    console.warn(`Driver ${name} warned about route deviation.`);
    // اصل ایپ میں یہاں ایک بولنے والا الرٹ (Voice Alert) بھی ہو سکتا ہے
  },

  notifyRider: (name) => {
    // سواری کو اطمینان دلانا کہ سسٹم مانیٹر کر رہا ہے
    console.log(`Rider ${name} notified of security check.`);
  },

  sendSMS: (number, message) => {
    // یہاں اصل ایس ایم ایس سروس (Twilio/Infobip) سے کنکشن ہوگا
    console.log(`[SMS Gateway] To: ${number} | Content: ${message}`);
  },

  notifyAdmin: (rideData, coords, alertType) => {
    // یہ ڈیٹا آپ کے ڈیٹا بیس میں جائے گا تاکہ ایڈمن اسکرین پر فلیش ہو
    const payload = {
      rideId: rideData.id,
      type: alertType,
      time: new Date().toLocaleTimeString(),
      location: coords || "GPS Tracking Active",
      driver: rideData.driverName,
      rider: rideData.riderName
    };
    
    console.log("📡 Admin Dashboard Notified:", payload);
    // یہاں fetch() یا axios() کے ذریعے بیک اینڈ پر ڈیٹا جائے گا
  }
};
