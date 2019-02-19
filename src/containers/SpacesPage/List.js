import { Button, message, Popconfirm, Table } from 'antd';
import { Link, SectionHeader, UserLabelGroup } from 'components';
import { withLoading, withPermissions, withTranslate } from 'hocs';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { deleteSpace, fetchSpaces, getSpaces } from 'reducers/spaces';
import { compose, connect, PropTypes, push, React } from 'utils/create';

const SpacesPageList = ({ _, data, handleDeleteSpace, handlePush, match: { path } }) => {
  const onCreateClick = () => handlePush(`${path}/create`);

  const handleDelete = ({ id }) =>
    handleDeleteSpace(id).then(() => {
      message.success(_('messages.spaces.deleted'));
      handlePush(`${path}`);
    });

  const handleEdit = ({ id }) => handlePush(`${path}/edit/${id}`);

  const columns = [
    {
      title: _('global.name'),
      dataIndex: 'name',
      render: value => <strong>{value}</strong>,
    },
    {
      title: _('global.id'),
      dataIndex: 'id',
    },
    {
      title: _('global.url'),
      dataIndex: 'url',
      render: value => <Link to={value}>{value.replace(/(^\w+:|^)\/\//, '')}</Link>,
    },
    {
      title: _('global.owners'),
      dataIndex: 'owners',
      render: value => <UserLabelGroup ids={value} />,
    },
    {
      title: _('global.users'),
      dataIndex: 'users',
      render: value => <UserLabelGroup ids={value} />,
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

SpacesPageList.propTypes = {
  _: PropTypes.func.isRequired,
  match: PropTypes.match.isRequired,
  data: PropTypes.map,
  handleDeleteSpace: PropTypes.func,
  handlePush: PropTypes.func,
};

SpacesPageList.defaultProps = {
  data: Map(),
  handleDeleteSpace: noop,
  handlePush: noop,
};

const mapStateToProps = state => ({
  data: getSpaces(state),
});

const mapDispatchToProps = {
  handleDeleteSpace: deleteSpace,
  handlePush: push,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withLoading({
    type: 'spacesList',
    action: fetchSpaces,
  }),
  withTranslate,
)(SpacesPageList);
