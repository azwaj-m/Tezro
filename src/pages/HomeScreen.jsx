import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { Search, Car, Utensils, CreditCard, ShoppingBag, Truck, UserPlus, Zap, Settings, ShieldCheck, Bell, Menu, Mic } from 'lucide-react';

const services = [
  { name: 'Ride', icon: Car }, { name: 'Food', icon: Utensils },
  { name: 'Pay', icon: CreditCard }, { name: 'Shop', icon: ShoppingBag },
  { name: 'Deliver', icon: Truck }, { name: 'Doctor', icon: UserPlus },
  { name: 'Pharmacy', icon: Zap }, { name: 'Services', icon: Settings }
];

// لوکیشن بولنے والا فنکشن
const speakLocation = (text) => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = `You selected ${text}`;
  msg.rate = 0.9;
  window.speechSynthesis.speak(msg);
};

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      const locText = `Latitude ${lat.toFixed(2)}, Longitude ${lng.toFixed(2)}`;
      setAddress(locText);
      speakLocation(locText); // آواز میں بتائے گا
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup className="map-label-popup">
        <div className="text-center font-bold text-gold">
          📍 LOCATION FOUND <br />
          <span className="text-white text-lg">{address}</span>
        </div>
      </Popup>
    </Marker>
  );
}

const HomeScreen = () => {
  return (
    <div className="min-h-screen pb-32 bg-[#000d08] text-gold overflow-x-hidden">
      
      {/* Shiny Green Header */}
      <div className="px-4 py-4 flex justify-between items-center sticky top-0 z-[2000] shiny-header-footer">
        <Menu size={26} className="text-white" />
        <div className="flex flex-col items-center">
             <div className="flex items-center gap-1 bg-black/30 px-3 py-0.5 rounded-full border border-white/20">
                <ShieldCheck size={12} className="text-white animate-pulse" />
                <span className="text-[8px] font-bold uppercase tracking-[2px] text-white">Cyber Secure</span>
             </div>
             <h1 className="text-xl font-black italic tracking-tighter text-white">TEZRO</h1>
        </div>
        <Bell size={26} className="text-white" />
      </div>

      {/* Search Section */}
      <div className="px-4 mt-6">
        <div className="relative group">
          <input type="text" placeholder="Explore your world..." className="w-full bg-zinc-900 border-2 border-shiny-green/30 p-4 pl-12 rounded-2xl text-white outline-none focus:border-shiny-green shadow-[0_0_15px_rgba(0,255,136,0.1)]" />
          <Search className="absolute left-4 top-4 text-shiny-green" size={20} />
          <Mic className="absolute right-4 top-4 text-shiny-green" size={20} />
        </div>
      </div>

      {/* Advanced Satellite Map */}
      <div className="px-4 mt-8">
        <div className="relative h-72 rounded-[2.5rem] border-4 border-shiny-green/20 overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.2)]">
          <div className="absolute top-4 left-4 z-[1000] bg-black/70 backdrop-blur-md p-2 rounded-lg border border-shiny-green text-[10px] text-white font-bold uppercase">
             Live Terrain Mode: High Precision
          </div>
          <MapContainer center={[24.8607, 67.0011]} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            {/* World Imagery with Labels (Building, Roads, Mountains) */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Esri'
            />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              opacity={0.3} // ہلکا سا روڈ میپ اوپر تاکہ نام نظر آئیں
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 mt-8 grid grid-cols-4 gap-4">
        {services.map((s, i) => (
          <motion.button key={i} whileTap={{ scale: 0.85 }} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-gold to-yellow-600 shadow-xl border border-black/10">
            <s.icon className="text-black mb-1" size={24} strokeWidth={3} />
            <span className="text-black text-[9px] font-black uppercase tracking-tighter">{s.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Footer is handled by BottomNav component */}
    </div>
  );
};

export default HomeScreen;
