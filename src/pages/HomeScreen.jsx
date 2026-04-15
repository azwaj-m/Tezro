import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Hotel, Castle, Car, Wallet, Shield } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';

const HomeScreen = () => {
  const navigate = useNavigate();

  const mainServices = [
    { title: 'Tezro Ride', icon: <Car />, path: '/ride', desc: 'Premium city travel' },
    { title: 'Tezro Eats', icon: <Utensils />, path: '/food', desc: 'Luxury dining delivered' },
    { title: 'Tezro Stay', icon: <Hotel />, path: '/hotels', desc: 'Book elite hotels' },
    { title: 'Grand Halls', icon: <Castle />, path: '/halls', desc: 'Event venues' },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-4 pb-24">
      {/* Welcome Section */}
      <div className="mb-8 mt-2">
        <h2 className="text-zinc-500 text-sm font-medium">Welcome to</h2>
        <h1 className="text-4xl font-black tracking-tighter text-white">
          TEZRO <span className="text-[#D4AF37]">ULTRA</span>
        </h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 gap-4">
        {mainServices.map((service, index) => (
          <ServiceCard 
            key={index}
            title={service.title}
            icon={service.icon}
            description={service.desc}
            onClick={() => navigate(service.path)}
          />
        ))}
      </div>

      {/* Quick Actions / Finance Section */}
      <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <Wallet />
           </div>
           <div>
              <p className="text-[10px] text-zinc-500 uppercase font-bold">Tezro Wallet</p>
              <p className="text-lg font-bold">Rs. 45,250.00</p>
           </div>
        </div>
        <button onClick={() => navigate('/finance')} className="bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded-lg">
          Manage
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
