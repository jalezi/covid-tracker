import { createContext, useEffect, useState } from 'react';
import browserLocation from './../hooks/browserLocation';
import useLocation from '../hooks/useLocation';

export const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const detector = browserLocation(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const [skip, setSkip] = useState(true);
  const state = useLocation(detector, skip);

  useEffect(() => {
    setSkip(true);
  }, [skip]);

  const value = { state, locationSkip: { skip, setSkip } };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
