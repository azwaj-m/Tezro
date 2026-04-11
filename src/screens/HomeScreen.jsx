import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import QuickActions from '../components/home/QuickActions';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#001a0f] relative overflow-hidden">
      {/* Fixed Navigation Layers */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Secure Area */}
      <main className="flex-1 w-full max-w-md mx-auto pt-24 pb-28 px-6 space-y-10 overflow-y-auto no-scrollbar">
        
        {/* Encrypted Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FFD700]/5 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <input 
            type="text" 
            placeholder="Search Secure Assets..." 
            className="relative w-full bg-[#002b1a] rounded-2xl py-4 px-6 border border-[#FFD700]/20 outline-none text-white text-sm focus:border-[#FFD700]/50 transition-all shadow-2xl placeholder:text-white/20"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#FFD700]/40">🔍</div>
        </div>

        {/* Premium Virtual Asset */}
        <section className="animate-in fade-in zoom-in duration-1000">
          <TezroVirtualCard />
        </section>
        
        {/* Command Center */}
        <section className="pb-4">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[5px] whitespace-nowrap">Command Center</h3>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#FFD700]/30 to-transparent"></div>
          </div>
          <QuickActions />
        </section>

      </main>

      {/* Fixed Bottom Layout */}
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
