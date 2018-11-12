import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import SpacesPageEdit from './Edit';
import SpacesPageList from './List';

const SpacesPage = ({ match: { path } }) => (
  <Switch>
    <Route exact component={SpacesPageList} path={path} />
    <Route path={`${path}/create`} render={props => <SpacesPageEdit {...props} path={path} />} />
    <Route path={`${path}/edit/:id`} render={props => <SpacesPageEdit {...props} path={path} />} />
  </Switch>
);

SpacesPage.propTypes = {
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
)(SpacesPage);
