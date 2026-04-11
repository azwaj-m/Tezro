import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#001a0f]">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-4 space-y-6 overflow-y-auto no-scrollbar">
        
        {/* تصویر والا مین بینر */}
        <div className="w-full aspect-[16/9] gold-card-gradient rounded-3xl p-4 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold leading-tight">Integrated Services <br/> & Home Returns</h2>
            <button className="mt-4 bg-[#FFD700] text-black text-[10px] font-black px-4 py-2 rounded-lg">Shop Now</button>
          </div>
          <img src="https://via.placeholder.com/100" className="absolute right-4 bottom-4 w-24 opacity-50" alt="phone-ui" />
        </div>

        {/* Tezro Universe Header */}
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-sm font-bold text-[#FFD700]">Explore Tezro Universe</h3>
            <p className="text-[10px] text-white/40">Category slider</p>
          </div>
          <button className="text-[10px] text-[#FFD700] uppercase font-bold">View All</button>
        </div>

        {/* سروسز کے کارڈز کا نمونہ */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-[#002b1a] rounded-2xl border border-[#FFD700]/10 flex flex-col items-center justify-center p-2">
               <div className="w-10 h-10 bg-black/20 rounded-xl mb-2"></div>
               <span className="text-[8px] font-bold text-center">Service {i}</span>
            </div>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
