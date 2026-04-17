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
    <div className="min-h-screen pb-32 pt-2 bg-[#000d08] persian-pattern text-[#FFD700]">
      {/* 1. پریمیم ہیڈر - تصویر 3 کے مطابق */}
      <div className="px-4 py-3 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-[2000] border-b border-[#FFD700]/10">
        <Menu size={24} className="text-[#FFD700]" />
        <div className="flex items-center gap-2">
            <div className="bg-zinc-800/80 p-1.5 rounded-lg border border-[#FFD700]/20 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Cyber Secure</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#FFD700] overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tezro" alt="user" />
            </div>
        </div>
        <Bell size={24} className="text-[#FFD700]" />
      </div>

      {/* 2. اصلی سرچ بار (Search Banks & Services) */}
      <div className="px-4 mt-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-[#FFD700]/50" size={18} />
          <input 
            type="text" 
            placeholder="Search Banks & Services..." 
            className="w-full bg-zinc-900/60 border border-[#FFD700]/20 p-3.5 pl-12 pr-12 rounded-full text-[#FFD700] text-sm focus:border-[#FFD700]/60 outline-none" 
          />
          <Mic className="absolute right-4 text-[#FFD700]" size={18} />
        </div>
      </div>

      {/* 3. سنہری کارڈ (Credit Card Style) */}
      <div className="px-4 mt-6">
         <div className="w-full h-48 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-black border border-[#FFD700]/30 p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold tracking-[4px]">TEZRO</span>
                <div className="flex gap-1">
                    <div className="w-6 h-4 bg-[#FFD700]/20 rounded-sm"></div>
                    <div className="w-6 h-4 bg-[#FFD700]/60 rounded-sm"></div>
                </div>
            </div>
            <div className="mt-8">
                <div className="w-10 h-8 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-md mb-2 shadow-lg"></div>
                <p className="text-xl font-mono tracking-widest text-[#FFD700]/90">**** **** **** 8890</p>
            </div>
         </div>
      </div>

      {/* 4. سروسز گریڈ (گولڈن شائنی بٹنز) */}
      <div className="px-4 mt-8">
        <div className="grid grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.button 
              key={i}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#FFD700] via-[#FDE68A] to-[#B8860B] aspect-square shadow-[0_8px_15px_rgba(0,0,0,0.4)]"
            >
              <s.icon className="text-black mb-1.5" size={24} strokeWidth={2.5} />
              <span className="text-black text-[9px] font-black uppercase leading-none tracking-tighter">{s.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 5. لائیو ٹریکنگ میپ (The Missing Map) */}
      <div className="px-4 mt-8">
        <div className="h-52 rounded-[2rem] border border-[#FFD700]/10 overflow-hidden relative shadow-2xl">
            <div className="absolute top-3 left-3 z-[1000] bg-black/80 px-3 py-1.5 rounded-full flex items-center gap-2 border border-red-500/40">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
                <span className="text-[8px] text-white font-bold uppercase tracking-widest">Secure Live Feed</span>
            </div>
            <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', filter: 'invert(100%) brightness(90%)' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
