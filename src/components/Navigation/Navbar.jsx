import React from 'react';
import { Bell, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#002b1a] border-b border-[#FFD700]/30 flex justify-between items-center px-4 z-[5000] shadow-2xl">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full border border-[#FFD700]/50 overflow-hidden shadow-[0_0_10px_rgba(255,215,0,0.3)]">
          <img src="/assets/profile-placeholder.png" className="w-full h-full object-cover" alt="User" />
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-black text-[#FFD700] italic tracking-tighter uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          TEZRO
        </h1>
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-1"></div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="text-[#FFD700] drop-shadow-[0_0_5px_#FFD700]" size={24} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#002b1a]"></span>
        </div>
        <button onClick={onOpenSidebar} className="text-[#FFD700] p-1 active:scale-90 transition-transform">
          <Menu size={32} />
        </button>
      </div>
    </header>
  );
};
export default Navbar;
