import React, { useState, useEffect } from 'react';
import { ShieldAlert, Navigation, Car, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TezroMasterEngine } from '../../utils/TezroMasterEngine';
import { useWallet } from '../../context/WalletContext';

const initialRides = [
  { id: 'mini', name: 'Tezro Mini', image: '/assets/Alto.JPG', type: 'mini' },
  { id: 'bolan', name: 'Tezro Bolan', image: '/assets/Suzoki-bolan.JPG', type: 'bolan' },
  { id: 'prime', name: 'Tezro Prime', image: '/assets/corolla.JPG', type: 'prime' }
];

const RideBooking = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [destination, setDestination] = useState('');
  const [distance] = useState(Math.floor(Math.random() * 10) + 3);
  const navigate = useNavigate();
  const { executePayment } = useWallet();

  const handleBooking = async () => {
    if(!destination) return alert("منزل درج کریں");
    const ride = initialRides.find(r => r.id === selectedRide);
    const fare = TezroMasterEngine.calculateFare(distance, ride.type);

    const res = await executePayment(fare, `Ride to ${destination}`);
    if (res?.success) {
      navigate('/RideMaster', { state: { ride, fare, destination, distance } });
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 font-sans">
      <h1 className="text-2xl font-black italic text-[#D4AF37] mt-10 mb-6 uppercase">Tezro Ride</h1>
      
      <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-white/5 mb-6">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_green]"></div>
          <span className="text-xs font-bold text-zinc-400">Your Location: Multan</span>
        </div>
        <div className="flex items-center gap-4">
          <Navigation size={18} className="text-[#D4AF37]" />
          <input 
            type="text" placeholder="کہاں جانا ہے؟" 
            className="bg-transparent outline-none text-sm w-full"
            value={destination} onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3 mb-32">
        {initialRides.map((ride) => (
          <div 
            key={ride.id} onClick={() => setSelectedRide(ride.id)}
            className={`p-4 rounded-[2rem] border transition-all flex items-center justify-between ${selectedRide === ride.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-zinc-900/30'}`}
          >
            <div className="flex items-center gap-4">
              <img src={ride.image} className="w-16 h-12 object-contain bg-black/20 rounded-xl" />
              <div>
                <h3 className="font-bold text-sm">{ride.name}</h3>
                <span className="text-[10px] text-zinc-500">5 min away</span>
              </div>
            </div>
            <p className="text-[#D4AF37] font-black italic">Rs.{TezroMasterEngine.calculateFare(distance, ride.type)}</p>
          </div>
        ))}
      </div>

      {selectedRide && (
        <div className="fixed bottom-10 left-6 right-6">
          <button onClick={handleBooking} className="w-full bg-[#D4AF37] text-black py-5 rounded-[2rem] font-black uppercase shadow-2xl active:scale-95 transition-all">
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};
export default RideBooking;
