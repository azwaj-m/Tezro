import React, { createContext, useContext, useState } from 'react';
import { processLogisticsOrder } from "../utils/LogisticsEngine";

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [appState, setAppState] = useState({ theme: 'dark', language: 'ur' });

  const executeOrder = async (cart, location) => {
    return await processLogisticsOrder(cart, location);
  };

  return (
    <TezroContext.Provider value={{ appState, setAppState, executeOrder }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
