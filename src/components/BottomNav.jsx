import React from 'react';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const items = [
    { icon: <Home size={20} />, label: 'Home', active: true },
    { icon: <CreditCard size={20} />, label: 'Pay' },
    { icon: <Tag size={20} />, label: 'Offers' },
    { icon: <History size={20} />, label: 'History' },
    { icon: <User size={20} />, label: 'Profile' }
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#001a0f] border-t border-[#FFD700]/20 px-6 py-2 flex justify-between items-center z-[1000] rounded-t-3xl shadow-2xl">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={item.active ? "text-[#FFD700] bg-white/5 p-2 rounded-xl" : "text-white/30"}>{item.icon}</div>
          <span className={"text-[8px] font-bold " + (item.active ? "text-[#FFD700]" : "text-white/30")}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};
export default BottomNav;
