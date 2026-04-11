import React from 'react';
import { X, ShieldCheck, Fingerprint, Lock, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex animate-in fade-in duration-300">
      {/* Background Overlay with Backdrop Blur (Secure) */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose}></div>
      
      {/* Sidebar Panel - Deep Green Style */}
      <div className="relative w-80 h-full bg-[#001a0f] border-r border-[#FFD700]/20 p-8 flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.5)] animate-in slide-in-from-left duration-500">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FFD700] text-3xl font-black italic tracking-tighter">T</span>
            <span className="text-white text-xl font-bold tracking-tight">TEZRO ID</span>
          </div>
          <button onClick={onClose} className="text-[#FFD700] hover:scale-110 transition-transform"><X size={26} /></button>
        </div>

        {/* User Info Section */}
        <div className="mb-10 p-5 bg-[#002b1a] rounded-2xl border border-[#FFD700]/10 flex items-center gap-4">
           <img src="https://via.placeholder.com/100" className="w-14 h-14 rounded-full border-2 border-[#FFD700]/30" alt="Avatar" />
           <div>
              <p className="text-sm font-bold text-white">TZ-8849-SEC</p>
              <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Active System User</span>
           </div>
        </div>

        {/* Secure Navigation */}
        <nav className="space-y-8 flex-1">
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full text-sm font-bold uppercase tracking-wider"><ShieldCheck size={20} className="text-[#FFD700]" /> Privacy Vault</button>
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full text-sm font-bold uppercase tracking-wider"><Fingerprint size={20} className="text-[#FFD700]" /> Biometric Link</button>
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full text-sm font-bold uppercase tracking-wider"><Lock size={20} className="text-[#FFD700]" /> 2FA Settings</button>
          <button className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] w-full text-sm font-bold uppercase tracking-wider"><Settings size={20} className="text-[#FFD700]" /> System Config</button>
        </nav>

        {/* Secure Logout */}
        <button className="flex items-center gap-4 text-red-500 font-black border-t border-white/10 pt-8 text-sm uppercase tracking-wider"><LogOut size={20} /> Terminal Logout</button>
      </div>
    </div>
  );
};
export default Sidebar;
