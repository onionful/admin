import { Button, message, Popconfirm, Table } from 'antd';
import { SectionHeader } from 'components/index';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { deleteCollection, fetchCollections, getCollections } from 'reducers/collections/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

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
          title={_('collections.title.list')}
          description={_('collections.description.list')}
          action={
            <Button onClick={this.onCreateClick} type="primary" icon="plus">
              {_('global.create')}
            </Button>
          }
        />

        <Table
          rowKey="id"
          dataSource={data.toList().toJS()}
          size="small"
          columns={[
            ...columns,
            {
              title: _('global.action'),
              key: 'action',
              align: 'center',
              render: (text, record) => (
                <Button.Group>
                  <Button icon="edit" onClick={() => this.handleEdit(record)} />
                  <Popconfirm
                    title={_('global.deleteQuestion')}
                    onConfirm={() => this.handleDelete(record)}
                  >
                    <Button icon="delete" type="danger" />
                  </Popconfirm>
                </Button.Group>
              ),
            },
          ]}
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
  handleDeleteCollection: noop,
  handlePush: noop,
  data: Map(),
};

const mapStateToProps = state => ({
  data: getCollections(state),
});

const mapDispatchToProps = dispatch => ({
  handleDeleteCollection: id => dispatch(deleteCollection(id)),
  handlePush: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'collections',
    action: () => fetchCollections(),
  }),
  withPermissions(),
  withTranslate,
)(CollectionsPageList);
