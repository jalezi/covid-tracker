import { useState, useEffect } from 'react';

const useLocation = (detector, skip = true) => {
  const [state, setState] = useState({
    loading: true,
    location: undefined,
    error: undefined,
  });

  useEffect(() => {
    if (skip) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    Promise.resolve(detector())
      .then(location => setState({ loading: false, location }))
      .catch(error => setState({ loading: false, error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return state;
};

export default useLocation;
