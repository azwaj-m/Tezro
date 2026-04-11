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
    <div className="min-h-screen bg-[#001a0f] text-white relative">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-48 pb-32 px-5 space-y-10 overflow-y-auto no-scrollbar max-w-md mx-auto relative">
        <TezroVirtualCard />
        
        <div className="space-y-4">
          <h3 className="text-xl font-black shiny-gold uppercase tracking-tighter ml-2">Active Terminals</h3>
          <LiveMap />
        </div>

        <ExploreUniverse />
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
