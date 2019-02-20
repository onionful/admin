import { Spin } from 'antd';
import { noop } from 'lodash';
import { useEffect } from 'react';
import { connect, PropTypes, React, styled } from 'utils/create';

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
  const WithLoading = ({ handleAction, isLoading, ...props }) => {
    useEffect(() => {
      if (condition(props)) {
        handleAction(props);
      }
    }, []);

    return isLoading && showSpinner ? (
      <Container>
        <Spin />
      </Container>
    ) : (
      <WrappedComponent {...props} isLoading={isLoading} />
    );
  };

  WithLoading.propTypes = {
    handleAction: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  WithLoading.defaultProps = {
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
  )(WithLoading);
};
