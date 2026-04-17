import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Car, Utensils, CreditCard, ShoppingBag, Truck, UserPlus, Zap, Settings, ShieldCheck, Bell, Menu, Mic, X, Map as MapIcon, Plane } from 'lucide-react';
import Sidebar from '../components/Navigation/Sidebar';

const services = [
  { name: 'Ride', icon: Car, path: '/ride' },
  { name: 'Food', icon: Utensils, path: '/food' },
  { name: 'Finance', icon: CreditCard, path: '/finance' },
  { name: 'Mall', icon: ShoppingBag, path: '/mall' },
  { name: 'Deliver', icon: Truck, path: '/delivery' },
  { name: 'Health', icon: UserPlus, path: '/health' },
  { name: 'Bills', icon: Zap, path: '/bills' },
  { name: 'Hotel', icon: Plane, path: '/hotel' }
];

const promoCards = [
  { title: "MARKETPLACE", desc: "Book Now", color: "from-blue-600 to-indigo-900", path: '/mall' },
  { title: "FOOD & DINING", desc: "50% OFF", color: "from-orange-500 to-red-800", path: '/food' },
  { title: "SECURE VAULT", desc: "Manage Assets", color: "from-zinc-700 to-black", path: '/vault' }
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen pb-32 bg-[#000d08] text-gold overflow-x-hidden font-sans">
      
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/80 z-[3000]" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 20 }} className="fixed top-0 left-0 h-full w-80 bg-zinc-900 z-[3001] shadow-2xl">
                <div className="p-6 bg-shiny-green flex justify-between items-center">
                    <h2 className="text-white font-black italic">TEZRO MENU</h2>
                    <X onClick={() => setSidebarOpen(false)} className="text-white" />
                </div>
                <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Shiny Green Header */}
      <div className="px-4 py-4 flex justify-between items-center sticky top-0 z-[2000] shiny-header-footer">
        <Menu size={26} className="text-white" onClick={() => setSidebarOpen(true)} />
        <div className="flex flex-col items-center">
             <div className="flex items-center gap-1 bg-black/30 px-3 py-0.5 rounded-full border border-white/20">
                <ShieldCheck size={12} className="text-green-400 animate-pulse" />
                <span className="text-[8px] font-bold uppercase tracking-[2px] text-white">Cyber Secure</span>
             </div>
             <h1 className="text-xl font-black italic tracking-tighter text-white">TEZRO</h1>
        </div>
        <Bell size={26} className="text-white" onClick={() => navigate('/notifications')} />
      </div>

      {/* Search Bar - Active */}
      <div className="px-4 mt-6">
        <div className="relative">
          <input type="text" placeholder="Search Banks & Services..." className="w-full bg-zinc-900/50 border-2 border-shiny-green/30 p-4 pl-12 rounded-2xl text-white outline-none focus:border-shiny-green transition-all" />
          <Search className="absolute left-4 top-4 text-shiny-green" size={20} />
          <Mic className="absolute right-4 top-4 text-shiny-green" size={20} />
        </div>
      </div>

      {/* Swipeable Promo Cards */}
      <div className="mt-8 flex gap-4 overflow-x-auto px-4 no-scrollbar pb-4">
        {promoCards.map((card, i) => (
          <motion.div key={i} onClick={() => navigate(card.path)} className={`min-w-[85%] h-44 rounded-[2.5rem] p-6 bg-gradient-to-br ${card.color} border border-white/10 flex flex-col justify-between shadow-2xl`}>
             <h2 className="text-2xl font-black italic text-white tracking-tighter">{card.title}</h2>
             <button className="bg-gold text-black text-[10px] font-bold px-4 py-2 rounded-full w-fit uppercase">{card.desc}</button>
          </motion.div>
        ))}
      </div>

      {/* Interactive Map Section */}
      <div className="px-4 mt-4">
        <div className="relative h-60 rounded-[2.5rem] border-4 border-shiny-green/20 overflow-hidden group shadow-[0_0_30px_rgba(0,255,136,0.1)]">
          <MapContainer center={[24.8607, 67.0011]} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </MapContainer>
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <MapIcon size={14} className="text-shiny-green" /> Live Terrain View
            </span>
            <button onClick={() => navigate('/ride')} className="bg-shiny-green text-black font-black text-[10px] px-3 py-1 rounded-lg">TRACK</button>
          </div>
        </div>
      </div>

      {/* Services Grid - Fully Active */}
      <div className="px-4 mt-8">
        <p className="text-[10px] font-bold uppercase tracking-[3px] opacity-60 mb-4 px-2">Top Services</p>
        <div className="grid grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center shadow-[0_10px_15px_rgba(255,215,0,0.2)] border border-white/20">
                <s.icon className="text-black" size={24} strokeWidth={2.5} />
              </div>
              <span className="text-white text-[9px] font-bold uppercase tracking-tighter">{s.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
