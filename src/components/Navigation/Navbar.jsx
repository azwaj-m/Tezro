import React from 'react';
import { Bell, Menu, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-3 sticky top-0 bg-[#002b1a] z-[1000] border-b border-[#FFD700]/30 shadow-lg w-full">
      <div className="flex items-center gap-2">
        <div className="relative border border-[#FFD700]/50 rounded-full p-0.5 w-10 h-10">
          <img src="/assets/profile-placeholder.png" className="w-full h-full rounded-full object-cover" alt="User" />
        </div>
        <div className="bg-black/40 px-2 py-0.5 rounded-full border border-[#FFD700]/20 flex items-center gap-1">
          <ShieldCheck size={10} className="text-[#FFD700]" />
          <span className="text-[8px] text-[#FFD700] font-black uppercase">Cyber Security</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img src="/assets/logo.png" className="h-8 w-auto object-contain drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]" alt="Tezro" />
        <span className="text-[7px] font-black tracking-[0.3em] text-[#FFD700] mt-0.5">TEZRO</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative"><Bell className="text-[#FFD700]" size={22} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-black shadow-sm"></span></div>
        <button onClick={onOpenSidebar} className="text-[#FFD700] active:scale-90 transition-transform"><Menu size={28} /></button>
      </div>
    </header>
  );
};
export default Navbar;
