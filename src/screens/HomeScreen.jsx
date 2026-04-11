import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import QuickActions from '../components/home/QuickActions';
import TezroVirtualCard from '../components/TezroVirtualCard';
import RideMap from '../components/RideMap';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#001a0f] text-white">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <main className="px-4 py-6 pb-24 space-y-6">
        <TezroVirtualCard />
        <QuickActions />
        <div className="rounded-[2.5rem] overflow-hidden border border-[#FFD700]/30 h-48 shadow-2xl">
          <RideMap />
        </div>
        <div className="py-4">
          <h2 className="text-[#FFD700] text-xs font-black uppercase tracking-widest mb-4 italic">Explore Tezro Universe</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative">
               <img src="/assets/market.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" />
               <span className="absolute bottom-4 left-4 font-bold text-xs uppercase">Marketplace</span>
            </div>
            <div className="h-40 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative">
               <img src="/assets/food.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" />
               <span className="absolute bottom-4 left-4 font-bold text-xs uppercase">Food Menu</span>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
