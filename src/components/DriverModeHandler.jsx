import React from 'react';
import { redirectToRegistration } from '../utils/TezroMasterEngine';

const DriverModeHandler = () => {
  const handleDriverActivation = () => {
    // رجسٹریشن کے لیے ویب ریپو پر بھیجنا
    redirectToRegistration('driver');
  };

  return (
    <div className="p-6 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-[2.5rem] mt-10 text-center">
      <h3 className="text-[#FFD700] font-black italic uppercase">Earn with Tezro</h3>
      <p className="text-[10px] text-gray-500 mb-4">آپ کی لائیو سیلفی اور رجسٹریشن ضروری ہے</p>
      <button
        onClick={handleDriverActivation}
        className="bg-[#FFD700] text-tezro-gold px-8 py-3 rounded-2xl font-black text-xs uppercase"
      >
        رجسٹریشن شروع کریں
      </button>
    </div>
  );
};
export default DriverModeHandler;
