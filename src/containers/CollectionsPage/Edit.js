import { Button, Form, Input, message } from 'antd';
import { SectionHeader } from 'components';
import { Identifier } from 'components/Form';
import { withForm, withLoading, withPermissions, withTranslate } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import {
  createCollection,
  fetchCollection,
  getCollection,
  updateCollection,
} from 'reducers/collections';
import { Field, FieldArray, Fields } from 'redux-form/immutable';
import { compose, connect, PropTypes, push, React } from 'utils/create';
import DraggableFieldsTable from './DraggableFieldsTable';

const CollectionsPageEdit = (
  {
    _,
    dirty,
    handleSubmit,
    isNew,
    item,
    handleCreateCollection,
    handleUpdateCollection,
    path,
    pushState,
  },
  { createField },
) => {
  const handleCancelClick = () => pushState(path);

  const handleFormSubmit = values =>
    (isNew ? handleCreateCollection(values) : handleUpdateCollection(item.get('id'), values)).then(
      () => {
        message.success(_(`messages.collections.${isNew ? 'created' : 'updated'}`));
        pushState(`${path}/edit/${values.get('id')}`);
      },
    );

  if (!isNew && !item.has('id')) {
    throw new Error(_('errors.collectionNotFound'));
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionHeader
        action={
          <Button.Group>
            <Button htmlType="button" icon="rollback" onClick={handleCancelClick}>
              {_(`global.${dirty ? 'cancel' : 'back'}`)}
            </Button>
            <Button disabled={!dirty} htmlType="submit" icon="save" type="primary">
              {_('global.save')}
            </Button>
          </Button.Group>
        }
        description={_(`collections.description.${isNew ? 'create' : 'edit'}`)}
        title={_(`collections.title.${isNew ? 'create' : 'edit'}`, item)}
      />

      <Fields autoGenerateId={isNew} component={Identifier} names={['name', 'id']} />
      <Field
        autosize
        component={createField(Input.TextArea)}
        label={_('global.description')}
        name="description"
      />

      <FieldArray component={DraggableFieldsTable} name="fields" />
    </Form>
  );
};

CollectionsPageEdit.propTypes = {
  ...PropTypes.form,
  _: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateCollection: PropTypes.func,
  handleUpdateCollection: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

CollectionsPageEdit.defaultProps = {
  handleCreateCollection: noop,
  handleUpdateCollection: noop,
  isNew: true,
  item: Map(),
  pushState: noop,
};

CollectionsPageEdit.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { match: { params } }) => {
  const item = getCollection(state, params.id);

  return {
    id: params.id,
    item,
    isNew: !params.id,
    initialValues: item,
  };
};

const mapDispatchToProps = {
  pushState: push,
  handleCreateCollection: createCollection,
  handleUpdateCollection: updateCollection,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withLoading({
    type: 'collectionsGet',
    action: ({ id }) => fetchCollection(id),
    condition: ({ id }) => !!id,
  }),
  withForm('collections', { enableReinitialize: true }),
  withTranslate,
)(CollectionsPageEdit);
