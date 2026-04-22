import { startGlobalVoice } from '../../../utils/GlobalVoiceEngine';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ShieldAlert, Power } from 'lucide-react';

const VoiceControl = () => {
  const navigate = useNavigate();

  const handleSystemCommand = (cmd) => {
    if(cmd === 'lock') {
        alert("Tezro Secure: Mobile App Interface Locked!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20">
          <Mic onClick={() => startGlobalVoice(navigate)} className="text-[#D4AF37] cursor-pointer active:scale-150 transition-transform" size={40} />
        </div>
        <h1 className="text-2xl font-black">VOICE BIOMETRICS</h1>
        <p className="text-zinc-500 text-xs mt-2 uppercase">Control your device with encrypted voice logs</p>
      </div>

      <div className="space-y-4">
        <button onClick={() => handleSystemCommand('lock')} className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex items-center justify-between">
           <div className="flex items-center gap-4">
              <ShieldAlert className="text-[#D4AF37]" />
              <span className="font-bold text-sm">Activate Voice Lock</span>
           </div>
           <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default VoiceControl;
