import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';
import * as FirebaseModule from './firebase/config'; 
import AppShell from './AppShell';

// 🛠️ MASTER CONTROL SWITCH
// یہاں آپ اپنی ضرورت کے مطابق تبدیل کر سکتے ہیں: "WALLET", "RIDE", "FOOD", "ALL"
const ACTIVE_MODULE = "WALLET"; 

// 📡 Admin Monitoring Bridge
const securityReport = (action) => {
  try {
    const analytics = getAnalytics(FirebaseModule.app);
    logEvent(analytics, 'security_heartbeat', {
      action: action,
      module: ACTIVE_MODULE, // اب ایڈمن کو یہ بھی پتہ چلے گا کہ کون سا ماڈیول آن ہے
      timestamp: new Date().toISOString(),
      origin: 'USER_APP',
      status: 'LIVE_MONITORING'
    });
    console.log(`🛡️ Tezro Security: Heartbeat (${ACTIVE_MODULE}) sent to Admin.`);
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
      {/* ہم ACTIVE_MODULE کو بطور 'prop' پاس کر رہے ہیں تاکہ AppShell کو پتہ ہو کیا دکھانا ہے */}
      <AppShell activeModule={ACTIVE_MODULE} />
    </Router>
  );
}

export default App;
