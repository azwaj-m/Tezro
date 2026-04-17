import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wallet, Gift, History, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Pay', icon: Wallet, path: '/finance' },
    { name: 'Offers', icon: Gift, path: '/offers' },
    { name: 'History', icon: History, path: '/notifications' },
    { name: 'Profile', icon: User, path: '/vault' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-2xl border-t border-gold/10 px-6 py-3 z-[3000]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-all ${
              location.pathname === item.path ? 'text-gold scale-110' : 'text-zinc-500'
            }`}
          >
            <item.icon size={20} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
            <span className="text-[9px] font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
