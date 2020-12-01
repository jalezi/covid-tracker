const fetchAddress = apiKey => ({ longitude, latitude }) =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&language=en&key=${apiKey}`,
    { mode: 'cors' }
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Request error. ${res.status}`);
    })
    .then(res => {
      if (res.status === 'OK') {
        return res;
      }
      throw new Error(`Google Maps API error. ${res.error_message}`);
    })
    .catch(e => {
      throw new Error(`Cannot query Google Maps API: ${e}`);
    });

export default fetchAddress;
