import { Button, Col, Icon, Row } from 'antd';
import { Logo } from 'components';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleLogin } from 'reducers/auth/actions';
import { glamorous, PropTypes, React } from 'utils/create';

const StyledRow = glamorous(Row)({
  height: '100vh',
  textAlign: 'center',
  backgroundColor: '#001529',
});

const StyledLogo = glamorous(Logo)({
  display: 'block',
  margin: '0 auto 3rem',
  width: '100%',
  maxWidth: '10rem',
});

export const Login = ({ login, isAuthenticated }) =>
  isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <StyledRow type="flex" align="middle" justify="center">
      <Col>
        <StyledLogo />
        <Button ghost onClick={login}>
          Login
          <Icon type="login" />
        </Button>
      </Col>
    </StyledRow>
  );

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
};

Login.defaultProps = {
  isAuthenticated: false,
  login: noop,
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = dispatch => ({
  login: handleLogin(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
