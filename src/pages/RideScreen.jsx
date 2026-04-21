import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Navigation, Car, Star } from 'lucide-react';

const RideScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('searching'); // searching, ongoing, completed

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('ongoing'), 3000);
    const timer2 = setTimeout(() => setStatus('completed'), 7000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  if (status === 'searching') return (
    <div className="h-screen bg-[#000d08] flex flex-col items-center justify-center">
      <Navigation size={60} className="text-[#D4AF37] animate-bounce" />
      <p className="text-[#D4AF37] font-black mt-6 animate-pulse uppercase">Connecting to Driver...</p>
    </div>
  );

  if (status === 'ongoing') return (
    <div className="h-screen bg-[#000d08] flex flex-col items-center justify-center p-8">
      <div className="w-full h-64 bg-zinc-900 rounded-[3rem] mb-8 border border-gold/10 flex items-center justify-center overflow-hidden">
        <p className="text-zinc-600 font-bold italic animate-pulse">LIVE TRACKING MAP ACTIVE</p>
      </div>
      <h2 className="text-2xl font-black text-white italic">سفر جاری ہے...</h2>
      <p className="text-zinc-500 text-xs mt-2 uppercase">Dest: {state?.destination}</p>
    </div>
  );

  return (
    <div className="h-screen bg-[#000d08] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-black border-2 border-[#D4AF37]/20 rounded-[3.5rem] p-8 text-center shadow-2xl">
        <CheckCircle size={50} className="text-[#D4AF37] mx-auto mb-4" />
        <h2 className="text-[#D4AF37] text-2xl font-black italic uppercase">Ride Completed</h2>
        <div className="my-6 border-y border-white/5 py-4 space-y-2">
          <div className="flex justify-between text-xs font-bold"><span className="text-zinc-500">FARE PAID</span><span className="text-gold">Rs. {state?.fare}</span></div>
          <div className="flex justify-between text-xs font-bold"><span className="text-zinc-500">DRIVER</span><span className="text-white">Ahmed Ali</span></div>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#D4AF37" className="text-[#D4AF37]" />)}
        </div>
        <button onClick={() => navigate('/')} className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-black uppercase">Back to Home</button>
      </div>
    </div>
  );
};
export default RideScreen;
