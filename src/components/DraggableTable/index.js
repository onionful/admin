import { Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { colors } from 'utils';
import { css, PropTypes, React, styled } from 'utils/create';

const StyledTable = styled(Table)`
  & table {
    border-collapse: separate;
    border-spacing: 0;
  }
  & td {
    border-top-width: 1px !important;
    border-bottom-width: 1px !important;
  }
`;

const BodyRow = ({
  isOver,
  connectDragSource,
  connectDropTarget,
  onSort,
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
    drop: ({ index, onSort }, monitor) => {
      const dragIndex = monitor.getItem().index;

      if (dragIndex !== index) {
        onSort(dragIndex, index);
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

const DraggableTable = ({ onSort, ...props }) => (
  <StyledTable
    {...props}
    components={{ body: { row: DraggableBodyRow } }}
    onRow={(record, index) => ({ index, onSort })}
  />
);

DraggableTable.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(DraggableTable);
