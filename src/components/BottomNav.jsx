import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // تصویر کے مطابق 5 بٹنز کی ترتیب
  const navItems = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'Pay', icon: '💳', path: '/pay' },
    { name: 'Offers', icon: '🎁', path: '/offers' },
    { name: 'History', icon: '📊', path: '/history' },
    { name: 'Profile', icon: '👤', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#002f17]/90 backdrop-blur-lg border-t border-[#d4af37]/20 flex justify-around items-center px-4 z-[1000] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <div 
            key={idx} 
            onClick={() => navigate(item.path)} 
            className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60'}`}
          >
            <span className={`text-2xl mb-1 ${isActive ? 'text-[#d4af37]' : 'text-white'}`}>{item.icon}</span>
            <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-[#d4af37]' : 'text-white/70'}`}>
              {item.name}
            </span>
            {isActive && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-lg"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
