import { Map } from 'immutable';
import { noop } from 'lodash';
import { getTranslate, withLocalize } from 'react-localize-redux';
import { compose, connect, getDisplayName, PropTypes, React } from 'utils/create';

// TODO check if ref is still required
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
    _: (id, data, options) =>
      getTranslate(state.get('localize'))(id, data instanceof Map ? data.toJS() : data, options),
  });

  return compose(
    connect(
      mapStateToProps,
      null,
      null,
      { forwardRef: true },
    ),
    withLocalize,
  )(WithTranslate);
};
