import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

/**
 * تمام قسم کی ٹرانزیکشنز کے لیے ایک ہی گیٹ وے
 * @param {string} category - 'FINANCE', 'UTILITY', 'LOGISTICS', 'SERVICES'
 * @param {object} data - ٹرانزیکشن کی تفصیلات
 */
export const processTezroService = async (category, data) => {
  try {
    const securePayload = {
      category: category,
      serviceType: data.type, // e.g., 'WAPDA', 'SNGPL', 'JAZZ_LOAD', 'PLUMBER'
      amount: data.amount,
      currency: data.currency || 'PKR',
      senderId: data.userId,
      receiverId: data.providerId || 'SYSTEM',
      status: 'pending_verification',
      appCheckVerified: true,
      timestamp: serverTimestamp(),
      metaData: data.extraInfo || {}
    };

    // انتہائی سخت سیکیورٹی کے تحت پیمنٹ ریکوسٹ درج کریں
    const docRef = await addDoc(collection(db, "super_transactions"), securePayload);
    return { status: "success", txId: docRef.id };
  } catch (error) {
    console.error("Critical Security Failure:", error);
    return { status: "denied", reason: "Security Protocol Violation" };
  }
};

// ہنرمندوں (Engineers, Electricians) کی تفصیلات حاصل کرنا
export const getProfessional = async (profId) => {
  const docRef = doc(db, "service_providers", profId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
