import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import ContentTypesPageEdit from './Edit';
import ContentTypesPageList from './List';

const ContentTypesPage = ({ match: { path } }) => (
  <Switch>
    <Route exact path={path} component={ContentTypesPageList} />
    <Route
      path={`${path}/create`}
      render={props => <ContentTypesPageEdit {...props} path={path} />}
    />
    <Route
      path={`${path}/edit/:id`}
      render={props => <ContentTypesPageEdit {...props} path={path} />}
    />
  </Switch>
);

ContentTypesPage.propTypes = {
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
)(ContentTypesPage);
