/* eslint-disable */
import { Button, Table } from 'antd';
import { SectionHeader } from 'components';
import { push } from 'connected-react-router';
import { withLoading, withPermissions } from 'helpers';
import { List } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { fetchContentTypes, getContentTypes } from 'reducers/contentType/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class ContentTypePageList extends Component {
  onEditClick = ({ id }) => {
    const { handlePush } = this.props;
    handlePush(`/content-type/edit/${id}`);
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
          title={formatMessage({ id: 'contentType.title' })}
          description={formatMessage({ id: 'contentType.description' })}
          action={
            <Button onClick={this.onCreateClick} type="primary" icon="plus">
              {formatMessage({ id: 'global.create' })}
            </Button>
          }
        />

        <Table
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
          rowKey="id"
          dataSource={data.toJS()}
          size="small"
        />
      </div>
    );
  }
}

ContentTypePageList.propTypes = {
  intl: intlShape.isRequired,
  handlePush: PropTypes.func,
  data: PropTypes.list,
};

ContentTypePageList.defaultProps = {
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
  withLoading('contentType', fetchContentTypes),
  withPermissions(),
)(ContentTypePageList);
