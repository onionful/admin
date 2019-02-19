import { Button, Icon } from 'antd';
import { Logo } from 'components';
import { withTranslate } from 'hocs';
import { useAuth } from 'hooks';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { PropTypes, compose, React, styled } from 'utils/create';

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

const Login = ({ _ }) => {
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

Login.propTypes = {
  _: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withTranslate,
)(Login);
