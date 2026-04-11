import React from 'react';
import { X, Settings, Shield, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000]" onClick={onClose} />}
      <div className={"fixed top-0 right-0 h-full w-64 bg-[#001a0f] border-l border-[#FFD700]/30 z-[3001] transition-transform duration-300 " + (isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="p-6">
          <button onClick={onClose} className="text-[#FFD700] mb-8"><X size={30} /></button>
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-white font-bold"><Settings size={20} className="text-[#FFD700]" /> Settings</div>
             <div className="flex items-center gap-3 text-white font-bold"><Shield size={20} className="text-[#FFD700]" /> Privacy</div>
             <div className="flex items-center gap-3 text-white font-bold"><HelpCircle size={20} className="text-[#FFD700]" /> Support</div>
             <div className="border-t border-white/10 pt-6">
               <div className="flex items-center gap-3 text-red-500 font-bold"><LogOut size={20} /> Logout</div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
