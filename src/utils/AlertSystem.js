// Path: src/utils/AlertSystem.js

export const AlertSystem = {
  // 1. الرٹ بھیجنے کا مین فنکشن
  sendDeviationAlert: async (rideData, currentCoords) => {
    const { driverName, riderName, emergencyContacts, plateNo } = rideData;

    console.log(`🚨 الرٹ: رائیڈ راستہ بھٹک چکی ہے!`);

    // الف: ڈرائیور کو وارننگ بھیجنا
    AlertSystem.notifyDriver(driverName);

    // ب: سواری (Rider) کو الرٹ کرنا
    AlertSystem.notifyRider(riderName);

    // ج: ایمرجنسی نمبرز پر ایس ایم ایس بھیجنا
    emergencyContacts.forEach(contact => {
      AlertSystem.sendSMS(contact, `Tezro Alert: ${riderName} کی رائیڈ (${plateNo}) راستہ بھٹک گئی ہے۔ لوکیشن چیک کریں۔`);
    });

    // د: ایڈمن پینل کو اطلاع دینا
    AlertSystem.notifyAdmin(rideData, currentCoords);
  },

  // ڈرائیور کے لیے ایپ نوٹیفکیشن
  notifyDriver: (name) => {
    alert(`⚠️ ${name}! آپ مقررہ راستے سے دور جا رہے ہیں۔ براہ کرم اصل راستے پر واپس آئیں یا وجہ بتائیں۔`);
  },

  // ایس ایم ایس سروس (فرضی)
  sendSMS: (number, message) => {
    // یہاں اصل ایس ایم ایس گیٹ وے (جیسے Twilio) کا کوڈ آئے گا
    console.log(`Sending SMS to ${number}: ${message}`);
  },

  // ایڈمن کو لائیو الرٹ
  notifyAdmin: (rideData, coords) => {
    // یہ ڈیٹا ایڈمن کے ڈیش بورڈ پر سرخ روشنی (Flash) جلا دے گا
    console.log("Admin Notified: Emergency in Ride ID:", rideData.id);
  }
};
