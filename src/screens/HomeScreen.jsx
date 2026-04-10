import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001f0f] text-white font-sans overflow-x-hidden pb-32">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 🟢 پریمیم ہیڈر - لوگو اور سیکیورٹی بیج کے ساتھ */}
      <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-[#001f0f]/95 backdrop-blur-xl z-[1000]">
        <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] overflow-hidden">
                <img src="/assets/profile-placeholder.png" className="w-full h-full object-cover" />
             </div>
             <span className="text-[10px] text-[#d4af37] font-bold">Cyber Security ✅</span>
        </div>
        
        <div className="flex flex-col items-center">
          <img src="/assets/logo.png" alt="Tezro" className="h-9 mb-1 shadow-lg" />
          <span className="text-[9px] font-black tracking-[0.5em] text-[#d4af37]">TEZRO</span>
        </div>

        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <div className="space-y-1.5 flex flex-col items-end">
            <div className="w-7 h-0.5 bg-[#d4af37]"></div>
            <div className="w-5 h-0.5 bg-[#d4af37]"></div>
          </div>
        </button>
      </header>

      {/* 🔍 سپر سرچ بار (Direct from your SuperSearchBar.jsx concept) */}
      <div className="px-6 mb-6">
        <div className="relative group">
          <input type="text" placeholder="Search Search Bar" className="w-full bg-black/40 border border-[#d4af37]/30 rounded-full py-4 px-12 text-sm outline-none focus:border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]" />
          <span className="absolute left-5 top-4 text-[#d4af37]">🔍</span>
          <span className="absolute right-5 top-4 text-[#d4af37] animate-pulse">🎤</span>
        </div>
      </div>

      {/* 💳 ورچوئل کارڈ اور ٹرانزیکشن ویو (Side-by-side as in photo) */}
      <div className="px-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Card */}
        <div className="h-52 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[2rem] p-6 relative border border-[#d4af37]/40 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-4"><img src="/assets/logo.png" className="h-5 opacity-30 brightness-0 invert" /></div>
            <div className="mt-12 text-xl font-mono tracking-widest text-[#d4af37]">**** **** **** 4028</div>
            <div className="mt-8 flex justify-between items-end">
                <div><p className="text-[8px] opacity-50 uppercase">Balance</p><p className="text-xl font-bold">$ 5,358.00</p></div>
                <div className="flex -space-x-2"><div className="w-8 h-8 rounded-full bg-orange-600 opacity-80"></div><div className="w-8 h-8 rounded-full bg-yellow-500 opacity-80"></div></div>
            </div>
            {/* Geometric Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
        </div>
      </div>

      {/* 🗺️ میپ اور اس کے اوپر فلوٹنگ بٹنز (Map with floating UI) */}
      <div className="px-6 mb-8 relative">
        <div className="h-48 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/20 relative">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} className="h-full w-full grayscale brightness-[0.6]">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          
          {/* Floating UI Buttons over Map */}
          <div className="absolute right-4 top-4 space-y-2 z-[999]">
             <div className="bg-[#d4af37] p-2 rounded-xl shadow-lg cursor-pointer">📍</div>
             <div className="bg-green-600 p-2 rounded-xl shadow-lg cursor-pointer">🚗</div>
          </div>
        </div>
      </div>

      {/* 🚀 ایکسپلور یونیورس (Swipeable Cards) */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-end mb-4">
            <div>
                <h2 className="text-xl font-black text-[#d4af37] tracking-tighter">Explore Tezro Universe</h2>
                <p className="text-[10px] opacity-50">Category slider دوگی</p>
            </div>
            <span className="text-[10px] font-bold text-[#d4af37] border-b border-[#d4af37]">View All</span>
        </div>

        <div className="flex space-x-4 overflow-x-auto no-scrollbar py-2">
            {[
                { name: 'Marketplace', path: '/shop', icon: '🏪', file: 'TezroMarivetear.jsx' },
                { name: 'Food Menu', path: '/food', icon: '🍲', file: 'Food Menu' },
                { name: 'Ride Options', path: '/ride', icon: '🚗', file: 'Rider Options.jsx' }
            ].map((item, i) => (
                <div key={i} onClick={() => navigate(item.path)} className="min-w-[150px] h-60 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] p-1 border border-white/5 flex flex-col relative group cursor-pointer">
                    <div className="h-40 bg-white/5 rounded-[2.2rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div className="p-4 text-center">
                        <p className="text-[11px] font-black uppercase tracking-widest">{item.name}</p>
                        <p className="text-[8px] opacity-30 mt-1">{item.file}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
