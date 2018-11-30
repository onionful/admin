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
          action={
            <Button htmlType="submit" icon="plus" type="primary" onClick={this.onCreateClick}>
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
                  <Button htmlType="button" icon="edit" onClick={() => this.onEditClick(item)} />
                  <Button htmlType="button" icon="delete" onClick={() => this.onEditClick(item)} />
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
  }
}

CollectionsContentPageList.propTypes = {
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  match: PropTypes.match.isRequired,
  data: PropTypes.list,
  handlePush: PropTypes.func,
};

CollectionsContentPageList.defaultProps = {
  data: List(),
  handlePush: noop,
};

const mapDispatchToProps = {
  handlePush: push,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'collectionsList',
    action: () => fetchCollection('aktualnosci'),
  }),
  withPermissions(),
  withTranslate,
)(CollectionsContentPageList);
