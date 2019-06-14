import { Button, Table } from 'antd';
import { SectionHeader } from 'components/index';
import { withLoading, withPermissions, withTranslate } from 'hocs';
import { List } from 'immutable';
import { noop } from 'lodash';
import React from 'react';
import { fetchContentList, getContentList } from 'reducers/content';
import { compose, connect, PropTypes, push } from 'utils/create';

const ContentPageList = ({ _, collection, data, handlePush, match: { path } }) => {
  const onCreateClick = () => handlePush(`${path}/create`);

  const onEditClick = ({ id }) => handlePush(`${path}/edit/${id}`);

  const columns = [
    {
      title: _('global.id'),
      dataIndex: 'id',
    },
    {
      title: _('global.name'),
      dataIndex: 'title', // TODO: title key may not be available
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
        description={_('collection.description.list', collection)}
        title={_('collection.title.list', collection)}
      />

      <Table
        columns={[
          ...columns,
          {
            title: _('global.action'),
            key: 'action',
            align: 'center',
            render: (text, item) => (
              <Button.Group>
                <Button htmlType="button" icon="edit" onClick={() => onEditClick(item)} />
                <Button
                  htmlType="button"
                  icon="delete"
                  type="danger"
                  onClick={() => onEditClick(item)}
                />
              </Button.Group>
            ),
          },
        ]}
        dataSource={data.toJS()}
        rowKey="id"
        size="small"
      />
    </div>
  );
};

ContentPageList.propTypes = {
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  match: PropTypes.match.isRequired,
  data: PropTypes.list,
  handlePush: PropTypes.func,
};

ContentPageList.defaultProps = {
  data: List(),
  handlePush: noop,
};

const mapStateToProps = (state, { collection }) => ({
  data: getContentList(state, collection.get('id')),
});

const mapDispatchToProps = {
  handlePush: push,
};

export default compose(
  withPermissions(),
  // withLoading({
  //   type: 'contentList',
  //   action: ({ collection }) => fetchContentList(collection.get('id')),
  // }),
  withTranslate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ContentPageList);
