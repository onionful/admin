import { React, Component, PropTypes, compose, connect, glamorous } from 'utils/create';
import moment from 'moment';
import { noop } from 'lodash';
import { Avatar, Icon, Input, Table } from 'antd';
import { Map } from 'immutable';
import { fetchUsers } from 'reducers/users/actions';
import { permissions, withPermissions } from 'utils';

const columns = [{
  dataIndex: 'picture',
  render: value => <Avatar src={value} />,
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'E-mail',
  dataIndex: 'email',
}, {
  title: 'Created at',
  dataIndex: 'created_at',
  render: value => <span title={value}>{moment(value).fromNow()}</span>,
  sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
}, {
  title: 'Last login',
  dataIndex: 'last_login',
  render: value => <span title={value}>{moment(value).fromNow()}</span>,
  sorter: (a, b) => moment(a.last_login) - moment(b.last_login),
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

const SearchReset = glamorous(Icon)({
  marginRight: '1rem',
  cursor: 'pointer',
});

const Search = glamorous(Input.Search)({
  marginBottom: '1rem',
});

const SearchQuery = glamorous.div({
  marginBottom: '1rem',
});

class UsersPage extends Component {
  state = {
    search: '',
    searchCurrent: '',
    pagination: {},
  };

  componentDidMount() {
    const { handleFetchUsers } = this.props;
    handleFetchUsers();
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      pagination: {
        limit: pagination.pageSize,
        page: pagination.current - 1,
        sort: sorter.field,
        order: sorter.order,
      },
    }, this.search);
  };

  handleSearch = (search) => {
    this.setState({ search }, this.search);
  };

  handleSearchChange = ({ target: { value } }) => {
    this.setState({ searchCurrent: value });
  };

  handleSearchReset = () => {
    const { search } = this.state;
    this.setState({ searchCurrent: '', search: '' }, search ? this.search : noop);
  };

  search = () => {
    const { handleFetchUsers } = this.props;
    const { search, pagination } = this.state;
    handleFetchUsers({ ...pagination, q: search });
  };

  render() {
    const { isLoading, data } = this.props;
    const { search, searchCurrent } = this.state;

    const searchSuffix = searchCurrent
      ? <SearchReset key="searchReset" type="close-circle" onClick={this.handleSearchReset} />
      : null;

    return (
      <div>
        <h1>Users</h1>
        <Search
          enterButton
          onChange={this.handleSearchChange}
          onSearch={this.handleSearch}
          placeholder="Search..."
          suffix={searchSuffix}
          value={searchCurrent}
        />

        {search && (
          <SearchQuery>
            <span>Results for:</span>
            <strong>{search}</strong>
          </SearchQuery>
        )}

        <Table
          columns={columns}
          dataSource={data.get('users').toJS()}
          loading={isLoading}
          pagination={{
            pageSize: data.get('limit'),
            total: data.get('total'),
          }}
          onChange={this.handleTableChange}
          rowKey="email"
          size="small"
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  handleFetchUsers: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.map,
};

UsersPage.defaultProps = {
  handleFetchUsers: noop,
  isLoading: false,
  data: Map(),
};

const mapStateToProps = state => ({
  data: state.getIn(['users', 'data']),
  isLoading: state.getIn(['users', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchUsers: params => dispatch(fetchUsers(params)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPermissions(permissions.USERS_LIST),
)(UsersPage);
