import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { RideEngine } from '../utils/TezroMasterEngine';

const TripVerification = ({ requestId, actualOtp }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    const result = await startTrip(requestId, otp, actualOtp);
    if (result.success) {
      alert("سفر شروع ہو گیا ہے! اللہ نگہبان۔");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="bg-black/90 backdrop-blur-3xl border-2 border-[#FFD700]/30 p-8 rounded-[3rem] shadow-2xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-[#FFD700]/10 p-4 rounded-full">
          <Lock className="text-[#FFD700]" size={32} />
        </div>
        <h3 className="text-[#FFD700] font-black italic text-xl uppercase tracking-tighter">Security Verification</h3>
        <p className="text-gray-400 text-[10px] uppercase font-bold">سواری سے 4 ہندسوں کا کوڈ پوچھیں</p>
        
        <input 
          type="number" 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="0 0 0 0"
          className="bg-transparent border-b-4 border-[#FFD700] text-[#FFD700] text-4xl font-black text-center w-40 outline-none py-2 tracking-[10px]"
        />
        
        {error && <p className="text-red-500 text-[10px] font-black uppercase">{error}</p>}

        <button 
          onClick={handleVerify}
          className="w-full bg-[#FFD700] text-tezro-gold py-5 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,215,0,0.2)]"
        >
          START TRIP <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TripVerification;
