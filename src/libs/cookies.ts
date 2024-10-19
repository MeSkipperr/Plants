import Cookies from 'js-cookie';

interface CookieData {
    [key: string]: any;
}

export const setCookie = (key: string, value: CookieData, expires?: number) => {
    const jsonValue = JSON.stringify(value);
    Cookies.set(key, jsonValue, { expires });
};

export const getCookie = (key: string): CookieData | null => {
    const jsonValue = Cookies.get(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
};

export const updateCookie = (key: string, newValue: CookieData) => {
    const existingValue = getCookie(key);
    if (existingValue) {
        const updatedValue = { ...existingValue, ...newValue };
        setCookie(key, updatedValue);
    }
};

export const deleteCookie = (key: string) => {
    Cookies.remove(key);
};
