import React, { createContext, useContext, useState } from 'react';
import { 
  RideEngine, 
  WalletEngine, 
  LogisticsEngine, 
  SecurityEngine, 
  VendorEngine 
} from '../utils/TezroMasterEngine';

export const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // تمام انجنز کو ایک ہی کنٹیکسٹ میں جمع کر دیا گیا ہے
  const value = {
    user,
    setUser,
    ride: RideEngine,
    wallet: WalletEngine,
    logistics: LogisticsEngine,
    security: SecurityEngine,
    vendor: VendorEngine
  };

  return (
    <TezroContext.Provider value={value}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
