import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Bell, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-[#001a0f] to-transparent">
      {/* Top Row: Logo, Bell, Profile */}
      <div className="flex justify-between items-center mb-6">
        <div onClick={() => navigate('/')} className="flex items-center gap-1.5 cursor-pointer transform active:scale-95 transition-all">
          <span className="shiny-gold text-4xl font-black italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">T</span>
          <span className="text-white text-2xl font-black tracking-tight mt-1">Tezro</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/notifications')} className="relative transform active:scale-90 p-2">
            <Bell size={24} className="text-[#FFD700]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#001a0f] animate-pulse"></span>
          </button>
          
          <button onClick={() => navigate('/profile-settings')} className="w-12 h-12 rounded-2xl border-2 border-[#FFD700]/30 overflow-hidden shadow-2xl active:ring-2 ring-[#FFD700]">
            <User size={28} className="text-white/40 p-2" /> {/* Placeholder as per tree */}
          </button>
        </div>
      </div>
      
      {/* Search Bar: Match Image Style */}
      <div className="glass-iranian rounded-[1.8rem] border border-[#FFD700]/15 flex items-center px-6 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        <Search className="text-[#FFD700]/50 mr-3" size={18} />
        <input type="text" placeholder="Search Search Bar" className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/20" />
        <Mic className="text-[#FFD700]/50 ml-3" size={18} />
      </div>
    </header>
  );
};
export default Navbar;
