import { Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { PropTypes, React, styled } from 'utils/create';
import BodyRow from './BodyRow';

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

const DraggableBodyRow = DropTarget(
  'row',
  {
    drop: ({ index, onSort }, monitor) => {
      const dragIndex = monitor.getItem().index;

      if (dragIndex !== index) {
        onSort(dragIndex, index);
        Object.assign(monitor.getItem(), { index });
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
