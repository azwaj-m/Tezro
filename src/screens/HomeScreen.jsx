import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import ExploreUniverse from '../components/home/ExploreUniverse';
import LiveMap from '../components/home/LiveMap';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001a0f] text-white">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-52 pb-32 px-6 space-y-12 overflow-y-auto no-scrollbar max-w-md mx-auto">
        <TezroVirtualCard />
        
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black shiny-gold uppercase tracking-tighter">Active Terminals</h3>
            <span className="text-[10px] text-[#FFD700]/50 font-bold uppercase tracking-widest">Real-time Data</span>
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
