import React, { useState } from 'react';
import { db, auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';

const BusinessRegistration = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // رجسٹریشن منطق یہاں آئے گی
    alert("OTP بھیج دیا گیا ہے");
    setStep(2); // OTP والے مرحلے پر منتقل کریں
  };

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      {step === 1 ? (
        <div className="glass-morphism p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gold mb-4">بزنس رجسٹریشن</h2>
          <input type="text" placeholder="کاروبار کا نام" className="w-full p-3 mb-4 bg-transparent border border-gray-700 rounded" />
          <button onClick={handleRegister} className="w-full bg-gold p-3 rounded font-bold">رجسٹریشن شروع کریں</button>
        </div>
      ) : (
        <div className="glass-morphism p-8 rounded-2xl">
          <h2 className="text-xl mb-4">OTP درج کریں</h2>
          <input type="number" onChange={(e) => setOtp(e.target.value)} className="w-full p-3 mb-4 bg-transparent border border-cyan-500 rounded text-center text-2xl tracking-widest" />
          <button onClick={() => navigate('/vendor-dashboard')} className="w-full bg-green-600 p-3 rounded">تصدیق کریں</button>
        </div>
      )}
    </div>
  );
};

export default BusinessRegistration;
