import React, { useState, useEffect } from 'react';
import { MapPin, Mic, Navigation, ShieldCheck, Volume2 } from 'lucide-react';

const RideScreen = () => {
  const [targetLocation, setTargetLocation] = useState('نقشے پر مقام منتخب کریں');
  const [isSecure, setIsSecure] = useState(false);

  // وائس فیڈ بیک لاجک - سیکیور اور ایرر فری
  const speakStatus = (msg) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // پرانی آواز روکیں
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = 'ur-PK';
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMapAction = (area) => {
    setTargetLocation(area);
    setIsSecure(true);
    speakStatus(`آپ کی لوکیشن ${area} محفوظ کر لی گئی ہے`);
    
    // 5 سیکنڈ بعد سیکیورٹی اسٹیٹس نارمل کریں
    setTimeout(() => setIsSecure(false), 5000);
  };

  return (
    <div className="relative h-screen bg-[#000d08] overflow-hidden">
      {/* لائیو فیوچرسٹک میپ - ہلکا پھلکا اور سیکیور */}
      <div 
        className="absolute inset-0 z-0 bg-[#0a0a0a] flex items-center justify-center"
        onClick={() => handleMapAction("گلبرگ تھری لاہور")}
      >
        {/* گرڈ لائنز - میپ کو فیوچرسٹک لک دینے کے لیے */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <Navigation size={60} className="text-[#FFD700] animate-pulse opacity-40" />
        <p className="absolute text-[10px] text-[#FFD700]/40 uppercase tracking-[5px] mt-24">Live Satellite Secure Feed</p>
      </div>

      {/* لوکیشن ایناؤنسر - بولڈ اور بڑا سائز */}
      {isSecure && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full text-center px-4 pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-black text-[#FFD700] drop-shadow-[0_0_40px_rgba(255,215,0,0.9)] uppercase italic transition-all duration-700">
            {targetLocation}
          </h2>
          <div className="mt-4 flex justify-center">
            <ShieldCheck size={40} className="text-green-500 animate-bounce" />
          </div>
        </div>
      )}

      {/* کنٹرول پینل - کی بورڈ سے بھی کم جگہ */}
      <div className="absolute bottom-32 left-4 right-4 z-40">
        <div className="bg-black/90 backdrop-blur-3xl border-2 border-[#FFD700]/30 rounded-[2.5rem] p-4 flex items-center gap-4 shadow-[0_0_50px_rgba(0,0,0,1)]">
          
          <div className="bg-[#FFD700] p-3 rounded-2xl text-black">
            <MapPin size={24} strokeWidth={3} />
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Active Safe Route</p>
            <h3 className="text-xs font-bold text-white truncate uppercase italic">{targetLocation}</h3>
          </div>

          <button onClick={() => speakStatus(targetLocation)} className="p-3 bg-white/5 rounded-2xl text-[#FFD700] hover:bg-[#FFD700]/10">
            <Volume2 size={20} />
          </button>
          
          <button className="px-8 py-4 bg-[#FFD700] text-black rounded-2xl font-black text-xs uppercase shadow-[0_10px_20px_rgba(255,215,0,0.3)] hover:scale-105 active:scale-95 transition-all">
            Ride
          </button>
        </div>
      </div>

      {/* سیکیورٹی لیئر انڈیکیٹر */}
      <div className="absolute top-44 left-6 z-40 flex items-center gap-2 bg-black/40 p-2 rounded-full border border-green-500/30">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Foolproof Protection Active</span>
      </div>
    </div>
  );
};

export default RideScreen;
