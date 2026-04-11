import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  { id: 1, title: 'Marketplace', path: '/service/marketplace', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=400' },
  { id: 2, title: 'Food & Dining', path: '/service/food', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400' },
  { id: 3, title: 'Ride & Taxi', path: '/service/ride', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=400' },
  { id: 4, title: 'Doctor/Home Visit', path: '/service/doctor', img: 'https://images.unsplash.com/photo-1584515933487-759f38bc894c?q=80&w=400' },
  { id: 5, title: 'Maintenance/Worker', path: '/service/maintenance', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400' }
];

const ExploreUniverse = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 pb-32 space-y-8 px-1">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xl font-black shiny-gold uppercase tracking-tighter">Premium Services</h3>
        <span className="text-[9px] text-white/30 font-bold uppercase tracking-[4px]">Verified Providers</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            onClick={() => navigate(service.path)}
            className="relative h-44 rounded-[2.5rem] overflow-hidden gold-border group cursor-pointer active:scale-[0.98] transition-all"
          >
            <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent flex flex-col justify-center p-8">
              <h4 className="text-xl font-black text-[#FFD700] uppercase tracking-tighter drop-shadow-lg">{service.title}</h4>
              <p className="text-[9px] text-white/60 font-bold uppercase tracking-[3px] mt-2">Tap to book appointment</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExploreUniverse;
