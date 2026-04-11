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

      {/* سردی ختم کرنے کے لیے 'pt-20' اور 'pb-20' لازمی ہیں */}
      <main className="pt-20 pb-20 px-4 space-y-8 max-w-md mx-auto overflow-y-auto">
        <div className="bg-[#002b1a] rounded-2xl p-4 border border-[#FFD700]/30 shadow-lg">
           <input type="text" placeholder="Search..." className="w-full bg-transparent outline-none text-sm" />
        </div>
        <QuickActions />
        <TezroVirtualCard />
        <div className="h-56 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/20 shadow-2xl">
          <RideMap />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
