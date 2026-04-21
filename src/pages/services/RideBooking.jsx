import React, { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, Navigation, Car, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LocationEngine } from '../../utils/LocationEngine';
import { useWallet } from '../../context/WalletContext';

const initialRides = [
  { id: 'mini', name: 'Tezro Mini', image: '/assets/Alto.JPG', basePrice: 40, desc: 'Eco Friendly' },
  { id: 'bolan', name: 'Tezro Bolan', image: '/assets/Suzoki-bolan.JPG', basePrice: 35, desc: 'Large Group' },
  { id: 'prime', name: 'Tezro Prime', image: '/assets/corolla.JPG', basePrice: 65, desc: 'Business Class' }
];

const RideBooking = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate();
  const { executePayment } = useWallet();

  // فرضی ڈسٹنس جنریٹر (ٹیسٹنگ کے لیے)
  useEffect(() => {
    if (destination.length > 5) {
      setDistance(Math.floor(Math.random() * 15) + 2); // 2 سے 17 کلومیٹر کے درمیان
    } else {
      setDistance(0);
    }
  }, [destination]);

  const handleBooking = async () => {
    if(!destination) return alert("براہ کرم منزل درج کریں");
    const ride = initialRides.find(r => r.id === selectedRide);
    const fare = LocationEngine.calculateFare(distance, ride.name.split(' ')[1]);
    
    // والٹ سے کرایہ کٹوانے کا عمل
    const res = await executePayment(fare, `Ride to ${destination}`);
    if (res?.success) {
       navigate('/RideMaster', { state: { ride, fare, destination } });
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-32 font-sans overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 pt-10">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">RIDE</span></h1>
        <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-2">
           <ShieldCheck size={14} className="animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-tighter">Secure Link Active</span>
        </div>
      </div>

      {/* لوکیشن کارڈ */}
      <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5 mb-8">
        <div className="space-y-4 relative">
          <div className="absolute left-[21px] top-10 bottom-10 w-[1px] bg-dashed border-l border-zinc-700"></div>
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_green]"></div>
            <input type="text" value="Multan, Punjab" className="bg-transparent text-xs font-bold text-zinc-400 outline-none w-full" readOnly />
          </div>
          <div className="flex items-center gap-4">
            <Navigation size={16} className="text-[#D4AF37]" />
            <input 
              type="text" 
              placeholder="کہاں جانا ہے؟" 
              className="bg-transparent outline-none text-sm w-full border-b border-white/10 pb-1 focus:border-[#D4AF37] transition-all"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* گاڑیوں کی لسٹ */}
      <div className="space-y-3">
        {initialRides.map((ride) => {
          const estimatedFare = LocationEngine.calculateFare(distance || 5, ride.name.split(' ')[1]);
          return (
            <div
              key={ride.id}
              onClick={() => setSelectedRide(ride.id)}
              className={`p-5 rounded-[2.5rem] border transition-all cursor-pointer flex items-center justify-between ${selectedRide === ride.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.02]' : 'border-white/5 bg-zinc-900/30'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 rounded-2xl overflow-hidden bg-black/40 p-1">
                   <img src={ride.image} alt={ride.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-black text-sm">{ride.name}</h3>
                  <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase">
                    <Clock size={10} /> {distance ? `${distance + 2} MIN` : 'NEARBY'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#D4AF37] font-black text-lg">Rs.{estimatedFare}</p>
                <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Est. Fare</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* سیکیورٹی الرٹ */}
      <div className="mt-8 p-6 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] flex gap-4">
        <ShieldAlert size={40} className="text-red-500/50 shrink-0" />
        <div>
          <h4 className="text-[10px] font-black uppercase text-red-500 mb-1 tracking-widest">Guardian Protocol v3.0</h4>
          <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">
            سفر شروع ہوتے ہی **Safe-Path** انکرپشن فعال ہو جائے گی۔ آپ کا ڈیٹا صرف ایمرجنسی میں قانون نافذ کرنے والے اداروں کو دستیاب ہوگا۔
          </p>
        </div>
      </div>

      {selectedRide && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#000d08] to-transparent">
          <button
            onClick={handleBooking}
            className="w-full royal-gold-shiny text-black py-6 rounded-[2.5rem] font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(212,175,55,0.3)] active:scale-95 transition-all"
          >
            Confirm & Secure Ride
          </button>
        </div>
      )}
    </div>
  );
};

export default RideBooking;
