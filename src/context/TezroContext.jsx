import React, { createContext, useState, useEffect } from 'react';
import { TezroCore } from '../utils/TezroCore';

export const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    user: null,
    activeService: null,
    isShieldActive: true,
    walletBalance: 0
  });

  const runService = async (name, data) => {
    return await TezroCore.executeAction(name, data);
  };

  return (
    <TezroContext.Provider value={{ ...appState, runService }}>
      {children}
    </TezroContext.Provider>
  );
};
