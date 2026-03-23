import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QuickActions from '../components/home/QuickActions';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'ride', name: 'Ride', icon: '🚗', path: '/ride' },
    { id: 'food', name: 'Food', icon: '🍔', path: '/food' },
    { id: 'shop', name: 'Shop', icon: '🛍️', path: '/shop' },
    { id: 'parcel', name: 'Parcel', icon: '📦', path: '/parcel' },
    { id: 'booking', name: 'Booking', icon: '📅', path: '/booking' },
    { id: 'pay', name: 'Pay', icon: '💳', path: '/pay' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <div className="p-4 pt-20">
        <h1 className="text-2xl font-black mb-6 tracking-tighter">TEZRO SUPER APP</h1>
        
        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate(service.path)}
              className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-[#D4AF37]/20 transition-all"
            >
              <span className="text-3xl mb-2">{service.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{service.name}</span>
            </button>
          ))}
        </div>

        <QuickActions />
      </div>
    </div>
  );
};

export default HomeScreen;
