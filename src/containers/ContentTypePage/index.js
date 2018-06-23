import { push } from 'connected-react-router';
import { noop } from 'lodash';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withPermissions } from 'helpers';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import ContentTypePageEdit from './Edit';
import ContentTypePageList from './List';

class ContentTypePage extends Component {
  onCancelClick = () => {
    const { handlePush, path } = this.props;
    handlePush(path);
  };

  onCreateClick = () => {
    const { handlePush, path } = this.props;
    handlePush(`${path}/create`);
  };

  onUpdateClick = () => {
    const { handlePush, path } = this.props;
    handlePush(path);
  };

  render() {
    const { path } = this.props;

    return (
      <Switch>
        <Route exact path={path} render={props => <ContentTypePageList {...props} path={path} />} />
        <Route path={`${path}/create`} component={ContentTypePageEdit} />
        <Route path={`${path}/edit/:id`} component={ContentTypePageEdit} />
      </Switch>
    );
  }
}

ContentTypePage.propTypes = {
  handlePush: PropTypes.func,
  path: PropTypes.string,
};

ContentTypePage.defaultProps = {
  handlePush: noop,
  path: '/',
};

const mapStateToProps = (state, { match: { path } }) => ({
  path,
});

const mapDispatchToProps = dispatch => ({
  handlePush: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withRouter,
)(ContentTypePage);
