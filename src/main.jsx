import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TezroProvider } from './context/TezroContext'
import { WalletProvider } from './context/WalletContext'

// ایرر پکڑنے والا جاسوس کوڈ (Error Boundary)
class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white', whiteSpace: 'pre-wrap' }}>
          <h1>🛑 App Crashed!</h1>
          <p>{this.state.error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorHandler>
      <TezroProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </TezroProvider>
    </ErrorHandler>
  </React.StrictMode>,
)
