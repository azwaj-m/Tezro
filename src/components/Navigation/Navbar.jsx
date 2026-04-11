import React from 'react';
import { Bell, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#002b1a] border-b border-[#FFD700]/30 flex justify-between items-center px-4 z-[9999] shadow-2xl">
      <div className="w-10 h-10 rounded-full border border-[#FFD700]/50 overflow-hidden">
        <img src="/assets/profile-placeholder.png" className="w-full h-full object-cover" alt="User" />
      </div>
      <h1 className="text-xl font-black text-[#FFD700] italic tracking-widest uppercase">TEZRO</h1>
      <div className="flex items-center gap-3">
        <Bell className="text-[#FFD700]" size={22} />
        <button onClick={onOpenSidebar} className="text-[#FFD700]"><Menu size={28} /></button>
      </div>
    </header>
  );
};
export default Navbar;
