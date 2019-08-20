import { Tooltip } from 'antd';
import { UserLabel } from 'components';
import React, { FunctionComponent } from 'react';
import { styled } from 'utils/create';

interface Props {
  ids: string[];
}

const StyledTooltip = styled(Tooltip)`
  display: flex;
  justify-content: center;
`;

const StyledUserLabel = styled(UserLabel)`
  margin: 0.5rem 0.1rem;
`;

const UserLabelGroup: FunctionComponent<Props> = ({ ids }) => (
  <StyledTooltip
    placement="left"
    title={
      <>
        {ids.map(id => (
          <StyledUserLabel key={id} id={id} />
        ))}
      </>
    }
  >
    {ids.map(id => (
      <StyledUserLabel key={id} simple id={id} />
    ))}
  </StyledTooltip>
);

export default UserLabelGroup;
