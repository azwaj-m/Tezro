export const AntiFraudEngine = {
    // ممنوعہ کیٹیگریز کی لسٹ (International MCC Standards)
    RESTRICTED_CATEGORIES: ['7995', '5967', '7273', '6211'], // Gambling, Adult, High-Risk Trading
    
    async validateTransaction(userId, cardToken, merchantData) {
        const userVault = await this.getUserVault(userId);

        // 1. کیٹیگری چیک کرنا
        if (this.RESTRICTED_CATEGORIES.includes(merchantData.mcc)) {
            let warningCount = userVault.securityWarnings || 0;
            warningCount += 1;

            // 2. وارننگ لاجک (صرف دو بار کی مہلت)
            if (warningCount >= 2) {
                await this.permBlockCard(cardToken, "PERMANENT_BAN_SUSPICIOUS_ACTIVITY");
                return { 
                    status: "TERMINATED", 
                    message: "Card permanently blocked after 2 warnings for prohibited transactions." 
                };
            } else {
                await this.updateWarningCount(userId, warningCount);
                return { 
                    status: "REJECTED", 
                    message: `WARNING ${warningCount}/2: This transaction type is prohibited. Another attempt will block your card.` 
                };
            }
        }

        return { status: "AUTHORIZED" };
    }
};
