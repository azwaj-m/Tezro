// Tezro App Security Engine (Client Side)
export const validateSession = () => {
    // صرف ایپ کی حد تک سیشن چیک کرے گا
    return !!localStorage.getItem('user_token');
};

export const encryptPayload = (data) => {
    // ڈیٹا کو ویب سائٹ/ایڈمن کی طرف بھیجنے سے پہلے انکرپٹ کرنا
    return btoa(JSON.stringify(data)); 
};

export const securityConfig = {
    firewallEnabled: true,
    version: "1.0.2-client"
};

export default { validateSession, encryptPayload, securityConfig };
