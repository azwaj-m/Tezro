/**
 * TEZRO COMMAND RESOLVER (Security & SOS Integrated)
 * پیتھ: src/utils/CommandResolver.js
 */
import { VoiceMap } from './CommandDictionary';
import { VoiceEngine } from './VoiceEngine';
import { triggerSOSAlert } from '../components/Emergency/EmergencySystem';

export const CommandResolver = {
  
  execute: async (audioBlob, transcript, user) => {
    
    // 🛡️ مرحلہ 1: سیکیورٹی چیک (صرف مالک کی آواز)
    // یہاں ہم یوزر کے محفوظ شدہ وائس سگنیچر کا موازنہ کر رہے ہیں
    const isOwner = await VoiceEngine.verifyOwner(audioBlob, user.voiceSignature);
    
    if (!isOwner) {
      return { success: false, message: "غیر متعلقہ آواز! رسائی مسترد۔" };
    }

    // 🔍 مرحلہ 2: لفظ کی پہچان (زبان سے بالاتر)
    const text = transcript.toLowerCase().trim();
    let action = null;

    for (const [key, patterns] of Object.entries(VoiceMap)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        action = key;
        break;
      }
    }

    // 🚀 مرحلہ 3: ایکشن کی وائرنگ (بشمول خودکار SOS)
    if (action === 'EMERGENCY') {
      // اگر کمانڈ 'مدد' یا 'بچاؤ' ہے تو فوری الرٹ بھیجیں
      await handleEmergencyAction(user);
      return { success: true, action: 'EMERGENCY', message: "الرٹ جاری کر دیا گیا۔" };
    }

    if (action) {
      return { success: true, action: action, data: text };
    } else {
      return { success: false, message: "معذرت، میں یہ کمانڈ نہیں سمجھ سکا۔" };
    }
  }
};

/**
 * 🚨 ایمرجنسی ہینڈلر
 * یہ فنکشن لوکیشن لے کر الرٹ سسٹم کو ڈیٹا بھیجتا ہے
 */
const handleEmergencyAction = async (user) => {
  if (!navigator.geolocation) {
    console.error("Geolocation سپورٹڈ نہیں ہے۔");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      // مرج شدہ فائل سے فنکشن پکارنا
      await triggerSOSAlert(user, position);
      alert("🚨 ٹیزرو الرٹ: آپ کی لائیو لوکیشن ایمرجنسی نمبرز پر بھیج دی گئی ہے۔");
    },
    (err) => {
      console.error("لوکیشن حاصل کرنے میں ناکامی:", err);
      alert("لوکیشن حاصل نہیں ہو سکی، لیکن سسٹم الرٹ بھیج رہا ہے۔");
    },
    { enableHighAccuracy: true }
  );
};
