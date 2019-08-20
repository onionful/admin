import { Table } from 'antd';
import React, { FunctionComponent } from 'react';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { styled } from 'utils/create';
import BodyRow from './BodyRow';

interface Props {
  onSort: (dragIndex: number, index: number) => void;
  index: number;
}

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

const DraggableBodyRow = DropTarget<Props>(
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
  DragSource<Props>('row', { beginDrag: ({ index }) => ({ index }) }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(BodyRow),
);

const DraggableTable: FunctionComponent<Props> = ({ onSort, ...props }) => (
  <DndProvider backend={HTML5Backend}>
    <StyledTable
      {...props}
      components={{ body: { row: DraggableBodyRow } }}
      onRow={(record, index) => ({ index, onSort })}
    />
  </DndProvider>
);

export default DraggableTable;
