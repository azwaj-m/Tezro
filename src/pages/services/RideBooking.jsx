import React, { useState } from 'react';
import { ShieldAlert, MapPin, Navigation, Car, ChevronRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const rides = [
  { id: 'mini', name: 'Tezro Mini', image: '/assets/Alto.JPG', price: 120, desc: 'Eco Friendly' },
  { id: 'bolan', name: 'Tezro Bolan', image: '/assets/Suzoki-bolan.JPG', price: 100, desc: 'Large Group' },
  { id: 'prime', name: 'Tezro Prime', image: '/assets/corolla.JPG', price: 250, desc: 'Business Class' }
];

const RideBooking = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleBooking = () => {
    if(!destination) return alert("براہ کرم منزل درج کریں");
    // سیکیورٹی ٹوکن جنریٹ کریں اور ماسٹر سکرین پر جائیں
    navigate('/RideMaster');
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-24 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic text-[#FFD700]">TEZRO <span className="text-white">RIDE</span></h1>
        <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-2">
           <ShieldCheck size={14} className="animate-pulse" />
           <span className="text-[10px] font-bold uppercase">Safe Path Active</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <MapPin size={18} className="text-[#FFD700]" />
          <input type="text" placeholder="موجودہ لوکیشن" className="bg-transparent outline-none text-xs w-full" defaultValue="Multan, Punjab" readOnly />
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-[#FFD700]/30 flex items-center gap-3">
          <Navigation size={18} className="text-[#FFD700]" />
          <input 
            type="text" 
            placeholder="کہاں جانا ہے؟" 
            className="bg-transparent outline-none text-xs w-full"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {rides.map((ride) => (
          <div 
            key={ride.id}
            onClick={() => setSelectedRide(ride.id)}
            className={`p-4 rounded-[2rem] border transition-all cursor-pointer ${selectedRide === ride.id ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/5 bg-zinc-900/50'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 overflow-hidden rounded-xl bg-zinc-800">
                   <img src={ride.image} alt={ride.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{ride.name}</h3>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">{ride.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#FFD700] font-black italic">Rs.{ride.price}</p>
                <p className="text-[8px] text-zinc-500 uppercase">Est. Fare</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-red-500/5 border border-red-500/10 rounded-[2rem]">
        <div className="flex items-center gap-2 mb-2 text-red-500">
          <ShieldAlert size={16} />
          <h4 className="text-[10px] font-black uppercase">Guardian AI Security</h4>
        </div>
        <p className="text-[9px] text-zinc-500 leading-relaxed">
          سفر کے دوران آپ کی آواز اور لوکیشن مانیٹر کی جائے گی۔ کسی بھی خطرے کی صورت میں ایمرجنسی پروٹوکول خود بخود فعال ہو جائے گا۔
        </p>
      </div>

      {selectedRide && (
        <button 
          onClick={handleBooking}
          className="fixed bottom-24 left-6 right-6 bg-[#FFD700] text-black py-5 rounded-[2.5rem] font-black uppercase shadow-[0_20px_50px_rgba(255,215,0,0.2)] active:scale-95 transition-all z-50"
        >
          Confirm & Secure Ride
        </button>
      )}
    </div>
  );
};

export default RideBooking;
