import { useState, useEffect } from 'react';

import { utilities } from '../utils';

const { isNull, isUndefined } = utilities;

const isNotNull = value => !isNull(value);

const isNotUndefined = value => !isUndefined(value);

const getValue = (key, initial) => {
  if (isNotUndefined(window)) {
    const saved = window.localStorage.getItem(key);
    if (isNotNull(saved)) return JSON.parse(saved);
  }
  return initial;
};

const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(getValue(key, initial));

  useEffect(() => {
    if (isNotUndefined(window)) {
      const stringifiedValue = JSON.stringify(value);
      window.localStorage.setItem(key, stringifiedValue);
    }
  });

  return [value, setValue];
};

export default useLocalStorage;
