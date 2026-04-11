import React from 'react';
import { Bell, Menu, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#002b1a] border-b border-[#FFD700]/30 flex justify-between items-center px-4 z-[5000] shadow-2xl">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full border border-[#FFD700]/50 overflow-hidden">
          <img src="/assets/profile-placeholder.png" className="w-full h-full object-cover" alt="User" />
        </div>
        <div className="hidden xs:flex bg-black/40 px-2 py-1 rounded-full border border-[#FFD700]/20 items-center gap-1">
          <ShieldCheck size={10} className="text-[#FFD700]" />
          <span className="text-[8px] text-[#FFD700] font-black uppercase">Cyber Secure</span>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-xl font-black text-[#FFD700] italic tracking-tighter uppercase leading-none">TEZRO</h1>
        <div className="w-10 h-[1px] bg-[#FFD700] mx-auto mt-0.5 opacity-50"></div>
      </div>

      <div className="flex items-center gap-3">
        <Bell className="text-[#FFD700]" size={22} />
        <button onClick={onOpenSidebar} className="text-[#FFD700] active:scale-90"><Menu size={28} /></button>
      </div>
    </header>
  );
};
export default Navbar;
