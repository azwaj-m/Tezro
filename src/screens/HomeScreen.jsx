import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
    { name: 'Ride', icon: '📍', path: '/ride' },
    { name: 'Food', icon: '🍔', path: '/food' },
    { name: 'Shop', icon: '🛒', path: '/shop' },
    { name: 'Parcel', icon: '📦', path: '/parcel' },
    { name: 'Vault', icon: '💳', path: '/banking' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3E5AB] pb-24">
      {/* HEADER */}
      <header className="p-6 pt-12 bg-black border-b border-[#D4AF37]/20 flex justify-between items-center">
        <div>
          <h2 className="text-[#D4AF37] font-black tracking-widest text-xl">TEZRO</h2>
          <p className="text-white font-bold">Rs. {balance}</p>
        </div>
        <button className="bg-[#39FF14]/10 text-[#39FF14] text-[10px] px-3 py-1 rounded-full border border-[#39FF14]/20 animate-pulse">
            SYSTEM: SECURE
        </button>
      </header>

      {/* MAP SECTION */}
      <div className="p-4">
        <div className="h-[220px] rounded-[30px] overflow-hidden border border-[#D4AF37]/30 relative">
          <MapContainer center={[31.4504, 73.1350]} zoom={13} style={{height: '100%', width: '100%'}} zoomControl={false}>
            <MapResizer />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          <div className="absolute bottom-4 left-0 right-0 px-6 z-[1000]">
             <div className="bg-black/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex">
                <input type="text" placeholder="Where to?" className="bg-transparent flex-1 px-3 outline-none text-sm text-white" />
                <button className="bg-[#D4AF37] text-black px-4 py-1 rounded-xl font-bold text-xs">GO</button>
             </div>
          </div>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-5 gap-2 px-4 mt-4">
        {services.map((s, i) => (
          <div key={i} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/5 active:scale-90 transition-all">
            <span className="text-xl">{s.icon}</span>
            <span className="text-[9px] font-bold uppercase opacity-60">{s.name}</span>
          </div>
        ))}
      </div>

      {/* HERO CARD */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-black p-6 rounded-[30px] border border-[#D4AF37]/20 flex justify-between items-center" onClick={() => navigate('/ride')}>
            <div>
                <h3 className="text-white font-black text-lg">Ride Anywhere</h3>
                <p className="text-[#D4AF37] text-xs">Safe, Fast & Secure</p>
            </div>
            <button className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-black text-xs uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)]">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
