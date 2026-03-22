import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './neon.css'

// Loader کو ہٹانے کا فنکشن جب React لوڈ ہو جائے
window.addEventListener('load', () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
