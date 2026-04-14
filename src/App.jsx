
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TezroProvider } from './context/TezroContext';

import { AuthProvider } from './context/AuthContext';

import { WalletProvider } from './context/WalletContext';



// Pages Import (Corrected Paths)

import HomeScreen from './pages/HomeScreen';

import RideMaster from './pages/RideMaster';

import FinanceHub from './pages/FinanceHub';

import BookingHub from './pages/BookingHub';

import Register from './pages/Register';

import VaultScreen from './pages/VaultScreen';

import NotificationScreen from './pages/NotificationScreen';



// Components

import Navbar from './components/Navigation/Navbar';

import BottomNav from './components/BottomNav';

import Sidebar from './components/Navigation/Sidebar';



function App() {

  return (

    <Router>

      <AuthProvider>

        <TezroProvider>

          <WalletProvider>

            <div className="min-h-screen bg-[#000d08] text-white">

              <Navbar />

              <Sidebar />

              

              <main className="pb-24 pt-20 px-4 max-w-md mx-auto">

                <Routes>

                  <Route path="/" element={<HomeScreen />} />

                  <Route path="/ride" element={<RideMaster />} />

                  <Route path="/finance" element={<FinanceHub />} />

                  <Route path="/bookings" element={<BookingHub />} />

                  <Route path="/register" element={<Register />} />

                  <Route path="/vault" element={<VaultScreen />} />

                  <Route path="/notifications" element={<NotificationScreen />} />

                </Routes>

              </main>



              <BottomNav />

            </div>

          </WalletProvider>

        </TezroProvider>

      </AuthProvider>

    </Router>

  );

}



export default App;

