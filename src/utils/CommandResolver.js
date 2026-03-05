/**
 * TEZRO COMMAND RESOLVER (Security First)
 * پیتھ: src/utils/CommandResolver.js
 */
import { VoiceMap } from './CommandDictionary';
import { VoiceEngine } from './VoiceEngine';

export const CommandResolver = {
  
  execute: async (audioBlob, transcript, ownerSignature) => {
    
    // 🛡️ مرحلہ 1: سیکیورٹی چیک (صرف مالک کی آواز)
    // ہم آڈیو کے فریکوئنسی ہیش کا موازنہ کرتے ہیں
    const isOwner = await VoiceEngine.verifyOwner(audioBlob, ownerSignature);
    
    if (!isOwner) {
      return { success: false, message: "غیر متعلقہ آواز! رسائی مسترد۔" };
    }

    // 🔍 مرحلہ 2: لفظ کی پہچان (زبان سے بالاتر)
    const text = transcript.toLowerCase().trim();
    let action = null;

    // ہم ڈکشنری میں چیک کرتے ہیں کہ بولا گیا لفظ کس کیٹیگری میں ہے
    for (const [key, patterns] of Object.entries(VoiceMap)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        action = key;
        break;
      }
    }

    // 🚀 مرحلہ 3: ایکشن کی واپسی
    if (action) {
      return { success: true, action: action, data: text };
    } else {
      return { success: false, message: "معذرت، میں یہ کمانڈ نہیں سمجھ سکا۔" };
    }
  }
};
