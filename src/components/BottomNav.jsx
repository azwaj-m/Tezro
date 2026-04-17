import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wallet, Gift, History, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Wallet, label: 'Pay', path: '/finance' },
    { icon: Gift, label: 'Offers', path: '/offers' },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/vault' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] px-4 pb-6">
      <div className="shiny-header-footer rounded-3xl flex justify-around items-center py-3 px-2 backdrop-blur-xl border border-white/20 shadow-[0_-10px_20px_rgba(0,255,136,0.2)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1 transition-all duration-300">
              <item.icon size={22} className={isActive ? "text-white fill-white" : "text-white/60"} />
              <span className={`text-[10px] font-bold ${isActive ? "text-white" : "text-white/60"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default BottomNav;
