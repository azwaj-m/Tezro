import React from 'react';
import SuperSearchBar from '../components/SuperSearchBar';
import QuickActions from '../components/home/QuickActions';
import WalletDashboard from '../components/Wallet/WalletDashboard';
import TezroVirtualCard from '../components/TezroVirtualCard';
import LiveTracking from '../components/LiveTracking';
import CategorySlider from '../components/Marketplace/CategorySlider';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => (
  <div className="min-h-screen pb-24 px-4 pt-6 bg-[#002d15]">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-black text-[#d4af37] italic tracking-tighter">TEZRO</h1>
      <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] bg-yellow-600/20"></div>
    </div>
    <SuperSearchBar />
    <QuickActions />
    <div className="mt-6 grid grid-cols-1 gap-2">
      <TezroVirtualCard />
      <WalletDashboard />
    </div>
    <div className="mt-6 rounded-3xl overflow-hidden border border-[#d4af37]/20 h-56 relative shadow-inner bg-black/40">
      <LiveTracking />
    </div>
    <div className="mt-8 flex justify-between items-center px-1">
      <h2 className="text-lg font-bold text-[#d4af37]">Explore Tezro Universe</h2>
      <span className="text-[#d4af37]/60 text-xs uppercase font-bold tracking-tighter cursor-pointer">View All</span>
    </div>
    <CategorySlider />
    <BottomNav />
  </div>
);
export default HomeScreen;
