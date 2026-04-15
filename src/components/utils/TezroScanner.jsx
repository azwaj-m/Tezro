import React, { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

const TezroScanner = ({ isOpen, onClose, onScanResult }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(err => console.error("Camera error:", err));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
      <div className="absolute top-8 flex justify-between w-full px-8">
        <ShieldCheck className="text-[#D4AF37]" />
        <button onClick={onClose} className="text-white"><X size={30} /></button>
      </div>
      <div className="w-full max-w-sm aspect-square border-2 border-[#D4AF37] rounded-[3rem] overflow-hidden">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      </div>
      <p className="mt-6 text-[#D4AF37] font-bold text-xs uppercase tracking-widest">Scanning Active...</p>
    </div>
  );
};

export default TezroScanner;
