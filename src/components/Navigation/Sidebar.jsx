import React from 'react';
import { X, LogOut, User, Settings, ShieldCheck, Map, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'پروفائل', path: '/profile' },
    { icon: CreditCard, label: 'ورچوئل کارڈ', path: '/vault' },
    { icon: Map, label: 'لائیو میپ', path: '/' },
    { icon: ShieldCheck, label: 'سیکیورٹی سینٹر', path: '/' },
    { icon: Settings, label: 'ترتیبات', path: '/settings' },
  ];

  return (
    <div className={`fixed inset-0 z-[200] transition-all duration-500 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      {/* Background Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      {/* Sidebar Panel */}
      <div className={`absolute top-0 left-0 bottom-0 w-80 bg-[#00150c] border-r border-[#FFD700]/30 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-[10px_0_50px_rgba(255,215,0,0.15)]`}>
        <div className="p-6 border-b border-[#FFD700]/10 flex justify-between items-center">
          <img src="/assets/logo.png" className="h-10 filter drop-shadow-[0_0_8px_#FFD700]" />
          <button onClick={onClose} className="p-2 text-[#FFD700] hover:scale-110 transition-transform"><X size={24} /></button>
        </div>

        <nav className="p-6 space-y-4">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => { navigate(item.path); onClose(); }}
              className="w-full flex items-center gap-4 p-4 rounded-xl text-white/70 hover:bg-[#FFD700]/10 hover:text-[#FFD700] transition-colors"
            >
              <item.icon size={22} />
              <span className="font-bold text-sm uppercase tracking-[1px]">{item.label}</span>
            </button>
          ))}
          
          <button className="w-full flex items-center gap-4 p-4 mt-10 text-red-500 rounded-xl hover:bg-red-500/10">
            <LogOut size={22} />
            <span className="font-black text-xs uppercase tracking-widest">لاگ آؤٹ کریں</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
