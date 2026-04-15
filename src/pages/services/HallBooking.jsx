import React from 'react';
import { Users, Calendar, ShieldCheck } from 'lucide-react';

const HallBooking = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-5 pb-24">
      <h1 className="text-2xl font-black text-center mb-2 uppercase tracking-tighter">Event <span className="text-[#D4AF37]">Venues</span></h1>
      <div className="h-1 w-12 bg-[#D4AF37] mx-auto mb-8"></div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gradient-to-r from-zinc-900 to-black p-1 rounded-2xl border border-zinc-800">
            <div className="p-4 flex gap-4">
              <div className="h-24 w-24 bg-zinc-800 rounded-xl flex-shrink-0 border border-zinc-700"></div>
              <div className="flex-1">
                <h3 className="font-bold text-[#D4AF37]">Grand Marquee {i}</h3>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1">
                  <Users size={12} /> Capacity: 500-1000
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <ShieldCheck size={12} /> Fully Insured & Secure
                </div>
                <button className="mt-3 text-[10px] font-bold border border-[#D4AF37] text-[#D4AF37] px-4 py-1.5 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallBooking;
