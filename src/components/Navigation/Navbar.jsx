import React from 'react';
import { Search, Mic, ShieldCheck } from 'lucide-react';

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4 pb-2 bg-gradient-to-b from-[#001a0f] to-transparent">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[#FFD700] text-2xl font-black italic tracking-tighter">T Tezro</span>
      </div>
      <div className="w-10 h-10 rounded-full border-2 border-[#FFD700]/30 overflow-hidden">
        <img src="https://via.placeholder.com/100" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
    
    <div className="relative glass-effect rounded-2xl flex items-center px-4 py-3">
      <Search className="text-[#FFD700]/50 mr-2" size={18} />
      <input type="text" placeholder="Search Search Bar" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/20" />
      <Mic className="text-[#FFD700]/50 ml-2" size={18} />
    </div>
    
    <div className="flex justify-end mt-2">
       <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold tracking-widest uppercase">
         <span>Cyber Security</span> <ShieldCheck size={12} />
       </div>
    </div>
  </header>
);
export default Navbar;
