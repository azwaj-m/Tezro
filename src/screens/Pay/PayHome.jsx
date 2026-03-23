import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PayHome = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // اگر یوزر گیسٹ ہے تو اسے بیلنس 0 دکھائیں یا لاگ ان کا مشورہ دیں
  const isGuest = currentUser?.isGuest;

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-20">
      <h1 className="text-2xl font-black mb-2">TEZRO <span className="text-[#D4AF37]">PAY</span></h1>
      
      <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] mb-6">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Available Balance</p>
        <h2 className="text-3xl font-black">{isGuest ? 'Rs. 0.00' : 'Rs. 1,250,500.00'}</h2>
        {isGuest && (
          <button 
            onClick={() => navigate('/')}
            className="mt-4 text-[10px] bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-black uppercase"
          >
            Login to Add Money
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold opacity-50">Send Money</button>
        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold opacity-50">Request Pay</button>
      </div>
    </div>
  );
};

export default PayHome;
