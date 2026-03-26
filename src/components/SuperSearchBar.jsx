import React from 'react';

const SuperSearchBar = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <span className="text-[#d4af37]/60">🔍</span>
      </div>
      <input 
        type="text" 
        placeholder="Search Services..." 
        className="w-full bg-[#003d1c] border border-[#d4af37]/20 rounded-2xl py-3 pl-12 pr-12 text-sm text-white placeholder-[#d4af37]/40 focus:outline-none focus:border-[#d4af37]/60 transition-all"
      />
      <div className="absolute inset-y-0 right-4 flex items-center">
        <span className="text-[#d4af37]">🎙️</span>
      </div>
    </div>
  );
};

export default SuperSearchBar;
