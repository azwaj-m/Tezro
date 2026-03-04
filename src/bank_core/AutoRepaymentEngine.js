export const AutoRepaymentEngine = {
    processIncomingRevenue(riderId, totalFare) {
        const loanStatus = this.getLoanStatus(riderId);
        
        if (loanStatus.hasActiveDebt) {
            const deductionAmount = totalFare * 0.10; // ہر رائیڈ سے 10% کٹوتی
            const remainingFare = totalFare - deductionAmount;

            // 1. قرض کی قسط جمع کرنا
            this.updateDebt(riderId, deductionAmount);
            
            // 2. باقی رقم رائیڈر کے والٹ میں بھیجنا
            this.creditToWallet(riderId, remainingFare);

            return { status: "DEBT_REDUCED", deducted: deductionAmount };
        }
        
        return { status: "FULL_CREDIT", amount: totalFare };
    }
};
