import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Sidebar from '../components/Navigation/Sidebar';
import BottomNav from '../components/BottomNav';
import TezroVirtualCard from '../components/TezroVirtualCard';
import QuickActions from '../components/home/QuickActions';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#001a0f] text-white">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 pt-20 pb-24 px-6 overflow-y-auto w-full max-w-md mx-auto space-y-8 no-scrollbar">
        <TezroVirtualCard />
        <div className="py-2">
           <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[4px] mb-6">Command Center</h3>
           <QuickActions />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
