export const GlobalVoiceEngine = {
  isOffline: !navigator.onLine,
  lastHeardTime: Date.now(),
  secretCode: "TEZRO_ALPHA", // ڈیفالٹ کوڈ ورڈ

  startMonitoring: (callback) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      GlobalVoiceEngine.lastHeardTime = Date.now();
      
      // ایمرجنسی چیک (لڑائی جھگڑا)
      if (transcript.includes("help") || transcript.includes("bachao") || transcript.includes("stop")) {
        GlobalVoiceEngine.triggerEmergency();
      }

      callback(transcript);
    };
    recognition.start();
  },

  triggerEmergency: () => {
    console.log("EMERGENCY: Sending location and SOS to authorities...");
    // یہاں میسجنگ لاجک آئے گا
  },

  checkOwnerPresence: () => {
    const twoHours = 2 * 60 * 60 * 1000;
    if (Date.now() - GlobalVoiceEngine.lastHeardTime > twoHours) {
      return "LOCK_TRIGGERED";
    }
    return "SAFE";
  }
};
