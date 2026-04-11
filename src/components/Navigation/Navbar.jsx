import React from 'react';
import { Bell, Menu, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-3 sticky top-0 bg-[#002b1a] z-[2000] border-b border-[#FFD700]/30 shadow-xl w-full">
      <div className="flex items-center gap-2 flex-1">
        <div className="relative border border-[#FFD700]/50 rounded-full p-0.5">
          <img src="/assets/profile-placeholder.png" className="w-9 h-9 rounded-full object-cover" alt="User" />
        </div>
        <div className="hidden xs:flex bg-black/40 px-2 py-0.5 rounded-full border border-[#FFD700]/20 items-center gap-1">
          <ShieldCheck size={10} className="text-[#FFD700]" />
          <span className="text-[8px] text-[#FFD700] font-bold uppercase">Cyber Secure</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center flex-1">
        <img src="/assets/logo.png" className="h-8 w-auto object-contain" alt="Tezro" />
        <span className="text-[7px] font-black tracking-[0.3em] text-[#FFD700] mt-0.5">TEZRO</span>
      </div>

      <div className="flex items-center gap-3 flex-1 justify-end">
        <div className="relative p-1">
          <Bell className="text-[#FFD700]" size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-black shadow-sm"></span>
        </div>
        <button onClick={onOpenSidebar} className="text-[#FFD700] p-1 active:scale-90 transition-transform">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};
export default Navbar;
