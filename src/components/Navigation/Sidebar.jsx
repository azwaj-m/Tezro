import React from 'react';
import { X, Settings, Shield, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={"fixed inset-0 bg-black/70 backdrop-blur-md z-[3000] transition-opacity duration-300 " + (isOpen ? "opacity-100 visible" : "opacity-0 invisible")} onClick={onClose} />
      <div className={"fixed top-0 right-0 h-full w-72 bg-[#001a0f] border-l border-[#FFD700]/30 z-[3001] transition-transform duration-500 ease-out " + (isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center"><span className="text-[#FFD700] font-black italic tracking-widest">MENU</span><button onClick={onClose} className="text-[#FFD700]"><X size={32} /></button></div>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white font-bold hover:text-[#FFD700] transition-colors cursor-pointer"><Settings size={22} className="text-[#FFD700]" /> Account Settings</div>
            <div className="flex items-center gap-4 text-white font-bold hover:text-[#FFD700] transition-colors cursor-pointer"><Shield size={22} className="text-[#FFD700]" /> Privacy & Security</div>
            <div className="flex items-center gap-4 text-white font-bold hover:text-[#FFD700] transition-colors cursor-pointer"><HelpCircle size={22} className="text-[#FFD700]" /> Support Center</div>
            <div className="pt-10 border-t border-white/10"><div className="flex items-center gap-4 text-red-500 font-bold cursor-pointer"><LogOut size={22} /> Logout</div></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
