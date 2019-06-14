import { Button, message, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link, SectionHeader, UserLabelGroup } from 'components';
import { withPermissions, withTranslate, WithTranslateProps } from 'hocs';
import React, { FunctionComponent } from 'react';
import { ResolveThunks } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from 'reducers';
import { deleteSpace, getSpaces } from 'reducers/spaces';
import { Dictionary, Space } from 'types';
import { compose, connect, push } from 'utils/create';

interface OwnProps {}

interface StateProps {
  data: Dictionary<Space>;
}

interface DispatchProps {
  handleDeleteSpace: typeof deleteSpace;
  handlePush: typeof push;
}

type Props = OwnProps &
  StateProps &
  ResolveThunks<DispatchProps> &
  RouteComponentProps &
  WithTranslateProps;

const SpacesPageList: FunctionComponent<Props> = ({
  _,
  data,
  handleDeleteSpace,
  handlePush,
  match: { path },
}) => {
  const onCreateClick = () => handlePush(`${path}/create`);

  const handleDelete = ({ id }: Space) =>
    // @ts-ignore
    handleDeleteSpace(id).then(() => {
      message.success(_('messages.spaces.deleted'));
      handlePush(`${path}`);
    });

  const handleEdit = ({ id }: Space) => handlePush(`${path}/edit/${id}`);

  const columns: ColumnProps<Space>[] = [
    {
      title: _('global.name'),
      dataIndex: 'name',
      render: (value: string) => <strong>{value}</strong>,
    },
    {
      title: _('global.id'),
      dataIndex: 'id',
    },
    {
      title: _('global.url'),
      dataIndex: 'url',
      render: (value: string) => <Link to={value}>{value.replace(/(^\w+:|^)\/\//, '')}</Link>,
    },
    {
      title: _('global.owners'),
      dataIndex: 'owners',
      render: (value: string[]) => <UserLabelGroup ids={value} />,
    },
    {
      title: _('global.users'),
      dataIndex: 'users',
      render: (value: string[]) => <UserLabelGroup ids={value} />,
    },
    {
      title: _('global.action'),
      key: 'action',
      align: 'center',
      render: (text: string, record: Space) => (
        <Button.Group>
          <Button htmlType="button" icon="edit" onClick={() => handleEdit(record)} />
          <Popconfirm title={_('global.deleteQuestion')} onConfirm={() => handleDelete(record)}>
            <Button htmlType="button" icon="delete" type="danger" />
          </Popconfirm>
        </Button.Group>
      ),
    },
  ];

  return (
    <div>
      <SectionHeader
        action={
          <Button htmlType="submit" icon="plus" type="primary" onClick={onCreateClick}>
            {_('global.create')}
          </Button>
        }
        description={_('spaces.description.list')}
        title={_('spaces.title.list')}
      />

      <Table columns={columns} dataSource={Object.values(data)} rowKey="id" size="small" />
    </div>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => ({
  data: getSpaces(state),
});

const mapDispatchToProps: DispatchProps = {
  handleDeleteSpace: deleteSpace,
  handlePush: push,
};

export default compose(
  withPermissions(),
  // withLoading({
  //   type: 'spacesList',
  //   action: fetchSpaces,
  // }),
  withTranslate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SpacesPageList);
