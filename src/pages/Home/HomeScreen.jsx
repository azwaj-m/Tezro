import React from 'react';
import { 
  Car, Wallet, HardHat, ShoppingBag, 
  Utensils, Hotel, ShieldCheck, HeartPulse 
} from 'lucide-react';

const services = [
  { id: 1, name: "Ride Master", icon: <Car />, color: "bg-blue-500", route: "/rides" },
  { id: 2, name: "Finance Hub", icon: <Wallet />, color: "bg-green-600", route: "/finance" },
  { id: 3, name: "Pro Help", icon: <HardHat />, color: "bg-yellow-500", route: "/pro-help" },
  { id: 4, name: "Tezro Mall", icon: <ShoppingBag />, color: "bg-purple-500", route: "/mall" },
  { id: 5, name: "Food Delivery", icon: <Utensils />, color: "bg-red-500", route: "/food" },
  { id: 6, name: "Hotel Booking", icon: <Hotel />, color: "bg-indigo-500", route: "/hotels" },
  { id: 7, name: "Health Care", icon: <HeartPulse />, color: "bg-pink-500", route: "/health" },
  { id: 8, name: "Vault / Security", icon: <ShieldCheck />, color: "bg-gray-800", route: "/vault" },
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="mb-8 mt-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Tezro Super App</h1>
        <p className="text-gray-500">آپ کی تمام ضروریات، ایک ہی جگہ پر</p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className={`p-4 rounded-full text-white mb-3 ${service.color}`}>
              {service.icon}
            </div>
            <span className="font-semibold text-gray-700 text-sm">
              {service.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
