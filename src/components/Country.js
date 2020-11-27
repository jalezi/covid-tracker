import React, { useEffect, useState } from 'react';
import './Country.css';

import Select from './Select';
import useFetch from './../hooks/useFetch';
import { URL } from './../utils';
import { isNull } from '../utils/utilities';
import { isEmpty } from './../utils/utilities';
import Card from './Card';

function Country() {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedContinentIndex, setSelectedContinentIndex] = useState(0);
  const [continentCountries, setContinentCountries] = useState([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [country, setCountry] = useState(null);

  const { data, isLoading, hasError, errorMessage } = useFetch(
    URL.CONTINENTS_URL
  );

  useEffect(() => {
    const dataNotNull = !isNull(data);
    if (dataNotNull) {
      const continentNames = data.map(({ continent }) => continent);
      setContinents(continentNames);

      const continentCountries = data.map(({ countries }) => countries);
      setCountries(continentCountries);
    }
  }, [data]);

  useEffect(() => {
    const countriesNotEmpty = !isEmpty(countries);
    if (countriesNotEmpty)
      setContinentCountries(countries[selectedContinentIndex]);
  }, [countries, selectedContinentIndex]);

  useEffect(() => {
    const continentCountriesNotEmpty = !isEmpty(continentCountries);
    if (continentCountriesNotEmpty)
      setCountry(continentCountries[selectedCountryIndex]);
  }, [country, continentCountries, selectedCountryIndex]);

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