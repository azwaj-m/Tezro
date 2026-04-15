import React, { createContext, useContext, useState } from 'react';
import { processLogisticsOrder } from "../utils/LogisticsEngine";

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [appState, setAppState] = useState({ theme: 'dark', language: 'ur' });

  const placeFoodOrder = async (cart, location) => {
    // ہم انجن سے نیا فنکشن استعمال کر رہے ہیں
    return await processLogisticsOrder(cart, location);
  };

  return (
    <TezroContext.Provider value={{ appState, setAppState, placeFoodOrder }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
