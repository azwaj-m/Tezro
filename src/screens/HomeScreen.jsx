import React from 'react';
import MobileRecharge from '../components/MobileRecharge';
import TransactionsList from '../components/TransactionsList';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="mt-20">
        <h1 className="text-[#D4AF37] text-xl font-bold">Welcome, Chief</h1>
        <p className="text-gray-400 text-sm">System Status: <span className="text-green-500">Active</span></p>
        
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-[#D4AF37]/20 to-black p-6 rounded-3xl border border-[#D4AF37]/30 my-6">
          <p className="text-xs uppercase opacity-60">Total Balance</p>
          <h2 className="text-3xl font-black">Rs. 1,250,500</h2>
        </div>

        {/* Components */}
        <MobileRecharge />
        <div className="mt-6">
           <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Recent Activity</h3>
           <TransactionsList />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
