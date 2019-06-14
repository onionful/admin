import { Button, message, Popconfirm, Table } from 'antd';
import { SectionHeader } from 'components/index';
import { withLoading, withPermissions, withTranslate } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import React from 'react';
import { deleteCollection, fetchCollectionsList, getCollections } from 'reducers/collections';
import { compose, connect, PropTypes, push } from 'utils/create';

const CollectionsPageList = ({ _, data, handleDeleteCollection, handlePush, match: { path } }) => {
  const onCreateClick = () => handlePush(`${path}/create`);

  const handleEdit = ({ id }) => handlePush(`${path}/edit/${id}`);

  const handleDelete = ({ id }) =>
    handleDeleteCollection(id).then(() => {
      message.success(_('messages.collections.deleted'));
      handlePush(`${path}`);
    });

  const columns = [
    {
      title: _('global.id'),
      dataIndex: 'id',
    },
    {
      title: _('global.name'),
      dataIndex: 'name',
    },
    {
      title: _('global.description'),
      dataIndex: 'description',
    },
    {
      title: _('global.fields'),
      dataIndex: 'fields',
      render: value => value.length,
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
        description={_('collections.description.list')}
        title={_('collections.title.list')}
      />

      <Table
        columns={[
          ...columns,
          {
            title: _('global.action'),
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <Button.Group>
                <Button htmlType="button" icon="edit" onClick={() => handleEdit(record)} />
                <Popconfirm
                  title={_('global.deleteQuestion')}
                  onConfirm={() => handleDelete(record)}
                >
                  <Button htmlType="button" icon="delete" type="danger" />
                </Popconfirm>
              </Button.Group>
            ),
          },
        ]}
        dataSource={data.toList().toJS()}
        rowKey="id"
        size="small"
      />
    </div>
  );
};

CollectionsPageList.propTypes = {
  _: PropTypes.func.isRequired,
  match: PropTypes.match.isRequired,
  data: PropTypes.map,
  handleDeleteCollection: PropTypes.func,
  handlePush: PropTypes.func,
};

CollectionsPageList.defaultProps = {
  data: Map(),
  handleDeleteCollection: noop,
  handlePush: noop,
};

const mapStateToProps = state => ({
  data: getCollections(state),
});

const mapDispatchToProps = {
  handleDeleteCollection: deleteCollection,
  handlePush: push,
};

export default compose(
  withPermissions(),
  // withLoading({
  //   type: 'collectionsList',
  //   action: fetchCollections,
  // }),
  withTranslate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CollectionsPageList);
