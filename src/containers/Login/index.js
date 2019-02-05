import { Button, Icon, Spin } from 'antd';
import { Logo } from 'components';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate, login } from 'reducers/auth';
import { Component, PropTypes, React, styled } from 'utils/create';

const StyledRow = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #001529;
`;

const StyledLogo = styled(Logo)`
  display: block;
  margin: 0 auto 3rem;
  width: 100%;
  max-width: 10rem;
`;

class Login extends Component {
  componentDidMount() {
    const {
      handleAuthenticate,
      location: { hash },
    } = this.props;

    if (hash) {
      handleAuthenticate(hash);
    }
  }

  render() {
    const {
      handleLogin,
      isAuthenticated,
      location: { hash },
    } = this.props;
    return isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <StyledRow>
        <StyledLogo />
        {hash ? (
          <Spin />
        ) : (
          <Button ghost onClick={handleLogin}>
            Login
            <Icon type="login" />
          </Button>
        )}
      </StyledRow>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
  handleAuthenticate: PropTypes.func,

  handleLogin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

Login.defaultProps = {
  handleAuthenticate: noop,

  handleLogin: noop,
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = {
  handleAuthenticate: authenticate,
  handleLogin: login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
