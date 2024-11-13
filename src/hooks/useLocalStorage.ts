import { useState, useCallback } from 'react';

function useLocalStorage(key: string, initialValue: string) {
// State untuk menyimpan nilai
const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
});

// Fungsi untuk memperbarui `localStorage`
const setValue = (value: string) => {
    setStoredValue(value);
    if (value === "") {
    window.localStorage.removeItem(key);
    } else {
    window.localStorage.setItem(key, JSON.stringify(value));
    }
};

// Fungsi untuk menghapus item dari `localStorage`
const deleteValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue("");
}, [key]);

return [storedValue, setValue, deleteValue] as const;
}

export default useLocalStorage;
