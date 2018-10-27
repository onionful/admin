import { noop } from 'lodash';
import { handleAuthentication } from 'reducers/auth/actions';
import { Component, connect, PropTypes, React } from 'utils/create';

export class Authorize extends Component {
  componentDidMount() {
    const {
      authenticate,
      location: { hash },
    } = this.props;
    authenticate(hash);
  }

  render() {
    return (
      // TODO: spinner ?
      <div>loading...</div>
    );
  }
}

Authorize.propTypes = {
  authenticate: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
};

Authorize.defaultProps = {
  authenticate: noop,
};

const mapDispatchToProps = dispatch => ({
  authenticate: handleAuthentication(dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Authorize);
