import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TezroProvider } from './context/TezroContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TezroProvider>
      <App />
    </TezroProvider>
  </React.StrictMode>,
)
// Last Build: Tue Apr 21 10:22:45 PKT 2026
