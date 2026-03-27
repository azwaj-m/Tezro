export const SupportedLanguages = {
  UR: { code: 'ur-PK', name: 'اردو' },
  EN: { code: 'en-US', name: 'English' },
  BN: { code: 'bn-BD', name: 'بنگالی' },
  HI: { code: 'hi-IN', name: 'ہندی' },
  AR: { code: 'ar-SA', name: 'عربی' }
};

export const MultiLangVoice = {
  listen: (langCode = 'ur-PK', onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser voice not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = langCode;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    
    recognition.onerror = () => recognition.stop();
    recognition.start();
  }
};
