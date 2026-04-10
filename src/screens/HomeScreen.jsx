import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SuperSearchBar from '../components/SuperSearchBar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001f0f] text-white font-sans overflow-x-hidden pb-10">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ہیڈر */}
      <header className="flex justify-between items-center px-6 py-5 sticky top-0 bg-[#001f0f]/90 backdrop-blur-md z-[1000] border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] p-0.5">
              <img src="/assets/profile-placeholder.png" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#001f0f] rounded-full"></div>
          </div>
          <span className="text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded-md border border-[#d4af37]/20 uppercase">
             Cyber Security ✅
          </span>
        </div>

        <div className="flex flex-col items-center">
          <img src="/assets/logo.png" className="h-8 drop-shadow-[0_0_8px_#d4af37]" />
          <span className="text-[9px] font-black tracking-[0.4em] text-[#d4af37] mt-1 uppercase">TEZRO</span>
        </div>

        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <div className="space-y-1.5 flex flex-col items-end">
            <div className="w-7 h-0.5 bg-[#d4af37]"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </div>
        </button>
      </header>

      <div className="px-6 mt-4"><SuperSearchBar /></div>
      <div className="px-6 mt-6"><TezroVirtualCard /></div>

      {/* میپ فلوٹنگ بٹنز - تصویر کے مطابق درست جگہ */}
      <div className="px-6 mt-8 relative">
        <div className="h-48 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/30 relative shadow-2xl">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} className="h-full w-full grayscale brightness-[0.7]">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          
          <div className="absolute right-6 top-6 space-y-3 z-[999]">
             <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg border border-white/20 cursor-pointer active:scale-90 transition-transform">
                <span className="text-lg">📍</span>
             </div>
             <div className="w-10 h-10 bg-[#00c853] rounded-xl flex items-center justify-center shadow-lg border border-white/20 cursor-pointer active:scale-90 transition-transform">
                <span className="text-lg">🚗</span>
             </div>
          </div>
        </div>
      </div>

      {/* ایکسپلور یونیورس */}
      <div className="px-6 mt-10 mb-20">
         <h2 className="text-xl font-black text-[#d4af37] uppercase tracking-tighter">Explore Tezro Universe</h2>
         <div className="flex space-x-5 overflow-x-auto no-scrollbar py-4">
            {['Marketplace', 'Food Menu', 'Ride Options'].map((item, i) => (
               <div key={i} className="min-w-[170px] h-60 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase">{item}</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
export default HomeScreen;
