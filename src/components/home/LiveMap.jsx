import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// میپ آئیکن سیٹ اپ
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const LiveMap = () => {
  return (
    <div className="w-full h-60 rounded-[2.5rem] overflow-hidden gold-border relative z-0">
      <MapContainer center={[31.5204, 74.3587]} zoom={13} className="h-full w-full grayscale-[0.8] invert-[100%] hue-rotate(180deg)">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[31.5204, 74.3587]}>
          <Popup>Secure Tezro Terminal <br/> Active Now</Popup>
        </Marker>
      </MapContainer>
      <div className="absolute top-4 left-6 z-10 bg-black/70 backdrop-blur-md px-4 py-1 rounded-full border border-[#FFD700]/30">
        <span className="text-[10px] text-green-400 font-black uppercase tracking-widest animate-pulse">● Live Security Map</span>
      </div>
    </div>
  );
};
export default LiveMap;
