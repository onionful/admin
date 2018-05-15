import { React, Component, PropTypes, connect } from 'utils/create';
import moment from 'moment';
import { noop } from 'lodash';
import { Avatar, Table } from 'antd';
import { List } from 'immutable';
import { fetchUsers } from 'reducers/users/actions';

const columns = [{
  title: 'Picture',
  dataIndex: 'picture',
  render: value => <Avatar src={value} />,
}, {
  title: 'E-mail',
  dataIndex: 'email',
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Nickname',
  dataIndex: 'nickname',
}, {
  title: 'Created at',
  dataIndex: 'created_at',
  render: value => <span title={value}>{moment(value).fromNow()}</span>,
  sorter: (a, b) => a.created_at - b.created_at,
}, {
  title: 'Last login',
  dataIndex: 'last_login',
  render: value => <span title={value}>{moment(value).fromNow()}</span>,
  sorter: (a, b) => a.last_login - b.last_login,
}, {
  title: 'Logins count',
  dataIndex: 'logins_count',
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <div>actions</div>
  ),
}];

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
        <h1>Users</h1>
        <Table
          columns={columns}
          dataSource={users.toJS()}
          size="small"
        />
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
