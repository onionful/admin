import { Spin } from 'antd';
import { Component, connect, PropTypes, React, styled } from 'utils/create';
import { noop } from 'lodash';

const Container = styled.section({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

export default ({ type, action }) => WrappedComponent => {
  class withLoading extends Component {
    constructor(...args) {
      super(...args);

      const { handleAction } = this.props;
      handleAction(this.props);
    }

    render() {
      const { isLoading } = this.props;

      return isLoading ? (
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

  const mapStateToProps = state => ({
    isLoading: [].concat(type).some(key => state.getIn(['loading', key], true)),
  });

  const mapDispatchToProps = {
    handleAction: action,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withLoading);
};
