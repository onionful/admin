import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { HomePage, ContentPage, NotFoundPage } from 'containers';
import { Logo } from 'components';
import { authActions } from 'reducers/auth';
import { withAuth, authPropTypes } from 'utils';

const { Sider, Content, Footer } = Layout;

const StyledLogo = glamorous(Logo)(({ collapsed }) => ({
  margin: !collapsed ? '3rem' : '1rem',
}));

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onMenuClick = ({ key }) => {
    switch (key) {
      case 'content':
        return '';
      case 'logout':
        return this.props.auth.logout();
      default:
        throw new Error(`Unknown action: ${key}`);
    }
  };

  render() {
    const { collapsed } = this.state;
    const { auth } = this.props;

    if (!auth.isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <StyledLogo collapsed={collapsed} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={this.onMenuClick}>
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
  ...authPropTypes,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginSuccess: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
  loginError: error => dispatch(authActions.loginError(error)),
});

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(withAuth(App)));
