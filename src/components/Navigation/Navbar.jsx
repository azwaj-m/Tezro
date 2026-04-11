import React from 'react';
import { Bell, Menu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-4 py-3 sticky top-0 bg-[#002b1a] z-[2000] border-b border-[#FFD700]/30 shadow-lg w-full">
      {/* پروفائل سیکشن (دائیں طرف) */}
      <div className="flex items-center gap-2 flex-1">
        <div className="relative border border-[#FFD700]/50 rounded-full p-0.5 w-10 h-10 cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/profile')}>
          <img src="/assets/profile-placeholder.png" className="w-full h-full rounded-full object-cover" alt="User" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-sm"></div>
        </div>
        <div className="hidden xs:flex flex-col bg-black/40 px-2.5 py-1 rounded-full border border-[#FFD700]/20 items-center gap-1 shadow-inner">
          <ShieldCheck size={10} className="text-[#FFD700]" />
          <span className="text-[9px] text-[#FFD700] font-black uppercase tracking-wider">Cyber Secure</span>
        </div>
      </div>
      
      {/* سینٹرل ٹیکسٹ (لوگو کی جگہ) - چمکدار گولڈن ٹیکسٹ */}
      <div className="flex flex-col items-center flex-1 cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/')}>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFFACD] to-[#D4AF37] italic uppercase tracking-tighter drop-shadow-[0_2px_10px_rgba(255,215,0,0.5)]">
          Tezro
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full mt-1 shadow-[0_0_10px_#FFD700]"></div>
      </div>

      {/* الرٹس اور مینو (بائیں طرف) */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="relative p-1.5 text-[#FFD700] hover:scale-110 transition-transform cursor-pointer" onClick={() => navigate('/notifications')}>
          <Bell size={24} className="drop-shadow-[0_0_8px_#FFD700]" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-black animate-pulse shadow-md"></span>
        </div>
        <button onClick={onOpenSidebar} className="text-[#FFD700] p-1.5 active:scale-90 transition-transform">
          <Menu size={30} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
