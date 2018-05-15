import { React, Component, PropTypes, connect } from 'utils/create';
import { noop } from 'lodash';
import { List } from 'immutable';
import { fetchUsers } from 'reducers/users/actions';

class UsersPage extends Component {
  static propTypes = {
    handleFetchUsers: PropTypes.func,
    users: PropTypes.list,
  };

  static defaultProps = {
    handleFetchUsers: noop,
    users: List(),
  };

  componentDidMount() {
    const { handleFetchUsers } = this.props;
    handleFetchUsers();
  }

  render() {
    const { users } = this.props;
    console.log('users', users);

    return (
      <div>
        Users
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.getIn(['users', 'data']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchUsers: () => dispatch(fetchUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);
