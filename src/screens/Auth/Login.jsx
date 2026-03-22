import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      {/* 1. جمبو (Jumbo) لوگو */}
      <img 
        src="/assets/logo.png" 
        alt="Tezro" 
        className="w-[100vw] max-w-[500px] mb-12 animate-pulse drop-shadow-[0_0_30px_rgba(57,255,20,0.5)]" 
      />

      <div className="w-full max-w-sm space-y-6 text-center">
        {/* گوگل لاگ ان بٹن (چمکدار ڈیزائن) */}
        <button 
          className="w-full flex items-center justify-center gap-4 bg-white text-black px-8 py-5 rounded-3xl font-black text-lg shadow-[0_10px_40px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6" alt="" />
          گوگل کے ساتھ داخل ہوں
        </button>
n        {/* Guest Mode Window */}
        <div className='mt-8 pt-6 border-t border-white/10 w-full'>
          <p className='text-gray-500 text-[10px] mb-4 uppercase tracking-widest'>یا لاگ ان کے بغیر جائزہ لیں</p>
          <button 
            onClick={() => window.location.href = '/HomeScreen'}
            className='w-full py-4 bg-transparent border-2 border-dashed border-[#D4AF37]/40 text-[#D4AF37] rounded-2xl font-black text-xs tracking-[3px] uppercase hover:bg-[#D4AF37]/5 transition-all outline-none'
          >
            ENTER GUEST WINDOW →
          </button>
        </div>

        {/* 2. گیسٹ موڈ ونڈو (لاگ ان کے بغیر معائنہ) */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-gray-500 text-xs mb-4">یا صرف معائنہ کریں</p>
          <button 
            onClick={() => navigate('/HomeScreen?guest=true')}
            className="w-full py-4 bg-transparent border-2 border-dashed border-[#D4AF37]/50 text-[#D4AF37] rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-[#D4AF37]/10 transition-colors"
          >
            ایپ کا معائنہ کریں (Guest Mode)
          </button>
n        {/* Guest Mode Window */}
        <div className='mt-8 pt-6 border-t border-white/10 w-full'>
          <p className='text-gray-500 text-[10px] mb-4 uppercase tracking-widest'>یا لاگ ان کے بغیر جائزہ لیں</p>
          <button 
            onClick={() => window.location.href = '/HomeScreen'}
            className='w-full py-4 bg-transparent border-2 border-dashed border-[#D4AF37]/40 text-[#D4AF37] rounded-2xl font-black text-xs tracking-[3px] uppercase hover:bg-[#D4AF37]/5 transition-all outline-none'
          >
            ENTER GUEST WINDOW →
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
