import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TezroProvider } from './context/TezroContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TezroProvider>
      <App />
    </TezroProvider>
  </React.StrictMode>,
)
