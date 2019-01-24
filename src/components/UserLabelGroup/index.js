import { Tooltip } from 'antd';
import { UserLabel } from 'components';
import { PropTypes, React, styled } from 'utils/create';

const StyledTooltip = styled(Tooltip)({
  display: 'flex',
  justifyContent: 'center',
});

const StyledUserLabel = styled(UserLabel)({
  margin: '0.5rem 0.1rem',
});

const UserLabelGroup = ({ ids }) => (
  <StyledTooltip
    placement="left"
    title={
      <div>
        {ids.map(id => (
          <StyledUserLabel key={id} id={id} />
        ))}
      </div>
    }
  >
    {ids.map(id => (
      <StyledUserLabel key={id} simple id={id} />
    ))}
  </StyledTooltip>
);

UserLabelGroup.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserLabelGroup;
