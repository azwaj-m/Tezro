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
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#001a0f] to-[#002b1a] border-t border-[#FFD700]/20 px-4 py-2 flex justify-between items-center z-[2000] rounded-t-[2.5rem] shadow-[0_-10px_20px_rgba(0,0,0,0.8)]">
      {navItems.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1 cursor-pointer">
          <div className={item.active ? "text-[#FFD700] bg-white/10 p-2 rounded-2xl shadow-[0_0_10px_rgba(255,215,0,0.2)]" : "text-white/30"}>
            {item.icon}
          </div>
          <span className={"text-[8px] font-bold uppercase tracking-tighter " + (item.active ? "text-[#FFD700]" : "text-white/30")}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};
export default BottomNav;
