import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LiveMap = () => {
  const position = [31.5204, 74.3587]; // لاہور کا ڈیفالٹ لوکیشن

  return (
    <div className="w-full h-56 rounded-[2.5rem] overflow-hidden gold-border relative z-0">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <Marker position={position}>
          <Popup>Secure Terminal <br /> Active Zone</Popup>
        </Marker>
      </MapContainer>
      <div className="absolute top-4 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#FFD700]/20">
        <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest animate-pulse">● Live Security Map</span>
      </div>
    </div>
  );
};
export default LiveMap;
