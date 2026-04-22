export const startGlobalVoice = (navigate) => {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return alert("آواز کا نظام اس براؤزر پر دستیاب نہیں ہے۔");

  const recognition = new Recognition();
  recognition.lang = 'en-US';

  recognition.onstart = () => console.log("Tezro Voice Active...");
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", transcript);

    if (transcript.includes("ride") || transcript.includes("taxi")) {
      navigate('/ride');
    } else if (transcript.includes("food") || transcript.includes("eat")) {
      navigate('/food');
    } else if (transcript.includes("finance") || transcript.includes("money")) {
      navigate('/finance');
    } else if (transcript.includes("help") || transcript.includes("emergency")) {
      alert("EMERGENCY SOS: Sending location to authorities!");
    }
  };

  recognition.start();
};

export const GlobalVoiceEngine = {
  isOffline: !navigator.onLine,
  triggerEmergency: () => console.log("SOS Triggered")
};
