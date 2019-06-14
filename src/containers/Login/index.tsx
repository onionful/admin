import { Button, Icon } from 'antd';
import { Logo } from 'components';
import { WithTranslateProps, withTranslate } from 'hocs';
import { useAuth } from 'hooks';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps, StaticContext, withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { compose, styled } from 'utils/create';

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

type Props = RouteComponentProps<any, StaticContext, any> & WithTranslateProps;

const Login: FunctionComponent<Props> = ({ _ }) => {
  const { isAuthenticated, login } = useAuth();

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <StyledRow>
      <StyledLogo />
      <Button ghost htmlType="button" onClick={login}>
        {_('global.login')}
        <Icon type="login" />
      </Button>
    </StyledRow>
  );
};

export default compose<FunctionComponent<Props>>(
  withRouter,
  withTranslate,
)(Login);
