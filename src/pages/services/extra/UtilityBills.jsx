import React from 'react';
import { QrCode, Zap, Droplets, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UtilityBills = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-black italic text-[#D4AF37] mb-8 uppercase">Bill Payments</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 text-center">
          <Zap className="mx-auto text-yellow-500 mb-2" />
          <span className="text-[10px] font-bold">Electricity</span>
        </div>
        <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 text-center">
          <Droplets className="mx-auto text-blue-500 mb-2" />
          <span className="text-[10px] font-bold">Water</span>
        </div>
      </div>
      <button onClick={() => navigate('/finance')} className="w-full bg-[#D4AF37] text-black py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl">
        <QrCode size={20} /> SCAN TO PAY BILL
      </button>
    </div>
  );
};
export default UtilityBills;
