import { ClassNames } from '@emotion/core';
import React from 'react';
import { colors } from 'utils';
import { PropTypes } from 'utils/create';

const BodyRow = ({
  isOver,
  connectDragSource,
  connectDropTarget,
  onSort,
  dragRow,
  clientOffset,
  sourceClientOffset,
  initialClientOffset,
  index,
  style,
  ...props
}) => {
  const edge = { top: false, bottom: false };
  const border = value => `1px solid ${value ? `${colors.onion} !important` : 'transparent'}`;

  if (isOver && initialClientOffset) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    edge.bottom = dragRow.index < index && hoverClientY > hoverMiddleY;
    edge.top = dragRow.index > index && hoverClientY < hoverMiddleY;
  }

  return (
    <ClassNames>
      {({ css, cx }) =>
        connectDragSource(
          connectDropTarget(
            <tr
              {...props}
              className={cx(
                css(style),
                css`
                  cursor: move;

                  & td {
                    border-top: ${border(edge.top)};
                    border-bottom: ${border(edge.bottom)};
                  },
                `,
              )}
            />,
          ),
        )
      }
    </ClassNames>
  );
};

const offsetShape = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

BodyRow.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  style: PropTypes.shape({
    height: PropTypes.number,
  }).isRequired,
  clientOffset: offsetShape,
  dragRow: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  initialClientOffset: offsetShape,
  sourceClientOffset: offsetShape,
};

BodyRow.defaultProps = {
  clientOffset: {},
  dragRow: {},
  initialClientOffset: {},
  sourceClientOffset: {},
};

export default BodyRow;
