import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { Search, Car, Utensils, CreditCard, ShoppingBag, Truck, UserPlus, Zap, Settings, ShieldCheck, Bell, Menu, Mic } from 'lucide-react';

const services = [
  { name: 'Ride', icon: Car }, { name: 'Food', icon: Utensils },
  { name: 'Pay', icon: CreditCard }, { name: 'Shop', icon: ShoppingBag },
  { name: 'Deliver', icon: Truck }, { name: 'Doctor', icon: UserPlus },
  { name: 'Pharmacy', icon: Zap }, { name: 'Services', icon: Settings }
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen pb-32 pt-2 bg-[#000d08] persian-pattern text-[#FFD700] overflow-x-hidden">
      {/* پریمیم ہیڈر (تصویر 3 کے مطابق) */}
      <div className="px-4 py-3 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-[2000] border-b border-[#FFD700]/10">
        <Menu size={24} className="text-[#FFD700]" />
        <div className="flex items-center gap-2">
            <div className="bg-[#FFD700]/10 px-2 py-1 rounded-full border border-[#FFD700]/20 flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-500 animate-pulse" />
                <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-300">Cyber Secure</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[#FFD700] overflow-hidden bg-zinc-900 shadow-inner">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Tezro" alt="avatar" className="w-full h-full object-cover" />
            </div>
        </div>
        <Bell size={24} className="text-[#FFD700]" />
      </div>

      {/* پریمیم سرچ بار (تصویر 3 کے مطابق) */}
      <div className="px-4 mt-5">
        <div className="relative group flex items-center">
          <Search className="absolute left-4 top-3 text-[#FFD700]/50 group-focus-within:text-[#FFD700]" size={18} />
          <input 
            type="text" 
            placeholder="Search Banks & Services..." 
            className="w-full bg-zinc-900/60 border border-[#FFD700]/20 p-3 pl-11 pr-11 rounded-xl text-[#FFD700] outline-none backdrop-blur-sm focus:border-[#FFD700]/60 transition-all text-sm" 
          />
          <Mic className="absolute right-4 top-3 text-[#FFD700]" size={18} />
        </div>
      </div>

      {/* گولڈن ڈیجیٹل کارڈ */}
      <div className="px-4 mt-6">
        <div className="w-full h-44 rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-[#FFD700]/30 p-6 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-black tracking-[4px] italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#B8860B]">TEZRO</h1>
            <div className="w-10 h-7 bg-gradient-to-r from-[#FFD700] to-[#B8860B] rounded-md shadow-inner"></div>
          </div>
          <div className="mt-8">
            <p className="text-[9px] opacity-40 uppercase tracking-[2px]">Encrypted Asset Vault</p>
            <p className="text-xl font-mono mt-1 tracking-[4px] text-zinc-100">**** **** **** 8890</p>
          </div>
        </div>
      </div>

      {/* سروسز گریڈ (4 Columns - تصویر 3 جیسا) */}
      <div className="px-4 mt-8">
        <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-[10px] font-black tracking-[3px] uppercase text-[#FFD700]/60">Top Services</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.button 
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#FFD700] to-[#B8860B] aspect-square shadow-[0_8px_20px_-5px_rgba(255,215,0,0.3)] transition-all"
            >
              <s.icon className="text-black mb-1.5" size={24} strokeWidth={2.5} />
              <span className="text-black text-[9px] font-black uppercase leading-none tracking-tighter">{s.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ڈارک لائیو میپ */}
      <div className="px-4 mt-8">
        <div className="h-48 rounded-[2rem] border border-[#FFD700]/10 overflow-hidden relative shadow-2xl bg-zinc-900">
          <div className="absolute top-3 left-3 z-[1000] bg-black/80 px-3 py-1 rounded-full flex items-center gap-2 border border-red-500/30">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
            <span className="text-[8px] text-white font-bold uppercase tracking-widest">Live Security Feed</span>
          </div>
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(90%) contrast(90%)' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
