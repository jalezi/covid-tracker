import { useContext, createRef, useState, useEffect } from 'react';
import './Country.css';

import { isNull, isUndefined, isEmpty } from '../utils/utilities';

import Select from './Select';
import Card from './Card';

import { ContinentContext } from '../context/continents';
import useLocalStorage from '../hooks/useLocalStorage';

function Country() {
  const continentsRef = createRef();
  const countriesRef = createRef();

  const { continents, countries, isLoading, skip } = useContext(
    ContinentContext
  );

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
    console.log('first');
    setSelectedContinent(defaultCountry.continent);
    setSelectedCountries(countries[defaultCountry.continent]);
    setSelectedCountry(defaultCountry.country);
  }, [countries]);

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
