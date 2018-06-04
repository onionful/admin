import { Button, Col, Icon, Row } from 'antd';
import { Logo } from 'components';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from 'reducers/auth/actions';
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

export const Login = ({ handleLogin, isAuthenticated }) =>
  isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <StyledRow type="flex" align="middle" justify="center">
      <Col>
        <StyledLogo />
        <Button ghost onClick={handleLogin}>
          Login
          <Icon type="login" />
        </Button>
      </Col>
    </StyledRow>
  );

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogin: PropTypes.func,
};

Login.defaultProps = {
  isAuthenticated: false,
  handleLogin: noop,
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = dispatch => ({
  handleLogin: login(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
