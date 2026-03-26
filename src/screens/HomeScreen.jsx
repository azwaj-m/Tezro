import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';

// آپ کے فائل سٹرکچر کے مطابق امپورٹس
import SuperSearchBar from '../components/SuperSearchBar';
import QuickActions from '../components/home/QuickActions';
import WalletDashboard from '../components/Wallet/WalletDashboard';
import CategorySlider from '../components/Marketplace/CategorySlider';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-28 px-5 pt-8 bg-[#001f0f] selection:bg-[#d4af37]">
      
      {/* 🛡️ Header: Premium UI */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/60 font-bold">Welcome to</p>
          <h1 className="text-3xl font-black text-[#d4af37] tracking-tighter italic">TEZRO</h1>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-tr from-[#d4af37]/20 to-transparent flex items-center justify-center overflow-hidden shadow-inner active:scale-95 transition-transform">
            <span className="text-xl">👤</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#001f0f] rounded-full shadow-[0_0_10px_#22c55e]"></div>
        </div>
      </header>

      {/* 🔍 1. Search Bar */}
      <div className="mb-8">
        <SuperSearchBar />
      </div>

      {/* 💳 2. Wallet Section */}
      <section className="mb-10">
        <WalletDashboard />
      </section>

      {/* 🚀 3. Main Services (Quick Actions) */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-xl font-extrabold text-white tracking-tight">Main Services</h2>
          <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest border-b border-[#d4af37]/30 pb-1">Quick Access</span>
        </div>
        <QuickActions />
      </section>

      {/* 📍 4. Live Tracking Map (Screenshot Style) */}
      <section className="mb-10">
         <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Active Tracking</h3>
          <span className="text-[10px] text-red-500 font-black animate-pulse">● LIVE SECURE</span>
        </div>
        <div className="h-48 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/20 shadow-2xl relative group">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; Tezro'
            />
          </MapContainer>
          
          {/* Map Overlay */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-all"></div>
          
          <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 backdrop-blur-md border border-[#d4af37]/40 px-4 py-2 rounded-2xl">
            <p className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.2em]">Map Engine Initialized</p>
          </div>
        </div>
      </section>

      {/* 🌌 5. Discovery Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white tracking-tight">Explore Universe</h3>
          <button className="text-[#d4af37] text-[10px] font-black bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20">VIEW ALL</button>
        </div>
        <CategorySlider />
      </section>

      {/* 📱 Navigation */}
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
