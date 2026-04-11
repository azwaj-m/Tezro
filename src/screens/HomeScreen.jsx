import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import QuickActions from '../components/home/QuickActions';
import RideMap from '../components/RideMap';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#001a0f] text-white overflow-hidden flex flex-col">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-24">
        <TezroVirtualCard />
        <QuickActions />
        <div className="h-48 rounded-[2rem] border border-[#FFD700]/30 overflow-hidden shadow-xl bg-black/20">
          <RideMap />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
