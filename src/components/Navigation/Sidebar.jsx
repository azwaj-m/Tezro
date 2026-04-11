import React from 'react';
import { X, Shield, Lock, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-72 h-full bg-[#001a0f] border-r border-[#FFD700]/20 p-6 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#FFD700] font-black tracking-widest text-lg">TEZRO ID</h2>
          <button onClick={onClose} className="text-[#FFD700]"><X size={24} /></button>
        </div>
        <nav className="space-y-6 flex-1">
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full"><Shield size={20} /> PRIVACY VAULT</button>
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full"><Lock size={20} /> 2FA SETTINGS</button>
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full"><Settings size={20} /> CONFIG</button>
        </nav>
        <button className="flex items-center gap-4 text-red-500 font-bold border-t border-white/10 pt-6"><LogOut size={20} /> TERMINAL LOGOUT</button>
      </div>
    </div>
  );
};
export default Sidebar;
