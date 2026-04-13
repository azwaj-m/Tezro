import React, { createContext, useState, useContext, useEffect } from 'react';

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || 'passenger');
  const [activeRide, setActiveRide] = useState(null);
  const [rideHistory, setRideHistory] = useState(JSON.parse(localStorage.getItem('ride_history') || '[]'));

  // رائیڈ ہسٹری محفوظ کرنے کا فنکشن
  const saveRide = (rideData) => {
    const newHistory = [...rideHistory, { ...rideData, date: new Date().toLocaleString() }];
    setRideHistory(newHistory);
    localStorage.setItem('ride_history', JSON.stringify(newHistory));
  };

  return (
    <TezroContext.Provider value={{ userRole, setUserRole, activeRide, setActiveRide, rideHistory, saveRide }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
