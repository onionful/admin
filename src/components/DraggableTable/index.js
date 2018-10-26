import { Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { colors } from 'utils';
import { Component, css, PropTypes, React, styled } from 'utils/create';

const StyledTable = styled(Table)({
  '& table': {
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  '& td': {
    borderTopSize: '1px !important',
    borderBottomSize: '1px !important',
  },
});

const BodyRow = ({
  isOver,
  connectDragSource,
  connectDropTarget,
  moveRow,
  dragRow,
  clientOffset,
  sourceClientOffset,
  initialClientOffset,
  style,
  ...props
}) => {
  const edge = { top: false, bottom: false };
  const border = value => `1px solid ${value ? `${colors.onion} !important` : 'transparent'}`;

  if (isOver && initialClientOffset) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    edge.bottom = dragRow.index < props.index && hoverClientY > hoverMiddleY;
    edge.top = dragRow.index > props.index && hoverClientY < hoverMiddleY;
  }

  const className = css({
    ...style,
    cursor: 'move',

    '& td': {
      borderTop: border(edge.top),
      borderBottom: border(edge.bottom),
    },
  });

  return connectDragSource(connectDropTarget(<tr {...props} className={className} />));
};

const DraggableBodyRow = DropTarget(
  'row',
  {
    drop: ({ index, moveRow }, monitor) => {
      const dragIndex = monitor.getItem().index;

      if (dragIndex !== index) {
        moveRow(dragIndex, index);
        monitor.getItem().index = index; // eslint-disable-line no-param-reassign
      }
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
  }),
)(
  DragSource('row', { beginDrag: ({ index }) => ({ index }) }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(BodyRow),
);

class DraggableTable extends Component {
  constructor(...args) {
    super(...args);

    const { dataSource } = this.props;
    this.state = { dataSource };
  }

  moveRow = (from, to) => {
    const { dataSource } = this.state;
    const { onSort } = this.props;

    dataSource.splice(to, 0, ...dataSource.splice(from, 1));

    this.setState({ dataSource }, () => onSort(dataSource));
  };

  render() {
    const { dataSource } = this.state;

    return (
      <StyledTable
        {...this.props}
        dataSource={dataSource}
        components={{ body: { row: DraggableBodyRow } }}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
      />
    );
  }
}

DraggableTable.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(DraggableTable);
