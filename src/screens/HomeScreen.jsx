import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../neon.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [balance] = useState("1,250,500");

  const coreServices = [
    { n: 'Ride', i: '🚗', p: '/ride', c: 'green', desc: 'Book a driver' },
    { n: 'Food', i: '🍔', p: '/food', c: 'orange', desc: 'Order meals' },
    { n: 'Shop', i: '🛒', p: '/shop', c: 'blue', desc: 'Local stores' },
    { n: 'Parcel', i: '📦', p: '/parcel', c: 'purple', desc: 'Send packages' },
    { n: 'Booking', i: '🏨', p: '/booking', c: 'blue', desc: 'Hotels & Events' }
  ];

  return (
    <div className={`min-h-screen pb-32 transition-all duration-300 ${isDarkMode ? 'bg-[#000308] text-white' : 'bg-[#f5f5f5] text-black'}`}>
      
      {/* 1. TOP HEADER */}
      <header className="fixed top-0 inset-x-0 z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5 p-5 pt-12 flex justify-between items-center transition-all">
        <button className="text-xl opacity-70">☰</button>
        
        <div className="flex flex-col items-center">
          <div 
            onClick={toggleTheme}
            className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-[#10B981] font-black text-2xl shadow-[0_0_20px_#10B981] cursor-pointer"
          >
            T
          </div>
          <span className="text-[9px] font-black uppercase tracking-[3px] mt-1 text-white/50">
            {isDarkMode ? 'Dark' : 'Light'} Mode
          </span>
        </div>
        
        <button className="relative">
          <span className="text-xl">🔔</span>
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></div>
        </button>
      </header>

      <main className="pt-36 px-5 space-y-8">
        
        {/* 2. MAP SECTION */}
        <div className="tezro-glass h-[240px] rounded-[30px] overflow-hidden relative group">
          <div className="absolute inset-0 bg-[#0a0f18]"></div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_20px_10px_rgba(16,185,129,0.4)] animate-pulse"></div>
          </div>
          
          <div className="absolute bottom-5 inset-x-5 flex gap-2 z-[1000]">
             <div className="flex-1 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/5 text-xs text-white/70 flex items-center gap-2">
               <span>📍 Where to, Chief?</span>
             </div>
             <button 
                onClick={() => navigate('/ride')}
                className="bg-[#10B981] text-black px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-all"
              >
               Ride Now
             </button>
          </div>
        </div>

        {/* 3. QUICK ACTIONS BAR */}
        <div className="grid grid-cols-3 gap-3">
           {['Set Pickup', 'Wallet', 'Promotions'].map((link, idx) => (
             <div key={idx} className={`p-4 rounded-xl text-center text-[10px] font-bold active:scale-95 transition-all ${isDarkMode ? 'bg-white/5 text-white/70' : 'bg-black/5 text-black/70'}`}>
               {link}
             </div>
           ))}
        </div>

        {/* 4. MAIN NEON SERVICE BUTTONS GRID */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {coreServices.map((service, idx) => (
            <button 
                key={idx} 
                className={`neon-btn btn-${service.c} p-7 h-40 rounded-[30px] group active:scale-95 transition-all`} 
                onClick={() => navigate(service.p)}
            >
              <div className="text-5xl mb-4 text-white">{service.i}</div>
              <span className="font-black text-white text-xl tracking-tighter transition-colors group-hover:text-gold">{service.n}</span>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{service.desc}</span>
            </button>
          ))}
        </div>

      </main>

      {/* 5. BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 inset-x-0 h-24 bg-black/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-6 z-[2000]">
         <div className="text-[#10B981] flex flex-col items-center gap-1 font-bold text-[10px] active:scale-95" onClick={() => navigate('/')}>
           <span className="text-2xl">🏠</span> Home
         </div>
         <div className="text-white/50 flex flex-col items-center gap-1 text-[10px] active:scale-95" onClick={() => navigate('/ride')}>
           <span className="text-2xl">🚗</span> Ride
         </div>
         <div className="text-white/50 flex flex-col items-center gap-1 text-[10px] active:scale-95">
           <span className="text-2xl">📋</span> Orders
         </div>
         <div className="text-white/50 flex flex-col items-center gap-1 text-[10px] active:scale-95" onClick={() => navigate('/login')}>
           <span className="text-2xl">👤</span> Profile
         </div>
      </nav>

    </div>
  );
};

export default HomeScreen;
