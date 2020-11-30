import { useState, useEffect } from 'react';

import { utilities } from '../utils';

const getValue = (key, initial) => {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(key);
    if (!utilities.isNull(saved)) return JSON.parsed(saved);
    return initial;
  }
  return initial;
};

const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(stringifiedValue);
  });

  return [value, setValue];
};

export default useLocalStorage;
