// کمیشن کا حساب لگانے والی لاجک
export const calculateCommission = (type, totalAmount) => {
  let commissionRate = 0;

  switch (type) {
    case 'RIDE':
      commissionRate = 0.20; // 20% کمیشن ڈرائیور سے
      break;
    case 'FOOD_DELIVERY':
      commissionRate = 0.05; // صرف 5% ڈیلیوری بوائے سے (محنت کا صلہ)
      break;
    case 'HOTEL_ORDER':
      commissionRate = 0.12; // 12% ہوٹل والے سے
      break;
    default:
      commissionRate = 0.10;
  }

  const commissionEarned = totalAmount * commissionRate;
  const partnerEarnings = totalAmount - commissionEarned;

  return {
    adminCommission: commissionEarned.toFixed(2), // یہ آپ کے اکاؤنٹ میں جائے گا
    partnerAmount: partnerEarnings.toFixed(2)     // یہ ڈرائیور/ہوٹل کا حصہ ہے
  };
};
