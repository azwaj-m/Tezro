import React from 'react';
import { Home, CreditCard, Tag, History, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#001a0f] border-t border-[#FFD700]/20 flex justify-around items-center z-[9999] px-2 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center text-[#FFD700]"><Home size={22} /><span className="text-[9px]">Home</span></div>
      <div className="flex flex-col items-center text-white/30"><CreditCard size={22} /><span className="text-[9px]">Pay</span></div>
      <div className="flex flex-col items-center text-white/30"><Tag size={22} /><span className="text-[9px]">Offers</span></div>
      <div className="flex flex-col items-center text-white/30"><History size={22} /><span className="text-[9px]">History</span></div>
      <div className="flex flex-col items-center text-white/30"><User size={22} /><span className="text-[9px]">Profile</span></div>
    </nav>
  );
};
export default BottomNav;
