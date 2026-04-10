import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001f0f] text-white font-sans overflow-x-hidden pb-28">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 🟢 Professional Header */}
      <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-[#001f0f]/95 backdrop-blur-md z-[1000]">
        <div className="cursor-pointer text-xl text-[#d4af37]" onClick={() => navigate('/notifications')}>🔔</div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.location.reload()}>
          <img src="/assets/logo.png" alt="Tezro" className="h-8 mb-1" />
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37]">TEZRO</span>
        </div>
        <div className="cursor-pointer" onClick={() => setSidebarOpen(true)}>
          <div className="space-y-1.5 flex flex-col items-end">
            <div className="w-6 h-0.5 bg-[#d4af37]"></div>
            <div className="w-6 h-0.5 bg-[#d4af37]"></div>
            <div className="w-4 h-0.5 bg-[#d4af37]"></div>
          </div>
        </div>
      </header>

      {/* 🔍 Search Bar with Voice */}
      <div className="px-6 mb-6">
        <div className="relative group">
          <input type="text" placeholder="Search Search Bar" className="w-full bg-white/5 border border-[#d4af37]/30 rounded-full py-4 px-12 text-sm outline-none focus:border-[#d4af37] transition-all shadow-lg" />
          <span className="absolute left-5 top-4 opacity-50">🔍</span>
          <span className="absolute right-5 top-4 text-[#d4af37] cursor-pointer">🎤</span>
        </div>
      </div>

      {/* 💳 Premium Virtual Card (As per Photo) */}
      <div className="px-6 mb-8">
        <div className="w-full h-52 bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#8b6508] rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between border border-white/10">
            <div className="flex justify-between items-start">
                <span className="text-[12px] font-black uppercase tracking-widest text-white/80">Tezro Virtual</span>
                <img src="/assets/logo.png" className="h-6 brightness-0 invert opacity-40" />
            </div>
            <div className="text-2xl font-mono tracking-[0.25em] text-white drop-shadow-lg">**** **** **** 4028</div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] uppercase opacity-60 mb-1">Available Balance</p>
                    <p className="text-2xl font-bold">$ 5,358.00</p>
                </div>
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-600/90 shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-yellow-500/90 shadow-lg border-l border-white/10"></div>
                </div>
            </div>
            {/* Subtle Pattern Overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        </div>
      </div>

      {/* 🗺️ Integrated Map View */}
      <div className="px-6 mb-8">
        <div className="h-44 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/20 shadow-inner grayscale-[0.5] brightness-[0.8]">
            <img src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/67.0011,24.8607,13/600x400?access_token=YOUR_TOKEN" className="w-full h-full object-cover" alt="Map" />
        </div>
      </div>

      {/* 🚀 Explore Universe (Swipe Grid) */}
      <div className="px-6 mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Explore Tezro Universe</h2>
        <span className="text-[11px] text-[#d4af37] font-bold uppercase tracking-wider cursor-pointer">View All</span>
      </div>

      <div className="flex space-x-5 overflow-x-auto px-6 no-scrollbar pb-6">
        {[
          { name: 'Marketplace', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=300', path: '/shop' },
          { name: 'Food Menu', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300', path: '/food' },
          { name: 'Ride Options', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300', path: '/ride' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="min-w-[160px] h-56 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer active:scale-95 transition-all">
            <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-[11px] font-black uppercase tracking-tighter">{item.name}</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
