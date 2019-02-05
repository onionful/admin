import { Spin } from 'antd';
import { noop } from 'lodash';
import { Component, connect, PropTypes, React, styled } from 'utils/create';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

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
    isLoading:
      condition(props) && [].concat(type).some(key => state.getIn(['loading'].concat(key), true)),
  });

  const mapDispatchToProps = dispatch => ({
    handleAction: props => Promise.all([].concat(action).map(act => dispatch(act(props)))),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withLoading);
};
