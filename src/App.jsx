import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🛡️ سیکیورٹی اور مانیٹرنگ امپورٹس (درست پاتھ کے ساتھ)
import { startGhostMonitoring } from './security/GhostData'; 
import { initSecurityShield } from './security/FinalSecurityShield';

// 🔥 فائر بیس امپورٹ (اب نئے 'src/firebase' پاتھ کے ساتھ)
import * as FirebaseModule from './firebase'; 

// 📱 اسکرینز امپورٹ کریں
import HomeScreen from './screens/HomeScreen';
import RideScreen from './screens/RideDashboard'; 
import FoodScreen from './screens/FoodDashboard';
import ShopScreen from './screens/Shop';
import ParcelScreen from './screens/Logistics';
import VaultScreen from './screens/UniversalBankingHub';

// 🛠️ MASTER CONTROL
const ACTIVE_MODULE = "ALL"; 

function App() {
  
  useEffect(() => {
    try {
      // 1. سیکیورٹی شیلڈ کو ایکٹیویٹ کریں
      initSecurityShield();

      // 2. ایڈمن کے لیے گھوسٹ مانیٹرنگ شروع کریں
      startGhostMonitoring("user_session_active"); 

      console.log(`🛡️ Tezro Ecosystem: Initialized on ${ACTIVE_MODULE} mode.`);
      
      // 3. لائیو سگنل (Heartbeat)
      const heartbeat = setInterval(() => {
        console.log("📡 Device Status: Online & Secured");
      }, 300000); // ہر 5 منٹ بعد

      return () => clearInterval(heartbeat);
    } catch (error) {
      console.error("Critical Security Failure:", error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* تمام فیچرز کے روٹس */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideScreen />} />
        <Route path="/food" element={<FoodScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/parcel" element={<ParcelScreen />} />
        <Route path="/banking" element={<VaultScreen />} />
        
        {/* غلط یو آر ایل کی صورت میں ہوم پر واپسی */}
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
