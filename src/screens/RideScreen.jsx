import React, { useState } from 'react';
import { CheckCircle, Download, Share2, Star, ShieldCheck } from 'lucide-react';

const RideScreen = () => {
  const [isApproved, setIsApproved] = useState(true); // فرض کریں صارف نے منظوری دے دی ہے
  const rideSummary = { id: 'TR-9921', fare: 850, driver: 'احمد علی', date: '13 اپریل 2026' };

  return (
    <div className="relative h-screen bg-[#000d08] flex items-center justify-center p-6 overflow-y-auto">
      {/* سنہری رسید کارڈ */}
      <div className="w-full max-w-md bg-black/80 backdrop-blur-3xl border-2 border-[#FFD700]/30 rounded-[3.5rem] p-8 shadow-[0_0_100px_rgba(255,215,0,0.1)] relative overflow-hidden">
        
        {/* رسید کا بالائی حصہ */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,215,0,0.4)]">
            <CheckCircle size={40} className="text-black" />
          </div>
          <h2 className="text-[#FFD700] text-3xl font-black italic uppercase tracking-tighter">سفر مکمل!</h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[3px] mt-1 text-center">Tezro Secure Payment Successful</p>
        </div>

        {/* تفصیلات کی پٹی */}
        <div className="space-y-4 border-y border-[#FFD700]/10 py-6 mb-8">
          <div className="flex justify-between items-center text-center">
            <span className="text-gray-500 text-[9px] uppercase font-black">Ride ID</span>
            <span className="text-white font-bold text-xs uppercase">{rideSummary.id}</span>
          </div>
          <div className="flex justify-between items-center text-center">
            <span className="text-gray-500 text-[9px] uppercase font-black">رقم کی ادائیگی</span>
            <span className="text-[#FFD700] font-black text-xl italic">Rs. {rideSummary.fare}</span>
          </div>
          <div className="flex justify-between items-center text-center">
            <span className="text-gray-500 text-[9px] uppercase font-black">ڈرائیور</span>
            <span className="text-white font-bold text-xs uppercase">{rideSummary.driver}</span>
          </div>
        </div>

        {/* ڈرائیور ریٹنگ (منظوری کے بعد کا لازمی حصہ) */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-[10px] uppercase font-black mb-3">ڈرائیور کو ریٹنگ دیں</p>
          <div className="flex justify-center gap-2 text-[#FFD700]">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={24} fill={s <= 4 ? "#FFD700" : "none"} className="active:scale-125 transition-transform cursor-pointer" />)}
          </div>
        </div>

        {/* ایکشن بٹنز */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-white/10">
            <Download size={16} /> رسید ڈاؤن لوڈ
          </button>
          <button className="bg-[#FFD700] text-black py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <Share2 size={16} /> رسید شیئر کریں
          </button>
        </div>

        {/* سیکیورٹی سیل */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-gray-600">
           <ShieldCheck size={14} />
           <span className="text-[8px] font-black uppercase tracking-widest">Foolproof Blockchain Verified</span>
        </div>
      </div>
    </div>
  );
};

export default RideScreen;
