import { useState, useEffect } from "react";

export function useLocalStorageState(initialState: unknown, key: string) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        return parsedValue;
      } catch (e) {
        console.warn(
          `Unable to parse '${key}', using initial state instead.`,
          e
        );
        return initialState;
      }
    } else {
      return initialState;
    }
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
