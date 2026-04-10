import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// آپ کے اسٹرکچر سے کنکشنز
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import SuperSearchBar from '../components/SuperSearchBar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001f0f] text-white font-sans overflow-x-hidden pb-32 selection:bg-[#d4af37]/30">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 🟢 پریمیم ہیڈر (لوگو اور پروفائل) */}
      <header className="flex justify-between items-center px-6 py-5 sticky top-0 bg-[#001f0f]/90 backdrop-blur-md z-[1000] border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] p-0.5">
              <img src="/assets/profile-placeholder.png" className="w-full h-full rounded-full object-cover" alt="User" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#001f0f] rounded-full"></div>
          </div>
          <span className="text-[10px] font-bold text-[#d4af37] tracking-wider uppercase bg-[#d4af37]/10 px-2 py-1 rounded-md border border-[#d4af37]/20">
             Cyber Security ✅
          </span>
        </div>

        <div className="flex flex-col items-center">
          <img src="/assets/logo.png" className="h-8 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" alt="Tezro" />
          <span className="text-[9px] font-black tracking-[0.4em] text-[#d4af37] mt-1">TEZRO</span>
        </div>

        <button onClick={() => setSidebarOpen(true)} className="p-2 active:scale-90 transition-transform">
          <div className="space-y-1.5 flex flex-col items-end">
            <div className="w-7 h-0.5 bg-gradient-to-r from-[#d4af37] to-white"></div>
            <div className="w-5 h-0.5 bg-gradient-to-r from-[#d4af37] to-white"></div>
          </div>
        </button>
      </header>

      {/* 🔍 سپر سرچ بار کنکشن */}
      <div className="px-6 mt-4">
        <SuperSearchBar />
      </div>

      {/* 💳 ورچوئل کارڈ سیکشن (TezroVirtualCard.jsx کا استعمال) */}
      <div className="px-6 mt-6">
        <TezroVirtualCard />
      </div>

      {/* 🗺️ لیف لیٹ میپ اور فلوٹنگ بٹنز (تصویر کے مطابق) */}
      <div className="px-6 mt-8 relative group">
        <div className="h-48 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/30 shadow-2xl relative">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} className="h-full w-full grayscale invert-[0.1] brightness-[0.7]">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          
          {/* 📍 میپ فلوٹنگ بٹنز - بالکل تصویر والی پوزیشن */}
          <div className="absolute right-6 top-6 space-y-3 z-[999]">
             <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all border border-white/20">
                <span className="text-lg">📍</span>
             </div>
             <div className="w-10 h-10 bg-[#00c853] rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all border border-white/20">
                <span className="text-lg">🚗</span>
             </div>
          </div>
          <div className="absolute left-6 bottom-6 z-[999]">
             <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold">Live Tracking Active</div>
          </div>
        </div>
      </div>

      {/* 🚀 ایکسپلور یونیورس (بڑے بٹنز اور ایکٹیو لنکس) */}
      <div className="px-6 mt-10 mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-black text-[#d4af37] tracking-tighter uppercase">Explore Tezro Universe</h2>
          <p className="text-[10px] opacity-40 font-bold tracking-widest">Category slider دوگی</p>
        </div>
        <button onClick={() => navigate('/marketplace')} className="text-[10px] font-black text-[#d4af37] uppercase border-b-2 border-[#d4af37] pb-0.5">View All</button>
      </div>

      <div className="flex space-x-5 overflow-x-auto px-6 no-scrollbar pb-10">
        {[
          { name: 'Marketplace', path: '/shop', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400', file: 'TezroMarivetear.jsx' },
          { name: 'Food Menu', path: '/food', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', file: 'Food Menu دوگی' },
          { name: 'Ride Options', path: '/ride', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', file: 'Rider Options.jsx' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="min-w-[170px] h-64 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent border border-white/5 overflow-hidden relative group cursor-pointer active:scale-95 transition-all shadow-xl">
            <img src={item.img} className="w-full h-2/3 object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001f0f] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center px-2">
              <p className="text-[11px] font-black uppercase tracking-widest leading-none">{item.name}</p>
              <p className="text-[8px] opacity-30 mt-2 font-mono">{item.file}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
