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
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-20 pb-24 px-4 space-y-8 max-w-md mx-auto">
        <div className="bg-[#002b1a] rounded-[2rem] p-4 border border-[#FFD700]/20">
           <input type="text" placeholder="Search Food..." className="w-full bg-transparent text-white placeholder-white/50 outline-none text-sm" />
        </div>
        <QuickActions />
        <TezroVirtualCard />
        <div className="h-52 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/30 shadow-2xl relative bg-black/40">
          <RideMap />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
