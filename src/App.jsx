import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

// فیوچر پروف: یہاں آپ بعد میں اپنے نئے صفحات امپورٹ کریں گے
const Placeholder = ({ name }) => (
  <div className="min-h-screen bg-[#001a0f] flex flex-col items-center justify-center p-10 text-center">
    <h1 className="shiny-gold text-4xl font-black uppercase tracking-tighter mb-4">{name}</h1>
    <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-green-500 text-[10px] font-bold uppercase tracking-[4px]">
      Secure Encrypted Connection Active
    </div>
    <button onClick={() => window.history.back()} className="mt-10 text-[#FFD700] text-xs font-bold border-b border-[#FFD700]/30 pb-1">GO BACK</button>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/pay" element={<Placeholder name="Payment Gateway" />} />
        <Route path="/offers" element={<Placeholder name="Royal Offers" />} />
        <Route path="/history" element={<Placeholder name="Vault History" />} />
        <Route path="/profile" element={<Placeholder name="User Security" />} />
      </Routes>
    </Router>
  );
}

export default App;
