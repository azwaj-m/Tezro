import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { app } from './firebase/config'; // آپ کی موجودہ فائر بیس کنفگ
import AppShell from './AppShell';

// 📡 Admin Monitoring Bridge
const securityReport = (action) => {
  try {
    const analytics = getAnalytics(app);
    logEvent(analytics, 'security_heartbeat', {
      action: action,
      timestamp: new Date().toISOString(),
      origin: 'USER_APP',
      status: 'LIVE_MONITORING'
    });
    console.log("🛡️ Tezro Security: Heartbeat sent to Admin.");
  } catch (error) {
    console.error("Security Bridge Error:", error);
  }
};

function App() {
  useEffect(() => {
    // جیسے ہی ایپ کھلے، ایڈمن کو اطلاع دیں
    securityReport("USER_APP_INITIALIZED");
    
    // سیکیورٹی چیک کا وقفہ (اختیاری: ہر 5 منٹ بعد ایڈمن کو بتاتا رہے کہ ایپ محفوظ ہے)
    const interval = setInterval(() => securityReport("STILL_ACTIVE"), 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
