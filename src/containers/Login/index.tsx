import { Button, Icon, Spin } from 'antd';
import { Logo } from 'components';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate, login } from 'reducers/auth';
import { Component, React, styled } from 'utils/create';

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

interface Props {
  location: any;
  handleAuthenticate(hash: string): void;
  handleLogin(): void;
  isAuthenticated(): void;
}

class Login extends Component<Props> {
  static defaultProps = {
    handleAuthenticate: noop,
    handleLogin: noop,
    isAuthenticated: false,
  };

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

const mapStateToProps = (state: any) => ({
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
