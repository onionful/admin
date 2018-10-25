import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import CollectionPageEdit from './Edit';
import CollectionPageList from './List';

const CollectionPage = ({ collection, match: { path } }) => (
  <Switch>
    <Route
      exact
      path={path}
      render={props => <CollectionPageList {...props} collection={collection} />}
    />
    <Route path={`${path}/create`} render={props => <CollectionPageEdit {...props} path={path} />} />
    <Route path={`${path}/edit/:id`} render={props => <CollectionPageEdit {...props} path={path} />} />
  </Switch>
);

CollectionPage.propTypes = {
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
)(CollectionPage);
