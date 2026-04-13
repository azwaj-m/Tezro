import React from 'react';
import { useTezro } from '../context/TezroContext';

const BookingForm = () => {
  const { requestRide } = useTezro();

  const handleBook = async () => {
    const details = { pickup: "Current Loc", drop: "Destination", fare: 500 };
    const result = await requestRide(details);
    if (result.success) {
      alert("رائیڈ کامیابی سے بک ہو گئی ہے!");
    } else {
      alert("غلطی: " + result.error);
    }
  };

  return (
    <button 
      onClick={handleBook}
      className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg w-full shadow-lg active:scale-95 transition-transform"
    >
      ابھی رائیڈ بک کریں
    </button>
  );
};

export default BookingForm;
