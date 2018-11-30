import { Button } from 'antd';
import { Logo } from 'components';
import { colors } from 'utils';
import { PropTypes, React, styled } from 'utils/create';

const StyledLogo = styled(Logo)({
  width: '10rem',
});

const Stench = styled.div({
  color: colors.rottenOnion,
  fontSize: '2rem',
  marginBottom: '-2rem',
  whiteSpace: 'pre',

  '&:after': {
    content: '"~\\A~"',
    display: 'inline-block',
    transform: 'rotate(90deg)',
  },
});

const Stack = styled.pre({
  maxHeight: '10rem',
  overflowY: 'auto',
  opacity: 0.5,
});

const ErrorPage = styled(({ className, error, errorInfo: { componentStack }, onDismiss }) => (
  <div className={className}>
    <Stench />
    <StyledLogo fill={colors.rottenOnion} />
    <h1>Yuck!</h1>
    <strong>{`${error}`}</strong>
    <Stack>{componentStack}</Stack>
    <Button icon="close" shape="circle" onClick={onDismiss} />
  </div>
))({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%',
});

ErrorPage.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  onDismiss: PropTypes.func.isRequired,
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string,
  }),
};

export default ErrorPage;
