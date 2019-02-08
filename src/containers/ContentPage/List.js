import { Button, Table } from 'antd';
import { SectionHeader } from 'components/index';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { List } from 'immutable';
import { noop } from 'lodash';
import { fetchContentList, getContentList } from 'reducers/content';
import { Component, compose, connect, PropTypes, push, React } from 'utils/create';

class ContentPageList extends Component {
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
        dataIndex: 'title', // TODO: title key may not be available
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withLoading({
    type: 'contentList',
    action: ({ collection }) => fetchContentList(collection.get('id')),
  }),
  withTranslate,
)(ContentPageList);
