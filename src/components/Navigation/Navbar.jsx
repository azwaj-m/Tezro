import React from 'react';
import { Search, Mic, ShieldCheck } from 'lucide-react';

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-[#001a0f] to-transparent">
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-1">
        <span className="text-[#FFD700] text-3xl font-black italic tracking-tighter">T</span>
        <span className="text-white text-xl font-bold tracking-tight">Tezro</span>
      </div>
      <div className="w-11 h-11 rounded-full border-2 border-[#FFD700]/40 overflow-hidden shadow-lg">
        <img src="https://via.placeholder.com/150" alt="User" className="w-full h-full object-cover" />
      </div>
    </div>
    
    <div className="glass rounded-[1.5rem] flex items-center px-5 py-4 shadow-2xl">
      <Search className="text-[#FFD700] opacity-50 mr-3" size={20} />
      <input type="text" placeholder="Search Search Bar" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30" />
      <Mic className="text-[#FFD700] opacity-50 ml-3" size={20} />
    </div>
    
    <div className="flex justify-end mt-2">
       <div className="flex items-center gap-1.5 bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/20">
         <span className="text-[9px] text-green-400 font-black uppercase tracking-widest">Cyber Security</span>
         <ShieldCheck size={12} className="text-green-400" />
       </div>
    </div>
  </header>
);
export default Navbar;
