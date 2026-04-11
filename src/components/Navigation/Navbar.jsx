import React from 'react';
import { Search, Mic, ShieldCheck, UserCircle, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => (
  <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-5 pb-3 bg-gradient-to-b from-[#001a0f] to-transparent">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-1.5">
        <span className="text-[#FFD700] text-3xl font-black italic tracking-tighter">T</span>
        <span className="text-white text-xl font-bold tracking-tight">Tezro</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-[#FFD700]/10 px-4 py-1.5 rounded-full border border-[#FFD700]/20 shadow-inner">
           <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Cyber Security</span>
           <ShieldCheck size={14} className="text-green-400" />
        </button>
        <button onClick={onOpenSidebar} className="text-[#FFD700] hover:scale-110 transition-transform"><Menu size={28} /></button>
      </div>
    </div>
    
    <div className="glass rounded-[1.8rem] flex items-center px-6 py-4 shadow-2xl">
      <Search className="text-[#FFD700] opacity-60 mr-4" size={20} />
      <input type="text" placeholder="Search Services or Tezro ID..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30" />
      <Mic className="text-[#FFD700] opacity-60 ml-4" size={20} />
    </div>
  </header>
);
export default Navbar;
