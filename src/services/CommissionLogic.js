// Tezro Commission Calculation Logic
export const CommissionLogic = {
    calculateVendorFee: (amount) => {
        // دراز اسٹائل: 5% پلیٹ فارم فیس
        return amount * 0.05;
    },
    calculateRiderEarnings: (bidAmount) => {
        // ان ڈرائیو اسٹائل: 90% رائڈر کا، 10% ٹیزرو کا
        return bidAmount * 0.90;
    },
    calculateFoodCommission: (orderTotal) => {
        // پانڈا اسٹائل: فلیٹ 15% کمیشن
        return orderTotal * 0.15;
    }
};

export default CommissionLogic;
