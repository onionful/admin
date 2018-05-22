import { React, Component, PropTypes, connect } from 'utils/create';
import { noop } from 'lodash';
import { handleAuthentication } from 'reducers/auth/actions';

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
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
  authenticate: PropTypes.func,
};

Authorize.defaultProps = {
  authenticate: noop,
};

const mapDispatchToProps = dispatch => ({
  authenticate: handleAuthentication(dispatch),
});

export default connect(null, mapDispatchToProps)(Authorize);
