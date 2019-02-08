import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, push, React } from 'utils/create';
import ContentPageEdit from './Edit';
import ContentPageList from './List';

const ContentPage = ({ collection, match: { path } }) => (
  <Switch>
    <Route
      exact
      path={path}
      render={props => <ContentPageList {...Object.assign(props, { collection })} />}
    />
    <Route
      path={`${path}/create`}
      render={props => <ContentPageEdit {...Object.assign(props, { collection, path })} />}
    />
    <Route
      path={`${path}/edit/:id`}
      render={props => <ContentPageEdit {...Object.assign(props, { collection, path })} />}
    />
  </Switch>
);

ContentPage.propTypes = {
  collection: PropTypes.map.isRequired,
  match: PropTypes.match.isRequired,
};

const mapDispatchToProps = {
  handlePush: push,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withPermissions(),
  withRouter,
)(ContentPage);
