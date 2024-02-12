import { StorageKEY, getLocalStorageData } from "../helper/storageKeys";

export function splitArray<T>(arr: T[]) {
    const middleIndex = Math.ceil(arr.length / 2);
    const part1 = arr.slice(0, middleIndex);
    const part2 = arr.slice(middleIndex);
    return [part1, part2];
}

export function replacePlaceholders(text: string, placeholder: string, value: string): string {
    return text.replace(placeholder, value);
}

export const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const setPageTitle = (title: string): void => {
    document.title = title;
}

export const isAuthLogin = () => {
    return getLocalStorageData(StorageKEY.user);
}

export const applyDiscount = (originalPrice: number, discountPercentage: number) => {
    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    return Math.round(discountedPrice);
};

export const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailPattern.test(email));
};

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
}


export function is_valid_drop_date(pickup_date_str: string, drop_date_str: string): boolean {
    const pickup_date: Date = new Date(pickup_date_str);
    const drop_date: Date = new Date(drop_date_str);

    // Ensure drop date is not before pickup date
    if (drop_date >= pickup_date) {
        return false;
    }

    return true;
}
