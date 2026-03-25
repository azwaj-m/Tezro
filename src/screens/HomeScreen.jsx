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
    <div className="min-h-screen bg-[#002d15] text-white pb-24 font-sans overflow-x-hidden">
      {/* Top Header & Search Section */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <span className="text-2xl font-bold text-[#d4af37]">Tezro</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-[#d4af37] overflow-hidden">
            <img src="/assets/profile-placeholder.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <SuperSearchBar />
        
        <div className="flex items-center gap-2 mt-4 text-xs text-[#00ff88]">
          <span className="bg-[#004d25] px-2 py-1 rounded-full border border-[#00ff88]">Cyber Security Verified 🛡️</span>
        </div>
      </div>

      {/* Main Services Grid (Food, Ride, Shop, Services) */}
      <div className="px-4 mt-6">
        <QuickActions />
      </div>

      {/* Wallet & Card Section */}
      <div className="px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TezroVirtualCard />
        <WalletDashboard />
      </div>

      {/* Live Map / Tracking Section */}
      <div className="px-4 mt-8">
        <div className="rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-lg shadow-black/50">
          <LiveTracking />
        </div>
      </div>

      {/* Tezro Universe / Category Slider */}
      <div className="mt-8">
        <div className="px-4 flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#d4af37]">Explore Tezro Universe</h2>
            <p className="text-xs text-gray-400">تیزرو کائنات دریافت کریں</p>
          </div>
          <button className="text-[#d4af37] text-sm font-semibold">View All</button>
        </div>
        <CategorySlider />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
