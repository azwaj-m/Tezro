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
    <nav className="fixed bottom-0 left-0 right-0 z-[110] bg-black/95 backdrop-blur-3xl border-t-2 border-[#FFD700]/30 px-6 py-5 shadow-[0_-15px_40px_rgba(255,215,0,0.2)] rounded-t-[3rem]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 transition-all duration-300 group"
            >
              <item.icon size={26} className={`${isActive ? 'text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,1)] scale-125' : 'text-gray-700'} transition-all duration-300`} />
              <span className={`text-[10px] font-black tracking-[2px] ${isActive ? 'text-[#FFD700] drop-shadow-[0_0_5px_#FFD700]' : 'text-gray-700'}`}>
                {item.label}
              </span>
              {isActive && <div className="absolute -bottom-3 w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_12px_#FFD700]"></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;
