import React from 'react';

const RideOffers = ({ offers, onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#050505] rounded-t-[40px] p-8 border-t border-[#D4AF37]/30 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-[2000]">
      <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6"></div>
      <h2 className="text-xl font-black text-white mb-6">قریبی ڈرائیورز کی پیشکش</h2>
      
      <div className="space-y-4">
        {offers.map(offer => (
          <div key={offer.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
                {offer.driverName[0]}
              </div>
              <div>
                <p className="font-bold text-white">{offer.driverName}</p>
                <p className="text-[10px] text-gray-400">{offer.carModel} • {offer.rating}★</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#39FF14] font-black text-lg">Rs. {offer.price}</p>
              <button onClick={() => onAccept(offer)} className="bg-[#D4AF37] text-black px-4 py-1.5 rounded-lg text-[10px] font-black mt-1 uppercase">Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideOffers;
