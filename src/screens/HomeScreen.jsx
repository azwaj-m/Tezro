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
    <div className="relative min-h-screen bg-[#001a0f] text-white flex flex-col overflow-x-hidden">
      {/* ہیڈر ہمیشہ سب سے اوپر */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* مرکزی حصہ: pt-16 (ہیڈر کے لیے) اور pb-20 (فوٹر کے لیے) */}
      <main className="flex-1 pt-20 pb-24 px-4 w-full max-w-md mx-auto space-y-8 z-10">
        <div className="bg-[#002b1a] rounded-2xl p-4 border border-[#FFD700]/30 shadow-lg flex items-center">
           <input type="text" placeholder="Search Tezro Universe..." className="w-full bg-transparent outline-none text-sm placeholder:text-white/30" />
           <span className="text-[#FFD700]">🔍</span>
        </div>
        
        <QuickActions />
        <TezroVirtualCard />
        
        <div className="h-64 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/30 shadow-2xl bg-black/20">
          <RideMap />
        </div>
      </main>

      {/* فوٹر ہمیشہ سب سے نیچے */}
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
