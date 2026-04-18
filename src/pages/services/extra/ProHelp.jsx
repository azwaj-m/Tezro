import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Stethoscope, Scissors, HardHat, Droplets, Zap, Truck, UserCheck } from 'lucide-react';

const proServices = [
  { id: 'dr', name: 'ڈاکٹر', icon: <Stethoscope />, img: '/assets/Doctor.jpg' },
  { id: 'pl', name: 'پلمبر', icon: <Droplets />, img: '/assets/Plumber.jpeg' },
  { id: 'ms', name: 'میسن (مستری)', icon: <HardHat />, img: '/assets/Mason.jpeg' },
  { id: 'el', name: 'الیکٹریشن', icon: <Zap />, img: '/assets/Electric.jpeg' },
  { id: 'mc', name: 'مکینک', icon: <Wrench />, img: '/assets/Mechanic.jpg' },
  { id: 'br', name: 'حجام / بیوٹیشن', icon: <Scissors />, img: '/assets/Buticion barber.jpeg' },
  { id: 'cp', name: 'ترکھان (Carpenter)', icon: <UserCheck />, img: '/assets/Carpenter.jpeg' },
  { id: 'lg', name: 'لاجسٹک / لوڈر', icon: <Truck />, img: '/assets/Bus1.JPG' },
];

const ProHelp = () => {
  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28">
      <h1 className="text-2xl font-black text-gold italic mb-8 uppercase">Pro Service Hub</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {proServices.map((service) => (
          <motion.div 
            whileTap={{ scale: 0.95 }}
            key={service.id}
            className="relative h-48 rounded-[30px] overflow-hidden border border-white/10 group"
          >
            <img src={service.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-gold mb-1">{service.icon}</div>
              <h3 className="text-sm font-black uppercase tracking-tighter">{service.name}</h3>
              <button className="mt-2 w-full py-2 bg-gold/10 backdrop-blur-md border border-gold/20 rounded-xl text-[10px] font-bold text-gold uppercase">بکنگ کریں</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProHelp;
