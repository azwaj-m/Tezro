import React from 'react';
import { Bell, ShieldCheck, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  // سکیورٹی چیک: اگر کوئی ایرر آئے تو فیل سیف (Fail-safe) میکانزم
  const handleSecurityClick = () => {
    alert("Security Status: Encrypted & Active");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#002b1a] border-b border-[#FFD700]/20 flex justify-between items-center px-4 z-[100] shadow-xl backdrop-blur-md bg-opacity-95">
      {/* پروفائل اور سکیورٹی انڈیکیٹر */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full border border-[#FFD700]/30 p-0.5 overflow-hidden">
          <img src="/assets/profile-placeholder.png" className="w-full h-full object-cover rounded-full" alt="User" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#002b1a] rounded-full shadow-sm"></div>
        </div>
        <button onClick={handleSecurityClick} className="flex flex-col">
          <span className="text-[10px] text-white/50 uppercase tracking-tighter">Identity Status</span>
          <div className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-[#FFD700]" />
            <span className="text-[9px] font-bold text-[#FFD700]">VERIFIED</span>
          </div>
        </button>
      </div>

      {/* لوگو */}
      <h1 className="text-xl font-black text-[#FFD700] italic tracking-widest uppercase">TEZRO</h1>

      {/* ایکشنز */}
      <div className="flex items-center gap-4">
        <Bell className="text-white/70 hover:text-[#FFD700] transition-colors" size={22} />
        <button onClick={onOpenSidebar} className="text-[#FFD700] hover:scale-110 active:scale-95 transition-all">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
