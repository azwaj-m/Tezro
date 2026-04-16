import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TezroProvider } from './context/TezroContext' // اگر کنٹیکسٹ کا فولڈر الگ ہے

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TezroProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TezroProvider>
  </React.StrictMode>,
)
// Build Fix: Thu Apr 16 12:43:45 PKT 2026
