import React from 'react';
import { auth, googleProvider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { validateSecurity } from '@/security/FinalSecurityShield';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // سیکیورٹی چیک رن کریں
      const isSecure = validateSecurity('/home', user);
      
      if (isSecure) {
        navigate('/HomeScreen');
      } else {
        alert("سیکیورٹی الرٹ: غیر مجاز ڈیوائس یا رسائی!");
      }
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <img src="/assets/logo.png" alt="Tezro" className="w-32 mb-8 animate-pulse" />
      <button 
        onClick={handleGoogleLogin}
        className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6" alt="" />
        گوگل کے ساتھ سائن ان کریں
      </button>
    </div>
  );
};

export default Login;
