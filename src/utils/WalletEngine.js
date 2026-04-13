// Tezro Wallet Engine - Payments & History Logic

export const processPayment = (entity, amount, destination) => {
    // 1. ٹرانزیکشن کی تفصیلات تیار کرنا
    const transaction = {
        id: "TXN-" + entity.routingCode + "-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
        entityName: entity.name,
        destination: destination, // یہ اکاؤنٹ یا کنزیومر نمبر ہے
        amount: amount,
        date: new Date().toLocaleString(),
        status: "Success",
        routing: entity.routingCode,
        gateway: entity.gateway || "Tezro-Internal"
    };

    // 2. ہسٹری حاصل کرنا (Local Storage سے)
    const existingHistory = JSON.parse(localStorage.getItem('tezro_transactions') || '[]');
    
    // 3. نئی ٹرانزیکشن شامل کرنا
    const updatedHistory = [transaction, ...existingHistory];
    
    // 4. محفوظ کرنا
    localStorage.setItem('tezro_transactions', JSON.stringify(updatedHistory));

    return transaction;
};

export const getBalance = () => {
    return localStorage.getItem('tezro_balance') || "50,000";
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('tezro_transactions') || '[]');
};
