import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, push, React } from 'utils/create';
import CollectionsContentPageEdit from './Edit';
import CollectionsContentPageList from './List';

const ContentPage = ({ collection, match: { path } }) => (
  <Switch>
    <Route
      exact
      path={path}
      render={props => <CollectionsContentPageList {...props} collection={collection} />}
    />
    <Route
      path={`${path}/create`}
      render={props => (
        <CollectionsContentPageEdit {...props} collection={collection} path={path} />
      )}
    />
    <Route
      path={`${path}/edit/:id`}
      render={props => <CollectionsContentPageEdit {...props} path={path} />}
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
