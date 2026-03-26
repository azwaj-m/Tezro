import React from 'react';
import SuperSearchBar from '../components/SuperSearchBar';
import QuickActions from '../components/home/QuickActions';
import WalletDashboard from '../components/Wallet/WalletDashboard';
import TezroVirtualCard from '../components/TezroVirtualCard';
import LiveTracking from '../components/LiveTracking';
import CategorySlider from '../components/Marketplace/CategorySlider';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-[#002d15] text-white pb-28 font-sans">
      {/* Header */}
      <div className="px-4 pt-6 flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
           <span className="text-2xl font-black text-[#d4af37] tracking-tighter italic">Tezro</span>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] bg-yellow-700/30 overflow-hidden">
          <img src="/assets/logo.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 mb-6">
        <SuperSearchBar />
        <div className="mt-3 flex items-center gap-1">
          <span className="text-[10px] text-[#00ff88] bg-[#004d25] px-2 py-0.5 rounded-full border border-[#00ff88]/30">
            Cyber Security Verified 🛡️
          </span>
        </div>
      </div>

      {/* 4 Main Buttons */}
      <div className="px-4 mb-8">
        <QuickActions />
      </div>

      {/* Virtual Card & Wallet */}
      <div className="px-4 mb-8 space-y-4">
        <TezroVirtualCard />
        <WalletDashboard />
      </div>

      {/* Live Map Tracking */}
      <div className="px-4 mb-8 text-center">
        <div className="rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-2xl h-48 relative bg-black/20">
          <LiveTracking />
        </div>
      </div>

      {/* Explore Section */}
      <div className="mb-6">
        <div className="px-4 flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-[#d4af37] leading-tight">Explore Tezro Universe</h2>
          <span className="text-[#d4af37] text-xs font-semibold">View All</span>
        </div>
        <CategorySlider />
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
