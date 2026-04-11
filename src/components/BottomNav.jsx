import React from 'react';
import { Home, CreditCard, Percent, History, User } from 'lucide-react';

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-22 bg-[#001a0f]/95 backdrop-blur-3xl border-t border-[#FFD700]/15 flex justify-around items-center px-6 z-50 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
    {[
      { icon: Home, label: 'Home', active: true },
      { icon: CreditCard, label: 'Pay' },
      { icon: Percent, label: 'Offers' },
      { icon: History, label: 'History' },
      { icon: User, label: 'Profile' }
    ].map((tab, i) => (
      <button key={i} className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${tab.active ? "text-[#FFD700]" : "text-white/20"}`}>
        <div className={`p-2.5 rounded-2xl ${tab.active ? "bg-[#FFD700]/10 shadow-[0_0_20px_rgba(255,215,0,0.1)]" : ""}`}>
          <tab.icon size={24} strokeWidth={tab.active ? 2.5 : 1.5} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
      </button>
    ))}
  </nav>
);

export default BottomNav;
