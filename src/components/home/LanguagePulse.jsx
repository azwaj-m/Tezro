import React from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'ur-PK', name: 'اردو' },
  { code: 'en-US', name: 'English' },
  { code: 'ps-PK', name: 'پښتو' },
  { code: 'sd-PK', name: 'سنڌي' },
  { code: 'ar-SA', name: 'العربية' },
  { code: 'zh-CN', name: '中文' },
  { code: 'ru-RU', name: 'Pусский' },
  { code: 'bn-BD', name: 'বাংলা' }
];

const LanguagePulse = ({ onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto p-2 no-scrollbar bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
      {languages.map((lang) => (
        <button 
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className="px-4 py-1.5 rounded-xl bg-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37] border border-transparent transition-all whitespace-nowrap"
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguagePulse;
