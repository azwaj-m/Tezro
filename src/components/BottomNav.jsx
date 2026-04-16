import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'HOME', path: '/' },
    { icon: CreditCard, label: 'VAULT', path: '/vault' },
    { icon: Tag, label: 'OFFERS', path: '/' },
    { icon: History, label: 'HISTORY', path: '/vault' },
    { icon: User, label: 'PROFILE', path: '/' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] bg-black/80 backdrop-blur-xl border-t border-zinc-800 pb-6 pt-3 px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 transition-all duration-300 group"
            >
              <item.icon size={26} className={`${isActive ? 'text-tezro-gold drop-shadow-[0_0_15px_rgba(255,215,0,1)] scale-125' : 'text-gray-700'} transition-all duration-300`} />
              <span className={`text-[10px] font-black tracking-[2px] ${isActive ? 'text-tezro-gold drop-shadow-[0_0_5px_#FFD700]' : 'text-gray-700'}`}>
                {item.label}
              </span>
              {isActive && <div className="absolute -bottom-3 w-2 h-2 bg-tezro-gold rounded-full shadow-[0_0_12px_#FFD700]"></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;
