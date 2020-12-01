const fetchCoordinates = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject('Browser does not support geolocation API');
    }

    navigator.geolocation.getCurrentPosition(
      location => {
        resolve(location.coords);
      },
      error => {
        switch (error.code) {
          case 'PERMISSION_DENIED':
            return reject('Permission denied to get location');
          case 'TIMEOUT':
            return reject('Timeout waiting for user response');
          case 'POSITION_UNAVAILABLE':
          default:
            return reject('Cannot detect user location');
        }
      }
    );
  });

export default fetchCoordinates;
