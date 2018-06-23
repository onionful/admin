import { Avatar, Table } from 'antd';
import { withPermissions } from 'helpers';
import { List } from 'immutable';
import { noop } from 'lodash';
import moment from 'moment';
import { fetchSpaces } from 'reducers/spaces/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

const columns = [
  {
    title: 'Identifier',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Owner',
    dataIndex: 'createdBy',
    render: value => <Avatar src={value} />,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    render: value => <span title={value}>{moment(value).fromNow()}</span>,
    sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    render: value => <span title={value}>{moment(value).fromNow()}</span>,
    sorter: (a, b) => moment(a.updatedAt) - moment(b.updatedAt),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <div>actions</div>,
  },
];

class SpacesPage extends Component {
  componentDidMount() {
    const { handleFetchSpaces } = this.props;
    handleFetchSpaces();
  }

  render() {
    const { data, isLoading } = this.props;

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
  handleFetchSpaces: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.list,
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
)(SpacesPage);
