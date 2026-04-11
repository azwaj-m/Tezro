import React from 'react';
import { ShieldCheck, Menu } from 'lucide-react';
const Navbar = ({ onOpenSidebar }) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-[#002b1a] border-b border-[#FFD700]/10 flex justify-between items-center px-4 z-[50]">
    <div className="flex items-center gap-2 text-[#FFD700]">
      <ShieldCheck size={20} /> <span className="text-[10px] font-bold uppercase">Verified</span>
    </div>
    <h1 className="text-xl font-black text-[#FFD700] italic uppercase">TEZRO</h1>
    <button onClick={onOpenSidebar} className="text-[#FFD700]"><Menu size={28} /></button>
  </header>
);
export default Navbar;
