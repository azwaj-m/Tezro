import React from 'react';
import { Menu, User, Shield } from 'lucide-react';

const Navbar = ({ onMenuOpen }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-900 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button onClick={onMenuOpen} className="p-2 text-zinc-400">
          <Menu size={24} />
        </button>
        
        <div className="flex items-center gap-1">
          <span className="text-[#D4AF37] font-black italic text-xl tracking-tighter">TEZRO</span>
          <span className="text-white font-light text-xl tracking-tighter">ULTRA</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 p-2 rounded-full border border-zinc-800">
            <Shield size={18} className="text-[#D4AF37]" />
          </div>
          <button className="text-zinc-400">
            <User size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
