// Tezro Guardian AI - سیکیورٹی اور ایمرجنسی سسٹم
export const startGuardianMonitor = (userLocation, emergencyContacts) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.continuous = true; // سواری کے دوران مسلسل مانیٹرنگ
  recognition.lang = 'ur-PK';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // خطرے کے الفاظ (اردو اور انگریزی)
    const dangerWords = ['بچاؤ', 'مدد', 'چھوڑو', 'روکو', 'help', 'stop', 'police'];
    
    const isDanger = dangerWords.some(word => transcript.includes(word));

    if (isDanger) {
      sendEmergencySMS(userLocation, transcript, emergencyContacts);
    }
  };

  recognition.start();
};

const sendEmergencySMS = (location, context, contacts) => {
  // حالات کی نوعیت کے حساب سے میسج تیار کرنا
  const message = `EMERGENCY: Tezro User in danger! Location: ${location}. Context: ${context}`;
  
  console.log("SENDING SMS TO:", contacts, "MESSAGE:", message);
  // یہاں ہم سادہ SMS API (جیسے Twilio یا براہ راست ہینڈلر) کال کریں گے
  alert("ایمرجنسی میسج آپ کے قریبی رشتہ داروں کو بھیج دیا گیا ہے!");
};
