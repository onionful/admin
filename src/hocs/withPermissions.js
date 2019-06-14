import { noop } from 'lodash';
import React, { Component } from 'react';
import { connect, PropTypes } from 'utils/create';

const isAllowed = () => true;

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
