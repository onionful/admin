import { Icon } from 'antd';
import { PropTypes, React, styled } from 'utils/create';

const Lock = styled(({ locked, onLock, ...props }) => (
  <Icon {...props} type={locked ? 'lock' : 'unlock'} onClick={onLock} />
))`
  cursor: pointer;
`;

Lock.propTypes = {
  locked: PropTypes.bool.isRequired,
  onLock: PropTypes.func.isRequired,
};

export default Lock;
