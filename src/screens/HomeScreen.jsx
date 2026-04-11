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
    <div className="flex flex-col min-h-screen bg-[#001a0f]">
      {/* ہیڈر */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* مرکزی حصہ جو فوٹر کو نیچے دھکیلے گا */}
      <main className="flex-grow pt-20 pb-24 px-4 max-w-md mx-auto w-full space-y-8 overflow-y-auto">
        <div className="bg-[#002b1a] rounded-2xl p-4 border border-[#FFD700]/30 shadow-lg">
           <input type="text" placeholder="Search..." className="w-full bg-transparent outline-none text-sm text-white" />
        </div>
        
        <QuickActions />
        <TezroVirtualCard />
        
        <div className="h-64 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/30 shadow-2xl relative">
          <RideMap />
        </div>
      </main>

      {/* فوٹر جو اب اسکرین کے نیچے ہی رہے گا */}
      <div className="fixed bottom-0 left-0 right-0 z-[50]">
        <BottomNav />
      </div>
    </div>
  );
};
export default HomeScreen;
