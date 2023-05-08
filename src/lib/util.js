import { useEffect, useState } from 'react'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);
    return () => clearTimeout(timer);
  }, [value, delay])

  return debouncedValue;
}

export const classNames = (arr) => arr.filter((i) => !!i).join(" ");
export const truncate = (str) => (str && str.length > 103) ? `${str.substring(0, 100).trim()}...` : str;
export const isDev = import.meta.env.SWITCHBLADE_ENV === "development";