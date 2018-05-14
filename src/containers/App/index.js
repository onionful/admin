import { React, PropTypes, connect, glamorous } from 'utils/create';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Avatar, Breadcrumb, Icon, Layout, Menu, Tooltip, Select } from 'antd';
import { HomePage, ContentPage, NotFoundPage } from 'containers';
import { Logo } from 'components';
import { handleLogout, handleGetProfile } from 'reducers/auth/actions';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { colors } from 'utils';

const { Sider, Content, Footer } = Layout;

const StyledLogo = glamorous(Logo)(({ collapsed }) => ({ margin: !collapsed ? '3rem' : '1rem' }));

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
  }, {
    key: 'system',
    title: 'System',
    items: [
      { key: 'spaces', title: 'Spaces', icon: 'book' },
      { key: 'users', title: 'Users', icon: 'user' },
      { key: 'settings', title: 'Settings', icon: 'setting' },
      { key: 'logout', title: 'Logout', icon: 'logout' },
    ],
  }];

class App extends React.Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.fetchData();
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onProfileClick = () => {
    const { pushState } = this.props;
    pushState('/profile');
  };

  onMenuClick = ({ key }) => {
    const { pushState, logout } = this.props;

    switch (key) {
      case 'logout':
        return logout();
      default:
        return pushState(`/${key}`);
    }
  };

  onSpaceChange = () => {
  };

  fetchData = () => {
    const { isAuthenticated, getProfile } = this.props;

    if (isAuthenticated) {
      getProfile();
    }
  };

  render() {
    const { isAuthenticated, profile } = this.props;
    const { collapsed } = this.state;

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const profileName = profile ? (profile.get('name') || profile.get('nickname')) : '';

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
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
                {items.map(({ key, title, icon }) => (
                  <Menu.Item key={key}>
                    <Icon type={icon} />
                    <span>{title}</span>
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/content" component={ContentPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Onionful (MIT) created by <a href="https://hsz.mobi">hsz</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  logout: PropTypes.func,
  getProfile: PropTypes.func,
  pushState: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.map,
};

App.defaultProps = {
  logout: noop,
  getProfile: noop,
  pushState: noop,
  isAuthenticated: false,
  profile: Map(),
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  profile: state.getIn(['auth', 'profile']),
});

const mapDispatchToProps = dispatch => ({
  logout: handleLogout(dispatch),
  getProfile: handleGetProfile(dispatch),
  pushState: path => dispatch(push(path)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
