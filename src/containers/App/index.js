import { Avatar, Icon, Layout, Menu, Select, Tooltip } from 'antd';
import { Logo, SpacesModal } from 'components';
import {
  CollectionsContentPage,
  CollectionsPage,
  ErrorPage,
  HomePage,
  NotFoundPage,
  SpacesPage,
  UsersPage,
} from 'containers';
import { withLoading, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { getProfile } from 'reducers/auth';
import { fetchProfile, logout } from 'reducers/auth/actions';
import { getCollections } from 'reducers/collections/actions';
import { getCurrentSpace, getSpaces, setSpace } from 'reducers/spaces/actions';
import { colors, media, permissions } from 'utils';
import { compose, connect, PropTypes, push, React, styled } from 'utils/create';

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
  constructor(...args) {
    super(...args);

    const { space } = this.props;

    this.state = {
      collapsed: false,
      error: null,
      errorInfo: null,
      spacesModalVisible: !space,
    };
  }

  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleErrorDismiss = () => {
    const { handlePush } = this.props;

    this.setState({ error: null, errorInfo: null }, () => handlePush('/'));
  };

  handleMenuClick = ({ key }) => {
    const { handlePush, handleLogout } = this.props;

    switch (key) {
      case 'logout':
        return handleLogout();
      default:
        return handlePush(`/${key}`);
    }
  };

  handleSpaceChange = space => {
    const { handleSetSpace } = this.props;

    handleSetSpace(space);
  };

  handleSpaceCreate = () => {
    const { handlePush } = this.props;
    this.setState({ spacesModalVisible: false }, () => handlePush('/spaces/create'));
  };

  handleSetSpace = space => {
    const { handleSetSpace } = this.props;

    this.setState({ spacesModalVisible: false }, () => handleSetSpace(space));
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { _, hasPermission, isAuthenticated, profile, space, spaces, collections } = this.props;
    const { collapsed, error, errorInfo, spacesModalVisible } = this.state;

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
          { key: 'spaces', icon: 'rocket', component: SpacesPage },
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
      <Layout style={{ minHeight: '100vh', maxWidth: media.xl }}>
        <Layout.Sider
          collapsible
          breakpoint="lg"
          collapsed={collapsed}
          onCollapse={this.handleCollapse}
        >
          <Link to="/">
            <StyledLogo collapsed={collapsed} />
          </Link>

          {profile && (
            <Tooltip placement="right" title={profileName} trigger={collapsed ? 'hover' : ''}>
              <Link to="/profile">
                <UserInfo>
                  <Avatar size="large" src={profile.get('picture')} />
                  {!collapsed && <div>{profileName}</div>}
                </UserInfo>
              </Link>
            </Tooltip>
          )}

          <SpaceSelect
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            optionFilterProp="children"
            placeholder={_('global.selectSpace')}
            value={space}
            onChange={this.handleSpaceChange}
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
            onClick={this.handleMenuClick}
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
        </Layout.Sider>

        <SpacesModal
          visible={spacesModalVisible}
          onCreate={this.handleSpaceCreate}
          onSetSpace={this.handleSetSpace}
        />

        {(!spacesModalVisible || error) && (
          <Layout>
            <Container>
              {error ? (
                <ErrorPage
                  error={error}
                  errorInfo={errorInfo}
                  onDismiss={this.handleErrorDismiss}
                />
              ) : (
                <Content>
                  <Switch>
                    <Route exact component={HomePage} path="/" />
                    {menuItems.map(section =>
                      section.items.map(({ key, render, component }) => (
                        <Route component={component} path={`/${key}`} render={render} />
                      )),
                    )}
                    <Route component={NotFoundPage} />
                  </Switch>
                </Content>
              )}
            </Container>
            <Layout.Footer style={{ textAlign: 'center' }}>{_('global.copyrights')}</Layout.Footer>
          </Layout>
        )}
      </Layout>
    );
  }
}

App.propTypes = {
  _: PropTypes.func.isRequired,
  collections: PropTypes.map,
  handleLogout: PropTypes.func,
  handlePush: PropTypes.func,
  handleSetSpace: PropTypes.func,
  hasPermission: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.map,
  space: PropTypes.string,
  spaces: PropTypes.map,
};

App.defaultProps = {
  collections: Map(),
  handleLogout: noop,
  handlePush: noop,
  handleSetSpace: noop,
  hasPermission: noop,
  isAuthenticated: false,
  profile: Map(),
  space: null,
  spaces: Map(),
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  profile: getProfile(state),
  space: getCurrentSpace(state),
  spaces: getSpaces(state),
  collections: getCollections(state),
});

const mapDispatchToProps = {
  handleLogout: logout,
  handlePush: push,
  handleSetSpace: setSpace,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'profileGet',
    action: fetchProfile,
  }),
  withRouter,
  withTranslate,
)(App);
