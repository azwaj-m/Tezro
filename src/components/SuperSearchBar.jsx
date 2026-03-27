import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuperSearch } from '../hooks/useSuperSearch';
import { MultiLangVoice, SupportedLanguages } from '../utils/voice/MultiLangVoice';

const SuperSearchBar = () => {
  const [term, setTerm] = useState("");
  const { results, loading } = useSuperSearch(term);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    // خود بخود صارف کی زبان پہچاننے یا ڈیفالٹ اردو/انگلش کے لیے
    MultiLangVoice.listen('ur-PK', (text) => {
      setTerm(text);
      setIsListening(false);
    });
  };

  const handleSelect = (item) => {
    if (item.serviceType === 'RIDE') navigate('/RideHome');
    else if (item.serviceType === 'FOOD') navigate('/FoodHome');
    else navigate('/HomeScreen');
    setTerm("");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-50">
      <div className="relative flex items-center bg-[#002b14] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl">
        <span className="pl-4 text-[#d4af37]">🔍</span>
        <input 
          type="text" 
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="تلاش کریں: ڈاکٹر، پلمبر، کھانا یا رائیڈ..."
          className="w-full bg-transparent py-4 px-4 text-white outline-none placeholder:text-gray-500 text-right"
        />
        <button 
          onClick={handleVoiceSearch}
          className={`p-4 ${isListening ? 'animate-pulse text-red-500' : 'text-[#d4af37]'}`}
        >
          {isListening ? '🛑' : '🎙️'}
        </button>
      </div>

      {/* سرچ رزلٹس ڈراپ ڈاؤن */}
      {term.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
          {loading && <div className="p-4 text-center text-[#d4af37]">تلاش جاری ہے...</div>}
          {results.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleSelect(item)}
              className="p-4 border-b border-white/5 hover:bg-[#d4af37]/10 cursor-pointer flex justify-between items-center"
            >
              <span className="text-xs text-gray-500">{item.serviceType}</span>
              <div className="text-right">
                <p className="text-white font-bold">{item.name}</p>
                <p className="text-[10px] text-[#d4af37]">{item.icon} {item.category || 'Tezro Service'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuperSearchBar;
