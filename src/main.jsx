import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TezroProvider } from './context/TezroContext'
import { WalletProvider } from './context/WalletContext'
import { FoodProvider } from './context/FoodContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TezroProvider>
      <WalletProvider>
        <FoodProvider>
          <App />
        </FoodProvider>
      </WalletProvider>
    </TezroProvider>
  </React.StrictMode>,
)
