import { useContext, createRef, useState, useEffect } from 'react';
import './Country.css';

import { isNull } from '../utils/utilities';

import Select from './Select';
import Card from './Card';

import { ContinentContext } from '../context/continents';
import useLocalStorage from '../hooks/useLocalStorage';
import { LocationContext } from '../context/location';

const indexOf = country => continentCountries => {
  return continentCountries.indexOf(country);
};

const getContinentIndex = (country, countries) => {
  const indexOfCountry = indexOf(country);
  const results = countries
    .map((item, index) => {
      const i = indexOfCountry(item);
      return i === -1 ? null : index;
    })
    .filter(index => index);
  return results[0];
};

function Country() {
  const continentsRef = createRef();
  const countriesRef = createRef();

  const { continents, countries, isLoading, skip } = useContext(
    ContinentContext
  );

  const { state, locationSkip } = useContext(LocationContext);

  const [defaultCountry, setDefaultCountry] = useLocalStorage(
    'defaultCountry',
    { continent: 0, country: 'Anguilla' }
  );

  const [selectedContinent, setSelectedContinent] = useState(
    countries ? 0 : defaultCountry.continent
  );

  const [selectedCountries, setSelectedCountries] = useState(
    countries ? [[]] : countries[defaultCountry.continent]
  );
  const [selectedCountry, setSelectedCountry] = useState(
    countries ? 'Anguilla' : defaultCountry.country
  );

  useEffect(() => {
    setSelectedContinent(defaultCountry.continent);
    setSelectedCountries(countries[defaultCountry.continent]);
    setSelectedCountry(defaultCountry.country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  useEffect(() => {
    const continentIndex = getContinentIndex(state.location, countries);
    if (state.location) {
      setSelectedContinent(continentIndex);
      setSelectedCountries(countries[continentIndex]);
      setSelectedCountry(state.location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.location, locationSkip.skip]);

  const onContinentChange = () => {
    setSelectedContinent(continentsRef.current?.value);
    setSelectedCountries(countries[continentsRef.current?.value]);
    setSelectedCountry(countries[continentsRef.current?.value][0]);
  };

  const onCountryChange = () => {
    setSelectedCountry(countriesRef.current?.value);
  };

  const onClickDefaultCountry = () => {
    setSelectedContinent(defaultCountry.continent);
    setSelectedCountries(countries[defaultCountry.continent]);
    setSelectedCountry(defaultCountry.country);
  };

  const onClickSetDefaultCountry = () => {
    const continentsRefValue = continentsRef.current?.value;
    const countriesRefValue = countriesRef.current?.value;
    setDefaultCountry({
      continent: continentsRefValue,
      country: countriesRefValue,
    });
  };

  const onClickUseLocation = () => {
    locationSkip.setSkip(false);
  };

  const CountryCard = props => (
    <Card
      get="countries"
      country={props.selectedCountry}
      title={props.selectedCountry}
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
            ref={continentsRef}
            id="continents"
            title="continent"
            data={continents}
            isLoading={isLoading}
            onChange={onContinentChange}
            value={selectedContinent}
          />
          <Select
            ref={countriesRef}
            id="countries"
            title="country"
            data={selectedCountries}
            isLoading={isLoading}
            onChange={onCountryChange}
            value={selectedCountry}
          />
          <div className="country-select-buttons">
            <button onClick={onClickDefaultCountry}>
              {defaultCountry.country}
            </button>
            <button onClick={onClickSetDefaultCountry}>Set My Country</button>
            <button onClick={onClickUseLocation}>My Location</button>
          </div>
        </div>

        {isNull(selectedCountry) ? (
          <div>Loading...</div>
        ) : (
          <CountryCard selectedCountry={selectedCountry} />
        )}
      </div>
    </section>
  );
}

export default Country;

// {isLoading ? (
//   <div style={{ color: 'white' }}>Loading...</div>
// ) : (
//   <div style={{ color: 'white' }}>Not loading</div>
// )}

// {
//   /* <div style={{ color: 'white' }}>skip: {`${skip}`}</div> */
// }
