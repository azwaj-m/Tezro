import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- ENGINES (The Brain) ---
import { initializeSecurity } from './security/TezroCore';
import { startAntiFraud } from './finance/AntiFraudEngine';
import { initVoiceEngine } from './utils/VoiceEngine';
import { startAIDispatcher } from './utils/AIDispatcher';

// --- LAYOUTS ---
import AppShell from './AppShell';

function App() {
  useEffect(() => {
    // سسٹم کو بوٹ اپ کریں
    initializeSecurity();
    startAntiFraud();
    initVoiceEngine();
    startAIDispatcher();
  }, []);

  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
