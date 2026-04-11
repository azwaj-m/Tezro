import React from 'react';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', active: true },
    { icon: <CreditCard size={20} />, label: 'Pay' },
    { icon: <Tag size={20} />, label: 'Offers' },
    { icon: <History size={20} />, label: 'History' },
    { icon: <User size={20} />, label: 'Profile' }
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#001a0f] to-[#00331f] border-t border-[#FFD700]/30 px-6 py-3 flex justify-between items-center z-[1000] rounded-t-[2rem]">
      {navItems.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={item.active ? "text-[#FFD700] bg-white/10 p-2 rounded-xl shadow-[0_0_10px_#FFD700]" : "text-white/60"}>
            {item.icon}
          </div>
          <span className={"text-[10px] font-bold " + (item.active ? "text-[#FFD700]" : "text-white/60")}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};
export default BottomNav;
