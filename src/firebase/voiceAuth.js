/**
 * FIREBASE VOICE AUTH SERVICES
 * پیتھ: src/firebase/voiceAuth.js
 */
import { db } from './config';
import { updateDoc, doc } from 'firebase/firestore';
import { convertAudioToTinyVector, calculateSimilarity } from '../utils/VoiceSecurityService';

// وائس پروفائل رجسٹر کریں
export const registerVoiceProfile = async (userId, audioBlob) => {
  const signature = await convertAudioToTinyVector(audioBlob);
  const userRef = doc(db, "users", userId);
  
  await updateDoc(userRef, {
    voiceSignature: signature,
    voiceRegistered: true
  });
  return "سیکیورٹی پروفائل محفوظ کر لیا گیا!";
};

// آواز کی تصدیق اور کمانڈ چلانا
export const verifyAndExecute = async (liveAudioBlob, storedSignature) => {
  const liveVector = await convertAudioToTinyVector(liveAudioBlob);
  const similarity = calculateSimilarity(liveVector, storedSignature);

  // 0.90 کا مطلب ہے 90% میچ (ہائی سیکیورٹی)
  if (similarity > 0.90) {
    return { authorized: true };
  } else {
    return { authorized: false, error: "Unauthorized: Voice mismatch!" };
  }
};
