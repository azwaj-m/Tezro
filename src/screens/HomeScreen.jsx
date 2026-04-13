import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import TezroVirtualCard from '../components/TezroVirtualCard';
import LiveMap from '../components/home/LiveMap';
import ExploreUniverse from '../components/home/ExploreUniverse';
import SecurityStatus from '../components/home/SecurityStatus';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-[#000d08] pb-32">
      <Navbar />
      <main className="pt-56 px-6 space-y-10 max-w-lg mx-auto">
        {/* ورچوئل کارڈ سیکشن */}
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
           <TezroVirtualCard />
        </div>

        <SecurityStatus />
        
        {/* لائیو فیڈ کارڈ */}
        <div className="border-2 border-[#FFD700]/30 rounded-[3.5rem] overflow-hidden h-80 shadow-[0_0_40px_rgba(255,215,0,0.15)] relative bg-black/40">
          <div className="absolute top-8 left-8 z-20 bg-black/90 backdrop-blur-2xl px-5 py-2 rounded-full border border-[#FFD700]/40 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            <span className="text-[10px] text-[#FFD700] font-black uppercase tracking-[3px]">Secure Live Feed</span>
          </div>
          <LiveMap />
        </div>
        
        <ExploreUniverse />
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
