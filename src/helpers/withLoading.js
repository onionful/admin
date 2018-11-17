import { Spin } from 'antd';
import { Component, connect, PropTypes, React } from 'utils/create';

export default ({ type, action }) => WrappedComponent => {
  class withLoading extends Component {
    constructor(...args) {
      super(...args);
      action(this.props);
    }

    render() {
      const { isLoading } = this.props;

      return isLoading ? <Spin /> : <WrappedComponent {...this.props} isLoading={isLoading} />;
    }
  }

  withLoading.propTypes = {
    isLoading: PropTypes.bool,
  };

  withLoading.defaultProps = {
    isLoading: true,
  };

  const mapStateToProps = state => ({
    isLoading: [].concat(type).some(key => state.getIn(['loading', key], true)),
  });

  return connect(mapStateToProps)(withLoading);
};
