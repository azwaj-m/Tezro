
const languageMap = {

    'ur-PK': { home: 'گھر', ride: 'گاڑی', food: 'کھانا', mall: 'مال', wallet: 'والٹ' },

    'en-US': { home: 'home', ride: 'ride', food: 'food', mall: 'mall', wallet: 'wallet' },

    'ps-PK': { home: 'کور', ride: 'ګاډی', food: 'خوراک', mall: 'مارکیٹ', wallet: 'والٹ' },

    'sd-PK': { home: 'گھر', ride: 'گاڏي', food: 'واڌو', mall: 'مال', wallet: 'بٹوو' },

};



export const startGlobalVoice = (navigate, selectedLang = 'ur-PK') => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("آپ کا براؤزر وائس سروس کو سپورٹ نہیں کرتا");



    const recognition = new SpeechRecognition();

    recognition.lang = selectedLang;

    recognition.interimResults = false;



    recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript.toLowerCase();

        const commands = languageMap[selectedLang] || languageMap['en-US'];



        console.log("Detected Speech:", transcript);



        if (transcript.includes(commands.food)) navigate('/food');

        else if (transcript.includes(commands.ride)) navigate('/ride');

        else if (transcript.includes(commands.home)) navigate('/');

        else if (transcript.includes(commands.mall)) navigate('/mall');

        else if (transcript.includes(commands.wallet)) navigate('/finance');

        else {

            // اگر کوئی مخصوص جگہ کا نام لیا جائے

            navigate(`/ride?destination=${encodeURIComponent(transcript)}`);

        }

    };



    recognition.onerror = (err) => console.error("Voice Error:", err);

    recognition.start();

};

