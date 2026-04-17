import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { 
  Search, Car, Utensils, CreditCard, ShoppingBag, 
  Truck, UserPlus, Zap, Settings, ShieldCheck, Bell, Menu 
} from 'lucide-react';

const services = [
  { name: 'Ride', icon: Car }, { name: 'Food', icon: Utensils },
  { name: 'Pay', icon: CreditCard }, { name: 'Shop', icon: ShoppingBag },
  { name: 'Deliver', icon: Truck }, { name: 'Doctor', icon: UserPlus },
  { name: 'Pharmacy', icon: Zap }, { name: 'Services', icon: Settings }
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen pb-36 pt-4 persian-pattern overflow-x-hidden">
      {/* ہیڈر اور پریمیم سرچ بار */}
      <div className="px-4 space-y-4 mb-6">
        <div className="flex justify-between items-center">
            <Menu className="text-[#FFD700] cursor-pointer" size={28} />
            <div className="flex items-center gap-3">
                <div className="bg-zinc-900/80 p-2 rounded-full border border-[#FFD700]/20 relative">
                    <Bell className="text-[#FFD700]" size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#FFD700] overflow-hidden bg-zinc-800">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Tezro" alt="profile" />
                </div>
            </div>
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search Banks & Services..." 
            className="w-full bg-zinc-900/40 border border-[#FFD700]/20 p-4 pl-12 rounded-2xl text-[#FFD700] placeholder-[#FFD700]/30 outline-none focus:border-[#FFD700]/60 transition-all backdrop-blur-md" 
          />
          <Search className="absolute left-4 top-4 text-[#FFD700]/50 group-focus-within:text-[#FFD700]" size={20} />
        </div>
      </div>

      {/* سروسز گریڈ - تصویر 4 کی طرح چمکدار */}
      <div className="px-4 mb-8">
        <div className="card-dark p-5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-[10px] font-black tracking-[3px] uppercase text-[#FFD700]/60">Top Services</h2>
                <div className="flex items-center gap-1 text-emerald-500 text-[8px] font-bold px-2 py-1 bg-emerald-500/5 rounded-full border border-emerald-500/20">
                    <ShieldCheck size={10} className="animate-pulse" /> END-TO-END ENCRYPTED
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
            {services.map((s, i) => (
                <motion.button 
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#FF9D00] via-[#FFD700] to-[#B8860B] aspect-square shadow-[0_8px_15px_-5px_rgba(255,215,0,0.3)] transition-all"
                >
                <s.icon className="text-black mb-1" size={22} strokeWidth={2.5} />
                <span className="text-black text-[8px] font-black uppercase tracking-tighter">{s.name}</span>
                </motion.button>
            ))}
            </div>
        </div>
      </div>

      {/* ڈارک لائیو میپ */}
      <div className="px-4 mb-8">
        <div className="card-dark h-52 relative overflow-hidden border-[#FFD700]/5">
            <div className="absolute top-3 left-3 z-[1000] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-red-500/30">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
                <span className="text-[8px] text-zinc-100 font-bold uppercase tracking-[2px]">Live Security Feed</span>
            </div>
            <MapContainer 
                center={[24.8607, 67.0011]} 
                zoom={13} 
                zoomControl={false}
                style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%)' }}
            >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[24.8607, 67.0011]} />
            </MapContainer>
        </div>
      </div>

      {/* سوئپنگ کارڈز - Scrollbar چھپا ہوا */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-10 scrollbar-hide">
        {[
            { title: 'MARKETPLACE', sub: 'EXCLUSIVE DEALS', icon: ShoppingBag, color: 'from-[#000d08] to-zinc-900' },
            { title: 'FINANCE VUE', sub: 'SECURE PAYMENTS', icon: CreditCard, color: 'from-[#000d08] to-zinc-900' }
        ].map((card, i) => (
          <div key={i} className={`min-w-[260px] h-40 rounded-[2rem] bg-gradient-to-br ${card.color} border border-[#FFD700]/10 p-6 flex flex-col justify-end relative shadow-2xl overflow-hidden`}>
            <card.icon className="absolute -top-6 -right-6 text-[#FFD700]/5" size={140} />
            <h4 className="text-white font-black text-lg tracking-[3px] leading-tight">{card.title}</h4>
            <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-4 bg-[#FFD700]"></div>
                <span className="text-[#FFD700] text-[9px] font-bold tracking-widest">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
