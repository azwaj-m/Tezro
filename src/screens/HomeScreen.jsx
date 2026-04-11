import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import BottomNav from '../components/BottomNav';
import TezroVirtualCard from '../components/TezroVirtualCard';

const HomeScreen = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 pt-36 pb-24 px-4 space-y-6 overflow-y-auto no-scrollbar">
      <TezroVirtualCard />
      
      {/* Map Section */}
      <div className="w-full h-48 rounded-3xl overflow-hidden border border-white/5 relative">
        <img src="https://via.placeholder.com/400x200/001a0f/22c55e?text=Map+View" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a0f] to-transparent"></div>
      </div>

      {/* Explore Section */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold">Explore Tezro Universe</h3>
          <span className="text-[10px] text-[#FFD700] uppercase font-bold">View All</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {['Marketplace', 'Food Menu', 'Ride Options'].map((item, i) => (
            <div key={i} className="min-w-[140px] aspect-square rounded-2xl glass-effect p-2 flex flex-col justify-end">
               <div className="h-20 bg-white/5 rounded-xl mb-2"></div>
               <span className="text-[10px] font-bold text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
    <BottomNav />
  </div>
);
export default HomeScreen;
