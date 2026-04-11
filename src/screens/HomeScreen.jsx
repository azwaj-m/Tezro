import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import ExploreUniverse from '../components/home/ExploreUniverse';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001a0f] text-white selection:bg-[#FFD700] selection:text-black">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-48 pb-28 px-5 space-y-8 overflow-y-auto no-scrollbar max-w-md mx-auto">
        <TezroVirtualCard />
        
        {/* Real-time Map Shell */}
        <div className="relative w-full h-44 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/10 card-dark shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/31.5204,74.3587,12/400x200?access_token=YOUR_TOKEN')] bg-cover opacity-40 grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a0f] via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Secure Terminal Active</span>
          </div>
        </div>

        <ExploreUniverse />
      </main>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
