import React, { useEffect, useState, useContext, useMemo } from 'react';
import './Country.css';

import useLocation from './../hooks/useLocation';
import browserLocation from '../hooks/useLocation/';

import { isNull, isEmpty } from '../utils/utilities';

import Select from './Select';
import Card from './Card';
import { isUndefined } from './../utils/utilities';
import { ContinentContext } from '../context/continents';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const indexOf = country => continentCountries => {
  return continentCountries.indexOf(country);
};

const getContinentAndCountryIndex = (country, countries) => {
  const indexOfCountry = indexOf(country);
  const result = countries
    .map((item, index) => {
      // console.log(item, index);
      const i = indexOfCountry(item);
      return [index, i];
    })
    .filter(item => {
      return item[1] !== -1;
    })
    .reduce((comps, item) => [...comps, ...item], []);
  return result;
};

const fromLocationFindContinentAndCountryIndex = (
  condition,
  locationCountry,
  countries
) => {
  if (!condition) return [-1, -1];
  return getContinentAndCountryIndex(locationCountry, countries);
};

const locationBasedIndexes = location => {
  let locationCountry = null;
  let locationError = null;
  const { loading } = location;
  if (!loading) {
    locationCountry = location.location ? location.location : null;
    locationError = location.error ? location.error : null;
  }

  if (locationError instanceof Error) return () => [0, 0];

  return countries => {
    const areContinentCountriesNotEmpty = !isEmpty(countries);
    const isLocationNotUndefined = !isUndefined(location);
    const locationAndCountriesExists =
      areContinentCountriesNotEmpty && isLocationNotUndefined;
    return fromLocationFindContinentAndCountryIndex(
      locationAndCountriesExists,
      locationCountry,
      countries
    );
  };
};

function Country() {
  console.log('<Country/> START');
  const {
    continents,
    countries,
    isLoading,
    hasError,
    errorMessage,
  } = useContext(ContinentContext);

  const [selectedContinentIndex, setSelectedContinentIndex] = useState(0);
  const [continentCountries, setContinentCountries] = useState([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [country, setCountry] = useState(null);

  // get browser location
  const detector = browserLocation(REACT_APP_GOOGLE_MAPS_API_KEY);
  const location = useLocation(detector);

  useEffect(() => {
    const [continentIndex, countryIndex] = locationBasedIndexes(location)(
      countries
    );
    const canSelectByLocaton = continentIndex > -1 && countryIndex > -1;
    if (canSelectByLocaton) {
      const continentSelectElement = document.getElementById('continents');
      const countrySelectElement = document.getElementById('countries');
      continentSelectElement.value = continentIndex;
      countrySelectElement.value = countryIndex;
      setSelectedContinentIndex(continentIndex);
      setSelectedCountryIndex(countryIndex);
    }
  }, [countries, location]);

  // get countries for selected continent
  useEffect(() => {
    const isCountriesNotEmpty = !isEmpty(countries);
    if (isCountriesNotEmpty)
      setContinentCountries(countries[selectedContinentIndex]);
  }, [countries, selectedContinentIndex]);

  // get country from continent countries
  useEffect(() => {
    const isContinentCountriesNotEmpty = !isEmpty(continentCountries);
    if (isContinentCountriesNotEmpty) {
      const countrySelectElement = document.getElementById('countries');
      countrySelectElement.value = selectedCountryIndex;
      setCountry(continentCountries[selectedCountryIndex]);
    }
  }, [country, continentCountries, selectedCountryIndex]);

  // TODO create skeleton
  if (isLoading) <div>Loading...</div>;

  if (hasError) {
    console.error(errorMessage);
    return <div>Somenthing went wrong!</div>;
  }

  const onContinentChange = event => {
    const { value } = event.target;
    setSelectedContinentIndex(value);
    setSelectedCountryIndex(0);
    setCountry(continentCountries[0]);
  };

  const onCountryChange = event => {
    const { value } = event.target;
    setSelectedCountryIndex(value);
    setCountry(continentCountries[value]);
  };

  const CountryCard = () => (
    <Card
      get="countries"
      country={country}
      title={country}
      labelFor="radio3"
      show={true}
    />
  );

  console.log('<Country/> select index:', {
    selectedContinentIndex,
    selectedCountryIndex,
  });
  console.log('<Country/> END');
  return (
    <section className="Country">
      <header>
        <h2 className="card-title">Country</h2>
      </header>
      <div className="country-wrapper">
        <div className="country-select">
          <Select
            id="continents"
            title="continent"
            data={continents}
            isLoading={isLoading}
            onChange={onContinentChange}
          />
          <Select
            id="countries"
            title="country"
            data={continentCountries}
            isLoading={isLoading}
            onChange={onCountryChange}
          />
        </div>

        {isNull(country) ? <div>Loading...</div> : <CountryCard />}
      </div>
    </section>
  );
}

export default Country;
