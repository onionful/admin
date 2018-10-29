import { Avatar, Table } from 'antd';
import { withPermissions, withTranslate } from 'helpers';
import { List } from 'immutable';
import { noop } from 'lodash';
import moment from 'moment';
import { fetchSpaces } from 'reducers/spaces/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class SpacesPage extends Component {
  componentDidMount() {
    const { handleFetchSpaces } = this.props;
    handleFetchSpaces();
  }

  render() {
    const { _, data, isLoading } = this.props;

    const columns = [
      {
        title: _('global.id'),
        dataIndex: 'id',
        sorter: true,
      },
      {
        title: _('global.name'),
        dataIndex: 'name',
      },
      {
        title: 'Owner',
        dataIndex: 'createdBy',
        render: value => <Avatar src={value} />,
      },
      {
        title: _('global.createdAt'),
        dataIndex: 'createdAt',
        render: value => <span title={value}>{moment(value).fromNow()}</span>,
        sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
      },
      {
        title: _('global.updatedAt'),
        dataIndex: 'updatedAt',
        render: value => <span title={value}>{moment(value).fromNow()}</span>,
        sorter: (a, b) => moment(a.updatedAt) - moment(b.updatedAt),
      },
      {
        title: _('global.action'),
        key: 'action',
        render: () => <div>actions</div>,
      },
    ];

    return (
      <div>
        <h1>Spaces</h1>
        <Table
          columns={columns}
          rowKey="id"
          dataSource={data.toJS()}
          loading={isLoading}
          size="small"
        />
      </div>
    );
  }
}

SpacesPage.propTypes = {
  _: PropTypes.func.isRequired,
  data: PropTypes.list,
  handleFetchSpaces: PropTypes.func,
  isLoading: PropTypes.bool,
};

SpacesPage.defaultProps = {
  handleFetchSpaces: noop,
  isLoading: false,
  data: List(),
};

const mapStateToProps = state => ({
  data: state.getIn(['spaces', 'data']),
  isLoading: state.getIn(['spaces', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchSpaces: params => dispatch(fetchSpaces(params)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  withTranslate,
)(SpacesPage);
