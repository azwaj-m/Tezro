export const isEmergencySetupDone = () => {
    const contacts = localStorage.getItem('tezro_emergency');
    return contacts !== null;
};

export const saveEmergencyContacts = (contacts) => {
    localStorage.setItem('tezro_emergency', JSON.stringify(contacts));
};

export const triggerEmergencyAlert = (location) => {
    const contacts = JSON.parse(localStorage.getItem('tezro_emergency') || "[]");
    if (contacts.length === 0) {
        alert("سیکیورٹی وارننگ: ایمرجنسی نمبر سیٹ نہیں ہیں۔ براہ کرم سیٹنگز میں نمبر شامل کریں۔");
        return;
    }

    const message = encodeURIComponent(`TEZRO SECURE ALERT: ایمرجنسی! میری لوکیشن: https://www.google.com/maps?q=${location}`);
    const smsLink = `sms:${contacts.join(',')}?body=${message}`;
    window.location.href = smsLink;
};
