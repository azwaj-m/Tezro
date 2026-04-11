export const saveSecureSession = (token) => {
    // ٹوکن کو براؤزر/ٹرمکس کی میموری میں محفوظ کرنا
    localStorage.setItem('tezro_auth_session', token);
};

export const getSecureSession = () => {
    return localStorage.getItem('tezro_auth_session');
};

export const clearSession = () => {
    localStorage.removeItem('tezro_auth_session');
    window.location.reload();
};
