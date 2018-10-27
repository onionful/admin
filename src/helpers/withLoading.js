import { Spin } from 'antd';
import { noop } from 'lodash';
import { colors } from 'utils';
import { Component, connect, PropTypes, React, styled } from 'utils/create';

const Container = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.lightGray,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default ({ type, action, hide = false }) => WrappedComponent => {
  class withLoading extends Component {
    componentDidMount() {
      const { handleFetch } = this.props;
      handleFetch(this.props);
    }

    render() {
      const { isLoading } = this.props;

      if (isLoading) {
        if (hide) {
          return (
            <Container>
              <Spin />
            </Container>
          );
        }
        return (
          <Spin>
            <WrappedComponent {...this.props} />
          </Spin>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  withLoading.propTypes = {
    handleFetch: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  withLoading.defaultProps = {
    isLoading: true,
    handleFetch: noop,
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
