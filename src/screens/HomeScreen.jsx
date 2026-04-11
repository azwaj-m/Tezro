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
      
      {/* پیڈنگ ٹاپ اور باٹم ہیڈر فوٹر کی جگہ چھوڑنے کے لیے ضروری ہے */}
      <main className="pt-20 pb-20 px-4 space-y-8 max-w-md mx-auto">
        <TezroVirtualCard />
        <QuickActions />
        <div className="h-52 rounded-[2rem] overflow-hidden border border-[#FFD700]/20 shadow-xl bg-black/40">
          <RideMap />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
