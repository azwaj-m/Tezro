export const fetchBillAmount = (id) => {
    // انٹرنیشنل اسٹینڈرڈ: یہاں ہم ایک فرضی بل جنریٹ کر رہے ہیں جو 1500 سے 25000 کے درمیان ہوگا
    return (Math.floor(Math.random() * (25000 - 1500 + 1)) + 1500).toLocaleString();
};

export const processPayment = (entity, amount, destination) => {
    const transaction = {
        id: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        entityName: entity.name,
        destination: destination,
        amount: amount,
        date: new Date().toLocaleString(),
        status: "Success",
        routing: entity.routingCode,
        gateway: entity.gateway || "Tezro-Internal"
    };
    const history = JSON.parse(localStorage.getItem('tezro_transactions') || '[]');
    localStorage.setItem('tezro_transactions', JSON.stringify([transaction, ...history]));
    return transaction;
};
