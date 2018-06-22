import { Spin } from 'antd';
import { push } from 'connected-react-router';
import { noop } from 'lodash';
import { Route, Switch, withRouter } from 'react-router-dom';
import { fetchContentTypes } from 'reducers/contentType/actions';
import { withPermissions } from 'utils';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import ContentTypeForm from './Form';
import ContentTypeList from './List';

class ContentTypePage extends Component {
  componentDidMount() {
    this.props.handleFetchContentTypes();
  }

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
    const { isLoading, path } = this.props;

    return isLoading ? (
      <Spin />
    ) : (
      <Switch>
        <Route exact path={path} render={props => <ContentTypeList {...props} path={path} />} />
        <Route
          path={`${path}/create`}
          render={props => <ContentTypeForm {...props} onSubmit={this.onCreateClick} />}
        />
        <Route
          path={`${path}/edit/:id`}
          render={props => <ContentTypeForm {...props} onSubmit={this.onUpdateClick} />}
        />
      </Switch>
    );
  }
}

ContentTypePage.propTypes = {
  handleFetchContentTypes: PropTypes.func,
  handlePush: PropTypes.func,
  isLoading: PropTypes.bool,
  path: PropTypes.string,
};

ContentTypePage.defaultProps = {
  handleFetchContentTypes: noop,
  handlePush: noop,
  isLoading: true,
  path: '/',
};

const mapStateToProps = (state, { match: { path } }) => ({
  isLoading: state.getIn(['contentType', 'isLoading']),
  path,
});

const mapDispatchToProps = dispatch => ({
  handleFetchContentTypes: params => dispatch(fetchContentTypes(params)),
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
