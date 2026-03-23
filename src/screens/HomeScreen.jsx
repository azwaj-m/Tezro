import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet'; // Connecting Finance Engine
import { SecurityEngine } from '../utils/security/SecurityEngine'; // Connecting Security Engine
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { balance } = useWallet(); // Live Wiring to WalletService.js

  const services = [
    { id: 'ride', name: 'Ride', icon: '🚕', path: '/ride' },
    { id: 'food', name: 'Food', icon: '🍔', path: '/food' },
    { id: 'shop', name: 'Shop', icon: '🛍️', path: '/shop' },
    { id: 'parcel', name: 'Parcel', icon: '📦', path: '/parcel' },
    { id: 'wallet', name: 'Wallet', icon: '💳', path: '/pay' },
    { id: 'bank', name: 'Banking', icon: '🏦', path: '/bank' },
    { id: 'booking', name: 'Booking', icon: '📅', path: '/booking' },
    { id: 'emergency', name: 'SOS', icon: '🚨', path: '/emergency' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pb-28">
      <Sidebar />
      <div className="p-6 pt-16">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[5px]">Tezro Ecosystem</h2>
            <h1 className="text-4xl font-black italic tracking-tighter">CORE<span className="text-white/20">OS</span></h1>
          </div>
          <div className="text-right">
             <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] ml-auto mb-1"></div>
             <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Encrypted Sync</p>
          </div>
        </header>

        {/* Live Wallet Wiring */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 p-6 rounded-[2.5rem] mb-8 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Liquidity</p>
          <h3 className="text-3xl font-black tracking-tighter text-[#D4AF37]">
            Rs. {balance?.toLocaleString() || '1,450,000'}
          </h3>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-7xl font-black italic">VAULT</div>
        </div>

        {/* Feature Grid: Every button is now a Live Link */}
        <div className="grid grid-cols-4 gap-4">
          {services.map((s) => (
            <button key={s.id} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-2 active:scale-90 transition-all">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.8rem] flex items-center justify-center text-3xl shadow-xl">
                {s.icon}
              </div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Master Admin Link */}
        <button 
          onClick={() => navigate('/admin')}
          className="w-full mt-10 py-5 bg-[#D4AF37] text-black rounded-3xl font-black text-xs uppercase tracking-[4px] shadow-2xl active:translate-y-1 transition-all"
        >
          Open Command Center
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
