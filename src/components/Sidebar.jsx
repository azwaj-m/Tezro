import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { name: 'Profile', icon: '👤', path: '/vendor' },
    { name: 'Wallet', icon: '💳', path: '/banking' },
    { name: 'My Rides', icon: '🚗', path: '/ride' },
    { name: 'Orders', icon: '📦', path: '/food' },
    { name: 'Security', icon: '🛡️', path: '/vendor' },
    { name: 'Settings', icon: '⚙️', path: '/vendor' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]" onClick={onClose} />
      )}
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#001f0f] border-r border-[#d4af37]/30 z-[2001] transition-transform duration-500 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8">
          <h2 className="text-3xl font-black text-[#d4af37] tracking-tighter italic mb-10">TEZRO</h2>
          
          <nav className="space-y-6">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                onClick={() => { navigate(item.path); onClose(); }}
                className="flex items-center space-x-4 text-white/80 hover:text-[#d4af37] cursor-pointer group transition-colors"
              >
                <span className="text-xl bg-white/5 p-3 rounded-xl group-hover:bg-[#d4af37]/10">{item.icon}</span>
                <span className="font-bold tracking-wide uppercase text-xs">{item.name}</span>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-10 left-8 right-8">
            <button className="w-full py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">
              Logout Securely
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
