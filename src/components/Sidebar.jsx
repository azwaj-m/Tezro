import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const menu = [
    { name: 'Banking Hub', icon: '🏦', path: '/banking' },
    { name: 'History', icon: '📊', path: '/history' },
    { name: 'Security Vault', icon: '🔐', path: '/settings' },
    { name: 'Emergency', icon: '🚨', path: '/emergency' },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000]" onClick={onClose} />}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#001f0f] z-[2001] transition-transform duration-500 border-r border-[#d4af37]/30 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-10">
          <img src="/assets/logo.png" className="h-10 mb-10" />
          <div className="space-y-8">
            {menu.map((item, i) => (
              <div key={i} onClick={() => { navigate(item.path); onClose(); }} className="flex items-center space-x-4 cursor-pointer hover:text-[#d4af37]">
                <span className="text-xl bg-white/5 p-3 rounded-2xl">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
