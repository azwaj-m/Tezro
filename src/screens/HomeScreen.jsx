import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import Sidebar from '../components/Sidebar';
import SuperSearchBar from '../components/SuperSearchBar';
import QuickActions from '../components/home/QuickActions';
import WalletDashboard from '../components/Wallet/WalletDashboard';
import CategorySlider from '../components/Marketplace/CategorySlider';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen pb-28 px-5 pt-8 bg-[#001f0f] selection:bg-[#d4af37] overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 🛡️ Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/60 font-bold">Welcome to</p>
          <h1 className="text-3xl font-black text-[#d4af37] tracking-tighter italic">TEZRO</h1>
        </div>
        <div className="relative cursor-pointer" onClick={() => setSidebarOpen(true)}>
          <div className="w-12 h-12 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-tr from-[#d4af37]/20 to-transparent flex items-center justify-center overflow-hidden shadow-inner active:scale-95 transition-transform">
            <span className="text-xl">👤</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#001f0f] rounded-full shadow-[0_0_10px_#22c55e]"></div>
        </div>
      </header>

      {/* 🔍 1. Super Search Engine */}
      <div className="mb-8" onClick={() => navigate('/banking')}>
        <SuperSearchBar />
      </div>

      {/* 💳 2. Financial Core (Wallet) */}
      <section className="mb-10 active:scale-[0.98] transition-all cursor-pointer" onClick={() => navigate('/banking')}>
        <WalletDashboard />
      </section>

      {/* 🚀 3. Central Ecosystem (Quick Actions) */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-xl font-extrabold text-white tracking-tight">Main Services</h2>
          <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest border-b border-[#d4af37]/30 pb-1">Master Access</span>
        </div>
        <QuickActions />
      </section>

      {/* 📍 4. Intelligence Map (Leaflet Active) */}
      <section className="mb-10 group cursor-pointer" onClick={() => navigate('/ride')}>
         <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white tracking-tight">Live Tracking</h3>
          <span className="text-[10px] text-red-500 font-black animate-pulse uppercase tracking-widest">● Secure Map Active</span>
        </div>
        <div className="h-52 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; Tezro'
            />
          </MapContainer>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-5 left-6 z-[1000] bg-[#d4af37] text-[#001f0f] px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter">
            Initialize AI Route
          </div>
        </div>
      </section>

      {/* 🌌 5. Marketplace Discovery */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white tracking-tight">Explore Universe</h3>
          <button onClick={() => navigate('/shop')} className="text-[#d4af37] text-[10px] font-black bg-[#d4af37]/10 px-5 py-2 rounded-full border border-[#d4af37]/20 active:bg-[#d4af37]/30">VIEW ALL</button>
        </div>
        <CategorySlider />
      </section>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
