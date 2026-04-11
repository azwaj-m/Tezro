import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import QuickActions from '../components/home/QuickActions';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#001a0f]">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-grow pt-20 pb-24 px-5 max-w-md mx-auto w-full space-y-10">
        <div className="relative group">
           <input 
             type="text" 
             placeholder="Search Secure Assets..." 
             className="w-full bg-[#002b1a] rounded-2xl py-4 px-6 border border-[#FFD700]/20 outline-none text-white text-sm focus:border-[#FFD700]/50 transition-all shadow-inner"
           />
           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFD700]/40">🔍</div>
        </div>

        <TezroVirtualCard />
        
        <div>
          <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[4px] mb-6 px-1">Command Center</h3>
          <QuickActions />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
