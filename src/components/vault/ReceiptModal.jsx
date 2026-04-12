import React from 'react';
import { CheckCircle, Download, Share2 } from 'lucide-react';

const ReceiptModal = ({ isOpen, transaction, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-6 bg-black/90 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="bg-[#001a0f] p-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-2" size={48} />
          <h2 className="text-[#FFD700] text-xl font-black">ادائیگی کامیاب</h2>
        </div>
        <div className="p-8 space-y-4 text-black">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400 text-xs">رقم</span>
            <span className="font-black">Rs {transaction?.amount}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400 text-xs">ادارہ</span>
            <span className="font-bold">{transaction?.bankName}</span>
          </div>
        </div>
        <div className="p-6 flex gap-2">
          <button onClick={onClose} className="flex-1 bg-black text-white py-4 rounded-2xl font-bold uppercase text-xs">بند کریں</button>
        </div>
      </div>
    </div>
  );
};
export default ReceiptModal;
