import React from 'react';
import { Bell, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 bg-[#002b1a]/95 backdrop-blur-md border-b border-[#FFD700]/30 flex justify-between items-center px-4 z-[50] shadow-xl">
      <div className="w-10 h-10 rounded-full border-2 border-[#FFD700]/50 overflow-hidden shadow-inner">
        <img src="/assets/profile-placeholder.png" className="w-full h-full object-cover" alt="User" />
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-black text-[#FFD700] tracking-widest uppercase italic leading-none">TEZRO</h1>
        <span className="text-[7px] text-white/50 tracking-[3px] uppercase mt-1">Premium Assets</span>
      </div>

      <div className="flex items-center gap-4 text-[#FFD700]">
        <Bell size={22} className="drop-shadow-md" />
        <button onClick={onOpenSidebar} className="p-1 active:scale-90 transition-transform">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};
export default Navbar;
