import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import CollectionsContentPageEdit from './Edit';
import CollectionsContentPageList from './List';

const CollectionsContentPage = ({ collection, match: { path } }) => (
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

CollectionsContentPage.propTypes = {
  match: PropTypes.match.isRequired,
  collection: PropTypes.map.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handlePush: path => dispatch(push(path)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withPermissions(),
  withRouter,
)(CollectionsContentPage);
