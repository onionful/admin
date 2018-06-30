import { Button, Table } from 'antd';
import { SectionHeader } from 'components';
import { push } from 'connected-react-router';
import { withLoading, withPermissions } from 'helpers';
import { List } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
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
    const {
      data,
      intl: { formatMessage },
    } = this.props;

    const columns = [
      {
        title: formatMessage({ id: 'global.id' }),
        dataIndex: 'id',
      },
      {
        title: formatMessage({ id: 'global.name' }),
        dataIndex: 'name',
      },
      {
        title: formatMessage({ id: 'global.description' }),
        dataIndex: 'description',
      },
      {
        title: formatMessage({ id: 'global.fields' }),
        dataIndex: 'fields',
        render: value => value.length,
      },
    ];

    return (
      <div>
        <SectionHeader
          title={formatMessage({ id: 'contentTypes.list.title' })}
          description={formatMessage({ id: 'contentTypes.list.description' })}
          action={
            <Button onClick={this.onCreateClick} type="primary" icon="plus">
              {formatMessage({ id: 'global.create' })}
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
  intl: intlShape.isRequired,
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
  injectIntl,
  withLoading({
    type: 'contentTypes',
    action: () => fetchContentTypes(),
  }),
  withPermissions(),
)(ContentTypesPageList);
