import { Avatar, Icon, Layout, Menu, Select, Spin, Tooltip } from 'antd';
import { Logo, SpacesModal } from 'components';
import { push } from 'connected-react-router';
import {
  CollectionsContentPage,
  CollectionsPage,
  ErrorPage,
  HomePage,
  NotFoundPage,
  SpacesPage,
  UsersPage,
} from 'containers';
import { withTranslate } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { getProfile } from 'reducers/auth';
import { fetchProfile, logout } from 'reducers/auth/actions';
import { getCollections } from 'reducers/collections/actions';
import { getCurrentSpace, getSpaces, setSpace } from 'reducers/spaces/actions';
import { colors, media, permissions } from 'utils';
import { compose, connect, PropTypes, React, styled } from 'utils/create';

const { Sider, Footer } = Layout;

const Container = styled(Layout.Content)({
  position: 'relative',
  height: '100%',
  padding: '20px',
});

const Content = styled.div({
  background: '#fff',
  padding: 24,
});

const StyledLogo = styled(Logo)(({ collapsed }) => ({
  margin: !collapsed ? '3rem' : '1rem',
}));

const UserInfo = styled.div({
  cursor: 'pointer',
  backgroundColor: colors.background,
  padding: '1rem 0',
  marginBottom: '1rem',
  textAlign: 'center',

  '& div': {
    color: colors.white,
    paddingTop: '1rem',
    opacity: 0.65,
  },
});

const SpaceSelect = styled(Select)({
  width: '100%',
  padding: '1rem',
});

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
    const { isAuthenticated } = this.props;

    if (isAuthenticated !== prevProps.isAuthenticated) {
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

    switch (key) {
      case 'logout':
        return handleLogout();
      default:
        return pushState(`/${key}`);
    }
  };

  onSpaceChange = space => {
    const { handleSetSpace } = this.props;

    handleSetSpace(space);
  };

  fetchData = () => {
    const { isAuthenticated, handleGetProfile } = this.props;

    if (isAuthenticated) {
      handleGetProfile().catch(error =>
        this.setState({
          error,
          errorInfo: { componentStack: JSON.stringify((error.response || {}).data, null, 2) },
        }),
      );
    }
  };

  render() {
    const {
      _,
      hasPermission,
      isAuthenticated,
      isProfileLoading,
      profile,
      space,
      spaces,
      collections,
    } = this.props;
    const { collapsed, error, errorInfo } = this.state;

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const hasPermissions = ({ permission }) => hasPermission(permission) || true;
    const profileName = profile ? profile.get('name') || profile.get('nickname') : '';

    const menuItems = [
      {
        key: 'collection',
        items: [
          ...collections.toList().map(collection => ({
            key: `collection/${collection.get('id')}`,
            icon: 'file',
            name: collection.get('name'),
            render: props => <CollectionsContentPage {...props} collection={collection} />,
          })),
          {
            key: 'collections',
            icon: 'file-add',
            component: CollectionsPage,
            permission: permissions.USERS_LIST,
          },
        ],
      },
      {
        key: 'system',
        items: [
          { key: 'spaces', icon: 'book', component: SpacesPage },
          {
            key: 'users',
            icon: 'user',
            component: UsersPage,
            permission: permissions.USERS_LIST,
          },
          { key: 'settings', icon: 'setting' },
          { key: 'logout', icon: 'logout' },
        ],
      },
    ];

    return (
      <Spin spinning={isProfileLoading}>
        <Layout style={{ minHeight: '100vh', maxWidth: media.xl }}>
          <Sider collapsible breakpoint="lg" collapsed={collapsed} onCollapse={this.onCollapse}>
            <StyledLogo collapsed={collapsed} />

            {profile && (
              <Tooltip placement="right" title={profileName} trigger={collapsed ? 'hover' : ''}>
                <UserInfo onClick={this.onProfileClick}>
                  <Avatar size="large" src={profile.get('picture')} />
                  {!collapsed && <div>{profileName}</div>}
                </UserInfo>
              </Tooltip>
            )}

            <Spin spinning={spaces.isEmpty()}>
              <SpaceSelect
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                placeholder={_('global.selectSpace')}
                value={space}
                onChange={this.onSpaceChange}
              >
                {spaces.toList().map(item => (
                  <Select.Option key={item.get('id')} value={item.get('id')}>
                    {item.get('name')}
                  </Select.Option>
                ))}
              </SpaceSelect>

              <Menu
                defaultSelectedKeys={['4']}
                mode="inline"
                theme="dark"
                onClick={this.onMenuClick}
              >
                {menuItems.map(group => (
                  <Menu.ItemGroup key={group.key} title={_(`menu.${group.key}`)}>
                    {group.items.filter(hasPermissions).map(item => (
                      <Menu.Item key={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.name || _(`menu.${item.key}`)}</span>
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                ))}
              </Menu>
            </Spin>
          </Sider>

          {!isProfileLoading && !space && !error && <SpacesModal />}

          {!isProfileLoading && (space || error) && (
            <Layout>
              <Container>
                {error ? (
                  <ErrorPage error={error} errorInfo={errorInfo} />
                ) : (
                  <Content>
                    <Switch>
                      <Route exact component={HomePage} path="/" />
                      {menuItems.map(section =>
                        section.items
                          // .filter(({ component }) => component)
                          .map(({ key, render, component }) => (
                            <Route component={component} path={`/${key}`} render={render} />
                          )),
                      )}
                      <Route component={NotFoundPage} />
                    </Switch>
                  </Content>
                )}
              </Container>
              <Footer style={{ textAlign: 'center' }}>{_('global.copyrights')}</Footer>
            </Layout>
          )}
        </Layout>
      </Spin>
    );
  }
}

App.propTypes = {
  _: PropTypes.func.isRequired,
  collections: PropTypes.map,
  handleGetProfile: PropTypes.func,
  handleLogout: PropTypes.func,
  handleSetSpace: PropTypes.func,
  hasPermission: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isProfileLoading: PropTypes.bool,
  profile: PropTypes.map,
  pushState: PropTypes.func,
  space: PropTypes.string,
  spaces: PropTypes.map,
};

App.defaultProps = {
  collections: Map(),
  handleGetProfile: noop,
  handleLogout: noop,
  handleSetSpace: noop,
  hasPermission: noop,
  isAuthenticated: false,
  isProfileLoading: true,
  profile: Map(),
  pushState: noop,
  space: null,
  spaces: Map(),
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isProfileLoading: state.getIn(['auth', 'isLoading']),
  profile: getProfile(state),
  space: getCurrentSpace(state),
  spaces: getSpaces(state),
  collections: getCollections(state),
});

const mapDispatchToProps = dispatch => ({
  handleGetProfile: () => dispatch(fetchProfile()),
  handleLogout: logout(dispatch),
  handleSetSpace: space => dispatch(setSpace(space)),
  pushState: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
  withTranslate,
)(App);
