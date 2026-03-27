import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase'; 
import { useRoleRedirect } from '../../hooks/useRoleRedirect';

const Login = (props) => {
  const navigate = useNavigate();
  const { redirectUser } = useRoleRedirect();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result && result.user) {
        await redirectUser(result.user);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("لاگ ان میں مسئلہ پیش آیا، دوبارہ کوشش کریں۔");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 overflow-hidden">
      
      {/* 1. Jumbo Logo */}
      <div className="relative group">
        <img 
          src="/assets/logo.png" 
          alt="Tezro" 
          className="w-[100vw] max-w-[500px] mb-12 animate-pulse drop-shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="w-full max-w-sm space-y-8 text-center">
        
        {/* Google Login Button */}
        <button 
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-4 bg-white text-black px-8 py-5 rounded-3xl font-black text-lg shadow-[0_15px_50px_rgba(255,255,255,0.15)] active:scale-95 transition-all hover:bg-gray-100"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6" alt="Google" />
          گوگل کے ساتھ داخل ہوں
        </button>

        {/* Guest Mode Window */}
        <div className='mt-12 pt-8 border-t border-white/10 w-full'>
          <p className='text-gray-500 text-[10px] mb-6 uppercase tracking-[4px] font-bold'>OR EXPLORE AS GUEST</p>
          
          <button 
            onClick={() => props.onGuest ? props.onGuest() : navigate('/?guest=true')}
            className='w-full py-5 bg-transparent border-2 border-dashed border-[#D4AF37]/30 text-[#D4AF37] rounded-2xl font-black text-xs tracking-[3px] uppercase hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all outline-none cursor-pointer'
          >
            ENTER GUEST WINDOW →
          </button>
          
          <p className="mt-4 text-[9px] text-gray-600 leading-relaxed italic">
            * گیسٹ موڈ میں ڈیٹا محفوظ نہیں کیا جائے گا
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
