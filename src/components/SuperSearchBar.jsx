import React from 'react';
const SuperSearchBar = () => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#d4af37]/60">🔍</div>
    <input type="text" placeholder="Search Service..." className="w-full bg-[#003d1c] border border-[#d4af37]/30 rounded-2xl py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
    <div className="absolute inset-y-0 right-4 flex items-center text-[#d4af37]">🎙️</div>
  </div>
);
export default SuperSearchBar;
