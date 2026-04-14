
import React, { useState, useEffect } from 'react';

import { useTezro } from '../context/TezroContext';

import RideScreen from './RideScreen';

import DriverScreen from './DriverScreen';

import { ShieldCheck, Loader2 } from 'lucide-react';



const RideMaster = () => {

  const { userRole, isDriverVerified } = useTezro();

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    // سیکیورٹی آڈٹ اینیمیشن

    const timer = setTimeout(() => setLoading(false), 1500);

    return () => clearTimeout(timer);

  }, []);



  if (loading) return (

    <div className="h-screen bg-[#000d08] flex flex-col items-center justify-center">

      <Loader2 className="text-[#FFD700] animate-spin mb-4" size={48} />

      <h2 className="text-[#FFD700] font-black tracking-[5px] uppercase text-[10px]">Security Audit in Progress...</h2>

    </div>

  );



  return (

    <main className="relative min-h-screen bg-[#000d08]">

      {userRole === 'passenger' ? (

        <RideScreen />

      ) : (

        // اگر ڈرائیور ہے تو تصدیق چیک کریں

        isDriverVerified ? <DriverScreen /> : (

          <div className="h-screen flex items-center justify-center p-10 text-center">

            <div className="border border-[#FFD700]/20 p-8 rounded-[2rem] bg-[#FFD700]/5">

               <p className="text-[#FFD700] font-bold">براہ کرم ڈرائیور رجسٹریشن مکمل کریں۔</p>

            </div>

          </div>

        )

      )}

    </main>

  );

};



export default RideMaster;

