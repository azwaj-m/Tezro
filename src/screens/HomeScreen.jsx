import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { VoiceCommandHandler } from '../utils/voice/VoiceCommandHandler'; // وائس سسٹم کی وائرنگ
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

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
    <div className="min-h-screen bg-black text-white font-sans pb-32">
      <Sidebar />
      
      {/* Header with Security Status */}
      <div className="p-6 pt-16 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">TEZRO <span className="text-[#D4AF37]">CORE</span></h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest text-shadow-sm">Voice Guardian Active</span>
          </div>
        </div>
        <button onClick={() => navigate('/admin')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          ⚙️
        </button>
      </div>

      {/* Main Voice Command Hub - مرکز میں وائس سسٹم */}
      <div className="px-6 mb-8 text-center">
        <div 
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`relative inline-block p-1 rounded-full bg-gradient-to-t from-[#D4AF37] to-transparent ${isVoiceActive ? 'animate-spin-slow' : ''}`}
        >
          <div className="bg-black rounded-full p-8 border-4 border-[#111] shadow-[0_0_50px_rgba(212,175,55,0.2)] active:scale-95 transition-all">
            <span className="text-5xl">${isVoiceActive ? '🔊' : '🎙️'}</span>
          </div>
          {isVoiceActive && (
            <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 rounded-full animate-ping"></div>
          )}
        </div>
        <p className="mt-4 text-[10px] font-black text-[#D4AF37] uppercase tracking-[4px]">
          {isVoiceActive ? 'Listening to Command...' : 'Tap for Voice Command'}
        </p>
        
        {/* Hidden Component that handles the logic from your 130 files */}
        <VoiceCommandHandler active={isVoiceActive} onCommand={(cmd) => console.log("Executing:", cmd)} />
      </div>

      {/* Financial Status */}
      <div className="px-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex justify-between items-center backdrop-blur-md">
          <div>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Universal Ledger</p>
            <h3 className="text-2xl font-black tracking-tight text-white">Rs. {balance?.toLocaleString() || '1,250,500.00'}</h3>
          </div>
          <button onClick={() => navigate('/bank')} className="text-[#D4AF37] font-black text-[10px] uppercase border-b border-[#D4AF37]">History</button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-6 grid grid-cols-4 gap-4">
        {services.map((s) => (
          <button key={s.id} onClick={() => navigate(s.path)} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-3xl hover:border-[#D4AF37]/50 transition-all">
              {s.icon}
            </div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">{s.name}</span>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
