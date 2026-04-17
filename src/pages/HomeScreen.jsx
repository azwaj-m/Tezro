import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
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
    <div className="min-h-screen pb-20 persian-pattern overflow-x-hidden">
      {/* پریمیم ہیڈر */}
      <div className="p-4 flex justify-between items-center sticky top-0 bg-black/60 backdrop-blur-xl z-50">
        <Menu size={24} className="text-gold" />
        <div className="flex items-center gap-2">
            <div className="bg-gold/10 px-2 py-1 rounded-full border border-gold/20 flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[7px] font-bold uppercase tracking-widest text-white">Encrypted</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-gold overflow-hidden">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Tezro" alt="avatar" className="w-full h-full object-cover" />
            </div>
        </div>
        <Bell size={24} className="text-gold" />
      </div>

      {/* سرچ بار */}
      <div className="px-4 mt-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gold/40" size={18} />
          <input type="text" placeholder="Search Banks & Services..." className="w-full bg-zinc-900/60 border border-gold/20 p-3 pl-12 rounded-2xl text-gold outline-none focus:border-gold/50" />
          <Mic className="absolute right-4 top-3.5 text-gold" size={18} />
        </div>
      </div>

      {/* رائل کارڈ */}
      <div className="px-4 mt-6">
        <div className="w-full h-44 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-gold/30 p-8 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black italic tracking-[4px]">TEZRO</h2>
            <div className="w-12 h-8 bg-gradient-to-r from-gold to-[#B8860B] rounded-md"></div>
          </div>
          <div className="mt-8">
            <p className="text-[9px] opacity-40 uppercase tracking-[3px]">Secure Asset Vault</p>
            <p className="text-xl font-mono mt-1 tracking-[4px]">**** **** **** 8890</p>
          </div>
        </div>
      </div>

      {/* سنہری سروسز */}
      <div className="px-4 mt-8 grid grid-cols-4 gap-4">
        {services.map((s, i) => (
          <motion.div key={i} whileTap={{ scale: 0.9 }} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-gold to-[#B8860B] aspect-square shadow-lg">
            <s.icon className="text-black mb-1" size={22} strokeWidth={2.5} />
            <span className="text-black text-[8px] font-black uppercase">{s.name}</span>
          </motion.div>
        ))}
      </div>

      {/* لائیو میپ */}
      <div className="px-4 mt-8">
        <div className="h-48 rounded-[2rem] border border-gold/10 overflow-hidden relative">
          <MapContainer center={[24.8607, 67.0011]} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) contrast(90%)' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
