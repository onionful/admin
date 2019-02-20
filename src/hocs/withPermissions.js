import { noop } from 'lodash';
import { isAllowed } from 'reducers/auth';
import { connect, PropTypes, React } from 'utils/create';

export default componentPermission => WrappedComponent =>
  connect(state => ({
    hasPermission: permission => isAllowed(state, permission),
  }))(
    class extends React.Component {
      static propTypes = {
        hasPermission: PropTypes.func,
      };

      static defaultProps = {
        hasPermission: noop,
      };

      componentWillMount() {
        const { hasPermission } = this.props;
        if (!hasPermission(componentPermission)) {
          // throw new errors.Forbidden(componentPermission);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    },
  );
