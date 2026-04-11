import React from 'react';
import { X, Settings, Shield, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[6000]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-64 bg-[#001a0f] border-l border-[#FFD700]/30 p-6 shadow-2xl">
        <button onClick={onClose} className="text-[#FFD700] mb-8"><X size={32} /></button>
        <div className="space-y-6">
           <div className="flex items-center gap-4 text-white font-bold"><Settings size={20} className="text-[#FFD700]" /> Settings</div>
           <div className="flex items-center gap-4 text-white font-bold"><Shield size={20} className="text-[#FFD700]" /> Privacy</div>
           <div className="flex items-center gap-4 text-white font-bold"><HelpCircle size={20} className="text-[#FFD700]" /> Support</div>
           <div className="pt-6 border-t border-white/10 text-red-500 font-bold flex items-center gap-4"><LogOut size={20} /> Logout</div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
