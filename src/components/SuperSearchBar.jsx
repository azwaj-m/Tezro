import React, { useState, useEffect } from 'react';
import { useSuperSearch } from '../hooks/useSuperSearch';
import { MultiLangVoice } from '../utils/voice/MultiLangVoice';

const SuperSearchBar = ({ activeService = 'FOOD' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { results, loading } = useSuperSearch(activeService, searchTerm);

  // آواز کے ذریعے تلاش (Voice Search)
  const handleVoiceSearch = () => {
    setIsListening(true);
    MultiLangVoice.listen('ur-PK', (transcript) => {
      setSearchTerm(transcript);
      setIsListening(false);
    });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 px-4">
      {/* Search Input Group */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="text-[#d4af37] opacity-60 text-xl">🔍</span>
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${activeService.toLowerCase()} in Tezro...`}
          className="w-full bg-[#001a0d] border-2 border-[#d4af37]/20 rounded-2xl py-4 pl-14 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 transition-all duration-300"
        />

        <button 
          onClick={handleVoiceSearch}
          className={`absolute inset-y-0 right-4 flex items-center transition-transform active:scale-90 ${isListening ? 'animate-pulse text-red-500' : 'text-[#d4af37]'}`}
        >
          <span className="text-2xl">🎙️</span>
        </button>
      </div>

      {/* Results Dropdown */}
      {searchTerm.length >= 2 && (
        <div className="absolute z-50 w-[92%] mt-2 bg-[#0a0a0a] border border-[#d4af37]/30 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto backdrop-blur-md">
          {loading ? (
            <div className="p-4 text-center text-[#d4af37] animate-pulse">تلاش جاری ہے...</div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border-b border-white/5 hover:bg-[#d4af37]/10 cursor-pointer flex justify-between items-center group transition-colors"
              >
                <div>
                  <h4 className="text-white font-bold group-hover:text-[#d4af37]">{item.name}</h4>
                  <p className="text-xs text-gray-400">{activeService} • {item.category || 'General'}</p>
                </div>
                <span className="text-[#d4af37] opacity-0 group-hover:opacity-100">→</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">کوئی نتیجہ نہیں ملا</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuperSearchBar;
