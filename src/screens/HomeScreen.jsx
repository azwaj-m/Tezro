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
    <div className="min-h-screen bg-[#001a0f] text-white flex flex-col">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* pt-20 ہیڈر کے لیے جگہ چھوڑے گا تاکہ سرچ بار نظر آئے */}
      <main className="flex-1 pt-20 pb-24 px-4 space-y-8 max-w-md mx-auto w-full overflow-x-hidden">
        
        {/* سرچ انجن / بار */}
        <div className="bg-[#002b1a] rounded-2xl p-4 border border-[#FFD700]/30 shadow-lg flex items-center gap-3">
           <span className="text-[#FFD700] opacity-70">🔍</span>
           <input type="text" placeholder="Search Food, Rides, Services..." className="bg-transparent flex-1 text-sm outline-none text-white placeholder:text-white/30" />
           <span className="text-[#FFD700]">🎤</span>
        </div>

        <QuickActions />
        <TezroVirtualCard />
        
        <div className="h-56 rounded-[2.5rem] overflow-hidden border border-[#FFD700]/20 shadow-2xl relative">
          <RideMap />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
