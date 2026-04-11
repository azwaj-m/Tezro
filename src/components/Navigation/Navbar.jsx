import React, { useState } from 'react';
import { Search, Mic, ShieldCheck, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  const [active, setActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-8 pb-4 bg-gradient-to-b from-[#001a0f] to-transparent">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="shiny-gold text-4xl font-black italic tracking-tighter">T</span>
          <span className="text-white text-2xl font-black tracking-tight">Tezro</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/30 flex items-center gap-2">
            <span className="text-[9px] text-green-400 font-black uppercase">Foul Proof Security</span>
            <ShieldCheck size={14} className="text-green-400" />
          </div>
          <button onClick={onOpenSidebar} className="text-[#FFD700] transform active:scale-90 transition-all">
            <Menu size={32} />
          </button>
        </div>
      </div>
      
      <div className={`group transition-all duration-500 ${active ? "scale-105" : ""}`}>
        <div className="bg-[#002b1a]/80 backdrop-blur-2xl rounded-full border border-[#FFD700]/20 flex items-center px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <Search className="text-[#FFD700] opacity-60 mr-4" size={20} />
          <input 
            type="text" 
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            placeholder="Search Search Bar" 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30 text-white font-medium" 
          />
          <Mic className="text-[#FFD700] opacity-60 ml-4 cursor-pointer" size={20} />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
