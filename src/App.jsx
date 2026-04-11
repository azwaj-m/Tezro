import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

// سیکیور اور شاہانہ صفحات کے شیلف (Placeholders)
const SecurePage = ({ title }) => (
  <div className="min-h-screen bg-[#001a0f] pt-44 px-8 text-center">
    <h1 className="shiny-gold text-3xl font-black uppercase tracking-tighter">{title}</h1>
    <div className="mt-6 p-4 rounded-3xl bg-[#FFD700]/5 border border-[#FFD700]/10 text-green-400 text-[10px] font-bold uppercase tracking-[3px]">
      End-to-End Encrypted Terminal
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/notifications" element={<SecurePage title="Alert Center" />} />
        <Route path="/profile-settings" element={<SecurePage title="Profile Settings" />} />
        <Route path="/transactions" element={<SecurePage title="Vault Transactions" />} />
        <Route path="/pay" element={<SecurePage title="Payment Gateway" />} />
        <Route path="/offers" element={<SecurePage title="Royal Offers" />} />
        <Route path="/history" element={<SecurePage title="Vault History" />} />
      </Routes>
    </Router>
  );
}

export default App;
