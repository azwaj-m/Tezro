import React from 'react';
import { ShieldAlert, MapPin, BadgeCheck, Gavel } from 'lucide-react';

const WarehouseReg = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <h1 className="text-2xl font-black text-[#D4AF37]">HUB <span className="text-white">PARTNER</span></h1>
      <p className="text-zinc-500 text-sm mt-2">Apply as a Micro-Warehouse and earn per parcel.</p>

      <div className="mt-8 space-y-4">
        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800">
          <ShieldAlert className="text-[#D4AF37] mb-3" />
          <h3 className="font-bold text-lg">Security Deposit</h3>
          <p className="text-zinc-400 text-xs mt-1">A refundable deposit of Rs. 10,000 is required to ensure parcel safety.</p>
        </div>

        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800">
          <Gavel className="text-[#D4AF37] mb-3" />
          <h3 className="font-bold text-lg">24-Hour Rule</h3>
          <p className="text-zinc-400 text-xs mt-1">Parcels must be dispatched within 24 hours. Late handling will trigger automatic alerts and potential account suspension.</p>
        </div>

        <button className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl mt-8">
          PAY & REGISTER HUB
        </button>
      </div>
    </div>
  );
};

export default WarehouseReg;
