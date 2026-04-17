import React, { createContext, useContext, useState } from 'react';

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Tezro User', status: 'Premium' });
  return (
    <TezroContext.Provider value={{ user, setUser }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
