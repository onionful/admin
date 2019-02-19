import { useAuth } from 'hooks';
import { Redirect } from 'react-router-dom';
import { getDisplayName, React } from 'utils/create';

export default WrappedComponent => {
  const WithAuthCheck = props => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <Redirect to="/login" /> : <WrappedComponent {...props} />;
  };

  WithAuthCheck.displayName = `WithAuthCheck(${getDisplayName(WrappedComponent)})`;

  return WithAuthCheck;
};
