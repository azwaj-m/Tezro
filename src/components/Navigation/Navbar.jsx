import React, { useState, useEffect } from 'react';
import { Bell, Menu, Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { listenForRideRequests } from '../../utils/NotificationEngine';

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const [hasNewRide, setHasNewRide] = useState(false);
  const driverId = localStorage.getItem('tezro_driver_token');

  useEffect(() => {
    if (driverId) {
      // رائیڈ درخواستوں کے لیے لسنر شروع کریں
      const unsubscribe = listenForRideRequests(driverId, (request) => {
        setHasNewRide(true);
        // بیپ کی آواز (اختیاری)
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
        audio.play().catch(() => {}); 
      });
      return () => unsubscribe();
    }
  }, [driverId]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[110] p-6 bg-black/90 backdrop-blur-2xl border-b border-[#FFD700]/30 shadow-[0_4px_30px_rgba(255,215,0,0.15)]">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onOpenSidebar} className="p-2 text-[#FFD700] active:scale-90 transition-all">
          <Menu size={28} />
        </button>
        
        <img src="/assets/logo.png" className="h-8 filter drop-shadow-[0_0_8px_#FFD700]" alt="Tezro" />

        <button 
          onClick={() => { setHasNewRide(false); navigate('/notifications'); }} 
          className="relative p-2 text-[#FFD700] active:scale-90 transition-all"
        >
          <Bell size={26} className={`${hasNewRide ? 'animate-bounce' : ''}`} />
          {hasNewRide && (
            <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-black animate-pulse shadow-[0_0_10px_red]"></span>
          )}
        </button>
      </div>

      {/* سرچ بار */}
      <div className="bg-[#0b1410] rounded-[2rem] border-2 border-[#FFD700]/40 flex items-center px-6 py-4 shadow-[inset_0_0_20px_rgba(255,215,0,0.15)]">
        <Search className="text-[#FFD700] opacity-90 mr-3" size={22} />
        <input type="text" placeholder="Search Banks & Services..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-[#FFD700]/30 font-black italic tracking-wider" />
        <Mic className="text-[#FFD700] opacity-90 ml-3" size={22} />
      </div>
    </header>
  );
};

export default Navbar;
