import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Coffee, Zap, CreditCard, Shield, Bell, Package, ChevronRight, Search } from 'lucide-react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [balance] = useState("1,250,500");

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32 font-sans selection:bg-gold/30">
      
      {/* 1. PREMIUM HEADER */}
      <header className="fixed top-0 w-full z-[2000] bg-black/60 backdrop-blur-xl border-b border-white/5 p-5 pt-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-gold to-[#F3E5AB] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Shield size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-gold font-black tracking-[3px] text-[10px] uppercase opacity-80">Tezro Authority</h2>
            <p className="text-white text-xs font-bold">Rs. {balance}</p>
          </div>
        </div>
        <div className="p-2 bg-white/5 rounded-full border border-white/10 relative">
          <Bell size={18} className="text-gray-400" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-black"></div>
        </div>
      </header>

      <main className="pt-32 px-5 space-y-8">
        
        {/* 2. DYNAMIC DARK MAP */}
        <div className="relative h-[260px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group">
          <MapContainer center={[31.4504, 73.1350]} zoom={14} zoomControl={false} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          
          {/* Map Overlay Search */}
          <div className="absolute bottom-6 inset-x-6 z-[1000]">
            <div className="bg-black/70 backdrop-blur-md border border-white/10 p-2 rounded-[24px] flex items-center shadow-2xl transition-all focus-within:border-gold/50">
              <Search size={18} className="text-gold ml-3" />
              <input type="text" placeholder="Where to, Chief?" className="bg-transparent flex-1 px-3 text-sm outline-none placeholder:text-gray-600" />
              <button className="bg-gold text-black px-6 py-3 rounded-[18px] font-black text-[10px] uppercase tracking-wider active:scale-90 transition-all">Go</button>
            </div>
          </div>
        </div>

        {/* 3. CORE SERVICES GRID */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { n: 'Ride', i: <Navigation size={22} />, p: '/ride', c: 'blue' },
            { n: 'Food', i: <Coffee size={22} />, p: '/food', c: 'orange' },
            { n: 'Vault', i: <CreditCard size={22} />, p: '/banking', c: 'gold' },
            { n: 'Parcel', i: <Package size={22} />, p: '/parcel', c: 'purple' }
          ].map((s, idx) => (
            <div key={idx} onClick={() => navigate(s.p)} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-[#111] rounded-[24px] border border-white/5 flex items-center justify-center text-white transition-all group-active:scale-90 group-hover:border-gold/30 shadow-lg">
                {s.i}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gold transition-colors">{s.n}</span>
            </div>
          ))}
        </div>

        {/* 4. LUXURY ACTION CARD */}
        <div className="bg-gradient-to-r from-gold/20 to-transparent p-8 rounded-[40px] border border-gold/10 flex justify-between items-center group active:scale-[0.98] transition-all cursor-pointer" onClick={() => navigate('/ride')}>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <Zap size={14} className="text-gold fill-gold" />
               <h3 className="font-black text-lg uppercase italic tracking-tighter">Priority Access</h3>
            </div>
            <p className="text-gold/60 text-[10px] font-bold tracking-[2px] uppercase">Instant Driver Dispatch</p>
          </div>
          <div className="bg-gold p-3 rounded-full text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <ChevronRight size={20} />
          </div>
        </div>

      </main>

      {/* 5. FLOATING GLASS NAV */}
      <nav className="fixed bottom-8 inset-x-8 h-20 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[35px] flex justify-around items-center px-6 z-[2000] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="p-3 bg-gold text-black rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.4)]"><Navigation size={24} /></div>
        <Package size={24} className="text-gray-600 hover:text-white transition-colors" />
        <CreditCard size={24} className="text-gray-600 hover:text-white transition-colors" />
        <Shield size={24} className="text-gray-600 hover:text-white transition-colors" />
      </nav>

    </div>
  );
};

export default HomeScreen;
