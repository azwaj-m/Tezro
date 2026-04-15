
import React, { useEffect, useState } from 'react';

import { ShieldCheck, Lock, EyeOff } from 'lucide-react';



const SecurityStatus = () => {

  const [isSecure, setIsSecure] = useState(false);



  useEffect(() => {

    // مصنوعی سیکیورٹی چیک

    setTimeout(() => setIsSecure(true), 2000);

  }, []);



  return (

    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">

      <div className={isSecure ? "text-green-500" : "text-yellow-500 animate-pulse"}>

        {isSecure ? <ShieldCheck size={16} /> : <Lock size={16} />}

      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">

        {isSecure ? "Tezro Encrypted" : "Scanning Connection..."}

      </span>

    </div>

  );

};



export default SecurityStatus;

