import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Hotel, Castle, Car, ShoppingCart, HeartPulse, Receipt, Tool } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { title: 'Tezro Ride', icon: <Car />, path: '/ride', desc: 'Premium travel' },
    { title: 'Tezro Eats', icon: <Utensils />, path: '/food', desc: 'Luxury dining' },
    { title: 'Tezro Stay', icon: <Hotel />, path: '/hotels', desc: 'Elite hotels' },
    { title: 'Grand Halls', icon: <Castle />, path: '/halls', desc: 'Event venues' },
    { title: 'Tezro Mart', icon: <ShoppingCart />, path: '/mart', desc: 'Instant grocery' },
    { title: 'Health Link', icon: <HeartPulse />, path: '/health', desc: 'Doctor & Lab' },
    { title: 'Bill Pay', icon: <Receipt />, path: '/bills', desc: 'Utility payments' },
    { title: 'Pro Help', icon: <Tool />, path: '/pro', desc: 'Home services' },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-4 pb-24">
      <div className="mb-6 mt-2 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          TEZRO <span className="text-[#D4AF37]">ULTRA</span>
        </h1>
        <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-1 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((s, i) => (
          <ServiceCard key={i} title={s.title} icon={s.icon} description={s.desc} onClick={() => navigate(s.path)} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
