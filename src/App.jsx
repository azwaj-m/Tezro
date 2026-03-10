import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- ENGINES (The Brain) ---
import { initializeSecurity } from './security/TezroCore';
import { startAntiFraud } from './finance/AntiFraudEngine.';
import { initVoiceEngine } from './utils/VoiceEngine';
import { startAIDispatcher } from './utils/AIDispatcher';

// --- LAYOUTS ---
import WebsiteLayout from './website/WebsiteLayout';
import AppShell from './AppShell';
import BottomNav from './components/BottomNav';

// --- PAGES (Lazy Loading for Performance) ---
const HomePage = lazy(() => import('./screens/HomeScreen'));
const UniversalBankingHub = lazy(() => import('./screens/UniversalBankingHub'));
const Login = lazy(() => import('./screens/Auth/Login'));
const VendorDashboard = lazy(() => import('./screens/VendorDashboard'));

// لوڈنگ اسکرین
const LoadingScreen = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', color: '#FFD700' }}>
    <div className="spinner"></div>
    <p style={{ marginLeft: '15px', fontWeight: 'bold' }}>TEZRO SECURE SYSTEMS STARTING...</p>
  </div>
);

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // ایپ سٹارٹ ہوتے ہی تمام سسٹمز کو ایکٹیویٹ کریں
    console.log("🛡️ Initializing Tezro Super App Engines...");
    initializeSecurity(); 
    startAntiFraud();
    initVoiceEngine();
    startAIDispatcher();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
          <Routes>
            
            {/* 🌐 سیکشن 1: پبلک ویب سائٹ */}
            <Route element={<WebsiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<div>About Tezro</div>} />
            </Route>

            {/* 🔐 سیکشن 2: آتھنٹیکیشن */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/app" />} />

            {/* 📱 سیکشن 3: سپر ایپ (پروٹیکٹڈ) */}
            <Route 
              path="/app/*" 
              element={user ? (
                <div className="app-main">
                  <AppShell />
                  <Routes>
                    <Route index element={<HomeScreen />} />
                    <Route path="banking" element={<UniversalBankingHub />} />
                    <Route path="vendor" element={<VendorDashboard />} />
                  </Routes>
                  <BottomNav />
                </div>
              ) : (
                <Navigate to="/login" />
              )} 
            />

            {/* 404 ری ڈائریکٹ */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
