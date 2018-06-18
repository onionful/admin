import { Button } from 'antd';
import { SectionHeader } from 'components';
import { noop } from 'lodash';
import { Route, Switch } from 'react-router-dom';
import { fetchContent } from 'reducers/content/actions';
import { withPermissions } from 'utils';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import ContentTypePageList from './List';
import ContentTypePageEdit from './Edit';

class ContentTypesPage extends Component {
  componentDidMount() {
    this.props.handleFetchContent();
  }

  render() {
    return (
      <div>
        <SectionHeader
          title="Content Types"
          description="Create and update your own Content Types."
          action={
            <Button key="content-type-create" type="primary" icon="plus">
              Add content type
            </Button>
          }
        />

        <Switch>
          <Route exact path="/content" component={ContentTypePageList} />
          <Route path="/content/:slug" component={ContentTypePageEdit} />
        </Switch>
      </div>
    );
  }
}

ContentTypesPage.propTypes = {
  handleFetchContent: PropTypes.func,
};

ContentTypesPage.defaultProps = {
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
)(ContentTypesPage);
