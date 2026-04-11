import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import QuickActions from '../components/home/QuickActions';
import TezroVirtualCard from '../components/TezroVirtualCard';
import RideMap from '../components/RideMap';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#001a0f] text-white overflow-x-hidden">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <main className="px-4 py-6 pb-32 space-y-8 max-w-md mx-auto">
        {/* کارڈ سیکشن */}
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
           <TezroVirtualCard />
        </div>
        
        {/* ایکشنز */}
        <QuickActions />
        
        {/* میپ سیکشن */}
        <div className="rounded-[2.5rem] overflow-hidden border border-[#FFD700]/30 h-52 shadow-2xl relative bg-black/20">
          <RideMap />
        </div>

        {/* ایکسپلور سیکشن */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.2em] italic">Explore Tezro Universe</h2>
            <button className="text-[8px] text-white/40 font-bold uppercase border-b border-white/10">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div className="h-44 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/5 overflow-hidden relative group">
               <img src="/assets/market.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <span className="absolute bottom-4 left-4 font-black text-[10px] uppercase tracking-wider text-[#FFD700]">Marketplace</span>
            </div>
            <div className="h-44 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/5 overflow-hidden relative group">
               <img src="/assets/food.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <span className="absolute bottom-4 left-4 font-black text-[10px] uppercase tracking-wider text-[#FFD700]">Food Menu</span>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
