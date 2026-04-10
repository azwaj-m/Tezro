import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001f0f] text-white font-sans overflow-x-hidden pb-24">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-5 sticky top-0 bg-[#001f0f]/90 backdrop-blur-md z-[1000]">
        <div className="cursor-pointer text-xl" onClick={() => navigate('/notifications')}>🔔</div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.location.reload()}>
          <img src="/assets/logo.png" alt="Tezro Logo" className="h-8 mb-1" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37]">TEZRO</span>
        </div>
        <div className="cursor-pointer" onClick={() => setSidebarOpen(true)}>
          <div className="space-y-1.5">
            <div className="w-6 h-0.5 bg-[#d4af37]"></div>
            <div className="w-6 h-0.5 bg-[#d4af37]"></div>
            <div className="w-4 h-0.5 bg-[#d4af37]"></div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-6 mb-6">
        <div className="relative">
          <input type="text" placeholder="Search Services..." className="w-full bg-white/5 border border-[#d4af37]/30 rounded-full py-4 px-12 text-sm outline-none focus:border-[#d4af37]" />
          <span className="absolute left-5 top-4">🔍</span>
          <span className="absolute right-5 top-4 text-[#d4af37] cursor-pointer">🎤</span>
        </div>
      </div>

      {/* Virtual Card */}
      <div className="px-6 mb-8 flex space-x-4 overflow-x-auto no-scrollbar">
        <div className="min-w-[280px] h-44 bg-gradient-to-br from-[#d4af37] to-[#8b6508] rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <img src="/assets/logo.png" className="h-6 brightness-0 invert opacity-50" />
                <span className="text-[10px] font-black uppercase">Tezro Virtual</span>
            </div>
            <div className="text-xl font-mono tracking-widest">**** **** **** 4028</div>
            <div className="flex justify-between items-end">
                <div><p className="text-[8px] opacity-60">Balance</p><p className="text-lg font-bold">$ 5,358.00</p></div>
                <div className="flex -space-x-2"><div className="w-8 h-8 rounded-full bg-red-500/80"></div><div className="w-8 h-8 rounded-full bg-yellow-500/80"></div></div>
            </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="px-6 mb-8">
        <div className="h-52 rounded-[2.5rem] overflow-hidden border border-[#d4af37]/20 relative z-10">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[24.8607, 67.0011]} />
          </MapContainer>
        </div>
      </div>

      {/* Service Grid */}
      <div className="flex space-x-4 overflow-x-auto px-6 no-scrollbar">
        {[
          { name: 'Marketplace', icon: '🏪', path: '/shop' },
          { name: 'Food Menu', icon: '🍲', path: '/food' },
          { name: 'Ride Options', icon: '🚗', path: '/ride' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="min-w-[140px] h-48 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center p-4 cursor-pointer">
            <div className="text-4xl mb-4">{item.icon}</div>
            <p className="text-[10px] font-black uppercase">{item.name}</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
