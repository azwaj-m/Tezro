// Tezro Multi-Language Voice Intelligence
const languageMap = {
  'ur-PK': { home: 'گھر', ride: 'گاڑی', food: 'کھانا', mall: 'مال' },
  'en-US': { home: 'home', ride: 'ride', food: 'food', mall: 'mall' },
  'ar-SA': { home: 'منزل', ride: 'سيارة', food: 'طعام', mall: 'سوق' },
  'ps-PK': { home: 'کور', ride: 'ګاډی', food: 'خوراک', mall: 'مارکیٹ' },
  'sd-PK': { home: 'گھر', ride: 'گاڏي', food: 'واڌو', mall: 'مال' },
  'zh-CN': { home: '家', ride: '车', food: '食物', mall: '商场' },
  'bn-BD': { home: 'বাড়ি', ride: 'গাড়ি', food: 'খাবার', mall: 'মল' },
  'ru-RU': { home: 'дом', ride: 'такси', food: 'еда', mall: 'молл' },
};

export const startGlobalVoice = (navigate, selectedLang = 'ur-PK') => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("System not supported");

  const recognition = new SpeechRecognition();
  recognition.lang = selectedLang; // متحرک زبان کا انتخاب
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const commands = languageMap[selectedLang] || languageMap['en-US'];

    console.log("Detected Speech:", transcript);

    if (transcript.includes(commands.food)) navigate('/food');
    else if (transcript.includes(commands.ride)) navigate('/ride');
    else if (transcript.includes(commands.home)) navigate('/');
    else if (transcript.includes(commands.mall)) navigate('/mall');
    else {
        // اگر لوکیشن کا نام لیا جائے تو میپ نیویگیشن
        navigate(`/ride?destination=${transcript}`);
    }
  };

  recognition.start();
};
