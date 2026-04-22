import React, { useState, useEffect } from 'react';
import { Truck, MapPin, CheckCircle2, Clock, Phone, Shield } from 'lucide-react';

const DeliveryFleet = () => {
  const [status, setStatus] = useState(0); // 0: Order Placed, 1: Picked, 2: On the Way, 3: Delivered

  // ڈیلیوری سٹیٹس کو فرضی طور پر اپ ڈیٹ کرنے کے لیے
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) => (prev < 3 ? prev + 1 : prev));
    }, 10000); // ہر 10 سیکنڈ بعد سٹیٹس بدلے گا
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Order Confirmed', desc: 'Your order is being packed', icon: <CheckCircle2 size={18}/> },
    { title: 'Picked Up', desc: 'Rider has collected your items', icon: <ShoppingBag size={18}/> },
    { title: 'On the Way', desc: 'Rider is 2.5km away from you', icon: <Truck size={18}/> },
    { title: 'Delivered', desc: 'Items handed over successfully', icon: <MapPin size={18}/> }
  ];

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28 pb-32">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border border-[#D4AF37]/20 mb-4">
          <Truck size={40} className="text-[#D4AF37] animate-bounce" />
        </div>
        <h1 className="text-xl font-black uppercase tracking-widest text-[#D4AF37]">Tezro Delivery</h1>
        <p className="text-[10px] text-zinc-500 font-bold uppercase">Order ID: #TZ-99281</p>
      </div>

      {/* ٹریکنگ کارڈ */}
      <div className="bg-zinc-900/50 rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden">
        <div className="absolute left-10 top-20 bottom-20 w-[2px] bg-zinc-800"></div>

        <div className="space-y-12 relative">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-start gap-6 transition-all duration-500 ${index <= status ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center z-10 transition-colors ${index <= status ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-zinc-800 text-zinc-500'}`}>
                {index <= status && index !== 3 ? <CheckCircle2 size={18} /> : step.icon}
              </div>
              <div>
                <h3 className={`font-black text-sm uppercase ${index <= status ? 'text-white' : 'text-zinc-600'}`}>{step.title}</h3>
                <p className="text-[10px] text-zinc-500 font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* رائڈر کارڈ */}
      {status >= 1 && (
        <div className="mt-8 bg-zinc-900/80 p-6 rounded-[2.5rem] border border-[#D4AF37]/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/10">
              <span className="text-xl font-black">AI</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">Tezro Autonomous Bot</h4>
              <p className="text-[9px] text-[#D4AF37] font-black uppercase">Electric Fleet v2</p>
            </div>
          </div>
          <button className="p-4 bg-zinc-800 rounded-2xl text-[#D4AF37] active:scale-95 transition-all">
            <Phone size={20} />
          </button>
        </div>
      )}

      {/* سیکیورٹی سیل */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Shield size={12} className="text-green-500" />
        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">End-to-End Encrypted Delivery</span>
      </div>
    </div>
  );
};

export default DeliveryFleet;
