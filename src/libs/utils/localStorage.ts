// utils/localStorage.ts

export function setItem<T>(key: string, value: T): void {
    if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
    }
}
    
export function getItem<T>(key: string): T | null {
    if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
    }
    return null;
}

export function updateItem<T>(key: string, updateCallback: (value: T | null) => T): void {
    if (typeof window !== "undefined") {
    const currentValue = getItem<T>(key);
    const newValue = updateCallback(currentValue);
    setItem(key, newValue);
    }
}

export function removeItem(key: string): void {
    if (typeof window !== "undefined") {
    localStorage.removeItem(key);
    }
}

export function clearStorage(): void {
    if (typeof window !== "undefined") {
    localStorage.clear();
    }
}
