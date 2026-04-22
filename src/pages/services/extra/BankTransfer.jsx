import React, { useState } from 'react';
import { banks } from '../../../utils/bankData';
import { ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { useWallet } from '../../../context/WalletContext'; // والٹ ہک کا اضافہ

const BankTransfer = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  // والٹ کانٹیکسٹ سے ڈیٹا حاصل کریں
  const { transactions, executePayment } = useWallet();

  const handleTransfer = async () => {
    if (!amount || !account) {
      alert("براہ کرم اکاؤنٹ نمبر اور رقم درج کریں");
      return;
    }

    const res = await executePayment(Number(amount), 'Bank Transfer');
    if (res?.success) {
      alert(`منتقلی کامیاب! آئی ڈی: ${res.txnId}`);
      setAmount('');
      setAccount('');
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28">
      {/* ہیڈر کارڈ */}
      <div className="dark-gold-shiny p-6 rounded-[30px] flex items-center justify-between mb-8">
        <div>
          <h2 className="text-black font-black uppercase text-lg">Bank Transfer</h2>
          <p className="text-black/60 text-[10px] font-bold uppercase">1LINK / MNET Secure Gateway</p>
        </div>
        <ShieldCheck size={40} className="text-black/40" />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">بینک منتخب کریں</label>

        {/* بینک گرڈ */}
        <div className="grid grid-cols-4 gap-3">
          {banks.slice(0, 12).map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
              className={`p-2 rounded-2xl border flex flex-col items-center gap-2 transition-all ${selectedBank?.id === bank.id ? 'border-gold bg-gold/10' : 'border-white/5 bg-white/5'}`}
            >
              <img src={bank.logo} className="w-8 h-8 rounded-full object-contain bg-white p-1" alt={bank.name} />
              <span className="text-[8px] font-bold truncate w-full text-center">{bank.shortName}</span>
            </button>
          ))}
        </div>

        {/* ان پٹ فیلڈز (صرف بینک سلیکٹ ہونے پر) */}
        {selectedBank && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="اکاؤنٹ نمبر یا IBAN"
              className="w-full bg-white/5 p-5 rounded-3xl border border-white/10 outline-none focus:border-gold"
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="رقم (PKR)"
              className="w-full bg-white/5 p-5 rounded-3xl border border-white/10 outline-none focus:border-gold"
            />
            <button
              onClick={handleTransfer}
              className="w-full py-5 royal-gold-shiny rounded-[30px] text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <ArrowRightLeft size={20} /> تصدیق اور منتقلی
            </button>
          </div>
        )}

        {/* حالیہ ٹرانزیکشنز کا سیکشن */}
        <div className="mt-12">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-4">حالیہ ٹرانزیکشنز</h3>
          <div className="space-y-3">
            {transactions && transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center animate-in fade-in zoom-in-95">
                  <div>
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase">{txn.status}</p>
                    <p className="text-[8px] text-white/40">{txn.transactionId}</p>
                  </div>
                  <p className="font-black text-sm">Rs. {txn.amount}</p>
                </div>
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl text-center">
                <p className="text-[10px] text-white/20 italic uppercase tracking-widest">کوئی ٹرانزیکشن موجود نہیں ہے</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
