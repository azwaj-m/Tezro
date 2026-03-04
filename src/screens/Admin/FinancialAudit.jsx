import React from 'react';
import { useAuditData } from '../../hooks/useAuditData';

const FinancialAudit = () => {
    const { dailyRevenue, transactions, blockedUsers } = useAuditData();

    return (
        <div className="p-8 bg-[#020202] text-[#F3E5AB]">
            <header className="flex justify-between items-center mb-10 border-b border-[#D4AF37]/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black italic text-white">SYSTEM AUDIT LOG</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Real-time Financial Surveillance</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase">Download CSV</button>
                    <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-xs font-bold uppercase">Print PDF Report</button>
                </div>
            </header>

            {/* پرافٹ کارڈز */}
            <div className="grid grid-cols-3 gap-8 mb-10">
                <div className="bg-[#111] p-6 rounded-[30px] border border-[#39FF14]/20">
                    <p className="text-[9px] text-gray-500 uppercase font-black">Net Commission (Profit)</p>
                    <h2 className="text-3xl font-black text-[#39FF14]">PKR {dailyRevenue.commission}</h2>
                </div>
                <div className="bg-[#111] p-6 rounded-[30px] border border-[#D4AF37]/20">
                    <p className="text-[9px] text-gray-500 uppercase font-black">Virtual Card Fees</p>
                    <h2 className="text-3xl font-black text-[#D4AF37]">PKR {dailyRevenue.cardFees}</h2>
                </div>
                <div className="bg-[#111] p-6 rounded-[30px] border border-red-500/20">
                    <p className="text-[9px] text-gray-500 uppercase font-black">Blocked Fraudulent Attempts</p>
                    <h2 className="text-3xl font-black text-red-500">{blockedUsers.length}</h2>
                </div>
            </div>

            {/* ٹرانزیکشن ٹیبل (سٹینڈرڈ کوالٹی) */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest">
                        <tr>
                            <th className="p-6">Transaction ID</th>
                            <th>User/Vendor</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {transactions.map(tx => (
                            <tr key={tx.id} className="border-t border-white/5 hover:bg-white/2 transition-all">
                                <td className="p-6 font-mono text-[10px] text-gray-400">{tx.id}</td>
                                <td>{tx.userName}</td>
                                <td>{tx.category}</td>
                                <td className="font-bold text-white">Rs. {tx.amount}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black ${
                                        tx.status === 'SUCCESS' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinancialAudit;
