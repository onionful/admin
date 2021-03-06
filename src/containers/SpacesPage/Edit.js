import { Button, Input, message } from 'antd';
import { SectionHeader } from 'components';
import { Identifier, UsersSelect } from 'components/Form';
import { withForm, withLoading, withPermissions, withTranslate } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { useEffect } from 'react';
import { createSpace, fetchSpace, getSpace, updateSpace } from 'reducers/spaces';
import { fetchLabels } from 'reducers/users';
import { Field, Fields, Form } from 'redux-form/immutable';
import { compose, connect, PropTypes, push, React } from 'utils/create';

const SpacesPageEdit = (
  {
    _,
    dirty,
    handleCreateSpace,
    handleFetchLabels,
    handleSubmit,
    handleUpdateSpace,
    initialize,
    isNew,
    item,
    path,
    pushState,
  },
  { createField },
) => {
  useEffect(() => {
    const { owners = [], users = [] } = item.toJS();
    handleFetchLabels(owners, users);
  }, [item]);

  const handleCancelClick = () => pushState(path);

  const handleFormSubmit = values =>
    (isNew ? handleCreateSpace(values) : handleUpdateSpace(item.get('id'), values)).then(() => {
      message.success(_(`messages.spaces.${isNew ? 'created' : 'updated'}`));
      pushState(`${path}/edit/${values.get('id')}`);
      initialize(values);
    });

  if (!isNew && item.isEmpty()) {
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
        description={_(`spaces.description.${isNew ? 'create' : 'edit'}`)}
        title={_(`spaces.title.${isNew ? 'create' : 'edit'}`, item)}
      />

      <Fields autoGenerateId={isNew} component={Identifier} names={['name', 'id']} />
      <Field component={createField(Input)} label={_('global.url')} name="url" type="url" />
      <Field
        currentUserRequired
        component={createField(UsersSelect)}
        label={_('global.owners')}
        name="owners"
      />
      <Field component={createField(UsersSelect)} label={_('global.users')} name="users" />
    </Form>
  );
};

SpacesPageEdit.propTypes = {
  ...PropTypes.form,
  _: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateSpace: PropTypes.func,
  handleFetchLabels: PropTypes.func,
  handleUpdateSpace: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

SpacesPageEdit.defaultProps = {
  handleCreateSpace: noop,
  handleFetchLabels: noop,
  handleUpdateSpace: noop,
  isNew: true,
  item: Map(),
  pushState: noop,
};

SpacesPageEdit.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { match: { params } }) => {
  const item = getSpace(state, params.id);

  return {
    id: params.id,
    isNew: !params.id,
    item,
    initialValues: item,
  };
};

const mapDispatchToProps = {
  pushState: push,
  handleCreateSpace: createSpace,
  handleUpdateSpace: updateSpace,
  handleFetchLabels: fetchLabels,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withLoading({
    type: ['spacesList', 'spacesItem'],
    action: ({ id }) => fetchSpace(id),
    condition: ({ id }) => !!id,
  }),
  withTranslate,
  withForm('spaces'),
)(SpacesPageEdit);
