import { Button, Table } from 'antd';
import { SectionHeader } from 'components';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers';
import { List } from 'immutable';
import { noop } from 'lodash';
import { fetchContentTypes, getContentTypes } from 'reducers/contentTypes/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class ContentTypesPageList extends Component {
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
          title={_('contentTypes.list.title')}
          description={_('contentTypes.list.description')}
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
              render: (text, record) => (
                <Button.Group>
                  <Button icon="edit" onClick={() => this.onEditClick(record)} />
                  <Button icon="delete" onClick={() => this.onEditClick(record)} />
                </Button.Group>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

ContentTypesPageList.propTypes = {
  _: PropTypes.func.isRequired,
  match: PropTypes.match.isRequired,
  handlePush: PropTypes.func,
  data: PropTypes.list,
};

ContentTypesPageList.defaultProps = {
  handlePush: noop,
  data: List(),
};

const mapStateToProps = state => ({
  data: getContentTypes(state),
});

const mapDispatchToProps = dispatch => ({
  handlePush: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'contentTypes',
    action: () => fetchContentTypes(),
  }),
  withPermissions(),
  withTranslate,
)(ContentTypesPageList);
