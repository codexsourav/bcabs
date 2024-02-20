import CryptoJS from 'crypto-js';

export enum StorageKEY {
    auth = 'authKey',
    admin = 'adminKey',
    user = 'user',
}

const secretKey = 'sourav';

export const storeLocalStorageData = (key: StorageKEY, data: string): boolean => {
    try {
        const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
        localStorage.setItem(key, encryptedData);
        return true;
    } catch (error) {
        console.error('Error storing encrypted user data in local storage:', error);
    }
    return false;
};

export const getLocalStorageData = (key: StorageKEY): string | null => {
    try {
        const encryptedData = localStorage.getItem(key);
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedUserDataString = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedUserDataString;
        }
    } catch (error) {
        console.error('Error retrieving decrypted user data from local storage:', error);
    }
    return null;
};

export const clearLocalStorageData = () => {
    localStorage.clear();
}

export const removeLocalStorageData = (key: StorageKEY) => {
    localStorage.removeItem(key);
}
