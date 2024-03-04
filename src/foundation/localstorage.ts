import { localStorageKeyHashSet } from './keys';

export const getLocalStorage = (key: keyof typeof localStorageKeyHashSet) => {
  if (typeof window === 'undefined') return;

  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

export const setLocalStorage = (
  key: string,
  value: unknown
) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(key, JSON.stringify(value));
};
