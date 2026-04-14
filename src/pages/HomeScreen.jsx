import React from 'react';
import { useNavigate } from 'react-router-dom';
import TezroVirtualCard from '../components/TezroVirtualCard';
import LiveMap from '../components/home/LiveMap';
import SecurityStatus from '../components/home/SecurityStatus';
import { Car, Utensils, CreditCard, ShoppingBag, Truck, UserCircle, Pill, Wrench } from 'lucide-react';

const HomeScreen = () => {
  const navigate = useNavigate();
  
  const services = [
    { icon: Car, label: 'Ride', path: '/' },
    { icon: Utensils, label: 'Food', path: '/' },
    { icon: CreditCard, label: 'Pay', path: '/vault' },
    { icon: ShoppingBag, label: 'Shop', path: '/' },
    { icon: Truck, label: 'Deliver', path: '/' },
    { icon: UserCircle, label: 'Doctor', path: '/' },
    { icon: Pill, label: 'Pharmacy', path: '/' },
    { icon: Wrench, label: 'Service', path: '/' },
  ];

  return (
    <div className="space-y-10">
      <TezroVirtualCard />
      <SecurityStatus />

      {/* Services Grid - All Active */}
      <div className="grid grid-cols-4 gap-4">
        {services.map((s, i) => (
          <button 
            key={i} 
            onClick={() => navigate(s.path)}
            className="flex flex-col items-center gap-2 group active:scale-90 transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-b from-[#FFD700] to-[#B8860B] rounded-2xl flex items-center justify-center text-black shadow-[0_10px_20px_rgba(255,215,0,0.2)] group-hover:shadow-[#FFD700]/40">
              <s.icon size={28} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black text-white/80 uppercase tracking-tighter">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Live Map Section */}
      <div className="border-2 border-[#FFD700]/30 rounded-[3.5rem] overflow-hidden h-72 shadow-[0_0_40px_rgba(255,215,0,0.15)] relative">
        <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#FFD700]/30 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
          <span className="text-[10px] text-[#FFD700] font-black uppercase tracking-[2px]">Secure Live Feed</span>
        </div>
        <LiveMap />
      </div>
    </div>
  );
};
export default HomeScreen;
