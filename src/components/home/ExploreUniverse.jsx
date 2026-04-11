import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  { id: 1, title: 'Marketplace', path: '/service/marketplace', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=400' },
  { id: 2, title: 'Food & Dining', path: '/service/food', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400' },
  { id: 3, title: 'Ride & Taxi', path: '/service/ride', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=400' },
  { id: 4, title: 'Doctor Home', path: '/service/doctor', img: 'https://images.unsplash.com/photo-1584515933487-759f38bc894c?q=80&w=400' }
];

const ExploreUniverse = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 px-1">
      <div className="flex justify-between items-center mb-6 px-4">
        <h3 className="text-lg font-black shiny-gold uppercase tracking-tighter">Premium Services</h3>
        <span className="text-[8px] text-[#FFD700] font-bold border border-[#FFD700]/30 px-2 py-0.5 rounded-full animate-pulse">SWIPE</span>
      </div>

      {/* سوئپ کارڈز کنٹینر */}
      <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            onClick={() => navigate(service.path)}
            className="min-w-[280px] h-48 rounded-[2.8rem] overflow-hidden gold-border relative snap-center active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            <img src={service.img} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h4 className="text-xl font-black text-white uppercase tracking-tighter">{service.title}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-8 h-0.5 bg-[#FFD700]"></span>
                <p className="text-[9px] text-[#FFD700] font-black uppercase tracking-[2px]">Book Now</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExploreUniverse;
