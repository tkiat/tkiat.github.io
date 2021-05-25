import {useEffect, useState} from 'react'

export default function useDebounce(value: any, msDelay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, msDelay);

      // cleanup when value changes within the msDelay period
      return () => {
        clearTimeout(handler);
      };
    },
    [value, msDelay]
  );
  return debouncedValue;
}
