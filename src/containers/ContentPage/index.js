import { noop } from 'lodash';
import { Route, Switch } from 'react-router-dom';
import { fetchContent } from 'reducers/content/actions';
import { withPermissions } from 'utils';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import ContentPageList from './List';
import ContentPageEdit from './Edit';

class ContentPage extends Component {
  componentDidMount() {
    this.props.handleFetchContent();
  }

  render() {
    return (
      <div>
        <h1>Content</h1>

        <Switch>
          <Route exact path="/content" component={ContentPageList} />
          <Route path="/content/:slug" component={ContentPageEdit} />
        </Switch>
      </div>
    );
  }
}

ContentPage.propTypes = {
  handleFetchContent: PropTypes.func,
};

ContentPage.defaultProps = {
  handleFetchContent: noop,
};

const mapDispatchToProps = dispatch => ({
  handleFetchContent: params => dispatch(fetchContent(params)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withPermissions(),
)(ContentPage);
