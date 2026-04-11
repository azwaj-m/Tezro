import React from 'react';
import { Bell, Menu, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-[#002b1a] border-b border-[#FFD700]/30 sticky top-0 z-[1000] w-full shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative border border-[#FFD700] rounded-full p-0.5">
          <img src="/assets/profile-placeholder.png" className="w-8 h-8 rounded-full object-cover" alt="User" />
        </div>
        <span className="text-[8px] text-[#FFD700] bg-black/30 px-2 py-0.5 rounded-full border border-[#FFD700]/20 font-bold uppercase">Cyber Secure</span>
      </div>
      <div className="flex flex-col items-center">
        <img src="/assets/logo.png" className="h-6 w-auto" alt="Tezro" />
        <span className="text-[6px] font-black tracking-widest text-[#FFD700]">TEZRO</span>
      </div>
      <div className="flex items-center gap-3">
        <Bell className="text-[#FFD700]" size={20} />
        <button onClick={onOpenSidebar} className="text-[#FFD700]"><Menu size={24} /></button>
      </div>
    </header>
  );
};
export default Navbar;
