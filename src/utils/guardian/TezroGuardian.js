// آف لائن وائس اور ایمرجنسی پروٹوکول
export const TezroGuardian = {
  lastVoiceDetected: Date.now(),
  failedAttempts: 0,
  isLocked: false,
  codeWord: "Alpha-1", // آپ کا خفیہ کوڈ

  // پسِ منظر میں مانیٹرنگ (غیر مداخلتی)
  initSilentMonitor: () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
      TezroGuardian.lastVoiceDetected = Date.now();

      // ایمرجنسی الفاظ کی شناخت
      if (text.match(/(help|bachao|police|stop it)/)) {
        TezroGuardian.triggerSOS();
      }
    };

    recognition.start();
    console.log("🛡️ Tezro Guardian: Silent monitoring active.");
  },

  // ایمرجنسی میسج سسٹم
  triggerSOS: () => {
    console.warn("🚨 Emergency Detected! Sending SOS...");
    // یہاں آف لائن میسج یا لوکیشن لاجک آ سکتا ہے
  },

  // دو گھنٹے کی خاموشی پر لاک چیک
  checkInactivity: () => {
    const twoHours = 2 * 60 * 60 * 1000;
    if (Date.now() - TezroGuardian.lastVoiceDetected > twoHours) {
      return true; // لاک لگا دیں
    }
    return false;
  }
};
