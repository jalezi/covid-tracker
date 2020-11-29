import { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { URL } from '../utils/urlAndPath';
import { isNull } from '../utils/utilities';

export const ContinentContext = createContext();

const ContinentProvider = ({ children }) => {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const { data, isLoading, hasError, errorMessage, refetch } = useFetch(
    URL.CONTINENTS_URL
  );

  // get all continents and countries
  useEffect(() => {
    const isDataNotNull = !isNull(data);
    if (isDataNotNull) {
      const continentNames = data.map(({ continent }) => continent);
      setContinents(continentNames);

      const continentCountries = data.map(({ countries }) => countries);
      setCountries(continentCountries);
    }
  }, [data]);

  const value = {
    data,
    continents,
    countries,
    isLoading,
    hasError,
    errorMessage,
    refetch,
  };

  return (
    <ContinentContext.Provider value={value}>
      {children}
    </ContinentContext.Provider>
  );
};

export default ContinentProvider;
