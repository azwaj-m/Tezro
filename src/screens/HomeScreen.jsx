import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Sidebar from '../components/Navigation/Sidebar';
import BottomNav from '../components/BottomNav';
import TezroVirtualCard from '../components/TezroVirtualCard';
import QuickActions from '../components/home/QuickActions';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#001a0f] text-white overflow-hidden">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 overflow-y-auto pt-20 pb-24 px-6 space-y-8 no-scrollbar">
        <TezroVirtualCard />
        <div className="py-2">
           <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-[4px] mb-6 border-b border-[#FFD700]/10 pb-2">Command Center</h3>
           <QuickActions />
        </div>
        {/* میپ یہاں سے مستقل طور پر حذف کر دیا گیا ہے */}
      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
