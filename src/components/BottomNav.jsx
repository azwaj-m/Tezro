import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navs = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'Pay', icon: '💳', path: '/pay' },
    { name: 'Offers', icon: '🏷️', path: '/offers' },
    { name: 'History', icon: '🕒', path: '/history' },
    { name: 'Profile', icon: '👤', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 h-20 bg-black/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 flex justify-around items-center px-4 z-[1000] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {navs.map((item, i) => {
        const isActive = location.pathname === item.path;
        return (
          <div key={i} onClick={() => navigate(item.path)} className="flex flex-col items-center cursor-pointer transition-all">
            <span className={`text-xl ${isActive ? 'scale-125 mb-1' : 'opacity-40'}`}>{item.icon}</span>
            <span className={`text-[8px] font-bold uppercase tracking-tighter ${isActive ? 'text-[#d4af37]' : 'opacity-40'}`}>
              {item.name}
            </span>
            {isActive && <div className="w-1 h-1 bg-[#d4af37] rounded-full mt-1 animate-ping"></div>}
          </div>
        );
      })}
    </nav>
  );
};

export default BottomNav;
