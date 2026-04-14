import React, { createContext, useContext, useState } from 'react';
import { placeFoodOrder } from '../utils/LogisticsEngine';
import { fetchHotels } from '../utils/HotelEngine';

const TezroContext = createContext();

export const TezroProvider = ({ children }) => {
  const [activeService, setActiveService] = useState(null);
  const [cart, setCart] = useState([]);

  const globalServices = {
    food: {
      placeOrder: placeFoodOrder,
      trackOrder: (id) => console.log("Tracking:", id)
    },
    hotels: {
      search: fetchHotels
    },
    appTheme: {
      primary: '#D4AF37', // Golden
      bg: '#000000'       // Black
    }
  };

  return (
    <TezroContext.Provider value={{ globalServices, activeService, setActiveService, cart, setCart }}>
      {children}
    </TezroContext.Provider>
  );
};

export const useTezro = () => useContext(TezroContext);
