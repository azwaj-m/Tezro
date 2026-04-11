import React from 'react';
import { Search, Mic, ShieldCheck } from 'lucide-react';

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 pt-4 pb-2 px-4 bg-[#001a0f]/95 backdrop-blur-md z-[100]">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-[#FFD700] italic">T</span>
        <span className="text-xl font-bold tracking-tight text-white/90">Tezro</span>
      </div>
      <div className="w-10 h-10 rounded-full border-2 border-[#FFD700]/30 overflow-hidden">
        <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
    
    {/* تصویر جیسی سرچ بار */}
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search Search Bar" 
        className="w-full bg-[#002b1a] rounded-full py-2.5 px-10 border border-[#FFD700]/20 text-xs text-white/60 focus:border-[#FFD700]/50"
      />
      <Search className="absolute left-3 top-2.5 text-[#FFD700]/40" size={16} />
      <Mic className="absolute right-3 top-2.5 text-[#FFD700]/40" size={16} />
    </div>

    <div className="flex justify-end mt-2">
      <div className="flex items-center gap-1">
        <span className="text-[8px] text-white/40 uppercase tracking-tighter">Cyber Security</span>
        <ShieldCheck size={10} className="text-green-500" />
      </div>
    </div>
  </header>
);
export default Navbar;
