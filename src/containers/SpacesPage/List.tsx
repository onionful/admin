import { fetchSpacesList } from 'actions/spaces';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link, SectionHeader, UserLabelGroup } from 'components';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getSpaces } from 'reducers/spaces';
import { Space } from 'types';
import { push } from 'utils/create';

type Props = RouteComponentProps;

const SpacesPageList: FunctionComponent<Props> = ({ match: { path } }) => {
  const dispatch = useDispatch();
  // const handleDeleteSpace = useCallback(
  //   (space: Space) => dispatch(spacesActions.remove.request(space.id)),
  //   [dispatch],
  // );
  const handlePush = useCallback((path: string) => dispatch(push(path)), [dispatch]);
  const { t } = useTranslation();

  const handleDelete = (space: Space) => {};
  // TODO no .then :-(
  // handleDeleteSpace(space).then(() => {
  //   message.success(t('messages.spaces.deleted'));
  //   handlePush(path);
  // });

  const handleEdit = ({ id }: Space) => handlePush(`${path}/edit/${id}`);

  const spaces = useSelector(getSpaces);

  useEffect(() => {
    dispatch(fetchSpacesList());
  }, [dispatch]);

  const columns: ColumnProps<Space>[] = [
    {
      title: t('global.name'),
      dataIndex: 'name',
      render: (value: string) => <strong>{value}</strong>,
    },
    {
      title: t('global.id'),
      dataIndex: 'id',
    },
    {
      title: t('global.url'),
      dataIndex: 'url',
      render: (value: string) => <Link to={value}>{value.replace(/(^\w+:|^)\/\//, '')}</Link>,
    },
    {
      title: t('global.owners'),
      dataIndex: 'owners',
      align: 'center',
      render: (value: string[]) => <UserLabelGroup ids={value} />,
    },
    {
      title: t('global.users'),
      dataIndex: 'users',
      align: 'center',
      render: (value: string[]) => <UserLabelGroup ids={value} />,
    },
    {
      title: t('global.action'),
      key: 'action',
      align: 'center',
      render: (text: string, record: Space) => (
        <Button.Group>
          <Button htmlType="button" icon="edit" onClick={() => handleEdit(record)} />
          <Popconfirm title={t('global.deleteQuestion')} onConfirm={() => handleDelete(record)}>
            <Button htmlType="button" icon="delete" type="danger" />
          </Popconfirm>
        </Button.Group>
      ),
    },
  ];

  return (
    <>
      <SectionHeader
        action={
          <Button
            htmlType="submit"
            icon="plus"
            type="primary"
            onClick={() => handlePush(`${path}/create`)}
          >
            {t('global.create')}
          </Button>
        }
        description={t('spaces.description.list')}
        title={t('spaces.title.list')}
      />

      <Table columns={columns} dataSource={Object.values(spaces)} rowKey="id" size="small" />
    </>
  );
};

export default SpacesPageList;
