import { Button, Col, Icon, Row } from 'antd';
import { Logo } from 'components';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from 'reducers/auth/actions';
import { PropTypes, React, styled } from 'utils/create';

const StyledRow = styled(Row)({
  height: '100vh',
  textAlign: 'center',
  backgroundColor: '#001529',
});

const StyledLogo = styled(Logo)({
  display: 'block',
  margin: '0 auto 3rem',
  width: '100%',
  maxWidth: '10rem',
});

const Login = ({ handleLogin, isAuthenticated }) =>
  isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <StyledRow align="middle" justify="center" type="flex">
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
  handleLogin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

Login.defaultProps = {
  handleLogin: noop,
  isAuthenticated: false,
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
