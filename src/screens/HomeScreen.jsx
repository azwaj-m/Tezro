import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => (
  <div className="min-h-screen bg-[#001a0f] pb-24">
    <Navbar />
    
    <main className="pt-44 px-4 space-y-6 overflow-y-auto no-scrollbar">
      {/* Integrated Services Banner */}
      <div className="relative w-full h-48 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/20 shadow-2xl">
        <img src="https://via.placeholder.com/600x400/002b1a/FFD700?text=Premium+Services" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-black leading-tight text-white uppercase tracking-tighter">Integrated Services<br/>& Home Returns</h2>
          <button className="mt-5 bg-[#FFD700] text-black text-[11px] font-black px-8 py-3 rounded-full w-max uppercase shadow-xl hover:scale-105 transition-transform">Shop Now</button>
        </div>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-36 bg-gradient-to-br from-[#1a1a1a] to-black rounded-[2rem] border border-[#FFD700]/30 p-5 relative shadow-xl">
           <div className="flex justify-between items-start">
             <span className="text-[#FFD700] font-black italic text-[10px] tracking-[2px]">TEZRO</span>
             <div className="w-8 h-5 bg-yellow-600/30 rounded-md"></div>
           </div>
           <p className="mt-8 text-sm font-mono tracking-[3px] text-white/80">**** 4038</p>
        </div>
        <div className="h-36 glass rounded-[2rem] p-5 shadow-xl flex flex-col justify-between">
           <div>
             <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Balance</p>
             <p className="text-lg font-black text-[#FFD700] tracking-tighter mt-1">$ 5,358.00</p>
           </div>
           <div className="space-y-1.5">
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-[#FFD700]/40"></div></div>
             <div className="h-1 w-1/2 bg-white/5 rounded-full"></div>
           </div>
        </div>
      </div>

      {/* Map View */}
      <div className="w-full h-44 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-inner">
        <img src="https://via.placeholder.com/500x300/001a0f/22c55e?text=Active+Terminal+Map" className="w-full h-full object-cover opacity-60 grayscale-[0.5]" />
      </div>
    </main>

    <BottomNav />
  </div>
);
export default HomeScreen;
