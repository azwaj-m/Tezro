import React, { useState, useEffect } from 'react';
import { useTezro } from '../context/TezroContext';
import RideScreen from './RideScreen';
import DriverScreen from './DriverScreen';
import { Loader2, ShieldAlert } from 'lucide-react';

const RideMaster = () => {
  const { userRole, isDriverVerified } = useTezro();
  const [auditComplete, setAuditComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAuditComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!auditComplete) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
      <Loader2 className="text-[#FFD700] animate-spin mb-6" size={40} />
      <h2 className="text-[#FFD700] font-black tracking-[4px] uppercase text-[10px]">Encrypting Secure Session</h2>
      <p className="text-zinc-700 text-[8px] mt-2 uppercase">Blockchain Node: Verified</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#000d08]">
      {userRole === 'passenger' ? (
        <RideScreen />
      ) : (
        isDriverVerified ? <DriverScreen /> : (
          <div className="h-screen flex items-center justify-center p-10">
            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] text-center">
               <ShieldAlert className="text-red-500 mx-auto mb-4" size={32} />
               <p className="text-white font-bold text-sm">Security Block: Driver Identity Not Verified</p>
               <button className="mt-4 text-[#FFD700] text-[10px] font-black uppercase">Start Verification</button>
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default RideMaster;
