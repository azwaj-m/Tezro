// یہ آپ کا مین سیکیورٹی انجن ہے جو ڈیٹا انکرپٹ کرتا ہے
export const SecurityEngine = {
    encryptVault: (data) => {
        // آپ کا 2 مارچ والا انکرپشن لاجک
        console.log("Vault Encrypting...");
        return btoa(JSON.stringify(data)); 
    },
    decryptVault: (encryptedData) => {
        console.log("Vault Decrypting...");
        return JSON.parse(atob(encryptedData));
    }
};
