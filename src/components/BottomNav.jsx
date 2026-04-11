import React from 'react';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: <Home size={22} />, label: 'Home', active: true },
    { icon: <CreditCard size={22} />, label: 'Pay' },
    { icon: <Tag size={22} />, label: 'Offers' },
    { icon: <History size={22} />, label: 'History' },
    { icon: <User size={22} />, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#001a0f] border-t border-[#FFD700]/10 flex justify-around items-center z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${item.active ? "text-[#FFD700]" : "text-white/30 hover:text-white/60"}`}
        >
          {item.icon}
          <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          {item.active && <div className="w-1 h-1 bg-[#FFD700] rounded-full mt-0.5"></div>}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
