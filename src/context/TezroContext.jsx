
import React, { createContext, useContext, useState } from 'react';

import { placeFoodOrder } from "../utils/LogisticsEngine";



const TezroContext = createContext();



export const TezroProvider = ({ children }) => {

  const [userStatus, setUserStatus] = useState("active");

  const [appState, setAppState] = useState({ theme: 'dark', language: 'ur' });



  // تمام سروسز کے لیے ایک ہی فنکشن جو لاجسٹک انجن استعمال کرے گا

  const executeOrder = async (cart, location) => {

    return await placeFoodOrder(cart, location);

  };



  const value = {

    userStatus,

    setUserStatus,

    appState,

    setAppState,

    executeOrder,

    placeFoodOrder // اسے بھی ایکسپورٹ کر رہے ہیں تاکہ پرانے کمپوننٹس نہ ٹوٹیں

  };



  return (

    <TezroContext.Provider value={value}>

      {children}

    </TezroContext.Provider>

  );

};



export const useTezro = () => useContext(TezroContext);

