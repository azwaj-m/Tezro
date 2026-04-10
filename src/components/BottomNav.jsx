import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Pay', path: '/pay', icon: '💳' },
    { name: 'Offers', path: '/offers', icon: '🏷️' },
    { name: 'History', path: '/history', icon: '🕒' },
    { name: 'Profile', path: '/profile', icon: '👤' }
  ];

  return (
    <div className="fixed bottom-8 left-6 right-6 z-[1001]">
      <nav className="h-20 bg-black/80 backdrop-blur-2xl rounded-[2.5rem] border border-[#d4af37]/20 flex justify-around items-center px-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.name} onClick={() => navigate(item.path)} className="relative flex flex-col items-center group">
              <span className={`text-2xl transition-all duration-300 ${isActive ? 'scale-125 -translate-y-1' : 'opacity-40 group-hover:opacity-70'}`}>
                {item.icon}
              </span>
              <span className={`text-[8px] font-black uppercase mt-1 tracking-tighter transition-all ${isActive ? 'text-[#d4af37] opacity-100' : 'opacity-40'}`}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
