import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { VoiceCommandHandler } from '../utils/voice/VoiceCommandHandler';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-32 overflow-hidden">
      <Sidebar />
      <div className="p-8 pt-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black italic tracking-tighter">TEZRO <span className="text-[#D4AF37]">CORE</span></h1>
          <div className="text-[8px] font-bold text-green-500 uppercase tracking-widest animate-pulse">System Live</div>
        </div>

        {/* Dynamic Voice Hub */}
        <div className="flex flex-col items-center mb-16">
          <div 
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] to-transparent shadow-[0_0_40px_rgba(212,175,55,0.1)] ${isVoiceActive ? 'animate-pulse scale-110' : ''} transition-all duration-500`}
          >
            <div className="bg-[#050505] rounded-full p-10 border-4 border-white/5 flex items-center justify-center active:scale-90 transition-transform cursor-pointer">
              <span className="text-5xl">${isVoiceActive ? '🔊' : '🎙️'}</span>
            </div>
          </div>
          <p className="mt-4 text-[10px] font-black text-[#D4AF37] uppercase tracking-[4px]">
            {isVoiceActive ? 'Listening...' : 'Activate Voice'}
          </p>
        </div>

        {/* Core Modules Grid */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: '🚕', p: '/ride' }, { icon: '🍔', p: '/food' }, 
            { icon: '🛍️', p: '/shop' }, { icon: '📦', p: '/parcel' },
            { icon: '💳', p: '/pay' }, { icon: '🏦', p: '/bank' }, 
            { icon: '📅', p: '/booking' }, { icon: '⚙️', p: '/admin' }
          ].map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(item.p)}
              className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl hover:bg-[#D4AF37]/20 transition-all"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      <VoiceCommandHandler active={isVoiceActive} />
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
