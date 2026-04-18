import React, { createContext, useContext, useState } from 'react';
import { banks } from '../utils/bankData';
import { TezroMasterEngine } from '../utils/TezroMasterEngine';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(25000); // ڈیفالٹ بیلنس
  const [transactions, setTransactions] = useState([]);

  // سیکیورٹی پروف پیمنٹ فنکشن
  const executePayment = async (amount, service) => {
    try {
      // ماسٹر انجن سے سیکیورٹی چیک
      const result = await TezroMasterEngine.initiateTransaction({ amount, serviceType: service });
      
      if (balance >= amount) {
        setBalance(prev => prev - amount);
        setTransactions(prev => [result, ...prev]);
        return { success: true, txnId: result.transactionId };
      } else {
        alert("والٹ میں رقم کم ہے!");
        return { success: false };
      }
    } catch (error) {
      console.error("Payment Failed:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, executePayment }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
