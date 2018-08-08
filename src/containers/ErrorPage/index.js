import { Logo } from 'components';
import { colors } from 'utils';
import { glamorous, PropTypes, React } from 'utils/create';

const StyledLogo = glamorous(Logo)({
  width: '10rem',
});

const Stench = glamorous.div({
  color: colors.rottenOnion,
  fontSize: '2rem',
  marginBottom: '-2rem',
  whiteSpace: 'pre',

  '&:after': {
    content: '~\\A~',
    display: 'inline-block',
    transform: 'rotate(90deg)',
  },
});

const Stack = glamorous.pre({
  maxHeight: '10rem',
  overflowY: 'auto',
  opacity: 0.5,
});

const ErrorPage = glamorous(({ className, error, errorInfo: { componentStack } }) => (
  <div className={className}>
    <Stench />
    <StyledLogo fill={colors.rottenOnion} />
    <h1>Yuck!</h1>
    <strong>{`${error}`}</strong>
    <Stack>{componentStack}</Stack>
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
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string,
  }),
};

export default ErrorPage;
