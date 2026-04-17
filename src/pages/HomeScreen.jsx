import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { Search, Car, Utensils, CreditCard, ShoppingBag, Truck, UserPlus, Zap, Settings, ShieldCheck } from 'lucide-react';

const services = [
  { name: 'Ride', icon: Car }, { name: 'Food', icon: Utensils },
  { name: 'Pay', icon: CreditCard }, { name: 'Shop', icon: ShoppingBag },
  { name: 'Deliver', icon: Truck }, { name: 'Doctor', icon: UserPlus },
  { name: 'Pharmacy', icon: Zap }, { name: 'Services', icon: Settings }
];

const promoCards = [
  { id: 1, title: 'MARKETPLACE', subtitle: 'BOOK NOW', color: 'from-zinc-900 to-zinc-800' },
  { id: 2, title: 'FOOD & DINING', subtitle: 'ORDER NOW', color: 'from-zinc-900 to-black' }
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen p-4 pb-36 pt-20 persian-pattern">
      {/* سرچ بار */}
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search Banks & Services..." 
          className="w-full bg-zinc-900/60 border border-[#FFD700]/30 p-4 pl-12 rounded-full text-[#FFD700] placeholder-[#FFD700]/40 outline-none" 
        />
        <Search className="absolute left-4 top-4 text-[#FFD700]" size={20} />
      </div>

      {/* سروسز گریڈ */}
      <div className="card-dark mb-8 p-5">
        <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Services</span>
            <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-bold">
                <ShieldCheck size={12} className="animate-pulse" /> CYBER SECURE
            </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {services.map((s, index) => (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              key={index} 
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#FFD700] to-[#B8860B] aspect-square shadow-lg"
            >
              <s.icon className="text-black mb-1" size={22} strokeWidth={3} />
              <span className="text-black text-[9px] font-black uppercase leading-none">{s.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* میپ ٹریکنگ */}
      <div className="card-dark h-56 relative overflow-hidden mb-8">
        <div className="absolute top-3 left-3 z-[1000] bg-black/70 px-3 py-1.5 rounded-full flex items-center gap-2 border border-red-500/40">
           <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
           <span className="text-[9px] text-white font-black uppercase tracking-widest">Live Feed</span>
        </div>
        <MapContainer 
            center={[24.8607, 67.0011]} 
            zoom={13} 
            zoomControl={false}
            style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(90%)' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>

      {/* سوئپنگ کارڈز */}
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
        {promoCards.map((card) => (
          <div key={card.id} className={`min-w-[280px] h-44 rounded-[2.5rem] bg-gradient-to-br ${card.color} border border-[#FFD700]/20 p-8 flex flex-col justify-end shadow-2xl`}>
            <h4 className="text-white font-black text-lg tracking-[4px] leading-tight">{card.title}</h4>
            <span className="text-[#FFD700] text-[10px] font-bold tracking-widest uppercase mt-1">{card.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
