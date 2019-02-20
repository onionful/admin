import { Avatar, Icon, Input, Table } from 'antd';
import { withPermissions, withTranslate } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from 'reducers/users';
import { Permission } from 'utils';
import { compose, connect, PropTypes, styled } from 'utils/create';

const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`;

const SearchQuery = styled.div`
  margin-bottom: 1rem;
`;

const UsersPage = ({ _, handleFetchUsers, isLoading, data }) => {
  const [search, setSearch] = useState('');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    handleFetchUsers({ ...pagination, q: search });
  }, [pagination, search]);

  const handleTableChange = (currentPagination, filters, sorter) => {
    setPagination({
      limit: currentPagination.pageSize,
      page: currentPagination.current - 1,
      sort: sorter.field,
      order: sorter.order,
    });
  };

  const handleSearchChange = ({ target: { value } }) => setSearchCurrent(value);

  const handleSearchReset = () => {
    setSearchCurrent('');
    setSearch('');
  };

  const SearchReset = styled(Icon)`
    margin-right: 1rem;
    cursor: pointer;
    visibility: ${searchCurrent ? 'visible' : 'hidden'};
  `;

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

  return (
    <div>
      <h1>{_('global.users')}</h1>
      <SearchWrapper>
        <Input.Search
          enterButton
          placeholder={_('global.searchPlaceholder')}
          suffix={<SearchReset type="close-circle" onClick={handleSearchReset} />}
          value={searchCurrent}
          onChange={handleSearchChange}
          onSearch={value => setSearch(value)}
        />
      </SearchWrapper>

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
        onChange={handleTableChange}
      />
    </div>
  );
};

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
  withPermissions(Permission.USERS_LIST),
  withTranslate,
)(UsersPage);
