import { Button, Form, message } from 'antd';
import { SectionHeader } from 'components';
import { withForm, withLoading, withPermissions, withTranslate } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { createContent, fetchContent, getContent, updateContent } from 'reducers/content';
import { Component, compose, connect, PropTypes, push, React } from 'utils/create';
import FieldComponent from './FieldComponent';

class ContentPageEdit extends Component {
  handleCancelClick = () => {
    const { pushState, path } = this.props;

    pushState(path);
  };

  handleSubmit = values => {
    const {
      _,
      collection,
      handleCreateContent,
      handleUpdateContent,
      isNew,
      item,
      path,
      pushState,
    } = this.props;

    (isNew
      ? handleCreateContent(collection.get('id'), values)
      : handleUpdateContent(collection.get('id'), item.get('id'), values)
    ).then(() => {
      message.success(_(`messages.content.${isNew ? 'created' : 'updated'}`));
      pushState(`${path}/edit/${values.get('id')}`);
    });
  };

  render() {
    const { _, dirty, handleSubmit, isNew, collection, item } = this.props;

    if (!isNew && item.isEmpty()) {
      // throw new Error(_('errors.collectionNotFound'));
    }

    return (
      <Form layout="vertical" onSubmit={handleSubmit(this.handleSubmit)}>
        <SectionHeader
          action={
            <Button.Group>
              <Button htmlType="button" icon="rollback" onClick={this.handleCancelClick}>
                {_(`global.${dirty ? 'cancel' : 'back'}`)}
              </Button>
              <Button disabled={!dirty} htmlType="submit" icon="save" type="primary">
                {_('global.save')}
              </Button>
            </Button.Group>
          }
          description={_(`collection.description.${isNew ? 'create' : 'edit'}`, collection)}
          title={_(`collection.title.${isNew ? 'create' : 'edit'}`, collection)}
        />

        {collection.get('fields').map(field => (
          <FieldComponent key={field.get('id')} field={field} />
        ))}
      </Form>
    );
  }
}

ContentPageEdit.propTypes = {
  ...PropTypes.form,
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateContent: PropTypes.func,
  handleUpdateContent: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

ContentPageEdit.defaultProps = {
  handleCreateContent: noop,
  handleUpdateContent: noop,
  isNew: true,
  item: Map(),
  pushState: noop,
};

const mapStateToProps = (state, { collection, match: { params } }) => {
  const item = getContent(state, collection.get('id'), params.id);

  return {
    id: params.id,
    item,
    isNew: !params.id,
    initialValues: item,
  };
};

const mapDispatchToProps = {
  pushState: push,
  handleCreateContent: createContent,
  handleUpdateContent: updateContent,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withLoading({
    type: 'contentGet',
    action: ({ collection, id }) => fetchContent(collection.get('id'), id),
    condition: ({ id }) => !!id,
  }),
  withForm('content', { enableReinitialize: true }),
  withTranslate,
)(ContentPageEdit);
