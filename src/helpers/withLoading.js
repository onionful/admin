import { Spin } from 'antd';
import { noop } from 'lodash';
import { colors } from 'utils';
import { Component, connect, glamorous, PropTypes, React } from 'utils/create';

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.lightGray,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default ({ type, action }) => WrappedComponent =>
  connect(
    state => ({
      isLoading: state.getIn([type, 'isLoading']),
    }),
    dispatch => ({
      handleFetch: props => {
        const result = action(props);
        if (result) {
          dispatch(result);
        }
      },
    }),
  )(
    class extends Component {
      static propTypes = {
        isLoading: PropTypes.bool,
        handleFetch: PropTypes.func,
      };

      static defaultProps = {
        isLoading: true,
        handleFetch: noop,
      };

      componentDidMount() {
        const { handleFetch } = this.props;
        handleFetch(this.props);
      }

      render() {
        const { isLoading } = this.props;

        if (isLoading) {
          return (
            <Container>
              <Spin />
            </Container>
          );
        }

        return <WrappedComponent {...this.props} />;
      }
    },
  );
