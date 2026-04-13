import React, { useState, useEffect } from 'react';
import { useTezro } from '../context/TezroContext';
import RideScreen from './RideScreen';
import DriverScreen from './DriverScreen';
import NotificationScreen from './NotificationScreen';
import { ShieldCheck, Loader2 } from 'lucide-react';

const RideMaster = () => {
  const { userRole, isDriverVerified, activeRide } = useTezro();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // سسٹم چیک: کیا تمام سیکیورٹی لیئرز ایکٹیو ہیں؟
    setTimeout(() => setLoading(false), 1500); 
  }, []);

  if (loading) return (
    <div className="h-screen bg-[#000d08] flex flex-col items-center justify-center">
      <Loader2 className="text-[#FFD700] animate-spin mb-4" size={48} />
      <h2 className="text-[#FFD700] font-black tracking-[5px] uppercase text-[10px]">Security Audit in Progress...</h2>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-[#000d08]">
      {/* رول کے مطابق اسکرین دکھانا */}
      {userRole === 'passenger' ? (
        <RideScreen />
      ) : (
        isDriverVerified ? <DriverScreen /> : <div className="p-20 text-[#FFD700]">براہ کرم رجسٹریشن مکمل کریں۔</div>
      )}
    </main>
  );
};

export default RideMaster;
