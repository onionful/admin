import { Button, Input, message } from 'antd';
import { SectionHeader } from 'components';
import { Identifier, UsersSelect } from 'components/Form';
import { withForm, withPermissions, withTranslate, WithTranslateProps } from 'hocs';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { ResolveThunks, useDispatch } from 'react-redux';
import { ApplicationState } from 'reducers';
import { createSpace, getSpace, updateSpace } from 'reducers/spaces';
import { fetchLabels } from 'reducers/users';
import { InjectedFormProps } from 'redux-form';
import { Field, Fields, Form } from 'redux-form/immutable';
import { Space } from 'types';
import { compose, connect, PropTypes, push } from 'utils/create';

interface OwnProps {
  path: string;
}

interface StateProps {
  id: string;
  isNew: boolean;
  item?: Space;
  initialValues?: Space;
}

type Props = OwnProps & StateProps & InjectedFormProps & WithTranslateProps;

const SpacesPageEdit: FunctionComponent<Props> = (
  { _, dirty, handleSubmit, initialize, isNew, item, path },
  { createField },
) => {
  const dispatch = useDispatch();
  const handleCreateSpace = useCallback((space: Space) => createSpace(space)(dispatch), [dispatch]);
  const handleUpdateSpace = useCallback(
    (id: string, space: Space) => updateSpace(id, space)(dispatch),
    [dispatch],
  );
  const handleFetchLabels = useCallback(
    () => item && dispatch(fetchLabels(...item.owners, ...item.users)),
    [dispatch],
  );
  const handlePush = useCallback((path: string) => dispatch(push(path)), [dispatch]);

  useEffect(() => {
    handleFetchLabels();
  }, [item]);

  const handleCancelClick = () => handlePush(path);

  const handleFormSubmit = (values: any) => {
    console.log('values', values);
    return (isNew || !item ? handleCreateSpace(values) : handleUpdateSpace(item.id, values)).then(
      () => {
        message.success(_(`messages.spaces.${isNew ? 'created' : 'updated'}`));
        // pushState(`${path}/edit/${values.id}`);
        initialize(values);
      },
    );
  };

  if (!isNew && item) {
    throw new Error(_('errors.collectionNotFound').toString());
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* TODO use Form from antd + layout="vertical"? */}
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

SpacesPageEdit.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const mapStateToProps = (state: ApplicationState, { match: { params } }: any): StateProps => {
  console.log('params', params);
  const item = getSpace(state, params.id);

  return {
    id: params.id,
    isNew: !params.id,
    item,
    initialValues: item,
  };
};

export default compose<FunctionComponent<OwnProps>>(
  withPermissions(),
  // withLoading({
  //   type: ['spacesList', 'spacesItem'],
  //   action: ({ id }) => fetchSpace(id),
  //   condition: ({ id }) => !!id,
  // }),
  withTranslate,
  withForm('spaces'),
  connect(mapStateToProps),
)(SpacesPageEdit);
