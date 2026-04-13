import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Settings, Navigation, X } from 'lucide-react';
import { triggerEmergencyAlert, isEmergencySetupDone, saveEmergencyContacts } from '../utils/SecurityEngine';

const RideScreen = () => {
  const [deviation, setDeviation] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const [tempNumbers, setTempNumbers] = useState("");
  const [isSetup, setIsSetup] = useState(isEmergencySetupDone());

  const handleSave = () => {
    const numList = tempNumbers.split(',').map(n => n.trim());
    saveEmergencyContacts(numList);
    setIsSetup(true);
    setShowSetup(false);
  };

  return (
    <div className="relative h-screen bg-[#000d08] overflow-hidden">
      {/* میپ لیئر */}
      <div className="absolute inset-0 bg-[#0a0a0a] opacity-40" 
           style={{ backgroundImage: 'radial-gradient(#FFD700 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* سیکیورٹی اسٹیٹس اور سیٹ اپ بٹن */}
      <div className="absolute top-48 left-6 right-6 z-40 flex justify-between items-center">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-[#FFD700]/20">
          <div className={`w-2 h-2 rounded-full ${deviation > 1 ? 'bg-red-600 animate-ping' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            {isSetup ? 'System Armed' : 'Security Incomplete'}
          </span>
        </div>

        {/* اگر سیٹ اپ نہیں ہے تو یہ بٹن چمکے گا */}
        {!isSetup && (
          <button onClick={() => setShowSetup(true)} className="bg-[#FFD700] p-2 rounded-xl text-black animate-pulse">
            <Settings size={20} />
          </button>
        )}
      </div>

      {/* پینک بٹن */}
      <div className="absolute bottom-60 right-6 z-50">
        <button 
          onClick={() => triggerEmergencyAlert("31.5204,74.3587")}
          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-90 border-4 border-black"
        >
          <ShieldAlert size={32} className="text-white" />
        </button>
      </div>

      {/* ایمرجنسی سیٹ اپ کارڈ - جو صرف بٹن دبانے پر آئے گا */}
      {showSetup && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#00150c] border-2 border-[#FFD700]/30 p-8 rounded-[3rem] w-full max-w-md relative">
            <button onClick={() => setShowSetup(false)} className="absolute top-6 right-6 text-gray-500"><X /></button>
            <h2 className="text-2xl font-black text-[#FFD700] mb-2 italic">SECURITY SETUP</h2>
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-6">ایمرجنسی نمبرز شامل کریں (مثال: 03001234567)</p>
            
            <input 
              type="text" 
              placeholder="نمبر یہاں لکھیں..."
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl mb-6 text-white outline-none focus:border-[#FFD700]"
              onChange={(e) => setTempNumbers(e.target.value)}
            />
            
            <button onClick={handleSave} className="w-full bg-[#FFD700] text-black py-5 rounded-2xl font-black text-lg">
              محفوظ کریں
            </button>
          </div>
        </div>
      )}

      {/* کنٹرول پٹی */}
      <div className="absolute bottom-32 left-4 right-4 z-40">
        <div className="bg-black/95 border border-[#FFD700]/30 rounded-[2.5rem] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-[#FFD700]/10 p-2 rounded-xl text-[#FFD700]"><Navigation size={20} /></div>
             <p className="text-[10px] text-white font-black uppercase tracking-wider">Tracking Active</p>
          </div>
          <button className="bg-[#FFD700] px-8 py-3 rounded-2xl text-black font-black text-xs uppercase">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default RideScreen;
