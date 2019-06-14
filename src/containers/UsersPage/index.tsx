import { Avatar, Icon, Input, Table } from 'antd';
import { WithTranslateProps, withPermissions, withTranslate } from 'hocs';
import moment from 'moment';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ResolveThunks } from 'react-redux';
import { ApplicationState } from 'reducers';
import { fetchUsersList } from 'reducers/users';
import { Permission } from 'utils';
import { compose, connect, styled } from 'utils/create';

const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`;

const SearchQuery = styled.div`
  margin-bottom: 1rem;
`;

interface OwnProps {}

interface StateProps {
  data: any;
}

interface DispatchProps {
  handleFetchUsers: (params: any) => void;
}

type Props = OwnProps & StateProps & ResolveThunks<DispatchProps> & WithTranslateProps;

const UsersPage: FunctionComponent<Props> = ({ _, handleFetchUsers, data }) => {
  const [search, setSearch] = useState('');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    handleFetchUsers({ ...pagination, q: search });
  }, [handleFetchUsers, pagination, search]);

  const handleTableChange = (currentPagination: any, filters: any, sorter: any) => {
    setPagination({
      limit: currentPagination.pageSize,
      page: currentPagination.current - 1,
      sort: sorter.field,
      order: sorter.order,
    });
  };

  const handleSearchChange = ({ target: { value } }: any) => setSearchCurrent(value);

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
      render: (value: string) => <Avatar src={value} />,
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
      render: (value: any) => <span title={value}>{moment(value).fromNow()}</span>,
      sorter: (a: any, b: any) => +moment(a.created_at) - +moment(b.created_at),
    },
    {
      title: 'Last login',
      dataIndex: 'last_login',
      render: (value: any) => <span title={value}>{moment(value).fromNow()}</span>,
      sorter: (a: any, b: any) => +moment(a.last_login) - +moment(b.last_login),
    },
    {
      title: 'Service',
      dataIndex: 'identities',
      render: (value: any) =>
        value.map(({ provider }: any) => (
          // @ts-ignore
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
          placeholder={_('global.searchPlaceholder').toString()}
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
        dataSource={data.users}
        loading={false}
        pagination={{
          pageSize: data.limit,
          total: data.total,
        }}
        rowKey={({ email, logins_count: count }) => `${email}_${count}`}
        size="small"
        onChange={handleTableChange}
      />
    </div>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => ({
  data: state.users.data,
});

const mapDispatchToProps: DispatchProps = {
  handleFetchUsers: fetchUsersList,
};

export default compose<FunctionComponent<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(Permission.USERS_LIST),
  withTranslate,
)(UsersPage);
