import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  // 1. گوگل لاگ ان
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
      navigate('/'); // ہوم پیج پر بھیج دیں
    } catch (error) {
      alert("Google Login Error: " + error.message);
    }
  };

  // 2. فون نمبر لاگ ان (OTP)
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handleSendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      alert("OTP بھیج دیا گیا ہے!");
    } catch (error) {
      alert("SMS Error: " + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      await createUserProfile(result.user);
      navigate('/');
    } catch (error) {
      alert("غلط کوڈ! دوبارہ کوشش کریں۔");
    }
  };

  // یوزر کا پروفائل فائر بیس میں بنانا (بغیر اضافی ریکوائرمنٹس کے)
  const createUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || "",
        phone: user.phoneNumber || "",
        balance: 0,
        isVerified: false, // یہ ڈیل کے وقت ٹرو ہوگا
        createdAt: new Date()
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#D4AF37' }}>Tezro Super App</h2>
      <p style={{ color: '#888' }}>لاگ ان کریں اور سروسز سے فائدہ اٹھائیں</p>

      {/* گوگل بٹن */}
      <button onClick={handleGoogleLogin} style={styles.googleBtn}>
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="G" />
        Continue with Google
      </button>

      <div style={styles.divider}>یا موبائل نمبر استعمال کریں</div>

      {/* فون نمبر ان پٹ */}
      {!isOtpSent ? (
        <>
          <input 
            type="text" 
            placeholder="+923001234567" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSendOtp} style={styles.actionBtn}>OTP کوڈ بھیجیں</button>
        </>
      ) : (
        <>
          <input 
            type="text" 
            placeholder="6 ہندسوں کا کوڈ لکھیں" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleVerifyOtp} style={styles.actionBtn}>ویریفائی کریں</button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', padding: '20px', textAlign: 'center' },
  googleBtn: { width: '100%', maxWidth: '300px', padding: '12px', borderRadius: '10px', border: '1px solid #444', background: '#fff', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '20px' },
  divider: { color: '#666', fontSize: '12px', margin: '20px 0' },
  input: { width: '100%', maxWidth: '300px', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: '#fff', marginBottom: '15px', textAlign: 'center' },
  actionBtn: { width: '100%', maxWidth: '300px', padding: '15px', borderRadius: '10px', background: '#D4AF37', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
};

export default Login;
