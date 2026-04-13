export const fetchBillAmount = async (entityId, consumerId) => {
    // حقیقت میں یہاں API کال ہوگی، ابھی ہم رینڈم بل بنا رہے ہیں
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (consumerId.length < 8) reject("غلط آئی ڈی نمبر");
            // رینڈم بل 1500 سے 15000 کے درمیان
            resolve((Math.floor(Math.random() * (15000 - 1500 + 1)) + 1500));
        }, 2000); // 2 سیکنڈ کی لوڈنگ
    });
};

export const processPayment = (entity, amount, destination) => {
    const transaction = {
        id: "TZN-" + Date.now().toString(36).toUpperCase(),
        entityName: entity.name,
        destination: destination,
        amount: Number(amount),
        date: new Date().toISOString(),
        status: "Success",
        routing: entity.routingCode,
        gateway: entity.gateway || "Tezro-Secure-Direct"
    };
    const history = JSON.parse(localStorage.getItem('tezro_transactions') || '[]');
    localStorage.setItem('tezro_transactions', JSON.stringify([transaction, ...history]));
    return transaction;
};
