import { Spin } from 'antd';
import { Component, connect, PropTypes, React, styled } from 'utils/create';
import { noop } from 'lodash';

const Container = styled.section({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

export default ({
  type,
  action,
  condition = () => true,
  showSpinner = true,
}) => WrappedComponent => {
  class withLoading extends Component {
    constructor(...args) {
      super(...args);

      const { handleAction, ...props } = this.props;
      if (condition(props)) {
        handleAction(props);
      }
    }

    render() {
      const { isLoading } = this.props;

      return isLoading && showSpinner ? (
        <Container>
          <Spin />
        </Container>
      ) : (
        <WrappedComponent {...this.props} isLoading={isLoading} />
      );
    }
  }

  withLoading.propTypes = {
    handleAction: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  withLoading.defaultProps = {
    handleAction: noop,
    isLoading: true,
  };

  const mapStateToProps = (state, props) => ({
    isLoading: condition(props) && [].concat(type).some(key => state.getIn(['loading', key], true)),
  });

  const mapDispatchToProps = dispatch => ({
    handleAction: () => Promise.all([].concat(action).map(act => dispatch(act()))),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withLoading);
};
