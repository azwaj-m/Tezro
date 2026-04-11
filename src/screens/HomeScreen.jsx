import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import QuickActions from '../components/home/QuickActions';
import TezroVirtualCard from '../components/TezroVirtualCard';
import RideMap from '../components/RideMap';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#001a0f] text-white flex flex-col">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 px-4 py-6 pb-28 space-y-8 overflow-y-auto max-w-md mx-auto w-full">
        <TezroVirtualCard />
        <QuickActions />
        <div className="rounded-[2.5rem] overflow-hidden border border-[#FFD700]/20 h-52 shadow-2xl relative bg-black/40"><RideMap /></div>
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.2em] italic">Tezro Universe</h2>
            <span className="text-[8px] text-white/30 font-bold uppercase border-b border-white/10">View All</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-44 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
               <span className="absolute bottom-4 left-4 font-black text-[9px] uppercase tracking-wider text-[#FFD700]">Marketplace</span>
            </div>
            <div className="h-44 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
               <span className="absolute bottom-4 left-4 font-black text-[9px] uppercase tracking-wider text-[#FFD700]">Food & Dining</span>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
