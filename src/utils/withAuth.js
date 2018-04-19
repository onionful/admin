import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'utils';

const AuthContext = createContext(new Auth());

export const authPropTypes = {
  auth: PropTypes.instanceOf(Auth).isRequired,
};

export function withAuth(Component) {
  return function ThemedComponent(props) {
    return (
      <AuthContext.Consumer>
        {auth => <Component {...props} auth={auth} />}
      </AuthContext.Consumer>
    );
  };
}
