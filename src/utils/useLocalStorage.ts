// import { useEffect, useState } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>(initialValue);

//   useEffect(() => {
//     const item = localStorage.getItem(key);
//     if (item) {
//       setStoredValue(JSON.parse(item));
//     }
//   }, [key]);

//   const setValue = (value: T) => {
//     setStoredValue(value);
//     localStorage.setItem(key, JSON.stringify(value));
//   };

//   return [storedValue, setValue] as const;
// }
import { useEffect, useState } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const setValue: SetValue<T> = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
