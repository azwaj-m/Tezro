import React, { createContext, useContext, useState } from 'react';
import { placeFoodOrder } from '../utils/LogisticsEngine';

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState('active');

  const value = {
    userStatus,
    setUserStatus,
    placeFoodOrder // اب یہ یہاں سے ایکسپورٹ ہوگا
  };

  return (
    <TezroContext.Provider value={value}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
