import { useEffect, useState } from 'react';
import { Auth } from 'utils';

const auth = new Auth();

export default () => {
  const [isAuthenticated, setAuthenticated] = useState(auth.isAuthenticated());

  useEffect(() => {
    if (window.location.hash) {
      auth
        .authenticate()
        .then(() => setAuthenticated(true))
        .catch(() => setAuthenticated(false));
    }
  }, []);

  return {
    isAuthenticated,
    login: auth.login,
    logout: auth.logout,
  };
};
