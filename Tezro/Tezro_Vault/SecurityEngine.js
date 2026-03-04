// Tezro_Vault/SecurityEngine.js
// مقصد: والٹ کے حساس ڈیٹا کی انکرپشن اور ڈیکرپشن

export const SecurityEngine = {
    // والٹ لاک کرنا (2 مارچ والا اپڈیٹڈ لاجک)
    encryptVault: (data) => {
        try {
            console.log("🔐 Vault Encrypting...");
            const stringifiedData = JSON.stringify(data);
            // پریمیم انکرپشن (Base64 + Reverse Layer)
            return btoa(stringifiedData).split('').reverse().join('');
        } catch (error) {
            console.error("Encryption Error:", error);
            return null;
        }
    },

    // والٹ ان لاک کرنا
    decryptVault: (encryptedData) => {
        try {
            console.log("🔓 Vault Decrypting...");
            const reversedData = encryptedData.split('').reverse().join('');
            return JSON.parse(atob(reversedData));
        } catch (error) {
            console.error("Decryption Error:", error);
            return null;
        }
    }
};
