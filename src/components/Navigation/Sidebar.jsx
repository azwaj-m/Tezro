import React from 'react';
import { UserPlus, Settings, HelpCircle, LogOut, ShieldCheck } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-72 h-full bg-zinc-900 border-r border-zinc-800 p-6 shadow-2xl">
        <div className="mb-10 pt-4">
          <h2 className="text-2xl font-black text-[#D4AF37] italic">TEZRO <span className="text-white">MENU</span></h2>
        </div>

        <nav className="space-y-2">
          {/* صرف ایک رجسٹریشن لنک جو دوسری ریپو/ویب سائٹ پر لے جائے گا */}
          <a 
            href="https://alingosuper.github.io/TezroWeb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <UserPlus size={20} />
            <span className="font-bold text-sm">Join Tezro Network</span>
          </a>

          <div className="pt-4 space-y-1">
             <button className="w-full flex items-center gap-4 p-4 text-zinc-400 hover:bg-zinc-800 rounded-2xl transition-all">
                <Settings size={20} /> <span className="text-sm">Settings</span>
             </button>
             <button className="w-full flex items-center gap-4 p-4 text-zinc-400 hover:bg-zinc-800 rounded-2xl transition-all">
                <ShieldCheck size={20} /> <span className="text-sm">Privacy Policy</span>
             </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
