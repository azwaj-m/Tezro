import React from 'react';
import { Settings, Shield, UserPlus, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-[1000] w-72 bg-[#000d08] border-r border-tezro-gold/20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 p-6 shadow-2xl`}>
      <button onClick={onClose} className="absolute top-4 right-4 text-tezro-gold"><X size={24} /></button>

      <h2 className="text-tezro-gold font-black tracking-[4px] text-xl mb-10 mt-8">TEZRO MENU</h2>

      <div className="space-y-4">
        <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-tezro-gold/5 border border-tezro-gold/10 text-tezro-gold hover:bg-tezro-gold/20 transition-all">
          <UserPlus size={20} />
          <span className="font-bold text-sm tracking-widest">JOIN NETWORK</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400">
            <Settings size={18} />
            <span className="text-[10px] font-bold">SETTINGS</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400">
            <Shield size={18} />
            <span className="text-[10px] font-bold">PRIVACY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
