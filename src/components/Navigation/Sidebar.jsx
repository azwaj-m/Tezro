import React from 'react';
import { X, Settings, Shield, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]" onClick={onClose} />}
      <div className={"fixed top-0 right-0 h-full w-64 bg-[#002b1a] border-l border-[#FFD700]/30 z-[2001] transition-transform duration-300 " + (isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="p-6">
          <button onClick={onClose} className="text-[#FFD700] mb-8"><X size={28} /></button>
          <div className="space-y-6 text-white font-bold text-sm">
             <div className="flex items-center gap-3"><Settings size={18} className="text-[#FFD700]" /> Settings</div>
             <div className="flex items-center gap-3"><Shield size={18} className="text-[#FFD700]" /> Privacy</div>
             <div className="border-t border-white/10 pt-6 flex items-center gap-3 text-red-400"><LogOut size={18} /> Logout</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
