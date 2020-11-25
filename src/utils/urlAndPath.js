const BASE_URL = 'https://disease.sh';

const COVID_PATH = '/v3/covid-19';

const COVID_URL = BASE_URL + COVID_PATH;

const WORLD_PATH = '/all';

const WORLD_URL = COVID_URL + WORLD_PATH;

const CONTINENTS_PATH = '/continents';

const CONTINENTS_URL = COVID_URL + CONTINENTS_PATH;

export const URL = Object.freeze({
  BASE_URL,
  COVID_URL,
  WORLD_URL,
  CONTINENTS_URL,
});

export const PATH = Object.freeze({
  COVID_PATH,
  WORLD_PATH,
  CONTINENTS_PATH,
});

export default Object.freeze({ URL, PATH });
