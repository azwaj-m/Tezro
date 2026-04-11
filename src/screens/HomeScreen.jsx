import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Navigation/Sidebar';

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#001a0f] text-white">
      {/* سکیورٹی لیئر 1: ہیڈر */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* سکیورٹی لیئر 2: مین کنٹینٹ (پیڈنگ شامل ہے تاکہ اوورلیپ نہ ہو) */}
      <main className="flex-grow pt-20 pb-20 px-4 max-w-md mx-auto w-full">
        <div className="space-y-6">
          <div className="p-6 bg-[#002b1a] rounded-[2rem] border border-[#FFD700]/10 shadow-lg">
            <h2 className="text-[#FFD700] text-sm font-black uppercase tracking-widest mb-2">Security Status</h2>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-green-500 to-[#FFD700] animate-pulse"></div>
            </div>
            <p className="text-[10px] text-white/40 mt-3 uppercase">All systems operational and encrypted.</p>
          </div>
          
          <div className="text-center py-10">
            <p className="text-white/20 text-xs italic">Awaiting Module Initialization...</p>
          </div>
        </div>
      </main>

      {/* سکیورٹی لیئر 3: فوٹر */}
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
