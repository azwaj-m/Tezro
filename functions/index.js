const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendOTP = functions.https.onCall(async (data, context) => {
    // سیکیورٹی چیک: کیا یوزر لاگ ان ہے؟
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'صرف لاگ ان یوزرز OTP منگوا سکتے ہیں۔');
    }

    const phoneNumber = data.phoneNumber;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // کوڈ کو فائر بیس ڈیٹا بیس میں 5 منٹ کے لیے محفوظ کرنا
    await admin.firestore().collection('otp_verifications').doc(phoneNumber).set({
        code: otpCode,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: Date.now() + 300000 // 5 منٹ
    });

    console.log(`OTP for ${phoneNumber}: ${otpCode}`); 
    // یہاں Twilio یا کسی بھی SMS API کا کوڈ آئے گا
    return { success: true, message: 'OTP بھیج دیا گیا ہے' };
});
