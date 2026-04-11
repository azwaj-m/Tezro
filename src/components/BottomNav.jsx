import React from 'react';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-20 glass-effect border-t border-[#FFD700]/10 flex justify-around items-center px-4 z-[100] rounded-t-[2.5rem]">
    {[
      { icon: Home, label: 'Home', active: true },
      { icon: CreditCard, label: 'Pay' },
      { icon: Tag, label: 'Offers' },
      { icon: History, label: 'History' },
      { icon: User, label: 'Profile' }
    ].map((tab, i) => (
      <div key={i} className={`flex flex-col items-center gap-1 ${tab.active ? "text-[#FFD700]" : "text-white/30"}`}>
        <tab.icon size={22} fill={tab.active ? "currentColor" : "none"} />
        <span className="text-[9px] font-bold uppercase tracking-tighter">{tab.label}</span>
      </div>
    ))}
  </nav>
);
export default BottomNav;
