import { React, Component, PropTypes, connect } from 'utils/create';
import { isAllowed } from 'reducers/auth';
import { noop } from 'lodash';
import errors from 'http-errors';

export default componentPermission => WrappedComponent =>
  connect(state => ({
    hasPermission: permission => isAllowed(state, permission),
  }))(
    class extends Component {
      static propTypes = {
        hasPermission: PropTypes.func,
      };

      static defaultProps = {
        hasPermission: noop,
      };

      componentWillMount() {
        if (!this.props.hasPermission(componentPermission)) {
          throw new errors.Forbidden(componentPermission);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    },
  );
