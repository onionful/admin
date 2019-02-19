import { withPermissions } from 'hocs';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, push, React } from 'utils/create';
import CollectionsPageEdit from './Edit';
import CollectionsPageList from './List';

const CollectionsPage = ({ match: { path } }) => (
  <Switch>
    <Route exact component={CollectionsPageList} path={path} />
    <Route
      path={`${path}/create`}
      render={props => <CollectionsPageEdit {...props} path={path} />}
    />
    <Route
      path={`${path}/edit/:id`}
      render={props => <CollectionsPageEdit {...props} path={path} />}
    />
  </Switch>
);

CollectionsPage.propTypes = {
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
)(CollectionsPage);
