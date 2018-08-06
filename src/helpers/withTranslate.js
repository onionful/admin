import { noop } from 'lodash';
import { getTranslate, withLocalize } from 'react-localize-redux';
import { compose, connect, getDisplayName, PropTypes, React } from 'utils/create';

export default WrappedComponent => {
  const WithTranslate = props => <WrappedComponent {...props} />;

  WithTranslate.displayName = `WithTranslate(${getDisplayName(WrappedComponent)})`;

  WithTranslate.propTypes = {
    _: PropTypes.func,
  };

  WithTranslate.defaultProps = {
    _: noop,
  };

  const mapStateToProps = state => ({
    _: getTranslate(state.get('localize')),
  });

  return compose(
    connect(mapStateToProps),
    withLocalize,
  )(WithTranslate);
};
