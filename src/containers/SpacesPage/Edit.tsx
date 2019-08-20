import { createSpace, updateSpace } from 'actions/spaces';
import { Button, Input, message } from 'antd';
import { SectionHeader } from 'components';
import { Identifier, renderField, UsersSelect } from 'components/Form';
import { withPermissions, withTranslate, WithTranslateProps } from 'hocs';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from 'reducers';
import { getSpace } from 'reducers/spaces';
import { fetchLabels } from 'reducers/users';
import { Field, Fields, Form, InjectedFormProps, reduxForm } from 'redux-form';
import { Space } from 'types';
import { compose, connect, push } from 'utils/create';

interface OwnProps {
  path: string;
  create?: boolean;
}

type Props = OwnProps &
  InjectedFormProps &
  RouteComponentProps<{ id: string }> &
  WithTranslateProps;

const SpacesPageEdit: FunctionComponent<Props> = ({
  _,
  create,
  dirty,
  handleSubmit,
  initialize,
  path,
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const space = useSelector((state: ApplicationState) => getSpace(state, id));

  const handleCreateSpace = useCallback((space: Space) => createSpace(space)(dispatch), [dispatch]);
  const handleUpdateSpace = useCallback(
    (id: string, space: Space) => updateSpace(id, space)(dispatch),
    [dispatch],
  );
  const handleFetchLabels = useCallback(
    () => space && dispatch(fetchLabels(...space.owners, ...space.users)),
    [dispatch, space],
  );
  const handlePush = useCallback((path: string) => dispatch(push(path)), [dispatch]);

  useEffect(() => {
    handleFetchLabels();
  }, [space, handleFetchLabels]);

  const handleCancelClick = () => handlePush(path);

  const handleFormSubmit = (values: any) => {
    console.log('values', values);
    return (create || !space
      ? handleCreateSpace(values)
      : handleUpdateSpace(space.id, values)
    ).then(() => {
      message.success(_(`messages.spaces.${create ? 'created' : 'updated'}`));
      // pushState(`${path}/edit/${values.id}`);
      initialize(values);
    });
  };

  if (!create && space) {
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
        description={_(`spaces.description.${create ? 'create' : 'edit'}`)}
        title={_(`spaces.title.${create ? 'create' : 'edit'}`, space)}
      />
      <Fields autoGenerateId={create} component={Identifier} names={['name', 'id']} />
      <Field component={renderField(Input)} label={_('global.url')} name="url" type="url" />
      <Field
        currentUserRequired
        component={renderField(UsersSelect)}
        label={_('global.owners')}
        name="owners"
      />
      <Field component={renderField(UsersSelect)} label={_('global.users')} name="users" />
    </Form>
  );
};

const mapStateToProps = (
  state: ApplicationState,
  {
    match: {
      params: { id },
    },
  }: Props,
) => ({
  initialValues: getSpace(state, id),
});

export default compose<FunctionComponent<OwnProps>>(
  connect(mapStateToProps),
  reduxForm({ form: 'spaces' }),
  withPermissions(),
  withTranslate,
)(SpacesPageEdit);
