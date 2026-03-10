import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeSecurity } from './security/TezroCore';
import { startAntiFraud } from './finance/AntiFraudEngine';
import { initVoiceEngine } from './utils/VoiceEngine';
import { startAIDispatcher } from './utils/AIDispatcher';
import AppShell from './AppShell';

function App() {
  useEffect(() => {
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
