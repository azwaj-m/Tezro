import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Mic } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-[#FFD700]/10 via-[#001a0f] to-transparent">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onOpenSidebar} className="p-2 text-[#FFD700] active:scale-90 transition-all">
          <Menu size={28} />
        </button>

        {/* لوگو درمیان میں */}
        <div onClick={() => navigate('/')} className="cursor-pointer active:scale-95 transition-all">
          <img src="/assets/logo.png" alt="Tezro" className="h-10 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" 
               onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=TEZRO"; }} />
        </div>

        <button onClick={() => navigate('/notifications')} className="relative p-2 active:scale-90 transition-all">
          <Bell size={24} className="text-[#FFD700]" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#001a0f]"></span>
        </button>
      </div>

      <div className="glass-iranian rounded-[1.8rem] border border-[#FFD700]/15 flex items-center px-6 py-4 shadow-2xl">
        <Search className="text-[#FFD700]/50 mr-3" size={18} />
        <input type="text" placeholder="Search Services..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/20" />
        <Mic className="text-[#FFD700]/50 ml-3" size={18} />
      </div>
    </header>
  );
};
export default Navbar;
