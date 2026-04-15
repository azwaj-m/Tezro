import React from 'react';
import { PlusCircle, Castle } from 'lucide-react';

const HallBooking = () => {
  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-[#D4AF37]">Grand <span className="text-white">Halls</span></h1>
        <a href="https://alingosuper.github.io/TezroWeb" className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-[10px] font-bold">
          <PlusCircle size={14} /> LIST HALL
        </a>
      </div>
      <div className="text-center text-zinc-600 mt-20 italic">Booking elite venues for your events...</div>
    </div>
  );
};
export default HallBooking;
