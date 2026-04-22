import React, { useEffect, useState } from 'react';
import { Fingerprint, ShieldCheck, Loader2 } from 'lucide-react';

const SecurityScan = ({ isActive, onComplete }) => {
  const [status, setStatus] = useState('scanning');

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setStatus('verifying'), 2000);
      setTimeout(() => {
        setStatus('success');
        setTimeout(onComplete, 1000);
      }, 3500);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-2xl">
      <div className="text-center space-y-8 animate-in zoom-in duration-300">

        {/* Holographic Scanner Circle */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-[#FFD700]/20 rounded-full animate-ping"></div>
          <div className="absolute inset-4 border border-[#FFD700]/40 rounded-full animate-pulse"></div>

          <div className="relative z-10 text-[#FFD700]">
            {status === 'scanning' && <Fingerprint size={80} className="animate-pulse" />}
            {status === 'verifying' && <Loader2 size={80} className="animate-spin" />}
            {status === 'success' && <ShieldCheck size={80} className="text-green-500 animate-bounce" />}
          </div>

          {/* Scanning Line */}
          {status === 'scanning' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-scan-move"></div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-[#FFD700] text-xl font-black uppercase tracking-[4px]">
            {status === 'scanning' && 'بائیومیٹرک اسکیننگ'}
            {status === 'verifying' && 'تصدیق جاری ہے'}
            {status === 'success' && 'تصدیق مکمل'}
          </h3>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
            Military-Grade Encryption Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityScan;
