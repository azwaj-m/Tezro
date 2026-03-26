export const TezroShield = {
  validateEvent: (event) => {
    // بلاک غیر محفوظ کلکس اور بوٹس
    if (event.isTrusted === false) {
      console.warn("Tezro Security: Untrusted interaction blocked.");
      return false;
    }
    return true;
  },
  
  encryptData: (data) => {
    // والٹ ڈیٹا کو عارضی طور پر ماسک کرنا
    return btoa(JSON.stringify(data));
  }
};
