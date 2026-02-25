import React, { useState } from 'react';
// 1. پاتھ درست کیا گیا (آپ کی نئی فائل کے نام کے مطابق)
import { auth, db } from '../../firebase-config'; 

import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false); // لوڈنگ اسٹیٹ کا اضافہ
  const navigate = useNavigate();

  // 1. گوگل لاگ ان
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
      navigate('/'); 
    } catch (error) {
      console.error("Google Error:", error);
      alert("گوگل لاگ ان میں مسئلہ ہے: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. فون نمبر لاگ ان (OTP)
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      // جدید طریقہ: 'auth' کو پاس کرنا لازمی ہے
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("Recaptcha verified");
        }
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber.startsWith('+')) {
      return alert("براہ کرم نمبر ملک کے کوڈ کے ساتھ لکھیں (مثلاً +92)");
    }
    
    try {
      setLoading(true);
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      alert("OTP بھیج دیا گیا ہے!");
    } catch (error) {
      console.error("SMS Error:", error);
      alert("SMS Error: " + error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const result = await confirmationResult.confirm(otp);
      await createUserProfile(result.user);
      navigate('/');
    } catch (error) {
      alert("غلط کوڈ یا میعاد ختم ہو چکی ہے!");
    } finally {
      setLoading(false);
    }
  };

  // یوزر کا پروفائل بنانا (بہتر اور محفوظ طریقہ)
  const createUserProfile = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || "",
          phone: user.phoneNumber || phoneNumber,
          balance: 0,
          isVerified: false,
          role: 'user', // رول ڈیفائن کر دیا تاکہ ایڈمن لاجک الگ رہے
          createdAt: serverTimestamp() // سرور کا ٹائم استعمال کریں
        });
      }
    } catch (e) {
      console.error("Profile Error:", e);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#00FF88' }}>TEZRO</h2>
      <p style={{ color: '#888' }}>سپیر ایپ میں خوش آمدید</p>

      {/* گوگل بٹن */}
      <button 
        onClick={handleGoogleLogin} 
        style={styles.googleBtn}
        disabled={loading}
      >
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="G" />
        {loading ? "انتظار کریں..." : "Continue with Google"}
      </button>

      <div style={styles.divider}>یا موبائل نمبر استعمال کریں</div>

      {!isOtpSent ? (
        <>
          <input 
            type="tel" 
            placeholder="+923001234567" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          <button 
            onClick={handleSendOtp} 
            style={styles.actionBtn}
            disabled={loading}
          >
            {loading ? "بھیجا جا رہا ہے..." : "OTP کوڈ بھیجیں"}
          </button>
        </>
      ) : (
        <>
          <input 
            type="number" 
            placeholder="6 ہندسوں کا کوڈ لکھیں" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button 
            onClick={handleVerifyOtp} 
            style={styles.actionBtn}
            disabled={loading}
          >
            {loading ? "تصدیق ہو رہی ہے..." : "ویریفائی کریں"}
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

// اسٹائلز میں تھوڑی بہتری (Premium Look)
const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000508', padding: '20px', textAlign: 'center' },
  googleBtn: { width: '100%', maxWidth: '300px', padding: '12px', borderRadius: '12px', border: '1px solid #333', background: '#fff', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '20px' },
  divider: { color: '#444', fontSize: '12px', margin: '20px 0', textTransform: 'uppercase' },
  input: { width: '100%', maxWidth: '300px', padding: '15px', borderRadius: '12px', background: '#0a151b', border: '1px solid #1a2a33', color: '#fff', marginBottom: '15px', textAlign: 'center', fontSize: '16px' },
  actionBtn: { width: '100%', maxWidth: '300px', padding: '15px', borderRadius: '12px', background: '#00FF88', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }
};

export default Login;
