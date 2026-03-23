import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QuickActions from '../components/home/QuickActions';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'ride', name: 'Ride', icon: '🚗', path: '/ride' },
    { id: 'food', name: 'Food', icon: '🍔', path: '/food' },
    { id: 'shop', name: 'Shop', icon: '🛍️', path: '/shop' },
    { id: 'parcel', name: 'Parcel', icon: '📦', path: '/parcel' },
    { id: 'booking', name: 'Booking', icon: '📅', path: '/booking' },
    { id: 'pay', name: 'Wallet', icon: '💳', path: '/pay' },
    { id: 'bank', name: 'Banking', icon: '🏦', path: '/bank' },
    { id: 'sos', name: 'Emergency', icon: '🚨', path: '/emergency' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden pb-24">
      <Sidebar />
      <div className="p-6 pt-20">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic">TEZRO <span className="text-[#D4AF37]">UNIVERSE</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[4px] mt-1">Status: Fully Secured</p>
          </div>
          <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            🛡️
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {services.map((s) => (
            <button key={s.id} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-2 group active:scale-90 transition-transform">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-3xl group-hover:border-[#D4AF37]/50 transition-colors">
                {s.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter group-hover:text-white">{s.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#111] to-[#000] border border-white/10 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-6">
          <div className="relative z-10">
            <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1">Financial Core</h3>
            <p className="text-2xl font-black">Rs. 2,840,000.00</p>
            <button onClick={() => navigate('/bank')} className="mt-4 bg-white text-black text-[10px] px-6 py-2 rounded-full font-black uppercase">Hub Panel</button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-7xl font-black italic uppercase">Vault</div>
        </div>

        <QuickActions />
      </div>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
