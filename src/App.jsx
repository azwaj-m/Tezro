import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, Mic, Utensils, Car, ShoppingBag, 
  Wrench, CreditCard, Eye, TrendingUp, User, 
  Grid, Bell 
} from 'lucide-react';

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const position = [30.15, 71.43]; 
  const polyline = [[30.14, 71.42], [30.15, 71.43], [30.16, 71.44]];

  return (
    <div style={{ backgroundColor: '#041208', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '100px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'linear-gradient(to bottom, #1E6B2C, #0B3A18)', padding: '15px', borderRadius: '0 0 30px 30px', borderBottom: '1px solid rgba(234,179,8,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: 'black', borderRadius: '50%', border: '1px solid #eab308', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ color: '#eab308', fontWeight: 'bold', fontSize: '12px' }}>T</span>
            </div>
            <h1 style={{ color: 'black', fontWeight: '900', fontStyle: 'italic', margin: 0, fontSize: '22px' }}>TEZRO</h1>
          </div>
          <Bell color="#eab308" size={22} />
        </div>
        <div style={{ marginTop: '15px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '25px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search color="gray" size={18} />
          <input type="text" placeholder="Search Service..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', flex: 1 }} />
          <Mic color="#eab308" size={18} />
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ paddingTop: '160px', padding: '15px' }}>
        
        {/* SMALL SERVICE BUTTONS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
          {[
            { id: 'food', name: 'Food', icon: <Utensils /> },
            { id: 'ride', name: 'Ride', icon: <Car /> },
            { id: 'shop', name: 'Shop', icon: <ShoppingBag /> },
            { id: 'fix', name: 'Services', icon: <Wrench /> }
          ].map((s) => (
            <div key={s.id} style={{ minWidth: '90px', height: '70px', background: 'linear-gradient(135deg, #FFE08A, #EAB308)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
               {React.cloneElement(s.icon, { size: 18 })}
               <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>{s.name}</span>
            </div>
          ))}
        </div>

        {/* WALLET */}
        <div style={{ background: 'linear-gradient(to right, #F59E0B, #B45309)', borderRadius: '20px', padding: '20px', marginTop: '20px', color: 'black' }}>
          <p style={{ margin: 0, fontSize: '10px', fontWeight: 'bold' }}>CURRENT BALANCE</p>
          <h2 style={{ margin: '5px 0' }}>PKR 3,335.00</h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>**** **** **** 4038</p>
        </div>

        {/* MAP */}
        <div style={{ height: '220px', marginTop: '20px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #eab30833' }}>
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <Polyline pathOptions={{ color: '#eab308' }} positions={polyline} />
            <Marker position={position} icon={customIcon} />
          </MapContainer>
        </div>

      </div>

      {/* NAVIGATION */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px', background: '#0B3A18', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '2px solid #eab30866', borderRadius: '25px 25px 0 0' }}>
        <Grid color={activeTab === 'Home' ? '#eab308' : 'white'} onClick={() => setActiveTab('Home')} />
        <CreditCard color={activeTab === 'Pay' ? '#eab308' : 'white'} onClick={() => setActiveTab('Pay')} />
        <TrendingUp color={activeTab === 'Offers' ? '#eab308' : 'white'} onClick={() => setActiveTab('Offers')} />
        <User color={activeTab === 'Profile' ? '#eab308' : 'white'} onClick={() => setActiveTab('Profile')} />
      </nav>

    </div>
  );
}

export default App;
