import { Button, Table } from 'antd';
import { SectionHeader } from 'components/index';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { List } from 'immutable';
import { noop } from 'lodash';
import { fetchCollection } from 'reducers/collections/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class CollectionsContentPageList extends Component {
  onCreateClick = () => {
    const {
      handlePush,
      match: { path },
    } = this.props;

    handlePush(`${path}/create`);
  };

  onEditClick = ({ id }) => {
    const {
      handlePush,
      match: { path },
    } = this.props;

    handlePush(`${path}/edit/${id}`);
  };

  render() {
    const { _, collection, data } = this.props;

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
          title={_('collection.list.title', { name: collection.get('name') })}
          description={_('collection.list.description', { name: collection.get('name') })}
          action={
            <Button onClick={this.onCreateClick} type="primary" icon="plus">
              {_('global.create')}
            </Button>
          }
        />

        <Table
          rowKey="id"
          dataSource={data.toJS()}
          size="small"
          columns={[
            ...columns,
            {
              title: 'Action',
              key: 'action',
              align: 'center',
              render: (text, item) => (
                <Button.Group>
                  <Button icon="edit" onClick={() => this.onEditClick(item)} />
                  <Button icon="delete" onClick={() => this.onEditClick(item)} />
                </Button.Group>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

CollectionsContentPageList.propTypes = {
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  data: PropTypes.list,
  handlePush: PropTypes.func,
  match: PropTypes.match.isRequired,
};

CollectionsContentPageList.defaultProps = {
  handlePush: noop,
  data: List(),
};

const mapDispatchToProps = dispatch => ({
  handlePush: path => dispatch(push(path)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'collections',
    action: () => fetchCollection('aktualnosci'),
  }),
  withPermissions(),
  withTranslate,
)(CollectionsContentPageList);
