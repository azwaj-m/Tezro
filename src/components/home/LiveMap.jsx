import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LiveMap = () => {
  const position = [31.5204, 74.3587]; // شاہانہ لوکیشن (لاہور)

  return (
    <div className="w-full h-64 rounded-[2.5rem] overflow-hidden gold-border relative z-10 group">
      <MapContainer center={position} zoom={13} className="h-full w-full grayscale invert-[100%] hue-rotate(180deg) brightness(80%)">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <CircleMarker center={position} radius={12} pathOptions={{ color: '#FFD700', fillColor: '#FFD700', fillOpacity: 0.6 }}>
          <Popup>Tezro Royal Terminal - Secured</Popup>
        </CircleMarker>
      </MapContainer>
      <div className="absolute top-5 left-6 z-[1000] bg-black/60 backdrop-blur-md border border-[#FFD700]/20 px-4 py-1.5 rounded-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="text-[9px] text-white font-black uppercase tracking-widest">Live Security Feed</span>
        </div>
      </div>
    </div>
  );
};
export default LiveMap;
