import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RideMaster from './screens/RideMaster';
import { TezroProvider } from './context/TezroContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TezroProvider>
      <Router>
        <RideMaster />
      </Router>
    </TezroProvider>
  </React.StrictMode>
);
