import fetchCoordinates from './fetchCoordinates';
import fetchAddress from './fetchAddress';
import extractCountry from './extractCountry';

const browserLocation = apiKey => () =>
  fetchCoordinates().then(fetchAddress(apiKey)).then(extractCountry);

export default browserLocation;
