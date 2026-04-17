import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Bell, Menu, ShieldCheck, Car, Utensils, CreditCard, ShoppingBag, Truck, UserPlus, Zap, Settings } from 'lucide-react';

const services = [
  { name: 'Ride', icon: Car }, { name: 'Food', icon: Utensils },
  { name: 'Pay', icon: CreditCard }, { name: 'Shop', icon: ShoppingBag },
  { name: 'Deliver', icon: Truck }, { name: 'Doctor', icon: UserPlus },
  { name: 'Pharmacy', icon: Zap }, { name: 'Services', icon: Settings }
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen p-4 pb-32 pt-16 persian-pattern">
      {/* 1. پریمیم سرچ بار */}
      <div className="relative mb-6">
        <input type="text" placeholder="Search Banks & Services..." className="w-full bg-zinc-900/60 border border-tezro-gold/30 p-4 pl-12 rounded-full text-tezro-gold placeholder-tezro-gold/40 focus:ring-2 focus:ring-tezro-gold/50 outline-none" />
        <Search className="absolute left-4 top-4 text-tezro-gold" size={20} />
      </div>

      {/* 2. سروسز گریڈ (گولڈن شائنی کارڈز) */}
      <div className="card-dark mb-8">
        <div className="grid grid-cols-4 gap-3">
          {services.map((s) => (
            <button key={s.name} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#FFD700] to-[#B8860B] aspect-square shadow-[0_5px_15px_rgba(0,0,0,0.5)] active:scale-95">
              <s.icon className="text-black mb-1" size={24} strokeWidth={3} />
              <span className="text-black text-[9px] font-black uppercase tracking-tighter">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. لائیو لوکیشن ٹریکنگ (Leaflet Map) */}
      <div className="card-dark h-52 relative overflow-hidden mb-8 border-tezro-gold/20">
        <div className="absolute top-2 left-2 z-10 bg-black/60 px-3 py-1 rounded-full flex items-center gap-2 border border-red-500/50">
           <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
           <span className="text-[10px] text-white font-bold uppercase tracking-widest">Secure Live Feed</span>
        </div>
        <MapContainer center={[24.8607, 67.0011]} zoom={13} style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>

      {/* 4. پبلسٹی سوئپنگ کارڈز */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        <div className="min-w-[280px] h-44 rounded-[2.5rem] bg-gradient-to-r from-zinc-900 to-zinc-800 border border-tezro-gold/20 p-6 flex items-end">
           <p className="text-white font-black tracking-widest">MARKETPLACE <br/><span className="text-tezro-gold text-[10px]">BOOK NOW</span></p>
        </div>
        <div className="min-w-[280px] h-44 rounded-[2.5rem] bg-gradient-to-r from-zinc-900 to-zinc-800 border border-tezro-gold/20 p-6 flex items-end">
           <p className="text-white font-black tracking-widest">FOOD & DINING <br/><span className="text-tezro-gold text-[10px]">ORDER NOW</span></p>
        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
