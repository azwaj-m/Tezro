import React from 'react';
import { Home, CreditCard, User } from 'lucide-react';
const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#001a0f] border-t border-[#FFD700]/10 flex justify-around items-center z-[50]">
    <div className="text-[#FFD700] flex flex-col items-center"><Home size={22} /><span className="text-[9px]">HOME</span></div>
    <div className="text-white/30 flex flex-col items-center"><CreditCard size={22} /><span className="text-[9px]">PAY</span></div>
    <div className="text-white/30 flex flex-col items-center"><User size={22} /><span className="text-[9px]">PROFILE</span></div>
  </nav>
);
export default BottomNav;
