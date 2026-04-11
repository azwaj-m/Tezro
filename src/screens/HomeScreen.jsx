import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import TezroVirtualCard from '../components/TezroVirtualCard';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001a0f] text-white relative">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Content Area - Fixed Padding for Security Shell */}
      <main className="pt-48 pb-24 px-4 space-y-8 overflow-y-auto no-scrollbar max-w-md mx-auto relative z-10">
        <TezroVirtualCard />
        
        {/* Active Terminal Map (Placeholder, like image 6) */}
        <div className="w-full h-44 rounded-[2.5rem] overflow-hidden border border-white/5 grayscale-[0.6] opacity-50 shadow-inner card-dark">
          <img src="https://via.placeholder.com/600x400/121212/22c55e?text=Tezro+Secure+Map" className="w-full h-full object-cover" />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
