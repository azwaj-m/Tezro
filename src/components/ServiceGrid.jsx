import React from 'react';
import { Car, Utensils, Hotel, ShoppingBag, PartyPopper, Landmark } from 'lucide-react';

const services = [
  { id: 'ride', name: 'رائیڈ', icon: <Car />, color: 'text-yellow-500' },
  { id: 'food', name: 'کھانا', icon: <Utensils />, color: 'text-orange-500' },
  { id: 'hotel', name: 'ہوٹل', icon: <Hotel />, color: 'text-blue-500' },
  { id: 'shopping', name: 'شاپنگ', icon: <ShoppingBag />, color: 'text-green-500' },
  { id: 'hall', name: 'فنکشن ہال', icon: <PartyPopper />, color: 'text-purple-500' },
  { id: 'bank', name: 'بینکنگ', icon: <Landmark />, color: 'text-gold-500' },
];

const ServiceGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {services.map((service) => (
        <div key={service.id} className="bg-gray-900 border border-yellow-600/20 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-90 transition-all cursor-pointer">
          <div className={`${service.color} scale-125`}>{service.icon}</div>
          <span className="text-[10px] font-bold text-gray-300">{service.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;
