import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Hotel, Castle, Car, ShoppingCart, HeartPulse, Receipt, Wrench } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'food', title: 'Food Delivery', icon: <Utensils />, path: '/food' },
    { id: 'hotel', title: 'Hotel Booking', icon: <Hotel />, path: '/hotel' },
    { id: 'hall', title: 'Hall Booking', icon: <Castle />, path: '/hall' },
    { id: 'ride', title: 'Ride Booking', icon: <Car />, path: '/ride' },
    { id: 'mart', title: 'Tezro Mart', icon: <ShoppingCart />, path: '/mart' },
    { id: 'health', title: 'Health', icon: <HeartPulse />, path: '/health' },
    { id: 'bills', title: 'Utility Bills', icon: <Receipt />, path: '/finance' },
    { id: 'pro', title: 'Pro Help', icon: <Wrench />, path: '/pro' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-black italic text-[#D4AF37] tracking-tighter">TEZRO <span className="text-white">ULTRA</span></h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">The Future of Services</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} onClick={() => navigate(service.path)}>
            <ServiceCard title={service.title} icon={service.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
