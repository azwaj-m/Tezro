import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/Home/HomeScreen';

// عارضی پیجز (بعد میں یہ الگ ریپوزٹریز سے آئیں گے)
const Placeholder = ({ name }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <h2 className="text-2xl font-bold">{name} Service Coming Soon...</h2>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        
        {/* ان روٹس کو آپ کی ہوم اسکرین کے بٹنز سے جوڑا گیا ہے */}
        <Route path="/rides" element={<Placeholder name="Ride Master" />} />
        <Route path="/finance" element={<Placeholder name="Finance Hub" />} />
        <Route path="/pro-help" element={<Placeholder name="Pro Help" />} />
        <Route path="/mall" element={<Placeholder name="Tezro Mall" />} />
        <Route path="/food" element={<Placeholder name="Food Delivery" />} />
        <Route path="/hotels" element={<Placeholder name="Hotel Booking" />} />
        <Route path="/health" element={<Placeholder name="Health Care" />} />
        <Route path="/vault" element={<Placeholder name="Security Vault" />} />
      </Routes>
    </Router>
  );
}

export default App;
