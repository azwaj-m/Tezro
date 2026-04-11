import React, { useState } from 'react';
import { Search, Mic, ShieldCheck, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  const [query, setQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 pt-6 pb-4 bg-gradient-to-b from-[#001a0f] to-transparent">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="shiny-gold text-3xl font-black italic tracking-tighter">T</span>
          <span className="text-white text-xl font-bold tracking-tight">Tezro</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
             <span className="text-[9px] text-green-400 font-bold uppercase">Cyber Security</span>
             <ShieldCheck size={12} className="text-green-400" />
          </div>
          <button onClick={onOpenSidebar} className="text-[#FFD700]"><Menu size={28} /></button>
        </div>
      </div>
      
      <div className="glass-iranian rounded-full flex items-center px-6 py-3.5 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <Search className="text-[#FFD700] mr-3" size={18} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Tezro Universe..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/20 text-white" 
        />
        {query && <span className="text-[10px] text-[#FFD700] animate-pulse">Searching...</span>}
        <Mic className="text-[#FFD700] ml-3" size={18} />
      </div>
    </header>
  );
};
export default Navbar;
