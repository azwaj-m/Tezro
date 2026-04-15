import React from 'react';
import { PlusCircle, Hotel } from 'lucide-react';

const HotelBooking = () => {
  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-[#D4AF37]">Tezro <span className="text-white">Stay</span></h1>
        <a href="https://alingosuper.github.io/TezroWeb" className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-[10px] font-bold">
          <PlusCircle size={14} /> LIST HOTEL
        </a>
      </div>
      <div className="text-center text-zinc-600 mt-20 italic">Elite stays for elite guests...</div>
    </div>
  );
};
export default HotelBooking;
