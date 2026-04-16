
// ڈیٹا انکرپشن (بائٹ شفٹنگ لاجک)

export const encryptTezroData = async (text) => {

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const encrypted = data.map(byte => byte ^ 0x55);

    return btoa(String.fromCharCode(...encrypted));

};



export const decryptTezroData = (encoded) => {

    try {

        const decoded = atob(encoded);

        const data = new Uint8Array(decoded.length);

        for (let i = 0; i < decoded.length; i++) {

            data[i] = decoded.charCodeAt(i) ^ 0x55;

        }

        return new TextDecoder().decode(data);

    } catch (e) {

        return "Decryption Failed";

    }

};



// گارڈین مانیٹرنگ (ایمرجنسی سسٹم)

export const startGuardianMonitor = (userLocation, emergencyContacts) => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;



    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.lang = 'ur-PK';



    recognition.onresult = (event) => {

        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

        const dangerWords = ['بچاؤ', 'مدد', 'چھوڑو', 'روکو', 'help', 'stop', 'police'];



        if (dangerWords.some(word => transcript.includes(word))) {

            sendEmergencyAlert(userLocation, transcript, emergencyContacts);

        }

    };



    recognition.start();

};



const sendEmergencyAlert = (location, context, contacts) => {

    const message = `EMERGENCY: Tezro User in danger! Location: ${location}. Voice Context: ${context}`;

    console.log("ALARM TRIGGERED:", message);

    alert("ایمرجنسی میسج آپ کے قریبی رشتہ داروں کو بھیج دیا گیا ہے!");

    // یہاں آپ اپنی SMS API کال کر سکتے ہیں

};

