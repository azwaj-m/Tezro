import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Shield, Zap, Navigation, Coffee, Package, CreditCard, ChevronRight } from 'lucide-react';

// میپ آئیکن فکس
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => { map.invalidateSize(); }, 500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const [balance] = useState("1,250,500");

  const services = [
    { name: 'Ride', icon: <Navigation size={22} />, path: '/ride', color: '#D4AF37' },
    { name: 'Food', icon: <Coffee size={22} />, path: '/food', color: '#FF4500' },
    { name: 'Shop', icon: <Zap size={22} />, path: '/shop', color: '#39FF14' },
    { name: 'Parcel', icon: <Package size={22} />, path: '/parcel', color: '#00BFFF' },
    { name: 'Vault', icon: <CreditCard size={22} />, path: '/banking', color: '#D4AF37' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32 font-sans selection:bg-[#D4AF37]/30">
      
      {/* 1. PREMIUM HEADER */}
      <header className="p-6 pt-14 bg-black/80 backdrop-blur-xl border-b border-white/5 flex justify-between items-center sticky top-0 z-[2000]">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse shadow-[0_0_10px_#39FF14]"></div>
             <h2 className="text-[#D4AF37] font-black tracking-[4px] text-[10px] uppercase opacity-80">Tezro Core</h2>
          </div>
          <div className="flex items-baseline gap-1">
             <span className="text-gray-500 text-xs font-bold">PKR</span>
             <h1 className="text-2xl font-black tracking-tight">{balance}</h1>
          </div>
        </div>
        <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
           <Shield size={20} className="text-[#D4AF37]" />
        </div>
      </header>

      {/* 2. INTERACTIVE MAP CARD */}
      <div className="px-5 mt-6">
        <div className="group relative h-[240px] rounded-[35px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#D4AF37]/40">
          <MapContainer center={[31.4504, 73.1350]} zoom={14} style={{height: '100%', width: '100%', filter: 'grayscale(1) invert(1) opacity(0.6)'}} zoomControl={false}>
            <MapResizer />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          
          {/* Search Bar Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-6 left-0 right-0 px-6 z-[1000]">
             <div className="bg-black/60 backdrop-blur-md p-2 rounded-[22px] border border-white/10 flex items-center shadow-2xl group-focus-within:border-[#D4AF37]/50 transition-all">
                <div className="p-2 text-[#D4AF37]"><Navigation size={18} /></div>
                <input type="text" placeholder="Search destination..." className="bg-transparent flex-1 px-2 outline-none text-xs font-medium text-white placeholder:text-gray-600" />
                <button className="bg-[#D4AF37] text-black px-5 py-2.5 rounded-[16px] font-black text-[10px] uppercase tracking-wider hover:scale-95 transition-transform active:bg-white">Route</button>
             </div>
          </div>
        </div>
      </div>

      {/* 3. LUXURY SERVICES GRID */}
      <div className="grid grid-cols-5 gap-3 px-5 mt-8">
        {services.map((s, i) => (
          <div key={i} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-[#111] rounded-[22px] border border-white/5 flex items-center justify-center text-white transition-all active:scale-90 hover:border-[#D4AF37]/30 hover:bg-[#1a1a1a] shadow-lg">
              {s.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-[1px] text-gray-500">{s.name}</span>
          </div>
        ))}
      </div>

      {/* 4. PROMO ACTION CARD */}
      <div className="px-5 mt-10">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black p-8 rounded-[40px] border border-white/5 flex justify-between items-center group cursor-pointer active:scale-95 transition-all">
            {/* Background Glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/10 blur-[50px] rounded-full"></div>
            
            <div className="relative z-10">
                <h3 className="text-white font-black text-xl mb-1 flex items-center gap-2">
                  Priority Ride <Zap size={18} className="text-[#D4AF37]" />
                </h3>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Get a driver in 2 mins</p>
            </div>
            <div className="relative z-10 bg-[#D4AF37] text-black p-3 rounded-full shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
               <ChevronRight size={20} />
            </div>
        </div>
      </div>

      {/* 5. BOTTOM STATUS BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-[3000]">
         <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[30px] flex justify-around items-center shadow-2xl">
            <div className="text-[#D4AF37]"><Navigation size={22} /></div>
            <div className="text-gray-600 opacity-50"><Package size={22} /></div>
            <div className="text-gray-600 opacity-50"><CreditCard size={22} /></div>
            <div className="text-gray-600 opacity-50"><Shield size={22} /></div>
         </div>
      </div>

    </div>
  );
};

export default HomeScreen;
