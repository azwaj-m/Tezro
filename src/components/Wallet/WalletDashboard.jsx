import React from 'react';

const WalletDashboard = () => {
  const transactions = []; // اگر ڈیٹا خالی بھی ہو تو ایرر نہیں آئے گا

  return (
    <div className="bg-black/30 border border-[#d4af37]/20 rounded-2xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#d4af37] font-bold text-sm uppercase">Recent Activity</h3>
        <span className="text-[10px] text-gray-400">View History</span>
      </div>
      
      <div className="space-y-3">
        {transactions && transactions.length > 0 ? transactions.map((tx, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs text-white/80">{tx.title}</span>
            <span className="text-xs font-bold text-[#d4af37]">{tx.amount}</span>
          </div>
        )) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-[10px]">No recent transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
