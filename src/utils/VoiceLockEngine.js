// Tezro Ultra Voice Security & Device Command Center
export const verifyVoiceLock = (navigate, userSecretPhrase) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript.toLowerCase();
    
    // سیکیورٹی چیک: اگر بولی گئی آواز صارف کے خفیہ جملے سے میچ کرے
    if (spokenText.includes(userSecretPhrase.toLowerCase())) {
       console.log("Access Granted: Identity Verified via Voice");
       return true;
    } else {
       alert("Security Alert: Voice mismatch. Access Denied.");
       return false;
    }
  };
  recognition.start();
};
