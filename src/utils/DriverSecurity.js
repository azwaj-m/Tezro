// Tezro Driver Safety & Threat Detection
export const startDriverShield = (driverId, vehicleInfo) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'ur-PK';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // ڈرائیور کے لیے خفیہ کوڈ ورڈز (جو مسافر کو شک نہ ہونے دیں)
    // مثال کے طور پر: "راستہ بہت لمبا ہے" یا "گاڑی چیک کرنی ہے"
    const panicCodes = ['راستہ بہت لمبا ہے', 'emergency', 'خطرہ', 'police'];
    
    if (panicCodes.some(code => transcript.includes(code))) {
      triggerDriverSOS(driverId, vehicleInfo, "High Alert: Driver Triggered Silent SOS");
    }
  };

  recognition.start();
};

const triggerDriverSOS = (id, info, status) => {
  // ہیڈ آفس اور قریبی سیکیورٹی یونٹس کو ڈیٹا بھیجنا
  console.log("DRIVER SOS ACTIVE:", id, info);
  // سادہ SMS اور انٹرنیٹ نوٹیفکیشن دونوں بھیجے جائیں گے
};
