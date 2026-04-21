import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, X, Check } from 'lucide-react';

const DriverScreen = () => {
  const [request, setRequest] = useState({
    passenger: "حمزہ خان",
    pickup: "گلگشت کالونی",
    drop: "کینٹ سٹیشن",
    fare: "Rs. 450",
    active: true
  });

  if (!request.active) return (
    <div className="h-screen bg-black flex items-center justify-center text-zinc-500 font-black uppercase text-[10px] tracking-widest">
      Searching for requests...
    </div>
  );

  return (
    <div className="h-screen bg-[#000d08] p-6 flex flex-col justify-end pb-24">
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-[#FFD700]/20 rounded-[3rem] p-8 w-full animate-in fade-in slide-in-from-bottom-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="bg-[#FFD700] text-black text-[8px] font-black px-2 py-1 rounded-full uppercase">New Request</span>
            <h2 className="text-white text-2xl font-black mt-2">{request.passenger}</h2>
          </div>
          <div className="text-[#FFD700] font-black text-xl italic">{request.fare}</div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-zinc-400 text-xs font-bold">{request.pickup}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <p className="text-zinc-400 text-xs font-bold">{request.drop}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setRequest({...request, active: false})} className="bg-zinc-800 text-white py-5 rounded-2xl flex items-center justify-center border border-white/5">
            <X size={24} />
          </button>
          <button onClick={() => alert("Ride Accepted!")} className="bg-[#FFD700] text-black py-5 rounded-2xl flex items-center justify-center shadow-lg">
            <Check size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverScreen;
