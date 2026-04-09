import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  // آپ کے سکرین سٹرکچر کے مطابق تمام سروسز
  const services = [
    { id: 1, name: 'Ride', icon: '🚕', path: '/ride', color: 'bg-yellow-500/10' },
    { id: 2, name: 'Food', icon: '🍔', path: '/food', color: 'bg-orange-500/10' },
    { id: 3, name: 'Pay', icon: '💸', path: '/pay', color: 'bg-blue-500/10' },
    { id: 4, name: 'Shop', icon: '🛒', path: '/shop', color: 'bg-purple-500/10' },
    { id: 5, name: 'Banking', icon: '🏦', path: '/banking', color: 'bg-green-500/10' },
    { id: 6, name: 'Vendor', icon: '📊', path: '/vendor', color: 'bg-red-500/10' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => navigate(service.path)}
          className={`flex flex-col items-center justify-center p-5 rounded-[2rem] border border-white/5 ${service.color} hover:border-[#d4af37]/40 transition-all active:scale-90 group`}
        >
          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
            {service.icon}
          </span>
          <span className="text-[9px] font-black text-white/80 uppercase tracking-tighter">
            {service.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
