import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'HOME', path: '/' },
    { icon: CreditCard, label: 'PAY', path: '/vault' },
    { icon: Tag, label: 'OFFERS', path: '/' },
    { icon: History, label: 'HISTORY', path: '/vault' },
    { icon: User, label: 'PROFILE', path: '/' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#001a0f]/90 backdrop-blur-xl border-t border-[#FFD700]/20 px-4 py-3">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 group"
            >
              <item.icon size={20} className={isActive ? 'text-[#FFD700]' : 'text-white/20'} />
              <span className={`text-[8px] font-black tracking-tighter ${isActive ? 'text-[#FFD700]' : 'text-white/20'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;
