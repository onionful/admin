import { Spin } from 'antd';
import { noop } from 'lodash';
import { Component, connect, PropTypes, React } from 'utils/create';

export default ({ type, action }) => WrappedComponent => {
  class withLoading extends Component {
    componentDidMount() {
      const { handleFetch } = this.props;
      handleFetch(this.props);
    }

    render() {
      const { isLoading } = this.props;

      return (
        <Spin spinning={isLoading}>
          <WrappedComponent {...this.props} isLoading={isLoading} />
        </Spin>
      );
    }
  }

  withLoading.propTypes = {
    handleFetch: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  withLoading.defaultProps = {
    handleFetch: noop,
    isLoading: true,
  };

  const mapStateToProps = state => ({
    isLoading: state.getIn([type, 'isLoading']),
  });

  const mapDispatchToProps = dispatch => ({
    handleFetch: props => {
      const result = action(props);
      if (result) {
        dispatch(result);
      }
    },
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withLoading);
};
