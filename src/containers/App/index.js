import { React, PropTypes, connect, glamorous } from 'utils/create';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Avatar, Breadcrumb, Icon, Layout, Menu, Tooltip } from 'antd';
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
  textAlign: 'center',

  '& div': {
    color: colors.white,
    paddingTop: '1rem',
    opacity: 0.65,
  },
});

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
    console.log('onProfileClick!');
  };

  onMenuClick = ({ key }) => {
    const { logout } = this.props;

    switch (key) {
      case 'content':
        return '';
      case 'logout':
        return logout();
      default:
        throw new Error(`Unknown action: ${key}`);
    }
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
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            onClick={this.onMenuClick}
          >
            <Menu.Item key="content">
              <Icon type="form" />
              <span>Content</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="tags" />
              <span>Tags</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>Users</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="book" />
              <span>Spaces</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="setting" />
              <span>Settings</span>
            </Menu.Item>
            <Menu.Item key="logout">
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
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
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  logout: PropTypes.func,
  getProfile: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.map,
};

App.defaultProps = {
  logout: noop,
  getProfile: noop,
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
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
