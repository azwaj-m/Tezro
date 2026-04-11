import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, Settings, Wallet, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const menuItems = [
    { label: 'Security Vault', icon: Shield, path: '/notifications' },
    { label: 'Wallet Settings', icon: Wallet, path: '/profile-settings' },
    { label: 'System Settings', icon: Settings, path: '/profile-settings' },
    { label: 'Support Center', icon: HelpCircle, path: '/' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-80 bg-[#001a0f] border-r border-[#FFD700]/20 h-full p-8 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col">
        <div className="flex justify-between items-center mb-12">
          <span className="shiny-gold text-2xl font-black italic">TEZRO MENU</span>
          <button onClick={onClose} className="text-[#FFD700]"><X size={30} /></button>
        </div>

        <div className="space-y-6 flex-1">
          {menuItems.map((item, i) => (
            <div key={i} onClick={() => { navigate(item.path); onClose(); }} className="flex items-center gap-4 text-white/70 hover:text-[#FFD700] cursor-pointer transition-all p-2 rounded-xl hover:bg-[#FFD700]/5">
              <item.icon size={22} />
              <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-4 text-red-500/70 p-4 border-t border-white/5 mt-auto">
          <LogOut size={20} /> <span className="text-sm font-black uppercase">Secure Logout</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
