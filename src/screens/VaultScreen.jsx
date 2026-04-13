
import React, { useState } from 'react';

import { ShieldCheck, Search, Hash, user as UserIcon, Smartphone } from 'lucide-react';

import { billProviders, banks } from '../utils/bankData';

import { processPayment } from '../utils/WalletEngine';

import SecurityScan from '../components/vault/SecurityScan';

import ReceiptModal from '../components/vault/ReceiptModal';



const VaultScreen = () => {

  const [activeTab, setActiveTab] = useState('bills');

  const [selectedEntity, setSelectedEntity] = useState(null);

  const [amount, setAmount] = useState('');

  const [destinationAccount, setDestinationAccount] = useState(''); // نیا فیلڈ: اکاؤنٹ یا کنزیومر نمبر

  const [isScanning, setIsScanning] = useState(false);

  const [showReceipt, setShowReceipt] = useState(false);

  const [currentTxn, setCurrentTxn] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');



  const handlePaymentExecution = () => {

    // ویلیڈیشن: چیک کریں کہ اکاؤنٹ نمبر اور رقم موجود ہے

    if (!destinationAccount || destinationAccount.length < 5) {

      alert("براہ کرم درست اکاؤنٹ یا کنزیومر نمبر درج کریں");

      return;

    }

    if (!amount || parseFloat(amount) <= 0) {

      alert("براہ کرم درست رقم درج کریں");

      return;

    }



    setIsScanning(true);

    

    setTimeout(() => {

      // اب انجن کو منزل کا پتہ (destinationAccount) بھی بھیجا جا رہا ہے

      const receipt = processPayment(selectedEntity, amount, destinationAccount);

      setCurrentTxn(receipt);

      setIsScanning(false);

      setShowReceipt(true);

    }, 3000);

  };



  return (

    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-24">

      {/* Header & Search (وہی پرانا حصہ) */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-black tracking-tighter text-[#FFD700]">VAULT</h1>

          <p className="text-[10px] text-gray-500 uppercase tracking-[4px]">Secure Gateway</p>

        </div>

        <div className="bg-white/5 p-3 rounded-2xl border border-white/10">

          <ShieldCheck className="text-green-500" />

        </div>

      </div>



      {/* Tabs */}

      <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-2xl border border-white/5">

        <button onClick={() => setActiveTab('bills')} className={`flex-1 py-3 rounded-xl text-[11px] font-black uppercase transition-all ${activeTab === 'bills' ? 'bg-[#FFD700] text-black' : 'text-gray-500'}`}>بلز / ادائیگی</button>

        <button onClick={() => setActiveTab('banks')} className={`flex-1 py-3 rounded-xl text-[11px] font-black uppercase transition-all ${activeTab === 'banks' ? 'bg-[#FFD700] text-black' : 'text-gray-500'}`}>بینک ٹرانسفر</button>

      </div>



      {/* Grid Content (وہی پرانا حصہ) */}

      <div className="grid grid-cols-3 gap-4">

        {(activeTab === 'bills' ? Object.values(billProviders).flat() : banks)

          .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

          .map(item => (

            <button key={item.id} onClick={() => setSelectedEntity(item)} className="bg-white/5 border border-white/10 p-4 rounded-[2.5rem] flex flex-col items-center gap-2">

              <img src={item.logo} alt={item.name} className="w-10 h-10 object-contain" />

              <span className="text-[9px] font-bold text-gray-400">{item.shortName}</span>

            </button>

          ))

        }

      </div>



      {/* Payment Overlay - یہاں اصل کام ہوا ہے */}

      {selectedEntity && (

        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-4">

          <div className="w-full max-w-md bg-[#00150c] border border-white/10 rounded-[3rem] p-8 space-y-6">

            <div className="text-center">

              <img src={selectedEntity.logo} className="w-16 h-16 mx-auto mb-2" />

              <h2 className="text-xl font-black">{selectedEntity.name}</h2>

              <span className="text-[10px] text-[#FFD700] uppercase tracking-widest">{activeTab === 'bills' ? 'Utility Bill' : 'Bank Transfer'}</span>

            </div>



            <div className="space-y-4">

              {/* اکاؤنٹ نمبر یا کنزیومر آئی ڈی کا ان پٹ */}

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

                <label className="text-[9px] text-gray-500 uppercase font-black block mb-2">

                  {activeTab === 'bills' ? 'Consumer Number / Reference ID' : 'Account Number / IBAN'}

                </label>

                <div className="flex items-center gap-3">

                  <Hash className="w-4 h-4 text-[#FFD700]" />

                  <input 

                    type="text" 

                    value={destinationAccount}

                    onChange={(e) => setDestinationAccount(e.target.value)}

                    placeholder={activeTab === 'bills' ? "14 ہندسوں کا نمبر" : "اکاؤنٹ نمبر درج کریں"}

                    className="w-full bg-transparent text-lg font-bold outline-none text-white"

                  />

                </div>

              </div>



              {/* رقم کا ان پٹ */}

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">

                <label className="text-[9px] text-gray-500 uppercase font-black block mb-1">رقم (PKR)</label>

                <input 

                  type="number" 

                  value={amount}

                  onChange={(e) => setAmount(e.target.value)}

                  placeholder="0.00" 

                  className="w-full bg-transparent text-center text-4xl font-black outline-none text-[#FFD700]"

                />

              </div>

            </div>



            <button onClick={handlePaymentExecution} className="w-full bg-[#FFD700] text-black py-5 rounded-2xl font-black uppercase tracking-widest">

              ٹرانزیکشن مکمل کریں

            </button>

            <button onClick={() => { setSelectedEntity(null); setDestinationAccount(''); setAmount(''); }} className="w-full text-gray-400 text-[10px] font-bold uppercase">کینسل کریں</button>

          </div>

        </div>

      )}



      {/* Modals (Security & Receipt) */}

      <SecurityScan isActive={isScanning} onComplete={() => {}} />

      {currentTxn && <ReceiptModal isOpen={showReceipt} transaction={currentTxn} onClose={() => { setShowReceipt(false); setSelectedEntity(null); setAmount(''); setDestinationAccount(''); }} />}

    </div>

  );

};



export default VaultScreen;

