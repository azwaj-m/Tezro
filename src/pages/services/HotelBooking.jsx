import React from 'react';
import { MapPin, Star, Coffee, Wifi } from 'lucide-react';

const HotelBooking = () => {
  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold italic text-[#D4AF37]">Tezro <span className="text-white">Stay</span></h1>
        <p className="text-zinc-500 text-sm">Experience luxury like never before</p>
      </header>

      {/* Featured Hotel Card */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-6">
        <div className="h-48 bg-zinc-800 animate-pulse flex items-center justify-center text-zinc-600">
          [Premium Hotel Image Placeholder]
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">Serena Royal Suite</h2>
            <span className="text-[#D4AF37] font-bold">Rs. 25,000<span className="text-[10px] text-zinc-500">/night</span></span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs mt-1">
            <MapPin size={12} className="text-[#D4AF37]" /> Islamabad, Pakistan
          </div>
          <div className="flex gap-4 mt-4">
             <div className="flex items-center gap-1 text-[10px] text-zinc-300"><Wifi size={14} /> Free WiFi</div>
             <div className="flex items-center gap-1 text-[10px] text-zinc-300"><Coffee size={14} /> Breakfast</div>
          </div>
          <button className="w-full mt-5 bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:bg-yellow-600 transition-all">
            Book Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
