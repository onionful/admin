import { Button, Form, Input, message } from 'antd';
import { SectionHeader } from 'components';
import { Identifier } from 'components/Form';
import { withForm, withPermissions, withTranslate, WithTranslateProps } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import React, { FunctionComponent } from 'react';
import { ApplicationState } from 'reducers';
import { createCollection, getCollection, updateCollection } from 'reducers/collections';
import { InjectedFormProps } from 'redux-form';
import { Field, FieldArray, Fields } from 'redux-form/immutable';
import { Collection } from 'types';
import { compose, connect, PropTypes, push } from 'utils/create';
import DraggableFieldsTable from './DraggableFieldsTable';

interface OwnProps {
  path: string;
}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps & WithTranslateProps;

const CollectionsPageEdit: FunctionComponent<Props> = (
  { _, dirty, handleSubmit, path },
  { createField },
) => {
  const pushState = (path: string) => {};
  const handleCreateCollection = () => {};
  const handleUpdateCollection = () => {};
  const isNew = true;
  const item = null;

  const handleCancelClick = () => pushState(path);

  // @ts-ignore
  const handleFormSubmit = values =>
    // @ts-ignore
    (isNew ? handleCreateCollection(values) : handleUpdateCollection(item.get('id'), values)).then(
      () => {
        message.success(_(`messages.collections.${isNew ? 'created' : 'updated'}`));
        pushState(`${path}/edit/${values.get('id')}`);
      },
    );

  if (!isNew && !item) {
    // @ts-ignore
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
        // @ts-ignore
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

CollectionsPageEdit.contextTypes = {
  createField: PropTypes.func.isRequired,
};

// @ts-ignore
const mapStateToProps = (state: ApplicationState, { match: { params } }) => {
  const item = getCollection(state, params.id);

  return {
    id: params.id,
    item,
    isNew: !params.id,
    initialValues: item,
  };
};

export default compose(
  withPermissions(),
  withForm('collections', { enableReinitialize: true }),
  withTranslate,
)(CollectionsPageEdit);
