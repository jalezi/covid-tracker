import makeDataObject from '../utils/makeDataObject';
import { isNull } from '../utils/utilities';

function makeBasicData(data, isWorld = false) {
  if (isNull(data)) return null;

  const newData = {
    updated: data.updated,
    cases: data.cases,
    todayCases: data.todayCases,
    deaths: data.deaths,
    recovered: data.recovered,
    todayRecovered: data.todayRecovered,
    active: data.active,
    critical: data.critical,
    tests: data.tests,
    population: data.population,
  };

  if (isWorld) {
    newData['affectedCountries'] = data.affectedCountries;
  }

  return makeDataObject(newData);
}

function makePerMillionData(data) {
  if (isNull(data)) return null;

  const newData = {
    casesPerOneMillion: data.casesPerOneMillion,
    deathsPerOneMillion: data.deathsPerOneMillion,
    testsPerOneMillion: data.testsPerOneMillion,
    activePerOneMillion: data.activePerOneMillion,
    recoveredPerOneMillion: data.recoveredPerOneMillion,
    criticalPerOneMillion: data.criticalPerOneMillion,
  };
  return makeDataObject(newData);
}

function makePerPersonData(data) {
  if (isNull(data)) return null;

  const newData = {
    oneCasePerPeople: data.oneCasePerPeople,
    oneDeathPerPeople: data.oneDeathPerPeople,
    oneTestPerPeople: data.oneTestPerPeople,
  };
  return makeDataObject(newData);
}

function makeCountryInfoData(data) {
  if (isNull(data)) return null;

  const { countryInfo } = data;

  const newData = {
    latitude: countryInfo?.lat,
    longitude: countryInfo?.long,
    flag: countryInfo?.flag,
  };
  return makeDataObject(newData);
}

const exportDefault = {
  makeBasicData,
  makePerMillionData,
  makePerPersonData,
  makeCountryInfoData,
};
export default exportDefault;
