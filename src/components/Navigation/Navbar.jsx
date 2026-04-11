import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Mic, Bell, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-[#001a0f] via-[#001a0f]/90 to-transparent">
      <div className="flex justify-between items-center mb-6">
        {/* لوگو اب ہوم بٹن ہے */}
        <div onClick={() => navigate('/')} className="flex items-center gap-1 cursor-pointer active:scale-95 transition-transform">
          <span className="text-[#FFD700] text-4xl font-black italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">T</span>
          <span className="text-white text-2xl font-black tracking-tight">Tezro</span>
        </div>

        <div className="flex items-center gap-4">
          {/* نوٹیفکیشن بیل - تمام الرٹس کے لیے */}
          <div onClick={() => navigate('/notifications')} className="relative cursor-pointer active:scale-90 p-2">
            <Bell size={24} className="text-[#FFD700]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#001a0f] animate-pulse"></span>
          </div>
          
          {/* پروفائل تصویر - سیٹنگز کے لیے */}
          <div onClick={() => navigate('/profile-settings')} className="w-12 h-12 rounded-2xl border-2 border-[#FFD700]/30 overflow-hidden shadow-2xl cursor-pointer active:ring-2 ring-[#FFD700]">
            <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <div className="bg-[#002b1a]/80 backdrop-blur-2xl rounded-[1.8rem] border border-[#FFD700]/10 flex items-center px-6 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <Search className="text-[#FFD700]/40 mr-3" size={20} />
        <input type="text" placeholder="Search Search Bar" className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/20" />
        <Mic className="text-[#FFD700]/40 ml-3" size={20} />
      </div>
    </header>
  );
};
export default Navbar;
