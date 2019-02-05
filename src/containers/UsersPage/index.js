import { Avatar, Icon, Input, Table } from 'antd';
import { withPermissions, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import moment from 'moment';
import { fetchUsers } from 'reducers/users';
import { permissions } from 'utils';
import { Component, compose, connect, PropTypes, React, styled } from 'utils/create';

const SearchReset = styled(Icon)`
  margin-right: 1rem;
  cursor: pointer;
`;

const Search = styled(Input.Search)`
  margin-bottom: 1rem;
`;

const SearchQuery = styled.div`
  margin-bottom: 1rem;
`;

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
    this.setState(
      {
        pagination: {
          limit: pagination.pageSize,
          page: pagination.current - 1,
          sort: sorter.field,
          order: sorter.order,
        },
      },
      this.search,
    );
  };

  handleSearch = search => {
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
    const { _, isLoading, data } = this.props;
    const { search, searchCurrent } = this.state;

    const columns = [
      {
        dataIndex: 'picture',
        render: value => <Avatar src={value} />,
      },
      {
        title: _('global.name'),
        dataIndex: 'name',
      },
      {
        title: _('global.email'),
        dataIndex: 'email',
      },
      {
        title: _('global.createdAt'),
        dataIndex: 'created_at',
        render: value => <span title={value}>{moment(value).fromNow()}</span>,
        sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      },
      {
        title: 'Last login',
        dataIndex: 'last_login',
        render: value => <span title={value}>{moment(value).fromNow()}</span>,
        sorter: (a, b) => moment(a.last_login) - moment(b.last_login),
      },
      {
        title: 'Service',
        dataIndex: 'identities',
        render: value =>
          value.map(({ provider }) => (
            <Icon key={provider} type={{ 'google-oauth2': 'google' }[provider] || provider} />
          )),
      },
      {
        title: 'Logins count',
        dataIndex: 'logins_count',
      },
      {
        title: _('global.action'),
        key: 'action',
        render: () => <div>actions</div>,
      },
    ];

    const searchSuffix = searchCurrent ? (
      <SearchReset key="searchReset" type="close-circle" onClick={this.handleSearchReset} />
    ) : null;

    return (
      <div>
        <h1>Users</h1>
        <Search
          enterButton
          placeholder="Search..."
          suffix={searchSuffix}
          value={searchCurrent}
          onChange={this.handleSearchChange}
          onSearch={this.handleSearch}
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
          rowKey={({ email, logins_count: count }) => `${email}_${count}`}
          size="small"
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  _: PropTypes.func.isRequired,
  data: PropTypes.map,
  handleFetchUsers: PropTypes.func,
  isLoading: PropTypes.bool,
};

UsersPage.defaultProps = {
  data: Map(),
  handleFetchUsers: noop,
  isLoading: false,
};

const mapStateToProps = state => ({
  data: state.getIn(['users', 'data']),
  isLoading: state.getIn(['users', 'isLoading']),
});

const mapDispatchToProps = {
  handleFetchUsers: fetchUsers,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(permissions.USERS_LIST),
  withTranslate,
)(UsersPage);
