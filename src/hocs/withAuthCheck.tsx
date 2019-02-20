import { useAuth } from 'hooks';
import React, { ComponentClass, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from 'utils/create';

export default (WrappedComponent: ComponentClass) => {
  const WithAuthCheck: FunctionComponent = props => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <Redirect to="/login" /> : <WrappedComponent {...props} />;
  };

  WithAuthCheck.displayName = `WithAuthCheck(${getDisplayName(WrappedComponent)})`;

  return WithAuthCheck;
};
