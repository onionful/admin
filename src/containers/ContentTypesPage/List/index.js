import { Avatar, Button, Table } from 'antd';
import moment from 'moment';
import { List } from 'immutable';
import { push } from 'react-router-redux';
import { compose, connect, Component, PropTypes, React } from 'utils/create';
import { withPermissions } from 'utils';
import { noop } from 'lodash';

const columns = [
  {
    title: 'title',
    dataIndex: 'title',
    sorter: true,
  },
  {
    title: 'Identifier',
    dataIndex: 'slug',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: value => value.join(', '),
  },
  {
    title: 'Author',
    dataIndex: 'createdBy',
    align: 'center',
    render: value => <Avatar src={value} />,
  },
  {
    title: 'Published',
    dataIndex: 'updatedAt',
    render: value => <span title={value}>{moment(value).fromNow()}</span>,
    sorter: (a, b) => moment(a.updatedAt) - moment(b.updatedAt),
  },
];

class ContentPageList extends Component {
  onEditClick = ({ slug }) => {
    const { pushState } = this.props;
    pushState(`/content/${slug}`);
  };

  render() {
    const { data, isLoading } = this.props;

    return (
      <Table
        columns={[
          ...columns,
          {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <div>
                <Button shape="circle" icon="edit" onClick={() => this.onEditClick(record)} />
              </div>
            ),
          },
        ]}
        rowKey="id"
        dataSource={data.toJS()}
        loading={isLoading}
        size="small"
      />
    );
  }
}

ContentPageList.propTypes = {
  pushState: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.list,
};

ContentPageList.defaultProps = {
  pushState: noop,
  isLoading: false,
  data: List(),
};

const mapStateToProps = state => ({
  data: state.getIn(['content', 'data']),
  isLoading: state.getIn(['content', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  pushState: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
)(ContentPageList);
