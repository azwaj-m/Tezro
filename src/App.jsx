import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';
import * as FirebaseModule from './firebase/config'; 

// تمام اسکرینز امپورٹ کریں
import HomeScreen from './components/HomeScreen';
import RideScreen from './components/Ride'; 
import FoodScreen from './components/Food';
import ShopScreen from './components/Shop';
import ParcelScreen from './components/Parcel';
import VaultScreen from './components/Vault';

// 🛠️ MASTER CONTROL SWITCH - اب اسے "ALL" پر سیٹ کر دیا ہے
const ACTIVE_MODULE = "ALL"; 

// 📡 Admin Monitoring Bridge
const securityReport = (action) => {
  try {
    // چونکہ ہم نے فائر بیس کو خاموش کیا ہوا ہے، اس لیے ہم اسے صرف کنسول میں دکھائیں گے
    // تاکہ بلڈ فیل نہ ہو
    console.log(`🛡️ Tezro Security: ${action} (${ACTIVE_MODULE})`);
  } catch (error) {
    console.error("Security Bridge Error:", error);
  }
};

function App() {
  useEffect(() => {
    securityReport("USER_APP_INITIALIZED");
    const interval = setInterval(() => securityReport("STILL_ACTIVE"), 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        {/* اب تمام راستے ہر وقت دستیاب ہوں گے */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideScreen />} />
        <Route path="/food" element={<FoodScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/parcel" element={<ParcelScreen />} />
        <Route path="/banking" element={<VaultScreen />} />
        
        {/* اگر کوئی غلط ایڈریس لکھے تو ہوم پر واپس بھیج دیں */}
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
