import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import MobileRecharge from './MobileRecharge'; // ریچارج کمپوننٹ امپورٹ کریں
import TransactionsList from './TransactionsList'; // ٹرانزیکشن لسٹ امپورٹ کریں

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
  const { user } = useAuth(); // یوزر ڈیٹا حاصل کریں
  const [balance] = useState("1,250,500");

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride' },
    { name: 'Food', icon: '🍔', path: '/food' },
    { name: 'Shop', icon: '🛒', path: '/shop' },
    { name: 'Parcel', icon: '📦', path: '/parcel' },
    { name: 'Vault', icon: '💳', path: '/banking' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3E5AB] pb-32">
      {/* 1. HEADER - اب یہ زیادہ پرسنل ہے */}
      <header className="p-6 pt-12 bg-black border-b border-[#D4AF37]/10 flex justify-between items-center sticky top-0 z-[2000] backdrop-blur-md">
        <div>
          <h2 className="text-[#D4AF37] font-black tracking-[4px] text-xs uppercase opacity-70">Tezro Super App</h2>
          <p className="text-white font-black text-xl">Rs. {balance}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] text-[#39FF14] font-bold">● ONLINE</span>
          <img 
            src={user?.photoURL || 'https://via.placeholder.com/40'} 
            className="w-8 h-8 rounded-full border border-[#D4AF37]/50 mt-1" 
            alt="Profile"
          />
        </div>
      </header>

      {/* 2. MAP SECTION */}
      <div className="p-4">
        <div className="h-[200px] rounded-[30px] overflow-hidden border border-[#D4AF37]/20 relative shadow-2xl">
          <MapContainer center={[31.4504, 73.1350]} zoom={13} style={{height: '100%', width: '100%'}} zoomControl={false}>
            <MapResizer />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          <div className="absolute bottom-4 left-0 right-0 px-6 z-[1000]">
             <div className="bg-black/90 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex shadow-2xl">
                <input type="text" placeholder="Where do you want to go?" className="bg-transparent flex-1 px-3 outline-none text-xs text-white" />
                <button className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-black text-[10px] uppercase">Search</button>
             </div>
          </div>
        </div>
      </div>

      {/* 3. SERVICES GRID */}
      <div className="grid grid-cols-5 gap-2 px-4 mt-2">
        {services.map((s, i) => (
          <div key={i} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-2 py-4 bg-white/5 rounded-2xl border border-white/5 active:scale-90 transition-all shadow-lg">
            <span className="text-xl">{s.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter opacity-80">{s.name}</span>
          </div>
        ))}
      </div>

      {/* 4. MOBILE RECHARGE MODULE - اب یہ ہوم اسکرین کا حصہ ہے */}
      <div className="p-4 mt-4">
        <MobileRecharge />
      </div>

      {/* 5. TRANSACTION HISTORY SECTION */}
      <div className="p-4">
        <div className="bg-[#111] rounded-[30px] p-2 border border-white/5">
           <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] p-4">Recent Vault Activity</h3>
           <TransactionsList currentUser={user} />
           <button className="w-full py-3 text-[#D4AF37] text-[10px] font-bold uppercase opacity-50">View Full Statement</button>
        </div>
      </div>

      {/* 6. PROMO CARD */}
      <div className="p-4 mb-10">
        <div className="bg-gradient-to-r from-[#B8860B]/20 to-transparent p-6 rounded-[30px] border border-[#D4AF37]/10 flex justify-between items-center">
            <div>
                <h3 className="text-white font-black text-sm uppercase">Upgrade to Gold</h3>
                <p className="text-[#D4AF37] text-[10px]">Get 5% Cashback on every ride</p>
            </div>
            <div className="text-2xl">🏆</div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
