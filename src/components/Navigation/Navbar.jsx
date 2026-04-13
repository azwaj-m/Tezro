import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Mic } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-[110] p-6 bg-black/90 backdrop-blur-2xl border-b border-[#FFD700]/30 shadow-[0_4px_30px_rgba(255,215,0,0.15)]">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onOpenSidebar} className="p-2 text-[#FFD700] active:scale-90 transition-all drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
          <Menu size={30} />
        </button>

        <div onClick={() => navigate('/')} className="cursor-pointer active:scale-95 transition-all">
          <img src="/assets/logo.png" alt="Tezro" className="h-12 object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
               onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Z"; }} />
        </div>

        <button onClick={() => navigate('/notifications')} className="relative p-2 active:scale-90 transition-all">
          <Bell size={26} className="text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]" />
          <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-black animate-pulse shadow-[0_0_10px_red]"></span>
        </button>
      </div>

      <div className="bg-[#0b1410] rounded-[2rem] border-2 border-[#FFD700]/40 flex items-center px-6 py-4 shadow-[inset_0_0_20px_rgba(255,215,0,0.15)] focus-within:border-[#FFD700] transition-all">
        <Search className="text-[#FFD700] opacity-90 mr-3" size={22} />
        <input type="text" placeholder="Search Banks & Services..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-[#FFD700]/30 font-black italic tracking-wider" />
        <Mic className="text-[#FFD700] opacity-90 ml-3" size={22} />
      </div>
    </header>
  );
};
export default Navbar;
