import { SecurityEngine } from '../../Tezro_Vault/SecurityEngine';

export const secureStore = {
    saveToVault: (key, data) => {
        const secureData = SecurityEngine.encryptVault(data);
        localStorage.setItem(key, secureData);
        return "Stored Securely";
    }
};
