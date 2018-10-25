import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import CollectionsPageEdit from './Edit';
import CollectionsPageList from './List';

const CollectionsPage = ({ match: { path } }) => (
  <Switch>
    <Route exact path={path} component={CollectionsPageList} />
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
)(CollectionsPage);
