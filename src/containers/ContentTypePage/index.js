import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import ContentTypePageEdit from './Edit';
import ContentTypePageList from './List';

const ContentTypePage = ({ match: { path } }) => (
  <Switch>
    <Route exact path={path} component={ContentTypePageList} />
    <Route
      path={`${path}/create`}
      render={props => <ContentTypePageEdit {...props} path={path} />}
    />
    <Route
      path={`${path}/edit/:id`}
      render={props => <ContentTypePageEdit {...props} path={path} />}
    />
  </Switch>
);

ContentTypePage.propTypes = {
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
)(ContentTypePage);
