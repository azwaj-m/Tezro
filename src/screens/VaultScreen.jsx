import React, { useEffect, useState } from 'react';
import { ShieldCheck, History } from 'lucide-react';

const VaultScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // رائیڈ ہسٹری لوڈ کریں
    const savedHistory = JSON.parse(localStorage.getItem('ride_history') || '[]');
    setHistory(savedHistory);
  }, []);

  return (
    <div className="p-6 bg-[#000d08] min-h-screen text-white">
      <h1 className="text-[#FFD700] text-2xl font-black italic mb-6">سیف ہسٹری</h1>
      {history.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">کوئی ریکارڈ موجود نہیں ہے</div>
      ) : (
        history.map((ride, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-2xl mb-4 border-l-4 border-[#FFD700]">
            <p className="text-xs text-[#FFD700]">{ride.date}</p>
            <p className="font-bold">Rs. {ride.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VaultScreen;
