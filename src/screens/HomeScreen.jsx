import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-[#001a0f]">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <main className="flex-1 pt-24 px-6 text-center">
        <div className="p-10 border border-[#FFD700]/20 rounded-[2rem] bg-[#002b1a]">
          <h2 className="text-[#FFD700] font-black uppercase tracking-widest">System Reset Complete</h2>
          <p className="text-white/40 text-xs mt-2 font-mono">Clean Architecture Active</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
export default HomeScreen;
