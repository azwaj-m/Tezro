// Tezro Smart Logistics Engine
export const calculateFleetCharge = (distance, fleetType) => {
  const rates = {
    bike: 20,    // PKR per km
    cargo: 50,   // PKR per km
    heavy: 120   // PKR per km
  };
  
  const baseFare = 40;
  const total = baseFare + (distance * (rates[fleetType] || 20));
  return total;
};

// سیکیورٹی چیک: پارسل کی انکرپٹڈ آئی ڈی جنریٹ کرنا
export const generateParcelID = () => {
  return 'TZR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
