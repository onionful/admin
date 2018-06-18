import { Button } from 'antd';
import { SectionHeader } from 'components';
import { noop } from 'lodash';
import { Route, Switch } from 'react-router-dom';
import { fetchContent } from 'reducers/content/actions';
import { withPermissions } from 'utils';
import { Component, compose, connect, PropTypes, React, t } from 'utils/create';
import ContentTypePageEdit from './Edit';
import ContentTypePageList from './List';

class ContentTypesPage extends Component {
  componentDidMount() {
    this.props.handleFetchContent();
  }

  render() {
    return (
      <div>
        <SectionHeader
          title={t('contentTypes.title')}
          description={t('contentTypes.description')}
          action={
            <Button key="content-type-create" type="primary" icon="plus">
              {t('global.create')}
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
