import React from 'react';
import { X, Shield, Lock, Settings, LogOut, UserCheck } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex">
      {/* اوورلے (باہر کلک کرنے پر بند ہوگا) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* سائڈبار کنٹینٹ */}
      <div className="relative w-64 h-full bg-[#001a0f] border-r border-[#FFD700]/20 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[#FFD700]/10 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[#FFD700] font-black tracking-widest uppercase text-sm">Tezro ID</span>
            <span className="text-[10px] text-white/40 tracking-tight">TZ-8849-SEC</span>
          </div>
          <button onClick={onClose} className="text-[#FFD700] hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFD700]/5 text-white/70 hover:text-[#FFD700] transition-all">
            <UserCheck size={20} /> <span className="text-xs font-bold uppercase">Biometric Link</span>
          </button>
          <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFD700]/5 text-white/70 hover:text-[#FFD700] transition-all">
            <Shield size={20} /> <span className="text-xs font-bold uppercase">Privacy Vault</span>
          </button>
          <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFD700]/5 text-white/70 hover:text-[#FFD700] transition-all">
            <Lock size={20} /> <span className="text-xs font-bold uppercase">2FA Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFD700]/5 text-white/70 hover:text-[#FFD700] transition-all">
            <Settings size={20} /> <span className="text-xs font-bold uppercase">System Config</span>
          </button>
        </nav>

        <div className="p-4 border-t border-[#FFD700]/10">
          <button className="w-full flex items-center gap-4 p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={20} /> <span className="text-xs font-bold uppercase">Terminal Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
