import React, { useState } from 'react';
import { Package, Truck, Bike, ChevronRight, Navigation } from 'lucide-react';

const DeliveryFleet = () => {
  const [selectedFleet, setSelectedFleet] = useState('bike');

  const fleets = [
    { id: 'bike', name: 'Tezro Flash', type: 'Bike', time: '15 min', icon: <Bike /> },
    { id: 'cargo', name: 'Tezro Cargo', type: 'Mini Truck', time: '40 min', icon: <Truck /> },
    { id: 'heavy', name: 'Tezro Heavy', type: 'Full Truck', time: 'Scheduled', icon: <Package /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">FLEET</span></h1>
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Global Logistics Network</p>

      {/* Fleet Selection */}
      <div className="mt-8 space-y-4">
        {fleets.map((f) => (
          <div 
            key={f.id}
            onClick={() => setSelectedFleet(f.id)}
            className={`p-5 rounded-[2.5rem] border transition-all ${selectedFleet === f.id ? 'border-[#D4AF37] bg-zinc-900' : 'border-zinc-800 bg-zinc-900/30'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${selectedFleet === f.id ? 'bg-[#D4AF37] text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{f.name}</h3>
                  <p className="text-[10px] text-zinc-500">{f.type} • {f.time}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-zinc-700" />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-[2rem] mt-10 shadow-xl shadow-yellow-900/20 active:scale-95 transition-all">
        CONFIRM PICKUP
      </button>
    </div>
  );
};

export default DeliveryFleet;
