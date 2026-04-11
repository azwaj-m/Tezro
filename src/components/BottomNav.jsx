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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#001a0f] border-t border-[#FFD700]/20 px-4 py-2 flex justify-between items-center z-[2000] rounded-t-[2rem] shadow-[0_-10px_20px_rgba(0,0,0,0.6)]">
      {navItems.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer">
          <div className={item.active ? "text-[#FFD700] bg-white/5 p-2 rounded-xl" : "text-white/30"}>
            {item.icon}
          </div>
          <span className={"text-[9px] font-bold " + (item.active ? "text-[#FFD700]" : "text-white/30")}>
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
};
export default BottomNav;
