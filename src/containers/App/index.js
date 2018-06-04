import { Avatar, Breadcrumb, Icon, Layout, Menu, Select, Spin, Tooltip } from 'antd';
import { Logo } from 'components';
import { ContentPage, ErrorPage, HomePage, NotFoundPage, SpacesPage, UsersPage } from 'containers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { getProfile, logout } from 'reducers/auth/actions';
import { colors, permissions, withPermissions } from 'utils';
import { compose, connect, glamorous, PropTypes, React } from 'utils/create';
import { fetchSpaces } from 'reducers/spaces/actions';

const { Sider, Footer } = Layout;

const Container = glamorous(Layout.Content)({
  height: '100%',
  padding: '0 50px',
});

const Content = glamorous.div({
  background: '#fff',
  padding: 24,
  minHeight: 280,
});

const StyledLogo = glamorous(Logo)(({ collapsed }) => ({
  margin: !collapsed ? '3rem' : '1rem',
}));

const UserInfo = glamorous.div({
  cursor: 'pointer',
  backgroundColor: colors.triggerBackground,
  padding: '1rem 0',
  marginBottom: '1rem',
  textAlign: 'center',

  '& div': {
    color: colors.white,
    paddingTop: '1rem',
    opacity: 0.65,
  },
});

const SpaceSelect = glamorous(Select)({
  width: '100%',
  padding: '1rem',
});

const menuItems = [
  {
    key: 'space',
    title: 'Current space',
    items: [
      { key: 'content', title: 'Content', icon: 'form' },
      { key: 'tags', title: 'Tags', icon: 'tags' },
    ],
  },
  {
    key: 'system',
    title: 'System',
    items: [
      { key: 'spaces', title: 'Spaces', icon: 'book' },
      { key: 'users', title: 'Users', icon: 'user', permission: permissions.USERS_LIST },
      { key: 'settings', title: 'Settings', icon: 'setting' },
      { key: 'handleLogout', title: 'Logout', icon: 'handleLogout' },
    ],
  },
];

class App extends React.Component {
  state = {
    collapsed: false,
    error: null,
    errorInfo: null,
  };

  // eslint-disable-next-line react/sort-comp
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.fetchData();
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onProfileClick = () => {
    const { pushState } = this.props;
    pushState('/profile');
  };

  onMenuClick = ({ key }) => {
    const { pushState, handleLogout } = this.props;
    if (!key) {
      return null; // because of https://github.com/ant-design/ant-design/issues/10368
    }

    switch (key) {
      case 'handleLogout':
        return handleLogout();
      default:
        return pushState(`/${key}`);
    }
  };

  onSpaceChange = () => {};

  fetchData = () => {
    const { isAuthenticated, handleGetProfile } = this.props;

    if (isAuthenticated) {
      handleGetProfile();
    }
  };

  render() {
    const { hasPermission, isAuthenticated, isProfileLoading, profile } = this.props;
    const { collapsed, error, errorInfo } = this.state;

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const hasPermissions = ({ permission }) => hasPermission(permission);
    const profileName = profile ? profile.get('name') || profile.get('nickname') : '';

    return (
      <Spin spinning={isProfileLoading}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <StyledLogo collapsed={collapsed} />

            {profile && (
              <Tooltip placement="right" trigger={collapsed ? 'hover' : ''} title={profileName}>
                <UserInfo onClick={this.onProfileClick}>
                  <Avatar size="large" src={profile.get('picture')} />
                  {!collapsed && <div>{profileName}</div>}
                </UserInfo>
              </Tooltip>
            )}

            <SpaceSelect
              showSearch
              placeholder="Select space"
              optionFilterProp="children"
              onChange={this.onSpaceChange}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
            </SpaceSelect>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={this.onMenuClick}>
              {menuItems.map(({ key: groupKey, title: groupTitle, items }) => (
                <Menu.ItemGroup key={groupKey} title={groupTitle}>
                  {items.filter(hasPermissions).map(({ key, title, icon }) => (
                    <Menu.Item key={key}>
                      <Icon type={icon} />
                      <span>{title}</span>
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              ))}
            </Menu>
          </Sider>
          {!isProfileLoading && (
            <Layout>
              <Container>
                {error ? (
                  <ErrorPage error={error} errorInfo={errorInfo} />
                ) : (
                  [
                    <Breadcrumb key="breadcrumb" style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>,
                    <Content key="content">
                      <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/content" component={ContentPage} />
                        <Route path="/spaces" component={SpacesPage} />
                        <Route path="/users" component={UsersPage} />
                        <Route component={NotFoundPage} />
                      </Switch>
                    </Content>,
                  ]
                )}
              </Container>
              <Footer style={{ textAlign: 'center' }}>
                Onionful (MIT) created by <a href="https://hsz.mobi">hsz</a>
              </Footer>
            </Layout>
          )}
        </Layout>
      </Spin>
    );
  }
}

App.propTypes = {
  hasPermission: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isProfileLoading: PropTypes.bool,
  profile: PropTypes.map,
  handleGetProfile: PropTypes.func,
  handleLogout: PropTypes.func,
  pushState: PropTypes.func,
};

App.defaultProps = {
  hasPermission: noop,
  isAuthenticated: false,
  isProfileLoading: true,
  profile: Map(),
  handleGetProfile: noop,
  handleLogout: noop,
  pushState: noop,
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isProfileLoading: state.getIn(['auth', 'isLoading']),
  profile: state.getIn(['auth', 'profile']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchSpaces: params => dispatch(fetchSpaces(params)),
  handleGetProfile: getProfile(dispatch),
  handleLogout: logout(dispatch),
  pushState: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
  withPermissions(),
)(App);
