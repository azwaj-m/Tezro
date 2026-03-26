import React from 'react';
import SuperSearchBar from '../components/SuperSearchBar';
import QuickActions from '../components/home/QuickActions';
import WalletDashboard from '../components/Wallet/WalletDashboard';
import CategorySlider from '../components/Marketplace/CategorySlider';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  return (
    <div className="min-h-screen pb-28 px-5 pt-8 bg-[#001f0f] selection:bg-[#d4af37]">
      {/* Header: Clean & Balanced */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/60 font-bold">Welcome to</p>
          <h1 className="text-3xl font-black text-[#d4af37] tracking-tighter italic">TEZRO</h1>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-tr from-[#d4af37]/20 to-transparent flex items-center justify-center overflow-hidden shadow-inner">
            <span className="text-xl">👤</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#001f0f] rounded-full"></div>
        </div>
      </header>

      {/* 1. Search (Priority 1) */}
      <SuperSearchBar />

      {/* 2. Wallet & Finance (Priority 2 - Combined for Space) */}
      <section className="mb-10">
        <WalletDashboard />
      </section>

      {/* 3. Main Services Grid (Clear CTAs) */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-xl font-extrabold text-white tracking-tight">Main Services</h2>
          <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest border-b border-[#d4af37]/30 pb-1">Quick Access</span>
        </div>
        <QuickActions />
      </section>

      {/* 4. Map/Tracking (Compact Preview as suggested) */}
      <section className="mb-10 rounded-[2rem] overflow-hidden luxury-card h-40 relative group">
        <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center opacity-100 group-hover:bg-black/20 transition-all">
          <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-[#d4af37] text-[10px] font-bold tracking-[0.2em] uppercase">Tracking Active Ride</p>
        </div>
        <div className="w-full h-full bg-[#05110a] opacity-50 italic flex items-center justify-center text-xs text-white/20">Map Engine Initializing...</div>
      </section>

      {/* 5. Discovery Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white">Explore Universe</h3>
          <button className="text-[#d4af37] text-xs font-bold bg-[#d4af37]/10 px-3 py-1 rounded-full">View All</button>
        </div>
        <CategorySlider />
      </section>

      <BottomNav />
    </div>
  );
};
export default HomeScreen;
