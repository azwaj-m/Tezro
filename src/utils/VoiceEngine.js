// Tezro Ultra Voice Command System
export const startVoiceRecognition = (navigate) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("Voice search is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US'; // آپ اسے ur-PK بھی کر سکتے ہیں

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Voice Command:", command);

    if (command.includes('food') || command.includes('eat')) navigate('/food');
    else if (command.includes('ride') || command.includes('car')) navigate('/ride');
    else if (command.includes('mall') || command.includes('shop')) navigate('/mall');
    else if (command.includes('hotel') || command.includes('stay')) navigate('/hotels');
    else if (command.includes('map') || command.includes('location')) navigate('/ride'); // یہاں میپ لوڈ ہوگا
    else if (command.includes('wallet') || command.includes('money')) navigate('/finance');
    else alert("Command not recognized: " + command);
  };

  recognition.start();
};
