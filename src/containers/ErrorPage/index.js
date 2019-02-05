import { Button } from 'antd';
import { Logo } from 'components';
import { colors } from 'utils';
import { PropTypes, React, styled } from 'utils/create';

const StyledLogo = styled(Logo)`
  width: 10rem;
`;

const Stench = styled.div`
  color: ${colors.rottenOnion};
  font-size: 2rem;
  margin-bottom: -2rem;
  white-space: pre;

  &:after {
    content: "~\\A~";
    display: inline-block;
    transform: rotate(90deg);
  },
`;

const Stack = styled.pre`
  max-height: 10rem;
  overflow-y: auto;
  opacity: 0.5;
`;

const ErrorPage = styled(({ className, error, errorInfo: { componentStack }, onDismiss }) => (
  <div className={className}>
    <Stench />
    <StyledLogo fill={colors.rottenOnion} />
    <h1>Yuck!</h1>
    <strong>{`${error}`}</strong>
    <Stack>{componentStack}</Stack>
    <Button icon="close" shape="circle" onClick={onDismiss} />
  </div>
))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

ErrorPage.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  onDismiss: PropTypes.func.isRequired,
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string,
  }),
};

export default ErrorPage;
