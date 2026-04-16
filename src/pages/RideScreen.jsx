import React, { useState } from 'react';
import { CheckCircle, Download, Share2, Star, ShieldCheck, Navigation, Car } from 'lucide-react';
const RideScreen = () => {
  // بیماری کا علاج: صرف رسید دکھانے کے بجائے بکنگ اسٹیٹ شامل کی گئی ہے
  const [rideState, setRideState] = useState('idle'); // idle, searching, completed
  const rideSummary = { id: 'TR-9921', fare: 850, driver: 'احمد علی', date: '13 اپریل 2026' };
  const handleBookRide = () => {
    setRideState('searching');
    // رائیڈ ہسٹری میں ڈیٹا محفوظ کرنا
    const currentHistory = JSON.parse(localStorage.getItem('ride_history') || '[]');
    const newRide = { ...rideSummary, date: new Date().toLocaleString('ur-PK') };
    localStorage.setItem('ride_history', JSON.stringify([newRide, ...currentHistory]));
    
    setTimeout(() => setRideState('completed'), 3000);
  };
  if (rideState === 'idle') {
    return (
      <div className="h-screen bg-[#000d08] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-[#FFD700]/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Car size={48} className="text-[#FFD700]" />
        </div>
        <h2 className="text-[#FFD700] text-2xl font-black italic mb-2">محفوظ سفر کی تلاش؟</h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-8">Tezro Secure Network is Online</p>
        <button 
          onClick={handleBookRide}
          className="w-full max-w-xs bg-[#FFD700] text-tezro-gold py-5 rounded-2xl font-black text-sm uppercase shadow-[0_0_30px_rgba(255,215,0,0.2)] active:scale-95 transition-all"
        >
          رائیڈ بک کریں
        </button>
      </div>
    );
  }
  if (rideState === 'searching') {
    return (
      <div className="h-screen bg-[#000d08] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#FFD700] blur-3xl opacity-20 animate-pulse"></div>
          <Navigation size={64} className="text-[#FFD700] animate-bounce relative z-10" />
        </div>
        <p className="text-[#FFD700] mt-8 font-black italic animate-pulse">قریبی ڈرائیور کی تلاش جاری ہے...</p>
      </div>
    );
  }
  return (
    <div className="relative h-screen bg-[#000d08] flex items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-3xl border-2 border-[#FFD700]/30 rounded-[3.5rem] p-8 shadow-[0_0_100px_rgba(255,215,0,0.1)] relative overflow-hidden"> 
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,215,0,0.4)]">
            <CheckCircle size={40} className="text-tezro-gold" />
          </div>
          <h2 className="text-[#FFD700] text-3xl font-black italic uppercase tracking-tighter">سفر مکمل!</h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[3px] mt-1 text-center">Tezro Secure Payment Successful</p>
        </div>
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
        <div className="text-center mb-8">
          <p className="text-gray-500 text-[10px] uppercase font-black mb-3">ڈرائیور کو ریٹنگ دیں</p>
          <div className="flex justify-center gap-2 text-[#FFD700]">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={24} fill={s <= 4 ? "#FFD700" : "none"} className="active:scale-125 transition-transform cursor-pointer" />)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-zinc-900/50/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-zinc-900/50/10">
            <Download size={16} /> رسید ڈاؤن لوڈ
          </button>
          <button className="bg-[#FFD700] text-tezro-gold py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <Share2 size={16} /> رسید شیئر کریں
          </button>
        </div>
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-gray-600">
          <ShieldCheck size={14} />
          <span className="text-[8px] font-black uppercase tracking-widest">Foolproof Blockchain Verified</span>
        </div>
      </div>
    </div>
  );
};
export default RideScreen;
