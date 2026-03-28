import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { mapConfig, startLiveTracking, goldIcon } from '../utils/RemoteTracker';
import 'leaflet/dist/leaflet.css';

const RecenterMap = ({ coords }) => {
  const map = useMap();
  if (coords) map.setView([coords.lat, coords.lng], 15);
  return null;
};

const LiveTracking = () => {
  const [location, setLocation] = useState({ lat: 31.5204, lng: 74.3587 }); // Default: Lahore

  useEffect(() => {
    const watchId = startLiveTracking((coords) => setLocation(coords));
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="w-full h-full bg-black relative">
      <MapContainer center={[location.lat, location.lng]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer url={mapConfig.url} attribution={mapConfig.attribution} />
        <Marker position={[location.lat, location.lng]} icon={goldIcon} />
        <RecenterMap coords={location} />
      </MapContainer>
      <div className="absolute top-2 right-2 z-[1000] bg-black/80 border border-[#d4af37] px-2 py-1 rounded text-[8px] text-[#d4af37] font-bold">
        SECURE GPS ACTIVE
      </div>
    </div>
  );
};

export default LiveTracking;
