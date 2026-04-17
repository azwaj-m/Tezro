import React from 'react';
import { Menu, Bell, ShieldCheck } from 'lucide-react';

const Navbar = ({ onMenuOpen }) => {
  return (
    <nav className="px-4 py-3 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-[2000] border-b border-gold/10">
      <Menu size={24} className="text-gold cursor-pointer" onClick={onMenuOpen} />
      <div className="flex items-center gap-2">
        <div className="bg-gold/10 px-2 py-1 rounded-full border border-gold/20 flex items-center gap-1">
          <ShieldCheck size={10} className="text-emerald-500" />
          <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-300">Tezro Secure</span>
        </div>
      </div>
      <Bell size={24} className="text-gold cursor-pointer" />
    </nav>
  );
};

export default Navbar;
