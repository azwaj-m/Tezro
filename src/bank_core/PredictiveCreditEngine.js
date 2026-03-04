export const PredictiveCreditEngine = {
    // صارف کے رویے کی بنیاد پر قرض کی حد مقرر کرنا
    calculateLoanEligibility(userData, activityLogs) {
        let trustScore = 0;

        // 📊 Behavioral Metrics (پیمانہ)
        if (activityLogs.orderGrowthRate > 0.20) trustScore += 30; // بزنس بڑھ رہا ہے
        if (activityLogs.avgSessionTime > 15) trustScore += 15;    // ایپ پر فعال ہے
        if (activityLogs.onTimeRepaymentRate > 0.98) trustScore += 40; // پرانی ہسٹری
        
        // 🚨 Fraud Detection: اگر فون پکڑنے کا انداز (Keystroke) بدلا ہوا ہے
        if (activityLogs.anomalyDetected) trustScore -= 60;

        // "Just-in-Time" Loan Logic
        const suggestedLimit = (userData.monthlyTurnover * 0.5) + (trustScore * 100);
        
        return {
            eligibleAmount: suggestedLimit,
            interestRate: trustScore > 80 ? "0.5%" : "1.2%", // بہترین اسکور پر کم منافع
            isJIT_Offer: activityLogs.stockRunningLow && activityLogs.highDemand
        };
    }
};
