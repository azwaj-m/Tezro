import React, { useState, useEffect } from 'react';
import { Power, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { startLocationTracking, stopLocationTracking } from '../utils/LocationEngine';

const DriverScreen = ({ driverId }) => {
  const [isOnline, setIsOnline] = useState(false);

  const toggleStatus = () => {
    if (!isOnline) {
      startLocationTracking(driverId);
      setIsOnline(true);
    } else {
      stopLocationTracking();
      setIsOnline(false);
    }
  };

  return (
    <div className="relative h-screen bg-[#000d08] p-6 flex flex-col items-center justify-between">
      {/* ٹاپ اسٹیٹس بار */}
      <div className="w-full flex justify-between items-center bg-black/40 p-4 rounded-3xl border border-[#FFD700]/10">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            {isOnline ? 'Active on Map' : 'Offline'}
          </span>
        </div>
        <ShieldCheck className="text-[#FFD700]" size={20} />
      </div>

      {/* سنٹرل اسٹیٹس کنٹرول */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={toggleStatus}
          className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl ${
            isOnline 
            ? 'bg-[#FFD700] text-tezro-gold shadow-[0_0_50px_rgba(255,215,0,0.4)] rotate-12' 
            : 'bg-zinc-900/50/5 text-gray-600 border-2 border-white/10'
          }`}
        >
          <Power size={48} strokeWidth={3} />
          <span className="text-[10px] font-black mt-2 uppercase">{isOnline ? 'Go Offline' : 'Go Online'}</span>
        </button>
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[3px]">
          {isOnline ? 'آپ کی لوکیشن سواریوں کو نظر آ رہی ہے' : 'سسٹم فی الحال ڈس کنیکٹ ہے'}
        </p>
      </div>

      {/* باٹم انفو کارڈ */}
      <div className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 p-6 rounded-[2.5rem] mb-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD700] p-2 rounded-xl text-tezro-gold"><Zap size={20} /></div>
            <div>
               <p className="text-[8px] text-gray-500 uppercase font-black">Performance</p>
               <p className="text-xs text-white font-bold tracking-widest italic">100% SECURE</p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[8px] text-gray-500 uppercase font-black">Earnings</p>
             <p className="text-xs text-[#FFD700] font-black italic">Rs. 0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen;
