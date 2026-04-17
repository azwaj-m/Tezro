import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: CreditCard, label: 'Pay', path: '/vault' },
    { icon: Tag, label: 'Offers', path: '/' },
    { icon: History, label: 'History', path: '/vault' },
    { icon: User, label: 'Profile', path: '/' },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-[999] bg-gradient-to-r from-[#FFD700] via-[#FDE68A] to-[#B8860B] rounded-[2.5rem] py-4 px-6 shadow-[0_15px_40px_rgba(255,215,0,0.4)]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1 group">
              <item.icon size={24} className={`${isActive ? 'text-black scale-125' : 'text-black/60'} transition-all`} />
              <span className={`text-[9px] font-black uppercase ${isActive ? 'text-black' : 'text-black/60'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;
