import { Button, message, Popconfirm, Table } from 'antd';
import { SectionHeader } from 'components/index';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { deleteCollection, fetchCollections, getCollections } from 'reducers/collections/actions';
import { Component, compose, connect, PropTypes, push, React } from 'utils/create';

class CollectionsPageList extends Component {
  onCreateClick = () => {
    const {
      handlePush,
      match: { path },
    } = this.props;

    handlePush(`${path}/create`);
  };

  handleDelete = ({ id }) => {
    const {
      _,
      handleDeleteCollection,
      handlePush,
      match: { path },
    } = this.props;

    handleDeleteCollection(id).then(() => {
      message.success(_('messages.collections.deleted'));
      handlePush(`${path}`);
    });
  };

  handleEdit = ({ id }) => {
    const {
      handlePush,
      match: { path },
    } = this.props;

    handlePush(`${path}/edit/${id}`);
  };

  render() {
    const { _, data } = this.props;

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
            <Button htmlType="submit" icon="plus" type="primary" onClick={this.onCreateClick}>
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
                  <Button htmlType="button" icon="edit" onClick={() => this.handleEdit(record)} />
                  <Popconfirm
                    title={_('global.deleteQuestion')}
                    onConfirm={() => this.handleDelete(record)}
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
  }
}

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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withLoading({
    type: 'collectionsList',
    action: fetchCollections,
  }),
  withTranslate,
)(CollectionsPageList);
