import { Redirect } from 'react-router-dom';
import { connect, getDisplayName, PropTypes, React } from 'utils/create';

export default WrappedComponent => {
  const IsAuthenticated = ({ isAuthenticated, ...props }) =>
    !isAuthenticated ? <Redirect to="/login" /> : <WrappedComponent {...props} />;

  IsAuthenticated.displayName = `IsAuthenticated(${getDisplayName(WrappedComponent)})`;

  IsAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  IsAuthenticated.defaultProps = {
    isAuthenticated: false,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  });

  return connect(mapStateToProps)(IsAuthenticated);
};
