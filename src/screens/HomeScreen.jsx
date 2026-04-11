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
    <div className="min-h-screen bg-[#001a0f] text-white">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="px-4 py-6 pb-28 space-y-6 max-w-md mx-auto">
        <TezroVirtualCard />
        <QuickActions />
        <div className="rounded-[2.5rem] overflow-hidden border border-[#FFD700]/30 h-48 bg-black/40 shadow-2xl">
          <RideMap />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
