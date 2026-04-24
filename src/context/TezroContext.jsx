import React, { createContext, useState, useContext } from 'react';

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Guest User", balance: 5000 });
  const [activeService, setActiveService] = useState(null);

  return (
    <TezroContext.Provider value={{ user, setUser, activeService, setActiveService }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
