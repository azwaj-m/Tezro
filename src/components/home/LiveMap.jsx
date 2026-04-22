import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LiveMap = ({ customPosition }) => {
  const defaultPosition = [31.5204, 74.3587]; // Lahore
  const pos = customPosition || defaultPosition;
  const Recenter = ({ c }) => { const map = useMap(); map.setView(c); return null; };

  return (
    <div className="w-full h-64 rounded-[2.5rem] overflow-hidden border-2 border-[#FFD700]/20 relative z-10">
      <MapContainer center={pos} zoom={pos[0] === 31.5204 ? 13 : 15} className="h-full w-full grayscale invert-[100%] hue-rotate(180deg) brightness(80%)">
        <Recenter c={pos} />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <CircleMarker center={pos} radius={12} pathOptions={{ color: '#FFD700', fillColor: '#FFD700', fillOpacity: 0.6 }}>
          <Popup>Tezro Live Point</Popup>
        </CircleMarker>
      </MapContainer>
      
      <div className="absolute top-5 left-6 z-[1000] bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="text-[9px] text-white font-black uppercase tracking-widest">Secure Live Feed</span>
        </div>
      </div>
    </div>
  );
};
export default LiveMap;
