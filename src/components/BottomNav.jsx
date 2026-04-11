import React from 'react';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: <Home size={26} />, label: 'Home', active: true },
    { icon: <CreditCard size={26} />, label: 'Pay' },
    { icon: <Tag size={26} />, label: 'Offers' },
    { icon: <History size={26} />, label: 'History' },
    { icon: <User size={26} />, label: 'Profile' }
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#002b1a] border-t border-[#FFD700]/20 flex justify-around items-center z-[5000] rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
      {navItems.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1 py-2">
          <div className={item.active ? "text-[#FFD700] bg-white/5 p-2 rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.2)]" : "text-white/30"}>
            {item.icon}
          </div>
          <span className={"text-[10px] font-black uppercase tracking-tighter " + (item.active ? "text-[#FFD700]" : "text-white/30")}>
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
};
export default BottomNav;
