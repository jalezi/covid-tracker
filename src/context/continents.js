import { createContext, useEffect, useState, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import { URL } from '../utils/urlAndPath';
import { isNull } from '../utils/utilities';
import useLocalStorage from '../hooks/useLocalStorage';
import { isEmpty } from './../utils/utilities';

export const ContinentContext = createContext();

const useFetchContinents = (skip = false) =>
  useFetch(URL.CONTINENTS_URL, {}, {}, skip);

const ContinentProvider = ({ children }) => {
  const [continents, setContinents] = useLocalStorage('continents', []);
  const [countries, setCountries] = useLocalStorage('countries', []);
  const [skip, setSkip] = useState(!isEmpty(continents) && !isEmpty(countries));

  const {
    data,
    isLoading,
    hasError,
    errorMessage,
    refetch,
  } = useFetchContinents(skip);

  const memoSetContinents = useCallback(value => setContinents(value), [
    setContinents,
  ]);
  const memoSetCountries = useCallback(value => setCountries(value), [
    setCountries,
  ]);

  const isLocalEmpty = isEmpty(continents) || isEmpty(countries);

  // get all continents and countries
  useEffect(() => {
    const isDataNotNull = !isNull(data);
    let continentNames;
    let continentCountries;

    if (isDataNotNull && isLocalEmpty) {
      continentNames = data.map(({ continent }) => continent);
      memoSetContinents(continentNames);

      continentCountries = data.map(({ countries }) => countries);
      memoSetCountries(continentCountries);
    }
    setSkip(!isEmpty(continentNames) && !isEmpty(continentNames));
  }, [isLocalEmpty, data, memoSetContinents, memoSetCountries, skip, setSkip]);

  const value = {
    continents,
    countries,
    isLoading,
    hasError,
    errorMessage,
    refetch,
    skip,
    setSkip,
  };

  return (
    <ContinentContext.Provider value={value}>
      {children}
    </ContinentContext.Provider>
  );
};

export default ContinentProvider;
