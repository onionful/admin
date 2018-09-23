import { push } from 'connected-react-router';
import { withPermissions } from 'helpers';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose, connect, PropTypes, React } from 'utils/create';
import ContentPageEdit from './Edit';
import ContentPageList from './List';

const ContentPage = ({ contentType, match: { path } }) => (
  <Switch>
    <Route
      exact
      path={path}
      render={props => <ContentPageList {...props} contentType={contentType} />}
    />
    <Route path={`${path}/create`} render={props => <ContentPageEdit {...props} path={path} />} />
    <Route path={`${path}/edit/:id`} render={props => <ContentPageEdit {...props} path={path} />} />
  </Switch>
);

ContentPage.propTypes = {
  match: PropTypes.match.isRequired,
  contentType: PropTypes.map.isRequired,
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
)(ContentPage);
