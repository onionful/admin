import { fetchProfile } from 'actions/profile';
import { Icon, Layout, Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { Logo } from 'components';
import {
  CollectionsPage,
  ContentPage,
  ErrorPage,
  HomePage,
  NotFoundPage,
  SpacesPage,
  UsersPage,
} from 'containers';
import {
  withAuthCheck,
  withErrorHandler,
  WithErrorHandlerProps,
  withLoading,
  WithLoadingProps,
  WithTranslateProps,
} from 'hocs';
import { useAuth } from 'hooks';
import React, { ComponentType, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { getCollections } from 'reducers/collections';
import { getCurrentSpace } from 'reducers/spaces';
import { media, Permission } from 'utils';
import { compose, push, styled } from 'utils/create';
import ProfileBox from './ProfileBox';
import SpacesBox from './SpacesBox';

interface MenuItem {
  key: string;
  icon: string;
  name?: string;
  permission?: string;
  disabled?: boolean;
  component?: ComponentType;
  render?: (props: any) => JSX.Element;
}

interface MenuItemGroup {
  key: string;
  items: MenuItem[];
}

type Props = WithErrorHandlerProps & WithLoadingProps & WithTranslateProps;

const Container = styled(Layout.Content)`
  position: relative;
  height: 100%;
  padding: 20px;
`;

const Content = styled.div`
  background: #fff;
  padding: 24px;
`;

const StyledLogo = styled(Logo)`
  display: block;
  margin: 2rem auto;
  width: 50%;
`;

const App: FunctionComponent<Props> = ({ error, errorInfo, isLoading }) => {
  const dispatch = useDispatch();
  const collections = useSelector(getCollections);
  const space = useSelector(getCurrentSpace);
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const { logout } = useAuth();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handlePush = useCallback((path: string) => dispatch(push(path)), [dispatch]);

  const handleMenuClick = useCallback(
    ({ key }: ClickParam) => {
      switch (key) {
        case 'logout':
          logout();
          return handlePush('/login');
        default:
          return handlePush(`/${key}`);
      }
    },
    [handlePush, logout],
  );
  const handleErrorDismiss = useCallback(() => {}, []);

  // const hasPermissions = ({ permission }) => hasPermission(permission) || true;

  const menuItems: MenuItemGroup[] = [
    {
      key: 'collection',
      items: Object.values(collections)
        .map<MenuItem>(collection => ({
          key: `collection/${collection.id}`,
          icon: 'file',
          name: collection.name,
          render: props => <ContentPage {...props} collection={collection} />,
        }))
        .concat({
          key: 'collections',
          icon: 'file-add',
          component: CollectionsPage,
          permission: Permission.USERS_LIST,
          disabled: !!space,
        }),
    },
    {
      key: 'system',
      items: [
        { key: 'spaces', icon: 'rocket', component: SpacesPage },
        {
          key: 'users',
          icon: 'user',
          component: UsersPage,
          permission: Permission.USERS_LIST,
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
        onCollapse={value => setCollapsed(value)}
      >
        <Link to="/">
          <StyledLogo />
        </Link>

        <ProfileBox collapsed={collapsed} />
        <SpacesBox collapsed={collapsed} space={space} />

        <Menu defaultSelectedKeys={['4']} mode="inline" theme="dark" onClick={handleMenuClick}>
          {menuItems.map(group => (
            <Menu.ItemGroup key={group.key} title={t(`menu.${group.key}`)}>
              {/*{group.items.filter(hasPermissions)}*/}
              {group.items.map(item => (
                <Menu.Item key={item.key} disabled={item.disabled}>
                  <Icon type={item.icon} />
                  <span>{item.name || t(`menu.${item.key}`) || ''}</span>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          ))}
        </Menu>
      </Layout.Sider>

      <Layout>
        <Container>
          {!isLoading &&
            (error ? (
              <ErrorPage error={error} errorInfo={errorInfo} onDismiss={handleErrorDismiss} />
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
            ))}
        </Container>
        <Layout.Footer style={{ textAlign: 'center' }}>{t('global.copyrights')}</Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default compose<FunctionComponent>(
  withRouter,
  withAuthCheck,
  withErrorHandler,
  withLoading('profileFetch'),
)(App);
