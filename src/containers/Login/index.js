import React from 'react';
import glamorous from 'glamorous';
import { Row, Col, Button, Icon } from 'antd';
import { Logo } from 'components';
import { withAuth, authPropTypes } from 'utils/withAuth';

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

export const Login = ({ auth }) => (
  <StyledRow type="flex" align="middle" justify="center">
    <Col>
      <StyledLogo />
      <Button ghost onClick={auth.login}>
        Login
        <Icon type="login" />
      </Button>
    </Col>
  </StyledRow>
);

Login.propTypes = {
  ...authPropTypes,
};

export default withAuth(Login);
