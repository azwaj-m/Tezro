import React from 'react';
import { Bell, Menu, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-3 sticky top-0 bg-[#002b1a] z-[1000] border-b border-[#FFD700]/30 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative border-2 border-[#FFD700] rounded-full p-0.5">
          <img src="/assets/profile-placeholder.png" className="w-8 h-8 rounded-full" alt="User" />
        </div>
        <span className="text-[10px] text-[#FFD700] flex items-center gap-1 font-bold bg-black/40 px-2 py-0.5 rounded-full border border-[#FFD700]/20">
          <ShieldCheck size={10} /> Cyber Security
        </span>
      </div>
      <div className="flex flex-col items-center">
        <img src="/assets/logo.png" className="h-7 w-auto" alt="Tezro" />
        <span className="text-[8px] font-black tracking-widest text-[#FFD700]">TEZRO</span>
      </div>
      <div className="flex items-center gap-3">
        <Bell className="text-[#FFD700]" size={22} />
        <button onClick={onOpenSidebar} className="text-[#FFD700]">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};
export default Navbar;
