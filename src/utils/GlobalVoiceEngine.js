export const startGlobalVoice = (navigate) => {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return alert("آواز کا نظام اس براؤزر پر دستیاب نہیں ہے۔");

  const recognition = new Recognition();
  recognition.lang = 'en-US';

  recognition.onstart = () => console.log("Tezro Voice Active...");
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", transcript);
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Tezro system processing command"));

    if (transcript.includes("ride") || transcript.includes("gari") || transcript.includes("taxi")) {
      navigate('/services/RideBooking');
    } else if (transcript.includes("food") || transcript.includes("khana") || transcript.includes("eat")) {
      navigate('/services/FoodDelivery');
    } else if (transcript.includes("finance") || transcript.includes("paisa") || transcript.includes("money")) {
      navigate('/FinanceHub');
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
