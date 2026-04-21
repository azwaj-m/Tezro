import React, { useState } from 'react';
import { useTezro } from '../context/TezroContext';
import { Loader2, ShieldCheck } from 'lucide-react';

const BookingForm = ({ serviceName, baseFare }) => {
  const { requestRide } = useTezro();
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    const details = { 
      type: serviceName, 
      pickup: "Current Verified Location", 
      fare: baseFare || 500,
      timestamp: new Date().toISOString()
    };
    
    try {
      const result = await requestRide(details);
      if (result.success) {
        alert(`${serviceName} بکنگ موصول ہو گئی ہے۔ قریبی پروفیشنل سے رابطہ کیا جا رہا ہے۔`);
      }
    } catch (err) {
      console.error("Booking Failed", err); alert("بکنگ میں خرابی: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBook}
      disabled={loading}
      className="bg-[#FFD700] text-black font-black py-5 px-6 rounded-[2rem] w-full shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
    >
      {loading ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
      <span className="uppercase text-xs tracking-tighter">Confirm & Secure Booking</span>
    </button>
  );
};

export default BookingForm;
