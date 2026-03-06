import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const debouncedTimer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(debouncedTimer);
    }, [value, delay]);

    return debouncedValue;
};