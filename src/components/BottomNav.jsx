import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const tabs = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: CreditCard, label: 'Pay', path: '/pay' },
    { icon: Tag, label: 'Offers', path: '/offers' },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-[#001a0f]/95 backdrop-blur-3xl border-t border-[#FFD700]/15 flex justify-around items-center px-6 z-50 rounded-t-[3rem] shadow-[0_-10px_50px_rgba(0,0,0,0.8)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link key={tab.path} to={tab.path} className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90 ${isActive ? "text-[#FFD700]" : "text-white/20"}`}>
            <div className={`p-3 rounded-2xl transition-all ${isActive ? "bg-[#FFD700]/10 shadow-[0_0_20px_rgba(255,215,0,0.2)]" : ""}`}>
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
export default BottomNav;
