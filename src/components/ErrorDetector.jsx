import React from 'react';

class ErrorDetector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("DETECTOR LOG:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
          <div className="bg-red-900/20 border-2 border-red-500 p-8 rounded-[2rem] max-w-lg w-full">
            <h1 className="text-red-500 text-2xl font-black mb-4 uppercase italic">Critical System Error</h1>
            <div className="bg-black/50 p-4 rounded-xl border border-red-500/20 mb-6">
              <p className="text-white text-xs leading-relaxed">
                {this.state.error && this.state.error.toString()}
              </p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest active:scale-95"
            >
              Attempt System Reboot
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorDetector;
