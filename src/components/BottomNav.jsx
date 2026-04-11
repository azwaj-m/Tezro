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
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#001a0f] to-[#00331f] border-t border-[#FFD700]/30 px-6 py-2 flex justify-between items-center z-[1000] rounded-t-[2.5rem] shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      {navItems.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1 cursor-pointer">
          <div className={item.active ? "text-[#FFD700] bg-white/10 p-2.5 rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.3)]" : "text-white/40"}>
            {item.icon}
          </div>
          <span className={"text-[9px] font-bold uppercase tracking-tighter " + (item.active ? "text-[#FFD700]" : "text-white/40")}>
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
};
export default BottomNav;
