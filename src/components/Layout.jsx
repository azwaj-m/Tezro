import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* مین مواد جہاں اسکرینز نظر آئیں گی */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>

      {/* صرف ایک مرکزی فوٹر */}
      <div className="relative z-[2000]">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
