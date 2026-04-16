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
    <nav className="fixed bottom-0 left-0 right-0 z-[999] bg-gradient-to-t from-[#FFD700] to-[#B8860B] rounded-t-[2.5rem] pb-8 pt-5 px-8 shadow-[0_-15px_40px_rgba(255,215,0,0.6)] border-t border-tezro-gold/30">
      <div className="flex justify-between items-center max-w-lg mx-auto relative">
        {/* 'Live Tracking' لیبل - تصویر 3 کے مطابق (Glowing Green) */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-zinc-900 px-4 py-1.5 rounded-full text-[10px] font-bold shadow-2xl flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></div> Live Tracking Active
        </div>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1 group relative">
              <item.icon size={26} strokeWidth={isActive ? 2.5 : 2} className={`${isActive ? 'text-zinc-950 scale-110' : 'text-black/70'} transition-all group-hover:scale-105`} />
              <span className={`text-[10px] ${isActive ? 'text-zinc-950 font-bold' : 'text-black/70'}`}>{item.label}</span>
              {isActive && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-zinc-950 rounded-full"></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;
