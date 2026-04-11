import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, Wallet, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-72 bg-[#001a0f] border-r border-[#FFD700]/20 h-full p-6 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <span className="shiny-gold font-black italic">TEZRO MENU</span>
          <button onClick={onClose} className="text-[#FFD700]"><X size={24} /></button>
        </div>
        <div className="space-y-4">
          <button onClick={() => handleNav('/vault')} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#FFD700]/10 text-white/80">
            <Wallet size={20} className="text-[#FFD700]" />
            <span className="font-bold uppercase text-xs tracking-widest">Financial Vault</span>
          </button>
          <button onClick={() => handleNav('/vault')} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#FFD700]/10 text-white/80">
            <Shield size={20} className="text-[#FFD700]" />
            <span className="font-bold uppercase text-xs tracking-widest">Security Audit</span>
          </button>
        </div>
        <button className="mt-auto flex items-center gap-4 p-4 text-red-500/60 font-black uppercase text-xs">
          <LogOut size={18} /> Secure Exit
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
